"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Gem,
  Heart,
  Ruler,
  Share2,
  ShieldCheck,
  Video,
  X,
  ZoomIn,
} from "lucide-react";
import { useWishlist } from "@/lib/use-wishlist";
import { ProductEnquiryForm } from "./product-enquiry-form";
import { Container } from "@/components/common/container";
import { getInitialProductSelection, goldColourLabel, formatCataloguePrice } from "@/lib/product-catalog";
import type { PublicCollectionProduct } from "@/lib/actions/products";
import type { getProductBySlugOrSku } from "@/lib/actions/products";
import { calculateProductPrice, findMatchingVariant, formatProductPrice } from "@/lib/product-pricing";
import styles from "./product-detail-page.module.css";

type ProductDetails = NonNullable<Awaited<ReturnType<typeof getProductBySlugOrSku>>>;
type ProductOption = { value: string; name: string; tone: string };
const green = "#214E34";

function saveBagSelection(selection: Record<string, string>) {
  try {
    const saved = JSON.parse(window.localStorage.getItem("miraya-pdp-bag") || "[]");
    const items = Array.isArray(saved) ? saved : [];
    window.localStorage.setItem("miraya-pdp-bag", JSON.stringify([...items, selection]));
    return true;
  } catch {
    return false;
  }
}

function InfoDialog({ title, children, onClose, href, action }: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  href?: string;
  action?: string;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" autoFocus aria-label="Close dialog" onClick={onClose} className="absolute right-4 top-4 grid size-8 place-items-center text-[#214E34]"><X size={18} /></button>
        <h2 className="pr-8 font-infant text-[28px] font-semibold leading-tight text-[#353333]">{title}</h2>
        <div className="mt-3 text-xs leading-5 text-[#4a4646]">{children}</div>
        {href && action && <Link href={href} className="mt-5 flex h-10 items-center justify-center gap-2 rounded-full bg-[#214E34] px-4 text-xs font-semibold text-white">{action} <ArrowRight size={14} /></Link>}
      </div>
    </div>
  );
}

