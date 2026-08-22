import { useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Globe, Bell, Menu, LogOut } from 'lucide-react';
import { clearAuth, getStoredUser } from '../../services/api';
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
  const navigate = useNavigate();
  const user = useMemo(() => getStoredUser() || {
    firstName: 'Traveler',
    lastName: 'User',
    role: 'Explorer',
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

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
              <div className="user-name">{user.firstName} {user.lastName}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <div className="user-avatar">
              {String(user.firstName || 'T').charAt(0)}{String(user.lastName || 'U').charAt(0)}
            </div>
          </Link>

          <button className="btn btn-secondary btn-sm" onClick={handleLogout} aria-label="Logout" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <LogOut size={16} />
            Logout
          </button>

          <button className="mobile-menu-btn" aria-label="Menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
