"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      if (a.target === "_blank") return;
      const id = href.slice(1).split("/")[0];
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -64, duration: 1 });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
