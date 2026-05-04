import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';
import { Category, Subcategory } from '../categories.interface';

/**
 * ── ARCHITECTURE: CATEGORY API LAYER ─────────────────────────────────────
 * Exclusive responsibility for network communication with RouteMisr Category endpoints.
 */
@Injectable({ providedIn: 'root' })
export class CategoryApiService extends BaseHttpService {

  getAllCategories(): Observable<Category[]> {
    return this.get<{ data: Category[] }>(API_ENDPOINTS.CATEGORIES.BASE).pipe(
      map(res => res.data)
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.get<{ data: Category }>(API_ENDPOINTS.CATEGORIES.BY_ID(id)).pipe(
      map(res => res.data)
    );
  }

  getSubcategories(categoryId: string): Observable<Subcategory[]> {
    return this.get<{ data: Subcategory[] }>(API_ENDPOINTS.CATEGORIES.SUBCATEGORIES(categoryId)).pipe(
      map(res => res.data)
    );
  }
}
