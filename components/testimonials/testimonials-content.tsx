import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TestimonialsContent() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-[#EDE7E3] bg-[#FCF9F8] px-6 py-10 text-center md:px-12">
        <h2 className="font-serif text-[28px] font-medium text-[#454545] md:text-[36px]">
          Your Story Matters to Us
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-sm leading-relaxed text-[#757575]">
          Have a Miraya Diamonds piece you love? We would be happy to hear about
          the design you chose and the moment it celebrates. Contact our team to
          share your experience.
        </p>
        <p className="mx-auto mt-3 max-w-[600px] text-sm leading-relaxed text-[#757575]">
          Customer stories will appear here once they have been reviewed and
          approved for publication with the contributor&apos;s permission.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#214E34] px-6 py-3 text-sm font-medium text-white">
            Share Your Experience <ArrowRight size={16} />
          </Link>
          <Link href="/collection" className="inline-flex items-center rounded-full border border-[#214E34] px-6 py-3 text-sm font-medium text-[#214E34]">
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
