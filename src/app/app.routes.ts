import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { WishlistPageComponent } from './features/wishlist/pages/wishlist-page/wishlist-page.component';

export const routes: Routes = [
  // ── Auth shell (login, register) ────────────────────────────────────────
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.route').then(m => m.AUTH_ROUTES),
  },

  // ── Main shell (navbar + footer) ────────────────────────────────────────
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      // Home
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES),
      },

      // Products
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then((m) => m.PRODUCT_ROUTES),
      },

      // Cart (Protected)
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/cart/components/cart-details/cart.component').then(
            (m) => m.CartComponent,
          ),
      },

      // Checkout (Protected)
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/payment/components/checkout/checkout.component').then(
            (m) => m.CheckoutComponent,
          ),
      },
      // Categories browsing
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/pages/categories-page/categories-page.component').then(
            (m) => m.CategoriesPageComponent,
          ),
      },
      // Brands
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/components/brands-list/brands.component').then(
            (m) => m.BrandsComponent,
          ),
      },
      // My Account (Protected)
      {
        path: 'account',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/auth/pages/account-page/account-page.component').then(
            (m) => m.AccountPageComponent,
          ),
      },
      { path: 'profile', redirectTo: 'account' },
      { path: 'orders', redirectTo: 'account' },
      {
        path: 'wishlist',
        canActivate: [authGuard],
        component: WishlistPageComponent
      },
    ],
  },

  // ── Static / system pages (no shell) ────────────────────────────────────
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },

  // ── Wildcard ─────────────────────────────────────────────────────────────
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
