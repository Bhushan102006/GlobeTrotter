import { useState } from 'react';
import { Calendar as CalIcon, Plus, GripVertical, ArrowDown, X, Sparkles } from 'lucide-react';
import { calendarEvents as initialEvents, unscheduledActivities as initialUnscheduled } from '../../data/mockData';
import './Calendar.css';

const defaultCategories = [
  { key: 'accommodation', name: 'Accommodation', color: 'var(--color-accommodation)', checked: true },
  { key: 'transport', name: 'Transport', color: 'var(--color-transport)', checked: true },
  { key: 'sightseeing', name: 'Sightseeing & Activities', color: 'var(--color-warning)', checked: true },
  { key: 'dining', name: 'Dining', color: 'var(--color-dining)', checked: true },
  { key: 'nature', name: 'Nature & Parks', color: 'var(--color-nature)', checked: true },
];

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const categoryIcons = {
  transport: '✈',
  accommodation: '🏨',
  sightseeing: '🏛',
  nature: '🌿',
  dining: '🍴',
};

// Generate calendar cells for October 2024 (starts on Tuesday)
const generateMonthCells = () => {
  const cells = [];
  for (let i = 0; i < 2; i++) cells.push({ date: null });
  for (let d = 1; d <= 31; d++) cells.push({ date: d });
  while (cells.length % 7 !== 0) cells.push({ date: null });
  return cells;
};

