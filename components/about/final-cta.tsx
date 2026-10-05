import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="w-full bg-[#FBEFF3]/70 py-[40px] md:py-[60px] px-4 md:px-[216px] flex items-center justify-center">
      <div 
        className="w-full max-w-[1003px] bg-[#FFFDFC] border-[1px] border-[#FCE9EC] md:border-[1.05px] rounded-[16px] md:rounded-[25.32px] flex flex-col items-center text-center pt-[40px] md:pt-[73px] pb-[40px] md:pb-[67px] px-[20px] md:px-[67px]"
        style={{ boxShadow: "0px 21.1px 47.47px -15.82px rgba(201, 111, 145, 0.12)" }}
      >
        {/* Label */}
        <span className="font-sans font-medium text-[10px] md:text-[12.66px] leading-[16.88px] tracking-[2px] md:tracking-[3.16px] uppercase text-[#CB485E] mb-[8px]">
          YOUR JOURNEY BEGINS HERE
        </span>
        
        {/* Heading */}
        <h2 className="font-serif font-medium md:font-bold text-[28px] md:text-[40px] leading-[36px] md:leading-[50.64px] tracking-[-0.51px] text-[#111827] md:text-[#454545] mb-[12px] md:mb-[15px]">
          Find Something That Feels Like You
        </h2>
        
        {/* Description */}
        <p className="font-sans font-light md:font-normal text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#9CA3AF] md:text-[#757575] max-w-[507px] mb-[20px] md:mb-[25px]">
          Explore jewellery designed to celebrate your story and your most cherished moments.
        </p>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-[8px] md:gap-[16.88px] pt-[8px] md:pt-[16px] w-full max-w-[340px] md:max-w-none">
          <Link
            href="/collections"
            className="flex-1 md:flex-none inline-flex items-center justify-center rounded-full bg-[#CB485E] text-white py-[12px] md:py-[16.88px] px-[16px] md:px-[33.76px]"
            style={{ boxShadow: "0px 21.1px 47.47px -15.82px rgba(201, 111, 145, 0.12)" }}
          >
            <span className="font-sans font-medium text-[13px] md:text-[14px] leading-[16px] md:leading-[16.88px]">
              Explore Jewellary
            </span>
          </Link>
          
          <Link
            href="/contact"
            className="flex-1 md:flex-none inline-flex items-center justify-center rounded-full border-[1.05px] border-[#D1D5DB] md:border-[#454545] text-[#111827] md:text-[#454545] py-[12px] md:py-[16.88px] px-[16px] md:px-[33.76px]"
          >
            <span className="font-sans font-medium text-[13px] md:text-[14px] leading-[16px] md:leading-[16.88px]">
              Contact Us
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
