import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, Lock, EyeOff, Eye, ArrowRight, MapPin, Map, Phone } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import './Login.css';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Left Panel - Form */}
      <div className="login-form-panel">
        <div className="login-logo">
          <Globe size={28} />
        </div>

        <h1 className="login-title">{isSignup ? 'Create account' : 'Welcome back'}</h1>
        <p className="login-subtitle">
          {isSignup
            ? 'Start planning your next adventure today.'
            : 'Sign in to continue planning your next adventure.'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="name-row">
                <div className="input-group">
                  <label>First Name</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="Alex" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="Rivera" />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="field-icon" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="name-row">
                <div className="input-group">
                  <label>City</label>
                  <div className="input-wrapper">
                    <MapPin size={18} className="field-icon" />
                    <input
                      type="text"
                      placeholder="New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Country</label>
                  <div className="input-wrapper">
                    <Map size={18} className="field-icon" />
                    <input
                      type="text"
                      placeholder="United States"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {isSignup && (
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="field-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
          )}

          {!isSignup && (
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="login-btn">
            {isSignup ? 'Create Account' : 'Sign In'}
            <ArrowRight size={18} />
          </button>

          <div className="social-divider">or continue with</div>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            </button>
            <button type="button" className="social-btn">🍎</button>
          </div>

          <div className="signup-prompt">
            {isSignup ? (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(false); }}>Sign in</a></>
            ) : (
              <>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); }}>Create one</a></>
            )}
          </div>
        </form>
      </div>

      {/* Right Panel - Hero Image */}
      <div className="login-hero-panel">
        <PexelsImage
          query="amalfi coast italy sunset ocean"
          alt="Amalfi Coast, Italy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        <div className="login-hero-overlay" />
        <div className="login-hero-content">
          <div className="featured-badge">
            <MapPin size={14} />
            Featured Destination
          </div>
          <h2 className="hero-destination-name">Amalfi Coast, Italy</h2>
          <p className="hero-description">
            Discover secluded coves and cliffside dining in our curated Mediterranean itinerary.
          </p>
          <div className="hero-map-card" onClick={() => navigate('/itinerary')}>
            <Map size={16} />
            View in Trip Planner
          </div>
        </div>
      </div>
    </div>
  );
}
