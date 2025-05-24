import React from 'react';
import { Info } from 'lucide-react';

export const RadioGroup = ({ label, name, value, onChange, options, info, disabled = false }) => ( //
  <fieldset className="mb-4"> {/* */}
    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> {/* */}
      {label}
      {info && <Info size={14} title={info} className="inline ml-1 text-gray-400 dark:text-gray-500 cursor-help" />}
    </legend>
    <div className="mt-2 space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-4"> {/* */}
      {options.map(opt => ( //
        <label key={opt.value} className={`inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}> {/* */}
          <input
            type="radio"
            name={name} //
            value={opt.value} //
            checked={value === opt.value} //
            onChange={onChange} //
            disabled={disabled}
            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:bg-gray-700 dark:checked:bg-indigo-500" //
          />
          <span className="ml-2 text-sm text-gray-800 dark:text-gray-200">{opt.label}</span> {/* */}
        </label>
      ))}
    </div>
     {disabled && name === 'incluyePagasExtra' && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Opción no aplicable para periodicidad anual.</p>
      )}
  </fieldset>
);