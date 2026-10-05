import Image from "next/image";
import { BadgeCheck, Phone, Mail, Edit3, Truck, Heart, CalendarDays, Bookmark } from "lucide-react";

export default function AccountDashboard() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Top Profile Summary Card */}
      <div className="hidden bg-white rounded-2xl p-6 shadow-sm overflow-hidden relative border border-gray-100 md:block">
        {/* Subtle warm glow background */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#FFF0E6]/40 to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-center relative z-10 mb-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative rounded-full bg-[#F0EDED] p-1 ">
              <div className="w-20 h-20 rounded-full bg-[linear-gradient(135deg,#A63048_0%,#861632_48%,#7C571E_100%)] flex items-center justify-center text-white text-xl font-serif">
                PA
              </div>
              <div className="absolute bottom-0 right-0 bg-[#A67C00] rounded-full p-0.5 border-2 border-white text-white">
                <BadgeCheck size={16} fill="white" className="text-[#A67C00]" />
              </div>
            </div>

            {/* User Details */}
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold font-serif text-gray-900">John Doe</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF0F2] rounded-full text-[#CB485E] text-sm font-medium">
                    <Phone size={14} />
                    <span>+91 9696969696</span>
                  </div>
                  <BadgeCheck size={18} className="text-green-500" fill="white" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF0F2] rounded-full text-[#CB485E] text-sm font-medium">
                    <Mail size={14} />
                    <span>doe.john3@gmail.com</span>
                  </div>
                  <BadgeCheck size={18} className="text-green-500" fill="white" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center px-8 py-8">
            <div className="absolute top-0 right-0 rounded-full bg-[radial-gradient(circle,#FFF1D8_0%,rgba(255,241,216,0.62)_34%,rgba(255,241,216,0)_72%)] blur-md" />
            <button className="relative flex items-center gap-2 bg-[#CB485E] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#CB485E]/90 transition-colors">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Summary Blocks */}
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div className="bg-[#FFF0F2] rounded-2xl p-5 flex flex-col justify-between h-[120px]">
            <div className="flex items-center justify-between text-[#CB485E]">
              <span className="font-medium text-sm">Active Orders</span>
              <Truck size={18} />
            </div>
            <div>
              <h4 className="text-xl font-serif text-gray-900 mb-1">1 In Transit</h4>
              <div className="flex items-center gap-1.5 text-[#CB485E] text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>Arriving Tomorrow</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF0F2] rounded-2xl p-5 flex flex-col justify-between h-[120px]">
            <div className="flex items-center justify-between text-[#CB485E]">
              <span className="font-medium text-sm">Wishlist</span>
              <Heart size={18} />
            </div>
            <div>
              <h4 className="text-xl font-serif text-gray-900 mb-1">3 Pieces</h4>
              <p className="text-[#CB485E] text-sm">Saved in Wishlist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Profile Form */}
      <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm md:hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-serif text-[20px] leading-none text-[#2F2B2B]">My Profile</h1>
          <button className="flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3 py-1 text-[11px] font-semibold text-[#CB485E]">
            <Edit3 size={12} />
            Edit
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-[#454545]">Full Name*</span>
            <div className="flex h-[34px] items-center rounded-md bg-[#F4F2EF] px-3 text-[12px] text-[#454545]">
              John Doe
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-[#454545]">Phone Number*</span>
            <div className="flex h-[34px] items-center justify-between rounded-md bg-[#F4F2EF] px-3 text-[12px] text-[#454545]">
              <span className="flex items-center gap-2">
                <span className="text-[13px]">🇮🇳</span>
                <span className="text-[#CB485E]">(+91)</span>
                <span>9696969696</span>
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[8px] font-bold uppercase text-green-700">
                Verified
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-[#454545]">Email ID*</span>
            <div className="flex h-[34px] items-center justify-between rounded-md bg-[#F4F2EF] px-3 text-[12px] text-[#454545]">
              <span>doe.john3@gmail.com</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[8px] font-bold uppercase text-green-700">
                Verified
              </span>
            </div>
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-[#454545]">Gender</span>
            <div className="grid grid-cols-3 gap-2">
              {["Male", "Female", "Other"].map((gender, index) => (
                <button
                  key={gender}
                  className={`flex h-[34px] items-center justify-center gap-2 rounded-md text-[12px] font-medium ${
                    index === 0 ? "bg-[#FFE4E8] text-[#CB485E]" : "bg-[#FFF0F2] text-[#CB485E]/70"
                  }`}
                >
                  <span className={`flex h-3 w-3 items-center justify-center rounded-full ${index === 0 ? "bg-[#CB485E]" : "bg-white"}`}>
                    {index === 0 ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                  </span>
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Order Tracking Card */}
      <div className="hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 items-center justify-between md:flex">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden relative shrink-0">
            <Image
              src="/Dashboard/productimg.png"
              alt="Gulab Diamond Floral Studs"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold uppercase rounded">In Transit</span>
              <span className="text-gray-500 text-sm font-medium">Order #AJ-984210</span>
            </div>
            <h3 className="text-xl font-serif text-gray-900 mb-1">Gulab Diamond Floral Studs</h3>
            <p className="text-sm text-gray-500">Expected Delivery: Tomorrow by 2:00 PM via Insured Courier</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0 ml-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start gap-2 w-48">
              <span className="text-xs font-bold text-[#CB485E]">Out for Delivery</span>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#CB485E] w-[80%] rounded-full" />
              </div>
            </div>
            <button className="flex items-center gap-2 bg-[#CB485E] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#CB485E]/90 transition-colors">
              <Truck size={16} />
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Anniversary Dates Card */}
      <div className="bg-white rounded-lg px-3 py-7 shadow-sm border border-gray-100 flex flex-col items-center justify-center md:min-h-[390px] md:rounded-2xl md:px-6 md:py-12">
        <Image
          src="/Dashboard/Giftbox.png"
          alt="Gift box"
          width={144}
          height={112}
          className="h-[72px] w-[92px] object-contain md:h-[112px] md:w-36"
        />
        <h2 className="mt-7 text-center font-serif text-[24px] leading-none text-[#454545] md:text-[28px]">
          For your Anniversaries
        </h2>
        <p className="mt-3 max-w-[260px] text-center text-[11px] leading-[13px] text-[#CB485E] md:mt-4 md:max-w-[530px] md:text-[14px] md:leading-[18px]">
          “Your special dates are saved with us. Let Miraya Diamonds make every
          milestone a little more memorable.”
        </p>

        <div className="mt-8 grid w-full max-w-[640px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-[#CB485E] md:text-xs">Your Birthday</span>
            <div className="flex h-[36px] items-center justify-between rounded-md bg-[#F4F2EF] px-3 text-[12px] text-[#454545] shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] md:h-[42px] md:rounded-lg md:px-4 md:text-sm">
              <span>24/08/1996</span>
              <CalendarDays size={20} className="text-[#CB485E]" strokeWidth={1.8} />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-[#CB485E] md:text-xs">Your Anniversary</span>
            <div className="flex h-[36px] items-center justify-between rounded-md bg-[#F4F2EF] px-3 text-[12px] text-[#454545] shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] md:h-[42px] md:rounded-lg md:px-4 md:text-sm">
              <span>14/02/2022</span>
              <Heart size={20} className="text-[#CB485E]" strokeWidth={1.8} />
            </div>
          </label>
        </div>

        <button className="mt-6 flex h-9 items-center gap-2 rounded-full bg-[#CB485E] px-7 text-[11px] font-semibold text-white transition-colors hover:bg-[#b93f54] md:h-10 md:rounded-lg md:text-sm">
          <Bookmark size={16} />
          <span className="md:hidden">Save Special Date</span>
          <span className="hidden md:inline">Update Dates</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-100 bg-white p-2 shadow-sm md:hidden">
        <button className="h-10 rounded-full border border-[#F3D9DE] bg-white text-[11px] font-semibold text-[#454545]">
          Discard Changes
        </button>
        <button className="h-10 rounded-full bg-[#CB485E] text-[11px] font-semibold text-white">
          ✓ Save Changes
        </button>
      </div>
    </div>
  );
}
