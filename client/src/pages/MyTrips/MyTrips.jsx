import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, SlidersHorizontal } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { useTrips } from '../../context/TripContext';
import './MyTrips.css';

const filters = ['All', 'Upcoming', 'Completed'];

const statusColors = {
  upcoming: 'var(--color-primary)',
  planning: 'var(--color-warning)',
  completed: 'var(--color-success)',
};

export default function MyTrips() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { trips } = useTrips();

  const filtered = activeFilter === 'All'
    ? trips
    : trips.filter(t => t.status.toLowerCase() === activeFilter.toLowerCase());

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

      <div className="trips-grid">
        <Link to="/create-trip" className="create-trip-card">
          <div className="plus-icon"><Plus size={24} /></div>
          <h3>Create New Trip</h3>
          <p>Start planning your next adventure</p>
        </Link>

        {filtered.map(trip => (
          <div key={trip.id} className="trip-card">
            <div className="trip-card-cover">
              <PexelsImage query={trip.coverQuery} alt={trip.name} size="medium" />
              <div className="dest-overlay" />
              <div className={`trip-status-badge ${trip.status}`}>
                <span className="badge">
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </div>
              <div className="trip-card-title">
                <h3>{trip.name}</h3>
                <div className="trip-dates">
                  <Calendar size={12} />
                  {trip.startDate
                    ? `${new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : 'Dates TBD'
                  }
                </div>
              </div>
            </div>
            <div className="trip-card-meta">
              <div className="trip-meta-row">
                <div className="trip-meta-item">
                  <span>Duration</span>
                  <span>{trip.duration ? `${trip.duration} Days` : 'Est. 14 Days'}</span>
                </div>
                <div className="trip-meta-item">
                  <span>Destinations</span>
                  <span>{trip.destinations} Stops</span>
                </div>
              </div>
              <div className="trip-card-footer">
                <div className="trip-travelers">
                  <div className="traveler-dot" />
                  {trip.travelers > 1 && <span className="traveler-count">+{trip.travelers - 1}</span>}
                </div>
                <div className="trip-progress">
                  <div
                    className="trip-progress-bar"
                    style={{
                      width: `${trip.budget ? (trip.spent / trip.budget) * 100 : 0}%`,
                      background: statusColors[trip.status] || 'var(--color-primary)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
