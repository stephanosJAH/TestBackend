const consumoMethods = {};
//config
const { paises_exceptos } = require('../config/condicion_negocio');

//helper
const {
  fechasPeriodo,
  calculoConsumoDiffDiaSemanaDiaFinDeSemana,
} = require('../helpers/periodos');
const Format = require('../helpers/formatoMinutosSegundos');

//model
const { getAll } = require('../models/model.tarifas');
const Llamadas = require('../models/model.llamadas');

consumoMethods.consumosCliente = async (req, res) => {
  try {
    const cliente = req.cliente;

    const fechas = fechasPeriodo(req.periodo);

    const tarifas = await getAll();
    const llamadas = await Llamadas.getAllLlamadasClientePeriodo(req.cliente, fechas);

    let contadores = {
      locales: { tiempo: 0, valor: 0 },
      nacionales_semana: { tiempo: 0, valor: 0 },
      nacionales_fin_semana: { tiempo: 0, valor: 0 },
      internacionales: { tiempo: 0, valor: 0 },
      internacionales_chi_uru: { tiempo: 0, valor: 0 },
      total_tiempo: 0,
    };

    let contadoresConTiempo = calcularTiemposConsumos(cliente, llamadas, contadores);
    let contadoresConValor = calcularValorConsumos(contadoresConTiempo, tarifas);

    let data = formatearRespuesta(contadoresConValor);

    res.json({
      nro_abonado: cliente.username,
      periodo: req.periodo == 1 ? 'Mensual' : 'Anual',
      data,
    });
  } catch {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};

function calcularTiemposConsumos(cliente, llamadas, contadores) {
  llamadas.consumos.forEach((r) => {
    if (r.cod_pais == cliente.cod_pais && r.cod_area == cliente.cod_area)
      contadores.locales.tiempo += r.segundos_consumidos;

    if (r.cod_pais == cliente.cod_pais && r.cod_area != cliente.cod_area) {
      //llamada nacional realizada mismo dia
      if (r.dia_fecha_hora_inicio == r.dia_fecha_hora_fin) {
        //dias de semana
        if (r.dia_fecha_hora_inicio != 0 || r.dia_fecha_hora_inicio != 6) {
          contadores.nacionales_semana.tiempo += r.segundos_consumidos;
        } else {
          contadores.nacionales_fin_semana.tiempo += r.segundos_consumidos;
        }
      } else {
        let calculoConsumo = calculoConsumoDiffDiaSemanaDiaFinDeSemana(
          r.fecha_hora_inicio,
          r.fecha_hora_fin,
          r.dia_fecha_hora_inicio
        );
        contadores.nacionales_semana.tiempo += calculoConsumo.semana;
        contadores.nacionales_fin_semana.tiempo += calculoConsumo.fin_semana;
      }
    }

    if (r.cod_pais != cliente.cod_pais && !paises_exceptos.includes(r.cod_pais))
      contadores.internacionales.tiempo += r.segundos_consumidos;

    if (r.cod_pais != cliente.cod_pais && paises_exceptos.includes(r.cod_pais))
      contadores.internacionales_chi_uru.tiempo += r.segundos_consumidos;
  });

  return contadores;
}

function calcularValorConsumos(contadores, tarifas) {
  contadores.locales.valor = calcularTarifa(contadores.locales.tiempo, tarifas, 1);
  contadores.nacionales_semana.valor = calcularTarifa(
    contadores.nacionales_semana.tiempo,
    tarifas,
    2
  );
  contadores.nacionales_fin_semana.valor = calcularTarifa(
    contadores.nacionales_fin_semana.tiempo,
    tarifas,
    3
  );
  contadores.internacionales.valor = calcularTarifa(
    contadores.internacionales.tiempo,
    tarifas,
    4
  );
  contadores.internacionales_chi_uru.valor = calcularTarifa(
    contadores.internacionales_chi_uru.tiempo,
    tarifas,
    1
  );

  return contadores;
}

function formatearRespuesta(contadores) {
  let total_nacional =
    contadores.nacionales_semana.tiempo + contadores.nacionales_fin_semana.tiempo;
  let total_nacional_pago =
    contadores.nacionales_semana.valor + contadores.nacionales_fin_semana.valor;

  let total_internacional =
    contadores.internacionales.tiempo + contadores.internacionales_chi_uru.tiempo;
  let total_internacional_pago =
    contadores.internacionales.valor + contadores.internacionales_chi_uru.valor;

  let total_tiempo = contadores.locales.tiempo + total_nacional + total_internacional;
  let total_pago =
    contadores.locales.valor + total_nacional_pago + total_internacional_pago;

  return {
    consumos_locales: {
      tiempo: Format.segundoToMinutosText(contadores.locales.tiempo),
      pago: contadores.locales.valor,
    },
    consumos_nacionales: {
      semana: {
        tiempo: Format.segundoToMinutosText(contadores.nacionales_semana.tiempo),
        pago: contadores.nacionales_semana.valor,
      },
      fin_semana: {
        tiempo: Format.segundoToMinutosText(contadores.nacionales_fin_semana.tiempo),
        pago: contadores.nacionales_fin_semana.valor,
      },
      tiempo: Format.segundoToMinutosText(total_nacional),
      pago: total_nacional_pago,
    },
    consumos_internacionales: {
      general: {
        tiempo: Format.segundoToMinutosText(contadores.internacionales.tiempo),
        pago: contadores.internacionales.valor,
      },
      exceptos: {
        tiempo: Format.segundoToMinutosText(contadores.internacionales_chi_uru.tiempo),
        pago: contadores.internacionales_chi_uru.valor,
      },
      tiempo: Format.segundoToMinutosText(total_internacional),
      pago: total_internacional_pago,
    },
    total_consumos: {
      tiempo: Format.segundoToMinutosText(total_tiempo),
      pago: total_pago,
    },
  };
}

function calcularTarifa(segundos, tarifas, tarifa_id) {
  let valor = tarifas.tarifas.find((e) => e.id == tarifa_id);
  let minutos = Format.segundoToMinutosInt(segundos);
  return minutos * valor.valor;
}

module.exports = consumoMethods;
