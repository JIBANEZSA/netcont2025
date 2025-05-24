import React, { useEffect, useState } from 'react';
import { useCalculator } from './hooks/useCalculator'; //
import { ThemeSwitcher } from './components/ThemeSwitcher'; //
import { FormInputs } from './components/FormInputs'; //
import { SummaryPanel } from './components/SummaryPanel'; //
import { WorkerCosts } from './components/WorkerCosts'; //
import { CompanyCosts } from './components/CompanyCosts'; //
import { Charts } from './components/Charts'; //
import { Footer } from './components/Footer'; //
import { BarChart3, Calculator, Building, Users, PieChart as PieChartIcon } from 'lucide-react';

export default function App() {
  const { inputs, setInputs, results, calculate } = useCalculator(); //
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system'); //

  useEffect(() => {
    calculate(); //
  }, [calculate]); // calculate is memoized and depends on inputs

  useEffect(() => {
    const root = window.document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)'); //

    const applyTheme = () => {
      const newTheme = theme === 'system' ? (mq.matches ? 'dark' : 'light') : theme;
      if (newTheme === 'dark') {
        root.classList.add('dark'); //
      } else {
        root.classList.remove('dark'); //
      }
      localStorage.setItem('theme', theme);
    };

    applyTheme();
    mq.addEventListener('change', applyTheme); //
    return () => mq.removeEventListener('change', applyTheme); //
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 flex justify-between items-center"> {/* */}
        <div className="flex items-center">
          <Calculator className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h1 className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-400"> {/* */}
            Calculadora de Nómina y Costes (NetCont 2025)
          </h1>
        </div>
        <ThemeSwitcher theme={theme} onChange={setTheme} /> {/* */}
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8"> {/* */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <section className="lg:col-span-4 xl:col-span-3 mb-6 lg:mb-0"> {/* */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg"> {/* */}
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
                Parámetros de Cálculo
              </h2>
              <FormInputs inputs={inputs} setInputs={setInputs} /> {/* */}
            </div>
          </section>

          <section className="lg:col-span-8 xl:col-span-9 space-y-6"> {/* */}
            {!results && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Ajuste los parámetros y los resultados del cálculo aparecerán aquí.
                </p>
              </div>
            )}
            {results && ( /* */
              <>
                <SummaryPanel results={results} /> {/* */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WorkerCosts results={results} /> {/* */}
                  <CompanyCosts results={results} /> {/* */}
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                   <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <PieChartIcon className="mr-2 h-6 w-6 text-indigo-500" />
                        Visualización Gráfica
                    </h2>
                  <Charts results={results} /> {/* */}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer /> {/* */}
    </div>
  );
}