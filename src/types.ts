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
