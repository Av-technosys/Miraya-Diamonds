import { AccountSidebar } from "@/components/account/sidebar";
import { Container } from "@/components/common/container";
import { Award, Gem, LockKeyhole, RefreshCw } from "lucide-react";
import { AccountBreadcrumbs } from "./account-breadcrumbs";

const trustItems = [
  {
    title: "100% Certified",
    description: "IGI, GIA & BIS Hallmarked Jewellery",
    icon: Award,
  },
  {
    title: "Insured Delivery",
    description: "Complimentary transit insurance",
    icon: LockKeyhole,
  },
  {
    title: "Easy Returns",
    description: "15-day return policy, no questions",
    icon: RefreshCw,
  },
  {
    title: "Ethical Craft",
    description: "Responsibly sourced heirloom gold",
    icon: Gem,
  },
];

export function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-[#F0EDED] pb-5 md:pb-20">
        <Container>
          <AccountBreadcrumbs />

          <div className="flex flex-col items-start gap-4 lg:flex-row lg:gap-8">
            <AccountSidebar />
            <div className="w-full min-w-0 flex-1">{children}</div>
          </div>
        </Container>
      </div>

      <section className="bg-[#F0EDED] pb-5 md:bg-white md:py-[62px]">
        <Container>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex min-h-[104px] flex-col items-center rounded-lg bg-white px-2 py-4 text-center shadow-sm md:min-h-0 md:rounded-none md:bg-transparent md:px-0 md:py-0 md:shadow-none"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FCE3E8] text-[#CB485E] md:h-[46px] md:w-[46px]">
                    <Icon size={18} strokeWidth={1.8} className="md:h-5 md:w-5" />
                  </div>
                  <h3 className="mt-3 font-serif text-[16px] font-medium leading-none text-[#3F3A39] md:mt-4 md:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[120px] font-sans text-[9px] leading-[12px] text-[#D44A62] md:max-w-none md:text-[11px] md:leading-none">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-[64px] hidden border-t border-[#F1D6DC] pt-8 md:block">
            <div className="flex flex-col gap-4 text-[#D44A62] md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
                <span className="font-serif text-[20px] font-bold leading-none">
                  Miraya Diamonds
                </span>
                <span className="hidden h-4 w-px bg-[#D44A62] md:block" />
                <span className="font-sans text-[11px] leading-none">
                  Modern Indian High Jewellery
                </span>
              </div>
              <p className="font-sans text-[11px] leading-none">
                © 2025 Miraya Diamonds Pvt Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
