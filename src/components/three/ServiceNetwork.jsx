import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// All 8 service categories with positions arranged in a beautiful ellipse
const SERVICE_NODES = [
  { id: 'electrical', name: 'Electrical', color: '#f59e0b', emissive: '#d97706', count: 28, rating: '4.9', distance: '1.2km', angle: 0 },
  { id: 'plumbing', name: 'Plumbing', color: '#06b6d4', emissive: '#0891b2', count: 22, rating: '4.8', distance: '0.8km', angle: Math.PI * 0.25 },
  { id: 'cleaning', name: 'Cleaning', color: '#10b981', emissive: '#059669', count: 34, rating: '4.9', distance: '0.5km', angle: Math.PI * 0.5 },
  { id: 'appliances', name: 'Appliances', color: '#8b5cf6', emissive: '#7c3aed', count: 19, rating: '4.7', distance: '2.1km', angle: Math.PI * 0.75 },
  { id: 'carpentry', name: 'Carpentry', color: '#f97316', emissive: '#ea580c', count: 15, rating: '4.8', distance: '1.5km', angle: Math.PI },
  { id: 'ac_hvac', name: 'AC Service', color: '#22d3ee', emissive: '#06b6d4', count: 21, rating: '4.9', distance: '0.9km', angle: Math.PI * 1.25 },
  { id: 'painting', name: 'Painting', color: '#34d399', emissive: '#10b981', count: 17, rating: '4.7', distance: '1.8km', angle: Math.PI * 1.5 },
  { id: 'tutoring', name: 'Tutoring', color: '#ec4899', emissive: '#db2777', count: 12, rating: '4.8', distance: '0.6km', angle: Math.PI * 1.75 },
];

// --- Central CoServe Icosahedron Node ---
function CentralNode({ isHovered, onHover }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5;
      ring1Ref.current.rotation.x += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.4;
      ring2Ref.current.rotation.y += delta * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.3;
      ring3Ref.current.rotation.z += delta * 0.2;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15 + 0.85;
      glowRef.current.material.opacity = pulse * (isHovered ? 0.25 : 0.18);
    }
  });

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
    >
      {/* Core icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={isHovered ? 2.5 : 1.8}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.9, 0.022, 16, 80]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.1, 0.014, 16, 80]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.3, 0.008, 16, 80]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={0.2} />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.88, 32, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.18} side={THREE.BackSide} />
      </mesh>

      {/* HTML label */}
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(3,5,6,0.85)',
          border: '1px solid rgba(16,185,129,0.4)',
          borderRadius: '10px',
          padding: '5px 10px',
          fontSize: '10px',
          fontWeight: '800',
          color: '#34d399',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(10px)',
          marginTop: '90px',
          boxShadow: '0 0 20px -5px rgba(16,185,129,0.4)',
        }}>
          CoServe Network
        </div>
      </Html>
    </group>
  );
}

