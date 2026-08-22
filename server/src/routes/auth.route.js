const express = require('express');
const validateMiddleware = require('../middlewares/validate.middleware');
const authControllers = require('../controllers/auth.controller');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.post('/register', validateMiddleware.validateRegister, asyncHandler(authControllers.registerController));
router.post('/login', validateMiddleware.validateLogin, asyncHandler(authControllers.loginController));
router.post('/logout', asyncHandler(authControllers.logoutController));
router.post('/logout-all', asyncHandler(authControllers.logoutAllController));
router.post('/forgot-password', validateMiddleware.validateForgotPassword, asyncHandler(authControllers.forgotPasswordController));
router.post('/reset-password', validateMiddleware.validateResetPassword, asyncHandler(authControllers.resetPasswordController));
router.post('/refresh', asyncHandler(authControllers.refreshController));

module.exports = router;