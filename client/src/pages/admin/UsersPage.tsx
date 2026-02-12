import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { Shield, User, Mail, Calendar } from 'lucide-react';

const mockUsers = [
    {
        id: 1,
        email: 'admin@auberge.com',
        role: 'admin',
        createdAt: '2025-01-15',
        ordersCount: 0
    },
    {
        id: 2,
        email: 'marie.dupont@gmail.com',
        role: 'user',
        createdAt: '2025-02-01',
        ordersCount: 3
    },
    {
        id: 3,
        email: 'jean.martin@yahoo.fr',
        role: 'user',
        createdAt: '2025-02-05',
        ordersCount: 1
    },
    {
        id: 4,
        email: 'sophie.bernard@outlook.com',
        role: 'user',
        createdAt: '2025-02-08',
        ordersCount: 5
    },
    {
        id: 5,
        email: 'lucas.petit@gmail.com',
        role: 'user',
        createdAt: '2025-02-10',
        ordersCount: 0
    },
];

export const UsersPage = () => {
    const stats = [
        { label: 'Total Utilisateurs', value: mockUsers.length, icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Administrateurs', value: mockUsers.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Clients Actifs', value: mockUsers.filter(u => u.ordersCount > 0).length, icon: Mail, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-800">Gestion des Utilisateurs</h2>
                        <p className="text-sm text-gray-500 mt-1">Liste complète des utilisateurs enregistrés</p>
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
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rôle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date d'inscription
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Commandes
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center space-x-2">
                                        <Mail size={16} className="text-gray-400" />
                                        <span>{user.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? (
                          <span className="flex items-center space-x-1">
                          <Shield size={12} />
                          <span>Admin</span>
                        </span>
                      ) : (
                          <span className="flex items-center space-x-1">
                          <User size={12} />
                          <span>Client</span>
                        </span>
                      )}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`font-semibold ${user.ordersCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {user.ordersCount}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};