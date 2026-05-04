import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  /**
   * Reactive state for loading
   * We use a signal for high-performance updates and seamless integration with templates.
   */
  readonly isLoading = signal<boolean>(false);

  private activeRequests = 0;

  /**
   * Shows the global loader.
   * Increments request counter to handle concurrent API calls.
   */
  show(): void {
    this.activeRequests++;
    this.isLoading.set(true);
  }

  /**
   * Hides the global loader.
   * Decrements request counter and only sets isLoading to false when no requests are pending.
   */
  hide(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      this.isLoading.set(false);
    }
  }

  /**
   * Resets the loading state completely if needed (e.g., on navigation error).
   */
  reset(): void {
    this.activeRequests = 0;
    this.isLoading.set(false);
  }
}
