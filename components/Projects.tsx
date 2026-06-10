"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TileMark } from "@/components/TileMark";

type Project = {
  category: string;
  title: string;
  description: string;
  badges: string[];
  planned?: boolean;
  gradient: string;
  glow: string;
};

const PROJECTS: Project[] = [
  {
    category: "Web Platform · Backend",
    title: "ICS-ASTRA",
    description:
      "Session-based authentication and role-based access control for an alumni network spanning multiple graduation batches, plus optimized search and filtering over indexed database fields for fast retrieval on large record sets.",
    badges: ["PostgreSQL", "Next.js", "React", "Express"],
    gradient: "linear-gradient(135deg, #1a1a1f 0%, #2b2b33 45%, #3a3a44 100%)",
    glow: "rgba(255,255,255,0.18)",
  },
  {
    category: "Mobile App · Planned",
    title: "ParaLink",
    description:
      "Real-time routes and trip coordination for jeepney drivers and commuters across the San Pablo transport network. A mobile-first take on local transit.",
    badges: ["React Native", "Mobile", "Maps"],
    planned: true,
    gradient: "linear-gradient(135deg, #8a8e96 0%, #a8acb2 50%, #c4c6cc 100%)",
    glow: "rgba(255,255,255,0.22)",
  },
  {
    category: "Research · SSRN · 2024",
    title: "Modeling Merit",
    description:
      "End-to-end Naïve Bayes classification pipeline estimating scholarship eligibility from student attributes. Published on SSRN.",
    badges: ["Python", "Naïve Bayes", "Research"],
    gradient: "linear-gradient(135deg, #d4d4d9 0%, #e6e6ea 50%, #f0f0f3 100%)",
    glow: "rgba(13,13,16,0.08)",
  },
];

function ProjectTile({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({
      x: py * -3,
      y: px * 3,
      mx: ((e.clientX - r.left) / r.width) * 100,
      my: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const onLeave = () => setTilt({ x: 0, y: 0, mx: 50, my: 50 });

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tile group relative grid grid-cols-[1fr_1.1fr] overflow-hidden transition-transform duration-300 ease-out max-[820px]:grid-cols-1"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative min-h-[280px] overflow-hidden max-[820px]:aspect-[16/10] max-[820px]:min-h-0"
        style={{ background: project.gradient }}
      >
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 300px at ${tilt.mx}% ${tilt.my}%, ${project.glow}, transparent 70%)`,
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 flex select-none items-center justify-center text-[clamp(140px,18vw,260px)] font-bold leading-none tracking-[-0.06em] text-white/10 transition-transform duration-700 group-hover:scale-105"
          style={{
            color:
              project.glow === "rgba(13,13,16,0.08)"
                ? "rgba(13,13,16,0.12)"
                : "rgba(255,255,255,0.12)",
          }}
        >
          {project.title.charAt(0)}
        </span>
        {project.planned && (
          <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/90 backdrop-blur-md">
            Planned
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between p-8 max-[820px]:p-7 max-[680px]:p-6">
        <div>
          <span className="tile-meta">{project.category}</span>
          <h3 className="mt-3 text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {project.title}
          </h3>
          <p className="mt-5 text-[16px] leading-[1.65] text-ink-2">
            {project.description}
          </p>
        </div>
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {project.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink-2 transition-colors duration-300 group-hover:border-ink group-hover:text-ink"
              >
                {b}
              </span>
            ))}
          </div>
          <TileMark className="mt-6 h-3.5 w-3.5 self-end text-ink-2 transition-[color,transform] duration-500 group-hover:rotate-45 group-hover:text-ink" />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="sec-pad bg-band-alt">
      <div className="wrap">
        <SectionHeader
          title="Selected work"
          note="Three projects, each given its own room. Tilt the tiles with your cursor."
        />

        <div className="mt-11 flex flex-col gap-5">
          {PROJECTS.map((p) => (
            <Reveal key={p.title}>
              <ProjectTile project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
