import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap, catchError, finalize } from 'rxjs';
import { CartResponse, CartSummary } from '../cart.interface';
import { CartApiService } from '../services/cart.service';
import { NotificationService } from '../../../core/services/utilities/notification.service';
import { LoggerService } from '../../../core/services/utilities/logger.service';

/**
 * ── ARCHITECTURE: CART STATE STORE ──────────────────────────────────────
 * Exclusive responsibility for managing the reactive state of the user's basket.
 */
@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly api = inject(CartApiService);
  private readonly notifier = inject(NotificationService);
  private readonly logger = inject(LoggerService);

  private readonly _cart = signal<CartResponse | null>(null);
  private readonly _loading = signal(false);

  readonly cart = computed(() => this._cart());
  readonly items = computed(() => this._cart()?.data.products || []);
  readonly itemCount = computed(() => this._cart()?.numOfCartItems || 0);
  readonly isLoading = computed(() => this._loading());
  
  readonly summary = computed<CartSummary>(() => {
    const data = this._cart();
    const subtotal = data?.data.totalCartPrice || 0;
    return {
      subtotal,
      shipping: subtotal > 0 ? 50 : 0,
      tax: 0,
      total: subtotal > 0 ? subtotal + 50 : 0,
      itemCount: data?.numOfCartItems || 0
    };
  });

  /**
   * Synchronizes the local basket state with the remote source.
   */
  load(): void {
    this._loading.set(true);
    this.api.getCart().pipe(
      tap(res => this._cart.set(res)),
      catchError(err => {
        this.logger.error('Failed to synchronize cart state', err);
        this._cart.set(null);
        return [];
      }),
      finalize(() => this._loading.set(false))
    ).subscribe();
  }

  /**
   * Adds a product to the basket with real-time feedback.
   */
  addProduct(productId: string): void {
    this._loading.set(true);
    this.api.addToCart(productId).subscribe({
      next: () => {
        this.load();
        this.notifier.success('Item curated into your basket.');
      },
      error: (err) => {
        this.logger.error('Add to cart failed', err);
        this.notifier.error('Failed to add item. Please try again.');
        this._loading.set(false);
      }
    });
  }

  updateQuantity(productId: string, count: number): void {
    this._loading.set(true);
    this.api.updateQuantity(productId, count).subscribe({
      next: (res) => {
        this._cart.set(res);
        this.notifier.info('Basket updated.');
      },
      error: (err) => {
        this.logger.error('Update quantity failed', err);
        this.notifier.error('Update failed.');
      },
      complete: () => this._loading.set(false)
    });
  }

  removeItem(productId: string): void {
    this._loading.set(true);
    this.api.removeFromCart(productId).subscribe({
      next: (res) => {
        this._cart.set(res);
        this.notifier.success('Item removed from basket.');
      },
      error: (err) => {
        this.logger.error('Remove item failed', err);
        this.notifier.error('Removal failed.');
      },
      complete: () => this._loading.set(false)
    });
  }

  clear(): void {
    this._loading.set(true);
    this.api.clearCart().subscribe({
      next: () => {
        this._cart.set(null);
        this.notifier.info('Basket cleared.');
      },
      error: (err) => {
        this.logger.error('Clear cart failed', err);
      },
      complete: () => this._loading.set(false)
    });
  }
}
