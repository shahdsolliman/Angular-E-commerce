import { Component, inject, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductStore } from '../../stores/product.store';
import { CartStore } from '../../../cart/stores/cart.store';
import { WishlistStore } from '../../../wishlist/stores/wishlist.store';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../../../shared/components/product-skeleton/product-skeleton.component';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from '../../models/product.model';

/**
 * ── ARCHITECTURE: PRODUCT COLLECTION ────────────────────────────────────────
 * ProductsComponent manages complex filtering state and synchronization.
 */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    FormsModule,
    ProductCardComponent, 
    ProductSkeletonComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly store = inject(ProductStore);
  private readonly cartStore = inject(CartStore);
  private readonly route = inject(ActivatedRoute);
  public readonly wishlistStore = inject(WishlistStore);
  
  // ── Reactive State (Store Binding) ───────────────────────────────────────
  readonly products = this.store.products;
  readonly categories = computed(() => this.store.categories().filter(c => c.name !== 'SuperMarket'));
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly pagination = this.store.pagination;
  readonly results = computed(() => this.products().length);

  // ── Local UI State (Signals) ─────────────────────────────────────────────
  readonly selectedCategory = signal<string>('All Items');
  readonly selectedSort = signal<string>('default');
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(12);
  readonly searchQuery = signal<string>('');

  private readonly searchSubject = new Subject<string>();

  constructor() {
    /**
     * REACTIVE ARCHITECTURE: Synchronizes local filters with Global Store.
     * Adheres to Liskov Substitution Principle and Dependency Inversion.
     */
    effect(() => {
      this.store.loadProducts({
        category: this.selectedCategory(),
        sort: this.selectedSort() === 'default' ? undefined : this.selectedSort(),
        keyword: this.searchQuery() || undefined,
        limit: this.pageSize(),
        page: this.currentPage()
      });
    }, { allowSignalWrites: true });

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery.set(query);
      this.currentPage.set(1);
    });
  }

  ngOnInit(): void {
    // Deep Linking: Sync local state with URL query parameters
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.selectedCategory.set(params['category']);
      if (params['page']) this.currentPage.set(Number(params['page']));
    });

    this.store.loadCategories();
    this.wishlistStore.load(); // Ensure wishlist is loaded
  }

  // ── User Actions ─────────────────────────────────────────────────────────
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  setCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    this.currentPage.set(1);
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedSort.set(target.value);
    this.currentPage.set(1);
  }

  nextPage(): void {
    const meta = this.pagination();
    if (meta && this.currentPage() < meta.numberOfPages) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  handleAddToCart(product: Product): void {
    const id = (product.id || product._id) as string;
    this.cartStore.addProduct(id);
  }

  handleToggleFavorite(id: string | number): void {
    this.wishlistStore.toggleWishlist(id);
  }

  trackByProductId(index: number, product: Product): string | number {
    return product.id || product._id || index;
  }

  retry(): void {
    this.store.loadProducts();
  }
}
