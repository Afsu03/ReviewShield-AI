import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingShield({ position = [0, 0, 0], scale = 1.1 }) {
  const shieldRef = useRef();

  // Create clean shield shape
  const shieldShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.6);
    shape.quadraticCurveTo(1.2, 1.4, 1.4, 0.4);
    shape.quadraticCurveTo(1.3, -0.8, 0, -1.8);
    shape.quadraticCurveTo(-1.3, -0.8, -1.4, 0.4);
    shape.quadraticCurveTo(-1.2, 1.4, 0, 1.6);
    return shape;
  }, []);

  const extrudeSettings = {
    steps: 2,
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelSegments: 6
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shieldRef.current) {
      shieldRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
      shieldRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Clean 3D Metallic Blue/Silver Shield */}
      <mesh ref={shieldRef} castShadow receiveShadow>
        <extrudeGeometry args={[shieldShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#2563eb"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Subtle Inner Crest Plate */}
      <mesh position={[0, 0, 0.16]}>
        <extrudeGeometry args={[shieldShape, { steps: 1, depth: 0.05, bevelEnabled: false }]} scale={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
