/**
 * ── ARCHITECTURE: PAYMENT & ORDER DOMAIN INTERFACES ────────────────────────
 */

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  user: string;
  cartItems: any[];
  totalOrderPrice: number;
  paymentMethodType: 'card' | 'cash';
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
}

export interface CheckoutResponse {
  status: string;
  session?: {
    url: string;
  };
}
