import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#faf8f3] px-4 py-12">
      <Suspense fallback={<p className="text-sm text-[#214E34]">Loading sign in…</p>}>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </Suspense>
    </main>
  );
}
