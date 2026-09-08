import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 8 Service categories with 3D spatial coordinates (large spacing + varied Z depth)
const SERVICE_NODES = [
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '✨',
    color: '#10b981',
    emissive: '#059669',
    count: 34,
    rating: '4.9',
    distance: '0.5 km',
    pos: [0, 2.35, -0.5],
    controlOffset: [0, 1.2, 0.2],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🔧',
    color: '#06b6d4',
    emissive: '#0891b2',
    count: 22,
    rating: '4.8',
    distance: '0.8 km',
    pos: [2.05, 1.65, 0.4],
    controlOffset: [1.1, 0.9, 0.2],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    color: '#f59e0b',
    emissive: '#d97706',
    count: 28,
    rating: '4.9',
    distance: '1.2 km',
    pos: [2.75, 0.15, -0.2],
    controlOffset: [1.4, 0.1, 0.3],
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    icon: '📚',
    color: '#ec4899',
    emissive: '#db2777',
    count: 12,
    rating: '4.8',
    distance: '0.6 km',
    pos: [1.95, -1.55, 0.5],
    controlOffset: [1.0, -0.8, 0.2],
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: '🎨',
    color: '#34d399',
    emissive: '#10b981',
    count: 17,
    rating: '4.7',
    distance: '1.8 km',
    pos: [0, -2.25, -0.4],
    controlOffset: [0, -1.1, 0.2],
  },
  {
    id: 'ac_hvac',
    name: 'AC Service',
    icon: '❄️',
    color: '#22d3ee',
    emissive: '#06b6d4',
    count: 21,
    rating: '4.9',
    distance: '0.9 km',
    pos: [-1.95, -1.55, 0.4],
    controlOffset: [-1.0, -0.8, 0.2],
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: '🪑',
    color: '#f97316',
    emissive: '#ea580c',
    count: 15,
    rating: '4.8',
    distance: '1.5 km',
    pos: [-2.75, 0.15, -0.3],
    controlOffset: [-1.4, 0.1, 0.3],
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: '📱',
    color: '#8b5cf6',
    emissive: '#7c3aed',
    count: 19,
    rating: '4.7',
    distance: '2.1 km',
    pos: [-2.05, 1.65, 0.5],
    controlOffset: [-1.1, 0.9, 0.2],
  },
];

// --- Central CoServe Dominant Core ---
function CentralCoServeCore({ isHovered, onHover, onClick }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.y += delta * 0.25;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group 
      position={[0, 0, 0]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={onClick}
    >
      {/* Central Core Glowing Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#10d6a3"
          emissive="#059669"
          emissiveIntensity={isHovered ? 2.5 : 1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.82, 0.018, 16, 64]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.65} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.02, 0.012, 16, 64]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.4} />
      </mesh>

      {/* Soft Glow Halo Sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshBasicMaterial color="#10d6a3" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      {/* Compact Central Node Glass Pill Label */}
      <Html center position={[0, -0.78, 0]} distanceFactor={9} style={{ pointerEvents: 'none' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '999px',
          background: 'rgba(3, 5, 8, 0.85)',
          border: '1px solid rgba(16, 214, 163, 0.4)',
          boxShadow: '0 0 20px -5px rgba(16, 214, 163, 0.4)',
          backdropFilter: 'blur(12px)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10d6a3', boxShadow: '0 0 8px #10d6a3' }} />
          <span style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '0.08em', color: '#ffffff', textTransform: 'uppercase' }}>
            CoServe
          </span>
          <span style={{ fontSize: '9px', fontWeight: '700', color: '#34d399', opacity: 0.85 }}>
            NETWORK
          </span>
        </div>
      </Html>
    </group>
  );
}

