import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/common/container";
import styles from "./legal-page.module.css";

type PolicySection = {
  id: number;
  title: string;
  content: string;
  isContact?: boolean;
};

type LegalPageProps = {
  title: string;
  subtitle: string;
  introduction: string;
  lastUpdated?: string;
  sections: PolicySection[];
  contactMessage?: string;
  supportMessage: string;
  badgeTitle: string;
  badgeDescription: string;
};

const email = "Sales.mirayadiamonds@gmail.com";
const phone = "+91 9869698984";

function PolicyText({ children }: { children: string }) {
  return children.split(/(Sales\.mirayadiamonds@gmail\.com|\+91 9869698984)/).map((part, index) => {
    if (part === email || part === phone) {
      return <a key={index} href={part === email ? `mailto:${email}` : "tel:+919869698984"} className="font-medium text-[#214E34] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34]">{part}</a>;
    }
    return part;
  });
}

export function LegalPage({
  title,
  subtitle,
  introduction,
  lastUpdated,
  sections,
  contactMessage,
  supportMessage,
  badgeTitle,
  badgeDescription,
}: LegalPageProps) {
  return (
    <main className={`${styles.page} min-h-screen bg-white font-inter text-[#353333]`}>
      <section className="relative overflow-hidden bg-[#F7FFF7]">
        <Image src="/privacy-policy/hero-img.png" alt="" fill priority sizes="100vw" className="object-cover object-right-top sm:object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white" />
        <Container className="relative py-6 pb-20 sm:pt-9 sm:pb-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs leading-5 text-[#757575] sm:mb-8">
            <Link href="/" className="transition-colors hover:text-[#214E34]">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page" className="text-[#214E34]">{title}</span>
          </nav>
          <h1 className="max-w-3xl font-serif text-[40px] font-semibold leading-[1.05] sm:text-[52px]">{title}</h1>
          <div className="my-4 h-px w-16 bg-[#214E34] sm:my-5" />
          <p className="max-w-xl text-sm leading-6 text-[#757575]">{subtitle}</p>
        </Container>
      </section>

      <Container className="relative z-10 -mt-10 pb-10 sm:-mt-12 sm:pb-14">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <article aria-label={title} className="min-w-0 rounded-2xl border border-[#214E34]/10 bg-white p-5 sm:p-8 lg:p-10">
            {lastUpdated && <p className="mb-4 text-xs leading-5 text-[#757575]">Last Updated: <span className="font-medium text-[#353333]">{lastUpdated}</span></p>}
            <p id="introduction" className="scroll-mt-6 border-b border-[#214E34]/10 pb-6 text-sm leading-6 text-[#757575] sm:pb-8">{introduction}</p>
            <div className="divide-y divide-[#214E34]/10">
              {sections.map((section) => (
                <section key={section.id} id={section.title.toLowerCase().replace(/ /g, "-")} className="flex scroll-mt-6 items-start gap-3 py-6 last:pb-0 sm:gap-5 sm:py-8">
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-[#214E34]/10 bg-[#F7FFF7] text-xs font-semibold text-[#214E34] sm:size-9 sm:text-sm">{section.id}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-2xl font-semibold leading-tight sm:text-[28px]">{section.title}</h2>
                    <p className="mt-3 break-words text-sm leading-6 text-[#757575]">
                      <PolicyText>{section.isContact && contactMessage ? contactMessage : section.content}</PolicyText>
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside aria-label="Help and support" className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-[#214E34]/10 bg-white p-5 sm:p-6">
              <h2 className="font-serif text-[28px] font-semibold leading-tight">Need Help?</h2>
              <p className="mt-3 text-sm leading-6 text-[#757575]">{supportMessage}</p>
              <div className="my-6 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#214E34]/10 bg-[#F7FFF7]">
                    <Image src="/privacy-policy/email-icon.png" alt="" width={16} height={16} />
                  </span>
                  <div className="min-w-0 text-sm leading-6">
                    <a href={`mailto:${email}`} className="break-words font-semibold transition-colors hover:text-[#214E34]">{email}</a>
                    <p className="text-[#757575]">Contact us with your enquiry</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#214E34]/10 bg-[#F7FFF7]">
                    <Image src="/privacy-policy/phone-icon.png" alt="" width={16} height={16} />
                  </span>
                  <div className="min-w-0 text-sm leading-6">
                    <a href="tel:+919869698984" className="font-semibold transition-colors hover:text-[#214E34]">{phone}</a>
                    <p className="text-[#757575]">Jaipur, India</p>
                  </div>
                </div>
              </div>
              <Link href="/contact" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#214E34] px-7 py-3.5 text-xs font-semibold text-white shadow-[0_6px_22px_rgba(33,78,52,0.22)] transition-all duration-300 hover:bg-[#173d28] hover:shadow-[0_8px_28px_rgba(33,78,52,0.3)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:px-8 sm:py-4 sm:text-sm">
                Contact Us
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[#214E34]/10 bg-[#F7FFF7] p-5 sm:p-6">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#214E34]/10 bg-white text-[#214E34]">
                <ShieldCheck size={16} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-5">{badgeTitle}</p>
                <p className="mt-1 text-xs leading-5 text-[#757575]">{badgeDescription}</p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
