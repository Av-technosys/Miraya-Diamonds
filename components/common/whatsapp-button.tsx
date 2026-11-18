import { IconBrandWhatsappFilled } from "@tabler/icons-react";

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "919869698984";
  return (
    <a href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Miraya Diamonds on WhatsApp" title="Chat on WhatsApp" className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid size-13 place-items-center rounded-full border border-white/30 bg-[#214E34] text-white shadow-[0_4px_18px_rgba(33,78,52,0.22)] transition-colors hover:bg-[#183b28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34] sm:bottom-6 sm:right-6 sm:size-14">
      <IconBrandWhatsappFilled size={29} aria-hidden="true" />
    </a>
  );
}
