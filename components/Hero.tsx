"use client";

import { useEffect, useRef } from "react";
import { Typewriter } from "@/components/SplitText";

function Logo3D() {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    let rx = -12;
    let ry = -22;
    let tx = -12;
    let ty = -22;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;

    const render = () => {
      inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    };
    const loop = () => {
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      render();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      if (dragging) return;
      const r = frame.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ty = -22 + px * 46;
      tx = -12 - py * 40;
    };
    const onLeave = () => {
      if (dragging) return;
      tx = -12;
      ty = -22;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      frame.classList.add("touched");
      frame.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      ty += (e.clientX - lastX) * 0.5;
      tx -= (e.clientY - lastY) * 0.5;
      tx = Math.max(-80, Math.min(80, tx));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    const onEnter = () => {
      frame.classList.add("touched");
    };

    frame.addEventListener("mousemove", onMove);
    frame.addEventListener("mouseleave", onLeave);
    frame.addEventListener("mouseenter", onEnter);
    frame.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onUp);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener("mousemove", onMove);
      frame.removeEventListener("mouseleave", onLeave);
      frame.removeEventListener("mouseenter", onEnter);
      frame.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="group/logo relative aspect-square cursor-grab overflow-hidden rounded-lg active:cursor-grabbing"
      style={{
        background: "radial-gradient(circle at 50% 38%, #2b2b33, #121216 70%)",
        perspective: "900px",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          animation: "logo-float 7s ease-in-out infinite",
        }}
      >
        <div
          ref={innerRef}
          className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out max-[520px]:h-[150px] max-[520px]:w-[150px]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-12deg) rotateY(-22deg)",
          }}
        >
          <span
            className="absolute inset-0 flex items-center justify-center text-[230px] font-bold leading-none tracking-[-0.04em] text-[#3a3a44] max-[520px]:text-[172px]"
            style={{
              transform: "translateZ(-28px)",
              textShadow:
                "1px 1px 0 #36363f,2px 2px 0 #333,3px 3px 0 #2f2f37,4px 4px 0 #2c2c34,5px 5px 0 #292930,6px 6px 0 #26262d,7px 7px 0 #232329,-1px 0 #34343d,-2px 0 #313139,-10px 12px 20px rgba(0,0,0,0.55)",
            }}
          >
            P
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center text-[230px] font-bold leading-none tracking-[-0.04em] text-white max-[520px]:text-[172px]"
            style={{
              transform: "translateZ(28px)",
              textShadow: "0 0 30px rgba(255,255,255,0.18)",
            }}
          >
            P
          </span>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-3.5 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-hero-dim opacity-75 transition-opacity duration-400 group-[.touched]/logo:opacity-0"
      >
        drag to rotate
      </div>
      <div
        className="pointer-events-none absolute left-1/2 bottom-[13%] h-8 w-[46%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)",
          filter: "blur(7px)",
        }}
      />
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
            <p className="mt-[clamp(20px,3.5vw,34px)] max-w-[440px] text-[clamp(15px,1.6vw,17px)] leading-[1.6] text-[#a9a9b0]">
              A full-stack developer building AI-powered products and
              enterprise systems. CS student at UP Los Baños and DOST-SEI
              Merit Scholar, with production experience across startup and
              government teams.
            </p>
          </div>
          <div className="mx-auto w-full max-[920px]:max-w-[420px]">
            <Logo3D />
          </div>
        </div>
      </div>
    </header>
  );
}
