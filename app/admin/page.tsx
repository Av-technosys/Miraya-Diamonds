import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/admin-panel";

export const metadata: Metadata = {
  title: "Admin Portal | Miraya Diamonds",
  description:
    "Executive management console for Miraya Diamonds. Manage collectors, diamond jewellery catalogue, bespoke orders, and customer enquiries.",
};

export default function AdminPage() {
  return <AdminPanel />;
}

