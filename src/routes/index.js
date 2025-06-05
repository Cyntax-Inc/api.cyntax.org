const express = require('express');
const router = express.Router();

const { submitForm } = require('../controllers/formController');
const { createTicket } = require('../controllers/ticketController');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public
router.post('/forms', submitForm);
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected
router.post('/tickets', auth, createTicket);

module.exports = router;
