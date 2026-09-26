import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Flame,
  Wine,
  Activity,
  Music,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Ticket,
  Clock,
  Sparkles
} from 'lucide-react';
import { MatchResult, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface DestinationCardProps {
  match: MatchResult;
  currency: CurrencyCode;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpenDetails: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  match,
  currency,
  isSelected,
  isHovered,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  onOpenDetails,
}) => {
  const [isEventsExpanded, setIsEventsExpanded] = useState<boolean>(false);
  const { destination, rank, matchScore, estimatedTotalCost, tripDays, dailyCost, reasons } = match;

  const scoreColor =
    matchScore >= 88
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      : matchScore >= 75
      ? 'text-sky-400 bg-sky-500/10 border-sky-500/30'
      : 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  return (
    <article
      id={`dest-card-${destination.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative rounded-xl border transition-all duration-200 overflow-hidden ${
        isSelected
          ? 'border-sky-500 bg-neutral-900/95 ring-1 ring-sky-500/40 shadow-lg shadow-sky-500/10'
          : isHovered
          ? 'border-neutral-700 bg-neutral-900/80 shadow-md'
          : 'border-neutral-800/90 bg-neutral-900/40 hover:border-neutral-700/80 hover:bg-neutral-900/70'
      }`}
    >
      {/* Top Media & Header Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
        <img
          src={destination.image}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        {/* Rank Number Badge */}
        <div className="absolute top-3 left-3 flex items-center justify-center h-7 w-7 rounded-lg bg-neutral-900/90 backdrop-blur-md border border-neutral-700/70 text-xs font-bold text-white shadow-md">
          #{rank}
        </div>

        {/* Match Percentage Indicator */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold backdrop-blur-md border shadow-md ${scoreColor}`}
        >
          <Sparkles className="h-3 w-3" />
          <span className="font-mono tabular-nums">{matchScore}% Match</span>
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-sm">
                {destination.name}
              </h3>
              <p className="text-xs text-neutral-300 font-medium drop-shadow-sm flex items-center gap-1">
                <span>{destination.country}</span>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span>{destination.continent}</span>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span className="text-sky-300">{destination.bestSeason}</span>
              </p>
            </div>
            {/* Price Badge */}
            <div className="text-right shrink-0">
              <span className="text-base font-bold text-white font-mono tabular-nums drop-shadow-sm">
                {formatPrice(estimatedTotalCost, currency)}
              </span>
              <p className="text-[10px] text-neutral-300 font-medium">
                {tripDays} days ({formatPrice(dailyCost, currency)}/day)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 space-y-3.5">
        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
          {destination.description}
        </p>

        {/* Suitability Highlights for Smoking, Drinking, Sport, Club */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Smoking Status */}
          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80">
            <Flame className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-semibold text-neutral-400 block tracking-wider">
                Smoking
              </span>
              <span className="text-[11px] text-neutral-200 line-clamp-1" title={destination.smokingPolicy}>
                {destination.smokingRating >= 4 ? 'Terrace friendly' : destination.smokingRating <= 2 ? 'Strict smoke-free' : 'Designated zones'}
              </span>
            </div>
          </div>

          {/* Drinking Status */}
          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80">
            <Wine className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-semibold text-neutral-400 block tracking-wider">
                Drinking Scene
              </span>
              <span className="text-[11px] text-neutral-200 line-clamp-1" title={destination.drinkingScene}>
                {destination.drinkingRating >= 4 ? 'World-class bars' : destination.drinkingRating === 3 ? 'Social & casual' : 'Low-key cafes'}
              </span>
            </div>
          </div>

          {/* Sport Status */}
          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80">
            <Activity className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-semibold text-neutral-400 block tracking-wider">
                Sport & Adventure
              </span>
              <span className="text-[11px] text-neutral-200 line-clamp-1" title={destination.sportActivities.join(', ')}>
                {destination.sportActivities[0] || 'Active outdoors'}
              </span>
            </div>
          </div>

          {/* Club Status */}
          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/80">
            <Music className="h-3.5 w-3.5 text-pink-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-semibold text-neutral-400 block tracking-wider">
                Club & Nightlife
              </span>
              <span className="text-[11px] text-neutral-200 line-clamp-1" title={destination.clubVenues.join(', ')}>
                {destination.clubVenues[0] || 'Lounge culture'}
              </span>
            </div>
          </div>
        </div>

        {/* Why it matches reasons */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
          <span className="font-semibold text-neutral-300">Why it matches:</span>
          {reasons.map((reason, idx) => (
            <React.Fragment key={idx}>
              <span className="text-neutral-300">{reason}</span>
              {idx < reasons.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Curated Events Preview */}
        <div className="pt-2 border-t border-neutral-800/60">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsEventsExpanded(!isEventsExpanded)}
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>{destination.events.length} Curated Events & Highlights</span>
              {isEventsExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>

            <span className="text-[11px] text-neutral-500 font-mono">
              Coordinates: {destination.coordinates[0].toFixed(2)}, {destination.coordinates[1].toFixed(2)}
            </span>
          </div>

          {/* Expandable Events List */}
          {isEventsExpanded && (
            <div className="mt-3 space-y-2 pt-1">
              {destination.events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-lg bg-neutral-950/70 border border-neutral-800 p-2.5 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-neutral-200">
                      {evt.title}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium shrink-0 font-mono">
                      {evt.priceNote}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-neutral-500" />
                      {evt.timeframe}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.location}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Action Controls */}
        <div className="flex items-center justify-between pt-1 gap-2">
          <button
            onClick={onSelect}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{isSelected ? 'Focused on Map' : 'Focus on Map'}</span>
          </button>

          <button
            onClick={onOpenDetails}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <span>Full Guide</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
