import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      id,
      message,
      type,
      isVisible: true,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      hideNotification(id);
    }, 3000);
  };

  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};