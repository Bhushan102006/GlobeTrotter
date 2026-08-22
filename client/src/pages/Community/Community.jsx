import { Share2, Copy, MapPin, Calendar, Waves, PersonStanding, Map, List, LayoutGrid } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { communityTrip } from '../../data/mockData';
import './Community.css';

export default function Community() {
  const trip = communityTrip;

  return (
    <div className="community-page">
      {/* Hero */}
      <div className="community-hero">
        <PexelsImage
          query={trip.heroQuery}
          alt={trip.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        <div className="community-hero-overlay" />
        <div className="community-hero-content">
          <div className="community-hero-badges">
            <span className="badge"><MapPin size={10} /> {trip.location}</span>
            <span className="badge"><Calendar size={10} /> {trip.dateRange}</span>
          </div>
          <h1>{trip.title}</h1>
          <div className="community-creator">
            <div className="creator-avatar">{trip.creator.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="creator-info">
              <span>Created by</span><br />
              <strong>{trip.creator.name}</strong>
            </div>
          </div>
        </div>
        <div className="community-hero-actions">
          <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
            <Share2 size={16} /> Share
          </button>
          <button className="btn btn-primary">
            <Copy size={16} /> Copy Trip
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="community-content">
        {/* Left Sidebar */}
        <div className="trip-summary">
          <div className="vibe-card">
            <h3>The Vibe</h3>
            <p>{trip.vibe}</p>
          </div>

          <div className="trip-stats">
            <div className="stat-item">
              <Waves size={20} className="stat-icon" />
              <div className="stat-value">{trip.duration}</div>
              <div className="stat-label">Duration</div>
            </div>
            <div className="stat-item">
              <PersonStanding size={20} className="stat-icon" />
              <div className="stat-value">{trip.pace}</div>
              <div className="stat-label">Pace</div>
            </div>
          </div>

          <div className="map-preview">
            <PexelsImage
              query="santorini map aerial view"
              alt="Map"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              size="medium"
            />
            <div className="map-preview-label">
              <Map size={14} /> Explore Map
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="community-itinerary">
          <h2>
            Itinerary
            <div className="itin-view-toggle">
              <button><List size={16} /></button>
              <button><LayoutGrid size={16} /></button>
            </div>
          </h2>

          {trip.days.map(day => (
            <div key={day.dayNum} className="day-block">
              <div className="day-header">
                <div className="day-circle">D{day.dayNum}</div>
                <div className="day-header-info">
                  <h3>{day.title}</h3>
                  <p>{day.date}</p>
                </div>
              </div>

              {day.activities.map(act => (
                <div key={act.id} className="day-activity">
                  <div className="day-activity-img">
                    <PexelsImage query={act.imageQuery} alt={act.name} size="small" />
                  </div>
                  <div className="day-activity-content">
                    <span className={`act-category ${act.category.toLowerCase()}`}>{act.category}</span>
                    <h4>{act.name}</h4>
                    <p>{act.description}</p>
                  </div>
                  <div className="day-activity-time">{act.time}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
