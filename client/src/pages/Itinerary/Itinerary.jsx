import { useState } from 'react';
import { Calendar, Users, Share2, CheckCircle, Edit2, GripVertical, Plus, Train, MapPin, Ticket, X, Sparkles } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { useTrips } from '../../context/TripContext';
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
  const { trips, activeTripId, setActiveTripId, addStopToTrip, addActivityToTrip, updateTrip } = useTrips();
  
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // New Stop Modal State
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [newStopName, setNewStopName] = useState('');

  // New Activity Modal State
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [activityCategory, setActivityCategory] = useState('Culture');
  const [activityTime, setActivityTime] = useState('10:00');
  const [activityDuration, setActivityDuration] = useState('2h 00m');
  const [activityCost, setActivityCost] = useState('₹1,500');
  const [activityDesc, setActivityDesc] = useState('');

  const activeTrip = trips.find(t => String(t.id) === String(activeTripId)) || trips[0];
  const isFinalized = activeTrip?.status === 'completed';
  
  // Format trip stops - support both API objects and simple strings
  const rawStops = activeTrip?.stops || [];
  const stops = rawStops.map((s, idx) => {
    if (typeof s === 'string') {
      return { id: idx + 1, city: s, startDate: activeTrip?.startDate, endDate: activeTrip?.endDate, nights: 3, tags: ['CULTURE'], imageQuery: `${s} landscape landmark`, activities: [] };
    }
    return { ...s, activities: s.activities || [] };
  });

  const safeStopIndex = Math.min(activeStopIndex, Math.max(0, stops.length - 1));
  const currentStop = stops[safeStopIndex] || { city: 'Destination', activities: [] };
  const activities = currentStop?.activities || [];

  // Generate days based on stop
  const displayDays = [
    { day: 1, date: '12', weekday: 'Sat' },
    { day: 2, date: '13', weekday: 'Sun' },
    { day: 3, date: '14', weekday: 'Mon' },
  ];

  const handleAddStopSubmit = (e) => {
    e.preventDefault();
    if (!newStopName.trim()) return;
    addStopToTrip(activeTrip.id, newStopName.trim());
    setNewStopName('');
    setShowAddStopModal(false);
    setActiveStopIndex(stops.length);
  };

  const handleAddActivitySubmit = (e) => {
    e.preventDefault();
    if (!activityName.trim()) return;

    const newActivity = {
      name: activityName.trim(),
      category: activityCategory,
      time: activityTime || '10:00',
      duration: activityDuration || '1h 30m',
      cost: activityCost.startsWith('₹') ? activityCost : `₹${activityCost}`,
      description: activityDesc || 'Custom planned activity.',
      imageQuery: `${activityName.trim()} ${currentStop.city}`,
      status: 'planned'
    };

    addActivityToTrip(activeTrip.id, safeStopIndex, newActivity);
    setActivityName('');
    setActivityDesc('');
    setShowAddActivityModal(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    alert(`🔗 Itinerary link for "${activeTrip?.name || 'Your Trip'}" copied to clipboard!`);
  };

  const handleFinalize = async () => {
    if (activeTrip) {
      const newStatus = isFinalized ? 'planning' : 'completed';
      await updateTrip({ ...activeTrip, status: newStatus });
    }
  };

  return (
    <div className="itinerary-page">
      {/* Top Header */}
      <div className="itinerary-top">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', background: 'var(--color-primary-50)', padding: '2px 10px', borderRadius: '12px', border: '1px solid var(--color-primary-light)' }}>
              Active Trip
            </span>
            {trips.length > 1 && (
              <select
                value={activeTrip?.id}
                onChange={(e) => { setActiveTripId(e.target.value); setActiveStopIndex(0); }}
                style={{ fontSize: '13px', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-gray-300)', background: 'var(--color-white)', color: 'var(--color-gray-800)', cursor: 'pointer' }}
              >
                {trips.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            )}
          </div>
          <h1>{activeTrip?.name || 'My Trip'}</h1>
          <div className="trip-meta">
            <span><Calendar size={14} /> {activeTrip?.startDate || 'TBD'} - {activeTrip?.endDate || 'TBD'}</span>
            <span>•</span>
            <span><Users size={14} /> {activeTrip?.travelers || 2} Travelers</span>
            <span>•</span>
            <span style={{ color: isFinalized ? 'var(--color-success)' : 'var(--color-primary)', fontWeight: '600', textTransform: 'capitalize' }}>
              Status: {activeTrip?.status || 'Planning'}
            </span>
          </div>
          {isFinalized && (
            <div style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '10px 16px', borderRadius: '10px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
              <CheckCircle size={16} />
              <span>This trip is finalized and marked as completed. You can view or modify its details anytime!</span>
            </div>
          )}
        </div>
        <div className="itinerary-actions">
          <button className="btn btn-secondary" onClick={handleShare}><Share2 size={16} /> Share</button>
          <button
            className={`btn ${isFinalized ? 'btn-success' : 'btn-primary'}`}
            onClick={handleFinalize}
            style={isFinalized ? { background: '#10b981', borderColor: '#10b981', color: '#ffffff' } : {}}
            title={isFinalized ? 'Click to reopen trip planning' : 'Finalize trip'}
          >
            <CheckCircle size={16} />
            {isFinalized ? 'Trip Finalized' : 'Finalize Trip'}
          </button>
        </div>
      </div>

      <div className="itinerary-content">
        {/* Left Panel: Route Overview */}
        <div className="route-overview">
          <div className="route-header">
            <h2>Route Overview ({stops.length} Stops)</h2>
          </div>

          <div className="route-timeline">
            {stops.map((stop, i) => (
              <div key={stop.id || i}>
                <div
                  className={`route-stop${safeStopIndex === i ? ' active' : ''}`}
                  onClick={() => setActiveStopIndex(i)}
                >
                  <div className="route-dot" />
                  <div className="stop-card">
                    <div className="stop-card-header">
                      <div>
                        <h3>{stop.city}</h3>
                        <div className="stop-dates">{stop.startDate || 'Day 1'} - {stop.endDate || 'Day 3'} • {stop.nights || 3} Nights</div>
                      </div>
                      <GripVertical size={16} style={{ color: 'var(--color-gray-300)' }} />
                    </div>
                    {stop.tags && stop.tags.length > 0 && (
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

          <button className="add-dest-btn" onClick={() => setShowAddStopModal(true)}>
            <Plus size={16} /> Add Destination
          </button>
        </div>

        {/* Right Panel: Active Stop Details */}
        <div className="itinerary-detail">
          {/* City Hero */}
          <div className="city-hero">
            <PexelsImage query={currentStop.imageQuery || `${currentStop.city} landmark`} alt={currentStop.city} size="large" />
            <div className="city-hero-overlay" />
            <div className="city-hero-content">
              <div className="city-hero-meta">Active Destination</div>
              <h2>{currentStop.city}</h2>
              <div className="city-hero-dates">{currentStop.startDate || 'Oct 12'} - {currentStop.endDate || 'Oct 17'}</div>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="day-tabs">
            {displayDays.map((d, i) => (
              <button
                key={i}
                className={`day-tab${activeDayIndex === i ? ' active' : ''}`}
                onClick={() => setActiveDayIndex(i)}
              >
                <div className="day-label">DAY {d.day}</div>
                <div className="day-date">{d.date}</div>
                <div className="day-weekday">{d.weekday}</div>
              </button>
            ))}
          </div>

          {/* Activity List & Add Action */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-gray-900)' }}>
              Activities in {currentStop.city}
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowAddActivityModal(true)}>
              <Plus size={14} /> Add Activity
            </button>
          </div>

          <div className="activity-list">
            {activities.length > 0 ? (
              activities.map(act => (
                <div key={act.id} className="activity-card">
                  <div className="activity-time">
                    <div className="time">
                      {act.time}
                      <span className="time-dot" style={{ background: statusDots[act.status] || 'var(--color-gray-300)' }} />
                    </div>
                    <div className="duration">{act.duration}</div>
                  </div>
                  <div className="activity-thumb">
                    <PexelsImage query={act.imageQuery || act.name} alt={act.name} size="small" />
                  </div>
                  <div className="activity-info">
                    <h4>{act.name}</h4>
                    <p>{act.description}</p>
                    <div className="activity-tags">
                      <span className={`category-tag ${categoryColors[act.category] || ''}`}>
                        {categoryIcons[act.category] || '✨'} {act.category}
                      </span>
                      {act.cost && <span className="tag">{act.cost.startsWith('₹') || act.cost === 'Free' ? act.cost : `₹ ${act.cost}`}</span>}
                      {act.tags && act.tags.map(t => (
                        <span key={t} className="tag"><Ticket size={10} /> {t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--color-white)', borderRadius: '16px', border: '1px dashed var(--color-gray-300)' }}>
                <Sparkles size={24} style={{ color: 'var(--color-primary)', marginBottom: '8px' }} />
                <p style={{ color: 'var(--color-gray-600)', fontSize: '15px', fontWeight: '500' }}>No activities planned for {currentStop.city} yet.</p>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '13px', marginBottom: '16px' }}>Start customizing your itinerary by adding experiences.</p>
                <button className="btn btn-primary btn-sm" onClick={() => setShowAddActivityModal(true)}>
                  <Plus size={14} /> Add First Activity
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Stop Modal */}
      {showAddStopModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-card" style={{ background: '#ffffff', width: '90%', maxWidth: '420px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Add New Destination Stop</h3>
              <button onClick={() => setShowAddStopModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddStopSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Destination / City Name</label>
                <input
                  type="text"
                  placeholder="e.g. Venice, Rome, Kyoto..."
                  value={newStopName}
                  onChange={(e) => setNewStopName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddStopModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Stop</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-card" style={{ background: '#ffffff', width: '90%', maxWidth: '480px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Add Activity for {currentStop.city}</h3>
              <button onClick={() => setShowAddActivityModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddActivitySubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Museum Tour, Sunset Cruise, Cooking Class..."
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Category</label>
                  <select
                    value={activityCategory}
                    onChange={(e) => setActivityCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Culture">Culture</option>
                    <option value="Food">Food</option>
                    <option value="Nature">Nature</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Estimated Cost (₹)</label>
                  <input
                    type="text"
                    placeholder="₹1,500"
                    value={activityCost}
                    onChange={(e) => setActivityCost(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Time</label>
                  <input
                    type="text"
                    placeholder="10:00 AM"
                    value={activityTime}
                    onChange={(e) => setActivityTime(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Duration</label>
                  <input
                    type="text"
                    placeholder="2h 00m"
                    value={activityDuration}
                    onChange={(e) => setActivityDuration(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Description</label>
                <textarea
                  placeholder="Details about booking, venue, or schedule..."
                  value={activityDesc}
                  onChange={(e) => setActivityDesc(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', height: '70px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddActivityModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

