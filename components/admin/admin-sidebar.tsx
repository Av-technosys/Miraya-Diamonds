"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Gem,
  Layers,
  MessageSquareText,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

export type AdminTab = "dashboard" | "users" | "products" | "categories" | "enquiries";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  enquiriesPendingCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  enquiriesPendingCount = 3,
  isOpenMobile = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const navItems = [
    {
      id: "dashboard" as AdminTab,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "users" as AdminTab,
      label: "Users & Clients",
      icon: Users,
    },
    {
      id: "products" as AdminTab,
      label: "Diamond Catalogue",
      icon: Gem,
    },
    {
      id: "categories" as AdminTab,
      label: "Categories",
      icon: Layers,
    },
    {
      id: "enquiries" as AdminTab,
      label: "Enquiries & Bespoke",
      icon: MessageSquareText,
      badge: enquiriesPendingCount > 0 ? `${enquiriesPendingCount} New` : undefined,
      badgeVariant: "gold" as const,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#121714] text-[#E8E6E3] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        } border-r border-[#222E27]`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-[#222E27] px-6">
          <Link
            href="/admin"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C5A880] to-[#8C7350] text-[#121714] shadow-[0_4px_16px_rgba(197,168,128,0.25)]">
              <Sparkles size={20} className="transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className="block font-bold text-[18px] tracking-wider text-white">
                MIRAYA
              </span>
              <span className="block font-sans text-[9px] uppercase tracking-[0.24em] text-[#C5A880]">
                 Admin
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="grid size-8 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mx-4 mt-4 flex items-center justify-between rounded-xl border border-[#222E27] bg-[#171E1A] px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34D399] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#10B981]" />
            </span>
            <span className="text-xs font-medium text-white/80">Store Online</span>
          </div>
          <span className="rounded-full bg-[#C5A880]/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#E4D1B5]">
            v2.4 Live
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3.5 py-6">
          <div className="mb-2 px-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Main Management
          </div>

          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile?.();
                  }}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#214E34] to-[#1A3F2A] font-medium text-white shadow-[0_6px_20px_rgba(33,78,52,0.35)]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {/* Left Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2.5 h-6 w-1 rounded-r-full bg-[#C5A880]" />
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`grid size-9 place-items-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#C5A880]/20 text-[#E7D6BE]"
                          : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <span className="text-[13.5px] font-medium leading-tight">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                        item.badgeVariant === "gold"
                          ? "bg-[#C5A880] text-[#121714] shadow-xs"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Direct Store Link */}
          <div className="mt-6 border-t border-[#222E27]/80 pt-4">
            <Link
              href="/"
              target="_blank"
              className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink size={14} className="text-[#C5A880]" />
                <span>View Live Store</span>
              </div>
              <ChevronRight size={13} className="text-white/30 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="border-t border-[#222E27] bg-[#101412] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#214E34] to-[#3B7A56] font-bold text-xs text-[#F7F5F2] ring-2 ring-[#C5A880]/30">
                NK
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-white">Nikhil Kumawat</div>
                <div className="flex items-center gap-1 text-[11px] text-[#C5A880]">
                  <ShieldCheck size={12} />
                  <span>Super Admin</span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              title="Return to site"
              className="grid size-8 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

