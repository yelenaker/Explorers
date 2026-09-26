import { Destination } from '../types';

import baliImg from '../assets/images/dest_bali_adventure_1790428972701.jpg';
import berlinImg from '../assets/images/dest_berlin_nightlife_1790428985294.jpg';
import zermattImg from '../assets/images/dest_zermatt_alpine_1790428998037.jpg';
import heroImg from '../assets/images/hero_travel_horizon_1790428960846.jpg';

export { heroImg };

export const DESTINATIONS: Destination[] = [
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    continent: 'Europe',
    coordinates: [52.5200, 13.4050],
    tagline: 'Underground electronic epicentre & counter-culture capital',
    description: 'Renowned for 24-hour clubbing culture, historic architecture, vast public parks, and a thriving open-air summer terrace scene.',
    image: berlinImg,
    dailyCostEstimate: 110,
    minRecommendedDays: 4,
    maxRecommendedDays: 9,
    smokingRating: 4,
    smokingPolicy: 'Smoking permitted in numerous traditional Kneipen (bars) and designated outdoor terraces. Low outdoor restrictions.',
    drinkingRating: 5,
    drinkingScene: 'Famous Spätis beer culture, craft microbreweries, experimental mixology lounges, and 24-hour bar licensing.',
    sportRating: 3,
    sportActivities: ['Urban cycling circuits', 'Stand-up paddleboarding on River Spree', 'Tempelhofer Feld running', 'Bouldering halls'],
    clubRating: 5,
    clubVenues: ['Berghain', 'Tresor', 'Watergate', 'KitKatClub', 'Sisyphos'],
    bestSeason: 'May - September',
    events: [
      {
        id: 'b-1',
        title: 'Clubcommission Open Air Circuit',
        category: 'club',
        timeframe: 'Every Friday - Sunday',
        location: 'Kreuzberg & Friedrichshain',
        description: 'Multi-venue electronic night with international resident DJs across open-air riverside dance floors.',
        priceNote: '€18 entry'
      },
      {
        id: 'b-2',
        title: 'Tempelhof Sunset Skate & Roll',
        category: 'sport',
        timeframe: 'Daily at golden hour',
        location: 'Tempelhofer Feld runway',
        description: 'Vibrant outdoor community gathering of longboarders, inline skaters, and cyclists on the historic airport runway.',
        priceNote: 'Free'
      },
      {
        id: 'b-3',
        title: 'Spree River Kayak & Beer Tour',
        category: 'outdoor',
        timeframe: 'Tuesdays & Saturdays',
        location: 'Urbanhafen canal docks',
        description: 'Guided twilight paddleboard expedition finishing at a classic canal-side craft beer garden.',
        priceNote: '€32 per person'
      }
    ]
  },
  {
    id: 'bali',
    name: 'Bali (Canggu & Uluwatu)',
    country: 'Indonesia',
    continent: 'Asia',
    coordinates: [-8.4095, 115.1889],
    tagline: 'Surfing haven, cliffside beach clubs & volcanic jungle treks',
    description: 'A magnetic paradise combining world-class reef breaks, high-energy beach day-clubs, vibrant wellness communities, and lush rice terraces.',
    image: baliImg,
    dailyCostEstimate: 55,
    minRecommendedDays: 6,
    maxRecommendedDays: 14,
    smokingRating: 4,
    smokingPolicy: 'Very relaxed on open-air beach clubs, cafe terraces, and street lounges. Non-smoking inside enclosed air-conditioned venues.',
    drinkingRating: 4,
    drinkingScene: 'Sundowner beach cocktails, local Bintang beer, craft kombucha, and world-class clifftop sunset cocktail lounges.',
    sportRating: 5,
    sportActivities: ['World-class reef surfing (Uluwatu & Padang Padang)', 'Mount Batur sunrise volcano trekking', 'Freediving', 'Yoga & Muay Thai camps'],
    clubRating: 5,
    clubVenues: ['Savaya Uluwatu', 'Potato Head Beach Club', 'La Brisa', 'Finns VIP Lounge', 'ShiShi Nightclub'],
    bestSeason: 'April - October',
    events: [
      {
        id: 'bl-1',
        title: 'Savaya Cliffside Sunset Sessions',
        category: 'club',
        timeframe: 'Fridays & Saturdays',
        location: 'Uluwatu Cliffs',
        description: 'Legendary architectural day club perched 100 meters above the Indian Ocean with premier international house DJs.',
        priceNote: '$30 - $60 entry'
      },
      {
        id: 'bl-2',
        title: 'Mount Batur Sunrise Summit Trek',
        category: 'sport',
        timeframe: 'Daily at 03:30 AM',
        location: 'Kintamani Volcanic Crater',
        description: 'Challenging 1,717m active volcano trek with panoramic sunrise views over volcanic steam vents and Lake Batur.',
        priceNote: '$45 with guide & breakfast'
      },
      {
        id: 'bl-3',
        title: 'Echo Beach Sunset Surf Expression',
        category: 'sport',
        timeframe: 'Daily 4:30 PM - 7:00 PM',
        location: 'Canggu Beach Break',
        description: 'Join local and visiting surfers catching waves under vibrant pink sunsets followed by beachfront coconut barbecues.',
        priceNote: '$10 board rental'
      }
    ]
  },
  {
    id: 'zermatt',
    name: 'Zermatt & Matterhorn',
    country: 'Switzerland',
    continent: 'Europe',
    coordinates: [45.9765, 7.7491],
    tagline: 'High-altitude alpine climbing, glacier skiing & cozy fondue chalets',
    description: 'Car-free luxury alpine enclave nestled at the foot of the iconic Matterhorn, offering 365-day glacier skiing, via ferrata, and lively après-ski.',
    image: zermattImg,
    dailyCostEstimate: 260,
    minRecommendedDays: 3,
    maxRecommendedDays: 8,
    smokingRating: 2,
    smokingPolicy: 'Strict indoor anti-smoking laws. Permitted only on outdoor sun terraces, designated mountain smoking pods, and cigar lounges.',
    drinkingRating: 4,
    drinkingScene: 'High-energy après-ski champagne lounges, Swiss Valais wine cellars, craft alpine gin bars, and historic pub lounges.',
    sportRating: 5,
    sportActivities: ['Glacier skiing & freeride snowboarding', 'High-altitude Matterhorn ridge trekking', 'Downhill mountain biking', 'Gorner Gorge via ferrata'],
    clubRating: 3,
    clubVenues: ['Hennu Stall Après-Ski', 'Papperla Pub', 'Cervo Lounge', 'Broken Bar Disco (Post Hotel)'],
    bestSeason: 'December - April (Ski) / June - September (Hike)',
    events: [
      {
        id: 'z-1',
        title: 'Hennu Stall Mountain Après-Ski Bash',
        category: 'club',
        timeframe: 'Daily from 3:30 PM',
        location: 'Furi-Zermatt ski slope',
        description: 'The loudest on-mountain ski party in the Swiss Alps with live brass covers, DJ sets, and ski-boot dancing.',
        priceNote: 'Free entry (drinks paid)'
      },
      {
        id: 'z-2',
        title: 'Gornergrat Glacier Panorama Trail Run',
        category: 'sport',
        timeframe: 'Daily',
        location: 'Gornergrat 3,100m Peak',
        description: 'Stunning alpine trail over pristine alpine tarns reflecting the Matterhorn peak with clean glacial oxygen.',
        priceNote: 'Free (cogwheel train €45)'
      },
      {
        id: 'z-3',
        title: 'Valais Winemakers Vault Tasting',
        category: 'culture',
        timeframe: 'Thursdays & Saturdays',
        location: 'Old Town Cellars',
        description: 'Sommelier-led tasting of rare Petite Arvine and Cornalin mountain wines paired with aged Valais alpine cheese.',
        priceNote: 'CHF 40'
      }
    ]
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    coordinates: [41.3879, 2.1699],
    tagline: 'Sun-drenched Mediterranean beaches, tapas plazas & beachfront clubs',
    description: 'A vibrant coastal metropolis where Gothic history meets Gaudí masterpieces, beach volleyball, and round-the-clock nightlife.',
    image: heroImg,
    dailyCostEstimate: 125,
    minRecommendedDays: 4,
    maxRecommendedDays: 9,
    smokingRating: 3,
    smokingPolicy: 'Smoking banned on city beaches and enclosed spaces. Outdoor cafe and tapas terraces generally accommodate smokers.',
    drinkingRating: 5,
    drinkingScene: 'Vermouth culture at noon, Catalan Cava bars, world-leading cocktail laboratories (Paradiso, Sips), and sangria pitchers.',
    sportRating: 4,
    sportActivities: ['Bogatell beach volleyball', 'Paseo Marítimo rollerblading & cycling', 'Montjuïc road cycling climbs', 'Paddleboarding & coastal sailing'],
    clubRating: 5,
    clubVenues: ['Opium Barcelona', 'Razzmatazz', 'Pacha', 'Sala Apolo (Nasty Mondays)', 'Input High Fidelity Dance Club'],
    bestSeason: 'May - October',
    events: [
      {
        id: 'bc-1',
        title: 'Razzmatazz Multi-Room Weekend Extravaganza',
        category: 'club',
        timeframe: 'Fridays & Saturdays midnight - 6 AM',
        location: 'Poblenou Warehouse District',
        description: '5 massive rooms featuring indie rock, heavy techno, house, and electronic pop under one converted industrial roof.',
        priceNote: '€20 with drink'
      },
      {
        id: 'bc-2',
        title: 'Bogatell Beach Sunset Volleyball League',
        category: 'sport',
        timeframe: 'Tuesday & Thursday evenings',
        location: 'Platja del Bogatell',
        description: 'Casual open tournaments on fine golden sand with international travelers and local clubs right on the sea.',
        priceNote: 'Free'
      },
      {
        id: 'bc-3',
        title: 'Gothic Quarter Tapas & Craft Vermouth Crawl',
        category: 'culture',
        timeframe: 'Daily at 7:00 PM',
        location: 'El Born & Barri Gòtic',
        description: 'Taste artisan vermouth on tap paired with jamón ibérico and patatas bravas in centuries-old bodegas.',
        priceNote: '€35'
      }
    ]
  },
  {
    id: 'ibiza',
    name: 'Ibiza & Formentera',
    country: 'Spain',
    continent: 'Europe',
    coordinates: [38.9067, 1.4206],
    tagline: 'The undisputed global capital of dance music, coves & yachting',
    description: 'Sun-soaked Balearic island famed for mind-blowing mega-clubs, crystal turquoise coves, sea kayaking, and sunset drumming rituals.',
    image: heroImg,
    dailyCostEstimate: 230,
    minRecommendedDays: 4,
    maxRecommendedDays: 10,
    smokingRating: 4,
    smokingPolicy: 'Widespread on open-air club terraces, beach bars (Chiringuitos), and villa patios. Banned indoors.',
    drinkingRating: 5,
    drinkingScene: 'Hierbas Ibicencas liqueur, premium beach club rosé, world-class mixology, and high-tempo club bars.',
    sportRating: 4,
    sportActivities: ['Deep water soloing (rock climbing over sea)', 'Kitesurfing & foil boarding', 'Cala Comte sea kayaking', 'Pine forest trail running'],
    clubRating: 5,
    clubVenues: ['Hï Ibiza (#1 in the World)', 'Ushuaïa Day Club', 'Amnesia', 'DC-10', 'Pacha Ibiza'],
    bestSeason: 'Late May - Early October',
    events: [
      {
        id: 'ib-1',
        title: 'Ushuaïa Open-Air Poolside Festival',
        category: 'club',
        timeframe: 'Daily 5:00 PM - 11:00 PM',
        location: 'Playa d’en Bossa',
        description: 'Massive open-air festival stage surrounding the pool with laser shows, pyrotechnics, and the globe’s top headliners.',
        priceNote: '€70 - €95'
      },
      {
        id: 'ib-2',
        title: 'Es Vedrà Sea Kayaking & Snorkel Odyssey',
        category: 'sport',
        timeframe: 'Mondays & Wednesdays',
        location: 'Cala d’Hort',
        description: 'Paddle past sheer magnetic limestone cliffs to secluded sea caves with azure visibility up to 30 meters.',
        priceNote: '€55'
      },
      {
        id: 'ib-3',
        title: 'Benirràs Beach Sunset Drum Circle',
        category: 'music',
        timeframe: 'Sundays at sunset',
        location: 'Cala Benirràs',
        description: 'Hypnotic bohemian gathering of percussionists, fire dancers, and sunset revelers celebrating on the shore.',
        priceNote: 'Free'
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    coordinates: [35.6762, 139.6503],
    tagline: 'Futuristic metropolises, neon izakayas, martial arts & vibrant Shibuya',
    description: 'An exhilarating fusion of hyper-modern technology and sacred shrines, cutting-edge gastronomy, retro vinyl listening bars, and underground clubs.',
    image: berlinImg,
    dailyCostEstimate: 145,
    minRecommendedDays: 5,
    maxRecommendedDays: 12,
    smokingRating: 3,
    smokingPolicy: 'Banned while walking on public streets in Tokyo. Permitted in designated smoking pods and traditional Izakaya smoking booths.',
    drinkingRating: 4,
    drinkingScene: 'Sake tasting flights, Japanese single-malt whisky bars, Golden Gai micro-pubs, and craft beer izakayas.',
    sportRating: 4,
    sportActivities: ['Judo and Kendo dojo training', 'Imperial Palace 5K running loop', 'Bouldering gyms', 'Mount Takao trail hike'],
    clubRating: 4,
    clubVenues: ['WOMB Shibuya', 'Ce La Vi Tokyo', 'Contact (Dogenzaka)', 'AgeHa (events)', 'Vent Tokyo'],
    bestSeason: 'March - May / September - November',
    events: [
      {
        id: 'tk-1',
        title: 'WOMB Shibuya Multi-Level Techno Night',
        category: 'club',
        timeframe: 'Every Friday & Saturday',
        location: 'Shibuya',
        description: 'Asia’s premier club featuring a colossal giant mirror ball, world-class sound design, and Tokyo underground DJs.',
        priceNote: '¥3,500 with drink'
      },
      {
        id: 'tk-2',
        title: 'Imperial Palace Sunset Runners Club',
        category: 'sport',
        timeframe: 'Tuesdays & Thursdays 6:30 PM',
        location: 'Chiyoda Moat',
        description: 'Join local runners on the flat, car-free 5km loop around Tokyo Castle moat illuminated by city skyline reflections.',
        priceNote: 'Free'
      },
      {
        id: 'tk-3',
        title: 'Golden Gai Micro-Bar Exploration',
        category: 'culture',
        timeframe: 'Nightly from 8:00 PM',
        location: 'Shinjuku Golden Gai',
        description: 'Explore six narrow alleyways packed with over 200 eccentric 5-seat bars each with its own musical theme.',
        priceNote: '¥800 - ¥1,500 per drink'
      }
    ]
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    continent: 'Europe',
    coordinates: [50.0755, 14.4378],
    tagline: 'Bohemian fairytale spires, legendary Pilsner cellars & riverside nightlife',
    description: 'One of Europe’s most affordable and captivating cities, boasting cobblestone Gothic alleys, 5-story clubs, and world-champion beer.',
    image: heroImg,
    dailyCostEstimate: 68,
    minRecommendedDays: 3,
    maxRecommendedDays: 7,
    smokingRating: 4,
    smokingPolicy: 'Indoor smoking banned in restaurants, but widely accommodated on beer garden terraces, riverside docks, and patio bars.',
    drinkingRating: 5,
    drinkingScene: 'The highest beer consumption per capita in the world. Unfiltered Pilsner Urquell, Kozel, underground cellars, and absinthe bars.',
    sportRating: 3,
    sportActivities: ['Vltava river paddleboating', 'Divoká Šárka nature reserve trail runs', 'Letná skatepark', 'Kayaking Prague rapids'],
    clubRating: 4,
    clubVenues: ['Karlovy Lázně (5-Floor Club)', 'Roxy Club', 'Cross Club (Steampunk)', 'DupleX Rooftop'],
    bestSeason: 'April - October',
    events: [
      {
        id: 'pr-1',
        title: 'Cross Club Steampunk Electronic Night',
        category: 'club',
        timeframe: 'Wednesdays through Sundays',
        location: 'Holešovice',
        description: 'Mind-boggling multi-level futuristic industrial maze of moving mechanical sculptures and drum & bass / techno sounds.',
        priceNote: 'CZK 150 - 250 ($7 - $11)'
      },
      {
        id: 'pr-2',
        title: 'Letná Hill Viewpoint Running & Calisthenics',
        category: 'sport',
        timeframe: 'Daily mornings & dusk',
        location: 'Letná Park Overlook',
        description: 'Scenic outdoor workout overlooking the Vltava bridges followed by fresh Czech cider at the open-air pavilion.',
        priceNote: 'Free'
      },
      {
        id: 'pr-3',
        title: 'Underground Cellar Pilsner Tasting Tour',
        category: 'culture',
        timeframe: 'Daily at 4:30 PM',
        location: 'Old Town Vaults',
        description: 'Pour your own foam draft Pilsner directly from giant copper fermentation tanks in 14th-century Gothic cellars.',
        priceNote: 'CZK 450'
      }
    ]
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    coordinates: [-45.0312, 168.6626],
    tagline: 'Adventure capital of the world with crystal lakes & vibrant pub scene',
    description: 'Set against the dramatic Remarkables mountain range and Lake Wakatipu, Queenstown is the mecca for extreme sports and lively alpine nightlife.',
    image: zermattImg,
    dailyCostEstimate: 175,
    minRecommendedDays: 5,
    maxRecommendedDays: 10,
    smokingRating: 1,
    smokingPolicy: 'Very strict smokefree laws. Smokefree outdoor dining, public reserves, and town center. Strictly for fresh-air lovers.',
    drinkingRating: 4,
    drinkingScene: 'Award-winning Central Otago Pinot Noir, local craft taprooms, lakeside ice bars, and packed backpacker bars.',
    sportRating: 5,
    sportActivities: ['Bungy jumping & canyon swings', 'Downhill mountain bike park (Skyline gondola)', 'Lake Wakatipu jetboating', 'Snowboarding Remarkables & Coronet Peak'],
    clubRating: 4,
    clubVenues: ['World Bar & Teapot Cocktails', 'Subculture Nightclub', 'Rhinos Ski Shack', 'Bungalow Lounge'],
    bestSeason: 'June - September (Snow) / December - March (Summer)',
    events: [
      {
        id: 'qt-1',
        title: 'World Bar Weekend Teapots & DJ Sessions',
        category: 'club',
        timeframe: 'Every Friday & Saturday night',
        location: 'Church Street',
        description: 'Famous spirited dance party serving quirky teapot cocktails, wood-fired eats, and live bass DJs until 4 AM.',
        priceNote: 'NZ$ 15'
      },
      {
        id: 'qt-2',
        title: 'Skyline Downhill Mountain Bike Derby',
        category: 'sport',
        timeframe: 'Daily in Summer & Autumn',
        location: 'Bob’s Peak Bike Park',
        description: 'Gondola-assisted gravity mountain biking with 30 world-class downhill trails descending directly into the town center.',
        priceNote: 'NZ$ 95 day pass'
      },
      {
        id: 'qt-3',
        title: 'Nevis Bungee & Catapult Challenge',
        category: 'sport',
        timeframe: 'Daily sessions',
        location: 'Nevis Valley Gorge',
        description: '134-meter bungee dive suspended high above a rocky canyon for the ultimate heart-pounding adrenaline rush.',
        priceNote: 'NZ$ 290'
      }
    ]
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    coordinates: [-33.9249, 18.4241],
    tagline: 'Atlantic surf, Table Mountain climbs & rooftop cocktail lounges',
    description: 'Dramatic scenery where two oceans meet colossal granite peaks, world-class vineyard estates, and electric nightlife along Kloof and Bree Streets.',
    image: heroImg,
    dailyCostEstimate: 85,
    minRecommendedDays: 5,
    maxRecommendedDays: 12,
    smokingRating: 3,
    smokingPolicy: 'Allowed on open-air patios and balconies. Strict indoor bans and designated smoking sections at bars.',
    drinkingRating: 5,
    drinkingScene: 'Spectacular Stellenbosch wine valleys, gin distilleries on Kloof Street, craft cider houses, and sunset beach lounges.',
    sportRating: 5,
    sportActivities: ['Table Mountain Lion’s Head scramble', 'Muizenberg surf breaks', 'Big bay kitesurfing', 'Chapman’s Peak road cycling'],
    clubRating: 4,
    clubVenues: ['Shimmy Beach Club', 'Modular Techno Club', 'Waiting Room (Long St)', 'Cabo Beach Club'],
    bestSeason: 'November - April',
    events: [
      {
        id: 'ct-1',
        title: 'Modular Underground Electronic Sessions',
        category: 'club',
        timeframe: 'Every Saturday midnight',
        location: 'Riebeek Street',
        description: 'Intimate, dimly lit underground nightclub strictly dedicated to deep hypnotic techno and house music.',
        priceNote: 'R150 ($8)'
      },
      {
        id: 'ct-2',
        title: 'Full Moon Lion’s Head Sunset Hike',
        category: 'sport',
        timeframe: 'Monthly during full moon',
        location: 'Lion’s Head trailhead',
        description: 'Iconic panoramic hike to watch the sun sink into the Atlantic Ocean while the full moon illuminates the city bowl.',
        priceNote: 'Free'
      },
      {
        id: 'ct-3',
        title: 'Kirstenbosch Summer Sunset Concerts',
        category: 'music',
        timeframe: 'Sundays throughout summer',
        location: 'Botanical Gardens amphitheater',
        description: 'Picnic on rolling botanical lawns beneath the eastern slopes of Table Mountain listening to live indie and folk bands.',
        priceNote: 'R220'
      }
    ]
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    continent: 'Asia',
    coordinates: [13.7563, 100.5018],
    tagline: 'Electric neon street markets, rooftop lounges & Muay Thai action',
    description: 'A sensory explosion of street food aromas, golden Buddhist wats, buzzing tuk-tuks, high-energy night bazaars, and world-class sky bars.',
    image: baliImg,
    dailyCostEstimate: 50,
    minRecommendedDays: 4,
    maxRecommendedDays: 9,
    smokingRating: 4,
    smokingPolicy: 'Banned in air-conditioned indoor facilities and public transport. Extremely prevalent and tolerated in open-air beer gardens and night markets.',
    drinkingRating: 4,
    drinkingScene: 'Rooftop sky bar mixology, ice-cold Singha and Chang beer towers, Thonglor craft cocktails, and energetic night market pop-ups.',
    sportRating: 4,
    sportActivities: ['Muay Thai kickboxing training camps', 'Chao Phraya cycling tours', 'Lumphini park running loop', 'Wakeboarding at Thai Wake Park'],
    clubRating: 5,
    clubVenues: ['Onyx Mainstage Club', 'Sing Sing Theater', 'Levels Club Sukhumvit', 'Mustache Bangkok (House/Techno)'],
    bestSeason: 'November - March',
    events: [
      {
        id: 'bk-1',
        title: 'Sing Sing Theater Theatrical Party Night',
        category: 'club',
        timeframe: 'Thursdays through Saturdays',
        location: 'Sukhumvit 45',
        description: 'Immersive 1930s Shanghai retro lounge with lantern installations, aerial acrobatics, and top international house selectors.',
        priceNote: '฿500 ($14)'
      },
      {
        id: 'bk-2',
        title: 'Rajadamnern Stadium Championship Muay Thai',
        category: 'sport',
        timeframe: 'Mondays, Wednesdays & Sundays',
        location: 'Historic Rajadamnern Arena',
        description: 'Electric atmosphere of Thailand’s premier traditional boxing stadium with live traditional Sarama music and fierce bouts.',
        priceNote: '฿1,000'
      },
      {
        id: 'bk-3',
        title: 'Chao Phraya Night Lights Boat Cruise',
        category: 'culture',
        timeframe: 'Daily at 7:30 PM',
        location: 'River City Pier',
        description: 'Glide past illuminated Grand Palace and Wat Arun while enjoying cold drinks and live acoustic sounds on deck.',
        priceNote: '฿850'
      }
    ]
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    continent: 'Europe',
    coordinates: [52.3676, 4.9041],
    tagline: 'Iconic canal rings, world-leading dance festivals & cycling streets',
    description: 'A liberated cultural gem where bicycles outnumber citizens, world-famous electronic music events flourish, and historic canals enchant.',
    image: heroImg,
    dailyCostEstimate: 160,
    minRecommendedDays: 3,
    maxRecommendedDays: 7,
    smokingRating: 5,
    smokingPolicy: 'Famous for dedicated coffeeshops with licensed consumption. Tobacco smoking restricted indoors; outdoor terrace smoking common.',
    drinkingRating: 5,
    drinkingScene: 'Brown cafes with Dutch Genever spirits, Heineken & craft breweries on the canal, gin and tonic bars, and waterfront terraces.',
    sportRating: 4,
    sportActivities: ['Citywide bicycle touring & canal sprints', 'Vondelpark running circuits', 'Stand-up paddleboarding canals', 'Rowing on the Amstel'],
    clubRating: 5,
    clubVenues: ['Shelter Amsterdam (Underground)', 'De School / Garage Noord', 'Escape Amsterdam', 'Radion Cultural Club'],
    bestSeason: 'May - September',
    events: [
      {
        id: 'am-1',
        title: 'Shelter 24-Hour Subterranean Rave',
        category: 'club',
        timeframe: 'Fridays & Saturdays midnight',
        location: 'Amsterdam Noord (Across river)',
        description: 'Enter through a hatch in the ground into an acoustically pristine concrete basement beneath the A’DAM Toren.',
        priceNote: '€22'
      },
      {
        id: 'am-2',
        title: 'Canal Ring Sunset Kayak & Paddle Session',
        category: 'sport',
        timeframe: 'Wednesday & Saturday evenings',
        location: 'Prinsengracht',
        description: 'Paddle through UNESCO heritage canal waters under historic stone arch bridges with the lights reflecting on the water.',
        priceNote: '€28'
      },
      {
        id: 'am-3',
        title: 'Brouwerij ’t IJ Windmill Craft Beer Tasting',
        category: 'culture',
        timeframe: 'Daily 2:00 PM - 8:00 PM',
        location: 'De Gooyer Windmill',
        description: 'Sip fresh organic Dutch IPAs and abbey tripels right under the sails of the tallest wooden windmill in the Netherlands.',
        priceNote: '€15 flight'
      }
    ]
  },
  {
    id: 'lisbon',
    name: 'Lisbon & Cascais',
    country: 'Portugal',
    continent: 'Europe',
    coordinates: [38.7223, -9.1393],
    tagline: 'Pastel hills, Atlantic surf beaches & open-air street fiestas',
    description: 'Europe’s sunniest capital, celebrated for tiled miradouro viewpoints, nearby Guincho surf breaks, pastel de nata, and Bairro Alto street celebrations.',
    image: heroImg,
    dailyCostEstimate: 88,
    minRecommendedDays: 4,
    maxRecommendedDays: 8,
    smokingRating: 4,
    smokingPolicy: 'Generous outdoor smoking culture on streets, kiosks, miradouros, and outdoor esplanades. Restricted in closed public dining.',
    drinkingRating: 5,
    drinkingScene: 'Ginjinha cherry liqueur in chocolate cups, Portuguese Vinho Verde, caipirinhas on Pink Street, and lively outdoor kiosk bars.',
    sportRating: 5,
    sportActivities: ['Guincho & Carcavelos ocean surfing', 'Sintra coastal trail runs', 'Miradouro hill cycling sprints', 'Sailing on the Tagus'],
    clubRating: 4,
    clubVenues: ['Lux Frágil (Premier Club)', 'Musicbox Pink Street', 'Kremlin Underground', 'Rooftop Bar Park (Car Park Garden)'],
    bestSeason: 'April - October',
    events: [
      {
        id: 'ls-1',
        title: 'Lux Frágil Tagus Riverfront Sessions',
        category: 'club',
        timeframe: 'Thursdays through Saturdays',
        location: 'Santa Apolónia waterfront',
        description: 'Portugal’s most revered club with a panoramic rooftop terrace looking over the Tagus river and world-class house/disco downstairs.',
        priceNote: '€15 - €20'
      },
      {
        id: 'ls-2',
        title: 'Carcavelos Atlantic Surf Challenge',
        category: 'sport',
        timeframe: 'Daily morning sessions',
        location: 'Praia de Carcavelos',
        description: 'Consistent Atlantic beach break suitable for all levels, just 20 minutes from central Lisbon by seaside train.',
        priceNote: '€35 lesson + board'
      },
      {
        id: 'ls-3',
        title: 'Bairro Alto Kiosk & Fado Sunset Social',
        category: 'music',
        timeframe: 'Every evening from 7 PM',
        location: 'Miradouro de Santa Catarina',
        description: 'Grab a cold Super Bock and join locals and travelers singing along to acoustic guitars while watching ships pass on the bay.',
        priceNote: 'Free'
      }
    ]
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca & Puerto Escondido',
    country: 'Mexico',
    continent: 'Americas',
    coordinates: [17.0732, -96.7266],
    tagline: 'Artisan mezcal culture, big wave surfing & vibrant indigenous cuisine',
    description: 'A cultural powerhouse blending indigenous craft markets and world-famous mole cuisine with the legendary surf beaches of Puerto Escondido.',
    image: baliImg,
    dailyCostEstimate: 60,
    minRecommendedDays: 5,
    maxRecommendedDays: 12,
    smokingRating: 3,
    smokingPolicy: 'Banned in public parks and squares by federal decree, but accepted in designated bar patios, beach palapas, and private rooftop terraces.',
    drinkingRating: 5,
    drinkingScene: 'Authentic smoky artisan Mezcal tasting in palenques, fresh lime micheladas, tepache fermented drinks, and craft agave cocktails.',
    sportRating: 5,
    sportActivities: ['Zicatela big wave surfing', 'Sierra Norte mountain biking', 'Hierve el Agua hiking', 'Snorkeling bioluminescent lagoons'],
    clubRating: 3,
    clubVenues: ['Cactus Bar Zicatela', 'Mar & Wana Beach Club', 'La Mezcalerita Rooftop', 'Barba Negra'],
    bestSeason: 'November - May',
    events: [
      {
        id: 'ox-1',
        title: 'Zicatela Sunset Surf Expression & Beach Bash',
        category: 'sport',
        timeframe: 'Daily at 5:00 PM',
        location: 'Playa Zicatela, Puerto Escondido',
        description: 'Watch fearless surfers tackle the famous Mexican Pipeline while beach clubs transition into moonlit reggae and house parties.',
        priceNote: 'Free'
      },
      {
        id: 'ox-2',
        title: 'Ancestral Mezcal Distillery Trail',
        category: 'culture',
        timeframe: 'Tuesdays & Fridays',
        location: 'Santiago Matatlán',
        description: 'Visit traditional family-run earthen pit distilleries, crush roasted agave, and taste clay-pot distilled varieties.',
        priceNote: '$45 tour'
      },
      {
        id: 'ox-3',
        title: 'Sierra Norte Cloud Forest Mountain Bike Run',
        category: 'sport',
        timeframe: 'Weekends',
        location: 'Pueblos Mancomunados',
        description: 'High elevation singletrack descending through pine and oak forests with indigenous community trail guides.',
        priceNote: '$60 with equipment'
      }
    ]
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik & South Coast',
    country: 'Iceland',
    continent: 'Europe',
    coordinates: [64.1466, -21.9426],
    tagline: 'Glacier ice caves, volcanic geothermal springs & midnight sun runs',
    description: 'An otherworldly volcanic island of cascading waterfalls, natural thermal lagoons, glacier hikes, and a surprisingly wild weekend bar crawl scene.',
    image: zermattImg,
    dailyCostEstimate: 210,
    minRecommendedDays: 4,
    maxRecommendedDays: 9,
    smokingRating: 2,
    smokingPolicy: 'Strict indoor anti-smoking laws. Restricted in public outdoor areas; only allowed in open designated spots.',
    drinkingRating: 4,
    drinkingScene: 'Lively "Rúntur" weekend pub crawl, local Brennivín schnapps, Icelandic microbrews, and cozy Nordic cocktail bars.',
    sportRating: 5,
    sportActivities: ['Solheimajokull glacier crampon hiking', 'Silfra tectonic fissure drysuit snorkeling', 'Volcano trail running', 'Geothermal river bathing'],
    clubRating: 3,
    clubVenues: ['Kaffibarinn (Damon Albarn favorite)', 'Paloma Nightclub', 'Auto Reykjavik', 'Gaukurinn Alternative Bar'],
    bestSeason: 'June - August (Sun) / September - March (Auroras)',
    events: [
      {
        id: 'rk-1',
        title: 'Kaffibarinn Weekend Rúntur Party',
        category: 'club',
        timeframe: 'Fridays & Saturdays till 4:30 AM',
        location: 'Bergstaðastræti',
        description: 'Iconic red corrugated-iron house packed with locals, artists, and tourists dancing to indie vinyl and deep house.',
        priceNote: 'Free entry (drinks €11)'
      },
      {
        id: 'rk-2',
        title: 'Silfra Tectonic Fissure Glacier Snorkel',
        category: 'sport',
        timeframe: 'Daily',
        location: 'Thingvellir National Park',
        description: 'Float between the North American and Eurasian tectonic plates in crystal pure glacial water with 100m visibility.',
        priceNote: '$140'
      },
      {
        id: 'rk-3',
        title: 'Reykjadalur Geothermal Warm River Soak',
        category: 'outdoor',
        timeframe: 'Daily year-round',
        location: 'Hveragerði Valley',
        description: '3km scenic mountain trek through steaming hot springs ending in a natural warm mineral stream you can bathe in.',
        priceNote: 'Free'
      }
    ]
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'Americas',
    coordinates: [-22.9068, -43.1729],
    tagline: 'Copacabana beaches, samba street parties, footvolley & jungle peaks',
    description: 'An electrifying backdrop of lush granite mountains dropping into golden sand, samba drums echoing through Lapa, and nonstop beach sports.',
    image: heroImg,
    dailyCostEstimate: 75,
    minRecommendedDays: 5,
    maxRecommendedDays: 11,
    smokingRating: 4,
    smokingPolicy: 'Prohibited in enclosed commercial areas, but very common on the wide beach sands, sidewalk botecos, and outdoor street dances.',
    drinkingRating: 5,
    drinkingScene: 'Fresh lime and cachaça Caipirinhas, ice-cold Chopp draft beer on tap in botecos, and fresh coconut water on the beach.',
    sportRating: 5,
    sportActivities: ['Ipanema beach footvolley & volleyball', 'Hang gliding from Pedra Bonita', 'Pedra da Gávea peak climbing', 'Copacabana ocean swimming'],
    clubRating: 5,
    clubVenues: ['Circo Voador Lapa', 'The Week Rio', 'Fosfobox Underground', 'Arcos da Lapa Street Carnival Clubs'],
    bestSeason: 'December - March (Summer) / May - October (Mild)',
    events: [
      {
        id: 'rio-1',
        title: 'Pedra do Sal Open-Air Live Samba Circle',
        category: 'music',
        timeframe: 'Mondays & Fridays 8:00 PM',
        location: 'Saúde / Little Africa',
        description: 'The historic birthplace of Samba where hundreds sing and dance around wooden tables with cold caipirinhas.',
        priceNote: 'Free entry'
      },
      {
        id: 'rio-2',
        title: 'Ipanema Posto 9 Footvolley Tournament & Sunset',
        category: 'sport',
        timeframe: 'Daily afternoons',
        location: 'Ipanema Beach Posto 9',
        description: 'Watch incredible acrobatic footvolley matches with two Dois Irmãos mountain peaks framing the golden sunset.',
        priceNote: 'Free'
      },
      {
        id: 'rio-3',
        title: 'Hang Gliding Flight Over São Conrado Beach',
        category: 'sport',
        timeframe: 'Daily mornings',
        location: 'Pedra Bonita Ramp',
        description: 'Tandem flight soaring like a bird over lush Tijuca rainforest canopy before landing gently on the white beach sand.',
        priceNote: '$130'
      }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    continent: 'Asia',
    coordinates: [25.2048, 55.2708],
    tagline: 'Superyacht marinas, desert dunes, luxury beach clubs & mega-skyscrapers',
    description: 'A dazzling oasis of futuristic architecture, world-renowned beach day clubs, desert quad adventures, and opulent sky lounges.',
    image: heroImg,
    dailyCostEstimate: 240,
    minRecommendedDays: 4,
    maxRecommendedDays: 8,
    smokingRating: 4,
    smokingPolicy: 'Shisha lounges ubiquitous and culturally celebrated. Strict bans on standard cigarettes in indoor malls and enclosed transit.',
    drinkingRating: 4,
    drinkingScene: 'Licensed 5-star hotel rooftop lounges, beach club champagne parties, speakeasy cocktail bars, and international brunch bashes.',
    sportRating: 4,
    sportActivities: ['Desert dune bashing & sandboarding', 'Skydiving over Palm Jumeirah', 'Kite Beach kitesurfing & running track', 'Deep Dive Dubai (60m pool)'],
    clubRating: 5,
    clubVenues: ['Soho Garden Palm Jumeirah', 'Playa Pacha Dubai', 'WHITE Dubai', 'Nikki Beach Club'],
    bestSeason: 'November - April',
    events: [
      {
        id: 'db-1',
        title: 'Soho Garden Megaclub International DJ Night',
        category: 'club',
        timeframe: 'Thursdays & Fridays',
        location: 'Meydan / Palm Jumeirah',
        description: 'Multi-concept entertainment hub with top international techno and commercial electronic headliners with skyline views.',
        priceNote: 'AED 200 ($55)'
      },
      {
        id: 'db-2',
        title: 'Red Dune Desert Quad Biking & Sandboarding',
        category: 'sport',
        timeframe: 'Daily sunrise & sunset',
        location: 'Lahbab Red Dunes',
        description: 'Race high-powered 400cc quad bikes over towering red sand dunes with desert horizon views.',
        priceNote: '$65'
      },
      {
        id: 'db-3',
        title: 'Kite Beach Sunset Running & Paddleboarding',
        category: 'sport',
        timeframe: 'Daily 5:00 PM',
        location: 'Jumeirah Coastline',
        description: 'Padded rubber seaside running track with Burj Al Arab views and warm ocean paddleboard rentals.',
        priceNote: 'Free access / AED 60 rental'
      }
    ]
  }
];
