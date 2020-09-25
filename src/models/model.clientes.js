let { db } = require('../db/database');

const metodos = {};

metodos.getCliente = async (nro_linea) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM clientes WHERE username = ? `, [nro_linea], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = metodos;
