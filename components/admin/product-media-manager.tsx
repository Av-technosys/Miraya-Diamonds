"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  ImageIcon,
  Plus,
  Trash2,
  Star,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { ImageUploadInput } from "./image-upload-input";
import { getImageUrl, toRelativeKey } from "@/lib/imageUrl";

interface ProductMediaManagerProps {
  bannerImage: string;
  onBannerImageChange: (url: string) => void;
  mediaUrls: string[];
  onMediaUrlsChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ProductMediaManager({
  bannerImage,
  onBannerImageChange,
  mediaUrls,
  onMediaUrlsChange,
  disabled = false,
}: ProductMediaManagerProps) {
  const [isUploadingMultiple, setIsUploadingMultiple] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const multipleFilesInputRef = useRef<HTMLInputElement | null>(null);

  // Upload multiple images to S3 sequentially/in parallel
  async function handleMultipleFilesSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingMultiple(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const uploadedUrls: string[] = [];
    const totalFiles = files.length;

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        setUploadProgressText(`Uploading ${i + 1} of ${totalFiles} images to AWS S3...`);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "products");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || `Failed to upload "${file.name}" to S3.`);
        }

        const relativeKey = data.fileKey || toRelativeKey(data.url);
        uploadedUrls.push(relativeKey);
      }

      // Append new relative keys to existing media
      const updatedMedia = [...mediaUrls, ...uploadedUrls];
      onMediaUrlsChange(updatedMedia);

      // If bannerImage is not set, set the first uploaded image as banner
      if (!bannerImage && uploadedUrls.length > 0) {
        onBannerImageChange(uploadedUrls[0]);
      }

      setSuccessMessage(`Successfully uploaded ${totalFiles} image(s) to AWS S3!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error("Batch upload error:", err);
      setErrorMessage(err?.message || "Failed to upload images to S3.");
    } finally {
      setIsUploadingMultiple(false);
      setUploadProgressText(null);
      if (multipleFilesInputRef.current) {
        multipleFilesInputRef.current.value = "";
      }
    }
  }

  // Add an empty manual URL input
  function handleAddEmptyUrl() {
    onMediaUrlsChange([...mediaUrls, ""]);
  }

  // Update a specific media URL in the list
  function handleUrlChange(index: number, newUrl: string) {
    const updated = [...mediaUrls];
    updated[index] = toRelativeKey(newUrl);
    onMediaUrlsChange(updated);
  }

  // Remove a media URL from the list
  function handleRemoveMedia(index: number) {
    const updated = mediaUrls.filter((_, i) => i !== index);
    onMediaUrlsChange(updated);
  }

  // Set an image from media gallery as the primary cover/banner
  function handleSetAsBanner(url: string) {
    if (!url.trim()) return;
    onBannerImageChange(toRelativeKey(url));
    setSuccessMessage("Set as primary cover image!");
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  return (
    <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F5]/80 p-4 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded-md bg-[#214E34]/15 text-[#214E34]">
            <ImageIcon size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#161D1A]">Product Media & Imagery</h4>
           
          </div>
        </div>
        <span className="rounded-full bg-[#214E34]/10 px-2 py-0.5 text-[10px] font-semibold text-[#214E34]">
          {mediaUrls.length + (bannerImage ? 1 : 0)} Total Images
        </span>
      </div>

      {/* 1. Primary / Cover Image */}
      <div>
        <ImageUploadInput
          label="Primary Cover Image (banner_image) *"
          value={bannerImage}
          onChange={onBannerImageChange}
          folder="products"
          placeholder="/customize/custom1.png or https://..."
          helperText="Main display photo for collection catalogue cards, product previews, and searches."
          disabled={disabled || isUploadingMultiple}
        />
      </div>

      {/* 2. Dynamic Product Media Gallery */}
      <div className="space-y-3 pt-2 border-t border-[#F0EBE3]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#44403C]">
            <Layers size={13} className="text-[#C5A880]" />
            <span>Product Gallery Media ({mediaUrls.length} pictures)</span>
          </label>

          <div className="flex items-center gap-2">
            {/* Hidden multi-file input */}
            <input
              ref={multipleFilesInputRef}
              type="file"
              multiple
              accept="image/*"
              disabled={disabled || isUploadingMultiple}
              onChange={handleMultipleFilesSelect}
              className="hidden"
            />

            {/* Upload Multiple to S3 Button */}
            <button
              type="button"
              disabled={disabled || isUploadingMultiple}
              onClick={() => multipleFilesInputRef.current?.click()}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#214E34] px-3 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1A3F2A] disabled:opacity-50"
            >
              {isUploadingMultiple ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>{uploadProgressText || "Uploading to S3..."}</span>
                </>
              ) : (
                <>
                  <UploadCloud size={13} />
                  <span>Upload Images to S3</span>
                </>
              )}
            </button>

            {/* Add Manual URL Slot */}
            <button
              type="button"
              disabled={disabled || isUploadingMultiple}
              onClick={handleAddEmptyUrl}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#E7E2D8] bg-white px-2.5 text-xs font-medium text-[#44403C] hover:bg-[#FAF8F5] disabled:opacity-50"
            >
              <Plus size={13} />
              <span>Add URL</span>
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="flex items-start gap-1.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-[11px] text-red-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span className="leading-tight">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-[11px] font-medium text-emerald-800">
            <CheckCircle2 size={13} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Gallery Items List */}
        {mediaUrls.length === 0 ? (
          <div
            onClick={() => multipleFilesInputRef.current?.click()}
            className="cursor-pointer rounded-xl border-2 border-dashed border-[#E7E2D8] bg-white p-6 text-center transition-colors hover:border-[#C5A880] hover:bg-[#FAF8F5]"
          >
            <div className="mx-auto grid size-10 place-items-center rounded-full bg-[#FAF8F5] text-[#8C7350]">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-xs font-semibold text-[#1C1B1A]">
              No gallery images added yet
            </p>
            <p className="mt-0.5 text-[11px] text-[#78716C]">
              Click here to upload multiple images to AWS S3 (angle shots, model wear, close-up details)
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {mediaUrls.map((url, idx) => {
              const isMain = bannerImage && bannerImage === url;

              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-[#EAE6DE] bg-white p-2 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-[#E7E2D8] bg-neutral-100">
                    {url ? (
                      <Image
                        src={getImageUrl(url)}
                        alt={`Media preview ${idx + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-neutral-400">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </div>

                  {/* URL Input */}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={url}
                      disabled={disabled || isUploadingMultiple}
                      onChange={(e) => handleUrlChange(idx, e.target.value)}
                      placeholder="products/... or https://..."
                      className="h-8 w-full rounded-md border border-[#E7E2D8] bg-[#FAF8F5] px-2.5 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                    />
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-[#78716C]">
                      <span>Image #{idx + 1}</span>
                      {url && (
                        <a
                          href={getImageUrl(url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-0.5 text-[#214E34] hover:underline"
                        >
                          <span>Open via CDN</span>
                          <ExternalLink size={9} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions: Make Main & Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={disabled || isUploadingMultiple}
                      onClick={() => handleSetAsBanner(url)}
                      title={isMain ? "Current Primary Cover" : "Set as Primary Cover"}
                      className={`inline-flex h-8 items-center gap-1 rounded-md px-2 text-[11px] font-medium transition-colors ${
                        isMain
                          ? "bg-[#C5A880]/20 text-[#8C7350] border border-[#C5A880]/50"
                          : "border border-[#E7E2D8] bg-[#FAF8F5] text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1B1A]"
                      }`}
                    >
                      <Star size={12} className={isMain ? "fill-[#C5A880] text-[#C5A880]" : ""} />
                      <span className="hidden sm:inline">{isMain ? "Cover" : "Set Cover"}</span>
                    </button>

                    <button
                      type="button"
                      disabled={disabled || isUploadingMultiple}
                      onClick={() => handleRemoveMedia(idx)}
                      title="Remove image"
                      className="grid size-8 place-items-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

