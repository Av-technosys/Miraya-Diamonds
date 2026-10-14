"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import { getContactPhone, getVerifiedPhone } from "@/lib/account-profile";
import { Check, Edit3, ShieldCheck } from "lucide-react";

type ProfileUser = NonNullable<ReturnType<typeof useUser>["user"]>;

function profileValues(user: ProfileUser) {
  const value = (key: string) => typeof user.unsafeMetadata[key] === "string" ? user.unsafeMetadata[key] as string : "";
  return { name: user.fullName || "", phone: getContactPhone(user), gender: value("gender"), birthday: value("birthday"), anniversary: value("anniversary") };
}

const fieldClass = "h-11 w-full min-w-0 rounded-md bg-[#e9e9e9] px-3 text-xs text-[#555] outline-none focus-visible:ring-2 focus-visible:ring-[#214E34]/40 read-only:cursor-default";
const buttonClass = "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#214E34] px-6 text-xs font-medium text-white shadow-[0_5px_15px_rgba(33,78,52,0.12)] transition-colors hover:bg-[#193e29] disabled:cursor-wait disabled:opacity-60";

function VerifiedBadge() {
  return <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F7FFF7] px-2 py-0.5 text-[8px] font-medium uppercase text-[#3c7a3f]"><ShieldCheck size={10} />Verified</span>;
}

function ProfileForm({ user }: { user: ProfileUser }) {
  const { openUserProfile } = useClerk();
  const [values, setValues] = useState(() => profileValues(user));
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
    if (scope === "profile" && !values.name.trim()) {
      setError("Enter your full name.");
      return;
    }
    if (values.birthday && values.birthday > today) {
      setError("Your birthday cannot be in the future.");
      return;
    }
    setSaving(scope);
    setError("");
    setMessage("");
    try {
      if (scope === "profile" && values.name.trim() !== (user.fullName || "")) {
        const [firstName, ...lastName] = values.name.trim().split(/\s+/);
        await user.update({ firstName, lastName: lastName.join(" ") });
      }
      await user.updateMetadata({ unsafeMetadata: {
        birthday: values.birthday || null,
        anniversary: values.anniversary || null,
        ...(scope === "profile" ? { gender: values.gender || null, phoneNumber: values.phone } : {}),
      } });
      if (scope === "profile") setEditing(false);
      setMessage(scope === "dates" ? "Your special dates have been saved." : "Your profile has been saved.");
    } catch {
      setError("We couldn’t save all your changes. Please try again.");
    } finally {
      setSaving(null);
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
          <button type="button" disabled={!!saving} onClick={event => { if (editing) event.currentTarget.form?.requestSubmit(); else setEditing(true); }} aria-pressed={editing} className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-[#f5f5f1] px-4 text-[11px] text-[#214E34]">{editing ? <Check size={12} /> : <Edit3 size={12} />}{saving === "profile" ? "Saving…" : editing ? "Done" : "Edit"}</button>
        </div>
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-2 text-[11px] text-[#555]">Full Name*
            <input name="fullName" autoComplete="name" required={editing} readOnly={!editing} disabled={!!saving} value={values.name} onChange={event => change("name", event.target.value)} className={fieldClass} />
          </label>
          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="profile-phone" className="text-[11px] text-[#555]">Phone Number</label>
            <div className="flex h-11 min-w-0 items-center gap-2 rounded-md bg-[#e9e9e9] px-3">
              <input id="profile-phone" type="tel" autoComplete="tel" readOnly={!editing} disabled={!!saving} value={values.phone} onChange={event => change("phone", event.target.value)} placeholder="Not added" className="w-full min-w-0 bg-transparent text-xs text-[#555] outline-none" />
              {phone?.verification?.status === "verified" && values.phone === phone.phoneNumber && <VerifiedBadge />}
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between"><label htmlFor="profile-email" className="text-[11px] text-[#555]">Email ID*</label>{editing && <button type="button" onClick={() => openUserProfile()} className="text-[10px] text-[#214E34] underline underline-offset-2">Change</button>}</div>
            <div className="flex h-11 min-w-0 items-center gap-2 rounded-md bg-[#e9e9e9] px-3">
              <input id="profile-email" type="email" readOnly value={email?.emailAddress || ""} placeholder="Not added" className="w-full min-w-0 bg-transparent text-xs text-[#555] outline-none" />
              {email?.verification.status === "verified" && <VerifiedBadge />}
            </div>
          </div>
          <fieldset disabled={!editing || !!saving} className="min-w-0">
            <legend className="mb-2 text-[11px] text-[#555]">Gender</legend>
            <div className="grid grid-cols-3 gap-2">
              {["Male", "Female", "Other"].map(gender => <label key={gender} className={`flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md text-[11px] ${values.gender === gender ? "bg-[#214E34] text-white" : "bg-[#F7FFF7] text-[#214E34]"}`}><input type="radio" name="gender" value={gender} checked={values.gender === gender} onChange={() => change("gender", gender)} className="size-3 accent-[#214E34]" />{gender}</label>)}
            </div>
          </fieldset>
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
        <button type="button" disabled={!!saving} onClick={() => { setValues(profileValues(user)); setEditing(false); setMessage(""); setError(""); }} className="min-h-10 rounded-full bg-white px-5 text-xs text-[#454545] shadow-[0_5px_15px_rgba(33,78,52,0.08)] disabled:opacity-60">Discard Changes</button>
        <button type="submit" disabled={!!saving} className={buttonClass}><Check size={14} />{saving === "profile" ? "Saving…" : "Save Changes"}</button>
      </div>
    </form>
  );
}

export function AccountProfile() {
  const { user } = useUser();
  if (!user) return <div className="min-h-[400px] rounded-xl bg-white" aria-label="Loading profile" />;
  return <ProfileForm key={user.id} user={user} />;
}
