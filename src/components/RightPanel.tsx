'use client';

import { useStore } from '@/store/useStore';
import Uploader from './Uploader';
import LayerGuide from './LayerGuide';
import InventoryList from './InventoryList';

/**
 * RightPanel Component
 * 독립된 하위 컴포넌트(Uploader, LayerGuide, InventoryList)를 조합하여 우측 제어 패널을 구성합니다.
 */
export default function RightPanel() {
  const { imageLoaded } = useStore();

  if (!imageLoaded) return null;

  return (
    <div className="w-full h-auto lg:h-[calc(100vh-8rem)] flex flex-col gap-6 justify-start animate-fade-in z-10 shrink-0 pb-6 min-w-0">
      {/* 1. New Creation Control */}
      <Uploader />

      {/* 2. Step-by-Step Assembly Guide */}
      <LayerGuide />

      {/* 3. Detailed Brick Inventory */}
      <InventoryList />
    </div>
  );
}
