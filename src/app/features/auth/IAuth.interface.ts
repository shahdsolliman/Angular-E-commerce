/**
 * ── ARCHITECTURE: AUTH DOMAIN INTERFACES ──────────────────────────────────
 */

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface SigninData {
  email: string;
  password?: string; // Optional for mock/social flows
}

export interface SignupData extends SigninData {
  name: string;
  rePassword?: string;
  phone?: string;
}
