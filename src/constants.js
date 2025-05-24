export const GRUPOS_COTIZACION_2025 = [
  { id: 1, nombre: "Grupo 1: Ingenieros y Licenciados...", baseMinimaMes: 1929, baseMaximaMes: 4909.5, categorias: "Ingenieros y Licenciados..." },
  // … resto de grupos …
];

export const TOPE_MAXIMO_COTIZACION_MENSUAL_2025 = 4909.5;
export const TOPE_MINIMO_COTIZACION_BCP_MENSUAL_2025 = 1381.2;

export const TIPOS_COTIZACION_2025 = {
  contingenciasComunes: { empresa: 0.236, trabajador: 0.047, normativa: "Art. 4.a …", finalidad: "Cobertura de jubilación…" },
  desempleo: {
    indefinidoGeneral: { empresa: 0.055, trabajador: 0.0155, normativa: "Art. 33.2.a)…", finalidad: "Prestaciones desempleo indefinido" },
    duracionDeterminadaGeneral: { empresa: 0.067, trabajador: 0.016, normativa: "Art. 33.2.a)…", finalidad: "Prestaciones desempleo temporal" }
  },
  formacionProfesional: { empresa: 0.006, trabajador: 0.001, normativa: "Art. 33.2.c)…", finalidad: "Formación profesional" },
  fogasa: { empresa: 0.002, normativa: "Art. 33.2.b)…", finalidad: "Garantía salarial" },
  mei: { empresa: 0.0067, trabajador: 0.0013, normativa: "Art. 16…", finalidad: "Equidad intergeneracional" },
  horasExtraFuerzaMayor: { empresa: 0.12, trabajador: 0.02, normativa: "Art. 5…", finalidad: "Horas extra fuerza mayor" },
  horasExtraOtras: { empresa: 0.236, trabajador: 0.047, normativa: "Art. 5…", finalidad: "Horas extra otras" },
  solidaridad: {
    tramo1: { limiteInferior: 4909.5, limiteSuperior: 5400.45, empresa: 0.0077, trabajador: 0.0015, normativa: "Art.17.1.a)…", finalidad: "Solidaridad tramo 1" },
    tramo2: { limiteInferior: 5400.45, limiteSuperior: 7364.25, empresa: 0.0083, trabajador: 0.0017, normativa: "Art.17.1.b)…", finalidad: "Solidaridad tramo 2" },
    tramo3: { limiteInferior: 7364.25, limiteSuperior: Infinity, empresa: 0.0098, trabajador: 0.0019, normativa: "Art.17.1.c)…", finalidad: "Solidaridad tramo 3" }
  }
};
export const CNAE_DATA = [
  { codigo: "0111", descripcion: "Cultivo de cereales…", tipoATEP: 0.015 },
  // … resto de epígrafes …
];
export const TIPOS_CONTRATO = [
  { id: "indefinidoGeneral", nombre: "Indefinido General", tipoDesempleoKey: "indefinidoGeneral" },
  // … resto de contratos …
];
