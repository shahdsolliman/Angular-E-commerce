import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistStore } from '../../stores/wishlist.store';
import { CartStore } from '../../../cart/stores/cart.store';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { Product } from '../../../products/models/product.model';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, ProductCardComponent],
  template: `
    <main class="min-h-screen pt-32 pb-24 bg-background">
      <div class="container-app">
        <header class="mb-12 animate-reveal">
          <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">
            <span class="w-8 h-[1px] bg-accent"></span>
            <span>Curated Desires</span>
          </div>
          <h1 class="text-5xl font-bold tracking-tighter text-primary">My <span class="italic font-serif font-normal">Wishlist</span></h1>
        </header>

        @if (isLoading()) {
          <div class="flex justify-center py-40">
            <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        } @else if (items().length === 0) {
          <div class="bg-surface rounded-[2rem] border border-outline-variant p-20 text-center animate-reveal">
            <h2 class="text-2xl font-bold text-primary mb-4">Your wishlist is empty</h2>
            <p class="text-on-surface-variant font-light mb-8">Save items you love to keep track of them.</p>
            <button routerLink="/products" class="btn-primary">Explore Collection</button>
          </div>
        } @else {
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            @for (product of items(); track product._id) {
              <app-product-card 
                [product]="product"
                [isFavorite]="true"
                (addToCart)="addToCart($event)"
                (toggleWishlist)="handleToggleFavorite($event)"
              />
            }
          </div>
        }
      </div>
    </main>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class WishlistPageComponent implements OnInit {
  private readonly wishlistStore = inject(WishlistStore);
  private readonly cartStore = inject(CartStore);

  readonly items = this.wishlistStore.wishlistItems;
  readonly isLoading = this.wishlistStore.isLoading;

  ngOnInit(): void {
    this.wishlistStore.load();
  }

  addToCart(product: Product): void {
    const id = (product.id || product._id) as string;
    this.cartStore.addProduct(id);
  }

  handleToggleFavorite(id: string | number): void {
    this.wishlistStore.toggleWishlist(id);
  }
}
