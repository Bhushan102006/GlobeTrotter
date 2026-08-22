import { createContext, useContext, useState, useEffect } from 'react';
import { trips as initialTrips, itineraryData } from '../data/mockData';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('globetrotter_trips');
      return saved ? JSON.parse(saved) : initialTrips;
    } catch (e) {
      console.error('Failed to load trips from localStorage', e);
      return initialTrips;
    }
  });

  const [activeTripId, setActiveTripId] = useState(() => {
    return trips.length > 0 ? trips[0].id : null;
  });

  useEffect(() => {
    try {
      localStorage.setItem('globetrotter_trips', JSON.stringify(trips));
    } catch (e) {
      console.error('Failed to save trips to localStorage', e);
    }
  }, [trips]);

  const addTrip = (newTrip) => {
    // Standardize trip object structure with stops and activities
    const fullTrip = {
      ...newTrip,
      stops: newTrip.stops && typeof newTrip.stops[0] === 'object'
        ? newTrip.stops
        : (newTrip.stops || ['Main Destination']).map((s, i) => ({
            id: i + 1,
            city: typeof s === 'string' ? s : s.city || 'Destination',
            startDate: newTrip.startDate || 'Oct 12',
            endDate: newTrip.endDate || 'Oct 28',
            nights: 3,
            tags: ['CULTURE', 'FOOD'],
            imageQuery: `${typeof s === 'string' ? s : s.city} landmark landscape`,
            active: i === 0,
            activities: i === 0 ? [
              {
                id: Date.now() + 1,
                time: '10:00',
                duration: '2h 00m',
                name: `Explore ${typeof s === 'string' ? s : s.city} Highlights`,
                description: `Guided walking tour through historic streets and cultural landmarks.`,
                category: 'Culture',
                cost: '₹2,500',
                imageQuery: `${typeof s === 'string' ? s : s.city} city street`,
                status: 'confirmed',
              },
              {
                id: Date.now() + 2,
                time: '13:00',
                duration: '1h 30m',
                name: 'Local Food Tasting & Market Tour',
                description: 'Taste authentic local delicacies and fresh produce.',
                category: 'Food',
                cost: '₹1,800',
                imageQuery: 'local food market dish',
                status: 'planned',
              }
            ] : []
          }))
    };

    setTrips(prev => [fullTrip, ...prev]);
    setActiveTripId(fullTrip.id);
  };

  const updateTrip = (updatedTrip) => {
    setTrips(prev => prev.map(t => String(t.id) === String(updatedTrip.id) ? updatedTrip : t));
  };

  const addStopToTrip = (tripId, stopName) => {
    setTrips(prev => prev.map(t => {
      if (String(t.id) !== String(tripId)) return t;
      const currentStops = t.stops || [];
      const newStop = {
        id: Date.now(),
        city: stopName,
        startDate: t.startDate || 'Day 1',
        endDate: t.endDate || 'Day 3',
        nights: 3,
        tags: ['NEW'],
        imageQuery: `${stopName} travel destination`,
        activities: [
          {
            id: Date.now() + 10,
            time: '10:00',
            duration: '2h 00m',
            name: `Sightseeing in ${stopName}`,
            description: `Visit iconic places in ${stopName}.`,
            category: 'Adventure',
            cost: '₹2,000',
            imageQuery: `${stopName} landscape`,
            status: 'planned',
          }
        ]
      };
      return {
        ...t,
        destinations: (t.destinations || 0) + 1,
        stops: [...currentStops, newStop]
      };
    }));
  };

  const addActivityToTrip = (tripId, stopIndex, activity) => {
    setTrips(prev => prev.map(t => {
      if (String(t.id) !== String(tripId)) return t;
      const updatedStops = (t.stops || []).map((stop, idx) => {
        if (idx !== stopIndex) return stop;
        const currentActivities = stop.activities || [];
        return {
          ...stop,
          activities: [...currentActivities, { id: Date.now(), ...activity }]
        };
      });
      return { ...t, stops: updatedStops };
    }));
  };

  return (
    <TripContext.Provider value={{
      trips,
      activeTripId,
      setActiveTripId,
      addTrip,
      updateTrip,
      addStopToTrip,
      addActivityToTrip
    }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrips = () => useContext(TripContext);

