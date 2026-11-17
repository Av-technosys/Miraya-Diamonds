import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/pdp/product-detail-page";
import { getProductBySlugOrSku, getPublicProducts } from "@/lib/actions/products";

type PageProps = { params: Promise<{ slug: string }> };
const getProduct = cache(getProductBySlugOrSku);
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found | Miraya Diamonds", robots: { index: false } };
  return {
    title: `${product.name} | Miraya Diamonds`,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.gallery.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const products = await getPublicProducts();
  const related = products.filter((item) => item.id !== product.id).sort((a, b) => Number(b.categoryId === product.categoryId) - Number(a.categoryId === product.categoryId)).slice(0, 5);
  return <ProductDetailPage key={product.id} initialProduct={product} relatedProducts={related} />;
}
