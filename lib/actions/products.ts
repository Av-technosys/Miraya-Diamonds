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
import { eq, asc, desc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { AdminProduct } from "@/lib/admin/types";
import { calculateProductPrice, formatProductPrice, getCataloguePrice } from "@/lib/product-pricing";
import { getImageUrl, toRelativeKey } from "@/lib/imageUrl";

export interface PublicCollectionProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  type: string;
  categoryAliases: string[];
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
      .where(inArray(productMedia.productId, productIds));

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
    revalidatePath("/collection");
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
      .where(inArray(productMedia.productId, productIds));

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
      const primaryVariant = pVariants[0];

      const cataloguePrice = getCataloguePrice(p, pVariants);
      const price = cataloguePrice.price ?? 0;

      const gallery = pMedia.map((m) => getImageUrl(m.mediaURL)).filter(Boolean);
      const image = getImageUrl(p.bannerImage || gallery[0]);

      const rawType = (p.jewelleryType || categoryById.get(p.categoryId || "")?.slug || "jewellery").toLowerCase().trim();
      const linkedCategory = categoryById.get(p.categoryId || "");
      const type = linkedCategory?.name || categoryMap[rawType] || (rawType.charAt(0).toUpperCase() + rawType.slice(1));
      const uniqueOptions = (values: (string | null | undefined)[]) => [...new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))];
      const goldColours = uniqueOptions([...(p.goldColours || []), ...pVariants.map((variant) => variant.metalColour)]);
      const goldPurities = uniqueOptions([...(p.goldPurities || []), ...pVariants.map((variant) => variant.goldPurity)]);
      const diamondGrades = uniqueOptions([...(p.diamondGrades || []), ...pVariants.map((variant) => variant.diamondGrade)]);
      const sizes = uniqueOptions([...(p.sizes || []), ...pVariants.map((variant) => variant.size)]);

      // URL friendly slug
      const slug =
        p.sku === "MR-84920"
          ? "bhvita-18kt-rose-gold-filigree-solitaire-diamond-ring"
          : `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${p.sku.toLowerCase()}`;

      return {
        id: p.id,
        slug,
        name: p.name,
        image,
        type,
        price,
        priceFrom: cataloguePrice.from,
        categoryAliases: uniqueOptions([type, linkedCategory?.slug, linkedCategory?.id, linkedCategory ? null : p.jewelleryType]),
        materials: uniqueOptions(goldColours.map((colour) => {
          const value = colour.toLowerCase().replace(/\s+gold$/, "");
          const labels: Record<string, string> = { yellow: "Yellow Gold", rose: "Rose Gold", white: "White Gold" };
          return labels[value] || colour;
        })),
        stone: (p.diamondPieces ?? 0) > 0 || diamondGrades.length ? "Diamond" : "",
        jewelleryType: p.jewelleryType || "",
        gallery: gallery.length > 0 ? gallery : [image],
        inStock: primaryVariant?.isInStock !== false && (primaryVariant?.stock ?? 1) > 0,
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
  try {
    // If slug is the flagship bhvita slug, find by SKU MR-84920
    const cleanParam = decodeURIComponent(slugOrSku).trim();

    let productRow: Product | undefined;

    if (cleanParam === "bhvita-18kt-rose-gold-filigree-solitaire-diamond-ring" || cleanParam.includes("MR-84920")) {
      const res = await db.select().from(products).where(eq(products.sku, "MR-84920"));
      productRow = res[0];
    } else {
      // Try direct SKU match
      const bySku = await db.select().from(products).where(eq(products.sku, cleanParam));
      if (bySku.length > 0) {
        productRow = bySku[0];
      } else {
        // Try searching all products for matching generated slug
        const all = await db.select().from(products);
        productRow = all.find((p) => {
          const generated = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${p.sku.toLowerCase()}`;
          return (
            generated === cleanParam ||
            cleanParam.endsWith(p.sku.toLowerCase()) ||
            cleanParam.includes(p.sku.toLowerCase())
          );
        });
      }
    }

    if (!productRow) return null;

    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productRow.id)).orderBy(asc(productVariants.createdAt), asc(productVariants.id));

    const media = await db
      .select()
      .from(productMedia)
      .where(eq(productMedia.productId, productRow.id));

    const primaryVariant = variants[0];
    const gallery = media.map((m) => getImageUrl(m.mediaURL)).filter(Boolean);
    if (gallery.length === 0 && productRow.bannerImage) {
      gallery.push(getImageUrl(productRow.bannerImage));
    }

    const pricing = calculateProductPrice(productRow, primaryVariant?.goldPurity || productRow.goldPurities[0], primaryVariant?.price);

    return {
      id: productRow.id,
      sku: productRow.sku,
      name: productRow.name,
      description: productRow.description,
      jewelleryType: productRow.jewelleryType,
      slug:
        productRow.sku === "MR-84920"
          ? "bhvita-18kt-rose-gold-filigree-solitaire-diamond-ring"
          : `${productRow.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${productRow.sku.toLowerCase()}`,
      collection: "The Miraya Diamonds Collection",
      badge: "Diamond Jewellery",
      price: formatProductPrice(pricing.amount),

      emi: "Contact our team to confirm pricing and payment arrangements.",
      gallery: gallery.length > 0 ? gallery : ["/PDP/product1.jpg"],
      diamondGrades: productRow.diamondGrades,
      goldPurities: productRow.goldPurities,
      goldColours: productRow.goldColours,
      sizes: productRow.sizes,
      grossWeight: productRow.grossWeight,
      netGoldWeight: productRow.netGoldWeight,
      diamondPieces: productRow.diamondPieces,
      totalDiamondWeight: productRow.totalDiamondWeight,
      diamondPrice: productRow.diamondPrice,
      makingCharge: productRow.makingCharge,
      dimensions: productRow.dimensions,
      specs: [
        ["Product Type", productRow.jewelleryType ? productRow.jewelleryType.charAt(0).toUpperCase() + productRow.jewelleryType.slice(1) : "Confirm with team"],
        ["Metal", [productRow.goldPurities[0], productRow.goldColours[0]].filter(Boolean).join(" ") || "Confirm with team"],
        ["Net Gold Weight", productRow.netGoldWeight !== null ? `${productRow.netGoldWeight} g` : "Confirm with team"],
        ["Gross Weight", productRow.grossWeight !== null ? `${productRow.grossWeight} g` : "Confirm with team"],
        ["Diamond Pieces", productRow.diamondPieces !== null ? `${productRow.diamondPieces}` : "Confirm with team"],
        ["Total Diamond Weight", productRow.totalDiamondWeight !== null ? `${productRow.totalDiamondWeight} ct` : "Confirm with team"],
        ["Diamond Grade", productRow.diamondGrades.join(", ") || "Confirm with team"],
        ["Available Sizes", productRow.sizes.join(", ") || "Confirm with team"],

      ],
      variants,
    };
  } catch (error) {
    console.error("Error fetching product by slug/sku:", error);
    return null;
  }
}

