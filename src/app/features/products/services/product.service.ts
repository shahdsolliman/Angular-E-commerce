import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';
import { Product, ApiResponse } from '../models/product.model';
import { Category } from '../../categories/categories.interface';
import { QueryParameters } from '../../../core/interfaces/shared.interface';

/**
 * ── ARCHITECTURE: PRODUCT API LAYER ──────────────────────────────────────
 * Exclusive responsibility for network communication with Product artifacts.
 */
@Injectable({ providedIn: 'root' })
export class ProductApiService extends BaseHttpService {
  
  getProducts(params: QueryParameters): Observable<ApiResponse<Product[]>> {
    return this.get<ApiResponse<Product[]>>(API_ENDPOINTS.PRODUCTS.BASE, params);
  }

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.BASE);
  }

  getProductById(id: string | number): Observable<ApiResponse<Product>> {
    return this.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  }

  getProductReviews(productId: string | number): Observable<any> {
    return this.get(API_ENDPOINTS.PRODUCTS.REVIEWS(productId));
  }

  addReview(productId: string | number, reviewData: { review: string, rating: number }): Observable<any> {
    return this.post(API_ENDPOINTS.PRODUCTS.REVIEWS(productId), reviewData);
  }
}
