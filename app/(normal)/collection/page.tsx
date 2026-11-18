import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/collection-page";
import { getPublicProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";

export const metadata: Metadata = {
  title: "Diamond & Gold Jewellery Collection | Miraya Diamonds",
  description: "Browse the Miraya Diamonds and gold collection of earrings, rings, bracelets, pendants and more. Choose a ready design or get one customised in Jaipur, India.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const [products, categories] = await Promise.all([getPublicProducts(), getCategories()]);
  const names = new Map(categories.map((category) => [category.id, category.name]));
  const initialProducts = products.map((product) => {
    const name = (product.categoryId && names.get(product.categoryId)) || product.type;
    return { ...product, type: name, categoryAliases: [...new Set([...product.categoryAliases, name])] };
  });
  return <CollectionPage initialProducts={initialProducts} categories={categories.map((category) => category.name)} />;
}
