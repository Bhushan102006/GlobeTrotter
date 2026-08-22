const User = require("../models/user.model");
const tokenService = require("./token.service");
const bcrypt = require("bcrypt");
const sessionService = require("./session.service");
const crypto = require("crypto");
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

async function registerUser(data) {
  const {
    firstName,
    lastName,
    password,
    email,
    phone,
    city,
    country,
    additionalInfo,
    userAgent,
    ipAddress,
  } = data;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new ConflictError("Email already registered");
  }

  const userName = [firstName, lastName].filter(Boolean).join(" ") || "User";

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName: firstName || "",
    lastName: lastName || "",
    name: userName,
    email: normalizedEmail,
    password: hashedPassword,
    phone: phone || "",
    city: city || "",
    country: country || "",
    additionalInfo: additionalInfo || "",
  });

  const sessionId = crypto.randomUUID();
  const accessToken = tokenService.generateAccessToken({
    sub: user._id,
    role: user.role,
  });

  const refreshToken = tokenService.generateRefreshToken({
    sub: user._id,
    sessionId,
    jti: crypto.randomUUID(),
  });

  await sessionService.createSession({
    userId: user._id,
    sessionId,
    refreshToken,
    userAgent,
    ipAddress,
  });

  const userResponse = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    country: user.country,
    additionalInfo: user.additionalInfo,
    role: user.role,
    isVerified: user.isVerified,
  };

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
}

async function loginUser(data) {
  const { email, password, userAgent, ipAddress } = data;

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const sessionId = crypto.randomUUID();
  const accessToken = tokenService.generateAccessToken({
    sub: user._id,
    role: user.role,
  });

  const refreshToken = tokenService.generateRefreshToken({
    sub: user._id,
    sessionId,
    jti: crypto.randomUUID(),
  });

  await sessionService.createSession({
    userId: user._id,
    sessionId,
    refreshToken,
    userAgent,
    ipAddress,
  });

  const userResponse = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    country: user.country,
    additionalInfo: user.additionalInfo,
    role: user.role,
    isVerified: user.isVerified,
  };

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
}

async function logoutUser(refreshToken) {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token missing");
  }

  const decodedToken = tokenService.verifyRefreshToken(refreshToken);
  const session = await sessionService.findSessionByRefreshToken(refreshToken);

  if (!session || session.userId.toString() !== decodedToken.sub.toString()) {
    throw new UnauthorizedError("Invalid session");
  }

  await sessionService.revokeSessionByRefreshToken(refreshToken);

  return { success: true };
}

async function logoutAllUser(refreshToken) {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token missing");
  }

  const decodedToken = tokenService.verifyRefreshToken(refreshToken);
  const session = await sessionService.findSessionByRefreshToken(refreshToken);

  if (!session || session.userId.toString() !== decodedToken.sub.toString()) {
    throw new UnauthorizedError("Invalid session");
  }

  await sessionService.revokeAllSessionsForUser(session.userId);

  return { success: true };
}

async function forgotPasswordUser(email) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new UnauthorizedError("Email is required");
  }

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return {
      success: true,
      message: "If the email is registered, a reset link has been sent.",
    };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  return {
    success: true,
    message: "Password reset instructions have been sent to your email.",
    resetToken,
  };
}

async function refreshUser(refreshToken) {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token missing");
  }

  const decodedToken = tokenService.verifyRefreshToken(refreshToken);
  const session = await sessionService.findSessionByRefreshToken(refreshToken);

  if (!session || session.userId.toString() !== decodedToken.sub.toString()) {
    throw new UnauthorizedError("Invalid or expired session");
  }

  const user = await User.findById(session.userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  const accessToken = tokenService.generateAccessToken({
    sub: user._id,
    role: user.role,
  });

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      additionalInfo: user.additionalInfo,
      role: user.role,
      isVerified: user.isVerified,
    },
    accessToken,
    refreshToken,
  };
}

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  logoutAllUser,
  forgotPasswordUser,
  refreshUser,
};
