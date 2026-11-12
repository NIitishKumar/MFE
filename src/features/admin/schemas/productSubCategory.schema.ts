import { z } from 'zod';
import {
  optionalImageFileSchema,
  validateImageFileIssue,
} from '../utils/imageUploadHelper';

export const productSubCategorySchema = z
  .object({
    categoryId: z
      .string()
      .min(1, 'Please select a parent category')
      .trim(),
    name: z
      .string()
      .min(1, 'Sub-category name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim(),
    slug: z
      .string()
      .min(1, 'Slug is required')
      .min(2, 'Slug must be at least 2 characters')
      .max(100, 'Slug cannot exceed 100 characters')
      .regex(
        /^[a-z0-9-]+$/,
        'Slug must be lowercase alphanumeric and hyphens (e.g. kurtas-and-suits)',
      )
      .transform((val) => val.toLowerCase().trim()),
    image_url: z
      .string()
      .trim()
      .optional()
      .default(''),
    imageFile: optionalImageFileSchema,
    is_active: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    validateImageFileIssue(data.imageFile, 'imageFile', ctx);
  });

export type ProductSubCategoryFormData = z.infer<typeof productSubCategorySchema>;
