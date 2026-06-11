"use client";

import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TileMark } from "@/components/TileMark";
import {
  ProjectDetail,
  type ProjectData,
} from "@/components/ProjectDetail";

const PROJECTS: ProjectData[] = [
  {
    slug: "ics-astra",
    category: "Web Platform · Backend",
    title: "ICS-ASTRA",
    description:
      "Session-based authentication and role-based access control for an alumni network spanning multiple graduation batches, plus optimized search and filtering over indexed database fields for fast retrieval on large record sets.",
    longDescription: [
      "ICS-ASTRA (ICS Alumni Synced Tracking for Relations and Advancement) is an alumni platform built for the UPLB Institute of Computer Science, connecting graduates across batches through events, career opportunities, donations, and news.",
      "I worked as the backend developer: I implemented session-based authentication and role-based access control to deliver personalized access across multiple user roles, and built optimized search and filtering over indexed database fields so alumni and job lookups stay fast on large record sets.",
      "The platform ships eight core modules: user authentication, profile management, alumni search, event management, career opportunities, donations and sponsorships, a newsletter, and reports with analytics. It runs on Next.js and Node with Supabase, styled with Tailwind, installable as a PWA, with CASL handling authorization, deployed across DigitalOcean and Google Cloud.",
    ],
    role: "Backend Developer",
    badges: ["PostgreSQL", "Next.js", "React", "Express"],
    gradient: "linear-gradient(135deg, #1a1a1f 0%, #2b2b33 45%, #3a3a44 100%)",
    glow: "rgba(255,255,255,0.18)",
    cover: "/projects/ICS-ASTRA/cover_page.png",
    images: [
      { src: "/projects/ICS-ASTRA/01-system-features.png", alt: "System features overview" },
      { src: "/projects/ICS-ASTRA/02-user-authentication.png", alt: "User authentication landing page" },
      { src: "/projects/ICS-ASTRA/03-profile-management.png", alt: "Profile management, personal information" },
      { src: "/projects/ICS-ASTRA/04-profile-affiliations.png", alt: "Profile affiliations and contact information" },
      { src: "/projects/ICS-ASTRA/05-alumni-search.png", alt: "Alumni search directory" },
      { src: "/projects/ICS-ASTRA/06-event-management.png", alt: "Event management" },
      { src: "/projects/ICS-ASTRA/07-career-opportunities.png", alt: "Career opportunities job board" },
      { src: "/projects/ICS-ASTRA/08-donations.png", alt: "Donations and sponsorships" },
      { src: "/projects/ICS-ASTRA/09-newsletter.png", alt: "Newsletter bulletin board" },
      { src: "/projects/ICS-ASTRA/10-tech-stack.png", alt: "Tech stack" },
    ],
    links: [
      // TODO: replace with the actual repo URL
      { label: "GitHub", href: "https://github.com/PsymonSezArcedera" },
    ],
  },
  {
    slug: "paralink",
    category: "Mobile App · Planned",
    title: "ParaLink",
    description:
      "Real-time routes and trip coordination for jeepney drivers and commuters across the San Pablo transport network. A mobile-first take on local transit.",
    longDescription: [
      "ParaLink connects jeepney drivers and commuters across the San Pablo City transport network: real-time routes, terminals, and trip coordination in a mobile-first app.",
      "The commuter flow covers the full journey: browse routes and terminals, inspect route details on a live map, check jeepney details and proximity, then start and track a trip. Driver-side coordination and live availability are on the roadmap.",
      "Currently in development with React Native; the screens here are from the working design build.",
    ],
    role: "Developer",
    badges: ["React Native", "Mobile", "Maps"],
    planned: true,
    gradient: "linear-gradient(135deg, #8a8e96 0%, #a8acb2 50%, #c4c6cc 100%)",
    glow: "rgba(255,255,255,0.22)",
    cover: "/projects/ParaLink/cover_page.png",
    images: [
      { src: "/projects/ParaLink/01-login.jpg", alt: "Login screen" },
      { src: "/projects/ParaLink/02-register.jpg", alt: "Commuter registration" },
      { src: "/projects/ParaLink/03-commuter-home.jpg", alt: "Commuter home" },
      { src: "/projects/ParaLink/04-map-view.jpg", alt: "Live map view" },
      { src: "/projects/ParaLink/05-routes-terminals.jpg", alt: "Routes and terminals" },
      { src: "/projects/ParaLink/06-route-details.jpg", alt: "Route details" },
      { src: "/projects/ParaLink/07-route-map.jpg", alt: "Route map" },
      { src: "/projects/ParaLink/08-jeepney-details.jpg", alt: "Jeepney details" },
      { src: "/projects/ParaLink/09-proximity.jpg", alt: "Proximity alerts" },
      { src: "/projects/ParaLink/10-start-trip.jpg", alt: "Start trip" },
    ],
    links: [],
  },
  {
    slug: "modeling-merit",
    category: "Research · SSRN · 2024",
    title: "Modeling Merit",
    description:
      "End-to-end Naïve Bayes classification pipeline estimating scholarship eligibility from student attributes. Published on SSRN.",
    longDescription: [
      "Modeling Merit is a machine-learning study published on SSRN: a Naïve Bayes classifier that predicts scholarship eligibility from academic performance, socioeconomic features, and demographic characteristics, built to make scholarship allocation fairer and less reliant on subjective judgment.",
      "The model reached 77.27% accuracy, 69.08% precision, 78.18% recall, and an F1 score of 73.35%, with feature selection further optimizing predictive accuracy. Strong recall means it reliably identifies true scholarship recipients.",
      "Co-authored with Axel Balitaan and Lawrence Combalicer at UPLB; written December 2024 and posted to SSRN in February 2025. I was a proponent and built the end-to-end classification pipeline.",
    ],
    role: "Proponent · Researcher",
    badges: ["Python", "Naïve Bayes", "Research"],
    gradient: "linear-gradient(135deg, #d4d4d9 0%, #e6e6ea 50%, #f0f0f3 100%)",
    glow: "rgba(13,13,16,0.08)",
    cover: "/projects/Modeling_Merit/cover_page.png",
    coverClass: "object-[center_-6px] origin-top scale-105",
    images: [
      { src: "/projects/Modeling_Merit/01-ssrn-abstract.png", alt: "SSRN abstract page" },
    ],
    links: [
      { label: "SSRN Paper", href: "https://ssrn.com/abstract=5062553" },
      { label: "DOI", href: "https://dx.doi.org/10.2139/ssrn.5062553" },
    ],
  },
];

