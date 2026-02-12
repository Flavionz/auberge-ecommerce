import { AdminLayout } from '../../components/admin/AdminLayout';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

export const AdminDashboardPage = () => {
    const stats = [
        {
            label: 'Produits Totaux',
            value: 154,
            icon: Package,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            label: 'Commandes en Attente',
            value: 7,
            icon: ShoppingCart,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50'
        },
        {
            label: 'Ventes du Mois',
            value: '€ 14.500',
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            label: 'Nouveaux Clients',
            value: 3,
            icon: Users,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
    ];

    const recentActivity = [
        { id: 1, text: 'Nouvelle commande #4589 effectuée', time: '2 minutes' },
        { id: 2, text: 'Produit "Manchego Affiné" en rupture de stock', time: '1 heure' },
        { id: 3, text: 'Nouvel utilisateur mariana.r inscrit', time: '3 heures' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h2 className="text-3xl font-serif text-gray-800">Dashboard</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="p-6 rounded-lg shadow-lg bg-white border border-gray-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <p className={`text-3xl font-bold mt-1 ${stat.color}`}>
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.bg}`}>
                                        <Icon size={24} className={stat.color} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Activité Récente
                    </h3>
                    <ul className="divide-y divide-gray-200">
                        {recentActivity.map((activity) => (
                            <li key={activity.id} className="py-3 flex justify-between items-center">
                                <span className="text-sm text-gray-600">{activity.text}</span>
                                <span className="text-xs text-gray-400">Il y a {activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
};