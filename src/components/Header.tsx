import React from 'react';
import { Compass, MapPin, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { CurrencyCode } from '../types';

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenPreferences: () => void;
  onResetPreferences: () => void;
  matchesCount: number;
  currentLocation: string | null;
  onOpenLocationWindow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onOpenPreferences,
  onResetPreferences,
  matchesCount,
  currentLocation,
  onOpenLocationWindow,
}) => {
  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl px-4 sm:px-6 shadow-xs">
      <div className="mx-auto flex h-full items-center justify-between gap-3">
        {/* Zone 1: Colourful brand mark */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 text-white shadow-md shadow-sky-500/20">
            <Compass className="h-4 w-4" />
          </div>
          <a
            href="/"
            className="text-base font-extrabold tracking-wider text-slate-900 uppercase hover:text-sky-600 transition-colors"
          >
            Explorers
          </a>
        </div>

        {/* Zone 2: Vibrant Location Button */}
        <div className="flex items-center">
          <button
            onClick={onOpenLocationWindow}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300 bg-sky-50/80 hover:bg-sky-100 text-xs text-slate-800 transition-all shadow-xs active:scale-95"
            title="Click to change your location"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
            <span className="font-semibold text-slate-800 truncate max-w-[150px] sm:max-w-[220px]">
              {currentLocation || 'What is your location?'}
            </span>
          </button>
        </div>

        {/* Zone 3: Simplistic & Colorful Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Switcher */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/90 p-0.5 text-xs font-semibold">
            {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => onCurrencyChange(c)}
                className={`rounded-lg px-2.5 py-1 text-xs transition-all ${
                  currency === c
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c === 'USD' ? '$' : c === 'EUR' ? '€' : '£'}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetPreferences}
            title="Reset filters"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-amber-600 hover:border-amber-300 transition-colors shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {/* Filters Button */}
          <button
            onClick={onOpenPreferences}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 px-3.5 py-1.5 text-xs font-bold text-white transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>Filters ({matchesCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
