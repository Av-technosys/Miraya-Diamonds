"use client";

import Image from "next/image";
import { Menu } from "lucide-react";

export function AdminTopbar({ onOpenMobileSidebar }: { onOpenMobileSidebar: () => void }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e9e4df] bg-[#FCF9F8] px-4 sm:px-8 lg:hidden">
      <Image src="/Header_logo_mb.png" alt="Miraya Diamonds" width={128} height={24} className="h-5 w-auto" />
      <button type="button" onClick={onOpenMobileSidebar} aria-label="Open navigation" className="grid size-9 place-items-center rounded-md border border-[#e5dfd9] bg-white text-[#214E34]"><Menu size={18} strokeWidth={1.5} /></button>
    </header>
  );
}
