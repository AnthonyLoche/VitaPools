"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Função pseudo-aleatória determinística
function seededRandom(seed) {
  const x = Math.sin(seed) * 43758.5453123;
  return x - Math.floor(x);
}

export default function FloatingParticles() {
  const points = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(400 * 3);

    for (let i = 0; i < 400; i++) {
      const seed1 = i * 127.1 + 311.7;
      const seed2 = i * 269.5 + 183.3;
      const seed3 = i * 419.2 + 237.6;

      pos[i * 3] = (seededRandom(seed1) - 0.5) * 20;
      pos[i * 3 + 1] = (seededRandom(seed2) - 0.5) * 10;
      pos[i * 3 + 2] = (seededRandom(seed3) - 0.5) * 10;
    }

    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;

    points.current.rotation.y = clock.elapsedTime * 0.03;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#bfe8ff"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}