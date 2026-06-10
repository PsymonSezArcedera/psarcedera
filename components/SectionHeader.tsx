import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  index,
  title,
  note,
}: {
  index?: string;
  title: string;
  note?: string;
}) {
  return (
    <>
      <Reveal className="mb-3 flex items-baseline gap-4">
        {index && (
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
            {index}
          </span>
        )}
        <h2 className="text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.025em]">
          {title}
        </h2>
      </Reveal>
      {note && (
        <Reveal
          as="p"
          className="mt-2 max-w-[520px] text-[15.5px] text-ink-2"
        >
          {note}
        </Reveal>
      )}
    </>
  );
}
