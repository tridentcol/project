import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Zap, Building } from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Panel,
  Select,
  Input,
  Button,
  SectionTitle,
  SubTitle
} from './CommonComponents';

const cities = {
  "Bogotá": "589.32",
  "Medellín": "579.45",
  "Cali": "595.67",
  "Barranquilla": "587.89",
  "Cartagena": "592.34",
  "Bucaramanga": "583.21",
  "Otra": ""
};

const CalculatorPage = () => {
  const [formData, setFormData] = useState({
    city: 'Bogotá',
    rate: cities['Bogotá'],
    customRate: '',
    periodType: 'month',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    consumption: ''
  });

  const [results, setResults] = useState({
    totalConsumption: 0,
    totalCost: 0,
    dailyAverage: 0,
    estimatedBill: 0
  });

  const handleCityChange = (city) => {
    setFormData(prev => ({
      ...prev,
      city,
      rate: cities[city]
    }));
  };

  const handlePeriodChange = (periodType) => {
    const today = new Date();
    let startDate = new Date();

    switch (periodType) {
      case 'day':
        startDate.setDate(today.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        break;
    }

    setFormData(prev => ({
      ...prev,
      periodType,
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    }));
  };

  const calculate = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const rate = formData.city === 'Otra' ? formData.customRate : formData.rate;
    
    const consumption = parseFloat(formData.consumption);
    const dailyAverage = consumption / days;
    const totalCost = consumption * parseFloat(rate);
    
    setResults({
      totalConsumption: consumption.toFixed(1),
      totalCost: totalCost.toFixed(2),
      dailyAverage: dailyAverage.toFixed(1),
      estimatedBill: (totalCost * 1.2).toFixed(2) // 20% adicional por otros cargos
    });
  };

  const ResultCard = ({ icon: Icon, title, value, subtitle }) => (
    <Panel>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{value}</p>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Panel>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Calculadora de Consumo"
        description="Calcula el costo estimado de tu consumo eléctrico"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <Panel className="space-y-6">
            {/* Ciudad y Tarifa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ciudad
              </label>
              <Select
                value={formData.city}
                onChange={(e) => handleCityChange(e.target.value)}
              >
                {Object.keys(cities).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </Select>
              {formData.city !== 'Otra' && (
                <SubTitle className="mt-2">
                  Tarifa: {formData.rate} COP/kWh
                </SubTitle>
              )}
            </div>

            {formData.city === 'Otra' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tarifa personalizada (COP/kWh)
                </label>
                <Input
                  type="number"
                  value={formData.customRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, customRate: e.target.value }))}
                  placeholder="Ingrese la tarifa..."
                />
              </div>
            )}

            {/* Período */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Período
              </label>
              <Select
                value={formData.periodType}
                onChange={(e) => handlePeriodChange(e.target.value)}
              >
                <option value="day">Último día</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
                <option value="quarter">Últimos 3 meses</option>
                <option value="year">Último año</option>
                <option value="custom">Personalizado</option>
              </Select>
            </div>

            {/* Fechas personalizadas */}
            {formData.periodType === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha inicial
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha final
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {/* Consumo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Consumo (kWh)
              </label>
              <Input
                type="number"
                value={formData.consumption}
                onChange={(e) => setFormData(prev => ({ ...prev, consumption: e.target.value }))}
                placeholder="Ingrese el consumo..."
              />
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={calculate}
            >
              Calcular
            </Button>
          </Panel>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard 
              icon={Zap}
              title="Consumo Total"
              value={`${results.totalConsumption} kWh`}
              subtitle="Consumo en el período seleccionado"
            />
            <ResultCard 
              icon={Clock}
              title="Promedio Diario"
              value={`${results.dailyAverage} kWh/día`}
              subtitle="Consumo promedio por día"
            />
            <ResultCard 
              icon={DollarSign}
              title="Costo Total"
              value={`$${results.totalCost} COP`}
              subtitle="Costo del consumo sin cargos adicionales"
            />
            <ResultCard 
              icon={Building}
              title="Factura Estimada"
              value={`$${results.estimatedBill} COP`}
              subtitle="Incluye cargos adicionales estimados"
            />
          </div>

          <Panel className="bg-blue-50 dark:bg-blue-900">
            <SectionTitle className="text-blue-800 dark:text-blue-200 mb-2">
              💡 Consejos de ahorro
            </SectionTitle>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>• Utiliza electrodomésticos eficientes (etiqueta A+++)</li>
              <li>• Aprovecha la luz natural durante el día</li>
              <li>• Desconecta los aparatos que no estés utilizando</li>
              <li>• Mantén una temperatura adecuada en el aire acondicionado</li>
            </ul>
          </Panel>
        </div>
      </div>
    </PageContainer>
  );
};

export default CalculatorPage;