import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import { ProviderNode } from './ProviderNode';
import { NetworkConnections, FlowingSignalParticles } from './NetworkConnections';
import * as THREE from 'three';

// Service Satellite Nodes Configuration
const SATELLITE_NODES = [
  {
    id: 'electrical',
    name: 'Electrical',
    color: '#f59e0b', // Amber
    position: [2.2, 0.9, 0.4],
    skillsCount: '28 Pros'
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    color: '#06b6d4', // Cyan
    position: [-2.2, 0.8, 0.6],
    skillsCount: '22 Pros'
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    color: '#10b981', // Emerald
    position: [1.8, -1.2, 0.8],
    skillsCount: '34 Pros'
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    color: '#8b5cf6', // Purple
    position: [-1.9, -1.1, 0.5],
    skillsCount: '19 Pros'
  }
];

function CentralCoServeNode({ isHovered, onHover, onClick }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5;
      ring1Ref.current.rotation.x += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.4;
      ring2Ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group 
      position={[0, 0, 0]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={onClick}
    >
      {/* Central Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.65, 2]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.95, 0.025, 16, 64]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.6} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.15, 0.015, 16, 64]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.4} />
      </mesh>

      {/* Glow Halo */}
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Scene({ selectedCategory, onSelectCategory }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const groupRef = useRef();

  // Mouse Parallax
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * 0.3);
      const targetY = (state.pointer.y * 0.2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        
        {/* Ambient & Directional Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#10b981" />
        <pointLight position={[0, 0, 5]} intensity={1.2} color="#6ee7b7" />

        {/* Central CoServe Core Node */}
        <CentralCoServeNode
          isHovered={hoveredCenter}
          onHover={setHoveredCenter}
          onClick={() => onSelectCategory(null)}
        />

        {/* Satellite Service Nodes */}
        {SATELLITE_NODES.map((node) => (
          <ProviderNode
            key={node.id}
            {...node}
            isSelected={selectedCategory === node.id}
            isHovered={hoveredNode === node.id}
            onHover={(isH) => setHoveredNode(isH ? node.id : null)}
            onClick={() => onSelectCategory(selectedCategory === node.id ? null : node.id)}
          />
        ))}

        {/* Connections & Signals */}
        <NetworkConnections
          nodes={SATELLITE_NODES}
          centerPosition={[0, 0, 0]}
          selectedCategory={selectedCategory}
        />

        <FlowingSignalParticles
          nodes={SATELLITE_NODES}
          centerPosition={[0, 0, 0]}
        />

        {/* Background Ambient Dust */}
        <Sparkles
          count={40}
          scale={6}
          size={1.5}
          speed={0.4}
          opacity={0.3}
          color="#34d399"
        />

      </Float>
    </group>
  );
}

export function ServiceNetwork({ selectedCategory = 'electrical', onSelectCategory = () => {} }) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // 2D Fallback for environments without WebGL
    return (
      <div className="w-full h-full min-h-[380px] rounded-3xl bg-dark-900/60 border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-emerald-500 shadow-glow-emerald" />
        </div>
        <h4 className="text-white font-bold text-sm">CoServe Spatial Network</h4>
        <p className="text-slate-400 text-xs text-center max-w-xs mt-1">
          Decentralized local cooperative mesh connecting skilled craftsmen across your locality.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[460px] relative rounded-3xl overflow-hidden">
      {/* Background Atmosphere Radial Glow */}
      <div className="absolute inset-0 bg-radial-atmosphere pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Scene
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </Suspense>
      </Canvas>

      {/* Floating Spatial Hint Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-dark-900/80 backdrop-blur-xl border border-white/10 text-[11px] text-slate-300 flex items-center gap-2 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive 3D Service Mesh • Click any node to filter</span>
        </div>
      </div>
    </div>
  );
}
