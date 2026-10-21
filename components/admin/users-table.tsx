"use client";

import { useState, useMemo } from "react";
import { Search, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { initialUsers, type AdminUser } from "./mock-data";

export function UsersTable() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState<string>("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase()) ||
        (user.address && user.address.toLowerCase().includes(search.toLowerCase()));
      const matchesVerified =
        verifiedFilter === "All" ||
        (verifiedFilter === "Verified" ? user.emailVerified : !user.emailVerified);
      return matchesSearch && matchesVerified;
    });
  }, [users, search, verifiedFilter]);

  const verifiedCount = users.filter((u) => u.emailVerified).length;
  const unverifiedCount = users.filter((u) => !u.emailVerified).length;

  return (
    <div className="space-y-6">
      {/* Metric summary bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#EAE6DE] bg-white p-4 shadow-xs">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
            Total Users
          </div>
          <div className="mt-1 text-[24px] font-bold text-[#161D1A]">
            {users.length}
          </div>
          <div className="text-[11px] text-[#A8A29E]">Registered customer accounts</div>
        </div>
        <div className="rounded-xl border border-[#EAE6DE] bg-white p-4 shadow-xs">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
            Email Verified
          </div>
          <div className="mt-1 text-[24px] font-bold text-emerald-800">
            {verifiedCount}
          </div>
          <div className="text-[11px] text-emerald-700/80">Confirmed email credentials</div>
        </div>
        <div className="rounded-xl border border-[#EAE6DE] bg-white p-4 shadow-xs">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
            Unverified
          </div>
          <div className="mt-1 text-[24px] font-bold text-amber-700">
            {unverifiedCount}
          </div>
          <div className="text-[11px] text-amber-700/80">Awaiting verification</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EAE6DE] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] pl-9 pr-3 text-xs text-[#1C1B1A] placeholder:text-[#A8A29E] transition-all focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Email Verified Filter */}
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-2.5 text-xs text-[#44403C] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
          >
            <option value="All">All Verification Statuses</option>
            <option value="Verified">Email Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>

        <div className="text-xs text-[#78716C]">
          Showing <span className="font-semibold text-[#161D1A]">{filteredUsers.length}</span> users
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EAE6DE] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#F0EBE3] bg-[#FAF8F5] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
              <tr>
                <th className="py-3.5 pl-6 pr-4 w-16 text-center">S.No</th>
                <th className="px-4 py-3.5">Name</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">Phone</th>
                <th className="px-4 py-3.5">Address (optional)</th>
                <th className="px-4 py-3.5 text-center">Email Verified</th>
                <th className="py-3.5 pl-4 pr-6">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#A8A29E]">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-[#FAF8F5]/80"
                  >
                    {/* S.No */}
                    <td className="py-4 pl-6 pr-4 text-center font-mono text-xs text-[#8C7350] font-semibold">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4 font-semibold text-[#161D1A]">
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 text-[#44403C]">
                      {user.email}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-4 font-mono text-xs text-[#57534E]">
                      {user.phone}
                    </td>

                    {/* Address (optional) */}
                    <td className="px-4 py-4 text-[#57534E]">
                      {user.address ? (
                        <span>{user.address}</span>
                      ) : (
                        <span className="text-[#A8A29E] italic">—</span>
                      )}
                    </td>

                    {/* Email Verified */}
                    <td className="px-4 py-4 text-center">
                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                          <XCircle size={12} className="text-amber-600" />
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="py-4 pl-4 pr-6 text-[#78716C]">
                      {user.joinedDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
