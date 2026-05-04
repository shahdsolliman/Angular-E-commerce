import { Component } from '@angular/core';

@Component({
  selector: 'app-product-skeleton',
  standalone: true,
  template: `
    <div class="animate-pulse space-y-4">
      <!-- Image Skeleton -->
      <div class="aspect-[3/4] bg-surface-container rounded-lg"></div>
      
      <!-- Info Skeleton -->
      <div class="space-y-2">
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1 space-y-2">
            <!-- Title -->
            <div class="h-4 bg-surface-container rounded w-3/4"></div>
            <!-- Category -->
            <div class="h-3 bg-surface-container rounded w-1/2"></div>
            <!-- Rating -->
            <div class="h-3 bg-surface-container rounded w-1/3"></div>
          </div>
          <!-- Price -->
          <div class="h-4 bg-surface-container rounded w-12"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProductSkeletonComponent {}
