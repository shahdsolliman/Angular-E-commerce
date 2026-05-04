import { Injectable, inject, signal, computed } from '@angular/core';
import { tap, finalize, catchError, throwError, map } from 'rxjs';
import { Product, ApiResponse } from '../models/product.model';
import { Category } from '../../categories/categories.interface';
import { ProductApiService } from '../services/product.service';

/**
 * ── ARCHITECTURE: PRODUCT STATE STORE ──────────────────────────────────────
 * Exclusive responsibility for managing the reactive state of Product artifacts.
 */
@Injectable({ providedIn: 'root' })
export class ProductStore {
  private readonly api = inject(ProductApiService);

  // ── State (Private Writable Signals) ────────────────────────────────────
  private readonly _products = signal<Product[]>([]);
  private readonly _categories = signal<Category[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _pagination = signal<ApiResponse<any>['metadata']>(undefined);

  // ── Selectors (Public Read-Only Computed Signals) ───────────────────────
  readonly products = computed(() => this._products());
  readonly categories = computed(() => this._categories());
  readonly isLoading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly pagination = computed(() => this._pagination());

  // ── High-Performance Derived Selectors (Business Logic) ────────────────
  readonly bestSellers = computed(() => 
    [...this._products()].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 8)
  );

  readonly newArrivals = computed(() => 
    this._products().slice(0, 8)
  );

  readonly featured = computed(() => 
    this._products().slice(8, 16)
  );

  // ── Actions ────────────────────────────────────────────────────────────
  loadProducts(params: any = {}): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getProducts(params).pipe(
      tap(res => {
        this._products.set(this.normalizeProducts(res.data));
        this._pagination.set(res.metadata);
      }),
      catchError(err => {
        this._error.set(err.error?.message || 'Synchronization failed.');
        return throwError(() => err);
      }),
      finalize(() => this._loading.set(false))
    ).subscribe();
  }

  loadCategories(): void {
    this.api.getCategories().pipe(
      map(res => res.data),
      tap(cats => this._categories.set(cats.filter(c => c.name !== 'SuperMarket')))
    ).subscribe();
  }

  private normalizeProducts(products: Product[]): Product[] {
    // ── ATELIER FILTER ──────────────────────────────────────────────────
    // Exclude "SuperMarket" products to maintain premium brand positioning.
    return products
      .filter(p => {
        const catName = typeof p.category === 'object' ? p.category.name : p.category;
        return catName !== 'SuperMarket';
      })
      .map(p => ({
        ...p,
        id: p.id || p._id || '',
        image: p.imageCover || p.image,
        ratingsAverage: p.ratingsAverage || 0
      }));
  }
}
