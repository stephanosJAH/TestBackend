const moment = require('moment');

const funciones = {};

funciones.segundoToMinutosInt = (segundos) => {
  var minutes = Math.floor(segundos / 60);
  return minutes;
};

funciones.segundoToMinutosText = (segundos) => {
  var minutes = Math.floor(segundos / 60);
  secs = segundos % 60;
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

function pad(num) {
  return ('0' + num).slice(-2);
}

module.exports = funciones;
