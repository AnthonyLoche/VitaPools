"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function MouseRipples() {
  const mesh = useRef();

  const { pointer } = useThree();

  useFrame(() => {
    if (!mesh.current) return;

    mesh.current.position.x = pointer.x * 2;
    mesh.current.position.y = pointer.y;

    mesh.current.rotation.z = pointer.x * 0.15;
  });

  return (
    <mesh ref={mesh}>
      <circleGeometry args={[0.4, 64]} />

      <meshBasicMaterial
        color="#8ad9ff"
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}