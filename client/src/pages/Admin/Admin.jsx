import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle, ArrowUpRight, MoreVertical, Download } from 'lucide-react';
import { tripApi } from '../../services/api';
import './Admin.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const popularCities = [
  { name: 'NYC', value: 6200 },
  { name: 'Paris', value: 5800 },
  { name: 'Tokyo', value: 8200 },
  { name: 'London', value: 5100 },
  { name: 'Rome', value: 4800 },
];

const engagementHeatmap = [
  [3, 7, 6, 4, 3, 2, 1],
  [2, 5, 8, 3, 6, 4, 2],
  [4, 6, 5, 7, 4, 8, 7],
];

export default function Admin() {
  const [tripStats, setTripStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripApi.getStats()
      .then((res) => setTripStats(res.response))
      .catch(() => setTripStats(null))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'Total Trips',
      value: loading ? '...' : (tripStats?.total ?? '—'),
      change: tripStats ? `${tripStats.upcoming} upcoming` : '',
      icon: <TrendingUp size={16} />,
      trend: 'up',
    },
    {
      label: 'Planning',
      value: loading ? '...' : (tripStats?.planning ?? '—'),
      change: 'In progress',
      icon: <Users size={16} />,
      trend: 'up',
    },
    {
      label: 'Completed',
      value: loading ? '...' : (tripStats?.completed ?? '—'),
      change: 'Finished trips',
      icon: <DollarSign size={16} />,
      trend: 'up',
    },
    {
      label: 'Open Reports',
      value: '24',
      change: 'Spam: 18  Other: 6',
      icon: <AlertCircle size={16} />,
      trend: 'neutral',
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1>Platform Operations</h1>
            <p>System metrics, user engagement health, and management dashboard.</p>
          </div>
          <div className="admin-header-actions">
            <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
              <Download size={16} /> Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {/* Stat Cards */}
        <div className="stat-cards-grid">
          {statCards.map((card) => (
            <div key={card.label} className="stat-card">
              <div className="stat-card-header">
                <span>{card.label}</span>
                {card.icon}
              </div>
              <div className="stat-card-value">{card.value}</div>
              <div className={`stat-card-trend ${card.trend}`}>
                {card.trend === 'up' && <ArrowUpRight size={14} />} {card.change}
              </div>
            </div>
          ))}
        </div>


        {/* Analytics Row */}
        <div className="analytics-grid-row">
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Top Destination Searches</h2>
              <span className="badge badge-primary">Live</span>
            </div>
            <div className="city-bars-list">
              {popularCities.map((c) => (
                <div key={c.name} className="city-bar-item">
                  <span className="city-bar-name">{c.name}</span>
                  <div className="city-bar-track">
                    <div
                      className="city-bar-fill"
                      style={{ width: `${(c.value / 10000) * 100}%` }}
                    />
                  </div>
                  <span className="city-bar-val">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Weekly Platform Traffic Activity</h2>
              <span className="text-xs text-gray-500">Hourly Intensity</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 8, textAlign: 'center', fontSize: '11px', color: '#94a3b8' }}>
              {days.map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="heatmap-matrix">
              {engagementHeatmap.map((row, rIdx) => (
                <div key={rIdx} className="heatmap-row">
                  {row.map((val, cIdx) => (
                    <div
                      key={cIdx}
                      className="heatmap-cell"
                      style={{
                        background: `rgba(37, 99, 235, ${0.2 + (val / 10) * 0.8})`,
                      }}
                    >
                      {val * 120}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>User Management & Verification</h2>
            <button className="btn btn-secondary btn-sm">Filter Users</button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'Active', role: 'Pro Explorer', lastActive: '2 mins ago' },
                  { id: 2, name: 'Marcus Chen', email: 'marcus.c@example.com', status: 'Active', role: 'Basic', lastActive: '1 hour ago', initials: 'MC' },
                  { id: 3, name: 'David Reynolds', email: 'david.r@example.com', status: 'Inactive', role: 'Basic', lastActive: '2 weeks ago' },
                  { id: 4, name: 'System Admin', email: 'admin@globetrotter.io', status: 'Locked', role: 'Administrator', lastActive: 'Just now', initials: '⚠' },
                ].map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-sm">
                          {u.initials || u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="user-meta-name">{u.name}</div>
                          <div className="user-meta-email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.role}</td>
                    <td>
                      <span className={`status-tag ${u.status.toLowerCase()}`}>
                        {u.status}
                      </span>
                    </td>
                    <td>{u.lastActive}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-ghost btn-sm">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
