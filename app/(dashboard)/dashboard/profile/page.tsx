import Image from "next/image";
import { CalendarDays, Check, Edit3, Heart } from "lucide-react";

const inputClass =
  "flex h-11 min-w-0 items-center justify-between rounded-lg bg-[#F4F2EF] px-3 text-[13px] text-[#454545] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] min-[380px]:px-4 min-[380px]:text-[14px]";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <section className="rounded-xl border border-white/70 bg-white p-4 shadow-sm md:rounded-2xl md:px-8 md:py-8">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="font-serif text-[24px] font-medium leading-none text-[#3F3A39] md:text-[28px]">
            My Profile
          </h1>
          <button className="flex h-8 items-center gap-2 rounded-full bg-[#F7F4F1] px-4 text-[12px] font-semibold text-[#CB485E]">
            <Edit3 size={13} />
            Edit
          </button>
        </div>

        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-medium text-[#454545]">Full Name*</span>
            <div className={inputClass}>John Doe</div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-medium text-[#454545]">Phone Number*</span>
            <div className="grid grid-cols-[78px_1fr] gap-2 min-[380px]:grid-cols-[92px_1fr]">
              <div className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-[#F4F2EF] px-2 text-[12px] text-[#CB485E] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:text-[13px]">
                <span className="text-[12px]">🇮🇳</span>
                <span>(+91)</span>
              </div>
              <div className={inputClass}>
                <span>9696969696</span>
                <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase text-green-700">
                  <Check size={10} />
                  Verified
                </span>
              </div>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-medium text-[#454545]">Email ID*</span>
            <div className={inputClass}>
              <span className="min-w-0 truncate">doe.john3@gmail.com</span>
              <span className="ml-2 flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase text-green-700">
                <Check size={10} />
                Verified
              </span>
            </div>
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-medium text-[#454545]">Gender</span>
            <div className="grid grid-cols-3 gap-2 min-[380px]:gap-3">
              {["Male", "Female", "Other"].map((gender, index) => (
                <button
                  key={gender}
                  className={`flex h-11 items-center justify-center gap-1.5 rounded-lg text-[12px] font-medium min-[380px]:gap-2 min-[380px]:text-[13px] ${
                    index === 0 ? "bg-[#FFE4E8] text-[#CB485E]" : "bg-[#FBE3E8] text-[#CB485E]/80"
                  }`}
                >
                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                      index === 0 ? "bg-[#CB485E]" : "bg-white"
                    }`}
                  >
                    {index === 0 ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                  </span>
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center rounded-xl border border-white/70 bg-white px-4 py-10 text-center shadow-sm md:min-h-[430px] md:rounded-2xl md:px-8 md:py-14">
        <Image
          src="/Dashboard/Giftbox.png"
          alt="Gift box"
          width={144}
          height={112}
          className="h-[92px] w-[118px] object-contain"
        />

        <h2 className="mt-7 font-serif text-[24px] font-medium leading-none text-[#3F3A39] md:text-[28px]">
          For your Anniversaries
        </h2>
        <p className="mt-3 max-w-[390px] text-[13px] leading-[19px] text-[#D44A62]">
          Share your special dates, and we&apos;ll create personalized experiences just for you.
        </p>

        <div className="mt-8 grid w-full max-w-[660px] gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-left">
            <span className="text-[12px] font-medium text-[#454545]">Your Birthday</span>
            <div className={inputClass}>
              <span className="text-[#8B8282]">DD/MM/YYYY</span>
              <CalendarDays size={19} className="text-[#8A6D6F]" strokeWidth={1.8} />
            </div>
          </label>

          <label className="flex flex-col gap-2 text-left">
            <span className="text-[12px] font-medium text-[#454545]">Your Anniversary</span>
            <div className={inputClass}>
              <span className="text-[#8B8282]">DD/MM/YYYY</span>
              <Heart size={19} className="text-[#8A6D6F]" strokeWidth={1.8} />
            </div>
          </label>
        </div>

        <button className="mt-7 h-11 rounded-full bg-[#CB485E] px-9 text-[13px] font-semibold text-white shadow-[0_8px_16px_rgba(203,72,94,0.22)]">
          Save Special Date
        </button>
      </section>

      <div className="grid grid-cols-2 gap-3 md:flex md:justify-end md:gap-4">
        <button className="h-11 rounded-full bg-white px-7 text-[13px] font-semibold text-[#454545] shadow-sm">
          Discard Changes
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#CB485E] px-8 text-[13px] font-semibold text-white shadow-sm">
          <Check size={14} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
