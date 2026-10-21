"use client";

import {
  TrendingUp,
  MessageSquareText,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
} from "lucide-react";
import type { AdminTab } from "./admin-sidebar";
import {
  mockStats,
  initialEnquiries,
  initialProducts,
} from "./mock-data";

interface DashboardOverviewProps {
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddProduct: () => void;
}

export function DashboardOverview({
  onNavigateTab,
  onOpenAddProduct,
}: DashboardOverviewProps) {
  const recentEnquiries = initialEnquiries.slice(0, 3);
  const lowStockProducts = initialProducts.filter(
    (p) => p.status === "Low Stock" || p.status === "Out of Stock"
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#17231D] via-[#1E2D25] to-[#121B16] p-6 text-white shadow-[0_12px_36px_rgba(23,35,29,0.18)] sm:p-8">
        <div className="absolute -right-8 -top-8 size-64 rounded-full bg-[#C5A880]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/15 px-3 py-1 text-[11px] font-medium text-[#E4D1B5]">
              <Sparkles size={12} className="text-[#C5A880]" />
              <span>Miraya Diamonds Executive Suite</span>
            </div>
            <h2 className="mt-3 text-[24px] font-bold tracking-tight text-white sm:text-[28px]">
              Welcome back, Nikhil
            </h2>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">
              Today you have <strong className="text-[#E4D1B5]">14 pending bespoke diamond enquiries</strong> and 2 pieces running low in boutique inventory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddProduct}
              className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-5 py-2.5 text-xs font-semibold text-[#121714] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#d1b690]"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("enquiries")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/20"
            >
              <MessageSquareText size={15} />
              <span>View Enquiries</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Card 1: Revenue */}
        <div className="group rounded-2xl border border-[#EAE6DE] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:border-[#C5A880]/60 hover:shadow-[0_8px_24px_rgba(197,168,128,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium uppercase tracking-wider text-[#78716C]">
              Gross Revenue
            </span>
            <div className="grid size-9 place-items-center rounded-xl bg-[#FAF6F0] text-[#8C7350]">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4 text-[26px] font-bold tracking-tight text-[#161D1A]">
            {mockStats.totalRevenue}
          </div>
          
        </div>

        {/* Card 2: Enquiries */}
        <div className="group rounded-2xl border border-[#EAE6DE] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:border-[#C5A880]/60 hover:shadow-[0_8px_24px_rgba(197,168,128,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium uppercase tracking-wider text-[#78716C]">
              Custom Enquiries
            </span>
            <div className="grid size-9 place-items-center rounded-xl bg-[#FAF0ED] text-[#A84A32]">
              <MessageSquareText size={18} />
            </div>
          </div>
          <div className="mt-4 text-[26px] font-bold tracking-tight text-[#161D1A]">
            {mockStats.pendingEnquiries}
          </div>
        
        </div>
      </div>

      {/* Grid: Recent Bespoke Enquiries & Inventory Alerts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Enquiries (2 cols) */}
        <div className="rounded-2xl border border-[#EAE6DE] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-4">
            <div>
              <h3 className="text-[17px] font-bold text-[#161D1A]">
                Recent Bespoke & Custom Inquiries
              </h3>
              <p className="text-xs text-[#78716C]">
                Latest customer briefs submitted from Customize & Lab-Grown pages
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("enquiries")}
              className="text-xs font-semibold text-[#214E34] hover:underline"
            >
              View all ({initialEnquiries.length})
            </button>
          </div>

          <div className="mt-4 divide-y divide-[#F5F2EB]">
            {recentEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="group flex flex-col justify-between gap-3 py-4 transition-colors hover:bg-[#FAF8F5]/60 sm:flex-row sm:items-center sm:px-2 rounded-xl"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium text-[#A8A29E]">
                      {enq.enquiryNumber}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                        enq.status === "Pending"
                          ? "bg-amber-50 text-amber-800 border border-amber-200/60"
                          : enq.status === "In Review"
                          ? "bg-blue-50 text-blue-800 border border-blue-200/60"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                      }`}
                    >
                      {enq.status}
                    </span>
                    <span className="text-[11px] text-[#A8A29E]">• {enq.date}</span>
                  </div>
                  <h4 className="truncate text-sm font-semibold text-[#161D1A]">
                    {enq.subject}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#78716C]">
                    <span className="font-medium text-[#44403C]">{enq.customerName}</span>
                    <span>•</span>
                    <span className="text-[#8C7350]">{enq.budget}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateTab("enquiries")}
                  className="shrink-0 self-start rounded-full border border-[#E3DDD4] bg-white px-3.5 py-1.5 text-xs font-medium text-[#161D1A] transition-colors hover:border-[#214E34] hover:bg-[#214E34] hover:text-white sm:self-center"
                >
                  Inspect Brief
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Stock Watch (1 col) */}
        <div className="rounded-2xl border border-[#EAE6DE] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-4">
            <div>
              <h3 className="text-[17px] font-bold text-[#161D1A]">
                Inventory Watch
              </h3>
              <p className="text-xs text-[#78716C]">
                Items requiring restock or attention
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("products")}
              className="text-xs font-semibold text-[#214E34] hover:underline"
            >
              All SKUs
            </button>
          </div>

          <div className="mt-4 space-y-3.5">
            {lowStockProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between rounded-xl border border-[#F2ECE4] bg-[#FAF8F5] p-3 transition-colors hover:border-[#C5A880]/60"
              >
                <div className="min-w-0 pr-3">
                  <div className="truncate text-xs font-semibold text-[#161D1A]">
                    {prod.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#78716C]">
                    {prod.sku} • {prod.goldPurities.join(", ")}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#8C7350]">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                      prod.stock === 0
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    <AlertTriangle size={11} />
                    {prod.stock === 0 ? "Out of Stock" : `${prod.stock} left`}
                  </span>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-dashed border-[#C5A880]/50 bg-[#FCFBF8] p-3.5 text-center">
              <p className="text-xs text-[#78716C]">
                Ready to introduce a newly crafted diamond design?
              </p>
              <button
                type="button"
                onClick={onOpenAddProduct}
                className="mt-2 text-xs font-semibold text-[#214E34] hover:underline"
              >
                + Add New Diamond SKU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

