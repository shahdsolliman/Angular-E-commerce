/**
 * ── ARCHITECTURE: STORAGE KEY REGISTRY ───────────────────────────────────
 * Centralized registry for all browser storage keys (LocalStorage/SessionStorage).
 * Prevents key collision and facilitates global storage clearing.
 */
export const STORED_KEYS = {
  TOKEN: 'snapshop_secure_token',
  USER: 'snapshop_identity_artifact',
  THEME: 'snapshop_visual_mode',
  CART: 'snapshop_cached_basket',
  LANGUAGE: 'snapshop_locale_config',
} as const;
