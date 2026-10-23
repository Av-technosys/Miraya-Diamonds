"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Users, Gem, Layers, MessageSquareText, UserRound, LogOut, X } from "lucide-react";

export type AdminTab = "dashboard" | "users" | "products" | "categories" | "enquiries";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  enquiriesPendingCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "products", label: "Products", icon: Gem },
  { id: "categories", label: "Category", icon: Layers },
  { id: "enquiries", label: "Enquiries", icon: MessageSquareText },
] as const;

export function AdminSidebar({
  activeTab,
  onSelectTab,
  enquiriesPendingCount = 0,
  isOpenMobile = false,
  onCloseMobile,
}: AdminSidebarProps) {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) onCloseMobile?.();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [onCloseMobile]);

  const content = (
    <>
      <div className="flex h-24 shrink-0 [@media(max-height:600px)]:h-14 items-center justify-between px-7">
        <Link href="/admin" aria-label="Miraya admin" className="flex items-center gap-2.5">
          <Image src="/Header_logo.png" alt="" width={42} height={42} className="h-10 w-auto" priority />
          <Image src="/Header_logo_mb.png" alt="Miraya Diamonds" width={128} height={36} className="h-5 w-auto" priority />
        </Link>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation"
          className="grid size-8 place-items-center text-white/65 lg:hidden"
        >
          <X size={18} />
        </button>
      </div>
      <div className="mx-7 border-t border-white/10" />
      <p className="px-7 pb-4 pt-7 [@media(max-height:600px)]:pb-2 [@media(max-height:600px)]:pt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
        Administration
      </p>
      <nav aria-label="Admin navigation" className="space-y-1 px-4">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-current={activeTab === id ? "page" : undefined}
            onClick={() => {
              onSelectTab(id);
              onCloseMobile?.();
            }}
            className={`flex min-h-12 [@media(max-height:600px)]:min-h-9 w-full items-center gap-3 rounded-md px-4 text-left text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9caa9b] ${
              activeTab === id
                ? "bg-white/10 font-medium text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span>{label}</span>
            {id === "enquiries" && enquiriesPendingCount > 0 && (
              <span
                className={`ml-auto min-w-5 rounded px-1.5 py-0.5 text-center text-[10px] tabular-nums ${
                  activeTab === id ? "bg-white/15 text-white" : "bg-white/10 text-white/80"
                }`}
              >
                {enquiriesPendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-auto shrink-0 px-6 pb-6 pt-5 [@media(max-height:600px)]:py-3">
        <div className="flex items-center gap-3 border-t border-white/10 pt-5 [@media(max-height:600px)]:pt-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/75">
            <UserRound size={17} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white/90">Admin</p>
            <p className="mt-0.5 text-[10px] text-white/40">Miraya Diamonds</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            title="Log out"
            className="grid size-9 shrink-0 place-items-center rounded-md text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={17} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden h-dvh w-60 flex-col overflow-hidden border-r border-white/10 bg-[#193d2c] lg:flex">
        {content}
      </aside>

      {/* Mobile Drawer (ONLY renders when isOpenMobile is true, prevents click blocking) */}
      {isOpenMobile && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-[#26352b]/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(280px,85vw)] flex-col overflow-hidden bg-[#193d2c] shadow-2xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
