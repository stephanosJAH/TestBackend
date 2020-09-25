const express = require('express');
const router = express.Router();

//controller
const consumoMethod = require('../controllers/controller.consumos');

//middleware
const validatarCliente = require('../middleware/authentication');

//endpoint
router.route('/').get(validatarCliente.validarCliente, consumoMethod.consumosCliente);

module.exports = router;
