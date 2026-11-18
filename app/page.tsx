import type { Metadata } from "next";
import { getPublicProducts } from "@/lib/actions/products";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Customise Diamond & Gold Jewellery in Jaipur | Miraya Diamonds",
  description: "Shop ready-to-wear diamond & 22KT gold jewellery, or get a design customised just for you. Rings, earrings, pendants and bracelets from Jaipur, Rajasthan.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  return <HomePage products={await getPublicProducts()} />;
}
