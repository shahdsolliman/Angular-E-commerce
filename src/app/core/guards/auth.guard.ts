import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../features/auth/stores/auth.store';
import { NotificationService } from '../services/utilities/notification.service';

/**
 * ── ARCHITECTURE: PROTECTION LAYER ───────────────────────────────────────
 * Secures routes against unauthenticated access.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const notifier = inject(NotificationService);

  if (authStore.isAuthenticated()) {
    return true;
  }

  notifier.warn('Authentication required to access this resource.');
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};

/**
 * Prevents logged-in users from accessing login/register pages.
 */
export const guestGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/home']);
};