function ProjectTile({
  project,
  onOpen,
}: {
  project: ProjectData;
  onOpen: () => void;
}) {
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
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} details`}
      className="tile group relative grid cursor-pointer grid-cols-[1fr_1.1fr] overflow-hidden transition-transform duration-300 ease-out max-[820px]:grid-cols-1"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative min-h-70 overflow-hidden max-[820px]:aspect-16/10 max-[820px]:min-h-0"
        style={{ background: project.gradient }}
      >
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${project.coverClass ?? ""}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[rgba(11,11,14,0.38)] via-[rgba(20,20,26,0.18)] to-[rgba(11,11,14,0.32)] transition-opacity duration-500 group-hover:opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 300px at ${tilt.mx}% ${tilt.my}%, ${project.glow}, transparent 70%)`,
          }}
        />
        {project.planned && (
          <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/90 backdrop-blur-md">
            Planned
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between p-8 max-[820px]:p-7 max-[680px]:p-6">
        <div>
          <span className="tile-meta">{project.category}</span>
          <h3 className="mt-3 text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.05] tracking-tight">
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
          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2 opacity-0 transition-[opacity,transform] duration-400 group-hover:translate-x-1 group-hover:opacity-100">
              View project →
            </span>
            <TileMark className="h-3.5 w-3.5 text-ink-2 transition-[color,transform] duration-500 group-hover:rotate-45 group-hover:text-ink" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeProject = PROJECTS.find((p) => p.slug === activeSlug) ?? null;

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#work\/(.+)$/);
      setActiveSlug(m ? m[1] : null);
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener("popstate", fromHash);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  const open = (slug: string) => {
    setActiveSlug(slug);
    window.history.pushState(null, "", `#work/${slug}`);
  };

  const close = () => {
    setActiveSlug(null);
    window.history.pushState(null, "", "#work");
  };

  return (
    <section id="work" className="sec-pad bg-band-alt">
      <div className="wrap">
        <SectionHeader
          title="Selected work"
          note="Three projects, each given its own room. Click one to open the full story."
        />

        <div className="mt-11 flex flex-col gap-5">
          {PROJECTS.map((p) => (
            <Reveal key={p.slug}>
              <ProjectTile project={p} onOpen={() => open(p.slug)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            key={activeProject.slug}
            project={activeProject}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
