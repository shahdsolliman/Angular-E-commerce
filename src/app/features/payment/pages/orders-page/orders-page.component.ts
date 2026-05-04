import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderApiService, Order } from '../../services/order.service';
import { AuthStore } from '../../../auth/stores/auth.store';
import { User } from '../../../auth/auth.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  template: `
    <main class="min-h-screen pt-32 pb-24 bg-background">
      <div class="container-app">
        <header class="mb-12 animate-reveal">
          <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">
            <span class="w-8 h-[1px] bg-accent"></span>
            <span>Transaction History</span>
          </div>
          <h1 class="text-5xl font-bold tracking-tighter text-primary">My <span class="italic font-serif font-normal">Orders</span></h1>
        </header>

        @if (isLoading) {
          <div class="flex justify-center py-40">
            <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        } @else if (orders.length === 0) {
          <div class="bg-surface rounded-[2rem] border border-outline-variant p-20 text-center animate-reveal">
            <h2 class="text-2xl font-bold text-primary mb-4">No orders found</h2>
            <p class="text-on-surface-variant font-light">You haven't placed any orders yet. Start shopping to build your collection.</p>
          </div>
        } @else {
          <div class="space-y-6">
            @for (order of orders; track order._id) {
              <div class="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:shadow-xl transition-smooth animate-reveal">
                <div class="p-8 flex flex-col md:flex-row justify-between gap-8 border-b border-outline-variant bg-surface-container/30">
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Order Reference</p>
                    <p class="text-sm font-bold text-primary">#{{ order._id.slice(-8).toUpperCase() }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date Placed</p>
                    <p class="text-sm font-bold text-primary">{{ order.createdAt | date:'mediumDate' }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Payment Method</p>
                    <p class="text-sm font-bold text-primary uppercase">{{ order.paymentMethodType }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Amount</p>
                    <p class="text-lg font-bold text-secondary">{{ order.totalOrderPrice | currency:'EGP ' }}</p>
                  </div>
                </div>
                
                <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  @for (item of order.cartItems; track item._id) {
                    <div class="flex gap-4">
                      <div class="w-16 h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                        <img [src]="item.product.imageCover" class="w-full h-full object-cover">
                      </div>
                      <div class="space-y-1">
                        <p class="text-xs font-bold text-primary line-clamp-1">{{ item.product.title }}</p>
                        <p class="text-[10px] text-on-surface-variant">Qty: {{ item.count }}</p>
                        <p class="text-xs font-bold text-accent">{{ item.price | currency:'EGP ' }}</p>
                      </div>
                    </div>
                  }
                </div>

                <div class="px-8 py-4 bg-surface-container/50 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" [class.bg-green-500]="order.isPaid" [class.bg-amber-500]="!order.isPaid"></span>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {{ order.isPaid ? 'Payment Confirmed' : 'Payment Pending' }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" [class.bg-blue-500]="order.isDelivered" [class.bg-slate-300]="!order.isDelivered"></span>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {{ order.isDelivered ? 'Delivered' : 'Processing' }}
                    </span>
                  </div>
                </div>
              </div>
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
export class OrdersComponent implements OnInit {
  private readonly orderApi = inject(OrderApiService);
  private readonly authStore = inject(AuthStore);

  orders: Order[] = [];
  isLoading = true;

  ngOnInit(): void {
    const user: User | null = this.authStore.currentUser();
    const id = user?.id || user?._id;
    if (id) {
      this.orderApi.getUserOrders(id).subscribe({
        next: (orders) => {
          this.orders = orders;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else {
      this.isLoading = false;
    }
  }
}
