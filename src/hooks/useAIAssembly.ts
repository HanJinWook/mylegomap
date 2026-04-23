import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

export function useAIAssembly() {
  const { 
    currentLayer, 
    maxLayer, 
    voxels, 
    imageLoaded, 
    layerInsights, 
    setLayerInsight 
  } = useStore();
  
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  useEffect(() => {
    if (!imageLoaded || layerInsights[currentLayer]) return;

    const fetchInsight = async () => {
      setIsInsightLoading(true);
      
      const layerVoxels = voxels.filter(v => v.y === currentLayer);
      const colorCounts: Record<string, number> = {};
      layerVoxels.forEach(v => {
        colorCounts[v.color.name] = (colorCounts[v.color.name] || 0) + 1;
      });
      
      const topColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, count]) => `${name} (${count} bricks)`)
        .join(', ');

      const layerInfo = `Layer ${currentLayer} of ${maxLayer}. Total bricks in this layer: ${layerVoxels.length}. Dominant colors: ${topColors}.`;

      try {
        const res = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ layerInfo }),
        });
        const data = await res.json();
        if (data.response) {
          setLayerInsight(currentLayer, data.response);
        }
      } catch (error) {
        console.error('Failed to fetch AI insight:', error);
      } finally {
        setIsInsightLoading(false);
      }
    };

    const timer = setTimeout(fetchInsight, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [currentLayer, imageLoaded, voxels, maxLayer, layerInsights, setLayerInsight]);

  return {
    insight: layerInsights[currentLayer],
    isLoading: isInsightLoading
  };
}
