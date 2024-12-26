import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle,
  Info,
  Sliders,
  ToggleLeft,
  Plus,
  Mail,
  MessageSquare,
  BellRing
} from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Panel,
  Button,
  AlertCard,
  Modal,
  SectionTitle,
  SubTitle
} from './CommonComponents';

const initialAlerts = [
  {
    id: 1,
    title: "Alto consumo detectado",
    description: "El consumo actual supera el promedio histórico en un 25%",
    type: "warning",
    device: "General",
    timestamp: "2024-03-20T10:30:00",
    isRead: false,
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />
  },
  {
    id: 2,
    title: "Aire Acondicionado",
    description: "El dispositivo ha estado funcionando por más de 8 horas continuas",
    type: "info",
    device: "Aire Acondicionado",
    timestamp: "2024-03-20T09:15:00",
    isRead: true,
    icon: <Info className="w-6 h-6 text-blue-500" />
  },
  {
    id: 3,
    title: "Límite de potencia excedido",
    description: "La potencia actual (4500W) supera el límite establecido (4000W)",
    type: "danger",
    device: "General",
    timestamp: "2024-03-20T08:45:00",
    isRead: false,
    icon: <AlertCircle className="w-6 h-6 text-red-500" />
  }
];

const settings = [
  {
    category: "Consumo",
    rules: [
      { id: 1, name: "Alto consumo", enabled: true, threshold: 4000 },
      { id: 2, name: "Consumo inusual", enabled: true, threshold: null },
      { id: 3, name: "Pico de potencia", enabled: false, threshold: 5000 }
    ]
  },
  {
    category: "Dispositivos",
    rules: [
      { id: 4, name: "Dispositivo inactivo", enabled: true, threshold: null },
      { id: 5, name: "Uso prolongado", enabled: true, threshold: 8 },
      { id: 6, name: "Falla de conexión", enabled: true, threshold: null }
    ]
  },
  {
    category: "Sistema",
    rules: [
      { id: 7, name: "Actualizaciones", enabled: true, threshold: null },
      { id: 8, name: "Estado de conexión", enabled: true, threshold: null },
      { id: 9, name: "Reportes automáticos", enabled: false, threshold: null }
    ]
  }
];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false
  });

  const filterAlerts = () => {
    return alerts.filter(alert => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'unread') return !alert.isRead;
      return alert.type === selectedFilter;
    });
  };

  const markAsRead = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const headerActions = (
    <>
      <Button
        variant="secondary"
        className="flex items-center gap-2"
        onClick={() => setShowSettings(true)}
      >
        <Sliders className="w-4 h-4" />
        Configuración
      </Button>
      <Button
        variant="primary"
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Nueva Regla
      </Button>
    </>
  );

  const NotificationToggle = ({ icon: Icon, label, enabled, onChange }) => (
    <Panel className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700">
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
        <span>{label}</span>
      </div>
      <ToggleLeft 
        className={`w-10 h-10 cursor-pointer ${enabled ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600'}`}
        onClick={onChange}
      />
    </Panel>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Centro de Alertas"
        description="Monitorea y configura las alertas de tu sistema"
        actions={headerActions}
      />

      {/* Filters */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Todas', color: 'blue' },
          { id: 'unread', label: 'No leídas', color: 'blue' },
          { id: 'warning', label: 'Advertencias', color: 'yellow' },
          { id: 'danger', label: 'Críticas', color: 'red' },
          { id: 'info', label: 'Informativas', color: 'blue' }
        ].map(filter => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? 'primary' : 'secondary'}
            onClick={() => setSelectedFilter(filter.id)}
            className="whitespace-nowrap"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filterAlerts().map(alert => (
          <AlertCard 
            key={alert.id}
            alert={alert}
            onMarkRead={() => markAsRead(alert.id)}
            onDelete={() => deleteAlert(alert.id)}
          />
        ))}
      </div>

      {filterAlerts().length === 0 && (
        <Panel className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <SectionTitle>No hay alertas</SectionTitle>
          <SubTitle>No se encontraron alertas que coincidan con los filtros</SubTitle>
        </Panel>
      )}

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Configuración de Alertas"
      >
        {/* Canales de notificación */}
        <div className="mb-8">
          <SectionTitle className="mb-4">Canales de Notificación</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NotificationToggle
              icon={Mail}
              label="Email"
              enabled={notificationSettings.email}
              onChange={() => setNotificationSettings(prev => ({ 
                ...prev, 
                email: !prev.email 
              }))}
            />
            <NotificationToggle
              icon={BellRing}
              label="Push"
              enabled={notificationSettings.push}
              onChange={() => setNotificationSettings(prev => ({ 
                ...prev, 
                push: !prev.push 
              }))}
            />
            <NotificationToggle
              icon={MessageSquare}
              label="SMS"
              enabled={notificationSettings.sms}
              onChange={() => setNotificationSettings(prev => ({ 
                ...prev, 
                sms: !prev.sms 
              }))}
            />
          </div>
        </div>

        {/* Reglas de alertas */}
        {settings.map((section, index) => (
          <div key={index} className="mb-8">
            <SectionTitle className="mb-4">{section.category}</SectionTitle>
            <div className="space-y-4">
              {section.rules.map(rule => (
                <Panel key={rule.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {rule.name}
                    </p>
                    {rule.threshold && (
                      <SubTitle>
                        Umbral: {rule.threshold} {rule.id === 5 ? 'horas' : 'W'}
                      </SubTitle>
                    )}
                  </div>
                  <ToggleLeft 
                    className={`w-10 h-10 cursor-pointer ${
                      rule.enabled ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </Panel>
              ))}
            </div>
          </div>
        ))}
      </Modal>
    </PageContainer>
  );
};

export default AlertsPage;