function Thumb({ src, active, onClick, index }: { src: string; active: boolean; onClick: () => void; index: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View product image ${index + 1}`}
      aria-pressed={active}
      className={`relative aspect-square w-full overflow-hidden rounded-[2px] border bg-[#f7f3ef] ${
        active ? "border-[#8b143c]" : "border-transparent"
      }`}
    >
      <Image src={src} alt="" fill sizes="92px" className="object-cover" />
    </button>
  );
}

function ProductHero({ product }: { product: ProductDetails }) {
  const initial = getInitialProductSelection(product, product.variants);
  const tones: Record<string, string> = {
    rose: "bg-[linear-gradient(135deg,#E4A494_0%,#F4C5B8_48%,#E3A393_100%)]",
    yellow: "bg-[linear-gradient(135deg,#E5C158_0%,#FDE599_48%,#D8B042_100%)]",
    white: "bg-[linear-gradient(135deg,#D6D8DC_0%,#F1F3F5_48%,#B0B4B9_100%)]",
    platinum: "bg-[linear-gradient(135deg,#D6D8DC_0%,#F1F3F5_48%,#B0B4B9_100%)]",
  };
  const metalOptions: ProductOption[] = product.goldColours.map((value) => ({ value, name: goldColourLabel(value), tone: tones[value.toLowerCase().replace(/\s+gold$/, "")] || "bg-[#cfc9be]" }));
  const qualities = product.diamondGrades;
  const [preferredVariantId, setPreferredVariantId] = useState(initial.variantId || "");
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const { isSaved, toggle, error: wishlistError } = useWishlist();
  const liked = isSaved(product);
  const [metal, setMetal] = useState(initial.metalColour || "");
  const [quality, setQuality] = useState(initial.diamondGrade || "");
  const [carat, setCarat] = useState(initial.goldPurity || "");
  const [ringSize, setRingSize] = useState(initial.size || "");
  const selection = { metalColour: metal, goldPurity: carat, diamondGrade: quality, size: ringSize };
  const preferred = product.variants.find((variant) => variant.id === preferredVariantId);
  const selectedVariant = (preferred && findMatchingVariant([preferred], selection)) || findMatchingVariant(product.variants, selection);
  function chooseVariant(id: string) {
    const variant = product.variants.find((item) => item.id === id);
    if (!variant) return;
    setPreferredVariantId(id);
    setMetal(variant.metalColour || initial.metalColour || "");
    setCarat(variant.goldPurity || initial.goldPurity || "");
    setQuality(variant.diamondGrade || initial.diamondGrade || "");
    setRingSize(variant.size || initial.size || "");
    setActiveImage(0);
  }
  const gallery = selectedVariant?.gallery.length ? selectedVariant.gallery : product.gallery;
  const activeSource = gallery[activeImage] || gallery[0] || "";
  const pricing = calculateProductPrice(product, carat || null, selectedVariant?.price);
  const displayedPrice = product.variants.length && !selectedVariant ? null : pricing.amount;
  const highlights = [
    { label: "Diamond Weight", value: product.totalDiamondWeight === null ? null : `${product.totalDiamondWeight} ct` },
    { label: "Gross Weight", value: product.grossWeight === null ? null : `${product.grossWeight} g` },
    { label: "Net Gold Weight", value: product.netGoldWeight === null ? null : `${product.netGoldWeight} g` },
  ].filter((item) => item.value !== null);
  const availability = !product.variants.length ? "" : !selectedVariant ? "This combination is not listed. Enquire about alternatives." : selectedVariant.isInStock === false || selectedVariant.stock === 0 ? "Out of stock — enquire about availability" : selectedVariant.stock !== null && selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "";
  const [engraving, setEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [infoDialog, setInfoDialog] = useState<"guide" | null>(null);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomOpen(false);
      if (event.key === "ArrowRight") setActiveImage((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setActiveImage((index) => (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomOpen, gallery.length]);

  async function shareProduct() {
    const details = { title: product.name, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(details);
      } catch {
        return;
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(details.url);
        setFeedback("Product link copied.");
      } catch {
        setFeedback("Could not copy the link. Please try again.");
      }
    } else {
      setFeedback("Sharing is not available in this browser.");
    }
  }

  const selectedOptions = [
    ...(metal ? [goldColourLabel(metal)] : []),
    ...(quality ? [quality] : []),
    ...(carat ? [`Metal purity: ${carat}`] : []),
    ...(ringSize ? [`Size: ${ringSize}`] : []),
    ...(selectedVariant ? [`Variant SKU: ${selectedVariant.sku}`] : []),
    ...(engraving ? [`Engraving: ${engravingText.trim() || "Requested"}`] : []),
  ];
  const enquiryOptions = { variantId: selectedVariant?.id || null, metalColour: metal, diamondGrade: quality, metalPurity: carat, size: ringSize, engravingRequested: engraving, engravingText };


  return (
    <>
    <Container className="pt-4 pb-10 max-sm:px-[10px] sm:pb-12">
      <div className="mb-4 flex items-center gap-2 text-[11px] text-neutral-500 sm:mb-5 sm:text-xs">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/collection">Collection</Link>
        <ChevronRight size={14} />
        <span className="truncate text-neutral-700">{product.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        <div className={`${styles.gallery} min-w-0`}>
          <div className="flex flex-col gap-5 sm:grid sm:grid-cols-[clamp(58px,6vw,78px)_minmax(0,1fr)] sm:items-start sm:gap-4">
            <div className="order-2 flex gap-2.5 overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:self-start sm:gap-2 sm:overflow-visible sm:pb-0">
              {gallery.map((src: string, index: number) => (
                <div key={`${src}-${index}`} className="w-20 shrink-0 sm:w-full"><Thumb src={src} index={index} active={index === activeImage} onClick={() => setActiveImage(index)} /></div>
              ))}
            </div>

            <div className="relative order-1 aspect-square overflow-hidden rounded-lg bg-[#faf9f6] sm:order-2 sm:aspect-[4/5] sm:rounded-none">
              {activeSource ? <Image
                src={activeSource}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="h-full w-full cursor-zoom-in object-fill"
                onClick={() => setZoomOpen(true)}
              /> : <div className="grid size-full place-items-center bg-[#f7f6f2] text-sm text-neutral-500">Image unavailable</div>}
              <span className="absolute left-4 top-4 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#214E34] sm:block">{product.badge}</span>
              <div className="absolute right-4 top-4 hidden gap-2 sm:grid">
                <button type="button" onClick={() => toggle(product)} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={liked} className="grid size-9 place-items-center bg-white text-[#353333]">
                  <Heart size={18} fill={liked ? "#214E34" : "none"} />
                </button>
                <button type="button" onClick={shareProduct} aria-label="Share product" className="grid size-9 place-items-center bg-white text-[#353333]">
                  <Share2 size={17} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 hidden flex-wrap items-center gap-2 sm:left-5 sm:right-5 sm:flex">
                <button type="button" onClick={() => setZoomOpen(true)} className="flex items-center gap-1.5 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.04em]">
                  <Video size={14} color={green} /> Browse Product Images
                </button>
                <button type="button" onClick={() => setZoomOpen(true)} className="ml-auto flex items-center gap-1.5 bg-[#4b4037]/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.04em] text-white">
                  <ZoomIn size={14} /> Click to Zoom
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:mt-8 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:pb-0">
            {[
              [Gem, "Diamond Details", "Ask About Origin & Grading"],
              [BadgeCheck, "Metal Details", "Confirm Purity & Hallmark"],
              [ShieldCheck, "Delivery Guidance", "Confirm Arrangements With Us"],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="flex min-w-[205px] items-center gap-2 rounded-md bg-[#F7FFF7] px-3 py-3 text-[#214E34] sm:min-w-0">
                <Icon size={21} strokeWidth={1.7} className="shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase leading-tight">{title as string}</p>
                  <p className="text-[10px] leading-tight text-[#353333]">{text as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="min-w-0 lg:pt-1">
          <div className="mb-3 flex flex-col gap-1 sm:mb-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#214E34]">{product.categoryName}</p>
            <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]">SKU: {product.sku}</p>
          </div>
          <h1 className="font-infant text-[31px] font-semibold leading-tight text-[#4a4646] sm:text-[38px]">
            {product.name}
          </h1>
          {product.description.trim() && <p className="mt-4 whitespace-pre-line text-sm leading-6 text-[#676767]">{product.description}</p>}

          {product.variants.length > 1 && <label className="mt-4 block text-xs font-medium text-neutral-600">Variant<select value={selectedVariant?.id || ""} onChange={(event) => chooseVariant(event.target.value)} className="mt-2 block min-h-11 w-full rounded-md border border-[#dce3d9] bg-white px-3 text-sm text-[#214E34] outline-none focus:border-[#214E34]"><option value="" disabled>Select a saved variant</option>{product.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.name} · {variant.sku}</option>)}</select></label>}
          {selectedVariant && product.variants.length === 1 && <p className="mt-3 text-xs text-neutral-600">{selectedVariant.name} · SKU {selectedVariant.sku}</p>}
          {availability && <p className="mt-2 text-xs font-medium text-[#214E34]" aria-live="polite">{availability}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-[27px] font-semibold text-[#214E34]">{formatProductPrice(displayedPrice)}</p>
          </div>
          {displayedPrice !== null && !pricing.manual && <details className="mt-3 rounded-md border border-[#e4e8df] p-3 text-xs">
            <summary className="cursor-pointer font-medium text-[#214E34]">Price breakdown</summary>
            <dl className="mt-3 space-y-2 text-neutral-600">
              {pricing.goldPrice !== null && <div className="flex flex-wrap justify-between gap-2"><dt>Gold ({pricing.goldWeight.toLocaleString("en-IN", { maximumFractionDigits: 3 })} g · {carat})</dt><dd>{formatProductPrice(pricing.goldPrice)}</dd></div>}
              {pricing.diamondPrice > 0 && <div className="flex justify-between gap-2"><dt>Diamond price</dt><dd>{formatProductPrice(pricing.diamondPrice)}</dd></div>}
              {pricing.makingCharge > 0 && <div className="flex justify-between gap-2"><dt>Making charge</dt><dd>{formatProductPrice(pricing.makingCharge)}</dd></div>}
            </dl>
          </details>}
          <p className="mt-1 text-xs leading-5 text-neutral-600">{displayedPrice === null ? "Contact us for current pricing and availability." : "Confirm final pricing, taxes and delivery charges with our team."}</p>

          {metalOptions.length > 0 && <><p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">Gold colour</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {metalOptions.map((option: ProductOption) => (
              <button type="button" key={option.name} onClick={() => { setPreferredVariantId(""); setMetal(option.value); setActiveImage(0); }} aria-pressed={option.value === metal} className={`flex min-h-[55px] min-w-0 items-center gap-2 rounded-md border px-2 py-2 text-left sm:px-3 ${option.value === metal ? "border-2 border-[#214E34] bg-[#F7FFF7]" : "border-transparent bg-[#F7FFF7]"}`}>
                <span aria-hidden="true" className={`size-5 shrink-0 rounded-full border border-black/10 shadow-inner sm:size-6 ${option.tone}`} />
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase leading-tight text-[#4a4a4a] sm:text-[11px]">{option.name}</span>
                </span>
              </button>
            ))}
          </div></>}

          {qualities.length > 0 && <div className="mt-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">Diamond grade</p>
            <div className="flex flex-wrap gap-2">{qualities.map((grade) => <button type="button" key={grade} onClick={() => { setPreferredVariantId(""); setQuality(grade); setActiveImage(0); }} aria-pressed={grade === quality} className={`min-h-10 rounded-md border px-3 py-2 text-xs font-medium ${grade === quality ? "border-[#214E34] bg-[#eef3ed] text-[#214E34]" : "border-[#e3e6de] bg-white text-neutral-600"}`}>{grade}</button>)}</div>
          </div>}
          {product.goldPurities.length > 0 && <Selector title="Gold purity" options={product.goldPurities} selected={carat} onSelect={(value) => { setPreferredVariantId(""); setCarat(value); setActiveImage(0); }} />}
          {product.sizes.length > 0 && <Selector title="Size" options={product.sizes} selected={ringSize} onSelect={(value) => { setPreferredVariantId(""); setRingSize(value); setActiveImage(0); }} onGuide={() => setInfoDialog("guide")} />}

          <ProductEnquiryForm sku={product.sku} selection={selectedOptions} onEngravingChange={setEngraving} onEngravingTextChange={setEngravingText} options={enquiryOptions} />
          <Link href="/contact#consultation-booking" className="mt-2 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-[#F7FFF7] text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]">
            <Video size={14} color={green} /> Discuss a Jewellery Consultation
          </Link>
          {wishlistError && <p role="alert" className="mt-2 text-xs text-[#214E34]">{wishlistError}</p>}
          {feedback && <p role="status" className="mt-2 text-xs text-[#214E34]">{feedback}</p>}

          {highlights.length > 0 && <div className={`mt-3 grid gap-2 rounded-md bg-[#F7FFF7] px-2 py-3 text-center ${highlights.length === 3 ? "grid-cols-3" : highlights.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {highlights.map((item) => <div key={item.label}><p className="text-[9px] font-semibold uppercase text-neutral-500">{item.label}</p><p className="mt-1 text-xs font-semibold text-[#214E34]">{item.value}</p></div>)}
          </div>}
        </aside>
      </div>
    </Container>
    {zoomOpen && gallery.length > 0 && (
      <div role="dialog" aria-modal="true" aria-label="Product images" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setZoomOpen(false)}>
        <button type="button" autoFocus aria-label="Close product images" onClick={() => setZoomOpen(false)} className="absolute right-5 top-5 text-3xl text-white">×</button>
        {gallery.length > 1 && <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActiveImage((index) => (index - 1 + gallery.length) % gallery.length); }} className="absolute left-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#214E34] sm:left-8"><ChevronLeft size={22} /></button>}
        <div className="relative h-[min(80vh,720px)] w-[min(80vw,720px)]" onClick={(event) => event.stopPropagation()}>
          <Image src={activeSource} alt={`${product.name}, view ${activeImage + 1}`} fill sizes="(max-width: 768px) 80vw, 720px" className="object-contain" />
        </div>
        {gallery.length > 1 && <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActiveImage((index) => (index + 1) % gallery.length); }} className="absolute right-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#214E34] sm:right-8"><ChevronRight size={22} /></button>}
        <span className="absolute bottom-5 text-xs text-white">{activeImage + 1} / {gallery.length}</span>
      </div>
    )}
    {infoDialog === "guide" && (
      <InfoDialog title="Jewellery sizing guidance" onClose={() => setInfoDialog(null)} href="/contact#consultation-booking" action="Ask our team">
        <p>Sizing varies by jewellery type and design. Contact our team to confirm measurements, fit and available sizes before ordering.</p>

      </InfoDialog>
    )}
    </>
  );
}

