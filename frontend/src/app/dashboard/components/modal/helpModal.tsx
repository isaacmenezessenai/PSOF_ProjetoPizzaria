"use client"

import { X, CheckCircle } from 'lucide-react';
import { useContext } from 'react';
import { NotificationContext } from '@/providers/notification';

export function HelpModal() {
    const { toggleModal, notifications, finishHelpRequest } = useContext(NotificationContext);

    const overlayStyle = {
        position: 'fixed' as 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const contentStyle = {
        backgroundColor: '#fff', 
        width: '90%',
        maxWidth: '600px',
        padding: '2rem',
        borderRadius: '8px',
        position: 'relative' as 'relative'
    };

    return (
        <div style={overlayStyle}>
            <section style={contentStyle}>
                <button 
                    onClick={toggleModal}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 0, cursor: 'pointer' }}
                >
                    <X size={40} color="#FF3F4B" />
                </button>

                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem', color: '#101026' }}>Solicitações de Ajuda</h2>
                    
                    {notifications.length === 0 ? (
                        <span style={{ color: '#101026' }}>Nenhuma solicitação no momento.</span>
                    ) : (
                        /* AQUI ESTÁ A CORREÇÃO: Usamos (table: any) para o TypeScript aceitar o .number */
                        notifications.map((table: any) => (
                            <section key={table.id} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                marginBottom: '1rem',
                                padding: '1rem',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '4px'
                            }}>
                                <span style={{ fontSize: '1.2rem', color: '#101026' }}>
                                    Mesa {table.number} solicitou presença.
                                </span>
                                <button 
                                    onClick={() => finishHelpRequest(table.id)}
                                    style={{ 
                                        backgroundColor: '#3fffa3', 
                                        border: 0, 
                                        padding: '8px 16px', 
                                        borderRadius: '4px', 
                                        color: '#101026', 
                                        fontWeight: 'bold', 
                                        cursor: 'pointer', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 8 
                                    }}
                                >
                                    <CheckCircle size={20} />
                                    Concluir
                                </button>
                            </section>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}