import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, map, tap, finalize } from 'rxjs';
import { Brand, BrandResponse, SingleBrandResponse } from '../../interfaces/brand.interface';
import { BaseHttpService } from '../utilities/base-http.service';

/**
 * ── ARCHITECTURE: BRAND API ───────────────────────────────────────────
 * Direct communication with RouteMisr Brand endpoints.
 */
import { API_ENDPOINTS } from '../../constants/endpoints';

/**
 * ── ARCHITECTURE: BRAND API ───────────────────────────────────────────
 * Direct communication with RouteMisr Brand endpoints.
 */
@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseHttpService {

  getAllBrands(): Observable<BrandResponse> {
    return this.get<BrandResponse>(API_ENDPOINTS.BRANDS.BASE);
  }

  getBrandById(id: string): Observable<SingleBrandResponse> {
    return this.get<SingleBrandResponse>(API_ENDPOINTS.BRANDS.BY_ID(id));
  }
}

/**
 * ── ARCHITECTURE: BRAND STORE ──────────────────────────────────────────
 * Reactive State Management for Brands using Angular Signals.
 */
@Injectable({
  providedIn: 'root'
})
export class BrandStore {
  private readonly api = inject(BrandService);

  // ── State (Private Signals) ──────────────────────────────────────────
  private readonly _brands = signal<Brand[]>([]);
  private readonly _selectedBrand = signal<Brand | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // ── Selectors (Public Signals) ────────────────────────────────────────
  readonly brands = computed(() => this._brands());
  readonly selectedBrand = computed(() => this._selectedBrand());
  readonly isLoading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  // ── Actions ──────────────────────────────────────────────────────────
  loadAll(): void {
    if (this._brands().length > 0) return;

    this._loading.set(true);
    this.api.getAllBrands().pipe(
      tap(res => this._brands.set(res.data)),
      finalize(() => this._loading.set(false))
    ).subscribe({
      error: (err) => this._error.set(err.message || 'Failed to sync brand assets')
    });
  }

  loadById(id: string): void {
    this._loading.set(true);
    this._selectedBrand.set(null);
    this.api.getBrandById(id).pipe(
      tap(res => this._selectedBrand.set(res.data)),
      finalize(() => this._loading.set(false))
    ).subscribe({
      error: (err) => this._error.set(err.message || 'Failed to identify brand artifact')
    });
  }
}
