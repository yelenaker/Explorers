import React, { useState, useMemo } from 'react';
import {
  Compass,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { MatchResult, UserPreferences } from '../types';
import { DestinationCard } from './DestinationCard';
import { formatPrice } from '../utils/format';

interface DestinationListProps {
  matches: MatchResult[];
  preferences: UserPreferences;
  selectedId: string | null;
  hoveredId: string | null;
  isBigger?: boolean;
  onSelectDestination: (id: string) => void;
  onHoverDestination: (id: string | null) => void;
  onOpenPreferences: () => void;
  onResetPreferences: () => void;
  onOpenDetails: (match: MatchResult) => void;
  onRelaxFilters: () => void;
}

type SortOption = 'match' | 'price-asc' | 'price-desc' | 'days';

export const DestinationList: React.FC<DestinationListProps> = ({
  matches,
  preferences,
  selectedId,
  hoveredId,
  isBigger = true,
  onSelectDestination,
  onHoverDestination,
  onOpenPreferences,
  onResetPreferences,
  onOpenDetails,
  onRelaxFilters,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('match');

  // Sort matched options (0 to 10 max)
  const sortedMatches = useMemo(() => {
    const list = [...matches];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.estimatedTotalCost - b.estimatedTotalCost);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.estimatedTotalCost - a.estimatedTotalCost);
    }
    if (sortBy === 'days') {
      return list.sort((a, b) => b.tripDays - a.tripDays);
    }
    return list;
  }, [matches, sortBy]);

  return (
    <section className="flex flex-col h-full bg-slate-50/40 border-r border-slate-200/80 overflow-hidden">
      {/* Sleek Minimal Sort Bar */}
      <div className="shrink-0 px-4 py-2.5 border-b border-slate-200/80 bg-white/90 backdrop-blur-md flex items-center justify-between text-xs text-slate-700 shadow-xs">
        <span className="font-semibold text-slate-700">
          <strong className="text-sky-600 font-bold">{sortedMatches.length}</strong> Destinations Available
        </span>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <span className="text-[11px] text-slate-500 px-1 hidden sm:inline font-medium">Sort:</span>
          <button
            onClick={() => setSortBy('match')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              sortBy === 'match'
                ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Match Score
          </button>
          <button
            onClick={() => setSortBy('price-asc')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              sortBy === 'price-asc'
                ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Price: Low
          </button>
          <button
            onClick={() => setSortBy('price-desc')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              sortBy === 'price-desc'
                ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Price: High
          </button>
          <button
            onClick={() => setSortBy('days')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              sortBy === 'days'
                ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Days
          </button>
        </div>
      </div>

      {/* Scrollable Destination & Events Cards Area */}
      <div className={`flex-1 overflow-y-auto ${isBigger ? 'p-5 sm:p-6 space-y-6' : 'p-4 space-y-4'}`}>
        {sortedMatches.length > 0 ? (
          sortedMatches.map((match) => (
            <DestinationCard
              key={match.destination.id}
              match={match}
              currency={preferences.currency}
              isBigger={isBigger}
              isSelected={selectedId === match.destination.id}
              isHovered={hoveredId === match.destination.id}
              onSelect={() => onSelectDestination(match.destination.id)}
              onMouseEnter={() => onHoverDestination(match.destination.id)}
              onMouseLeave={() => onHoverDestination(null)}
              onOpenDetails={() => onOpenDetails(match)}
            />
          ))
        ) : (
          /* Empty State (0 options) */
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-slate-300 bg-white/90 my-6 space-y-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 border border-amber-300 text-amber-700">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-base font-bold text-slate-900">
                0 Matching Destinations Found
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your combination of budget ({formatPrice(preferences.minMoney, preferences.currency)}–{formatPrice(preferences.maxMoney, preferences.currency)}),
                duration ({preferences.minDays}–{preferences.maxDays} days), and lifestyle constraints is currently too restrictive.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                onClick={onRelaxFilters}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-4 py-2 text-xs font-bold text-white hover:from-sky-600 hover:to-teal-600 transition-colors shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Relax Filters & View Top 10</span>
              </button>
              <button
                onClick={onResetPreferences}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
