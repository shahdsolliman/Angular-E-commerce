import { Component, inject, signal, HostListener, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../interfaces/nav-item.interface';
import { CartStore } from '../../../features/cart/stores/cart.store';
import { AuthStore } from '../../../features/auth/stores/auth.store';
import { WishlistStore } from '../../../features/wishlist/stores/wishlist.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly cartStore = inject(CartStore);
  private readonly authStore = inject(AuthStore);
  private readonly wishlistStore = inject(WishlistStore);

  /** Authentication state */
  readonly isAuthenticated = this.authStore.isAuthenticated;
  readonly currentUser = this.authStore.currentUser;

  /** Controls mobile menu visibility */
  readonly menuOpen = signal(false);

  /** Controls user profile dropdown visibility */
  readonly userDropdownOpen = signal(false);

  toggleUserDropdown(): void {
    this.userDropdownOpen.update(v => !v);
  }

  logout(): void {
    this.authStore.logout();
    this.userDropdownOpen.set(false);
  }
  
  /** Scroll state for styling */
  isScrolled = false;

  /** Cart item count synchronized with the global CartStore */
  readonly cartCount = this.cartStore.itemCount;

  /** Wishlist item count synchronized with the global WishlistStore */
  readonly wishlistCount = this.wishlistStore.itemCount;

  readonly navItems: NavItem[] = [
    { label: 'Home',       icon: 'home',          route: '/home'       },
    { label: 'Products',   icon: 'grid_view',     route: '/products'   },
    { label: 'Categories', icon: 'category',      route: '/categories' },
    { label: 'Brands',     icon: 'branding_watermark', route: '/brands' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Close menu on Escape key */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
