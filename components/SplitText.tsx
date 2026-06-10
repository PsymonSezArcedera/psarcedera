"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SplitText({
  text,
  className,
  delay = 0,
  charDelayMs = 90,
  showCursor = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelayMs?: number;
  showCursor?: boolean;
}) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown(0);
    setDone(false);
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length && interval) {
          clearInterval(interval);
          setDone(true);
        }
      }, charDelayMs);
    }, delay * 1000);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, charDelayMs]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, shown)}</span>
      {showCursor && (
        <motion.span
          aria-hidden
          className="inline-block"
          animate={done ? { opacity: 0 } : { opacity: [1, 0, 1] }}
          transition={
            done
              ? { duration: 0.5, ease: "easeOut", delay: 0.4 }
              : { duration: 0.8, repeat: Infinity, ease: "linear" }
          }
        >
          |
        </motion.span>
      )}
    </span>
  );
}
