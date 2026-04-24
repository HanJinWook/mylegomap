'use client';

import React from 'react';
import { Blocks, Sparkles } from 'lucide-react';
import { THEME } from '@/constants/theme';

interface BrandingHeaderProps {
  onReset: () => void;
}

/**
 * BrandingHeader component handles the main application branding and status indicators.
 */
export const BrandingHeader: React.FC<BrandingHeaderProps> = ({ onReset }) => {
  return (
    <header className="flex items-center justify-between mb-6 lg:mb-8 shrink-0">
      <div 
        className="flex items-center gap-4 cursor-pointer group"
        onClick={onReset}
      >
        <div 
          className="p-3 rounded-lg border-2 border-white/20 transform -rotate-1 transition-transform group-hover:scale-110 group-active:scale-95"
          style={{ 
            backgroundColor: THEME.colors.primary.red,
            boxShadow: `0 4px 0 ${THEME.shadows.depth.red}`
          }}
        >
          <Blocks className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </div>
        <div>
          <h1 
            className="text-2xl lg:text-4xl font-black italic tracking-tighter drop-shadow-sm flex items-center gap-2"
            style={{ color: THEME.colors.primary.red }}
          >
            LEGOMAP 3D
            <Sparkles className="w-5 h-5" style={{ color: THEME.colors.primary.yellow }} />
          </h1>
          <p 
            className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: THEME.colors.primary.blue }}
          >
            Official Voxelizer Engine
          </p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME.colors.primary.green }}></div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Online</span>
      </div>
    </header>
  );
};
