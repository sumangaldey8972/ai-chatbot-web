"use client";

import {
  AppleLogo,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeSlash,
  GoogleLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type AuthMode = "login" | "signup";

type AuthPageProps = {
  mode: AuthMode;
};

export function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsComplete(true);
  }

  function handleSocialLogin() {
    setIsComplete(true);
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[var(--canvas)] px-5 py-6 text-[var(--ink)] sm:px-10 sm:py-8 lg:px-14">
      <header className="mx-auto flex w-full max-w-[1360px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          aria-label="Aurion home"
        >
          <Image
            src="/brand/aurion-mark.png"
            alt=""
            width={34}
            height={34}
            className="size-8 object-contain"
            priority
          />
          <span className="text-[23px] font-semibold tracking-[-0.04em]">Aurion</span>
        </Link>

        <Link
          href="/"
          className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-[var(--ink-muted)] transition hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] sm:text-[15px]"
        >
          <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Back to chat</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </header>

      <section
        className={`mx-auto flex w-full max-w-[520px] flex-col pb-12 pt-12 sm:pt-16 ${
          isSignup ? "lg:pt-10" : "lg:pt-[82px]"
        }`}
      >
        <div className="text-center">
          <h1 className="text-[36px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[44px]">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-3 text-[15px] text-[var(--ink-muted)] sm:text-[17px]">
            {isSignup ? "Sign up to start using Aurion" : "Sign in to continue to Aurion"}
          </p>
        </div>

        {isComplete ? (
          <div className="mt-14 rounded-[18px] border border-[var(--composer-line)] bg-white/45 px-7 py-9 text-center shadow-[0_12px_36px_rgba(70,41,28,0.04)]">
            <CheckCircle size={42} weight="duotone" className="mx-auto text-[var(--accent)]" />
            <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
              {isSignup ? "Account created" : "You're signed in"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
              This frontend flow is ready. Authentication will complete here after the backend is connected.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[var(--accent)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Continue to Aurion
            </Link>
          </div>
        ) : (
          <>
            <div className={`${isSignup ? "mt-8" : "mt-12"} grid gap-3`}>
              <button
                type="button"
                onClick={handleSocialLogin}
                className="flex h-14 items-center justify-center gap-3 rounded-[14px] border border-[var(--composer-line)] bg-white/25 text-[15px] font-semibold transition hover:border-[#d7c1b4] hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <GoogleLogo size={23} weight="bold" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={handleSocialLogin}
                className="flex h-14 items-center justify-center gap-3 rounded-[14px] border border-[var(--composer-line)] bg-white/25 text-[15px] font-semibold transition hover:border-[#d7c1b4] hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <AppleLogo size={23} weight="fill" />
                Continue with Apple
              </button>
            </div>

            <div className={`${isSignup ? "my-6" : "my-8"} flex items-center gap-5`} aria-hidden="true">
              <div className="h-px flex-1 bg-[var(--line)]" />
              <span className="text-sm font-medium text-[var(--ink-faint)]">or</span>
              <div className="h-px flex-1 bg-[var(--line)]" />
            </div>

            <form onSubmit={handleSubmit} className={isSignup ? "space-y-4" : "space-y-5"}>
              {isSignup && (
                <AuthField
                  id="full-name"
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                />
              )}

              <AuthField
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="Email address"
              />

              <div>
                <label htmlFor="password" className="text-sm font-semibold text-[var(--ink)]">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    placeholder={isSignup ? "Create a password" : "Password"}
                    minLength={8}
                    required
                    className="h-14 w-full rounded-[14px] border border-[var(--composer-line)] bg-white/25 px-4 pr-12 text-[15px] outline-none transition placeholder:text-[var(--ink-faint)] hover:border-[#d7c1b4] focus:border-[var(--accent)] focus:bg-white/65 focus:ring-4 focus:ring-[#c84a1810]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-[var(--ink-faint)] transition hover:bg-[var(--model-active)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {!isSignup && (
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-sm"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
                {isSignup && (
                  <p className="mt-2 text-xs leading-5 text-[var(--ink-faint)]">
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 flex h-14 w-full items-center justify-center rounded-[14px] bg-[var(--accent)] text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(195,69,20,0.14)] transition hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:translate-y-px"
              >
                {isSignup ? "Create account" : "Sign in"}
              </button>
            </form>

            {isSignup && (
              <p className="mt-5 text-center text-xs leading-5 text-[var(--ink-faint)]">
                By continuing, you agree to our{" "}
                <button className="underline underline-offset-2 hover:text-[var(--ink)]">Terms</button>
                {" "}and{" "}
                <button className="underline underline-offset-2 hover:text-[var(--ink)]">Privacy Policy</button>.
              </p>
            )}

            <p className={`${isSignup ? "mt-5" : "mt-8"} text-center text-sm text-[var(--ink-muted)] sm:text-[15px]`}>
              {isSignup ? "Already have an account?" : "New to Aurion?"}{" "}
              <Link
                href={isSignup ? "/login" : "/signup"}
                className="font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </>
        )}
      </section>
    </main>
  );
}

type AuthFieldProps = {
  id: string;
  label: string;
  type: "text" | "email";
  autoComplete: string;
  placeholder: string;
};

function AuthField({ id, label, type, autoComplete, placeholder }: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-[var(--ink)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="mt-2 h-14 w-full rounded-[14px] border border-[var(--composer-line)] bg-white/25 px-4 text-[15px] outline-none transition placeholder:text-[var(--ink-faint)] hover:border-[#d7c1b4] focus:border-[var(--accent)] focus:bg-white/65 focus:ring-4 focus:ring-[#c84a1810]"
      />
    </div>
  );
}
