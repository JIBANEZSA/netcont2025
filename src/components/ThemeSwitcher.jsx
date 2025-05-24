import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher = ({ theme, onChange }) => {
  const icon = theme === 'dark' ? <Moon className="inline ml-2" /> : <Sun className="inline ml-2" />;
  return (
    <div className="flex items-center">
      <select value={theme} onChange={e => onChange(e.target.value)} className="p-2 border rounded-md">
        <option value="system">Sistema</option>
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </select>
      {icon}
    </div>
  );
};
