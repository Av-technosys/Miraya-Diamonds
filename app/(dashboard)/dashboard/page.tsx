import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function EnquiriesPage() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="font-serif text-[29px] font-semibold text-[#292929] sm:text-[32px]">My Enquiries</h1>
      <div className="mt-6 rounded-xl border border-[#eae8e5] bg-[#FCF9F8] p-6">
        <MessageCircle size={28} className="text-[#214E34]" />
        <h2 className="mt-4 font-serif text-2xl text-[#454545]">Let&apos;s Talk Jewellery</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#757575]">For an update on an existing enquiry, contact our team with your product name or enquiry reference. We can also help you explore designs and discuss a new piece.</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#214E34] px-5 py-3 text-sm font-medium text-white">Contact Miraya Diamonds <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
