'use client';

import { useStore } from '@/store/useStore';
import BrickButton from '@/components/ui/BrickButton';
import BrickCard from '@/components/ui/BrickCard';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * LayerGuide Component
 * 레고 조립 단계(레이어)를 제어하고 시각화합니다.
 */
export default function LayerGuide() {
  const { currentLayer, maxLayer, setCurrentLayer } = useStore();

  const handlePrev = () => setCurrentLayer(Math.max(1, currentLayer - 1));
  const handleNext = () => setCurrentLayer(Math.min(maxLayer, currentLayer + 1));

  return (
    <BrickCard 
      accentColor="blue" 
      title="Assembly Guide" 
      icon={<Layers />}
    >
      <div className="bg-slate-50 p-6 rounded-2xl flex items-center justify-between border-2 border-slate-100 shadow-inner">
        <BrickButton onClick={handlePrev} disabled={currentLayer <= 1} color="blue" size="sm">
          <ChevronLeft className="w-6 h-6 stroke-[3px]" />
        </BrickButton>
        
        <div className="text-center flex-1 px-4">
          <div className="text-5xl font-black text-slate-800 drop-shadow-sm select-none">
            {currentLayer}
          </div>
          <div className="text-slate-400 block text-[10px] font-black uppercase tracking-widest mt-1">
            Layer / {maxLayer}
          </div>
        </div>

        <BrickButton onClick={handleNext} disabled={currentLayer >= maxLayer} color="blue" size="sm">
          <ChevronRight className="w-6 h-6 stroke-[3px]" />
        </BrickButton>
      </div>

      <div className="mt-6 px-2">
         <input
          type="range"
          min={1}
          max={maxLayer}
          value={currentLayer}
          onChange={(e) => setCurrentLayer(parseInt(e.target.value))}
          className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#006CB7] border-2 border-white shadow-sm"
        />
      </div>
    </BrickCard>
  );
}
