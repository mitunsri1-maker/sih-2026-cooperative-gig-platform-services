import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NetworkConnections({ nodes, centerPosition = [0, 0, 0], selectedCategory }) {
  const linesRef = useRef();

  // Create geometry for connection lines
  const linesData = useMemo(() => {
    return nodes.map(node => {
      const start = new THREE.Vector3(...centerPosition);
      const end = new THREE.Vector3(...node.position);
      const mid = new THREE.Vector3(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2 + 0.3,
        (start.z + end.z) / 2
      );
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(24);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      return {
        id: node.id,
        geometry,
        color: node.color,
        isSelected: selectedCategory === node.id
      };
    });
  }, [nodes, centerPosition, selectedCategory]);

  return (
    <group ref={linesRef}>
      {linesData.map(({ id, geometry, color, isSelected }) => {
        const lineColor = new THREE.Color(color);
        return (
          <primitive key={id} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: isSelected ? 0.9 : 0.25,
            linewidth: isSelected ? 2 : 1
          }))} />
        );
      })}
    </group>
  );
}

export function FlowingSignalParticles({ nodes, centerPosition = [0, 0, 0] }) {
  const particlesRef = useRef();
  const count = nodes.length * 3;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      targetNode: nodes[i % nodes.length],
      progress: Math.random(),
      speed: 0.2 + Math.random() * 0.3,
      size: 0.04 + Math.random() * 0.03
    }));
  }, [nodes, count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    particles.forEach((p, i) => {
      p.progress += delta * p.speed;
      if (p.progress > 1) p.progress = 0;

      const start = new THREE.Vector3(...centerPosition);
      const end = new THREE.Vector3(...p.targetNode.position);
      const currentPos = new THREE.Vector3().lerpVectors(start, end, p.progress);
      currentPos.y += Math.sin(p.progress * Math.PI) * 0.2;

      dummy.position.copy(currentPos);
      dummy.scale.set(p.size, p.size, p.size);
      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.8} />
    </instancedMesh>
  );
}
