ALTER TABLE "products" ALTER COLUMN "jewellery_type" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "gross_weight" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "net_gold_weight" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "diamond_pieces" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "total_diamond_weight" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "diamond_price" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "making_charge" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "dimensions" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "price" DROP NOT NULL;
