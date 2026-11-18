import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/common/container";

const contacts = [
  { icon: "/contact/phone_icon.png", label: "Call Miraya Diamonds", title: "+91 9869698984", description: "Speak with our team about collections, custom designs and your jewellery questions.", href: "tel:+919869698984", action: "Call now" },
  { icon: "/contact/mail_icon.png", label: "Email Miraya Diamonds", title: "Sales.mirayadiamonds@gmail.com", description: "Share your design ideas, product questions or requests for diamond documentation.", href: "mailto:Sales.mirayadiamonds@gmail.com", action: "Send Email" },
  { icon: "/contact/video_icon.png", label: "1-on-1 Virtual Experience", title: "Personal Jewellery Guidance", description: "Contact us to discuss a remote consultation and the details you would like to explore.", href: "mailto:Sales.mirayadiamonds@gmail.com?subject=Jewellery%20consultation", action: "Discuss a Consultation" },
];

export function QuickContact() {
  return (
    <section className="bg-[#F7FFF7] py-10 sm:py-14">
      <Container className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {contacts.map((contact) => (
          <div key={contact.label} className="flex min-w-0 flex-col rounded-2xl border border-[#214E34]/10 bg-white p-5 sm:p-6">
            <span className="mb-5 grid size-12 place-items-center rounded-full bg-[#F7FFF7] text-[#214E34]"><Image src={contact.icon} alt="" width={22} height={22} className="object-contain" /></span>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#214E34]">{contact.label}</p>
            <h2 className={`mt-3 break-words text-xl font-semibold leading-tight sm:text-[27px] ${contact.href.startsWith("tel:") ? "font-infant" : "font-serif"}`}>{contact.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-[#757575]">{contact.description}</p>
            <a href={contact.href} className="mt-6 inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-[#214E34] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#173d28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34]">
              {contact.action}{contact.icon === "/contact/video_icon.png" ? <Calendar size={15} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
            </a>
          </div>
        ))}
      </Container>
    </section>
  );
}
