import { Copy, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";

import { IconButton } from "@/components/ui/icon-button";

type ConversationProps = {
  prompt: string;
  variant?: "routine" | "fresh";
};

const steps = [
  ["Wake and reset", "5 min", "Get up at a consistent time, find some natural light, and drink a glass of water to rehydrate."],
  ["Move your body", "10–20 min", "Choose light stretching, a brisk walk, or a short workout that raises your energy without draining it."],
  ["Clear your mind", "5–10 min", "Try a short breathing exercise, meditation, or a few lines of journaling to reduce mental clutter."],
  ["Plan with intention", "5–10 min", "Review your priorities and choose one to three meaningful tasks for the day so your direction stays clear."],
  ["Fuel up", "10–15 min", "Have a balanced breakfast with protein, fibre, and healthy fats to sustain your energy through the morning."],
];

export function Conversation({ prompt, variant = "routine" }: ConversationProps) {
  return (
    <div className="mx-auto w-full max-w-[900px] px-5 pb-40 pt-5 sm:px-10 sm:pt-7">
      <div className="flex justify-end">
        <div className="max-w-[470px] rounded-[18px] bg-[var(--user-bubble)] px-5 py-3.5 text-[14px] leading-6 text-[var(--ink)] sm:text-[15px]">
          {prompt}
        </div>
      </div>

      <article className="mt-8 max-w-[860px] text-[14px] leading-[1.58] text-[var(--ink)] sm:text-[15px]">
        {variant === "fresh" ? (
          <>
            <h2 className="text-[23px] font-semibold leading-tight tracking-[-0.025em] sm:text-[26px]">
              Let&apos;s work through that
            </h2>
            <p className="mt-3 text-[var(--ink-muted)]">
              I can help you turn this into a clear, practical result. I&apos;ll begin by identifying the goal, the most important constraints, and the best next step.
            </p>
            <div className="mt-6 rounded-2xl border border-[var(--composer-line)] bg-white/40 p-5">
              <p className="font-semibold text-[var(--ink)]">A useful starting point</p>
              <p className="mt-2 text-[var(--ink-muted)]">
                Share any context, preferred format, deadline, or examples you already have. If you don&apos;t have those yet, we can build the answer together from a simple first draft.
              </p>
            </div>
            <p className="mt-5 text-[var(--ink-muted)]">
              Your new conversation is ready. Future responses will appear here once the backend model connection is added.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-[23px] font-semibold leading-tight tracking-[-0.025em] sm:text-[26px]">
              A Focused Morning Routine for Productivity and Energy
            </h2>
            <p className="mt-3 text-[var(--ink-muted)]">
              A great morning routine doesn&apos;t have to be long or complicated. The goal is to wake your mind and body, set a clear focus for the day, and build momentum early.
            </p>

            <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.015em] sm:text-[20px]">
              A 60–90 Minute Routine
            </h3>
            <ol className="mt-3 space-y-3.5">
              {steps.map(([title, time, body], index) => (
                <li key={title} className="grid grid-cols-[24px_1fr] gap-2.5">
                  <span className="font-semibold text-[var(--accent)]">{index + 1}.</span>
                  <p>
                    <strong>{title}</strong>{" "}
                    <span className="text-[var(--ink-muted)]">({time}). {body}</span>
                  </p>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.015em] sm:text-[20px]">
              Make It Work for You
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-[var(--ink-muted)]">
              <li><strong className="text-[var(--ink)]">Start small.</strong> Pick two or three steps and build from there.</li>
              <li><strong className="text-[var(--ink)]">Keep it consistent.</strong> A regular rhythm matters more than a perfect routine.</li>
              <li><strong className="text-[var(--ink)]">Adjust to your life.</strong> Scale it down on busier days.</li>
            </ul>

            <p className="mt-5 text-[var(--ink-muted)]">
              The key is consistency and intention. A short, focused routine can help you feel clearer, more energized, and better prepared for a productive day.
            </p>
          </>
        )}

        <div className="mt-5 flex items-center gap-1">
          <IconButton label="Copy response" className="size-8"><Copy size={16} /></IconButton>
          <IconButton label="Good response" className="size-8"><ThumbsUp size={16} /></IconButton>
          <IconButton label="Bad response" className="size-8"><ThumbsDown size={16} /></IconButton>
        </div>
      </article>
    </div>
  );
}
