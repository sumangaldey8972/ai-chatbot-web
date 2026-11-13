import {
  CaretDown,
  CreditCard,
  GearSix,
  Lifebuoy,
  Plus,
  SignOut,
  Sparkle,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { IconButton } from "@/components/ui/icon-button";
import type { ConversationSummary } from "@/features/chat/types/chat";
import { cn } from "@/lib/cn";

import { Brand } from "./brand";

type SidebarProps = {
  conversations: ConversationSummary[];
  activeId: string;
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelect: (conversation: ConversationSummary) => void;
};

export function Sidebar({
  conversations,
  activeId,
  isOpen,
  onClose,
  onNewChat,
  onSelect,
}: SidebarProps) {
  return (
    <>
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-black/20 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[238px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--sidebar)] px-3.5 py-4 transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Brand />
          <IconButton label="Close sidebar" onClick={onClose} className="lg:hidden">
            <X size={19} weight="bold" />
          </IconButton>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-5 flex h-9 w-full items-center gap-2.5 rounded-[10px] bg-[var(--accent)] px-3 text-left text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(195,69,20,0.14)] transition hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <Plus size={16} weight="bold" />
          New chat
        </button>

        <nav className="mt-6 min-h-0 flex-1" aria-label="Conversation history">
          <p className="px-2 text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--ink-faint)]">Conversations</p>
          <div className="mt-2 space-y-0.5">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation)}
                className={cn(
                  "block w-full truncate rounded-[9px] px-2.5 py-2 text-left text-[13px] font-medium text-[var(--ink-muted)] transition-colors hover:bg-white/60 hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
                  conversation.id === activeId && "bg-[var(--sidebar-active)] text-[var(--ink)]",
                )}
              >
                <span className="block truncate text-[13px] leading-4">{conversation.title}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-[var(--line)] pt-2">
          <details className="group relative">
            <summary className="flex h-10 w-full list-none items-center gap-2.5 rounded-[10px] px-2 text-[13px] font-medium text-[var(--ink-muted)] transition-colors hover:bg-white/60 hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] [&::-webkit-details-marker]:hidden">
              <span className="grid size-7 place-items-center rounded-full bg-[#eadfd5] text-[11px] font-semibold text-[var(--ink)]">J</span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate font-semibold text-[var(--ink)]">James</span>
                <span className="block text-[10px] font-medium text-[var(--ink-faint)]">Free plan</span>
              </span>
              <CaretDown size={15} className="transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div
              role="menu"
              aria-label="Profile menu"
              className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--composer)] p-1.5 shadow-[0_18px_50px_rgba(57,37,27,0.16)]"
            >
              <div className="mb-1.5 rounded-[10px] bg-[var(--model-active)] p-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-white/80 text-[var(--accent)]">
                    <Sparkle size={15} weight="fill" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[var(--ink)]">Free plan</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[var(--ink-faint)]">Basic access with daily limits</p>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  aria-label="Upgrade from Free plan"
                  className="mt-2.5 grid h-7 w-full place-items-center rounded-lg bg-[var(--accent)] text-[11px] font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  Upgrade plan
                </Link>
              </div>

              <ProfileMenuItem icon={<GearSix size={17} />} label="Settings" />
              <ProfileMenuItem icon={<CreditCard size={17} />} label="Pricing & plans" href="/pricing" />
              <ProfileMenuItem icon={<UserCircle size={17} />} label="Manage account" />
              <ProfileMenuItem icon={<Lifebuoy size={17} />} label="Help & support" />
              <div className="my-1 border-t border-[var(--line)]" />
              <ProfileMenuItem icon={<SignOut size={17} />} label="Sign out" href="/login" tone="danger" />
            </div>
          </details>
        </div>
      </aside>
    </>
  );
}

type ProfileMenuItemProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  tone?: "default" | "danger";
};

function ProfileMenuItem({ icon, label, href, tone = "default" }: ProfileMenuItemProps) {
  const className = cn(
    "flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] font-medium transition-colors hover:bg-black/[0.035] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
    tone === "danger" ? "text-[#a33b2d]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
  );

  const content = (
    <>
      {icon}
      <span className="text-[13px] leading-none">{label}</span>
    </>
  );

  return href ? (
    <Link
      href={href}
      role="menuitem"
      aria-label={label}
      className={className}
    >
      {content}
    </Link>
  ) : (
    <button type="button" role="menuitem" aria-label={label} className={className}>
      {content}
    </button>
  );
}
