import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";

export function AboutHero() {
  return (
    <section className="bg-[#F7FFF7] py-6 sm:pb-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#757575] sm:mb-10">
          <Link href="/" className="transition-colors hover:text-[#214E34]">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Our Story</span>
        </nav>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">
              The Miraya journey
            </p>
            <h1 className="font-serif text-[40px] font-semibold leading-[1.05] text-[#353333] sm:text-[52px]">
              Our Story
            </h1>
            <p className="mt-5 max-w-lg font-serif text-[26px] font-semibold leading-[1.2] text-[#214E34] sm:text-[32px]">
              30+ Years of Jewellery Experience. 16+ Years in CVD Diamond Technology.
            </p>
            <p className="mt-5 max-w-lg font-inter text-sm leading-6 text-[#757575]">
              Our journey began over 30 years ago with our family’s passion for jewellery. For generations, we have been working with gold, silver and diamonds, gaining a deep understanding of jewellery craftsmanship and the value behind every piece.
            </p>
          </div>
          <div className="relative aspect-[590/462] overflow-hidden rounded-xl">
            <Image
              src="/about/about-hero.jpg"
              alt="Fine diamond jewellery by Miraya Diamonds"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
