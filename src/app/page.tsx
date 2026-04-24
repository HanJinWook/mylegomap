'use client';

import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { THEME } from '@/constants/theme';

// Specialized components
import Viewer3D from '../components/Viewer3D';
import Uploader from '../components/Uploader';
import RightPanel from '../components/RightPanel';
import DashboardLayout from '../components/DashboardLayout';
import { BrandingHeader } from '../components/BrandingHeader';
import { BrandingFooter } from '../components/BrandingFooter';

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
      className="min-h-screen font-fredoka flex flex-col lego-bg-pattern" 
      style={{ 
        backgroundColor: THEME.colors.neutral.gray 
      }}
    >
      <div className="max-w-[1920px] w-full mx-auto flex-1 flex flex-col p-4 lg:p-8 relative z-10">
        
        {/* Modular Branding Header */}
        <BrandingHeader onReset={reset} />

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
        
        {/* Modular Branding Footer */}
        <BrandingFooter />
      </div>
    </main>
  );
}
