import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/admin-panel";
import { getAdminUsers } from "@/lib/actions/users";
import { getAdminProducts } from "@/lib/actions/products";
import { getAdminEnquiries } from "@/lib/actions/enquiries";
import { getCategories } from "@/lib/actions/categories";

export const metadata: Metadata = {
  title: "Admin Portal | Miraya Diamonds",
  description:
    "Executive management console for Miraya Diamonds. Manage collectors, diamond jewellery catalogue, bespoke orders, and customer enquiries.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [initialUsers, initialProducts, initialCategories, initialEnquiriesResult] = await Promise.all([
    getAdminUsers(),
    getAdminProducts(),
    getCategories(),
    getAdminEnquiries(),
  ]);
  return (
    <AdminPanel
      initialUsers={initialUsers}
      initialProducts={initialProducts}
      initialCategories={initialCategories}
      initialEnquiriesResult={initialEnquiriesResult}
    />
  );
}

