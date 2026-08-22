const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: '',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true },
);

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    date: {
      type: Date,
      default: null,
    },
    time: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    cost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['planned', 'confirmed', 'completed'],
      default: 'planned',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { _id: true },
);

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['upcoming', 'planning', 'completed'],
      default: 'planning',
    },
    travelers: {
      type: Number,
      default: 1,
      min: 1,
    },
    budget: {
      type: Number,
      default: 0,
      min: 0,
    },
    spent: {
      type: Number,
      default: 0,
      min: 0,
    },
    coverImage: {
      type: String,
      default: '',
    },
    stops: [stopSchema],
    activities: [activitySchema],
  },
  {
    timestamps: true,
  },
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
