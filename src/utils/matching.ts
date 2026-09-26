import { Destination, MatchResult, UserPreferences } from '../types';
import { DESTINATIONS } from '../data/destinations';

export function calculateDestinationMatches(
  preferences: UserPreferences,
  destinations: Destination[] = DESTINATIONS
): MatchResult[] {
  const { minMoney, maxMoney, minDays, maxDays, smoking, drinking, sport, club, selectedContinent } = preferences;

  const results: MatchResult[] = [];

  for (const dest of destinations) {
    // Optional continent filter if specified
    if (selectedContinent && selectedContinent !== 'All' && dest.continent !== selectedContinent) {
      continue;
    }

    // 1. Calculate best-fit days
    // Optimal days is the intersection between user days range and destination ideal range
    const overlapMin = Math.max(minDays, dest.minRecommendedDays);
    const overlapMax = Math.min(maxDays, dest.maxRecommendedDays);
    
    let tripDays: number;
    let daysScore: number;

    if (overlapMin <= overlapMax) {
      // Overlap exists! Choose the midpoint
      tripDays = Math.round((overlapMin + overlapMax) / 2);
      daysScore = 100;
    } else {
      // No direct overlap: pick closest bound
      if (maxDays < dest.minRecommendedDays) {
        tripDays = maxDays;
        const diff = dest.minRecommendedDays - maxDays;
        daysScore = Math.max(20, 100 - diff * 22);
      } else {
        tripDays = minDays;
        const diff = minDays - dest.maxRecommendedDays;
        daysScore = Math.max(30, 100 - diff * 15);
      }
    }

    // 2. Calculate budget fit
    const estimatedTotalCost = tripDays * dest.dailyCostEstimate;
    let budgetScore = 0;

    // Hard ceiling check: if total cost is more than 30% higher than maxMoney, skip unless maxMoney is tiny
    if (estimatedTotalCost > maxMoney * 1.35) {
      continue; // Exclude, does not fit budget
    }

    if (estimatedTotalCost >= minMoney && estimatedTotalCost <= maxMoney) {
      // Perfectly within budget window!
      budgetScore = 100;
    } else if (estimatedTotalCost < minMoney) {
      // Cheaper than min budget: generally fine for travelers, slight penalty if user wanted luxury
      const underRatio = (minMoney - estimatedTotalCost) / minMoney;
      budgetScore = Math.max(65, 100 - underRatio * 40);
    } else {
      // Above maxMoney but within 35% margin
      const overRatio = (estimatedTotalCost - maxMoney) / maxMoney;
      budgetScore = Math.max(25, 100 - overRatio * 180);
    }

    // 3. Smoking score
    let smokingScore = 100;
    const reasons: string[] = [];

    if (smoking === 'friendly') {
      if (dest.smokingRating >= 4) {
        smokingScore = 100;
        reasons.push('Permissive smoking & outdoor terraces');
      } else if (dest.smokingRating === 3) {
        smokingScore = 80;
      } else {
        smokingScore = 40;
      }
    } else if (smoking === 'strict') {
      if (dest.smokingRating <= 2) {
        smokingScore = 100;
        reasons.push('Strict clean-air & smoke-free environment');
      } else if (dest.smokingRating === 3) {
        smokingScore = 75;
      } else {
        smokingScore = 35; // Penalize smoking hubs for strict non-smokers
      }
    } else {
      smokingScore = 95; // Flexible
    }

    // 4. Drinking score
    let drinkingScore = 100;
    if (drinking === 'high') {
      if (dest.drinkingRating >= 4) {
        drinkingScore = 100;
        reasons.push('World-class nightlife & craft beverage culture');
      } else if (dest.drinkingRating === 3) {
        drinkingScore = 70;
      } else {
        drinkingScore = 40;
      }
    } else if (drinking === 'moderate') {
      drinkingScore = dest.drinkingRating >= 3 ? 95 : 75;
    } else if (drinking === 'dry') {
      if (dest.drinkingRating <= 3) {
        drinkingScore = 100;
        reasons.push('Great non-alcoholic café & wellness options');
      } else {
        drinkingScore = 65;
      }
    }

    // 5. Sport score
    let sportScore = 100;
    if (sport === 'adventure') {
      if (dest.sportRating >= 4) {
        sportScore = 100;
        reasons.push('Top-tier outdoor sports & adrenaline activities');
      } else if (dest.sportRating === 3) {
        sportScore = 70;
      } else {
        sportScore = 35;
      }
    } else if (sport === 'moderate') {
      sportScore = dest.sportRating >= 3 ? 95 : 70;
    } else if (sport === 'relaxed') {
      sportScore = dest.sportRating <= 3 ? 100 : 80;
    }

    // 6. Club score
    let clubScore = 100;
    if (club === 'clubs') {
      if (dest.clubRating >= 4) {
        clubScore = 100;
        reasons.push('Legendary clubs & electronic music scene');
      } else if (dest.clubRating === 3) {
        clubScore = 65;
      } else {
        clubScore = 30;
      }
    } else if (club === 'lounges') {
      clubScore = dest.clubRating >= 3 ? 95 : 70;
    } else if (club === 'quiet') {
      if (dest.clubRating <= 3) {
        clubScore = 100;
        reasons.push('Tranquil evenings without deafening club noise');
      } else {
        clubScore = 45;
      }
    }

    // Weighted Overall Fit (0 - 100)
    // Budget (25%), Days (15%), Sport (20%), Club (20%), Drinking (10%), Smoking (10%)
    const weightedTotal =
      budgetScore * 0.25 +
      daysScore * 0.15 +
      sportScore * 0.20 +
      clubScore * 0.20 +
      drinkingScore * 0.10 +
      smokingScore * 0.10;

    const matchScore = Math.round(weightedTotal);

    // Only include if match score is viable (>= 60)
    if (matchScore >= 58) {
      if (reasons.length === 0) {
        reasons.push('Balanced fit across budget, duration and activities');
      }

      results.push({
        destination: dest,
        rank: 0, // will assign after sorting
        matchScore,
        estimatedTotalCost,
        tripDays,
        dailyCost: dest.dailyCostEstimate,
        reasons: reasons.slice(0, 3),
        breakdown: {
          budget: Math.round(budgetScore),
          days: Math.round(daysScore),
          smoking: Math.round(smokingScore),
          drinking: Math.round(drinkingScore),
          sport: Math.round(sportScore),
          club: Math.round(clubScore),
        },
      });
    }
  }

  // Sort descending by matchScore, then by budget fit
  results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return a.estimatedTotalCost - b.estimatedTotalCost;
  });

  // Limit to at most 10 options (guarantees between 0 and 10 options)
  const top10 = results.slice(0, 10);

  // Assign 1-indexed ranks
  top10.forEach((item, index) => {
    item.rank = index + 1;
  });

  return top10;
}
