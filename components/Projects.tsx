"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

type Project = {
  category: string;
  title: string;
  description: string;
  badges: string[];
  planned?: boolean;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    category: "Web Platform · Backend",
    title: "ICS-ASTRA",
    description:
      "Session-based authentication and role-based access control for an alumni network spanning multiple graduation batches, plus optimized search and filtering over indexed database fields for fast retrieval on large record sets.",
    badges: ["PostgreSQL", "Next.js", "React", "Express"],
  },
  {
    category: "Mobile App · Planned",
    title: "ParaLink",
    description:
      "A mobile application for jeepney drivers in San Pablo City — connecting drivers and commuters with real-time routes and trip coordination across the local transport network.",
    badges: ["React Native", "Mobile", "Maps"],
    planned: true,
  },
  {
    category: "Research · SSRN · 2024",
    title: "Modeling Merit",
    description:
      "An end-to-end Naïve Bayes classification pipeline estimating scholarship eligibility from student attributes. Published on SSRN.",
    badges: ["Python", "Naïve Bayes", "Research"],
  },
];

function ProjectCard({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={`overflow-hidden rounded-[30px] border border-line-2 bg-white transition-shadow duration-[600ms] ${
          isActive
            ? "shadow-[0_44px_84px_-36px_rgba(0,0,0,0.42)]"
            : "shadow-[0_18px_42px_-26px_rgba(0,0,0,0.22)]"
        }`}
      >
        <div
          className="relative aspect-[5/4] border-b border-line-2 bg-surface"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0 15px, rgba(0,0,0,0.045) 15px 16px)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded bg-bg px-3 py-1 font-mono text-[11.5px] tracking-[0.04em] text-ink-2">
              {project.title}
            </span>
          </div>
          {project.planned && (
            <span className="absolute left-4 top-4 rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-2">
              Planned
            </span>
          )}
        </div>
        <div className="px-6 pb-7 pt-6 text-center">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">
            {project.category}
          </div>
          <h3 className="mb-3 text-[25px] font-semibold tracking-[-0.02em]">
            {project.title}
          </h3>
          <p className="mx-auto mb-[18px] max-w-[320px] text-[14.5px] leading-[1.55] text-ink-2">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-center gap-[7px]">
            {project.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const N = PROJECTS.length;

  const rel = useCallback(
    (i: number) => {
      let o = (i - active) % N;
      if (o < 0) o += N;
      if (o > N / 2) o -= N;
      return o;
    },
    [active, N]
  );

  const layout = useCallback(() => {
    cardRefs.current.forEach((c, i) => {
      if (!c) return;
      const w = c.offsetWidth || 360;
      const o = rel(i);
      let x = 0;
      let y = 0;
      let s = 1;
      let z = 30;
      let op = 1;
      if (o === 0) {
        x = 0;
        y = 0;
        s = 1;
        z = 30;
        op = 1;
      } else if (o === 1) {
        x = w * 0.66;
        y = 46;
        s = 0.8;
        z = 20;
        op = 1;
      } else if (o === -1) {
        x = -w * 0.66;
        y = 46;
        s = 0.8;
        z = 20;
        op = 1;
      } else {
        x = (o > 0 ? 1 : -1) * w * 1.15;
        y = 70;
        s = 0.6;
        z = 5;
        op = 0;
      }
      c.style.transform = `translate(calc(-50% + ${x}px), ${y}px) scale(${s})`;
      c.style.zIndex = String(z);
      c.style.opacity = String(op);
      c.style.pointerEvents = op > 0 ? "auto" : "none";
    });
  }, [rel]);

  const go = useCallback(
    (d: number) => setActive((a) => (a + d + N) % N),
    [N]
  );

  useEffect(() => {
    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layout]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let sx: number | null = null;
    let dragging = false;
    const onDown = (e: PointerEvent) => {
      sx = e.clientX;
      dragging = true;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging || sx === null) return;
      dragging = false;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    };
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [go]);

  return (
    <section id="work" className="sec-pad border-t border-line bg-band-alt">
      <div className="wrap">
        <SectionHeader
          title="Selected Work"
          note="Browse the projects — drag, use the arrows, click a side card, or use ← →. It loops."
        />
        <Reveal className="mt-[42px]">
          <div
            ref={stageRef}
            className="relative h-[560px] max-[680px]:h-[520px] max-[420px]:h-120"
            aria-roledescription="carousel"
          >
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-0 w-[clamp(290px,76vw,400px)] transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ willChange: "transform" }}
              >
                <ProjectCard
                  project={p}
                  isActive={rel(i) === 0}
                  onClick={() => {
                    if (rel(i) !== 0) setActive(i);
                  }}
                />
              </article>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-[22px]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-line bg-white text-[17px] text-ink transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
            >
              ←
            </button>
            <span className="font-mono text-[12px] tracking-[0.1em] text-ink-2">
              <b className="font-medium text-ink">
                {String(active + 1).padStart(2, "0")}
              </b>{" "}
              / {String(N).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-line bg-white text-[17px] text-ink transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
