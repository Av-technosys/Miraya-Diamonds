import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getPublicProducts } from "@/lib/actions/products";

export const metadata: Metadata = {
  title: "Miraya Diamonds | Fine Jewellery for Every Moment",
  description: "Explore diamond rings, earrings, necklaces and fine jewellery at Miraya Diamonds.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getPublicProducts();
  return <HomePage products={products} />;
}
