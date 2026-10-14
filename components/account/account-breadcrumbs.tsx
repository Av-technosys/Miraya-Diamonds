"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function AccountBreadcrumbs() {
  const isProfile = usePathname() === "/dashboard/profile";
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-5 text-[11px] text-[#777] sm:py-7 sm:text-xs">
      <Link href="/" className="hover:text-[#214E34]">Home</Link>
      <ChevronRight size={11} className="text-[#214E34]" />
      <Link href="/dashboard" className="hover:text-[#214E34]">My Account</Link>
      <ChevronRight size={11} className="text-[#214E34]" />
      <span aria-current="page">{isProfile ? "Profile" : "My Enquiries"}</span>
    </nav>
  );
}
