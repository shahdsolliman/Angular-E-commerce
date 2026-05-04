import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap, catchError, finalize } from 'rxjs';
import { WishlistResponse } from '../wishlist.interface';
import { WishlistApiService } from '../services/wishlist.service';
import { NotificationService } from '../../../core/services/utilities/notification.service';
import { LoggerService } from '../../../core/services/utilities/logger.service';

/**
 * ── ARCHITECTURE: WISHLIST STATE STORE ────────────────────────────────────
 * Manages the reactive state of the user's favorite artifacts.
 */
@Injectable({ providedIn: 'root' })
export class WishlistStore {
  private readonly api = inject(WishlistApiService);
  private readonly notifier = inject(NotificationService);
  private readonly logger = inject(LoggerService);

  private readonly _wishlist = signal<WishlistResponse | null>(null);
  private readonly _loading = signal(false);

  readonly wishlistItems = computed(() => this._wishlist()?.data || []);
  readonly itemCount = computed(() => this._wishlist()?.count || 0);
  readonly isLoading = computed(() => this._loading());
  
  readonly favoriteIds = computed(() => new Set(this.wishlistItems().map(p => p.id || p._id)));

  load(): void {
    this._loading.set(true);
    this.api.getWishlist().pipe(
      tap(res => this._wishlist.set(res)),
      catchError(err => {
        this.logger.error('Wishlist load failed', err);
        this._wishlist.set(null);
        return [];
      }),
      finalize(() => this._loading.set(false))
    ).subscribe();
  }

  toggleWishlist(productId: string | number): void {
    this._loading.set(true);
    const isFavorite = this.favoriteIds().has(productId as string);
    
    const request = isFavorite 
      ? this.api.removeFromWishlist(productId)
      : this.api.addToWishlist(productId);
      
    request.pipe(
      tap(() => {
        this.load();
        this.notifier.info(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      }),
      catchError(err => {
        this.logger.error('Wishlist toggle failed', err);
        this.notifier.error('Favorite sync failed.');
        return [];
      }),
      finalize(() => this._loading.set(false))
    ).subscribe();
  }
}
