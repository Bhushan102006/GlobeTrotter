import { useState } from 'react';
import { Calendar, Users, Share2, CheckCircle, Edit2, GripVertical, Plus, Train, MapPin, Ticket } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { itineraryData } from '../../data/mockData';
import './Itinerary.css';

const categoryColors = {
  Food: 'food',
  Culture: 'culture',
  Nature: 'nature',
  Adventure: 'adventure',
};

const categoryIcons = {
  Food: '🍴',
  Culture: '◇',
  Nature: '🌿',
  Adventure: '⛰',
};

const statusDots = {
  confirmed: 'var(--color-error)',
  planned: 'var(--color-primary-light)',
};

export default function Itinerary() {
  const [activeStop, setActiveStop] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const data = itineraryData;
  const currentStop = data.stops[activeStop];

  return (
    <div className="itinerary-page">
      <div className="itinerary-top">
        <div>
          <h1>{data.tripName}</h1>
          <div className="trip-meta">
            <span><Calendar size={14} /> {data.startDate} - {data.endDate}</span>
            <span>•</span>
            <span><Users size={14} /> {data.travelers} Travelers</span>
          </div>
        </div>
        <div className="itinerary-actions">
          <button className="btn btn-secondary"><Share2 size={16} /> Share</button>
          <button className="btn btn-primary"><CheckCircle size={16} /> Finalize Trip</button>
        </div>
      </div>

      <div className="itinerary-content">
        {/* Route Overview */}
        <div className="route-overview">
          <div className="route-header">
            <h2>Route Overview</h2>
            <button><Edit2 size={14} /> Edit</button>
          </div>

          <div className="route-timeline">
            {data.stops.map((stop, i) => (
              <div key={stop.id}>
                <div
                  className={`route-stop${activeStop === i ? ' active' : ''}`}
                  onClick={() => setActiveStop(i)}
                >
                  <div className="route-dot" />
                  <div className="stop-card">
                    <div className="stop-card-header">
                      <div>
                        <h3>{stop.city}</h3>
                        <div className="stop-dates">{stop.startDate} - {stop.endDate} • {stop.nights} Nights</div>
                      </div>
                      <GripVertical size={16} style={{ color: 'var(--color-gray-300)' }} />
                    </div>
                    {stop.tags.length > 0 && (
                      <div className="stop-tags">
                        {stop.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
                {stop.transport && (
                  <div className="transport-connector">
                    <Train size={12} /> {stop.transport}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="add-dest-btn">
            <Plus size={16} /> Add Destination
          </button>
        </div>

        {/* Detail Panel */}
        <div className="itinerary-detail">
          {/* City Hero */}
          <div className="city-hero">
            <PexelsImage query={currentStop.imageQuery} alt={currentStop.city} size="large" />
            <div className="city-hero-overlay" />
            <div className="city-hero-content">
              <div className="city-hero-meta">Trip Dates</div>
              <h2>{currentStop.city}</h2>
              <div className="city-hero-dates">{currentStop.startDate} - {currentStop.endDate}</div>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="day-tabs">
            {data.days.map((d, i) => (
              <button
                key={i}
                className={`day-tab${activeDay === i ? ' active' : ''}`}
                onClick={() => setActiveDay(i)}
              >
                <div className="day-label">DAY {d.day}</div>
                <div className="day-date">{d.date}</div>
                <div className="day-weekday">{d.weekday}</div>
              </button>
            ))}
          </div>

          {/* Activities */}
          <div className="activity-list">
            {data.activities.map(act => (
              <div key={act.id} className="activity-card">
                <div className="activity-time">
                  <div className="time">
                    {act.time}
                    <span className="time-dot" style={{ background: statusDots[act.status] || 'var(--color-gray-300)' }} />
                  </div>
                  <div className="duration">{act.duration}</div>
                </div>
                <div className="activity-thumb">
                  <PexelsImage query={act.imageQuery} alt={act.name} size="small" />
                </div>
                <div className="activity-info">
                  <h4>{act.name}</h4>
                  <p>{act.description}</p>
                  <div className="activity-tags">
                    <span className={`category-tag ${categoryColors[act.category] || ''}`}>
                      {categoryIcons[act.category]} {act.category}
                    </span>
                    {act.cost && <span className="tag">$ {act.cost}</span>}
                    {act.tags && act.tags.map(t => (
                      <span key={t} className="tag"><Ticket size={10} /> {t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
