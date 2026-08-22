import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Lock, Bell, Sparkles, Check } from 'lucide-react';
import { getStoredUser, setStoredUser, clearAuth, userApi } from '../../services/api';
import './Profile.css';

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'preferences', label: 'Travel Preferences', icon: Sparkles },
  { id: 'security', label: 'Security & Login', icon: Lock },
  { id: 'privacy', label: 'Privacy & Data', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const localUser = getStoredUser();
        if (localUser) {
          setFormData({
            firstName: localUser.firstName || '',
            lastName: localUser.lastName || '',
            email: localUser.email || '',
            bio: localUser.additionalInfo || '',
          });
        }

        const response = await userApi.getProfile();
        const user = response.response;

        if (user) {
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            bio: user.additionalInfo || '',
          });
          setStoredUser(user);
        }
      } catch (error) {
        if (error.status === 401) {
          clearAuth();
          navigate('/login');
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        city: '',
        country: '',
        additionalInfo: formData.bio,
      });

      const updatedUser = response.response;
      setStoredUser(updatedUser);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      if (error.status === 401) {
        clearAuth();
        navigate('/login');
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-hero-inner">
          <div className="profile-avatar-lg">
            {(formData.firstName || 'T').charAt(0)}{(formData.lastName || 'U').charAt(0)}
          </div>
          <div className="profile-header-info">
            <h1>{formData.firstName || 'Traveler'} {formData.lastName || 'User'}</h1>
            <div className="profile-email">
              <User size={14} /> {formData.email || 'Loading profile...'} • Joined June 2023
            </div>
            <div className="profile-badges">
              <span className="badge badge-primary">Explorer</span>
              <span className="badge badge-primary">Pro Member</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className={`profile-tab ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                <Icon size={18} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </aside>

        <div>
          <div className="profile-form-panel">
            <h2>Personal Information</h2>
            {loading ? (
              <p style={{ color: 'var(--color-gray-500)' }}>Loading profile...</p>
            ) : (
              <form onSubmit={handleSave}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Short Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div className="save-btn-row">
                  <button type="submit" className="btn btn-primary">
                    {saved ? <><Check size={16} /> Changes Saved</> : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="preferences-section">
            <h3>
              <span>Travel Preferences</span>
              <span className="badge badge-primary">Customized</span>
            </h3>
            <p className="text-sm text-gray-500" style={{ marginBottom: 'var(--space-4)' }}>
              These tags help our recommendation engine tailor activities and itineraries to your travel taste.
            </p>
            <div className="interest-tags">
              <span className="interest-tag culinary">🍴 Culinary & Wine</span>
              <span className="interest-tag nature">🌲 Nature & Hikes</span>
              <span className="interest-tag history">🏛 Historical Sites</span>
              <span className="interest-tag" style={{ background: '#f1f5f9', color: '#475569' }}>📸 Photography</span>
              <span className="interest-tag" style={{ background: '#eff6ff', color: '#2563eb' }}>🌊 Coastal & Boating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
