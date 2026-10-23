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
} from "lucide-react";
import {
  getAdminUsers,
  adminUpdateUser,
  adminDeleteUser,
  type AdminUserView,
} from "@/lib/actions/users";
import { validateAndFormatPhone } from "@/lib/account-profile";
import { SuccessModal } from "./success-modal";
import { ConfirmDeleteModal } from "./confirm-delete-modal";

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

  // Success popup & Delete confirmation modal states
  const [successPopup, setSuccessPopup] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({ isOpen: false, title: "Success!", message: "" });

  const [userToDelete, setUserToDelete] = useState<AdminUserView | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

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
          setSuccessPopup({
            isOpen: true,
            title: "User Updated!",
            message: `User "${updatedFullName}" details have been updated successfully.`,
          });
        }, 500);
      } else {
        setModalFeedback({
          type: "error",
          message: result.error || "Failed to update user. Please try again.",
        });
      }
    });
  }

  // Delete User Confirmation
  function handleDeleteUser(user: AdminUserView) {
    setUserToDelete(user);
  }

  function handleConfirmDeleteUser() {
    if (!userToDelete) return;
    const targetUser = userToDelete;
    setIsDeletingUser(true);

    startTransition(async () => {
      try {
        const res = await adminDeleteUser(targetUser.id);
        if (res.success) {
          setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
          setUserToDelete(null);
          setSuccessPopup({
            isOpen: true,
            title: "User Removed!",
            message: `User "${targetUser.name}" has been deleted from the database.`,
          });
        } else {
          alert(res.error || "Could not delete user.");
        }
      } catch (err) {
        console.error("Delete user error:", err);
      } finally {
        setIsDeletingUser(false);
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
      <div className="border-b border-[#e9e4df] pb-7">
        <h1 className="font-serif text-4xl font-medium leading-tight text-[#214E34] sm:text-[42px]">Users</h1>
        <p className="mt-2 text-xs leading-6 text-[#8a837b]">Manage customer accounts and contact details.</p>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[#e9e4df] bg-white p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#8a837b]">
            Total Users
          </div>
          <div className="mt-1 font-serif text-[34px] font-medium text-[#353333]">
            {users.length}
          </div>
          <div className="text-[11px] text-[#aaa198]">
            Registered customer accounts
          </div>
        </div>
        <div className="rounded-lg border border-[#e9e4df] bg-white p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#8a837b]">
            Email Verified
          </div>
          <div className="mt-1 font-serif text-[34px] font-medium text-[#214E34]">
            {verifiedCount}
          </div>
          <div className="text-[11px] text-[#8a837b]">
            Confirmed email credentials
          </div>
        </div>
        <div className="rounded-lg border border-[#e9e4df] bg-white p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#8a837b]">
            Unverified
          </div>
          <div className="mt-1 font-serif text-[34px] font-medium text-[#8f7752]">
            {unverifiedCount}
          </div>
          <div className="text-[11px] text-[#8a837b]">
            Awaiting verification
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-[#e9e4df] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa198]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, address..."
              className="h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] pl-9 pr-3 text-xs text-[#353333] placeholder:text-[#aaa198] transition-all focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Email Verified Filter */}
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="h-10 rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-2.5 text-xs text-[#44403C] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs font-medium text-[#44403C] hover:bg-white hover:text-[#353333] transition-colors disabled:opacity-50"
            title="Refresh users"
          >
            <RefreshCw
              size={13}
              className={isRefreshing ? "animate-spin text-[#9b8966]" : ""}
            />
            <span>Refresh</span>
          </button>
          <div className="text-xs text-[#8a837b]">
            Showing{" "}
            <span className="font-semibold text-[#353333]">
              {filteredUsers.length}
            </span>{" "}
            users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-lg border border-[#e9e4df] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-[#eee9e4] bg-[#FAF8F7] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#8a837b]">
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
            <tbody className="divide-y divide-[#eee9e4]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-sm text-[#aaa198]"
                  >
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-[#FAF8F7]/80"
                  >
                    {/* S.No */}
                    <td className="py-4 pl-6 pr-4 text-center font-mono text-xs text-[#8d7c61] font-semibold">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4 font-semibold text-[#353333]">
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
                        <span className="text-[#aaa198] italic">—</span>
                      )}
                    </td>

                    {/* Email Verified */}
                    <td className="px-4 py-4 text-center">
                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#dce5d7]/80 bg-[#f2f6f0] px-2.5 py-0.5 text-[11px] font-semibold text-[#214E34]">
                          <CheckCircle2
                            size={12}
                            className="text-[#597454]"
                          />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#e8dfce]/80 bg-[#faf7ef] px-2.5 py-0.5 text-[11px] font-semibold text-[#8f7752]">
                          <XCircle size={12} className="text-[#8f7752]" />
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 text-[#8a837b]">
                      {user.joinedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(user)}
                          className="grid size-7 place-items-center rounded-md border border-[#e5dfd9] bg-white text-[#57534E] hover:border-[#9b8966] hover:text-[#353333] transition-colors"
                          title="Edit User"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user)}
                          className="grid size-7 place-items-center rounded-md border border-[#e5dfd9] bg-white text-[#8d7c61] hover:border-red-300 hover:text-red-700 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#e9e4df] bg-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#eee9e4] pb-4">
              <div>
                <h3 className="font-serif text-[28px] font-medium text-[#214E34]">
                  Edit User Profile
                </h3>
                <p className="mt-0.5 text-xs text-[#8a837b]">
                  Update contact and profile details.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseEdit}
                className="grid size-8 place-items-center rounded-lg text-[#8a837b] hover:bg-[#FAF8F7] transition-colors"
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
                <div className="flex h-10 items-center gap-2 rounded-lg border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-[#8a837b]">
                  <Mail size={14} className="text-[#aaa198]" />
                  <span>{editingUser.email}</span>
                  {editingUser.emailVerified && (
                    <span className="ml-auto text-[10px] text-[#597454] font-medium bg-[#f2f6f0] px-2 py-0.5 rounded-full border border-[#dce5d7]">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-[#353333]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="h-10 w-full rounded-lg border border-[#e5dfd9] bg-white px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-[#353333]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="h-10 w-full rounded-lg border border-[#e5dfd9] bg-white px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#353333]">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa198]"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-10 w-full rounded-lg border border-[#e5dfd9] bg-white pl-9 pr-3 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Address (optional) */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#353333]">
                  Address (optional)
                </label>
                <div className="relative">
                  <MapPin
                    size={14}
                    className="absolute left-3 top-3 text-[#aaa198]"
                  />
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Flat No., Street, City, State, PIN Code"
                    className="w-full rounded-lg border border-[#e5dfd9] bg-white pl-9 pr-3 py-2 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Gender (optional) */}
              <div>
                <label className="mb-1.5 block font-semibold text-[#353333]">
                  Gender (optional)
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#e5dfd9] bg-white px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
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
                  <label className="mb-1.5 block font-semibold text-[#353333]">
                    Birthday (optional)
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#e5dfd9] bg-white px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-semibold text-[#353333]">
                    Anniversary (optional)
                  </label>
                  <input
                    type="date"
                    value={anniversary}
                    onChange={(e) => setAnniversary(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#e5dfd9] bg-white px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Feedback Alert */}
              {modalFeedback && (
                <div
                  className={`rounded-lg p-3 text-xs ${
                    modalFeedback.type === "success"
                      ? "bg-[#f2f6f0] text-[#214E34] border border-[#dce5d7]"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {modalFeedback.message}
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#eee9e4]">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  disabled={isPending}
                  className="rounded-lg border border-[#e5dfd9] bg-white px-4 py-2 text-xs font-medium text-[#57534E] hover:bg-[#FAF8F7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#214E34] px-5 py-2 text-xs font-semibold text-white hover:bg-[#193e29] transition-colors disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Saving…</span>
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

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDeleteUser}
        itemName={userToDelete ? `${userToDelete.name} (${userToDelete.email})` : undefined}
        itemType="user"
        isDeleting={isDeletingUser}
      />

      {/* Centered Success Popup */}
      <SuccessModal
        isOpen={successPopup.isOpen}
        onClose={() => setSuccessPopup((prev) => ({ ...prev, isOpen: false }))}
        title={successPopup.title}
        message={successPopup.message}
      />
    </div>
  );
}
