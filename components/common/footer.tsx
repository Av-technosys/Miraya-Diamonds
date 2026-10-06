"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/icons/cib-facebook";

const shopLinks = [
  { label: "Rings" },
  { label: "Earrings" },
  { label: "Bracelets" },
  { label: "Necklaces" },
  { label: "Bangels" },
  { label: "Collections" },
];

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Warranty", href: "/warranty" },
];

const policyLinks = [
  { label: "FAQs", href: "/contact#faq" },
  { label: "Shipping & Delivery" },
  { label: "Returns & Exchange", href: "/return-policy" },
  { label: "Track Order" },
  { label: "Contact Us", href: "/contact" },
];

function FooterItem({ item }: { item: { label: string; href?: string } }) {
  const className = "transition-colors hover:text-[#E45370]";

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {item.label}
      </Link>
    );
  }

  return <span className="text-white">{item.label}</span>;
}

function FooterColumn({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-[family-name:var(--font-montserrat)] text-[14px] font-bold uppercase leading-none tracking-[0.19em] text-[#E45370] md:text-[15px]">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function MobileFooterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasContent = Boolean(children);

  return (
    <div className="border-b border-[#E45370]/80">
      <button
        type="button"
        className="flex w-full items-center justify-between py-[18px] text-left"
        onClick={() => {
          if (hasContent) {
            setIsOpen((value) => !value);
          }
        }}
      >
        <span className="font-[family-name:var(--font-montserrat)] text-[14px] font-bold uppercase leading-none tracking-[0.2em] text-[#E45370]">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#E45370] transition-transform ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={1.9}
        />
      </button>
      {hasContent && isOpen ? <div>{children}</div> : null}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate mt-auto min-h-[930px] overflow-hidden bg-[#080000] text-white sm:min-h-[900px] lg:min-h-[695px] lg:bg-[#120100]">
      <Image
        src="/Images/Footer_bg.png"
        alt=""
        fill
        sizes="100vw"
        priority={false}
        className="absolute inset-0 z-0 hidden object-cover object-center lg:block"
      />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[838px] lg:hidden">
        <Image
          src="/Images/Footer_bg_mb.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-bottom"
        />
      </div>
      <div className="absolute inset-x-0 top-0 z-[1] hidden h-1/2 bg-gradient-to-b from-[#080000]/95 via-[#100101]/78 to-[#160302]/0 lg:block" />
      <div className="absolute inset-x-0 top-0 z-[1] h-[62%] bg-gradient-to-b from-black via-[#070000]/95 to-[#120100]/15 lg:hidden" />

      <motion.div
        className="absolute bottom-[-170px] left-1/2 z-[2] hidden w-[980px] max-w-[112vw] -translate-x-1/2 lg:block xl:bottom-[-96px] xl:w-[1053px] xl:max-w-[118vw]"
        initial={{ y: 260, opacity: 0.15 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/Images/Footer_ring.png"
          alt=""
          width={1053}
          height={482}
          sizes="(max-width: 768px) 120vw, 1053px"
          className="h-auto w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[28px] left-1/2 z-[2] w-[610px] max-w-[146vw] -translate-x-1/2 sm:bottom-[12px] sm:w-[720px] sm:max-w-[118vw] lg:hidden"
        initial={{ y: 130, opacity: 0.2 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.01, margin: "0px 0px 160px 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/Images/Footer_ring.png"
          alt=""
          width={1053}
          height={482}
          sizes="124vw"
          className="h-auto w-full object-contain"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[520px] px-[35px] pt-[42px] lg:hidden">
        <div className="flex items-center gap-3">
          <Image
            src="/Header_logo.png"
            alt=""
            width={56}
            height={54}
            className="h-[47px] w-auto shrink-0 object-contain"
          />
          <Image
            src="/footerlogo.png"
            alt="Miraya Diamonds"
            width={190}
            height={42}
            className="h-auto w-[166px] object-contain"
          />
        </div>

        <p className="mt-[27px] max-w-[330px] font-sans text-[14px] leading-[1.22] tracking-[-0.02em] text-white">
          Lorem ipsum dolor sit amet, consectetur ffdv ciscing elit. Sed do eiusmod temporvvxv incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="mt-[52px] flex items-center gap-[26px] text-white">
          <span className="flex h-[26px] w-[26px] items-center justify-center">
            <IconBrandInstagram size={26} stroke={2.1} />
          </span>
          <span className="flex h-[26px] w-[26px] items-center justify-center">
            <FacebookIcon size={26} />
          </span>
          <span className="flex h-[26px] w-[26px] items-center justify-center">
            <IconBrandX size={25} stroke={1.65} />
          </span>
        </div>

        <div className="mt-[29px] border-t border-[#E45370]/80">
          <MobileFooterSection title="Shop">
            <ul className="space-y-[16px] pb-[14px] font-sans text-[14px] leading-none">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <FooterItem item={item} />
                </li>
              ))}
            </ul>
          </MobileFooterSection>
          <MobileFooterSection title="Policies">
            <ul className="space-y-[16px] pb-[14px] font-sans text-[14px] leading-none">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <FooterItem item={item} />
                </li>
              ))}
            </ul>
          </MobileFooterSection>
          <MobileFooterSection title="About">
            <ul className="space-y-[18px] pb-[14px] font-sans text-[14px] leading-none">
              {aboutLinks.map((item) => (
                <li key={item.label}>
                  <FooterItem item={item} />
                </li>
              ))}
            </ul>
          </MobileFooterSection>
          <MobileFooterSection title="Contact Us">
            <ul className="space-y-[14px] pb-[14px] font-sans text-[13px] leading-tight">
              <li>
                <a href="mailto:miraya.diamond23@gmail.com">miraya.diamond23@gmail.com</a>
              </li>
              <li>
                <a href="tel:+919869698984">+91 9869698984</a>
              </li>
              <li>23,24 Paradise Heights, Bangalore</li>
            </ul>
          </MobileFooterSection>
        </div>
      </div>

      <div className="relative z-10 mx-auto hidden w-full max-w-[1240px] grid-cols-1 gap-8 px-4 pb-[300px] pt-16 lg:grid lg:grid-cols-[260px_105px_155px_155px_minmax(230px,1fr)] lg:gap-6 lg:px-8 xl:grid-cols-[330px_138px_180px_180px_minmax(280px,1fr)] xl:gap-[34px] xl:px-0 xl:pb-[280px]">
        <div className="max-w-[320px]">
          <div className="flex items-center gap-3 xl:gap-3">
            <Image
              src="/Header_logo.png"
              alt=""
              width={98}
              height={95}
              className="h-[60px] w-auto shrink-0 object-contain xl:h-[78px]"
            />
            <Image
              src="/footerlogo.png"
              alt="Miraya Diamonds"
              width={285}
              height={64}
              className="h-auto w-[190px] max-w-[calc(100%-72px)] object-contain xl:w-[245px]"
            />
          </div>
          <p className="mt-7 max-w-[260px] font-sans text-[13px] leading-[1.28] tracking-[-0.02em] text-white xl:max-w-[300px] xl:text-[15px]">
            Lorem ipsum dolor sit amet, consectetur ffdv adipiscing elit. Sed do eiusmod temporvvxv incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-10 flex items-center gap-7 text-white xl:mt-12 xl:gap-8">
            <span className="flex h-[30px] w-[30px] items-center justify-center text-white xl:h-[34px] xl:w-[34px]">
              <IconBrandInstagram className="h-[30px] w-[30px] xl:h-[34px] xl:w-[34px]" stroke={2.15} />
            </span>
            <span className="flex h-[30px] w-[30px] items-center justify-center text-white xl:h-[34px] xl:w-[34px]">
              <FacebookIcon className="h-[30px] w-[30px] xl:h-[34px] xl:w-[34px]" />
            </span>
            <span className="flex h-[30px] w-[30px] items-center justify-center text-white xl:h-[34px] xl:w-[34px]">
              <IconBrandX className="h-[29px] w-[29px] xl:h-8 xl:w-8" stroke={1.75} />
            </span>
          </div>
        </div>

        <FooterColumn title="Shop" className="border-[#D74B64] lg:border-l lg:pl-6 xl:pl-8">
          <ul className="space-y-[13px] font-sans text-[13px] leading-none text-white xl:space-y-[14px] xl:text-[15px]">
            {shopLinks.map((item) => (
              <li key={item.label}>
                <FooterItem item={item} />
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="About">
          <ul className="space-y-[13px] font-sans text-[13px] leading-none text-white xl:space-y-[14px] xl:text-[15px]">
            {aboutLinks.map((item) => (
              <li key={item.label}>
                <FooterItem item={item} />
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Policies">
          <ul className="space-y-[13px] font-sans text-[13px] leading-none text-white xl:space-y-[14px] xl:text-[15px]">
            {policyLinks.map((item) => (
              <li key={item.label}>
                <FooterItem item={item} />
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Contact Us" className="border-[#D74B64] lg:border-l lg:pl-6 xl:pl-8">
          <p className="max-w-[245px] font-sans text-[13px] leading-[1.14] tracking-[-0.02em] xl:max-w-[270px] xl:text-[15px]">
            We&apos;re here to make your shopping experience easier.
          </p>
          <ul className="mt-6 space-y-4 font-sans text-[13px] leading-none xl:mt-7 xl:space-y-[18px] xl:text-[15px]">
            <li className="flex items-center gap-3">
              <Mail className="h-[18px] w-[18px] shrink-0 text-[#E45370] xl:h-5 xl:w-5" strokeWidth={1.8} />
              <a href="mailto:miraya.diamond23@gmail.com" className="transition-colors hover:text-[#E45370]">
                miraya.diamond23@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-[18px] w-[18px] shrink-0 text-[#E45370] xl:h-5 xl:w-5" strokeWidth={1.8} />
              <a href="tel:+919869698984" className="transition-colors hover:text-[#E45370]">
                +91 9869698984
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-[#E45370] xl:h-[22px] xl:w-[22px]" strokeWidth={1.8} />
              <span>23,24 Paradise Heights, Bangalore</span>
            </li>
          </ul>
        </FooterColumn>
      </div>
    </footer>
  );
}
