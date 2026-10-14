import { Award, Gem, LockKeyhole, RefreshCw } from "lucide-react";
import { Container } from "@/components/common/container";
import { AccountSidebar } from "./sidebar";
import { AccountBreadcrumbs } from "./account-breadcrumbs";

const trustItems = [
  { title: "100% Certified", description: "IGI, GIA & BIS Hallmarked Jewellery", icon: Award },
  { title: "Insured Delivery", description: "Complimentary transit insurance", icon: LockKeyhole },
  { title: "Easy Returns", description: "15-day return policy, no questions", icon: RefreshCw },
  { title: "Ethical Craft", description: "Responsibly sourced heirloom gold", icon: Gem },
];

export function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#EDF0EE] pb-10 font-[family-name:var(--font-inter)] sm:pb-14">
        <Container>
          <AccountBreadcrumbs />
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-7">
            <AccountSidebar />
            <main className="w-full min-w-0 flex-1">{children}</main>
          </div>
        </Container>
      </div>
      <footer className="bg-white text-[#214E34]">
        <Container className="pb-7 pt-10 sm:pb-10 sm:pt-14">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
            {trustItems.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className="grid size-11 place-items-center rounded-full bg-[#F7FFF7]"><Icon size={20} strokeWidth={1.7} /></span>
                <h2 className="mt-4 font-serif text-xl font-medium text-[#454545] sm:text-[23px]">{title}</h2>
                <p className="mt-1 text-[10px] leading-relaxed sm:text-xs">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#F7FFF7] pt-7 text-center sm:mt-14 md:flex-row md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span className="font-serif text-[23px] font-semibold">Miraya Diamonds</span>
              <span className="hidden h-3 w-px bg-[#214E34]/50 sm:block" />
              <span className="text-[10px]">Modern Indian High Jewellery</span>
            </div>
            <p className="text-[10px]">© {new Date().getFullYear()} Miraya Diamonds Pvt Ltd. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </>
  );
}
