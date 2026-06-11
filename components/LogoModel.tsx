"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/logo/logo.glb");
  return <primitive object={scene} />;
}

useGLTF.preload("/logo/logo.glb");

export function LogoModel() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
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
  );
}
