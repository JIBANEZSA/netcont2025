import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce'; //
import { AccordionItem } from './AccordionItem'; //
import { InputField } from './InputField'; //
import { RadioGroup } from './RadioGroup'; //
import { SelectField } from './SelectField'; //
import { Search, Briefcase, FileText, Clock, TrendingUp, Users, Percent } from 'lucide-react'; //
import { CNAE_DATA, GRUPOS_COTIZACION_2025, TIPOS_CONTRATO } from '../constants'; //

export const FormInputs = ({ inputs, setInputs }) => { //
  const [searchTermCNAE, setSearchTermCNAE] = useState(''); //

  const debouncedCNAESearch = useMemo( //
    () => debounce(val => setSearchTermCNAE(val.toLowerCase()), 300),
    []
  );

  const handleInputChange = useCallback(e => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({ //
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, [setInputs]);

  const handleCNAESearch = useCallback(e => { //
    debouncedCNAESearch(e.target.value);
  }, [debouncedCNAESearch]);

  const filteredCNAE = useMemo( //
    () => CNAE_DATA.filter(c => //
      c.descripcion.toLowerCase().includes(searchTermCNAE) || c.codigo.includes(searchTermCNAE) //
    ), [searchTermCNAE]
  );

  return (
    <div className="space-y-1">
      <AccordionItem title="Retribución Principal" icon={TrendingUp} defaultOpen={true}> {/* */}
        <InputField
          label="Importe Base Salarial"
          id="importeBase" //
          type="number"
          value={inputs.importeBase} //
          onChange={handleInputChange}
          step="100"
          min="0"
          info="Indique el salario base. La periodicidad y pagas extra ajustarán el cálculo."
        />
        <RadioGroup
          label="Periodicidad del Importe Base"
          name="periodicidad" //
          value={inputs.periodicidad} //
          onChange={handleInputChange}
          options={[ //
            { value: 'anual', label: 'Anual' },
            { value: 'mensual', label: 'Mensual' }
          ]}
          info="Define si el importe base es anual o mensual."
        />
        <RadioGroup
          label="Incluye Pagas Extra en Importe Base Mensual"
          name="incluyePagasExtra" //
          value={inputs.incluyePagasExtra} //
          onChange={handleInputChange}
          options={[ //
            { value: 'si', label: 'Sí (12 pagas)' },
            { value: 'no', label: 'No (14 pagas, base se prorratea)' }
          ]}
          info="Si la periodicidad es mensual, indique si el importe ya incluye la prorrata de pagas extra."
          disabled={inputs.periodicidad === 'anual'}
        />
      </AccordionItem>

      <AccordionItem title="Clasificación Profesional y Contrato" icon={Briefcase} defaultOpen={true}> {/* */}
        <SelectField
          label="Grupo Cotización"
          id="grupoCotizacionId" //
          name="grupoCotizacionId"
          value={inputs.grupoCotizacionId} //
          onChange={handleInputChange}
          options={GRUPOS_COTIZACION_2025} //
          optionValueKey="id" //
          optionNameKey="nombre" //
          info="Seleccione el grupo de cotización según la categoría profesional."
        />
        <div className="mb-4"> {/* */}
          <label
            htmlFor="cnaeSearchInput"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" //
          >
            CNAE (para AT/EP) <Percent size={14} className="inline ml-1 text-gray-400" title="Epígrafe para Accidentes de Trabajo y Enfermedades Profesionales"/> {/* */}
          </label>
          <div className="relative mb-1"> {/* */}
            <input
              id="cnaeSearchInput"
              type="text"
              placeholder="Buscar CNAE por código o descripción..." //
              onChange={handleCNAESearch}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" //
            />
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" /> {/* */}
          </div>
          <select
            id="epigrafeATEP" //
            name="epigrafeATEP" //
            value={inputs.epigrafeATEP} //
            onChange={handleInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700" //
            size={filteredCNAE.length > 5 ? 5 : (filteredCNAE.length || 1)} // Show scroll for more than 5 items //
          >
            {filteredCNAE.length > 0 ? filteredCNAE.map(c => ( //
              <option key={c.codigo} value={c.codigo}> {/* */}
                {c.codigo} — {c.descripcion.length > 50 ? c.descripcion.substring(0,50) + "..." : c.descripcion} {/* */}
              </option>
            )) : <option disabled>No hay resultados</option>}
          </select>
        </div>
        <SelectField
          label="Tipo de Contrato"
          id="tipoContrato" //
          name="tipoContrato"
          value={inputs.tipoContrato} //
          onChange={handleInputChange}
          options={TIPOS_CONTRATO} //
          optionValueKey="id" //
          optionNameKey="nombre" //
          info="El tipo de contrato afecta a la cotización por desempleo."
        />
      </AccordionItem>

      <AccordionItem title="Horas Extraordinarias" icon={Clock}> {/* */}
        <InputField
          label="Importe Horas Extra (Fuerza Mayor)"
          id="importeHorasExtraFuerzaMayor" //
          type="number"
          value={inputs.importeHorasExtraFuerzaMayor} //
          onChange={handleInputChange}
          step="0.01"
          min="0"
          info="Remuneración por horas extraordinarias debidas a fuerza mayor."
        />
        <InputField
          label="Importe Otras Horas Extra (Estructurales/No Estructurales)"
          id="importeOtrasHorasExtra" //
          type="number"
          value={inputs.importeOtrasHorasExtra} //
          onChange={handleInputChange}
          step="0.01"
          min="0"
          info="Remuneración por el resto de horas extraordinarias."
        />
      </AccordionItem>
    </div>
  );
};