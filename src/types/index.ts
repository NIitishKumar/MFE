export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductDimensions {
  width: string;   // e.g. "260 cm"
  depth: string;   // e.g. "115 cm"
  height: string;  // e.g. "76 cm"
  seatHeight?: string; // e.g. "43 cm"
  weight?: string; // e.g. "78 kg"
}

export type ProductBadge = 'New' | 'Best Seller' | '20% Off' | 'Crafted to Order';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'sofas' | 'beds' | 'dining' | 'chairs' | 'tables' | 'storage' | 'decor' | string;
  categoryLabel?: string;
  room: 'living-room' | 'bedroom' | 'dining-room' | 'home-office' | 'outdoor' | string;
  roomLabel?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription: string;
  materials: string[];
  dimensions: ProductDimensions;
  colors: ProductColor[];
  sizes: string[];
  badges?: ProductBadge[];
  inStock: boolean;
  images: string[];
  lifestyleImages?: string[];
  careInstructions?: string;
  warranty?: string;
  leadTime?: string;
  collectionSlug?: string;
  collectionName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  room: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  secondaryImage: string;
  productsCount: number;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ProductFiltersMeta {
  categories: string[];
  rooms: string[];
  materials: string[];
  colors: string[];
  sizes?: string[];
  badges?: string[];
  minPrice: number;
  maxPrice: number;
  totalProducts: number;
}

export interface FetchProductsResponse {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: Address;
  deliveryMethod: 'standard' | 'white-glove' | 'express';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  trackingSteps: TrackingStep[];
  paymentStatus: 'Paid' | 'Pending';
  estimatedDelivery: string;
}

export interface ConsultationBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  roomType: string;
  approximateBudget: string;
  message: string;
  createdAt: string;
  status: 'Received' | 'Confirmed';
}

export interface ShowroomBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  showroomLocation: 'Bengaluru - Indiranagar' | 'Mumbai - Worli';
  preferredDate: string;
  preferredTime: string;
  guestsCount: number;
  createdAt: string;
  status: 'Confirmed';
}

export interface FilterState {
  search: string;
  category: string;
  room: string;
  collectionSlug?: string;
  minPrice: number;
  maxPrice: number;
  materials: string[];
  colors: string[];
  sizes: string[];
  availability: 'all' | 'in-stock' | 'made-to-order';
  badge?: string;
  rating: number; // 0 means all
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}
