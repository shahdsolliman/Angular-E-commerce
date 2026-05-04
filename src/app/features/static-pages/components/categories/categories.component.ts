import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductStore } from '../../../products/stores/product.store';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private readonly store = inject(ProductStore);

  /** Real categories fetched from the Store */
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  
  constructor() {
    this.store.loadCategories();
  }
}
