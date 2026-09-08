import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function ProviderNode({ 
  position, 
  color, 
  name, 
  category, 
  skillsCount, 
  isSelected, 
  isHovered, 
  onHover, 
  onClick, 
  icon 
}) {
  const meshRef = useRef();
  const ringRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.3;
      ringRef.current.rotation.y += delta * 0.4;
      const scale = isSelected || isHovered ? 1.4 : 1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  const nodeColor = new THREE.Color(color);

  return (
    <group 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Central Core Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isSelected || isHovered ? 1.6 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Glowing Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.5, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isSelected || isHovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* Outer Pulse Glow Halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isSelected ? 0.25 : isHovered ? 0.2 : 0.08}
          wireframe={false}
        />
      </mesh>

      {/* HTML Spatial Tag (Apple / Linear minimal pill) */}
      <Html
        position={[0, -0.65, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div 
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xl border transition-all duration-300 ${
            isSelected || isHovered
              ? 'bg-dark-900/90 border-emerald-500/50 shadow-glow-emerald text-white scale-110'
              : 'bg-dark-900/60 border-white/10 text-slate-300'
          }`}
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">{name}</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-white/10 text-slate-400 font-mono">
            {skillsCount}
          </span>
        </div>
      </Html>
    </group>
  );
}
