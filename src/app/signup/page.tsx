import type { Metadata } from "next";

import { AuthPage } from "@/features/auth/components/auth-page";

export const metadata: Metadata = {
  title: "Create account — Aurion",
  description: "Create your Aurion account.",
};

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
