CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sku" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"jewellery_type" text NOT NULL,
	"diamond_grades" text[] NOT NULL,
	"gold_purities" text[] NOT NULL,
	"gold_colours" text[] NOT NULL,
	"sizes" text[] NOT NULL,
	"banner_image" text,
	"gross_weight" numeric(10, 3) NOT NULL,
	"net_gold_weight" numeric(10, 3) NOT NULL,
	"diamond_pieces" integer NOT NULL,
	"total_diamond_weight" numeric(10, 3) NOT NULL,
	"diamond_price" numeric(14, 2) NOT NULL,
	"making_charge" numeric(14, 2) NOT NULL,
	"dimensions" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "products_sku_unique" UNIQUE("sku"),
	CONSTRAINT "products_valid_weights" CHECK ("products"."gross_weight" >= 0 AND "products"."net_gold_weight" >= 0 AND "products"."net_gold_weight" <= "products"."gross_weight" AND "products"."total_diamond_weight" >= 0),
	CONSTRAINT "products_valid_diamond_pieces" CHECK ("products"."diamond_pieces" >= 0),
	CONSTRAINT "products_valid_prices" CHECK ("products"."diamond_price" >= 0 AND "products"."making_charge" >= 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"mobile_number" text NOT NULL,
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
