import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="customClass">
      <div class="card-header" *ngIf="hasHeader">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="hasFooter">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .card-header {
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .card-body {
      padding: 1.5rem;
      flex-grow: 1;
    }
    .card-footer {
      padding: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  `]
})
export class SharedCardComponent {
  @Input() hasHeader = false;
  @Input() hasFooter = false;
  @Input() customClass = '';
}