// --- Curved Connection Line from Center to Service Node ---
function CurvedConnectionLine({ node, isHovered, isSelected, anyHovered }) {
  const curve = useMemo(() => {
    const start = new THREE.Vector3(0, 0, 0);
    const end = new THREE.Vector3(...node.pos);
    const mid = new THREE.Vector3(...node.controlOffset);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [node]);

  const points = useMemo(() => curve.getPoints(30), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  const isActive = isHovered || isSelected;
  const opacity = isActive ? 0.85 : anyHovered ? 0.08 : 0.22;

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={isActive ? node.color : '#34d399'}
        transparent
        opacity={opacity}
        linewidth={isActive ? 2 : 1}
      />
    </line>
  );
}

// --- Flowing Signal Particle on Curved Connection ---
function FlowingSignalParticle({ node, speedOffset = 0 }) {
  const meshRef = useRef();

  const curve = useMemo(() => {
    const start = new THREE.Vector3(0, 0, 0);
    const end = new THREE.Vector3(...node.pos);
    const mid = new THREE.Vector3(...node.controlOffset);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [node]);

  useFrame((state) => {
    if (meshRef.current) {
      const t = (state.clock.elapsedTime * 0.35 + speedOffset) % 1;
      const point = curve.getPoint(t);
      meshRef.current.position.copy(point);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.028, 8, 8]} />
      <meshBasicMaterial color={node.color} transparent opacity={0.9} />
    </mesh>
  );
}

// --- Orbiting Provider Dots around Service Node ---
function OrbitingProviderDots({ parentPos, color, isHighlighted }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
      groupRef.current.rotation.z += delta * 0.4;
    }
  });

  const dots = [
    { radius: 0.45, angle: 0, y: 0.1 },
    { radius: 0.48, angle: (Math.PI * 2) / 3, y: -0.1 },
    { radius: 0.42, angle: (Math.PI * 4) / 3, y: 0.05 },
  ];

  return (
    <group ref={groupRef} position={parentPos}>
      {dots.map((d, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(d.angle) * d.radius,
            d.y,
            Math.sin(d.angle) * d.radius,
          ]}
        >
          <sphereGeometry args={[isHighlighted ? 0.038 : 0.024, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isHighlighted ? 1.0 : 0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- Service Satellite Node with Spatial Glass Capsule & Hover Details ---
function ServiceSatelliteNode({
  node,
  isSelected,
  isHovered,
  anyHovered,
  onHover,
  onClick,
}) {
  const groupRef = useRef();
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly move slightly toward camera on hover
      const targetZ = isHovered || isSelected ? node.pos[2] + 0.35 : node.pos[2];
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);

      const targetScale = isHovered || isSelected ? 1.18 : anyHovered ? 0.92 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.7;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.9;
    }
  });

  const isActive = isHovered || isSelected;

  return (
    <group ref={groupRef} position={node.pos}>
      {/* 3D Octahedron / Sphere Core */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="cursor-pointer"
      >
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={isActive ? 2.6 : anyHovered ? 0.5 : 1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.36, 0.012, 8, 36]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isActive ? 0.85 : 0.25}
        />
      </mesh>

      {/* Compact Semi-Transparent Glass Capsule Label */}
      <Html
        center
        position={[0, -0.44, 0]}
        distanceFactor={8.5}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 9px',
            borderRadius: '999px',
            background: isActive
              ? 'rgba(7, 12, 20, 0.95)'
              : 'rgba(7, 10, 16, 0.75)',
            border: `1px solid ${isActive ? node.color : 'rgba(255, 255, 255, 0.12)'}`,
            boxShadow: isActive ? `0 0 20px -3px ${node.color}80` : '0 4px 15px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            opacity: anyHovered && !isActive ? 0.45 : 1,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: '11px', lineHeight: 1 }}>{node.icon}</span>
          <span style={{
            fontSize: '9.5px',
            fontWeight: '800',
            letterSpacing: '0.06em',
            color: isActive ? '#ffffff' : '#cbd5e1',
            textTransform: 'uppercase',
          }}>
            {node.name}
          </span>
          <span style={{
            fontSize: '8.5px',
            fontWeight: '700',
            color: node.color,
            background: `${node.color}18`,
            padding: '1px 5px',
            borderRadius: '6px',
          }}>
            {node.count}p
          </span>
        </div>
      </Html>

      {/* Expanded Hover Detail Tooltip Card */}
      {isHovered && (
        <Html
          center
          position={[0, 0.7, 0.2]}
          distanceFactor={7.5}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            style={{
              width: '150px',
              padding: '8px 10px',
              borderRadius: '12px',
              background: 'rgba(5, 8, 14, 0.95)',
              border: `1px solid ${node.color}90`,
              boxShadow: `0 12px 30px -5px rgba(0,0,0,0.8), 0 0 25px -5px ${node.color}60`,
              backdropFilter: 'blur(16px)',
              cursor: 'pointer',
              animation: 'fade-up 0.25s ease-out forwards',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#ffffff' }}>{node.name}</span>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#fbbf24' }}>★ {node.rating}</span>
            </div>
            <div style={{ fontSize: '8.5px', color: '#94a3b8', marginBottom: '6px', lineHeight: 1.3 }}>
              {node.count} verified pros · {node.distance} away
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '8px',
              fontWeight: '800',
              color: node.color,
              background: `${node.color}15`,
              padding: '3px 6px',
              borderRadius: '6px',
              border: `1px solid ${node.color}30`,
            }}>
              <span>Available now</span>
              <span>Explore →</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// --- Main 3D Spatial Scene ---
function SpatialNetworkScene({ selectedCategory, onSelectCategory }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const groupRef = useRef();

  // Subtle cursor parallax
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.2;
      const targetY = state.pointer.y * 0.15;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);
    }
  });

  const anyHovered = hoveredNode !== null;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#10d6a3" />
      <pointLight position={[0, 0, 7]} intensity={1.1} color="#6ee7b7" />
      <pointLight position={[6, -6, 4]} intensity={0.6} color="#8b5cf6" />

      <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* Central Dominant CoServe Core */}
        <CentralCoServeCore
          isHovered={hoveredCenter}
          onHover={setHoveredCenter}
          onClick={() => onSelectCategory(null)}
        />

        {/* Curved Connection Lines */}
        {SERVICE_NODES.map((node) => (
          <CurvedConnectionLine
            key={`line-${node.id}`}
            node={node}
            isHovered={hoveredNode === node.id}
            isSelected={selectedCategory === node.id}
            anyHovered={anyHovered}
          />
        ))}

        {/* Flowing Signal Particles (Local Opportunities) */}
        {SERVICE_NODES.map((node, i) => (
          <React.Fragment key={`particles-${node.id}`}>
            <FlowingSignalParticle node={node} speedOffset={0} />
            <FlowingSignalParticle node={node} speedOffset={0.5} />
          </React.Fragment>
        ))}

        {/* Orbiting Provider Dots around each service node */}
        {SERVICE_NODES.map((node) => (
          <OrbitingProviderDots
            key={`dots-${node.id}`}
            parentPos={node.pos}
            color={node.color}
            isHighlighted={hoveredNode === node.id || selectedCategory === node.id}
          />
        ))}

        {/* 8 Spacious Service Satellite Nodes */}
        {SERVICE_NODES.map((node) => (
          <ServiceSatelliteNode
            key={node.id}
            node={node}
            isSelected={selectedCategory === node.id}
            isHovered={hoveredNode === node.id}
            anyHovered={anyHovered}
            onHover={(isH) => setHoveredNode(isH ? node.id : null)}
            onClick={() => onSelectCategory(selectedCategory === node.id ? null : node.id)}
          />
        ))}

        {/* Subtle Ambient Digital Dust */}
        <Sparkles
          count={35}
          scale={7}
          size={1.0}
          speed={0.25}
          opacity={0.2}
          color="#34d399"
        />
      </Float>
    </group>
  );
}

