import { Code, Lightbulb, PencilSimple, TrendUp } from "@phosphor-icons/react";

type NewChatProps = {
  onSuggestionSelect: (prompt: string) => void;
};

const suggestions = [
  {
    icon: PencilSimple,
    title: "Write something",
    prompt: "Help me write a clear and professional project proposal.",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    prompt: "Give me creative ideas for launching a new AI product.",
  },
  {
    icon: Code,
    title: "Build with code",
    prompt: "Help me plan the architecture for a scalable web application.",
  },
  {
    icon: TrendUp,
    title: "Make a plan",
    prompt: "Create a practical 30-day plan to improve my productivity.",
  },
];

export function NewChat({ onSuggestionSelect }: NewChatProps) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[880px] flex-col justify-center px-5 pb-40 pt-16 sm:px-10 sm:pb-44">
      <div className="mx-auto w-full max-w-[700px] text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--model-active)] shadow-[inset_0_0_0_1px_rgba(195,69,20,0.08)]">
          <span className="text-2xl font-semibold tracking-[-0.06em] text-[var(--accent)]">A</span>
        </div>
        <h1 className="mt-6 text-[30px] font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-[38px]">
          How can I help you today?
        </h1>
        <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[var(--ink-muted)] sm:text-[15px]">
          Ask a question, explore an idea, or start building something new with Aurion.
        </p>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-[700px] grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map(({ icon: Icon, title, prompt }) => (
          <button
            key={title}
            type="button"
            onClick={() => onSuggestionSelect(prompt)}
            className="group flex min-h-[112px] items-start gap-3.5 rounded-2xl border border-[var(--composer-line)] bg-white/45 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#dfb9a8] hover:bg-white/75 hover:shadow-[0_10px_28px_rgba(70,41,28,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--model-active)] text-[var(--accent)] transition group-hover:bg-[var(--sidebar-active)]">
              <Icon size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--ink)]">{title}</span>
              <span className="mt-1 block text-xs leading-5 text-[var(--ink-faint)]">{prompt}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
