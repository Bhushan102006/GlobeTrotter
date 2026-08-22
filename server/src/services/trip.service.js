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

module.exports = {
  createTrip,
  getTripsByUser,
  getTripById,
  updateTrip,
  deleteTrip,
};
