// app.js
const express = require('express');
const usersRoutes = require('./routes/users');
const cors = require('cors'); // Import the cors module

const app = express();

// Apply CORS middleware
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRoutes);

module.exports = app;
