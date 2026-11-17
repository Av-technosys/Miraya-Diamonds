ALTER TABLE "categories" ADD COLUMN "dimensions" varchar;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category_id" uuid;--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.products'::regclass
      AND conname = 'products_category_id_categories_id_fk'
  ) THEN
    ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk"
      FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id")
      ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
