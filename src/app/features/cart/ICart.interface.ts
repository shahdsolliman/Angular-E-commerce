import { Product } from '../products/models/product.model';

/**
 * ── ARCHITECTURE: CART DOMAIN INTERFACES ────────────────────────────────
 */

export interface CartProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  category: any;
  brand: any;
  ratingsAverage: number;
  price: number;
}

export interface CartItem {
  _id?: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}
