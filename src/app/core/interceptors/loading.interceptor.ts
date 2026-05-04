import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, timer, switchMap, of } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

/**
 * Functional HTTP Interceptor to manage global loading state.
 * Adheres to modern Angular practices (v15+).
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // We show the loader. 
  // UX OPTIMIZATION: Small delay can be added here if desired to avoid flickering for fast requests.
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Small artificial delay could be added here to ensure smooth transitions
      // But for production, we hide immediately when request completes.
      loadingService.hide();
    })
  );
};
