import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, X, Sparkles, Check } from 'lucide-react';

interface LocationWindowProps {
  currentLocation: string | null;
  onSetLocation: (locationName: string, coordinates?: [number, number]) => void;
  isOpen: boolean;
  onClose?: () => void;
  matchesCount: number;
}

const PRESET_LOCATIONS = [
  {
    name: 'Nice, French Riviera',
    label: 'Nice · Riviera',
    coords: [43.7102, 7.2620] as [number, number],
    color: 'from-sky-50 to-blue-100 text-sky-950 border-sky-300 hover:border-sky-500',
    dot: 'bg-sky-500',
  },
  {
    name: 'Cannes, French Riviera',
    label: 'Cannes',
    coords: [43.5528, 7.0174] as [number, number],
    color: 'from-rose-50 to-pink-100 text-rose-950 border-rose-300 hover:border-rose-500',
    dot: 'bg-rose-500',
  },
  {
    name: 'Monaco',
    label: 'Monaco',
    coords: [43.7384, 7.4246] as [number, number],
    color: 'from-amber-50 to-yellow-100 text-amber-950 border-amber-300 hover:border-amber-500',
    dot: 'bg-amber-500',
  },
  {
    name: 'Paris, France',
    label: 'Paris',
    coords: [48.8566, 2.3522] as [number, number],
    color: 'from-emerald-50 to-teal-100 text-emerald-950 border-emerald-300 hover:border-emerald-500',
    dot: 'bg-emerald-500',
  },
  {
    name: 'London, UK',
    label: 'London',
    coords: [51.5074, -0.1278] as [number, number],
    color: 'from-indigo-50 to-purple-100 text-indigo-950 border-indigo-300 hover:border-indigo-500',
    dot: 'bg-indigo-500',
  },
  {
    name: 'Berlin, Germany',
    label: 'Berlin',
    coords: [52.5200, 13.4050] as [number, number],
    color: 'from-orange-50 to-amber-100 text-orange-950 border-orange-300 hover:border-orange-500',
    dot: 'bg-orange-500',
  },
  {
    name: 'New York, USA',
    label: 'New York',
    coords: [40.7128, -74.0060] as [number, number],
    color: 'from-pink-50 to-fuchsia-100 text-pink-950 border-pink-300 hover:border-pink-500',
    dot: 'bg-pink-500',
  },
];

export const LocationWindow: React.FC<LocationWindowProps> = ({
  currentLocation,
  onSetLocation,
  isOpen,
  onClose,
  matchesCount,
}) => {
  const [inputValue, setInputValue] = useState<string>(currentLocation || '');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [detectionError, setDetectionError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      const preset = PRESET_LOCATIONS.find(
        (p) =>
          p.name.toLowerCase() === trimmed.toLowerCase() ||
          p.label.toLowerCase() === trimmed.toLowerCase()
      );
      onSetLocation(trimmed, preset?.coords);
    } else {
      onSetLocation('Nice, French Riviera', [43.7102, 7.2620]);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_LOCATIONS[0]) => {
    setInputValue(preset.name);
    onSetLocation(preset.name, preset.coords);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setDetectionError('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    setDetectionError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetecting(false);
        const { latitude, longitude } = pos.coords;

        let closest = PRESET_LOCATIONS[0];
        let minDistance = Infinity;

        PRESET_LOCATIONS.forEach((p) => {
          const d = Math.hypot(p.coords[0] - latitude, p.coords[1] - longitude);
          if (d < minDistance) {
            minDistance = d;
            closest = p;
          }
        });

        if (minDistance < 1.0) {
          setInputValue(closest.name);
          onSetLocation(closest.name, [latitude, longitude]);
        } else {
          const formatted = `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`;
          setInputValue(formatted);
          onSetLocation(formatted, [latitude, longitude]);
        }
      },
      (err) => {
        setIsDetecting(false);
        setDetectionError('Could not detect automatically. Pick a city below!');
        console.warn('Geolocation error:', err.message);
      },
      { timeout: 7000 }
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
      {/* Outer Glowing Gradient Border Container */}
      <div className="relative w-full max-w-lg rounded-3xl p-[2px] bg-gradient-to-r from-sky-400 via-amber-300 to-rose-400 shadow-2xl shadow-sky-500/20 animate-in fade-in zoom-in-95 duration-200">
        {/* Inner Card Container: Crisp White Theme */}
        <div className="relative rounded-[22px] bg-white/95 backdrop-blur-2xl p-6 sm:p-8 text-slate-900 shadow-xl">
          {/* Optional close button */}
          {currentLocation && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Simplistic & Colourful Header */}
          <div className="mb-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sky-100 via-teal-100 to-amber-100 border border-sky-300 text-xs font-bold text-sky-900 mb-3 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>French Riviera Departure Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              What is your location?
            </h1>
            <p className="mt-2 text-sm text-slate-600 font-normal">
              Choose your departure point to personalize journeys, distances, and budgets.
            </p>
          </div>

          {/* Simplistic Input & Submit */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 h-5 w-5 text-sky-600 pointer-events-none" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type any city (e.g. Nice, Paris, London...)"
                autoFocus
                className="w-full rounded-xl border border-slate-300 bg-slate-50/90 py-3.5 pl-11 pr-28 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-400/20 focus:outline-none transition-all shadow-xs"
              />
              <button
                type="submit"
                className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 hover:from-sky-600 hover:to-emerald-500 px-4 py-2 text-xs font-bold text-white transition-transform active:scale-95 shadow-md"
              >
                <span>Find</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Auto-Detect */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetecting}
                className="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-semibold transition-colors disabled:opacity-50"
              >
                <Navigation className={`h-3.5 w-3.5 text-sky-600 ${isDetecting ? 'animate-spin' : ''}`} />
                <span>{isDetecting ? 'Detecting...' : 'Auto-detect current location'}</span>
              </button>

              {currentLocation && (
                <span className="text-[11px] text-emerald-700 inline-flex items-center gap-1 font-bold">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{currentLocation}</span>
                </span>
              )}
            </div>

            {detectionError && (
              <p className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {detectionError}
              </p>
            )}

            {/* Colourful City Grid (Simplistic 1-click select) */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Quick One-Click Cities
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_LOCATIONS.map((preset) => {
                  const isSelected = currentLocation === preset.name;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border bg-gradient-to-r transition-all transform active:scale-95 shadow-xs ${
                        preset.color
                      } ${
                        isSelected
                          ? 'ring-2 ring-sky-600 font-extrabold scale-105 shadow-md'
                          : 'opacity-90 hover:opacity-100 hover:scale-102'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${preset.dot}`} />
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simplistic Bottom Dismiss */}
            {onClose && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
                >
                  Explore all destinations directly ({matchesCount} spots) →
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
