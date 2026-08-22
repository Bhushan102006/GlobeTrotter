import { NavLink, Link } from 'react-router-dom';
import { Globe, Bell, Menu, Send } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import './Navbar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/explore', label: 'Explore' },
  { path: '/my-trips', label: 'My Trips' },
  { path: '/itinerary', label: 'Itinerary' },
  { path: '/budget', label: 'Budget' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/community', label: 'Community' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-brand">
            <Globe size={24} />
            <span>GlobeTrotter</span>
          </Link>

          <div className="navbar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="navbar-right">
          <button className="notification-btn" aria-label="Notifications">
            <Bell size={20} />
          </button>

          <Link to="/profile" className="user-menu" style={{ textDecoration: 'none' }}>
            <div className="user-info">
              <div className="user-name">{currentUser.firstName} {currentUser.lastName}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
            <div className="user-avatar">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
          </Link>

          <button className="mobile-menu-btn" aria-label="Menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
