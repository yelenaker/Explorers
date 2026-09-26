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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden text-slate-800">
        {/* Modal Hero Banner */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-950 hover:bg-white transition-colors border border-slate-200/80 shadow-sm"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center justify-center h-8 px-3 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 text-xs font-black text-white shadow-md">
              Option #{rank}
            </span>
            <span className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-xs font-bold text-sky-900 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>{matchScore}% Compatibility</span>
            </span>
          </div>

          {/* Hero Bottom Title */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {destination.name}
              </h2>
              <p className="text-sm text-slate-200 font-semibold drop-shadow flex items-center gap-2 mt-0.5">
                <span className="text-white">{destination.country}</span>
                <span aria-hidden="true">·</span>
                <span>{destination.continent}</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-300 font-bold">Best Season: {destination.bestSeason}</span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xl sm:text-2xl font-black text-emerald-300 font-mono tabular-nums drop-shadow-md">
                {formatPrice(estimatedTotalCost, currency)}
              </span>
              <p className="text-xs text-slate-200 font-medium">
                {tripDays} days · {formatPrice(dailyCost, currency)}/day
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-7">
          {/* Tagline & Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700">
              {destination.tagline}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {destination.description}
            </p>
          </div>

          {/* Compatibility Breakdown Bars */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Personalized Compatibility Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Budget Fit</span>
                  <span className="font-mono text-emerald-700 font-bold">{breakdown.budget}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${breakdown.budget}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Duration Fit</span>
                  <span className="font-mono text-sky-700 font-bold">{breakdown.days}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${breakdown.days}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Smoking Fit</span>
                  <span className="font-mono text-amber-700 font-bold">{breakdown.smoking}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${breakdown.smoking}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Drinking Culture</span>
                  <span className="font-mono text-purple-700 font-bold">{breakdown.drinking}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${breakdown.drinking}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Sport & Outdoors</span>
                  <span className="font-mono text-cyan-700 font-bold">{breakdown.sport}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${breakdown.sport}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Club Scene</span>
                  <span className="font-mono text-pink-700 font-bold">{breakdown.club}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${breakdown.club}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Curated Events & Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-sky-600" />
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Curated Events, Festivals & Activities
              </h4>
            </div>

            <div className="space-y-2.5">
              {destination.events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-sm font-bold text-slate-900">
                      {evt.title}
                    </h5>
                    <span className="text-xs text-emerald-700 font-bold font-mono">
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
          </div>

          {/* Budget Breakdown Analysis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Estimated Budget Breakdown ({tripDays} Days)
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-500 font-medium block">Accommodation</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                  {formatPrice(accommodationCost, currency)}
                </span>
                <span className="text-[10px] text-slate-500">42% of budget</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-500 font-medium block">Dining & Drinks</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                  {formatPrice(foodCost, currency)}
                </span>
                <span className="text-[10px] text-slate-500">28% of budget</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-500 font-medium block">Activities & Sports</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                  {formatPrice(activitiesCost, currency)}
                </span>
                <span className="text-[10px] text-slate-500">18% of budget</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-500 font-medium block">Transit & Other</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                  {formatPrice(transitCost, currency)}
                </span>
                <span className="text-[10px] text-slate-500">12% of budget</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
          <span className="text-xs text-slate-500 font-medium">
            Coordinates: {destination.coordinates[0].toFixed(2)}°N, {destination.coordinates[1].toFixed(2)}°E
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            >
              Close
            </button>
            <button
              onClick={() => {
                onFocusOnMap();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 hover:from-sky-600 hover:to-emerald-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-md active:scale-95"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Focus on Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
