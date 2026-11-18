"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import type { PublicCollectionProduct } from "@/lib/actions/products";
import { formatCataloguePrice } from "@/lib/product-catalog";
import { CustomizationDialog } from "@/components/pdp/customization-dialog";

export function ProductCard({ item, saved, onToggle }: { item: PublicCollectionProduct; saved: boolean; onToggle: () => void }) {
  return (
    <article data-product-card className="group/card relative min-w-0 rounded-lg bg-white p-1.5 shadow-[0_6px_24px_rgba(33,78,52,0.07)]">
      <Link href={`/collection/${encodeURIComponent(item.slug || item.id)}`} aria-label={`View ${item.name}`} className="absolute inset-0 z-10 rounded-[6px] focus-visible:outline-2 focus-visible:outline-[#214E34]" />
      <div className="relative aspect-square overflow-hidden rounded-[5px] bg-[#F7F7F7]">
        {item.image ? <Image src={item.image} alt={item.name} fill sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, (max-width: 1279px) 23vw, 230px" className="h-full w-full object-fill transition-transform duration-700 ease-out lg:group-hover/card:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none" /> : <span className="absolute inset-0 grid place-items-center text-xs text-neutral-500">Image unavailable</span>}
      </div>
      <button type="button" onClick={() => onToggle()} aria-label={`${saved ? "Remove" : "Add"} ${item.name} ${saved ? "from" : "to"} wishlist`} aria-pressed={saved} className={`absolute right-3 top-3 z-20 hidden size-9 place-items-center rounded-full bg-white/70 text-[#214E34] shadow-sm ring-1 ring-white/50 backdrop-blur-md transition-opacity duration-200 group-hover/card:pointer-events-auto group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] motion-reduce:transition-none lg:grid ${saved ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <Heart size={18} strokeWidth={1.5} fill={saved ? "#214E34" : "none"} />
      </button>
      <div className="px-1 pb-1 pt-2">
        <p className="truncate text-[11px] leading-tight text-neutral-600 sm:text-xs lg:text-sm lg:font-semibold lg:text-[#363636]" title={item.name}>{item.name}</p>
        <p className="mt-1 text-xs font-semibold leading-tight sm:text-sm lg:hidden">{formatCataloguePrice(item)}</p>
        <div className="relative z-20 mt-3 flex gap-1">
          <CustomizationDialog productSku={item.sku} triggerLabel="Enquire Now" showTriggerIcon={false} animateTrigger animateOnCardHover curtainClassName="bg-white text-[#214E34] lg:justify-between lg:px-4" trailingIcon={<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" className="relative z-10 hidden shrink-0 lg:block" />} triggerClassName="group/enquire relative isolate flex h-8 min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-[#214E34] bg-[linear-gradient(90deg,#214E34_0%,rgba(33,78,52,0.7)_100%)] px-1 text-[11px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:h-7 sm:text-[10px] lg:h-10 lg:justify-between lg:rounded-full lg:border-[#214E34] lg:px-4 lg:text-xs lg:font-semibold lg:tracking-[0.02em]" />
          <button type="button" onClick={() => onToggle()} aria-label={`${saved ? "Remove" : "Add"} ${item.name} ${saved ? "from" : "to"} wishlist`} aria-pressed={saved} className="grid size-8 shrink-0 place-items-center rounded-full border border-[#214E34] text-[#214E34] hover:bg-[#F7FFF7] sm:size-7 lg:hidden">
            <Heart size={13} fill={saved ? "#214E34" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
