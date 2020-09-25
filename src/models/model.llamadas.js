let { db } = require('../db/database');

const metodos = {};

// URUGUAY : 012
// CHILE : 013

// strftime('%w') day of week 0-6 with Sunday==0

let sql = `SELECT 
                *, 
                Cast (( JulianDay(fecha_hora_fin) - JulianDay(fecha_hora_inicio)) * 24 * 60 * 60 As Integer)  as segundos_consumidos,
                strftime('%w',fecha_hora_inicio) as dia_fecha_hora_inicio,
                strftime('%w',fecha_hora_fin) as dia_fecha_hora_fin
            FROM llamadas 
            WHERE cliente_id = ?
                AND fecha_hora_inicio >= ?
                AND fecha_hora_fin <= ?`;

metodos.getAllLlamadasClientePeriodo = async (cliente, fecha) => {
  return new Promise((resolve, reject) => {
    let consumos = [];
    db.each(
      sql,
      [cliente.cliente_id, fecha.desde, fecha.hasta],
      (err, row) => {
        if (err) reject(err);
        consumos.push(row);
      },
      (err, count) => {
        if (err) reject(err);
        resolve({ count, consumos });
      }
    );
  });
};

module.exports = metodos;
