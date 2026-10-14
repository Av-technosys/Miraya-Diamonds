"use client";

import Image from "next/image";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Send, UserRound } from "lucide-react";

const navItems = [
  { name: "My Enquiries", href: "/dashboard", icon: Send },
  { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[23%]">
      <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(120deg,#214E34_0%,rgb(33_78_52_/_70%)_100%)] px-6 py-6 text-[#cdbeb1] shadow-sm">
        <Image src="/Images/starsProfile.png" alt="" width={38} height={22} className="absolute right-3 top-3 h-auto w-9 opacity-70" />
        <p className="text-[11px] tracking-wide">HELLO</p>
        <h2 className="mt-1 break-words font-serif text-[29px] font-semibold leading-tight text-white">{user?.fullName || user?.username || "Your account"}</h2>
        <p className="mt-1 text-xs">Miraya Member</p>
      </div>
      <div className="flex flex-col rounded-xl bg-white p-3 shadow-[0_8px_20px_rgba(33,78,52,0.04)] lg:min-h-[440px]">
        <nav aria-label="Account navigation" className="grid grid-cols-2 gap-1 lg:flex lg:flex-col lg:gap-2">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[54px] items-center gap-3 rounded-xl px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#214E34] sm:px-4 sm:text-sm ${active ? "bg-[#F7FFF7] font-medium text-[#214E34]" : "text-[#6b6b6b] hover:bg-[#F7FFF7]"}`}><Icon size={17} strokeWidth={1.6} />{name}</Link>;
          })}
        </nav>
        <div className="mt-3 border-t border-[#eeeae6] pt-2 lg:mt-auto">
          <SignOutButton redirectUrl="/">
            <button type="button" className="flex min-h-12 w-full items-center gap-3 rounded-lg px-4 text-sm font-medium text-[#f00000] hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"><LogOut size={18} strokeWidth={1.7} />Log Out</button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}
