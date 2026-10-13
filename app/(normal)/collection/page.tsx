import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/collection-page";
import { parseCollectionFilters } from "@/components/collection/filter-state";

export const metadata: Metadata = {
  title: "Collection | Miraya Diamonds",
  description: "Explore the Miraya Diamonds jewellery collection.",
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseCollectionFilters(await searchParams);
  return <CollectionPage key={JSON.stringify(filters)} initialFilters={filters} />;
}
