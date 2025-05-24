import React from 'react';
import { Info } from 'lucide-react';

export const SelectField = ({ label, id, value, onChange, options, optionValueKey = 'id', optionNameKey = 'nombre', info }) => (
  <div className="mb-4 relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} {info && <Info size={16} title={info} className="ml-1 text-gray-400" />}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-1 w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border rounded-md"
    >
      {options.map(opt => (
        <option key={opt[optionValueKey]} value={opt[optionValueKey]}>
          {opt[optionNameKey]}
        </option>
      ))}
    </select>
  </div>
);
