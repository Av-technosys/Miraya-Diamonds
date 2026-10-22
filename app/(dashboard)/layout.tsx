import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { AccountShell } from "@/components/account/account-shell";
import { syncCurrentUser } from "@/lib/actions/users";

async function AuthenticatedAccount({ children }: { children: React.ReactNode }) {
  await auth.protect();
  await syncCurrentUser();
  return <AccountShell>{children}</AccountShell>;
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-[65vh]" />}>
      <AuthenticatedAccount>{children}</AuthenticatedAccount>
    </Suspense>
  );
}