const monthCells = generateMonthCells();
const tripDates = new Set([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);

// Trip Week Focus Days (Oct 12 to Oct 18)
const weekFocusDays = [
  { date: 12, dayName: 'SAT', full: 'Oct 12 (Sat)' },
  { date: 13, dayName: 'SUN', full: 'Oct 13 (Sun)' },
  { date: 14, dayName: 'MON', full: 'Oct 14 (Mon)' },
  { date: 15, dayName: 'TUE', full: 'Oct 15 (Tue)' },
  { date: 16, dayName: 'WED', full: 'Oct 16 (Wed)' },
  { date: 17, dayName: 'THU', full: 'Oct 17 (Thu)' },
  { date: 18, dayName: 'FRI', full: 'Oct 18 (Fri)' },
];

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'week'
  const [categories, setCategories] = useState(defaultCategories);
  const [events, setEvents] = useState(initialEvents);
  const [unscheduled, setUnscheduled] = useState(initialUnscheduled);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityCategory, setActivityCategory] = useState('sightseeing');
  const [activityDate, setActivityDate] = useState(12);

  const toggleCategory = (key) => {
    setCategories(prev => prev.map(c => c.key === key ? { ...c, checked: !c.checked } : c));
  };

  const activeCategoryKeys = new Set(categories.filter(c => c.checked).map(c => c.key));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!activityTitle.trim()) return;

    const newEvent = {
      id: Date.now(),
      date: Number(activityDate),
      title: activityTitle.trim(),
      category: activityCategory,
    };

    setEvents(prev => [...prev, newEvent]);

    // Remove from unscheduled if present
    setUnscheduled(prev => prev.filter(u => u.name.toLowerCase() !== activityTitle.trim().toLowerCase()));

    setActivityTitle('');
    setShowAddModal(false);
  };

  const handleQuickScheduleUnscheduled = (act) => {
    setActivityTitle(act.name);
    setActivityCategory('sightseeing');
    setActivityDate(12);
    setShowAddModal(true);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-top">
        <div>
          <h1>Trip Calendar</h1>
          <div className="cal-info">
            <CalIcon size={14} /> October 12 - October 26 • Japan Odyssey
          </div>
        </div>
        <div className="calendar-top-right">
          <div className="view-mode-toggle">
            <button
              className={viewMode === 'month' ? 'active' : ''}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button
              className={viewMode === 'week' ? 'active' : ''}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => { setActivityTitle(''); setShowAddModal(true); }}>
            <Plus size={16} /> Add Activity
          </button>
        </div>
      </div>

      <div className="calendar-content">
        {/* Left Category Filter Sidebar */}
        <aside className="cal-categories">
          <h3>Categories</h3>
          {categories.map(cat => (
            <label key={cat.key} className="cal-category-item">
              <input
                type="checkbox"
                checked={cat.checked}
                onChange={() => toggleCategory(cat.key)}
              />
              <div className="cal-cat-dot" style={{ background: cat.color }} />
              {cat.name}
            </label>
          ))}
        </aside>

        {/* Calendar Grid View */}
        <div className="calendar-grid">
          {viewMode === 'month' ? (
            <>
              <div className="cal-header-row">
                {weekDays.map(d => <div key={d} className="cal-header-cell">{d}</div>)}
              </div>
              <div className="cal-body">
                {monthCells.map((cell, i) => (
                  <div key={i} className="cal-cell">
                    {cell.date && (
                      <>
                        <div className={`cal-date${tripDates.has(cell.date) ? ' active' : ''}`}>{cell.date}</div>
                        {events
                          .filter(e => e.date === cell.date && activeCategoryKeys.has(e.category))
                          .map(event => (
                            <div key={event.id} className={`cal-event ${event.category}`} title={event.title}>
                              {categoryIcons[event.category] || '✨'} {event.title}
                            </div>
                          ))
                        }
                        {cell.date === 27 && <div className="trip-end-marker"><ArrowDown size={12} /><br />TRIP END</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Week Focus View (Days 12–18) */
            <>
              <div className="cal-header-row">
                {weekFocusDays.map(d => (
                  <div key={d.date} className="cal-header-cell" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                    {d.dayName} {d.date}
                  </div>
                ))}
              </div>
              <div className="cal-body" style={{ minHeight: '340px' }}>
                {weekFocusDays.map((d) => (
                  <div key={d.date} className="cal-cell" style={{ minHeight: '340px', background: '#fafafa' }}>
                    <div className="cal-date active" style={{ fontSize: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>
                      Oct {d.date}
                    </div>
                    {events
                      .filter(e => e.date === d.date && activeCategoryKeys.has(e.category))
                      .map(event => (
                        <div key={event.id} className={`cal-event ${event.category}`} style={{ padding: '6px 8px', fontSize: '12px', marginBottom: '6px' }}>
                          {categoryIcons[event.category] || '✨'} {event.title}
                        </div>
                      ))
                    }
                    {events.filter(e => e.date === d.date && activeCategoryKeys.has(e.category)).length === 0 && (
                      <div style={{ color: '#9ca3af', fontSize: '12px', fontStyle: 'italic', marginTop: '12px' }}>
                        No events planned
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Unscheduled Activities Section */}
      <div className="unscheduled-section">
        <h4>Unscheduled Activities (Click to Schedule)</h4>
        <div className="unscheduled-list">
          {unscheduled.length > 0 ? (
            unscheduled.map(act => (
              <div
                key={act.id}
                className="unscheduled-item"
                onClick={() => handleQuickScheduleUnscheduled(act)}
                title="Click to schedule into calendar"
              >
                <GripVertical size={14} style={{ color: 'var(--color-gray-300)' }} />
                {act.name}
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--color-gray-400)', fontSize: '13px' }}>All items scheduled!</p>
          )}
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-card" style={{ background: '#ffffff', width: '90%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Add Calendar Activity</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Activity Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senso-ji Temple Visit, Tea Ceremony..."
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  required
                  autoFocus
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Category</label>
                  <select
                    value={activityCategory}
                    onChange={(e) => setActivityCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="sightseeing">Sightseeing & Activities</option>
                    <option value="transport">Transport</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="dining">Dining</option>
                    <option value="nature">Nature & Parks</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Date (October 2024)</label>
                  <select
                    value={activityDate}
                    onChange={(e) => setActivityDate(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
                  >
                    {Array.from({ length: 31 }, (_, idx) => idx + 1).map(d => (
                      <option key={d} value={d}>Oct {d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
