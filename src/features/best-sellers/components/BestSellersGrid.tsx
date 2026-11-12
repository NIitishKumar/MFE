'use client';

import React from 'react';
import { ProductShelfGrid } from '@/features/product-shelf';
import {
  type BestSellersGridProps,
  BEST_SELLERS_COPY,
} from '../index';

/**
 * Pure presentational grid for Best Sellers items with loading skeletons,
 * empty/error feedback, and pagination controls (?limit=&page=).
 */
export const BestSellersGrid: React.FC<BestSellersGridProps> = (props) => {
  return <ProductShelfGrid copy={BEST_SELLERS_COPY} {...props} />;
};

