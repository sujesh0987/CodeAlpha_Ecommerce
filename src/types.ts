export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: 'Running' | 'Lifestyle' | 'Basketball' | 'Training';
  image: string;
  images: string[];
  sizes: number[]; // e.g., [6, 7, 8, 9, 10, 11] (UK Sizes)
  colors: string[]; // hex codes e.g., ["#000000", "#FFFFFF", "#FF6B00"]
  colorNames: string[]; // e.g., ["Stealth Black", "Hyper White", "Volt Orange"]
  description: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  stock: number;
}

export interface CartItem {
  id: string; // generated as `productId-size-colorHex`
  productId: string;
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
  selectedColorName: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    size: number;
    color: string;
    colorName: string;
  }[];
  shippingDetails: ShippingDetails;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  paymentStatus: 'Pending' | 'Paid';
  totalAmount: number;
  discountApplied: number;
  couponUsed?: string;
  status: 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface User {
  fullName: string;
  email: string;
  isAdmin?: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // percentage value or flat ₹ discount
  minPurchase: number;
}
