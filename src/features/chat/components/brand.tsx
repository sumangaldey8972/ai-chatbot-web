import Image from "next/image";

export function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <Image
        src="/brand/aurion-mark.png"
        alt=""
        width={34}
        height={34}
        className="size-8 object-contain"
        priority
      />
      <span className="text-[22px] font-semibold tracking-[-0.035em] text-[var(--ink)]">
        Aurion
      </span>
    </div>
  );
}
