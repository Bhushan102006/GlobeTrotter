const express = require('express');
const validateMiddleware = require('../middlewares/validate.middleware');
const authControllers = require('../controllers/auth.controller');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.post('/register', validateMiddleware.validateRegister, asyncHandler(authControllers.registerController));
router.post('/login', asyncHandler(authControllers.loginController));

module.exports = router;