"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  autoCloseMs?: number;
}

export function SuccessModal({
  isOpen,
  onClose,
  title = "Success!",
  message,
  autoCloseMs = 2600,
}: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-[#E7E2D8] bg-white p-6 shadow-2xl transition-all duration-200 animate-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3.5 top-3.5 grid size-7 place-items-center rounded-full text-[#8a837b] hover:bg-[#FAF8F5] hover:text-[#1C1B1A] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Animated Green Badge */}
          <div className="relative mb-3 flex size-14 items-center justify-center rounded-full bg-[#214E34]/10 text-[#214E34]">
            <div className="absolute inset-0 rounded-full bg-[#214E34]/15 animate-ping opacity-25" />
            <CheckCircle2 size={30} className="relative z-10 stroke-[2.2]" />
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-semibold text-[#1C1B1A]">
            {title}
          </h3>

          {/* Message */}
          <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
            {message}
          </p>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-xl bg-[#214E34] py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1A3F2A]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

