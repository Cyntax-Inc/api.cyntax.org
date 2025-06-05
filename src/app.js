const express = require('express');
const app = express();

app.use(express.json());

// Mount all API routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Cyntax API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
