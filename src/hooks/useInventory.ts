import { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { LegoColor } from '@/lib/colors';

export function useInventory() {
  const { voxels } = useStore();

  const inventory = useMemo(() => {
    const countsRef: Record<string, { count: number; color: LegoColor }> = {};
    voxels.forEach((v) => {
      if (!countsRef[v.color.id]) {
        countsRef[v.color.id] = { count: 0, color: v.color };
      }
      countsRef[v.color.id].count += 1;
    });
    return Object.values(countsRef).sort((a, b) => b.count - a.count);
  }, [voxels]);

  return {
    inventory,
    totalBricks: voxels.length
  };
}
