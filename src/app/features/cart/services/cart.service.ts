import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';
import { CartResponse } from '../cart.interface';
import { ShippingAddress, CheckoutResponse } from '../../payment/payment.interface';

/**
 * ── ARCHITECTURE: CART API LAYER ──────────────────────────────────────────
 * Exclusive responsibility for network communication with RouteMisr Basket and Order endpoints.
 */
@Injectable({ providedIn: 'root' })
export class CartApiService extends BaseHttpService {

  getCart(): Observable<CartResponse> {
    return this.get<CartResponse>(API_ENDPOINTS.CART.BASE);
  }

  addToCart(productId: string): Observable<any> {
    return this.post(API_ENDPOINTS.CART.BASE, { productId });
  }

  updateQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.put<CartResponse>(API_ENDPOINTS.CART.ITEM(productId), { count });
  }

  removeFromCart(productId: string): Observable<CartResponse> {
    return this.delete<CartResponse>(API_ENDPOINTS.CART.ITEM(productId));
  }

  clearCart(): Observable<any> {
    return this.delete(API_ENDPOINTS.CART.BASE);
  }

  checkoutCash(cartId: string, shippingAddress: ShippingAddress): Observable<any> {
    return this.post(API_ENDPOINTS.ORDERS.CASH(cartId), { shippingAddress });
  }

  checkoutOnline(cartId: string, shippingAddress: ShippingAddress): Observable<CheckoutResponse> {
    const successUrl = window.location.origin + '/home';
    return this.post<CheckoutResponse>(API_ENDPOINTS.ORDERS.CHECKOUT_SESSION(cartId, successUrl), { shippingAddress }).pipe(
      tap((res) => {
        if (res.status === 'success' && res.session) {
          window.location.href = res.session.url;
        }
      })
    );
  }
}
