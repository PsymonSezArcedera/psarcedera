"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const EMAIL = "psarcedera@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/psymonsezarcedera/";
const GITHUB = "https://github.com/PsymonSezArcedera";

const SITEMAP = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#awards", label: "Awards" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function Flashlight() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const brightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bright = brightRef.current;
    if (!wrap || !bright) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const paint = () => {
      raf = 0;
      const r = bright.getBoundingClientRect();
      bright.style.setProperty("--mx", `${lastX - r.left}px`);
      bright.style.setProperty("--my", `${lastY - r.top}px`);
    };
    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      bright.style.setProperty("--mx", "-999px");
      bright.style.setProperty("--my", "-999px");
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="wrap flash-wrap relative pb-7 pt-1.5">
      <div className="mb-1.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim opacity-70">
        move your cursor
      </div>
      <div className="relative">
        <span className="block select-none text-center text-[clamp(64px,21vw,310px)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-white/[0.05]">
          PSYMON
        </span>
        <span
          ref={brightRef}
          aria-hidden
          className="flash-bright pointer-events-none absolute inset-0 block select-none text-center text-[clamp(64px,21vw,310px)] font-bold uppercase leading-[0.86] tracking-[-0.045em]"
        >
          PSYMON
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-hero text-white"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(74,127,224,0.08) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(10,22,56,0.55) 0%, transparent 60%)",
      }}
    >
      <div className="wrap grid grid-cols-[1.5fr_1fr_1fr] gap-10 pb-[50px] pt-[84px] max-[760px]:grid-cols-1 max-[760px]:gap-[34px]">
        <div>
          <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
            Get in touch
          </div>
          <Link
            href={`mailto:${EMAIL}`}
            className="inline-block text-[clamp(22px,3vw,34px)] font-semibold tracking-[-0.02em] text-white hover:underline hover:underline-offset-[5px]"
          >
            {EMAIL}
          </Link>
          <p className="mt-[18px] max-w-[340px] text-[15px] leading-[1.55] text-[#a4a4ac]">
            Open to full-time and internship software roles, remote, or around
            Laguna & Metro Manila. Let&apos;s build something good.
          </p>
        </div>

        <div>
          <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
            Sitemap
          </div>
          <div className="flex flex-col gap-2.5">
            {SITEMAP.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="w-fit text-[15px] text-[#b2b2b9] transition-colors duration-200 hover:text-white"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
            Elsewhere
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[15px] text-[#b2b2b9] transition-colors duration-200 hover:text-white"
            >
              GitHub ↗
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[15px] text-[#b2b2b9] transition-colors duration-200 hover:text-white"
            >
              LinkedIn ↗
            </a>
            <Link
              href="/PsymonSezArcedera_Resume.pdf"
              download
              className="w-fit text-[15px] text-[#b2b2b9] transition-colors duration-200 hover:text-white"
            >
              Résumé ↓
            </Link>
          </div>
        </div>
      </div>

      <Flashlight />

      <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-hero-dim">
          © 2026 Psymon Sez Arcedera
        </span>
        <Link
          href="#top"
          className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-hero-dim transition-colors duration-200 hover:text-white"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
