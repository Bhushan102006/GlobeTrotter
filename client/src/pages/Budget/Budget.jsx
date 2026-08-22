import { useState } from 'react';
import { Download, Plus, Calendar as CalIcon, AlertTriangle, Clock, X } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { budgetData } from '../../data/mockData';
import './Budget.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const categoryIconMap = {
  Flights: 'plane',
  Accommodation: 'hotel',
  Meals: 'utensils',
  Activities: 'activity',
};

const expenseIcons = { plane: '✈️', hotel: '🏨', utensils: '🍽', activity: '🎟' };

export default function Budget() {
  const bd = budgetData;

  const [categories, setCategories] = useState(bd.categories);
  const [totalEstimated, setTotalEstimated] = useState(bd.totalEstimated);
  const [topExpenses, setTopExpenses] = useState(bd.topExpenses || []);
  const [dailySpending, setDailySpending] = useState(bd.dailySpending);

  // View mode state (chart | list)
  const [viewMode, setViewMode] = useState('chart');

  // Modal State
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Activities');
  const [expenseDetail, setExpenseDetail] = useState('');

  const targetBudget = bd.targetBudget;
  const overBudget = Math.max(0, totalEstimated - targetBudget);
  const averageDaily = Math.round(totalEstimated / bd.duration);

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(expenseAmount.toString().replace(/[^0-9.]/g, ''));
    if (!expenseTitle.trim() || isNaN(numAmount) || numAmount <= 0) return;

    // Update total estimated cost
    setTotalEstimated(prev => prev + numAmount);

    // Update categories
    setCategories(prev => prev.map(c => {
      if (c.name.toLowerCase() === expenseCategory.toLowerCase()) {
        return { ...c, amount: c.amount + numAmount };
      }
      return c;
    }));

    // Add to top expenses list
    const iconType = categoryIconMap[expenseCategory] || 'activity';
    const newExpenseItem = {
      name: expenseTitle.trim(),
      detail: expenseDetail.trim() || `${expenseCategory} · New Expense`,
      amount: numAmount,
      icon: iconType,
    };
    setTopExpenses(prev => [newExpenseItem, ...prev]);

    // Reset form & close modal
    setExpenseTitle('');
    setExpenseAmount('');
    setExpenseDetail('');
    setExpenseCategory('Activities');
    setShowAddExpenseModal(false);
  };

  const donutData = {
    labels: categories.map(c => c.name),
    datasets: [{
      data: categories.map(c => c.amount),
      backgroundColor: categories.map(c => c.color),
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
    labels: dailySpending.map((d, i) => d.label || `Day ${d.day}`),
    datasets: [
      {
        label: 'Actual',
        data: dailySpending.map(d => d.actual),
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
        data: dailySpending.map(() => bd.targetDaily),
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
            <button className="btn btn-secondary" onClick={() => window.print()}><Download size={16} /> Export PDF</button>
            <button className="btn btn-primary" onClick={() => setShowAddExpenseModal(true)}><Plus size={16} /> Add Expense</button>
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
                <span className="currency">₹</span>{totalEstimated.toLocaleString()}<span className="cents">.00</span>
              </div>
            </div>
            <div>
              <div className="total-label">Target Budget</div>
              <div className="budget-target">
                <span className="target-value">₹{targetBudget.toLocaleString()}</span>
                {overBudget > 0 ? (
                  <span className="over-badge">↑ ₹{overBudget.toLocaleString()} Over</span>
                ) : (
                  <span className="over-badge" style={{ background: '#ecfdf5', color: '#059669' }}>✓ Within Budget</span>
                )}
              </div>
            </div>
            <div className="daily-avg">
              <div>
                <div className="total-label">Average Daily Cost</div>
                <div className="avg-amount">₹{averageDaily.toLocaleString()}/day</div>
              </div>
              <CalIcon size={20} style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>

          <div className="chart-panel">
            <div className="chart-header">
              <h3>Category Breakdown</h3>
              <div className="chart-toggle">
                <button
                  className={viewMode === 'chart' ? 'active' : ''}
                  onClick={() => setViewMode('chart')}
                >
                  Chart
                </button>
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
              </div>
            </div>
            <div className="chart-body">
              {viewMode === 'chart' ? (
                <>
                  <div className="donut-container">
                    <Doughnut data={donutData} options={donutOptions} />
                    <div className="donut-center">
                      <div className="donut-number">{categories.length}</div>
                      <div className="donut-label">Categories</div>
                    </div>
                  </div>
                  <div className="category-list">
                    {categories.map(cat => (
                      <div key={cat.name} className="category-item">
                        <div className="category-dot" style={{ background: cat.color }} />
                        <span className="category-name">{cat.name}</span>
                        <div className="category-bar">
                          <div className="category-bar-fill" style={{ width: `${Math.min(100, (cat.amount / totalEstimated) * 100)}%`, background: cat.color }} />
                        </div>
                        <span className="category-amount">₹{cat.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="category-list" style={{ width: '100%', gap: '12px' }}>
                  {categories.map(cat => {
                    const pct = Math.round((cat.amount / totalEstimated) * 100) || 0;
                    return (
                      <div key={cat.name} className="category-item" style={{ padding: '12px 16px', background: 'var(--color-gray-50)', borderRadius: '12px' }}>
                        <div className="category-dot" style={{ background: cat.color, width: '12px', height: '12px' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span className="category-name" style={{ fontWeight: '600', color: 'var(--color-gray-900)', fontSize: '14px' }}>{cat.name}</span>
                            <span className="category-amount" style={{ fontWeight: '600', fontSize: '14px' }}>₹{cat.amount.toLocaleString()} ({pct}%)</span>
                          </div>
                          <div className="category-bar" style={{ width: '100%', height: '6px' }}>
                            <div className="category-bar-fill" style={{ width: `${pct}%`, background: cat.color }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spending Trend */}
        <div className="chart-panel spending-trend">
          <div className="chart-header">
            <div>
              <h3>Daily Spending Trend</h3>
              <div className="target-info">Target daily budget: ₹{bd.targetDaily.toLocaleString()}</div>
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
            <h3>Top Expenses</h3>
            {topExpenses && topExpenses.length > 0 ? (
              topExpenses.map((exp, i) => (
                <div key={i} className="expense-item">
                  <div className="expense-icon">{expenseIcons[exp.icon] || '💰'}</div>
                  <div className="expense-info">
                    <h4>{exp.name}</h4>
                    <p>{exp.detail}</p>
                  </div>
                  <div className="expense-amount">₹{exp.amount.toLocaleString()}</div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--color-gray-500)', fontSize: '14px', marginTop: '16px' }}>No top expenses reported yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-card" style={{ background: '#ffffff', width: '90%', maxWidth: '460px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Add New Expense</h3>
              <button onClick={() => setShowAddExpenseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddExpenseSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Expense Title</label>
                <input
                  type="text"
                  placeholder="e.g., Museum Entry, Gondola Ride, Dinner..."
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  required
                  autoFocus
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Category</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Flights">Flights</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Meals">Meals</option>
                    <option value="Activities">Activities</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="2500"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Detail / Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Day 4 in Venice, Unplanned ticket..."
                  value={expenseDetail}
                  onChange={(e) => setExpenseDetail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddExpenseModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
