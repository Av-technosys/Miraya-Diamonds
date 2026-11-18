import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";

export function TestimonialsContent() {
  return (
    <section className="bg-[#F7FFF7] py-10 sm:py-14">
      <Container>
        <div className="rounded-2xl border border-[#214E34]/10 bg-white px-5 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="font-serif text-[31px] font-semibold leading-[1.1] sm:text-[38px]">Your Story Matters to Us</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#757575]">Have a Miraya Diamonds piece you love? We would be happy to hear about the design you chose and the moment it celebrates. Contact our team to share your experience.</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#757575]">Customer stories will appear here once they have been reviewed and approved for publication with the contributor&apos;s permission.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 py-3.5 text-xs font-semibold text-white shadow-[0_6px_22px_rgba(33,78,52,0.22)] transition-all duration-300 hover:bg-[#173d28] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:px-8 sm:py-4 sm:text-sm">Share Your Experience <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/collection" className="inline-flex items-center justify-center rounded-full border border-[#214E34] px-7 py-3.5 text-xs font-semibold text-[#214E34] transition-colors hover:bg-[#F7FFF7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:px-8 sm:py-4 sm:text-sm">Explore the Collection</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
