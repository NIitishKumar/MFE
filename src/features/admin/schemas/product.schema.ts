import { z } from 'zod';
import {
  optionalImageFileSchema,
  validateImageFileIssue,
} from '../utils/imageUploadHelper';

export const productSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Product name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(120, 'Name cannot exceed 120 characters')
      .trim(),
    slug: z
      .string()
      .max(120, 'Slug cannot exceed 120 characters')
      .regex(/^[a-z0-9-]*$/, 'Slug must be lowercase alphanumeric and dashes')
      .optional()
      .default(''),
    category: z
      .string()
      .min(1, 'Please select a furniture category')
      .trim(),
    categoryLabel: z.string().optional().default(''),
    room: z
      .string()
      .min(1, 'Please select a room')
      .trim(),
    roomLabel: z.string().optional().default(''),
    collectionSlug: z.string().optional().default(''),
    collectionName: z.string().optional().default(''),
    price: z
      .coerce
      .number()
      .min(0, 'Price cannot be negative'),
    originalPrice: z
      .coerce
      .number()
      .min(0)
      .optional(),
    discountPercentage: z
      .coerce
      .number()
      .min(0)
      .max(100)
      .optional(),
    rating: z
      .coerce
      .number()
      .min(0)
      .max(5)
      .default(5),
    reviewCount: z
      .coerce
      .number()
      .min(0)
      .default(0),
    shortDescription: z
      .string()
      .max(500, 'Short description cannot exceed 500 characters')
      .optional()
      .default(''),
    fullDescription: z
      .string()
      .max(3000, 'Full description cannot exceed 3000 characters')
      .optional()
      .default(''),
    materialsString: z
      .string()
      .optional()
      .default(''),
    width: z.string().min(1, 'Width is required').default('220 cm'),
    depth: z.string().min(1, 'Depth is required').default('95 cm'),
    height: z.string().min(1, 'Height is required').default('78 cm'),
    seatHeight: z.string().optional().default('42 cm'),
    weight: z.string().optional().default('60 kg'),
    primaryImage: z.string().optional().default(''),
    imageFile: optionalImageFileSchema,
    inStock: z.boolean().default(true),
    badges: z.array(z.string()).default([]),
    careInstructions: z.string().optional().default(''),
    warranty: z.string().optional().default(''),
    leadTime: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    const hasFile = validateImageFileIssue(data.imageFile, 'imageFile', ctx);
    if (!hasFile && (!data.primaryImage || !data.primaryImage.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Upload an image file or provide a Primary Image URL.',
        path: ['primaryImage'],
      });
    }
  });

export type ProductFormData = z.infer<typeof productSchema>;
