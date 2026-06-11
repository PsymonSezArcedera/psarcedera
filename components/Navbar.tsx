"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function NavLogo({ showLight }: { showLight: boolean }) {
  return (
    <span className="relative block h-9 w-9">
      <Image
        src="/logo/2d_logo_dark.png"
        alt="PS logo"
        fill
        sizes="36px"
        className={cn(
          "object-contain transition-opacity duration-500",
          showLight ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        src="/logo/2d_logo_light.png"
        alt=""
        aria-hidden
        fill
        sizes="36px"
        className={cn(
          "object-contain transition-opacity duration-500",
          showLight ? "opacity-100" : "opacity-0"
        )}
      />
    </span>
  );
}

function BurgerLines({ open }: { open: boolean }) {
  const lineBase =
    "absolute left-0 right-0 top-1/2 h-0.5 rounded bg-current origin-center";
  const easing = [0.16, 1, 0.3, 1] as const;
  return (
    <div className="relative h-5 w-5">
      <motion.span
        className={lineBase}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
        transition={{ duration: 0.3, ease: easing }}
      />
      <motion.span
        className={lineBase}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className={lineBase}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
        transition={{ duration: 0.3, ease: easing }}
      />
    </div>
  );
}

export function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const drawerEase = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-6 right-6 z-100 mx-auto flex max-w-325 items-center justify-between gap-5",
          "rounded-full py-2.5 pl-5 pr-3",
          "shadow-[0_14px_36px_-20px_rgba(0,0,0,0.45)]",
          "max-[820px]:hidden"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "metal-silver pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500",
            dark ? "opacity-0" : "opacity-100"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "metal-gunmetal pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500",
            dark ? "opacity-100" : "opacity-0"
          )}
        />
        <Link
          href="#top"
          aria-label="Back to top"
          className="relative z-1 inline-flex items-center"
        >
          <NavLogo showLight={dark} />
        </Link>

        <div className="relative z-1 flex gap-7">
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
            "group relative z-1 inline-flex items-center gap-2 rounded-full px-4.5 py-2.5 text-[13px] font-medium transition-[background-color,color,transform,opacity] duration-300 hover:-translate-y-px hover:opacity-90",
            dark ? "bg-white text-ink" : "bg-ink text-white"
          )}
        >
          Get in touch
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </Link>
      </nav>

      <div className="fixed top-4 left-4 right-4 z-101 hidden items-center justify-between max-[820px]:flex">
        <Link href="#top" aria-label="Back to top" className="inline-flex items-center">
          <NavLogo showLight={open || !dark} />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300",
            open ? "bg-white text-ink" : "bg-ink text-white"
          )}
        >
          <BurgerLines open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: drawerEase }}
            className="fixed inset-0 z-100 flex flex-col bg-hero text-white max-[820px]:flex"
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-8">
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.06,
                      duration: 0.5,
                      ease: drawerEase,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-[clamp(36px,9vw,52px)] font-bold leading-tight tracking-[-0.03em] text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: drawerEase }}
                className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-hero-dim">
                  Reach out
                </span>
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-ink"
                >
                  Get in touch
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
