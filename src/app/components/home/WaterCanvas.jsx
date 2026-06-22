"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import WaterScene from "./WaterScene";

export default function WaterCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0
      }}
    >
      <Suspense fallback={null}>
        <WaterScene />
      </Suspense>
    </Canvas>
  );
}