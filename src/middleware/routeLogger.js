const logger = require('../utils/logger');

const routeLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  }, '📥 Incoming Request');
  next();
};

module.exports = routeLogger;
