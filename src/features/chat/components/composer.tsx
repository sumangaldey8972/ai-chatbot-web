import {
  CaretDown,
  Check,
  CirclesThreePlus,
  PaperPlaneTilt,
  Sparkle,
  Stack,
} from "@phosphor-icons/react";
import type { FormEvent } from "react";

import { MODEL_OPTIONS } from "@/config/models";
import type { ModelId } from "@/features/chat/types/chat";
import { cn } from "@/lib/cn";

type ComposerProps = {
  draft: string;
  model: ModelId;
  isThinking: boolean;
  isMenuOpen: boolean;
  onDraftChange: (value: string) => void;
  onMenuToggle: () => void;
  onModelChange: (model: ModelId) => void;
  onSubmit: () => void;
};

const modelIcons = { auto: Sparkle, general: Stack, flexible: CirclesThreePlus };

export function Composer({ draft, model, isThinking, isMenuOpen, onDraftChange, onMenuToggle, onModelChange, onSubmit }: ComposerProps) {
  const activeModel = MODEL_OPTIONS.find((option) => option.id === model) ?? MODEL_OPTIONS[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="composer-fade pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-14 sm:px-8 sm:pb-5">
      <form
        onSubmit={handleSubmit}
        aria-busy={isThinking}
        className="pointer-events-auto relative mx-auto flex min-h-[58px] w-full max-w-[1110px] items-center rounded-[22px] border border-[var(--composer-line)] bg-[var(--composer)] p-2 shadow-[0_8px_28px_rgba(70,41,28,0.06)]"
      >
        {isMenuOpen && (
          <div className="absolute bottom-[68px] left-0 w-[280px] overflow-hidden rounded-2xl border border-[var(--composer-line)] bg-[var(--composer)] p-2 shadow-[0_18px_45px_rgba(53,29,19,0.14)]">
            {MODEL_OPTIONS.map((option) => {
              const Icon = modelIcons[option.id];
              const selected = option.id === model;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onModelChange(option.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[var(--sidebar-active)]",
                    selected && "bg-[var(--model-active)]",
                  )}
                >
                  <Icon size={18} className="shrink-0 text-[var(--accent)]" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[var(--ink)]">{option.label}</span>
                    <span className="block truncate text-[11px] text-[var(--ink-faint)]">{option.helper}</span>
                  </span>
                  {selected && <Check size={16} weight="bold" className="text-[var(--accent)]" />}
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          aria-expanded={isMenuOpen}
          onClick={onMenuToggle}
          disabled={isThinking}
          className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[var(--model-active)] px-3 text-xs font-semibold text-[var(--ink)] hover:bg-[var(--sidebar-active)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        >
          <Sparkle size={15} className="text-[var(--accent)]" />
          <span className="hidden sm:inline">{activeModel.id === "auto" ? "Auto" : activeModel.id === "general" ? "General AI" : "Flexible"}</span>
          <CaretDown size={14} />
        </button>

        <div className="mx-2 h-7 w-px bg-[var(--line)]" />
        <input
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Message Aurion..."
          aria-label="Message"
          disabled={isThinking}
          className="min-w-0 flex-1 bg-transparent px-1 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
        />
        <button
          type="submit"
          disabled={!draft.trim() || isThinking}
          aria-label="Send message"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <PaperPlaneTilt size={18} weight="fill" />
        </button>
      </form>
      <p className="pointer-events-auto mx-auto mt-2 max-w-[1110px] text-center text-[10px] text-[var(--ink-faint)]">
        AI can make mistakes. Check important information.
      </p>
    </div>
  );
}
