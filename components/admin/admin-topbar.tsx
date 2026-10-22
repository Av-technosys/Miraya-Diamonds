"use client";

import Link from "next/link";
import { Menu, ExternalLink, Sparkles } from "lucide-react";
import type { AdminTab } from "./admin-sidebar";

interface AdminTopbarProps {
  activeTab: AdminTab;
  onOpenMobileSidebar: () => void;
}

const tabMeta: Record<AdminTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Executive Overview",
    subtitle: "Real-time metrics, boutique revenue",
  },
  users: {
    title: "Users",
    subtitle: "Manage registered accounts",
  },
  products: {
    title: "Diamond Jewellery Catalogue",
    subtitle: "Manage solitaire rings, necklaces, karats, and diamond stocks",
  },
  categories: {
    title: "Jewellery Categories",
    subtitle: "Manage navigation categories, banners, priorities, and collection redirect URLs",
  },
  enquiries: {
    title: "Enquiries",
    subtitle: "Customer design briefs, appointment requests & custom quotes",
  },
};

export function AdminTopbar({
  activeTab,
  onOpenMobileSidebar,
}: AdminTopbarProps) {
  const currentMeta = tabMeta[activeTab];

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#EAE6DE] bg-white/85 px-4 backdrop-blur-md sm:px-8">
      {/* Left Title and Mobile Toggle */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="grid size-10 place-items-center rounded-xl border border-[#E3DDD4] bg-[#FAF8F5] text-[#1C1B1A] transition-colors hover:bg-white lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="font-serif text-[22px] font-semibold leading-tight text-[#161D1A] sm:text-[26px]">
            {currentMeta.title}
          </h1>
          <p className="hidden text-[12px] text-[#78716C] sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live Store Pill Button */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/40 bg-[#FAF7F2] px-4 py-2 text-xs font-semibold text-[#214E34] transition-all hover:border-[#214E34] hover:bg-[#214E34] hover:text-white"
        >
          <Sparkles size={13} className="text-[#C5A880]" />
          <span>Live Boutique</span>
          <ExternalLink size={12} className="opacity-60" />
        </Link>
      </div>
    </header>
  );
}
