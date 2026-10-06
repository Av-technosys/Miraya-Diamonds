"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";

const filterPills = ["All Reviews", "Rings", "Earrings", "Necklaces", "Bracelets", "Bespoke"];

const testimonials = [
  {
    image: "/testimonials/solitare.jpg",
    review: "\"Absolutely in love with my ring! The craftsmanship is beyond beautiful and it feels so personal. It was the perfect choice for our engagement.\"",
    name: "Aditi Sharma",
    avatar: "/testimonials/aditi.jpg",
    product: "Solitaire Engagement Ring",
  },
  {
    image: "/testimonials/earring.jpg",
    review: "\"The earrings are elegant, lightweight and so versatile. I wear them almost every day and always get compliments!\"",
    name: "Riya Mehta",
    avatar: "/testimonials/riya.jpg",
    product: "Diamond Drop Earrings",
  },
  {
    image: "/testimonials/necklace.jpg",
    review: "\"A piece that feels like me — minimal, elegant and timeless. The quality and attention to detail is truly remarkable.\"",
    name: "Sneha Kapoor",
    avatar: "/testimonials/sneha.jpg",
    product: "Aurora Petal Necklace",
  },
  {
    image: "/testimonials/bracelet.jpg",
    review: "\"Bought this bracelet for my anniversary and it's even more beautiful in person. Thank you for making our moment so special.\"",
    name: "Karan & Nisha",
    avatar: "/testimonials/karan&nisha.jpg",
    product: "Classic Tennis Bracelet",
  },
  {
    image: "/testimonials/diamond.jpg",
    review: "\"The diamond is absolutely flawless. The brilliance and clarity exceeded all my expectations. Miraya truly delivers perfection.\"",
    name: "Priya Verma",
    avatar: "/testimonials/priya.jpg",
    product: "Halo Diamond Ring",
  },
  {
    image: "/testimonials/engagement.jpg",
    review: "\"She said yes! The ring was everything we dreamed of and more. The entire experience from design to delivery was seamless.\"",
    name: "Rohit Malhotra",
    avatar: "/testimonials/rohit.jpg",
    product: "Solitaire Engagement Ring",
  },
  {
    image: "/testimonials/pendant.jpg",
    review: "\"This pendant is my everyday luxury. It sits perfectly and catches light beautifully. I've never received so many compliments.\"",
    name: "Neha Gupta",
    avatar: "/testimonials/neha.jpg",
    product: "Celeste Pendant",
  },
  {
    image: "/testimonials/stud.jpg",
    review: "\"These studs are pure elegance. Simple yet stunning — they go with everything. The quality is exceptional for the price.\"",
    name: "Megha Sharma",
    avatar: "/testimonials/megha.jpg",
    product: "Floral Stud Earrings",
  },
];

