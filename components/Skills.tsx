"use client";

import type { ComponentType, SVGProps } from "react";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiLaravel,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiVercel,
  SiRailway,
  SiOpenai,
} from "react-icons/si";
import {
  FaJava,
  FaServer,
  FaBrain,
  FaPersonWalking,
  FaArrowsRotate,
  FaCheckDouble,
  FaListCheck,
} from "react-icons/fa6";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TileMark } from "@/components/TileMark";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

type Group = {
  name: string;
  items: { name: string; Icon: IconCmp }[];
};

const GROUPS: Group[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", Icon: SiPython },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Java", Icon: FaJava },
    ],
  },
  {
    name: "Frameworks",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Express.js", Icon: SiExpress },
      { name: "Laravel", Icon: SiLaravel },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "MySQL", Icon: SiMysql },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "REST APIs", Icon: FaServer },
      { name: "Docker", Icon: SiDocker },
      { name: "Git", Icon: SiGit },
      { name: "Vercel", Icon: SiVercel },
      { name: "Railway", Icon: SiRailway },
    ],
  },
  {
    name: "AI",
    items: [
      { name: "LLM Integration", Icon: SiOpenai },
      { name: "Prompt Engineering", Icon: FaBrain },
      { name: "Pose Detection", Icon: FaPersonWalking },
    ],
  },
  {
    name: "Methods",
    items: [
      { name: "Agile", Icon: FaArrowsRotate },
      { name: "Test Automation", Icon: FaCheckDouble },
      { name: "SDLC", Icon: FaListCheck },
    ],
  },
];

function GroupTile({ group }: { group: Group }) {
  return (
    <article className="tile group/tile relative flex h-full flex-col p-7 max-[680px]:p-6">
      <header>
        <h3 className="text-[clamp(22px,2.4vw,28px)] font-semibold leading-tight tracking-[-0.025em]">
          {group.name}
        </h3>
      </header>

      <ul className="mt-8 grid grid-cols-3 gap-x-3 gap-y-5">
        {group.items.map(({ name, Icon }) => (
          <li
            key={name}
            className="group/chip flex flex-col items-center gap-2 rounded-xl border border-transparent p-3 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-2 hover:bg-bg/60"
          >
            <Icon
              className="h-7 w-7 text-ink transition-colors duration-300"
              aria-hidden
            />
            <span className="text-center text-[12px] font-medium leading-tight tracking-[-0.01em] text-ink-2 transition-colors duration-300 group-hover/chip:text-ink">
              {name}
            </span>
          </li>
        ))}
      </ul>

      <TileMark className="mt-6 h-3.5 w-3.5 self-end text-ink-2 transition-[color,transform] duration-500 group-hover/tile:rotate-45 group-hover/tile:text-ink" />
    </article>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="sec-pad border-t border-line bg-band-alt"
    >
      <div className="wrap">
        <SectionHeader
          title="Skills"
          note="Six groups of tools. Hover an icon to name it."
        />

        <div className="mt-11 grid grid-cols-3 gap-5 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
          {GROUPS.map((g) => (
            <Reveal key={g.name}>
              <GroupTile group={g} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
