"use client";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { WaterMaterial } from "./WaterMaterial";

extend({ WaterMaterial });

export default function WaterPlane() {
  const materialRef = useRef();

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x =
        (e.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMove);

    return () =>
      window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    materialRef.current.uTime = clock.elapsedTime;

    materialRef.current.uMouse.set(
      mouse.current.x,
      mouse.current.y
    );
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[20, 12, 512, 512]} />

      <waterMaterial
        ref={materialRef}
        transparent
      />
    </mesh>
  );
}
