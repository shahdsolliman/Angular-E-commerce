/**
 * ── ARCHITECTURE: CORE SHARED INTERFACES ──────────────────────────────────
 */

export interface QueryParameters {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  category?: string;
  brand?: string;
  [key: string]: any; // Allow for dynamic RouteMisr filters while maintaining baseline safety
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}
