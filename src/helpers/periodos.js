const moment = require('moment');

const funciones = {};

funciones.fechasPeriodo = (periodo) => {
  // 1 mensual
  // 2 anual

  let hasta = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

  if (periodo == 1) {
    desde = moment(new Date()).format('YYYY-MM-01 00:00:00');
  } else {
    desde = moment(new Date()).format('YYYY-01-01 00:00:00');
  }

  return { desde, hasta };
};

/*--------------------------------------------------------------------------|
  Funcion para calcular los tiempos en una llamada que 
  arranca un dia de semana y termina un dia de fin de semana o 
  arranca un dia de fin de semana y termina en uno de semana 
  --------------------------------------------------------------------------|

  fecha_inicio = fecha en que se inicio la llamada
  fecha_fin = fecha en que finalizo la llamada
  dia_inicio_llamada = de la semana , este valor me sirve para saber si la llamada se inicio
                        un dia de semana o el fin de semana 

proceso: calculo la diferencia entre entren la fecha de inicio hasta las 00:: de la fecha de fin
luego validando que dia arranco la llamada devuelvo los segundos para incrementar en cada contadaor

*/
funciones.calculoConsumoDiffDiaSemanaDiaFinDeSemana = (
  fecha_inicio,
  fecha_fin,
  dia_inicio_llamada
) => {
  // dia 5 viernes
  // sabado 6
  // domingo 0

  console.log(fecha_inicio);
  console.log(fecha_fin);
  console.log(dia_inicio_llamada);

  let consumos = {
    semana: 0,
    fin_semana: 0,
  };

  let aux_fecha_calculo = moment(fecha_fin).format('YYYY-MM-DD 00:00:00');

  //fin de semana
  if (dia_inicio_llamada == 6 || dia_inicio_llamada == 0) {
    consumos.fin_semana = moment(aux_fecha_calculo).diff(fecha_inicio, 'second');
    consumos.semana = moment(fecha_fin).diff(aux_fecha_calculo, 'second');
  } else {
    consumos.semana = moment(aux_fecha_calculo).diff(fecha_inicio, 'second');
    consumos.fin_semana = moment(fecha_fin).diff(aux_fecha_calculo, 'second');
  }

  return consumos;
};

module.exports = funciones;
