import React from 'react';
import { Info } from 'lucide-react';

export const InputField = ({ label, id, type = 'number', value, onChange, step, min, info, disabled = false }) => ( //
  <div className="mb-4"> {/* */}
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> {/* */}
      {label}
      {info && <Info size={14} title={info} className="inline ml-1 text-gray-400 dark:text-gray-500 cursor-help" />}
    </label>
    <input
      type={type} //
      id={id} //
      name={id} // Ensure name is passed for handleInputChange //
      value={value} //
      onChange={onChange} //
      step={step} //
      min={min} //
      disabled={disabled}
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-700'}`} //
    />
  </div>
);