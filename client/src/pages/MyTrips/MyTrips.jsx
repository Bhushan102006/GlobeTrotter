import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, SlidersHorizontal } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { tripApi } from '../../services/api';
import './MyTrips.css';

const filters = ['All', 'Upcoming', 'Completed'];

const statusColors = {
  upcoming: 'var(--color-primary)',
  planning: 'var(--color-warning)',
  completed: 'var(--color-success)',
};

export default function MyTrips() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await tripApi.list();
        setTrips(Array.isArray(response.response) ? response.response : []);
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load trips.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filtered = activeFilter === 'All'
    ? trips
    : trips.filter(t => (t.status || 'planning').toLowerCase() === activeFilter.toLowerCase());

  return (
    <div>
      <div className="mytrips-header">
        <div className="mytrips-header-inner">
          <div>
            <div className="label">Your Journeys</div>
            <h1>My Trips</h1>
            <p>Manage your upcoming adventures, continue planning your dream getaways, and revisit memories from past travels.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div className="filter-tabs">
              {filters.map(f => (
                <button
                  key={f}
                  className={`filter-tab${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="btn btn-icon btn-secondary">
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ padding: '0 2rem 1rem', color: '#ef4444', fontWeight: 600 }}>{error}</div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-gray-500)' }}>Loading trips...</div>
      ) : (
        <div className="trips-grid">
          <Link to="/create-trip" className="create-trip-card">
            <div className="plus-icon"><Plus size={24} /></div>
            <h3>Create New Trip</h3>
            <p>Start planning your next adventure</p>
          </Link>

          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: 'var(--color-gray-500)' }}>
              No trips yet. Create your first trip to get started.
            </div>
          ) : (
            filtered.map(trip => {
              const startDate = trip.startDate ? new Date(trip.startDate) : null;
              const endDate = trip.endDate ? new Date(trip.endDate) : null;
              const duration = startDate && endDate ? Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1) : 0;
              const status = (trip.status || 'planning').toLowerCase();
              const destination = trip.destination || trip.name || 'Travel Destination';

              return (
                <div key={trip.id} className="trip-card">
                  <div className="trip-card-cover">
                    <PexelsImage query={destination} alt={trip.name} size="medium" />
                    <div className="dest-overlay" />
                    <div className={`trip-status-badge ${status}`}>
                      <span className="badge">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    <div className="trip-card-title">
                      <h3>{trip.name}</h3>
                      <div className="trip-dates">
                        <Calendar size={12} />
                        {startDate && endDate
                          ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                          : 'Dates TBD'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="trip-card-meta">
                    <div className="trip-meta-row">
                      <div className="trip-meta-item">
                        <span>Duration</span>
                        <span>{duration ? `${duration} Days` : 'Est. 14 Days'}</span>
                      </div>
                      <div className="trip-meta-item">
                        <span>Destinations</span>
                        <span>{Array.isArray(trip.stops) ? trip.stops.length : 0} Stops</span>
                      </div>
                    </div>
                    <div className="trip-card-footer">
                      <div className="trip-travelers">
                        <div className="traveler-dot" />
                        {(trip.travelers || 1) > 1 && <span className="traveler-count">+{(trip.travelers || 1) - 1}</span>}
                      </div>
                      <div className="trip-progress">
                        <div
                          className="trip-progress-bar"
                          style={{
                            width: `${(trip.budget || 0) ? ((trip.spent || 0) / (trip.budget || 1)) * 100 : 0}%`,
                            background: statusColors[status] || 'var(--color-primary)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
