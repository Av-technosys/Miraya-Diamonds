import Image from "next/image";

export function ArtOfCraftsmanship() {
  return (
    <section className="w-full bg-[#FCF9F8] border-t-[1.05px] border-[#F3E5EC] pt-[30px] pb-[40px] md:py-[60px]">
      {/* MOBILE LAYOUT */}
      <div className="flex md:hidden flex-col w-full px-4 gap-[24px]">
        {/* Text */}
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[34px] h-[1px] bg-[#CB485E]" />
            <span className="font-sans font-bold text-[9px] tracking-[2.5px] uppercase text-[#CB485E]">
              THE ATELIER PROCESS
            </span>
          </div>
          <h2 className="font-serif font-medium text-[26px] leading-[30px] tracking-[-0.38px] text-[#111827] mb-[10px]">
            The Art Behind <span className="text-[#CB485E] italic">Every Sparkle</span>
          </h2>
          <p className="font-sans font-light text-[13px] leading-[18px] text-[#757575] max-w-[290px]">
            Behind every Miraya Diamonds creation is precision, imagination, and patience.
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="relative w-full aspect-square rounded-[16px] overflow-hidden border-[2px] border-white shadow-sm">
            <Image src="/about/master.jpg" alt="Artisan karigar" fill className="object-cover" />
          </div>
          <div className="relative w-full aspect-square rounded-[16px] overflow-hidden border-[2px] border-white shadow-sm">
            <Image src="/about/intro.jpg" alt="Luxury jewellery" fill className="object-cover" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="bg-[#FFFDFC] border-[1px] border-[#FCE9EC] rounded-[16px] p-[16px] flex flex-col shadow-sm">
            <span className="font-serif font-bold text-[22px] leading-[26px] text-[#CB485E] mb-[4px]">
              34+ Hrs
            </span>
            <span className="font-sans font-medium text-[12px] leading-[14px] text-[#3B2A30] mb-[2px]">
              Handcrafting Time
            </span>
            <span className="font-sans font-normal text-[10px] leading-[12px] text-[#806A72]">
              Per bespoke solitaire
            </span>
          </div>
          <div className="bg-[#FFFDFC] border-[1px] border-[#FCE9EC] rounded-[16px] p-[16px] flex flex-col shadow-sm">
            <span className="font-serif font-bold text-[22px] leading-[26px] text-[#CB485E] mb-[4px]">
              100%
            </span>
            <span className="font-sans font-medium text-[12px] leading-[14px] text-[#3B2A30] mb-[2px]">
              Hand-Selected
            </span>
            <span className="font-sans font-normal text-[10px] leading-[12px] text-[#806A72]">
              Cut, color, clarity certified
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex w-full max-w-[1240px] mx-auto px-0 flex-row items-center justify-between gap-[50px]">
        
        {/* Left Side: Images */}
        <div className="w-[605px] h-[400px] relative">
          
          {/* Image 1 (Left) */}
          <div 
            className="absolute left-0 top-0 w-[288px] h-[374px] rounded-[25px] overflow-hidden border-[2.11px] border-white"
            style={{ boxShadow: "0px 21.1px 47.47px -15.82px #C96F911F" }}
          >
            <Image
              src="/about/master.jpg"
              alt="Artisan karigar detailing gold ring"
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>

          {/* Image 2 (Right, shifted down) */}
          <div 
            className="absolute left-[316px] top-[25px] w-[288px] h-[374px] rounded-[25px] overflow-hidden border-[2.11px] border-white"
            style={{ boxShadow: "0px 21.1px 47.47px -15.82px #C96F911F" }}
          >
            <Image
              src="/about/intro.jpg"
              alt="Luxury jewellery craftsmanship"
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>

          {/* Floating Badge */}
          <div 
            className="absolute bottom-0 left-[150px] z-20 flex items-center gap-[8px] py-[14.77px] px-[25.32px] rounded-full border-[1.05px] border-[#EEDDE3]"
            style={{ 
              background: "#FFFDFCD1",
              backdropFilter: "blur(14.77px)",
              boxShadow: "0px 21.1px 47.47px -15.82px #C96F911F"
            }}
          >
            <div className="w-[8.44px] h-[8.44px] rounded-full bg-[#CB485E]" />
            <span className="font-sans font-semibold text-[12.66px] leading-[16.88px] tracking-[0.63px] text-[#3B2A30]">
              Zero-Tolerance Setting Precision
            </span>
          </div>

        </div>

        {/* Right Side: Content */}
        <div className="w-[588px] flex flex-col pt-[10px]">
          
          {/* Label */}
          <div className="flex items-center gap-[8px] mb-[21px]">
            <div className="w-[34px] h-[1px] bg-[#CB485E]" />
            <span className="font-sans font-semibold text-[12.66px] leading-[16.88px] tracking-[3.16px] uppercase text-[#CB485E]">
              THE ATELIER PROCESS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif font-semibold text-[40px] leading-[42.2px] tracking-[-0.38px] text-[#454545] mb-[24px]">
            The Art Behind <span className="text-[#CB485E]">Every Sparkle</span>
          </h2>

          {/* Description */}
          <p className="font-sans font-light text-[14px] leading-[20px] text-[#757575] mb-[20px]">
            Behind every Miraya Diamonds creation is a combination of imagination, precision, and craftsmanship. From selecting the right stones to refining every curve and setting, our pieces are shaped with patience and purpose.
          </p>

          <p className="font-serif font-normal italic text-[20px] leading-[29.54px] text-[#454545] mb-[30px]">
            Because true luxury is not only about how a piece looks — it is about how beautifully it is made.
          </p>

          {/* Stats Cards */}
          <div className="flex flex-row gap-[16.88px]">
            
            {/* Card 1 */}
            <div 
              className="flex-1 bg-[#FFFDFC] border-[1.05px] border-[#F3E5EC] rounded-[16.88px] p-[21.1px] flex flex-col"
              style={{ boxShadow: "0px 10.55px 31.65px -10.55px #3B2A300D" }}
            >
              <span className="font-serif font-bold text-[32px] leading-[37.98px] text-[#CB485E] mb-[6px]">
                34+ Hrs
              </span>
              <span className="font-sans font-medium text-[14px] leading-[16.88px] text-[#3B2A30] mb-[2px]">
                Average Handcrafting Time
              </span>
              <span className="font-sans font-normal text-[12px] leading-[17.41px] text-[#806A72]">
                Per bespoke bridal solitaire
              </span>
            </div>

            {/* Card 2 */}
            <div 
              className="flex-1 bg-[#FFFDFC] border-[1.05px] border-[#F3E5EC] rounded-[16.88px] p-[21.1px] flex flex-col"
              style={{ boxShadow: "0px 10.55px 31.65px -10.55px #3B2A300D" }}
            >
              <span className="font-serif font-bold text-[32px] leading-[37.98px] text-[#CB485E] mb-[6px]">
                100%
              </span>
              <span className="font-sans font-medium text-[14px] leading-[16.88px] text-[#3B2A30] mb-[2px]">
                Hand-Selected Solitaires
              </span>
              <span className="font-sans font-normal text-[12px] leading-[17.41px] text-[#806A72]">
                Cut, color, and clarity scrutinized
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
