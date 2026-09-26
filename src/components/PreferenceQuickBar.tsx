import React from 'react';
import {
  DollarSign,
  Calendar,
  Sparkles,
  Map as MapIcon,
  List as ListIcon,
  Columns,
  Activity,
  Music,
  SlidersHorizontal
} from 'lucide-react';
import { UserPreferences } from '../types';
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
  const setVibe = (type: 'adventure' | 'nightlife' | 'chill' | 'all') => {
    if (type === 'adventure') {
      onUpdatePreferences({ sport: 'adventure', club: 'lounges', minDays: 5, maxDays: 10 });
    } else if (type === 'nightlife') {
      onUpdatePreferences({ club: 'clubs', drinking: 'high', smoking: 'friendly' });
    } else if (type === 'chill') {
      onUpdatePreferences({ sport: 'relaxed', club: 'quiet', drinking: 'moderate' });
    } else {
      onUpdatePreferences({ sport: 'moderate', club: 'lounges', drinking: 'moderate' });
    }
  };

  const isAdventure = preferences.sport === 'adventure';
  const isNightlife = preferences.club === 'clubs';
  const isChill = preferences.club === 'quiet' && preferences.sport === 'relaxed';

  return (
    <div className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl px-4 py-2 shadow-xs">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Left: Simplistic & Colorful Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Budget Range Button */}
          <button
            onClick={onOpenFullWizard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-900 font-bold transition-all shadow-xs"
            title="Click to change budget"
          >
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700">Budget:</span>
            <span className="font-mono text-emerald-950">
              {formatPrice(preferences.minMoney, preferences.currency)}–{formatPrice(preferences.maxMoney, preferences.currency)}
            </span>
          </button>

          {/* Days Range Button */}
          <button
            onClick={onOpenFullWizard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-300 bg-sky-50/90 hover:bg-sky-100 text-sky-900 font-bold transition-all shadow-xs"
            title="Click to change days"
          >
            <Calendar className="h-3.5 w-3.5 text-sky-600" />
            <span className="text-sky-700">Days:</span>
            <span className="font-mono text-sky-950">
              {preferences.minDays}–{preferences.maxDays}d
            </span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-[1px] bg-slate-200 mx-0.5" />

          {/* Simplistic Colourful Vibe Pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden lg:inline mr-0.5">
              Vibe:
            </span>

            {/* Adventure (Amber/Orange) */}
            <button
              onClick={() => setVibe(isAdventure ? 'all' : 'adventure')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                isAdventure
                  ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs scale-102 ring-1 ring-amber-400'
                  : 'bg-amber-50/90 border-amber-200 text-amber-800 hover:text-amber-950 hover:bg-amber-100'
              }`}
            >
              <Activity className="h-3 w-3 text-amber-600" />
              <span>Adventure</span>
            </button>

            {/* Nightlife (Pink/Fuchsia) */}
            <button
              onClick={() => setVibe(isNightlife ? 'all' : 'nightlife')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                isNightlife
                  ? 'bg-fuchsia-100 border-fuchsia-400 text-fuchsia-950 shadow-xs scale-102 ring-1 ring-fuchsia-400'
                  : 'bg-fuchsia-50/90 border-fuchsia-200 text-fuchsia-800 hover:text-fuchsia-950 hover:bg-fuchsia-100'
              }`}
            >
              <Music className="h-3 w-3 text-fuchsia-600" />
              <span>Nightlife</span>
            </button>

            {/* Chill & Relax (Teal/Cyan) */}
            <button
              onClick={() => setVibe(isChill ? 'all' : 'chill')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                isChill
                  ? 'bg-teal-100 border-teal-400 text-teal-950 shadow-xs scale-102 ring-1 ring-teal-400'
                  : 'bg-teal-50/90 border-teal-200 text-teal-800 hover:text-teal-950 hover:bg-teal-100'
              }`}
            >
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span>Chill Out</span>
            </button>

            {/* More button */}
            <button
              onClick={onOpenFullWizard}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span className="hidden sm:inline">All</span>
            </button>
          </div>
        </div>

        {/* Right: Screen View Mode & Count */}
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline text-xs font-semibold text-slate-600">
            <span className="text-sky-600 font-bold">{matchesCount}</span> matches
          </span>

          {/* View Mode Toggle with Vibrant Active State */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/90 p-0.5 shadow-xs">
            <button
              onClick={() => onViewModeChange('split')}
              title="Split View (List & Map)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Split</span>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              title="List View"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListIcon className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Cards</span>
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              title="Map View"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
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
