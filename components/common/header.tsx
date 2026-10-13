"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, Heart, User, ShoppingBag, ChevronDown, ChevronUp, Menu, 
  ChevronRight, LogOut, Circle, Activity, Square, Diamond, Gem, Gift, Crown,
  Sparkles
} from "lucide-react";
import { Container } from "../common/container";
import { collectionMenuHref, collectionNavHref } from "@/lib/collection-navigation";

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
  "Rings": <Circle size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Ear Rings": <Activity size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Bracelet": <Square size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Bangles": <Circle size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Pendant": <Diamond size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Necklace": <Gem size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Gifting": <Gift size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Bridal": <Crown size={20} strokeWidth={1.5} className="text-[#214E34]" />,
  "Collection": <Heart size={20} strokeWidth={1.5} className="text-[#214E34]" />,
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
      className={`${isMobileHeader ? "h-[34px]" : "h-11 md:h-12 lg:h-[52px]"} w-auto object-contain shrink-0 transition-all`}
    />
    <Image
      src="/Header_logo_mb.png"
      alt="Miraya Diamonds Text"
      width={160}
      height={45}
      priority
      className={`${isMobileHeader ? "h-6" : "h-8 md:h-9 lg:h-[36px]"} w-auto object-contain shrink-0 transition-all`}
    />
  </Link>
);

