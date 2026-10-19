"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronDown, Upload, CheckCircle2, FileText, X } from "lucide-react";

export function CustomizeContactSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14 xl:gap-20">
          
          {/* Left Column: Information */}
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#78716C] sm:text-[12px]">
              LET&apos;S CREATE SOMETHING MEMORIAL
            </span>

            <h2 className="mt-4 font-serif text-[36px] font-bold leading-[1.1] text-[#252525] sm:mt-5 sm:text-[44px] lg:text-[50px]">
              Your Vision, Our
              <br />
              <span className="font-normal italic">Craftsmanship</span>
            </h2>

            <p className="mt-5 font-sans text-[14px] leading-[1.7] text-[#555555] sm:text-[15px]">
              Every meaningful piece begins with a vision. Our jewellery
              specialists are here to help you explore designs, discover the
              perfect diamond, and create a ring that reflects your personal style.
              From choosing the finest details to bringing your custom creation to
              life, we&apos;ll make every step feel effortless.
            </p>

            <div className="mt-8 border-t border-[#EAE6E1] pt-6 font-sans text-[12px] leading-[1.65] text-[#78716C] sm:text-[13px]">
              <p>
                <strong className="font-semibold text-[#373534]">
                  Our team is available Monday to Saturday, 11:00 AM – 8:00 PM.
                </strong>{" "}
                You can expect a response within 24–48 business hours. Response
                times may vary on Sundays and public holidays.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Us Form Box */}
          <div className="rounded-[24px] border border-[#E4EBE6] bg-[#F7FFF7] p-6 shadow-[0_8px_30px_rgba(33,78,52,0.04)] sm:p-8 md:p-10">
            {isSubmitted ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-14 text-[#214E34]" />
                <h3 className="mt-4 font-serif text-[28px] font-bold text-[#1C1B1B]">
                  Thank You!
                </h3>
                <p className="mt-2 max-w-[340px] font-sans text-sm text-[#666666]">
                  We have received your custom enquiry. Our bespoke jewellery
                  concierge will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedFile(null);
                  }}
                  className="mt-6 rounded-full bg-[#214E34] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#183d28]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center sm:mb-8">
                  <h3 className="font-serif text-[28px] font-bold leading-tight text-[#1C1B1B] sm:text-[32px]">
                    Contact us
                  </h3>
                  <p className="mt-1.5 font-sans text-[13px] text-[#757575]">
                    Leave your message and we&apos;ll get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Full Name"
                      className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#333333] placeholder:text-[#94A3B8] outline-none transition focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#333333] placeholder:text-[#94A3B8] outline-none transition focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]"
                    />
                  </div>

                  {/* Row 2: Phone with Country Code */}
                  <div className="flex h-12 w-full items-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-white px-3 transition focus-within:border-[#214E34] focus-within:ring-1 focus-within:ring-[#214E34]">
                    <div className="relative flex items-center pr-2">
                      <select
                        aria-label="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="cursor-pointer appearance-none bg-transparent pr-4 font-sans text-xs font-medium text-[#475569] outline-none"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-0 text-[#94A3B8]"
                      />
                    </div>
                    <div className="h-5 w-px bg-[#E2E8F0]" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone no."
                      className="h-full flex-1 bg-transparent px-3 text-sm text-[#333333] placeholder:text-[#94A3B8] outline-none"
                    />
                  </div>

                  {/* Row 3: Jewellery Type & Budget Dropdowns */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                    <div className="relative">
                      <select
                        name="jewelleryType"
                        defaultValue=""
                        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-9 text-sm text-[#475569] outline-none transition focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]"
                      >
                        <option value="" disabled>
                          Jewellary Type
                        </option>
                        <option value="Solitaire Engagement Ring">
                          Solitaire Engagement Ring
                        </option>
                        <option value="Wedding Bands">Wedding Bands</option>
                        <option value="Diamond Earrings">Diamond Earrings</option>
                        <option value="Necklace / Pendant">
                          Necklace / Pendant
                        </option>
                        <option value="Tennis Bracelet">Tennis Bracelet</option>
                        <option value="Custom Bespoke Piece">
                          Custom Bespoke Piece
                        </option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                      />
                    </div>

                    <div className="relative">
                      <select
                        name="approxBudget"
                        defaultValue=""
                        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-9 text-sm text-[#475569] outline-none transition focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]"
                      >
                        <option value="" disabled>
                          Select Your Approx Budget
                        </option>
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000">
                          ₹50,000 – ₹1,00,000
                        </option>
                        <option value="₹1,00,000 – ₹2,50,000">
                          ₹1,00,000 – ₹2,50,000
                        </option>
                        <option value="₹2,50,000 – ₹5,00,000">
                          ₹2,50,000 – ₹5,00,000
                        </option>
                        <option value="₹5,00,000+">₹5,00,000+</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Design Reference Link */}
                  <div>
                    <input
                      type="url"
                      name="referenceLink"
                      placeholder="Design Refererence Link (optional)"
                      className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#333333] placeholder:text-[#94A3B8] outline-none transition focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]"
                    />
                  </div>

                  {/* Row 5: Upload Design Reference Box */}
                  <div>
                    <label className="mb-2 block font-sans text-xs font-semibold text-[#454545] sm:text-[13px]">
                      Upload Design Reference
                    </label>

                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      className="relative flex min-h-[105px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-white p-4 text-center transition hover:border-[#214E34]"
                    >
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif,.svg"
                        onChange={handleFileChange}
                        className="absolute inset-0 z-10 cursor-pointer opacity-0"
                      />

                      {selectedFile ? (
                        <div className="relative z-20 flex items-center gap-2 rounded-lg bg-[#F1F7F3] px-3 py-1.5 text-xs text-[#214E34]">
                          <FileText size={16} />
                          <span className="max-w-[200px] truncate font-medium">
                            {selectedFile.name}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                            className="ml-1 text-[#64748B] hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={22} className="text-[#333333]" strokeWidth={1.8} />
                          <p className="mt-2 font-sans text-xs font-semibold text-[#333333]">
                            Choose file or drag here
                          </p>
                          <p className="mt-1 font-sans text-[10px] text-[#94A3B8] sm:text-[11px]">
                            Supported format: JPG, JPEG, PNG, GIF, SVG.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Row 6: Message */}
                  <div>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Message *"
                      className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm text-[#333333] placeholder:text-[#94A3B8] outline-none transition focus:border-[#214E34] focus:ring-1 focus:ring-[#214E34]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="h-12 w-full rounded-xl bg-[#264E36] text-sm font-semibold text-white shadow-sm transition hover:bg-[#1E3F2B] active:scale-[0.99]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

