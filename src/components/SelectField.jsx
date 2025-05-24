import React from 'react';
import { Info } from 'lucide-react'; //

export const SelectField = ({ label, id, name, value, onChange, options, optionValueKey = 'id', optionNameKey = 'nombre', info, disabled = false }) => ( //
  <div className="mb-4 relative"> {/* */}
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> {/* */}
      {label}
      {info && <Info size={14} title={info} className="inline ml-1 text-gray-400 dark:text-gray-500 cursor-help" />} {/* */}
    </label>
    <select
      id={id} //
      name={name || id} // Ensure name is passed for handleInputChange //
      value={value} //
      onChange={onChange} //
      disabled={disabled}
      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-700'}`} //
    >
      {options.map(opt => ( //
        <option key={opt[optionValueKey]} value={opt[optionValueKey]}> {/* */}
          {opt[optionNameKey]} {/* */}
        </option>
      ))}
    </select>
  </div>
);