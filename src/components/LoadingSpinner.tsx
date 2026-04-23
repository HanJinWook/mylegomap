import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-3xl">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
      <span className="text-white text-lg font-medium tracking-wider">Voxelizing...</span>
      <span className="text-slate-400 text-sm mt-2">Assembling bricks</span>
    </div>
  );
}