// --- Top-Tier Exported Component ---
export function ServiceNetwork({ selectedCategory = null, onSelectCategory = () => {} }) {
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
    return (
      <div className="w-full min-h-[460px] rounded-3xl bg-dark-900/80 border border-white/10 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse" />
        </div>
        <h4 className="text-white font-black text-base">CoServe Spatial Network</h4>
        <p className="text-slate-400 text-xs text-center max-w-xs mt-2">
          8-category cooperative mesh connecting local craftsmen across your neighborhood.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] sm:h-[530px] rounded-3xl overflow-hidden bg-dark-950/80 border border-white/[0.08] shadow-2xl">
      {/* Background Soft Atmospheric Lighting */}
      <div className="absolute inset-0 bg-radial-atmosphere pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

      {/* 1. TOP-LEFT: Available Now Card */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="px-3.5 py-2 rounded-2xl bg-dark-900/85 backdrop-blur-xl border border-white/10 shadow-lg flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold leading-none">Available Now</div>
            <div className="text-xs font-black text-white leading-tight mt-0.5">168 Providers</div>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: Network Summary Pill */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="px-3.5 py-2 rounded-2xl bg-dark-900/85 backdrop-blur-xl border border-white/10 shadow-lg">
          <span className="text-[10px] font-mono font-bold text-emerald-400">8 services · 168 verified</span>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT: Response Time Card */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
        <div className="px-3.5 py-2 rounded-2xl bg-dark-900/85 backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="text-[10px] text-slate-400 font-semibold leading-none">Response Time</div>
          <div className="text-xs font-black text-cyan-400 leading-tight mt-0.5">≤ 15 min</div>
        </div>
      </div>

      {/* 4. BOTTOM-RIGHT: Rating Card */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:block">
        <div className="px-3.5 py-2 rounded-2xl bg-dark-900/85 backdrop-blur-xl border border-white/10 shadow-lg flex items-center gap-1.5">
          <span className="text-amber-400 text-xs">★</span>
          <div>
            <div className="text-xs font-black text-white leading-none">4.9</div>
            <div className="text-[9px] text-slate-400 leading-tight mt-0.5">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM-CENTER: Interactive Hint Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-4 py-1.5 rounded-full bg-dark-900/90 backdrop-blur-xl border border-white/10 text-[10.5px] text-slate-300 flex items-center gap-2 shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Service Mesh · Hover to explore · Click to filter</span>
        </div>
      </div>

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <SpatialNetworkScene
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
