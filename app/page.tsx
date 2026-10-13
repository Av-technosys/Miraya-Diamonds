import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Miraya Diamonds | Fine Jewellery for Every Moment",
  description: "Explore diamond rings, earrings, necklaces and fine jewellery at Miraya Diamonds.",
};

export default function Home() {
  return <HomePage />;
}
