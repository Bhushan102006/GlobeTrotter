// Mock data for all GlobeTrotter pages

export const currentUser = {
  id: 1,
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex.rivera@example.com',
  bio: 'Passionate explorer seeking authentic cultural experiences and off-the-beaten-path adventures.',
  avatar: null, // Will use Pexels
  role: 'Explorer',
  badges: ['Pro Member', 'Explorer Tier'],
  interests: ['Culinary', 'Nature', 'History'],
  joinedDate: '2023-06-15',
};

export const trips = [
  {
    id: 1,
    name: 'Iceland Ring Road',
    status: 'upcoming',
    startDate: '2024-09-12',
    endDate: '2024-09-22',
    duration: 10,
    destinations: 12,
    coverQuery: 'iceland landscape',
    travelers: 3,
    budget: 6500,
    spent: 4200,
  },
  {
    id: 2,
    name: 'Swiss Alps Hiking',
    status: 'planning',
    startDate: null,
    endDate: null,
    duration: 14,
    destinations: 4,
    coverQuery: 'swiss alps mountains',
    travelers: 1,
    budget: 4000,
    spent: 0,
  },
  {
    id: 3,
    name: 'Amalfi Coast',
    status: 'completed',
    startDate: '2023-06-05',
    endDate: '2023-06-12',
    duration: 7,
    destinations: 5,
    coverQuery: 'amalfi coast italy',
    travelers: 2,
    budget: 5200,
    spent: 5200,
  },
  {
    id: 4,
    name: 'Japan Explorer',
    status: 'upcoming',
    startDate: '2024-10-12',
    endDate: '2024-10-28',
    duration: 16,
    destinations: 4,
    coverQuery: 'tokyo japan temple',
    travelers: 2,
    budget: 8000,
    spent: 3200,
  },
];

export const previousTrips = [
  { id: 101, name: 'Sydney Gateway', date: 'Oct 2023', duration: '10 Days', coverQuery: 'sydney opera house' },
  { id: 102, name: 'Venice Weekend', date: 'Aug 2023', duration: '3 Days', coverQuery: 'venice canals italy' },
  { id: 103, name: 'Swiss Alps Ski', date: 'Jan 2023', duration: '7 Days', coverQuery: 'swiss alps skiing' },
  { id: 104, name: 'Dubai Escape', date: 'Nov 2022', duration: '5 Days', coverQuery: 'dubai skyline night' },
];

export const topDestinations = [
  { id: 1, name: 'Paris', query: 'paris eiffel tower' },
  { id: 2, name: 'Amalfi Coast', query: 'amalfi coast italy' },
  { id: 3, name: 'Kyoto', query: 'kyoto japan temple' },
  { id: 4, name: 'London', query: 'london big ben' },
  { id: 5, name: 'Dubai', query: 'dubai skyline' },
];

export const destinations = [
  { id: 1, name: 'Paris', country: 'France', region: 'Europe', costIndex: '$$$$', rating: 4.9, query: 'paris eiffel tower night' },
  { id: 2, name: 'Queenstown', country: 'New Zealand', region: 'Oceania', costIndex: '$$$', rating: 4.8, query: 'queenstown new zealand lake' },
  { id: 3, name: 'Ubud', country: 'Indonesia', region: 'Asia', costIndex: '$$', rating: 4.7, query: 'ubud bali rice terraces' },
  { id: 4, name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: '$$$', rating: 4.9, query: 'tokyo shibuya crossing' },
  { id: 5, name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: '$$$', rating: 4.7, query: 'barcelona sagrada familia' },
  { id: 6, name: 'Santorini', country: 'Greece', region: 'Europe', costIndex: '$$$$', rating: 4.8, query: 'santorini greece sunset' },
  { id: 7, name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: '$', rating: 4.5, query: 'bangkok temples thailand' },
  { id: 8, name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: '$$', rating: 4.6, query: 'cape town table mountain' },
  { id: 9, name: 'Reykjavik', country: 'Iceland', region: 'Europe', costIndex: '$$$$', rating: 4.7, query: 'reykjavik iceland northern lights' },
];

