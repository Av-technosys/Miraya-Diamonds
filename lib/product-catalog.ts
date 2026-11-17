import { getImageUrl } from "./imageUrl";
import { calculateProductPrice, formatProductPrice } from "./product-pricing";
import type { PricingProduct, PricingVariant, ProductSelection } from "./product-pricing";

export const uniqueValues = (values: (string | null | undefined)[]) => [...new Map(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)).map((value) => [value.toLowerCase(), value])).values()];

export function getProductSlug(product: { name: string; sku: string }) {
  if (product.sku === "MR-84920") return "bhvita-18kt-rose-gold-filigree-solitaire-diamond-ring";
  return `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${product.sku.toLowerCase()}`;
}

export function getProductOptions(product: { goldColours: string[]; goldPurities: string[]; diamondGrades: string[]; sizes: string[] }, variants: PricingVariant[]) {
  return {
    goldColours: uniqueValues([...product.goldColours, ...variants.map((variant) => variant.metalColour)]),
    goldPurities: uniqueValues([...product.goldPurities, ...variants.map((variant) => variant.goldPurity)]),
    diamondGrades: uniqueValues([...product.diamondGrades, ...variants.map((variant) => variant.diamondGrade)]),
    sizes: uniqueValues([...product.sizes, ...variants.map((variant) => variant.size)]),
  };
}

type Media = { mediaURL: string | null; mediaType: string | null; productVariantId: string | null };

export function getProductGallery(banner: string | null, media: Media[], variantId?: string) {
  const images = media.filter((item) => item.mediaURL && (!item.mediaType || item.mediaType === "image"));
  const cover = banner ? getImageUrl(banner) : null;
  const uniqueImages = (urls: (string | null)[]) => [...new Set(urls.filter((url): url is string => Boolean(url)))];
  const all = uniqueImages([cover, ...images.map((item) => getImageUrl(item.mediaURL))]);
  if (!variantId) return all;
  const specific = images.filter((item) => item.productVariantId === variantId);
  const shared = images.filter((item) => !item.productVariantId);
  const coverOwner = cover ? images.find((item) => getImageUrl(item.mediaURL) === cover)?.productVariantId : null;
  const sharedCover = !coverOwner || coverOwner === variantId ? cover : null;
  const gallery = uniqueImages([...specific.map((item) => getImageUrl(item.mediaURL)), sharedCover, ...shared.map((item) => getImageUrl(item.mediaURL))]);
  return gallery.length ? gallery : all;
}

export function getInitialProductSelection(product: PricingProduct & { goldColours: string[]; diamondGrades: string[]; sizes: string[] }, variants: (PricingVariant & { id?: string })[]): ProductSelection & { variantId?: string } {
  const choices = (variants.length ? variants : [null]).flatMap((variant) => {
    const purities = variant?.goldPurity ? [variant.goldPurity] : product.goldPurities?.length ? product.goldPurities : [null];
    return purities.map((purity) => ({ variant, purity, amount: calculateProductPrice(product, purity, variant?.price).amount }));
  }).sort((a, b) => (a.amount ?? Infinity) - (b.amount ?? Infinity));
  const choice = choices[0];
  return {
    variantId: choice?.variant?.id,
    metalColour: choice?.variant?.metalColour || product.goldColours[0] || "",
    goldPurity: choice?.purity || "",
    diamondGrade: choice?.variant?.diamondGrade || product.diamondGrades[0] || "",
    size: choice?.variant?.size || product.sizes[0] || "",
  };
}

export function goldColourLabel(value: string) {
  const key = value.trim().toLowerCase().replace(/\s+gold$/, "");
  const labels: Record<string, string> = { yellow: "Yellow Gold", rose: "Rose Gold", white: "White Gold", platinum: "Platinum" };
  return labels[key] || value;
}

export function formatCataloguePrice(product: { price: number; priceFrom?: boolean }) {
  return `${product.price > 0 && product.priceFrom ? "From " : ""}${formatProductPrice(product.price > 0 ? product.price : null)}`;
}
