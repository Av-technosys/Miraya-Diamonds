"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return <div role="alert" className="rounded-lg border border-[#e9e4df] bg-white p-8"><h1 className="font-serif text-3xl text-[#214E34]">Unable to load this page</h1><p className="mt-3 text-sm text-[#817b70]">Please try again.</p><button onClick={reset} className="mt-6 rounded-lg bg-[#214E34] px-5 py-3 text-sm text-white">Try again</button></div>;
}
