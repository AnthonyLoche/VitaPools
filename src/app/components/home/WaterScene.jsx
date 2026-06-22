"use client";

import FloatingParticles from "./FloatingParticles";
import WaterPlane from "./WaterPlane";

export default function WaterScene() {

  return (
    <>
      <ambientLight intensity={1} />

      <FloatingParticles />

      <WaterPlane />
    </>
  );
}