"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SiSupabase,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiDigitalocean,
  SiExpo,
  SiTypescript,
  SiFirebase,
  SiGooglemaps,
  SiReact,
  SiPython,
} from "react-icons/si";
import { cn } from "@/lib/utils";

export type ProjectLink = { label: string; href: string };

export type ProjectData = {
  slug: string;
  category: string;
  title: string;
  description: string;
  longDescription: string[];
  role: string;
  badges: string[];
  gradient: string;
  glow: string;
  cover: string;
  coverClass?: string;
  images: { src: string; alt: string }[];
  links: ProjectLink[];
  /** Image orientation in the detail carousel; defaults to landscape */
  imageOrientation?: "landscape" | "portrait";
};

const EASE = [0.16, 1, 0.3, 1] as const;

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

const STACK_ICONS: Record<string, IconCmp> = {
  supabase: SiSupabase,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  "tailwind css": SiTailwindcss,
  tailwind: SiTailwindcss,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  "digital ocean": SiDigitalocean,
  digitalocean: SiDigitalocean,
  expo: SiExpo,
  typescript: SiTypescript,
  firebase: SiFirebase,
  "google maps api": SiGooglemaps,
  "google maps": SiGooglemaps,
  "react native": SiReact,
  react: SiReact,
  python: SiPython,
};

function badgeIcon(name: string): IconCmp | undefined {
  return STACK_ICONS[name.trim().toLowerCase()];
}

export function ProjectDetail({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const n = project.images.length;
  const go = useCallback(
    (d: number) => setIdx((i) => (i + d + n) % n),
    [n]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Swipe to navigate (touch / pen). Vertical motion is left to scroll.
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let active = false;
    let sx = 0;
    let sy = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      active = true;
      sx = e.clientX;
      sy = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        go(dx < 0 ? 1 : -1);
      }
    };
    const onCancel = () => {
      active = false;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
    };
  }, [go]);

  const current = project.images[idx];
  const portrait = project.imageOrientation === "portrait";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-0 z-110 overflow-y-auto bg-hero text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      data-lenis-prevent
    >
      <div className="mx-auto max-w-325 px-10 pb-20 pt-8 max-[820px]:px-6 max-[680px]:px-5">
        <header className="mb-8 flex items-start justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-hero-dim">
              {project.category}
            </span>
            <h2 className="mt-2 text-[clamp(32px,5vw,56px)] font-bold leading-[1.02] tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="btn-metal flex h-12 w-12 shrink-0 items-center justify-center rounded-full hover:-translate-y-0.5"
          >
            <X className="h-5 w-5" strokeWidth={2.4} aria-hidden />
          </button>
        </header>

        <div
          ref={stageRef}
          className={cn(
            "relative overflow-hidden rounded-3xl bg-hero-2 touch-pan-y select-none",
            portrait && "mx-auto"
          )}
          style={
            portrait
              ? { width: "min(38vh, 360px, 90vw)" }
              : undefined
          }
        >
          <div
            className={cn(
              "relative",
              portrait
                ? "aspect-9/19.5"
                : "h-[62vh] min-h-80"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes={
                    portrait
                      ? "(max-width: 680px) 90vw, 360px"
                      : "(max-width: 820px) 100vw, 1200px"
                  }
                  className={cn(
                    "object-contain",
                    portrait ? "p-2" : "p-4 max-[680px]:p-2"
                  )}
                  draggable={false}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="btn-metal pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.6} aria-hidden />
            </button>
            <span className="pointer-events-auto rounded-full bg-black/40 px-3.5 py-1.5 font-mono text-[11.5px] tracking-widest text-white/90 backdrop-blur-md">
              {String(idx + 1).padStart(2, "0")} /{" "}
              {String(n).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="btn-metal pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full hover:-translate-y-0.5"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2.6} aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-5 flex gap-2.5 overflow-x-auto pb-2">
          {project.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show image ${i + 1}: ${img.alt}`}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-[border-color,opacity] duration-300",
                i === idx
                  ? "border-white/70 opacity-100"
                  : "border-white/10 opacity-50 hover:opacity-80"
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-[1.4fr_0.6fr] gap-12 max-[820px]:grid-cols-1 max-[820px]:gap-9">
          <div>
            {project.longDescription.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mb-5 text-[16.5px] leading-[1.7] text-[#b6b6bd]"
              >
                {para}
              </p>
            ))}
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
                Role
              </div>
              <div className="text-[16px] font-medium">{project.role}</div>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
                Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.badges.map((b) => {
                  const Icon = badgeIcon(b);
                  return (
                    <span
                      key={b}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/4 px-3.5 py-1.5 text-[12.5px] font-medium tracking-[-0.005em] text-white/90"
                    >
                      {Icon && <Icon className="h-4 w-4" aria-hidden />}
                      {b}
                    </span>
                  );
                })}
              </div>
            </div>
            {project.links.length > 0 && (
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
                  Links
                </div>
                <div className="flex flex-col gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-metal group/link flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-[14px] font-medium hover:-translate-y-0.5"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        strokeWidth={2.4}
                        aria-hidden
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
