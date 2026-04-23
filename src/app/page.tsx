'use client';

import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { THEME } from '@/constants/theme';
import { Blocks, Sparkles } from 'lucide-react';

// Specialized components
import Viewer3D from '../components/Viewer3D';
import Uploader from '../components/Uploader';
import RightPanel from '../components/RightPanel';
import DashboardLayout from '../components/DashboardLayout';

/**
 * Home Page
 * 최상위 페이지로 데이터 상태 관리와 로고 레이아웃 구성을 담당합니다.
 * 주요 레이아웃 로직은 DashboardLayout으로 위임되었습니다.
 */
export default function Home() {
  const { reset } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main 
      className="min-h-screen font-fredoka overflow-y-auto flex flex-col lego-bg-pattern" 
      style={{ 
        height: '100dvh',
        backgroundColor: THEME.colors.neutral.gray 
      }}
    >
      
      <div className="max-w-[1920px] w-full mx-auto flex-1 flex flex-col p-4 lg:p-8 relative z-10">
        
        {/* Header - Modular Branding */}
        <header className="flex items-center justify-between mb-6 lg:mb-8 shrink-0">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => reset()}
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

        {/* Dashboard Layout Composition */}
        <DashboardLayout 
          viewer={
            isMounted ? <Viewer3D /> : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                Initializing 3D Engine...
              </div>
            )
          }
          sidebar={<RightPanel />}
          uploader={<Uploader />}
        />
        
        {/* Footer */}
        <footer className="mt-4 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <span>LEGO® is a trademark of the LEGO Group</span>
           <span className="w-1 h-1 rounded-full bg-slate-300"></span>
           <span>Powered by VoxelEngine 2026</span>
        </footer>
      </div>
    </main>
  );
}
