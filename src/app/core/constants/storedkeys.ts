/**
 * ── ARCHITECTURE: STORAGE KEY REGISTRY ───────────────────────────────────
 * Centralized registry for all browser storage keys (LocalStorage/SessionStorage).
 * Prevents key collision and facilitates global storage clearing.
 */
export const STORED_KEYS = {
  TOKEN: 'atelier_secure_token',
  USER: 'atelier_identity_artifact',
  THEME: 'atelier_visual_mode',
  CART: 'atelier_cached_basket',
  LANGUAGE: 'atelier_locale_config',
} as const;
