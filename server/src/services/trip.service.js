const Trip = require('../models/trip.model');

function normalizeTrip(trip) {
  return {
    id: trip._id,
    userId: trip.userId,
    name: trip.name,
    destination: trip.destination,
    description: trip.description,
    startDate: trip.startDate,
    endDate: trip.endDate,
    status: trip.status,
    travelers: trip.travelers,
    budget: trip.budget,
    spent: trip.spent,
    coverImage: trip.coverImage,
    stops: trip.stops || [],
    activities: trip.activities || [],
    createdAt: trip.createdAt,
    updatedAt: trip.updatedAt,
  };
}

async function createTrip(userId, payload = {}) {
  const trip = await Trip.create({
    userId,
    name: payload.name || 'New Trip',
    destination: payload.destination || '',
    description: payload.description || '',
    startDate: payload.startDate || null,
    endDate: payload.endDate || null,
    status: payload.status || 'planning',
    travelers: payload.travelers || 1,
    budget: payload.budget || 0,
    spent: payload.spent || 0,
    coverImage: payload.coverImage || '',
    stops: Array.isArray(payload.stops) ? payload.stops : [],
    activities: Array.isArray(payload.activities) ? payload.activities : [],
  });

  return normalizeTrip(trip);
}

async function getTripsByUser(userId) {
  const trips = await Trip.find({ userId }).sort({ startDate: 1, createdAt: -1 });
  return trips.map(normalizeTrip);
}

async function getTripById(userId, tripId) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  return normalizeTrip(trip);
}

async function updateTrip(userId, tripId, payload = {}) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    'name',
    'destination',
    'description',
    'startDate',
    'endDate',
    'status',
    'travelers',
    'budget',
    'spent',
    'coverImage',
    'stops',
    'activities',
  ];

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      trip[field] = payload[field];
    }
  });

  await trip.save();

  return normalizeTrip(trip);
}

async function deleteTrip(userId, tripId) {
  const result = await Trip.deleteOne({ _id: tripId, userId });

  if (result.deletedCount === 0) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  return { success: true };
}

async function addStopToTrip(userId, tripId, payload = {}) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const city = (payload.city || '').trim();

  if (!city) {
    const error = new Error('Stop city is required');
    error.statusCode = 400;
    throw error;
  }

  trip.stops.push({
    city,
    country: payload.country || '',
    startDate: payload.startDate || null,
    endDate: payload.endDate || null,
    notes: payload.notes || '',
    order: payload.order ?? trip.stops.length,
  });

  await trip.save();

  return normalizeTrip(trip);
}

async function updateStopInTrip(userId, tripId, stopId, payload = {}) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const stop = trip.stops.id(stopId);

  if (!stop) {
    const error = new Error('Stop not found');
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = ['city', 'country', 'startDate', 'endDate', 'notes', 'order'];

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      stop[field] = payload[field];
    }
  });

  if (stop.city !== undefined && !String(stop.city).trim()) {
    const error = new Error('Stop city is required');
    error.statusCode = 400;
    throw error;
  }

  await trip.save();

  return normalizeTrip(trip);
}

async function deleteStopFromTrip(userId, tripId, stopId) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const stop = trip.stops.id(stopId);

  if (!stop) {
    const error = new Error('Stop not found');
    error.statusCode = 404;
    throw error;
  }

  stop.deleteOne();
  await trip.save();

  return normalizeTrip(trip);
}

async function addActivityToTrip(userId, tripId, payload = {}) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const title = (payload.title || '').trim();

  if (!title) {
    const error = new Error('Activity title is required');
    error.statusCode = 400;
    throw error;
  }

  trip.activities.push({
    title,
    category: payload.category || 'General',
    date: payload.date || null,
    time: payload.time || '',
    duration: payload.duration || '',
    cost: payload.cost || 0,
    status: payload.status || 'planned',
    description: payload.description || '',
  });

  await trip.save();

  return normalizeTrip(trip);
}

async function updateActivityInTrip(userId, tripId, activityId, payload = {}) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const activity = trip.activities.id(activityId);

  if (!activity) {
    const error = new Error('Activity not found');
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = ['title', 'category', 'date', 'time', 'duration', 'cost', 'status', 'description'];

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      activity[field] = payload[field];
    }
  });

  if (activity.title !== undefined && !String(activity.title).trim()) {
    const error = new Error('Activity title is required');
    error.statusCode = 400;
    throw error;
  }

  await trip.save();

  return normalizeTrip(trip);
}

async function deleteActivityFromTrip(userId, tripId, activityId) {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    const error = new Error('Trip not found');
    error.statusCode = 404;
    throw error;
  }

  const activity = trip.activities.id(activityId);

  if (!activity) {
    const error = new Error('Activity not found');
    error.statusCode = 404;
    throw error;
  }

  activity.deleteOne();
  await trip.save();

  return normalizeTrip(trip);
}

module.exports = {
  createTrip,
  getTripsByUser,
  getTripById,
  updateTrip,
  deleteTrip,
  addStopToTrip,
  updateStopInTrip,
  deleteStopFromTrip,
  addActivityToTrip,
  updateActivityInTrip,
  deleteActivityFromTrip,
};
