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

const geist = localFont({
  src: "./fonts/geist.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = localFont({
  src: [
    { path: "./fonts/cormorant-garamond.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

const alexBrush = localFont({
  src: "./fonts/alex-brush.woff2",
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const playfairDisplay = localFont({
  src: "./fonts/playfair-display.woff2",
  weight: "400 900",
  variable: "--font-playfair",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
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
      className={cn("h-full", "antialiased", inter.variable, cormorantGaramond.variable, montserrat.variable, alexBrush.variable, playfairDisplay.variable, plusJakartaSans.variable, "font-sans", geist.variable)}
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
        </ClerkProvider>
      </body>
    </html>
  );
}
