const express = require('express');
const cors = require('cors');
require('dotenv').config();
const requestLogger = require('./middleware/routeLogger');
const corsOptions = require('./middleware/cors');



const app = express();

app.use(express.json());
app.use(requestLogger);

// CORS setup
app.use(cors(corsOptions));

// Routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Cyntax API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
