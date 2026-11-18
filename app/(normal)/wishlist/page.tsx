import type { Metadata } from "next";
import { WishlistPage } from "@/components/wishlist/wishlist-page";
import { getPublicProducts } from "@/lib/actions/products";

export const metadata: Metadata = {
  title: "Your Wishlist | Miraya Diamonds",
  description: "Revisit the Miraya Diamonds designs you love.",
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return <WishlistPage products={await getPublicProducts()} />;
}
