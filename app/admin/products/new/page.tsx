import { ProductForm } from "@/components/admin/products/product-form";
import { getCategories } from "@/lib/actions/categories";

export default async function NewProductPage() {
  return <ProductForm categories={await getCategories()} />;
}
