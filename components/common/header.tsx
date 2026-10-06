"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, Heart, User, ShoppingBag, ChevronDown, ChevronUp, Menu, 
  ChevronRight, LogOut, Circle, Activity, Square, Diamond, Gem, Gift, Crown,
  Sparkles
} from "lucide-react";
import { Container } from "../common/container";

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

const MOBILE_MENU_ICONS: Record<string, ReactNode> = {
  "Rings": <Circle size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Ear Rings": <Activity size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Bracelet": <Square size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Bangles": <Circle size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Pendant": <Diamond size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Necklace": <Gem size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Gifting": <Gift size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Bridal": <Crown size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
  "Collection": <Heart size={20} strokeWidth={1.5} className="text-[#CB485E]" />,
};

type MegaMenuColumn = {
  title: string;
  items: string[];
};

// Reusable placeholder data for all categories to ensure they "work"
const DEFAULT_MENU_DATA: MegaMenuColumn[] = [
  { title: "FEATURED", items: ["All Items", "New Arrival", "Best Seller", "Most Gifted"] },
  { title: "STYLE", items: ["Cocktail", "Couple Bands", "Modern", "Open", "Vanki"] },
  { title: "OCCASION", items: ["Everyday", "Workwear", "Party", "Proposal", "Engagement"] },
  { title: "METAL & STONE", items: ["Diamond", "Gemstone", "Pearl", "Gold", "Plain Gold", "Rose Gold", "Silver", "Solitaire"] },
  { title: "PRICE", items: ["Under 10k", "Under 15k", "Under 20k", "Under 30k", "Under 50k", "Under 90k", "Above 90k"] },
  { title: "KARATAGE", items: ["9kt", "14kt", "18kt", "22kt"] },
  { title: "SHOP FOR", items: ["Women", "Men", "Unisex"] },
];

const MEGA_MENU_DATA: Record<string, MegaMenuColumn[]> = {
  "Rings": [
    { title: "FEATURED", items: ["All Rings", "New Arrival", "Best Seller", "Most Gifted"] },
    { title: "STYLE", items: ["Cocktail", "Couple Bands", "Modern", "Open", "Vanki"] },
    { title: "OCCASION", items: ["Everyday", "Workwear", "Party", "Proposal", "Engagement"] },
    { title: "METAL & STONE", items: ["Diamond", "Gemstone", "Pearl", "Gold", "Plain Gold", "Rose Gold", "Silver", "Solitaire"] },
    { title: "PRICE", items: ["Under 10k", "Under 15k", "Under 20k", "Under 30k", "Under 50k", "Under 90k", "Above 90k"] },
    { title: "KARATAGE", items: ["9kt", "14kt", "18kt", "22kt"] },
    { title: "SHOP FOR", items: ["Women", "Men", "Unisex"] },
  ],
  "Ear Rings": DEFAULT_MENU_DATA,
  "Bracelet": DEFAULT_MENU_DATA,
  "Bangles": DEFAULT_MENU_DATA,
  "Pendant": DEFAULT_MENU_DATA,
  "Necklace": DEFAULT_MENU_DATA,
  "Gifting": DEFAULT_MENU_DATA,
  "Bridal": DEFAULT_MENU_DATA,
  "Collection": DEFAULT_MENU_DATA,
};

