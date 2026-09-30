import Image from "next/image";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag, ChevronDown, Menu } from "lucide-react";
import { Container } from "./container";

const NAV_LINKS = [
  "Rings",
  "Ear Rings",
  "Bracelet",
  "Bangles",
  "Pendant",
  "Necklace",
  "Gifting",
  "Bridal",
  "Collection",
];

export function Header() {
  return (
    <header className="w-full bg-white">
      {/* Top Bar */}
      <div className="py-4">
        <Container>
          {/* Mobile Layout */}
          <div className="flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-4 text-[#CB485E]">
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <Menu size={24} strokeWidth={2} />
              </button>
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <Search size={22} strokeWidth={2} />
              </button>
            </div>

            <Link href="/" className="flex-1 flex justify-center">
              <Image
                src="/Header_logo.png"
                alt="Miraya Diamonds"
                width={160}
                height={48}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-4 text-[#CB485E]">
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <Heart size={22} strokeWidth={2} />
              </button>
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <ShoppingBag size={22} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/Header_logo.png"
                alt="Miraya Diamonds"
                width={200}
                height={60}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for rings"
                  className="w-full rounded-full border border-[#CB485E] py-2.5 pl-5 pr-12 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#CB485E] placeholder:text-gray-400 bg-white"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CB485E] hover:text-[#CB485E]/80 transition-colors">
                  <Search size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 text-[#CB485E] shrink-0">
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <Heart size={22} strokeWidth={1.5} />
              </button>
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <User size={22} strokeWidth={1.5} />
              </button>
              <button className="hover:text-[#CB485E]/80 transition-colors">
                <ShoppingBag size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation Bar (Desktop Only) */}
      <div className="hidden lg:block bg-[#CB485E] text-white w-full">
        <Container>
          <nav className="flex items-center justify-center gap-8 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(" ", "-")}`}
                className="flex items-center gap-1 text-sm font-medium hover:text-white/80 transition-colors"
              >
                {link}
                <ChevronDown size={16} strokeWidth={2} />
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
