import type { Metadata } from "next";
import { getPublicProducts } from "@/lib/actions/products";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Miraya Diamonds | Fine Jewellery for Every Moment",
  description: "Explore diamond rings, earrings, necklaces and fine jewellery at Miraya Diamonds.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  return <HomePage products={await getPublicProducts()} />;
}
