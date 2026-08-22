import { Share2, Copy, MapPin, Calendar, Waves, PersonStanding, Map, List, LayoutGrid } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import './Community.css';

const communityTrip = {
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
      dayNum: 1, title: 'Arrival & Oia Exploration', date: 'Monday, Aug 12',
      activities: [
        { id: 1, category: 'LODGING', name: 'Check-in: Canaves Oia Suites', description: 'Settle into the cliffside cave suite. Unpack, enjoy the welcome wine, and take a quick dip in the plunge pool before heading out.', time: '14:00', imageQuery: 'santorini cave hotel suite' },
        { id: 2, category: 'DINING', name: 'Sunset Dinner at Ammoudi Fish Tavern', description: 'Walk down the 300 steps from Oia to Ammoudi Bay. Reserve a table by the water for fresh catch of the day and spectacular views of the sunset.', time: '18:00', imageQuery: 'ammoudi bay santorini dinner sunset' },
      ],
    },
    {
      dayNum: 2, title: 'Sailing the Caldera', date: 'Tuesday, Aug 13',
      activities: [
        { id: 3, category: 'ACTIVITY', name: 'Semi-Private Catamaran Cruise', description: "A 5-hour sail around the volcano, hot springs, and Red Beach. Includes a full BBQ lunch onboard and snorkeling equipment. Don't forget sunscreen!", time: '10:00 - 15:00', imageQuery: 'catamaran sailing santorini caldera' },
      ],
    },
  ],
};



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
