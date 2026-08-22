const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const UnauthorizedError = require('../errors/UnauthorizedError');

function getTokenFromRequest(req) {
  const bearerToken = req.headers.authorization;

  if (bearerToken && bearerToken.startsWith('Bearer ')) {
    return bearerToken.split(' ')[1];
  }

  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
}

async function authMiddleware(req, res, next) {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      throw new UnauthorizedError('Access token missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'globetrotter-access-secret');
    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;

