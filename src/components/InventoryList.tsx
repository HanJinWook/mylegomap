'use client';

import { useInventory } from '@/hooks/useInventory';
import BrickCard from '@/components/ui/BrickCard';
import { Cuboid } from 'lucide-react';

/**
 * InventoryList Component
 * 사용되는 모든 브릭의 수량과 색상 목록을 표시합니다.
 */
export default function InventoryList() {
  const { inventory, totalBricks } = useInventory();

  return (
    <BrickCard 
      accentColor="green" 
      title={
        <div className="flex items-center justify-between w-full pr-2">
          <span>Brick Inventory</span>
          <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-lg font-black text-slate-700">{totalBricks}</span>
            <span className="text-[10px] ml-1 uppercase tracking-wider text-slate-400 font-black">Bricks</span>
          </div>
        </div>
      }
      icon={<Cuboid />}
      className="flex-1 min-h-[400px]"
    >
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 overflow-x-hidden mt-2" style={{ scrollbarWidth: 'thin' }}>
        {inventory.map((item) => (
          <div 
            key={item.color.id} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-[#FED500] hover:bg-white transition-all group"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg shadow-md border-2 border-white flex-shrink-0 relative overflow-hidden"
                style={{ backgroundColor: item.color.hex }}
              >
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/30"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="text-sm font-black text-slate-800 truncate pr-2 uppercase italic">
                  {item.color.name}
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  {item.color.id}
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-1 bg-white px-4 py-2 rounded-xl border-2 border-slate-100 shadow-sm shrink-0">
              <span className="text-xs text-slate-400 font-black">×</span>
              <span className="text-lg font-black text-slate-900">{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </BrickCard>
  );
}
