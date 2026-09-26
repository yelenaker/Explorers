export type SmokingPreference = 'friendly' | 'strict' | 'flexible';
export type DrinkingPreference = 'high' | 'moderate' | 'dry';
export type SportPreference = 'adventure' | 'moderate' | 'relaxed';
export type ClubPreference = 'clubs' | 'lounges' | 'quiet';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface UserPreferences {
  minMoney: number;
  maxMoney: number;
  minDays: number;
  maxDays: number;
  smoking: SmokingPreference;
  drinking: DrinkingPreference;
  sport: SportPreference;
  club: ClubPreference;
  currency: CurrencyCode;
  selectedContinent?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'sport' | 'club' | 'culture' | 'music' | 'outdoor';
  timeframe: string;
  location: string;
  description: string;
  priceNote: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania';
  coordinates: [number, number]; // [lat, lng]
  tagline: string;
  description: string;
  image: string;
  dailyCostEstimate: number; // in USD
  minRecommendedDays: number;
  maxRecommendedDays: number;
  
  // Ratings from 1 (very low/strict) to 5 (world-class/permissive)
  smokingRating: 1 | 2 | 3 | 4 | 5;
  smokingPolicy: string;
  
  drinkingRating: 1 | 2 | 3 | 4 | 5;
  drinkingScene: string;
  
  sportRating: 1 | 2 | 3 | 4 | 5;
  sportActivities: string[];
  
  clubRating: 1 | 2 | 3 | 4 | 5;
  clubVenues: string[];
  
  events: EventItem[];
  bestSeason: string;
}

export interface MatchResult {
  destination: Destination;
  rank: number; // 1 to 10
  matchScore: number; // 0 - 100
  estimatedTotalCost: number;
  tripDays: number;
  dailyCost: number;
  reasons: string[];
  breakdown: {
    budget: number;
    days: number;
    smoking: number;
    drinking: number;
    sport: number;
    club: number;
  };
}

export interface Explorer {
  id: string;
  name: string;
  callsign: string;
  role: string;
  avatar: string;
  color: string;
  email: string;
  branchTag: string;
}

export interface Expedition {
  id: string;
  title: string;
  codename: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  terrain: string;
  difficulty: 'Moderate' | 'Challenging' | 'Extreme' | string;
  durationDays: number;
  distanceKm: number;
  elevationGainM: number;
  status: 'Active' | 'Planning' | 'Completed' | string;
  startDate: string;
  endDate: string;
  coverImage: string;
  description: string;
  leadExplorerId: string;
  assignedExplorerIds: string[];
}

export interface Waypoint {
  id: string;
  expeditionId: string;
  title: string;
  day: number;
  lat: number;
  lng: number;
  elevationM: number;
  type: 'basecamp' | 'shelter' | 'viewpoint' | 'hazard' | 'summit' | 'water' | string;
  notes: string;
  visited: boolean;
}

export interface GearItem {
  id: string;
  expeditionId: string;
  name: string;
  category: string;
  weightGrams: number;
  assignedExplorerId: string;
  packed: boolean;
  isShared: boolean;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  expeditionId: string;
  authorId: string;
  timestamp: string;
  title: string;
  content: string;
  locationName: string;
  weather: string;
  tempC: number;
  altitudeM: number;
  tags: string[];
}

export interface ItineraryDay {
  id: string;
  expeditionId: string;
  dayNumber: number;
  title: string;
  startLocation: string;
  endLocation: string;
  distanceKm: number;
  elevationGainM: number;
  estimatedHours: number;
  rations?: string;
  highlights: string[];
  completed: boolean;
}
