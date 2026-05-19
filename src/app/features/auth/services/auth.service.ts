import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';
import { AuthResponse, SigninData, SignupData } from '../auth.interface';

/**
 * ── ARCHITECTURE: AUTH API LAYER ──────────────────────────────────────────
 * Exclusive responsibility for network communication with RouteMisr Identity endpoints.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseHttpService {
  
  signup(data: SignupData): Observable<AuthResponse> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, data);
  }

  signin(data: SigninData): Observable<AuthResponse> {
    // ── GUEST BYPASS ──────────────────────────────────────────────────────
    if (data.email === 'guest@snapshop.com') {
      return of({
        message: 'success',
        token: 'mock-jwt-token',
        user: { name: 'Guest User', email: data.email, role: 'user' }
      });
    }
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  verifyResetCode(resetCode: string): Observable<any> {
    return this.post(API_ENDPOINTS.AUTH.VERIFY_CODE, { resetCode });
  }
}
