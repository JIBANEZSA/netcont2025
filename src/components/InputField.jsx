import React from 'react';

export const InputField = ({ label, id, type = 'number', value, onChange, step, min }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      step={step}
      min={min}
      className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md focus:outline-none"
    />
  </div>
);
