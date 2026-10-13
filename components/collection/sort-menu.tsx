"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type Sort = "featured" | "name" | "price-asc" | "price-desc";

const options: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "name", label: "Name A-Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortMenu({ value, onChange }: { value: Sort; onChange: (value: Sort) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='menuitemradio']"));
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      items[(index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
    }
    if (event.key === "Home") { event.preventDefault(); items[0]?.focus(); }
    if (event.key === "End") { event.preventDefault(); items[items.length - 1]?.focus(); }
  }

  return (
    <div ref={rootRef} className="relative flex min-w-0 items-center gap-1 text-[10px] sm:gap-2 sm:text-[11px]">
      <span className="text-neutral-600">Sort by:</span>
      <button ref={triggerRef} type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex h-8 min-w-[76px] items-center justify-between gap-1 border-b border-[#214E34] bg-transparent px-0.5 text-left text-[10px] font-medium text-[#214E34] transition hover:border-[#214E34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:min-w-[130px] sm:gap-3 sm:rounded-[5px] sm:border sm:border-[#cbdccf] sm:bg-white sm:px-3 sm:text-[11px] sm:shadow-[0_2px_7px_rgba(33,78,52,0.05)]">
        <span className="truncate">{options.find((option) => option.value === value)?.label}</span>
        <ChevronDown size={13} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="menu" aria-label="Sort products" onKeyDown={onMenuKeyDown} className="absolute right-0 top-[calc(100%+6px)] z-30 w-[190px] rounded-[6px] border border-[#e2ebe4] bg-white p-1.5 shadow-[0_12px_28px_rgba(20,48,30,0.14)]">
          {options.map((option) => <button key={option.value} type="button" role="menuitemradio" aria-checked={value === option.value} onClick={() => { onChange(option.value); setOpen(false); triggerRef.current?.focus(); }} className={`flex w-full items-center justify-between rounded-[4px] px-2.5 py-2 text-left text-[11px] transition hover:bg-[#F7FFF7] focus-visible:bg-[#F7FFF7] focus-visible:outline-none ${value === option.value ? "font-semibold text-[#214E34]" : "text-[#424742]"}`}>
            {option.label}{value === option.value && <Check size={13} className="text-[#214E34]" />}
          </button>)}
        </div>
      )}
    </div>
  );
}
