import React, { useState, useEffect } from 'react';
import { Search, Plus, Users, Package } from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  SearchInput,
  Select,
  DeviceCard,
  Panel,
  Button,
  Modal,
  Input,
  SectionTitle,
} from './CommonComponents';
import { useNotifications } from './NotificationContext';
import { useNavigate } from 'react-router-dom';

// Simulación de cargas detectadas
const unidentifiedLoads = [
  {
    id: 'unid-1',
    detectedAt: new Date().toISOString(),
    metrics: {
      "Potencia": "750W",
      "Corriente": "6.82A",
      "Voltaje": "110V",
      "Tiempo de uso": "1.5 horas"
    }
  },
  {
    id: 'unid-2',
    detectedAt: new Date().toISOString(),
    metrics: {
      "Potencia": "1200W",
      "Corriente": "10.91A",
      "Voltaje": "110V",
      "Tiempo de uso": "0.5 horas"
    }
  }
];

const DevicesPage = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isNewDeviceModalOpen, setIsNewDeviceModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [notifiedLoads, setNotifiedLoads] = useState(new Set());
  const { addNotification } = useNotifications();

  // Estados para el formulario de nuevo dispositivo
  const [newDevice, setNewDevice] = useState({
    name: '',
    groupId: '',
    description: '',
    loadId: '',
  });

  // Estado para el formulario de nuevo grupo
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
  });

  // Verificar si hay una carga pendiente al cargar la página
  useEffect(() => {
    const pendingLoadId = localStorage.getItem('pendingLoadId');
    if (pendingLoadId) {
      setNewDevice(prev => ({ ...prev, loadId: pendingLoadId }));
      setIsNewDeviceModalOpen(true);
      localStorage.removeItem('pendingLoadId');
    }
  }, []);

  // Este useEffect solo maneja la apertura del modal cuando hay una carga pendiente
  useEffect(() => {
    const pendingLoadId = localStorage.getItem('pendingLoadId');
    if (pendingLoadId) {
      setNewDevice(prev => ({ ...prev, loadId: pendingLoadId }));
      setIsNewDeviceModalOpen(true);
      localStorage.removeItem('pendingLoadId');
    }
  }, []);

  const handleCreateGroup = () => {
    const group = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      devices: [],
    };
    setGroups([...groups, group]);
    setNewGroup({ name: '', description: '' });
    setIsNewGroupModalOpen(false);
    
    addNotification({
      title: 'Grupo creado',
      message: `Se ha creado el grupo "${group.name}" exitosamente`,
      section: 'devices'
    });
  };

  const handleCreateDevice = () => {
    const selectedLoad = unidentifiedLoads.find(load => load.id === newDevice.loadId);
    const device = {
      id: Date.now().toString(),
      name: newDevice.name,
      groupId: newDevice.groupId,
      description: newDevice.description,
      icon: '🔌',
      status: true,
      metrics: selectedLoad ? selectedLoad.metrics : {},
    };

    setDevices([...devices, device]);

    // Actualizar el grupo si se seleccionó uno
    if (newDevice.groupId) {
      setGroups(groups.map(group =>
        group.id === newDevice.groupId
          ? { ...group, devices: [...group.devices, device.id] }
          : group
      ));
    }

    setNewDevice({ name: '', groupId: '', description: '', loadId: '' });
    setIsNewDeviceModalOpen(false);
    
    addNotification({
      title: 'Dispositivo registrado',
      message: `Se ha registrado el dispositivo "${device.name}" exitosamente`,
      section: 'devices'
    });
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true :
                         filterStatus === 'active' ? device.status :
                         !device.status;
    return matchesSearch && matchesStatus;
  });

  // Función auxiliar para formatear las métricas de carga
  const formatLoadMetrics = (metrics) => {
    return Object.entries(metrics)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ');
  };

  return (
    <PageContainer>
      <PageHeader
        title="Gestión de Dispositivos"
        description="Monitorea y controla todos tus dispositivos conectados"
      />

      {/* Header Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <SearchInput
          icon={Search}
          placeholder="Buscar dispositivo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-48"
        >
          <option value="all">Todos los dispositivos</option>
          <option value="active">Dispositivos activos</option>
          <option value="inactive">Dispositivos inactivos</option>
        </Select>
        <Button
          variant="primary"
          onClick={() => {
            setNewDevice({ name: '', groupId: '', description: '', loadId: '' });
            setIsNewDeviceModalOpen(true);
          }}
        >
          Nuevo Dispositivo
        </Button>
        <Button
          variant="secondary"
          onClick={() => setIsNewGroupModalOpen(true)}
        >
          Nuevo Grupo
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de Dispositivos */}
        <Panel>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-blue-500" />
            <SectionTitle className="!mb-0">Dispositivos Registrados</SectionTitle>
          </div>
          <div className="space-y-4">
            {filteredDevices.length > 0 ? (
              filteredDevices.map(device => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onClick={() => console.log('Device clicked:', device.id)}
                  className="!shadow-none border border-gray-200 dark:border-gray-700"
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No hay dispositivos registrados
              </p>
            )}
          </div>
        </Panel>

        {/* Sección de Grupos */}
        <Panel>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-500" />
            <SectionTitle className="!mb-0">Grupos Creados</SectionTitle>
          </div>
          <div className="space-y-4">
            {groups.length > 0 ? (
              groups.map(group => (
                <div
                  key={group.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {group.name}
                  </h3>
                  {group.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {group.description}
                    </p>
                  )}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {group.devices.length} dispositivo(s)
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No hay grupos creados
              </p>
            )}
          </div>
        </Panel>
      </div>

      {/* Modal para nuevo dispositivo */}
      <Modal
        isOpen={isNewDeviceModalOpen}
        onClose={() => setIsNewDeviceModalOpen(false)}
        title="Registrar nuevo dispositivo"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Seleccionar carga detectada
            </label>
            <Select
              value={newDevice.loadId}
              onChange={(e) => setNewDevice({ ...newDevice, loadId: e.target.value })}
              className="w-full"
            >
              <option value="">Seleccionar carga</option>
              {unidentifiedLoads.map(load => (
                <option key={load.id} value={load.id}>
                  {formatLoadMetrics(load.metrics)}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del dispositivo
            </label>
            <Input
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
              placeholder="Ej: Aire acondicionado sala"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grupo
            </label>
            <div className="flex gap-2">
              <Select
                value={newDevice.groupId}
                onChange={(e) => setNewDevice({ ...newDevice, groupId: e.target.value })}
                className="flex-1"
              >
                <option value="">Seleccionar grupo</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </Select>
              <Button
                variant="secondary"
                onClick={() => setIsNewGroupModalOpen(true)}
              >
                Nuevo grupo
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <Input
              value={newDevice.description}
              onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
              placeholder="Descripción opcional"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsNewDeviceModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateDevice}
              disabled={!newDevice.name || !newDevice.loadId}
            >
              Guardar dispositivo
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal para nuevo grupo */}
      <Modal
        isOpen={isNewGroupModalOpen}
        onClose={() => setIsNewGroupModalOpen(false)}
        title="Crear nuevo grupo"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del grupo
            </label>
            <Input
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              placeholder="Ej: Sala de estar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <Input
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              placeholder="Descripción opcional"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsNewGroupModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateGroup}
              disabled={!newGroup.name}
            >
              Crear grupo
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default DevicesPage;