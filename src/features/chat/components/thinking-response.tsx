import { Minus, Waveform } from "@phosphor-icons/react";

type ThinkingResponseProps = {
  prompt: string;
};

export function ThinkingResponse({ prompt }: ThinkingResponseProps) {
  return (
    <div className="mx-auto w-full max-w-[900px] px-5 pb-40 pt-5 sm:px-10 sm:pt-7">
      <div className="flex justify-end">
        <div className="max-w-[470px] rounded-[18px] bg-[var(--user-bubble)] px-5 py-3.5 text-[14px] leading-6 text-[var(--ink)] sm:text-[15px]">
          {prompt}
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-label="Generating response"
        className="mt-8 flex h-8 items-center gap-1 text-[var(--accent)]"
      >
        <span className="flex items-center" aria-hidden="true">
          <Waveform size={29} weight="bold" className="thinking-signal origin-center" />
          <Minus size={38} weight="thin" className="thinking-trail -ml-0.5 text-[#d5b6a7]" />
        </span>
        <span className="sr-only">Generating response. Please wait.</span>
      </div>
    </div>
  );
}
