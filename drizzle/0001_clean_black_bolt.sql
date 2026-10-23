CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"redirect_slug" varchar,
	"banner_image" varchar,
	"description" varchar,
	"priority" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_us" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"phone" varchar,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid,
	"product_name" text NOT NULL,
	"product_sku" text NOT NULL,
	"name" varchar(120) NOT NULL,
	"mobile_number" varchar(24) NOT NULL,
	"email" varchar(254),
	"message" text,
	"metal_colour" text NOT NULL,
	"diamond_grade" text NOT NULL,
	"metal_purity" text NOT NULL,
	"size" text NOT NULL,
	"engraving_requested" boolean DEFAULT false NOT NULL,
	"engraving_text" varchar(24),
	"status" text DEFAULT 'under_review' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_enquiries_valid_status" CHECK ("product_enquiries"."status" IN ('under_review', 'response_received', 'consultation_scheduled', 'closed')),
	CONSTRAINT "product_enquiries_message_length" CHECK (char_length("product_enquiries"."message") <= 3000)
);
--> statement-breakpoint
CREATE TABLE "product_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_variant_id" uuid,
	"product_id" uuid,
	"media_type" varchar,
	"media_url" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"sku" text NOT NULL,
	"name" text NOT NULL,
	"metal_colour" text,
	"gold_purity" text,
	"diamond_grade" text,
	"size" text,
	"price" numeric(14, 2) NOT NULL,
	"strikethrough_price" numeric(14, 2),
	"stock" integer DEFAULT 1,
	"is_in_stock" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "product_variants_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "birthday" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "anniversary" text;--> statement-breakpoint
ALTER TABLE "product_enquiries" ADD CONSTRAINT "product_enquiries_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_enquiries_created_at_idx" ON "product_enquiries" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "product_enquiries_product_id_idx" ON "product_enquiries" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_enquiries_status_created_at_idx" ON "product_enquiries" USING btree ("status","created_at" DESC NULLS LAST);