// --- Service Satellite Node ---
function ServiceSatelliteNode({ node, radius, isSelected, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();

  // Compute 3D position on an ellipse
  const x = Math.cos(node.angle) * radius * 1.1;
  const y = Math.sin(node.angle) * radius * 0.6;
  const z = Math.sin(node.angle * 0.7) * 0.5;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      const s = isHovered || isSelected
        ? THREE.MathUtils.lerp(meshRef.current.scale.x, 1.3, 0.08)
        : THREE.MathUtils.lerp(meshRef.current.scale.x, 1.0, 0.08);
      meshRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + node.angle) * 0.15 + 0.85;
      glowRef.current.material.opacity = pulse * (isHovered || isSelected ? 0.3 : 0.12);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isHovered ? 1.5 : 0.5);
    }
  });

  return (
    <group position={[x, y, z]} onClick={onClick}>
      {/* Node sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      >
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={isHovered || isSelected ? 2.0 : 1.0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.38, 0.012, 8, 48]} />
        <meshBasicMaterial color={node.color} transparent opacity={isHovered ? 0.8 : 0.35} />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>

      {/* Info label */}
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          marginTop: isHovered ? '50px' : '44px',
          transition: 'all 0.3s',
        }}>
          <div style={{
            background: isHovered ? `rgba(3,5,6,0.95)` : 'rgba(3,5,6,0.75)',
            border: `1px solid ${isHovered ? node.color + '80' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '8px',
            padding: '3px 8px',
            fontSize: '9px',
            fontWeight: '800',
            color: isHovered ? node.color : '#94a3b8',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            boxShadow: isHovered ? `0 0 15px -5px ${node.color}60` : 'none',
            transition: 'all 0.3s',
          }}>
            {node.name}
          </div>
          {isHovered && (
            <div style={{
              background: 'rgba(3,5,6,0.9)',
              border: `1px solid ${node.color}40`,
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '8px',
              color: '#94a3b8',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
            }}>
              {node.count} pros • {node.rating}★ • {node.distance}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// --- Network Connection Lines ---
function NetworkLines({ hoveredNode, selectedNode }) {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        if (child.material) {
          const node = SERVICE_NODES[i];
          const isActive = hoveredNode === node.id || selectedNode === node.id;
          child.material.opacity = THREE.MathUtils.lerp(
            child.material.opacity,
            isActive ? 0.7 : 0.12,
            0.08
          );
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {SERVICE_NODES.map((node) => {
        const x = Math.cos(node.angle) * 2.35 * 1.1;
        const y = Math.sin(node.angle) * 2.35 * 0.6;
        const z = Math.sin(node.angle * 0.7) * 0.5;
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={node.id} geometry={geometry}>
            <lineBasicMaterial color={node.color} transparent opacity={0.12} linewidth={1} />
          </line>
        );
      })}
    </group>
  );
}

// --- Flowing Signal Particles ---
function SignalParticles() {
  const particlesRef = useRef([]);
  const groupRef = useRef();
  const instancesRef = useRef();

  const particleCount = SERVICE_NODES.length * 3;
  const dummy = useRef(new THREE.Object3D());

  const particles = useRef(
    SERVICE_NODES.flatMap((node, ni) =>
      [0, 0.33, 0.66].map((offset) => ({
        nodeIndex: ni,
        progress: offset,
        speed: 0.25 + Math.random() * 0.2,
      }))
    )
  );

  useFrame((state, delta) => {
    if (!instancesRef.current) return;
    particles.current.forEach((p, i) => {
      p.progress = (p.progress + delta * p.speed) % 1;
      const node = SERVICE_NODES[p.nodeIndex];
      const tx = Math.cos(node.angle) * 2.35 * 1.1;
      const ty = Math.sin(node.angle) * 2.35 * 0.6;
      const tz = Math.sin(node.angle * 0.7) * 0.5;
      const x = tx * p.progress;
      const y = ty * p.progress;
      const z = tz * p.progress;
      dummy.current.position.set(x, y, z);
      dummy.current.updateMatrix();
      instancesRef.current.setMatrixAt(i, dummy.current.matrix);
    });
    instancesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancesRef} args={[null, null, particleCount]}>
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.9} />
    </instancedMesh>
  );
}

// --- Full Scene ---
function Scene({ selectedCategory, onSelectCategory }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const groupRef = useRef();
  const RADIUS = 2.35;

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.25;
      const targetY = state.pointer.y * 0.18;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-8, -8, -5]} intensity={0.8} color="#10b981" />
      <pointLight position={[0, 0, 6]} intensity={1.0} color="#6ee7b7" />
      <pointLight position={[5, -5, 3]} intensity={0.5} color="#8b5cf6" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* Central node */}
        <CentralNode isHovered={hoveredCenter} onHover={setHoveredCenter} />

        {/* Connection lines */}
        <NetworkLines hoveredNode={hoveredNode} selectedNode={selectedCategory} />

        {/* Signal particles */}
        <SignalParticles />

        {/* All 8 service nodes */}
        {SERVICE_NODES.map((node) => (
          <ServiceSatelliteNode
            key={node.id}
            node={node}
            radius={RADIUS}
            isSelected={selectedCategory === node.id}
            isHovered={hoveredNode === node.id}
            onHover={(isH) => setHoveredNode(isH ? node.id : null)}
            onClick={() => onSelectCategory(selectedCategory === node.id ? null : node.id)}
          />
        ))}

        {/* Background sparkles */}
        <Sparkles count={50} scale={8} size={1.2} speed={0.3} opacity={0.25} color="#34d399" />
      </Float>
    </group>
  );
}

// --- Main Export ---
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
      <div className="w-full min-h-[420px] rounded-3xl bg-dark-900/60 border border-white/10 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse" />
        </div>
        <h4 className="text-white font-black text-base">CoServe Spatial Network</h4>
        <p className="text-slate-400 text-xs text-center max-w-xs mt-2">
          8-category cooperative mesh connecting local craftsmen across your neighborhood.
        </p>
        <div className="grid grid-cols-4 gap-2 mt-6 w-full max-w-xs">
          {SERVICE_NODES.slice(0, 8).map(n => (
            <div key={n.id} className="text-center p-2 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-bold" style={{ color: n.color }}>{n.name}</div>
              <div className="text-[9px] text-slate-500">{n.count} pros</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[440px] sm:min-h-[500px] relative rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-radial-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Scene selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
        </Suspense>
      </Canvas>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="px-4 py-1.5 rounded-full bg-dark-900/80 backdrop-blur-xl border border-white/10 text-[11px] text-slate-300 flex items-center gap-2 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive 3D Service Mesh · Hover to explore · Click to filter</span>
        </div>
      </div>

      {/* Node count overlay */}
      <div className="absolute top-4 right-4 pointer-events-none z-10">
        <div className="px-3 py-1.5 rounded-xl bg-dark-900/80 backdrop-blur-xl border border-white/10 text-[10px] text-slate-400 font-mono">
          8 services · 168 providers
        </div>
      </div>
    </div>
  );
}
