import type { Product, ProductVariant } from "@/lib/db/schema";

export type VariantInput = Omit<ProductVariant, "id" | "productId" | "createdAt" | "updatedAt" | "strikethroughPrice"> & {
  id?: string;
  key: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type MediaInput = {
  id?: string;
  key: string;
  mediaURL: string;
  mediaType: string;
  variantKey: string | null;
  createdAt?: string | null;
};

export type ProductFormInput = Omit<Product, "id" | "createdAt" | "updatedAt" | "dimensions" | "jewelleryType"> & {
  jewelleryType: string;
  dimensions: { height: string; width: string; length: string };
  variants: VariantInput[];
  media: MediaInput[];
};

export type ProductEditorData = ProductFormInput & {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export const isUuid = (value: string) => /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(value);
export const isProductImageKey = (value: string) => /^products\/[a-zA-Z0-9_/-]+\.(?:jpe?g|png|webp|avif|gif|svg)$/i.test(value) && !value.includes("..");

function validDecimal(value: unknown, precision: number, scale: number) {
  return typeof value === "string" && new RegExp(`^\\d{1,${precision - scale}}(?:\\.\\d{1,${scale}})?$`).test(value) && Number.isFinite(Number(value));
}

export function validateProductInput(input: ProductFormInput): string | null {
  if (!input || ![input.sku, input.name, input.description].every((value) => typeof value === "string" && value.trim())) return "Enter the title, SKU and description.";
  if (typeof input.categoryId !== "string" || !isUuid(input.categoryId)) return "Choose a valid category.";
  if (!input.bannerImage && (!Array.isArray(input.media) || !input.media.length)) return "Upload at least one product image.";
  if (input.bannerImage !== null && typeof input.bannerImage !== "string") return "Choose a valid cover image.";
  if (![input.diamondGrades, input.goldPurities, input.goldColours, input.sizes].every((values) => Array.isArray(values) && values.every((value) => typeof value === "string" && value.trim()))) return "Check the available product options.";
  if (![input.grossWeight, input.netGoldWeight, input.totalDiamondWeight].every((value) => (value === null || value === "" || validDecimal(value, 10, 3)))) return "Weights must be non-negative numbers with up to three decimal places.";
  if (input.netGoldWeight !== null && input.netGoldWeight !== "" && input.grossWeight !== null && input.grossWeight !== "" && Number(input.netGoldWeight) > Number(input.grossWeight)) return "Net gold weight cannot exceed gross weight.";
  if (input.diamondPieces !== null && (!Number.isSafeInteger(input.diamondPieces) || input.diamondPieces < 0 || input.diamondPieces > 2147483647)) return "Diamond pieces must be a non-negative whole number.";
  if (![input.diamondPrice, input.makingCharge].every((value) => (value === null || value === "" || validDecimal(value, 14, 2)))) return "Charges must be non-negative numbers with up to two decimal places.";
  if (!input.dimensions || ![input.dimensions.height, input.dimensions.width, input.dimensions.length].every((value) => (value === null || value === "" || validDecimal(value, 10, 3)))) return "Enter valid height, width and length with up to three decimal places.";
  if (!Array.isArray(input.variants)) return "Check the product variants.";
  const keys = new Set<string>();
  const skus = new Set<string>();
  const ids = new Set<string>();
  for (const variant of input.variants) {
    if (!variant || typeof variant.key !== "string" || !variant.key || keys.has(variant.key) || (variant.id && (!isUuid(variant.id) || ids.has(variant.id)))) return "Each variant must have a unique reference.";
    if (variant.id) ids.add(variant.id);
    keys.add(variant.key);
    if (typeof variant.sku !== "string" || typeof variant.name !== "string") return "Check variant names and SKUs.";
    if (variant.sku.trim() && skus.has(variant.sku.trim())) return "Variant SKUs must be unique.";
    skus.add(variant.sku.trim());
    if ((variant.price !== null && variant.price !== "" && !validDecimal(variant.price, 14, 2))) return "Enter valid variant prices with up to two decimal places.";
    if (variant.stock !== null && (!Number.isSafeInteger(variant.stock) || variant.stock < 0 || variant.stock > 2147483647)) return "Variant stock must be a non-negative whole number.";
    if (variant.isInStock !== null && typeof variant.isInStock !== "boolean") return "Check variant availability.";
    for (const [field, options] of [[variant.metalColour, input.goldColours], [variant.goldPurity, input.goldPurities], [variant.diamondGrade, input.diamondGrades], [variant.size, input.sizes]] as const) {
      if (field !== null && (typeof field !== "string" || (field && !options.includes(field)))) return "Variant options must match the product's available options.";
    }
  }
  if (!Array.isArray(input.media)) return "Check the product gallery.";
  const mediaKeys = new Set<string>();
  const mediaIds = new Set<string>();
  for (const media of input.media) {
    if (!media || typeof media.key !== "string" || !media.key || mediaKeys.has(media.key) || (media.id && (!isUuid(media.id) || mediaIds.has(media.id)))) return "Each image must have a unique reference.";
    mediaKeys.add(media.key);
    if (media.id) mediaIds.add(media.id);
    if (typeof media.mediaURL !== "string" || !media.mediaURL || media.mediaType !== "image") return "Upload a valid product image.";
    if (media.variantKey !== null && !keys.has(media.variantKey)) return "Choose an existing variant for each image.";
  }
  return null;
}
