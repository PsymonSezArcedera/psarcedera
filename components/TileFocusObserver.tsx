"use client";

import { useEffect } from "react";

export function TileFocusObserver() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;

    const tiles = Array.from(
      document.querySelectorAll<HTMLElement>(".tile")
    );
    if (!tiles.length) return;

    // Track which tiles are intersecting; the one whose midpoint is
    // closest to the viewport centre wins focus. IntersectionObserver
    // (with multiple thresholds) batches work off the scroll path.
    const visible = new Set<HTMLElement>();
    let raf = 0;
    let lastFocus: HTMLElement | null = null;

    const pickFocus = () => {
      raf = 0;
      if (window.innerWidth > 920) {
        if (lastFocus) {
          lastFocus.classList.remove("tile-focus");
          lastFocus = null;
        }
        return;
      }
      const centerY = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      visible.forEach((t) => {
        const r = t.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - centerY);
        if (d < bestDist) {
          bestDist = d;
          best = t;
        }
      });
      if (best === lastFocus) return;
      if (lastFocus) lastFocus.classList.remove("tile-focus");
      if (best) (best as HTMLElement).classList.add("tile-focus");
      lastFocus = best;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(pickFocus);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target as HTMLElement);
          else visible.delete(e.target as HTMLElement);
        }
        schedule();
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0, 0.5, 1],
      }
    );
    tiles.forEach((t) => io.observe(t));

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (lastFocus) lastFocus.classList.remove("tile-focus");
    };
  }, []);

  return null;
}
