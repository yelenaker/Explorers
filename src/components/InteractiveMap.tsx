import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Maximize2, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { MatchResult, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface InteractiveMapProps {
  matches: MatchResult[];
  selectedId: string | null;
  hoveredId: string | null;
  currency: CurrencyCode;
  onSelectDestination: (id: string) => void;
  onOpenDetails: (match: MatchResult) => void;
}

const TILE_LAYERS = {
  dark: {
    name: 'Dark Canvas',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  voyager: {
    name: 'Carto Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  matches,
  selectedId,
  hoveredId,
  currency,
  onSelectDestination,
  onOpenDetails,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [activeTileKey, setActiveTileKey] = useState<keyof typeof TILE_LAYERS>('dark');
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialCenter: [number, number] = [20, 15];
    const initialZoom = 2;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false, // Custom position
    });

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial tile layer
    const tileConfig = TILE_LAYERS[activeTileKey];
    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Markers layer group
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tile layer when activeTileKey changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const config = TILE_LAYERS[activeTileKey];
    tileLayerRef.current.setUrl(config.url);
  }, [activeTileKey]);

  // Update markers when matches, selectedId, or hoveredId change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    if (matches.length === 0) return;

    const latLngs: L.LatLngExpression[] = [];

    matches.forEach((item) => {
      const { destination, rank, matchScore, estimatedTotalCost, tripDays } = item;
      const isSelected = selectedId === destination.id;
      const isHovered = hoveredId === destination.id;
      latLngs.push(destination.coordinates);

      // Custom HTML Dot Icon
      const markerHtml = `
        <div class="custom-pin-marker">
          <div class="pin-dot ${isSelected ? 'is-active ring-4 ring-sky-400' : ''} ${isHovered ? 'scale-125' : ''}" style="
            background: ${matchScore >= 85 ? '#0284c7' : matchScore >= 70 ? '#0d9488' : '#d97706'};
          ">
            <span>${rank}</span>
            ${isSelected || isHovered ? '<div class="pin-pulse"></div>' : ''}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker(destination.coordinates, {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : isHovered ? 900 : rank * 10,
      });

      // Interactive Popup HTML
      const popupContent = document.createElement('div');
      popupContent.className = 'w-64 p-0 font-sans text-neutral-100';
      popupContent.innerHTML = `
        <div class="relative h-28 w-full overflow-hidden bg-neutral-900">
          <img src="${destination.image}" alt="${destination.name}" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          <div class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-900/90 text-white">
            #${rank}
          </div>
          <div class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/90 text-white font-mono">
            ${matchScore}% Match
          </div>
          <div class="absolute bottom-1.5 left-2.5 right-2.5">
            <h4 class="text-sm font-bold text-white leading-tight drop-shadow">${destination.name}, ${destination.country}</h4>
          </div>
        </div>
        <div class="p-3 space-y-2 bg-neutral-900">
          <div class="flex items-center justify-between text-xs">
            <span class="text-neutral-400">${tripDays} days estimate:</span>
            <span class="font-bold text-white font-mono">${formatPrice(estimatedTotalCost, currency)}</span>
          </div>
          <div class="text-[11px] text-neutral-300 line-clamp-1">
            <strong>Key Event:</strong> ${destination.events[0]?.title || 'City Exploration'}
          </div>
          <div class="flex gap-1.5 pt-1">
            <button id="popup-btn-${destination.id}" class="flex-1 py-1.5 px-2 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-semibold rounded text-center transition-colors">
              Select in List
            </button>
            <button id="popup-guide-${destination.id}" class="py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium rounded text-center transition-colors">
              Full Guide
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-destination-popup',
      });

      marker.on('click', () => {
        onSelectDestination(destination.id);
        setTimeout(() => {
          const btn = document.getElementById(`popup-btn-${destination.id}`);
          if (btn) {
            btn.onclick = () => onSelectDestination(destination.id);
          }
          const guideBtn = document.getElementById(`popup-guide-${destination.id}`);
          if (guideBtn) {
            guideBtn.onclick = () => onOpenDetails(item);
          }
        }, 50);
      });

      layer.addLayer(marker);

      // If this marker is selected, open popup
      if (isSelected) {
        marker.openPopup();
      }
    });

    // Auto-fit bounds if no individual selection is active and we have matches
    if (!selectedId && latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }
  }, [matches, selectedId, hoveredId, currency]);

  // When selectedId changes, smoothly fly to its coordinates
  useEffect(() => {
    if (!selectedId || !mapInstanceRef.current) return;
    const match = matches.find((m) => m.destination.id === selectedId);
    if (match) {
      mapInstanceRef.current.flyTo(match.destination.coordinates, 8, {
        duration: 1.4,
        easeLinearity: 0.25,
      });
    }
  }, [selectedId]);

  // Reset to view all destinations
  const handleFitAll = () => {
    if (!mapInstanceRef.current || matches.length === 0) return;
    const latLngs = matches.map((m) => m.destination.coordinates);
    const bounds = L.latLngBounds(latLngs);
    mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 });
  };

  return (
    <div className="relative h-full w-full bg-neutral-950 overflow-hidden flex flex-col">
      {/* Map Container Element */}
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Floating Map Controls & Info Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        {/* Fit All Button */}
        <button
          onClick={handleFitAll}
          disabled={matches.length === 0}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-neutral-800 hover:border-neutral-700 transition-colors disabled:opacity-50"
        >
          <Maximize2 className="h-3.5 w-3.5 text-sky-400" />
          <span>Fit All ({matches.length} Dots)</span>
        </button>

        {/* Tile Layer Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-neutral-800 transition-colors"
          >
            <Layers className="h-3.5 w-3.5 text-sky-400" />
            <span>Map Style</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-36 rounded-xl border border-neutral-800 bg-neutral-900 p-1 shadow-xl z-20">
              {(Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTileKey(key);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    activeTileKey === key
                      ? 'bg-sky-500/20 text-sky-300'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {TILE_LAYERS[key].name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Legend at Bottom Right */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-3 rounded-lg border border-neutral-800/80 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 text-[11px] text-neutral-300 shadow-lg">
        <span className="font-semibold text-neutral-400">Match score:</span>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500"></span>
          <span>90%+ High</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-500"></span>
          <span>75-89% Great</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          <span>60-74% Fair</span>
        </div>
      </div>

      {/* Empty State Banner Overlay if 0 matches */}
      {matches.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-neutral-950/60 backdrop-blur-xs pointer-events-none">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/95 p-5 text-center shadow-2xl max-w-sm pointer-events-auto">
            <MapPin className="h-8 w-8 text-neutral-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">No Destination Dots to Display</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Adjust your budget or lifestyle preferences on the left to populate the map with matching locations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
