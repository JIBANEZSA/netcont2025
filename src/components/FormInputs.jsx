import React, { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { AccordionItem } from './AccordionItem';
import { InputField } from './InputField';
import { RadioGroup } from './RadioGroup';
import { SelectField } from './SelectField';
import { Search } from 'lucide-react';
import { CNAE_DATA, GRUPOS_COTIZACION_2025, TIPOS_CONTRATO } from '../constants';

export const FormInputs = ({ inputs, setInputs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useMemo(() => debounce(val => setSearchTerm(val), 300), []);

  const handleInput = e => setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSearch = e => debounced(e.target.value);
  const filtered = useMemo(
    () => CNAE_DATA.filter(c => c.descripcion.toLowerCase().includes(searchTerm) || c.codigo.includes(searchTerm)),
    [searchTerm]
  );

  return (
    <>
      <AccordionItem title="Retribución">
        <InputField label="Importe Base" id="importeBase" value={inputs.importeBase} onChange={handleInput} />
        <RadioGroup
          label="Periodicidad"
          name="periodicidad"
          id="periodicidad"
          value={inputs.periodicidad}
          onChange={handleInput}
          options={[
            { value: 'anual', label: 'Anual' },
            { value: 'mensual', label: 'Mensual' }
          ]}
        />
        <RadioGroup
          label="Pagas Extra"
          name="incluyePagasExtra"
          id="incluyePagasExtra"
          value={inputs.incluyePagasExtra}
          onChange={handleInput}
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' }
          ]}
        />
      </AccordionItem>

      <AccordionItem title="Clasificación">
        <SelectField
          label="Grupo Cotización"
          id="grupoCotizacionId"
          value={inputs.grupoCotizacionId}
          onChange={handleInput}
          options={GRUPOS_COTIZACION_2025}
          optionValueKey="id"
          optionNameKey="nombre"
          info="Categorías laborales según grupo"
        />
        <div className="mb-4">
          <label
            htmlFor="epigrafeATEP"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            CNAE
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar…"
              onChange={handleSearch}
              className="w-full pl-3 pr-8 py-2 border rounded-md"
            />
            <Search size={16} className="absolute right-2 top-2 text-gray-400" />
          </div>
          <select
            id="epigrafeATEP"
            name="epigrafeATEP"
            value={inputs.epigrafeATEP}
            onChange={handleInput}
            className="mt-2 w-full border rounded-md"
            size={filtered.length || 1}
          >
            {filtered.map(c => (
              <option key={c.codigo} value={c.codigo}>
                {c.codigo} — {c.descripcion}
              </option>
            ))}
          </select>
        </div>
        <SelectField
          label="Tipo Contrato"
          id="tipoContrato"
          value={inputs.tipoContrato}
          onChange={handleInput}
          options={TIPOS_CONTRATO}
          optionValueKey="id"
          optionNameKey="nombre"
        />
      </AccordionItem>

      <AccordionItem title="Horas Extra">
        <InputField
          label="HE Fuerza Mayor"
          id="importeHorasExtraFuerzaMayor"
          value={inputs.importeHorasExtraFuerzaMayor}
          onChange={handleInput}
        />
        <InputField
          label="HE Otras"
          id="importeOtrasHorasExtra"
          value={inputs.importeOtrasHorasExtra}
          onChange={handleInput}
        />
      </AccordionItem>
    </>
  );
};
