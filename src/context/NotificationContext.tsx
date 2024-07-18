import React, { createContext, useState, ReactNode, useContext } from 'react';
import Notification from '../components/Notification';

interface NotificationContextProps {
    showSuccess: (message: string, duration?: number) => void;
    showError: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string; duration: number } | null>(null);

    const showSuccess = (message: string, duration: number = 3000) => setNotification({ type: 'success', message, duration });
    const showError = (message: string, duration: number = 3000) => setNotification({ type: 'error', message, duration });

    const handleClose = () => setNotification(null);

    return (
        <NotificationContext.Provider value={{ showSuccess, showError }}>
            {children}
            {notification && (
                <Notification type={notification.type} message={notification.message} duration={notification.duration} onClose={handleClose} />
            )}
        </NotificationContext.Provider>
    );
};
