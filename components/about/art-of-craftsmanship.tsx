import Image from "next/image";
import { Container } from "@/components/common/container";

const details = [
  { title: "Craft", subtitle: "Attention to Detail", description: "From sketch to final polish" },
  { title: "Design", subtitle: "Considered Settings", description: "Balance, comfort and finish" },
];

export function ArtOfCraftsmanship() {
  return (
    <section className="bg-[#F7FFF7] py-10 sm:py-14">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="grid grid-cols-2 items-start gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <Image src="/about/master.jpg" alt="Jeweller detailing a diamond ring" fill sizes="(max-width: 1023px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className="relative mt-6 aspect-[3/4] overflow-hidden rounded-xl">
            <Image src="/about/intro.jpg" alt="Fine jewellery craftsmanship" fill sizes="(max-width: 1023px) 50vw, 25vw" className="object-cover" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#214E34]">The atelier process</p>
          <h2 className="font-serif text-[31px] font-semibold leading-[1.1] text-[#353333] sm:text-[38px]">The Art Behind <span className="text-[#214E34]">Every Sparkle</span></h2>
          <p className="mt-5 font-inter text-sm leading-6 text-[#757575]">Behind every Miraya Diamonds creation is a combination of imagination, precision, and craftsmanship. From selecting the right stones to refining every curve and setting, our pieces are shaped with patience and purpose.</p>
          <p className="mt-4 font-serif text-xl italic leading-7 text-[#353333]">Because true luxury is not only about how a piece looks — it is about how beautifully it is made.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {details.map((detail) => (
              <div key={detail.title} className="rounded-xl border border-[#214E34]/15 bg-white p-4 sm:p-5">
                <h3 className="font-serif font-semibold leading-tight text-[#214E34] text-xl sm:text-[27px]">{detail.title}</h3>
                <p className="mt-2 font-inter text-sm font-medium leading-5 text-[#353333]">{detail.subtitle}</p>
                <p className="mt-1 font-inter text-xs leading-5 text-[#757575]">{detail.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
