import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Battery, Plug, DollarSign } from 'lucide-react';
import { 
  PageContainer,
  PageHeader,
  Panel,
  StatCard,
  ChartCard,
  DeviceCard,
  Select
} from './CommonComponents';

// Datos de ejemplo para el gráfico
const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  power: Math.random() * 500 + 800
}));

const activeDevices = [
  { id: 1, name: 'Aire Acondicionado', icon: '🌡️', power: '1,200W', timeUsed: '2 horas', status: true, trend: -5 },
  { id: 2, name: 'Nevera', icon: '❄️', power: '500W', timeUsed: '24 horas', status: true, trend: 2 },
  { id: 3, name: 'Computador', icon: '💻', power: '300W', timeUsed: '5 horas', status: true, trend: -3 },
  { id: 4, name: 'TV', icon: '📺', power: '150W', timeUsed: '3 horas', status: false, trend: 0 },
  { id: 5, name: 'Lavadora', icon: '🌊', power: '800W', timeUsed: '0 horas', status: false, trend: 0 },
  { id: 6, name: 'Iluminación', icon: '💡', power: '150W', timeUsed: '8 horas', status: true, trend: -2 }
];

const Dashboard = () => {
  const [chartMetric, setChartMetric] = useState('power');
  const [deviceFilter, setDeviceFilter] = useState('all');

  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard"
        description="Resumen de consumo eléctrico y métricas importantes"
      />

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Consumo Total" 
          value="2,456 kWh" 
          trend={12} 
          icon={Activity}
          color="bg-blue-500 dark:bg-blue-600"
        />
        <StatCard 
          title="Costo Estimado" 
          value="$789,450" 
          trend={8} 
          icon={DollarSign}
          color="bg-green-500 dark:bg-green-600"
        />
        <StatCard 
          title="Dispositivos Activos" 
          value="5 de 8" 
          trend={-2} 
          icon={Plug}
          color="bg-red-500 dark:bg-red-600"
        />
        <StatCard 
          title="Potencia Actual" 
          value="1,200 W" 
          trend={-5} 
          icon={Battery}
          color="bg-yellow-500 dark:bg-yellow-600"
        />
      </div>

      {/* Gráfico de consumo */}
      <ChartCard 
        title="Consumo - Últimas 24 horas"
        action={
          <Select
            value={chartMetric}
            onChange={(e) => setChartMetric(e.target.value)}
          >
            <option value="power">Potencia</option>
            <option value="current">Corriente</option>
            <option value="voltage">Voltaje</option>
          </Select>
        }
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="dark:opacity-20"
              />
              <XAxis 
                dataKey="hour" 
                className="dark:text-gray-400"
              />
              <YAxis className="dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(31, 41, 55)', 
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="power" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Dispositivos en funcionamiento */}
      <Panel className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Dispositivos en Funcionamiento
          </h2>
          <Select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDevices
            .filter(device => {
              if (deviceFilter === 'active') return device.status;
              if (deviceFilter === 'inactive') return !device.status;
              return true;
            })
            .map(device => (
              <DeviceCard key={device.id} device={device} />
            ))
          }
        </div>
      </Panel>
    </PageContainer>
  );
};

export default Dashboard;