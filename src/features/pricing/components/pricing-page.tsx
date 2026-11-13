"use client";

import { ArrowLeft, Check } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  cadence?: string;
  features: readonly string[];
  action: string;
  current?: boolean;
  popular?: boolean;
};

const plans: readonly Plan[] = [
  {
    name: "Free",
    description: "For exploring Aurion and occasional conversations.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cadence: "Forever",
    features: ["30 messages per day", "Auto model routing", "Basic chat history"],
    action: "Current plan",
    current: true,
  },
  {
    name: "Plus",
    description: "For everyday work, research, and longer sessions.",
    monthlyPrice: 9,
    yearlyPrice: 7.2,
    features: ["Claude Haiku + Qwen", "Higher monthly usage", "Longer conversations"],
    action: "Choose Plus",
    popular: true,
  },
  {
    name: "Pro",
    description: "For intensive use and priority performance.",
    monthlyPrice: 19,
    yearlyPrice: 15.2,
    features: ["Everything in Plus", "Priority GPU access", "Extended context"],
    action: "Choose Pro",
  },
];

function formatPrice(price: number) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[var(--canvas)] px-5 pb-5 pt-5 text-[var(--ink)] sm:px-7 lg:px-10">
      <div className="mx-auto w-full max-w-[1420px]">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/aurion-mark.png"
              alt=""
              width={72}
              height={72}
              className="size-11 object-contain sm:size-12"
              priority
            />
            <span className="text-[26px] font-semibold tracking-[-0.045em] sm:text-[30px]">Aurion</span>
          </div>
          <Link
            href="/"
            aria-label="Back to chat"
            className="grid size-9 place-items-center rounded-full text-[var(--ink-muted)] transition hover:bg-black/[0.04] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <ArrowLeft size={20} weight="bold" />
          </Link>
        </div>

        <section className="mx-auto mt-0 max-w-[1280px] sm:-mt-1">
          <header className="mx-auto max-w-[1120px] text-center">
            <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[40px] lg:text-[44px]">
              Plans that fit the way you use AI
            </h1>
            <p className="mt-2 text-[15px] leading-6 text-[var(--ink-muted)] sm:text-[17px]">
              Start free. Upgrade when you need more access.
            </p>

            <div
              className="mx-auto mt-5 grid w-full max-w-[370px] grid-cols-2 rounded-full border border-[var(--composer-line)] bg-[#f7efe9] p-1"
              aria-label="Billing cycle"
            >
              <button
                type="button"
                aria-pressed={billingCycle === "monthly"}
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "h-9 rounded-full text-[13px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-sm",
                  billingCycle === "monthly"
                    ? "bg-[var(--accent)] text-white shadow-[0_5px_16px_rgba(200,74,24,0.18)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={billingCycle === "yearly"}
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "h-9 rounded-full text-[13px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-sm",
                  billingCycle === "yearly"
                    ? "bg-[var(--accent)] text-white shadow-[0_5px_16px_rgba(200,74,24,0.18)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
                )}
              >
                Yearly <span className={billingCycle === "yearly" ? "text-white/80" : "text-[var(--accent)]"}>· Save 20%</span>
              </button>
            </div>
          </header>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {plans.map((plan) => {
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              const isSelected = selectedPlan === plan.name;

              return (
                <article
                  key={plan.name}
                  className={cn(
                    "flex min-h-[390px] flex-col rounded-[18px] border bg-white/30 p-6 shadow-[0_14px_45px_rgba(67,43,30,0.035)] sm:p-4 md:p-5 lg:p-6",
                    plan.popular
                      ? "border-[var(--accent)] bg-[#fff8f4] shadow-[0_16px_50px_rgba(200,74,24,0.08)]"
                      : "border-[var(--composer-line)]",
                  )}
                >
                  <div className="flex min-h-[38px] items-start justify-between gap-2">
                    <h2 className="text-[29px] font-semibold leading-none tracking-[-0.035em]">
                      {plan.name}
                    </h2>
                    {plan.popular ? (
                      <span className="shrink-0 rounded-full bg-[#f9dfd1] px-2.5 py-1 text-[10px] font-semibold text-[var(--accent-strong)] lg:text-[11px]">
                        Most popular
                      </span>
                    ) : null}
                  </div>

                  <p className="min-h-[48px] max-w-[340px] text-[13px] leading-[1.45] text-[var(--ink-muted)] lg:text-sm">
                    {plan.description}
                  </p>

                  <div className="mt-2 flex min-h-[64px] items-end gap-2">
                    <span className="text-[46px] font-semibold leading-none tracking-[-0.055em] lg:text-[50px]">
                      ${formatPrice(price)}
                    </span>
                    <span className="pb-1 text-xs text-[var(--ink-muted)] lg:text-[13px]">
                      {plan.cadence ?? "per month"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && !plan.current ? (
                    <p className="mt-1 text-[10px] text-[var(--ink-faint)]">Billed annually</p>
                  ) : (
                    <div className="h-[20px]" />
                  )}

                  <ul className="mt-4 space-y-3 text-[13px] lg:text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check size={17} weight="bold" className="shrink-0 text-[var(--accent)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    disabled={plan.current}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={cn(
                      "mt-auto h-11 w-full rounded-xl text-[13px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:text-sm",
                      plan.popular
                        ? "bg-[var(--accent)] text-white shadow-[0_8px_22px_rgba(200,74,24,0.16)] hover:bg-[var(--accent-strong)]"
                        : "bg-[#f3ebe5] text-[var(--ink)] hover:bg-[#eaded5]",
                      plan.current && "cursor-default text-[var(--ink-muted)]",
                      isSelected && "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--canvas)]",
                    )}
                  >
                    {isSelected ? `${plan.name} selected` : plan.action}
                  </button>
                </article>
              );
            })}
          </div>

          <section className="mt-4 flex flex-col gap-4 rounded-[18px] border border-[var(--composer-line)] bg-white/30 px-6 py-4 md:min-h-[72px] md:flex-row md:items-center">
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Business</h2>
              <span className="hidden h-9 w-px bg-[var(--composer-line)] sm:block" />
              <p className="text-[13px] leading-5 text-[var(--ink-muted)] lg:text-sm">
                Shared workspace, admin controls, and centralized billing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPlan("Business")}
              className="h-11 shrink-0 rounded-xl bg-[var(--accent)] px-7 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(200,74,24,0.14)] transition hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:text-sm"
            >
              {selectedPlan === "Business" ? "Request noted" : "Contact sales"}
            </button>
          </section>

          <p className="mx-auto mt-3 max-w-5xl text-center text-[10px] leading-4 text-[var(--ink-faint)] sm:text-[11px]">
            All plans include secure conversations and Auto mode. Usage limits reset every billing cycle. Upgrade, downgrade, or cancel anytime.
          </p>
        </section>
      </div>
    </main>
  );
}
