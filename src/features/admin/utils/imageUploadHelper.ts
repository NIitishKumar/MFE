import { z } from 'zod';
import { uploadImage } from '@/services/api';

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
]);

export const ACCEPTED_IMAGE_INPUT =
  'image/jpeg,image/jpg,image/png,image/webp,image/avif,image/gif,image/svg+xml';

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const optionalImageFileSchema = z
  .custom<File | null>(
    (val) => val == null || (typeof File !== 'undefined' && val instanceof File),
    'Please select a valid image file',
  )
  .nullable()
  .optional()
  .default(null);

/**
 * Validates an optional uploaded image File in Zod superRefine hooks.
 */
export function validateImageFileIssue(
  file: File | null | undefined,
  fieldPath: string,
  ctx: z.RefinementCtx,
): boolean {
  if (!file) return false;

  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Unsupported image format. Use JPG, PNG, WebP, AVIF, GIF, or SVG.',
      path: [fieldPath],
    });
    return true;
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Image file size must be 10 MB or smaller.',
      path: [fieldPath],
    });
    return true;
  }

  return true;
}

/**
 * Formats file byte size into a compact human-readable label.
 */
export function formatUploadFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Uploads the selected image File via POST /api/v1/upload/image when present,
 * otherwise returns the trimmed existing URL string.
 */
export async function resolveUploadedImageUrl(params: {
  file?: File | null;
  existingUrl?: string;
  folder?: string;
  publicId?: string;
}): Promise<string> {
  const trimmedUrl = params.existingUrl?.trim() || '';
  if (!params.file) return trimmedUrl;

  const uploaded = await uploadImage(params.file, {
    folder: params.folder,
    publicId: params.publicId,
  });
  return uploaded.url;
}

