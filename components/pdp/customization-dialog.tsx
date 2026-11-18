"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, FileText, Loader2, ShoppingBag, Upload, X } from "lucide-react";
import { designBudgets, designJewelleryTypes, designReferenceTypes, maxDesignFileSize, maxDesignMessageLength } from "@/lib/design-enquiry";
import type { ProductSelection } from "@/lib/enquiries";

const fieldClass = "h-11 w-full min-w-0 rounded-lg border border-[#dfe8df] bg-white px-4 text-[13px] text-[#454545] outline-none placeholder:text-[#454545] focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]";
const curtainBelow = "ellipse(80% 140% at 50% 245%)";
const curtainFilled = "ellipse(80% 140% at 50% 100%)";
const curtainTop = "ellipse(80% 140% at 50% 0%)";
const curtainAbove = "ellipse(80% 140% at 50% -145%)";

type Props = {
  productSku: string;
  options?: ProductSelection;
  triggerLabel?: string;
  triggerClassName?: string;
  showTriggerIcon?: boolean;
  animateTrigger?: boolean;
  animateOnCardHover?: boolean;
  curtainClassName?: string;
  trailingIcon?: ReactNode;
};

export function CustomizationDialog({ productSku, options, triggerLabel = "Discuss Your Design", triggerClassName, showTriggerIcon = true, animateTrigger = false, animateOnCardHover = false, curtainClassName = "bg-white text-[#214E34]", trailingIcon }: Props) {
  const referenceId = useId();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);
  const submitting = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const curtain = useRef<HTMLSpanElement>(null);
  const curtainAnimation = useRef<Animation | null>(null);
  const curtainCovered = useRef(false);
  const triggerInteraction = useRef({ hovered: false, focused: false });

  useEffect(() => () => curtainAnimation.current?.cancel(), []);

  const moveCurtain = useCallback((enter: boolean) => {
    const layer = curtain.current;
    if (!animateTrigger || !layer || (enter && curtainCovered.current)) return;

    const from = !enter && curtainCovered.current ? curtainTop : getComputedStyle(layer).clipPath;
    layer.style.clipPath = from;
    curtainAnimation.current?.cancel();
    curtainAnimation.current = null;
    curtainCovered.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      layer.style.clipPath = enter ? curtainFilled : curtainBelow;
      curtainCovered.current = enter;
      return;
    }

    const animation = layer.animate([{ clipPath: from }, { clipPath: enter ? curtainFilled : curtainAbove }], {
      duration: 500,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    });
    curtainAnimation.current = animation;
    animation.onfinish = () => {
      if (curtainAnimation.current !== animation) return;
      layer.style.clipPath = enter ? curtainFilled : curtainBelow;
      curtainCovered.current = enter;
      animation.cancel();
      curtainAnimation.current = null;
    };
  }, [animateTrigger]);

  useEffect(() => {
    if (!animateOnCardHover || !animateTrigger) return;
    const card = trigger.current?.closest<HTMLElement>("[data-product-card]");
    if (!card) return;
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      triggerInteraction.current.hovered = true;
      moveCurtain(true);
    };
    const leave = () => {
      triggerInteraction.current.hovered = false;
      if (!triggerInteraction.current.focused) moveCurtain(false);
    };
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  }, [animateOnCardHover, animateTrigger, moveCurtain]);

  function chooseFile(selected?: File) {
    if (!selected || pending) return;
    setFile(selected);
    if (!Object.hasOwn(designReferenceTypes, selected.name.split(".").pop()?.toLowerCase() || "") || !selected.size || selected.size > maxDesignFileSize) {
      setError("Choose a JPG, JPEG, PNG, GIF or SVG file up to 10 MB.");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || error) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("sku", productSku);
    data.set("selection", JSON.stringify(options || { metalColour: "", diamondGrade: "", metalPurity: "", size: "", engravingRequested: false, engravingText: "" }));
    if (file) data.set("referenceFile", file);
    else data.delete("referenceFile");
    submitting.current = true;
    setPending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/design-enquiries", { method: "POST", body: data });
      const result = await response.json();
      const success = response.ok && result.success === true;
      setStatus({ success, text: success ? result.message : result.error || "We couldn't send your design enquiry. Please try again." });
      if (success) {
        form.reset();
        setFile(null);
        setError("");
      }
    } catch {
      setStatus({ success: false, text: "We couldn't send your design enquiry. Please try again." });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <Dialog.Root modal open={open} onOpenChange={(next) => { if (pending) return; setOpen(next); if (!next) { setFile(null); setError(""); setDragging(false); setStatus(null); } }}>
      <Dialog.Trigger
        ref={trigger}
        className={triggerClassName || "flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#454545] px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#333333]"}
        onPointerEnter={(event) => { if (animateOnCardHover || event.pointerType === "touch") return; triggerInteraction.current.hovered = true; moveCurtain(true); }}
        onPointerLeave={() => { if (animateOnCardHover || !triggerInteraction.current.hovered) return; triggerInteraction.current.hovered = false; if (!triggerInteraction.current.focused) moveCurtain(false); }}
        onFocus={(event) => { if (!event.currentTarget.matches(":focus-visible")) return; triggerInteraction.current.focused = true; moveCurtain(true); }}
        onBlur={() => { if (!triggerInteraction.current.focused) return; triggerInteraction.current.focused = false; if (!triggerInteraction.current.hovered) moveCurtain(false); }}
      >
        {animateTrigger && <span ref={curtain} aria-hidden="true" style={{ clipPath: curtainBelow }} className={`pointer-events-none absolute -inset-px z-20 flex items-center justify-center gap-1.5 will-change-[clip-path] ${curtainClassName}`}>
          {showTriggerIcon && <ShoppingBag size={15} className="shrink-0" />}<span>{triggerLabel}</span>{trailingIcon}
        </span>}
        {showTriggerIcon && <ShoppingBag size={15} className="shrink-0" />}<span className="relative z-10">{triggerLabel}</span>{trailingIcon}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#18251b]/55" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-[496px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-lg bg-[#F7FFF7] p-5 outline-none">
          <Dialog.Close disabled={pending} aria-label="Close customisation form" className="absolute right-3 top-3 grid size-7 place-items-center rounded-full text-[#77786d] hover:bg-[#eaf1e7] disabled:opacity-50"><X size={17} strokeWidth={1.5} /></Dialog.Close>
          <div className="mb-5 px-5 text-center">
            <Dialog.Title className="font-serif text-[26px] font-semibold leading-tight text-[#26362a]">Discuss Your Design</Dialog.Title>
            <Dialog.Description className="mt-1 text-[11px] leading-5 text-[#85877a]">Tell us about your ideal piece and share a reference to help us understand your vision.</Dialog.Description>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset disabled={pending} className="min-w-0 space-y-2.5 disabled:opacity-70">
              <legend className="sr-only">Your design enquiry</legend>
              <div className="grid gap-2.5 min-[400px]:grid-cols-2">
                <input name="fullName" aria-label="Full name" autoComplete="name" maxLength={120} required placeholder="Full name *" className={fieldClass} />
                <input name="email" type="email" aria-label="Email" autoComplete="email" maxLength={254} required placeholder="Email address *" className={fieldClass} />
              </div>
              <div className="flex h-11 items-center rounded-lg border border-[#dfe8df] bg-white px-3 focus-within:border-[#214E34] focus-within:ring-1 focus-within:ring-[#214E34]">
                <select name="countryCode" aria-label="Country code" defaultValue="+91" className="h-8 w-[68px] shrink-0 border-r border-[#e4e5dc] bg-white text-[11px] text-[#454545] outline-none">
                  <option value="+91">🇮🇳 +91</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+971">🇦🇪 +971</option><option value="+65">🇸🇬 +65</option><option value="+61">🇦🇺 +61</option>
                </select>
                <input name="phone" type="tel" aria-label="Phone number" autoComplete="tel-national" required maxLength={20} pattern={String.raw`[\d\s\(\)\-]{6,20}`} placeholder="Phone number *" className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#454545] outline-none placeholder:text-[#454545]" />
              </div>
              <div className="grid gap-2.5 min-[400px]:grid-cols-2">
                <div className="relative">
                  <select name="jewelleryType" aria-label="Jewellery type" defaultValue="" className={`${fieldClass} appearance-none pr-8`}>
                    <option value="" disabled>Jewellery type</option>{designJewelleryTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-4 text-[#214E34]" />
                </div>
                <div className="relative">
                  <select name="budget" aria-label="Approximate budget" defaultValue="" className={`${fieldClass} appearance-none pr-8`}>
                    <option value="" disabled>Approximate budget</option>{designBudgets.map((budget) => <option key={budget}>{budget}</option>)}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-4 text-[#214E34]" />
                </div>
              </div>
              <input name="referenceLink" type="url" aria-label="Design reference link" maxLength={500} placeholder="Design reference link (optional)" className={fieldClass} />
              <div className="pt-1.5">
                <label htmlFor={referenceId} className="mb-2 block text-[13px] text-[#454545]">Design reference image (optional)</label>
                <div onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }} className={`relative flex min-h-[92px] flex-col items-center justify-center rounded-lg border border-dashed bg-white px-4 py-3 text-center focus-within:ring-1 focus-within:ring-[#214E34] ${dragging ? "border-[#214E34]" : "border-[#d4dfd2]"}`}>
                  <input ref={fileInput} id={referenceId} name="referenceFile" type="file" accept=".jpg,.jpeg,.png,.gif,.svg" aria-describedby={error ? `${referenceId}-error` : file ? undefined : `${referenceId}-help`} onChange={(event) => chooseFile(event.target.files?.[0])} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                  {file ? <div className="pointer-events-none relative flex max-w-full items-center gap-2 text-xs text-[#214E34]"><FileText size={18} className="shrink-0" /><span className="min-w-0 truncate">{file.name}</span><button type="button" aria-label="Remove design reference" onClick={() => { setFile(null); setError(""); if (fileInput.current) fileInput.current.value = ""; }} className="pointer-events-auto grid size-7 shrink-0 place-items-center"><X size={14} /></button></div> : <><Upload size={24} strokeWidth={1.5} className="text-[#242b23]" /><p className="mt-1 text-[11px] text-[#454b3c]">Choose a file or drag it here</p><p id={`${referenceId}-help`} className="mt-1 text-[10px] text-[#939780]">Supported formats: JPG, JPEG, PNG, GIF, SVG. Up to 10 MB.</p></>}
                </div>
                {error && <p id={`${referenceId}-error`} role="alert" className="mt-1 text-[11px] text-[#a34e3b]">{error}</p>}
              </div>
              <textarea name="message" aria-label="Design requirements" required maxLength={maxDesignMessageLength} rows={2} placeholder="Describe your design, preferred metal, stones or special details *" className={`${fieldClass} mt-2 min-h-[60px] resize-y py-3`} />
              <div className="pt-1"><button type="submit" disabled={pending || Boolean(error)} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#214E34] text-[13px] font-medium text-white transition-colors hover:bg-[#173d28] disabled:cursor-wait disabled:opacity-60">{pending && <Loader2 size={16} className="animate-spin" />}{pending ? "Sending enquiry…" : "Send Design Enquiry"}</button></div>
            </fieldset>
            {status && <p role={status.success ? "status" : "alert"} className={`mt-3 text-xs leading-5 ${status.success ? "text-[#214E34]" : "text-[#a34e3b]"}`}>{status.text}</p>}
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
