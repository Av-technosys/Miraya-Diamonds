import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/pdp/product-detail-page";
import { getProductBySlugOrSku, getPublicProducts } from "@/lib/actions/products";

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

  return { title: "Product Not Found | Miraya Diamonds" };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const [dbProduct, allProducts] = await Promise.all([getProductBySlugOrSku(slug), getPublicProducts()]);

  if (dbProduct) {
    const relatedProducts = allProducts
      .filter((item) => item.id !== dbProduct.id)
      .sort((a, b) => Number(b.jewelleryType === dbProduct.jewelleryType) - Number(a.jewelleryType === dbProduct.jewelleryType))
      .slice(0, 5);
    return <ProductDetailPage initialProduct={dbProduct} relatedProducts={relatedProducts} />;
  }

  notFound();
}
