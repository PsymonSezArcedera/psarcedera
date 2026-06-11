"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { useInView } from "framer-motion";

function Model() {
  const { scene } = useGLTF("/logo/logo.glb");
  return <primitive object={scene} />;
}

useGLTF.preload("/logo/logo.glb");

export function LogoModel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.05 });

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ fov: 45 }}
        style={{ touchAction: "pan-y" }}
      >
      <Suspense fallback={null}>
        <Stage
          environment="city"
          intensity={0.6}
          shadows={false}
          adjustCamera={1.4}
        >
          <Model />
        </Stage>
      </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.6}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
