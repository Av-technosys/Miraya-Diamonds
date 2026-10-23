import type { Metadata } from "next";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Inter, Cormorant_Garamond, Montserrat, Alex_Brush, Playfair_Display, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { ConditionalFooter } from "@/components/common/conditional-footer";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  variable: "--font-great-vibes", // keeping variable name same to avoid changing css
  weight: ["400"],
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Miraya Diamonds",
  description: "Miraya Diamonds application",
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
