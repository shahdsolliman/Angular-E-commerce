import { Brand } from '../../../core/interfaces/brand.interface';

/**
 * ── ARCHITECTURE: BRANDS FEATURE INTERFACE ────────────────────────────────
 * Feature-specific response wrapper for the Global Brand Archive.
 */
export interface IGetAllBrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Brand[];
}
