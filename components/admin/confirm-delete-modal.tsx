"use client";

import { Trash2, AlertTriangle, Loader2, X } from "lucide-react";

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  itemName?: string;
  itemType?: "product" | "category" | "user" | "item";
  title?: string;
  message?: string;
  isDeleting?: boolean;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "item",
  title = "Delete Confirmation",
  message,
  isDeleting = false,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  const defaultMessage = itemName
    ? `Are you sure you want to permanently delete "${itemName}"? This action cannot be undone.`
    : `Are you sure you want to permanently delete this ${itemType}? This action cannot be undone.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      onClick={() => {
        if (!isDeleting) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-[#E7E2D8] bg-white p-6 shadow-2xl transition-all duration-200 animate-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          type="button"
          disabled={isDeleting}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3.5 top-3.5 grid size-7 place-items-center rounded-full text-[#8a837b] hover:bg-[#FAF8F5] hover:text-[#1C1B1A] transition-colors disabled:opacity-40"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning / Trash Red Badge */}
          <div className="mb-3.5 flex size-13 items-center justify-center rounded-full bg-red-50 text-red-600 ring-8 ring-red-50/50">
            <Trash2 size={24} className="stroke-[2.2]" />
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-semibold text-[#1C1B1A]">
            {title}
          </h3>

          {/* Detailed Message */}
          <p className="mt-2 text-xs leading-relaxed text-[#57534E]">
            {message || defaultMessage}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex w-full items-center gap-2.5">
            <button
              type="button"
              disabled={isDeleting}
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#E7E2D8] bg-white py-2.5 text-xs font-semibold text-[#57534E] shadow-2xs transition-colors hover:bg-[#FAF8F5] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={onConfirm}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={13} />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

