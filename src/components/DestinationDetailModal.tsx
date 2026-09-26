import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  DollarSign,
  Flame,
  Wine,
  Activity,
  Music,
  Clock,
  Ticket,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { MatchResult, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface DestinationDetailModalProps {
  match: MatchResult | null;
  currency: CurrencyCode;
  onClose: () => void;
  onFocusOnMap: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  match,
  currency,
  onClose,
  onFocusOnMap,
}) => {
  if (!match) return null;

  const { destination, rank, matchScore, estimatedTotalCost, tripDays, dailyCost, reasons, breakdown } = match;

  // Cost proportions
  const accommodationCost = Math.round(estimatedTotalCost * 0.42);
  const foodCost = Math.round(estimatedTotalCost * 0.28);
  const activitiesCost = Math.round(estimatedTotalCost * 0.18);
  const transitCost = estimatedTotalCost - (accommodationCost + foodCost + activitiesCost);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden text-neutral-200">
        {/* Modal Hero Banner */}
        <div className="relative h-60 w-full overflow-hidden bg-neutral-950">
          <img
            src={destination.image}
            alt={destination.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/80 backdrop-blur-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-700/60"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center justify-center h-8 px-2.5 rounded-lg bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 text-xs font-bold text-white shadow-md">
              Option #{rank}
            </span>
            <span className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-sky-500/20 backdrop-blur-md border border-sky-500/40 text-xs font-bold text-sky-300 shadow-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{matchScore}% Compatibility</span>
            </span>
          </div>

          {/* Hero Bottom Title */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow">
                {destination.name}
              </h2>
              <p className="text-sm text-neutral-300 font-medium drop-shadow flex items-center gap-2 mt-0.5">
                <span>{destination.country}</span>
                <span aria-hidden="true">·</span>
                <span>{destination.continent}</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-300 font-semibold">Best Season: {destination.bestSeason}</span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums drop-shadow">
                {formatPrice(estimatedTotalCost, currency)}
              </span>
              <p className="text-xs text-neutral-300 font-medium">
                {tripDays} days · {formatPrice(dailyCost, currency)}/day
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-7">
          {/* Tagline & Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400">
              {destination.tagline}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Compatibility Breakdown Bars */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Personalized Compatibility Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Budget Fit</span>
                  <span className="font-mono text-emerald-400 font-semibold">{breakdown.budget}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${breakdown.budget}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Duration Fit</span>
                  <span className="font-mono text-sky-400 font-semibold">{breakdown.days}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${breakdown.days}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Smoking Fit</span>
                  <span className="font-mono text-amber-400 font-semibold">{breakdown.smoking}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${breakdown.smoking}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Drinking Culture</span>
                  <span className="font-mono text-purple-400 font-semibold">{breakdown.drinking}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${breakdown.drinking}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Sport & Outdoors</span>
                  <span className="font-mono text-cyan-400 font-semibold">{breakdown.sport}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${breakdown.sport}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Club Scene</span>
                  <span className="font-mono text-pink-400 font-semibold">{breakdown.club}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${breakdown.club}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Curated Events & Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-sky-400" />
              <h4 className="text-sm font-bold text-white tracking-tight">
                Curated Events, Festivals & Activities
              </h4>
            </div>

            <div className="space-y-2.5">
              {destination.events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-sm font-semibold text-white">
                      {evt.title}
                    </h5>
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {evt.priceNote}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-neutral-500" />
                      {evt.timeframe}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                      {evt.location}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed pt-0.5">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Guidelines & Top Venues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Smoking Details */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="h-4 w-4" />
                <span>Smoking Regulations & Culture</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {destination.smokingPolicy}
              </p>
            </div>

            {/* Drinking Details */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Wine className="h-4 w-4" />
                <span>Beverage Scene & Culture</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {destination.drinkingScene}
              </p>
            </div>

            {/* Sport Facilities */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Activity className="h-4 w-4" />
                <span>Active Sports & Outdoor Pursuits</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                {destination.sportActivities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>

            {/* Nightclubs & Venues */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
                <Music className="h-4 w-4" />
                <span>Top Nightclubs & Evening Hotspots</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                {destination.clubVenues.map((venue, idx) => (
                  <li key={idx}>{venue}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Budget Breakdown Summary */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Estimated {tripDays}-Day Budget Allocation ({formatPrice(estimatedTotalCost, currency)})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-neutral-400 block text-[11px]">Lodging & Stays</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatPrice(accommodationCost, currency)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-neutral-400 block text-[11px]">Food & Dining</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatPrice(foodCost, currency)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-neutral-400 block text-[11px]">Activities & Nightlife</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatPrice(activitiesCost, currency)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-neutral-400 block text-[11px]">Local Transit</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatPrice(transitCost, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 px-6 py-4 bg-neutral-950/80">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            Close Guide
          </button>

          <button
            onClick={() => {
              onFocusOnMap();
              onClose();
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition-colors shadow-sm"
          >
            <MapPin className="h-4 w-4" />
            <span>Focus on Map Pin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
