const { addTicket } = require('../models/Tickets');
const logger = require('../utils/logger');

const createTicket = (req, res) => {
  const { userId, subject, message } = req.body;

  if (!userId || !subject || !message) {
    logger.warn({
      route: 'POST /tickets',
      status: 400,
      reason: 'Missing userId, subject, or message'
    }, '❌ Ticket creation failed');

    return res.status(400).json({ error: 'userId, subject, and message are required' });
  }

  const ticket = addTicket({
    userId,
    subject,
    message,
    status: 'open',
    createdAt: new Date()
  });

  logger.info({
    route: 'POST /tickets',
    status: 201,
    userId,
    subject
  }, '✅ Ticket created successfully');

  res.status(201).json({ success: true, data: ticket });
};

module.exports = {
  createTicket
};
