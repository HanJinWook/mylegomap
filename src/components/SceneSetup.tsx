'use client';

import { OrbitControls, ContactShadows, Environment, Sky } from '@react-three/drei';
import { THEME } from '@/constants/theme';

/**
 * SceneSetup Component
 * 3D 씬의 조명, 환경, 카메라 컨트롤러 등을 통합 관리합니다.
 */
export default function SceneSetup() {
  return (
    <>
      {/* Universal Lighting */}
      <ambientLight intensity={1.2} />
      
      {/* Key Light for Crisp Shadows */}
      <directionalLight
        castShadow
        position={[40, 60, 20]}
        intensity={1.8}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Decorative Brand Lights */}
      <pointLight position={[-30, 20, 30]} intensity={1} color={THEME.colors.primary.yellow} />
      <pointLight position={[30, 10, -30]} intensity={0.8} color={THEME.colors.primary.blue} />
      
      {/* Ground Effects */}
      <ContactShadows 
        position={[0, -0.01, 0]} 
        opacity={0.3} 
        scale={150} 
        blur={2.5} 
        far={40} 
        color={THEME.colors.neutral.dark} 
      />
      
      {/* Environment & Sky */}
      <Environment preset="city" />
      <Sky distance={450000} sunPosition={[10, 20, 10]} inclination={0.1} azimuth={0.25} />

      {/* Camera Controls */}
      <OrbitControls 
        makeDefault 
        autoRotate={true}
        autoRotateSpeed={0.3}
        target={[0, 4, 0]}
        minDistance={30} 
        maxDistance={300} 
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}
