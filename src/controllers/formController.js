const { createFormSubmission } = require('../models/Forms.js');

const submitForm = (req, res) => {
  const { name, email, message, source } = req.body;

  if (!name || !email || !message || !source) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const result = createFormSubmission({ name, email, message, source, submittedAt: new Date() });
  res.status(201).json({ success: true, data: result });
};

module.exports = {
  submitForm
};
