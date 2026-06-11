import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const META = [
  { k: "Education", v: "BS Computer Science · UPLB" },
  { k: "Academics", v: "GWA 1.40 · top 10%" },
  { k: "Based in", v: "San Pablo, Laguna · PH" },
];

export function About() {
  return (
    <section id="about" className="sec-pad">
      <div className="wrap">
        <SectionHeader title="About" />
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-14 max-[860px]:grid-cols-1 max-[860px]:gap-9">
          <Reveal
            as="p"
            className="text-[clamp(24px,3vw,38px)] font-medium leading-[1.22] tracking-[-0.02em]"
          >
            Software engineer who turns ideas into shipped products,{" "}
            <span className="text-ink-2">
              AI-powered tools and enterprise systems built to last in
              production.
            </span>
          </Reveal>

          <Reveal>
            <p className="mb-4 text-[16px] text-ink-2">
              I&apos;m a Computer Science student from the University of the
              Philippines Los Baños, with real production experience spanning
              startups and government. I thrive on translating project
              requirements into clean, functional features that make it all
              the way to production.
            </p>
            <p className="mb-4 text-[16px] text-ink-2">
              I&apos;ve contributed to shipping AI-powered kiosks and admin
              dashboards at a startup company, working across LLMs, prompt
              engineering, and pose detection. I&apos;ve also built a
              centralized records platform for a government agency, developing
              information management tools that streamline how records are
              organized and accessed. I&apos;m a team-driven developer who
              values collaboration at every stage of the SDLC, from planning
              and design through development, testing, and deployment.{" "}
              <span className="font-medium text-ink">
                My goal is simple: turn ideas into software products that
                people actually rely on.
              </span>
            </p>
            <div className="mt-[34px] grid grid-cols-3 gap-x-[26px] gap-y-6 border-t border-line pt-[26px] max-[680px]:grid-cols-1 max-[680px]:gap-y-5">
              {META.map(({ k, v }) => (
                <div key={k}>
                  <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">
                    {k}
                  </div>
                  <div className="text-[15px] font-medium leading-snug">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
