const moment = require('moment');

module.exports = {
  tableTafifas: `CREATE TABLE IF NOT EXISTS tarifas (
        id INT primary key, 
        descripcion VARCHAR(40), 
        valor REAL);`,
  dataTafifas: [
    { id: 1, descripcion: 'llamadas locales', valor: 0.1 },
    { id: 2, descripcion: 'llamadas nacionales dia de semana', valor: 0.2 },
    { id: 3, descripcion: 'llamadas nacionales fines de semana', valor: 0.1 },
    { id: 4, descripcion: 'llamadas internacionales ex. Uru/Chi', valor: 0.5 },
  ],
  indexTarifas: '',
  tableClientes: `CREATE TABLE IF NOT EXISTS clientes(
        cliente_id INT primary key, 
        nombre_apellido VARCHAR(100), 
        cod_pais VARCHAR(5), 
        cod_area VARCHAR(5), 
        numero VARCHAR(8),
        username VARCHAR(18));`,
  dataClientes: [
    {
      id: 1,
      nombre: 'Mica A',
      p: '011',
      a: '15',
      n: '99001100',
      username: '0111599001100',
    },
    {
      id: 2,
      nombre: 'Lio M',
      p: '011',
      a: '65',
      n: '11001100',
      username: '0116511001100',
    },
    {
      id: 3,
      nombre: 'Clara L',
      p: '011',
      a: '17',
      n: '00770077',
      username: '0111700770077',
    },
    {
      id: 4,
      nombre: 'Juan P',
      p: '011',
      a: '11',
      n: '33003300',
      username: '0111133003300',
    },
  ],
  indexClientes: `CREATE UNIQUE INDEX idx_username ON clientes (username);`,
  dropIndexClientes: `DROP INDEX IF EXISTS idx_username;`,
  tableLlamadas: `CREATE TABLE IF NOT EXISTS llamadas (
        cliente_id INT, 
        cod_pais VARCHAR(5), 
        cod_area VARCHAR(5), 
        numero VARCHAR(8), 
        fecha_hora_inicio TEXT, 
        fecha_hora_fin TEXT, 
        FOREIGN KEY (cliente_id) REFERENCES clientes (cliente_id) );`,
  dataLlamadas: [
    {
      id: 1,
      p: '011',
      a: '15',
      n: '00000000',
      ini: moment('2020-09-21 10:00:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-21 10:20:30').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '011',
      a: '15',
      n: '00000000',
      ini: moment('2020-09-11 10:00:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-11 10:20:00').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '011',
      a: '14',
      n: '00000000',
      ini: moment('2020-09-04 23:50:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-05 00:05:00').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '011',
      a: '14',
      n: '00000000',
      ini: moment('2020-09-06 23:35:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-07 00:20:00').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '011',
      a: '14',
      n: '00000000',
      ini: moment('2020-09-03 21:35:10').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-03 21:37:30').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '054',
      a: '15',
      n: '00000000',
      ini: moment('2020-09-01 14:30:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-01 14:43:30').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '011',
      a: '17',
      n: '00000000',
      ini: moment('2020-09-05 17:34:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-05 17:44:30').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '012',
      a: '151',
      n: '00000000',
      ini: moment('2020-09-20 17:34:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-20 17:44:30').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '013',
      a: '152',
      n: '00000000',
      ini: moment('2020-09-21 17:34:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-09-21 18:44:30').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '013',
      a: '152',
      n: '00000000',
      ini: moment('2020-08-21 17:34:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-08-21 18:34:00').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 1,
      p: '012',
      a: '151',
      n: '00000000',
      ini: moment('2020-08-11 17:34:00').format('YYYY-MM-DD HH:mm:ss'),
      fin: moment('2020-08-11 18:34:30').format('YYYY-MM-DD HH:mm:ss'),
    },
  ],
  indexLlamadas: `CREATE INDEX idx_cliente_id ON llamadas (cliente_id);`,
  dropIndexLlamadas: `DROP INDEX IF EXISTS idx_cliente_id;`,
};
