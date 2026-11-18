"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/common/container";
import type { PublicCollectionProduct } from "@/lib/actions/products";
import { ProductCard } from "./product-card";
import { useWishlist } from "@/lib/use-wishlist";
import { FilterDrawer, FilterPanel } from "./filter-drawer";
import styles from "./collection-page.module.css";
import { collectionFilterUrl, emptyFilters, filterGroups, getCollectionFilterOptions, matchesFilters, parseCollectionFilters, priceRanges, type Filters } from "./filter-state";
import { SortMenu, type Sort } from "./sort-menu";


const desktopPageSize = 15;
const mobilePageSize = 6;

export function CollectionPage({ initialProducts, categories }: { initialProducts: PublicCollectionProduct[]; categories: string[] }) {
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
  const { isSaved, toggle, error: message } = useWishlist();

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

  const panelFilters = filterOpen ? draftFilters : appliedFilters;
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
    const matching = products.filter((item) => matchesFilters(item, { ...panelFilters, categories: [] }));
    return Object.fromEntries([...new Set([...categories, ...filterOptions.categories, ...panelFilters.categories])].map((name) => [name, matching.filter((item) => matchesFilters(item, { ...emptyFilters, categories: [name] })).length]));
  }, [products, categories, panelFilters, filterOptions.categories]);
  const sections = useMemo(() => filterOptions.sections.map((section) => ({ ...section, options: [...new Set([...section.options, ...panelFilters[section.key]])] })), [filterOptions.sections, panelFilters]);
  const ranges = useMemo(() => [...filterOptions.prices, ...priceRanges.filter((range) => range.value === panelFilters.price && !filterOptions.prices.some((item) => item.value === range.value))], [filterOptions.prices, panelFilters.price]);
  const activeFilterCount = appliedFilters.categories.length + Number(Boolean(appliedFilters.price)) + filterGroups.reduce((count, group) => count + appliedFilters[group].length, 0);
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginationKey = JSON.stringify(appliedFilters) + sort + pageSize;
  const page = pagination.key === paginationKey ? Math.min(pagination.page, Math.max(1, pageCount)) : 1;
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  function changePage(nextPage: number) {
    setPagination({ page: nextPage, key: paginationKey });
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function applyFilters(filters: Filters) {
    window.history.pushState(null, "", collectionFilterUrl(filters));
    if (filterOpen) closeFilters();
  }

  return (
    <main className={`${styles.page} bg-[#faf9f7] font-inter text-[#363636] sm:bg-white`}>
      <div className="relative hidden h-[240px] overflow-hidden sm:block sm:h-[300px] lg:h-[340px]">
        <Image src="/Collection/Hero.png" alt="Miraya Diamonds collection" fill priority sizes="100vw" className="object-cover object-[57%_center] sm:object-center" />
        <Container className="relative flex h-full items-center">
          <div className="max-w-[210px] sm:max-w-[280px]">
            <h1 className="font-infant text-[40px] font-semibold uppercase leading-none sm:text-[52px]">Our<br />Collection</h1>
            <div className="my-2.5 h-px w-28 bg-[#214E34] sm:w-40" />
            <p className="max-w-[185px] text-[10px] leading-[1.25] sm:text-xs">Timeless pieces crafted to become part of your story</p>
            <p className="mt-2 font-infant text-[17px] italic leading-none sm:text-[23px]">Jewellery for Every<br />Moment</p>
          </div>
        </Container>
      </div>

      <Container className="pb-16 pt-4 sm:pb-12 sm:pt-5">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-[11px] text-neutral-600">
          <Link href="/" className="hover:text-[#214E34]">Home</Link><ChevronRight size={11} /><span aria-current="page">Collection</span>
        </nav>

        <div className="grid items-start gap-6 lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-8">
          <aside aria-label="Product filters" className="sticky top-6 hidden max-h-[calc(100dvh-3rem)] overflow-hidden rounded-lg border border-[#214E34]/10 lg:flex lg:flex-col">
            <FilterPanel filters={appliedFilters} sections={sections} ranges={ranges} totalCount={products.length} categoryCounts={categoryCounts} previewCount={filtered.length} onChange={applyFilters} onReset={() => applyFilters(emptyFilters)} />
          </aside>
          <div className="min-w-0">
            <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-[#e7e5e1] pb-3 sm:flex sm:flex-wrap sm:justify-between sm:gap-3 sm:border-0 sm:pb-0">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <button ref={filterButtonRef} type="button" aria-expanded={filterOpen} aria-controls="collection-filters" onClick={() => { setDraftFilters(appliedFilters); setFilterOpen(true); }} className="flex h-8 shrink-0 items-center gap-1.5 lg:hidden rounded-[4px] bg-[linear-gradient(90deg,#214E34_0%,rgba(33,78,52,0.7)_100%)] px-2.5 text-[11px] font-medium text-white shadow-[0_3px_7px_rgba(33,78,52,0.18)] hover:brightness-110 sm:px-3">
                  <SlidersHorizontal size={13} /> Filter{activeFilterCount ? ` · ${activeFilterCount}` : ""}
                </button>
                <p className="truncate text-[10px] sm:text-[11px]"><span className="max-[360px]:hidden">Collections </span>({filtered.length})<span className="hidden sm:inline"> Products</span></p>
              </div>
              <SortMenu value={sort} onChange={setSort} />
            </div>

            <div ref={gridRef} className="grid scroll-mt-5 grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4 lg:gap-4">
              {visible.map((item) => (
                <ProductCard key={item.id} item={item} saved={isSaved(item)} onToggle={() => toggle(item)} />
              ))}
            </div>
            {visible.length === 0 && <div role="status" className="flex min-h-80 flex-col items-center justify-center px-6 py-16 text-center">
              <h2 className="font-infant text-3xl font-medium text-[#214E34]">No products found</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">{appliedFilters.categories.length ? `There are currently no designs matching your selection in ${appliedFilters.categories.join(", ")}.` : "There are currently no designs matching your selection."} Contact our team to explore more options.</p>
              <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 text-sm font-medium text-white transition-colors hover:bg-[#183b28]">Contact Us <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>}
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
          </div>
        </div>
      </Container>
      {filterOpen && <FilterDrawer filters={draftFilters} sections={sections} ranges={ranges} totalCount={products.length} categoryCounts={categoryCounts} previewCount={previewCount} onChange={setDraftFilters} onApply={() => applyFilters(draftFilters)} onReset={() => { setDraftFilters(emptyFilters); applyFilters(emptyFilters); }} onClose={closeFilters} />}
    </main>
  );
}
