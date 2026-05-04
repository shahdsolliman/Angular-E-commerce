import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  duration?: number;
}

/**
 * ── ARCHITECTURE: NOTIFICATION SYSTEM ────────────────────────────────────
 * Decoupled toast management for production-grade UX feedback.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  show(message: string, type: NotificationType = 'info', duration: number = 4000): void {
    const id = Date.now();
    const notification: Notification = { id, message, type, duration };
    
    this._notifications.update(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string): void { this.show(message, 'success'); }
  error(message: string): void { this.show(message, 'error'); }
  warn(message: string): void { this.show(message, 'warning'); }
  info(message: string): void { this.show(message, 'info'); }

  remove(id: number): void {
    this._notifications.update(prev => prev.filter(n => n.id !== id));
  }
}
