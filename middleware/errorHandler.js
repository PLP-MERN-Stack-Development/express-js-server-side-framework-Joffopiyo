// middleware/errorHandler.js - Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // If the error is one of our custom errors, use its status code and message
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }
  
  // For unexpected errors, return 500
  res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred'
  });
};

module.exports = errorHandler;