export const itineraryData = {
  tripName: 'Japan Explorer',
  startDate: '2024-10-12',
  endDate: '2024-10-28',
  travelers: 2,
  stops: [
    {
      id: 1,
      city: 'Tokyo',
      startDate: 'Oct 12',
      endDate: 'Oct 17',
      nights: 5,
      tags: ['CULTURE', 'FOOD'],
      imageQuery: 'tokyo japan skyline',
      active: true,
    },
    {
      id: 2,
      city: 'Kyoto',
      startDate: 'Oct 17',
      endDate: 'Oct 21',
      nights: 4,
      tags: [],
      imageQuery: 'kyoto bamboo forest',
      transport: 'Shinkansen (2h 15m)',
    },
    {
      id: 3,
      city: 'Osaka',
      startDate: 'Oct 21',
      endDate: 'Oct 25',
      nights: 4,
      tags: [],
      imageQuery: 'osaka castle japan',
    },
    {
      id: 4,
      city: 'Hakone',
      startDate: 'Oct 25',
      endDate: 'Oct 28',
      nights: 3,
      tags: [],
      imageQuery: 'hakone mount fuji',
    },
  ],
  days: [
    { day: 1, date: 12, weekday: 'Sat', selected: true },
    { day: 2, date: 13, weekday: 'Sun' },
    { day: 3, date: 14, weekday: 'Mon' },
    { day: 4, date: 15, weekday: 'Tue' },
    { day: 5, date: 16, weekday: 'Wed' },
  ],
  activities: [
    {
      id: 1,
      time: '09:00',
      duration: '1h 30m',
      name: 'Tsukiji Outer Market Breakfast',
      description: 'Sushi Zanmai Main Store or street stalls.',
      category: 'Food',
      cost: '$$',
      imageQuery: 'tsukiji fish market tokyo',
      status: 'confirmed',
    },
    {
      id: 2,
      time: '11:00',
      duration: '2h 00m',
      name: 'teamLab Planets TOKYO',
      description: 'Immersive digital art museum. Tickets pre-booked.',
      category: 'Culture',
      cost: '$$$',
      imageQuery: 'teamlab planets tokyo art',
      tags: ['Ticket Required'],
      status: 'confirmed',
    },
    {
      id: 3,
      time: '14:00',
      duration: '3h 00m',
      name: 'Imperial Palace East Gardens',
      description: 'Stroll through historical ruins and manicured gardens.',
      category: 'Nature',
      cost: 'Free',
      imageQuery: 'imperial palace tokyo gardens',
      status: 'planned',
    },
  ],
};

export const budgetData = {
  tripName: 'Italy Explorer',
  duration: 14,
  travelers: 2,
  totalEstimated: 5200,
  targetBudget: 5000,
  overBudget: 200,
  averageDaily: 371,
  targetDaily: 357,
  categories: [
    { name: 'Flights', amount: 1300, color: '#2563EB' },
    { name: 'Accommodation', amount: 1820, color: '#94a3b8' },
    { name: 'Meals', amount: 1300, color: '#ec4899' },
    { name: 'Activities', amount: 780, color: '#f97316' },
  ],
  dailySpending: [
    { day: 1, actual: 180, label: 'Day 1' },
    { day: 2, actual: 220, label: '' },
    { day: 3, actual: 300, label: '' },
    { day: 4, actual: 480, label: 'Day 4 (Venice)' },
    { day: 5, actual: 350, label: '' },
    { day: 6, actual: 380, label: '' },
    { day: 7, actual: 320, label: 'Day 7' },
    { day: 8, actual: 290, label: '' },
    { day: 9, actual: 310, label: '' },
    { day: 10, actual: 340, label: 'Day 10' },
    { day: 11, actual: 280, label: '' },
    { day: 12, actual: 260, label: '' },
    { day: 13, actual: 300, label: '' },
    { day: 14, actual: 290, label: 'Day 14' },
  ],
  alerts: [
    {
      type: 'over-budget',
      title: 'Over Budget',
      amount: '+$120',
      description: 'Day 4 in Venice',
      detail: 'Gondola ride and dinner at St. Mark\'s Square significantly exceeded the daily allocation of $357.',
      actions: ['Review Day 4', 'Dismiss'],
    },
    {
      type: 'upcoming',
      title: 'Upcoming Payment',
      amount: '$450',
      description: 'Colosseum Private Tour',
      detail: 'Balance due in 3 days (Oct 12).',
    },
  ],
  topExpenses: [
    { name: 'Roundtrip Airfare (JFK to FCO)', detail: 'Delta Airlines · Sep 1', amount: 1300, icon: 'plane' },
    { name: 'Hotel Danieli Venice (3 Nights)', detail: 'Accommodation · Oct 4-7', amount: 850, icon: 'hotel' },
    { name: 'Dinner at Quadri', detail: 'Meals · Unplanned Expense', amount: 320, icon: 'utensils' },
  ],
};

export const calendarEvents = [
  { id: 1, date: 12, title: 'Flight JL 707', category: 'transport', color: 'var(--color-transport)' },
  { id: 2, date: 12, title: 'Park Hyatt Tok...', category: 'accommodation', color: 'var(--color-accommodation)' },
  { id: 3, date: 12, title: 'Sushi Dai', category: 'dining', color: 'var(--color-dining)' },
  { id: 4, date: 13, title: 'Senso-ji Temple', category: 'sightseeing', color: 'var(--color-sightseeing)' },
  { id: 5, date: 14, title: 'Shinjuku Gyoen', category: 'nature', color: 'var(--color-nature)' },
  { id: 6, date: 14, title: 'Shinkansen to Kyoto', category: 'transport', color: 'var(--color-transport)' },
  { id: 7, date: 15, title: 'Kyoto Ryokan', category: 'accommodation', color: 'var(--color-accommodation)' },
];

export const unscheduledActivities = [
  { id: 101, name: 'Ghibli Museum' },
  { id: 102, name: 'Tsukiji Market' },
];

