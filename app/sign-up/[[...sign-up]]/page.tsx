import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#faf8f3] px-4 py-12">
      <Suspense fallback={<p className="text-sm text-[#214E34]">Loading sign up…</p>}>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </Suspense>
    </main>
  );
}
