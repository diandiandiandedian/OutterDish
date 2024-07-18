import React, { useEffect } from 'react';

interface NotificationProps {
    type: 'success' | 'error';
    message: string;
    duration: number; // 新增的属性，用于设置通知显示的持续时间
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, duration, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration); // 根据传入的持续时间设置定时器
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white text-[16px]`}>
            <div>{message}</div>
        </div>
    );
};

export default Notification;
