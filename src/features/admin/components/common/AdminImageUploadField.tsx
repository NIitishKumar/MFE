'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { UploadCloud, Trash2, Image as ImageIcon } from 'lucide-react';
import {
  ACCEPTED_IMAGE_INPUT,
  formatUploadFileSize,
} from '../../utils/imageUploadHelper';

interface AdminImageUploadFieldProps {
  label: string;
  urlLabel?: string;
  urlFieldName: string;
  fileFieldName: string;
  fileValue?: File | null;
  urlValue?: string;
  setFieldValue: (field: string, value: unknown) => void;
  urlPlaceholder?: string;
  helperText?: string;
  required?: boolean;
  previewMode?: 'thumbnail' | 'banner';
}

/**
 * Shared Admin image picker + optional URL fallback field.
 * Holds the File in Formik state with instant local preview and uploads on form submit.
 */
export const AdminImageUploadField: React.FC<AdminImageUploadFieldProps> = ({
  label,
  urlLabel = 'Image URL',
  urlFieldName,
  fileFieldName,
  fileValue,
  urlValue = '',
  setFieldValue,
  urlPlaceholder = 'https://res.cloudinary.com/... or https://images.unsplash.com/...',
  helperText,
  required = false,
  previewMode = 'thumbnail',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!fileValue) {
      return;
    }
    const objectUrl = URL.createObjectURL(fileValue);
    // Keep object URL cleanup strictly coupled to the File instance lifecycle
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [fileValue]);

  const activePreview = fileValue ? previewUrl : urlValue;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setFieldValue(fileFieldName, file);
  };

  const handleClearFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFieldValue(fileFieldName, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
            {label}{' '}
            {required && !urlValue && <span className="text-[#c9a87c]">*</span>}
          </label>
          <span className="text-[10px] text-neutral-500 font-mono">
            Uploaded on submit &bull; max 10 MB
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_INPUT}
          className="hidden"
          onChange={handleFileChange}
        />

        {fileValue ? (
          <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#1b1917] border border-[#4d3a2b]">
            <div className="flex items-center gap-3 min-w-0">
              {previewUrl && (
                <div className="w-11 h-11 rounded overflow-hidden border border-[#332e29] shrink-0 bg-[#221e1a]">
                  <img
                    src={previewUrl}
                    alt={fileValue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs text-neutral-200 font-medium truncate">
                  {fileValue.name}
                </p>
                <p className="text-[10px] text-[#c9a87c] font-mono">
                  {formatUploadFileSize(fileValue.size)} &bull; Ready to upload on submit
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded text-[11px] bg-[#25211d] hover:bg-[#322c26] text-neutral-200 border border-[#38332e] transition cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleClearFile}
                aria-label={`Remove ${label} file`}
                className="p-1.5 rounded text-rose-400 hover:bg-rose-950/60 border border-transparent hover:border-rose-800/60 transition cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-lg border border-dashed border-[#3d3630] hover:border-[#c9a87c] bg-[#191715] hover:bg-[#1f1c19] text-neutral-300 transition cursor-pointer"
          >
            <UploadCloud size={18} className="text-[#c9a87c]" />
            <span className="text-xs font-medium">
              Click to choose an image file from your device
            </span>
            <span className="text-[10px] text-neutral-500">
              JPG, PNG, WebP, AVIF, GIF, or SVG &bull; Uploads on form submit
            </span>
          </button>
        )}

        <ErrorMessage
          name={fileFieldName}
          component="p"
          className="text-xs text-rose-400 font-sans"
        />
      </div>

      {/* URL Input & Preview */}
      <div className="space-y-1.5">
        <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
          {urlLabel} {fileValue ? '(optional fallback)' : ''}
        </label>
        <div className="flex gap-3 items-center">
          <Field
            type="text"
            name={urlFieldName}
            placeholder={urlPlaceholder}
            className="flex-1 bg-[#1e1c1a] border border-[#38332e] focus:border-[#c9a87c] rounded px-3.5 py-2 text-xs text-neutral-100 placeholder:text-neutral-500 outline-none transition-colors"
          />
          {previewMode === 'thumbnail' && (
            <div className="w-10 h-10 rounded border border-[#38322c] bg-[#1a1816] overflow-hidden shrink-0 flex items-center justify-center">
              {activePreview ? (
                <img
                  src={activePreview}
                  alt={`${label} preview`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={14} className="text-neutral-500" />
              )}
            </div>
          )}
        </div>

        {previewMode === 'banner' && activePreview && (
          <div className="mt-2 h-20 w-full rounded border border-[#38322c] bg-[#1a1816] overflow-hidden">
            <img
              src={activePreview}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <ErrorMessage
          name={urlFieldName}
          component="p"
          className="text-xs text-rose-400 font-sans"
        />
        {helperText && <p className="text-[11px] text-neutral-500">{helperText}</p>}
      </div>
    </div>
  );
};

