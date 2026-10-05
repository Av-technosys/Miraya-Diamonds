import Image from "next/image";
import Link from "next/link";
import { ReviewModalTrigger } from "@/components/account/review-modal";
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Headphones,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

const timeline = [
  { label: "Order Placed", date: "22 Feb, 11:20 AM", icon: Check },
  { label: "Confirmed", date: "22 Feb, 02:15 PM", icon: PackageCheck },
  { label: "Shipped", date: "24 Feb, 10:30 AM", icon: Check },
  { label: "Delivered", date: "28 Feb, 01:40 PM", icon: Check },
];

const summaryRows = [
  ["Item Total", "₹40,800"],
  ["Shipping Charges", "Free"],
  ["Insurance", "₹0"],
  ["Tax (GST)", "₹2,050"],
];

export function generateStaticParams() {
  return [{ orderId: "AJ-984210" }];
}

export default function OrderDetailsPage() {
  return (
    <main className="flex flex-col gap-4 md:gap-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link
          href="/dashboard/orders"
          className="inline-flex w-max items-center gap-2 text-[13px] font-medium text-[#B82E46] md:text-[14px]"
        >
          <ArrowLeft size={17} />
          Back to My Orders
        </Link>

        <div className="flex min-w-0 items-center gap-2 text-[13px] text-[#6F7785] md:text-[15px]">
          <span>Order ID</span>
          <span className="font-bold text-[#202634]">#AJ-984210</span>
          <Copy size={15} className="text-[#9AA3AF]" />
        </div>
      </div>

      <section className="rounded-xl border border-[#ECEEF2] bg-white p-4 shadow-sm md:rounded-2xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-serif text-[22px] font-bold leading-none text-[#171B25] md:text-[32px]">
              Order Details
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-[#6F7785] min-[380px]:gap-3 md:text-[14px]">
              <span>Placed on 22 Feb 2026</span>
              <span className="h-5 w-px bg-[#D6DAE1]" />
              <span>1 Item</span>
              <span className="h-5 w-px bg-[#D6DAE1]" />
              <span>Total ₹42,850</span>
            </div>
          </div>

          <div className="md:text-right">
            <span className="inline-flex h-8 items-center gap-2 rounded-full bg-[#DFF3DF] px-4 text-[12px] font-bold text-[#3D8A43] md:text-[13px]">
              <Check size={14} />
              Delivered
            </span>
            <p className="mt-3 text-[12px] text-[#99A1AE] md:text-[13px]">Delivered on 28 Feb 2026</p>
          </div>
        </div>

        <div className="mt-6 border-t border-[#ECEEF2] pt-6 md:mt-8 md:pt-9">
          <div className="mb-4 flex flex-col gap-1 md:hidden">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-[#2F2B2B]">
              Secured Armored Delivery Tracker
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-[#D44A62]">
              <Truck size={12} />
              Sequel Logistics Express
            </span>
          </div>

          <div className="grid grid-cols-4 gap-0">
            {timeline.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative flex flex-col items-center text-center">
                  <div
                    className={`absolute top-[15px] h-0.5 bg-[#CB485E] ${
                      index === 0
                        ? "left-1/2 w-1/2"
                        : index === timeline.length - 1
                          ? "right-1/2 w-1/2"
                          : "left-0 w-full"
                    }`}
                  />
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CB485E] text-white">
                    <Icon size={14} className="md:h-4 md:w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold leading-tight text-[#D44A62] md:text-[16px] md:text-[#252B36]">{step.label}</p>
                    <p className="mt-1 text-[9px] leading-tight text-[#9AA3AF] md:text-[13px]">{index < 3 ? "24 Feb" : "28 Feb"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hidden rounded-xl border border-[#ECEEF2] bg-white p-5 shadow-sm md:block md:rounded-2xl md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex gap-5">
            <div className="relative h-[122px] w-[122px] shrink-0 overflow-hidden rounded-xl bg-[#F4F2EF]">
              <Image src="/Dashboard/productimg.png" alt="Aria Floral Pavé Stud Earrings" fill sizes="122px" className="object-cover" />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-[#FBE3E8] px-3 py-1 text-[12px] font-semibold text-[#D44A62]">
                IGI Certified Natural Diamonds
              </span>
              <h2 className="mt-3 font-serif text-[22px] font-medium leading-tight text-[#171B25] md:text-[24px]">
                Aria Floral Pavé Stud Earrings
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#6F7785]">
                <span>Metal: 18K Rose Gold</span>
                <span>Carat: 0.42 ct VVS-VS</span>
                <span>BIS Hallmarked</span>
                <span>Qty: 1</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ReviewModalTrigger className="inline-flex h-10 items-center gap-2 rounded-full bg-[#CB485E] px-5 text-[13px] font-bold text-white" />
                <button className="inline-flex h-10 items-center gap-2 rounded-full border border-[#CB485E] px-5 text-[13px] font-bold text-[#CB485E]">
                  <ShoppingCart size={14} />
                  Buy Again
                </button>
              </div>
            </div>
          </div>

          <div className="md:min-w-[150px] md:text-right">
            <p className="font-serif text-[28px] font-bold leading-none text-[#D44A62]">₹42,850</p>
            <p className="mt-2 text-[13px] text-[#9AA3AF]">Inclusive of All Taxes</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 rounded-xl border border-[#ECEEF2] bg-white p-3 shadow-sm min-[380px]:gap-3 md:hidden">
        <ReviewModalTrigger className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#CB485E] px-2 text-[10px] font-bold text-white min-[380px]:gap-2 min-[380px]:px-4 min-[380px]:text-[11px]" />
        <button className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#CB485E] px-2 text-[10px] font-bold text-[#CB485E] min-[380px]:gap-2 min-[380px]:px-4 min-[380px]:text-[11px]">
          <ShoppingCart size={13} />
          Buy Again
        </button>
      </section>

      <section className="grid rounded-xl border border-[#ECEEF2] bg-white p-5 shadow-sm md:grid-cols-3 md:rounded-2xl md:p-8">
        <div className="border-b border-[#ECEEF2] pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          <h2 className="font-serif text-[18px] font-bold text-[#171B25]">Order Summary</h2>
          <div className="mt-5 space-y-3 text-[14px]">
            {summaryRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-[#6F7785]">{label}</span>
                <span className={value === "Free" ? "font-semibold text-green-600" : "font-semibold text-[#252B36]"}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[#ECEEF2] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#171B25]">Total Paid</span>
              <span className="font-serif text-[20px] font-bold text-[#D44A62]">₹42,850</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-[14px]">
              <span className="text-[#6F7785]">Payment Method</span>
              <span className="font-bold text-[#252B36]">•••• 4242 (UPI)</span>
            </div>
          </div>
        </div>

        <div className="border-b border-[#ECEEF2] py-6 md:border-b-0 md:border-r md:px-8 md:py-0">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[18px] font-bold text-[#171B25]">Shipping Address</h2>
            <button className="inline-flex items-center gap-1.5 text-[13px] text-[#D44A62]">
              Change
            </button>
          </div>
          <div className="mt-5 text-[14px] leading-[22px] text-[#6F7785]">
            <p className="font-bold text-[#252B36]">John Doe</p>
            <p className="mt-2">123, Sunrise Apartments</p>
            <p>Tonk Road, Jaipur - 302015</p>
            <p>Rajasthan, India</p>
            <p className="mt-3 font-semibold text-[#252B36]">+91 98765 43210</p>
          </div>
        </div>

        <div className="pt-6 md:pl-8 md:pt-0">
          <h2 className="font-serif text-[18px] font-bold text-[#171B25]">Delivery Partner</h2>
          <div className="mt-6 flex items-center gap-3 text-[14px] font-bold text-[#252B36]">
            <Truck size={17} className="text-[#B16425]" />
            Sequel Logistics Express
          </div>
          <p className="mt-4 text-[14px] text-[#6F7785]">Tracking ID: <span className="font-bold text-[#252B36]">SAL48401</span></p>
          <button className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#CB485E] px-7 text-[13px] font-bold text-[#CB485E]">
            Track Package
            <ExternalLink size={14} />
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-[#F6D7DF] bg-[#FBE8EE] p-4 shadow-sm md:rounded-2xl md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#CB485E] shadow-sm md:h-14 md:w-14">
              <Headphones size={23} />
            </div>
            <div className="max-w-[560px]">
              <h2 className="text-[17px] font-bold text-[#171B25]">Need Help?</h2>
              <p className="mt-1 text-[13px] leading-[18px] text-[#6F7785] md:text-[14px]">
                For any issues related to this order, please contact our support team.
              </p>
            </div>
          </div>
          <button className="h-11 rounded-xl border border-[#CB485E] bg-white/35 px-7 text-[13px] font-bold text-[#B82E46] transition-colors hover:bg-white md:min-w-[180px]">
            Contact Support →
          </button>
        </div>
      </section>
    </main>
  );
}
