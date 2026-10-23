"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  ImageIcon,
  Loader2,
  X,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { getImageUrl, toRelativeKey } from "@/lib/imageUrl";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder?: "products" | "categories" | "blogs" | "general";
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
}

export function ImageUploadInput({
  label,
  value,
  onChange,
  folder = "products",
  placeholder = "https://... or /images/...",
  helperText,
  disabled = false,
}: ImageUploadInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset feedback
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image.");
      }

      // Store clean relative key in DB (e.g. "products/1729-item.png")
      const relativeKey = data.fileKey || toRelativeKey(data.url);
      onChange(relativeKey);
      setSuccessMessage(`Uploaded to S3 (${folder}/)`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err?.message || "Failed to upload file to S3.");
    } finally {
      setIsUploading(false);
      // Reset input so re-uploading same file works
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#44403C]">
          <ImageIcon size={14} className="text-[#C5A880]" />
          <span>{label}</span>
        </label>
        {value && (
          <a
            href={getImageUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-[#214E34] hover:underline"
          >
            <span>View Image</span>
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Main Input Row: Manual URL + Upload Button + Thumbnail Preview */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            disabled={disabled || isUploading}
            onChange={(e) => {
              setErrorMessage(null);
              onChange(toRelativeKey(e.target.value));
            }}
            placeholder={placeholder}
            className="h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 pr-8 text-xs text-[#1C1B1A] placeholder:text-[#A8A29E] focus:border-[#C5A880] focus:bg-white focus:outline-hidden disabled:opacity-60"
          />
          {value && (
            <button
              type="button"
              disabled={disabled || isUploading}
              onClick={() => onChange("")}
              title="Clear Image URL"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#44403C]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={disabled || isUploading}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Button */}
        <button
          type="button"
          disabled={disabled || isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[#214E34]/30 bg-[#214E34]/10 px-3 text-xs font-semibold text-[#214E34] transition-colors hover:bg-[#214E34] hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <UploadCloud size={13} />
              <span>Upload to cloud</span>
            </>
          )}
        </button>

        {/* Thumbnail Preview */}
        {value && (
          <div className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-[#E7E2D8] bg-neutral-100 shadow-2xs">
            <Image
              src={getImageUrl(value)}
              alt="Thumbnail preview"
              fill
              className="object-cover"
              onError={(e) => {
                // If invalid image, fallback gracefully
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Helper text or feedback */}
      {helperText && !errorMessage && !successMessage && (
        <p className="text-[11px] text-[#78716C]">{helperText}</p>
      )}

      {errorMessage && (
        <div className="flex items-start gap-1.5 rounded-md border border-red-200 bg-red-50 p-2 text-[11px] text-red-700">
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
          <CheckCircle2 size={12} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
}

