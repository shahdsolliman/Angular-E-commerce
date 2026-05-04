import { Injectable, isDevMode } from '@angular/core';

/**
 * ── ARCHITECTURE: LOGGING INFRASTRUCTURE ──────────────────────────────────
 * Centralized logging to prevent console pollution in production.
 * In a real production app, this would send logs to Sentry, LogRocket, or Datadog.
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  
  log(message: any, ...args: any[]): void {
    if (isDevMode()) {
      console.log(`[LOG]: ${message}`, ...args);
    }
  }

  error(message: any, ...args: any[]): void {
    // Logic: In production, send to remote logging service
    console.error(`[ERROR]: ${message}`, ...args);
  }

  warn(message: any, ...args: any[]): void {
    if (isDevMode()) {
      console.warn(`[WARN]: ${message}`, ...args);
    }
  }

  debug(message: any, ...args: any[]): void {
    if (isDevMode()) {
      console.debug(`[DEBUG]: ${message}`, ...args);
    }
  }
}
