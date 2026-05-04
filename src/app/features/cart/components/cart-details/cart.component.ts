import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly store = inject(CartStore);

  readonly items = this.store.items;
  readonly summary = this.store.summary;
  readonly isLoading = this.store.isLoading;

  ngOnInit(): void {
    this.store.load();
  }

  updateQty(productId: string, currentCount: number, delta: number): void {
    const newCount = currentCount + delta;
    if (newCount >= 1) {
      this.store.updateQuantity(productId, newCount);
    }
  }

  removeItem(productId: string): void {
    this.store.removeItem(productId);
  }

  clearAll(): void {
    this.store.clear();
  }
}
