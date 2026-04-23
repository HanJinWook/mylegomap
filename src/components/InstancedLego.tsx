'use client';

import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';

const dummy = new THREE.Object3D();
const color = new THREE.Color();
const SPRING_FACTOR = 0.2;
const DAMPING_FACTOR = 0.7;

export default function InstancedLego() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const voxels = useStore((state) => state.voxels);
  const currentLayer = useStore((state) => state.currentLayer);

  // We maintain a local ref holding the physical simulation state for each voxel.
  // This avoids React state updates per frame causing re-renders.
  const physicsRef = useRef<{y: number, velY: number, targetY: number, visible: boolean, scale: number, targetScale: number}[]>([]);

  // Initialize or re-initialize physics ref when voxels completely change
  useEffect(() => {
    physicsRef.current = voxels.map((v) => ({
      y: v.y + 10,
      velY: 0,
      targetY: v.y,
      visible: v.y <= currentLayer,
      scale: 0,
      targetScale: v.y <= currentLayer ? 1 : 0
    }));
  }, [voxels]);

  // Sync target visibility and scales when currentLayer changes
  useEffect(() => {
    if (physicsRef.current.length === 0) return;
    physicsRef.current.forEach((p, i) => {
      const v = voxels[i];
      if (v.y <= currentLayer) {
        if (!p.visible) {
          p.y = v.y + 5; // Start dropping from slightly above
          p.velY = 0;
        }
        p.visible = true;
        p.targetScale = 1;
      } else {
        p.targetScale = 0;
        p.visible = false;
      }
    });
  }, [currentLayer, voxels]);

  // Sync colors to the geometry once when voxels load
  useEffect(() => {
    if (!meshRef.current || voxels.length === 0) return;
    voxels.forEach((v, i) => {
      color.set(v.color.hex);
      meshRef.current?.setColorAt(i, color);
    });
    // @ts-ignore
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [voxels]);

  useFrame(() => {
    if (!meshRef.current || voxels.length === 0 || physicsRef.current.length === 0) return;

    let needsUpdate = false;

    physicsRef.current.forEach((p, i) => {
      const v = voxels[i];
      let changed = false;

      // Vertical spring dropping
      if (p.visible) {
        const forceY = (v.y - p.y) * SPRING_FACTOR;
        p.velY = (p.velY + forceY) * DAMPING_FACTOR;
        p.y += p.velY;
        // Faster snapping to visibility
        if (Math.abs(p.velY) > 0.001 || Math.abs(v.y - p.y) > 0.001) {
          changed = true;
        }
      }

      // Scale transition - Make it even faster for instant visibility
      const dScale = p.targetScale - p.scale;
      if (Math.abs(dScale) > 0.001) {
        p.scale += dScale * 0.4;
        changed = true;
      } else if (p.scale !== p.targetScale) {
        p.scale = p.targetScale;
        changed = true;
      }

      // Apply matrix if anything changed or if visible
      if (changed || p.scale > 0.01) { 
        dummy.position.set(v.x, p.y, v.z);
        const finalScale = p.scale * 0.96;
        dummy.scale.set(finalScale, finalScale, finalScale); 
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (voxels.length === 0) return null;

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, voxels.length]} 
      castShadow 
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* Increased metalness and cleaner material for visibility */}
      <meshStandardMaterial 
        roughness={0.2} 
        metalness={0.3} 
        envMapIntensity={1.5}
      />
    </instancedMesh>
  );
}
