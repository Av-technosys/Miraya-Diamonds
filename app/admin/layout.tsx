import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/layout/admin-shell";
import { getAdminEnquiries } from "@/lib/actions/enquiries";

export const metadata: Metadata = { title: "Admin Portal | Miraya Diamonds", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const enquiries = await getAdminEnquiries();
  return <AdminShell pendingCount={enquiries.success ? enquiries.summary.under_review : 0}>{children}</AdminShell>;
}
