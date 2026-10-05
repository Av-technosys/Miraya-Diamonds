"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2X2, UserRound, ShoppingBag, MapPin, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Saved Address", href: "/dashboard/address", icon: MapPin },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full shrink-0 flex flex-col gap-4 lg:max-w-[280px] lg:gap-6">
      {/* User Card */}
      <div className="w-full bg-gradient-to-br from-[#CB485E] to-[#FF9193] rounded-lg p-4 text-[#FFC7CC] shadow-sm relative overflow-hidden lg:rounded-2xl lg:p-6">
        <div className="absolute right-4 top-4 h-[22px] w-[38px] opacity-70">
          <Image
            src="/Images/starsProfile.png"
            alt=""
            fill
            sizes="38px"
            className="object-contain"
          />
        </div>
        <p className="text-xs font-medium mb-1 tracking-widest uppercase">HELLO</p>
        <h3 className="text-2xl font-bold font-serif mb-1 text-white">John Doe</h3>
        <p className="text-sm">Privé Gold Tier Member</p>
      </div>

      {/* Nav Menu */}
      <div className="bg-transparent rounded-2xl shadow-none flex flex-col justify-between lg:min-h-[400px] lg:bg-white lg:p-4 lg:shadow-sm">
        <div className="grid grid-cols-4 gap-2 min-[380px]:gap-3 lg:flex lg:flex-col lg:gap-1.5">
          {NAV_ITEMS.map((item) => {
            /* exact match for /dashboard, prefix match for sub-pages */
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl border px-1 py-2.5 text-center text-[11px] font-medium leading-[12px] shadow-[0_3px_12px_rgba(0,0,0,0.08)] transition-colors min-[380px]:min-h-[78px] min-[380px]:px-1.5 min-[380px]:py-3 min-[380px]:text-[12px] min-[380px]:leading-[13px] lg:min-h-0 lg:flex-row lg:justify-start lg:gap-3 lg:rounded-xl lg:border-0 lg:px-4 lg:py-2.5 lg:text-left lg:text-[15px] lg:leading-normal lg:shadow-none ${
                  isActive 
                    ? "border-[#FFC7CC] bg-[#FFF0F2] text-[#CB485E]" 
                    : "border-white bg-white text-[#3F3A3A] hover:bg-gray-50 lg:border-0 lg:bg-transparent lg:text-gray-500"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full lg:h-5 lg:w-5 lg:rounded-none ${isActive ? "bg-white lg:bg-transparent" : ""}`}>
                  <Icon size={16} strokeWidth={2} className="h-4 w-4 lg:h-5 lg:w-5" />
                </span>
                <span className="max-w-[68px] lg:max-w-none">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden pt-4 mt-4 border-t border-gray-100 lg:block">
          <button className="flex items-center gap-4 px-4 py-3.5 w-full text-left font-bold text-[#D43F53] hover:bg-gray-50 rounded-xl transition-colors">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
