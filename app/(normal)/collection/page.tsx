import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/collection-page";
import { parseCollectionFilters } from "@/components/collection/filter-state";
import { getPublicProducts } from "@/lib/actions/products";

export const metadata: Metadata = {
  title: "Collection | Miraya Diamonds",
  description: "Explore the Miraya Diamonds jewellery collection.",
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [filters, initialProducts] = await Promise.all([
    parseCollectionFilters(await searchParams),
    getPublicProducts(),
  ]);

  return (
    <CollectionPage
      key={JSON.stringify(filters)}
      initialFilters={filters}
      initialProducts={initialProducts}
    />
  );
}
