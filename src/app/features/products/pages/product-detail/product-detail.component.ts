import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../../services/product.service';
import { ProductStore } from '../../stores/product.store';
import { CartStore } from '../../../cart/stores/cart.store';
import { WishlistStore } from '../../../wishlist/stores/wishlist.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';

/**
 * ── ARCHITECTURE: PRODUCT DETAIL ──────────────────────────────────────────
 * Presentational component for single artifact inspection.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ProductApiService);
  private readonly store = inject(ProductStore);
  private readonly cartStore = inject(CartStore);
  public readonly wishlistStore = inject(WishlistStore);

  /** 
   * REACTIVE DATA FETCHING: Adheres to Interface Segregation.
   * Uses toSignal for clean Observable-to-Signal conversion.
   */
  readonly product = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.api.getProductById(id)),
      map(res => this.normalizeProduct(res.data))
    )
  );

  readonly activeImageIndex = signal(0);

  /** Shared review artifacts (Mock) */
  readonly reviews = [
    {
      author: 'A. Thorne',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7dygE3y-aH843DGbGDNvXSJVDGXwQum775ocpks0NrKBqyhclfn_eToeMyOJ1EtbyAMLDxsBOGgo3-91_qfYwQyY1eNMTcA9-WuuU_xEUZ-2KwicI1mqfKmF7XLfZ_zRmsizIg1osp7qLE1WtbH8b4k6TmHu2YQV4Yj1YduXoPUBduCIw_Ph6JXEq1ZUjQKpWNeU2Zur7Z6X8K6LufIv7KP0E9WuvyTajoZncC_S-WLx0Y9iVm2gg6epuwQI71jacKbzsXML9jDRF',
      rating: 5,
      content: '"Exceptional architectural form. The materiality is beyond industry standards."',
      verified: true
    }
  ];

  setActiveImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  getCategoryName(cat: any): string {
    if (!cat) return '';
    return typeof cat === 'object' ? cat.name : cat;
  }

  addToBag(): void {
    const id = this.product()?.id || this.product()?._id;
    if (id) {
      this.cartStore.addProduct(id as string);
    }
  }

  toggleFavorite(): void {
    const id = this.product()?.id || this.product()?._id;
    if (id) {
      this.wishlistStore.toggleWishlist(id as string);
    }
  }

  private normalizeProduct(p: Product): Product {
    return {
      ...p,
      id: p.id || p._id || '',
      image: p.imageCover || p.image,
      ratingsAverage: p.ratingsAverage || 0
    };
  }
}
