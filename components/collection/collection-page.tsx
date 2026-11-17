"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/common/container";
import type { PublicCollectionProduct } from "@/lib/actions/products";
import { FilterDrawer } from "./filter-drawer";
import { collectionFilterUrl, emptyFilters, filterGroups, getCollectionFilterOptions, matchesFilters, parseCollectionFilters, priceRanges, type Filters } from "./filter-state";
import { SortMenu, type Sort } from "./sort-menu";


const desktopPageSize = 15;
const mobilePageSize = 6;

function saveToBag(item: PublicCollectionProduct) {
  try {
    const existing = JSON.parse(window.localStorage.getItem("miraya-pdp-bag") || "[]");
    const bag = Array.isArray(existing) ? existing : [];
    if (bag.some((entry) => entry?.image === item.image)) return true;
    window.localStorage.setItem("miraya-pdp-bag", JSON.stringify([...bag, { name: item.name, image: item.image }]));
    return true;
  } catch {
    return false;
  }
}

export function CollectionPage({ initialProducts }: { initialProducts: PublicCollectionProduct[] }) {
  const products = initialProducts;
  const searchParams = useSearchParams();
  const appliedFilters = useMemo(() => parseCollectionFilters(Object.fromEntries([...new Set(searchParams.keys())].map((key) => [key, searchParams.getAll(key)])), products), [searchParams, products]);
  const gridRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [draftFilters, setDraftFilters] = useState<Filters>(appliedFilters);
  const [sort, setSort] = useState<Sort>("featured");
  const [pagination, setPagination] = useState({ page: 1, key: "" });
  const [pageSize, setPageSize] = useState(desktopPageSize);
  const [filterOpen, setFilterOpen] = useState(false);
  const [bagItems, setBagItems] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const closeFilters = useCallback(() => {
    setFilterOpen(false);
    filterButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const updatePageSize = () => {
      setPageSize(media.matches ? mobilePageSize : desktopPageSize);
    };
    updatePageSize();
    media.addEventListener("change", updatePageSize);
    return () => media.removeEventListener("change", updatePageSize);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(window.localStorage.getItem("miraya-pdp-bag") || "[]");
        if (Array.isArray(stored)) setBagItems(stored.map((item) => item?.image).filter(Boolean));
        const wishlist = JSON.parse(window.localStorage.getItem("miraya-collection-wishlist") || "[]");
        if (Array.isArray(wishlist)) setSavedItems(wishlist.filter((item) => typeof item === "string"));
      } catch {
        // Storage unavailable
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const filterOptions = useMemo(() => getCollectionFilterOptions(products), [products]);
  const filtered = useMemo(() => {
    const items = products.filter((item) => matchesFilters(item, appliedFilters));
    if (sort === "price-asc" || sort === "price-desc") return [...items].sort((a, b) => {
      if (a.price <= 0 || b.price <= 0) return Number(a.price <= 0) - Number(b.price <= 0);
      return sort === "price-asc" ? a.price - b.price : b.price - a.price;
    });
    if (sort === "name") return [...items].sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }, [products, appliedFilters, sort]);
  const previewCount = useMemo(() => products.filter((item) => matchesFilters(item, draftFilters)).length, [products, draftFilters]);
  const categoryCounts = useMemo(() => {
    const matching = products.filter((item) => matchesFilters(item, { ...draftFilters, categories: [] }));
    return Object.fromEntries([...new Set([...filterOptions.categories, ...draftFilters.categories])].map((name) => [name, matching.filter((item) => item.type === name).length]));
  }, [products, draftFilters, filterOptions.categories]);
  const sections = useMemo(() => filterOptions.sections.map((section) => ({ ...section, options: [...new Set([...section.options, ...draftFilters[section.key]])] })), [filterOptions.sections, draftFilters]);
  const ranges = useMemo(() => [...filterOptions.prices, ...priceRanges.filter((range) => range.value === draftFilters.price && !filterOptions.prices.some((item) => item.value === range.value))], [filterOptions.prices, draftFilters.price]);
  const activeFilterCount = appliedFilters.categories.length + Number(Boolean(appliedFilters.price)) + filterGroups.reduce((count, group) => count + appliedFilters[group].length, 0);
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginationKey = JSON.stringify(appliedFilters) + sort + pageSize;
  const page = pagination.key === paginationKey ? Math.min(pagination.page, Math.max(1, pageCount)) : 1;
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleWishlist(image: string) {
    const next = savedItems.includes(image) ? savedItems.filter((item) => item !== image) : [...savedItems, image];
    try {
      window.localStorage.setItem("miraya-collection-wishlist", JSON.stringify(next));
      setSavedItems(next);
    } catch {
      setMessage("Could not save your wishlist in this browser.");
    }
  }

  function changePage(nextPage: number) {
    setPagination({ page: nextPage, key: paginationKey });
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function applyFilters(filters: Filters) {
    window.history.pushState(null, "", collectionFilterUrl(filters));
    closeFilters();
  }

  return (
    <main className="bg-[#faf9f7] font-[family-name:var(--font-inter)] text-[#363636] sm:bg-white">
      <div className="relative hidden h-[240px] overflow-hidden sm:block sm:h-[300px] lg:h-[340px]">
        <Image src="/Collection/Hero.png" alt="Miraya Diamonds collection" fill priority sizes="100vw" className="object-cover object-[57%_center] sm:object-center" />
        <Container className="relative flex h-full items-center">
          <div className="max-w-[210px] sm:max-w-[280px]">
            <h1 className="font-[family-name:var(--font-cormorant-garamond)] text-[35px] font-bold uppercase leading-[0.88] sm:text-[48px] lg:text-[54px]">Our<br />Collection</h1>
            <div className="my-2.5 h-px w-28 bg-[#214E34] sm:w-40" />
            <p className="max-w-[185px] text-[10px] leading-[1.25] sm:text-xs">Timeless pieces crafted to become part of your story</p>
            <p className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-[17px] italic leading-none sm:text-[23px]">Jewellery for Every<br />Moment</p>
          </div>
        </Container>
      </div>

      <Container className="pb-16 pt-4 sm:pb-12 sm:pt-5">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-[11px] text-neutral-600">
          <Link href="/" className="hover:text-[#214E34]">Home</Link><ChevronRight size={11} /><span aria-current="page">Collection</span>
        </nav>

        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-[#e7e5e1] pb-3 sm:flex sm:flex-wrap sm:justify-between sm:gap-3 sm:border-0 sm:pb-0">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button ref={filterButtonRef} type="button" aria-expanded={filterOpen} aria-controls="collection-filters" onClick={() => { setDraftFilters(appliedFilters); setFilterOpen(true); }} className="flex h-8 shrink-0 items-center gap-1.5 rounded-[4px] bg-[linear-gradient(90deg,#214E34_0%,rgba(33,78,52,0.7)_100%)] px-2.5 text-[11px] font-medium text-white shadow-[0_3px_7px_rgba(33,78,52,0.18)] hover:brightness-110 sm:px-3">
              <SlidersHorizontal size={13} /> Filter{activeFilterCount ? ` · ${activeFilterCount}` : ""}
            </button>
            <p className="truncate text-[10px] sm:text-[11px]"><span className="max-[360px]:hidden">Collections </span>({filtered.length})<span className="hidden sm:inline"> Products</span></p>
          </div>
          <SortMenu value={sort} onChange={setSort} />
        </div>

        <div ref={gridRef} className="grid scroll-mt-5 grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {visible.map((item) => (
            <article key={item.id} className="relative min-w-0 rounded-lg bg-white p-1.5 shadow-[0_6px_24px_rgba(33,78,52,0.07)]">
              <Link href={`/collection/${item.slug || item.id}`} aria-label={`View ${item.name}`} className="absolute inset-0 z-10 rounded-[6px] focus-visible:outline-2 focus-visible:outline-[#214E34]" />
              <div className="relative aspect-square overflow-hidden rounded-[5px] bg-[#F7F7F7]">
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 230px" className="object-contain" />
              </div>
              <div className="px-1 pb-1 pt-2">
                <p className="text-[13px] font-semibold leading-tight sm:text-[11px]">{item.price > 0 ? `${item.priceFrom ? "From " : ""}₹${item.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : "Enquire for Pricing"}</p>
                <p className="mt-0.5 truncate text-[11px] leading-tight text-neutral-600 sm:text-[10px]" title={item.name}>{item.name}</p>
                <div className="relative z-20 mt-3 flex gap-1">
                  <button type="button" onClick={() => {
                    if (saveToBag(item)) {
                      setBagItems((items) => items.includes(item.image) ? items : [...items, item.image]);
                      setMessage(`${item.name} added to your bag selection.`);
                    } else setMessage("Could not save this selection in your browser.");
                  }} className="h-8 min-w-0 flex-1 rounded-full border border-[#214E34] px-1 text-[11px] font-medium text-[#214E34] hover:bg-[#F7FFF7] sm:h-7 sm:text-[10px]">{bagItems.includes(item.image) ? "Added to Bag" : "Add to Bag"}</button>
                  <button type="button" onClick={() => toggleWishlist(item.image)} aria-label={`${savedItems.includes(item.image) ? "Remove" : "Add"} ${item.name} ${savedItems.includes(item.image) ? "from" : "to"} wishlist`} aria-pressed={savedItems.includes(item.image)} className="grid size-8 shrink-0 place-items-center rounded-full border border-[#214E34] text-[#214E34] hover:bg-[#F7FFF7] sm:size-7">
                    <Heart size={13} fill={savedItems.includes(item.image) ? "#214E34" : "none"} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && <p className="py-20 text-center text-sm text-neutral-600">{products.length ? "No designs match your selected filters. Try another selection or contact our team." : "Our online catalogue is currently unavailable. Please contact our team to explore available designs."} <Link href="/contact" className="text-[#214E34] underline">Contact Miraya Diamonds</Link></p>}
        {message && <p role="status" className="mt-4 text-xs text-[#214E34]">{message}</p>}

        {pageCount > 1 && (
          <nav aria-label="Collection pages" className="mt-9 flex items-center justify-center gap-1.5">
            <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => changePage(page - 1)} className="grid size-7 place-items-center disabled:opacity-35"><ChevronLeft size={15} /></button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <button key={number} type="button" aria-label={`Page ${number}`} aria-current={page === number ? "page" : undefined} onClick={() => changePage(number)} className={`size-7 rounded-[4px] border text-[11px] ${page === number ? "border-[#214E34] text-[#214E34]" : "border-neutral-300 hover:border-[#214E34]"}`}>{number}</button>
            ))}
            <button type="button" aria-label="Next page" disabled={page === pageCount} onClick={() => changePage(page + 1)} className="grid size-7 place-items-center disabled:opacity-35"><ChevronRight size={15} /></button>
          </nav>
        )}
      </Container>
      {filterOpen && <FilterDrawer filters={draftFilters} sections={sections} ranges={ranges} totalCount={products.length} categoryCounts={categoryCounts} previewCount={previewCount} onChange={setDraftFilters} onApply={() => applyFilters(draftFilters)} onReset={() => { setDraftFilters(emptyFilters); applyFilters(emptyFilters); }} onClose={closeFilters} />}
    </main>
  );
}
