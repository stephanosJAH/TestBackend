const Clientes = require('../models/model.clientes');

const funciones = {};

funciones.validarCliente = async (req, res, next) => {
  const { nro_linea, periodo } = req.body;

  let cliente = await Clientes.getCliente(nro_linea);

  if (!cliente) {
    return res.status(401).json({
      status: 401,
      message: 'Cliente no encontrado',
    });
  }

  if (periodo != 1 && periodo != 2) {
    return res.status(401).json({
      status: 401,
      message: 'Periodo de Facturacion invalido',
    });
  }

  req.cliente = cliente;
  req.periodo = periodo;
  next();
};

module.exports = funciones;
