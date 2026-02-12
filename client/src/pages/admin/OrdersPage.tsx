import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { Package, Clock, CheckCircle, XCircle, Euro } from 'lucide-react';

const mockOrders = [
    {
        id: 4589,
        customer: 'marie.dupont@gmail.com',
        date: '2025-02-12',
        status: 'pending',
        total: 127.40,
        items: 3
    },
    {
        id: 4588,
        customer: 'sophie.bernard@outlook.com',
        date: '2025-02-11',
        status: 'completed',
        total: 89.90,
        items: 1
    },
    {
        id: 4587,
        customer: 'jean.martin@yahoo.fr',
        date: '2025-02-10',
        status: 'completed',
        total: 254.30,
        items: 5
    },
    {
        id: 4586,
        customer: 'sophie.bernard@outlook.com',
        date: '2025-02-09',
        status: 'cancelled',
        total: 45.50,
        items: 2
    },
    {
        id: 4585,
        customer: 'marie.dupont@gmail.com',
        date: '2025-02-08',
        status: 'completed',
        total: 156.80,
        items: 4
    },
];

export const OrdersPage = () => {
    const stats = [
        {
            label: 'Commandes Totales',
            value: mockOrders.length,
            icon: Package,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            label: 'En Attente',
            value: mockOrders.filter(o => o.status === 'pending').length,
            icon: Clock,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50'
        },
        {
            label: 'Complétées',
            value: mockOrders.filter(o => o.status === 'completed').length,
            icon: CheckCircle,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-800',
                    label: 'En attente',
                    icon: Clock
                };
            case 'completed':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-800',
                    label: 'Complétée',
                    icon: CheckCircle
                };
            case 'cancelled':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-800',
                    label: 'Annulée',
                    icon: XCircle
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-800',
                    label: status,
                    icon: Package
                };
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-800">Gestion des Commandes</h2>
                        <p className="text-sm text-gray-500 mt-1">Suivi et gestion des commandes clients</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="p-6 rounded-lg shadow-lg bg-white border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.bg}`}>
                                        <Icon size={24} className={stat.color} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-xl overflow-x-auto border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Commande
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Articles
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {mockOrders.map((order) => {
                            const statusBadge = getStatusBadge(order.status);
                            const StatusIcon = statusBadge.icon;

                            return (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.items}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        <div className="flex items-center space-x-1">
                                            <Euro size={14} className="text-gray-400" />
                                            <span>{order.total.toFixed(2)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 inline-flex items-center space-x-1 text-xs leading-5 font-semibold rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                        <StatusIcon size={12} />
                        <span>{statusBadge.label}</span>
                      </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};