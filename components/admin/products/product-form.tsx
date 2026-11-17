"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, UploadCloud, Loader2, Star, Check, Minus } from "lucide-react";
import { saveAdminProduct } from "@/lib/actions/admin-products";
import type { Category } from "@/lib/db/schema";
import type { ProductEditorData, ProductFormInput, VariantInput } from "@/lib/admin/product-form";
import { isProductImageKey, validateProductInput } from "@/lib/admin/product-form";
import { calculateProductPrice, formatProductPrice, GOLD_PRICING } from "@/lib/product-pricing";
import { getImageUrl } from "@/lib/imageUrl";

const control = "mt-2 block min-h-11 w-full min-w-0 rounded-lg border border-[#ded8d1] bg-white px-3 py-2.5 text-sm text-[#353333] outline-none focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34] disabled:bg-[#f7f5f1]";
const secondary = "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#ded8d1] bg-white px-4 py-2 text-xs font-medium text-[#214E34] hover:bg-[#f7f5f1] disabled:opacity-50";
const colourButton = "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34]";
const productOptionFields = [
  { key: "goldPurities", variantKey: "goldPurity", label: "Gold purities", placeholder: "e.g. 10KT", choices: ["14KT", "18KT", "22KT", "24KT", "950 Platinum"] },
  { key: "diamondGrades", variantKey: "diamondGrade", label: "Diamond grades", placeholder: "e.g. IF-D", choices: ["EF-VVS", "IJ-SI", "VVS1-EF", "VVS2-EF", "VS1-FG", "VS-GH"] },
  { key: "sizes", variantKey: "size", label: "Sizes", placeholder: "e.g. 20 or 18 inch", choices: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "Standard"] },
] as const;
type ProductOptionKey = (typeof productOptionFields)[number]["key"];
const goldColourOptions = [
  { value: "yellow", label: "Yellow gold", swatch: "#D4B56E" },
  { value: "rose", label: "Rose gold", swatch: "#C99383" },
  { value: "white", label: "White gold", swatch: "#D5D7D9" },
];
function jewelleryTypeKey(value: string) {
  const type = value.trim().toLowerCase();
  const aliases: Record<string, string> = {
    rings: "ring", necklaces: "necklace", earrings: "earring", bracelets: "bracelet",
    bangles: "bangle", pendants: "pendant", solitaires: "solitaire",
  };
  return aliases[type] || type;
}

const timestamp = (value?: string | null) => value ? new Date(value).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) : "—";

function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="block min-w-0 text-xs font-medium text-[#6f6a61]">{label}{props.required && <span aria-hidden="true"> *</span>}<input {...props} className={control} /></label>;
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="min-w-0 rounded-xl border border-[#e9e4df] bg-white p-5 sm:p-7"><h2 className="font-serif text-2xl text-[#214E34]">{title}</h2>{description && <p className="mt-1 text-xs leading-6 text-[#8a837b]">{description}</p>}<div className="mt-6">{children}</div></section>;
}

type ImageUpload = { key: string; file: File; preview: string; asCover: boolean; status: "queued" | "uploading" | "failed"; error?: string };

function blankVariant(key: string, sku = "", name = ""): VariantInput {
  return { key, sku, name, metalColour: null, goldPurity: null, diamondGrade: null, size: null, price: null, stock: null, isInStock: null };
}

