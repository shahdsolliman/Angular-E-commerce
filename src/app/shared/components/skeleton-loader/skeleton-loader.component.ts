import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ── ARCHITECTURE: SHARED SKELETON LOADER ──────────────────────────────────
 * Reusable placeholder system to improve Perceived Performance.
 * Supports different layout types: 'grid' (products) and 'list' (categories/brands).
 */
@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (type === 'grid') {
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        @for (i of countArray; track i) {
          <div class="space-y-4">
            <div class="aspect-3/4 bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
            <div class="h-4 bg-slate-100 dark:bg-slate-900 rounded w-3/4"></div>
            <div class="h-4 bg-slate-100 dark:bg-slate-900 rounded w-1/4"></div>
          </div>
        }
      </div>
    } @else if (type === 'list') {
      <div class="space-y-6 animate-pulse">
        @for (i of countArray; track i) {
          <div class="flex items-center gap-6 p-4 border border-slate-50 dark:border-slate-900 rounded-3xl">
            <div class="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-slate-100 dark:bg-slate-900 rounded w-1/4"></div>
              <div class="h-3 bg-slate-100 dark:bg-slate-900 rounded w-1/2"></div>
            </div>
          </div>
        }
      </div>
    }
  `
})
export class SkeletonLoaderComponent {
  @Input() type: 'grid' | 'list' = 'grid';
  @Input() count: number = 8;

  get countArray() {
    return Array(this.count).fill(0).map((_, i) => i);
  }
}
