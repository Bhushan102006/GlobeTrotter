import { createContext, useContext, useState, useEffect } from 'react';
import { tripApi } from '../services/api';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [activeTripId, setActiveTripId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load trips from API on mount; fall back to localStorage if offline
  useEffect(() => {
    const load = async () => {
      try {
        const res = await tripApi.list();
        const apiTrips = Array.isArray(res.response) ? res.response : [];
        setTrips(apiTrips);
        if (apiTrips.length > 0 && !activeTripId) {
          setActiveTripId(String(apiTrips[0].id));
        }
      } catch {
        // Offline fallback
        try {
          const saved = localStorage.getItem('globetrotter_trips');
          const local = saved ? JSON.parse(saved) : [];
          setTrips(local);
          if (local.length > 0 && !activeTripId) {
            setActiveTripId(String(local[0].id));
          }
        } catch { /* ignore */ }
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist trips to localStorage as backup cache
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('globetrotter_trips', JSON.stringify(trips));
      } catch { /* ignore */ }
    }
  }, [trips, loading]);

  // ── Add Trip ──────────────────────────────────────────────────
  const addTrip = (newTrip) => {
    const fullTrip = {
      ...newTrip,
      stops: (newTrip.stops || []).map((s, i) =>
        typeof s === 'string'
          ? { id: i + 1, city: s, startDate: newTrip.startDate, endDate: newTrip.endDate, nights: 3, tags: [], imageQuery: `${s} landmark`, activities: [] }
          : s
      ),
    };
    setTrips(prev => [fullTrip, ...prev]);
    setActiveTripId(String(fullTrip.id));
  };

  // ── Update Trip (local + API) ─────────────────────────────────
  const updateTrip = async (updatedTrip) => {
    setTrips(prev => prev.map(t => String(t.id) === String(updatedTrip.id) ? updatedTrip : t));
    try {
      await tripApi.update(String(updatedTrip.id), updatedTrip);
    } catch { /* silent: local state already updated */ }
  };

  // ── Add Stop ─────────────────────────────────────────────────
  const addStopToTrip = async (tripId, stopName) => {
    try {
      const res = await tripApi.addStop(String(tripId), { city: stopName, country: '', notes: '' });
      setTrips(prev => prev.map(t => String(t.id) === String(tripId) ? res.response : t));
    } catch {
      // Offline fallback
      setTrips(prev => prev.map(t => {
        if (String(t.id) !== String(tripId)) return t;
        const newStop = { id: Date.now(), city: stopName, startDate: t.startDate, endDate: t.endDate, nights: 3, tags: [], imageQuery: `${stopName} landmark`, activities: [] };
        return { ...t, stops: [...(t.stops || []), newStop] };
      }));
    }
  };

  // ── Add Activity ─────────────────────────────────────────────
  const addActivityToTrip = async (tripId, stopIndex, activity) => {
    try {
      const payload = {
        title: activity.name || activity.title,
        category: activity.category || 'General',
        date: activity.date || null,
        time: activity.time || '',
        duration: activity.duration || '',
        cost: activity.cost ? parseFloat(String(activity.cost).replace(/[₹,]/g, '')) || 0 : 0,
        description: activity.description || '',
        status: 'planned',
      };
      const res = await tripApi.addActivity(String(tripId), payload);
      setTrips(prev => prev.map(t => String(t.id) === String(tripId) ? res.response : t));
    } catch {
      // Offline fallback
      setTrips(prev => prev.map(t => {
        if (String(t.id) !== String(tripId)) return t;
        const updatedStops = (t.stops || []).map((stop, idx) => {
          if (idx !== stopIndex) return stop;
          return { ...stop, activities: [...(stop.activities || []), { id: Date.now(), ...activity }] };
        });
        return { ...t, stops: updatedStops };
      }));
    }
  };

  return (
    <TripContext.Provider value={{ trips, activeTripId, setActiveTripId, addTrip, updateTrip, addStopToTrip, addActivityToTrip, loading }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrips = () => useContext(TripContext);