export const communityTrip = {
  title: 'Blue Domes & Golden Sunsets',
  location: 'Santorini, Greece',
  dateRange: 'Aug 12 - Aug 18',
  creator: { name: 'Alex Rivera', avatar: null },
  heroQuery: 'santorini greece blue domes sunset',
  vibe: 'A week of cliffside living, incredible Aegean seafood, and exploring the hidden volcanic beaches of Santorini. This itinerary balances iconic Oia sunsets with quieter moments in Pyrgos and Akrotiri. Perfect for couples or solo travelers seeking slow, aesthetic luxury.',
  duration: '7 Days',
  pace: 'Relaxed',
  days: [
    {
      dayNum: 1,
      title: 'Arrival & Oia Exploration',
      date: 'Monday, Aug 12',
      activities: [
        {
          id: 1,
          category: 'LODGING',
          name: 'Check-in: Canaves Oia Suites',
          description: 'Settle into the cliffside cave suite. Unpack, enjoy the welcome wine, and take a quick dip in the plunge pool before heading out.',
          time: '14:00',
          imageQuery: 'santorini cave hotel suite',
        },
        {
          id: 2,
          category: 'DINING',
          name: 'Sunset Dinner at Ammoudi Fish Tavern',
          description: 'Walk down the 300 steps from Oia to Ammoudi Bay. Reserve a table by the water for fresh catch of the day and spectacular views of the sunset.',
          time: '18:00',
          imageQuery: 'ammoudi bay santorini dinner sunset',
        },
      ],
    },
    {
      dayNum: 2,
      title: 'Sailing the Caldera',
      date: 'Tuesday, Aug 13',
      activities: [
        {
          id: 3,
          category: 'ACTIVITY',
          name: 'Semi-Private Catamaran Cruise',
          description: 'A 5-hour sail around the volcano, hot springs, and Red Beach. Includes a full BBQ lunch onboard and snorkeling equipment. Don\'t forget sunscreen!',
          time: '10:00 - 15:00',
          imageQuery: 'catamaran sailing santorini caldera',
        },
      ],
    },
  ],
};

export const activities = [
  {
    id: 1,
    name: 'Private Tuscan Villa Cooking Masterclass',
    category: 'Food & Wine',
    match: 98,
    duration: '4 Hours',
    cost: '$$$',
    location: 'Chianti Region',
    imageQuery: 'tuscan cooking class villa',
    featured: true,
  },
  {
    id: 2,
    name: 'Path of the Gods Sunrise Hike',
    category: 'Adventure',
    duration: '5 Hrs',
    cost: '$$',
    imageQuery: 'amalfi coast hiking trail sunrise',
    featured: true,
  },
  {
    id: 3,
    name: 'Traditional Maiolica Pottery Workshop',
    category: 'Culture',
    duration: '2h',
    cost: 85,
    costLabel: '$85 / person',
    description: 'Learn ancient ceramic techniques from a local artisan in Florence.',
    imageQuery: 'italian pottery workshop florence',
  },
  {
    id: 4,
    name: 'Vintage Vespa City Tour',
    category: 'Sightseeing',
    duration: '3h',
    cost: 120,
    costLabel: '$120 / person',
    description: 'Zip through hidden alleys and iconic piazzas like a true local.',
    imageQuery: 'vespa tour rome italy',
  },
  {
    id: 5,
    name: 'Bologna Secret Food Tour',
    category: 'Food & Wine',
    duration: '3.5h',
    cost: 95,
    costLabel: '$95 / person',
    description: "Taste your way through the culinary capital's historic markets.",
    imageQuery: 'bologna food market italy',
  },
];

export const adminStats = {
  activeTrips: { value: '14,208', change: '+12.4%', trend: 'up' },
  newUsers: { value: '3,842', change: '+8.2%', trend: 'up' },
  avgBudget: { value: '$4,250', change: '+18.5%', trend: 'up' },
  openReports: { value: '24', change: '— 0.0%', trend: 'neutral', detail: 'Spam: 18  Other: 6' },
};

export const adminUsers = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'Active', role: 'Pro Explorer', lastActive: '2 mins ago', avatar: null },
  { id: 2, name: 'Marcus Chen', email: 'marcus.c@example.com', status: 'Active', role: 'Basic', lastActive: '1 hour ago', initials: 'MC' },
  { id: 3, name: 'David Reynolds', email: 'david.r@example.com', status: 'Inactive', role: 'Basic', lastActive: '2 weeks ago', avatar: null },
  { id: 4, name: 'System Admin', email: 'admin@globetrotter.io', status: 'Locked', role: 'Administrator', lastActive: 'Just now', initials: '⚠' },
];

export const popularCities = [
  { name: 'NYC', value: 6200 },
  { name: 'Paris', value: 5800 },
  { name: 'Tokyo', value: 8200 },
  { name: 'London', value: 5100 },
  { name: 'Rome', value: 4800 },
];

export const engagementHeatmap = [
  [3, 7, 6, 4, 3, 2, 1],
  [2, 5, 8, 3, 6, 4, 2],
  [4, 6, 5, 7, 4, 8, 7],
];
