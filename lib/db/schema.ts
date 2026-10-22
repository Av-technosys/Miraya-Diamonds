import { sql } from "drizzle-orm";
import { boolean, check, integer, jsonb, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

type ProductDimensions = {
  height: string;
  width: string;
  length: string;
};

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
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
