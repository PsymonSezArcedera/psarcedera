"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TileMark } from "@/components/TileMark";

type Award = {
  title: string;
  org: string;
  year: string;
  desc: string;
};

const AWARDS: Award[] = [
  {
    title: "Honor Society of the Philippines — Nominee",
    org: "University of the Philippines Los Baños",
    year: "2026",
    desc: "Nominated for outstanding academic performance, ranking within the top 10% of the batch.",
  },
  {
    title: "DOST-SEI Merit Scholar",
    org: "Department of Science and Technology — SEI",
    year: "2022",
    desc: "Merit-based undergraduate scholarship for excellence in science and engineering.",
  },
];

function ScrambleYear({ value, hovered }: { value: string; hovered: boolean }) {
  const [display, setDisplay] = useState(value);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!hovered) {
      setDisplay(value);
      return;
    }
    const digits = "0123456789";
    let frame = 0;
    const total = 18;
    intervalRef.current = setInterval(() => {
      frame += 1;
      if (frame >= total) {
        setDisplay(value);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      const scrambled = value
        .split("")
        .map((c, i) => {
          if (!/\d/.test(c)) return c;
          const settled = frame > total - (value.length - i) * 3;
          return settled ? c : digits[Math.floor(Math.random() * digits.length)];
        })
        .join("");
      setDisplay(scrambled);
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered, value]);

  return <span className="tabular-nums leading-none">{display}</span>;
}

function AwardTile({ award }: { award: Award }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="tile group relative flex h-full flex-col overflow-hidden p-7 max-[680px]:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-3 select-none text-[clamp(110px,15vw,170px)] font-bold leading-none tracking-[-0.05em] text-line-2 transition-colors duration-500 group-hover:text-line"
      >
        <ScrambleYear value={award.year} hovered={hovered} />
      </div>

      <div className="relative z-1 mt-28 max-w-[78%] max-[680px]:mt-24">
        <span className="tile-meta">{award.org}</span>
        <h3 className="mt-3 text-[clamp(20px,2.3vw,26px)] font-semibold leading-tight tracking-[-0.02em]">
          {award.title}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">
          {award.desc}
        </p>
      </div>

      <TileMark className="mt-8 h-3.5 w-3.5 self-end text-ink-2 transition-[color,transform] duration-500 group-hover:rotate-45 group-hover:text-ink" />
    </article>
  );
}

export function Awards() {
  return (
    <section id="awards" className="sec-pad">
      <div className="wrap">
        <SectionHeader
          title="Recognition along the way"
          note="Academic distinctions earned alongside the engineering work — hover a year to see it scramble in."
        />
        <div className="mt-11 grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
          {AWARDS.map((a) => (
            <Reveal key={a.title}>
              <AwardTile award={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
