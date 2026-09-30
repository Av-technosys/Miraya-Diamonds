import Image from "next/image";
import { Building2, Video, Heart, Sparkles, Gift, Calendar, Clock, User, Phone, Mail, ArrowRight, Diamond } from "lucide-react";

export function ConsultationBooking() {
  return (
    <section className="w-full bg-white py-[60px] px-4 md:px-[100px]">
      <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-[30px]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="font-serif font-bold text-[32px] leading-[100%] tracking-[-0.02em] text-black text-center">
            Let’s Find the Perfect Piece, Together
          </h2>
          <p className="font-sans font-medium text-[14px] leading-[100%] tracking-[-0.02em] text-[#757575] text-center max-w-[629px] mt-2">
            Choose a private consultation and let our jewellery experts guide you through the pieces made for your moment.
          </p>
        </div>

        {/* Main Content (Form + Image) */}
        <div className="flex flex-col lg:flex-row gap-[58px] w-full">
          
          {/* Left Form Section */}
          <div className="flex flex-col gap-[8px] w-full lg:w-[643px] pt-1">
            
            {/* Experience Type Selection */}
            <div className="flex flex-col gap-[9px]">
              <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] leading-[20.25px] text-[#292524]">
                Choose Your Experience
              </label>
              <div className="flex flex-col sm:flex-row gap-[13.5px]">
                {/* In-Store Option */}
                <button className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#FCE9EC] border-[2.25px] border-[#CB485E] rounded-[8px] py-[18px]">
                  <Building2 className="w-[22px] h-[22px] text-[#CB485E]" strokeWidth={1.5} />
                  <span className="font-sans font-bold text-[14px] text-[#CB485E] uppercase tracking-[0.65px] mt-1">
                    In-Store
                  </span>
                  <span className="font-[family-name:var(--font-montserrat)] font-normal text-[12px] text-[#78716C]">
                    Visit our studio
                  </span>
                </button>
                {/* Virtual Option */}
                <button className="flex-1 flex flex-col items-center justify-center gap-1 bg-white border-[1.13px] border-[#E7E5E4] rounded-[8px] py-[18px]">
                  <Video className="w-[22px] h-[22px] text-[#CB485E]" strokeWidth={1.5} />
                  <span className="font-sans font-bold text-[14px] text-[#292524] uppercase tracking-[0.65px] mt-1">
                    Virtual
                  </span>
                  <span className="font-[family-name:var(--font-montserrat)] font-normal text-[12px] text-[#A8A29E] text-center">
                    Video consultation<br/>from anywhere
                  </span>
                </button>
              </div>
            </div>

            {/* Category Pill Filter */}
            <div className="flex flex-col gap-[9px] mt-2">
              <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] leading-[20.25px] text-[#292524]">
                What are you looking for?
              </label>
              <div className="flex flex-wrap gap-[9px]">
                <button className="flex items-center gap-[6px] bg-[#FCE9EC] border-[1.13px] border-[#C34E64] shadow-[0px_1.13px_2.25px_0px_rgba(0,0,0,0.05)] rounded-[8px] px-[12px] py-[9px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="10" r="4.5" stroke="#A43048" strokeWidth="1.18" />
                    <path d="M5.5 5.5L8 2L10.5 5.5H5.5Z" stroke="#A43048" strokeWidth="1.18" />
                  </svg>
                  <span className="font-sans font-medium text-[14px] text-[#A43048]">Engagement</span>
                </button>
                <button className="flex items-center gap-[6px] bg-white border-[1.13px] border-[#E7E5E4] rounded-[8px] px-[12px] py-[9px]">
                  <Heart className="w-4 h-4 text-[#A8A29E]" strokeWidth={1.5} />
                  <span className="font-sans font-medium text-[14px] text-[#57534E]">Bridal</span>
                </button>
                <button className="flex items-center gap-[6px] bg-white border-[1.13px] border-[#E7E5E4] rounded-[8px] px-[12px] py-[9px]">
                  <Sparkles className="w-4 h-4 text-[#A8A29E]" strokeWidth={1.5} />
                  <span className="font-sans font-medium text-[14px] text-[#57534E]">Custom</span>
                </button>
                <button className="flex items-center gap-[6px] bg-white border-[1.13px] border-[#E7E5E4] rounded-[8px] px-[12px] py-[9px]">
                  <Gift className="w-4 h-4 text-[#A8A29E]" strokeWidth={1.5} />
                  <span className="font-sans font-medium text-[14px] text-[#57534E]">Gifting</span>
                </button>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex flex-col sm:flex-row gap-[16px] mt-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] text-[#292524]">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                  <input type="text" placeholder="Select a date" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] text-[#292524]">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                  <input type="text" placeholder="Select a time" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]" />
                </div>
              </div>
            </div>

            {/* Name and Phone */}
            <div className="flex flex-col sm:flex-row gap-[16px] mt-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] text-[#292524]">Full Name <span className="text-[#CB485E]">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                  <input type="text" placeholder="Enter your full name" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] text-[#292524]">Phone Number <span className="text-[#CB485E]">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                  <input type="text" placeholder="+91 98765 43210" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-sans placeholder:text-[#292524] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] text-[#292524]">Email Address <span className="text-[#CB485E]">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                <input type="email" placeholder="you@example.com" className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E]" />
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-[family-name:var(--font-montserrat)] font-semibold text-[12px] text-[#292524]">Anything you'd like us to know?</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-[14px] w-4 h-4 text-[#A8A29E]" />
                <textarea rows={4} placeholder="Tell us about your requirements, occasion, or any specific designs you're interested in..." className="w-full bg-[#F5F5F4] rounded-[8px] py-[12px] pl-[36px] pr-[12px] text-[14px] font-sans placeholder:text-[#A8A29E] text-[#292524] outline-none focus:ring-1 ring-[#CB485E] resize-none"></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-[11.25px] mt-[18px]">
              <button className="relative w-full h-[46px] rounded-full group outline-none">
                {/* Shadow overlay matching the spec */}
                <div className="absolute inset-0 bg-[#FFFFFF01] rounded-[56px] shadow-[0px_2.25px_4.5px_-2.25px_rgba(0,0,0,0.1),0px_4.5px_6.75px_-1.13px_rgba(0,0,0,0.1)] pointer-events-none" />
                <div className="absolute inset-0 bg-[#CB485E] group-hover:bg-[#a83647] transition-colors rounded-full flex items-center justify-center px-[27px] py-[13.5px]">
                  <div className="flex items-center justify-center">
                    <span className="font-sans font-semibold text-[14px] leading-[18px] text-white text-center">Confirm Appointment</span>
                    <div className="pl-[9px] flex items-center justify-center">
                      <ArrowRight className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </button>
              
              <div className="flex items-center justify-center pt-1">
                <Calendar className="w-[15.75px] h-[15.75px] text-[#78716C]" strokeWidth={1.18} />
                <span className="font-[family-name:var(--font-montserrat)] font-normal text-[12.38px] leading-[18.56px] text-[#78716C] pl-[6.75px]">
                  We'll confirm your appointment shortly.
                </span>
              </div>
            </div>

          </div>

          {/* Right Image Section */}
          <div className="relative w-full lg:w-[533px] h-[600px] lg:h-[774px] rounded-[12px] overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.05)] bg-[#F5F5F5] shrink-0">
            <Image 
              src="/contact/craftSection.png" 
              alt="Craft Section" 
              fill 
              className="object-cover" 
            />

            {/* Content overlay */}
            <div className="absolute top-[30.92px] left-[33px] w-[298px] flex flex-col gap-[18px]">
              
              {/* Sidebar Eyebrow & Title */}
              <div className="flex flex-col gap-[4.5px]">
                <span className="font-[family-name:var(--font-montserrat)] font-bold text-[12px] leading-[16.88px] text-[#CB485E] uppercase">
                  YOUR TIME, YOUR SPACE
                </span>
                <h3 className="font-serif font-bold text-[24px] leading-[33.75px] text-[#1C1917]">
                  A More Personal Experience
                </h3>
                <p className="font-sans font-normal text-[14px] leading-[20.11px] text-[#757575] mt-[-1px]">
                  Discover exquisite jewellery with dedicated guidance from our experts, in a setting that's private, relaxed and entirely about you.
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="flex flex-col gap-[15.75px] mt-[4.5px]">
                {/* Benefit 1 */}
                <div className="flex items-start gap-[11.25px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#FDECEF] flex items-center justify-center shrink-0 mt-[2.25px]">
                    <User className="w-[18px] h-[18px] text-[#B84158]" strokeWidth={1.35} />
                  </div>
                  <div className="flex flex-col gap-[1.39px]">
                    <span className="font-[family-name:var(--font-montserrat)] font-semibold text-[14px] leading-[17.79px] text-[#292524]">One-on-one expert guidance</span>
                    <span className="font-sans font-normal text-[12px] leading-[14.06px] text-[#757575]">Get personalised recommendations.</span>
                  </div>
                </div>
                {/* Benefit 2 */}
                <div className="flex items-start gap-[11.25px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#FDECEF] flex items-center justify-center shrink-0 mt-[2.25px]">
                    <Diamond className="w-[18px] h-[18px] text-[#B84158]" strokeWidth={1.35} />
                  </div>
                  <div className="flex flex-col gap-[1.39px]">
                    <span className="font-[family-name:var(--font-montserrat)] font-semibold text-[14px] leading-[17.79px] text-[#292524]">Private & personalized experience</span>
                    <span className="font-sans font-normal text-[12px] leading-[14.06px] text-[#757575]">Explore at your own pace in complete privacy.</span>
                  </div>
                </div>
                {/* Benefit 3 */}
                <div className="flex items-start gap-[11.25px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#FDECEF] flex items-center justify-center shrink-0 mt-[2.25px]">
                    <Video className="w-[18px] h-[18px] text-[#B84158]" strokeWidth={1.35} />
                  </div>
                  <div className="flex flex-col gap-[1.39px]">
                    <span className="font-[family-name:var(--font-montserrat)] font-semibold text-[14px] leading-[17.79px] text-[#292524]">In-store or virtual</span>
                    <span className="font-sans font-normal text-[12px] leading-[14.06px] text-[#757575]">Choose what's most convenient for you.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right Glowing Script Text (Crafted Around Your Moments) */}
            {/* The white glow and text are absolutely pinned to bottom-right corner */}
            <div className="absolute bottom-0 right-0 pb-[36px] pr-[36px] flex flex-col items-end">
              {/* White Radial Glow tightly packed in the corner behind text */}
              <div className="absolute bottom-[-150px] right-[-150px] w-[550px] h-[550px] bg-white opacity-100 blur-[100px] rounded-full pointer-events-none" />
              
              <div 
                className="relative z-10 font-[family-name:var(--font-script)] text-[44px] leading-[44px] text-[#B84158] flex flex-col items-end pr-2"
                style={{ transform: "rotate(-3deg)" }}
              >
                <span>Crafted</span>
                <span>Around</span>
                <span>Your</span>
                <span>Moments</span>
                {/* Horizontal Divider */}
                <div className="w-[60px] h-[1.125px] bg-[#B84158]/50 mt-3 mr-4" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
