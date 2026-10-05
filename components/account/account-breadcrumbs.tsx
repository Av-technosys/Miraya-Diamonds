"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/profile": "My Profile",
  "/dashboard/orders": "My Order",
  "/dashboard/orders/AJ-984210": "Order Details",
  "/dashboard/address": "Saved Address",
  "/dashboard/address/new": "New Address",
};

export function AccountBreadcrumbs() {
  const pathname = usePathname();
  const currentLabel = PAGE_LABELS[pathname] ?? "Dashboard";

  return (
    <div className="py-3 md:py-6">
      <div className="flex items-center gap-2 text-[10px] text-gray-500 md:text-sm">
        <Link href="/" className="transition-colors hover:text-gray-800">
          Home
        </Link>
        <ChevronRight size={12} className="text-[#CB485E] md:size-3.5" />
        <Link href="/dashboard" className="transition-colors hover:text-gray-800">
          My Account
        </Link>
        <ChevronRight size={12} className="text-[#CB485E] md:size-3.5" />
        {pathname === "/dashboard/address/new" ? (
          <>
            <Link href="/dashboard/address" className="transition-colors hover:text-gray-800">
              Saved Address
            </Link>
            <ChevronRight size={12} className="text-[#CB485E] md:size-3.5" />
          </>
        ) : null}
        <span className="font-medium text-gray-800">{currentLabel}</span>
      </div>
    </div>
  );
}
