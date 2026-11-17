"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { getImageUrl, toRelativeKey } from "@/lib/imageUrl";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  folder?: "products" | "categories" | "blogs" | "general";
  helperText?: string;
  disabled?: boolean;
  contain?: boolean;
}

export function ImageUploadInput({ label, value, onChange, onUploadingChange, folder = "products", helperText, disabled = false, contain = false }: ImageUploadInputProps) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    if (file.size > 10 * 1024 * 1024) {
      setError("Choose an image smaller than 10 MB.");
      event.target.value = "";
      return;
    }
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    onUploadingChange?.(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Image upload failed. Please try again.");
      const key = result.fileKey || toRelativeKey(result.url);
      if (!key) throw new Error("Image upload returned no image. Please try again.");
      onChange(key);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Image upload failed. Please try again.");
    } finally {
      setPreview("");
      setUploading(false);
      onUploadingChange?.(false);
      if (input.current) input.current.value = "";
    }
  }

  const source = preview || (value ? getImageUrl(value) : "");
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#44403C]">{label}</p>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#e5dfd9] bg-[#FAF8F7]">
        {source ? <Image src={source} alt={label} fill unoptimized={Boolean(preview)} sizes="(max-width: 640px) 90vw, 420px" className={contain ? "object-contain" : "object-cover"} /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#8a837b]"><ImagePlus size={26} strokeWidth={1.3} /><span className="text-xs">No image added</span></div>}
        {uploading && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 text-sm text-[#214E34]"><Loader2 size={24} className="animate-spin" />Uploading…</div>}
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml" aria-label={`Upload ${label.toLowerCase()}`} onChange={upload} disabled={disabled || uploading} className="hidden" />
      <div className="flex items-center gap-3">
        <button type="button" disabled={disabled || uploading} onClick={() => input.current?.click()} className="rounded-md border border-[#d9d2c9] px-4 py-2 text-xs font-medium text-[#214E34] hover:bg-[#FAF8F7] disabled:opacity-50">{value ? "Replace image" : "Upload image"}</button>
        {value && <button type="button" disabled={disabled || uploading} onClick={() => { setError(""); onChange(""); }} className="inline-flex items-center gap-1.5 text-xs text-[#81776e] hover:text-red-700 disabled:opacity-50"><Trash2 size={13} />Remove</button>}
      </div>
      {helperText && <p className="text-xs leading-5 text-[#8a837b]">{helperText}</p>}
      {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
    </div>
  );
}
