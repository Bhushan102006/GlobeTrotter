import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, Heart, Plus, Star, Check, X } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import './Explore.css';

const destinations = [
  { id: 1, name: 'Paris', country: 'France', region: 'Europe', costIndex: '₹8,500/day', rating: 4.9, query: 'paris eiffel tower night' },
  { id: 2, name: 'Queenstown', country: 'New Zealand', region: 'Oceania', costIndex: '₹6,500/day', rating: 4.8, query: 'queenstown new zealand lake' },
  { id: 3, name: 'Ubud', country: 'Indonesia', region: 'Asia', costIndex: '₹3,200/day', rating: 4.7, query: 'ubud bali rice terraces' },
  { id: 4, name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: '₹7,200/day', rating: 4.9, query: 'tokyo shibuya crossing' },
  { id: 5, name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: '₹5,800/day', rating: 4.7, query: 'barcelona sagrada familia' },
  { id: 6, name: 'Santorini', country: 'Greece', region: 'Europe', costIndex: '₹9,000/day', rating: 4.8, query: 'santorini greece sunset' },
  { id: 7, name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: '₹2,500/day', rating: 4.5, query: 'bangkok temples thailand' },
  { id: 8, name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: '₹4,200/day', rating: 4.6, query: 'cape town table mountain' },
  { id: 9, name: 'Reykjavik', country: 'Iceland', region: 'Europe', costIndex: '₹9,500/day', rating: 4.7, query: 'reykjavik iceland northern lights' },
];


const regions = ['Europe', 'Asia', 'Oceania', 'Africa', 'Americas'];

export default function Explore() {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxCost, setMaxCost] = useState(10000);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price_asc', 'price_desc', 'rating_desc'
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [addedTrips, setAddedTrips] = useState({});

  const toggleRegion = (region) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const navigate = useNavigate();

  const handleAddToTrip = (destName) => {
    navigate('/create-trip', { state: { prefillDestination: destName } });
  };

  // Helper to extract numerical numeric price from costIndex string e.g. "₹8,500/day" -> 8500
  const getNumericCost = (costStr) => {
    if (!costStr) return 0;
    const cleaned = costStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const filtered = useMemo(() => {
    return destinations
      .filter(d => {
        const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(d.region);
        const matchSearch = !searchQuery ||
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(searchQuery.toLowerCase());
        const costVal = getNumericCost(d.costIndex);
        const matchCost = costVal <= maxCost;
        return matchRegion && matchSearch && matchCost;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return getNumericCost(a.costIndex) - getNumericCost(b.costIndex);
        if (sortBy === 'price_desc') return getNumericCost(b.costIndex) - getNumericCost(a.costIndex);
        if (sortBy === 'rating_desc') return b.rating - a.rating;
        return 0; // recommended / default
      });
  }, [selectedRegions, searchQuery, maxCost, sortBy]);

  return (
    <div className="explore-page">
      {/* Controls Bar */}
      <div className="explore-controls">
        <div className="explore-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search cities, countries, or regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="explore-actions">
          <button
            className={`btn btn-secondary ${selectedRegions.length > 0 || maxCost < 10000 ? 'active' : ''}`}
            onClick={() => { setSelectedRegions([]); setMaxCost(10000); setSearchQuery(''); }}
          >
            <SlidersHorizontal size={16} />
            Reset Filters
          </button>

          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowSortMenu(prev => !prev)}
            >
              <ArrowUpDown size={16} />
              Sort: {sortBy === 'price_asc' ? 'Price Low-High' : sortBy === 'price_desc' ? 'Price High-Low' : sortBy === 'rating_desc' ? 'Top Rated' : 'Recommended'}
            </button>

            {showSortMenu && (
              <div className="sort-dropdown-menu">
                <button className={sortBy === 'recommended' ? 'active' : ''} onClick={() => { setSortBy('recommended'); setShowSortMenu(false); }}>Recommended</button>
                <button className={sortBy === 'price_asc' ? 'active' : ''} onClick={() => { setSortBy('price_asc'); setShowSortMenu(false); }}>Price: Low to High</button>
                <button className={sortBy === 'price_desc' ? 'active' : ''} onClick={() => { setSortBy('price_desc'); setShowSortMenu(false); }}>Price: High to Low</button>
                <button className={sortBy === 'rating_desc' ? 'active' : ''} onClick={() => { setSortBy('rating_desc'); setShowSortMenu(false); }}>Highest Rating</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="explore-content">
        {/* Sidebar Filters */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0 }}>Max Daily Cost</h3>
              <span className="cost-value-badge">₹{maxCost.toLocaleString()}/day</span>
            </div>
            <div className="cost-slider">
              <input
                type="range"
                min="2500"
                max="10000"
                step="500"
                value={maxCost}
                onChange={(e) => setMaxCost(Number(e.target.value))}
              />
              <div className="cost-slider-labels">
                <span>₹2,500</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="explore-grid">
          {filtered.length > 0 ? (
            filtered.map(dest => (
              <div key={dest.id} className="dest-card">
                <div className="dest-card-img">
                  <PexelsImage query={dest.query} alt={dest.name} size="large" />
                  <div className="dest-card-badges">
                    <span className="badge cost-badge">{dest.costIndex}</span>
                    <span className="badge rating-badge"><Star size={10} fill="currentColor" /> {dest.rating}</span>
                  </div>
                  <button
                    className={`dest-card-fav ${favorites[dest.id] ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(dest.id)}
                    title={favorites[dest.id] ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={16} fill={favorites[dest.id] ? '#ef4444' : 'none'} color={favorites[dest.id] ? '#ef4444' : '#ffffff'} />
                  </button>
                </div>
                <div className="dest-card-info">
                  <h3>{dest.name}</h3>
                  <p className="dest-location">{dest.country}, {dest.region}</p>
                  
                  {addedTrips[dest.name] ? (
                    <button className="add-to-trip-btn added" style={{ background: '#10b981', color: '#ffffff' }}>
                      <Check size={14} />
                      Added to Trip
                    </button>
                  ) : (
                    <button
                      className="add-to-trip-btn"
                      onClick={() => handleAddToTrip(dest.name)}
                    >
                      <Plus size={14} />
                      Add to Trip
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-panel">
              <p>No destinations match your selected filters.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedRegions([]); setMaxCost(10000); setSearchQuery(''); }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

