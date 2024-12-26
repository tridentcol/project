import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Download, TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Button,
  Panel,
  Select,
  Input,
  StatCard,
  ChartCard
} from './CommonComponents';

// Datos de ejemplo
const generateData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    consumo: Math.random() * 50 + 70,
    costo: Math.random() * 30000 + 50000,
    potencia: Math.random() * 300 + 800
  }));
};

const HistoryPage = () => {
  const [period, setPeriod] = useState('month');
  const [metric, setMetric] = useState('consumo');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [data, setData] = useState(() => generateData(30));

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    const days = {
      day: 1,
      week: 7,
      month: 30,
      quarter: 90,
      year: 365
    }[newPeriod];
    setData(generateData(days));
  };

  const exportButton = (
    <Button variant="success" className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Exportar Datos
    </Button>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Histórico de Consumo"
        description="Analiza el consumo eléctrico a lo largo del tiempo"
        actions={exportButton}
      />

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          value={period}
          onChange={(e) => handlePeriodChange(e.target.value)}
        >
          <option value="day">Último día</option>
          <option value="week">Última semana</option>
          <option value="month">Último mes</option>
          <option value="quarter">Últimos 3 meses</option>
          <option value="year">Último año</option>
        </Select>

        <Select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          <option value="consumo">Consumo (kWh)</option>
          <option value="potencia">Potencia (W)</option>
          <option value="costo">Costo ($)</option>
        </Select>

        <Input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
        />
        <Input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
        />
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Consumo Total"
          value="2,456 kWh"
          trend={12}
          icon={AlertCircle}
          color="bg-blue-500"
        />
        <StatCard 
          title="Promedio Diario"
          value="82 kWh/día"
          trend={-5}
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard 
          title="Costo Total"
          value="$789,450"
          trend={8}
          icon={AlertCircle}
          color="bg-red-500"
        />
        <StatCard 
          title="Pico de Consumo"
          value="120 kWh"
          trend={15}
          icon={TrendingUp}
          color="bg-yellow-500"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Consumo por Período">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={metric} 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Distribución por Horario">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={metric} fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </PageContainer>
  );
};

export default HistoryPage;