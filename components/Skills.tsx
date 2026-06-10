"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

type Cat = "all" | "lang" | "frame" | "db" | "tools" | "ai" | "methods";

const FILTERS: { cat: Cat; label: string }[] = [
  { cat: "all", label: "All" },
  { cat: "lang", label: "Languages" },
  { cat: "frame", label: "Frameworks" },
  { cat: "db", label: "Databases" },
  { cat: "tools", label: "Tools" },
  { cat: "ai", label: "AI" },
  { cat: "methods", label: "Methods" },
];

const FILTER_LABELS: Record<Cat, string> = {
  all: "all",
  lang: "languages",
  frame: "frameworks",
  db: "databases",
  tools: "tools",
  ai: "ai",
  methods: "methods",
};

type Chip = { name: string; cat: Exclude<Cat, "all">; size: "sm" | "md" | "lg" | "xl" };

const SIZE_CLASS: Record<Chip["size"], string> = {
  sm: "text-[15px]",
  md: "text-[21px]",
  lg: "text-[29px] max-[680px]:text-[24px]",
  xl: "text-[40px] max-[680px]:text-[30px]",
};

const CHIPS: Chip[] = [
  { name: "Python", cat: "lang", size: "xl" },
  { name: "JavaScript", cat: "lang", size: "xl" },
  { name: "Java", cat: "lang", size: "lg" },
  { name: "React", cat: "frame", size: "xl" },
  { name: "Next.js", cat: "frame", size: "lg" },
  { name: "Tailwind CSS", cat: "frame", size: "lg" },
  { name: "Laravel", cat: "frame", size: "md" },
  { name: "Express.js", cat: "frame", size: "md" },
  { name: "PostgreSQL", cat: "db", size: "lg" },
  { name: "MongoDB", cat: "db", size: "md" },
  { name: "MySQL", cat: "db", size: "md" },
  { name: "REST APIs", cat: "tools", size: "lg" },
  { name: "Docker", cat: "tools", size: "md" },
  { name: "Git", cat: "tools", size: "md" },
  { name: "Vercel", cat: "tools", size: "md" },
  { name: "Railway", cat: "tools", size: "sm" },
  { name: "LLM Integration", cat: "ai", size: "lg" },
  { name: "Prompt Engineering", cat: "ai", size: "lg" },
  { name: "Pose Detection", cat: "ai", size: "md" },
  { name: "Agile", cat: "methods", size: "md" },
  { name: "Test Automation", cat: "methods", size: "sm" },
  { name: "SDLC", cat: "methods", size: "sm" },
];

export function Skills() {
  const [active, setActive] = useState<Cat>("all");

  const visibleCount = useMemo(() => {
    if (active === "all") return CHIPS.length;
    return CHIPS.filter((c) => c.cat === active).length;
  }, [active]);

  return (
    <section
      id="skills"
      className="sec-pad border-t border-line bg-band-alt"
    >
      <div className="wrap">
        <SectionHeader
          title="Skills"
          note="A field of the tools and disciplines I work with — filter by category, hover to focus."
        />

        <Reveal className="mt-[38px] flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.cat}
              type="button"
              onClick={() => setActive(f.cat)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] transition-[background-color,color,border-color] duration-200",
                active === f.cat
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-ink-2 hover:border-ink hover:text-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <Reveal className="mt-[34px] flex max-w-[1060px] flex-wrap items-baseline gap-x-3.5 gap-y-3">
          {CHIPS.map((c) => {
            const on = active === "all" || c.cat === active;
            return (
              <span
                key={c.name}
                className={cn(
                  "inline-flex cursor-default items-center rounded-[46px] border border-line px-[0.82em] py-[0.5em] font-medium leading-none tracking-[-0.02em] text-ink transition-[transform,background-color,color,border-color,opacity,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 hover:border-ink hover:bg-ink hover:text-bg",
                  SIZE_CLASS[c.size],
                  !on &&
                    "scale-[0.97] opacity-20 grayscale hover:scale-[0.97] hover:translate-y-0 hover:border-line hover:bg-transparent hover:text-ink"
                )}
              >
                {c.name}
              </span>
            );
          })}
        </Reveal>

        <Reveal className="mt-9 border-t border-line pt-5 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-2">
          <b className="font-medium text-ink">{visibleCount}</b> tools &
          disciplines · showing{" "}
          <b className="font-medium text-ink">{FILTER_LABELS[active]}</b>
        </Reveal>
      </div>
    </section>
  );
}
