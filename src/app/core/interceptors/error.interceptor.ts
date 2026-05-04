import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from '../services/utilities/logger.service';
import { NotificationService } from '../services/utilities/notification.service';

/**
 * ── ARCHITECTURE: GLOBAL ERROR INTERCEPTOR ────────────────────────────────
 * Unified error handling for all API communication.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const logger = inject(LoggerService);
  const notifier = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected artifact failure occurred.';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Operational Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 401:
            errorMessage = 'Session expired. Please re-authenticate.';
            notifier.error(errorMessage);
            router.navigate(['/auth/login']);
            break;
          case 403:
            errorMessage = 'Access denied. Elevate privileges to proceed.';
            notifier.warn(errorMessage);
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            break;
          case 500:
            errorMessage = 'Internal server core failure.';
            notifier.error(errorMessage);
            break;
          default:
            errorMessage = error.error?.message || errorMessage;
        }
      }

      logger.error(`[HTTP ${error.status}]:`, errorMessage);
      
      return throwError(() => ({
        status: error.status,
        message: errorMessage
      }));
    })
  );
};
