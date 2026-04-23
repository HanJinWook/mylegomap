'use client';

import React from 'react';
import { THEME } from '@/constants/theme';

interface BrickButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'blue' | 'yellow' | 'green';
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function BrickButton({
  color = 'red',
  variant = 'solid',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: BrickButtonProps) {
  
  const baseStyles = "relative font-black uppercase tracking-tight italic transition-all active:translate-y-[2px] disabled:opacity-40 disabled:active:translate-y-0";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-xl",
    md: "px-6 py-3.5 text-sm rounded-2xl",
    lg: "px-8 py-5 text-lg rounded-[1.5rem]",
  };

  const colorStyles = {
    red: {
      bg: THEME.colors.primary.red,
      shadow: THEME.shadows.depth.red,
      text: 'text-white'
    },
    blue: {
      bg: THEME.colors.primary.blue,
      shadow: THEME.shadows.depth.blue,
      text: 'text-white'
    },
    yellow: {
      bg: THEME.colors.primary.yellow,
      shadow: THEME.shadows.depth.yellow,
      text: 'text-slate-900'
    },
    green: {
      bg: THEME.colors.primary.green,
      shadow: THEME.shadows.depth.green,
      text: 'text-white'
    }
  };

  const styles = colorStyles[color];
  const shadowValue = disabled ? 'none' : `0 4px 0 ${styles.shadow}`;
  const activeShadowValue = disabled ? 'none' : `0 2px 0 ${styles.shadow}`;

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${styles.text} ${className}`}
      style={{ 
        backgroundColor: styles.bg,
        boxShadow: shadowValue,
      }}
      disabled={disabled}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.boxShadow = activeShadowValue;
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.boxShadow = shadowValue;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.boxShadow = shadowValue;
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Subtle brick detail (top stud/highlight) */}
      <div className="absolute top-1 left-1 right-1 h-2 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
    </button>
  );
}
