import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../../features/categories/categories.interface';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div 
      [routerLink]="['/products']" 
      [queryParams]="{ category: category._id }"
      class="group relative overflow-hidden cursor-pointer bg-secondary aspect-square flex items-center justify-center transition-all duration-700"
    >
      <img 
        [src]="category.image" 
        [alt]="category.name"
        class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
      >
      <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
      
      <div class="relative z-10 text-center p-4">
        <h3 class="text-white text-xl md:text-2xl font-serif italic tracking-wider mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {{ category.name }}
        </h3>
        <span class="text-white/80 text-[10px] uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
          Shop Now
        </span>
      </div>
      
      <!-- Border Overlay -->
      <div class="absolute inset-4 border border-white/20 pointer-events-none group-hover:border-white/60 transition-colors duration-500"></div>
    </div>
  `
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: Category;
}
