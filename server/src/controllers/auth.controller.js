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
    message: "User register sucessfully",
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
    message: "User login sucessfully",
    response: {
      user,
      accessToken,
    },
  });
}


module.exports = {
  registerController,
  loginController
};
