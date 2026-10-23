"use client";

import { startTransition, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { ArrowUpRight, ChevronLeft, ChevronRight, Inbox, Loader2, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { getAdminEnquiries } from "@/lib/actions/enquiries";
import { enquiryStatuses } from "@/lib/enquiries";
import type { AdminEnquiry, EnquiryListResult, EnquiryStatus } from "@/lib/enquiries";
import { EnquiryDetails, enquiryDate, statusStyles } from "./enquiry-details";

const controlClass = "h-10 rounded-lg border border-[#e5dfd9] bg-[#ffffff] px-3 text-xs text-[#555d50] outline-none focus:border-[#214e34] focus:ring-1 focus:ring-[#214e34]";

export function EnquiriesTable({ initialResult, onPendingCountChange }: {
  initialResult: EnquiryListResult;
  onPendingCountChange: (count: number) => void;
}) {
  const [result, setResult] = useState(initialResult);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [status, setStatus] = useState<EnquiryStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<AdminEnquiry | null>(null);

  useEffect(() => {
    let cancelled = false;
    startTransition(async () => {
      setLoading(true);
      try {
        const response = await getAdminEnquiries({ search: debouncedSearch, status, page });
        if (cancelled) return;
        setResult(response);
        if (response.success) onPendingCountChange(response.summary.under_review);
      } catch {
        if (!cancelled) setResult({ success: false, error: "Enquiries couldn't be loaded. Please try again." });
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [debouncedSearch, status, page, revision, onPendingCountChange]);

  const summary = result.success ? result.summary : null;
  const total = summary ? Object.values(summary).reduce((sum, value) => sum + value, 0) : null;
  const rows = result.success ? result.enquiries : [];
  const currentPage = result.success ? result.page : 1;
  const pageCount = result.success ? Math.max(1, Math.ceil(result.total / result.pageSize)) : 1;

  return (
    <div className="space-y-6 text-[#353333]">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#e9e4df] pb-7">
        <div>
          <h1 className="font-serif text-4xl font-medium leading-tight text-[#214E34] sm:text-[42px]">Enquiries</h1>
          <p className="mt-2 text-xs leading-6 text-[#8a837b]">Manage product enquiries and customer requests.</p>
        </div>
        <button type="button" disabled={loading} onClick={() => setRevision((value) => value + 1)} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ded8d1] bg-white px-4 text-xs font-medium text-[#214E34] transition-colors hover:bg-[#f4f1ee] disabled:opacity-50"><RefreshCw size={13} className={loading ? "animate-spin" : ""} />Refresh</button>
      </header>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {(Object.keys(enquiryStatuses) as EnquiryStatus[]).map((value) => <button key={value} type="button" aria-pressed={status === value} onClick={() => { setStatus(status === value ? "all" : value); setPage(1); }} className={`min-w-0 rounded-lg border px-5 py-5 text-left transition-colors ${status === value ? "border-[#214E34] bg-[#214E34] text-white" : "border-[#e9e4df] bg-white text-[#214E34] hover:border-[#b7c1b4]"}`}>
          <p className={`text-[11px] ${status === value ? "text-white/75" : "text-[#8a837b]"}`}>{enquiryStatuses[value]}</p>
          <p className="mt-3 font-serif text-[34px] font-medium leading-none">{summary ? summary[value].toLocaleString("en-IN") : "—"}</p>
        </button>)}
      </div>
      <section aria-label="Product enquiries" className="overflow-hidden rounded-lg border border-[#e9e4df] bg-[#ffffff]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e9e4df] px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3"><h2 className="font-serif text-2xl font-medium text-[#214E34]">Product enquiries</h2><span className="rounded-full bg-[#eeeee4] px-2.5 py-1 text-[10px] text-[#687157]">{total ?? "—"} total</span></div>
          <span className="text-[10px] uppercase tracking-wider text-[#a49a86]">Newest first</span>
        </div>
        <div className="flex flex-col gap-3 border-b border-[#e9e4df] bg-[#FAF8F7] p-4 sm:flex-row sm:px-6">
          <div className="relative min-w-0 flex-1"><Search size={15} className="pointer-events-none absolute left-3 top-3 text-[#9b9587]" /><input aria-label="Search enquiries" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search customer, product, SKU or reference…" maxLength={200} className={`${controlClass} w-full pl-9`} /></div>
          <div className="flex items-center gap-2"><SlidersHorizontal size={14} className="shrink-0 text-[#9b9587]" /><select aria-label="Filter enquiries by status" value={status} onChange={(event) => { setStatus(event.target.value as EnquiryStatus | "all"); setPage(1); }} className={`${controlClass} min-w-0 flex-1 sm:w-52`}><option value="all">All statuses</option>{Object.entries(enquiryStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
        </div>
        <div aria-busy={loading} className="relative">
          {loading && <div role="status" className="flex items-center justify-center gap-2 border-b border-[#e9e4df] py-2 text-[11px] text-[#7d826d]"><Loader2 size={12} className="animate-spin" />Loading enquiries…</div>}
          {!result.success ? <div role="alert" className="px-5 py-14 text-center"><p className="text-sm text-[#9a5140]">{result.error}</p><button type="button" onClick={() => setRevision((value) => value + 1)} className="mt-4 text-xs font-semibold underline underline-offset-4">Try again</button></div> : rows.length === 0 ? <div className="px-5 py-16 text-center"><Inbox size={28} strokeWidth={1} className="mx-auto text-[#a49a86]" /><h3 className="mt-4 font-serif text-2xl">{search || status !== "all" ? "No matching enquiries" : "Your inbox is ready"}</h3><p className="mt-2 text-xs leading-6 text-[#9b9283]">{search || status !== "all" ? "Try a different search or clear your status filter." : "New product enquiries will appear here when customers get in touch."}</p>{(search || status !== "all") && <button type="button" onClick={() => { setSearch(""); setStatus("all"); setPage(1); }} className="mt-4 text-xs font-semibold text-[#214e34] underline underline-offset-4">Clear filters</button>}</div> : <>
            <div className="hidden grid-cols-[1.1fr_1.5fr_1fr_135px_24px] gap-5 border-b border-[#eee9e4] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a19580] xl:grid"><span>Customer</span><span>Product & selection</span><span>Status</span><span>Received · IST</span><span /></div>
            <ul className="divide-y divide-[#eee9e4]">
              {rows.map((enquiry) => <li key={enquiry.id}>
                <button type="button" onClick={() => setActive(enquiry)} aria-label={`View enquiry from ${enquiry.name} for ${enquiry.productName}`} className="group grid w-full gap-4 px-4 py-5 text-left transition hover:bg-[#f7f6ee] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#214e34] sm:px-6 xl:grid-cols-[1.1fr_1.5fr_1fr_135px_24px] xl:items-center xl:gap-5">
                  <div className="min-w-0"><div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-semibold text-[#354633]">{enquiry.name}</p><ArrowUpRight size={15} className="shrink-0 text-[#9c927c] xl:hidden" /></div><p className="mt-1 text-xs text-[#8b8273]">{enquiry.mobileNumber}</p><p className="mt-1 truncate text-[10px] text-[#a79b88]">{enquiry.email || "Email not provided"}</p></div>
                  <div className="min-w-0"><p className="truncate font-serif text-lg leading-tight text-[#3f4c39]">{enquiry.productName}</p><p className="mt-1 font-mono text-[9px] text-[#a2937b]">SKU {enquiry.productSku}</p><div className="mt-2 flex flex-wrap gap-1">{[enquiry.metalColour, enquiry.diamondGrade, enquiry.metalPurity, enquiry.size === "Bespoke Size" ? enquiry.size : `Size ${enquiry.size}`, ...(enquiry.engravingRequested ? ["Engraving"] : [])].map((value, index) => <span key={index} className="max-w-full break-words rounded border border-[#e4e5d8] bg-[#f3f4eb] px-1.5 py-0.5 text-[9px] text-[#697557]">{value}</span>)}</div></div>
                  <div><span className={`inline-flex rounded-full border px-2.5 py-1.5 text-[10px] font-medium ${statusStyles[enquiry.status]}`}>{enquiryStatuses[enquiry.status]}</span></div>
                  <div className="flex flex-wrap justify-between gap-2 text-[10px] text-[#948976] xl:block"><time dateTime={enquiry.createdAt}>{enquiryDate(enquiry.createdAt)}</time><p className="font-mono text-[9px] text-[#b4a892] xl:mt-2">ENQ-{enquiry.id.slice(0, 8).toUpperCase()}</p></div>
                  <ArrowUpRight size={16} className="hidden text-[#a49a86] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 xl:block" />
                </button>
              </li>)}
            </ul>
          </>}
        </div>
        {result.success && result.total > 0 && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e9e4df] bg-[#FAF8F7] px-4 py-4 sm:px-6"><p className="text-[10px] text-[#9a907c]">Showing {(currentPage - 1) * result.pageSize + 1}–{Math.min(currentPage * result.pageSize, result.total)} of {result.total} enquiries</p><div className="flex items-center gap-3"><button type="button" aria-label="Previous page" disabled={loading || currentPage <= 1} onClick={() => setPage(currentPage - 1)} className="grid size-8 place-items-center rounded border border-[#e5dfd9] bg-white disabled:opacity-30"><ChevronLeft size={14} /></button><span className="text-[10px] text-[#8b816d]">{currentPage} / {pageCount}</span><button type="button" aria-label="Next page" disabled={loading || currentPage >= pageCount} onClick={() => setPage(currentPage + 1)} className="grid size-8 place-items-center rounded border border-[#e5dfd9] bg-white disabled:opacity-30"><ChevronRight size={14} /></button></div></div>}
      </section>
      {active && <EnquiryDetails key={active.id} enquiry={active} onClose={() => setActive(null)} onSaved={(enquiry) => { setActive((current) => current?.id === enquiry.id ? enquiry : current); setRevision((value) => value + 1); }} />}
    </div>
  );
}
