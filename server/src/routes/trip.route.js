const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const tripController = require('../controllers/trip.controller');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.use(authMiddleware);

router.get('/stats', asyncHandler(tripController.getTripStatsController));
router.get('/', asyncHandler(tripController.getTripsController));
router.post('/', asyncHandler(tripController.createTripController));
router.get('/:tripId', asyncHandler(tripController.getTripController));
router.put('/:tripId', asyncHandler(tripController.updateTripController));
router.delete('/:tripId', asyncHandler(tripController.deleteTripController));

router.post('/:tripId/stops', asyncHandler(tripController.addStopController));
router.put('/:tripId/stops/:stopId', asyncHandler(tripController.updateStopController));
router.delete('/:tripId/stops/:stopId', asyncHandler(tripController.deleteStopController));

router.post('/:tripId/activities', asyncHandler(tripController.addActivityController));
router.put('/:tripId/activities/:activityId', asyncHandler(tripController.updateActivityController));
router.delete('/:tripId/activities/:activityId', asyncHandler(tripController.deleteActivityController));

module.exports = router;
