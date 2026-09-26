import React, { useState, useMemo, useEffect } from 'react';
import { UserPreferences, MatchResult, CurrencyCode } from './types';
import { calculateDestinationMatches } from './utils/matching';
import { Header } from './components/Header';
import { PreferenceQuickBar } from './components/PreferenceQuickBar';
import { DestinationList } from './components/DestinationList';
import { InteractiveMap } from './components/InteractiveMap';
import { PreferenceWizard } from './components/PreferenceWizard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { RivieraBackground } from './components/RivieraBackground';
import { LocationWindow } from './components/LocationWindow';
import { TopRivieraBanner } from './components/TopRivieraBanner';

const DEFAULT_PREFERENCES: UserPreferences = {
  minMoney: 600,
  maxMoney: 2200,
  minDays: 4,
  maxDays: 8,
  smoking: 'friendly',
  drinking: 'high',
  sport: 'adventure',
  club: 'clubs',
  currency: 'USD',
  selectedContinent: 'All',
};

export const App: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [activeDetailMatch, setActiveDetailMatch] = useState<MatchResult | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');

  // Location State: center question window is open by default
  const [userLocation, setUserLocation] = useState<string | null>(() => {
    return localStorage.getItem('explorers_user_location') || null;
  });
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(() => {
    const saved = localStorage.getItem('explorers_user_coords');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2) return parsed as [number, number];
      } catch {
        // ignore
      }
    }
    return null;
  });
  
  // Show "What is your location?" window at screen center on initial load
  const [isLocationWindowOpen, setIsLocationWindowOpen] = useState<boolean>(true);

  // User selected preferences flag
  const [hasSelectedPreferences, setHasSelectedPreferences] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('explorers_user_location'));
  });

  // Compute matches (strictly 0 to 10 options)
  const matches = useMemo(() => {
    return calculateDestinationMatches(preferences);
  }, [preferences]);

  // Keep selectedId valid when matches update
  useEffect(() => {
    if (matches.length > 0) {
      const stillExists = matches.some((m) => m.destination.id === selectedId);
      if (!stillExists) {
        setSelectedId(matches[0].destination.id);
      }
    } else {
      setSelectedId(null);
    }
  }, [matches, selectedId]);

  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updated }));
    setHasSelectedPreferences(true);
  };

  const handleResetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  const handleRelaxFilters = () => {
    setPreferences((prev) => ({
      ...prev,
      minMoney: 300,
      maxMoney: 4000,
      minDays: 3,
      maxDays: 14,
      smoking: 'flexible',
      selectedContinent: 'All',
    }));
    setHasSelectedPreferences(true);
  };

  const handleSelectDestination = (id: string) => {
    setSelectedId(id);
    const cardEl = document.getElementById(`dest-card-${id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSetLocation = (name: string, coords?: [number, number]) => {
    setUserLocation(name);
    localStorage.setItem('explorers_user_location', name);
    if (coords) {
      setUserCoordinates(coords);
      localStorage.setItem('explorers_user_coords', JSON.stringify(coords));
    }
    setIsLocationWindowOpen(false);
    setHasSelectedPreferences(true);
  };

  return (
    <RivieraBackground>
      <div className="flex flex-col h-screen w-screen overflow-hidden text-slate-900 antialiased font-sans">
        {/* 1. Sticky Header - Sticks permanently to the very top of the website */}
        <Header
          currency={preferences.currency}
          onCurrencyChange={(c: CurrencyCode) => handleUpdatePreferences({ currency: c })}
          onOpenPreferences={() => setIsWizardOpen(true)}
          onResetPreferences={handleResetPreferences}
          matchesCount={matches.length}
          currentLocation={userLocation}
          onOpenLocationWindow={() => setIsLocationWindowOpen(true)}
        />

        {/* 2. Top of Screen: French Riviera Picture Banner (Compact after preferences selected) */}
        <TopRivieraBanner
          currentLocation={userLocation}
          onOpenLocationWindow={() => setIsLocationWindowOpen(true)}
          isCompact={hasSelectedPreferences}
        />

        {/* 3. Persistent Minimalist Quick Filter Bar */}
        <PreferenceQuickBar
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
          onOpenFullWizard={() => setIsWizardOpen(true)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          matchesCount={matches.length}
        />

        {/* 4. Main Split-Screen Workspace (Translucent frosted glass over Riviera video) */}
        <main className="flex-1 flex overflow-hidden relative">
          {/* Left Pane: Destination & Events List (Bigger when preferences selected) */}
          <div
            id="results"
            className={`h-full transition-all duration-300 ${
              viewMode === 'list'
                ? 'w-full'
                : viewMode === 'map'
                ? 'hidden'
                : hasSelectedPreferences
                ? 'w-full lg:w-3/5 xl:w-2/3 shrink-0'
                : 'w-full lg:w-1/2 xl:w-5/12 shrink-0'
            }`}
          >
            <div className="h-full bg-white/80 backdrop-blur-md overflow-hidden border-r border-slate-200/80 shadow-xs">
              <DestinationList
                matches={matches}
                preferences={preferences}
                selectedId={selectedId}
                hoveredId={hoveredId}
                isBigger={hasSelectedPreferences}
                onSelectDestination={handleSelectDestination}
                onHoverDestination={setHoveredId}
                onOpenPreferences={() => setIsWizardOpen(true)}
                onResetPreferences={handleResetPreferences}
                onOpenDetails={(match) => setActiveDetailMatch(match)}
                onRelaxFilters={handleRelaxFilters}
              />
            </div>
          </div>

          {/* Right Pane: Interactive Map with Dots */}
          <div
            id="map-section"
            className={`h-full transition-all duration-300 ${
              viewMode === 'map'
                ? 'w-full'
                : viewMode === 'list'
                ? 'hidden'
                : 'hidden lg:block lg:w-1/2 xl:w-7/12 flex-1'
            }`}
          >
            <InteractiveMap
              matches={matches}
              selectedId={selectedId}
              hoveredId={hoveredId}
              currency={preferences.currency}
              viewMode={viewMode}
              onSelectDestination={handleSelectDestination}
              onOpenDetails={(match) => setActiveDetailMatch(match)}
            />
          </div>
        </main>

        {/* 4. Center Window: "What is your location?" */}
        <LocationWindow
          currentLocation={userLocation}
          onSetLocation={handleSetLocation}
          isOpen={isLocationWindowOpen}
          onClose={() => setIsLocationWindowOpen(false)}
          matchesCount={matches.length}
        />

        {/* 5. Full Preferences Wizard Modal */}
        <PreferenceWizard
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
          onReset={handleResetPreferences}
          matchingCount={matches.length}
        />

        {/* 6. Destination & Event Deep-Dive Guide Modal */}
        <DestinationDetailModal
          match={activeDetailMatch}
          currency={preferences.currency}
          onClose={() => setActiveDetailMatch(null)}
          onFocusOnMap={() => {
            if (activeDetailMatch) {
              handleSelectDestination(activeDetailMatch.destination.id);
              if (viewMode === 'list') {
                setViewMode('split');
              }
            }
          }}
        />
      </div>
    </RivieraBackground>
  );
};
