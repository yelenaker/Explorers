import React, { useState, useEffect } from 'react';
import { Camera, ChevronUp, ChevronDown, MapPin, Sparkles } from 'lucide-react';
import frenchRivieraImg from '../assets/images/french_riviera_top_1790431364924.jpg';

interface TopRivieraBannerProps {
  currentLocation: string | null;
  onOpenLocationWindow: () => void;
  isCompact?: boolean;
}

export const TopRivieraBanner: React.FC<TopRivieraBannerProps> = ({
  currentLocation,
  onOpenLocationWindow,
  isCompact = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(!isCompact);

  // When preferences are selected, automatically transition to compact mode
  useEffect(() => {
    if (isCompact) {
      setIsExpanded(false);
    }
  }, [isCompact]);

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden border-b border-slate-200 transition-all duration-500 ease-in-out ${
        isExpanded ? 'h-36 sm:h-44 md:h-48' : 'h-14 sm:h-16'
      }`}
    >
      {/* Background Image: French Riviera Picture with Rich Vibrancy */}
      <img
        src={frenchRivieraImg}
        alt="French Riviera, Côte d'Azur coastline"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-center filter saturate-125 contrast-105 brightness-100 transition-transform duration-1000 hover:scale-102"
      />

      {/* Colourful Mediterranean Gradient Scrim for White Theme Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-slate-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-transparent to-amber-500/20 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Caption & Location Context */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm border border-white/30">
              <Camera className="h-3 w-3 text-amber-200" />
              French Riviera · Côte d’Azur
            </span>
            {currentLocation && (
              <span className="text-xs text-white font-medium drop-shadow bg-slate-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                Origin: <strong className="text-amber-200 font-bold">{currentLocation}</strong>
              </span>
            )}
          </div>

          {isExpanded && (
            <div className="animate-fade-in mt-1">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
                Côte d’Azur Sanctuary
              </h2>
              <p className="text-xs text-slate-100 font-medium drop-shadow hidden sm:block max-w-lg mt-0.5">
                Turquoise Mediterranean waters, pastel seaside cliffs, and vibrant sunlit bays.
              </p>
            </div>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLocationWindow}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 px-3.5 py-1.5 text-xs font-bold transition-all shadow-md active:scale-95 border border-slate-200"
          >
            <MapPin className="h-3.5 w-3.5 text-sky-600" />
            <span>{currentLocation ? 'Change City' : 'Set Location'}</span>
          </button>

          {/* Minimize / Expand Banner Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse banner' : 'Expand full picture'}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/90 transition-colors shadow-xs"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
