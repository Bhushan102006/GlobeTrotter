import { Calendar as CalIcon, Plus, GripVertical, Plane, Hotel, Utensils, MapPin, TreePine, ArrowDown } from 'lucide-react';
import { calendarEvents, unscheduledActivities } from '../../data/mockData';
import './Calendar.css';

const categories = [
  { name: 'Accommodation', color: 'var(--color-accommodation)', checked: true },
  { name: 'Transport', color: 'var(--color-transport)', checked: true },
  { name: 'Activities', color: 'var(--color-warning)', checked: true },
  { name: 'Dining', color: 'var(--color-dining)', checked: true },
];

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Generate calendar cells for October 2024 (starts on Tuesday)
const generateCells = () => {
  const cells = [];
  // Empty cells for days before Oct 1 (Oct 1 is Tuesday, so 2 empty)
  for (let i = 0; i < 2; i++) cells.push({ date: null });
  // Days 1-31
  for (let d = 1; d <= 31; d++) cells.push({ date: d });
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push({ date: null });
  return cells;
};

const calCells = generateCells();
const tripDates = new Set([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);

const categoryIcons = {
  transport: '✈',
  accommodation: '🏨',
  sightseeing: '🏛',
  nature: '🌿',
  dining: '🍴',
};

export default function CalendarPage() {
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
            <button className="active">Month</button>
            <button>Week</button>
          </div>
          <button className="btn btn-primary"><Plus size={16} /> Add Activity</button>
        </div>
      </div>

      <div className="calendar-content">
        <aside className="cal-categories">
          <h3>Categories</h3>
          {categories.map(cat => (
            <label key={cat.name} className="cal-category-item">
              <input type="checkbox" defaultChecked={cat.checked} />
              <div className="cal-cat-dot" style={{ background: cat.color }} />
              {cat.name}
            </label>
          ))}
        </aside>

        <div className="calendar-grid">
          <div className="cal-header-row">
            {weekDays.map(d => <div key={d} className="cal-header-cell">{d}</div>)}
          </div>
          <div className="cal-body">
            {calCells.map((cell, i) => (
              <div key={i} className="cal-cell">
                {cell.date && (
                  <>
                    <div className={`cal-date${tripDates.has(cell.date) ? ' active' : ''}`}>{cell.date}</div>
                    {calendarEvents
                      .filter(e => e.date === cell.date)
                      .map(event => (
                        <div key={event.id} className={`cal-event ${event.category}`}>
                          {categoryIcons[event.category]} {event.title}
                        </div>
                      ))
                    }
                    {cell.date === 27 && <div className="trip-end-marker"><ArrowDown size={12} /><br />TRIP END</div>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="unscheduled-section">
        <h4>Unscheduled</h4>
        <div className="unscheduled-list">
          {unscheduledActivities.map(act => (
            <div key={act.id} className="unscheduled-item">
              <GripVertical size={14} style={{ color: 'var(--color-gray-300)' }} />
              {act.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
