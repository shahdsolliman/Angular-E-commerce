import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../features/products/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="group relative card-premium flex flex-col h-full animate-reveal">
      <!-- Image Section with Hover Zoom -->
      <div class="relative overflow-hidden aspect-[4/5] bg-surface-container">
        <img 
          [src]="product.imageCover || product.image" 
          [alt]="product.title || product.name"
          class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        >
        
        <!-- Overlay Badges -->
        <div class="absolute top-4 left-4 flex flex-col gap-2">
          @if (product.isNew) {
            <span class="bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              New
            </span>
          }
          @if (product.discountPrice) {
            <span class="bg-secondary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              Sale
            </span>
          }
        </div>

        <!-- Wishlist Button -->
        <button 
          (click)="$event.stopPropagation(); toggleWishlist.emit(product.id || product._id || '')"
          class="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth group-hover:opacity-100 group-hover:translate-y-0 shadow-lg z-10"
          [class.opacity-0]="!isFavorite"
          [class.translate-y-2]="!isFavorite"
          [class.text-secondary]="isFavorite"
          [class.text-primary]="!isFavorite"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="w-5 h-5 transition-transform group-active:scale-125" 
            [attr.fill]="isFavorite ? 'currentColor' : 'none'" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <!-- Quick Add (Bottom Slide) -->
        <button 
          (click)="$event.stopPropagation(); addToCart.emit(product)"
          class="absolute bottom-0 left-0 right-0 py-4 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-smooth hover:bg-primary shadow-[0_-10px_20px_rgba(148,59,46,0.2)]"
        >
          Add to Bag
        </button>
      </div>

      <!-- Content Section -->
      <div class="p-5 flex flex-col flex-grow">
        <div class="flex justify-between items-start gap-3 mb-2">
          <h3 class="text-sm font-display font-medium text-on-surface group-hover:text-accent transition-smooth line-clamp-1">
            <a [routerLink]="['/product', product.id || product._id]">
              {{ product.title || product.name }}
            </a>
          </h3>
          <div class="flex flex-col items-end">
            <span class="text-sm font-bold text-primary">{{ product.price | currency:'GBP' }}</span>
            @if (product.discountPrice) {
              <span class="text-[10px] text-text-muted line-through">{{ product.discountPrice | currency:'GBP' }}</span>
            }
          </div>
        </div>

        <div class="mt-auto pt-3 border-t border-outline-variant flex items-center justify-between">
          <!-- Rating -->
          <div class="flex items-center gap-0.5">
            <div class="flex text-[10px] text-accent">
              @for (star of [1,2,3,4,5]; track star; let i = $index) {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" [class.fill-accent]="i < (product.ratingsAverage || 0)" [class.fill-outline]="i >= (product.ratingsAverage || 0)" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            </div>
            <span class="text-[10px] text-text-muted font-medium">({{ product.ratingsQuantity || 0 }})</span>
          </div>
          
          <div class="flex flex-col gap-1">
            <span class="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest block">
              {{ getCategoryName(product.category) }}
            </span>
            @if (product.sold) {
              <span class="text-[8px] text-accent font-bold uppercase tracking-widest">
                Sold {{ product.sold }}
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() isFavorite = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() toggleWishlist = new EventEmitter<string | number>();

  getCategoryName(cat: any): string {
    if (!cat) return 'Collection';
    return typeof cat === 'object' ? cat.name : cat;
  }
}
