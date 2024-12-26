import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plug2, 
  LineChart, 
  Calculator, 
  FileText, 
  BellRing, 
  Settings,
  Menu as MenuIcon,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useNotifications } from './NotificationContext';
import NotificationCenter from './NotificationCenter';
import AppNotifications from './AppNotifications';

// Importamos todos los componentes de páginas
import Dashboard from './Dashboard';
import DevicesPage from './DevicesPage';
import HistoryPage from './HistoryPage';
import CalculatorPage from './CalculatorPage';
import ReportsPage from './ReportsPage';
import AlertsPage from './AlertsPage';
import SettingsPage from './SettingsPage';

const SIDEBAR_COLLAPSED_WIDTH = '16'; // w-16 = 4rem = 64px

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'devices', label: 'Dispositivos', icon: Plug2, path: '/devices', hasNotifications: true },
  { id: 'history', label: 'Histórico', icon: LineChart, path: '/history' },
  { id: 'calculator', label: 'Calculadora', icon: Calculator, path: '/calculator' },
  { id: 'reports', label: 'Reportes', icon: FileText, path: '/reports', hasNotifications: true },
  { id: 'alerts', label: 'Alertas', icon: BellRing, path: '/alerts', hasNotifications: true },
  { id: 'settings', label: 'Configuración', icon: Settings, path: '/settings' },
];

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fadeIn">
      {children}
    </div>
  );
};

const MenuItem = ({ item, isSidebarOpen, isActive, badgeCount }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={`
        flex transition-all duration-200 relative
        ${isActive 
          ? 'bg-blue-500 text-white dark:bg-blue-600' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
        ${isSidebarOpen 
          ? 'items-start p-3 mb-1 rounded-lg' 
          : 'items-center justify-center p-2 mb-1 mx-auto aspect-square w-10 rounded-lg'}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={`relative flex ${isSidebarOpen ? 'items-start' : 'items-center'}`}>
        <Icon className={`w-5 h-5 min-w-5 ${isSidebarOpen ? 'mt-0.5' : ''}`} />
        {item.hasNotifications && badgeCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                         rounded-full w-5 h-5 flex items-center justify-center">
            {badgeCount}
          </span>
        )}
        {isSidebarOpen && (
          <span className="ml-3 font-medium whitespace-nowrap">
            {item.label}
          </span>
        )}
      </div>
    </Link>
  );
};

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg transition-colors
        ${isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
      `}
      aria-label={`Cambiar a tema ${isDarkMode ? 'claro' : 'oscuro'}`}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const location = useLocation();
  const { badges } = useNotifications();

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  const getBadgeCount = (itemId) => {
    switch (itemId) {
      case 'devices':
        return badges.devices;
      case 'alerts':
        return badges.alerts;
      case 'reports':
        return badges.reports;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Componente de notificaciones globales */}
      <AppNotifications />
      
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-full bg-white dark:bg-gray-800 
          shadow-lg transition-all duration-300 z-20
          ${isSidebarOpen ? 'w-64' : `w-${SIDEBAR_COLLAPSED_WIDTH}`}
        `}
        aria-label="Barra lateral de navegación"
      >
        {/* Header del Sidebar */}
        <div className="flex h-16 items-center justify-center border-b dark:border-gray-700">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between w-full px-4">
              <span className="text-lg text-gray-600 dark:text-gray-300">Menú</span>
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                         dark:text-gray-300 transition-colors"
                aria-label="Cerrar barra lateral"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                       dark:text-gray-300 transition-colors"
              aria-label="Abrir barra lateral"
            >
              <MenuIcon size={20} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-3" aria-label="Menú principal">
          {menuItems.map(item => (
            <MenuItem 
              key={item.id} 
              item={item} 
              isSidebarOpen={isSidebarOpen}
              isActive={location.pathname === item.path}
              badgeCount={getBadgeCount(item.id)}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div 
        className={`
          min-h-screen transition-all duration-300
          ${isSidebarOpen ? 'ml-64' : `ml-${SIDEBAR_COLLAPSED_WIDTH}`}
        `}
      >
        {/* Header con NotificationCenter y ThemeToggle */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 
                      sticky top-0 z-10">
          <div className="h-full px-6 flex items-center justify-between relative">
            <div className="w-32"> {/* Espacio equivalente a los controles de la derecha */}
            </div>
            <h1 className="absolute left-1/2 transform -translate-x-1/2 
                         text-xl font-bold text-gray-800 dark:text-white">
              Monitor Eléctrico
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <NotificationCenter />
            </div>
          </div>
        </div>

        {/* Contenido de la página */}
        <div className="p-6">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;