"use server";

import { db } from "@/lib/db";
import { category, type Category, type NewCategory } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getImageUrl } from "@/lib/imageUrl";

export interface CreateCategoryInput {
  name: string;
  slug: string;
  redirectSlug?: string;
  bannerImage?: string;
  description?: string;
  priority?: number;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  id: string;
}

/**
 * Fetch all categories ordered by priority ascending.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const list = await db.select().from(category).orderBy(asc(category.priority));
    return list.map((c) => ({
      ...c,
      bannerImage: c.bannerImage ? getImageUrl(c.bannerImage) : null,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Fetch category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await db.select().from(category).where(eq(category.slug, slug));
    if (!res[0]) return null;
    return {
      ...res[0],
      bannerImage: res[0].bannerImage ? getImageUrl(res[0].bannerImage) : null,
    };
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

/**
 * Create a new category in the database.
 */
export async function createCategory(input: CreateCategoryInput): Promise<{
  success: boolean;
  category?: Category;
  error?: string;
}> {
  try {
    const name = input.name?.trim();
    const slug = (input.slug || input.name || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!name) return { success: false, error: "Category name is required." };
    if (!slug) return { success: false, error: "Valid category slug is required." };

    // Check slug uniqueness
    const existing = await db.select({ id: category.id }).from(category).where(eq(category.slug, slug));
    if (existing.length > 0) {
      return { success: false, error: `Category with slug "${slug}" already exists.` };
    }

    const [newCat] = await db
      .insert(category)
      .values({
        name,
        slug,
        redirectSlug: input.redirectSlug?.trim() || `/collection?category=${encodeURIComponent(name)}`,
        bannerImage: input.bannerImage?.trim() || null,
        description: input.description?.trim() || null,
        priority: input.priority !== undefined ? input.priority : 1,
      })
      .returning();

    revalidatePath("/admin");
    revalidatePath("/collection");
    revalidatePath("/");

    return { success: true, category: newCat };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create category.",
    };
  }
}

/**
 * Update an existing category.
 */
export async function updateCategory(
  id: string,
  input: Partial<CreateCategoryInput>
): Promise<{ success: boolean; category?: Category; error?: string }> {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    let target = isUuid
      ? (await db.select().from(category).where(eq(category.id, id)))[0]
      : (await db.select().from(category).where(eq(category.slug, id)))[0];

    if (!target && input.slug) {
      target = (await db.select().from(category).where(eq(category.slug, input.slug.trim())))[0];
    }

    if (!target) {
      return { success: false, error: "Category not found in database." };
    }

    const updates: Partial<typeof category.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (input.name) updates.name = input.name.trim();
    if (input.slug) {
      updates.slug = input.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (input.redirectSlug !== undefined) updates.redirectSlug = input.redirectSlug ? input.redirectSlug.trim() : null;
    if (input.bannerImage !== undefined) updates.bannerImage = input.bannerImage ? input.bannerImage.trim() : null;
    if (input.description !== undefined) updates.description = input.description ? input.description.trim() : null;
    if (input.priority !== undefined) updates.priority = input.priority;

    const [updated] = await db
      .update(category)
      .set(updates)
      .where(eq(category.id, target.id))
      .returning();

    revalidatePath("/admin");
    revalidatePath("/collection");
    revalidatePath("/");

    return { success: true, category: updated };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update category.",
    };
  }
}

/**
 * Delete a category by ID or slug.
 */
export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isUuid) {
      await db.delete(category).where(eq(category.id, id));
    } else {
      await db.delete(category).where(eq(category.slug, id));
    }

    revalidatePath("/admin");
    revalidatePath("/collection");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete category.",
    };
  }
}
