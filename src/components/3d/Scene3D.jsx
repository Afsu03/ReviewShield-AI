import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FloatingShield } from './FloatingShield';

export function Scene3D() {
  return (
    <div className="w-full h-full min-h-[380px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 8]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#3b82f6" />
        
        <Suspense fallback={null}>
          <FloatingShield position={[0, 0, 0]} scale={1.0} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
