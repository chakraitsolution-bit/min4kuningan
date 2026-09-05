import React from 'react';
import { Volume2, Sparkles, Bell } from 'lucide-react';

interface RunningTextProps {
  text: string;
  speed?: number;
  bgColor?: string;
  textColor?: string;
  badgeBg?: string;
}

export const RunningText: React.FC<RunningTextProps> = ({ 
  text, 
  speed = 25, 
  bgColor = '#064E3B', 
  textColor = '#FFFFFF',
  badgeBg = '#FBBF24'
}) => {
  const duration = typeof speed === 'number' && speed > 0 ? speed : 25;

  return (
    <div 
      id="sticky-running-text-bar"
      style={{ backgroundColor: bgColor }}
      className="sticky top-[105px] sm:top-[112px] z-40 w-full border-b-2 border-black/10 shadow-md overflow-hidden flex items-center h-10 px-2 sm:px-4 transition-colors duration-300"
    >
      {/* Static Left Badge */}
      <div 
        style={{ backgroundColor: badgeBg }}
        className="flex-shrink-0 z-10 flex items-center space-x-1.5 text-slate-950 px-2.5 py-1 rounded font-bold text-xs shadow-sm uppercase tracking-wide mr-3 select-none transition-colors duration-300"
      >
        <Volume2 className="w-3.5 h-3.5 animate-pulse text-slate-900" />
        <span className="hidden xs:inline">INFORMASI TERKINI:</span>
        <span className="xs:hidden">INFO:</span>
      </div>

      {/* Marquee Track */}
      <div className="flex-1 overflow-hidden relative whitespace-nowrap mask-gradient">
        <div 
          className="animate-marquee inline-block text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm"
          style={{ 
            animationDuration: `${duration}s`,
            color: textColor 
          }}
        >
          <span className="mr-8 inline-flex items-center">
            <Bell className="w-3.5 h-3.5 inline mr-1.5 text-amber-300" />
            {text}
          </span>
          <span className="mr-8 inline-flex items-center font-semibold opacity-90">
            ★ Portal Resmi MIN 4 Kuningan — Madrasah Hebat Bermartabat, Mandiri Berprestasi ★
          </span>
          <span className="mr-8 inline-flex items-center">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-emerald-300" />
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};
