// errors/NotFoundError.js - Not Found error
const ApiError = require('./ApiError');

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

module.exports = NotFoundError;