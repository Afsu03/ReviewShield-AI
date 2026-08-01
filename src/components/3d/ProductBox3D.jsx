import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProductBox3D({ trustScore = 85, color = "#00f0ff" }) {
  const boxRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (boxRef.current) {
      boxRef.current.rotation.y = t * 0.4;
      boxRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={boxRef}>
      {/* Product Packaging Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2.4, 1]} />
        <meshStandardMaterial
          color="#121829"
          metalness={0.7}
          roughness={0.2}
          emissive={trustScore > 70 ? "#00f0ff" : "#ff007f"}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Holographic Security Seal */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {/* Edge Accent Bevel lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.02, 2.42, 1.02)]} />
        <lineBasicMaterial color={color} />
      </lineSegments>
    </group>
  );
}
