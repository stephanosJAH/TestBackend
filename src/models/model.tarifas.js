let { db } = require('../db/database');

const metodos = {};

metodos.getAll = async () => {
  return new Promise((resolve, reject) => {
    let tarifas = [];
    db.each(
      `SELECT * FROM tarifas`,
      (err, row) => {
        if (err) reject(err);
        tarifas.push(row);
      },
      (err, count) => {
        if (err) reject(err);
        resolve({ count, tarifas });
      }
    );
  });
};

module.exports = metodos;
