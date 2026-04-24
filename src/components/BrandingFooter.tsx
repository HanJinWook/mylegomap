import React from 'react';

/**
 * BrandingFooter component displays copyright and version information.
 */
export const BrandingFooter: React.FC = () => {
  return (
    <footer className="mt-4 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
       <span>LEGO® is a trademark of the LEGO Group</span>
       <span className="w-1 h-1 rounded-full bg-slate-300"></span>
       <span>Powered by VoxelEngine 2026</span>
    </footer>
  );
};
