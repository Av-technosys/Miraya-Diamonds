import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/pdp/product-detail-page";
import { product as fallbackProduct } from "@/components/pdp/product-data";
import { getProductBySlugOrSku } from "@/lib/actions/products";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbProduct = await getProductBySlugOrSku(slug);

  if (dbProduct) {
    return {
      title: `${dbProduct.name} | Miraya Diamonds`,
      description: dbProduct.description || "Handcrafted fine diamond jewellery by Miraya Diamonds.",
    };
  }

  if (slug === fallbackProduct.slug) {
    return {
      title: `${fallbackProduct.name} | Miraya Diamonds`,
      description: "Explore the Bhvita rose gold solitaire diamond ring by Miraya Diamonds.",
    };
  }

  return { title: "Product Not Found | Miraya Diamonds" };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const dbProduct = await getProductBySlugOrSku(slug);

  if (dbProduct) {
    return <ProductDetailPage initialProduct={dbProduct} />;
  }

  if (slug === fallbackProduct.slug) {
    return <ProductDetailPage />;
  }

  notFound();
}
