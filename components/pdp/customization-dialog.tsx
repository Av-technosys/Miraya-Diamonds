"use client";

import { useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, FileText, ShoppingBag, Upload, X } from "lucide-react";

const fieldClass = "h-11 w-full min-w-0 rounded-lg border border-[#dfe8df] bg-white px-4 text-[13px] text-[#454545] outline-none placeholder:text-[#454545] focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]";

export function CustomizationDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function chooseFile(selected?: File) {
    if (!selected) return;
    if (!/\.(jpe?g|png|gif|svg)$/i.test(selected.name) || selected.size > 10 * 1024 * 1024) {
      setError("Choose a JPG, JPEG, PNG, GIF or SVG file up to 10 MB.");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    setError("");
    setFile(selected);
  }

  return (
    <Dialog.Root modal onOpenChange={(open) => { if (!open) { setFile(null); setError(""); setDragging(false); } }}>
      <Dialog.Trigger className="flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#454545] px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#333333]">
        <ShoppingBag size={15} className="shrink-0" />Customize your Jewellery
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#18251b]/55" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-[496px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-lg bg-[#F7FFF7] p-5 outline-none">
          <Dialog.Close aria-label="Close customization form" className="absolute right-3 top-3 grid size-7 place-items-center rounded-full text-[#77786d] hover:bg-[#eaf1e7]"><X size={17} strokeWidth={1.5} /></Dialog.Close>
          <div className="mb-5 px-5 text-center">
            <Dialog.Title className="font-serif text-[26px] font-semibold leading-tight text-[#26362a]">Contact us</Dialog.Title>
            <Dialog.Description className="mt-1 text-[11px] leading-5 text-[#85877a]">Leave your message and we&apos;ll get back to you shortly.</Dialog.Description>
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="space-y-2.5">
            <div className="grid gap-2.5 min-[400px]:grid-cols-2">
              <input name="fullName" aria-label="Full name" autoComplete="name" maxLength={120} required placeholder="Full Name" className={fieldClass} />
              <input name="email" type="email" aria-label="Email" autoComplete="email" maxLength={254} required placeholder="Email" className={fieldClass} />
            </div>
            <div className="flex h-11 items-center rounded-lg border border-[#dfe8df] bg-white px-3 focus-within:border-[#214E34] focus-within:ring-1 focus-within:ring-[#214E34]">
              <select name="countryCode" aria-label="Country code" defaultValue="+91" className="h-8 w-[68px] shrink-0 border-r border-[#e4e5dc] bg-white text-[11px] text-[#454545] outline-none">
                <option value="+91">🇮🇳 +91</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+971">🇦🇪 +971</option><option value="+65">🇸🇬 +65</option><option value="+61">🇦🇺 +61</option>
              </select>
              <input name="phone" type="tel" aria-label="Phone number" autoComplete="tel-national" maxLength={20} placeholder="Phone no." className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#454545] outline-none placeholder:text-[#454545]" />
            </div>
            <div className="grid gap-2.5 min-[400px]:grid-cols-2">
              <div className="relative">
                <select name="jewelleryType" aria-label="Jewellery type" defaultValue="" className={`${fieldClass} appearance-none pr-8`}>
                  <option value="" disabled>Jewellery Type</option><option>Solitaire Engagement Ring</option><option>Wedding Bands</option><option>Diamond Earrings</option><option>Necklace / Pendant</option><option>Tennis Bracelet</option><option>Custom Bespoke Piece</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-4 text-[#214E34]" />
              </div>
              <div className="relative">
                <select name="budget" aria-label="Approximate budget" defaultValue="" className={`${fieldClass} appearance-none pr-8`}>
                  <option value="" disabled>Select Your Approx Budget</option><option>Under ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>₹1,00,000 – ₹2,50,000</option><option>₹2,50,000 – ₹5,00,000</option><option>₹5,00,000+</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-4 text-[#214E34]" />
              </div>
            </div>
            <input name="referenceLink" type="url" aria-label="Design reference link" placeholder="Design Reference Link" className={fieldClass} />
            <div className="pt-1.5">
              <label htmlFor="customization-reference" className="mb-2 block text-[13px] text-[#454545]">Upload Design Reference</label>
              <div onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }} className={`relative flex min-h-[92px] flex-col items-center justify-center rounded-lg border border-dashed bg-white px-4 py-3 text-center focus-within:ring-1 focus-within:ring-[#214E34] ${dragging ? "border-[#214E34]" : "border-[#d4dfd2]"}`}>
                <input ref={fileInput} id="customization-reference" type="file" accept=".jpg,.jpeg,.png,.gif,.svg" aria-describedby={error ? "customization-file-error" : file ? undefined : "customization-file-help"} onChange={(event) => chooseFile(event.target.files?.[0])} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                {file ? <div className="pointer-events-none relative flex max-w-full items-center gap-2 text-xs text-[#214E34]"><FileText size={18} className="shrink-0" /><span className="min-w-0 truncate">{file.name}</span><button type="button" aria-label="Remove design reference" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ""; }} className="pointer-events-auto grid size-7 shrink-0 place-items-center"><X size={14} /></button></div> : <><Upload size={24} strokeWidth={1.5} className="text-[#242b23]" /><p className="mt-1 text-[11px] text-[#454b3c]">Choose file or drag here</p><p id="customization-file-help" className="mt-1 text-[10px] text-[#939780]">Supported format: JPG, JPEG, PNG, GIF, SVG. Up to 10 MB.</p></>}
              </div>
              {error && <p id="customization-file-error" role="alert" className="mt-1 text-[11px] text-[#a34e3b]">{error}</p>}
            </div>
            <textarea name="message" aria-label="Message" required maxLength={3000} rows={2} placeholder="Message *" className={`${fieldClass} mt-2 min-h-[60px] resize-y py-3`} />
            <div className="pt-1"><button type="submit" disabled title="Submission will be available soon" className="h-12 w-full cursor-default rounded-full bg-[#214E34] text-[13px] font-medium text-white">Submit</button></div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
