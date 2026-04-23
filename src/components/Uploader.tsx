'use client';

import { useRef } from 'react';
import { ImagePlus, Sparkles, Upload } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useVoxelizer } from '@/hooks/useVoxelizer';
import BrickButton from '@/components/ui/BrickButton';
import LoadingSpinner from './LoadingSpinner';

export default function Uploader() {
  const { isLoading, imageLoaded } = useStore();
  const { processFile, error, setError } = useVoxelizer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  if (imageLoaded && !isLoading) {
    return (
      <div className="w-full">
        {/* Hidden input for Build New Creation */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        />
        <BrickButton 
          onClick={() => fileInputRef.current?.click()}
          color="red"
          className="w-full py-4 text-lg"
        >
          <ImagePlus className="w-6 h-6" />
          <span>Build New Creation</span>
        </BrickButton>
      </div>
    );
  }

  return (
    <div className="relative p-6">
      {isLoading && <LoadingSpinner />}
      
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />

      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full max-w-2xl min-h-[320px] p-12 border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group border-[#FED500] bg-white hover:bg-slate-50 hover:border-[#E30013] hover:shadow-2xl`}
      >
        <div className="absolute top-8 right-8 opacity-20">
           <Sparkles className="w-10 h-10 text-[#FED500]" />
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-50 mb-8 transition-all duration-300 border-4 border-[#FED500] group-hover:border-[#E30013] group-hover:-translate-y-2 relative z-10">
          <Upload className="w-16 h-16 text-[#FED500] group-hover:text-[#E30013] transition-colors" />
        </div>
        
        <h3 className="text-4xl font-black mb-4 text-center tracking-tighter italic text-[#E30013] uppercase relative z-10">
          Transform to LEGO
        </h3>
        
        <p className="text-slate-500 font-bold text-center text-sm px-10 relative z-10 max-w-sm uppercase tracking-wider leading-relaxed">
          Drag & drop your photo here <br /> or <span className="text-[#006CB7] border-b-2 border-[#006CB7]/30 font-black hover:text-[#E30013] hover:border-[#E30013]/30 transition-colors">click to browse</span>
        </p>
        
        {error && (
          <div className="absolute bottom-8 left-0 w-full px-12 animate-fade-in">
            <p className="bg-[#E30013] text-white py-3 px-6 rounded-2xl text-center text-sm font-black uppercase italic shadow-lg">
              ⚠️ {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
