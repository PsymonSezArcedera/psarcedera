"use client";

import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TileMark } from "@/components/TileMark";
import {
  ProjectDetail,
  badgeIcon,
  type ProjectData,
} from "@/components/ProjectDetail";

const PROJECTS: ProjectData[] = [
  {
    slug: "ics-astra",
    category: "Web platform · Information management",
    title: "ICS-ASTRA",
    description:
      "ICS-ASTRA is an alumni network platform connecting graduates across multiple batches, with modules for profiles, alumni search, events, career opportunities, donations, and analytics.",
    longDescription: [
      "ICS-ASTRA (ICS Alumni Synced Tracking for Relations and Advancement) is an alumni platform built for the UPLB Institute of Computer Science, connecting graduates across batches through events, career opportunities, donations, and news.",
      "I worked as the backend developer in a cross-functional team of three sub-teams totaling twenty members. I implemented session-based authentication and role-based access control to deliver personalized access across multiple user roles, and built optimized search and filtering over indexed database fields to keep alumni and job lookups fast on large record sets. The platform ships eight core modules: user authentication, profile management, alumni search, event management, career opportunities, donations and sponsorships, a newsletter, and reports with analytics, and runs on Next.js and Node with Supabase, styled with Tailwind, installable as a PWA, with CASL handling authorization, deployed across DigitalOcean and Google Cloud.",
    ],
    role: "Backend Developer",
    badges: ["Supabase", "Next.js", "Tailwind CSS", "Node.js", "Digital Ocean", "CASL"],
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
      {
        label: "GitHub",
        href: "https://github.com/fofajardo/cmsc128-ics-astra",
      },
    ],
  },
  {
    slug: "paralink",
    category: "Mobile application · Location tracking · Ride-hailing",
    title: "ParaLink",
    description:
      "Real-time routes and trip coordination for jeepney drivers and commuters across the San Pablo transport network. A mobile-first take on local transit.",
    longDescription: [
      "ParaLink is a cross-platform mobile app connecting jeepney commuters and drivers in San Pablo City, featuring real-time route mapping, fare computation, and a live passenger-count system.",
      "Architected using Firestore data model and Firebase Authentication flow supporting separate commuter and driver roles, with real-time syncing of trip and location data.",
      "Used integration of Google Maps API and OSRM for route visualization and turn-by-turn pathfinding, delivering accurate jeepney routing across the local transit network.",
      "The commuter flow covers the full journey: browse routes and terminals, inspect route details on a live map, check jeepney details and proximity, then start and track a trip. Driver-side coordination and live availability are on the roadmap."
    ],
    role: "Full Stack Developer",
    badges: ["React Native", "Expo", "TypeScript", "FireBase", "Google Maps API", "OSRM"],
    gradient: "linear-gradient(135deg, #8a8e96 0%, #a8acb2 50%, #c4c6cc 100%)",
    glow: "rgba(255,255,255,0.22)",
    cover: "/projects/ParaLink/cover_page.png",
    imageOrientation: "portrait",
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
    links: [
      {
        label: "GitHub",
        href: "https://github.com/PsymonSezArcedera/SP-ParaLink",
      },
    ],
  },
  {
    slug: "modeling-merit",
    category: "Machine learning · Research",
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
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // direct DOM writes batched to one frame; no React re-render per mousemove
  const onMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateX(${(py * -3).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg)`;
      const glow = glowRef.current;
      if (glow) {
        glow.style.background = `radial-gradient(circle 300px at ${((px + 0.5) * 100).toFixed(1)}% ${((py + 0.5) * 100).toFixed(1)}%, ${project.glow}, transparent 70%)`;
      }
    });
  };

  const onLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    }
    const glow = glowRef.current;
    if (glow) {
      glow.style.background = `radial-gradient(circle 300px at 50% 50%, ${project.glow}, transparent 70%)`;
    }
  };

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
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
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
          ref={glowRef}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 300px at 50% 50%, ${project.glow}, transparent 70%)`,
          }}
        />
      </div>

      <div className="flex flex-col justify-between p-8 max-[820px]:p-7 max-[680px]:p-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className="tile-meta font-semibold">{project.category}</span>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              View project
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
            </span>
          </div>
          <h3 className="mt-3 text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.05] tracking-tight">
            {project.title}
          </h3>
          <p className="mt-5 text-[16px] leading-[1.65] text-ink-2">
            {project.description}
          </p>
        </div>
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {project.badges.map((b) => {
              const Icon = badgeIcon(b);
              return (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/30 px-3 py-1.5 text-[12px] font-medium tracking-[-0.005em] text-ink-2 transition-colors duration-300 group-hover:border-ink group-hover:text-ink"
              >
                {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                {b}
              </span>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-end">
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
          note="View the projects I have worked on."
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
