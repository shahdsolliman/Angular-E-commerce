import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type" 
      [disabled]="disabled" 
      [class]="'btn ' + variant + ' ' + size + ' ' + customClass"
      (click)="onClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      outline: none;
      gap: 0.5rem;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .primary {
      background: linear-gradient(45deg, #6366f1, #a855f7);
      color: white;
    }
    .primary:hover:not(:disabled) {
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
      transform: scale(1.02);
    }
    .outline {
      background: transparent;
      border: 1px solid #6366f1;
      color: #6366f1;
    }
    .outline:hover:not(:disabled) {
      background: rgba(99, 102, 241, 0.1);
    }
    .danger {
      background: #ef4444;
      color: white;
    }
    .sm { padding: 0.4rem 0.8rem; font-size: 0.875rem; }
    .md { padding: 0.75rem 1.5rem; font-size: 1rem; }
    .lg { padding: 1rem 2rem; font-size: 1.125rem; }
  `]
})
export class SharedButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() customClass = '';
  
  @Output() btnClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
