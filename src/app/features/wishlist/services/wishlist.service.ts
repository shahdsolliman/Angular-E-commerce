import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';
import { WishlistResponse } from '../wishlist.interface';

/**
 * ── ARCHITECTURE: WISHLIST API LAYER ──────────────────────────────────────
 * Handles network communication for user's favorite artifacts.
 */
@Injectable({ providedIn: 'root' })
export class WishlistApiService extends BaseHttpService {
  
  getWishlist(): Observable<WishlistResponse> {
    return this.get<WishlistResponse>(API_ENDPOINTS.USER.WISHLIST);
  }

  addToWishlist(productId: string | number): Observable<any> {
    return this.post(API_ENDPOINTS.USER.WISHLIST, { productId });
  }

  removeFromWishlist(productId: string | number): Observable<any> {
    return this.delete(`${API_ENDPOINTS.USER.WISHLIST}/${productId}`);
  }
}
