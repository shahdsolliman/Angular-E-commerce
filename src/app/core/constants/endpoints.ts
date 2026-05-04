/**
 * ── ARCHITECTURE: API ENDPOINT REGISTRY ───────────────────────────────────
 * Centralized Single Source of Truth for all API routes.
 * Prevents magic strings and facilitates environment-based path changes.
 */
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    FORGOT_PASSWORD: '/auth/forgotPasswords',
    VERIFY_CODE: '/auth/verifyResetCode',
    RESET_PASSWORD: '/auth/resetPassword',
  },
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string | number) => `/products/${id}`,
    REVIEWS: (productId: string | number) => `/products/${productId}/reviews`,
    ALL_REVIEWS: '/reviews'
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
    SUBCATEGORIES: (id: string) => `/categories/${id}/subcategories`,
  },
  SUBCATEGORIES: {
    BASE: '/subcategories',
    BY_ID: (id: string) => `/subcategories/${id}`,
  },
  BRANDS: {
    BASE: '/brands',
    BY_ID: (id: string) => `/brands/${id}`,
  },
  CART: {
    BASE: '/cart',
    ITEM: (id: string) => `/cart/${id}`,
  },
  ORDERS: {
    CASH: (cartId: string) => `/orders/${cartId}`,
    CHECKOUT_SESSION: (cartId: string, successUrl: string) => 
      `/orders/checkout-session/${cartId}?url=${successUrl}`,
    ALL_ORDERS: '/orders',
    USER_ORDERS: (userId: string) => `/orders/user/${userId}`,
  },
  USER: {
    ADDRESSES: '/addresses',
    WISHLIST: '/wishlist',
  }
} as const;
