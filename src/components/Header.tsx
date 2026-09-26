import React from 'react';
import { SlidersHorizontal, Compass, RefreshCw } from 'lucide-react';
import { CurrencyCode } from '../types';

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenPreferences: () => void;
  onResetPreferences: () => void;
  matchesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onOpenPreferences,
  onResetPreferences,
  matchesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md px-4 sm:px-6">
      <div className="mx-auto flex h-full items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
            <Compass className="h-5 w-5" />
          </div>
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            WanderMatch
          </a>
        </div>

        {/* Zone 2: Navigation / Quick links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            onClick={onOpenPreferences}
            className="transition-colors hover:text-white"
          >
            Budget & Days
          </button>
          <button
            onClick={onOpenPreferences}
            className="transition-colors hover:text-white"
          >
            Lifestyle & Vibe
          </button>
          <a
            href="#results"
            className="transition-colors hover:text-white"
          >
            Matching Events
          </a>
          <a
            href="#map-section"
            className="transition-colors hover:text-white"
          >
            Interactive Map
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-900/90 p-0.5 text-xs font-semibold">
            {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => onCurrencyChange(c)}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  currency === c
                    ? 'bg-neutral-800 text-sky-400 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {c === 'USD' ? '$' : c === 'EUR' ? '€' : '£'} {c}
              </button>
            ))}
          </div>

          {/* Reset Filters Quick Button */}
          <button
            onClick={onResetPreferences}
            title="Reset preferences to default"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {/* Edit Preferences CTA */}
          <button
            onClick={onOpenPreferences}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-sky-400 active:scale-98 shadow-sm shadow-sky-500/20 whitespace-nowrap"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Customize Criteria ({matchesCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
