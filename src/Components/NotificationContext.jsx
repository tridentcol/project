import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationContext = createContext();

const initialState = {
  notifications: [],
  unreadCount: 0,
  badges: {
    devices: 0,
    alerts: 0,
    reports: 0,
  }
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
        badges: {
          ...state.badges,
          [action.payload.section]: state.badges[action.payload.section] + 1
        }
      };
    case 'MARK_AS_READ':
      const updatedNotifications = state.notifications.map(notif => 
        notif.id === action.payload ? { ...notif, read: true } : notif
      );
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: state.unreadCount - 1,
        badges: {
          ...state.badges,
          [action.section]: state.badges[action.section] - 1
        }
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: state.notifications.map(notif => ({ ...notif, read: true })),
        unreadCount: 0,
        badges: {
          devices: 0,
          alerts: 0,
          reports: 0,
        }
      };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        timestamp: new Date(),
        read: false,
        ...notification
      }
    });

    // Mostrar notificación push si el navegador lo soporta
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/path-to-your-icon.png'
      });
    }
  };

  const markAsRead = (notificationId, section) => {
    dispatch({
      type: 'MARK_AS_READ',
      payload: notificationId,
      section
    });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  // Solicitar permiso para notificaciones push
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider 
      value={{
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        badges: state.badges,
        addNotification,
        markAsRead,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};