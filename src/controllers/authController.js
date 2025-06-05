const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Mongoose model
const logger = require('../utils/logger');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    logger.warn({
      route: 'POST /auth/register',
      status: 400,
      reason: 'Missing name, email, or password'
    }, '❌ Registration failed');
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn({
        route: 'POST /auth/register',
        status: 409,
        reason: 'User already exists'
      }, '❌ Registration failed - Duplicate user');
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    logger.info({
      route: 'POST /auth/register',
      status: 201,
      email: newUser.email
    }, '✅ User registered successfully');

    res.status(201).json({
      message: 'User registered successfully',
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    logger.error({
      route: 'POST /auth/register',
      status: 500,
      error: err.message
    }, '❌ Registration error');
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn({
        route: 'POST /auth/login',
        status: 401,
        reason: 'User not found'
      }, '❌ Login failed');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn({
        route: 'POST /auth/login',
        status: 401,
        reason: 'Incorrect password'
      }, '❌ Login failed');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info({
      route: 'POST /auth/login',
      status: 200,
      email: user.email
    }, '✅ Login successful');

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    logger.error({
      route: 'POST /auth/login',
      status: 500,
      error: err.message
    }, '❌ Login error');
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login
};
