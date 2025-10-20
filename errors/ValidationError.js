// errors/ValidationError.js - Validation error
const ApiError = require('./ApiError');

class ValidationError extends ApiError {
  constructor(message = 'Validation failed', details = {}) {
    super(message, 400);
    this.details = details;
  }
}

module.exports = ValidationError;