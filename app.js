const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const comicBookRoutes = require('./routes/comicBookRoutes');

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', comicBookRoutes);

// Error handling, if needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
