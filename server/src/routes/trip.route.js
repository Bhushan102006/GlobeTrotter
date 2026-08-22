const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const tripController = require('../controllers/trip.controller');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncHandler(tripController.getTripsController));
router.post('/', asyncHandler(tripController.createTripController));
router.get('/:tripId', asyncHandler(tripController.getTripController));
router.put('/:tripId', asyncHandler(tripController.updateTripController));
router.delete('/:tripId', asyncHandler(tripController.deleteTripController));

module.exports = router;
