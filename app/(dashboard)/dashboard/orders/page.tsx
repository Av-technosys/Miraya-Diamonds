import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CircleDot,
  FileText,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

const filters = ["All Order (3)", "In Transit (1)", "Delivered (2)", "Cancelled (0)"];

const trackerSteps = [
  { label: "Order Placed", date: "Expected 28 Feb", done: true, icon: Check },
  { label: "Hallmarked & Insured", date: "Expected 28 Feb", done: true, icon: ShieldCheck },
  { label: "Dispatched", date: "Expected 28 Feb", done: true, icon: LockKeyhole },
  { label: "Out for Delivery", date: "Expected 28 Feb", done: false, icon: CircleDot },
];

const deliveredOrders = [
  {
    id: "#AJ-941082",
    date: "Ordered 09 Jan 2026",
    status: "Delivered on 14 Jan 2026",
    title: "Classic Circle Diamond Solitaire Pendant",
    collection: "Solitaire Collection",
    details: "Metal: 18K Yellow Gold • Diamond: 0.30 ct Solitaire • Hallmark: BIS Certified",
    certificate: "IGI Certificate #4892019482 verified",
    price: "₹32,500",
    points: "Earned 650 Privé Points",
  },
  {
    id: "#AJ-892401",
    date: "Ordered 29 Nov 2025",
    status: "Delivered on 05 Dec 2025",
    title: "Eternity Tennis Bracelet in 950 Platinum",
    collection: "Privé Haute Line",
    details: "Metal: Platinum 950 • Diamond: 1.85 ct GH-VVS • Length: 7.0 Inches",
    certificate: "IGI Certificate #4892019482 verified",
    price: "₹62,990",
    points: "Earned 1,260 Privé Points",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <section className="rounded-xl border border-white/70 bg-white p-4 shadow-sm md:rounded-2xl md:px-8 md:py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-[26px] font-bold leading-none text-[#2F2B2B] md:text-[30px]">
                My Orders
              </h1>
              <span className="rounded-full bg-[#F7E3B5] px-4 py-1.5 text-[12px] font-medium text-[#7B5B16]">
                3 Total Orders
              </span>
            </div>

            <span className="mt-4 inline-flex h-8 w-max items-center gap-2 rounded-full bg-[#FFF0F2] px-3 text-[11px] font-semibold text-[#CB485E] md:hidden">
              <ShieldCheck size={13} />
              Insured Transit
            </span>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:mt-6 md:flex-wrap md:overflow-visible md:pb-0">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  className={`h-9 shrink-0 rounded-lg px-4 text-[12px] font-bold ${
                    index === 0 ? "bg-[#CB485E] text-white" : "bg-[#FBE3E8] text-[#CB485E]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <span className="hidden h-9 w-max items-center gap-2 rounded-full bg-[#FFF0F2] px-4 text-[12px] font-semibold text-[#CB485E] md:inline-flex">
            <ShieldCheck size={14} />
            Insured Transit
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-white/70 bg-white p-4 shadow-sm md:rounded-3xl md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-[12px]">
            <span className="font-medium uppercase text-[#D44A62]">Order ID</span>
            <span className="text-[18px] font-bold text-[#2F2B2B]">#AJ-984210</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C8CC]" />
            <span className="text-[#5B5555]">Placed on 22 Feb 2026</span>
          </div>

          <span className="inline-flex h-auto min-h-8 w-fit max-w-full items-center gap-2 rounded-full bg-[#F8E8B8] px-3 py-1.5 text-[10px] leading-tight text-[#594B2D] md:px-4 md:text-[11px]">
            <span className="h-2 w-2 rounded-full bg-[#9A6A12]" />
            In Transit • Delivery Tomorrow, 28 Feb
          </span>
        </div>

        <div className="mt-7 hidden rounded-xl bg-[#F4F2EF] p-4 md:flex md:items-center md:justify-between md:gap-6 md:p-5">
          <div className="flex gap-4 md:items-center">
            <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-xl border-4 border-white bg-white shadow-sm">
              <Image
                src="/Dashboard/productimg.png"
                alt="Aria Floral Pavé Stud Earrings"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div>
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-[#D44A62]">
                IGI Certified Natural Diamonds
              </span>
              <h2 className="mt-3 font-serif text-[21px] font-bold leading-tight text-[#2F2B2B] md:text-[25px]">
                Aria Floral Pavé Stud Earrings
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#5B5555]">
                <span>Qty: 1</span>
                <span>Metal: 18K Rose Gold</span>
                <span>Carat: 0.42 ct VVS-VS</span>
                <span>BIS Hallmarked</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-left md:mt-0 md:min-w-[130px] md:text-right">
            <p className="text-[11px] text-[#5B5555]">Total Amount</p>
            <p className="font-serif text-[24px] font-bold leading-none text-[#D44A62]">₹42,850</p>
            <p className="mt-1 text-[11px] text-[#807777]">Inclusive of All Taxes</p>
          </div>
        </div>

        <div className="mt-9">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#2F2B2B]">
              Secured Armored Delivery Tracker
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-[#D44A62]">
              <Truck size={14} />
              Sequel Logistics Express
            </span>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-0 md:mt-9">
            {trackerSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative flex flex-col items-center text-center">
                  <div
                    className={`absolute top-[15px] h-1 ${
                      index === 0
                        ? "left-1/2 w-1/2"
                        : index === trackerSteps.length - 1
                          ? "right-1/2 w-1/2"
                          : "left-0 w-full"
                    } ${index < 3 ? "bg-[#CB485E]" : "bg-[#E8E1E1]"}`}
                  />
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      step.done ? "bg-[#CB485E] text-white" : "bg-[#F4F2EF] text-[#A89D9D]"
                    }`}
                  >
                    <Icon size={13} className="md:h-[15px] md:w-[15px]" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold leading-tight md:text-[14px] ${step.label === "Dispatched" ? "text-[#CB485E]" : "text-[#3F3A39]"}`}>
                      {step.label}
                    </p>
                    <p className="mt-1 text-[9px] leading-tight text-[#807777] md:text-[12px]">{step.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

          <div className="mt-7 flex flex-col gap-4 md:mt-9 md:flex-row md:items-center md:justify-between">
            <p className="text-[12px] text-[#5B5555]">
              OTP verification required upon doorstep delivery
            </p>
          <div className="grid grid-cols-2 gap-2 min-[380px]:gap-3 md:flex">
            <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#F4F2EF] px-3 text-[10px] font-bold uppercase text-[#2F2B2B] min-[380px]:px-6 min-[380px]:text-[12px]">
              <FileText size={14} />
              View Invoice
            </button>
            <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#CB485E] px-3 text-[10px] font-bold uppercase text-white min-[380px]:px-7 min-[380px]:text-[12px]">
              <PackageCheck size={14} />
              Track Package
            </button>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 px-3">
        <h2 className="font-serif text-[19px] font-medium text-[#2F2B2B] min-[380px]:text-[22px]">Delivered Keepsakes</h2>
        <span className="shrink-0 text-right text-[10px] text-[#5B5555] min-[380px]:text-[12px]">2 Successful Deliveries</span>
      </div>

      {deliveredOrders.map((order) => (
        <article
          key={order.id}
          className="rounded-xl border border-white/70 bg-white p-3 shadow-sm md:rounded-3xl md:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[11px] min-[380px]:gap-3 min-[380px]:text-[12px]">
              <span className="font-medium uppercase text-[#D44A62]">Order ID</span>
              <span className="text-[18px] font-bold text-[#2F2B2B]">{order.id}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8C8CC]" />
              <span className="text-[#5B5555]">{order.date}</span>
            </div>
            <span className="inline-flex h-8 w-max items-center gap-2 rounded-full bg-[#F7F4F1] px-4 text-[11px] text-[#454545]">
              <Check size={13} className="text-[#D44A62]" />
              {order.status}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:mt-8 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            <div className="flex gap-3 md:gap-5 md:items-center">
              <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-lg border-4 border-[#F4F2EF] bg-white shadow-sm md:h-[96px] md:w-[96px] md:rounded-xl">
                <Image src="/Dashboard/productimg.png" alt={order.title} fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <span className="inline-flex rounded-full bg-[#FBE3E8] px-2.5 py-1 text-[10px] text-[#D44A62] md:px-3 md:text-[11px]">
                  {order.collection}
                </span>
                <h3 className="mt-2 font-serif text-[15px] font-medium leading-tight text-[#3F3A39] md:mt-3 md:text-[26px]">
                  {order.title}
                </h3>
                <p className="mt-1 text-[10px] leading-[14px] text-[#706868] md:mt-2 md:text-[13px] md:leading-[18px]">{order.details}</p>
              </div>
            </div>

            <div className="text-right md:min-w-[150px]">
              <p className="text-[11px] text-[#D44A62]">Paid</p>
              <p className="font-serif text-[22px] font-bold leading-none text-[#2F2B2B] md:text-[27px]">{order.price}</p>
              <p className="mt-2 text-[12px] text-[#D44A62]">{order.points}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-5">
            <p className="flex items-center gap-2 text-[11px] leading-[15px] text-[#D44A62] min-[380px]:text-[13px]">
              <ShieldCheck size={16} />
              {order.certificate}
            </p>
            <Link
              href="/dashboard/orders/AJ-984210"
              className="flex h-11 items-center justify-center rounded-full bg-[#CB485E] px-8 text-[12px] font-bold uppercase text-white md:h-12 md:min-w-[180px] md:px-10 md:text-[13px]"
            >
              View Details
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
