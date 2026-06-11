"use client";

import dynamic from "next/dynamic";
import { Typewriter } from "@/components/SplitText";

const LogoModel = dynamic(
  () => import("@/components/LogoModel").then((m) => m.LogoModel),
  { ssr: false }
);

function LogoFrame() {
  return (
    <div
      className="group/logo relative aspect-square cursor-grab overflow-hidden rounded-lg active:cursor-grabbing"
      style={{
        background: "radial-gradient(circle at 50% 38%, #2b2b33, #121216 70%)",
      }}
    >
      <LogoModel />
      <div className="pointer-events-none absolute inset-x-0 bottom-3.5 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-hero-dim opacity-75 transition-opacity duration-400 group-hover/logo:opacity-0">
        drag to rotate
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <header
      id="top"
      className="bg-hero pt-[clamp(110px,15vw,152px)] pb-[clamp(60px,10vw,96px)] text-white"
    >
      <div className="mx-auto max-w-460 px-14 max-[1024px]:px-10 max-[680px]:px-5">
        <div className="mt-[clamp(28px,4vw,46px)] grid grid-cols-[1.15fr_0.85fr] items-center gap-14 max-[920px]:grid-cols-1 max-[920px]:gap-10">
          <div>
            <h1 className="text-[clamp(54px,9.5vw,140px)] font-bold leading-[0.9] tracking-[-0.045em]">
              <Typewriter
                lines={[
                  { text: "Psymon Sez" },
                  { text: "Arcedera", className: "text-hero-dim" },
                ]}
              />
            </h1>
            <p className="mt-[clamp(20px,3.5vw,34px)] max-w-110 text-[clamp(15px,1.6vw,17px)] leading-[1.6] text-[#a9a9b0]">
              A full-stack developer building AI-powered products and
              enterprise systems. CS student at UP Los Baños and DOST-SEI
              Merit Scholar, with production experience across startup and
              government teams.
            </p>
          </div>
          <div className="mx-auto w-full max-[920px]:max-w-105">
            <LogoFrame />
          </div>
        </div>
      </div>
    </header>
  );
}
