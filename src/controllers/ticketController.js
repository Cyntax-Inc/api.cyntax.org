const Ticket = require('../models/Tickets');
const logger = require('../utils/logger');

const createTicket = async (req, res) => {
  const { subject, message } = req.body;
  const userId = req.user.id;

  if (!userId || !subject || !message) {
    logger.warn({
      route: 'POST /tickets',
      status: 400,
      reason: 'Missing userId, subject, or message'
    }, '❌ Ticket creation failed');

    return res.status(400).json({ error: 'userId, subject, and message are required' });
  }

  try {
    const ticket = await Ticket.create({
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
  } catch (err) {
    logger.error({
      route: 'POST /tickets',
      status: 500,
      error: err.message
    }, '❌ Ticket creation error');
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTicket
};
