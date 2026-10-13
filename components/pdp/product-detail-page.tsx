"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Gem,
  Heart,
  Leaf,
  LockKeyhole,
  Pencil,
  Ruler,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Video,
  X,
  Zap,
  ZoomIn,
} from "lucide-react";
import { Container } from "@/components/common/container";
import { product, suiteProducts } from "./product-data";

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

function ActionButton({
  children,
  dark,
  onClick,
}: {
  children: ReactNode;
  dark?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold text-white transition ${
        dark ? "bg-[#353333] hover:bg-[#211f1f]" : "bg-[#214E34] hover:bg-[#183b28]"
      }`}
    >
      {children}
    </button>
  );
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
        <h2 className="pr-8 font-[family-name:var(--font-cormorant-garamond)] text-[28px] font-semibold leading-tight text-[#353333]">{title}</h2>
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

function ProductHero() {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [metal, setMetal] = useState(product.metalOptions[0].name);
  const [quality, setQuality] = useState(product.qualities[1].name);
  const [carat, setCarat] = useState("18K");
  const [ringSize, setRingSize] = useState("12");
  const [engraving, setEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [infoDialog, setInfoDialog] = useState<"ar" | "guide" | "buy" | null>(null);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomOpen(false);
      if (event.key === "ArrowRight") setActiveImage((index) => (index + 1) % product.gallery.length);
      if (event.key === "ArrowLeft") setActiveImage((index) => (index - 1 + product.gallery.length) % product.gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomOpen]);

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

  function addToBag() {
    const selection = { slug: product.slug, metal, quality, carat, ringSize, engraving: engraving ? engravingText.trim() : "" };
    setFeedback(saveBagSelection(selection) ? `${product.name} was added to your bag selection.` : "Could not save your selection in this browser.");
  }

  function verifyPincode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDeliveryMessage(/^\d{6}$/.test(pincode) ? `Pincode ${pincode} entered. Delivery and COD availability will be confirmed by our team.` : "Enter a valid 6-digit Indian pincode.");
  }

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
        <div className="min-w-0">
          <div className="flex flex-col gap-5 sm:grid sm:grid-cols-[clamp(58px,6vw,78px)_minmax(0,1fr)] sm:gap-4">
            <div className="order-2 flex gap-2.5 overflow-x-auto pb-1 sm:order-1 sm:grid sm:grid-cols-1 sm:gap-2 sm:overflow-visible sm:pb-0">
              {product.gallery.map((src, index) => (
                <div key={`${src}-${index}`} className="w-20 shrink-0 sm:w-full"><Thumb src={src} index={index} active={index === activeImage} onClick={() => setActiveImage(index)} /></div>
              ))}
            </div>

            <div className="relative order-1 aspect-square overflow-hidden rounded-lg bg-[#f2d1b9] sm:order-2 sm:aspect-[4/5] sm:rounded-none">
              <Image
                src={product.gallery[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className={`cursor-zoom-in ${activeImage === 3 || activeImage === 5 ? "object-contain" : "object-cover"}`}
                onClick={() => setZoomOpen(true)}
              />
              <span className="absolute left-4 top-4 hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#214E34] sm:block">{product.badge}</span>
              <div className="absolute right-4 top-4 hidden gap-2 sm:grid">
                <button type="button" onClick={() => setLiked(!liked)} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={liked} className="grid size-9 place-items-center bg-white text-[#353333]">
                  <Heart size={18} fill={liked ? "#214E34" : "none"} />
                </button>
                <button type="button" onClick={shareProduct} aria-label="Share product" className="grid size-9 place-items-center bg-white text-[#353333]">
                  <Share2 size={17} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 hidden flex-wrap items-center gap-2 sm:left-5 sm:right-5 sm:flex">
                <button type="button" onClick={() => setInfoDialog("ar")} className="flex items-center gap-1.5 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.04em]">
                  <Camera size={14} color={green} /> Live AR Try-On
                </button>
                <button type="button" onClick={() => setZoomOpen(true)} className="flex items-center gap-1.5 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.04em]">
                  <Video size={14} color={green} /> 360° View
                </button>
                <button type="button" onClick={() => setZoomOpen(true)} className="ml-auto flex items-center gap-1.5 bg-[#4b4037]/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.04em] text-white">
                  <ZoomIn size={14} /> Hover To Zoom
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:mt-8 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:pb-0">
            {[
              [Gem, "100% Certified", "IGI & GIA Authenticated"],
              [BadgeCheck, "BIS Hallmarked", "750 (18K) Gold Purity"],
              [ShieldCheck, "Insured Transit", "Armored Doorstep Delivery"],
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
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#214E34]">{product.collection}</p>
            <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]">SKU: {product.sku}</p>
          </div>
          <h1 className="font-[family-name:var(--font-cormorant-garamond)] text-[38px] font-semibold leading-[0.98] text-[#4a4646] sm:text-[38px] lg:text-[34px] xl:text-[38px]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="flex text-[#E2BD60]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</span>
            <span className="text-[#353333]">{product.rating}</span>
            <span className="font-bold text-[#214E34]">{product.reviews}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-[27px] font-semibold text-[#214E34]">{product.price}</p>
            <p className="text-sm text-neutral-500 line-through">{product.oldPrice}</p>
            <span className="rounded-full bg-[#F7FFF7] px-3 py-1 text-[10px] font-semibold text-[#214E34]">{product.discount}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-600">Price inclusive of all taxes. Free transit insured shipping across India.</p>
          <p className="mt-3 flex items-center gap-2 text-xs text-neutral-700"><LockKeyhole size={13} color={green} /> {product.emi}</p>

          <div className="mt-7 flex items-center justify-between gap-3 text-[#214E34]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">
              Selected Metal: <b className="text-[#214E34]">{metal === "Platinum" ? "Platinum" : `${carat} ${metal}`}</b>
            </p>
            <p className="shrink-0 text-[11px]">Hallmarked 750</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {product.metalOptions.map((option) => (
              <button type="button" key={option.name} onClick={() => setMetal(option.name)} aria-pressed={option.name === metal} className={`flex min-h-[55px] min-w-0 items-center gap-2 rounded-md border px-2 py-2 text-left sm:px-3 ${option.name === metal ? "border-2 border-[#214E34] bg-[#F7FFF7]" : "border-transparent bg-[#F7FFF7]"}`}>
                <span className={`size-5 shrink-0 rounded-full sm:size-6 ${option.tone}`} />
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase leading-tight text-[#4a4a4a] sm:text-[11px]">{option.name}</span>
                  <span className="block text-[10px] leading-tight text-[#214E34] sm:text-[11px]">{option.name === "Platinum" ? option.detail : carat}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">Diamond Quality Tier</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#214E34]">Natural Solitaire</p>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
            {product.qualities.map((option, index) => (
              <button type="button" key={option.name} onClick={() => setQuality(option.name)} aria-pressed={option.name === quality} className={`min-h-[57px] min-w-[210px] rounded-md border px-2 py-2 text-left sm:min-w-0 sm:px-3 ${option.name === quality ? "border-2 border-[#214E34] bg-[#F7FFF7]" : "border-transparent bg-[#F7FFF7]"}`}>
                <span className="flex items-center justify-between gap-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#214E34]">
                  {option.name}
                  {index === 0 && <span className="text-[10px] font-normal normal-case tracking-normal text-[#5a4f4b]">Standard</span>}
                  {index === 1 && <span className="rounded-full bg-[#ffd5df] px-2 py-0.5 text-[9px] font-medium normal-case tracking-normal text-[#7e4a4f]">Curated</span>}
                </span>
                <span className="mt-1 block text-[10px] leading-tight text-[#5a4f4b]">{option.detail}</span>
              </button>
            ))}
          </div>

          <Selector title={`Carat: ${carat}`} options={["14K", "16K", "18K", "20K", "22K"]} selected={carat} onSelect={setCarat} onGuide={() => setInfoDialog("guide")} />
          <Selector title={`Indian Ring Size: ${ringSize}`} options={["10", "12", "14", "16", "18", "Bespoke Size"]} selected={ringSize} onSelect={setRingSize} onGuide={() => setInfoDialog("guide")} />

          <label className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase text-neutral-600">
            <input type="checkbox" checked={engraving} onChange={(event) => setEngraving(event.target.checked)} className="size-3.5 accent-[#214E34]" />
            <Pencil size={13} color={green} /> Add Free Laser Atelier Engraving
          </label>
          {engraving && <input type="text" value={engravingText} onChange={(event) => setEngravingText(event.target.value)} maxLength={24} aria-label="Engraving text" placeholder="Your engraving, up to 24 characters" className="mt-2 h-9 w-full rounded-md border border-[#214E34] px-3 text-xs outline-none focus:ring-1 focus:ring-[#214E34]" />}

          <div className="mt-6 flex gap-2">
            <ActionButton onClick={addToBag}><ShoppingBag size={15} /> Add to Bag</ActionButton>
            <ActionButton dark onClick={() => setInfoDialog("buy")}><Zap size={15} /> Buy Now</ActionButton>
          </div>
          <Link href="/contact#consultation-booking" className="mt-2 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-[#F7FFF7] text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]">
            <Video size={14} color={green} /> Book 1-On-1 Virtual Atelier Consultation
          </Link>
          {feedback && <p role="status" className="mt-2 text-xs text-[#214E34]">{feedback}</p>}

          <div className="mt-3 rounded-md bg-[#F7FFF7] p-3">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]"><Truck size={15} color={green} /> Estimated Delivery & COD Availability</p>
            <form onSubmit={verifyPincode} className="flex gap-2 rounded-full bg-white p-1.5">
              <input value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, ""))} className="min-w-0 flex-1 px-3 text-xs outline-none" aria-label="6-digit pincode" placeholder="Enter 6-digit Pincode" inputMode="numeric" maxLength={6} />
              <button type="submit" className="rounded-full bg-[#214E34] px-5 text-xs font-semibold text-white">Verify</button>
            </form>
            <p role="status" className="mt-3 flex gap-2 text-[10px] leading-relaxed text-[#214E34]"><Check size={13} className="shrink-0" /> {deliveryMessage || "Enter a pincode for delivery and COD confirmation."}</p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 rounded-md bg-[#F7FFF7] px-1 py-3 text-center">
            {["Diamond Wt|0.65 Carat", "Gross Wt|4.82 Grams", "Guarantee|Lifetime Buyback"].map((item) => {
              const [label, value] = item.split("|");
              return <div key={label}><p className="text-[9px] font-semibold uppercase text-neutral-500">{label}</p><p className="mt-1 text-xs font-semibold text-[#214E34]">{value}</p></div>;
            })}
          </div>
        </aside>
      </div>
    </Container>
    {zoomOpen && (
      <div role="dialog" aria-modal="true" aria-label="Product images" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setZoomOpen(false)}>
        <button type="button" autoFocus aria-label="Close product images" onClick={() => setZoomOpen(false)} className="absolute right-5 top-5 text-3xl text-white">×</button>
        {product.gallery.length > 1 && <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActiveImage((index) => (index - 1 + product.gallery.length) % product.gallery.length); }} className="absolute left-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#214E34] sm:left-8"><ChevronLeft size={22} /></button>}
        <div className="relative h-[min(80vh,720px)] w-[min(80vw,720px)]" onClick={(event) => event.stopPropagation()}>
          <Image src={product.gallery[activeImage]} alt={`${product.name}, view ${activeImage + 1}`} fill sizes="(max-width: 768px) 80vw, 720px" className="object-contain" />
        </div>
        {product.gallery.length > 1 && <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActiveImage((index) => (index + 1) % product.gallery.length); }} className="absolute right-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#214E34] sm:right-8"><ChevronRight size={22} /></button>}
        <span className="absolute bottom-5 text-xs text-white">{activeImage + 1} / {product.gallery.length}</span>
      </div>
    )}
    {infoDialog === "ar" && (
      <InfoDialog title="View on hand" onClose={() => setInfoDialog(null)}>
        <Image src="/PDP/product2.jpg" alt="Bhvita ring worn on a hand" width={512} height={512} className="mb-3 aspect-square w-full rounded-md object-cover" />
        Live camera try-on is not available for this product yet. This image shows the ring worn on a hand.
      </InfoDialog>
    )}
    {infoDialog === "guide" && (
      <InfoDialog title="Ring size guidance" onClose={() => setInfoDialog(null)} href="/contact#consultation-booking" action="Ask the atelier">
        <p>Choose your usual Indian ring size if you know it. For a precise fit or bespoke size, our atelier can help you measure before ordering.</p>
        <Image src="/PDP/Prod_desc_img.png" alt="Ring profile dimensions" width={577} height={576} className="mx-auto mt-2 w-full max-w-[250px]" />
      </InfoDialog>
    )}
    {infoDialog === "buy" && (
      <InfoDialog title="Your selection" onClose={() => setInfoDialog(null)} href="/contact#consultation-booking" action="Enquire to purchase">
        <p className="font-semibold">{product.name}</p>
        <p className="mt-2">{metal}, {carat} · {quality} · Ring size {ringSize}{engraving && engravingText.trim() ? ` · Engraving: ${engravingText.trim()}` : ""}</p>
        <p className="mt-2 font-semibold text-[#214E34]">{product.price}</p>
        <p className="mt-2">Online checkout is not connected yet. The atelier can help complete this order.</p>
      </InfoDialog>
    )}
    </>
  );
}

function Selector({ title, options, selected, onSelect, onGuide }: { title: string; options: string[]; selected: string; onSelect: (value: string) => void; onGuide: () => void }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">
        <span>{title}</span>
        <button type="button" onClick={onGuide} className="flex items-center gap-1 text-[10px] text-[#214E34]"><Ruler size={12} /> Size Guide</button>
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

function IntegritySection() {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);

  useEffect(() => {
    if (!sizeOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSizeOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sizeOpen]);

  return (
    <section className="bg-white py-9 sm:py-14">
      <Container className="max-sm:px-[10px]">
        <div className="mx-auto mb-7 max-w-xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#214E34]">Absolute Integrity</p>
          <h2 className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-[34px] font-semibold leading-none text-[#201f1f] sm:text-[38px]">Unveiling the Craft & Purity</h2>
          <p className="mt-2 text-xs leading-5 text-neutral-600">Every gram of gold accounted for, every facet certified by the world&apos;s strictest laboratories.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-xl border border-[#eadedd] bg-white p-6 shadow-[0_12px_30px_rgba(33,78,52,0.05)]">
            {product.specs.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-neutral-200 py-2.5 text-xs last:border-0">
                <span className="text-neutral-500">{label}</span>
                <span className="text-right font-medium text-[#201f1f]">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex min-h-[440px] flex-col items-center rounded-xl border border-[#eadedd] bg-white px-5 pb-7 pt-5 shadow-[0_12px_30px_rgba(33,78,52,0.05)]">
            <div className="flex w-full flex-1 items-center justify-center">
              <Image src="/PDP/Prod_desc_img.png" alt="Ring dimension diagram" width={577} height={576} className="h-auto w-full max-w-[350px]" />
            </div>
            <button type="button" onClick={() => setSizeOpen(true)} className="flex h-10 w-full max-w-[290px] items-center justify-center gap-2 rounded-full bg-[#214E34] text-xs font-semibold text-white">
              <Camera size={14} /> View Size on Hand
            </button>
          </div>

          <div className="flex flex-col rounded-xl border border-[#eadedd] bg-white p-6 shadow-[0_12px_30px_rgba(33,78,52,0.05)]">
            <div className="flex gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded border border-neutral-200 text-[#214E34]"><FileCheck size={23} /></div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-[21px] font-semibold leading-tight text-[#201f1f]">IGI Certified Natural Diamond</h3>
                <p className="mt-2 text-xs leading-5 text-neutral-600">Comes with an international certificate ensuring authenticity, quality and peace of mind.</p>
              </div>
            </div>
            <button type="button" onClick={() => setCertificateOpen(true)} className="mt-4 h-10 w-full rounded-full border border-[#214E34] text-xs font-semibold text-[#214E34]">View Certificate</button>
            <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-3 border-t border-[#eadedd] pt-5 lg:mt-auto lg:grid-cols-1 lg:gap-y-4">
              {[
                [Gem, "100% Natural Diamonds"],
                [Leaf, "BIS Hallmarked Gold"],
                [Box, "Lifetime Exchange"],
                [Truck, "Free & Insured Delivery"],
              ].map(([Icon, text]) => (
                <p key={String(text)} className="flex min-w-0 items-center gap-2 text-[10px] font-medium sm:text-xs"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-pink-50 text-[#214E34] sm:size-7"><Icon size={13} /></span>{text as string}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:mt-9 sm:gap-y-4">
          <h2 className="w-full font-[family-name:var(--font-cormorant-garamond)] text-[30px] font-semibold leading-none text-[#201f1f] sm:w-auto sm:text-[34px]">Customer Stories</h2>
          <p className="text-[11px] text-neutral-500 sm:text-xs"><b className="text-[#201f1f]">4.8 out of 5</b> <span className="mx-1 text-[#E2BD60] sm:mx-2">★★★★★</span> (148 Reviews)</p>
          <Link href="/testimonials" className="ml-auto text-[11px] font-semibold text-[#A42D49] sm:text-xs">View All <ArrowRight size={13} className="inline" /></Link>
        </div>
        <div className="relative mt-4 flex gap-3 overflow-x-auto pb-3 md:mt-5 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0">
          {["The ring is even more beautiful in person. The craftsmanship is exceptional!", "Absolutely loved it! Elegant, timeless and perfect for my engagement.", "Such fine detailing. The filigree work makes it truly special."].map((story, index) => (
            <article key={story} className="min-w-[260px] rounded-lg border border-[#eadedd] bg-white p-4 shadow-sm md:min-w-0 md:p-6">
              <p className="mb-3 text-sm text-[#E2BD60]">★★★★★</p>
              <p className="min-h-12 text-xs leading-5 text-[#353333]">“{story}”</p>
              <div className="mt-5 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-pink-50 text-xs font-bold text-[#214E34]">{["A", "R", "S"][index]}</span>
                <b className="text-xs">{["Aditi S.", "Riya M.", "Sneha K."][index]}</b>
                <Check size={13} className="text-emerald-600" />
                <span className="text-[10px] text-neutral-500">Verified Purchase</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
      {sizeOpen && (
        <div role="dialog" aria-modal="true" aria-label="Ring size on hand" className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setSizeOpen(false)}>
          <div className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-3xl gap-4 overflow-y-auto rounded-lg bg-white p-5 sm:grid-cols-2" onClick={(event) => event.stopPropagation()}>
            <button type="button" autoFocus aria-label="Close size view" onClick={() => setSizeOpen(false)} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-white text-2xl text-[#214E34]">×</button>
            <Image src="/PDP/product2.jpg" alt="Bhvita ring worn on a hand" width={512} height={512} className="aspect-square w-full rounded-md object-cover" />
            <div className="flex flex-col items-center justify-center">
              <Image src="/PDP/Prod_desc_img.png" alt="Ring dimensions: 6.2 mm wide and 5.1 mm high" width={577} height={576} className="w-full max-w-[350px]" />
              <p className="text-xs text-[#214E34]">6.2 mm wide · 5.1 mm high</p>
            </div>
          </div>
        </div>
      )}
      {certificateOpen && (
        <InfoDialog title="Diamond certificate" onClose={() => setCertificateOpen(false)} href="/contact#consultation-booking" action="Request certificate details">
          The certificate image for SKU {product.sku} has not been added to this product yet. Contact the atelier for the verified document before ordering.
        </InfoDialog>
      )}
    </section>
  );
}

function LegacyAndSuite() {
  const [bagItems, setBagItems] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
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
      <section className="bg-white py-8 sm:py-12">
        <Container className="max-sm:px-[10px]">
          <div className="mb-5 flex items-end justify-between gap-2 sm:mb-6 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#A42D49] sm:text-[10px] sm:tracking-[0.25em] sm:text-[#214E34]">Harmonious Ensembles</p>
              <h2 className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-[23px] font-semibold leading-none sm:text-[30px]">Complete the Bhvita Suite</h2>
            </div>
            <Link href="#curated-sets" className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-[#A42D49] sm:text-[10px] sm:uppercase sm:tracking-[0.08em] sm:text-[#214E34]">Explore All <span className="hidden sm:inline">Curated </span>Sets <ArrowRight size={13} className="text-[#A42D49]" /></Link>
          </div>
          <div id="curated-sets" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {suiteProducts.map((item, index) => (
              <article key={item.image} className={`min-w-0 rounded-[6px] bg-white p-1.5 shadow-[0_8px_28px_rgba(33,78,52,0.06)] ${["order-4 sm:order-1", "order-3 sm:order-2", "order-2 sm:order-3", "order-5 max-sm:hidden sm:order-4", "order-1 sm:order-5"][index]}`}>
                <div className="relative aspect-square overflow-hidden rounded-[5px] bg-[#f6f6f6]">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 230px" className="object-contain" />
                </div>
                <div className="px-1 pb-1 pt-2">
                  <p className="text-[11px] font-semibold leading-tight">₹38,255 <span className="ml-1 text-[9px] font-normal text-neutral-400 line-through">₹40,255</span></p>
                  <p className="mt-0.5 truncate text-[10px] leading-tight text-neutral-600" title={item.name}>{item.name}</p>
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
                    <button type="button" onClick={() => setSavedItems((items) => items.includes(item.image) ? items.filter((image) => image !== item.image) : [...items, item.image])} aria-label={`${savedItems.includes(item.image) ? "Remove" : "Add"} ${item.name} ${savedItems.includes(item.image) ? "from" : "to"} wishlist`} aria-pressed={savedItems.includes(item.image)} className="grid size-7 shrink-0 place-items-center rounded-full border border-[#214E34] text-[#214E34]"><Heart size={13} fill={savedItems.includes(item.image) ? "#214E34" : "none"} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {bagMessage && <p role="status" className="mt-3 text-xs text-[#214E34]">{bagMessage}</p>}
        </Container>
      </section>
    </>
  );
}

export function ProductDetailPage() {
  return (
    <main className="bg-white font-[family-name:var(--font-inter)] text-[#353333]">
      <ProductHero />
      <IntegritySection />
      <LegacyAndSuite />
    </main>
  );
}
