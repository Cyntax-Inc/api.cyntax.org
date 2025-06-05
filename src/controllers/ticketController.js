const { addTicket } = require('../models/Tickets');

const createTicket = (req, res) => {
  const { userId, subject, message } = req.body;

  if (!userId || !subject || !message) {
    return res.status(400).json({ error: 'userId, subject, and message are required' });
  }

  const ticket = addTicket({ userId, subject, message, status: 'open', createdAt: new Date() });
  res.status(201).json({ success: true, data: ticket });
};

module.exports = {
  createTicket
};
