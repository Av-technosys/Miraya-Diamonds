import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/pdp/product-detail-page";
import { product } from "@/components/pdp/product-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== product.slug) return { title: "Product Not Found | Miraya Diamonds" };

  return {
    title: `${product.name} | Miraya Diamonds`,
    description: "Explore the Bhvita rose gold solitaire diamond ring by Miraya Diamonds.",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug !== product.slug) notFound();
  return <ProductDetailPage />;
}
