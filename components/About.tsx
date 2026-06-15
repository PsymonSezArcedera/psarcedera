"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Typewriter } from "@/components/SplitText";
import { TileMark } from "@/components/TileMark";

type Meta = { k: string; v: string; sub?: string };

const META: Meta[] = [
  {
    k: "Education",
    v: "University of the Philippines Los Baños",
    sub: "BS Computer Science",
  },
  { k: "Academics", v: "GWA 1.40 · top 10%" },
  { k: "Residence", v: "San Pablo, Laguna · PH" },
];

const SLIDES = [
  {
    src: "/about/psymon.jpg",
    label: "At the desk",
    alt: "Psymon at his work desk",
  },
];

function PhotoCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const single = SLIDES.length <= 1;

  useEffect(() => {
    if (single || !inView || paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, 4200);
    return () => clearInterval(t);
  }, [inView, paused, single]);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="tile group relative flex h-full min-h-105 flex-col overflow-hidden p-0"
    >
      <div className="relative flex-1 overflow-hidden bg-hero">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[idx].src}
              alt={SLIDES[idx].alt}
              fill
              sizes="(max-width: 860px) 100vw, 33vw"
              className="object-cover object-[55%_35%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              priority={idx === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {!single && (
        <div className="relative flex items-center justify-between gap-4 px-6 py-5">
          <div className="flex gap-1.5" role="tablist" aria-label="Photos">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === idx}
                aria-label={`Show ${s.label}`}
                onClick={() => setIdx(i)}
                className="group/dot grid h-3 place-items-center"
              >
                <span
                  className={`block h-1 rounded-full bg-current transition-[width,opacity] duration-400 ${
                    i === idx
                      ? "w-7 opacity-100"
                      : "w-3 opacity-30 group-hover/dot:opacity-60"
                  }`}
                />
              </button>
            ))}
          </div>
          <TileMark className="h-3.5 w-3.5 text-ink-2 transition-[color,transform] duration-500 group-hover:rotate-45 group-hover:text-ink" />
        </div>
      )}
      {single && (
        <TileMark className="absolute bottom-5 right-5 h-3.5 w-3.5 text-white/70 transition-[color,transform] duration-500 group-hover:rotate-45 group-hover:text-white" />
      )}
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="sec-pad">
      <div className="wrap">
        <SectionHeader title="About" />
        <div className="grid grid-cols-3 gap-9 max-[860px]:grid-cols-1 max-[860px]:gap-7">
          <div className="col-span-2 max-[860px]:col-span-1">
            <p className="text-[clamp(24px,3vw,38px)] font-medium leading-[1.22] tracking-[-0.02em]">
              <Typewriter
                inline
                startInView
                loop
                charDelayMs={32}
                pauseBetweenLinesMs={250}
                startDelayMs={150}
                lines={[
                  {
                    text: "Software engineer who turns ideas into shipped products, ",
                  },
                  {
                    text: "AI-powered tools and enterprise systems built to last in production.",
                    className: "text-ink-2",
                  },
                ]}
              />
            </p>

            <Reveal>
              <p className="mb-4 mt-10 text-[16px] text-ink-2">
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
              <div className="mt-8.5 grid grid-cols-3 gap-x-6.5 gap-y-6 border-t border-line pt-6.5 max-[680px]:grid-cols-1 max-[680px]:gap-y-5">
                {META.map(({ k, v, sub }) => (
                  <div key={k}>
                    <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-2">
                      {k}
                    </div>
                    <div className="text-[15px] font-medium leading-snug">
                      {v}
                    </div>
                    {sub && (
                      <div className="mt-0.5 text-[13.5px] text-ink-2">
                        {sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="max-[860px]:col-span-1">
            <PhotoCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
