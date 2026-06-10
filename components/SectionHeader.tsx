import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <>
      <Reveal className="mb-2 flex items-center gap-[22px]">
        <h2 className="whitespace-nowrap text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.025em]">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </Reveal>
      {note && (
        <Reveal
          as="p"
          className="mt-3.5 max-w-[520px] text-[15.5px] text-ink-2"
        >
          {note}
        </Reveal>
      )}
    </>
  );
}
