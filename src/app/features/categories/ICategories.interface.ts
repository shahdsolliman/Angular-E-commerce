/**
 * ── ARCHITECTURE: CATEGORY DOMAIN INTERFACES ─────────────────────────────
 */

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
