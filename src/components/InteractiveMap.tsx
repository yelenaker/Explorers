import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Maximize2, MapPin } from 'lucide-react';
import { MatchResult, CurrencyCode } from '../types';
import { formatPrice } from '../utils/format';

interface InteractiveMapProps {
  matches: MatchResult[];
  selectedId: string | null;
  hoveredId: string | null;
  currency: CurrencyCode;
  viewMode?: 'split' | 'list' | 'map';
  onSelectDestination: (id: string) => void;
  onOpenDetails: (match: MatchResult) => void;
}

const TILE_LAYERS = {
  osm: {
    name: 'OpenStreetMap',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: 'abc',
  },
  osmHot: {
    name: 'OSM Humanitarian',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>, style by <a href="https://www.hotosm.org/" target="_blank" rel="noopener">Humanitarian OSM</a>',
    maxZoom: 19,
    subdomains: 'abc',
  },
  cartoVoyager: {
    name: 'Carto Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    maxZoom: 19,
    subdomains: 'abcd',
  },
  cartoDark: {
    name: 'Dark Mode',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    maxZoom: 19,
    subdomains: 'abcd',
  },
};

function isValidCoordinates(coords: unknown): coords is [number, number] {
  if (!Array.isArray(coords) || coords.length < 2) return false;
  const [lat, lng] = coords;
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    isFinite(lat) &&
    isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function isMapRenderable(map: L.Map | null): boolean {
  if (!map) return false;
  try {
    const container = map.getContainer();
    if (!container) return false;
    return container.clientWidth > 30 && container.clientHeight > 30;
  } catch {
    return false;
  }
}

const safeFitBounds = (map: L.Map, bounds: L.LatLngBounds) => {
  if (!isMapRenderable(map) || !bounds.isValid()) return;
  try {
    const container = map.getContainer();
    const padX = Math.max(10, Math.min(40, Math.floor(container.clientWidth * 0.1)));
    const padY = Math.max(10, Math.min(40, Math.floor(container.clientHeight * 0.1)));

    map.invalidateSize({ pan: false });
    map.fitBounds(bounds, {
      padding: [padY, padX],
      maxZoom: 7,
      animate: false,
    });
  } catch (err) {
    console.warn('Map safeFitBounds suppressed:', err);
  }
};

const safeFlyTo = (map: L.Map, coords: [number, number], zoom = 7) => {
  if (!isMapRenderable(map) || !isValidCoordinates(coords)) return;
  try {
    map.invalidateSize({ pan: false });
    map.flyTo(coords, zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  } catch {
    try {
      map.setView(coords, zoom);
    } catch (e) {
      console.warn('Map safeFlyTo suppressed:', e);
    }
  }
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  matches,
  selectedId,
  hoveredId,
  currency,
  viewMode = 'split',
  onSelectDestination,
  onOpenDetails,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  // Default to reliable, free OpenStreetMap tiles
  const [activeTileKey, setActiveTileKey] = useState<keyof typeof TILE_LAYERS>('osm');
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);

  // Initialize Leaflet map with OpenStreetMap
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Guard against React StrictMode duplicate initialization
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {
        console.warn('Map cleanup error:', e);
      }
      mapInstanceRef.current = null;
    }

    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    const initialCenter: [number, number] = [25, 10];
    const initialZoom = 2;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 2,
      maxZoom: 19,
      zoomControl: false,
      trackResize: true,
    });

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial OpenStreetMap tile layer
    const tileConfig = TILE_LAYERS[activeTileKey];
    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: tileConfig.maxZoom || 19,
      subdomains: tileConfig.subdomains || 'abc',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Markers layer group
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    mapInstanceRef.current = map;

    // Trigger invalidateSize after map is ready so all tiles render seamlessly
    map.whenReady(() => {
      map.invalidateSize();
    });

    const initTimer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      clearTimeout(initTimer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn('Map teardown error:', e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Invalidate map size when viewMode changes or container is toggled
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const timer = setTimeout(() => {
      if (isMapRenderable(map)) {
        map.invalidateSize({ pan: false });
        if (selectedId) {
          const match = matches.find((m) => m.destination.id === selectedId);
          if (match && isValidCoordinates(match.destination.coordinates)) {
            safeFlyTo(map, match.destination.coordinates, 7);
            return;
          }
        }
        const validCoords = matches
          .map((m) => m.destination.coordinates)
          .filter(isValidCoordinates);
        if (validCoords.length > 0) {
          safeFitBounds(map, L.latLngBounds(validCoords));
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [viewMode]);

  // Observe container resizing (split view width changes, browser resize)
  useEffect(() => {
    const container = mapContainerRef.current;
    const map = mapInstanceRef.current;
    if (!container || !map) return;

    let resizeTimer: any;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isMapRenderable(map)) {
          map.invalidateSize({ pan: false });
        }
      }, 80);
    });

    observer.observe(container);
    return () => {
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  // Update tile layer when activeTileKey changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = TILE_LAYERS[activeTileKey];
    const newLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom || 19,
      subdomains: config.subdomains || 'abc',
    }).addTo(map);

    tileLayerRef.current = newLayer;
  }, [activeTileKey]);

  // Update markers when matches, selectedId, or hoveredId change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    if (matches.length === 0) return;

    const validLatLngs: [number, number][] = [];

    matches.forEach((item) => {
      const { destination, rank, matchScore, estimatedTotalCost, tripDays } = item;
      if (!isValidCoordinates(destination.coordinates)) return;

      const isSelected = selectedId === destination.id;
      const isHovered = hoveredId === destination.id;
      validLatLngs.push(destination.coordinates);

      const pinGradient =
        matchScore >= 88
          ? 'linear-gradient(135deg, #10b981, #06b6d4)'
          : matchScore >= 75
          ? 'linear-gradient(135deg, #0284c7, #8b5cf6)'
          : 'linear-gradient(135deg, #f59e0b, #ef4444)';

      // Custom HTML Dot Icon with rank badge
      const markerHtml = `
        <div class="custom-pin-marker">
          <div class="pin-dot ${isSelected ? 'is-active ring-4 ring-amber-300 scale-125' : ''} ${isHovered ? 'scale-125' : ''}" style="
            background: ${pinGradient};
            box-shadow: 0 0 16px rgba(14, 165, 233, 0.6), 0 2px 8px rgba(0,0,0,0.4);
          ">
            <span style="font-weight: 800; font-size: 13px;">${rank}</span>
            ${isSelected || isHovered ? '<div class="pin-pulse" style="border-color: #38bdf8;"></div>' : ''}
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
      popupContent.className = 'w-64 p-0 font-sans text-slate-100';
      popupContent.innerHTML = `
        <div class="relative h-28 w-full overflow-hidden bg-slate-900">
          <img src="${destination.image}" alt="${destination.name}" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-white shadow-sm">
            #${rank}
          </div>
          <div class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500 text-white font-mono shadow-sm">
            ${matchScore}% Match
          </div>
          <div class="absolute bottom-1.5 left-2.5 right-2.5">
            <h4 class="text-sm font-bold text-white leading-tight drop-shadow">${destination.name}, ${destination.country}</h4>
          </div>
        </div>
        <div class="p-3 space-y-2 bg-slate-900">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-400">${tripDays} days estimate:</span>
            <span class="font-bold text-white font-mono">${formatPrice(estimatedTotalCost, currency)}</span>
          </div>
          <div class="text-[11px] text-slate-300 line-clamp-1">
            <strong>Key Event:</strong> ${destination.events[0]?.title || 'City Exploration'}
          </div>
          <div class="flex gap-1.5 pt-1">
            <button id="popup-btn-${destination.id}" class="flex-1 py-1.5 px-2 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-semibold rounded text-center transition-colors">
              Select in List
            </button>
            <button id="popup-guide-${destination.id}" class="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium rounded text-center transition-colors">
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
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${destination.id}`);
        if (btn) {
          btn.onclick = () => onSelectDestination(destination.id);
        }
        const guideBtn = document.getElementById(`popup-guide-${destination.id}`);
        if (guideBtn) {
          guideBtn.onclick = () => onOpenDetails(item);
        }
      });

      layer.addLayer(marker);

      // If this marker is selected, open its popup
      if (isSelected && isMapRenderable(map)) {
        try {
          marker.openPopup();
        } catch {
          // Ignored if map container is in background
        }
      }
    });

    // Auto-fit bounds if no single destination is selected
    if (!selectedId && validLatLngs.length > 0 && isMapRenderable(map)) {
      safeFitBounds(map, L.latLngBounds(validLatLngs));
    }
  }, [matches, selectedId, hoveredId, currency]);

  // When selectedId changes, smoothly fly to its coordinates
  useEffect(() => {
    if (!selectedId || !mapInstanceRef.current) return;
    const match = matches.find((m) => m.destination.id === selectedId);
    if (match && isValidCoordinates(match.destination.coordinates)) {
      safeFlyTo(mapInstanceRef.current, match.destination.coordinates, 7);
    }
  }, [selectedId, matches]);

  // Reset to view all destinations
  const handleFitAll = () => {
    const map = mapInstanceRef.current;
    if (!map || matches.length === 0 || !isMapRenderable(map)) return;
    const validCoords = matches
      .map((m) => m.destination.coordinates)
      .filter(isValidCoordinates);
    if (validCoords.length > 0) {
      safeFitBounds(map, L.latLngBounds(validCoords));
    }
  };

  return (
    <div className="relative h-full w-full bg-slate-950 overflow-hidden flex flex-col">
      {/* Map Container Element */}
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Floating Map Controls & Info Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        {/* Fit All Button */}
        <button
          onClick={handleFitAll}
          disabled={matches.length === 0}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
          title="Zoom out to show all matching destination dots"
        >
          <Maximize2 className="h-3.5 w-3.5 text-sky-400" />
          <span>Fit All ({matches.length} Dots)</span>
        </button>

        {/* Tile Layer Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-slate-800 transition-colors"
          >
            <Layers className="h-3.5 w-3.5 text-sky-400" />
            <span>Map Style</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-44 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-2xl z-20">
              {(Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTileKey(key);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    activeTileKey === key
                      ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
      <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 text-[11px] text-slate-300 shadow-md">
        <span className="font-bold text-slate-400">Match score:</span>
        <div className="flex items-center gap-1 font-semibold">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs"></span>
          <span>88%+ Top</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shadow-xs"></span>
          <span>75-87% High</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-xs"></span>
          <span>60-74% Fair</span>
        </div>
      </div>

      {/* Empty State Banner Overlay if 0 matches */}
      {matches.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-xs pointer-events-none">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-6 text-center shadow-2xl max-w-sm pointer-events-auto text-white">
            <MapPin className="h-8 w-8 text-sky-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white">No Destination Dots Found</h4>
            <p className="text-xs text-slate-300 mt-1">
              Adjust your budget or lifestyle preferences to populate the OpenStreetMap with matching locations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