export function Header() {
  const isHome = usePathname() === "/";
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  return (
    <>
      <header className={`relative z-40 w-full ${isHome ? "bg-white xl:bg-[#214E34]" : "bg-white"}`}>
        {/* Top Bar */}
        <div className="py-4">
          <Container>
            {/* Mobile Layout */}
            <div className="flex items-center justify-between xl:hidden">
              <div className="flex items-center gap-4 text-[#214E34]">
                <button 
                  className="hover:text-[#214E34]/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={24} strokeWidth={2} />
                </button>
                <button className="hover:text-[#214E34]/80 transition-colors">
                  <Search size={22} strokeWidth={2} />
                </button>
              </div>

              <Logo isMobileHeader className="flex-1 justify-center" />

              <div className="flex items-center gap-4 text-[#214E34]">
                <button className="hover:text-[#214E34]/80 transition-colors">
                  <Heart size={22} strokeWidth={2} />
                </button>
                <button className="hover:text-[#214E34]/80 transition-colors">
                  <ShoppingBag size={22} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden xl:flex items-center justify-between gap-8">
              {/* Logo */}
              <Logo className="shrink-0" />

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for rings"
                    className="w-full rounded-full border border-[#214E34] py-2.5 pl-5 pr-12 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#214E34] placeholder:text-gray-400 bg-white"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#214E34] hover:text-[#214E34]/80 transition-colors">
                    <Search size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Icons */}
              <div className={`flex shrink-0 items-center gap-6 ${isHome ? "text-white" : "text-[#214E34]"}`}>
                <button className="hover:text-[#214E34]/80 transition-colors">
                  <Heart size={22} strokeWidth={1.5} />
                </button>
                <Link
                  href="/dashboard"
                  aria-label="Go to dashboard"
                  className="hover:text-[#214E34]/80 transition-colors"
                >
                  <User size={22} strokeWidth={1.5} />
                </Link>
                <button className="hover:text-[#214E34]/80 transition-colors">
                  <ShoppingBag size={22} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </Container>
        </div>

        <div className={`hidden w-full text-white xl:block ${isHome ? "bg-[#153b29]" : "bg-[#214E34]"}`}>
          <Container>
            <div className="relative w-full" onMouseLeave={() => setActiveMenu(null)}>
              <nav className="flex items-center justify-center gap-6 py-3">
                {NAV_LINKS.map((link) => {
                  const isActive = activeMenu === link;
                  const hasDropdown = !!MEGA_MENU_DATA[link];

                  return (
                    <div key={link} className="relative">
                      <Link
                        href={collectionNavHref(link)}
                        className={`flex items-center gap-1 px-4 py-1.5 text-sm text-white transition-colors hover:text-white/90 ${isActive ? "font-semibold" : "font-medium"}`}
                        onMouseEnter={() => hasDropdown ? setActiveMenu(link) : setActiveMenu(null)}
                        onFocus={() => hasDropdown && setActiveMenu(link)}
                        onClick={() => setActiveMenu(null)}
                      >
                        {link}
                        {isActive ? (
                          <ChevronUp size={16} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={16} strokeWidth={2} />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Desktop Mega Menu Dropdown */}
              {activeMenu && MEGA_MENU_DATA[activeMenu] && (
                <div className="absolute left-0 top-full z-50 w-full overflow-hidden rounded-b-2xl border border-t-0 border-[#eadfdf] bg-white shadow-[0_18px_32px_rgba(42,29,29,0.13)]">
                  <div className="grid grid-cols-5 gap-10 px-10 py-10">
                    {[[0], [1, 2], [3], [4], [5, 6]].map((group, index) => (
                      <div key={index} className="space-y-7">
                        {group.map((columnIndex) => {
                          const column = MEGA_MENU_DATA[activeMenu][columnIndex];
                          return (
                            <div key={column.title}>
                              <h3 className="mb-4 border-b border-[#efe2e2] pb-2 text-sm font-bold tracking-wide text-[#214E34]">{column.title}</h3>
                              <ul className="space-y-3">
                                {column.items.map((item) => (
                                  <li key={item}><Link href={collectionMenuHref(activeMenu, column.title, item)} onClick={() => setActiveMenu(null)} className="text-sm text-[#555] transition-colors hover:text-[#214E34]">{item}</Link></li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
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
          className="fixed inset-0 bg-black/50 z-50 xl:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-white z-50 transform transition-transform duration-300 xl:hidden flex flex-col ${
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
              <button className="flex-1 py-2 bg-white text-[#214E34] rounded-full text-sm font-medium hover:bg-white/90 transition-colors">Sign In</button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {NAV_LINKS.map(link => {
            const hasDropdown = !!MEGA_MENU_DATA[link];
            const isExpanded = expandedMobileMenu === link;

            return (
              <div key={link} className="border-b border-gray-100 last:border-0 flex flex-col">
                <div className="flex items-center justify-between bg-white hover:bg-gray-50">
                  <Link href={collectionNavHref(link)} onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileMenu(null); }} className="flex min-w-0 flex-1 items-center gap-4 px-6 py-4">
                    {MOBILE_MENU_ICONS[link] || <Circle size={20} strokeWidth={1.5} className="text-[#214E34]" />}
                    <span className="text-[15px] text-gray-800 font-serif tracking-wide">{link}</span>
                  </Link>
                  {hasDropdown ? (
                    <button type="button" aria-label={`${isExpanded ? "Collapse" : "Expand"} ${link} menu`} aria-expanded={isExpanded} onClick={() => setExpandedMobileMenu(isExpanded ? null : link)} className="grid size-12 shrink-0 place-items-center text-[#214E34]">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                  ) : null}
                </div>

                {/* Mobile Accordion Dropdown Content */}
                {isExpanded && hasDropdown && (
                  <div className="flex flex-col gap-6 border-t border-gray-100 bg-white px-6 py-4 shadow-[inset_0_6px_10px_rgba(42,29,29,0.04)]">
                    {MEGA_MENU_DATA[link].map(column => (
                      <div key={column.title}>
                        <h4 className="text-xs font-bold text-[#214E34] mb-3 uppercase tracking-wide">
                          {column.title}
                        </h4>
                        <ul className="flex flex-col gap-2 pl-1">
                          {column.items.map(item => (
                            <li key={item}>
                              <Link 
                                href={collectionMenuHref(link, column.title, item)}
                                onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileMenu(null); }}
                                className="text-[14px] text-gray-600 py-1 block hover:text-[#214E34] transition-colors"
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
