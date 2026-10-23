"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { submitProductEnquiry } from "@/lib/actions/enquiries";

import type { ProductSelection } from "@/lib/enquiries";

type Props = {
  options: ProductSelection;
  sku: string;
  selection: string[];
};

const fieldClass = "mt-1.5 w-full rounded-md border border-[#d8e2d9] bg-white px-3 py-2.5 text-xs font-normal normal-case tracking-normal text-[#304c39] outline-none placeholder:text-[#98a69b] focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]";
const labelClass = "block min-w-0 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#304c39]";

export function ProductEnquiryForm({ options, sku, selection }: Props) {
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setPending(true);
    setStatus(null);

    try {
      const result = await submitProductEnquiry({
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
        ...options,
        sku,
      });
      setStatus({ success: result.success, text: result.message || result.error || "Please try again." });
      if (result.success) form.reset();
    } catch {
      setStatus({ success: false, text: "We couldn't send your enquiry. Please try again." });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <section aria-labelledby="product-enquiry-title" className="mt-2.5 rounded-xl bg-[#F7FFF7] px-4 py-6 sm:px-6">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#d5e5d6] text-[#214E34]"><Sparkles size={13} /></span>
        <div>
          <h2 id="product-enquiry-title" className="font-[family-name:var(--font-cormorant-garamond)] text-[23px] font-semibold leading-tight text-[#253c2e]">Enquire About This Product</h2>
          <p className="mt-1 text-xs leading-[1.5] text-[#607565]">Our experts will get back to you within 24 hours with details, pricing and customisation options.</p>
        </div>
      </div>

      <div aria-label="Selected product options" aria-live="polite" className="mt-4 flex flex-wrap gap-1.5 rounded-lg border border-[#e1ece1] p-2">
        {selection.map((option, index) => <span key={index} className="max-w-full break-words rounded bg-[#e7fbe5] px-2 py-1 text-[9px] font-medium uppercase text-[#214E34]">{option}</span>)}
      </div>

      <form onSubmit={handleSubmit} className="mt-3">
        <fieldset disabled={pending} className="min-w-0 space-y-3.5 disabled:opacity-70">
          <legend className="sr-only">Your contact details and requirements</legend>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <label className={labelClass}>Your name <span className="text-[#ba493a]">*</span>
              <input name="name" autoComplete="name" required maxLength={120} placeholder="Enter your name" className={fieldClass} />
            </label>
            <label className={labelClass}>Mobile number <span className="text-[#ba493a]">*</span>
              <input name="phone" type="tel" autoComplete="tel" required maxLength={24} pattern={String.raw`[+\d\s\(\)\-]{10,24}`} title="Enter a mobile number with 10 to 15 digits, including country code if needed." placeholder="+91 98765 43210" className={fieldClass} />
            </label>
          </div>
          <label className={labelClass}>Email (optional)
            <input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" className={fieldClass} />
          </label>
          <label className={labelClass}>Message / requirements (optional)
            <textarea name="message" rows={3} maxLength={3000} placeholder="Tell us your requirements (ring size, customization, budget, etc.)" className={`${fieldClass} min-h-[68px] resize-y`} />
          </label>
          <button type="submit" className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-[#214E34] px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.03em] text-white shadow-[0_3px_10px_#214e3438] transition hover:bg-[#183b28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] disabled:cursor-wait">
            {pending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}{pending ? "Sending enquiry…" : "Send enquiry"}
          </button>
        </fieldset>
        {status && <p role={status.success ? "status" : "alert"} className={`mt-3 text-xs leading-relaxed ${status.success ? "text-[#214E34]" : "text-[#a13b30]"}`}>{status.text}</p>}
      </form>
    </section>
  );
}
