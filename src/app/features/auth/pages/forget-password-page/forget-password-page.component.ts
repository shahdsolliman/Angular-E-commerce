import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password-page.component.html',
  styleUrl: './forget-password-page.component.css',
})
export class ForgetPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  /** 
   * STEP 1: Request Reset Code (Email)
   * STEP 2: Verify Reset Code
   */
  readonly step = signal<1 | 2>(1);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  readonly codeForm = this.fb.group({
    resetCode: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSendCode(): void {
    if (this.emailForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const email = this.emailForm.value.email as string;

    this.authApi.forgotPassword(email).subscribe({
      next: (res) => {
        this.successMessage.set(res.message || 'Reset code sent to your email.');
        this.step.set(2);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to send reset code.');
        this.isLoading.set(false);
      }
    });
  }

  onVerifyCode(): void {
    if (this.codeForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const code = this.codeForm.value.resetCode as string;

    this.authApi.verifyResetCode(code).subscribe({
      next: () => {
        this.successMessage.set('Code verified successfully.');
        // Redirect to reset password or show next step
        // For now, redirecting to login as a placeholder or we can add step 3
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Invalid or expired reset code.');
        this.isLoading.set(false);
      }
    });
  }
}
