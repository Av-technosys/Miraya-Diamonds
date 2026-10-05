import Link from "next/link";
import { Building2, CheckCircle2, Edit3, Home, Plus, Shield, Trash2 } from "lucide-react";

const addresses = [
  {
    type: "Home",
    icon: Home,
    name: "John Doe",
    tag: "Recipient",
    address: "Flat 402, Royal Palms, Civil Lines, Jaipur, Rajasthan - 302001",
    phone: "+91 9696969696",
    note: "Secure handoff with OTP verification & transit insurance",
    mode: "Active Shipping Mode",
    default: true,
  },
  {
    type: "Work",
    icon: Building2,
    name: "John Doe",
    tag: "Recipient",
    address: "Studio 12, Design Hub, C-Scheme, Jaipur, Rajasthan - 302005",
    phone: "+91 9696969696",
    note: "Commercial address • Reception collection eligible",
    mode: "Alternate Mode",
    default: false,
  },
];

export default function SavedAddressPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <section className="rounded-xl border border-white/70 bg-white p-4 shadow-sm md:flex md:min-h-[110px] md:items-center md:justify-between md:rounded-2xl md:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-[24px] font-bold leading-none text-[#3F3A39] md:text-[28px]">
              Saved Addresses
            </h1>
            <span className="rounded-full bg-[#FCE3E8] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#CB485E]">
              2 Destinations
            </span>
          </div>
          <p className="mt-3 max-w-[620px] text-[11px] leading-[15px] text-[#D44A62] md:text-xs">
            Manage your domestic residences, private studios, and insured jewellery delivery locations.
          </p>
        </div>

        <Link
          href="/dashboard/address/new"
          className="mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-[#CB485E] px-5 text-[12px] font-semibold text-white shadow-sm md:mt-0"
        >
          <Plus size={15} />
          Add New Addresses
        </Link>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {addresses.map((address) => {
          const Icon = address.icon;

          return (
            <article
              key={address.type}
              className="rounded-xl border border-white/70 bg-white p-4 shadow-sm md:rounded-2xl md:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                {address.default ? (
                  <span className="flex h-7 items-center gap-1.5 rounded-full bg-[#CB485E] px-3 text-[11px] font-bold text-white">
                    <CheckCircle2 size={12} />
                    Default
                  </span>
                ) : (
                  <span className="flex h-7 items-center gap-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide text-[#CB485E]">
                    <span className="h-2.5 w-2.5 rounded-full border border-[#CB485E]" />
                    Set as Default
                  </span>
                )}

                <span className="flex h-7 items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3 text-[11px] font-bold uppercase text-[#CB485E]">
                  <Icon size={12} />
                  {address.type}
                </span>
              </div>

              <div className="mt-5">
                <h2 className="font-serif text-[19px] leading-none text-[#3F3A39]">
                  {address.name}
                  <span className="ml-2 align-middle font-sans text-[12px] text-[#9B9292]">
                    {address.tag}
                  </span>
                </h2>
                <p className="mt-4 max-w-[360px] text-[14px] leading-[21px] text-[#4C4747]">
                  {address.address}
                </p>
                <p className="mt-3 text-[13px] font-medium text-[#D44A62]">{address.phone}</p>
              </div>

              <div className="mt-5 flex min-h-12 items-center gap-3 rounded-lg bg-[#FBE3E8] px-4 py-3 text-[12px] leading-[16px] text-[#D44A62]">
                <Shield size={15} className="shrink-0" />
                <span>{address.note}</span>
              </div>

              <div className="mt-5 border-t border-[#EFE0E2] pt-4">
                <div className="flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                  <span className="text-[12px] text-[#807777]">{address.mode}</span>
                  <div className="grid grid-cols-2 gap-2 min-[420px]:flex">
                    <button className="flex h-8 items-center justify-center gap-2 rounded-full bg-[#FFF0F2] px-4 text-[12px] font-semibold text-[#CB485E] shadow-sm">
                      <Edit3 size={12} />
                      Edit
                    </button>
                    <button className="flex h-8 items-center justify-center gap-2 rounded-full bg-[#FF424B] px-4 text-[12px] font-semibold text-white shadow-sm">
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
