import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { STORED_KEYS } from '../../../core/constants/storedkeys';
import { AuthResponse, SigninData, SignupData, User } from '../auth.interface';
import { AuthApiService } from '../services/auth.service';

/**
 * ── ARCHITECTURE: AUTH STATE STORE ──────────────────────────────────────
 * Exclusive responsibility for managing user identity and session persistence.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly api = inject(AuthApiService);
  private readonly router = inject(Router);

  // ── State (Private Signals) ─────────────────────────────────────────────
  private readonly _user = signal<User | null>(null);
  private readonly _authenticated = signal<boolean>(!!localStorage.getItem(STORED_KEYS.TOKEN));

  // ── Selectors (Public Signals) ──────────────────────────────────────────
  readonly currentUser = computed(() => this._user());
  readonly isAuthenticated = computed(() => this._authenticated());

  constructor() {
    this.restoreUser();
  }

  signup(data: SignupData): Observable<AuthResponse> {
    return this.api.signup(data).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  signin(data: SigninData): Observable<AuthResponse> {
    return this.api.signin(data).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  logout(): void {
    localStorage.removeItem(STORED_KEYS.TOKEN);
    localStorage.removeItem(STORED_KEYS.USER);
    this._user.set(null);
    this._authenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(STORED_KEYS.TOKEN);
  }

  private handleAuth(res: AuthResponse): void {
    if (res.token) {
      localStorage.setItem(STORED_KEYS.TOKEN, res.token);
      localStorage.setItem(STORED_KEYS.USER, JSON.stringify(res.user));
      this._user.set(res.user);
      this._authenticated.set(true);
    }
  }

  private restoreUser(): void {
    const userJson = localStorage.getItem(STORED_KEYS.USER);
    if (userJson) {
      this._user.set(JSON.parse(userJson));
    }
  }
}
