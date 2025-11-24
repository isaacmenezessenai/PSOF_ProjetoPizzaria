"use client"

import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '@/services/api'; 
import { toast } from 'sonner';

interface HelpRequest {
    id: string;
    table: number;
    created_at?: string;
}

interface NotificationContextData {
    notifications: HelpRequest[];
    isOpen: boolean;
    toggleModal: () => void;
    finishHelpRequest: (id: string) => Promise<void>;
    fetchNotifications: () => Promise<void>;
}

export const NotificationContext = createContext({} as NotificationContextData);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<HelpRequest[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    async function fetchNotifications() {
        try {
            const response = await api.get('/order/help'); 
            setNotifications(response.data);
        } catch (err) {
            console.log("Erro ao buscar notificações de ajuda", err);
        }
    }

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    async function finishHelpRequest(id: string) {
        try {
            await api.put('/order/help/finish', { help_id: id }); 
            toast.success("Solicitação atendida!");
            setNotifications(old => old.filter(item => item.id !== id));
            if (notifications.length <= 1) {
                setIsOpen(false);
            }
        } catch (err) {
            toast.error("Erro ao concluir solicitação.");
            console.log(err);
        }
    }

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            isOpen, 
            toggleModal, 
            finishHelpRequest,
            fetchNotifications 
        }}>
            {children}
        </NotificationContext.Provider>
    )
}