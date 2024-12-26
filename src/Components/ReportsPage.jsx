import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  Printer,
  Mail,
  FileSpreadsheet,
  Share2,
  Plus
} from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Panel,
  Button,
  Select,
  Input,
  SearchInput,
  Badge
} from './CommonComponents';

const reportsData = [
  {
    id: 1,
    title: "Consumo Mensual",
    description: "Detalle del consumo eléctrico del último mes",
    date: "2024-03-15",
    type: "monthly",
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "Análisis de Dispositivos",
    description: "Uso y eficiencia de dispositivos conectados",
    date: "2024-03-14",
    type: "devices",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Reporte de Costos",
    description: "Análisis detallado de costos y tarifas",
    date: "2024-03-13",
    type: "costs",
    size: "1.2 MB"
  },
  {
    id: 4,
    title: "Tendencias Anuales",
    description: "Comparativa de consumo del último año",
    date: "2024-03-12",
    type: "yearly",
    size: "3.5 MB"
  }
];

const ReportTypeToVariant = {
  monthly: 'success',
  devices: 'info',
  costs: 'warning',
  yearly: 'danger'
};

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reportsData.filter(report => {
    const matchesPeriod = selectedPeriod === 'all' ? true : 
                         report.type === selectedPeriod;
    const matchesType = selectedType === 'all' ? true :
                       report.type === selectedType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPeriod && matchesType && matchesSearch;
  });

  const ReportCard = ({ report }) => (
    <Panel className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">{report.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{report.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(report.date).toLocaleDateString()}
              <span className="mx-2">•</span>
              {report.size}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="secondary" className="p-2" title="Descargar">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="secondary" className="p-2" title="Imprimir">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="secondary" className="p-2" title="Enviar por correo">
            <Mail className="w-4 h-4" />
          </Button>
          <Button variant="secondary" className="p-2" title="Compartir">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <Badge variant={ReportTypeToVariant[report.type]}>
          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
        </Badge>
      </div>
    </Panel>
  );

  const headerActions = (
    <Button variant="primary" className="flex items-center gap-2">
      <Plus className="w-4 h-4" />
      Nuevo Reporte
    </Button>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Reportes"
        description="Gestiona y descarga tus reportes de consumo"
        actions={headerActions}
      />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SearchInput 
          placeholder="Buscar reportes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="all">Todos los períodos</option>
          <option value="monthly">Mensual</option>
          <option value="yearly">Anual</option>
        </Select>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Todos los tipos</option>
          <option value="devices">Dispositivos</option>
          <option value="costs">Costos</option>
        </Select>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Button 
          variant="secondary"
          className="flex items-center justify-center gap-2 p-4"
        >
          <FileSpreadsheet className="w-5 h-5 text-green-500" />
          <span>Exportar a Excel</span>
        </Button>
        <Button 
          variant="secondary"
          className="flex items-center justify-center gap-2 p-4"
        >
          <Download className="w-5 h-5 text-blue-500" />
          <span>Descargar Todo</span>
        </Button>
        <Button 
          variant="secondary"
          className="flex items-center justify-center gap-2 p-4"
        >
          <Mail className="w-5 h-5 text-purple-500" />
          <span>Enviar por Correo</span>
        </Button>
        <Button 
          variant="secondary"
          className="flex items-center justify-center gap-2 p-4"
        >
          <Printer className="w-5 h-5 text-gray-500" />
          <span>Imprimir Selección</span>
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Panel className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            No se encontraron reportes
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Intenta ajustar los filtros de búsqueda
          </p>
        </Panel>
      )}
    </PageContainer>
  );
};

export default ReportsPage;