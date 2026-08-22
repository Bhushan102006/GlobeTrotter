import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, Lock, EyeOff, Eye, ArrowRight, MapPin, Map, Phone } from 'lucide-react';
import { PexelsImage } from '../../hooks/usePexels';
import { authApi, setStoredToken, setStoredUser } from '../../services/api';
import './Login.css';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError('Please complete all signup fields.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = isSignup
        ? {
            firstName,
            lastName,
            email,
            password,
            phone,
            city,
            country,
            additionalInfo: '',
          }
        : { email, password };

      const response = isSignup
        ? await authApi.register(payload)
        : await authApi.login(payload);

      const { accessToken, user } = response.response;
      setStoredToken(accessToken);
      setStoredUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          {error && (
            <div className="error-message" style={{ marginBottom: '1rem', color: '#ef4444', fontWeight: 600 }}>
              {error}
            </div>
          )}

          {isSignup && (
            <>
              <div className="name-row">
                <div className="input-group">
                  <label>First Name</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="Alex" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="Rivera" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? (isSignup ? 'Creating Account...' : 'Signing In...') : (isSignup ? 'Create Account' : 'Sign In')}
            <ArrowRight size={18} />
          </button>



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
