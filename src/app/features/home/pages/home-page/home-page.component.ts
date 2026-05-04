import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSliderComponent } from '../../../../shared/components/hero-slider/hero-slider.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { CategoryCardComponent } from '../../../../shared/components/category-card/category-card.component';
import { ProductStore } from '../../../products/stores/product.store';
import { CartStore } from '../../../cart/stores/cart.store';
import { WishlistStore } from '../../../wishlist/stores/wishlist.store';
import { Product } from '../../../products/models/product.model';

/**
 * ── ARCHITECTURE: PRESENTATIONAL PAGE ─────────────────────────────────────
 * HomePageComponent acts as a high-level orchestrator.
 * It consumes state from ProductStore and provides user interactions.
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroSliderComponent,
    CategoryCardComponent,
    ProductCardComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  private readonly productStore = inject(ProductStore);
  private readonly cartStore = inject(CartStore);
  private readonly wishlistStore = inject(WishlistStore);

  // ── Reactive State (Consuming Store Projections) ─────────────────────────
  readonly products = this.productStore.products;
  readonly categories = computed(() => this.productStore.categories().filter(c => c.name !== 'SuperMarket'));
  readonly isLoading = this.productStore.isLoading;
  readonly isCatLoading = computed(() => this.categories().length === 0 && this.isLoading());
  
  readonly favoriteIds = this.wishlistStore.favoriteIds;

  // High-level business slices served by the Store
  readonly bestSellers = this.productStore.bestSellers;
  readonly newArrivals = this.productStore.newArrivals;
  readonly featuredProducts = this.productStore.featured;

  ngOnInit(): void {
    this.productStore.loadProducts({ limit: 40 });
    this.productStore.loadCategories();
    this.wishlistStore.load();
  }

  addToCart(product: Product): void {
    const id = (product.id || product._id) as string;
    this.cartStore.addProduct(id);
  }

  handleToggleWishlist(id: string | number): void {
    this.wishlistStore.toggleWishlist(id);
  }

  trackById(index: number, item: any): string {
    return item.id || item._id;
  }
}
