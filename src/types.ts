
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  code: string;
  discount_type: 'fixed' | 'percentage';
  value: number;
  min_spend: number;
}

export interface CouponResponse {
  valid: boolean;
  coupon?: Coupon;
  message: string;
}
