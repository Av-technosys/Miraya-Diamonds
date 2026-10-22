"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import { getContactPhone, getVerifiedPhone, validateAndFormatPhone } from "@/lib/account-profile";
import { Check, Edit3, ShieldCheck, MapPin, Phone, Calendar } from "lucide-react";
import type { User as DbUser } from "@/lib/db/schema";
import { updateUserProfile, updateUserSpecialDates } from "@/lib/actions/users";

type ProfileUser = NonNullable<ReturnType<typeof useUser>["user"]>;

function profileValues(user: ProfileUser, dbUser?: DbUser | null) {
  const value = (key: string) =>
    typeof user.unsafeMetadata[key] === "string"
      ? (user.unsafeMetadata[key] as string)
      : "";

  const dbFullName = dbUser
    ? `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim()
    : "";

  return {
    name: dbFullName || user.fullName || "",
    phone: dbUser?.mobileNumber || getContactPhone(user),
    address:
      dbUser?.address ||
      (typeof user.unsafeMetadata.address === "string"
        ? user.unsafeMetadata.address
        : ""),
    gender: dbUser?.gender || value("gender") || "",
    birthday: dbUser?.birthday || value("birthday") || "",
    anniversary: dbUser?.anniversary || value("anniversary") || "",
  };
}

const fieldClass = "h-11 w-full min-w-0 rounded-md bg-[#e9e9e9] px-3 text-xs text-[#555] outline-none focus-visible:ring-2 focus-visible:ring-[#214E34]/40 read-only:cursor-default";
const buttonClass = "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#214E34] px-6 text-xs font-medium text-white shadow-[0_5px_15px_rgba(33,78,52,0.12)] transition-colors hover:bg-[#193e29] disabled:cursor-wait disabled:opacity-60";

function VerifiedBadge() {
  return <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F7FFF7] px-2 py-0.5 text-[8px] font-medium uppercase text-[#3c7a3f]"><ShieldCheck size={10} />Verified</span>;
}

function ProfileForm({
  user,
  initialDbUser,
}: {
  user: ProfileUser;
  initialDbUser?: DbUser | null;
}) {
  const { openUserProfile } = useClerk();
  const [values, setValues] = useState(() => profileValues(user, initialDbUser));
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState<"profile" | "dates" | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const email = user.primaryEmailAddress;
  const phone = getVerifiedPhone(user) || user.primaryPhoneNumber;
  const today = new Date().toLocaleDateString("en-CA");

  function change(field: keyof typeof values, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  }

  async function save(scope: "profile" | "dates") {
    if (saving) return;
    if (scope === "profile") {
      if (!values.name.trim()) {
        setError("Enter your full name.");
        return;
      }

      // Validate 10-digit mobile number
      const phoneValidation = validateAndFormatPhone(values.phone);
      if (!phoneValidation.isValid) {
        setError(phoneValidation.error || "Please enter a valid 10-digit mobile number.");
        return;
      }

      setSaving(scope);
      setError("");
      setMessage("");

      try {
        const [firstName, ...lastNameParts] = values.name.trim().split(/\s+/);
        const lastName = lastNameParts.join(" ");

        // Save to Database
        await updateUserProfile({
          firstName: firstName || "Valued",
          lastName: lastName,
          mobileNumber: phoneValidation.formatted,
          address: values.address || null,
          gender: values.gender || null,
          birthday: values.birthday || null,
          anniversary: values.anniversary || null,
        });

        // Update local state with the formatted phone
        setValues(current => ({
          ...current,
          phone: phoneValidation.formatted,
        }));

        // Also update Clerk client metadata
        try {
          if (values.name.trim() !== (user.fullName || "")) {
            await user.update({ firstName, lastName });
          }
          await user.updateMetadata({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              gender: values.gender || null,
              phoneNumber: phoneValidation.formatted,
              address: values.address || null,
              birthday: values.birthday || null,
              anniversary: values.anniversary || null,
            },
          });
        } catch (clerkErr) {
          console.warn("Clerk client sync non-blocking error:", clerkErr);
        }

        setEditing(false);
        setMessage("Your profile, mobile number and delivery address have been saved successfully!");
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "We couldn’t save all your changes. Please try again.";
        setError(errMsg);
      } finally {
        setSaving(null);
      }
    } else {
      if (values.birthday && values.birthday > today) {
        setError("Your birthday cannot be in the future.");
        return;
      }
      setSaving(scope);
      setError("");
      setMessage("");
      try {
        // Save to Database
        await updateUserSpecialDates({
          birthday: values.birthday || null,
          anniversary: values.anniversary || null,
        });

        // Also update Clerk client metadata
        try {
          await user.updateMetadata({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              birthday: values.birthday || null,
              anniversary: values.anniversary || null,
            },
          });
        } catch (clerkErr) {
          console.warn("Clerk dates update warning:", clerkErr);
        }

        setMessage("Your special dates have been saved successfully!");
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "We couldn’t save your special dates. Please try again.";
        setError(errMsg);
      } finally {
        setSaving(null);
      }
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save("profile");
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="rounded-xl bg-white p-5 shadow-[0_6px_20px_rgba(33,78,52,0.025)] sm:p-7">
        <div className="mb-7 flex items-center justify-between gap-3">
          <h1 className="font-serif text-[27px] font-medium text-[#3c3936]">My Profile</h1>
          <button
            type="submit"
            disabled={!!saving}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-[#214E34] px-4 text-[11px] font-medium text-white shadow-xs hover:bg-[#193e29] transition-colors disabled:opacity-60"
          >
            <Check size={12} />
            {saving === "profile" ? "Saving…" : "Save Changes"}
          </button>
        </div>
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          {/* Full Name */}
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor="profile-name" className="text-[11px] font-medium text-[#555]">
              Full Name*
            </label>
            <input
              id="profile-name"
              name="fullName"
              autoComplete="name"
              required
              disabled={!!saving}
              value={values.name}
              onChange={event => change("name", event.target.value)}
              className={fieldClass}
            />
          </div>

          {/* Mobile Number with 10-digit requirement */}
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="profile-phone" className="text-[11px] font-medium text-[#555]">
                Mobile Number (10 Digits)*
              </label>
              {phone?.verification?.status === "verified" && values.phone === phone.phoneNumber && <VerifiedBadge />}
            </div>
            <div
              className="flex h-11 min-w-0 items-center gap-2 rounded-md bg-[#e9e9e9] px-3 transition-colors focus-within:ring-2 focus-within:ring-[#214E34]/40"
            >
              <Phone size={14} className="shrink-0 text-[#888]" />
              <input
                id="profile-phone"
                type="tel"
                autoComplete="tel"
                disabled={!!saving}
                value={values.phone}
                onChange={event => change("phone", event.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full min-w-0 bg-transparent text-xs text-[#555] outline-none placeholder:text-[#999]"
              />
            </div>
            <span className="text-[10px] text-[#777]">10-digit Indian mobile number for order updates</span>
          </div>

          {/* Email ID */}
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="profile-email" className="text-[11px] font-medium text-[#555]">
                Email ID*
              </label>
              <button
                type="button"
                onClick={() => openUserProfile()}
                className="text-[10px] text-[#214E34] underline underline-offset-2"
              >
                Change
              </button>
            </div>
            <div className="flex h-11 min-w-0 items-center gap-2 rounded-md bg-[#e9e9e9] px-3">
              <input
                id="profile-email"
                type="email"
                readOnly
                value={email?.emailAddress || ""}
                placeholder="Not added"
                className="w-full min-w-0 bg-transparent text-xs text-[#555] outline-none"
              />
              {email?.verification.status === "verified" && <VerifiedBadge />}
            </div>
            <span className="text-[10px] text-[#777]">Account login credential</span>
          </div>

          {/* Gender (optional) */}
          <div className="min-w-0 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-[#555]">Gender (optional)</label>
              {values.gender && (
                <button
                  type="button"
                  onClick={() => change("gender", "")}
                  className="text-[10px] text-[#888] hover:text-[#214E34] transition-colors"
                >
                  Clear selection
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Male", "Female", "Other"].map(genderOption => {
                const isSelected = values.gender?.toLowerCase() === genderOption.toLowerCase();
                return (
                  <button
                    type="button"
                    key={genderOption}
                    disabled={!!saving}
                    onClick={() => {
                      change("gender", isSelected ? "" : genderOption);
                    }}
                    className={`flex h-11 items-center justify-center gap-2 rounded-md text-[11px] font-medium transition-all ${
                      isSelected
                        ? "bg-[#214E34] text-white shadow-xs"
                        : "bg-[#F7FFF7] text-[#214E34] border border-[#214E34]/20 hover:bg-[#edf5ed]"
                    }`}
                  >
                    <span
                      className={`size-3 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-white bg-white" : "border-[#214E34]"
                      }`}
                    >
                      {isSelected && <span className="size-1.5 rounded-full bg-[#214E34]" />}
                    </span>
                    <span>{genderOption}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] text-[#777]">Optional demographic preference</span>
          </div>

          {/* Address field for DB persistence */}
          <div className="flex min-w-0 flex-col gap-1.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <label htmlFor="profile-address" className="text-[11px] font-medium text-[#555]">
                Delivery Address (optional)
              </label>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FFF7] px-2 py-0.5 text-[9px] font-medium text-[#214E34]">
                <MapPin size={10} /> Saved to Database
              </span>
            </div>
            <div
              className="flex min-w-0 items-start gap-2 rounded-md bg-[#e9e9e9] p-3 transition-colors focus-within:ring-2 focus-within:ring-[#214E34]/40"
            >
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#888]" />
              <textarea
                id="profile-address"
                name="address"
                rows={3}
                autoComplete="street-address"
                disabled={!!saving}
                value={values.address}
                onChange={event => change("address", event.target.value)}
                placeholder="House / Flat No., Apartment / Building, Street / Area, Landmark, City, State, PIN Code"
                className="w-full min-w-0 resize-none bg-transparent text-xs leading-relaxed text-[#555] outline-none placeholder:text-[#999]"
              />
            </div>
            <p className="text-[10px] text-[#777]">
              Stored directly in your database account for order dispatch and transit insurance.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center rounded-xl bg-white px-5 py-9 text-center shadow-[0_6px_20px_rgba(33,78,52,0.025)] sm:px-8 sm:py-11">
        <Image src="/Dashboard/Giftbox.png" alt="Gift box" width={144} height={112} className="h-[90px] w-[116px] object-contain" />
        <h2 className="mt-7 font-serif text-[27px] font-medium text-[#45403d]">For your Anniversaries</h2>
        <p className="mt-2 max-w-[410px] text-xs leading-relaxed text-[#214E34]">Share your special dates, and we&apos;ll create personalized experiences<br className="hidden sm:block" /> just for you.</p>
        <div className="mt-8 grid w-full max-w-[560px] gap-5 sm:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-2 text-left text-[11px] text-[#555]">Your Birthday<input type="date" name="birthday" max={today} value={values.birthday} disabled={!!saving} onChange={event => change("birthday", event.target.value)} className={`${fieldClass} bg-[#f5f3f0] text-[#8b8282]`} /></label>
          <label className="flex min-w-0 flex-col gap-2 text-left text-[11px] text-[#555]">Your Anniversary<input type="date" name="anniversary" value={values.anniversary} disabled={!!saving} onChange={event => change("anniversary", event.target.value)} className={`${fieldClass} bg-[#f5f3f0] text-[#8b8282]`} /></label>
        </div>
        <button type="button" disabled={!!saving} onClick={() => void save("dates")} className={`${buttonClass} mt-5`}>{saving === "dates" ? "Saving…" : "Save Special Date"}</button>
      </section>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="text-sm text-[#214E34]">{message}</p>}
      <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-end">
        <button type="button" disabled={!!saving} onClick={() => { setValues(profileValues(user, initialDbUser)); setEditing(false); setMessage(""); setError(""); }} className="min-h-10 rounded-full bg-white px-5 text-xs text-[#454545] shadow-[0_5px_15px_rgba(33,78,52,0.08)] disabled:opacity-60">Discard Changes</button>
        <button type="submit" disabled={!!saving} className={buttonClass}><Check size={14} />{saving === "profile" ? "Saving…" : "Save Changes"}</button>
      </div>
    </form>
  );
}

export function AccountProfile({ initialDbUser }: { initialDbUser?: DbUser | null }) {
  const { user } = useUser();
  if (!user) return <div className="min-h-[400px] rounded-xl bg-white" aria-label="Loading profile" />;
  return <ProfileForm key={user.id} user={user} initialDbUser={initialDbUser} />;
}
