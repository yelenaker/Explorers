import React from 'react';
import {
  DollarSign,
  Calendar,
  Flame,
  Wine,
  Activity,
  Music,
  SlidersHorizontal,
  Map as MapIcon,
  List as ListIcon,
  Columns
} from 'lucide-react';
import {
  UserPreferences,
  SmokingPreference,
  DrinkingPreference,
  SportPreference,
  ClubPreference
} from '../types';
import { formatPrice } from '../utils/format';

interface PreferenceQuickBarProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onOpenFullWizard: () => void;
  viewMode: 'split' | 'list' | 'map';
  onViewModeChange: (mode: 'split' | 'list' | 'map') => void;
  matchesCount: number;
}

export const PreferenceQuickBar: React.FC<PreferenceQuickBarProps> = ({
  preferences,
  onUpdatePreferences,
  onOpenFullWizard,
  viewMode,
  onViewModeChange,
  matchesCount,
}) => {
  return (
    <div className="w-full border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm px-4 py-2.5">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Quick controls for Money, Days, Preferences */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Money Range Quick Control */}
          <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950/60 px-2.5 py-1 text-neutral-300">
            <DollarSign className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="text-neutral-400 font-medium">Budget:</span>
            <span className="font-mono font-semibold text-emerald-400 tabular-nums">
              {formatPrice(preferences.minMoney, preferences.currency)}–{formatPrice(preferences.maxMoney, preferences.currency)}
            </span>
          </div>

          {/* Days Range Quick Control */}
          <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950/60 px-2.5 py-1 text-neutral-300">
            <Calendar className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <span className="text-neutral-400 font-medium">Days:</span>
            <span className="font-mono font-semibold text-sky-400 tabular-nums">
              {preferences.minDays}–{preferences.maxDays}d
            </span>
          </div>

          {/* Smoking Quick Selector */}
          <div className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-950/60 p-0.5">
            <span className="flex items-center gap-1 px-1.5 text-[11px] text-neutral-400">
              <Flame className="h-3 w-3 text-amber-400" />
              <span className="hidden xl:inline">Smoking:</span>
            </span>
            {(['friendly', 'strict', 'flexible'] as SmokingPreference[]).map((v) => (
              <button
                key={v}
                onClick={() => onUpdatePreferences({ smoking: v })}
                className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                  preferences.smoking === v
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Drinking Quick Selector */}
          <div className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-950/60 p-0.5">
            <span className="flex items-center gap-1 px-1.5 text-[11px] text-neutral-400">
              <Wine className="h-3 w-3 text-purple-400" />
              <span className="hidden xl:inline">Drinking:</span>
            </span>
            {(['high', 'moderate', 'dry'] as DrinkingPreference[]).map((v) => (
              <button
                key={v}
                onClick={() => onUpdatePreferences({ drinking: v })}
                className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                  preferences.drinking === v
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Sport Quick Selector */}
          <div className="hidden lg:flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-950/60 p-0.5">
            <span className="flex items-center gap-1 px-1.5 text-[11px] text-neutral-400">
              <Activity className="h-3 w-3 text-cyan-400" />
              <span>Sport:</span>
            </span>
            {(['adventure', 'moderate', 'relaxed'] as SportPreference[]).map((v) => (
              <button
                key={v}
                onClick={() => onUpdatePreferences({ sport: v })}
                className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                  preferences.sport === v
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Club Quick Selector */}
          <div className="hidden lg:flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-950/60 p-0.5">
            <span className="flex items-center gap-1 px-1.5 text-[11px] text-neutral-400">
              <Music className="h-3 w-3 text-pink-400" />
              <span>Club:</span>
            </span>
            {(['clubs', 'lounges', 'quiet'] as ClubPreference[]).map((v) => (
              <button
                key={v}
                onClick={() => onUpdatePreferences({ club: v })}
                className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                  preferences.club === v
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Full Wizard Button */}
          <button
            onClick={onOpenFullWizard}
            className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300 transition-colors ml-1"
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Right: Screen View Mode (Desktop Split / Mobile Switcher) */}
        <div className="flex items-center gap-2">
          {/* Option count */}
          <span className="hidden sm:inline text-xs font-mono font-medium text-neutral-400 tabular-nums">
            Showing <strong className="text-white font-semibold">{matchesCount}</strong> of 10 destinations
          </span>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-950 p-0.5">
            <button
              onClick={() => onViewModeChange('split')}
              title="Split View (List & Map)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                viewMode === 'split'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Split</span>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              title="List Only View"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ListIcon className="h-3.5 w-3.5" />
              <span className="hidden md:inline">List</span>
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              title="Map Only View"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
