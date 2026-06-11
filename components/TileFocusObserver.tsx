"use client";

import { useEffect } from "react";

export function TileFocusObserver() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;

    const tiles = Array.from(
      document.querySelectorAll<HTMLElement>(".tile")
    );
    if (!tiles.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const centerY = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const t of tiles) {
        const r = t.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - centerY);
        if (d < bestDist) {
          bestDist = d;
          best = t;
        }
      }
      for (const t of tiles) {
        t.classList.toggle("tile-focus", t === best);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
