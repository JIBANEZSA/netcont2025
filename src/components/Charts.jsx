import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RechartsTooltip } from 'recharts'; //
import { formatCurrency, formatPercentage } from '../utils/formatters';

const COLORS_PIE_WORKER = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];
const COLORS_PIE_COMPANY = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-lg text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>{`Valor: ${formatCurrency(data.value)}`}</p>
        {data.percentage && <p>{`Porcentaje: ${formatPercentage(data.percentage)}`}</p>}
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-medium">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export const Charts = ({ results }) => { //
  if (!results) return null;

  const { trabajador, empresa, salarioBrutoMensualComputable, salarioNetoMensualAntesIRPF, costeTotalMensualEmpresa, horasExtra } = results;

  const workerPieData = [
    { name: 'Cont. Comunes', value: trabajador.cc },
    { name: 'Desempleo', value: trabajador.desempleo },
    { name: 'Form. Profesional', value: trabajador.fp },
    { name: 'MEI', value: trabajador.mei },
    ...(trabajador.heFuerzaMayor > 0 ? [{ name: 'HE Fuerza Mayor', value: trabajador.heFuerzaMayor }] : []),
    ...(trabajador.heOtras > 0 ? [{ name: 'HE Otras', value: trabajador.heOtras }] : []),
    ...(trabajador.solidaridad > 0 ? [{ name: 'Solidaridad', value: trabajador.solidaridad }] : []),
  ].filter(d => d.value > 0);

  const totalWorkerContributions = workerPieData.reduce((sum, item) => sum + item.value, 0);
  const workerPieDataWithPercentage = workerPieData.map(item => ({...item, percentage: item.value / totalWorkerContributions}));


  const companyPieData = [
    { name: 'Cont. Comunes', value: empresa.cc },
    { name: 'Desempleo', value: empresa.desempleo },
    { name: 'Form. Profesional', value: empresa.fp },
    { name: 'FOGASA', value: empresa.fogasa },
    { name: 'MEI', value: empresa.mei },
    { name: 'AT/EP', value: empresa.atep },
    ...(empresa.heFuerzaMayor > 0 ? [{ name: 'HE Fuerza Mayor', value: empresa.heFuerzaMayor }] : []),
    ...(empresa.heOtras > 0 ? [{ name: 'HE Otras', value: empresa.heOtras }] : []),
    ...(empresa.solidaridad > 0 ? [{ name: 'Solidaridad', value: empresa.solidaridad }] : []),
  ].filter(d => d.value > 0);
  
  const totalCompanyContributions = companyPieData.reduce((sum, item) => sum + item.value, 0);
  const companyPieDataWithPercentage = companyPieData.map(item => ({...item, percentage: item.value / totalCompanyContributions}));

  const barChartData = [
    {
      name: 'Comparativa Mensual',
      'Salario Bruto': (salarioBrutoMensualComputable || 0) + (horasExtra?.fuerzaMayor || 0) + (horasExtra?.otras || 0),
      'Salario Neto (pre-IRPF)': salarioNetoMensualAntesIRPF || 0,
      'Coste Empresa': costeTotalMensualEmpresa || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"> {/* */}
      <div className="h-[350px] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow">
        <h4 className="text-md font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">Desglose Aportaciones Trabajador</h4>
        {workerPieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%"> {/* */}
            <PieChart> {/* */}
              <Pie /* */
                data={workerPieDataWithPercentage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {workerPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_PIE_WORKER[index % COLORS_PIE_WORKER.length]} /> /* */
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} /> {/* */}
              <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} /> {/* */}
            </PieChart>
          </ResponsiveContainer>
        ) : <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No hay aportaciones del trabajador para mostrar.</p>}
      </div>

      <div className="h-[350px] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow">
        <h4 className="text-md font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">Desglose Aportaciones Empresa (sin salario)</h4>
         {companyPieData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%"> {/* */}
          <PieChart> {/* */}
            <Pie /* */
              data={companyPieDataWithPercentage}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
            >
              {companyPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_PIE_COMPANY[index % COLORS_PIE_COMPANY.length]} /> /* */
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} /> {/* */}
            <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} /> {/* */}
          </PieChart>
        </ResponsiveContainer>
         ) : <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No hay aportaciones de la empresa para mostrar.</p>}
      </div>

      <div className="lg:col-span-2 h-[400px] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow mt-4">
        <h4 className="text-md font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">Comparativa Mensual: Salario vs Coste Empresa</h4>
        <ResponsiveContainer width="100%" height="100%"> {/* */}
          <BarChart data={barChartData} margin={{ top: 5, right: 20, left: 30, bottom: 45 }}> {/* */}
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} /> {/* */}
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={50} stroke="#6b7280" /> {/* */}
            <YAxis  /* */
                tickFormatter={(value) => formatCurrency(value, 'EUR', 'es-ES').replace('€', '')} 
                label={{ value: 'Euros (€)', angle: -90, position: 'insideLeft', offset:-20, style: {textAnchor: 'middle', fill: '#6b7280'} }}
                stroke="#6b7280"
            />
            <RechartsTooltip formatter={(value) => formatCurrency(value)} /> {/* */}
            <Legend wrapperStyle={{paddingTop: '15px'}}/> {/* */}
            <Bar dataKey="Salario Bruto" fill="#8884d8" barSize={40} /> {/* */}
            <Bar dataKey="Salario Neto (pre-IRPF)" fill="#82ca9d" barSize={40} /> {/* */}
            <Bar dataKey="Coste Empresa" fill="#ffc658" barSize={40} /> {/* */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};