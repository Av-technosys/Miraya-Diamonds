"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Heart } from "lucide-react";
import { Container } from "@/components/common/container";
import { ProductCard } from "@/components/collection/product-card";
import type { PublicCollectionProduct } from "@/lib/actions/products";
import { useWishlist } from "@/lib/use-wishlist";

export function WishlistPage({ products }: { products: PublicCollectionProduct[] }) {
  const { items, ready, isSaved, toggle, error } = useWishlist();
  const saved = products.filter(isSaved);

  return (
    <main className="bg-white pb-16 pt-6 sm:pb-20">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#757575] sm:mb-10">
          <Link href="/" className="hover:text-[#214E34]">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Wishlist</span>
        </nav>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#214E34]/10 pb-7 sm:mb-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">Chosen by You</p>
            <h1 className="font-infant text-[40px] font-semibold leading-tight sm:text-[52px]">Your Wishlist</h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#757575]">A little collection of the pieces you love. Saved on this browser, ready whenever you return.</p>
          </div>
          <Link href="/collection" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-[#214E34] underline-offset-4 hover:underline">Explore the Collection <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        {error && <p role="alert" className="mb-5 text-sm text-[#214E34]">{error}</p>}
        {!ready ? <div role="status" className="py-24 text-center text-sm text-[#757575]">Loading your wishlist…</div> : saved.length ? <>
          <p aria-live="polite" className="mb-5 text-xs text-[#757575]">{saved.length} saved {saved.length === 1 ? "design" : "designs"}</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:gap-4 xl:grid-cols-4">
            {saved.map((item) => <ProductCard key={item.id} item={item} saved onToggle={() => toggle(item)} />)}
          </div>
        </> : <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl bg-[#F7FFF7] px-6 py-14 text-center sm:py-20">
          <span className="mb-5 grid size-14 place-items-center rounded-full border border-[#214E34]/15 text-[#214E34]"><Heart size={24} strokeWidth={1.25} aria-hidden="true" /></span>
          <h2 className="font-infant text-[31px] font-semibold leading-tight sm:text-[38px]">{items.length ? "Let’s find your next favourite" : "Keep the pieces you love"}</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#757575]">{items.length ? "Your saved designs are currently unavailable online. Explore our collection or contact our team for help finding them." : "Tap the heart on any design to save it here and come back to it whenever you like."}</p>
          <Link href={items.length ? "/contact" : "/collection"} className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 text-sm font-medium text-white hover:bg-[#183b28]">{items.length ? "Contact Us" : "Explore the Collection"}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>}
      </Container>
    </main>
  );
}
