import React, { useEffect, useState } from 'react';
import { useCalculator } from './hooks/useCalculator';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { FormInputs } from './components/FormInputs';
import { SummaryPanel } from './components/SummaryPanel';
import { WorkerCosts } from './components/WorkerCosts';
import { CompanyCosts } from './components/CompanyCosts';
import { Charts } from './components/Charts';
import { Footer } from './components/Footer';

export default function App() {
  const { inputs, setInputs, results, calculate } = useCalculator();
  const [theme, setTheme] = useState('system');

  useEffect(() => calculate(), [calculate]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      if (theme === 'dark' || (theme === 'system' && mq.matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    applyTheme();
    mq.addEventListener('change', applyTheme);
    return () => mq.removeEventListener('change', applyTheme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl text-indigo-600">NetCont_2025</h1>
        <ThemeSwitcher theme={theme} onChange={setTheme} />
      </header>
      <main className="container mx-auto p-4 lg:grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <FormInputs inputs={inputs} setInputs={setInputs} />
        </section>
        <section className="lg:col-span-2 space-y-6">
          {results && (
            <>
              <SummaryPanel results={results} />
              <WorkerCosts results={results} />
              <CompanyCosts results={results} />
              <Charts results={results} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
);
}
