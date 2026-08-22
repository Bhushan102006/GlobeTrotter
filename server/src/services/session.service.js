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

async function findSessionByRefreshToken(refreshToken) {
  if (!refreshToken) return null;

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  return Session.findOne({
    refreshTokenHash,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  });
}

async function revokeSessionByRefreshToken(refreshToken) {
  const session = await findSessionByRefreshToken(refreshToken);

  if (!session) return null;

  session.revokedAt = new Date();
  session.expiresAt = new Date();
  await session.save();

  return session;
}

async function revokeAllSessionsForUser(userId) {
  if (!userId) return 0;

  const result = await Session.updateMany(
    { userId, revokedAt: null },
    {
      revokedAt: new Date(),
      expiresAt: new Date(),
    }
  );

  return result.modifiedCount || result.nModified || 0;
}

module.exports = {
  createSession,
  findSessionByRefreshToken,
  revokeSessionByRefreshToken,
  revokeAllSessionsForUser,
};