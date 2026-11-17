"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  MessageCircle,
  Truck,
  Video,
  X,
  ZoomIn,
} from "lucide-react";
import { CustomizationDialog } from "./customization-dialog";
import { ProductEnquiryForm } from "./product-enquiry-form";
import { Container } from "@/components/common/container";
import { product as defaultProduct, suiteProducts } from "./product-data";
import styles from "./product-detail-page.module.css";

const green = "#214E34";

const defaultMetalOptions = [
  { name: "Rose Gold", detail: "18KT", tone: "bg-[linear-gradient(135deg,#E4A494_0%,#F4C5B8_48%,#E3A393_100%)]" },
  { name: "Yellow Gold", detail: "18KT", tone: "bg-[linear-gradient(135deg,#E5C158_0%,#FDE599_48%,#D8B042_100%)]" },
  { name: "Platinum", detail: "950 Platinum", tone: "bg-[linear-gradient(135deg,#D6D8DC_0%,#F1F3F5_48%,#B0B4B9_100%)]" },
];

const defaultQualities = [
  { name: "SI • IJ", detail: "Slightly Included, I–J Colour" },
  { name: "VVS • EF", detail: "Very Very Slightly Included, E–F Colour" },
];

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

function ProductHero({ product = defaultProduct }: { product?: any }) {
  const metalOptions = product.metalOptions || defaultMetalOptions;
  const qualities = product.qualities || defaultQualities;
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : defaultProduct.gallery;
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [metal, setMetal] = useState(metalOptions[0]?.name || "Rose Gold");
  const [quality, setQuality] = useState(qualities[1]?.name || qualities[0]?.name || "VVS • EF");
  const [carat, setCarat] = useState(product.goldPurities?.[0] || "18KT");
  const [ringSize, setRingSize] = useState(product.sizes?.[0] || "12");
  const [engraving, setEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [infoDialog, setInfoDialog] = useState<"ar" | "guide" | null>(null);

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
    metal,
    quality,
    `Metal purity: ${carat}`,
    ringSize === "Bespoke Size" ? ringSize : `Size ${ringSize}`,
    ...(engraving ? [`Engraving: ${engravingText.trim() || "Requested"}`] : []),
  ];
  const whatsappMessage = `I'd like to enquire about ${product.name} (SKU: ${product.sku}).\n${selectedOptions.join(" · ")}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const whatsappClassName = "flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#48c653] px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#36ae42] disabled:cursor-not-allowed disabled:opacity-60";

  function verifyPincode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDeliveryMessage(/^\d{6}$/.test(pincode) ? `Pincode ${pincode} has the correct format. Contact our team to confirm delivery availability.` : "Enter a valid 6-digit Indian pincode.");
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
        <div className={`${styles.gallery} min-w-0`}>
          <div className="flex flex-col gap-5 sm:grid sm:grid-cols-[clamp(58px,6vw,78px)_minmax(0,1fr)] sm:gap-4">
            <div className="order-2 flex gap-2.5 overflow-x-auto pb-1 sm:order-1 sm:grid sm:grid-cols-1 sm:gap-2 sm:overflow-visible sm:pb-0">
              {gallery.map((src: string, index: number) => (
                <div key={`${src}-${index}`} className="w-20 shrink-0 sm:w-full"><Thumb src={src} index={index} active={index === activeImage} onClick={() => setActiveImage(index)} /></div>
              ))}
            </div>

            <div className="relative order-1 aspect-square overflow-hidden rounded-lg bg-[#f2d1b9] sm:order-2 sm:aspect-[4/5] sm:rounded-none">
              <Image
                src={gallery[activeImage] || "/PDP/product1.jpg"}
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
                  <Camera size={14} color={green} /> View Ring Illustration
                </button>
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
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#214E34]">{product.collection}</p>
            <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]">SKU: {product.sku}</p>
          </div>
          <h1 className="font-[family-name:var(--font-cormorant-garamond)] text-[38px] font-semibold leading-[0.98] text-[#4a4646] sm:text-[38px] lg:text-[34px] xl:text-[38px]">
            {product.name}
          </h1>



          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-[27px] font-semibold text-[#214E34]">{product.price}</p>
            {product.discount && <p className="text-sm text-neutral-500 line-through">{product.oldPrice}</p>}
            {product.discount && <span className="rounded-full bg-[#F7FFF7] px-3 py-1 text-[10px] font-semibold text-[#214E34]">{product.discount}</span>}
          </div>
          <p className="mt-1 text-xs text-neutral-600">Confirm the final price, applicable taxes and delivery charges with our team.</p>
          <p className="mt-3 flex items-center gap-2 text-xs text-neutral-700"><LockKeyhole size={13} color={green} /> {product.emi}</p>

          <div className="mt-7 flex items-center justify-between gap-3 text-[#214E34]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4a4a4a]">
              Selected Metal: <b className="text-[#214E34]">{metal === "Platinum" ? "Platinum" : `${carat} ${metal}`}</b>
            </p>
            <p className="shrink-0 text-[11px]">Confirm metal purity</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {metalOptions.map((option: any) => (
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#214E34]">Confirm Available Options</p>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
            {qualities.map((option: any, index: number) => (
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

          <Selector title={`Gold Purity: ${carat}`} options={product.goldPurities?.length ? product.goldPurities : ["18KT"]} selected={carat} onSelect={setCarat} onGuide={() => setInfoDialog("guide")} />
          <Selector title={`Size Preference: ${ringSize}`} options={product.sizes?.length ? product.sizes : ["10", "12", "14", "16", "18", "Bespoke Size"]} selected={ringSize} onSelect={setRingSize} onGuide={() => setInfoDialog("guide")} />

          <label className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase text-neutral-600">
            <input type="checkbox" checked={engraving} onChange={(event) => setEngraving(event.target.checked)} className="size-3.5 accent-[#214E34]" />
            <Pencil size={13} color={green} /> Request Engraving Details
          </label>
          {engraving && <input type="text" value={engravingText} onChange={(event) => setEngravingText(event.target.value)} maxLength={24} aria-label="Engraving text" placeholder="Your engraving, up to 24 characters" className="mt-2 h-9 w-full rounded-md border border-[#214E34] px-3 text-xs outline-none focus:ring-1 focus:ring-[#214E34]" />}

          <div className="mt-6 grid gap-2 min-[400px]:grid-cols-2">
            <CustomizationDialog />
            {whatsappNumber ? <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className={whatsappClassName}>
              <MessageCircle size={15} className="shrink-0" /> Enquire via WhatsApp
            </a> : <button type="button" disabled title="WhatsApp enquiries are currently unavailable" className={whatsappClassName}>
              <MessageCircle size={15} className="shrink-0" /> Enquire via WhatsApp
            </button>}
          </div>
          <ProductEnquiryForm sku={product.sku} selection={selectedOptions} options={{ metalColour: metal, diamondGrade: quality, metalPurity: carat, size: ringSize, engravingRequested: engraving, engravingText }} />
          <Link href="/contact#consultation-booking" className="mt-2 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-[#F7FFF7] text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]">
            <Video size={14} color={green} /> Discuss a Jewellery Consultation
          </Link>
          {feedback && <p role="status" className="mt-2 text-xs text-[#214E34]">{feedback}</p>}

          <div className="mt-3 rounded-md bg-[#F7FFF7] p-3">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#353333]"><Truck size={15} color={green} /> Delivery Enquiry</p>
            <form onSubmit={verifyPincode} className="flex gap-2 rounded-full bg-white p-1.5">
              <input value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, ""))} className="min-w-0 flex-1 px-3 text-xs outline-none" aria-label="6-digit pincode" placeholder="Enter 6-digit Pincode" inputMode="numeric" maxLength={6} />
              <button type="submit" className="rounded-full bg-[#214E34] px-5 text-xs font-semibold text-white">Check Format</button>
            </form>
            <p role="status" className="mt-3 flex gap-2 text-[10px] leading-relaxed text-[#214E34]"><Check size={13} className="shrink-0" /> {deliveryMessage || "Enter your pincode, then contact us to confirm delivery options."}</p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 rounded-md bg-[#F7FFF7] px-1 py-3 text-center">
            {[`Diamond Weight|${product.totalDiamondWeight ? `${product.totalDiamondWeight} ct` : "Confirm with team"}`, `Gross Weight|${product.grossWeight ? `${product.grossWeight} g` : "Confirm with team"}`, "Care|Ask Our Team"].map((item) => {
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
        {gallery.length > 1 && <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActiveImage((index) => (index - 1 + gallery.length) % gallery.length); }} className="absolute left-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#214E34] sm:left-8"><ChevronLeft size={22} /></button>}
        <div className="relative h-[min(80vh,720px)] w-[min(80vw,720px)]" onClick={(event) => event.stopPropagation()}>
          <Image src={gallery[activeImage] || "/PDP/product1.jpg"} alt={`${product.name}, view ${activeImage + 1}`} fill sizes="(max-width: 768px) 80vw, 720px" className="object-contain" />
        </div>
        {gallery.length > 1 && <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActiveImage((index) => (index + 1) % gallery.length); }} className="absolute right-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#214E34] sm:right-8"><ChevronRight size={22} /></button>}
        <span className="absolute bottom-5 text-xs text-white">{activeImage + 1} / {gallery.length}</span>
      </div>
    )}
    {infoDialog === "ar" && (
      <InfoDialog title="View on hand" onClose={() => setInfoDialog(null)}>
        <Image src="/PDP/product2.jpg" alt="Bhvita ring worn on a hand" width={512} height={512} className="mb-3 aspect-square w-full rounded-md object-cover" />
        This is an illustrative ring image. It does not show a live try-on of your selected product.
      </InfoDialog>
    )}
    {infoDialog === "guide" && (
      <InfoDialog title="Jewellery sizing guidance" onClose={() => setInfoDialog(null)} href="/contact#consultation-booking" action="Ask our team">
        <p>Sizing varies by jewellery type and design. Contact our team to confirm measurements, fit and available sizes before ordering.</p>
        <Image src="/PDP/Prod_desc_img.png" alt="Ring profile dimensions" width={577} height={576} className="mx-auto mt-2 w-full max-w-[250px]" />
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

function IntegritySection({ product = defaultProduct }: { product?: any }) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const specs: [string, string][] = product.specs || defaultProduct.specs;

  useEffect(() => {
    if (!sizeOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSizeOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sizeOpen]);

  return (
    <section data-product-integrity className="bg-white py-9 sm:py-14">
      <Container className="max-sm:px-[10px]">
        <div className="mx-auto mb-7 max-w-xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#214E34]">Know Your Jewellery</p>
          <h2 className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-[34px] font-semibold leading-none text-[#201f1f] sm:text-[38px]">Explore the Craft & Details</h2>
          <p className="mt-2 text-xs leading-5 text-neutral-600">Review the specifications and ask our team to confirm the details for your selected piece.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-xl border border-[#eadedd] bg-white p-6 shadow-[0_12px_30px_rgba(33,78,52,0.05)]">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-neutral-200 py-2.5 text-xs last:border-0">
                <span className="text-neutral-500">{label}</span>
                <span className="text-right font-medium text-[#201f1f]">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex min-h-[440px] flex-col items-center rounded-xl border border-[#eadedd] bg-white px-5 pb-7 pt-5 shadow-[0_12px_30px_rgba(33,78,52,0.05)]">
            <div className="flex w-full flex-1 items-center justify-center">
              <Image src="/PDP/Prod_desc_img.png" alt="Illustrative ring dimension diagram" width={577} height={576} className="h-auto w-full max-w-[350px]" />
            </div>
            <button type="button" onClick={() => setSizeOpen(true)} className="flex h-10 w-full max-w-[290px] items-center justify-center gap-2 rounded-full bg-[#214E34] text-xs font-semibold text-white">
              <Camera size={14} /> View Size Illustration
            </button>
          </div>

          <div className="flex flex-col rounded-xl border border-[#eadedd] bg-white p-6 shadow-[0_12px_30px_rgba(33,78,52,0.05)]">
            <div className="flex gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded border border-neutral-200 text-[#214E34]"><FileCheck size={23} /></div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-[21px] font-semibold leading-tight text-[#201f1f]">Diamond Documentation</h3>
                <p className="mt-2 text-xs leading-5 text-neutral-600">Ask our team about the grading report and origin of the diamond in your selected piece.</p>
              </div>
            </div>
            <button type="button" onClick={() => setCertificateOpen(true)} className="mt-4 h-10 w-full rounded-full border border-[#214E34] text-xs font-semibold text-[#214E34]">Ask About Documentation</button>
            <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-3 border-t border-[#eadedd] pt-5 lg:mt-auto lg:grid-cols-1 lg:gap-y-4">
              {[
                [Gem, "Confirm Diamond Origin"],
                [Leaf, "Review Metal Details"],
                [Box, "Discuss Care Options"],
                [Truck, "Confirm Delivery Arrangements"],
              ].map(([Icon, text]) => (
                <p key={String(text)} className="flex min-w-0 items-center gap-2 text-[10px] font-medium sm:text-xs"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-pink-50 text-[#214E34] sm:size-7"><Icon size={13} /></span>{text as string}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-[#eadedd] bg-[#FCF9F8] p-6 sm:mt-9">
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[30px] font-semibold text-[#201f1f]">Make an Informed Choice</h2>
          <p className="mt-3 text-xs leading-5 text-neutral-600">Before ordering, confirm diamond origin, metal purity, sizing, pricing and the care terms for your selected piece with our team.</p>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#214E34]">Talk to Miraya Diamonds <ArrowRight size={13} /></Link>
        </div>
      </Container>
      {sizeOpen && (
        <div role="dialog" aria-modal="true" aria-label="Illustrative ring size" className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setSizeOpen(false)}>
          <div className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-3xl gap-4 overflow-y-auto rounded-lg bg-white p-5 sm:grid-cols-2" onClick={(event) => event.stopPropagation()}>
            <button type="button" autoFocus aria-label="Close size view" onClick={() => setSizeOpen(false)} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-white text-2xl text-[#214E34]">×</button>
            <Image src="/PDP/product2.jpg" alt="Bhvita ring worn on a hand" width={512} height={512} className="aspect-square w-full rounded-md object-cover" />
            <div className="flex flex-col items-center justify-center">
              <Image src="/PDP/Prod_desc_img.png" alt="Ring dimensions: 6.2 mm wide and 5.1 mm high" width={577} height={576} className="w-full max-w-[350px]" />
              <p className="text-xs text-[#214E34]">Illustrative size view. Confirm dimensions for your selected piece.</p>
            </div>
          </div>
        </div>
      )}
      {certificateOpen && (
        <InfoDialog title="Diamond documentation" onClose={() => setCertificateOpen(false)} href="/contact#consultation-booking" action="Request documentation">
          Contact our team for the grading documentation available for SKU {product.sku} and confirm the diamond origin before ordering.
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
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#A42D49] sm:text-[10px] sm:tracking-[0.25em] sm:text-[#214E34]">Design Inspiration</p>
              <h2 className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-[23px] font-semibold leading-none sm:text-[30px]">Explore More Designs</h2>
            </div>
            <Link href="/collection" className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-[#A42D49] sm:text-[10px] sm:uppercase sm:tracking-[0.08em] sm:text-[#214E34]">Explore More <span className="hidden sm:inline">Jewellery</span> <ArrowRight size={13} className="text-[#A42D49]" /></Link>
          </div>
          <div id="curated-sets" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {suiteProducts.map((item, index) => (
              <article key={item.image} className={`min-w-0 rounded-[6px] bg-white p-1.5 shadow-[0_8px_28px_rgba(33,78,52,0.06)] ${["order-4 sm:order-1", "order-3 sm:order-2", "order-2 sm:order-3", "order-5 max-sm:hidden sm:order-4", "order-1 sm:order-5"][index]}`}>
                <div className="relative aspect-square overflow-hidden rounded-[5px] bg-[#f6f6f6]">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 230px" className="object-contain" />
                </div>
                <div className="px-1 pb-1 pt-2">
                  <p className="text-[11px] font-semibold leading-tight">Enquire for Pricing</p>
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

export function ProductDetailPage({ initialProduct }: { initialProduct?: any }) {
  const currentProduct = initialProduct ? {
    ...defaultProduct,
    ...initialProduct,
    metalOptions: (initialProduct.goldColours || []).map((colour: string) => ({
      name: `${colour.charAt(0).toUpperCase() + colour.slice(1)} Gold`,
      detail: (initialProduct.goldPurities || []).join(" / "),
    })),
    qualities: (initialProduct.diamondGrades || []).map((grade: string) => ({ name: grade, detail: "Confirm grading details with our team" })),
  } : defaultProduct;
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
      <ProductHero product={currentProduct} />
      <IntegritySection product={currentProduct} />
      <LegacyAndSuite />
    </main>
  );
}
