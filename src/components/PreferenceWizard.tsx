import React from 'react';
import {
  X,
  Sparkles,
  Flame,
  Wine,
  Activity,
  Music,
  Calendar,
  DollarSign,
  Globe,
  RotateCcw,
  Check
} from 'lucide-react';
import {
  UserPreferences,
  SmokingPreference,
  DrinkingPreference,
  SportPreference,
  ClubPreference
} from '../types';
import { formatPrice } from '../utils/format';

interface PreferenceWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onReset: () => void;
  matchingCount: number;
}

export const PreferenceWizard: React.FC<PreferenceWizardProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onReset,
  matchingCount,
}) => {
  if (!isOpen) return null;

  const budgetPresets = [
    { label: 'Backpacker', min: 300, max: 750 },
    { label: 'Smart Mid-Range', min: 800, max: 1800 },
    { label: 'Premium Comfort', min: 1800, max: 3500 },
    { label: 'Luxury Escape', min: 3500, max: 6500 },
  ];

  const durationPresets = [
    { label: 'Weekend (3-4d)', min: 3, max: 4 },
    { label: 'Standard Week (6-8d)', min: 6, max: 8 },
    { label: 'Two Weeks (10-14d)', min: 10, max: 14 },
    { label: 'Deep Travel (15-21d)', min: 15, max: 21 },
  ];

  const continents = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-6 py-4.5 bg-neutral-950/60">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Customize Your Travel Criteria
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Adjust budget, duration, and lifestyle habits to surface up to 10 curated destinations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-7">
          {/* Section 1: Range of Money */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <label className="text-sm font-semibold text-neutral-200">
                  Range of Money (Total Trip Budget)
                </label>
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400 tabular-nums">
                {formatPrice(preferences.minMoney, preferences.currency)} — {formatPrice(preferences.maxMoney, preferences.currency)}
              </span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {budgetPresets.map((preset) => {
                const isActive =
                  preferences.minMoney === preset.min &&
                  preferences.maxMoney === preset.max;
                return (
                  <button
                    key={preset.label}
                    onClick={() =>
                      onUpdatePreferences({ minMoney: preset.min, maxMoney: preset.max })
                    }
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 hover:text-neutral-200'
                    }`}
                  >
                    {preset.label} ({formatPrice(preset.min, preferences.currency)}–{formatPrice(preset.max, preferences.currency)})
                  </button>
                );
              })}
            </div>

            {/* Sliders for Min and Max Money */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Minimum Budget:</span>
                  <span className="font-mono tabular-nums text-white">
                    {formatPrice(preferences.minMoney, preferences.currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={preferences.maxMoney - 100}
                  step={50}
                  value={preferences.minMoney}
                  onChange={(e) =>
                    onUpdatePreferences({ minMoney: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Maximum Budget:</span>
                  <span className="font-mono tabular-nums text-white">
                    {formatPrice(preferences.maxMoney, preferences.currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min={preferences.minMoney + 100}
                  max={8000}
                  step={100}
                  value={preferences.maxMoney}
                  onChange={(e) =>
                    onUpdatePreferences({ maxMoney: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Range of Days */}
          <div className="space-y-3 pt-2 border-t border-neutral-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-sky-400" />
                <label className="text-sm font-semibold text-neutral-200">
                  Range of Days (Duration)
                </label>
              </div>
              <span className="font-mono text-xs font-semibold text-sky-400 tabular-nums">
                {preferences.minDays} — {preferences.maxDays} Days
              </span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {durationPresets.map((preset) => {
                const isActive =
                  preferences.minDays === preset.min &&
                  preferences.maxDays === preset.max;
                return (
                  <button
                    key={preset.label}
                    onClick={() =>
                      onUpdatePreferences({ minDays: preset.min, maxDays: preset.max })
                    }
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                        : 'bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 hover:text-neutral-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Sliders for Min and Max Days */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Minimum Days:</span>
                  <span className="font-mono tabular-nums text-white">
                    {preferences.minDays} days
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={Math.min(preferences.maxDays, 20)}
                  step={1}
                  value={preferences.minDays}
                  onChange={(e) =>
                    onUpdatePreferences({ minDays: Number(e.target.value) })
                  }
                  className="w-full accent-sky-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Maximum Days:</span>
                  <span className="font-mono tabular-nums text-white">
                    {preferences.maxDays} days
                  </span>
                </div>
                <input
                  type="range"
                  min={preferences.minDays}
                  max={25}
                  step={1}
                  value={preferences.maxDays}
                  onChange={(e) =>
                    onUpdatePreferences({ maxDays: Number(e.target.value) })
                  }
                  className="w-full accent-sky-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Preferences Grid (Smoking, Drinking, Sport, Club) */}
          <div className="space-y-5 pt-2 border-t border-neutral-800/60">
            <h3 className="text-sm font-semibold text-neutral-200">
              Lifestyle & Atmosphere Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Smoking Preference */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                    Smoking Policy
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { key: 'friendly', label: 'Friendly', desc: 'Terrace & cafe smoking welcome' },
                      { key: 'strict', label: 'Strict Clean', desc: 'Strict bans & clean air' },
                      { key: 'flexible', label: 'Flexible', desc: 'Any policy is fine' },
                    ] as { key: SmokingPreference; label: string; desc: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => onUpdatePreferences({ smoking: opt.key })}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                        preferences.smoking === opt.key
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  {preferences.smoking === 'friendly' && 'Prefers destinations with accessible smoking terraces, shisha spots, and relaxed bylaws.'}
                  {preferences.smoking === 'strict' && 'Prioritizes destinations with strict non-smoking ordinances and pristine outdoor air.'}
                  {preferences.smoking === 'flexible' && 'No strict preference on smoking regulations.'}
                </p>
              </div>

              {/* Drinking Preference */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Wine className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                    Drinking Culture
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { key: 'high', label: 'Vibrant' },
                      { key: 'moderate', label: 'Casual' },
                      { key: 'dry', label: 'Low / Dry' },
                    ] as { key: DrinkingPreference; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => onUpdatePreferences({ drinking: opt.key })}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                        preferences.drinking === opt.key
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  {preferences.drinking === 'high' && 'Craft microbreweries, wine bodegas, cocktail mixology, and lively bar streets.'}
                  {preferences.drinking === 'moderate' && 'Casual dinner pairings, sunny spritzes, and relaxed patio drinks.'}
                  {preferences.drinking === 'dry' && 'Wellness retreats, zero-proof botanicals, artisan tea and fresh juiceries.'}
                </p>
              </div>

              {/* Sport Preference */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                    Sport & Outdoors
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { key: 'adventure', label: 'Adventure' },
                      { key: 'moderate', label: 'Active Walk' },
                      { key: 'relaxed', label: 'Leisure' },
                    ] as { key: SportPreference; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => onUpdatePreferences({ sport: opt.key })}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                        preferences.sport === opt.key
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  {preferences.sport === 'adventure' && 'Big wave surfing, alpine summits, downhill bike trails, via ferrata and extreme outdoor sports.'}
                  {preferences.sport === 'moderate' && 'Scenic waterfront jogging, scenic cycling loops, beach volleyball, and paddleboarding.'}
                  {preferences.sport === 'relaxed' && 'Gentle botanical walks, thermal spa baths, and slow-paced sightseeing.'}
                </p>
              </div>

              {/* Club / Nightlife Preference */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-pink-400" />
                  <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                    Club & Nightlife
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { key: 'clubs', label: 'Superclubs' },
                      { key: 'lounges', label: 'Lounges' },
                      { key: 'quiet', label: 'Quiet Nights' },
                    ] as { key: ClubPreference; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => onUpdatePreferences({ club: opt.key })}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                        preferences.club === opt.key
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/50 shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  {preferences.club === 'clubs' && 'Underground warehouse raves, mega beach day clubs, and world-class DJ residencies.'}
                  {preferences.club === 'lounges' && 'Chic jazz bars, sunset rooftop dancefloors, and indie music spaces.'}
                  {preferences.club === 'quiet' && 'Peaceful evenings, tranquil dining, early morning wakeups without bass noise.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Region / Continent Filter */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/60">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-sky-400" />
              <label className="text-sm font-semibold text-neutral-200">
                Geographic Region
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {continents.map((continent) => {
                const isActive = (preferences.selectedContinent || 'All') === continent;
                return (
                  <button
                    key={continent}
                    onClick={() => onUpdatePreferences({ selectedContinent: continent })}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {continent}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 px-6 py-4 bg-neutral-950/70">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">
              Matching:{' '}
              <strong className="text-sky-400 font-semibold font-mono tabular-nums">
                {matchingCount} options (max 10)
              </strong>
            </span>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition-colors shadow-sm"
            >
              <Check className="h-4 w-4" />
              <span>Apply & View Results</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
