import { create } from 'zustand';
import { Voxel } from '../lib/voxelize';

interface LegoStore {
  voxels: Voxel[];
  currentLayer: number;
  maxLayer: number;
  isLoading: boolean;
  imageLoaded: boolean;
  layerInsights: Record<number, string>; // Layer index -> Insight text
  
  setVoxels: (voxels: Voxel[], maxLayer: number) => void;
  setCurrentLayer: (layer: number) => void;
  setIsLoading: (loading: boolean) => void;
  setLayerInsight: (layer: number, insight: string) => void;
  reset: () => void;
}

export const useStore = create<LegoStore>((set) => ({
  voxels: [],
  currentLayer: 1,
  maxLayer: 1,
  isLoading: false,
  imageLoaded: false,
  layerInsights: {},

  setVoxels: (voxels, maxLayer) => 
    set({ voxels, maxLayer, currentLayer: maxLayer, imageLoaded: true, isLoading: false, layerInsights: {} }),

  setCurrentLayer: (layer) => 
    set({ currentLayer: layer }),

  setIsLoading: (isLoading) => 
    set({ isLoading }),

  setLayerInsight: (layer, insight) =>
    set((state) => ({ 
      layerInsights: { ...state.layerInsights, [layer]: insight } 
    })),

  reset: () => 
    set({ voxels: [], currentLayer: 1, maxLayer: 1, imageLoaded: false, isLoading: false, layerInsights: {} }),
}));
