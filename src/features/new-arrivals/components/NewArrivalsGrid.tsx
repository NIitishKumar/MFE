'use client';

import React from 'react';
import { ProductShelfGrid } from '@/features/product-shelf';
import {
  type NewArrivalsGridProps,
  NEW_ARRIVALS_COPY,
} from '../index';

/**
 * Pure presentational grid for New Arrivals items with loading skeletons,
 * empty/error feedback, and pagination controls (?limit=&page=).
 */
export const NewArrivalsGrid: React.FC<NewArrivalsGridProps> = (props) => {
  return <ProductShelfGrid copy={NEW_ARRIVALS_COPY} {...props} />;
};
