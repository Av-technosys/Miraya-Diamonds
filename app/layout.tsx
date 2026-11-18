import type { Metadata } from "next";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/common/header";
import { ConditionalFooter } from "@/components/common/conditional-footer";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/whatsapp-button";

const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const cormorantInfant = localFont({
  src: [
    { path: "./fonts/cormorant-infant.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-infant-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant-infant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miraya Diamonds",
  description: "Discover fine diamond jewellery at Miraya Diamonds. Explore collections, learn about diamonds and discuss a design that feels personal to you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", inter.variable, cormorantInfant.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/dashboard"
          signInForceRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
          signUpForceRedirectUrl="/dashboard"
          appearance={{ theme: shadcn, variables: { colorPrimary: "#214E34" } }}
        >
          <Suspense fallback={null}><SmoothScroll /></Suspense>
          <Header />
          <div className="flex-1">{children}</div>
          <ConditionalFooter />
          <WhatsAppButton />
        </ClerkProvider>
      </body>
    </html>
  );
}
