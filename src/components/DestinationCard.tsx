import React, { useState } from 'react';
import {
  MapPin,
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
  isBigger?: boolean;
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
  isBigger = true,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  onOpenDetails,
}) => {
  const [isEventsExpanded, setIsEventsExpanded] = useState<boolean>(false);
  const { destination, rank, matchScore, estimatedTotalCost, tripDays, dailyCost, reasons } = match;

  const scoreColor =
    matchScore >= 88
      ? 'text-emerald-950 bg-emerald-100 border-emerald-300 shadow-xs'
      : matchScore >= 75
      ? 'text-sky-950 bg-sky-100 border-sky-300 shadow-xs'
      : 'text-amber-950 bg-amber-100 border-amber-300 shadow-xs';

  return (
    <article
      id={`dest-card-${destination.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${
        isSelected
          ? 'border-sky-500 bg-white ring-2 ring-sky-400 shadow-2xl shadow-sky-500/15 scale-[1.01]'
          : isHovered
          ? 'border-slate-300 bg-white shadow-xl scale-[1.005]'
          : 'border-slate-200/90 bg-white/95 hover:border-slate-300 hover:shadow-lg shadow-sm'
      }`}
    >
      {/* Top Media & Header Banner */}
      <div className={`relative w-full overflow-hidden bg-slate-900 ${isBigger ? 'h-64 sm:h-72 lg:h-80' : 'h-48'}`}>
        <img
          src={destination.image}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Rank Number Badge */}
        <div className={`absolute top-4 left-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 font-black text-white shadow-xl shadow-rose-500/30 border border-white/30 ${
          isBigger ? 'h-11 w-11 text-base' : 'h-8 w-8 text-xs'
        }`}>
          #{rank}
        </div>

        {/* Match Percentage Indicator */}
        <div
          className={`absolute top-4 right-4 flex items-center gap-1.5 rounded-2xl font-black backdrop-blur-md border shadow-md ${scoreColor} ${
            isBigger ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'
          }`}
        >
          <Sparkles className={isBigger ? 'h-4 w-4 text-emerald-600' : 'h-3.5 w-3.5 text-emerald-600'} />
          <span className="font-mono tabular-nums">{matchScore}% Match</span>
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className={`font-black text-white tracking-tight drop-shadow-md ${
                isBigger ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'
              }`}>
                {destination.name}
              </h3>
              <p className={`text-slate-200 font-semibold drop-shadow flex items-center gap-1.5 mt-0.5 ${
                isBigger ? 'text-sm' : 'text-xs'
              }`}>
                <span className="text-white font-bold">{destination.country}</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-slate-200">{destination.continent}</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-sky-300 font-bold">{destination.bestSeason}</span>
              </p>
            </div>

            {/* Price Badge */}
            <div className="text-right shrink-0">
              <span className={`font-black text-emerald-300 font-mono tabular-nums drop-shadow-md block ${
                isBigger ? 'text-2xl sm:text-3xl' : 'text-lg'
              }`}>
                {formatPrice(estimatedTotalCost, currency)}
              </span>
              <p className={`text-slate-200 font-medium ${isBigger ? 'text-xs' : 'text-[10px]'}`}>
                {tripDays} days · {formatPrice(dailyCost, currency)}/day
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card Content */}
      <div className={`space-y-4 ${isBigger ? 'p-5 sm:p-6' : 'p-4'}`}>
        <p className={`text-slate-700 leading-relaxed font-normal ${isBigger ? 'text-sm sm:text-base' : 'text-xs'}`}>
          {destination.description}
        </p>

        {/* Suitability Highlights for Smoking, Drinking, Sport, Club */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Smoking Status */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <Flame className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Smoking
              </span>
              <span className="text-xs text-slate-800 font-semibold line-clamp-1" title={destination.smokingPolicy}>
                {destination.smokingRating >= 4 ? 'Terrace friendly' : destination.smokingRating <= 2 ? 'Strict smoke-free' : 'Designated zones'}
              </span>
            </div>
          </div>

          {/* Drinking Status */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <Wine className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Drinking Scene
              </span>
              <span className="text-xs text-slate-800 font-semibold line-clamp-1" title={destination.drinkingScene}>
                {destination.drinkingRating >= 4 ? 'World-class bars' : destination.drinkingRating === 3 ? 'Social & casual' : 'Low-key cafes'}
              </span>
            </div>
          </div>

          {/* Sport Status */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <Activity className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Sport & Adventure
              </span>
              <span className="text-xs text-slate-800 font-semibold line-clamp-1" title={destination.sportActivities.join(', ')}>
                {destination.sportActivities[0] || 'Active outdoors'}
              </span>
            </div>
          </div>

          {/* Club Status */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <Music className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Club & Nightlife
              </span>
              <span className="text-xs text-slate-800 font-semibold line-clamp-1" title={destination.clubVenues.join(', ')}>
                {destination.clubVenues[0] || 'Lounge culture'}
              </span>
            </div>
          </div>
        </div>

        {/* Why it matches reasons */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-bold text-amber-700">Why it matches:</span>
          {reasons.map((reason, idx) => (
            <React.Fragment key={idx}>
              <span className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 font-medium">{reason}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Curated Events Preview */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsEventsExpanded(!isEventsExpanded)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 transition-colors"
            >
              <Ticket className="h-4 w-4 text-amber-600" />
              <span>{destination.events.length} Curated Events & Highlights</span>
              {isEventsExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            <span className="text-xs text-slate-500 font-mono">
              {destination.coordinates[0].toFixed(2)}°N, {destination.coordinates[1].toFixed(2)}°E
            </span>
          </div>

          {/* Expandable Events List */}
          {isEventsExpanded && (
            <div className="mt-3 space-y-2 pt-1 animate-in fade-in duration-200">
              {destination.events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs sm:text-sm space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900">
                      {evt.title}
                    </span>
                    <span className="text-xs text-emerald-700 font-bold shrink-0 font-mono">
                      {evt.priceNote}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {evt.timeframe}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Action Controls */}
        <div className="flex items-center justify-between pt-2 gap-3">
          <button
            onClick={onSelect}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-98 ${
              isSelected
                ? 'bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 text-white shadow-sky-500/20 ring-2 ring-sky-300'
                : 'bg-slate-100 text-slate-800 hover:bg-sky-50 hover:text-sky-700 border border-slate-200'
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>{isSelected ? 'Focused on Interactive Map' : 'View on Interactive Map'}</span>
          </button>

          <button
            onClick={onOpenDetails}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 px-4 py-3 text-xs sm:text-sm font-bold text-sky-800 transition-colors shadow-xs"
          >
            <span>Full Guide</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
