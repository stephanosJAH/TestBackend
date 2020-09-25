const express = require('express');
const app = express();

// routes
app.use('/api/consumos', require('./consumos'));

module.exports = app;
