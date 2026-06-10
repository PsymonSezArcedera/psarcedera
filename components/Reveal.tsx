"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "h3" | "section";
}) {
  const MotionTag = motion[As];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
