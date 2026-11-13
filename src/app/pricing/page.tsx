import type { Metadata } from "next";

import { PricingPage } from "@/features/pricing/components/pricing-page";

export const metadata: Metadata = {
  title: "Pricing & plans — Aurion",
  description: "Compare Aurion Free, Plus, Pro, and Business plans.",
};

export default function PricingRoute() {
  return <PricingPage />;
}
