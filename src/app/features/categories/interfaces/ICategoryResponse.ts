import { Category } from '../categories.interface';

/**
 * ── ARCHITECTURE: CATEGORIES FEATURE INTERFACE ───────────────────────────
 */
export interface ICategoryResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Category[];
}
