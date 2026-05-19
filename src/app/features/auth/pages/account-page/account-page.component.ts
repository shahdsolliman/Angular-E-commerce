import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from '../../stores/auth.store';
import { User } from '../../auth.interface';
import { OrderApiService, Order } from '../../../payment/services/order.service';
import { AddressApiService, Address } from '../../services/address.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  template: `
    <main class="min-h-screen pt-32 pb-24 bg-background antialiased">
      <div class="container-app">
        
        <!-- Account Header -->
        <header class="mb-12 animate-reveal">
          <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">
            <span class="w-8 h-[1px] bg-accent"></span>
            <span>Private Sanctuary</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 class="text-5xl font-bold tracking-tighter text-primary">My <span class="italic font-serif font-normal">Account</span></h1>
              <p class="text-on-surface-variant font-light mt-2">Welcome back, {{ user()?.name }}.</p>
            </div>
            <button (click)="logout()" class="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-smooth border-b border-secondary/20 pb-1">Sign Out of Session</button>
          </div>
        </header>

        <!-- Tabs Navigation -->
        <div class="flex border-b border-outline-variant mb-12 overflow-x-auto no-scrollbar">
          <button 
            (click)="activeTab.set('profile')"
            [class.border-accent]="activeTab() === 'profile'"
            [class.text-primary]="activeTab() === 'profile'"
            class="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant border-b-2 border-transparent transition-smooth whitespace-nowrap"
          >
            Identity & Addresses
          </button>
          <button 
            (click)="activeTab.set('orders')"
            [class.border-accent]="activeTab() === 'orders'"
            [class.text-primary]="activeTab() === 'orders'"
            class="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant border-b-2 border-transparent transition-smooth whitespace-nowrap"
          >
            Order History
          </button>
        </div>

        <!-- Tab Content -->
        <div class="animate-reveal">
          
          <!-- PROFILE & ADDRESSES TAB -->
          @if (activeTab() === 'profile') {
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <!-- Identity Card -->
              <div class="lg:col-span-1">
                <div class="bg-surface rounded-[2rem] border border-outline-variant p-10 space-y-8">
                  <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-serif">
                    {{ user()?.name?.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Personal Identity</h3>
                    <p class="text-xl font-bold text-primary">{{ user()?.name }}</p>
                    <p class="text-sm text-on-surface-variant font-light">{{ user()?.email }}</p>
                  </div>
                  <div class="pt-6 border-t border-outline-variant">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Account Status</p>
                    <span class="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Verified SnapShop Member</span>
                  </div>
                </div>
              </div>

              <!-- Addresses Section -->
              <div class="lg:col-span-2 space-y-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-bold text-primary">Shipping Addresses</h3>
                  <button class="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-smooth">+ Add New Address</button>
                </div>

                @if (isAddressesLoading) {
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (i of [1,2]; track i) {
                      <div class="h-40 bg-surface-container animate-pulse rounded-2xl"></div>
                    }
                  </div>
                } @else if (addresses.length === 0) {
                  <div class="p-12 bg-surface-container/30 rounded-2xl border border-dashed border-outline text-center">
                    <p class="text-sm text-on-surface-variant font-light">No addresses saved yet.</p>
                  </div>
                } @else {
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (addr of addresses; track addr._id) {
                      <div class="bg-surface p-6 rounded-2xl border border-outline-variant hover:border-accent transition-smooth relative group">
                        <div class="flex justify-between items-start mb-4">
                          <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-surface-container rounded-full">{{ addr.name }}</span>
                          <button class="text-on-surface-variant hover:text-secondary opacity-0 group-hover:opacity-100 transition-smooth">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <p class="text-sm font-bold text-primary mb-1">{{ addr.city }}</p>
                        <p class="text-xs text-on-surface-variant font-light leading-relaxed mb-4">{{ addr.details }}</p>
                        <p class="text-[10px] font-mono text-on-surface-variant/60">{{ addr.phone }}</p>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          }

          <!-- ORDERS TAB -->
          @if (activeTab() === 'orders') {
            @if (isOrdersLoading) {
              <div class="flex justify-center py-40">
                <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            } @else if (orders.length === 0) {
              <div class="bg-surface rounded-[2rem] border border-outline-variant p-20 text-center">
                <h2 class="text-2xl font-bold text-primary mb-4">Your order history is empty</h2>
                <p class="text-on-surface-variant font-light">Explore our curated collection to start your journey.</p>
              </div>
            } @else {
              <div class="space-y-6">
                @for (order of orders; track order._id) {
                  <div class="bg-surface rounded-3xl border border-outline-variant overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-smooth">
                    <div class="p-8 flex flex-col lg:flex-row justify-between gap-8 bg-surface-container/20">
                      <div class="flex gap-12">
                        <div class="space-y-1">
                          <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Reference</p>
                          <p class="text-sm font-bold text-primary">#{{ order._id.slice(-8).toUpperCase() }}</p>
                        </div>
                        <div class="space-y-1">
                          <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Placed On</p>
                          <p class="text-sm font-bold text-primary">{{ order.createdAt | date:'mediumDate' }}</p>
                        </div>
                        <div class="space-y-1">
                          <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Method</p>
                          <p class="text-sm font-bold text-primary uppercase">{{ order.paymentMethodType }}</p>
                        </div>
                      </div>
                      <div class="text-left lg:text-right">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Order Total</p>
                        <p class="text-2xl font-bold text-secondary">{{ order.totalOrderPrice | currency:'EGP ' }}</p>
                      </div>
                    </div>

                    <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      @for (item of order.cartItems; track item._id) {
                        <div class="flex gap-4 items-center">
                          <div class="w-20 h-24 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                            <img [src]="item.product.imageCover" class="w-full h-full object-cover">
                          </div>
                          <div class="space-y-1">
                            <h4 class="text-sm font-bold text-primary leading-tight line-clamp-1">{{ item.product.title }}</h4>
                            <p class="text-[10px] text-on-surface-variant">Quantity: {{ item.count }}</p>
                            <p class="text-xs font-bold text-accent">{{ item.price | currency:'EGP ' }}</p>
                          </div>
                        </div>
                      }
                    </div>

                    <div class="px-8 py-5 bg-surface-container/50 flex flex-wrap gap-8 items-center border-t border-outline-variant">
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" [class.bg-green-500]="order.isPaid" [class.bg-amber-500]="!order.isPaid"></span>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Payment: {{ order.isPaid ? 'Settled' : 'Pending' }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" [class.bg-blue-500]="order.isDelivered" [class.bg-slate-300]="!order.isDelivered"></span>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Logistics: {{ order.isDelivered ? 'Delivered' : 'In Transit' }}</span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class AccountPageComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly orderApi = inject(OrderApiService);
  private readonly addressApi = inject(AddressApiService);
  private readonly route = inject(ActivatedRoute);

  readonly user = this.authStore.currentUser;
  readonly activeTab = signal<'profile' | 'orders'>('profile');

  orders: Order[] = [];
  addresses: Address[] = [];
  isOrdersLoading = true;
  isAddressesLoading = true;

  ngOnInit(): void {
    // Sync tab with URL
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'orders') this.activeTab.set('orders');
      else this.activeTab.set('profile');
    });

    const userId = this.user()?.id || this.user()?._id;
    if (userId) {
      this.loadOrders(userId);
      this.loadAddresses();
    }
  }

  loadOrders(userId: string): void {
    this.orderApi.getUserOrders(userId).subscribe({
      next: (res) => {
        this.orders = res;
        this.isOrdersLoading = false;
      },
      error: () => this.isOrdersLoading = false
    });
  }

  loadAddresses(): void {
    this.addressApi.getAddresses().subscribe({
      next: (res) => {
        this.addresses = res.data;
        this.isAddressesLoading = false;
      },
      error: () => this.isAddressesLoading = false
    });
  }

  logout(): void {
    this.authStore.logout();
  }
}
