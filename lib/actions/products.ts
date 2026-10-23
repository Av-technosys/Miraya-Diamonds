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
import { eq, desc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { AdminProduct, ProductDimensions } from "@/components/admin/mock-data";
import { getImageUrl } from "@/lib/imageUrl";

export interface CreateProductInput {
  sku: string;
  name: string;
  description: string;
  jewelleryType: string;
  diamondGrades: string[];
  goldPurities: string[];
  goldColours: string[];
  sizes: string[];
  bannerImage?: string;
  grossWeight: string;
  netGoldWeight: string;
  diamondPieces: number;
  totalDiamondWeight: string;
  diamondPrice: string;
  makingCharge: string;
  dimensions: ProductDimensions;
  price: number;
  strikethroughPrice?: number;
  stock?: number;
  mediaUrls?: string[];
  categoryId?: string | null;
}

export interface UpdateProductInput extends CreateProductInput {
  id: string;
}

export interface PublicCollectionProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  type: string;
  price: number;
  oldPrice: number;
  material: string;
  stone: string;
  occasion: string;
  collection: string;
  style: string;
  karatage: string;
  shopFor: string;
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

function getSafePrice(rawPrice: string | number | null | undefined, fallback: number): number {
  if (rawPrice === null || rawPrice === undefined) return fallback;
  const num = typeof rawPrice === "number" ? rawPrice : parseFloat(rawPrice);
  return isNaN(num) || num <= 0 ? fallback : num;
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
      .where(inArray(productVariants.productId, productIds));

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
      const baseEstimate =
        getSafePrice(p.diamondPrice, 0) +
        getSafePrice(p.makingCharge, 0) +
        getSafePrice(p.netGoldWeight, 3) * 7500;

      const price = primaryVariant
        ? getSafePrice(primaryVariant.price, baseEstimate)
        : Math.round(baseEstimate);

      const stock = primaryVariant?.stock ?? 1;
      const status = calculateProductStatus(stock);

      const rawBanner = p.bannerImage || pMedia[0]?.mediaURL || "/customize/custom1.png";
      const banner = getImageUrl(rawBanner);
      const pMediaUrls = pMedia.map((m) => getImageUrl(m.mediaURL)).filter(Boolean) as string[];

      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        description: p.description,
        jewelleryType: p.jewelleryType,
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
        bannerImage: p.bannerImage || "",
        mediaUrls: pMediaUrls.length > 0 ? pMediaUrls : (p.bannerImage ? [getImageUrl(p.bannerImage)] : []),
        categoryId: p.categoryId || null,
      };
    });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}

/**
 * Create a new product with default variant and media in PostgreSQL.
 */
