import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Compass,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Flame,
  Wine,
  Activity,
  Music,
  Check
} from 'lucide-react';
import { MatchResult, UserPreferences, CurrencyCode } from '../types';
import { DestinationCard } from './DestinationCard';
import { formatPrice } from '../utils/format';

interface DestinationListProps {
  matches: MatchResult[];
  preferences: UserPreferences;
  selectedId: string | null;
  hoveredId: string | null;
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
  onSelectDestination,
  onHoverDestination,
  onOpenPreferences,
  onResetPreferences,
  onOpenDetails,
  onRelaxFilters,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('match');

  // Sorted list
  const sortedMatches = useMemo(() => {
    const list = [...matches];
    if (sortBy === 'match') {
      return list.sort((a, b) => b.matchScore - a.matchScore);
    }
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
    <section className="flex flex-col h-full bg-neutral-950/60 border-r border-neutral-800/80 overflow-hidden">
      {/* List Header & Controls */}
      <div className="shrink-0 p-4 border-b border-neutral-800/80 bg-neutral-900/40 space-y-3">
        {/* Title & Criteria chips */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Recommended Destinations
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 tabular-nums">
                {sortedMatches.length} / 10 options
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Ranked by lifestyle preferences and budget algorithm
            </p>
          </div>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/90 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors shrink-0 shadow-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-sky-400" />
            <span>Filters</span>
          </button>
        </div>

        {/* Current Filter Pills Summary (interactive buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2 py-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <span className="text-neutral-400">Budget:</span>
            <span className="font-mono font-medium text-emerald-400 tabular-nums">
              {formatPrice(preferences.minMoney, preferences.currency)}–{formatPrice(preferences.maxMoney, preferences.currency)}
            </span>
          </button>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2 py-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <span className="text-neutral-400">Days:</span>
            <span className="font-mono font-medium text-sky-400 tabular-nums">
              {preferences.minDays}–{preferences.maxDays}d
            </span>
          </button>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2 py-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <Flame className="h-3 w-3 text-amber-400" />
            <span className="capitalize">{preferences.smoking}</span>
          </button>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2 py-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <Wine className="h-3 w-3 text-purple-400" />
            <span className="capitalize">{preferences.drinking}</span>
          </button>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2 py-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <Activity className="h-3 w-3 text-cyan-400" />
            <span className="capitalize">{preferences.sport}</span>
          </button>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2 py-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <Music className="h-3 w-3 text-pink-400" />
            <span className="capitalize">{preferences.club}</span>
          </button>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-800/50 text-xs text-neutral-400">
          <span className="flex items-center gap-1 font-medium">
            <ArrowUpDown className="h-3.5 w-3.5 text-neutral-500" />
            <span>Sort results:</span>
          </span>

          <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-neutral-800">
            <button
              onClick={() => setSortBy('match')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'match'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Match Score
            </button>
            <button
              onClick={() => setSortBy('price-asc')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'price-asc'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cost: Low
            </button>
            <button
              onClick={() => setSortBy('price-desc')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'price-desc'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cost: High
            </button>
            <button
              onClick={() => setSortBy('days')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'days'
                  ? 'bg-neutral-800 text-sky-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Days
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Destination & Events Cards Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMatches.length > 0 ? (
          sortedMatches.map((match) => (
            <DestinationCard
              key={match.destination.id}
              match={match}
              currency={preferences.currency}
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
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 my-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-base font-bold text-white">
                0 Matching Destinations Found
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your combination of budget ({formatPrice(preferences.minMoney, preferences.currency)}–{formatPrice(preferences.maxMoney, preferences.currency)}),
                duration ({preferences.minDays}–{preferences.maxDays} days), and lifestyle constraints is currently too restrictive.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                onClick={onRelaxFilters}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition-colors shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Relax Filters & View Top 10</span>
              </button>
              <button
                onClick={onResetPreferences}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
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
