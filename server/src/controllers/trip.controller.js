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

async function addStopController(req, res) {
  const trip = await tripService.addStopToTrip(req.user.id, req.params.tripId, req.body);

  return res.status(201).json({
    status: 'success',
    message: 'Trip stop added successfully',
    response: trip,
  });
}

async function updateStopController(req, res) {
  const trip = await tripService.updateStopInTrip(req.user.id, req.params.tripId, req.params.stopId, req.body);

  return res.status(200).json({
    status: 'success',
    message: 'Trip stop updated successfully',
    response: trip,
  });
}

async function deleteStopController(req, res) {
  const trip = await tripService.deleteStopFromTrip(req.user.id, req.params.tripId, req.params.stopId);

  return res.status(200).json({
    status: 'success',
    message: 'Trip stop deleted successfully',
    response: trip,
  });
}

async function addActivityController(req, res) {
  const trip = await tripService.addActivityToTrip(req.user.id, req.params.tripId, req.body);

  return res.status(201).json({
    status: 'success',
    message: 'Trip activity added successfully',
    response: trip,
  });
}

async function updateActivityController(req, res) {
  const trip = await tripService.updateActivityInTrip(req.user.id, req.params.tripId, req.params.activityId, req.body);

  return res.status(200).json({
    status: 'success',
    message: 'Trip activity updated successfully',
    response: trip,
  });
}

async function deleteActivityController(req, res) {
  const trip = await tripService.deleteActivityFromTrip(req.user.id, req.params.tripId, req.params.activityId);

  return res.status(200).json({
    status: 'success',
    message: 'Trip activity deleted successfully',
    response: trip,
  });
}

async function getTripStatsController(req, res) {
  const stats = await tripService.getTripStats(req.user.id);
  return res.status(200).json({
    status: 'success',
    message: 'Trip stats fetched successfully',
    response: stats,
  });
}

module.exports = {
  createTripController,
  getTripsController,
  getTripController,
  updateTripController,
  deleteTripController,
  addStopController,
  updateStopController,
  deleteStopController,
  addActivityController,
  updateActivityController,
  deleteActivityController,
  getTripStatsController,
};
