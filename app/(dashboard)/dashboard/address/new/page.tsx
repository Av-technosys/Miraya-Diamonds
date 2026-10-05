import Link from "next/link";
import { Circle, MapPin, ShieldCheck, Truck } from "lucide-react";

const addressTypes = [
  { label: "Home", active: true },
  { label: "Work", active: false },
  { label: "Other", active: false },
];

const fields = [
  { label: "Full Name*", placeholder: "John Doe", span: "md:col-span-1" },
  { label: "Phone Number*", placeholder: "9696969696", span: "md:col-span-1", phone: true },
  {
    label: "Address Line (Flat, House No., Building, Apartment)*",
    placeholder: "e.g. Flat 301, Tower B, Nirvana Heights",
    span: "md:col-span-2",
  },
  { label: "Pincode*", placeholder: "6-digit postal code", span: "md:col-span-1" },
  { label: "Landmark (Optional)", placeholder: "e.g. Near HDFC Bank, opposite park", span: "md:col-span-1" },
  { label: "City*", placeholder: "e.g. Jaipur", span: "md:col-span-1" },
  { label: "State*", placeholder: "e.g. Rajasthan", span: "md:col-span-1" },
];

export default function NewAddressPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <section className="rounded-xl border border-white/70 bg-white p-4 shadow-sm md:rounded-2xl md:px-8 md:py-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F2] text-[#CB485E]">
              <MapPin size={19} strokeWidth={2.1} />
            </div>
            <div>
              <h1 className="font-serif text-[24px] font-bold leading-none text-[#3F3A39] md:text-[28px]">
                New Delivery Destination
              </h1>
              <p className="mt-2 text-[12px] leading-[16px] text-[#D44A62]">
                Add a verified transit address for vault deliveries
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:flex md:gap-3">
            {addressTypes.map((type) => (
              <button
                key={type.label}
                className={`flex h-9 items-center justify-center gap-1.5 rounded-full px-2 text-[11px] font-semibold uppercase text-[#CB485E] min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:text-[12px] md:gap-3 md:px-5 md:text-[13px] ${
                  type.active ? "bg-[#FFF0F2]" : "bg-[#FCE3E8]/75"
                }`}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white min-[380px]:h-5 min-[380px]:w-5">
                  {type.active ? <span className="h-2.5 w-2.5 rounded-full bg-[#CB485E] ring-2 ring-white min-[380px]:h-3.5 min-[380px]:w-3.5" /> : null}
                </span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-x-5 gap-y-5 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.label} className={`flex flex-col gap-2 ${field.span}`}>
              <span className="text-[12px] font-medium text-[#D44A62]">{field.label}</span>
              {field.phone ? (
                <div className="grid grid-cols-[92px_1fr] gap-2">
                  <div className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#F4F2EF] px-3 text-[14px] text-[#454545] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
                    <span className="text-[12px]">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <div className="flex h-11 items-center rounded-lg bg-[#F4F2EF] px-4 text-[14px] text-[#454545] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
                    {field.placeholder}
                  </div>
                </div>
              ) : (
                <div className="flex h-11 items-center rounded-lg bg-[#F4F2EF] px-4 text-[14px] text-[#7F7373] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
                  {field.placeholder}
                </div>
              )}
            </label>
          ))}
        </div>

        <div className="mt-20 border-t border-[#EFE0E2] pt-5 md:mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="flex items-center gap-2 text-[12px] leading-[16px] text-[#D44A62]">
              <span className="flex h-4 w-4 items-center justify-center border border-[#9B9292] bg-white">
                <Circle size={8} className="hidden" />
              </span>
              Make this my default destination for high-value purchases
            </label>

            <div className="grid grid-cols-2 gap-3 md:flex md:justify-end">
              <Link
                href="/dashboard/address"
                className="flex h-10 items-center justify-center rounded-full bg-[#FFF0F2] px-7 text-[12px] font-semibold text-[#CB485E] shadow-sm"
              >
                Discard
              </Link>
              <button className="h-10 rounded-full bg-[#CB485E] px-7 text-[12px] font-semibold text-white shadow-sm">
                Save Address
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-white/70 bg-white px-4 py-3 shadow-sm md:rounded-2xl md:px-7 md:py-4">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE3E8] text-[#CB485E] md:h-11 md:w-11">
              <Truck size={17} />
            </div>
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-wide text-[#D44A62]">
                Insured Logistics Network
              </h2>
              <p className="mt-1 max-w-[520px] text-[12px] leading-[17px] text-[#704D51]">
                All high jewellery shipments handled exclusively via Sequel & BVC Armored Couriers with mandatory OTP authentication.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D44A62] md:flex-nowrap md:items-center md:gap-4 md:whitespace-nowrap md:text-[11px]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} />
              100% Insured Transit
            </span>
            <span>•</span>
            <span>Tamper-Proof Box</span>
          </div>
        </div>
      </section>
    </div>
  );
}
