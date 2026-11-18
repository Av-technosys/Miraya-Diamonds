import Link from "next/link";
import { Container } from "@/components/common/container";

export function FinalCTA() {
  return (
    <section className="bg-[#F7FFF7] py-10 sm:py-14">
      <Container>
        <div className="rounded-xl border border-[#214E34]/15 bg-white px-5 py-10 text-center sm:px-10 sm:py-14">
          <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">Your journey begins here</p>
          <h2 className="mt-3 font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">Find Something That Feels Like You</h2>
          <p className="mx-auto mt-4 max-w-lg font-inter text-sm leading-6 text-[#757575]">Explore jewellery designed to celebrate your story and your most cherished moments.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 font-inter text-sm font-medium sm:flex-row sm:gap-4">
            <Link href="/collection" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#214E34] px-6 py-3 text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34]">Explore Jewellery</Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#214E34] px-6 py-3 text-[#214E34] transition-colors hover:bg-[#F7FFF7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34]">Contact Us</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
