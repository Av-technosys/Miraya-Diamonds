"use server";

import { db } from "@/lib/db";
import {
  products,
  productVariants,
  productMedia,
  category,
  type Product,
  type ProductVariant,
  type ProductMedia,
} from "@/lib/db/schema";
import { eq, asc, desc, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { AdminProduct } from "@/lib/admin/types";
import { getProductSlug, getProductOptions, getProductGallery, uniqueValues } from "@/lib/product-catalog";
import { formatProductPrice, getCataloguePrice } from "@/lib/product-pricing";
import { getImageUrl, toRelativeKey } from "@/lib/imageUrl";

export interface PublicCollectionProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  type: string;
  categoryAliases: string[];
  categoryId: string | null;
  createdAt: string | null;
  price: number;
  priceFrom: boolean;
  materials: string[];
  stone: string;
  jewelleryType: string;
  gallery: string[];
  inStock: boolean;
  diamondGrades: string[];
  goldPurities: string[];
  goldColours: string[];
  sizes: string[];
}

function calculateProductStatus(stock: number): "In Stock" | "Low Stock" | "Out of Stock" {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 3) return "Low Stock";
  return "In Stock";
}

/**
 * Fetch all products for the Admin Panel with variants and media.
 */
export async function getAdminProducts(): Promise<AdminProduct[]> {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.updatedAt), desc(products.createdAt));
    if (allProducts.length === 0) return [];

    const productIds = allProducts.map((p) => p.id);

    // Fetch variants and media
    const variants = await db
      .select()
      .from(productVariants)
      .where(inArray(productVariants.productId, productIds)).orderBy(asc(productVariants.createdAt), asc(productVariants.id));

    const media = await db
      .select()
      .from(productMedia)
      .where(inArray(productMedia.productId, productIds)).orderBy(asc(productMedia.createdAt), asc(productMedia.id));

    // Group variants and media by productId
    const variantMap = new Map<string, ProductVariant[]>();
    for (const v of variants) {
      const list = variantMap.get(v.productId) || [];
      list.push(v);
      variantMap.set(v.productId, list);
    }

    const mediaMap = new Map<string, ProductMedia[]>();
    for (const m of media) {
      if (m.productId) {
        const list = mediaMap.get(m.productId) || [];
        list.push(m);
        mediaMap.set(m.productId, list);
      }
    }

    return allProducts.map((p) => {
      const pVariants = variantMap.get(p.id) || [];
      const pMedia = mediaMap.get(p.id) || [];

      // Primary variant
      const primaryVariant = pVariants[0];

      // Estimated price fallback
      const price = getCataloguePrice(p, pVariants).price ?? 0;

      const stock = primaryVariant?.stock ?? 1;
      const status = primaryVariant?.isInStock === false ? "Out of Stock" : calculateProductStatus(stock);

      const rawBanner = p.bannerImage || pMedia[0]?.mediaURL || "/customize/custom1.png";
      const banner = getImageUrl(rawBanner);
      const pMediaUrls = pMedia.map((m) => toRelativeKey(m.mediaURL)).filter(Boolean) as string[];
      const cleanBannerKey = toRelativeKey(p.bannerImage || "");

      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        description: p.description,
        jewelleryType: p.jewelleryType || "",
        diamondGrades: p.diamondGrades || [],
        goldPurities: p.goldPurities || [],
        goldColours: p.goldColours || [],
        sizes: p.sizes || [],
        grossWeight: p.grossWeight || "0.00",
        netGoldWeight: p.netGoldWeight || "0.00",
        diamondPieces: p.diamondPieces || 0,
        totalDiamondWeight: p.totalDiamondWeight || "0.000",
        diamondPrice: p.diamondPrice || "0.00",
        makingCharge: p.makingCharge || "0.00",
        dimensions: p.dimensions || { height: "0.00", width: "0.00", length: "0.00" },
        price,
        stock,
        status,
        image: banner,
        bannerImage: cleanBannerKey,
        mediaUrls: pMediaUrls.length > 0 ? pMediaUrls : (cleanBannerKey ? [cleanBannerKey] : []),
        categoryId: p.categoryId || null,
      };
    });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    throw new Error("Products could not be loaded. Please try again.");
  }
}

