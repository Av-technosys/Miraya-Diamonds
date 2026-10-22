import { sql } from "drizzle-orm";
import { check, integer, jsonb, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";

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
}, (table) => [
  check("products_valid_weights", sql`${table.grossWeight} >= 0 AND ${table.netGoldWeight} >= 0 AND ${table.netGoldWeight} <= ${table.grossWeight} AND ${table.totalDiamondWeight} >= 0`),
  check("products_valid_diamond_pieces", sql`${table.diamondPieces} >= 0`),
  check("products_valid_prices", sql`${table.diamondPrice} >= 0 AND ${table.makingCharge} >= 0`),
]);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  mobileNumber: text("mobile_number").notNull(),
  address: text("address"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
