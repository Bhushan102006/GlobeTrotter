import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ImagePlus, ArrowRight } from 'lucide-react';
import './CreateTrip.css';

const steps = [
  { num: 1, title: 'Trip Essentials', desc: 'Destination, dates, and a quick summary.' },
  { num: 2, title: 'Itinerary Draft', desc: 'Add stops and activities.' },
  { num: 3, title: 'Review & Save', desc: 'Finalize your trip plan.' },
];

export default function CreateTrip() {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

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
              onClick={() => setActiveStep(step.num)}
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
          <div className="form-group">
            <label>Trip Name</label>
            <div className="date-input-wrapper">
              <Search size={16} />
              <input type="text" placeholder="e.g., Coastal Road Trip, Kyoto Explorer..." />
            </div>
          </div>

          <div className="date-row">
            <div className="form-group">
              <label>Start Date</label>
              <div className="date-input-wrapper">
                <Calendar size={16} />
                <input type="date" />
              </div>
            </div>
            <div className="form-group">
              <label>End Date</label>
              <div className="date-input-wrapper">
                <Calendar size={16} />
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Trip Description (Optional)</label>
            <textarea placeholder="Jot down a few notes about what makes this trip special..." />
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
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/itinerary')}>
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
