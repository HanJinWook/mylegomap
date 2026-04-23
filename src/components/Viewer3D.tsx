'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import InstancedLego from './InstancedLego';
import SceneSetup from './SceneSetup';
import { THEME } from '@/constants/theme';

/**
 * Viewer3D Component
 * 3D 렌더링을 위한 Canvas를 초기화하고 SceneSetup과 InstancedLego를 렌더링합니다.
 */
export default function Viewer3D() {
  const bgColor = useMemo(() => THEME.colors.neutral.gray, []);

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: bgColor }}>
      <Canvas 
        camera={{ position: [50, 40, 50], fov: 30 }} 
        shadows 
        gl={{ 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={[bgColor]} />
        
        {/* Modularized Scene Configuration (Lights, Environment, Controls) */}
        <SceneSetup />
        
        {/* Core Voxel Rendering Engine */}
        <InstancedLego />

      </Canvas>
    </div>
  );
}
