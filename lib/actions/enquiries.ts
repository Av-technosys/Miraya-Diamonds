"use server";

import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { productEnquiries, products } from "@/lib/db/schema";
import { enquiryStatuses } from "@/lib/enquiries";
import type { AdminEnquiry, EnquiryListResult, EnquiryQuery, EnquiryStatus, EnquirySummary, ProductEnquiryInput } from "@/lib/enquiries";

export async function getAdminEnquiries(query: EnquiryQuery = {}): Promise<EnquiryListResult> {
  const pageSize = 12;
  const requestedPage = typeof query.page === "number" && Number.isSafeInteger(query.page) && query.page > 0 ? query.page : 1;
  const search = (query.search || "").trim().slice(0, 200);
  if (query.status && query.status !== "all" && !Object.hasOwn(enquiryStatuses, query.status)) {
    return { success: false, error: "Choose a valid enquiry status." };
  }
  const pattern = `%${search.replace(/[\\%_]/g, "\\$&")}%`;
  const where = and(
    query.status && query.status !== "all" ? eq(productEnquiries.status, query.status) : undefined,
    search ? or(...[
      productEnquiries.name, productEnquiries.mobileNumber, productEnquiries.email,
      productEnquiries.productName, productEnquiries.productSku, productEnquiries.message,
      productEnquiries.metalColour, productEnquiries.diamondGrade, productEnquiries.metalPurity,
      productEnquiries.size, productEnquiries.engravingText,
    ].map((column) => ilike(column, pattern)), ilike(sql`${productEnquiries.id}::text`, pattern)) : undefined,
  );

  try {
    const [[totalRow], groups] = await Promise.all([
      db.select({ value: count() }).from(productEnquiries).where(where),
      db.select({ status: productEnquiries.status, value: count() }).from(productEnquiries).groupBy(productEnquiries.status),
    ]);
    const total = totalRow.value;
    const page = Math.min(requestedPage, Math.max(1, Math.ceil(total / pageSize)));
    const rows = await db.select().from(productEnquiries).where(where)
      .orderBy(desc(productEnquiries.createdAt), desc(productEnquiries.id)).limit(pageSize).offset((page - 1) * pageSize);
    const summary: EnquirySummary = { under_review: 0, response_received: 0, consultation_scheduled: 0, closed: 0 };
    for (const group of groups) summary[group.status] = group.value;
    return {
      success: true, total, page, pageSize, summary,
      enquiries: rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() })),
    };
  } catch (error) {
    console.error("Enquiry loading failed:", error);
    return { success: false, error: "Enquiries couldn't be loaded. Please try again." };
  }
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<{
  success: true; enquiry: AdminEnquiry;
} | { success: false; error: string }> {
  if (!/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(id) || !Object.hasOwn(enquiryStatuses, status)) {
    return { success: false, error: "Invalid enquiry or status." };
  }
  try {
    const [row] = await db.update(productEnquiries).set({ status }).where(eq(productEnquiries.id, id)).returning();
    if (!row) return { success: false, error: "This enquiry no longer exists. Refresh the list." };
    revalidatePath("/admin");
    return { success: true, enquiry: { ...row, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() } };
  } catch (error) {
    console.error("Enquiry update failed:", error);
    return { success: false, error: "The status couldn't be saved. Please try again." };
  }
}

export async function submitProductEnquiry(input: ProductEnquiryInput) {
  if (!input || [input.name, input.phone, input.email, input.message, input.sku, input.metalColour,
    input.diamondGrade, input.metalPurity, input.size, input.engravingText].some((value) => typeof value !== "string")) {
    return { success: false, error: "Please check your enquiry details." };
  }
  const name = input.name.trim();
  const phone = input.phone.trim();
  const digits = phone.replace(/\D/g, "");
  const email = input.email.trim();
  if (!name || name.length > 120) return { success: false, error: "Please enter your name (up to 120 characters)." };
  if (!/^[+\d\s()-]+$/.test(phone) || !/^\d{10,15}$/.test(digits)) return { success: false, error: "Please enter a valid mobile number." };
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return { success: false, error: "Please enter a valid email address." };
  if (input.message.length > 3000 || input.sku.length > 100 || input.engravingText.length > 24 ||
    typeof input.engravingRequested !== "boolean" ||
    [input.metalColour, input.diamondGrade, input.metalPurity, input.size].some((value) => !value.trim() || value.length > 100)) {
    return { success: false, error: "Please check your product options and message." };
  }
  try {
    const [product] = await db.select({ id: products.id, name: products.name, sku: products.sku }).from(products)
      .where(eq(products.sku, input.sku.replace(/^#/, "").trim())).limit(1);
    if (!product) return { success: false, error: "This product is unavailable for enquiries. Please contact our atelier." };
    await db.insert(productEnquiries).values({
      productId: product.id, productName: product.name, productSku: product.sku,
      name, mobileNumber: `+${digits.length === 10 ? "91" : ""}${digits}`, email: email || null,
      message: input.message.trim() || null, metalColour: input.metalColour.trim(),
      diamondGrade: input.diamondGrade.trim(), metalPurity: input.metalPurity.trim(), size: input.size.trim(),
      engravingRequested: input.engravingRequested,
      engravingText: input.engravingRequested ? input.engravingText.trim() || null : null,
    });
    return { success: true, message: "Thank you. Your enquiry has been received. Our atelier will get in touch shortly." };
  } catch (error) {
    console.error("Product enquiry failed:", error);
    return { success: false, error: "We couldn't send your enquiry. Please try again." };
  }
}
