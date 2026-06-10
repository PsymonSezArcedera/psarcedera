import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const META = [
  { k: "Education", v: "BS Computer Science · UPLB" },
  { k: "Academics", v: "GWA 1.40 · top 10%" },
  { k: "Based in", v: "San Pablo, Laguna · PH" },
  { k: "Currently", v: "Open to roles" },
];

export function About() {
  return (
    <section id="about" className="py-[104px]">
      <div className="wrap">
        <SectionHeader title="About" />
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-14 max-[860px]:grid-cols-1 max-[860px]:gap-9">
          <Reveal
            as="p"
            className="text-[clamp(24px,3vw,38px)] font-medium leading-[1.22] tracking-[-0.02em]"
          >
            A full-stack developer who ships end to end —{" "}
            <span className="text-ink-2">
              building AI-powered products and enterprise systems that hold up
              in production.
            </span>
          </Reveal>

          <Reveal>
            <p className="mb-4 text-[16px] text-ink-2">
              I&apos;m a Computer Science student at UP Los Baños and a
              DOST-SEI Merit Scholar, with hands-on production experience
              across startup and government environments. I like turning fuzzy
              requirements into features that actually ship.
            </p>
            <p className="mb-4 text-[16px] text-ink-2">
              Recently I&apos;ve built AI-powered kiosks and admin dashboards
              at a startup, and a centralized records platform for the
              Department of Science and Technology — integrating LLMs, pose
              detection, and full-stack web systems along the way.
            </p>
            <div className="mt-[34px] grid grid-cols-2 gap-x-[26px] gap-y-6 border-t border-line pt-[26px]">
              {META.map((m) => (
                <div key={m.k}>
                  <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">
                    {m.k}
                  </div>
                  <div className="text-[16px] font-medium">{m.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
