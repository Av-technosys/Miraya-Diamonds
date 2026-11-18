import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";

export function HeirloomBanner() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <Container>
        <div className="grid items-center gap-8 rounded-2xl bg-[#F7FFF7] p-5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">Heirloom Commissions</p>
            <h2 className="mt-3 font-serif text-[31px] font-semibold leading-[1.1] sm:text-[38px]">Made Just for Your Story</h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#757575]">Create a piece that feels uniquely yours. From personal details to meaningful occasions, we craft jewellery designed to celebrate the moments that matter most.</p>
            <Link href="/customize" className="group mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 py-3.5 text-xs font-semibold text-white shadow-[0_6px_22px_rgba(33,78,52,0.22)] transition-all duration-300 hover:bg-[#173d28] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:px-8 sm:py-4 sm:text-sm">Create Your Piece <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <div className="relative order-1 aspect-square overflow-hidden rounded-xl lg:order-2">
            <Image src="/contact/heirloom.jpg" alt="Heirloom Commissions" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
