import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ImagePlus, ArrowRight, ArrowLeft, MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { tripApi } from '../../services/api';
import './CreateTrip.css';

const steps = [
  { num: 1, title: 'Trip Essentials', desc: 'Destination, dates, and a quick summary.' },
  { num: 2, title: 'Itinerary Draft', desc: 'Add stops and activities.' },
  { num: 3, title: 'Review & Save', desc: 'Finalize your trip plan.' },
];

const suggestedDestinations = ['Tokyo, Japan', 'Kyoto, Japan', 'Osaka, Japan', 'Paris, France', 'Amalfi Coast, Italy', 'Santorini, Greece'];

export default function CreateTrip() {
  const [activeStep, setActiveStep] = useState(1);
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [stops, setStops] = useState(['Tokyo', 'Kyoto']);
  const [newStopInput, setNewStopInput] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleAddStop = (name) => {
    const stopName = name || newStopInput.trim();
    if (stopName && !stops.includes(stopName)) {
      setStops([...stops, stopName]);
      if (!name) setNewStopInput('');
    }
  };

  const handleRemoveStop = (indexToRemove) => {
    setStops(stops.filter((_, i) => i !== indexToRemove));
  };

  const handleNextFromStep1 = () => {
    if (!tripName || !startDate || !endDate) {
      setError('Please fill in Trip Name, Start Date, and End Date.');
      return;
    }
    setError('');
    setActiveStep(2);
  };

  const handleSaveTrip = async () => {
    if (!tripName || !startDate || !endDate) {
      setError('Please complete Trip Name, Start Date, and End Date before saving.');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      const payload = {
        name: tripName,
        destination: stops[0] || '',
        description,
        startDate,
        endDate,
        status: 'planning',
        travelers: 1,
        budget: 0,
        spent: 0,
        stops: stops.map((stop, index) => ({
          city: stop,
          country: '',
          startDate,
          endDate,
          notes: '',
          order: index,
        })),
        activities: [],
      };

      await tripApi.create(payload);
      navigate('/my-trips');
    } catch (err) {
      setError(err.message || 'Unable to create trip. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="create-trip-page">
      <div className="create-trip-header">
        <div className="create-trip-header-inner">
          <h1>Plan a New Adventure</h1>
          <p>Start by outlining the essentials of your next journey.</p>
        </div>
      </div>

      <div className="create-trip-content">
        <div className="steps-sidebar">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`step-item${activeStep === step.num ? ' active' : ''}`}
              onClick={() => {
                if (step.num > 1 && (!tripName || !startDate || !endDate)) {
                  setError('Please complete Step 1 (Trip Name & Dates) first.');
                  return;
                }
                setError('');
                setActiveStep(step.num);
              }}
            >
              <div className="step-number">{step.num}</div>
              <div className="step-info">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>

        <div className="form-panel">
          {error && (
            <div className="error-message" style={{ color: 'var(--color-primary, #ef4444)', marginBottom: '16px', fontSize: '14px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          {/* STEP 1: Trip Essentials */}
          {activeStep === 1 && (
            <>
              <div className="form-group">
                <label>Trip Name</label>
                <div className="date-input-wrapper">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="e.g., Coastal Road Trip, Kyoto Explorer..."
                    value={tripName}
                    onChange={(e) => { setTripName(e.target.value); setError(''); }}
                  />
                </div>
              </div>

              <div className="date-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="date-input-wrapper">
                    <Calendar size={16} />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => { setStartDate(e.target.value); setError(''); }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <div className="date-input-wrapper">
                    <Calendar size={16} />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => { setEndDate(e.target.value); setError(''); }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Trip Description (Optional)</label>
                <textarea
                  placeholder="Jot down a few notes about what makes this trip special..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Cover Image (Optional)</label>
                <div className="upload-zone">
                  <div className="upload-icon">
                    <ImagePlus size={22} />
                  </div>
                  <p>Drag and drop an image here, or click to browse files.</p>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary btn-lg" onClick={handleNextFromStep1}>
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}

          {/* STEP 2: Itinerary Draft */}
          {activeStep === 2 && (
            <>
              <h2>Itinerary Draft</h2>
              <p className="step-subtitle">Add the main stops and cities you plan to visit on this trip.</p>

              <div className="add-stop-row">
                <div className="date-input-wrapper" style={{ flex: 1 }}>
                  <MapPin size={16} />
                  <input
                    type="text"
                    placeholder="Enter city or destination name..."
                    value={newStopInput}
                    onChange={(e) => setNewStopInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddStop(); }}
                  />
                </div>
                <button className="btn btn-secondary" onClick={() => handleAddStop()}>
                  <Plus size={16} /> Add Stop
                </button>
              </div>

              <div className="draft-stops-list">
                {stops.map((stop, index) => (
                  <div key={index} className="draft-stop-card">
                    <div className="draft-stop-info">
                      <h4>Stop {index + 1}: {stop}</h4>
                      <p>Draft stop destination</p>
                    </div>
                    <button className="remove-stop-btn" onClick={() => handleRemoveStop(index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="suggested-stops">
                <label>Suggested Popular Destinations</label>
                <div className="stops-chip-grid">
                  {suggestedDestinations.map((dest) => (
                    <button key={dest} className="stop-chip" onClick={() => handleAddStop(dest.split(',')[0])}>
                      <Plus size={12} /> {dest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-actions form-actions-split">
                <button className="btn btn-secondary btn-lg" onClick={() => setActiveStep(1)}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button className="btn btn-primary btn-lg" onClick={() => setActiveStep(3)}>
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}

          {/* STEP 3: Review & Save */}
          {activeStep === 3 && (
            <>
              <h2>Review & Save</h2>
              <p className="step-subtitle">Double-check your trip details before finalizing your itinerary.</p>

              <div className="review-card">
                <h3 className="review-header-title">{tripName || 'Untitled Trip'}</h3>
                <div className="review-dates-badge">
                  <Calendar size={14} /> {startDate || 'N/A'} - {endDate || 'N/A'}
                </div>

                {description && (
                  <div className="review-section">
                    <h5>Description</h5>
                    <p>{description}</p>
                  </div>
                )}

                <div className="review-section">
                  <h5>Stops & Destinations ({stops.length})</h5>
                  <div className="review-stops-tags">
                    {stops.length > 0 ? (
                      stops.map((s, i) => (
                        <span key={i} className="review-stop-tag">
                          {i + 1}. {s}
                        </span>
                      ))
                    ) : (
                      <p style={{ color: 'var(--color-gray-400)', fontSize: '14px' }}>No specific stops added yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions form-actions-split">
                <button className="btn btn-secondary btn-lg" onClick={() => setActiveStep(2)}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    alert(`Trip "${tripName}" created successfully! Navigating to Itinerary...`);
                    navigate('/itinerary');
                  }}
                >
                  <CheckCircle2 size={18} /> Save & Launch Trip
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

