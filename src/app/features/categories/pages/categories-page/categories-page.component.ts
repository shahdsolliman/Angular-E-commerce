import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryStore } from '../../stores/category.store';
import { Category } from '../../categories.interface';
import { CategoryCardComponent } from '../../../../shared/components/category-card/category-card.component';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  template: `
    <section class="pt-32 pb-40 min-h-screen">
      <div class="container-app">
        <!-- Editorial Header -->
        <header class="max-w-3xl mb-24 space-y-8 animate-reveal">
          <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            <span class="w-8 h-[1px] bg-accent"></span>
            <span>Collections</span>
          </div>
          <h1 class="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
            The <span class="text-accent italic font-serif font-normal">Archive</span>
          </h1>
          <p class="text-lg text-on-surface-variant font-light max-w-xl leading-relaxed">
            Discover our meticulously categorized collections, each representing a unique chapter in our journey of craftsmanship and design.
          </p>
        </header>

        <!-- Interactive Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          @if (isLoading()) {
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="space-y-6">
                <div class="aspect-square bg-surface-container rounded-2xl animate-pulse"></div>
                <div class="h-4 w-1/3 bg-surface-container rounded animate-pulse"></div>
              </div>
            }
          } @else if (error()) {
             <div class="col-span-full py-40 text-center border border-outline-variant rounded-2xl bg-surface-container">
                <p class="text-on-surface-variant text-sm font-medium uppercase tracking-widest">{{ error() }}</p>
                <button (click)="ngOnInit()" class="mt-4 text-accent font-bold uppercase tracking-widest text-[10px]">Retry</button>
             </div>
          } @else {
            @for (cat of categories(); track cat._id) {
              <div class="animate-reveal">
                <app-category-card 
                  [category]="cat"
                  class="rounded-2xl overflow-hidden block shadow-lg hover:shadow-2xl transition-smooth"
                ></app-category-card>
                <div class="mt-6 flex justify-between items-center">
                  <h3 class="text-lg font-bold tracking-tight">{{ cat.name }}</h3>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-text-muted">Explore Collection</span>
                </div>
              </div>
            }
          }
        </div>
      </div>
    </section>
  `
})
export class CategoriesPageComponent implements OnInit {
  private readonly store = inject(CategoryStore);
  
  readonly categories = computed(() => this.store.categories().filter(c => c.name !== 'SuperMarket'));
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;

  ngOnInit(): void {
    this.store.loadAll();
  }
}
