import { useRef, useEffect } from 'react';
import { Download, Plus, Calendar as CalIcon, Plane, Hotel, UtensilsCrossed, AlertTriangle, Clock } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { budgetData } from '../../data/mockData';
import './Budget.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const expenseIcons = { plane: '✈️', hotel: '🏨', utensils: '🍽' };

export default function Budget() {
  const bd = budgetData;

  const donutData = {
    labels: bd.categories.map(c => c.name),
    datasets: [{
      data: bd.categories.map(c => c.amount),
      backgroundColor: bd.categories.map(c => c.color),
      borderWidth: 0,
      cutout: '72%',
      borderRadius: 4,
    }],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  };

  const lineData = {
    labels: bd.dailySpending.map((d, i) => d.label || `Day ${d.day}`),
    datasets: [
      {
        label: 'Actual',
        data: bd.dailySpending.map(d => d.actual),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#2563EB',
        borderWidth: 2,
      },
      {
        label: 'Target',
        data: bd.dailySpending.map(() => bd.targetDaily),
        borderColor: '#94a3b8',
        borderDash: [6, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94a3b8' },
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94a3b8' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="budget-page">
      <div className="budget-header">
        <div className="budget-header-inner">
          <div>
            <h1>Budget Breakdown</h1>
            <div className="budget-trip-info">{bd.tripName} · {bd.duration} Days · {bd.travelers} Travelers</div>
          </div>
          <div className="budget-header-actions">
            <button className="btn btn-secondary"><Download size={16} /> Export PDF</button>
            <button className="btn btn-primary"><Plus size={16} /> Add Expense</button>
          </div>
        </div>
      </div>

      <div className="budget-content">
        {/* Summary + Donut */}
        <div className="budget-summary-row">
          <div className="budget-totals">
            <div>
              <div className="total-label">Total Estimated Cost</div>
              <div className="total-amount">
                <span className="currency">$</span>{bd.totalEstimated.toLocaleString()}<span className="cents">.00</span>
              </div>
            </div>
            <div>
              <div className="total-label">Target Budget</div>
              <div className="budget-target">
                <span className="target-value">${bd.targetBudget.toLocaleString()}</span>
                <span className="over-badge">↑ ${bd.overBudget} Over</span>
              </div>
            </div>
            <div className="daily-avg">
              <div>
                <div className="total-label">Average Daily Cost</div>
                <div className="avg-amount">${bd.averageDaily}/day</div>
              </div>
              <CalIcon size={20} style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>

          <div className="chart-panel">
            <div className="chart-header">
              <h3>Category Breakdown</h3>
              <div className="chart-toggle">
                <button className="active">Chart</button>
                <button>List</button>
              </div>
            </div>
            <div className="chart-body">
              <div className="donut-container">
                <Doughnut data={donutData} options={donutOptions} />
                <div className="donut-center">
                  <div className="donut-number">{bd.categories.length}</div>
                  <div className="donut-label">Categories</div>
                </div>
              </div>
              <div className="category-list">
                {bd.categories.map(cat => (
                  <div key={cat.name} className="category-item">
                    <div className="category-dot" style={{ background: cat.color }} />
                    <span className="category-name">{cat.name}</span>
                    <div className="category-bar">
                      <div className="category-bar-fill" style={{ width: `${(cat.amount / bd.totalEstimated) * 100}%`, background: cat.color }} />
                    </div>
                    <span className="category-amount">${cat.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spending Trend */}
        <div className="chart-panel spending-trend">
          <div className="chart-header">
            <div>
              <h3>Daily Spending Trend</h3>
              <div className="target-info">Target daily budget: ${bd.targetDaily}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 2, background: '#2563EB', display: 'inline-block' }} /> Actual</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 2, background: '#94a3b8', borderTop: '2px dashed #94a3b8', display: 'inline-block' }} /> Target</span>
            </div>
          </div>
          <div className="trend-chart-container">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="budget-bottom-row">
          <div className="alert-section">
            <h3>Attention Needed</h3>
            {bd.alerts.map((alert, i) => (
              <div key={i} className={`alert-card ${alert.type === 'over-budget' ? 'over-budget' : 'upcoming'}`}>
                <div className="alert-card-header">
                  <span className="alert-type">
                    {alert.type === 'over-budget' ? <><AlertTriangle size={14} /> {alert.title}</> : <><Clock size={14} /> {alert.title}</>}
                  </span>
                  <span className="alert-amount">{alert.amount}</span>
                </div>
                <div className="alert-desc">{alert.description}</div>
                <div className="alert-detail">{alert.detail}</div>
                {alert.actions && (
                  <div className="alert-actions">
                    {alert.actions.map(a => <button key={a}>{a}</button>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="top-expenses">
            <h3>Top Expenses <a href="#">View All</a></h3>
            {bd.topExpenses && bd.topExpenses.length > 0 ? (
              bd.topExpenses.map((exp, i) => (
                <div key={i} className="expense-item">
                  <div className="expense-icon">{expenseIcons[exp.icon] || '💰'}</div>
                  <div className="expense-info">
                    <h4>{exp.name}</h4>
                    <p>{exp.detail}</p>
                  </div>
                  <div className="expense-amount">${exp.amount.toLocaleString()}</div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--color-gray-500)', fontSize: '14px', marginTop: '16px' }}>No top expenses reported yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
