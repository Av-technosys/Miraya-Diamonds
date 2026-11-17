import { sql } from "drizzle-orm";
import { boolean, check, index, integer, jsonb, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

type ProductDimensions = {
  height: string;
  width: string;
  length: string;
};

// ================= CATEGORY =================

export const category = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  redirectSlug: varchar("redirect_slug"),
  bannerImage: varchar("banner_image"),
  description: varchar("description"),
  priority: integer("priority").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categories = category;

export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;

// ================= PRODUCTS =================

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => category.id, {
    onDelete: "set null",
  }),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  jewelleryType: text("jewellery_type").notNull(),
  diamondGrades: text("diamond_grades").array().notNull(),
  goldPurities: text("gold_purities").array().notNull(),
  goldColours: text("gold_colours").array().notNull(),
  sizes: text("sizes").array().notNull(),
  bannerImage: text("banner_image"),
  grossWeight: numeric("gross_weight", { precision: 10, scale: 3 }).notNull(),
  netGoldWeight: numeric("net_gold_weight", { precision: 10, scale: 3 }).notNull(),
  diamondPieces: integer("diamond_pieces").notNull(),
  totalDiamondWeight: numeric("total_diamond_weight", { precision: 10, scale: 3 }).notNull(),
  diamondPrice: numeric("diamond_price", { precision: 14, scale: 2 }).notNull(),
  makingCharge: numeric("making_charge", { precision: 14, scale: 2 }).notNull(),
  dimensions: jsonb("dimensions").$type<ProductDimensions>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  check("products_valid_weights", sql`${table.grossWeight} >= 0 AND ${table.netGoldWeight} >= 0 AND ${table.netGoldWeight} <= ${table.grossWeight} AND ${table.totalDiamondWeight} >= 0`),
  check("products_valid_diamond_pieces", sql`${table.diamondPieces} >= 0`),
  check("products_valid_prices", sql`${table.diamondPrice} >= 0 AND ${table.makingCharge} >= 0`),
]);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productVariants = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  metalColour: text("metal_colour"),
  goldPurity: text("gold_purity"),
  diamondGrade: text("diamond_grade"),
  size: text("size"),
  price: numeric("price", { precision: 14, scale: 2 }).notNull(),
  strikethroughPrice: numeric("strikethrough_price", { precision: 14, scale: 2 }),
  stock: integer("stock").default(1),
  isInStock: boolean("is_in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productVariant = productVariants;

export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;

export const productMedia = pgTable("product_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVariantId: uuid("product_variant_id").references(
    () => productVariant.id,
    { onDelete: "cascade" },
  ),
  productId: uuid("product_id").references(
    () => products.id,
    { onDelete: "cascade" },
  ),
  mediaType: varchar("media_type"),
  mediaURL: varchar("media_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ProductMedia = typeof productMedia.$inferSelect;
export type NewProductMedia = typeof productMedia.$inferInsert;

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  mobileNumber: text("mobile_number").notNull(),
  address: text("address"),
  gender: text("gender"),
  birthday: text("birthday"),
  anniversary: text("anniversary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ================= CONTACT US =================

export const contactUs = pgTable("contact_us", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email"),
  phone: varchar("phone"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ContactUs = typeof contactUs.$inferSelect;
export type NewContactUs = typeof contactUs.$inferInsert;

// Product enquiries
export const productEnquiries = pgTable("product_enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  productName: text("product_name").notNull(),
  productSku: text("product_sku").notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  mobileNumber: varchar("mobile_number", { length: 24 }).notNull(),
  email: varchar("email", { length: 254 }),
  message: text("message"),
  metalColour: text("metal_colour").notNull(),
  diamondGrade: text("diamond_grade").notNull(),
  metalPurity: text("metal_purity").notNull(),
  size: text("size").notNull(),
  engravingRequested: boolean("engraving_requested").default(false).notNull(),
  engravingText: varchar("engraving_text", { length: 24 }),
  status: text("status", {
    enum: ["under_review", "response_received", "consultation_scheduled", "closed"],
  }).default("under_review").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index("product_enquiries_created_at_idx").on(table.createdAt.desc()),
  index("product_enquiries_product_id_idx").on(table.productId),
  index("product_enquiries_status_created_at_idx").on(table.status, table.createdAt.desc()),
  check("product_enquiries_valid_status", sql`${table.status} IN ('under_review', 'response_received', 'consultation_scheduled', 'closed')`),
  check("product_enquiries_message_length", sql`char_length(${table.message}) <= 3000`),
]);

export type ProductEnquiry = typeof productEnquiries.$inferSelect;
export type NewProductEnquiry = typeof productEnquiries.$inferInsert;
