import { Injectable, inject, signal, computed } from '@angular/core';
import { tap, finalize } from 'rxjs';
import { Category } from '../categories.interface';
import { CategoryApiService } from '../services/category.service';

/**
 * ── ARCHITECTURE: CATEGORY STATE STORE ───────────────────────────────────
 * Exclusive responsibility for managing the reactive state of Category artifacts.
 */
@Injectable({ providedIn: 'root' })
export class CategoryStore {
  private readonly api = inject(CategoryApiService);

  // ── State (Private Signals) ──────────────────────────────────────────
  private readonly _categories = signal<Category[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // ── Selectors (Public Signals) ────────────────────────────────────────
  readonly categories = computed(() => this._categories());
  readonly isLoading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  // ── Actions ──────────────────────────────────────────────────────────
  loadAll(): void {
    if (this._categories().length > 0) return;

    this._loading.set(true);
    this.api.getAllCategories().pipe(
      tap(cats => this._categories.set(cats)),
      finalize(() => this._loading.set(false))
    ).subscribe({
      error: (err) => this._error.set(err.message || 'Failed to sync categories')
    });
  }
}