export async function createProduct(input: CreateProductInput): Promise<{
  success: boolean;
  product?: AdminProduct;
  error?: string;
}> {
  try {
    const sku = input.sku.trim();
    const name = input.name.trim();

    if (!sku) return { success: false, error: "SKU is required." };
    if (!name) return { success: false, error: "Product name is required." };

    // Check SKU uniqueness
    const existing = await db.select({ id: products.id }).from(products).where(eq(products.sku, sku));
    if (existing.length > 0) {
      return { success: false, error: `Product with SKU "${sku}" already exists.` };
    }

    const bannerImage = input.bannerImage || input.mediaUrls?.[0] || "/customize/custom1.png";
    const stock = input.stock !== undefined ? input.stock : 1;
    const price = input.price > 0 ? input.price : 48250;

    // Resolve categoryId if not explicitly provided
    let resolvedCategoryId = input.categoryId || null;
    if (!resolvedCategoryId && input.jewelleryType) {
      const catSlug = input.jewelleryType.toLowerCase().trim();
      const matchingCat = await db.select({ id: category.id }).from(category).where(eq(category.slug, catSlug));
      if (matchingCat.length > 0) {
        resolvedCategoryId = matchingCat[0].id;
      }
    }

    // 1. Insert product
    const [newProduct] = await db
      .insert(products)
      .values({
        sku,
        name,
        categoryId: resolvedCategoryId,
        description: input.description.trim() || "Handcrafted diamond jewellery by Miraya Diamonds.",
        jewelleryType: input.jewelleryType.toLowerCase().trim() || "ring",
        diamondGrades: input.diamondGrades.length > 0 ? input.diamondGrades : ["EF-VVS"],
        goldPurities: input.goldPurities.length > 0 ? input.goldPurities : ["18KT"],
        goldColours: input.goldColours.length > 0 ? input.goldColours : ["yellow", "rose", "white"],
        sizes: input.sizes.length > 0 ? input.sizes : ["12"],
        bannerImage,
        grossWeight: input.grossWeight || "3.10",
        netGoldWeight: input.netGoldWeight || "3.00",
        diamondPieces: input.diamondPieces >= 0 ? input.diamondPieces : 12,
        totalDiamondWeight: input.totalDiamondWeight || "0.500",
        diamondPrice: input.diamondPrice || "15000.00",
        makingCharge: input.makingCharge || "3000.00",
        dimensions: input.dimensions || { height: "5.20", width: "8.00", length: "20.00" },
      })
      .returning();

    // 2. Insert primary variant
    const variantSku = `${sku}-DEFAULT`;
    const [newVariant] = await db
      .insert(productVariants)
      .values({
        productId: newProduct.id,
        sku: variantSku,
        name: `${name} - Standard`,
        metalColour: input.goldColours[0] || "rose",
        goldPurity: input.goldPurities[0] || "18KT",
        diamondGrade: input.diamondGrades[0] || "EF-VVS",
        size: input.sizes[0] || "12",
        price: price.toFixed(2),
        strikethroughPrice: input.strikethroughPrice ? input.strikethroughPrice.toFixed(2) : null,
        stock,
        isInStock: stock > 0,
      })
      .returning();

    // 3. Insert media
    const allMediaUrls = input.mediaUrls && input.mediaUrls.length > 0 ? input.mediaUrls : [bannerImage];
    for (const url of allMediaUrls) {
      if (url && url.trim()) {
        await db.insert(productMedia).values({
          productId: newProduct.id,
          productVariantId: newVariant.id,
          mediaType: "image",
          mediaURL: url.trim(),
        });
      }
    }

    revalidatePath("/admin");
    revalidatePath("/collection");
    revalidatePath("/");

    return {
      success: true,
      product: {
        id: newProduct.id,
        sku: newProduct.sku,
        name: newProduct.name,
        description: newProduct.description,
        jewelleryType: newProduct.jewelleryType,
        diamondGrades: newProduct.diamondGrades,
        goldPurities: newProduct.goldPurities,
        goldColours: newProduct.goldColours,
        sizes: newProduct.sizes,
        grossWeight: newProduct.grossWeight,
        netGoldWeight: newProduct.netGoldWeight,
        diamondPieces: newProduct.diamondPieces,
        totalDiamondWeight: newProduct.totalDiamondWeight,
        diamondPrice: newProduct.diamondPrice,
        makingCharge: newProduct.makingCharge,
        dimensions: newProduct.dimensions,
        price,
        stock,
        status: calculateProductStatus(stock),
        image: bannerImage,
        bannerImage,
        mediaUrls: allMediaUrls,
        categoryId: newProduct.categoryId || null,
      },
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product.",
    };
  }
}

/**
 * Update an existing product.
 */
