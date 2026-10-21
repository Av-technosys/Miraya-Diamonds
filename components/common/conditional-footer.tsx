"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/common/footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  if (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/account" ||
    pathname.startsWith("/account/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  ) {
    return null;
  }

  return <Footer />;
}
