// server.js - Main Express server file
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Import middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const productsRouter = require('./routes/products');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/products', productsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NotFoundError',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Warn if API_KEY is not set
  if (!process.env.API_KEY) {
    console.warn('WARNING: API_KEY environment variable is not set. Authentication will fail.');
  }
});

// Export the app for testing purposes
module.exports = app;