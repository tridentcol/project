import React, { useState } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useNotifications } from './NotificationContext';
import { Button } from './CommonComponents';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, clearAll, markAsRead } = useNotifications();

  const formatTimestamp = (timestamp) => {
    return new Intl.RelativeTimeFormat('es', { numeric: 'auto' }).format(
      Math.floor((timestamp - new Date()) / (1000 * 60)), 
      'minutes'
    );
  };

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                 dark:text-gray-300 transition-colors relative"
        aria-label="Centro de notificaciones"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                         rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 
                      rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold dark:text-white">Notificaciones</h2>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-blue-500 hover:text-blue-600 
                           dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Marcar todo como leído
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 
                         dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No hay notificaciones
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b dark:border-gray-700 last:border-0 
                            ${notification.read ? 'bg-gray-50 dark:bg-gray-800' : 
                            'bg-blue-50 dark:bg-gray-700'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium dark:text-white">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id, notification.section)}
                        className="text-blue-500 hover:text-blue-600 
                                 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {notification.message}
                  </p>
                  {notification.actions && notification.actions.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {notification.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={action.primary ? "primary" : "secondary"}
                          onClick={() => {
                            action.onClick();
                            setIsOpen(false);
                          }}
                          className="text-sm py-1"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;