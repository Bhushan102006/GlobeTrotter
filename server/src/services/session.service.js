const Session = require("../models/session.model");
const crypto = require("crypto");

async function createSession({ userId, sessionId, refreshToken, userAgent, ipAddress }) {
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  return Session.create({
    sessionId,
    userId,
    refreshTokenHash,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}

module.exports = {
  createSession,
};