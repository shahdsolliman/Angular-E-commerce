import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

/**
 * ── ARCHITECTURE: BASE COMMUNICATION LAYER ─────────────────────────────────
 * Encapsulates common HTTP logic for all API consumers.
 * Adheres to the DRY (Don't Repeat Yourself) principle.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = environment.apiUrl;

  /**
   * Universal GET requester with parameter normalization.
   * @param endpoint The relative path (e.g., '/products')
   * @param params Key-value pairs for query parameters
   */
  protected get<T>(endpoint: string, params: any = {}): Observable<T> {
    const httpParams = this.buildParams(params);
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  /**
   * Universal POST requester.
   */
  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * Universal PUT requester.
   */
  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * Universal DELETE requester.
   */
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * Normalizes raw objects into Angular HttpParams.
   * Handles RouteMisr specific category filters.
   */
  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        // Special case for category filtering in RouteMisr API
        if (key === 'category' && params[key] !== 'All Items') {
          httpParams = httpParams.set('category[in]', params[key]);
        } else if (key !== 'category' || params[key] !== 'All Items') {
           httpParams = httpParams.set(key, params[key]);
        }
      }
    });
    return httpParams;
  }
}
