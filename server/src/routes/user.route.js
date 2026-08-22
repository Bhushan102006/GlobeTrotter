const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.use(authMiddleware);
router.get('/me', asyncHandler(userController.getProfileController));
router.put('/profile', asyncHandler(userController.updateProfileController));

module.exports = router;
