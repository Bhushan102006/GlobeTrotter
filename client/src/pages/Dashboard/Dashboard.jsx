import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Filter, ChevronDown, Plus, X, Globe, MapPin, Sparkles, Compass, Check } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { topDestinations, previousTrips } from '../../data/mockData';
import { wikiData } from '../../data/wikiData';
import './Dashboard.css';

export default function Dashboard() {
  const [selectedDest, setSelectedDest] = useState(null);
  const [addedTrips, setAddedTrips] = useState({});

  const handleCardClick = (destName) => {
    const key = destName.toLowerCase();
    const data = wikiData[key] || wikiData['paris'];
    setSelectedDest(data);
  };

  const handleAddToTrip = (title) => {
    setAddedTrips((prev) => ({ ...prev, [title]: true }));
    alert(`"${title}" has been added to your trip!`);
  };

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
            <div
              key={dest.id}
              className="destination-card-small"
              onClick={() => handleCardClick(dest.name)}
            >
              <PexelsImage
                query={dest.query}
                alt={dest.name}
                size="large"
              />
              <div className="dest-overlay" />
              <span className="dest-name">{dest.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Trips */}
      <div className="dashboard-section">
        <h2 className="section-title">Previous Trips</h2>
        <div className="previous-trips-grid">
          {previousTrips.map((trip) => (
            <div
              key={trip.id}
              className="trip-card-prev"
              onClick={() => handleCardClick(trip.name)}
            >
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

      {/* Enlarged Destination Card Modal */}
      {selectedDest && (
        <div className="wiki-modal-overlay" onClick={() => setSelectedDest(null)}>
          <div className="wiki-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="wiki-close-btn" onClick={() => setSelectedDest(null)}>
              <X size={20} />
            </button>

            <div className="wiki-modal-hero">
              <PexelsImage
                query={selectedDest.coverQuery}
                alt={selectedDest.title}
                size="large"
              />
              <div className="wiki-hero-overlay" />
              <div className="wiki-hero-text">
                <div className="wiki-badges">
                  <span className="wiki-badge"><MapPin size={13} /> {selectedDest.country}</span>
                  <span className="wiki-badge-sub">{selectedDest.region}</span>
                </div>
                <h2>{selectedDest.title}</h2>
                <p className="wiki-tagline">{selectedDest.tagline}</p>
              </div>
            </div>

            <div className="wiki-modal-body">
              <div className="wiki-section">
                <h3><Globe size={18} /> Overview</h3>
                <p className="wiki-overview">{selectedDest.overview}</p>
              </div>

              <div className="wiki-section">
                <h3><Compass size={18} /> Key Facts</h3>
                <div className="wiki-facts-grid">
                  {selectedDest.keyFacts.map((fact, idx) => (
                    <div key={idx} className="wiki-fact-item">
                      <span className="fact-label">{fact.label}</span>
                      <span className="fact-value">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wiki-section">
                <h3><Sparkles size={18} /> Top Attractions & Highlights</h3>
                <div className="wiki-highlights-list">
                  {selectedDest.highlights.map((item, idx) => (
                    <div key={idx} className="wiki-highlight-card">
                      <h4>{item.name}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wiki-modal-footer">
                {addedTrips[selectedDest.title] ? (
                  <button className="btn btn-secondary" style={{ color: 'var(--color-success, #10b981)', borderColor: 'var(--color-success, #10b981)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} /> Added to Trip
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToTrip(selectedDest.title)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={16} /> Add to Trip
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setSelectedDest(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <Link to="/create-trip" className="plan-trip-fab">
        <Plus size={18} />
        Plan a trip
      </Link>
    </div>
  );
}


