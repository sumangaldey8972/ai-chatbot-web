import { CaretDown, GearSix, Plus, X } from "@phosphor-icons/react";

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
          "fixed inset-y-0 left-0 z-40 flex w-[274px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--sidebar)] px-5 py-5 transition-transform duration-300 lg:static lg:translate-x-0",
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
          className="mt-8 flex h-11 w-full items-center gap-3 rounded-xl bg-[var(--accent)] px-4 text-left text-sm font-semibold text-white shadow-[0_8px_22px_rgba(195,69,20,0.16)] transition hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <Plus size={18} weight="bold" />
          New chat
        </button>

        <nav className="mt-9 min-h-0 flex-1" aria-label="Conversation history">
          <p className="px-2 text-xs font-medium text-[var(--ink-faint)]">Conversations</p>
          <div className="mt-3 space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation)}
                className={cn(
                  "block w-full truncate rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium text-[var(--ink-muted)] transition-colors hover:bg-white/60 hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
                  conversation.id === activeId && "bg-[var(--sidebar-active)] text-[var(--ink)]",
                )}
              >
                {conversation.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-[var(--line)] pt-3">
          <button className="flex h-10 w-full items-center gap-3 rounded-lg px-2 text-sm font-medium text-[var(--ink-muted)] hover:bg-white/55 hover:text-[var(--ink)]">
            <GearSix size={18} />
            Settings
          </button>
          <button className="mt-1 flex h-11 w-full items-center gap-3 rounded-lg px-2 text-sm font-medium text-[var(--ink-muted)] hover:bg-white/55 hover:text-[var(--ink)]">
            <span className="grid size-8 place-items-center rounded-full bg-[#eadfd5] text-xs font-semibold text-[var(--ink)]">J</span>
            <span className="flex-1 text-left">James</span>
            <CaretDown size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}
