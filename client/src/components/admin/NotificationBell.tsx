import { useState, useEffect, useRef, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/api';

interface NotificationOrder {
    id: number;
    total: number;
    createdAt: string;
    user: {
        firstName: string | null;
        lastName: string | null;
        email: string;
    };
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${Math.floor(hours / 24)}j`;
}

export const NotificationBell: React.FC = () => {
    const [count, setCount] = useState(0);
    const [orders, setOrders] = useState<NotificationOrder[]>([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_URL}/orders/admin/notifications`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setCount(data.count);
            setOrders(data.orders);
        } catch {
            // silent — don't break the UI if notifications fail
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOpen = async () => {
        setOpen(prev => !prev);
        if (!open && count > 0) {
            try {
                await axios.post(`${API_URL}/orders/admin/notifications/mark-seen`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setCount(0);
            } catch {
                // silent
            }
        }
    };

    const handleOrderClick = () => {
        setOpen(false);
        navigate('/admin/orders');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleOpen}
                className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Notifications"
            >
                <Bell size={22} />
                {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                        {count > 9 ? '9+' : count}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 text-sm">Nouvelles commandes</span>
                        {orders.length > 0 && (
                            <span className="text-xs text-gray-400">{orders.length} non vue{orders.length > 1 ? 's' : ''}</span>
                        )}
                    </div>

                    {orders.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-400 text-sm">
                            Aucune nouvelle commande
                        </div>
                    ) : (
                        <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                            {orders.map(order => {
                                const name = [order.user.firstName, order.user.lastName].filter(Boolean).join(' ') || order.user.email;
                                return (
                                    <li key={order.id}>
                                        <button
                                            onClick={handleOrderClick}
                                            className="w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-sm text-gray-800">
                                                    AE-{order.id.toString().padStart(6, '0')}
                                                </span>
                                                <span className="font-semibold text-sm text-amber-700">
                                                    {order.total.toFixed(2)} €
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 truncate max-w-[180px]">{name}</span>
                                                <span className="text-xs text-gray-400 shrink-0 ml-2">{timeAgo(order.createdAt)}</span>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="border-t border-gray-100 px-4 py-2">
                        <button
                            onClick={() => { setOpen(false); navigate('/admin/orders'); }}
                            className="w-full text-center text-xs text-amber-700 hover:text-amber-900 font-medium py-1 transition-colors"
                        >
                            Voir toutes les commandes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
