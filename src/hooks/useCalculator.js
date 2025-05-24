import { useState, useCallback } from 'react';
import {
  GRUPOS_COTIZACION_2025,
  TOPE_MAXIMO_COTIZACION_MENSUAL_2025,
  TOPE_MINIMO_COTIZACION_BCP_MENSUAL_2025,
  TIPOS_COTIZACION_2025,
  CNAE_DATA,
  TIPOS_CONTRATO
} from '../constants'; //

export const useCalculator = () => {
  const [inputs, setInputs] = useState({
    importeBase: 30000, //
    periodicidad: 'anual', //
    incluyePagasExtra: 'si', // 'si' means 12 pagas, 'no' means 14 pagas (base is divided by 14 then multiplied by 12 for monthly or prorated) //
    grupoCotizacionId: '1', //
    epigrafeATEP: CNAE_DATA[0].codigo, //
    tipoContrato: TIPOS_CONTRATO[0].id, //
    importeHorasExtraFuerzaMayor: 0, //
    importeOtrasHorasExtra: 0 //
  });
  const [results, setResults] = useState(null); //

  const calculate = useCallback(() => {
    const parsedInputs = {
      importeBase: parseFloat(inputs.importeBase) || 0,
      periodicidad: inputs.periodicidad,
      incluyePagasExtra: inputs.incluyePagasExtra,
      grupoCotizacionId: inputs.grupoCotizacionId,
      epigrafeATEP: inputs.epigrafeATEP,
      tipoContrato: inputs.tipoContrato,
      importeHorasExtraFuerzaMayor: parseFloat(inputs.importeHorasExtraFuerzaMayor) || 0,
      importeOtrasHorasExtra: parseFloat(inputs.importeOtrasHorasExtra) || 0,
    };

    let salarioBrutoAnual = parsedInputs.importeBase;
    if (parsedInputs.periodicidad === 'mensual') {
      salarioBrutoAnual = parsedInputs.incluyePagasExtra === 'si'
        ? parsedInputs.importeBase * 12
        : parsedInputs.importeBase * 14;
    }

    let salarioBrutoMensualSinPagasExtra = salarioBrutoAnual / 12;

    if (parsedInputs.incluyePagasExtra === 'no') {
        if (parsedInputs.periodicidad === 'anual') {
            salarioBrutoMensualSinPagasExtra = parsedInputs.importeBase / 12;
        } else { // mensual
            salarioBrutoMensualSinPagasExtra = (parsedInputs.importeBase * 14) / 12;
        }
    } else { // incluyePagasExtra === 'si'
        if (parsedInputs.periodicidad === 'anual') {
            salarioBrutoMensualSinPagasExtra = parsedInputs.importeBase / 12;
        } else { // mensual
            salarioBrutoMensualSinPagasExtra = parsedInputs.importeBase;
        }
    }

    const grupoCotizacion = GRUPOS_COTIZACION_2025.find(g => g.id.toString() === parsedInputs.grupoCotizacionId); //
    const baseMinimaGrupo = grupoCotizacion?.baseMinimaMes || TOPE_MINIMO_COTIZACION_BCP_MENSUAL_2025; //
    const baseMaximaGrupo = grupoCotizacion?.baseMaximaMes || TOPE_MAXIMO_COTIZACION_MENSUAL_2025; //

    // Base de Cotización por Contingencias Comunes (BCC)
    let bcc = salarioBrutoMensualSinPagasExtra;
    bcc = Math.max(bcc, baseMinimaGrupo);
    bcc = Math.min(bcc, baseMaximaGrupo);
    bcc = Math.min(bcc, TOPE_MAXIMO_COTIZACION_MENSUAL_2025); // Ensure general cap //

    // Base de Cotización por Contingencias Profesionales (BCP) y otros
    let bcp = salarioBrutoMensualSinPagasExtra + parsedInputs.importeHorasExtraFuerzaMayor + parsedInputs.importeOtrasHorasExtra;
    bcp = Math.max(bcp, TOPE_MINIMO_COTIZACION_BCP_MENSUAL_2025); // BCP has its own minimum if different //
    bcp = Math.min(bcp, TOPE_MAXIMO_COTIZACION_MENSUAL_2025); //


    const contratoSeleccionado = TIPOS_CONTRATO.find(tc => tc.id === parsedInputs.tipoContrato); //
    const tipoDesempleoKey = contratoSeleccionado?.tipoDesempleoKey || 'indefinidoGeneral'; //
    const cnaeSeleccionado = CNAE_DATA.find(c => c.codigo === parsedInputs.epigrafeATEP); //
    const tipoATEP = cnaeSeleccionado?.tipoATEP || 0; //

    const cotizaciones = TIPOS_COTIZACION_2025; //

    // Cuotas Trabajador
    const ccTrabajador = bcc * cotizaciones.contingenciasComunes.trabajador; //
    const desempleoTrabajador = bcp * (cotizaciones.desempleo[tipoDesempleoKey]?.trabajador || 0); //
    const fpTrabajador = bcp * cotizaciones.formacionProfesional.trabajador; //
    const meiTrabajador = bcc * cotizaciones.mei.trabajador; // MEI applies to BCC //
    const heFuerzaMayorTrabajador = parsedInputs.importeHorasExtraFuerzaMayor * cotizaciones.horasExtraFuerzaMayor.trabajador; //
    const heOtrasTrabajador = parsedInputs.importeOtrasHorasExtra * cotizaciones.horasExtraOtras.trabajador; //

    let solidaridadTrabajador = 0;
    // For simplicity, assuming 'salarioBrutoMensualSinPagasExtra' is the reference for solidarity if it exceeds the max cap.
    const salarioReferenciaSolidaridad = salarioBrutoMensualSinPagasExtra;

    if (salarioReferenciaSolidaridad > cotizaciones.solidaridad.tramo1.limiteInferior) { //
        const baseTramo1 = Math.min(salarioReferenciaSolidaridad, cotizaciones.solidaridad.tramo1.limiteSuperior) - cotizaciones.solidaridad.tramo1.limiteInferior; //
        if(baseTramo1 > 0) solidaridadTrabajador += baseTramo1 * cotizaciones.solidaridad.tramo1.trabajador; //
    }
    if (salarioReferenciaSolidaridad > cotizaciones.solidaridad.tramo2.limiteInferior) { //
        const baseTramo2 = Math.min(salarioReferenciaSolidaridad, cotizaciones.solidaridad.tramo2.limiteSuperior) - cotizaciones.solidaridad.tramo2.limiteInferior; //
        if(baseTramo2 > 0) solidaridadTrabajador += baseTramo2 * cotizaciones.solidaridad.tramo2.trabajador; //
    }
    if (salarioReferenciaSolidaridad > cotizaciones.solidaridad.tramo3.limiteInferior) { //
        const baseTramo3 = salarioReferenciaSolidaridad - cotizaciones.solidaridad.tramo3.limiteInferior; //
        if(baseTramo3 > 0) solidaridadTrabajador += baseTramo3 * cotizaciones.solidaridad.tramo3.trabajador; //
    }


    const totalAportacionesTrabajador = ccTrabajador + desempleoTrabajador + fpTrabajador + meiTrabajador + heFuerzaMayorTrabajador + heOtrasTrabajador + solidaridadTrabajador;
    const salarioNetoMensualAntesIRPF = salarioBrutoMensualSinPagasExtra + parsedInputs.importeHorasExtraFuerzaMayor + parsedInputs.importeOtrasHorasExtra - totalAportacionesTrabajador;
    const salarioNetoAnualAntesIRPF = salarioNetoMensualAntesIRPF * 12;


    // Cuotas Empresa
    const ccEmpresa = bcc * cotizaciones.contingenciasComunes.empresa; //
    const desempleoEmpresa = bcp * (cotizaciones.desempleo[tipoDesempleoKey]?.empresa || 0); //
    const fpEmpresa = bcp * cotizaciones.formacionProfesional.empresa; //
    const fogasaEmpresa = bcp * cotizaciones.fogasa.empresa; //
    const meiEmpresa = bcc * cotizaciones.mei.empresa; // MEI applies to BCC //
    const heFuerzaMayorEmpresa = parsedInputs.importeHorasExtraFuerzaMayor * cotizaciones.horasExtraFuerzaMayor.empresa; //
    const heOtrasEmpresa = parsedInputs.importeOtrasHorasExtra * cotizaciones.horasExtraOtras.empresa; //
    const atepEmpresa = bcp * tipoATEP;

    let solidaridadEmpresa = 0;
    if (salarioReferenciaSolidaridad > cotizaciones.solidaridad.tramo1.limiteInferior) { //
        const baseTramo1 = Math.min(salarioReferenciaSolidaridad, cotizaciones.solidaridad.tramo1.limiteSuperior) - cotizaciones.solidaridad.tramo1.limiteInferior; //
        if(baseTramo1 > 0) solidaridadEmpresa += baseTramo1 * cotizaciones.solidaridad.tramo1.empresa; //
    }
    if (salarioReferenciaSolidaridad > cotizaciones.solidaridad.tramo2.limiteInferior) { //
        const baseTramo2 = Math.min(salarioReferenciaSolidaridad, cotizaciones.solidaridad.tramo2.limiteSuperior) - cotizaciones.solidaridad.tramo2.limiteInferior; //
        if(baseTramo2 > 0) solidaridadEmpresa += baseTramo2 * cotizaciones.solidaridad.tramo2.empresa; //
    }
    if (salarioReferenciaSolidaridad > cotizaciones.solidaridad.tramo3.limiteInferior) { //
        const baseTramo3 = salarioReferenciaSolidaridad - cotizaciones.solidaridad.tramo3.limiteInferior; //
        if(baseTramo3 > 0) solidaridadEmpresa += baseTramo3 * cotizaciones.solidaridad.tramo3.empresa; //
    }

    const totalSeguridadSocialEmpresa = ccEmpresa + desempleoEmpresa + fpEmpresa + fogasaEmpresa + meiEmpresa + heFuerzaMayorEmpresa + heOtrasEmpresa + atepEmpresa + solidaridadEmpresa;
    const costeTotalMensualEmpresa = salarioBrutoMensualSinPagasExtra + parsedInputs.importeHorasExtraFuerzaMayor + parsedInputs.importeOtrasHorasExtra + totalSeguridadSocialEmpresa;
    const costeTotalAnualEmpresa = costeTotalMensualEmpresa * 12;

    setResults({
      salarioBrutoAnual,
      salarioBrutoMensualComputable: salarioBrutoMensualSinPagasExtra,
      bcc,
      bcp,
      trabajador: {
        cc: ccTrabajador,
        desempleo: desempleoTrabajador,
        fp: fpTrabajador,
        mei: meiTrabajador,
        heFuerzaMayor: heFuerzaMayorTrabajador,
        heOtras: heOtrasTrabajador,
        solidaridad: solidaridadTrabajador,
        totalAportaciones: totalAportacionesTrabajador,
      },
      empresa: {
        cc: ccEmpresa,
        desempleo: desempleoEmpresa,
        fp: fpEmpresa,
        fogasa: fogasaEmpresa,
        mei: meiEmpresa,
        atep: atepEmpresa,
        heFuerzaMayor: heFuerzaMayorEmpresa,
        heOtras: heOtrasEmpresa,
        solidaridad: solidaridadEmpresa,
        totalAportaciones: totalSeguridadSocialEmpresa,
      },
      salarioNetoMensualAntesIRPF,
      salarioNetoAnualAntesIRPF,
      costeTotalMensualEmpresa,
      costeTotalAnualEmpresa,
      horasExtra: {
        fuerzaMayor: parsedInputs.importeHorasExtraFuerzaMayor,
        otras: parsedInputs.importeOtrasHorasExtra,
      }
    });
  }, [inputs]); //

  return { inputs, setInputs, results, calculate }; //
};