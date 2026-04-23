'use client';

import React from 'react';
import { THEME } from '@/constants/theme';

interface BrickCardProps {
  accentColor?: 'red' | 'blue' | 'yellow' | 'green';
  title?: React.ReactNode;
  icon?: React.ReactElement<any>;
  children: React.ReactNode;
  className?: string;
}

export default function BrickCard({
  accentColor = 'blue',
  title,
  icon,
  children,
  className = '',
}: BrickCardProps) {
  
  const accentHex = THEME.colors.primary[accentColor];
  const shadowHex = THEME.shadows.depth[accentColor];

  return (
    <div 
      className={`bg-white p-6 rounded-[1.5rem] border-4 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 ${className}`}
      style={{ 
        borderColor: accentHex,
        boxShadow: `0 8px 0 ${shadowHex}20, 0 12px 24px -12px rgba(0,0,0,0.15)`
      }}
    >
      {/* Decorative top border highlight */}
      <div 
        className="absolute top-0 left-0 w-full h-1.5 opacity-80"
        style={{ backgroundColor: accentHex }}
      />

      {(title || icon) && (
        <div className="flex items-center gap-3">
          {icon && React.isValidElement(icon) && (
            <div 
              className="p-2.5 rounded-xl shadow-sm border-2 border-white/50"
              style={{ backgroundColor: `${accentHex}20` }}
            >
              {React.cloneElement(icon as React.ReactElement<any>, { 
                className: `w-5 h-5`,
                style: { color: accentHex }
              })}
            </div>
          )}
          {title && (
            <div 
              className="text-xl font-black tracking-tight uppercase italic flex-1 pr-4"
              style={{ color: accentHex }}
            >
              {title}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
