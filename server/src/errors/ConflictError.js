const ApiError = require('./ApiError');

class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message);
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
