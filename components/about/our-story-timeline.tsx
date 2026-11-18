import Image from "next/image";
import { Container } from "@/components/common/container";

const milestones = [
  { title: "30+ years", description: "Jewellery experience" },
  { title: "16+ years", description: "CVD diamond technology" },
];

export function OurStoryAndTimeline() {
  return (
    <section className="bg-[#F7FFF7] py-10 sm:py-14">
      <Container className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">
            Origin &amp; heritage
          </p>
          <h2 className="font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">
            Experience That Shapes Every Piece
          </h2>
          <div className="mt-5 space-y-4 font-inter text-sm leading-6 text-[#757575]">
            <p>Sixteen years ago, we entered the world of lab-grown diamonds through a unique technology called CVD, when the industry was still in its early stages.</p>
            <p>During this journey, we were involved in research and development, machine design, process improvement and commercial production of CVD diamonds.</p>
            <p>This gave us valuable experience and a deeper understanding of how lab-grown diamonds are created.</p>
            <p>Today, we bring these two areas of experience together—our long-standing jewellery background and our knowledge of diamonds.</p>
            <p>Our goal is simple: to create beautiful, modern and meaningful diamond jewellery by combining skilled craftsmanship with advanced technology.</p>
            <p>Every piece is designed with attention to quality, detail and timeless beauty.</p>
            <p>What started with our family’s jewellery business has now grown into a new generation of jewellery, built on years of experience and a passion for diamonds.</p>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[#214E34]/15 pt-6">
            {milestones.map((milestone) => (
              <div key={milestone.title}>
                <dt className="font-serif text-[28px] font-semibold leading-tight text-[#214E34] sm:text-[32px]">{milestone.title}</dt>
                <dd className="mt-1 font-inter text-xs leading-5 text-[#757575]">{milestone.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative aspect-[582/489] overflow-hidden rounded-xl">
          <Image
            src="/about/master.jpg"
            alt="Jeweller carefully setting a diamond into a ring"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
