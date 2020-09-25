const express = require('express');
const morgan = require('morgan');

//initialization
const app = express();

// setting
app.set('port', process.env.PORT || 4000);

// middleware
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(require('./routes/index'));

// 404
app.use((req, res, next) => {
  res.status(404).send({ code: 404, message: 'Petición inválida' });
});

module.exports = app;
