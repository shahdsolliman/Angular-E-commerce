import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-group" [ngClass]="customClass">
      <label *ngIf="label" [for]="id" class="label">{{ label }}</label>
      <div class="input-wrapper">
        <input 
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          (input)="onInput($event)"
          [disabled]="disabled"
          class="input"
          [ngClass]="{'has-error': error}"
        />
        <span *ngIf="icon" class="icon-slot">
            <ng-content select="[icon]"></ng-content>
        </span>
      </div>
      <small *ngIf="error" class="error-text">{{ error }}</small>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1.25rem;
      width: 100%;
    }
    .label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: white;
      transition: all 0.2s ease;
      outline: none;
    }
    .input:focus {
      border-color: #6366f1;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
    .has-error {
      border-color: #ef4444 !important;
    }
    .error-text {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      display: block;
    }
    .icon-slot {
        position: absolute;
        right: 1rem;
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.4);
    }
  `]
})
export class SharedInputComponent {
  @Input() id = 'input-' + Math.random().toString(36).substring(2, 9);
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value: any = '';
  @Input() disabled = false;
  @Input() error = '';
  @Input() customClass = '';
  @Input() icon = false;

  @Output() valueChange = new EventEmitter<any>();

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.valueChange.emit(val);
  }
}
