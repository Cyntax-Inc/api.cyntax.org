const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  source: String, // e.g., client1.com
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);
