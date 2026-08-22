import { Search, Sparkles, ChevronDown, Clock, MapPin, Grid3X3, List, Trash2 } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { activities } from '../../data/mockData';
import './Activities.css';

export default function Activities() {
  const featured = activities.filter(a => a.featured);
  const allExp = activities.filter(a => !a.featured);

  return (
    <div className="activities-page">
      <div className="activities-hero">
        <div className="activities-hero-inner">
          <div>
            <h1>Curate Your<br /><span>Experiences</span></h1>
            <p>Discover extraordinary moments. Filter by passion, time, or budget to weave unforgettable activities into your itinerary.</p>
          </div>
          <div className="match-score">
            <div className="match-score-circle">85</div>
            <div>
              <div className="match-score-label">Match Score</div>
              <div className="match-score-value">Highly Tailored</div>
            </div>
          </div>
        </div>
      </div>

      <div className="activities-filters">
        <div className="explore-search" style={{ maxWidth: 280 }}>
          <Search size={16} />
          <input type="text" placeholder="Search experiences (e.g., Cooking class)" />
        </div>
        <button className="filter-btn"><Sparkles size={14} /> Category <ChevronDown size={14} /></button>
        <button className="filter-btn"><Clock size={14} /> Duration <ChevronDown size={14} /></button>
        <button className="filter-btn">💰 Price Range <ChevronDown size={14} /></button>
        <button className="filter-btn active">AI Suggested</button>
        <button className="filter-btn">Top Rated</button>
        <div className="view-toggle">
          <button className="active"><Grid3X3 size={16} /></button>
          <button><List size={16} /></button>
        </div>
      </div>

      <div className="activities-content">
        <div className="activities-main">
          {/* Curated Section */}
          <div className="curated-section">
            <h2><Sparkles size={18} /> Curated for You</h2>
            <div className="curated-grid">
              {featured.map((act, i) => (
                <div key={act.id} className="curated-card" style={{ height: i === 0 ? 280 : 280 }}>
                  <PexelsImage query={act.imageQuery} alt={act.name} size="large" />
                  <div className="curated-card-overlay" />
                  <div className="curated-card-content">
                    <div style={{ display: 'flex', gap: '6px', marginBottom: 6 }}>
                      <span className="badge" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{act.category}</span>
                      {act.match && <span className="badge" style={{ background: 'var(--color-primary)', color: '#fff' }}>⭐ {act.match}% Match</span>}
                    </div>
                    <h3>{act.name}</h3>
                    <div className="meta">
                      <span><Clock size={12} /> {act.duration}</span>
                      <span>💰 {act.cost}</span>
                      {act.location && <span><MapPin size={12} /> {act.location}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Experiences */}
          <div className="all-experiences">
            <h2>All Experiences <span>Showing {allExp.length + featured.length} results</span></h2>
            <div className="exp-grid">
              {activities.filter(a => a.costLabel).map(act => (
                <div key={act.id} className="exp-card">
                  <div className="exp-card-img">
                    <PexelsImage query={act.imageQuery} alt={act.name} size="medium" />
                    <div className="exp-card-tag">
                      <span className="badge" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>{act.category}</span>
                    </div>
                  </div>
                  <div className="exp-card-info">
                    <h4>{act.name}</h4>
                    <p>{act.description}</p>
                    <div className="exp-card-footer">
                      <span className="price">FROM {act.costLabel}</span>
                      <span className="duration"><Clock size={12} /> {act.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="activities-sidebar">
          <div className="my-trip-panel">
            <h3>My Trip <Trash2 size={14} style={{ color: 'var(--color-gray-400)', cursor: 'pointer' }} /></h3>
            <div className="current-dest">
              <div><span>Current Destination</span><br /><strong style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} color="var(--color-primary)" /> Italy</strong></div>
            </div>
            <div className="budget-ring-row">
              <div>
                <div className="budget-ring-label">Budget Used</div>
                <div className="budget-ring-value">₹99,200 / ₹2,40,000</div>
              </div>
              <div className="budget-ring-circle" />
            </div>
            <div className="recently-added">
              <h4>Recently Added</h4>
              <div className="recent-item">
                <div className="recent-item-thumb">
                  <PexelsImage query="uffizi gallery florence" alt="Uffizi Gallery" size="small" />
                </div>
                <div className="recent-item-info">
                  <h5>Uffizi Gallery Skip-the-Line</h5>
                  <p>Day 2 • 2.5h</p>
                </div>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
              View Full Itinerary
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
