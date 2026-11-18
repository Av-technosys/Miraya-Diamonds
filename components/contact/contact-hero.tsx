import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";

export function ContactHero() {
  return (
    <section className="bg-white py-6 pb-10 sm:pb-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#757575] sm:mb-10">
          <Link href="/" className="transition-colors hover:text-[#214E34]">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Contact Us</span>
        </nav>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">Client Concierge &amp; Assistance</p>
            <h1 className="font-serif text-[40px] font-semibold leading-[1.05] sm:text-[52px]">We Are Here<br /><span className="italic text-[#214E34]">To Assist You</span></h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#757575]">Explore a collection, ask about a diamond or discuss a custom design. The Miraya Diamonds team is here to help you find a piece that feels right for you.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-[#214E34]">
              <span className="flex items-center gap-2"><BadgeCheck size={18} strokeWidth={1.5} aria-hidden="true" />Personal Jewellery Guidance</span>
              <span className="flex items-center gap-2"><Clock size={18} strokeWidth={1.5} aria-hidden="true" />Enquiries Welcome</span>
            </div>
          </div>
          <div className="relative aspect-[538/349] overflow-hidden rounded-xl">
            <Image src="/contact/heroSection.jpg" alt="Miraya Diamonds jewellery" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" priority />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-4 py-3 sm:left-auto sm:min-w-64">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-[#214E34]">Miraya Diamonds</p><p className="mt-1 text-xs leading-5 text-[#757575]">Jaipur, India</p></div>
              <Image src="/contact/Lock_Icon.png" alt="" width={20} height={26} className="shrink-0 object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
