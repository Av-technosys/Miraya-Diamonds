"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, Gem, Heart, Leaf, Tag } from "lucide-react";
import { Container } from "@/components/common/container";
import { product, suiteProducts } from "@/components/pdp/product-data";
import { HeroCarousel } from "./hero-carousel";
import { HomeBestSellerCarousel } from "./home-best-seller-carousel";
import { HomeTestimonialsAnimated } from "./home-testimonials-animated";
import showcaseBanner from "@/public/Home/showcasebanner.png";
import diamondComparisonBanner from "@/public/Home/showcasebanner2.png";
import stayInTouchBanner from "@/public/Home/stayintouch.png";

const pdpHref = `/collection/${product.slug}`;
const categories = [
  { name: "Earrings", image: "Category1.png", href: "/collection?category=Earrings" },
  { name: "Rings", image: "Category2.png", href: "/collection?category=Rings" },
  { name: "Pendants", image: "Category3.png", href: "/collection?category=Pendants" },
  { name: "Bracelets", image: "Category4.png", href: "/collection?category=Bracelets" },
  { name: "Kids", image: "Category5.png", href: "/collection?occasion=Gifting" },
  { name: "Customize", image: "Category6.png", href: "/contact" },
];
const collectionItems = [
  { name: "Bhvita 22KT Earring", image: "/Home/collection1.png" },
  { name: "Bhvita 22KT Necklace", image: "/Home/collection2.png" },
  { name: "22KT Gold Ring", image: "/Home/collection3.png" },
  { name: "Bhvita 22KT Bracelet", image: "/Home/collection4.png" },
  { name: "Bhvita 22KT Necklace", image: "/Home/collection5.png" },
];
const newArrivalItems = [suiteProducts[4], suiteProducts[2], suiteProducts[0], suiteProducts[1], suiteProducts[3]];
const tabs = ["All", "Rings", "Necklace", "Bracelets", "Earrings", "Bangles"];
const lovedImages = ["mostloved1.png", "mostloved3.png", "mostloved2.png"];
const signature = [
  { name: "Warm & Romantic", metal: "Rose Gold", image: "Signature1.png", swatch: "linear-gradient(135deg, #E4A494, #F4C5B8 50%, #E3A393)", edge: "linear-gradient(135deg, #A86F62, #F9E5DE 22%, #C68778 40%, #FFF9F6 53%, #D49A8B 75%, #9E675F)", button: "linear-gradient(100deg, #C67970, #EDB5A8)", shadow: "0 5px 14px rgba(180, 113, 100, 0.13)", copy: "A soft pink hue that adds a touch of romance. Ideal for those who love subtle uniqueness." },
  { name: "Classic & Timeless", metal: "Yellow Gold", image: "Signature2.png", swatch: "linear-gradient(135deg, #E5C158, #FDE599 50%, #D8B042)", edge: "linear-gradient(135deg, #A88542, #FFF0BB 22%, #C7A358 40%, #FFFDF2 53%, #E0BC70 75%, #92743F)", button: "linear-gradient(100deg, #BA8B4F, #E8C98F)", shadow: "0 5px 14px rgba(165, 130, 62, 0.13)", copy: "The traditional gold tone that never goes out of style. Perfect for everyday elegance." },
  { name: "Modern & Minimal", metal: "White Gold", image: "Signature3.png", swatch: "linear-gradient(135deg, #D6D8DC, #F1F3F5 50%, #B0B4B9)", edge: "linear-gradient(135deg, #87949B, #F5F7F9 22%, #ABB4BA 40%, #FFFFFF 53%, #C7CFD3 75%, #7E8C94)", button: "linear-gradient(100deg, #AAB5BB, #D7DBDE)", shadow: "0 5px 14px rgba(119, 137, 146, 0.13)", copy: "Sleek and sophisticated, white gold pairs beautifully with diamonds and contemporary styles." },
];
const bestSellers = [
  { name: "Necklace & Pendants", image: "bestseller1.png", href: "/collection?category=Necklaces" },
  { name: "Designer Rings", image: "bestseller2.png", href: "/collection?category=Rings" },
  { name: "Necklace & Pendants", image: "bestseller3.png", href: "/collection?category=Necklaces" },
  { name: "Bangles & Bracelets", image: "bestseller4.png", href: "/collection?category=Bracelets" },
  { name: "Earrings", image: "bestseller5.png", href: "/collection?category=Earrings" },
];
const reviews = [
  { name: "Aditi S.", text: "The ring is even more beautiful in person. The craftsmanship is exceptional!" },
  { name: "Riya M.", text: "Absolutely loved it! Elegant, timeless and perfect for my engagement." },
  { name: "Sneha K.", text: "Such fine detailing. The filigree work makes it truly special." },
  { name: "Meera P.", text: "The bracelet feels lovely to wear, and the details are just as beautiful up close." },
];
const faqs = [
  { question: "What materials are your jewellery pieces made from?", answer: "Our pieces include gold, platinum and certified natural diamonds. The metal and stone details are listed on each product page." },
  { question: "How do I choose the right ring/bracelet/necklace size?", answer: "Use the size guide on the product page, or contact our atelier for help with a precise fit." },
  { question: "How should I care for and maintain my jewellery?", answer: "Store each piece separately and clean gently with a soft cloth. Avoid harsh chemicals and remove jewellery before strenuous activity." },
  { question: "Do you offer returns, exchanges, or refunds?", answer: "Eligibility depends on the piece and its customization. Please read our returns policy before ordering." },
  { question: "How long does delivery take, and can I track my order?", answer: "Delivery timing depends on your location and the piece. Our team can confirm an estimate and tracking details for your order." },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="mb-7 text-center sm:mb-9"><h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[31px] font-semibold leading-none text-[#252525] sm:text-[38px]">{title}</h2><p className="mt-1.5 text-xs text-[#898989] sm:text-sm">{subtitle}</p></div>;
}

function RoundArrow({ direction, onClick, label }: { direction: "left" | "right"; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} aria-label={label} className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-[#214E34] shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#214E34] sm:size-10">{direction === "left" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</button>;
}

function ProductTile({ item }: { item: (typeof suiteProducts)[number] }) {
  return <Link href={pdpHref} className="group block min-w-0 text-left">
    <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-white bg-[#f8f8f8]"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 220px" className="object-contain transition-transform duration-300 group-hover:scale-[1.04]" /></div>
    <p className="mt-2 text-xs font-semibold text-[#373737] sm:text-sm">₹38,255 <span className="ml-1 text-[10px] font-normal text-[#999] line-through">₹40,255</span></p>
    <p className="truncate text-[11px] text-[#777] sm:text-xs">{item.name}</p>
  </Link>;
}

export function HomePage() {
  const [loved, setLoved] = useState(0);
  const [collectionTab, setCollectionTab] = useState("All");
  const newArrivalsRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const shownItems = collectionTab === "All" ? collectionItems : collectionItems.filter((item) => {
    const type = item.name.includes("Earring") ? "Earrings" : item.name.includes("Necklace") ? "Necklace" : item.name.includes("Bracelet") ? "Bracelets" : "Rings";
    return type === collectionTab;
  });

  return <main className="overflow-hidden bg-white font-[family-name:var(--font-inter)] text-[#353333]">
    <Container className="pt-5 sm:pt-6">
      <HeroCarousel />
    </Container>

    <Container className="py-10 sm:py-16"><SectionHeading title="Shop By Category" subtitle="Discover the Art of Fine Jewellery" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {categories.map((item, index) => (
          <Link key={item.name} href={item.href} className={`group relative aspect-square overflow-hidden rounded-lg ${index < 2 ? "sm:col-span-2 sm:aspect-[1672/941]" : ""}`}>
            <Image src={`/Home/${item.image}`} alt={`${item.name} jewellery`} fill sizes={index < 2 ? "(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 600px" : "(max-width: 640px) 46vw, (max-width: 1024px) 23vw, 300px"} className={`object-cover ${item.name === "Kids" ? "object-[65%_center]" : ""}`} />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/65 to-transparent" />
            <span className={`absolute bottom-3 left-3 font-[family-name:var(--font-cormorant-garamond)] text-lg font-semibold text-white underline decoration-white/80 underline-offset-4 sm:bottom-5 sm:left-6 ${index < 2 ? "sm:text-2xl" : "sm:text-xl"}`}>{item.name}</span>
          </Link>
        ))}
      </div>
    </Container>

    <Container className="pb-10 sm:pb-20"><SectionHeading title="New Arrivals" subtitle="Explore the latest range of products" />
      <div className="-mx-4 grid overflow-hidden sm:mx-0 sm:rounded-lg lg:grid-cols-[41%_minmax(0,1fr)]"><Link href="/collection?collection=New+Arrivals" aria-label="Shop new arrivals" className="relative block aspect-[1539/1022] overflow-hidden"><Image src="/Home/newarrival_mb.png" alt="New Arrivals, for festive sparkle to everyday essentials" fill sizes="(max-width: 640px) 100vw, 1px" className="object-cover sm:hidden" /><Image src="/Home/newarrival.png" alt="" fill sizes="(max-width: 1024px) 90vw, 500px" className="hidden object-cover sm:block" /></Link>
        <div className="flex min-w-0 flex-col bg-white">
          <div className="min-h-0 flex-1 bg-white pt-5 sm:bg-[linear-gradient(180deg,#a8baac_0%,#bbcebe_42%,#f4f8f4_88%,#fff_100%)] sm:pt-3"><div ref={newArrivalsRef} className="flex min-w-0 gap-4 overflow-x-auto scroll-smooth px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3 sm:px-3">{newArrivalItems.map((item, index) => <Link key={`${item.image}-${index}`} href={pdpHref} className="group w-[38%] shrink-0 sm:w-[30%] lg:w-[24%]">
            <div className="relative aspect-square overflow-hidden rounded-md border border-[#214E34]/80 bg-[#f8f8f8] sm:rounded-lg sm:border-white sm:bg-white"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 38vw, (max-width: 1024px) 30vw, 210px" className="object-contain" /></div>
            <p className="mt-2 whitespace-nowrap text-xs font-semibold text-[#333] sm:text-sm">₹38,255 <span className="text-[10px] font-normal text-[#999] line-through">₹40,255</span></p>
            <p className="truncate text-[11px] text-[#666]">{item.name}</p>
          </Link>)}</div></div>
          <div className="flex items-center justify-end gap-3 bg-white px-5 pb-4 pt-3 sm:justify-between"><div className="hidden gap-4 sm:flex"><RoundArrow direction="left" label="Previous new arrival" onClick={() => newArrivalsRef.current?.scrollBy({ left: -newArrivalsRef.current.clientWidth * 0.3, behavior: "smooth" })} /><RoundArrow direction="right" label="Next new arrival" onClick={() => newArrivalsRef.current?.scrollBy({ left: newArrivalsRef.current.clientWidth * 0.3, behavior: "smooth" })} /></div><Link href="/collection?collection=New+Arrivals" className="rounded-md bg-[#214E34] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#173d28]"><span className="sm:hidden">Shop Now</span><span className="hidden sm:inline">View All</span></Link></div>
        </div>
      </div>
    </Container>

    <Container className="pb-10 sm:pb-20"><SectionHeading title="Our Most Loved Products" subtitle="Discover brilliance designed to become part of your story." />
      <div className="relative aspect-[4/5] w-full sm:aspect-[50/19]">
        {lovedImages.map((image, index) => {
          const offset = (index - loved + lovedImages.length) % lovedImages.length;
          const position = offset === 0 ? "center" : offset === 1 ? "right" : "left";
          const placement = position === "center"
            ? "left-[12%] top-0 h-full w-[76%] z-10"
            : position === "left"
              ? "left-0 top-[10%] h-[80%] w-[60.8%] z-0"
              : "left-[39.2%] top-[10%] h-[80%] w-[60.8%] z-0";

          return <div key={image} className={`absolute overflow-hidden rounded-lg transition-[left,top,width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${placement}`}>
            <Image src={`/Home/${image.replace(".png", "mb.png")}`} alt={position === "center" ? "Explore our most loved jewellery" : ""} fill sizes="(max-width: 640px) 76vw, 1px" className="object-cover sm:hidden" />
            <Image src={`/Home/${image}`} alt="" fill sizes="(max-width: 1280px) 76vw, 925px" className="hidden object-cover sm:block" />
            {position === "center" ? <Link href="/collection" aria-label="Explore our most loved jewellery" className="absolute inset-0" /> : <button type="button" onClick={() => setLoved(index)} aria-label={`Show collection ${index + 1}`} className="absolute inset-0" />}
          </div>;
        })}
      </div>
      <div className="mt-5 flex items-center justify-center gap-4"><button type="button" onClick={() => setLoved((loved + lovedImages.length - 1) % lovedImages.length)} aria-label="Previous collection"><ArrowLeft size={17} /></button><div className="flex gap-1">{lovedImages.map((_, index) => <button key={index} type="button" onClick={() => setLoved(index)} aria-label={`Show collection ${index + 1}`} className={`h-1.5 rounded-full ${loved === index ? "w-5 bg-[#214E34]" : "w-1.5 bg-[#214E34]/35"}`} />)}</div><button type="button" onClick={() => setLoved((loved + 1) % lovedImages.length)} aria-label="Next collection"><ArrowRight size={17} /></button></div>
    </Container>

    <section className="bg-[rgba(255,248,225,0.7216)] py-14 sm:py-20"><Container><SectionHeading title="Our Collection" subtitle="Explore the latest range of products" /><div className="mb-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setCollectionTab(tab)} aria-pressed={collectionTab === tab} className={`shrink-0 rounded-full px-4 py-2 text-[11px] transition-colors sm:px-5 ${collectionTab === tab ? "bg-[#214E34] text-white" : "bg-white text-[#214E34] hover:bg-[#F7FFF7]"}`}>{tab}</button>)}</div><div className="relative"><div ref={collectionRef} className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5">{shownItems.length ? shownItems.map((item) => <div key={item.image} className="w-[43%] shrink-0 sm:w-[30%] lg:w-[calc(20%_-_16px)]"><ProductTile item={item} /></div>) : <p className="w-full py-8 text-center text-sm text-neutral-600">Explore this collection in our full catalogue.</p>}</div><div className="absolute inset-y-0 -left-10 hidden items-center sm:flex"><RoundArrow direction="left" label="Previous collection item" onClick={() => collectionRef.current?.scrollBy({ left: -300, behavior: "smooth" })} /></div><div className="absolute inset-y-0 -right-10 hidden items-center sm:flex"><RoundArrow direction="right" label="Next collection item" onClick={() => collectionRef.current?.scrollBy({ left: 300, behavior: "smooth" })} /></div></div><div className="mt-6 text-center"><Link href="/collection" className="inline-flex rounded-full bg-[#214E34] px-10 py-2.5 text-xs font-semibold text-white hover:bg-[#173d28]">View All</Link></div></Container></section>

    <Link href="/collection?category=Necklaces" aria-label="Explore necklaces" className="block"><Image src={showcaseBanner} alt="Diamond necklace worn with an embroidered green outfit" sizes="100vw" className="block h-auto w-full" /></Link>

    <section className="bg-[#F7FFF7] py-14 sm:py-16">
      <Container>
        <div className="mb-5 text-center sm:mb-6">
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[31px] font-semibold leading-none text-[#252525] sm:text-[38px]">Discover Your Signature Style</h2>
          <p className="mx-auto mt-1.5 max-w-[720px] text-xs leading-relaxed text-[#898989] sm:text-sm">Explore timeless designs in rose gold, yellow gold, and white gold — crafted to reflect your unique elegance.</p>
        </div>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {signature.map((item) => <article key={item.name} className="flex w-[calc((100%_-_0.75rem)/2)] shrink-0 flex-col rounded-b-[24px] rounded-t-full border-[1.5px] border-transparent p-[7px] text-center sm:mx-auto sm:w-full sm:max-w-[380px] sm:[border-radius:50%_50%_24px_24px/160px_160px_24px_24px] sm:p-[11px] sm:last:col-span-2 lg:max-w-none lg:last:col-span-1" style={{ background: `linear-gradient(180deg, #fff 60%, #fbfffb) padding-box, ${item.edge} border-box`, boxShadow: item.shadow }}>
            <div className="relative aspect-[296/330] overflow-hidden rounded-t-full sm:[border-radius:50%_50%_0_0/150px_150px_0_0]"><Image src={`/Home/${item.image}`} alt={`${item.metal} diamond jewellery`} fill sizes="(max-width: 640px) 48vw, (max-width: 1024px) 44vw, (max-width: 1280px) 30vw, 380px" className="object-cover" /></div>
            <div className="relative flex min-h-[190px] flex-1 flex-col items-center px-1 pb-4 pt-7 sm:min-h-[212px] sm:px-3 sm:pb-6 sm:pt-10">
              <span className="absolute left-1/2 top-0 size-[36px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_3px_8px_rgba(0,0,0,0.16)] sm:size-[50px]" style={{ background: item.swatch }} />
              <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-xl font-semibold leading-none text-[#252525] sm:text-[27px]">{item.name}</h3>
              <p className="mx-auto mt-3 max-w-[245px] text-[11px] leading-[1.4] text-[#676767]">{item.copy}</p>
              <Link href={`/collection?material=${encodeURIComponent(item.metal)}`} className="mt-auto inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full px-3 py-2 text-[10px] font-semibold text-white transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34] sm:min-w-[140px] sm:gap-3 sm:px-5 sm:text-[11px]" style={{ background: item.button }}>{item.metal}<ArrowRight size={14} /></Link>
            </div>
          </article>)}
        </div>
      </Container>
    </section>

    <section aria-labelledby="diamond-comparison-heading" className="relative overflow-hidden bg-[#faf8f3] pb-[55vw] md:pb-0">
      <div className="absolute inset-x-0 bottom-0 h-[55vw] md:inset-0 md:h-full">
        <Image src={diamondComparisonBanner} alt="Rough natural diamond and polished round diamond on sunlit stone" fill sizes="100vw" className="object-cover object-right md:object-center" />
      </div>
      <Container className="relative z-10 py-8 md:py-9 lg:py-10">
        <div className="max-w-[460px] text-[#214532] md:w-[45%]">
          <h2 id="diamond-comparison-heading" className="font-[family-name:var(--font-cormorant-garamond)] text-[38px] font-semibold leading-[0.95] sm:text-[44px] lg:text-[50px]">Natural or Lab-Grown<br />Diamonds?</h2>
          <p className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-base font-semibold italic text-[#66665e] lg:text-lg">Different origins. The same timeless brilliance.</p>
          <ul className="mt-5 grid max-w-[400px] grid-cols-4">
            {[
              { icon: Gem, first: "Real", second: "Brilliance" },
              { icon: Tag, first: "Better", second: "Value" },
              { icon: Leaf, first: "More", second: "Sustainable" },
              { icon: Heart, first: "Your Personal", second: "Choice" },
            ].map(({ icon: Icon, first, second }) => (
              <li key={first} className="relative flex flex-col items-center px-1 text-center after:absolute after:right-0 after:top-5 after:h-7 after:w-px after:bg-[#ded9cd] last:after:hidden">
                <span className="mb-2 grid size-9 place-items-center rounded-full border border-[#dce5df] bg-[#f4f8f5]/90"><Icon size={15} strokeWidth={1.3} aria-hidden="true" /></span>
                <span className="text-[10px] leading-tight text-[#454540]">{first}<br />{second}</span>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-4 rounded-full bg-[#214E34] px-6 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#173d28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34]">Explore the Difference<ArrowRight size={16} strokeWidth={1.5} /></Link>
        </div>
      </Container>
    </section>

    <section className="py-14 sm:py-20">
      <SectionHeading title="Best Seller" subtitle="Explore timeless pieces chosen by our jewellery lovers." />
      <HomeBestSellerCarousel items={bestSellers} />
    </section>

    <HomeTestimonialsAnimated reviews={reviews} />

    <section className="relative flex min-h-[260px] items-center sm:min-h-[340px]">
      <Image src={stayInTouchBanner} alt="Diamond ring from Miraya Diamonds" fill sizes="100vw" className="object-cover" />
      <Container className="relative z-10 py-8 text-white sm:py-10">
        <div className="flex max-w-[290px] flex-col items-start sm:max-w-[390px]">
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-[30px] font-semibold uppercase leading-none sm:text-[40px]">Stay in Touch</h2>
          <p className="mt-3 text-xs leading-tight sm:text-sm">Get exclusive updates,<br />new launches and special offers.</p>
          <div className="mt-10 flex min-h-11 w-full max-w-[280px] items-center rounded-full bg-white p-1 pl-5 text-[#555] focus-within:ring-2 focus-within:ring-white/60 focus-within:ring-offset-2 focus-within:ring-offset-[#214E34] sm:max-w-[300px]">
            <input type="email" aria-label="Your email address" autoComplete="email" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent pr-3 text-xs text-[#353333] outline-none placeholder:text-[#888]" />
            <Link href="/contact" aria-label="Get in touch" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#214E34] text-white transition-colors hover:bg-[#173d28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214E34]">
              <ArrowRight size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>
    </section>

    <section className="py-10 sm:py-14 lg:py-16">
      <Container className="grid items-start gap-8 md:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[350px] overflow-hidden rounded-lg md:max-w-none">
          <Image src="/Home/FAQ.png" alt="Diamond ring worn on a hand beside a lace sleeve" fill sizes="(max-width: 767px) 350px, (max-width: 1280px) 28vw, 355px" className="object-cover" />
        </div>
        <div className="min-w-0 md:pt-6 lg:pt-8">
          <SectionHeading title="Frequently Asked Question" subtitle="Know the answer for your questions" />
          <div>
            {faqs.map((item, index) => (
              <details key={item.question} name="home-faq" className="group border-b border-[#898989]">
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214E34] sm:text-sm [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-2"><span>{index + 1}.</span><span>{item.question}</span></span>
                  <ChevronDown size={14} className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="pb-5 pl-5 pr-7 text-xs leading-relaxed text-[#666] sm:text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  </main>;
}
