import { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Heart, Plus, Star } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { destinations } from '../../data/mockData';
import './Explore.css';

const regions = ['Europe', 'Asia', 'Oceania', 'Africa', 'Americas'];

export default function Explore() {
  const [selectedRegions, setSelectedRegions] = useState(['Asia']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRegion = (region) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const filtered = destinations.filter(d => {
    const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(d.region);
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <div className="explore-page">
      <div className="explore-controls">
        <div className="explore-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search cities, countries, or regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary">
          <SlidersHorizontal size={16} />
          Filters
        </button>
        <button className="btn btn-secondary">
          <ArrowUpDown size={16} />
          Sort
        </button>
      </div>

      <div className="explore-content">
        <aside className="explore-sidebar">
          <div className="filter-section">
            <h3>Region</h3>
            {regions.map(r => (
              <label key={r} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(r)}
                  onChange={() => toggleRegion(r)}
                />
                {r}
              </label>
            ))}
          </div>
          <div className="filter-section">
            <h3>Cost Index</h3>
            <div className="cost-slider">
              <input type="range" min="1" max="5" defaultValue="3" />
              <div className="cost-slider-labels">
                <span>$</span>
                <span>$$$$$</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="explore-grid">
          {filtered.map(dest => (
            <div key={dest.id} className="dest-card">
              <div className="dest-card-img">
                <PexelsImage query={dest.query} alt={dest.name} size="large" />
                <div className="dest-card-badges">
                  <span className="badge">{dest.costIndex}</span>
                  <span className="badge"><Star size={10} /> {dest.rating}</span>
                </div>
                <button className="dest-card-fav"><Heart size={16} /></button>
              </div>
              <div className="dest-card-info">
                <h3>{dest.name}</h3>
                <p className="dest-location">{dest.country}, {dest.region}</p>
                <button 
                  className="add-to-trip-btn"
                  onClick={() => alert(`Added ${dest.name} to your trip!`)}
                >
                  <Plus size={14} />
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
