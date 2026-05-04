import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandStore } from '../../stores/brand.store';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly store = inject(BrandStore);
  
  readonly brands = this.store.brands;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;

  ngOnInit(): void {
    this.store.loadAll();
  }
}