function VerifiedBadge({ size = 14.17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="8" cy="8" r="8" fill="#CB485E" />
      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-[2.02px] pt-[6.88px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-[10.65px] h-[10.15px] text-[#CB485E] fill-[#CB485E]"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export function TestimonialsContent() {
  const [activeFilter, setActiveFilter] = useState("All Reviews");

  // Filter logic based on product name
  const filteredTestimonials = testimonials.filter((t) => {
    if (activeFilter === "All Reviews") return true;
    if (activeFilter === "Rings") return t.product.includes("Ring");
    if (activeFilter === "Earrings") return t.product.includes("Earring");
    if (activeFilter === "Necklaces") return t.product.includes("Necklace") || t.product.includes("Pendant");
    if (activeFilter === "Bracelets") return t.product.includes("Bracelet");
    if (activeFilter === "Bespoke") return t.review.toLowerCase().includes("bespoke") || t.product.toLowerCase().includes("custom");
    return true;
  });

  return (
    <div className="w-full max-w-[1239.77px] mx-auto px-4 md:px-0 pt-[16px] md:pt-[60px] pb-[60px] flex flex-col gap-[24px] md:gap-[60px]">

      {/* Frame 264: FilterPills + TestimonialGrid */}
      <div className="flex flex-col gap-[16px] md:gap-[30px] w-full">

        {/* Section - FilterPills */}
        {/* Mobile: horizontal scroll. Desktop: centered wrap */}
        <div className="flex w-full overflow-x-auto lg:flex-wrap lg:justify-center items-center gap-[10px] md:gap-[13.5px] pt-[8px] md:pt-[36px] pb-2 md:pb-0 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filterPills.map((pill) => {
            const isActive = activeFilter === pill;
            return (
              <button
                key={pill}
                onClick={() => setActiveFilter(pill)}
                className="h-[36px] md:h-[40px] rounded-full px-[20px] md:px-[28px] py-[8px] md:py-[9px] flex items-center justify-center cursor-pointer shrink-0 snap-start transition-colors duration-300"
                style={{
                  backgroundColor: isActive ? "#CB485E" : "#FCE9EC",
                  border: isActive ? "1.13px solid transparent" : "1.13px solid #CB485E",
                  boxShadow: isActive ? "0px 1.13px 2.25px 0px rgba(0,0,0,0.05)" : "none",
                }}
              >
                <span
                  className="font-sans font-semibold text-[13px] md:text-[14px] leading-[22.5px] text-center whitespace-nowrap transition-colors duration-300"
                  style={{ color: isActive ? "#FFFFFF" : "#CB485E" }}
                >
                  {pill}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section - TestimonialGrid */}
        {/* Mobile: horizontal scroll. Desktop: grid */}
        <div className="flex w-full overflow-x-auto lg:grid lg:grid-cols-4 gap-[16px] md:gap-[20px] pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((card, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-[16.19px] border-[1.01px] border-[#EDE7E3] bg-white p-[10px] sm:p-[16.19px] w-[78vw] max-w-[420px] sm:w-[350px] lg:w-auto shrink-0 snap-center"
                style={{
                  boxShadow: "0px 4.05px 20.24px 0px rgba(0,0,0,0.05)",
                }}
              >
                {/* Top Content */}
                <div className="flex flex-col gap-[9.31px] pb-[16.19px]">
                  {/* Product Image */}
                  <div className="w-full aspect-[16/10] sm:aspect-[256.59/210.51] rounded-[12.14px] bg-[#F6F2EF] overflow-hidden relative">
                    <Image src={card.image} alt={card.product} fill className="object-cover" />
                  </div>

                  {/* Star Rating */}
                  <StarRating />

                  {/* Review Text */}
                  <p className="font-sans font-normal text-[13px] md:text-[14px] leading-[21.38px] text-[#454545]">
                    {card.review}
                  </p>
                </div>

                {/* Bottom: Author + Product */}
                <div className="border-t-[1.01px] border-[#F4EDE9] pt-[12.14px] flex flex-col gap-[8.1px]">
                  {/* Author Row */}
                  <div className="flex items-center gap-[10.12px]">
                    {/* Avatar */}
                    <div className="w-[32.39px] h-[32.39px] rounded-full bg-[#FCE9EC] overflow-hidden relative shrink-0">
                      <Image src={card.avatar} alt={card.name} fill className="object-cover" />
                    </div>
                    {/* Name + Verified */}
                    <div className="flex flex-col gap-[4px] md:gap-[6.58px]">
                      <div className="flex items-center gap-[6.07px]">
                        <span className="font-sans font-semibold text-[12px] md:text-[12.14px] leading-[16.19px] text-[#25211F] truncate max-w-[120px] md:max-w-none">
                          {card.name}
                        </span>
                        <VerifiedBadge size={14.17} />
                      </div>
                      <span className="font-sans font-normal text-[10px] md:text-[10.12px] leading-[15.18px] text-[#8A817C]">
                        Verified Purchase
                      </span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <span className="font-sans font-medium text-[11px] md:text-[12px] leading-[16.7px] text-[#6B625D]">
                    {card.product}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full col-span-4 py-10 text-center font-sans text-gray-500">
              No reviews found for this category.
            </div>
          )}
        </div>
      </div>

      {/* Section - FeaturedStory */}
      <div
        className="relative w-full rounded-[24px] md:rounded-[24.46px] border-[1.02px] border-[#EDDCD4] bg-[#F7EEEA] overflow-hidden flex flex-col lg:flex-row"
        style={{
          boxShadow: "0px 1.02px 2.04px 0px rgba(0,0,0,0.05)",
        }}
      >
        {/* Top/Left Photography */}
        <div className="relative w-full lg:w-[516px] h-[250px] md:h-[400px] lg:h-[472px] shrink-0 overflow-hidden">
          <Image src="/testimonials/featured.jpg" alt="Featured Story" fill className="object-cover" />
          {/* Gradient fade on mobile to blend with content below */}
          <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-[#F7EEEA] to-transparent lg:hidden" />
        </div>

        {/* Bottom/Right Editorial Quote & Details */}
        <div className="flex-1 flex flex-col justify-between p-[24px] md:p-[40px] lg:p-[57.08px]">
          {/* Top Content */}
          <div className="flex flex-col gap-[12px] md:gap-[14.78px] pt-[5.61px]">
            {/* Eyebrow */}
            <span className="font-sans font-semibold text-[10px] md:text-[12px] leading-[16.31px] tracking-[2.69px] text-[#A8354C] uppercase">
              FEATURED STORY
            </span>

            {/* Heading */}
            <h2 className="font-serif font-bold text-[28px] md:text-[40px] leading-[32px] md:leading-[40.77px] text-[#231F1D]">
              "A Piece for a Moment<br />I'll Always Cherish"
            </h2>

            {/* Description */}
            <p className="font-sans font-normal text-[13px] md:text-[14px] leading-[20px] text-[#5E544F] pt-[5.61px] max-w-[488px]">
              "My engagement ring from Miraya is more than just a piece of jewellery — it's a symbol of our journey. The entire experience was so personal and memorable. I couldn't have asked for anything more perfect."
            </p>
          </div>

          {/* Bottom Section */}
          <div className="pt-[24px] md:pt-[32.62px]">
            <div className="border-t-[1.02px] border-[#EBDED7] pt-[20px] md:pt-[24.46px] flex flex-col md:flex-row md:items-center justify-between gap-[20px] md:gap-0">
              {/* Author */}
              <div className="flex items-center gap-[10px] md:gap-[12.23px]">
                {/* Avatar */}
                <div className="w-[36px] h-[36px] md:w-[40.77px] md:h-[40.77px] rounded-full bg-[#E8DDD7] border-[1.02px] border-[#A8354C33] overflow-hidden relative shrink-0">
                  <Image src="/testimonials/simran.jpg" alt="Simran Kaur" fill className="object-cover" />
                </div>
                {/* Name + Verified */}
                <div className="flex flex-col gap-[4px] md:gap-[8.15px]">
                  <div className="flex items-center gap-[6px] md:gap-[8.15px]">
                    <span className="font-sans font-semibold text-[12px] md:text-[14px] leading-[16px] md:leading-[20.39px] text-[#25211F]">
                      — Simran Kaur
                    </span>
                    <VerifiedBadge size={14} />
                  </div>
                  <span className="font-sans font-normal text-[10px] md:text-[12px] leading-[14px] md:leading-[16.31px] text-[#7B726D]">
                    Verified Purchase
                  </span>
                </div>
              </div>

              {/* Calligraphic Signature Accent */}
              <div className="flex flex-col items-end">
                <span className="font-[family-name:var(--font-playfair)] font-normal text-[28px] md:text-[36.7px] leading-[16px] md:leading-[20px] text-[#A8354C66] mr-[8px] md:mr-[12px]">
                  “
                </span>
                <span className="font-[family-name:var(--font-script)] font-normal text-[18px] md:text-[24.46px] leading-[18px] md:leading-[24.46px] text-[#CB485E] md:text-[#846B63] whitespace-nowrap text-right">
                  Beautiful Stories Last Forever
                </span>
                <div className="w-[30px] md:w-[40.77px] h-[1.5px] md:h-[2.04px] bg-[#C8526999] mt-[4.08px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

