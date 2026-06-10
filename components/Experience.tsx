import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

type Job = {
  logo: { src: string; alt: string; pad?: string; tileBg?: string };
  role: string;
  company: string;
  date: string;
  current?: boolean;
  desc: string;
  tags: string[];
};

const JOBS: Job[] = [
  {
    logo: {
      src: "/ten-x.png",
      alt: "Ten X Development logo",
      pad: "p-0",
      tileBg: "bg-hero",
    },
    role: "AI Software Developer Intern",
    company: "Ten X Development",
    date: "Sep 2025 — May 2026",
    current: true,
    desc: "Developed 3 of 5 core features for AI-powered interactive kiosks deployed across 5 Metro Manila malls, including pose-detection experiences. Built 6 modules of an admin dashboard for a major food-chain client, and drove in-house LLM development through prompt engineering and rigorous response evaluation.",
    tags: ["React", "Next.js", "LLM Integration", "Pose Detection"],
  },
  {
    logo: { src: "/dost.png", alt: "DOST logo" },
    role: "Software Developer Intern",
    company: "Department of Science and Technology",
    date: "Jun 2025 — Aug 2025",
    desc: "Built and deployed a full-stack web app consolidating records of 10 government offices into a single centralized interface, serving staff across multiple DOST regional divisions. Implemented record creation, search & filtering, and detail-view workflows, iterating on stakeholder feedback to ship a production-ready system.",
    tags: ["Full-Stack", "REST APIs", "PostgreSQL"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="sec-pad border-t border-line bg-band-alt"
    >
      <div className="wrap">
        <SectionHeader
          title="Experience"
          note="Where I've worked and what I shipped."
        />
        <div className="mt-11 flex flex-col gap-4">
          {JOBS.map((job) => (
            <Reveal key={job.company}>
              <article className="group grid grid-cols-[auto_1fr] items-start gap-[30px] rounded-[22px] border border-line-2 bg-white p-7 transition-[transform,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#c4c4ca] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,0.3)] max-[680px]:grid-cols-1 max-[680px]:gap-[18px] max-[680px]:p-6">
                <div
                  className={cn(
                    "relative flex h-18.5 w-18.5 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line-2",
                    job.logo.tileBg ?? "bg-white"
                  )}
                >
                  <Image
                    src={job.logo.src}
                    alt={job.logo.alt}
                    fill
                    sizes="74px"
                    className={cn("object-contain", job.logo.pad ?? "p-2")}
                  />
                </div>
                <div className="exp-main">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <h3 className="text-[clamp(20px,2.3vw,26px)] font-semibold tracking-[-0.02em]">
                        {job.role}
                      </h3>
                      <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-2">
                        {job.company}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em]",
                        job.current
                          ? "border-ink bg-ink text-bg"
                          : "border-line text-ink-2"
                      )}
                    >
                      {job.date}
                    </span>
                  </div>
                  <p className="mt-3.5 max-w-[780px] text-[15px] leading-[1.6] text-ink-2">
                    {job.desc}
                  </p>
                  <div className="mt-[18px] flex flex-wrap gap-[7px]">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink-2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
