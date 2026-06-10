"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      const footer = document.getElementById("site-footer");
      const heroBottom = Math.max(120, (hero?.offsetHeight ?? 600) - 86);
      const overFooter =
        footer != null && window.scrollY + 64 > footer.offsetTop;
      setDark(window.scrollY > heroBottom && !overFooter);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-6 right-6 z-100 mx-auto flex max-w-325 items-center justify-between gap-5",
        "rounded-full py-2.5 pl-5 pr-3 backdrop-blur-md backdrop-saturate-150",
        "shadow-[0_14px_36px_-20px_rgba(0,0,0,0.45)] transition-[background-color,color] duration-500",
        dark ? "bg-[rgba(13,13,16,0.88)]" : "bg-[rgba(255,255,255,0.82)]",
        "max-[820px]:left-1/2 max-[820px]:right-auto max-[820px]:-translate-x-1/2 max-[820px]:max-w-[calc(100vw-24px)] max-[820px]:justify-start max-[820px]:gap-3 max-[820px]:py-2 max-[820px]:pl-4 max-[820px]:pr-1.5"
      )}
    >
      <Link
        href="#top"
        aria-label="Back to top"
        className={cn(
          "inline-flex items-center text-2xl font-bold leading-none tracking-[-0.04em] transition-colors duration-500",
          dark ? "text-white" : "text-ink"
        )}
      >
        P
      </Link>

      <div className="flex gap-7 max-[820px]:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "group relative py-0.5 text-[14px] font-medium transition-colors duration-200",
              dark ? "text-white" : "text-ink"
            )}
          >
            {link.label}
            <span
              className={cn(
                "absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100",
                dark ? "bg-white" : "bg-ink"
              )}
            />
          </Link>
        ))}
      </div>

      <Link
        href="#contact"
        className={cn(
          "group inline-flex items-center gap-2 rounded-full px-4.5 py-2.5 text-[13px] font-medium transition-[background-color,color,transform,opacity] duration-300 hover:-translate-y-px hover:opacity-90",
          dark ? "bg-white text-ink" : "bg-ink text-white"
        )}
      >
        Get in touch
        <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </Link>
    </nav>
  );
}
