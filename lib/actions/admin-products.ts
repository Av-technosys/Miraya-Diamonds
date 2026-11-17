"use server";

import { eq, asc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products, productVariants, productMedia } from "@/lib/db/schema";
import { isProductImageKey, isUuid, validateProductInput } from "@/lib/admin/product-form";
import type { ProductEditorData, ProductFormInput } from "@/lib/admin/product-form";

export async function getAdminProduct(id: string): Promise<ProductEditorData | null> {
  if (!isUuid(id)) return null;
  const [product] = await db.select().from(products).where(eq(products.id, id));
  if (!product) return null;
  const [variants, media] = await Promise.all([
    db.select().from(productVariants).where(eq(productVariants.productId, id)).orderBy(asc(productVariants.createdAt), asc(productVariants.id)),
    db.select().from(productMedia).where(eq(productMedia.productId, id)).orderBy(asc(productMedia.createdAt), asc(productMedia.id)),
  ]);
  return {
    ...product,
    jewelleryType: product.jewelleryType || "",
    dimensions: product.dimensions || { height: "", width: "", length: "" },
    createdAt: product.createdAt?.toISOString() ?? null,
    updatedAt: product.updatedAt?.toISOString() ?? null,
    variants: variants.map((variant) => ({
      id: variant.id, key: variant.id, sku: variant.sku, name: variant.name,
      metalColour: variant.metalColour, goldPurity: variant.goldPurity, diamondGrade: variant.diamondGrade, size: variant.size,
      price: variant.price, stock: variant.stock, isInStock: variant.isInStock,
      createdAt: variant.createdAt?.toISOString() ?? null, updatedAt: variant.updatedAt?.toISOString() ?? null,
    })),
    media: media.map((item) => ({ id: item.id, key: item.id, mediaType: item.mediaType || "image", mediaURL: item.mediaURL || "", variantKey: item.productVariantId, createdAt: item.createdAt?.toISOString() ?? null })),
  };
}

export async function saveAdminProduct(id: string | null, input: ProductFormInput): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    if (id !== null && !isUuid(id)) return { success: false, error: "Invalid product reference." };
    const validation = validateProductInput(input);
    if (validation) return { success: false, error: validation };

    const savedId = await db.transaction(async (tx) => {
      // Lock existing product
      const [existing] = id ? await tx.select().from(products).where(eq(products.id, id)).for("update") : [];
      if (id && !existing) throw new Error("This product no longer exists.");
      const previousVariants = id ? await tx.select().from(productVariants).where(eq(productVariants.productId, id)) : [];
      const previousMedia = id ? await tx.select().from(productMedia).where(eq(productMedia.productId, id)) : [];
      const existingVariantIds = new Set(previousVariants.map((variant) => variant.id));
      const existingMedia = new Map(previousMedia.map((item) => [item.id, item]));
      for (const variant of input.variants) {
        if (variant.id && !existingVariantIds.has(variant.id)) throw new Error("A variant does not belong to this product. Reload the editor.");
      }
      for (const item of input.media) {
        if (item.id && !existingMedia.has(item.id)) throw new Error("An image does not belong to this product. Reload the editor.");
        const unchanged = item.id && existingMedia.get(item.id)?.mediaURL === item.mediaURL;
        if (!unchanged && !isProductImageKey(item.mediaURL)) throw new Error("Upload new product images through the S3 uploader.");
      }
      const banner = input.bannerImage || input.media[0]?.mediaURL || null;
      if (banner && banner !== existing?.bannerImage && !isProductImageKey(banner)) throw new Error("Upload the cover image through the S3 uploader.");

      const values = {
        categoryId: input.categoryId,
        sku: input.sku.trim(), name: input.name.trim(), description: input.description.trim(), jewelleryType: input.jewelleryType.trim() || null,
        diamondGrades: input.diamondGrades, goldPurities: input.goldPurities, goldColours: input.goldColours, sizes: input.sizes,
        bannerImage: banner, grossWeight: input.grossWeight || null, netGoldWeight: input.netGoldWeight || null, diamondPieces: input.diamondPieces,
        totalDiamondWeight: input.totalDiamondWeight || null, diamondPrice: input.diamondPrice || null, makingCharge: input.makingCharge || null, dimensions: Object.values(input.dimensions).some((value) => value !== "") ? input.dimensions : null,
        updatedAt: new Date(),
      };
      const [product] = id
        ? await tx.update(products).set(values).where(eq(products.id, id)).returning({ id: products.id })
        : await tx.insert(products).values(values).returning({ id: products.id });
      const variantIds = new Map<string, string>();
      let nextCreatedAt = Math.max(Date.now(), ...previousVariants.map((variant) => (variant.createdAt?.getTime() || 0) + 1));
      for (const [index, variant] of input.variants.entries()) {
        const values = {
          productId: product.id, sku: variant.sku.trim() || `${input.sku.trim()}-${index + 1}`, name: variant.name.trim() || input.name.trim(), metalColour: variant.metalColour,
          goldPurity: variant.goldPurity, diamondGrade: variant.diamondGrade, size: variant.size,
          price: variant.price || null, stock: variant.stock, isInStock: variant.isInStock, updatedAt: new Date(),
        };
        const [saved] = variant.id
          ? await tx.update(productVariants).set(values).where(eq(productVariants.id, variant.id)).returning({ id: productVariants.id })
          : await tx.insert(productVariants).values({ ...values, createdAt: new Date(nextCreatedAt++) }).returning({ id: productVariants.id });
        variantIds.set(variant.key, saved.id);
      }
      for (const item of input.media) {
        const values = { productId: product.id, productVariantId: item.variantKey ? variantIds.get(item.variantKey)! : null, mediaType: item.mediaType, mediaURL: item.mediaURL };
        if (item.id) await tx.update(productMedia).set(values).where(eq(productMedia.id, item.id));
        else await tx.insert(productMedia).values({ ...values, createdAt: new Date(nextCreatedAt++) });
      }
      const retainedMedia = new Set(input.media.map((item) => item.id));
      const removedMedia = previousMedia.filter((item) => !retainedMedia.has(item.id)).map((item) => item.id);
      if (removedMedia.length) await tx.delete(productMedia).where(inArray(productMedia.id, removedMedia));
      const retainedVariants = new Set(input.variants.map((variant) => variant.id));
      const removedVariants = previousVariants.filter((variant) => !retainedVariants.has(variant.id)).map((variant) => variant.id);
      if (removedVariants.length) await tx.delete(productVariants).where(inArray(productVariants.id, removedVariants));
      return product.id;
    });
    revalidatePath("/admin", "layout");
    revalidatePath("/collection", "layout");
    revalidatePath("/");
    return { success: true, id: savedId };
  } catch (error) {
    const cause = error instanceof Error && "cause" in error ? error.cause : error;
    const code = cause && typeof cause === "object" && "code" in cause ? cause.code : null;
    if (code === "23505") return { success: false, error: "This product or variant SKU is already in use. Choose a unique SKU." };
    if (code === "23503") return { success: false, error: "The selected category or variant no longer exists. Reload the editor." };
    console.error("Product save failed:", error);
    return { success: false, error: error instanceof Error && !code && !error.message.startsWith("Failed query") ? error.message : "The product could not be saved. Please try again." };
  }
}
