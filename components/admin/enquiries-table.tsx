"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MessageSquareText,
  Clock,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  ChevronRight,
} from "lucide-react";
import { initialEnquiries, type AdminEnquiry } from "./mock-data";

export function EnquiriesTable() {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeEnquiry, setActiveEnquiry] = useState<AdminEnquiry | null>(null);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const matchesSearch =
        enq.customerName.toLowerCase().includes(search.toLowerCase()) ||
        enq.email.toLowerCase().includes(search.toLowerCase()) ||
        enq.subject.toLowerCase().includes(search.toLowerCase()) ||
        enq.enquiryNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || enq.status === statusFilter;
      const matchesType = typeFilter === "All" || enq.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [enquiries, search, statusFilter, typeFilter]);

  function handleStatusChange(id: string, newStatus: AdminEnquiry["status"]) {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (activeEnquiry && activeEnquiry.id === id) {
      setActiveEnquiry({ ...activeEnquiry, status: newStatus });
    }
  }

  const pendingCount = enquiries.filter((e) => e.status === "Pending").length;
  const inReviewCount = enquiries.filter((e) => e.status === "In Review").length;
  const resolvedCount = enquiries.filter((e) => e.status === "Resolved").length;

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 shadow-xs">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
              Pending Consultation
            </div>
            <div className="mt-1 text-[24px] font-bold text-amber-950">
              {pendingCount}
            </div>
            <div className="text-[11px] text-amber-700/80">Awaiting artisan reply</div>
          </div>
          <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800">
            <Clock size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-blue-200/80 bg-blue-50/50 p-4 shadow-xs">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-900">
              In Review / CAD Design
            </div>
            <div className="mt-1 text-[24px] font-bold text-blue-950">
              {inReviewCount}
            </div>
            <div className="text-[11px] text-blue-700/80">Assigned to design team</div>
          </div>
          <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-blue-800">
            <Sparkles size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 shadow-xs">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-900">
              Resolved & Quoted
            </div>
            <div className="mt-1 text-[24px] font-bold text-emerald-950">
              {resolvedCount}
            </div>
            <div className="text-[11px] text-emerald-700/80">Completed consultations</div>
          </div>
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EAE6DE] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client, ID, or subject..."
              className="h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] pl-9 pr-3 text-xs text-[#1C1B1A] placeholder:text-[#A8A29E] transition-all focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-2.5 text-xs text-[#44403C] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-2.5 text-xs text-[#44403C] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
          >
            <option value="All">All Inquiry Types</option>
            <option value="Custom Jewellery">Custom Jewellery</option>
            <option value="Lab-Grown Consultation">Lab-Grown Consultation</option>
            <option value="Appointment Request">Appointment Request</option>
            <option value="Product Inquiry">Product Inquiry</option>
          </select>
        </div>

        <div className="text-xs text-[#78716C]">
          Showing <span className="font-semibold text-[#161D1A]">{filteredEnquiries.length}</span> briefs
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EAE6DE] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#F0EBE3] bg-[#FAF8F5] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
              <tr>
                <th className="py-3.5 pl-6 pr-4">Enquiry ID & Client</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Bespoke Subject & Brief</th>
                <th className="px-4 py-3.5">Estimated Budget</th>
                <th className="px-4 py-3.5">Date Received</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#A8A29E]">
                    No enquiries found matching your selected filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className="group transition-colors hover:bg-[#FAF8F5]/80"
                  >
                    {/* ID & Client */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="font-mono text-[11px] font-semibold text-[#8C7350]">
                        {enq.enquiryNumber}
                      </div>
                      <div className="font-semibold text-[#161D1A]">
                        {enq.customerName}
                      </div>
                      <div className="text-[11px] text-[#78716C]">
                        {enq.email}
                      </div>
                    </td>

                    {/* Inquiry Type */}
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-md border border-[#E7E2D8] bg-[#FAF8F5] px-2 py-0.5 text-[10.5px] font-medium text-[#44403C]">
                        {enq.type}
                      </span>
                    </td>

                    {/* Subject & snippet */}
                    <td className="max-w-xs px-4 py-4">
                      <div className="truncate font-medium text-[#161D1A]">
                        {enq.subject}
                      </div>
                      <div className="truncate text-[11px] text-[#78716C]">
                        {enq.message}
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="px-4 py-4 font-semibold text-[#8C7350]">
                      {enq.budget || "Unspecified"}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-[#78716C]">
                      {enq.date}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          enq.status === "Pending"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : enq.status === "In Review"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            enq.status === "Pending"
                              ? "bg-amber-500"
                              : enq.status === "In Review"
                              ? "bg-blue-500"
                              : "bg-emerald-600"
                          }`}
                        />
                        {enq.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveEnquiry(enq)}
                        className="rounded-full border border-[#E3DDD4] bg-white px-3 py-1 text-xs font-semibold text-[#161D1A] transition-colors hover:border-[#214E34] hover:bg-[#214E34] hover:text-white"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Drawer / Modal */}
      {activeEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setActiveEnquiry(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#EAE6DE] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#F0EBE3] bg-[#FAF8F5] px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#8C7350]">
                    {activeEnquiry.enquiryNumber}
                  </span>
                  <span className="text-xs text-[#A8A29E]">•</span>
                  <span className="text-xs font-medium text-[#44403C]">
                    {activeEnquiry.type}
                  </span>
                </div>
                <h3 className="mt-0.5 text-[17px] font-bold text-[#161D1A]">
                  Client Consultation Brief
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="grid size-8 place-items-center rounded-lg text-[#78716C] hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 p-6 text-xs">
              {/* Customer Contact */}
              <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3.5">
                <div className="font-semibold text-sm text-[#161D1A]">
                  {activeEnquiry.customerName}
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-[#78716C]">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-[#C5A880]" />
                    {activeEnquiry.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-[#C5A880]" />
                    {activeEnquiry.phone}
                  </span>
                </div>
              </div>

              {/* Subject & Message */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                  Subject
                </span>
                <p className="mt-1 font-medium text-sm text-[#161D1A]">
                  {activeEnquiry.subject}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                  Customer Requirements & Design Notes
                </span>
                <div className="mt-1 rounded-xl border border-[#E7E2D8] bg-[#FAF8F5] p-3.5 leading-relaxed text-[#44403C]">
                  {activeEnquiry.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                    Target Budget
                  </span>
                  <p className="mt-0.5 text-sm font-semibold text-[#8C7350]">
                    {activeEnquiry.budget || "Flexible"}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                    Submitted On
                  </span>
                  <p className="mt-0.5 text-[#44403C]">{activeEnquiry.date}</p>
                </div>
              </div>

              {/* Status Switcher */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                  Update Consultation Status
                </span>
                <div className="mt-2 flex gap-2">
                  {(["Pending", "In Review", "Resolved"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(activeEnquiry.id, st)}
                      className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-all ${
                        activeEnquiry.status === st
                          ? st === "Pending"
                            ? "border-amber-400 bg-amber-100 text-amber-900"
                            : st === "In Review"
                            ? "border-blue-400 bg-blue-100 text-blue-900"
                            : "border-emerald-500 bg-emerald-100 text-emerald-900"
                          : "border-[#E7E2D8] bg-white text-[#78716C] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#F0EBE3] bg-[#FAF8F5] px-6 py-3.5">
              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="text-xs font-medium text-[#78716C] hover:text-[#161D1A]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(
                    `Opening secure email thread with ${activeEnquiry.customerName} (${activeEnquiry.email})`
                  );
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#214E34] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1A3F2A]"
              >
                <Mail size={13} />
                <span>Reply to Customer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

