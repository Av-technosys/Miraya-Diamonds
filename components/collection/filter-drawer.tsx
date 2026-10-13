"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { filterSections, priceRanges, type FilterGroup, type Filters } from "./filter-state";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="pb-5">
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between py-4 text-left font-[family-name:var(--font-cormorant-garamond)] text-[16px] font-semibold text-[#292929]">
        {title}<ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-2.5">{children}</div>}
    </section>
  );
}

export function FilterDrawer({
  filters, categoryCounts, previewCount, onChange, onApply, onReset, onClose,
}: {
  filters: Filters;
  categoryCounts: Record<string, number>;
  previewCount: number;
  onChange: (filters: Filters) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousBody = document.body.style.overflow;
    const previousRoot = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled)");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousRoot;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  function toggle(key: "categories" | FilterGroup, value: string) {
    const selected = filters[key];
    onChange({ ...filters, [key]: selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value] });
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/35" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside ref={panelRef} id="collection-filters" role="dialog" aria-modal="true" aria-label="Filter products" className="flex h-dvh w-[min(280px,85vw)] flex-col bg-white shadow-[8px_0_28px_rgba(0,0,0,0.14)]">
        <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-5">
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[26px] font-semibold leading-none">Filter</h2>
          <button type="button" autoFocus aria-label="Close filters" onClick={onClose} className="grid size-8 place-items-center text-[#292929] hover:text-[#214E34]"><X size={17} /></button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Section title="Category">
            {[["All Jewellery", Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)], ...Object.entries(categoryCounts)].map(([label, count]) => {
              const selected = label === "All Jewellery" ? filters.categories.length === 0 : filters.categories.includes(String(label));
              return <label key={label} className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#444]">
                <input type="checkbox" checked={selected} onChange={() => label === "All Jewellery" ? onChange({ ...filters, categories: [] }) : toggle("categories", String(label))} className="size-3.5 accent-[#214E34]" />
                <span>{label} ({count})</span>
              </label>;
            })}
          </Section>

          <Section title="Price Range">
            {priceRanges.map((range) => <label key={range.value} className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#444]">
              <input type="radio" name="collection-price" checked={filters.price === range.value} onChange={() => onChange({ ...filters, price: range.value })} className="size-3.5 accent-[#214E34]" />{range.label}
            </label>)}
            {filters.price && <button type="button" onClick={() => onChange({ ...filters, price: "" })} className="pl-6 text-[11px] text-[#214E34] underline">Clear price</button>}
          </Section>

          {filterSections.map((section) => <Section key={section.key} title={section.label}>
            {section.options.map((option) => <label key={option} className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#444]">
              <input type="checkbox" checked={filters[section.key].includes(option)} onChange={() => toggle(section.key, option)} className="size-3.5 accent-[#214E34]" />{option}
            </label>)}
          </Section>)}
        </div>

        <div className="shrink-0 bg-white px-4 py-3">
          <button type="button" onClick={onApply} className="h-10 w-full rounded-full bg-[#214E34] text-xs font-semibold text-white hover:bg-[#183b28]">Apply Filters ({previewCount})</button>
          <button type="button" onClick={onReset} className="mt-2 h-10 w-full rounded-full border border-[#214E34] text-xs font-semibold text-[#214E34] hover:bg-[#F7FFF7]">Reset</button>
        </div>
      </aside>
    </div>
  );
}
