import React, { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  Shield,
  Wifi,
  Database,
  Save,
  RefreshCw
} from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Panel,
  Button,
  Input,
  Select,
  SubTitle
} from './CommonComponents';

const initialSettings = {
  general: {
    language: 'es',
    theme: 'light',
    notifications: true,
    autoSync: true,
    syncInterval: '30'
  },
  user: {
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
    phone: '+57 300 123 4567'
  },
  network: {
    deviceName: 'Monitor-Principal',
    ipAddress: '192.168.1.100',
    subnet: '255.255.255.0',
    gateway: '192.168.1.1'
  },
  security: {
    twoFactor: false,
    passwordExpiry: '90',
    lastPasswordChange: '2024-02-15'
  },
  limits: {
    maxPower: '4000',
    alertThreshold: '3500',
    dailyBudget: '50000'
  }
};

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'user', label: 'Perfil', icon: User },
  { id: 'network', label: 'Red', icon: Wifi },
  { id: 'security', label: 'Seguridad', icon: Shield },
  { id: 'limits', label: 'Límites', icon: Database },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(initialSettings);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const TabButton = ({ tab }) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;

    return (
      <Button
        variant={isActive ? 'primary' : 'secondary'}
        className="w-full justify-start"
        onClick={() => setActiveTab(tab.id)}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span>{tab.label}</span>
      </Button>
    );
  };

  const SettingCard = ({ title, children }) => (
    <Panel className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      {children}
    </Panel>
  );

  const Toggle = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">{label}</label>
        {description && <SubTitle>{description}</SubTitle>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
      </label>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Preferencias">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Idioma
            </label>
            <Select
              value={settings.general.language}
              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tema
            </label>
            <Select
              value={settings.general.theme}
              onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="system">Sistema</option>
            </Select>
          </div>
          <Toggle
            checked={settings.general.notifications}
            onChange={(e) => handleSettingChange('general', 'notifications', e.target.checked)}
            label="Notificaciones"
            description="Recibir alertas y notificaciones"
          />
        </div>
      </SettingCard>

      <SettingCard title="Sincronización">
        <div className="space-y-4">
          <Toggle
            checked={settings.general.autoSync}
            onChange={(e) => handleSettingChange('general', 'autoSync', e.target.checked)}
            label="Sincronización automática"
            description="Actualizar datos automáticamente"
          />
          {settings.general.autoSync && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intervalo de sincronización (minutos)
              </label>
              <Select
                value={settings.general.syncInterval}
                onChange={(e) => handleSettingChange('general', 'syncInterval', e.target.value)}
              >
                <option value="5">5 minutos</option>
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
              </Select>
            </div>
          )}
        </div>
      </SettingCard>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Información Personal">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre completo
            </label>
            <Input
              type="text"
              value={settings.user.name}
              onChange={(e) => handleSettingChange('user', 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Correo electrónico
            </label>
            <Input
              type="email"
              value={settings.user.email}
              onChange={(e) => handleSettingChange('user', 'email', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Teléfono
            </label>
            <Input
              type="tel"
              value={settings.user.phone}
              onChange={(e) => handleSettingChange('user', 'phone', e.target.value)}
            />
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderNetworkSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Configuración de Red">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre del dispositivo
            </label>
            <Input
              type="text"
              value={settings.network.deviceName}
              onChange={(e) => handleSettingChange('network', 'deviceName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección IP
            </label>
            <Input
              type="text"
              value={settings.network.ipAddress}
              onChange={(e) => handleSettingChange('network', 'ipAddress', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Máscara de subred
            </label>
            <Input
              type="text"
              value={settings.network.subnet}
              onChange={(e) => handleSettingChange('network', 'subnet', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Puerta de enlace
            </label>
            <Input
              type="text"
              value={settings.network.gateway}
              onChange={(e) => handleSettingChange('network', 'gateway', e.target.value)}
            />
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <SettingCard title="Seguridad y Acceso">
        <div className="space-y-4">
          <Toggle
            checked={settings.security.twoFactor}
            onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
            label="Autenticación de dos factores"
            description="Aumenta la seguridad de tu cuenta"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expiración de contraseña (días)
            </label>
            <Select
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
            >
              <option value="30">30 días</option>
              <option value="60">60 días</option>
              <option value="90">90 días</option>
              <option value="180">180 días</option>
            </Select>
          </div>
          <div>
            <Button variant="primary">
              Cambiar contraseña
            </Button>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderLimitsSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Límites y Alertas">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Potencia máxima (W)
            </label>
            <Input
              type="number"
              value={settings.limits.maxPower}
              onChange={(e) => handleSettingChange('limits', 'maxPower', e.target.value)}
            />
            <SubTitle className="mt-1">
              El sistema se apagará si se supera este límite
            </SubTitle>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Umbral de alerta (W)
            </label>
            <Input
              type="number"
              value={settings.limits.alertThreshold}
              onChange={(e) => handleSettingChange('limits', 'alertThreshold', e.target.value)}
            />
            <SubTitle className="mt-1">
              Recibirás una alerta cuando se supere este umbral
            </SubTitle>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Presupuesto diario (COP)
            </label>
            <Input
              type="number"
              value={settings.limits.dailyBudget}
              onChange={(e) => handleSettingChange('limits', 'dailyBudget', e.target.value)}
            />
            <SubTitle className="mt-1">
              Recibirás alertas cuando el costo diario se acerque a este límite
            </SubTitle>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Respaldo y Restauración">
        <div className="space-y-4">
          <Panel className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">Respaldo de configuración</h4>
              <SubTitle>Guarda una copia de seguridad de tus ajustes</SubTitle>
            </div>
            <Button variant="primary" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Respaldar
            </Button>
          </Panel>
          <Panel className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">Restaurar configuración</h4>
              <SubTitle>Restaura desde una copia de seguridad</SubTitle>
            </div>
            <Button variant="primary" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Restaurar
            </Button>
          </Panel>
        </div>
      </SettingCard>
    </div>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Configuración"
        description="Administra las preferencias y configuración del sistema"
      />

      <div className="flex gap-6">
        {/* Sidebar */}
        <Panel className="w-64 shrink-0 p-4">
          <div className="space-y-2">
            {tabs.map(tab => (
              <TabButton key={tab.id} tab={tab} />
            ))}
          </div>
        </Panel>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'user' && renderUserSettings()}
          {activeTab === 'network' && renderNetworkSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'limits' && renderLimitsSettings()}
        </div>
      </div>

      {/* Footer with actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-end gap-4">
          <Button variant="secondary">
            Cancelar
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar cambios
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;