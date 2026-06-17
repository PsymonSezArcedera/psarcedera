"use client";

import { useEffect, useRef } from "react";

const ANIM_CLASS = "hero-bg-anim";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const setPlay = (state: "running" | "paused") => {
      const els = root.querySelectorAll<SVGElement>(`.${ANIM_CLASS}`);
      els.forEach((el) => {
        el.style.animationPlayState = state;
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay("paused");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => setPlay(entries[0].isIntersecting ? "running" : "paused"),
      { rootMargin: "100px" }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const willChange: React.CSSProperties = { willChange: "transform" };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #0a1638 0%, #050a1f 55%, #02050f 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="line-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5285e8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a8c5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5285e8" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="line-glow-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3060c8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#7aafff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3060c8" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <g
          className={ANIM_CLASS}
          style={{
            ...willChange,
            transformOrigin: "center",
            animation: "wave-line-a 22s ease-in-out infinite alternate",
          }}
        >
          <path
            d="M -200 500 C 200 300, 600 700, 1000 450 S 1700 600, 2000 350"
            stroke="url(#line-glow)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        <g
          className={ANIM_CLASS}
          style={{
            ...willChange,
            transformOrigin: "center",
            animation: "wave-line-b 26s ease-in-out infinite alternate",
          }}
        >
          <path
            d="M -200 350 C 300 550, 700 250, 1100 500 S 1800 350, 2000 600"
            stroke="url(#line-glow-2)"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
        <g
          className={ANIM_CLASS}
          style={{
            ...willChange,
            transformOrigin: "center",
            animation: "wave-line-c 30s ease-in-out infinite alternate",
          }}
        >
          <path
            d="M -200 650 C 250 400, 650 800, 1000 550 S 1700 700, 2000 500"
            stroke="url(#line-glow)"
            strokeWidth="1"
            fill="none"
            opacity="0.75"
          />
        </g>
        <g
          className={ANIM_CLASS}
          style={{
            ...willChange,
            transformOrigin: "center",
            animation: "wave-line-a 34s ease-in-out infinite alternate",
          }}
        >
          <path
            d="M -200 200 C 400 100, 800 400, 1200 200 S 1800 250, 2000 100"
            stroke="url(#line-glow-2)"
            strokeWidth="0.9"
            fill="none"
            opacity="0.65"
          />
        </g>

        <g
          className={ANIM_CLASS}
          style={{
            ...willChange,
            animation: "particles-drift 24s ease-in-out infinite",
          }}
        >
          <circle cx="180" cy="220" r="1.2" fill="#a8c5ff" opacity="0.6" />
          <circle cx="420" cy="680" r="1" fill="#7aafff" opacity="0.5" />
          <circle cx="760" cy="180" r="1.5" fill="#a8c5ff" opacity="0.7" />
          <circle cx="1080" cy="540" r="1" fill="#7aafff" opacity="0.5" />
          <circle cx="1320" cy="280" r="1.3" fill="#a8c5ff" opacity="0.6" />
          <circle cx="1480" cy="720" r="1" fill="#7aafff" opacity="0.5" />
        </g>
        <g
          className={ANIM_CLASS}
          style={{
            ...willChange,
            animation: "particles-drift-2 32s ease-in-out infinite",
          }}
        >
          <circle cx="280" cy="440" r="1" fill="#7aafff" opacity="0.4" />
          <circle cx="620" cy="320" r="1.2" fill="#a8c5ff" opacity="0.55" />
          <circle cx="940" cy="760" r="1" fill="#7aafff" opacity="0.45" />
          <circle cx="1220" cy="120" r="1.3" fill="#a8c5ff" opacity="0.6" />
          <circle cx="1400" cy="480" r="1" fill="#7aafff" opacity="0.5" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(2,5,15,0.7) 0%, transparent 55%), radial-gradient(ellipse at 50% 0%, rgba(2,5,15,0.4) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
