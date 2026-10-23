"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Heart, Menu, PhoneCall, Search, X } from "lucide-react";
import { Container } from "./container";
import { AccountButton } from "@/components/auth/account-button";
import { collectionMenuHref } from "@/lib/collection-navigation";
import { budgetRanges } from "@/components/collection/filter-state";
import ringImage from "@/public/Images/Header_ring.png";
import earringImage from "@/public/Images/Header_earring.png";
import braceletImage from "@/public/Images/Header_bracelet.png";
import necklaceImage from "@/public/Images/Header_necklace.png";
import kidsImage from "@/public/Images/Header_kids.png";

const categories = [
  { label: "Rings", nav: "Rings", image: ringImage },
  { label: "Earrings", nav: "Ear Rings", image: earringImage },
  { label: "Bracelets", nav: "Bracelet", image: braceletImage },
  { label: "Pendant", nav: "Pendant", image: necklaceImage },
  { label: "Kids", nav: "Kids", image: kidsImage },
];

type MenuGroup = { title: string; items: string[] };

function menuColumns(label: string): MenuGroup[][] {
  return [
    [{ title: "FEATURED", items: [`All ${label}`, "New Arrival", "Best Seller", "Most Gifted"] }],
    [
      { title: "KARATAGE", items: ["14kt", "18kt"] },
      { title: "SHOP FOR", items: ["Women", "Kids"] },
    ],
    [{ title: "OCCASION", items: ["Everyday", "Workwear", "Party", "Proposal", "Engagement"] }],
    [{ title: "METAL & STONE", items: ["Diamond", "Gold", "White Gold", "Rose Gold"] }],
  ];
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Miraya Diamonds home" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <Image src="/Header_logo.png" alt="" width={60} height={60} priority className={`${compact ? "h-8" : "h-10 lg:h-12"} w-auto`} />
      <Image src="/Header_logo_mb.png" alt="Miraya Diamonds" width={160} height={45} priority className={`${compact ? "h-5" : "h-6 lg:h-7"} w-auto`} />
    </Link>
  );
}

function SearchField({ onSubmit }: { onSubmit?: () => void }) {
  return (
    <form action="/collection" role="search" onSubmit={onSubmit} className="relative w-full">
      <input type="search" name="search" aria-label="Search jewellery" placeholder="Search for rings" className="h-10 w-full rounded-full border border-[#e1e6e2] bg-white pl-4 pr-12 text-sm text-[#454545] outline-none placeholder:text-[#888] focus-visible:ring-2 focus-visible:ring-[#b49b60]" />
      <button type="submit" aria-label="Search" className="absolute inset-y-0 right-1 grid w-10 place-items-center rounded-full text-[#214E34] focus-visible:outline-2"><Search size={20} strokeWidth={1.8} /></button>
    </form>
  );
}

