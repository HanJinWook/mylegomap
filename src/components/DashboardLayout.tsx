'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

interface DashboardLayoutProps {
  viewer: React.ReactNode;
  sidebar: React.ReactNode;
  uploader: React.ReactNode;
}

/**
 * DashboardLayout Component
 * 메인 대시보드의 Grid 레이아웃을 담당합니다.
 */
export default function DashboardLayout({ viewer, sidebar, uploader }: DashboardLayoutProps) {
  const { imageLoaded } = useStore();

  return (
    <div className="w-full rounded-2xl lg:rounded-[2.5rem] border-4 border-white bg-white/50 backdrop-blur-sm shadow-[0_12px_0_rgba(0,0,0,0.05)] relative overflow-hidden">
      <div 
        className={`w-full h-auto grid grid-cols-1 ${imageLoaded ? 'lg:grid-cols-[1fr_400px]' : 'place-items-center'} gap-6 lg:gap-10 p-4 lg:p-10 content-start`}
      >
        {!imageLoaded ? (
          <div className="w-full h-full flex items-center justify-center animate-fade-in py-10">
            {uploader}
          </div>
        ) : (
          <>
            {/* Viewer Area */}
            <div className="w-full h-[55dvh] lg:h-full min-h-[400px] animate-fade-in relative z-20 rounded-[2rem] overflow-hidden border-4 border-slate-100 bg-[#F8F8F8] shadow-inner">
              {viewer}
            </div>
            
            {/* Sidebar Area */}
            <div className="w-full lg:max-w-md h-full animate-fade-in">
              {sidebar}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
