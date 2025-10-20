// middleware/logger.js - Request logging middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - ${ip}`);
  
  // Capture response finish to log status code
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`[${timestamp}] ${method} ${url} - ${ip} - Status: ${res.statusCode}`);
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = logger;