import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isLoading()" 
      class="loading-overlay" 
      [ngClass]="{'fullscreen': fullscreen, 'inline': !fullscreen}"
      [attr.aria-hidden]="!isLoading()"
      role="progressbar"
      aria-busy="true"
    >
      <div class="loader-container">
        <!-- Professional Minimalist Loader -->
        <div class="spinner">
           <div class="inner-circle"></div>
           <div class="glow"></div>
        </div>
        <div class="loading-text" *ngIf="showText">
          Synchronizing Artifacts
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
      transition: opacity 0.3s ease;
    }

    .fullscreen {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
    }

    .inline {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.4);
    }

    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .spinner {
      position: relative;
      width: 64px;
      height: 64px;
      border: 2px solid rgba(18, 18, 18, 0.05);
      border-radius: 50%;
      border-top-color: var(--color-accent, #D4AF37);
      animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
    }

    .inner-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: var(--color-primary, #121212);
      border-radius: 50%;
    }

    .glow {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
    }

    .loading-text {
      font-family: var(--font-body, sans-serif);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: var(--color-text-main, #121212);
      font-weight: 700;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  `]
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);
  
  @Input() fullscreen = true;
  @Input() showText = true;

  readonly isLoading = this.loadingService.isLoading;
}
