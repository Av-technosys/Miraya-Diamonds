import { CalendarDays, Check, CircleCheck, Clock3, Folder, MessageCircle, ShieldCheck } from "lucide-react";

const enquiries = [
  { id: "ENQ-00124", product: "Floral Diamond Ring", status: "Under Review", detail: "Our team is reviewing your request.", note: "", icon: Clock3, color: "bg-[#fff7dc] text-[#a85a09]" },
  { id: "ENQ-00125", product: "Diamond Necklace", status: "Response Received", detail: "", note: "Starting at ₹42,000", icon: Check, color: "bg-[#ddfbed] text-[#006e49]" },
  { id: "ENQ-00126", product: "Stud Earrings", status: "Consultation Scheduled", detail: "In-store consultation at Jaipur Showroom.", note: "12 Oct 2026, 4:30 PM", icon: CalendarDays, color: "bg-[#e8f3ff] text-[#006198]" },
  { id: "ENQ-00127", product: "Floral Diamond Ring", status: "Closed", detail: "Thank you for connecting with us.", note: "Enquiry completed.", icon: Check, color: "bg-[#efedeb] text-[#48413d]" },
];
const stats = [
  { label: "Total Enquiries", count: enquiries.length, icon: MessageCircle, color: "bg-[#ecfbf5] text-[#008b62]" },
  { label: "Under Review", count: enquiries.filter(item => item.status === "Under Review").length, icon: Clock3, color: "bg-[#fffae9] text-[#d9a71d]" },
  { label: "Response Received", count: enquiries.filter(item => ["Response Received", "Consultation Scheduled"].includes(item.status)).length, icon: CircleCheck, color: "bg-[#edfff3] text-[#00a457]" },
  { label: "Closed", count: enquiries.filter(item => item.status === "Closed").length, icon: Folder, color: "bg-[#f5f4f3] text-[#6b6662]" },
];

function EnquiryIcon() {
  return <span className="grid size-14 shrink-0 place-items-center rounded-xl border border-[#e9e6e3] bg-[#f6f5f4]"><svg width="32" height="38" viewBox="0 0 32 38" fill="none" aria-hidden="true"><ellipse cx="16" cy="24" rx="11" ry="13" stroke="#dfa15b" strokeWidth="1.6" /><path d="m11 10 3-4h4l3 4-5 7-5-7Z" fill="#fff" stroke="#b48a60" strokeWidth=".8" /><path d="M11 10h10M14 6l2 11 2-11" stroke="#b48a60" strokeWidth=".6" /><circle cx="8" cy="13" r="2.5" fill="white" stroke="#b48a60" strokeWidth=".7" /><circle cx="24" cy="13" r="2.5" fill="white" stroke="#b48a60" strokeWidth=".7" /></svg></span>;
}

export default function EnquiriesPage() {
  return (
    <div className="space-y-6">
      <section aria-labelledby="enquiries-title" className="rounded-xl bg-white p-5 shadow-[0_6px_20px_rgba(33,78,52,0.025)] sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3"><h1 id="enquiries-title" className="font-serif text-[29px] font-semibold leading-none text-[#292929] sm:text-[32px]">My Enquiries</h1><span className="rounded-full bg-[#ffebbd] px-3 py-1 text-[10px] text-[#64533c]">{enquiries.length} Total Enquiries</span></div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FFF7] px-3 py-1.5 text-[10px] font-medium text-[#214E34]"><ShieldCheck size={12} />Insured Transit</span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, count, icon: Icon, color }) => <div key={label} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#eae8e5] px-3 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"><span className={`grid size-9 shrink-0 place-items-center rounded-lg ${color}`}><Icon size={16} strokeWidth={1.6} /></span><div className="min-w-0"><p className="text-base font-semibold leading-tight text-[#363333]">{count}</p><p className="mt-0.5 text-[9px] leading-tight text-[#77706c]">{label}</p></div></div>)}
        </div>
      </section>
      <section aria-label="Your enquiries" className="space-y-3">
        {enquiries.map(({ id, product, status, detail, note, icon: Icon, color }) => (
          <article key={id} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-xl bg-white p-3.5 shadow-[0_2px_3px_rgba(33,78,52,0.03)] sm:gap-x-4 lg:grid-cols-[auto_130px_minmax(0,1fr)_minmax(155px,0.9fr)]">
            <EnquiryIcon />
            <div><p className="text-xs font-semibold text-[#302c2b]">{id}</p><p className="mt-1 text-[11px] text-[#a19a97]">10 Oct 2026, 11:30 AM</p></div>
            <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 lg:col-auto lg:border-l lg:border-[#f5f3f1] lg:pl-4"><h2 className="font-serif text-xl font-medium leading-tight text-[#302c2b]">{product}</h2><p className="mt-0.5 text-xs leading-relaxed text-[#837a75]">I&apos;d like to customize the rose-gold setting.</p></div>
            <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 lg:col-auto lg:text-right">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] leading-none ${color}`}><Icon size={11} strokeWidth={1.8} />{status}</span>
              {note && <p className="mt-1 text-xs font-medium text-[#4c4642]">{note}</p>}
              {detail && <p className="mt-1 text-[10px] leading-tight text-[#a19a97]">{detail}</p>}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
