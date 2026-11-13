import Image from "next/image";

export function Brand() {
  return (
    <div className="flex items-center gap-2 px-1.5">
      <Image
        src="/brand/aurion-mark.png"
        alt=""
        width={34}
        height={34}
        className="size-7 object-contain"
        priority
      />
      <span className="text-[19px] font-semibold tracking-[-0.035em] text-[var(--ink)]">
        Aurion
      </span>
    </div>
  );
}
