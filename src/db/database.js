const sqlite3 = require('sqlite3').verbose();

const queries = require('./mocks');

const path = require('path');
const dbPath = path.join(__dirname, 'testtelefonia.db');

// open the database
const db = new sqlite3.Database(dbPath);

async function createDb() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DROP TABLE IF EXISTS tarifas;');
      db.run('DROP TABLE IF EXISTS clientes;');
      db.run('DROP TABLE IF EXISTS llamadas;');

      db.run(queries.dropIndexClientes);
      db.run(queries.dropIndexLlamadas);

      db.run(queries.tableTafifas);

      db.run(queries.tableClientes);
      db.run(queries.indexClientes);

      // db.run(queries.tableLlamadas, (err) => {
      //   if (err) return reject(err);
      //   resolve({
      //     db,
      //   });
      // });
      var stmt = db.prepare('INSERT INTO tarifas VALUES (?,?,?)');
      queries.dataTafifas.forEach((tquery) => {
        stmt.run(tquery.id, tquery.descripcion, tquery.valor);
      });
      stmt.finalize();

      var stmt = db.prepare('INSERT INTO clientes VALUES (?,?,?,?,?,?)');
      queries.dataClientes.forEach((cquery) => {
        stmt.run(cquery.id, cquery.nombre, cquery.p, cquery.a, cquery.n, cquery.username);
      });
      stmt.finalize();

      db.run(queries.tableLlamadas);
      db.run(queries.indexLlamadas);

      var stmt = db.prepare('INSERT INTO llamadas VALUES (?,?,?,?,?,?)');
      queries.dataLlamadas.forEach((lquery) => {
        stmt.run(lquery.id, lquery.p, lquery.a, lquery.n, lquery.ini, lquery.fin);
      });

      stmt.finalize((err) => {
        if (err) return reject(err);

        console.log('Data base created');

        resolve({
          client: db,
        });
      });
    });
  });
}

module.exports = {
  db,
  createDb,
};
