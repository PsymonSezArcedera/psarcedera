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
      <Reveal className="mb-2">
        <h2 className="text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.025em]">
          {title}
        </h2>
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