function Selector({ title, options, selected, onSelect, onGuide }: { title: string; options: string[]; selected: string; onSelect: (value: string) => void; onGuide?: () => void }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">
        <span>{title}</span>
        {onGuide && <button type="button" onClick={onGuide} className="flex items-center gap-1 text-[10px] text-[#214E34]"><Ruler size={12} /> Size Guide</button>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button type="button" key={option} onClick={() => onSelect(option)} aria-pressed={option === selected} className={`h-9 rounded-md px-3 text-xs ${option === selected ? "bg-[#214E34] font-semibold text-white" : "bg-[#F7FFF7] text-[#4a4a4a]"}`}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryDimensions({ product }: { product: ProductDetails }) {
  return (
    <section data-product-integrity className={product.categoryDimensions ? "bg-white py-9 sm:py-14" : ""}>
      {product.categoryDimensions && (
        <Container className="max-sm:px-[10px]">
          <Image
            src={product.categoryDimensions}
            alt={`${product.categoryName} dimensions guide`}
            width={1600}
            height={900}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="h-auto w-full"
          />
        </Container>
      )}
    </section>
  );
}

function LegacyAndSuite({ products }: { products: PublicCollectionProduct[] }) {
  const [bagItems, setBagItems] = useState<string[]>([]);
  const { isSaved, toggle, error: wishlistError } = useWishlist();
  const [bagMessage, setBagMessage] = useState("");

  return (
    <>
      <div className="hidden bg-white sm:block">
        <Container>
          <Image src="/PDP/mirayalegacy.png" alt="Miraya Diamonds legacy campaign" width={1376} height={673} sizes="(max-width: 1280px) 100vw, 1216px" className="h-auto w-full rounded-lg" />
        </Container>
      </div>
      <section className="bg-[#F7FFF7] sm:hidden">
        <Image src="/PDP/mirayalegacy_mb.png" alt="Miraya Diamonds legacy campaign" width={937} height={1679} sizes="100vw" className="h-auto w-full" />
      </section>
      {products.length > 0 && <section className="bg-white py-8 sm:py-12">
        <Container className="max-sm:px-[10px]">
          <div className="mb-5 flex items-end justify-between gap-2 sm:mb-6 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#A42D49] sm:text-[10px] sm:tracking-[0.25em] sm:text-[#214E34]">Design Inspiration</p>
              <h2 className="mt-2 font-infant text-[31px] font-semibold leading-none sm:text-[38px]">Explore More Designs</h2>
            </div>
            <Link href="/collection" className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-[#A42D49] sm:text-[10px] sm:uppercase sm:tracking-[0.08em] sm:text-[#214E34]">Explore More <span className="hidden sm:inline">Jewellery</span> <ArrowRight size={13} className="text-[#A42D49]" /></Link>
          </div>
          <div id="curated-sets" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((item) => (
              <article key={item.id} className="min-w-0 rounded-[6px] bg-white p-1.5 shadow-[0_8px_28px_rgba(33,78,52,0.06)]">
                <Link href={`/collection/${encodeURIComponent(item.slug)}`} aria-label={`View ${item.name}`} className="relative block aspect-square overflow-hidden rounded-[5px] bg-[#f6f6f6]">
                  {item.image ? <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 230px" className="h-full w-full object-fill" /> : <span className="absolute inset-0 grid place-items-center text-xs text-neutral-500">Image unavailable</span>}
                </Link>
                <div className="px-1 pb-1 pt-2">
                  <p className="text-xs font-semibold leading-tight sm:text-sm">{formatCataloguePrice(item)}</p>
                  <p className="mt-0.5 truncate text-[11px] leading-tight text-neutral-600 sm:text-xs" title={item.name}>{item.name}</p>
                  <div className="mt-3 flex gap-1">
                    <button type="button" onClick={() => {
                      if (bagItems.includes(item.image)) return;
                      if (saveBagSelection({ name: item.name, image: item.image })) {
                        setBagItems((items) => [...items, item.image]);
                        setBagMessage(`${item.name} added to your bag selection.`);
                      } else {
                        setBagMessage("Could not save this selection in your browser.");
                      }
                    }} className="h-7 min-w-0 flex-1 rounded-full border border-[#214E34] text-[10px] font-medium text-[#214E34]">{bagItems.includes(item.image) ? "Added to Bag" : "Add to Bag"}</button>
                    <button type="button" onClick={() => toggle(item)} aria-label={`${isSaved(item) ? "Remove" : "Add"} ${item.name} ${isSaved(item) ? "from" : "to"} wishlist`} aria-pressed={isSaved(item)} className="grid size-7 shrink-0 place-items-center rounded-full border border-[#214E34] text-[#214E34]"><Heart size={13} fill={isSaved(item) ? "#214E34" : "none"} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {wishlistError && <p role="alert" className="mt-3 text-xs text-[#214E34]">{wishlistError}</p>}
          {bagMessage && <p role="status" className="mt-3 text-xs text-[#214E34]">{bagMessage}</p>}
        </Container>
      </section>}
    </>
  );
}

export function ProductDetailPage({ initialProduct, relatedProducts }: { initialProduct: ProductDetails; relatedProducts: PublicCollectionProduct[] }) {
  const currentProduct = initialProduct;
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const integrity = page?.querySelector<HTMLElement>("[data-product-integrity]");
    if (!page || !header || !integrity) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    function updatePosition() {
      if (!page || !header || !integrity) return;
      if (!desktop.matches) {
        page.style.removeProperty("--pdp-header-height");
        header.style.removeProperty("--pdp-header-top");
        return;
      }
      const height = header.getBoundingClientRect().height;
      const top = Math.max(-height, Math.min(0, integrity.getBoundingClientRect().top - height));
      page.style.setProperty("--pdp-header-height", `${height}px`);
      header.style.setProperty("--pdp-header-top", `${top}px`);
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePosition);
    }

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(header);
    observer.observe(page);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updatePosition();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      page.style.removeProperty("--pdp-header-height");
      header.style.removeProperty("--pdp-header-top");
    };
  }, []);

  return (
    <main ref={pageRef} className={`${styles.page} bg-white font-[family-name:var(--font-inter)] text-[#353333]`}>
      <ProductHero key={currentProduct.id} product={currentProduct} />
      <CategoryDimensions product={currentProduct} />
      <LegacyAndSuite products={relatedProducts} />
    </main>
  );
}
