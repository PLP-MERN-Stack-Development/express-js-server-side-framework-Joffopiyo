// middleware/auth.js - Authentication middleware
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  
  if (!process.env.API_KEY) {
    console.warn('WARNING: API_KEY environment variable not set');
    return next();
  }
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new UnauthorizedError('Invalid API key');
  }
  
  next();
};

module.exports = auth;