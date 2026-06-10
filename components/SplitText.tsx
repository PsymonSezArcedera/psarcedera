"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
}: {
  lines: Line[];
  charDelayMs?: number;
  pauseBetweenLinesMs?: number;
  startDelayMs?: number;
  cursorFadeDelayMs?: number;
}) {
  const [lineIdx, setLineIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelayMs);
    return () => clearTimeout(t);
  }, [startDelayMs]);

  useEffect(() => {
    if (!started || allDone) return;
    const current = lines[lineIdx];
    if (!current) return;

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

    const t = setTimeout(() => setAllDone(true), cursorFadeDelayMs);
    return () => clearTimeout(t);
  }, [
    shown,
    lineIdx,
    lines,
    started,
    allDone,
    charDelayMs,
    pauseBetweenLinesMs,
    cursorFadeDelayMs,
  ]);

  return (
    <>
      {lines.map((line, i) => {
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
            className={`block ${line.className ?? ""}`}
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
      })}
    </>
  );
}
