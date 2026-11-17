"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, Check, Loader2, Mail, Phone, X } from "lucide-react";
import { updateEnquiryStatus } from "@/lib/actions/enquiries";
import { enquiryStatuses } from "@/lib/enquiries";
import type { AdminEnquiry, EnquiryStatus } from "@/lib/enquiries";

export const statusStyles: Record<EnquiryStatus, string> = {
  under_review: "border-[#e8d9bd] bg-[#fbf6e9] text-[#85652e]",
  response_received: "border-[#d4e2d6] bg-[#eef5ee] text-[#31593c]",
  consultation_scheduled: "border-[#ddd9e7] bg-[#f3f0f7] text-[#6b5a80]",
  closed: "border-[#e1dfda] bg-[#f4f3ef] text-[#77736b]",
};

export function enquiryDate(value: string, time = false) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata",
    ...(time ? { hour: "2-digit", minute: "2-digit" } as const : {}),
  }).format(new Date(value));
}

export function EnquiryDetails({ enquiry, onClose, onSaved }: {
  enquiry: AdminEnquiry;
  onClose: () => void;
  onSaved: (enquiry: AdminEnquiry) => void;
}) {
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ error: boolean; message: string } | null>(null);

  async function saveStatus() {
    if (pending || status === enquiry.status) return;
    setPending(true);
    setFeedback(null);
    try {
      const result = await updateEnquiryStatus(enquiry.id, status);
      if (result.success) {
        onSaved(result.enquiry);
        setFeedback({ error: false, message: "Enquiry status saved." });
      } else setFeedback({ error: true, message: result.error });
    } catch {
      setFeedback({ error: true, message: "The status couldn't be saved. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#18221c]/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-[#e8e3d9] bg-[#ffffff] outline-none transition-colors duration-200 data-ending-style:translate-x-full data-starting-style:translate-x-full motion-reduce:transition-none">
          <div className="flex items-start justify-between gap-4 border-b border-[#e9e4df] px-5 py-6 sm:px-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8c7754]">Enquiry</p>
              <Dialog.Title className="mt-2 font-serif text-3xl font-medium text-[#214E34]">Enquiry details</Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-[#817b70]">Received {enquiryDate(enquiry.createdAt, true)} IST</Dialog.Description>
            </div>
            <Dialog.Close aria-label="Close enquiry details" className="grid size-9 shrink-0 place-items-center rounded-full border border-[#e9e4df] hover:bg-[#f4f1e9]"><X size={17} /></Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`rounded-full border px-3 py-1.5 text-[10px] font-medium ${statusStyles[enquiry.status]}`}>{enquiryStatuses[enquiry.status]}</span>
              <span className="font-mono text-[10px] text-[#8b857a]">ENQ-{enquiry.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8c7754]">Customer</h3>
              <p className="mt-2 break-words text-lg font-semibold text-[#28372d]">{enquiry.name}</p>
              <div className="mt-3 flex flex-col items-start gap-2.5 text-sm text-[#66675e]">
                <a href={`tel:${enquiry.mobileNumber.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 hover:text-[#214e34]"><Phone size={14} />{enquiry.mobileNumber}</a>
                {enquiry.email ? <a href={`mailto:${enquiry.email}`} className="inline-flex max-w-full items-center gap-2 break-all hover:text-[#214e34]"><Mail size={14} className="shrink-0" />{enquiry.email}</a> : <p className="text-xs text-[#9a9388]">Email not provided</p>}
              </div>
            </section>
            <section className="rounded-lg border border-[#e9e4df] bg-[#FAF8F7] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8c7754]">Product & selection</p>
              <h3 className="mt-2 break-words font-serif text-2xl leading-tight text-[#214E34]">{enquiry.productName}</h3>
              <p className="mt-2 break-all font-mono text-[11px] text-[#82765f]">SKU {enquiry.productSku}</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
                {[["Metal", enquiry.metalColour], ["Diamond grade", enquiry.diamondGrade], ["Purity", enquiry.metalPurity], ["Size", enquiry.size]].map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-[10px] uppercase tracking-wider text-[#928779]">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-[#3f4b40]">{value}</dd></div>)}
              </dl>
              <div className="mt-5 border-t border-[#e9e4df] pt-4">
                <p className="text-[10px] uppercase tracking-wider text-[#928779]">Atelier engraving</p>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-[#3f4b40]">{enquiry.engravingRequested ? enquiry.engravingText || "Requested · text to be confirmed" : "Not requested"}</p>
              </div>
              {enquiry.productId && <a href={`/collection/${encodeURIComponent(enquiry.productSku)}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#214e34]">View product <ArrowUpRight size={14} /></a>}
            </section>
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8c7754]">Customer requirements</h3>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#5b6157]">{enquiry.message || "No additional requirements provided."}</p>
            </section>
            <section className="border-t border-[#e9e4df] pt-6">
              <label htmlFor="enquiry-status" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8c7754]">Enquiry status</label>
              <select id="enquiry-status" value={status} disabled={pending} onChange={(event) => { setStatus(event.target.value as EnquiryStatus); setFeedback(null); }} className="mt-3 h-11 w-full rounded-lg border border-[#ded9cd] bg-white px-3 text-sm text-[#354a39] outline-none focus:border-[#214e34] focus:ring-1 focus:ring-[#214e34]">
                {Object.entries(enquiryStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <p className="mt-2 text-[11px] text-[#91897d]">Last updated {enquiryDate(enquiry.updatedAt, true)} IST</p>
              {feedback && <p role={feedback.error ? "alert" : "status"} className={`mt-3 text-xs ${feedback.error ? "text-[#a44636]" : "text-[#214e34]"}`}>{feedback.message}</p>}
            </section>
            <p className="break-all border-t border-[#e9e4df] pt-4 font-mono text-[10px] leading-5 text-[#9a9388]">Reference: {enquiry.id}</p>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[#e9e4df] bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
            <Dialog.Close className="rounded-lg px-3 py-2 text-xs font-medium text-[#7e776b] hover:bg-[#FAF8F7]">Close</Dialog.Close>
            <button type="button" disabled={pending || status === enquiry.status} onClick={saveStatus} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#214e34] px-5 text-xs font-semibold text-white hover:bg-[#193d28] disabled:cursor-not-allowed disabled:opacity-45">{pending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}{pending ? "Saving…" : "Save status"}</button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
