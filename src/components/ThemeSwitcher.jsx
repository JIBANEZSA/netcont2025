import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react'; //

export const ThemeSwitcher = ({ theme, onChange }) => { //
  const icons = {
    light: <Sun className="h-5 w-5 text-yellow-500" />, //
    dark: <Moon className="h-5 w-5 text-blue-400" />, //
    system: <Monitor className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  };
  
  return (
    <div className="flex items-center space-x-2"> {/* */}
    <select
    value={theme} //
    onChange={e => onChange(e.target.value)} //
    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500" //
    aria-label="Select theme"
    >
    <option value="system">Sistema</option> {/* */}
    <option value="light">Claro</option> {/* */}
    <option value="dark">Oscuro</option> {/* */}
    </select>
    <span className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md">
    {theme === 'light' ? icons.light : theme === 'dark' ? icons.dark : icons.system} {/* */}
    </span>
    </div>
  );
};
