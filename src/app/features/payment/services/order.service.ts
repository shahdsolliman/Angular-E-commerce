import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';

export interface Order {
  _id: string;
  user: any;
  cartItems: any[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrderApiService extends BaseHttpService {
  
  getUserOrders(userId: string): Observable<Order[]> {
    return this.get<Order[]>(API_ENDPOINTS.ORDERS.USER_ORDERS(userId));
  }

  getAllOrders(): Observable<any> {
    return this.get(API_ENDPOINTS.ORDERS.ALL_ORDERS);
  }
}
