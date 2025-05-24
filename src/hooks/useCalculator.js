import { useState, useCallback } from 'react';
import {
  GRUPOS_COTIZACION_2025,
  TOPE_MAXIMO_COTIZACION_MENSUAL_2025,
  TOPE_MINIMO_COTIZACION_BCP_MENSUAL_2025,
  TIPOS_COTIZACION_2025,
  CNAE_DATA,
  TIPOS_CONTRATO
} from '../constants';

export const useCalculator = () => {
  const [inputs, setInputs] = useState({
    importeBase: 30000,
    periodicidad: 'anual',
    incluyePagasExtra: 'si',
    grupoCotizacionId: '1',
    epigrafeATEP: CNAE_DATA[0].codigo,
    tipoContrato: TIPOS_CONTRATO[0].id,
    importeHorasExtraFuerzaMayor: 0,
    importeOtrasHorasExtra: 0
  });
  const [results, setResults] = useState(null);

  const calculate = useCallback(() => {
    // Lógica de cálculos aquí...
    // Finalizar con: setResults(calculated);
  }, [inputs]);

  return { inputs, setInputs, results, calculate };
};
