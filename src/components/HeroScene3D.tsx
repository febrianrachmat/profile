"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

function Sculpture({
  accent,
  mouse,
}: {
  accent: string;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.current.y * 0.28,
      0.045,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      mouse.current.x * 0.12,
      0.045,
    );
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.28, 0]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.38}
          metalness={0.22}
          envMapIntensity={0.6}
        />
      </mesh>
      <mesh ref={wire} scale={1.18}>
        <icosahedronGeometry args={[1.28, 0]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene3D() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  const accent = theme === "dark" ? "#e87a62" : "#c4523a";

  const dpr = useMemo<[number, number]>(() => [1, 1.5], []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduced) {
    return (
      <div
        className="pointer-events-none absolute -inset-10 z-0 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute -inset-16 z-0 sm:-inset-20"
      aria-hidden
    >
      <Canvas
        className="h-full w-full"
        frameloop={visible ? "always" : "never"}
        dpr={dpr}
        camera={{ position: [0, 0, 4.4], fov: 32 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={theme === "dark" ? 0.45 : 0.7} />
        <directionalLight position={[3.2, 2.8, 4]} intensity={1.15} />
        <pointLight
          position={[-2.4, -1.6, 1.8]}
          intensity={0.55}
          color={accent}
        />
        <Sculpture accent={accent} mouse={mouse} />
      </Canvas>
    </div>
  );
}
