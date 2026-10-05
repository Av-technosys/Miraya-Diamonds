import { PrivacyHero } from "@/components/privacy-policy/privacy-hero";
import { PrivacyContent } from "@/components/privacy-policy/privacy-content";
import { PrivacySidebar } from "@/components/privacy-policy/privacy-sidebar";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#FCF9F8] min-h-screen">
      <PrivacyHero />
      <div className="w-full max-w-[1440px] mx-auto px-3 md:px-[100px] pb-6 md:pb-10 -mt-[12px] md:-mt-[114px] relative z-20 flex flex-col lg:flex-row gap-3 md:gap-[18px] items-start">
        
        {/* Left Content Area */}
        <div className="order-2 lg:order-none w-full lg:w-[800px] flex flex-col shrink-0">
          <PrivacyContent />
        </div>

        {/* Right Sidebar (Desktop) / Mixed ordering (Mobile) */}
        <div className="contents lg:flex lg:flex-col lg:w-[422px] lg:gap-[20px] lg:sticky lg:top-[100px] lg:h-fit lg:pb-10">
          <PrivacySidebar />
        </div>
      </div>
    </main>
  );
}
