import React, { useState, useMemo, useEffect } from 'react';
import { UserPreferences, MatchResult, CurrencyCode } from './types';
import { calculateDestinationMatches } from './utils/matching';
import { Header } from './components/Header';
import { PreferenceQuickBar } from './components/PreferenceQuickBar';
import { DestinationList } from './components/DestinationList';
import { InteractiveMap } from './components/InteractiveMap';
import { PreferenceWizard } from './components/PreferenceWizard';
import { DestinationDetailModal } from './components/DestinationDetailModal';

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
  };

  const handleSelectDestination = (id: string) => {
    setSelectedId(id);
    // Smooth scroll card into view in the list if in split/list mode
    const cardEl = document.getElementById(`dest-card-${id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 antialiased">
      {/* 1. Header (Adheres to Top Bar Contract) */}
      <Header
        currency={preferences.currency}
        onCurrencyChange={(c: CurrencyCode) => handleUpdatePreferences({ currency: c })}
        onOpenPreferences={() => setIsWizardOpen(true)}
        onResetPreferences={handleResetPreferences}
        matchesCount={matches.length}
      />

      {/* 2. Persistent Quick Filter Bar */}
      <PreferenceQuickBar
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
        onOpenFullWizard={() => setIsWizardOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        matchesCount={matches.length}
      />

      {/* 3. Main Split-Screen Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Destination & Events List (0 to 10 options) */}
        <div
          id="results"
          className={`h-full transition-all duration-300 ${
            viewMode === 'list'
              ? 'w-full'
              : viewMode === 'map'
              ? 'hidden'
              : 'w-full lg:w-1/2 xl:w-5/12 shrink-0'
          }`}
        >
          <DestinationList
            matches={matches}
            preferences={preferences}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelectDestination={handleSelectDestination}
            onHoverDestination={setHoveredId}
            onOpenPreferences={() => setIsWizardOpen(true)}
            onResetPreferences={handleResetPreferences}
            onOpenDetails={(match) => setActiveDetailMatch(match)}
            onRelaxFilters={handleRelaxFilters}
          />
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
            onSelectDestination={handleSelectDestination}
            onOpenDetails={(match) => setActiveDetailMatch(match)}
          />
        </div>
      </main>

      {/* 4. Full Preferences Wizard Modal */}
      <PreferenceWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
        onReset={handleResetPreferences}
        matchingCount={matches.length}
      />

      {/* 5. Destination & Event Deep-Dive Guide Modal */}
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
  );
};