export function ProductForm({ initialProduct, categories }: { initialProduct?: ProductEditorData; categories: Category[] }) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormInput>(() => initialProduct || {
    sku: "", name: "", description: "", jewelleryType: "", categoryId: null,
    diamondGrades: [], goldPurities: [], goldColours: [], sizes: [], bannerImage: null,
    grossWeight: "", netGoldWeight: "", diamondPieces: null, totalDiamondWeight: "", diamondPrice: "", makingCharge: "",
    dimensions: { height: "", width: "", length: "" }, variants: [], media: [],
  });
  const [optionDrafts, setOptionDrafts] = useState({ goldPurities: "", diamondGrades: "", sizes: "" });
  const [customOptions, setCustomOptions] = useState<Record<ProductOptionKey, string[]>>(() => ({ goldPurities: [...form.goldPurities], diamondGrades: [...form.diamondGrades], sizes: [...form.sizes] }));
  const [removedOptions, setRemovedOptions] = useState<Record<ProductOptionKey, string[]>>({ goldPurities: [], diamondGrades: [], sizes: [] });
  const [managedOptions, setManagedOptions] = useState<ProductOptionKey | null>(null);
  const [pricingPurity, setPricingPurity] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploads, setUploads] = useState<ImageUpload[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const uploading = uploads.some((item) => item.status !== "failed");
  const objectUrls = useRef(new Set<string>());
  const requests = useRef(new Set<AbortController>());
  useEffect(() => {
    const urls = objectUrls.current;
    const controllers = requests.current;
    return () => { controllers.forEach((controller) => controller.abort()); urls.forEach((url) => URL.revokeObjectURL(url)); };
  }, []);
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  const jewelleryTypes = [...new Set([
    "ring", "necklace", "earring", "bracelet", "bangle", "pendant", "solitaire",
    ...categories.map((category) => category.slug), form.jewelleryType,
  ].map(jewelleryTypeKey).filter(Boolean))];
  const options = form;
  const previewPurity = form.goldPurities.includes(pricingPurity) ? pricingPurity : form.goldPurities[0] || "";
  const pricing = calculateProductPrice(form, previewPurity);
  const allColoursSelected = goldColourOptions.every((colour) => form.goldColours.includes(colour.value));
  function update<K extends keyof ProductFormInput>(key: K, value: ProductFormInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  function selectColours(colours: string[]) {
    setForm((current) => ({
      ...current,
      goldColours: colours,
      variants: current.variants.map((variant) => variant.metalColour && !colours.includes(variant.metalColour) ? { ...variant, metalColour: null } : variant),
    }));
  }
  function selectOption(key: ProductOptionKey, value: string, selected: boolean) {
    const variantKey = productOptionFields.find((field) => field.key === key)!.variantKey;
    setForm((current) => ({
      ...current,
      [key]: selected ? [...new Set([...current[key], value])] : current[key].filter((option) => option !== value),
      variants: current.variants.map((variant) => !selected && variant[variantKey] === value ? { ...variant, [variantKey]: null } : variant),
    }));
  }
  function removeMenuOption(key: ProductOptionKey, value: string) {
    if (form[key].includes(value)) return;
    setRemovedOptions((current) => ({ ...current, [key]: [...new Set([...current[key], value])] }));
  }
  function addOption(key: ProductOptionKey) {
    const entered = optionDrafts[key].trim();
    if (!entered) return;
    const field = productOptionFields.find((field) => field.key === key)!;
    const choices = [...field.choices, ...customOptions[key], ...form[key]];
    const value = choices.find((option) => option.toLowerCase() === entered.toLowerCase()) || entered;
    setCustomOptions((current) => ({ ...current, [key]: [...new Set([...current[key], value])] }));
    setRemovedOptions((current) => ({ ...current, [key]: current[key].filter((option) => option !== value) }));
    selectOption(key, value, true);
    setOptionDrafts((current) => ({ ...current, [key]: "" }));
  }
  function updateVariant(key: string, values: Partial<VariantInput>) {
    setForm((current) => ({ ...current, variants: current.variants.map((variant) => variant.key === key ? { ...variant, ...values } : variant) }));
  }
  function removeVariant(key: string) {
    setForm((current) => ({ ...current, variants: current.variants.filter((variant) => variant.key !== key), media: current.media.map((item) => item.variantKey === key ? { ...item, variantKey: null } : item) }));
  }
  function showError(message: string) {
    setError(message);
    requestAnimationFrame(() => { errorRef.current?.focus(); errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); });
  }
  async function uploadPhoto(item: ImageUpload) {
    const controller = new AbortController();
    requests.current.add(controller);
    setUploads((current) => current.map((upload) => upload.key === item.key ? { ...upload, status: "uploading", error: undefined } : upload));
    try {
      const body = new FormData();
      body.append("file", item.file);
      body.append("folder", "products");
      const response = await fetch("/api/upload", { method: "POST", body, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Upload failed. Please try again.");
      if (typeof result.fileKey !== "string" || !isProductImageKey(result.fileKey)) throw new Error("The upload returned an invalid image reference.");
      if (controller.signal.aborted) return;
      const key = result.fileKey as string;
      setPreviews((current) => ({ ...current, [item.key]: item.preview }));
      setForm((current) => ({ ...current, bannerImage: item.asCover || !current.bannerImage ? key : current.bannerImage, media: [...current.media, { key: item.key, mediaType: "image", mediaURL: key, variantKey: null }] }));
      setUploads((current) => current.filter((upload) => upload.key !== item.key));
    } catch (error) {
      if (!controller.signal.aborted) setUploads((current) => current.map((upload) => upload.key === item.key ? { ...upload, status: "failed", error: error instanceof Error ? error.message : "Upload failed. Please try again." } : upload));
    } finally { requests.current.delete(controller); }
  }
  function uploadImages(files: FileList | null) {
    if (!files?.length) return;
    const batch: ImageUpload[] = Array.from(files).map((file, index) => {
      const preview = URL.createObjectURL(file);
      objectUrls.current.add(preview);
      const error = file.size > 10 * 1024 * 1024 ? "This image exceeds the 10 MB limit." : !["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg+xml"].includes(file.type) ? "Choose a supported image format." : undefined;
      return { key: crypto.randomUUID(), file, preview, asCover: !form.bannerImage && index === 0, status: error ? "failed" : "queued", error };
    });
    setUploads((current) => [...current, ...batch]);
    const queue = batch.filter((item) => item.status !== "failed");
    void Promise.all(Array.from({ length: Math.min(3, queue.length) }, async () => {
      let item;
      while ((item = queue.shift())) await uploadPhoto(item);
    }));
    if (galleryInput.current) galleryInput.current.value = "";
  }
  function removeUpload(item: ImageUpload) {
    setUploads((current) => current.filter((upload) => upload.key !== item.key));
    URL.revokeObjectURL(item.preview);
    objectUrls.current.delete(item.preview);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || uploading) return;
    if (uploads.length) { showError("Retry or remove failed images before saving."); return; }
    const input = form;
    const validation = validateProductInput(input);
    if (validation) { showError(validation); return; }
    setError("");
    setSaving(true);
    try {
      const result = await saveAdminProduct(initialProduct?.id || null, input);
      if (!result.success) { showError(result.error); return; }
      router.push("/admin/products");
      router.refresh();
    } catch { showError("The product could not be saved. Please try again."); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <header className="border-b border-[#e9e4df] pb-7">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-xs text-[#817b70]"><ArrowLeft size={14} />All products</Link>
        <h1 className="mt-5 font-serif text-4xl font-medium text-[#214E34] sm:text-[42px]">{initialProduct ? "Edit product" : "Add product"}</h1>
        <p className="mt-2 text-xs leading-6 text-[#8a837b]">{initialProduct ? initialProduct.name : "Create a new jewellery design for your catalogue."} · Only title, SKU, category, description and images are required</p>
      </header>
      {error && <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none">{error}</div>}
      <fieldset disabled={saving} className="min-w-0 space-y-6 disabled:opacity-70">
        <Section title="Product details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Product title" required maxLength={300} value={form.name} onChange={(e) => update("name", e.target.value)} />
            <Field label="Product SKU" required maxLength={120} value={form.sku} onChange={(e) => update("sku", e.target.value)} />
            <label className="text-xs font-medium text-[#6f6a61]">Category *<select required value={form.categoryId || ""} onChange={(e) => update("categoryId", e.target.value || null)} className={control}><option value="">Select a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
            <label className="text-xs font-medium text-[#6f6a61]">Jewellery type
              <select value={form.jewelleryType} onChange={(event) => update("jewelleryType", event.target.value)} className={control}>
                <option value="">Select a jewellery type</option>
                {jewelleryTypes.map((type) => <option key={type} value={jewelleryTypeKey(form.jewelleryType) === type ? form.jewelleryType : type}>{type.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</option>)}
              </select>
            </label>
            <label className="text-xs font-medium text-[#6f6a61] sm:col-span-2">Description *<textarea required value={form.description} onChange={(e) => update("description", e.target.value)} rows={5} className={`${control} resize-y`} /></label>
          </div>
          <div className="mt-6 space-y-5">
            <fieldset>
              <legend className="text-xs font-medium text-[#6f6a61]">Available gold colours</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" aria-pressed={allColoursSelected} onClick={() => selectColours(allColoursSelected ? [] : goldColourOptions.map((colour) => colour.value))} className={`${colourButton} ${allColoursSelected ? "border-[#214E34] bg-[#214E34] text-white hover:bg-[#193e29]" : "border-[#ded8d1] bg-white text-[#214E34] hover:bg-[#f7f5f1]"}`}>
                  {allColoursSelected && <Check size={14} />}All colours
                </button>
                {goldColourOptions.map((colour) => {
                  const selected = form.goldColours.includes(colour.value);
                  return <button key={colour.value} type="button" aria-pressed={selected} onClick={() => selectColours(selected ? form.goldColours.filter((value) => value !== colour.value) : [...form.goldColours, colour.value])} className={`${colourButton} ${selected ? "border-[#214E34] bg-[#214E34] text-white hover:bg-[#193e29]" : "border-[#ded8d1] bg-white text-[#214E34] hover:bg-[#f7f5f1]"}`}><span aria-hidden="true" className="size-4 rounded-full border border-black/10" style={{ backgroundColor: colour.swatch }} />{colour.label}{selected && <Check size={13} />}</button>;
                })}
              </div>
              <p className="mt-2 text-[11px] text-[#8a837b]">Select one, several or all three. Variant colour choices follow this selection.</p>
            </fieldset>
            <div className="grid items-start gap-4 xl:grid-cols-3">
              {productOptionFields.map(({ key, label, placeholder, choices }) => {
                const managing = managedOptions === key;
                const available = [...new Set([...choices, ...customOptions[key], ...form[key]])];
                return <fieldset key={key} className="min-w-0 rounded-lg border border-[#e9e4df] p-4">
                <legend className="px-1 text-xs font-medium text-[#6f6a61]">{label}</legend>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] text-[#8a837b]">{form[key].length} selected</p>
                  <button type="button" aria-expanded={managing} aria-controls={`options-${key}`} onClick={() => setManagedOptions(managing ? null : key)} className={`min-h-8 rounded-md px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] ${managing ? "bg-[#214E34] text-white" : "text-[#214E34] hover:bg-[#eef3ed]"}`}>{managing ? "Done" : "Manage options"}</button>
                </div>
                <div id={`options-${key}`}>
                  {managing ? <div className="rounded-md border border-[#e9e4df] bg-[#faf9f6]">
                    <p className="px-3 py-2.5 text-[11px] leading-5 text-[#8a837b]">Remove unused choices from this menu. Selected values are protected.</p>
                    <ul className="max-h-56 divide-y divide-[#e9e4df] overflow-y-auto">
                      {available.map((value) => {
                        const selected = form[key].includes(value);
                        const hidden = !selected && removedOptions[key].includes(value);
                        return <li key={value} className="flex min-h-11 items-center justify-between gap-3 px-3 py-1.5">
                          <span className={`min-w-0 break-words text-xs ${hidden ? "text-[#9a948a]" : "text-[#45433e]"}`}>{value}</span>
                          {selected ? <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#e8efe5] px-2 py-1.5 text-[10px] font-medium text-[#214E34]"><Check size={12} />Selected</span> : hidden ? <button type="button" aria-label={`Restore ${value} to ${label.toLowerCase()} menu`} onClick={() => setRemovedOptions((current) => ({ ...current, [key]: current[key].filter((option) => option !== value) }))} className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-[11px] font-medium text-[#214E34] hover:bg-[#e8efe5]"><Plus size={12} />Restore</button> : <button type="button" aria-label={`Remove ${value} from ${label.toLowerCase()} menu`} onClick={() => removeMenuOption(key, value)} className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-[11px] text-[#857a6b] hover:bg-[#eee8df] hover:text-[#554b3e]"><Minus size={12} />Remove</button>}
                        </li>;
                      })}
                    </ul>
                  </div> : <div className="flex flex-wrap gap-2">
                    {available.filter((value) => !removedOptions[key].includes(value) || form[key].includes(value)).map((value) => {
                      const selected = form[key].includes(value);
                      return <button key={value} type="button" aria-pressed={selected} onClick={() => selectOption(key, value, !selected)} className={`inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-md border px-3 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] ${selected ? "border-[#214E34] bg-[#eef3ed] font-medium text-[#214E34]" : "border-[#ded8d1] bg-white text-[#6f6a61] hover:border-[#a8b8a9]"}`}><span className="break-words">{value}</span>{selected && <Check size={12} className="shrink-0" />}</button>;
                    })}
                  </div>}
                </div>
                <label htmlFor={`custom-${key}`} className="mt-4 block text-[11px] text-[#8a837b]">Add another option</label>
                <div className="mt-2 flex gap-2">
                  <input id={`custom-${key}`} value={optionDrafts[key]} maxLength={100} placeholder={placeholder} onChange={(event) => setOptionDrafts((current) => ({ ...current, [key]: event.target.value }))} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing) { event.preventDefault(); addOption(key); } }} className="min-h-10 min-w-0 flex-1 rounded-lg border border-[#ded8d1] px-3 text-xs outline-none focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]" />
                  <button type="button" disabled={!optionDrafts[key].trim()} onClick={() => addOption(key)} className={`${secondary} shrink-0`} aria-label={`Add ${label.toLowerCase()} option`}><Plus size={13} />Add</button>
                </div>
              </fieldset>;
              })}
            </div>
            <p className="text-[11px] text-[#8a837b]">Click options to select them. Use “Manage options” to remove or restore unused choices.</p>
          </div>
          <div className="mt-6 rounded-lg border border-[#e9e4df] bg-[#faf9f6] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><p className="text-xs font-medium text-[#6f6a61]">Calculated selling price</p><p className="mt-2 text-2xl font-semibold text-[#214E34]">{formatProductPrice(pricing.amount)}</p></div>
              {form.goldPurities.length > 1 && <label className="text-xs text-[#6f6a61]">Preview purity<select value={previewPurity} onChange={(event) => setPricingPurity(event.target.value)} className={control}>{form.goldPurities.map((purity) => <option key={purity}>{purity}</option>)}</select></label>}
            </div>
            <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-3">{[{ label: "Gold value", amount: pricing.goldPrice }, { label: "Diamond price", amount: pricing.diamondPrice }, { label: "Making charge", amount: pricing.makingCharge }].map(({ label, amount }) => <div key={label}><dt className="text-[#8a837b]">{label}</dt><dd className="mt-1 font-medium">{amount === null ? "—" : `₹${Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}</dd></div>)}</dl>
            <p className="mt-3 text-[11px] leading-5 text-[#8a837b]">Uses the weights and charges entered in Specs below. Blank charges are not added. Taxes and delivery are excluded. Gold rates: IBJA snapshot, {GOLD_PRICING.retrievedOn}.</p>
            {pricing.goldWeight > 0 && pricing.goldRate === null && <p className="mt-2 text-xs text-[#9f5c4d]">Select a supported gold purity to calculate the metal value. Gold rates do not apply to platinum.</p>}
            {pricing.usesGrossWeight && <p className="mt-2 text-xs text-[#9f5c4d]">Using gross weight minus entered diamond weight. Enter net gold weight for an accurate gold value.</p>}
          </div>
        </Section>
        <Section title="Variants (optional)" description="Skip this section if you do not need variants. Add them for combinations with their own price, size or stock.">
          <div className="space-y-5">{form.variants.map((variant, index) => <details key={variant.key} open={variant.id ? undefined : true} className="rounded-lg border border-[#e5dfd9] bg-[#faf9f6] p-4 sm:p-5">
            <summary className="cursor-pointer text-sm font-semibold text-[#214E34]">{variant.name || `Variant ${index + 1}`}<span className="ml-2 text-xs font-normal text-[#8a837b]">{variant.metalColour ? goldColourOptions.find((colour) => colour.value === variant.metalColour)?.label || variant.metalColour : "No colour selected"}</span></summary>
            <div className="mb-5 mt-5 flex justify-end"><button type="button" onClick={() => removeVariant(variant.key)} className="inline-flex items-center gap-1.5 text-xs text-[#9f5c4d] disabled:opacity-30"><Trash2 size={14} />Remove</button></div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <Field label="Variant name" placeholder="Uses product title if left blank" value={variant.name} onChange={(e) => updateVariant(variant.key, { name: e.target.value })} />
              <Field label="Variant SKU" placeholder="Generated if left blank" value={variant.sku} onChange={(e) => updateVariant(variant.key, { sku: e.target.value })} />
              {([["metalColour", "Gold colour", options.goldColours], ["goldPurity", "Gold purity", options.goldPurities], ["diamondGrade", "Diamond grade", options.diamondGrades], ["size", "Size", options.sizes]] as const).map(([key, label, choices]) => <label key={key} className="text-xs font-medium text-[#6f6a61]">{label}<select value={variant[key] || ""} onChange={(e) => updateVariant(variant.key, { [key]: e.target.value || null })} className={control}><option value="">Unspecified</option>{[...new Set([...choices, ...(variant[key] ? [variant[key]] : [])])].map((choice) => <option key={choice} value={choice}>{key === "metalColour" ? goldColourOptions.find((colour) => colour.value === choice)?.label || choice : choice}</option>)}</select></label>)}
              <Field label="Price override (₹)" placeholder="Uses calculated price if blank" type="number" min="0" step="0.01" value={variant.price ?? ""} onChange={(e) => updateVariant(variant.key, { price: e.target.value || null })} />
              <Field label="Stock quantity" type="number" min="0" max={2147483647} step="1" value={variant.stock ?? ""} onChange={(e) => updateVariant(variant.key, { stock: e.target.value === "" ? null : Number(e.target.value) })} />
              <label className="text-xs font-medium text-[#6f6a61]">Availability<select value={variant.isInStock === null ? "unset" : String(variant.isInStock)} onChange={(e) => updateVariant(variant.key, { isInStock: e.target.value === "unset" ? null : e.target.value === "true" })} className={control}><option value="true">Available</option><option value="false">Unavailable</option><option value="unset">Unspecified</option></select></label>
            </div>
          </details>)}</div>
          <button type="button" onClick={() => update("variants", [...form.variants, blankVariant(crypto.randomUUID(), form.sku ? `${form.sku}-${form.variants.length + 1}` : "", form.name)])} className={`${secondary} mt-5`}><Plus size={14} />Add variant</button>
        </Section>
        <Section title="Images *" description="Upload photos, choose a cover and assign gallery images to variants. JPG, PNG, WebP, AVIF, GIF or SVG, up to 10 MB each.">
          <input ref={galleryInput} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml" className="hidden" aria-label="Upload gallery images" onChange={(e) => uploadImages(e.target.files)} />
          {form.bannerImage && !form.media.some((item) => item.mediaURL === form.bannerImage) && <div className="flex items-center gap-4 rounded-lg border border-[#e5dfd9] p-4"><Image src={getImageUrl(form.bannerImage)} alt="Current cover" width={80} height={80} className="size-20 rounded-lg object-cover" /><p className="text-xs text-[#6f6a61]">Current cover. Upload photos below and choose “Set cover” to replace it.</p></div>}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><h3 className="text-sm font-semibold text-[#214E34]">Gallery · {form.media.length + uploads.length} images</h3><button type="button" onClick={() => galleryInput.current?.click()} className={secondary}><UploadCloud size={14} />Upload photos</button></div>
          {!form.media.length && !uploads.length && <p className="mt-5 rounded-lg border border-dashed border-[#ded8d1] p-8 text-center text-xs text-[#8a837b]">Upload photos to build your product gallery.</p>}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{uploads.map((item) => <div key={item.key} className="min-w-0 overflow-hidden rounded-lg border border-[#e5dfd9]">
            <div className="relative aspect-square bg-[#faf9f6]" aria-busy={item.status !== "failed"}>
              <Image unoptimized src={item.preview} alt={item.file.name} fill sizes="(max-width: 640px) 85vw, 30vw" className="object-contain" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/75 p-4 text-center backdrop-blur-[2px]">
                {item.status !== "failed" && <Loader2 size={28} className="animate-spin text-[#214E34]" />}
                <p role={item.status === "failed" ? "alert" : "status"} className="text-xs font-medium text-[#214E34]">{item.status === "failed" ? item.error : item.status === "queued" ? "Waiting to upload…" : "Uploading photo…"}</p>
              </div>
            </div>
            <div className="p-4"><p className="truncate text-xs text-[#6f6a61]">{item.file.name}</p>{item.status === "failed" && <div className="mt-3 flex gap-2"><button type="button" onClick={() => void uploadPhoto(item)} className={secondary}>Retry</button><button type="button" onClick={() => removeUpload(item)} className={secondary}>Remove</button></div>}</div>
          </div>)}{form.media.map((item) => <div key={item.key} className="min-w-0 overflow-hidden rounded-lg border border-[#e5dfd9]">
            <div className="relative aspect-square bg-[#faf9f6]"><Image unoptimized={Boolean(previews[item.key])} src={previews[item.key] || getImageUrl(item.mediaURL)} alt="Product gallery preview" fill sizes="(max-width: 640px) 85vw, (max-width: 1280px) 40vw, 25vw" className="object-contain" /></div>
            <div className="space-y-3 p-4">{form.variants.length > 0 && <label className="block text-xs text-[#6f6a61]">Associated variant<select value={item.variantKey || ""} onChange={(e) => update("media", form.media.map((media) => media.key === item.key ? { ...media, variantKey: e.target.value || null } : media))} className={control}><option value="">All variants</option>{form.variants.map((variant, index) => <option key={variant.key} value={variant.key}>{variant.name || `Variant ${index + 1}`} · {variant.sku || "No SKU"}</option>)}</select></label>}<div className="flex flex-wrap gap-2"><button type="button" disabled={!isProductImageKey(item.mediaURL) && item.mediaURL !== initialProduct?.bannerImage} onClick={() => update("bannerImage", item.mediaURL)} className={secondary}><Star size={13} fill={form.bannerImage === item.mediaURL ? "currentColor" : "none"} />{form.bannerImage === item.mediaURL ? "Cover" : "Set cover"}</button><button type="button" aria-label="Remove gallery image" onClick={() => setForm((current) => ({ ...current, media: current.media.filter((media) => media.key !== item.key), bannerImage: current.bannerImage === item.mediaURL ? null : current.bannerImage }))} className={secondary}><Trash2 size={13} />Remove</button></div></div>
          </div>)}</div>
        </Section>
        <Section title="Specs" description="Optional measurements and charges. Diamond price and making charge are totals in rupees, not rates per gram or per carat.">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {([["grossWeight", "Gross weight (g)", "0.001"], ["netGoldWeight", "Net gold weight (g)", "0.001"], ["totalDiamondWeight", "Total diamond weight (ct)", "0.001"], ["diamondPrice", "Diamond price (₹)", "0.01"], ["makingCharge", "Making charge (₹)", "0.01"]] as const).map(([key, label, step]) => <Field key={key} label={label} type="number" min="0" step={step} value={form[key] ?? ""} onChange={(e) => update(key, e.target.value)} />)}
            <Field label="Diamond pieces" type="number" min="0" step="1" max={2147483647} value={form.diamondPieces ?? ""} onChange={(e) => update("diamondPieces", e.target.value === "" ? null : Number(e.target.value))} />
            {(["height", "width", "length"] as const).map((key) => <Field key={key} label={`${key.charAt(0).toUpperCase() + key.slice(1)} (mm)`} type="number" min="0" step="0.001" value={form.dimensions[key]} onChange={(e) => update("dimensions", { ...form.dimensions, [key]: e.target.value })} />)}
          </div>
        </Section>
      </fieldset>
      {initialProduct && <p className="text-[11px] text-[#8a837b]">Last updated: {timestamp(initialProduct.updatedAt)} IST</p>}
      <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-end gap-3 border-t border-[#e9e4df] bg-[#FCF9F8]/95 py-4 backdrop-blur-sm">
        {saving ? <span className={`${secondary} opacity-50`}>Cancel</span> : <Link href="/admin/products" className={secondary}>Cancel</Link>}
        <button type="submit" disabled={saving || uploading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#214E34] px-6 py-3 text-sm font-medium text-white hover:bg-[#193e29] disabled:opacity-50">{saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving…" : uploading ? "Uploading photos…" : initialProduct ? "Save changes" : "Create product"}</button>
      </div>
    </form>
  );
}
