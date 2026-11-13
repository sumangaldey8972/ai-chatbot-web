import type { Metadata } from "next";

import { AuthPage } from "@/features/auth/components/auth-page";

export const metadata: Metadata = {
  title: "Sign in — Aurion",
  description: "Sign in to your Aurion account.",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
