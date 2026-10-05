import React from 'react';

const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as your name, contact details, shipping address, and payment information, as well as information collected automatically through cookies and similar technologies."
  },
  {
    id: 2,
    title: "How We Use Your Information",
    content: "We use your information to process orders, provide customer support, improve our services, personalize your shopping experience and keep you updated about our collections, offers and events."
  },
  {
    id: 3,
    title: "Sharing of Information",
    content: "We do not sell your personal information. We may share your information with trusted service providers (such as payment gateways, logistics partners and marketing platforms) only to deliver our services and improve your experience."
  },
  {
    id: 4,
    title: "Cookies and Tracking Technologies",
    content: "We use cookies and similar technologies to enhance your browsing experience, analyze website traffic and personalize content. You can manage your cookie preferences through your browser settings."
  },
  {
    id: 5,
    title: "Data Security",
    content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration or destruction."
  },
  {
    id: 6,
    title: "Your Rights",
    content: "You have the right to access, update or delete your personal information. You can also opt out of marketing communications at any time."
  },
  {
    id: 7,
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date."
  },
  {
    id: 8,
    title: "Contact Us",
    content: "If you have any questions or concerns about this Privacy Policy, please contact us at support@mirayadiamonds.com.",
    isContact: true
  }
];

export function PrivacyContent() {
  return (
    <div className="w-full bg-white rounded-[16px] border-[1px] border-[#F0EDEB] overflow-hidden">
      
      {/* Date - grey bg strip attached to top */}
      <div className="bg-[#F8F6F5] px-4 md:px-[41px] py-[8px]">
        <span className="font-[family-name:var(--font-jakarta)] font-medium text-[12px] leading-[16px] tracking-[0.3px] text-[#757575]">
          Last Updated: <span className="text-[#171717] font-semibold">01 September 2026</span>
        </span>
      </div>

      {/* Main content with padding */}
      <div className="px-4 md:px-[41px] pb-5 md:pb-[41px] pt-4 md:pt-6">
        {/* Intro */}
        <div id="introduction" className="pb-5 border-b-[1px] border-[#F0EDEB] scroll-mt-24">
          <p className="font-sans font-normal text-[14px] leading-[22.75px] text-[#6F6A68]">
            At Miraya Diamonds, we value your privacy. This Privacy Policy explains how we collect, use, disclose and protect your personal information when you visit our website, make a purchase, or interact with our services.
          </p>
        </div>

        {/* Sections List */}
        <div className="flex flex-col pt-5">
          {POLICY_SECTIONS.map((section, index) => (
            <div 
              key={section.id} 
              id={section.title.toLowerCase().replace(/ /g, '-')}
              className={`flex items-start gap-4 md:gap-[20px] scroll-mt-24 ${index !== 0 ? "pt-[25px] border-t-[1px] border-[#F0EDEB]" : ""} pb-[25px]`}
            >
            {/* Circle Number */}
            <div className="w-[36px] h-[36px] rounded-full bg-white border-[1px] border-[#E8E4E2] flex items-center justify-center shrink-0">
              <span className="font-sans font-semibold text-[14px] text-[#CB485E]">{section.id}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 w-full pt-[2px]">
              <h2 className="font-serif font-medium text-[20px] md:text-[24px] leading-[1.2] md:leading-[32px] text-[#171717]">
                {section.title}
              </h2>
              {section.isContact ? (
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                  If you have any questions or concerns about this Privacy Policy, please contact us at <br className="hidden md:block"/>
                  <a href="mailto:support@mirayadiamonds.com" className="font-medium text-[#CB485E]">support@mirayadiamonds.com</a>.
                </p>
              ) : (
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#6F6A68]">
                  {section.content}
                </p>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
