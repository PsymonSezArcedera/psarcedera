"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Line = {
  text: string;
  className?: string;
};

export function Typewriter({
  lines,
  charDelayMs = 95,
  pauseBetweenLinesMs = 700,
  startDelayMs = 300,
  cursorFadeDelayMs = 900,
  inline = false,
  startInView = false,
  loop = false,
  loopIdleMs = 4000,
  deleteDelayMs = 15,
  retypePauseMs = 600,
}: {
  lines: Line[];
  charDelayMs?: number;
  pauseBetweenLinesMs?: number;
  startDelayMs?: number;
  cursorFadeDelayMs?: number;
  inline?: boolean;
  startInView?: boolean;
  loop?: boolean;
  loopIdleMs?: number;
  deleteDelayMs?: number;
  retypePauseMs?: number;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.8 });
  const canStart = !startInView || inView;

  const [lineIdx, setLineIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!canStart) return;
    const t = setTimeout(() => setStarted(true), startDelayMs);
    return () => clearTimeout(t);
  }, [canStart, startDelayMs]);

  useEffect(() => {
    if (!started || allDone) return;
    const current = lines[lineIdx];
    if (!current) return;

    if (deleting) {
      if (shown > 0) {
        const t = setTimeout(() => setShown((s) => s - 1), deleteDelayMs);
        return () => clearTimeout(t);
      }
      if (lineIdx > 0) {
        const t = setTimeout(() => {
          setLineIdx((i) => i - 1);
          setShown(lines[lineIdx - 1].text.length);
        }, deleteDelayMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDeleting(false), retypePauseMs);
      return () => clearTimeout(t);
    }

    if (shown < current.text.length) {
      const t = setTimeout(() => setShown((s) => s + 1), charDelayMs);
      return () => clearTimeout(t);
    }

    if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setShown(0);
      }, pauseBetweenLinesMs);
      return () => clearTimeout(t);
    }

    if (loop) {
      const t = setTimeout(() => setDeleting(true), loopIdleMs);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setAllDone(true), cursorFadeDelayMs);
    return () => clearTimeout(t);
  }, [
    shown,
    lineIdx,
    lines,
    started,
    allDone,
    deleting,
    loop,
    charDelayMs,
    pauseBetweenLinesMs,
    cursorFadeDelayMs,
    loopIdleMs,
    deleteDelayMs,
    retypePauseMs,
  ]);

  const rendered = lines.map((line, i) => {
    const isCurrent = i === lineIdx;
    const isPast = i < lineIdx;
    const visible = isPast
      ? line.text
      : isCurrent
        ? line.text.slice(0, shown)
        : "";
    return (
      <span
        key={i}
        className={`${inline ? "" : "block "}${line.className ?? ""}`}
        aria-label={line.text}
      >
        <span aria-hidden>{visible}</span>
        {isCurrent && started && (
          <motion.span
            aria-hidden
            className="inline-block"
            animate={allDone ? { opacity: 0 } : { opacity: [1, 0, 1] }}
            transition={
              allDone
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 0.8, repeat: Infinity, ease: "linear" }
            }
          >
            |
          </motion.span>
        )}
      </span>
    );
  });

  if (inline) {
    return (
      <span ref={rootRef} className="relative block">
        <span aria-hidden className="invisible">
          {lines.map((line, i) => (
            <span key={i} className={line.className}>
              {line.text}
            </span>
          ))}
        </span>
        <span className="absolute inset-0">{rendered}</span>
      </span>
    );
  }

  return (
    <span ref={rootRef} className="block">
      {rendered}
    </span>
  );
}
