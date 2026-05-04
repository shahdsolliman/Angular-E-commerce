import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/utilities/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-20 left-4 right-4 md:left-auto md:right-8 md:top-24 z-[200] flex flex-col gap-3 pointer-events-none items-center md:items-end">
      @for (n of notifications(); track n.id) {
        <div 
          class="pointer-events-auto w-full max-w-[400px] md:min-w-[350px] bg-white rounded-2xl shadow-2xl border border-outline overflow-hidden animate-reveal p-4 flex items-center gap-4 group"
          [ngClass]="{
            'border-l-4 border-l-green-500': n.type === 'success',
            'border-l-4 border-l-red-500': n.type === 'error',
            'border-l-4 border-l-accent': n.type === 'warning',
            'border-l-4 border-l-blue-500': n.type === 'info'
          }"
        >
          <!-- Icon -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            [ngClass]="{
              'bg-green-50 text-green-600': n.type === 'success',
              'bg-red-50 text-red-600': n.type === 'error',
              'bg-amber-50 text-accent': n.type === 'warning',
              'bg-blue-50 text-blue-600': n.type === 'info'
            }"
          >
            @switch (n.type) {
              @case ('success') { <span class="material-symbols-outlined text-xl">check_circle</span> }
              @case ('error') { <span class="material-symbols-outlined text-xl">error</span> }
              @case ('warning') { <span class="material-symbols-outlined text-xl">warning</span> }
              @default { <span class="material-symbols-outlined text-xl">info</span> }
            }
          </div>

          <!-- Content -->
          <div class="flex-grow min-w-0">
            <p class="text-sm font-bold text-primary truncate md:whitespace-normal">{{ n.message }}</p>
            <p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-0.5">{{ n.type }}</p>
          </div>

          <!-- Close -->
          <button (click)="remove(n.id)" class="p-1 hover:bg-surface-container rounded-lg transition-smooth flex-shrink-0">
            <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary">close</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ToastContainerComponent {
  private readonly notifier = inject(NotificationService);
  readonly notifications = this.notifier.notifications;

  remove(id: number): void {
    this.notifier.remove(id);
  }
}
