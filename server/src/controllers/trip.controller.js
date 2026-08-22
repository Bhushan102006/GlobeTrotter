const tripService = require('../services/trip.service');

async function createTripController(req, res) {
  const trip = await tripService.createTrip(req.user.id, req.body);

  return res.status(201).json({
    status: 'success',
    message: 'Trip created successfully',
    response: trip,
  });
}

async function getTripsController(req, res) {
  const trips = await tripService.getTripsByUser(req.user.id);

  return res.status(200).json({
    status: 'success',
    message: 'Trips fetched successfully',
    response: trips,
  });
}

async function getTripController(req, res) {
  const trip = await tripService.getTripById(req.user.id, req.params.tripId);

  return res.status(200).json({
    status: 'success',
    message: 'Trip fetched successfully',
    response: trip,
  });
}

async function updateTripController(req, res) {
  const trip = await tripService.updateTrip(req.user.id, req.params.tripId, req.body);

  return res.status(200).json({
    status: 'success',
    message: 'Trip updated successfully',
    response: trip,
  });
}

async function deleteTripController(req, res) {
  await tripService.deleteTrip(req.user.id, req.params.tripId);

  return res.status(200).json({
    status: 'success',
    message: 'Trip deleted successfully',
  });
}

module.exports = {
  createTripController,
  getTripsController,
  getTripController,
  updateTripController,
  deleteTripController,
};
