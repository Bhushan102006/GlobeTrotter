import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Filter, ChevronDown, Plus } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { topDestinations, previousTrips } from '../../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <PexelsImage
          query="beautiful mountain landscape travel adventure"
          alt="Discover Your Next Adventure"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        <div className="dashboard-hero-overlay" />
        <h1>Discover Your Next Adventure</h1>
      </div>

      {/* Search Bar */}
      <div className="dashboard-search-bar">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input type="text" placeholder="Search destinations, trips..." />
        </div>
        <div className="search-actions">
          <button className="btn btn-secondary btn-sm">
            <SlidersHorizontal size={15} />
            Group by
          </button>
          <button className="btn btn-secondary btn-sm">
            <Filter size={15} />
            Filter
          </button>
          <button className="btn btn-secondary btn-sm">
            Sort by...
            <ChevronDown size={15} />
          </button>
        </div>
      </div>

      {/* Top Regional Selections */}
      <div className="dashboard-section">
        <h2 className="section-title">Top Regional Selections</h2>
        <div className="top-destinations-grid">
          {topDestinations.map((dest) => (
            <Link to="/explore" key={dest.id} className="destination-card-small">
              <PexelsImage
                query={dest.query}
                alt={dest.name}
                size="large"
              />
              <div className="dest-overlay" />
              <span className="dest-name">{dest.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Previous Trips */}
      <div className="dashboard-section">
        <h2 className="section-title">Previous Trips</h2>
        <div className="previous-trips-grid">
          {previousTrips.map((trip) => (
            <div key={trip.id} className="trip-card-prev">
              <div className="trip-card-prev-img">
                <PexelsImage
                  query={trip.coverQuery}
                  alt={trip.name}
                  size="medium"
                />
              </div>
              <div className="trip-card-prev-info">
                <h3>{trip.name}</h3>
                <p>{trip.date} • {trip.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB Button */}
      <Link to="/create-trip" className="plan-trip-fab">
        <Plus size={18} />
        Plan a trip
      </Link>
    </div>
  );
}
