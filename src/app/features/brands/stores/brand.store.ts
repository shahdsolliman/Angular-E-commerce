import { Injectable, inject, signal, computed } from '@angular/core';
import { tap, finalize } from 'rxjs';
import { Brand } from '../brands.interface';
import { BrandApiService } from '../services/brand.service';

/**
 * ── ARCHITECTURE: BRAND STATE STORE ──────────────────────────────────────
 * Exclusive responsibility for managing the reactive state of Brand artifacts.
 */
@Injectable({
  providedIn: 'root'
})
export class BrandStore {
  private readonly api = inject(BrandApiService);

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