const Logo = ({ className = "", isMobileHeader = false }: { className?: string; isMobileHeader?: boolean }) => (
  <Link href="/" className={`flex items-center gap-2 md:gap-3 ${className}`}>
    <Image
      src="/Header_logo.png"
      alt="Miraya Diamonds Icon"
      width={60}
      height={60}
      priority
      className={`${isMobileHeader ? "h-10" : "h-12 md:h-14 lg:h-[60px]"} w-auto object-contain shrink-0 transition-all`}
    />
    <Image
      src="/Header_logo_mb.png"
      alt="Miraya Diamonds Text"
      width={160}
      height={45}
      priority
      className={`${isMobileHeader ? "h-7" : "h-9 md:h-10 lg:h-[42px]"} w-auto object-contain shrink-0 transition-all`}
    />
  </Link>
);

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  return (
    <>
      <header className="w-full bg-white relative z-40">
        {/* Top Bar */}
        <div className="py-4">
          <Container>
            {/* Mobile Layout */}
            <div className="flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-4 text-[#CB485E]">
                <button 
                  className="hover:text-[#CB485E]/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={24} strokeWidth={2} />
                </button>
                <button className="hover:text-[#CB485E]/80 transition-colors">
                  <Search size={22} strokeWidth={2} />
                </button>
              </div>

              <Logo isMobileHeader className="flex-1 justify-center" />

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
              <Logo className="shrink-0" />

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
                <Link
                  href="/dashboard"
                  aria-label="Go to dashboard"
                  className="hover:text-[#CB485E]/80 transition-colors"
                >
                  <User size={22} strokeWidth={1.5} />
                </Link>
                <button className="hover:text-[#CB485E]/80 transition-colors">
                  <ShoppingBag size={22} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </Container>
        </div>

        <div className="hidden lg:block bg-[#CB485E] text-white w-full">
          <Container>
            <div className="relative w-full" onMouseLeave={() => setActiveMenu(null)}>
              <nav className="flex items-center justify-center gap-6 py-3">
                {NAV_LINKS.map((link) => {
                  const isActive = activeMenu === link;
                  const hasDropdown = !!MEGA_MENU_DATA[link];

                  return (
                    <div key={link} className="relative">
                      <button
                        type="button"
                        className={`flex items-center gap-1 text-sm font-medium transition-colors px-4 py-1.5 rounded-full ${
                          isActive
                            ? "bg-white text-[#CB485E]"
                            : "text-white hover:text-white/90"
                        }`}
                        onMouseEnter={() => hasDropdown ? setActiveMenu(link) : setActiveMenu(null)}
                      >
                        {link}
                        {isActive ? (
                          <ChevronUp size={16} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={16} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </nav>

              {/* Desktop Mega Menu Dropdown */}
              {activeMenu && MEGA_MENU_DATA[activeMenu] && (
                <div className="absolute top-[100%] left-0 w-full bg-[#FCF9F8] shadow-lg rounded-b-xl z-50 overflow-hidden border border-gray-100 border-t-0">
                  <div className="flex justify-between py-10 px-8 gap-8">
                    {MEGA_MENU_DATA[activeMenu].map((column) => (
                      <div key={column.title} className="flex flex-col flex-1">
                        <h3 className="text-[#CB485E] font-bold text-sm tracking-wide mb-4 pb-2 border-b border-[#F0D5D9]">
                          {column.title}
                        </h3>
                        <ul className="flex flex-col gap-3">
                          {column.items.map((item) => (
                            <li key={item}>
                              <Link href="#" className="text-gray-600 hover:text-[#CB485E] text-sm transition-colors">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-white z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col items-center border-b border-gray-100 relative shrink-0">
          <Logo className="justify-center mb-6 w-full" />
          
          <div className="w-full bg-[#E36675] rounded-xl p-5 text-white shadow-sm relative overflow-hidden">
            <div className="absolute top-3 right-3 text-white/30">
              <Sparkles size={32} />
            </div>
            <p className="text-[11px] font-semibold opacity-90 mb-1 tracking-wider uppercase">Welcome To</p>
            <h3 className="text-xl font-medium mb-1.5 font-serif">Miraya Diamonds</h3>
            <p className="text-xs opacity-90 mb-5 leading-relaxed">Sign in to unlock personalized benefits and a seamless jewellery experience.</p>
            <div className="flex gap-3">
              <button className="flex-1 py-2 border border-white text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors">Sign Up</button>
              <button className="flex-1 py-2 bg-white text-[#CB485E] rounded-full text-sm font-medium hover:bg-white/90 transition-colors">Sign In</button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {NAV_LINKS.map(link => {
            const hasDropdown = !!MEGA_MENU_DATA[link];
            const isExpanded = expandedMobileMenu === link;

            return (
              <div key={link} className="border-b border-gray-100 last:border-0 flex flex-col">
                <button 
                  type="button"
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors w-full text-left bg-white"
                  onClick={() => {
                    if (hasDropdown) {
                      setExpandedMobileMenu(isExpanded ? null : link);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    {MOBILE_MENU_ICONS[link] || <Circle size={20} strokeWidth={1.5} className="text-[#CB485E]" />}
                    <span className="text-[15px] text-gray-800 font-serif tracking-wide">{link}</span>
                  </div>
                  {hasDropdown ? (
                    isExpanded ? (
                      <ChevronDown size={18} className="text-[#CB485E] transition-transform" />
                    ) : (
                      <ChevronRight size={18} className="text-gray-400 transition-transform" />
                    )
                  ) : null}
                </button>

                {/* Mobile Accordion Dropdown Content */}
                {isExpanded && hasDropdown && (
                  <div className="bg-[#FCF9F8] border-t border-gray-50 px-6 py-4 flex flex-col gap-6">
                    {MEGA_MENU_DATA[link].map(column => (
                      <div key={column.title}>
                        <h4 className="text-xs font-bold text-[#CB485E] mb-3 uppercase tracking-wide">
                          {column.title}
                        </h4>
                        <ul className="flex flex-col gap-2 pl-1">
                          {column.items.map(item => (
                            <li key={item}>
                              <Link 
                                href="#" 
                                className="text-[14px] text-gray-600 py-1 block hover:text-[#CB485E] transition-colors"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-6 mt-auto shrink-0 border-t border-gray-50">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FFF0F2] text-[#D43F53] rounded-xl text-[15px] font-semibold hover:bg-[#FFE5E8] transition-colors">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
