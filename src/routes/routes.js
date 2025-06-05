const express = require('express');
const router = express.Router();

// Controllers
const { submitForm } = require('../controllers/formController');
const { createTicket } = require('../controllers/ticketController');

// Form Submission Route
router.post('/forms', submitForm);

// Ticketing Route
router.post('/tickets', createTicket);

module.exports = router;
