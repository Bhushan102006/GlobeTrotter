const ApiError = require('./ApiError');

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
