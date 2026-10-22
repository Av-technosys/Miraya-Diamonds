"use client";

import { useState, useMemo, useTransition } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  RefreshCw,
  X,
  Check,
  MapPin,
  Mail,
  Phone,
  User,
  Calendar,
} from "lucide-react";
import {
  getAdminUsers,
  adminUpdateUser,
  adminDeleteUser,
  type AdminUserView,
} from "@/lib/actions/users";
import { validateAndFormatPhone } from "@/lib/account-profile";

interface UsersTableProps {
  initialUsers?: AdminUserView[];
}

export function UsersTable({ initialUsers = [] }: UsersTableProps) {
  const [users, setUsers] = useState<AdminUserView[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState<string>("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Edit Modal State
  const [editingUser, setEditingUser] = useState<AdminUserView | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [isPending, startTransition] = useTransition();
  const [modalFeedback, setModalFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Refresh handler
  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      const freshUsers = await getAdminUsers();
      setUsers(freshUsers);
    } catch (err) {
      console.error("Failed to refresh users:", err);
    } finally {
      setIsRefreshing(false);
    }
  }

  // Open Edit Modal
  function handleOpenEdit(user: AdminUserView) {
    setEditingUser(user);
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhone(user.phone === "—" ? "" : user.phone);
    setAddress(user.address || "");
    setGender(user.gender || "");
    setBirthday(user.birthday || "");
    setAnniversary(user.anniversary || "");
    setModalFeedback(null);
  }

  // Close Edit Modal
  function handleCloseEdit() {
    setEditingUser(null);
    setModalFeedback(null);
  }

  // Save User Edits
  function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;

    if (!firstName.trim()) {
      setModalFeedback({
        type: "error",
        message: "First name cannot be empty.",
      });
      return;
    }

    let formattedPhone = phone.trim();
    if (formattedPhone) {
      const phoneValidation = validateAndFormatPhone(formattedPhone);
      if (!phoneValidation.isValid) {
        setModalFeedback({
          type: "error",
          message:
            phoneValidation.error ||
            "Please enter a valid 10-digit mobile number.",
        });
        return;
      }
      formattedPhone = phoneValidation.formatted;
    }

    startTransition(async () => {
      const result = await adminUpdateUser(editingUser.id, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobileNumber: formattedPhone,
        address: address.trim() || null,
        gender: gender.trim() || null,
        birthday: birthday || null,
        anniversary: anniversary || null,
      });

      if (result.success) {
        const updatedFullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "Valued Collector";
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  name: updatedFullName,
                  firstName: firstName.trim(),
                  lastName: lastName.trim(),
                  phone: formattedPhone || "—",
                  address: address.trim() || null,
                  gender: gender.trim() || null,
                  birthday: birthday || null,
                  anniversary: anniversary || null,
                }
              : u
          )
        );
        setModalFeedback({
          type: "success",
          message: "User details updated successfully in database.",
        });
        setTimeout(() => {
          handleCloseEdit();
        }, 1200);
      } else {
        setModalFeedback({
          type: "error",
          message: result.error || "Failed to update user. Please try again.",
        });
      }
    });
  }

  // Delete User
  function handleDeleteUser(user: AdminUserView) {
    if (
      !confirm(
        `Are you sure you want to remove user "${user.name}" (${user.email}) from the database?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await adminDeleteUser(user.id);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      } else {
        alert(res.error || "Could not delete user.");
      }
    });
  }

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
          <div className="text-[11px] text-[#A8A29E]">
            Registered customer accounts
          </div>
        </div>
        <div className="rounded-xl border border-[#EAE6DE] bg-white p-4 shadow-xs">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
            Email Verified
          </div>
          <div className="mt-1 text-[24px] font-bold text-emerald-800">
            {verifiedCount}
          </div>
          <div className="text-[11px] text-emerald-700/80">
            Confirmed email credentials
          </div>
        </div>
        <div className="rounded-xl border border-[#EAE6DE] bg-white p-4 shadow-xs">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
            Unverified
          </div>
          <div className="mt-1 text-[24px] font-bold text-amber-700">
            {unverifiedCount}
          </div>
          <div className="text-[11px] text-amber-700/80">
            Awaiting verification
          </div>
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
              placeholder="Search by name, email, phone, address..."
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs font-medium text-[#44403C] hover:bg-white hover:text-[#161D1A] transition-colors disabled:opacity-50"
            title="Refresh database records"
          >
            <RefreshCw
              size={13}
              className={isRefreshing ? "animate-spin text-[#C5A880]" : ""}
            />
            <span>Refresh</span>
          </button>
          <div className="text-xs text-[#78716C]">
            Showing{" "}
            <span className="font-semibold text-[#161D1A]">
              {filteredUsers.length}
            </span>{" "}
            users
          </div>
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
                <th className="px-4 py-3.5">Joined</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-sm text-[#A8A29E]"
                  >
                    No users found matching your criteria.
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
                    <td className="px-4 py-4 text-[#44403C]">{user.email}</td>

                    {/* Phone */}
                    <td className="px-4 py-4 font-mono text-xs text-[#57534E]">
                      {user.phone}
                    </td>

                    {/* Address (optional) */}
                    <td className="px-4 py-4 text-[#57534E] max-w-xs truncate">
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
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
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
                    <td className="px-4 py-4 text-[#78716C]">
                      {user.joinedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(user)}
                          className="grid size-7 place-items-center rounded-md border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C5A880] hover:text-[#161D1A] transition-colors"
                          title="Edit User"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user)}
                          className="grid size-7 place-items-center rounded-md border border-[#E7E2D8] bg-white text-[#8C7350] hover:border-red-300 hover:text-red-700 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#EAE6DE] bg-white p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#161D1A]">
                  Edit User Profile
                </h3>
                <p className="mt-0.5 text-xs text-[#78716C]">
                  Update user information stored in the database
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseEdit}
                className="grid size-8 place-items-center rounded-lg text-[#78716C] hover:bg-[#FAF8F5] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4 text-xs">
              {/* Email (Readonly identity) */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#57534E]">
                  Email Address (Primary Identity)
                </label>
                <div className="flex h-10 items-center gap-2 rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-[#78716C]">
                  <Mail size={14} className="text-[#A8A29E]" />
                  <span>{editingUser.email}</span>
                  {editingUser.emailVerified && (
                    <span className="ml-auto text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-[#161D1A]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="h-10 w-full rounded-lg border border-[#E7E2D8] bg-white px-3 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-[#161D1A]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="h-10 w-full rounded-lg border border-[#E7E2D8] bg-white px-3 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#161D1A]">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-10 w-full rounded-lg border border-[#E7E2D8] bg-white pl-9 pr-3 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Address (optional) */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#161D1A]">
                  Address (optional)
                </label>
                <div className="relative">
                  <MapPin
                    size={14}
                    className="absolute left-3 top-3 text-[#A8A29E]"
                  />
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Flat No., Street, City, State, PIN Code"
                    className="w-full rounded-lg border border-[#E7E2D8] bg-white pl-9 pr-3 py-2 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Gender (optional) */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#161D1A]">
                  Gender (optional)
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#E7E2D8] bg-white px-3 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                >
                  <option value="">Not Specified</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Special Dates (Birthday & Anniversary) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-[#161D1A]">
                    Birthday (optional)
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#E7E2D8] bg-white px-3 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-[#161D1A]">
                    Anniversary (optional)
                  </label>
                  <input
                    type="date"
                    value={anniversary}
                    onChange={(e) => setAnniversary(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#E7E2D8] bg-white px-3 text-xs text-[#161D1A] focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Feedback Alert */}
              {modalFeedback && (
                <div
                  className={`rounded-lg p-3 text-xs ${
                    modalFeedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {modalFeedback.message}
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0EBE3]">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  disabled={isPending}
                  className="rounded-lg border border-[#E7E2D8] bg-white px-4 py-2 text-xs font-medium text-[#57534E] hover:bg-[#FAF8F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#214E34] px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#193e29] transition-colors disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
