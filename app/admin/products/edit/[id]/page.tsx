import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/products/product-form";
import { getAdminProduct } from "@/lib/actions/admin-products";
import { getCategories } from "@/lib/actions/categories";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getAdminProduct(id), getCategories()]);
  if (!product) notFound();
  return <ProductForm key={product.id} initialProduct={product} categories={categories} />;
}
