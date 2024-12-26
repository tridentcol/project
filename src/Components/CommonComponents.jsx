import React from 'react';
import { TrendingUp, TrendingDown, X } from 'lucide-react';

// Panel/Card base
export const Panel = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 
                transition-colors duration-200 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// Título de sección
export const SectionTitle = ({ children, className = '', ...props }) => (
  <h2 
    className={`text-xl font-semibold text-gray-900 dark:text-white mb-4 ${className}`}
    {...props}
  >
    {children}
  </h2>
);

// Subtítulo
export const SubTitle = ({ children, className = '', ...props }) => (
  <p 
    className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);

// Contenedor de página
export const PageContainer = ({ children, className = '', ...props }) => (
  <div 
    className={`p-6 max-w-7xl mx-auto space-y-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Header de página
export const PageHeader = ({ title, description, actions }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
    {actions && <div className="flex gap-3">{actions}</div>}
  </div>
);

// Tabla con estilos predefinidos
export const Table = ({ children, className = '', ...props }) => (
  <div className="overflow-x-auto">
    <table 
      className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`}
      {...props}
    >
      {children}
    </table>
  </div>
);

// Encabezado de tabla
export const TableHeader = ({ children, ...props }) => (
  <thead className="bg-gray-50 dark:bg-gray-700" {...props}>
    {children}
  </thead>
);

// Celda de encabezado
export const TableHead = ({ children, className = '', ...props }) => (
  <th 
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 
                dark:text-gray-300 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </th>
);

// Fila de tabla
export const TableRow = ({ children, className = '', ...props }) => (
  <tr 
    className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${className}`}
    {...props}
  >
    {children}
  </tr>
);

// Celda de tabla
export const TableCell = ({ children, className = '', ...props }) => (
  <td 
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 
                dark:text-gray-400 ${className}`}
    {...props}
  >
    {children}
  </td>
);

// Input con estilos predefinidos
export const Input = ({ className = '', ...props }) => (
  <input 
    className={`w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 
                dark:border-gray-600 rounded-lg text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                placeholder-gray-400 dark:placeholder-gray-500 ${className}`}
    {...props}
  />
);

// Input de búsqueda
export const SearchInput = ({ icon: Icon, ...props }) => (
  <div className="relative flex-1">
    {Icon && <Icon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />}
    <Input
      {...props}
      className={`${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2`}
    />
  </div>
);

// Select con estilos predefinidos
export const Select = ({ className = '', ...props }) => (
  <select 
    className={`w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 
                dark:border-gray-600 rounded-lg text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${className}`}
    {...props}
  />
);

// Botón primario
export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700',
    success: 'bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700',
  };

  return (
    <button 
      className={`px-4 py-2 rounded-lg transition-colors duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge
export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300',
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Stat Card para Dashboard
export const StatCard = ({ title, value, trend, icon: Icon, color }) => (
  <Panel className="transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center gap-1 ${trend >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
        {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="text-sm">{Math.abs(trend)}%</span>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
    </div>
  </Panel>
);

// Card para gráficas
export const ChartCard = ({ title, children, action }) => (
  <Panel className="transition-all duration-300 hover:shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {action}
    </div>
    {children}
  </Panel>
);

// Card para dispositivos
export const DeviceCard = ({ device, onClick, className = '' }) => (
  <Panel 
    className={`transition-all duration-300 hover:shadow-lg cursor-pointer
      ${!device.status && 'bg-gray-50 dark:bg-gray-800'} ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{device.icon}</span>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
          {device.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.description}</p>
          )}
        </div>
      </div>
      <div className={`flex items-center gap-1 
        ${device.status ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}
      >
        <div className="w-2 h-2 rounded-full bg-current" />
        <span className="text-sm">{device.status ? 'Activo' : 'Inactivo'}</span>
      </div>
    </div>
    <div className="space-y-2">
      {Object.entries(device.metrics || {}).map(([key, value]) => (
        <div key={key} className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">{key}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{value}</span>
        </div>
      ))}
      {device.status && device.trend !== undefined && (
        <div className={`text-sm ${device.trend < 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {device.trend < 0 ? '↓' : '↑'} {Math.abs(device.trend)}% vs promedio
        </div>
      )}
    </div>
  </Panel>
);

// Card para alertas
export const AlertCard = ({ alert, onMarkRead, onDelete }) => (
  <Panel className={`
    transition-all duration-300 hover:shadow-lg
    ${!alert.isRead ? 'border-l-4 border-blue-500 dark:border-blue-400' : ''}
  `}>
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {alert.icon}
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">{alert.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{alert.description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{alert.source}</span>
            <span className="mx-2">•</span>
            <span>{alert.timestamp}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!alert.isRead && (
          <button 
            onClick={() => onMarkRead?.(alert.id)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Marcar como leída"
          >
            <span className="w-2 h-2 block bg-blue-500 rounded-full"/>
          </button>
        )}
        <button 
          onClick={() => onDelete?.(alert.id)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          title="Eliminar alerta"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  </Panel>
);

// Modal
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};