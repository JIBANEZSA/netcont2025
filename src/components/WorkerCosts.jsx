import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { User } from 'lucide-react';

const CostRow = ({ label, value, isTotal = false, tooltip = null }) => (
  <tr className={`border-b border-gray-200 dark:border-gray-700 ${isTotal ? 'font-semibold bg-gray-100 dark:bg-gray-700/60' : ''}`}>
    <td className="py-2 px-3 text-sm text-gray-700 dark:text-gray-300" title={tooltip || label}>{label}</td>
    <td className="py-2 px-3 text-sm text-right text-gray-900 dark:text-gray-100">{formatCurrency(value)}</td>
  </tr>
);


export const WorkerCosts = ({ results }) => { //
  if (!results || !results.trabajador) return null;
  const { trabajador, bcc, bcp } = results;

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"> {/* */}
      <h3 className="text-lg font-semibold mb-4 flex items-center"> {/* */}
        <User className="mr-2 h-5 w-5 text-indigo-500" />
        Desglose Aportaciones Trabajador (Mensual)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Concepto</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Importe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <CostRow label="Base Contingencias Comunes (BCC)" value={bcc} />
            <CostRow label="Base Contingencias Profesionales (BCP)" value={bcp} />
             <tr className="font-medium bg-gray-50 dark:bg-gray-700/30"><td colSpan="2" className="py-1 px-3 text-xs text-indigo-600 dark:text-indigo-400">Cuotas Seguridad Social:</td></tr>
            <CostRow label="Contingencias Comunes" value={trabajador.cc} />
            <CostRow label="Desempleo" value={trabajador.desempleo} />
            <CostRow label="Formación Profesional" value={trabajador.fp} />
            <CostRow label="Mecanismo Equidad Intergeneracional (MEI)" value={trabajador.mei} />
            {trabajador.heFuerzaMayor > 0 && <CostRow label="Horas Extra Fuerza Mayor" value={trabajador.heFuerzaMayor} />}
            {trabajador.heOtras > 0 && <CostRow label="Otras Horas Extra" value={trabajador.heOtras} />}
            {trabajador.solidaridad > 0 && <CostRow label="Cuota Solidaridad" value={trabajador.solidaridad} />}
            <CostRow label="Total Aportaciones Trabajador" value={trabajador.totalAportaciones} isTotal={true} />
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
        Salario Neto Mensual (antes de IRPF): <strong className="font-semibold">{formatCurrency(results.salarioNetoMensualAntesIRPF)}</strong>
      </p>
    </div>
  );
};