import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, User, Building, Euro } from 'lucide-react';

const SummaryItem = ({ label, value, icon: Icon, currency = true, textSize = "text-lg" }) => (
  <div className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
    {Icon && <Icon className="h-6 w-6 mb-2 text-indigo-500" />}
    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{label}</span>
    <span className={`font-semibold text-gray-800 dark:text-gray-100 ${textSize}`}>
      {currency ? formatCurrency(value) : value}
    </span>
  </div>
);

export const SummaryPanel = ({ results }) => { //
  if (!results) return null;

  const {
    salarioBrutoAnual,
    salarioNetoMensualAntesIRPF,
    trabajador,
    empresa,
    costeTotalAnualEmpresa,
  } = results;

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"> {/* */}
      <h2 className="text-xl font-semibold mb-4 flex items-center"> {/* */}
        <Euro className="mr-2 h-6 w-6 text-indigo-500" />
        Resumen del Cálculo
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <SummaryItem label="Salario Bruto Anual" value={salarioBrutoAnual} icon={TrendingUp} textSize="text-md sm:text-lg" />
        <SummaryItem label="Salario Neto Mensual (pre-IRPF)" value={salarioNetoMensualAntesIRPF} icon={User} textSize="text-md sm:text-lg"/>
        <SummaryItem label="Total Aportaciones Trabajador (mensual)" value={trabajador.totalAportaciones} icon={User} textSize="text-md sm:text-lg"/>
        <SummaryItem label="Coste Total Anual Empresa" value={costeTotalAnualEmpresa} icon={Building} textSize="text-md sm:text-lg"/>
      </div>
      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-center">
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          El Salario Neto es <strong className="font-semibold">antes</strong> de la retención de IRPF, ya que este depende de la situación personal y no se calcula aquí.
        </p>
      </div>
    </div>
  );
};