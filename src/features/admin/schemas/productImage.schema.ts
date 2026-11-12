import { z } from 'zod';
import {
  optionalImageFileSchema,
  validateImageFileIssue,
} from '../utils/imageUploadHelper';

export const productImageSchema = z
  .object({
    productId: z
      .string()
      .min(1, 'Please select a garment product')
      .trim(),
    image_url: z
      .string()
      .trim()
      .optional()
      .default(''),
    imageFile: optionalImageFileSchema,
    alt_text: z
      .string()
      .max(200, 'Alt text cannot exceed 200 characters')
      .optional()
      .default(''),
    display_order: z
      .coerce
      .number()
      .int('Display order must be an integer')
      .min(1, 'Display order must be at least 1'),
    is_primary: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    const hasFile = validateImageFileIssue(data.imageFile, 'imageFile', ctx);
    if (!hasFile && (!data.image_url || !data.image_url.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Upload an image file or provide an Image URL.',
        path: ['image_url'],
      });
    }
  });

export type ProductImageFormData = z.infer<typeof productImageSchema>;
