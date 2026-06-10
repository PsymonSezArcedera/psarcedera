import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

type Award = {
  title: string;
  org: string;
  year: string;
  desc: string;
};

const AWARDS: Award[] = [
  {
    title: "Honor Society of the Philippines — Nominee",
    org: "University of the Philippines Los Baños",
    year: "2026",
    desc: "Nominated for outstanding academic performance, ranking within the top 10% of the batch.",
  },
  {
    title: "DOST-SEI Merit Scholar",
    org: "Department of Science and Technology — Science Education Institute",
    year: "2022",
    desc: "Merit-based undergraduate scholarship for excellence in science and engineering.",
  },
];

export function Awards() {
  return (
    <section
      id="awards"
      className="border-t border-line py-[104px]"
    >
      <div className="wrap">
        <SectionHeader title="Awards" note="Recognition along the way." />
        <div className="mt-11 grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
          {AWARDS.map((a) => (
            <Reveal key={a.title}>
              <article className="flex h-full flex-col rounded-[22px] border border-line-2 bg-white p-7 transition-[transform,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#c4c4ca] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,0.3)]">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em]">
                    {a.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.05em] text-ink-2">
                    {a.year}
                  </span>
                </div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2">
                  {a.org}
                </div>
                <p className="text-[15px] leading-[1.6] text-ink-2">{a.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
