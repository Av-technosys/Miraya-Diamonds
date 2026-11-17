"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Plus, RefreshCw } from "lucide-react";
import type { AdminTab } from "./admin-sidebar";
import type { AdminProduct } from "./mock-data";
import type { EnquiryListResult } from "@/lib/enquiries";
import { enquiryStatuses } from "@/lib/enquiries";
import { enquiryDate, statusStyles } from "./enquiry-details";

interface DashboardOverviewProps {
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddProduct: () => void;
  usersCount: number;
  products: AdminProduct[];
  categoriesCount: number;
  enquiriesResult: EnquiryListResult;
}

export function DashboardOverview({ onNavigateTab, onOpenAddProduct, usersCount, products, categoriesCount, enquiriesResult }: DashboardOverviewProps) {
  const router = useRouter();
  const [refreshing, startRefresh] = useTransition();
  const recentEnquiries = enquiriesResult.success ? enquiriesResult.enquiries.slice(0, 5) : [];
  const lowStockProducts = products.filter((product) => product.status === "Low Stock" || product.status === "Out of Stock");
  const metrics = [
    { label: "Users", value: usersCount, tab: "users" },
    { label: "Products", value: products.length, tab: "products" },
    { label: "Category", value: categoriesCount, tab: "categories" },
    { label: "Under review", value: enquiriesResult.success ? enquiriesResult.summary.under_review : null, tab: "enquiries" },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#e9e4df] pb-7">
        <div><h1 className="font-serif text-4xl font-medium leading-tight text-[#214E34] sm:text-[42px]">Dashboard</h1><p className="mt-2 text-xs leading-6 text-[#8a837b]">An overview of your store.</p></div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" disabled={refreshing} onClick={() => startRefresh(() => router.refresh())} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ded8d1] bg-white px-4 text-xs text-[#214E34] disabled:opacity-50"><RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />Refresh</button>
          <button type="button" onClick={() => onNavigateTab("enquiries")} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ded8d1] bg-white px-5 text-xs font-medium text-[#214E34] hover:bg-[#f4f1ee]">View enquiries <ArrowUpRight size={14} /></button>
          <button type="button" onClick={onOpenAddProduct} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#214E34] px-5 text-xs font-medium text-white hover:bg-[#193e29]"><Plus size={15} />Add product</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {metrics.map(({ label, value, tab }) => <button key={label} type="button" onClick={() => onNavigateTab(tab)} className="rounded-lg border border-[#e9e4df] bg-white px-5 py-5 text-left transition-colors hover:border-[#bbc8b8]"><p className="text-[11px] text-[#8a837b]">{label}</p><p className="mt-3 font-serif text-4xl font-medium text-[#214E34]">{value === null ? "—" : value.toLocaleString("en-IN")}</p></button>)}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="min-w-0 rounded-lg border border-[#e9e4df] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee9e4] px-5 py-5 sm:px-6"><h2 className="font-serif text-2xl font-medium text-[#214E34]">Recent enquiries</h2><button type="button" onClick={() => onNavigateTab("enquiries")} className="inline-flex items-center gap-1.5 text-[11px] text-[#77736d] hover:text-[#214E34]">View all ({enquiriesResult.success ? enquiriesResult.total : "—"}) <ArrowUpRight size={13} /></button></div>
          <div className="divide-y divide-[#eee9e4] px-5 sm:px-6">
            {!enquiriesResult.success && <p role="alert" className="py-8 text-sm text-[#9f5c4d]">{enquiriesResult.error}</p>}
            {enquiriesResult.success && recentEnquiries.length === 0 && <p className="py-8 text-sm text-[#8a837b]">No product enquiries yet.</p>}
            {recentEnquiries.map((enquiry) => <div key={enquiry.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
              <div className="min-w-0 flex-1 basis-48">
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#9a948a]"><span className="font-mono">{`ENQ-${enquiry.id.slice(0, 8).toUpperCase()}`}</span><span>·</span><span>{enquiryDate(enquiry.createdAt)}</span><span className={`rounded border px-2 py-0.5 ${statusStyles[enquiry.status]}`}>{enquiryStatuses[enquiry.status]}</span></div>
                <p className="mt-2 truncate text-sm font-medium text-[#45433e]">{enquiry.productName}</p>
                <p className="mt-1 text-xs text-[#8a837b]">{enquiry.name} · {enquiry.metalColour} · {enquiry.metalPurity}</p>
              </div>
              <button type="button" onClick={() => onNavigateTab("enquiries")} className="inline-flex items-center gap-1.5 text-xs text-[#214E34]">View details <ArrowUpRight size={14} /></button>
            </div>)}
          </div>
        </section>

        <section className="min-w-0 rounded-lg border border-[#e9e4df] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee9e4] px-5 py-5 sm:px-6"><h2 className="font-serif text-2xl font-medium text-[#214E34]">Stock overview</h2><button type="button" onClick={() => onNavigateTab("products")} className="inline-flex items-center gap-1.5 text-[11px] text-[#77736d] hover:text-[#214E34]">All products <ArrowUpRight size={13} /></button></div>
          <div className="divide-y divide-[#eee9e4] px-5 sm:px-6">
            {lowStockProducts.length === 0 && <p className="py-8 text-sm text-[#8a837b]">{products.length ? "No products currently need restocking." : "Add products to start tracking stock."}</p>}
            {lowStockProducts.map((product) => <div key={product.id} className="flex items-start justify-between gap-4 py-5">
              <div className="min-w-0"><p className="truncate text-sm font-medium text-[#45433e]">{product.name}</p><p className="mt-1 text-[10px] text-[#9a948a]">{product.sku} · {product.goldPurities.join(", ")}</p><p className="mt-2 text-xs text-[#214E34]">₹{product.price.toLocaleString("en-IN")}</p></div>
              <span className={`shrink-0 rounded border px-2 py-1 text-[10px] ${product.stock === 0 ? "border-[#e8d9d4] bg-[#faf2ef] text-[#a16e5e]" : "border-[#e8dfce] bg-[#faf7ef] text-[#907c52]"}`}>{product.stock === 0 ? "Out of stock" : `${product.stock} left`}</span>
            </div>)}
          </div>
        </section>
      </div>
    </div>
  );
}
