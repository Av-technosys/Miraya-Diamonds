import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/admin-panel";
import { getAdminUsers } from "@/lib/actions/users";

export const metadata: Metadata = {
  title: "Admin Portal | Miraya Diamonds",
  description:
    "Executive management console for Miraya Diamonds. Manage collectors, diamond jewellery catalogue, bespoke orders, and customer enquiries.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const initialUsers = await getAdminUsers();
  return <AdminPanel initialUsers={initialUsers} />;
}

