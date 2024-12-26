import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationContext';

// Simulación de cargas detectadas - En producción esto vendría de tu API
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

const AppNotifications = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las cargas ya notificadas del localStorage
    const notifiedLoadsStr = localStorage.getItem('notifiedLoads');
    const notifiedLoads = notifiedLoadsStr ? new Set(JSON.parse(notifiedLoadsStr)) : new Set();

    // Notificar solo las cargas nuevas
    unidentifiedLoads.forEach(load => {
      if (!notifiedLoads.has(load.id)) {
        addNotification({
          title: 'Nueva carga detectada',
          message: 'Se ha detectado una nueva carga sin identificar. Haz clic en el botón para registrarla.',
          section: 'devices',
          actions: [
            {
              label: 'Registrar dispositivo',
              onClick: () => {
                localStorage.setItem('pendingLoadId', load.id);
                navigate('/devices');
              },
              primary: true
            }
          ]
        });

        // Añadir la carga al conjunto de notificadas
        notifiedLoads.add(load.id);
      }
    });

    // Guardar el conjunto actualizado en localStorage
    localStorage.setItem('notifiedLoads', JSON.stringify([...notifiedLoads]));
  }, []); // Solo se ejecuta una vez al montar el componente

  return null; // Este componente no renderiza nada
};

export default AppNotifications;