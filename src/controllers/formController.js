const { createFormSubmission } = require('../models/Forms.js');
const logger = require('../utils/logger');

const submitForm = (req, res) => {
  const { name, email, message, source } = req.body;

  if (!name || !email || !message || !source) {
    logger.warn({
      route: 'POST /forms',
      status: 400,
      reason: 'Missing one or more required fields'
    }, '❌ Form submission failed');

    return res.status(400).json({ error: 'All fields are required' });
  }

  const result = createFormSubmission({
    name,
    email,
    message,
    source,
    submittedAt: new Date()
  });

  logger.info({
    route: 'POST /forms',
    status: 201,
    email,
    source
  }, '✅ Form submitted successfully');

  res.status(201).json({ success: true, data: result });
};

module.exports = {
  submitForm
};
