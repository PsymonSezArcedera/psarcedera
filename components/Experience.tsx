import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TileMark } from "@/components/TileMark";
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
          title="Where I've shipped"
          note="Two roles, two production environments, full feature delivery from idea to ship."
        />
        <div className="mt-11 grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          {JOBS.map((job) => (
            <Reveal key={job.company}>
              <article className="tile group flex h-full flex-col p-7 max-[680px]:p-6">
                <header className="flex items-start justify-between gap-4">
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
                  <span
                    className={cn(
                      "tile-meta shrink-0 rounded-full border px-3 py-1.5",
                      job.current
                        ? "border-ink bg-ink text-bg"
                        : "border-line text-ink-2"
                    )}
                  >
                    {job.date}
                  </span>
                </header>

                <div className="mt-7">
                  <h3 className="text-[clamp(22px,2.6vw,28px)] font-semibold leading-tight tracking-[-0.02em]">
                    {job.role}
                  </h3>
                  <div className="mt-1.5 tile-meta">{job.company}</div>
                </div>

                <p className="mt-5 text-[15px] leading-[1.65] text-ink-2">
                  {job.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink-2 transition-colors duration-300 group-hover:border-ink group-hover:text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <TileMark className="mt-8 h-3.5 w-3.5 self-end text-ink-2 transition-[color,transform] duration-500 group-hover:rotate-45 group-hover:text-ink" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