/**
 * Delete a product by id or sku. Cascades to product_variants and product_media.
 */
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isUuid) {
      await db.delete(products).where(eq(products.id, id));
    } else {
      await db.delete(products).where(eq(products.sku, id));
    }

    revalidatePath("/admin", "layout");
    revalidatePath("/collection", "layout");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product.",
    };
  }
}

/**
 * Fetch all public products for the /collection page from PostgreSQL.
 */
export async function getPublicProducts(): Promise<PublicCollectionProduct[]> {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.updatedAt), desc(products.createdAt));
    if (allProducts.length === 0) return [];

    const productIds = allProducts.map((p) => p.id);

    const variants = await db
      .select()
      .from(productVariants)
      .where(inArray(productVariants.productId, productIds)).orderBy(asc(productVariants.createdAt), asc(productVariants.id));

    const media = await db
      .select()
      .from(productMedia)
      .where(inArray(productMedia.productId, productIds)).orderBy(asc(productMedia.createdAt), asc(productMedia.id));

    const variantMap = new Map<string, ProductVariant[]>();
    for (const v of variants) {
      const list = variantMap.get(v.productId) || [];
      list.push(v);
      variantMap.set(v.productId, list);
    }

    const mediaMap = new Map<string, ProductMedia[]>();
    for (const m of media) {
      if (m.productId) {
        const list = mediaMap.get(m.productId) || [];
        list.push(m);
        mediaMap.set(m.productId, list);
      }
    }

    // Dynamic category mapping from database categories
    const dbCategories = await db.select().from(category);
    const categoryById = new Map(dbCategories.map((item) => [item.id, item]));
    const categoryMap: Record<string, string> = {
      ring: "Rings",
      rings: "Rings",
      necklace: "Necklaces",
      necklaces: "Necklaces",
      earring: "Earrings",
      earrings: "Earrings",
      bracelet: "Bracelets",
      bracelets: "Bracelets",
      bangle: "Bangles",
      bangles: "Bangles",
      pendant: "Pendants",
      pendants: "Pendants",
      solitaire: "Solitaires",
      solitaires: "Solitaires",
      kids: "Kids Jewellery",
    };

    for (const c of dbCategories) {
      if (c.slug) categoryMap[c.slug.toLowerCase().trim()] = c.name;
      if (c.name) categoryMap[c.name.toLowerCase().trim()] = c.name;
    }

    return allProducts.map((p) => {
      const pVariants = variantMap.get(p.id) || [];
      const pMedia = mediaMap.get(p.id) || [];
      const cataloguePrice = getCataloguePrice(p, pVariants);
      const price = cataloguePrice.price ?? 0;

      const gallery = getProductGallery(p.bannerImage, pMedia);
      const image = gallery[0] || "";
      const rawType = (p.jewelleryType || categoryById.get(p.categoryId || "")?.slug || "jewellery").toLowerCase().trim();
      const linkedCategory = categoryById.get(p.categoryId || "");
      const type = linkedCategory?.name || categoryMap[rawType] || (rawType.charAt(0).toUpperCase() + rawType.slice(1));
      const { goldColours, goldPurities, diamondGrades, sizes } = getProductOptions(p, pVariants);
      const slug = getProductSlug(p);

      return {
        id: p.id,
        slug,
        name: p.name,
        image,
        type,
        price,
        priceFrom: cataloguePrice.from,
        categoryId: p.categoryId,
        createdAt: p.createdAt?.toISOString() || null,
        categoryAliases: uniqueValues([type, linkedCategory?.slug, linkedCategory?.id, linkedCategory ? null : p.jewelleryType]),
        materials: uniqueValues(goldColours.map((colour) => {
          const value = colour.toLowerCase().replace(/\s+gold$/, "");
          const labels: Record<string, string> = { yellow: "Yellow Gold", rose: "Rose Gold", white: "White Gold" };
          return labels[value] || colour;
        })),
        stone: (p.diamondPieces ?? 0) > 0 || diamondGrades.length ? "Diamond" : "",
        jewelleryType: p.jewelleryType || "",
        gallery,
        inStock: pVariants.some((variant) => variant.isInStock !== false && (variant.stock ?? 0) > 0),
        diamondGrades,
        goldPurities,
        goldColours,
        sizes,
      };
    });
  } catch (error) {
    console.error("Error fetching public collection products:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug or SKU with its gallery and full details.
 */
export async function getProductBySlugOrSku(slugOrSku: string) {
  const cleanParam = slugOrSku.trim();
  if (!cleanParam || cleanParam.length > 500) return null;
  const [bySku] = await db.select().from(products).where(sql`lower(${products.sku}) = ${cleanParam.toLowerCase()}`).limit(1);
  let productRow: Product | undefined = bySku;
  if (!productRow && /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(cleanParam)) {
    [productRow] = await db.select().from(products).where(eq(products.id, cleanParam)).limit(1);
  }
  if (!productRow) {
    const rows = await db.select().from(products);
    productRow = rows.find((product) => getProductSlug(product) === cleanParam.toLowerCase());
  }
  if (!productRow) return null;

  const [variants, media, categoryRows] = await Promise.all([
    db.select().from(productVariants).where(eq(productVariants.productId, productRow.id)).orderBy(asc(productVariants.createdAt), asc(productVariants.id)),
    db.select().from(productMedia).where(eq(productMedia.productId, productRow.id)).orderBy(asc(productMedia.createdAt), asc(productMedia.id)),
    productRow.categoryId ? db.select().from(category).where(eq(category.id, productRow.categoryId)).limit(1) : Promise.resolve([]),
  ]);
  const options = getProductOptions(productRow, variants);
  const gallery = getProductGallery(productRow.bannerImage, media);
  const pricing = getCataloguePrice(productRow, variants);
  const specs: [string, string][] = [];
  const addSpec = (label: string, value: string | number | null | undefined, suffix = "") => {
    if (value !== null && value !== undefined && value !== "") specs.push([label, `${value}${suffix}`]);
  };
  addSpec("Product Type", productRow.jewelleryType || categoryRows[0]?.name);
  addSpec("Gold Purities", options.goldPurities.join(", "));
  addSpec("Gold Colours", options.goldColours.join(", "));
  addSpec("Net Gold Weight", productRow.netGoldWeight, " g");
  addSpec("Gross Weight", productRow.grossWeight, " g");
  addSpec("Diamond Pieces", productRow.diamondPieces);
  addSpec("Total Diamond Weight", productRow.totalDiamondWeight, " ct");
  addSpec("Diamond Grades", options.diamondGrades.join(", "));
  addSpec("Available Sizes", options.sizes.join(", "));
  for (const key of ["height", "width", "length"] as const) addSpec(key.charAt(0).toUpperCase() + key.slice(1), productRow.dimensions?.[key], " mm");

  return {
    id: productRow.id, sku: productRow.sku, name: productRow.name, description: productRow.description,
    categoryId: productRow.categoryId, categoryName: categoryRows[0]?.name || "Jewellery",
    categoryDimensions: categoryRows[0]?.dimensions ? getImageUrl(categoryRows[0].dimensions) : null,
    jewelleryType: productRow.jewelleryType, slug: getProductSlug(productRow),
    badge: categoryRows[0]?.name || productRow.jewelleryType || "Fine Jewellery",
    price: formatProductPrice(pricing.price), gallery, ...options,
    grossWeight: productRow.grossWeight, netGoldWeight: productRow.netGoldWeight,
    diamondPieces: productRow.diamondPieces, totalDiamondWeight: productRow.totalDiamondWeight,
    diamondPrice: productRow.diamondPrice, makingCharge: productRow.makingCharge,
    dimensions: productRow.dimensions, specs,
    variants: variants.map((variant) => ({
      id: variant.id, name: variant.name, sku: variant.sku, metalColour: variant.metalColour,
      goldPurity: variant.goldPurity, diamondGrade: variant.diamondGrade, size: variant.size,
      price: variant.price, stock: variant.stock, isInStock: variant.isInStock,
      gallery: getProductGallery(productRow.bannerImage, media, variant.id),
    })),
  };
}
