import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/collection-page";
import { getPublicProducts } from "@/lib/actions/products";

export const metadata: Metadata = {
  title: "Collection | Miraya Diamonds",
  description: "Explore the Miraya Diamonds jewellery collection.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CollectionPage initialProducts={await getPublicProducts()} />;
}