export function Header() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const activeCategory = categories.find((category) => category.label === activeMenu);

  function closeDrawer() {
    setIsMobileMenuOpen(false);
    setExpandedMobileMenu(null);
  }

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    drawer?.showModal();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) {
        setIsMobileMenuOpen(false);
        setExpandedMobileMenu(null);
      }
    };
    desktop.addEventListener("change", onResize);
    return () => {
      drawer?.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header data-site-header className="relative z-40 w-full bg-white">
        <div className="bg-[#244e38] py-3">
          <Container>
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <button type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(true)} className="grid size-10 shrink-0 place-items-center text-white"><Menu size={23} /></button>
              <Logo compact />
              <Suspense fallback={<span className="size-10 shrink-0" />}><AccountButton /></Suspense>
            </div>
            <div className="hidden items-center justify-between gap-8 lg:flex">
              <Logo />
              <div className="mx-auto w-full max-w-[560px]"><SearchField /></div>
              <div className="flex shrink-0 items-center gap-5 text-white">
                <Suspense fallback={<span className="size-10 shrink-0" />}><AccountButton /></Suspense>
                <button type="button" aria-label="Your wishlist" className="rounded-full hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4"><Heart size={20} strokeWidth={1.5} /></button>
                <Link href="/contact#consultation-booking" className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-medium text-[#214E34] hover:bg-[#f2f6f3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><PhoneCall size={15} strokeWidth={1.5} />Schedule a Call<ChevronRight size={14} /></Link>
              </div>
            </div>
          </Container>
        </div>
        <div className="border-b border-[#f0eeea] px-4 py-2 lg:hidden"><SearchField /></div>
        <div className="hidden lg:block">
          <Container>
            <div ref={navRef} className="relative" onMouseLeave={() => setActiveMenu(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu(null); }} onKeyDown={(event) => {
              if (event.key === "Escape") {
                const trigger = navRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
                trigger?.focus();
                setActiveMenu(null);
              }
            }}>
              <nav aria-label="Main navigation" className="flex items-center justify-center gap-8 py-2 xl:gap-12">
                {[...categories.map(({ label }) => label), "Shop by Budget"].map((label) => (
                  <div key={label} className={label === "Shop by Budget" ? "relative" : ""}>
                    <button type="button" aria-expanded={activeMenu === label} aria-controls={label === "Shop by Budget" ? "budget-menu" : "category-menu"} onMouseEnter={() => setActiveMenu(label)} onFocus={() => setActiveMenu(label)} onClick={() => setActiveMenu(label)} className={`flex min-h-8 items-center gap-1 border-b py-1 text-[11px] font-semibold uppercase text-[#214E34] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${activeMenu === label ? "border-[#214E34]" : "border-transparent hover:border-[#214E34]"}`}>
                      {label}<ChevronDown size={13} strokeWidth={1.5} />
                    </button>
                    {label === "Shop by Budget" && activeMenu === label && (
                      <div id="budget-menu" className="absolute left-1/2 top-full z-50 w-[210px] -translate-x-1/2 rounded-b-xl border border-t-0 border-[#eadfdf] bg-white px-5 pb-5 pt-6 shadow-[0_12px_24px_rgba(42,29,29,0.12)]">
                        <h3 className="mb-3 border-b border-[#efe2e2] pb-2 text-sm font-bold tracking-wide text-[#214E34]">SHOP BY BUDGET</h3>
                        <ul className="space-y-3">{budgetRanges.map((range) => <li key={range.value}><Link href={`/collection?price=${range.value}`} onClick={() => setActiveMenu(null)} className="block text-sm text-[#555] hover:text-[#214E34]">{range.label}</Link></li>)}</ul>
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/collection" onMouseEnter={() => setActiveMenu(null)} onFocus={() => setActiveMenu(null)} className="py-2 text-[11px] font-semibold uppercase text-[#214E34]">Diwali</Link>
              </nav>
              {activeCategory && (
                <div id="category-menu" className="absolute inset-x-0 top-full z-50 rounded-b-2xl border border-t-0 border-[#eadfdf] bg-white shadow-[0_18px_32px_rgba(42,29,29,0.13)]">
                  <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.95fr)] items-start gap-7 p-8 xl:gap-10 xl:p-10">
                    {menuColumns(activeCategory.label).map((groups, index) => (
                      <div key={index} className="space-y-8">
                        {groups.map((group) => (
                          <div key={group.title}>
                            <h3 className="mb-4 border-b border-[#efe2e2] pb-2 text-xs font-bold tracking-wide text-[#214E34] xl:text-sm">{group.title}</h3>
                            <ul className="space-y-3">{group.items.map((item) => <li key={item}><Link href={collectionMenuHref(activeCategory.nav, group.title, item)} onClick={() => setActiveMenu(null)} className="block text-xs text-[#555] transition-colors hover:text-[#214E34] xl:text-sm">{item}</Link></li>)}</ul>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                      <Image key={activeCategory.image.src} src={activeCategory.image} alt={`${activeCategory.label} by Miraya Diamonds`} fill sizes="(max-width: 1280px) 25vw, 320px" className="object-cover" />
                      <Link href="/contact" onClick={() => setActiveMenu(null)} className="absolute inset-x-4 bottom-4 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-[#214E34] transition-colors hover:bg-[#f2f6f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34]">Customize</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </header>

      <dialog ref={drawerRef} aria-labelledby="mobile-menu-title" onCancel={closeDrawer} onClick={(event) => { if (event.target === event.currentTarget) closeDrawer(); }} className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(90vw,380px)] max-w-none border-0 bg-white p-0 text-[#353333] backdrop:bg-black/45">
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-[#eee] p-4">
            <h2 id="mobile-menu-title" className="sr-only">Shop jewellery</h2>
            <Logo compact />
            <button type="button" aria-label="Close navigation" onClick={closeDrawer} className="grid size-10 place-items-center rounded-full text-[#214E34] focus-visible:outline-2"><X size={22} /></button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {categories.map((category) => (
              <div key={category.label} className="border-b border-[#eee]">
                <button type="button" aria-expanded={expandedMobileMenu === category.label} aria-controls={`mobile-${category.nav.replaceAll(" ", "-")}`} onClick={() => setExpandedMobileMenu(expandedMobileMenu === category.label ? null : category.label)} className="flex min-h-14 w-full items-center justify-between px-5 text-sm font-semibold text-[#214E34]">{category.label}<ChevronDown size={16} className={expandedMobileMenu === category.label ? "rotate-180" : ""} /></button>
                {expandedMobileMenu === category.label && (
                  <div id={`mobile-${category.nav.replaceAll(" ", "-")}`} className="space-y-6 px-5 pb-6">
                    {menuColumns(category.label).flat().map((group) => (
                      <div key={group.title}>
                        <h3 className="mb-3 border-b border-[#efe2e2] pb-2 text-xs font-bold tracking-wide text-[#214E34]">{group.title}</h3>
                        <ul>{group.items.map((item) => <li key={item}><Link href={collectionMenuHref(category.nav, group.title, item)} onClick={closeDrawer} className="block py-2 text-sm text-[#555]">{item}</Link></li>)}</ul>
                      </div>
                    ))}
                    <Link href="/contact" onClick={closeDrawer} className="relative block overflow-hidden rounded-xl">
                      <Image src={category.image} alt={`${category.label} by Miraya Diamonds`} sizes="330px" className="h-auto w-full" />
                      <span className="absolute inset-x-4 bottom-4 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-[#214E34]">Customize</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <div className="border-b border-[#eee]">
              <button type="button" aria-expanded={expandedMobileMenu === "budget"} aria-controls="mobile-budget" onClick={() => setExpandedMobileMenu(expandedMobileMenu === "budget" ? null : "budget")} className="flex min-h-14 w-full items-center justify-between px-5 text-sm font-semibold text-[#214E34]">Shop by Budget<ChevronDown size={16} className={expandedMobileMenu === "budget" ? "rotate-180" : ""} /></button>
              {expandedMobileMenu === "budget" && <ul id="mobile-budget" className="px-5 pb-4">{budgetRanges.map((range) => <li key={range.value}><Link href={`/collection?price=${range.value}`} onClick={closeDrawer} className="block py-3 text-sm text-[#555]">{range.label}</Link></li>)}</ul>}
            </div>
            <Link href="/collection" onClick={closeDrawer} className="block border-b border-[#eee] px-5 py-4 text-sm font-semibold text-[#214E34]">Diwali</Link>
          </div>
          <Link href="/contact#consultation-booking" onClick={closeDrawer} className="m-5 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#214E34] px-5 py-3 text-sm font-medium text-white"><PhoneCall size={16} />Schedule a Call<ChevronRight size={16} /></Link>
        </div>
      </dialog>
    </>
  );
}
