const authService = require("../services/auth.service");

function getRefreshTokenOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
}

async function registerController(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    city,
    country,
    additionalInfo,
  } = req.body;
  const userAgent = req.headers["user-agent"];
  const ipAddress = req.ip;

  const result = await authService.registerUser({
    firstName,
    lastName,
    email,
    password,
    phone,
    city,
    country,
    additionalInfo,
    userAgent,
    ipAddress,
  });

  const { user, accessToken, refreshToken } = result;

  const cookieOptions = getRefreshTokenOptions();

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(201).json({
    status: "success",
    message: "User registered successfully",
    response: {
      user,
      accessToken,
    },
  });
}

async function loginController(req, res, next) {
  const { email, password } = req.body;
  const userAgent = req.headers["user-agent"];
  const ipAddress = req.ip;

  const result = await authService.loginUser({
    email,
    password,
    userAgent,
    ipAddress,
  });

  const { user, accessToken, refreshToken } = result;

  const cookieOptions = getRefreshTokenOptions();

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    response: {
      user,
      accessToken,
    },
  });
}

async function logoutController(req, res) {
  const refreshToken = req.cookies.refreshToken;
  await authService.logoutUser(refreshToken);
  res.clearCookie("refreshToken", getRefreshTokenOptions());
  return res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
}

async function logoutAllController(req, res) {
  const refreshToken = req.cookies.refreshToken;
  await authService.logoutAllUser(refreshToken);
  res.clearCookie("refreshToken", getRefreshTokenOptions());
  return res.status(200).json({
    status: "success",
    message: "All sessions logged out successfully",
  });
}

async function forgotPasswordController(req, res) {
  const { email } = req.body;

  const result = await authService.forgotPasswordUser(email);

  return res.status(200).json({
    status: "success",
    message: result.message,
    ...(result.resetToken ? { resetToken: result.resetToken } : {}),
  });
}

async function resetPasswordController(req, res) {
  const { email, token, newPassword } = req.body;

  const result = await authService.resetPasswordUser({
    email,
    token,
    newPassword,
  });

  return res.status(200).json({
    status: "success",
    message: result.message,
  });
}

async function refreshController(req, res) {
  const refreshToken = req.cookies.refreshToken;
  const result = await authService.refreshUser(refreshToken);

  res.cookie("refreshToken", result.refreshToken, getRefreshTokenOptions());

  return res.status(200).json({
    status: "success",
    message: "Token refreshed successfully",
    response: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  logoutAllController,
  forgotPasswordController,
  resetPasswordController,
  refreshController,
};