export async function updateProduct(
  id: string,
  input: Partial<CreateProductInput>
): Promise<{ success: boolean; product?: AdminProduct; error?: string }> {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    let productRecord: Product | undefined;

    if (isUuid) {
      const byId = await db.select().from(products).where(eq(products.id, id));
      productRecord = byId[0];
    }

    if (!productRecord) {
      const bySku = await db.select().from(products).where(eq(products.sku, id));
      productRecord = bySku[0];
    }

    if (!productRecord && input.sku) {
      const byInputSku = await db.select().from(products).where(eq(products.sku, input.sku.trim()));
      productRecord = byInputSku[0];
    }

    if (!productRecord) {
      return { success: false, error: "Product not found in database." };
    }

    const targetId = productRecord.id;

    const updates: Partial<typeof products.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (input.name) updates.name = input.name.trim();
    if (input.sku) updates.sku = input.sku.trim();
    if (input.description) updates.description = input.description.trim();
    if (input.jewelleryType) updates.jewelleryType = input.jewelleryType.toLowerCase().trim();
    if (input.categoryId !== undefined) {
      updates.categoryId = input.categoryId;
    } else if (input.jewelleryType) {
      const catSlug = input.jewelleryType.toLowerCase().trim();
      const matchingCat = await db.select({ id: category.id }).from(category).where(eq(category.slug, catSlug));
      if (matchingCat.length > 0) {
        updates.categoryId = matchingCat[0].id;
      }
    }
    if (input.diamondGrades) updates.diamondGrades = input.diamondGrades;
    if (input.goldPurities) updates.goldPurities = input.goldPurities;
    if (input.goldColours) updates.goldColours = input.goldColours;
    if (input.sizes) updates.sizes = input.sizes;
    if (input.bannerImage) updates.bannerImage = input.bannerImage;
    if (input.grossWeight) updates.grossWeight = input.grossWeight;
    if (input.netGoldWeight) updates.netGoldWeight = input.netGoldWeight;
    if (input.diamondPieces !== undefined) updates.diamondPieces = input.diamondPieces;
    if (input.totalDiamondWeight) updates.totalDiamondWeight = input.totalDiamondWeight;
    if (input.diamondPrice) updates.diamondPrice = input.diamondPrice;
    if (input.makingCharge) updates.makingCharge = input.makingCharge;
    if (input.dimensions) updates.dimensions = input.dimensions;

    await db.update(products).set(updates).where(eq(products.id, targetId));

    // Update or insert primary variant price & stock
    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, targetId));

    if (variants.length > 0) {
      const primary = variants[0];
      const vUpdates: Partial<typeof productVariants.$inferInsert> = {
        updatedAt: new Date(),
      };
      if (input.name) vUpdates.name = `${input.name.trim()} - Standard`;
      if (input.sku) vUpdates.sku = `${input.sku.trim()}-DEFAULT`;
      if (input.goldColours?.[0]) vUpdates.metalColour = input.goldColours[0];
      if (input.goldPurities?.[0]) vUpdates.goldPurity = input.goldPurities[0];
      if (input.diamondGrades?.[0]) vUpdates.diamondGrade = input.diamondGrades[0];
      if (input.sizes?.[0]) vUpdates.size = input.sizes[0];
      if (input.price !== undefined) vUpdates.price = input.price.toFixed(2);
      if (input.strikethroughPrice !== undefined) {
        vUpdates.strikethroughPrice = input.strikethroughPrice ? input.strikethroughPrice.toFixed(2) : null;
      }
      if (input.stock !== undefined) {
        vUpdates.stock = input.stock;
        vUpdates.isInStock = input.stock > 0;
      }
      await db.update(productVariants).set(vUpdates).where(eq(productVariants.id, primary.id));
    } else {
      const variantSku = `${input.sku || productRecord.sku}-DEFAULT`;
      await db.insert(productVariants).values({
        productId: targetId,
        sku: variantSku,
        name: `${input.name || productRecord.name} - Standard`,
        metalColour: input.goldColours?.[0] || productRecord.goldColours?.[0] || "rose",
        goldPurity: input.goldPurities?.[0] || productRecord.goldPurities?.[0] || "18KT",
        diamondGrade: input.diamondGrades?.[0] || productRecord.diamondGrades?.[0] || "EF-VVS",
        size: input.sizes?.[0] || productRecord.sizes?.[0] || "12",
        price: (input.price ?? 48250).toFixed(2),
        strikethroughPrice: input.strikethroughPrice ? input.strikethroughPrice.toFixed(2) : null,
        stock: input.stock ?? 1,
        isInStock: (input.stock ?? 1) > 0,
      });
    }

    // Sync media records if mediaUrls is provided
    if (input.mediaUrls !== undefined) {
      await db.delete(productMedia).where(eq(productMedia.productId, targetId));
      for (const url of input.mediaUrls) {
        if (!url || !url.trim()) continue;
        await db.insert(productMedia).values({
          productId: targetId,
          productVariantId: variants[0]?.id || null,
          mediaType: "image",
          mediaURL: url.trim(),
        });
      }
    }

    revalidatePath("/admin");
    revalidatePath("/collection");
    revalidatePath("/");

    // Fetch the updated product record to return complete fresh data
    const finalProduct = (await db.select().from(products).where(eq(products.id, targetId)))[0];
    const finalVariants = await db.select().from(productVariants).where(eq(productVariants.productId, targetId));
    const finalMedia = await db.select().from(productMedia).where(eq(productMedia.productId, targetId));

    const primaryVar = finalVariants[0];
    const finalPrice = primaryVar ? getSafePrice(primaryVar.price, input.price || 48250) : (input.price || 48250);
    const finalStock = primaryVar?.stock ?? (input.stock ?? 1);

    const returnedProduct: AdminProduct = {
      id: finalProduct.id,
      sku: finalProduct.sku,
      name: finalProduct.name,
      description: finalProduct.description,
      jewelleryType: finalProduct.jewelleryType,
      diamondGrades: finalProduct.diamondGrades,
      goldPurities: finalProduct.goldPurities,
      goldColours: finalProduct.goldColours,
      sizes: finalProduct.sizes,
      grossWeight: finalProduct.grossWeight,
      netGoldWeight: finalProduct.netGoldWeight,
      diamondPieces: finalProduct.diamondPieces,
      totalDiamondWeight: finalProduct.totalDiamondWeight,
      diamondPrice: finalProduct.diamondPrice,
      makingCharge: finalProduct.makingCharge,
      dimensions: finalProduct.dimensions,
      price: finalPrice,
      stock: finalStock,
      status: calculateProductStatus(finalStock),
      image: finalProduct.bannerImage || finalMedia[0]?.mediaURL || "/customize/custom1.png",
      bannerImage: finalProduct.bannerImage || "",
      mediaUrls: finalMedia.map((m) => m.mediaURL).filter(Boolean) as string[],
      categoryId: finalProduct.categoryId || null,
    };

    return { success: true, product: returnedProduct };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product.",
    };
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

    revalidatePath("/admin");
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
      .where(inArray(productVariants.productId, productIds));

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

    return allProducts.map((p, index) => {
      const pVariants = variantMap.get(p.id) || [];
      const pMedia = mediaMap.get(p.id) || [];
      const primaryVariant = pVariants[0];

      const baseEstimate =
        getSafePrice(p.diamondPrice, 0) +
        getSafePrice(p.makingCharge, 0) +
        getSafePrice(p.netGoldWeight, 3) * 7500;

      const price = primaryVariant
        ? getSafePrice(primaryVariant.price, baseEstimate)
        : Math.round(baseEstimate);

      const oldPrice = primaryVariant?.strikethroughPrice
        ? getSafePrice(primaryVariant.strikethroughPrice, Math.round(price * 1.1))
        : Math.round(price * 1.1);

      const gallery = pMedia.map((m) => getImageUrl(m.mediaURL)).filter(Boolean);
      const image = getImageUrl(p.bannerImage || gallery[0]);

      const rawType = (p.jewelleryType || "rings").toLowerCase().trim();
      const type = categoryMap[rawType] || (rawType.charAt(0).toUpperCase() + rawType.slice(1));

      // URL friendly slug
      const slug =
        p.sku === "MR-84920"
          ? "bhvita-18kt-rose-gold-filigree-solitaire-diamond-ring"
          : `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${p.sku.toLowerCase()}`;

      const occasions = ["Everyday", "Wedding", "Party", "Gifting", "Workwear", "Proposal", "Engagement"];
      const collections = ["New Arrivals", "Best Sellers", "Trending"];
      const styles = ["Cocktail", "Couple Bands", "Modern", "Open", "Vanki"];

      return {
        id: p.id,
        slug,
        name: p.name,
        image,
        type,
        price,
        oldPrice,
        material: p.goldColours?.[0] ? `${p.goldColours[0].charAt(0).toUpperCase() + p.goldColours[0].slice(1)} Gold` : "Gold",
        stone: p.diamondPieces > 0 ? "Diamond" : "Solitaire",
        occasion: occasions[index % occasions.length],
        collection: collections[index % collections.length],
        style: styles[index % styles.length],
        karatage: p.goldPurities?.[0]?.toLowerCase() || "18kt",
        shopFor: ["Women", "Men", "Unisex"][index % 3],
        jewelleryType: p.jewelleryType,
        gallery: gallery.length > 0 ? gallery : [image],
        inStock: (primaryVariant?.stock ?? 1) > 0,
        diamondGrades: p.diamondGrades || [],
        goldPurities: p.goldPurities || [],
        goldColours: p.goldColours || [],
        sizes: p.sizes || [],
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
      .where(eq(productVariants.productId, productRow.id));

    const media = await db
      .select()
      .from(productMedia)
      .where(eq(productMedia.productId, productRow.id));

    const primaryVariant = variants[0];
    const gallery = media.map((m) => getImageUrl(m.mediaURL)).filter(Boolean);
    if (gallery.length === 0 && productRow.bannerImage) {
      gallery.push(getImageUrl(productRow.bannerImage));
    }

    const price = primaryVariant
      ? getSafePrice(primaryVariant.price, 48250)
      : 48250;

    const oldPrice = primaryVariant?.strikethroughPrice
      ? getSafePrice(primaryVariant.strikethroughPrice, Math.round(price * 1.1))
      : Math.round(price * 1.1);

    const discountPct = Math.round(((oldPrice - price) / oldPrice) * 100);

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
      collection: "Bespoke Artist • The Solitaire Collection",
      badge: "Natural Solitaire",
      price: `₹${price.toLocaleString("en-IN")}`,
      oldPrice: `₹${oldPrice.toLocaleString("en-IN")}`,
      discount: discountPct > 0 ? `${discountPct}% OFF` : undefined,
      rating: "4.9 / 5.0",
      reviews: "148 Person Reviews",
      emi: `Or pay ₹${Math.round(price / 3).toLocaleString("en-IN")}/mo with no-cost 3-month EMI.`,
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
        ["Product Type", productRow.jewelleryType.charAt(0).toUpperCase() + productRow.jewelleryType.slice(1)],
        ["Metal", `${productRow.goldPurities[0] || "18KT"} ${productRow.goldColours[0] || "Gold"}`],
        ["Net Gold Weight", `${productRow.netGoldWeight} g`],
        ["Gross Weight", `${productRow.grossWeight} g`],
        ["Diamond Pieces", `${productRow.diamondPieces}`],
        ["Total Diamond Weight", `${productRow.totalDiamondWeight} ct`],
        ["Diamond Grade", productRow.diamondGrades.join(", ")],
        ["Available Sizes", productRow.sizes.join(", ")],
        ["Finish", "High Polish"],
        ["Occasion", "Engagement, Wedding, Gifting"],
      ],
      variants,
    };
  } catch (error) {
    console.error("Error fetching product by slug/sku:", error);
    return null;
  }
}

