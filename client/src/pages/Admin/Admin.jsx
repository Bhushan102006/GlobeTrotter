import React from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle, ArrowUpRight, MoreVertical, Download } from 'lucide-react';
import { adminStats, adminUsers, popularCities, engagementHeatmap } from '../../data/mockData';
import './Admin.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Admin() {
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
          <div className="stat-card">
            <div className="stat-card-header">
              <span>Active Trips</span>
              <TrendingUp size={16} />
            </div>
            <div className="stat-card-value">{adminStats.activeTrips.value}</div>
            <div className="stat-card-trend up">
              <ArrowUpRight size={14} /> {adminStats.activeTrips.change} this month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span>New Users</span>
              <Users size={16} />
            </div>
            <div className="stat-card-value">{adminStats.newUsers.value}</div>
            <div className="stat-card-trend up">
              <ArrowUpRight size={14} /> {adminStats.newUsers.change} this month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span>Avg Trip Budget</span>
              <DollarSign size={16} />
            </div>
            <div className="stat-card-value">{adminStats.avgBudget.value}</div>
            <div className="stat-card-trend up">
              <ArrowUpRight size={14} /> {adminStats.avgBudget.change} vs baseline
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span>Open Reports</span>
              <AlertCircle size={16} />
            </div>
            <div className="stat-card-value">{adminStats.openReports.value}</div>
            <div className="stat-card-trend neutral">
              {adminStats.openReports.detail}
            </div>
          </div>
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
                {adminUsers.map((u) => (
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
