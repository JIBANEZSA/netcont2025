import React from 'react';

export const RadioGroup = ({ label, name, id, value, onChange, options }) => (
  <fieldset className="mb-4">
    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</legend>
    <div className="space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
      {options.map(opt => (
        <label key={opt.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className="form-radio"
          />
          <span className="ml-2 text-gray-900 dark:text-gray-200">{opt.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);
