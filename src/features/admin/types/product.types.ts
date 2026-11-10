export interface FurnitureColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductDimensions {
  width: string;
  depth: string;
  height: string;
  seatHeight?: string;
  weight?: string;
}

export type ProductBadge = 'New' | 'Best Seller' | '20% Off' | 'Crafted to Order';
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT';

export interface Product {
  id: string;
  productId?: string;
  uniqueId?: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  room: string;
  roomLabel?: string;
  collectionSlug?: string;
  collectionName?: string;
  price: number;
  basePrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription?: string;
  materials: string[];
  dimensions: ProductDimensions;
  colors: FurnitureColor[];
  sizes: string[];
  badges?: ProductBadge[];
  inStock: boolean;
  imageUrl?: string;
  images: string[];
  lifestyleImages?: string[];
  careInstructions?: string;
  warranty?: string;
  leadTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  id?: string;
  productId?: string;
  uniqueId?: string;
  name: string;
  slug?: string;
  category: string;
  categoryLabel?: string;
  room: string;
  roomLabel?: string;
  collectionSlug?: string;
  collectionName?: string;
  price: number;
  basePrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating?: number;
  reviewCount?: number;
  shortDescription?: string;
  fullDescription?: string;
  materials?: string[];
  dimensions: ProductDimensions;
  colors?: FurnitureColor[];
  sizes?: string[];
  badges?: ProductBadge[];
  inStock?: boolean;
  images?: string[];
  lifestyleImages?: string[];
  careInstructions?: string;
  warranty?: string;
  leadTime?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductApiResponse<T = Product> {
  message: string;
  data: T;
}

export type ProductStatusFilter = 'ALL' | 'IN_STOCK' | 'OUT_OF_STOCK';
export type ProductSortField = 'name' | 'price' | 'rating' | 'category' | 'createdAt';
