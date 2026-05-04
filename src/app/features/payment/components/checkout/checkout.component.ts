import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartApiService } from '../../../cart/services/cart.service';
import { CartStore } from '../../../cart/stores/cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly api = inject(CartApiService);
  private readonly store = inject(CartStore);

  readonly cart = this.store.cart;
  readonly cartSummary = this.store.summary;
  readonly cartItems = this.store.items;
  
  readonly isProcessing = signal(false);
  readonly selectedPayment = signal<'card' | 'cod'>('card');
  readonly shippingForm: FormGroup;

  constructor() {
    this.shippingForm = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.cartItems().length === 0) {
      this.store.load();
    }
  }

  setPaymentMethod(method: 'card' | 'cod'): void {
    this.selectedPayment.set(method);
  }

  onCompletePurchase(): void {
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      return;
    }

    const cartId = this.cart()?.data._id;
    if (!cartId) return;

    this.isProcessing.set(true);
    const shippingAddress = this.shippingForm.value;

    const request = this.selectedPayment() === 'cod' 
      ? this.api.checkoutCash(cartId, shippingAddress)
      : this.api.checkoutOnline(cartId, shippingAddress);

    request.subscribe({
      next: () => {
        if (this.selectedPayment() === 'cod') {
          this.store.clear();
          this.router.navigate(['/home']);
        }
      },
      error: () => this.isProcessing.set(false),
      complete: () => this.isProcessing.set(false)
    });
  }
}
