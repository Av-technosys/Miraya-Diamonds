import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";

export function TestimonialsHero() {
  return (
    <section className="bg-white py-6 pb-10 sm:pb-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#757575] sm:mb-10">
          <Link href="/" className="transition-colors hover:text-[#214E34]">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Testimonials</span>
        </nav>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">Customer Stories</p>
            <h1 className="font-serif text-[40px] font-semibold leading-[1.05] sm:text-[52px]">Loved, Worn &amp;<br /><span className="italic text-[#214E34]">Cherished</span></h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#757575]">Every piece can hold a personal meaning. Share the moments and memories you celebrate with Miraya Diamonds.</p>
            <p className="mt-4 text-sm leading-6 text-[#214E34]">A space for experiences shared by our customers.</p>
          </div>
          <div className="relative aspect-[588/346] overflow-hidden rounded-xl bg-[#F7FFF7]">
            <Image src="/testimonials/hero.jpg" alt="Solitaire diamond rings and fine rose gold jewellery" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" priority />
            <div className="absolute bottom-4 right-4 max-w-40 rounded-lg border border-[#214E34]/10 bg-white/95 p-4 sm:bottom-6 sm:right-6">
              <p className="text-right text-[10px] font-medium uppercase leading-5 tracking-[0.12em] text-[#353333] sm:text-xs">More than jewellery a part of your story</p>
              <div className="ml-auto mt-3 h-px w-8 bg-[#214E34]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
