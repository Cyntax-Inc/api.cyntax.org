const FormSubmission = require('../models/Forms'); // Mongoose model
const logger = require('../utils/logger');

const submitForm = async (req, res) => {
  const { name, email, message, source } = req.body;

  if (!name || !email || !message || !source) {
    logger.warn({
      route: 'POST /forms',
      status: 400,
      reason: 'Missing one or more required fields'
    }, '❌ Form submission failed');

    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await FormSubmission.create({
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
  } catch (err) {
    logger.error({
      route: 'POST /forms',
      status: 500,
      error: err.message
    }, '❌ Form submission error');
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  submitForm
};
