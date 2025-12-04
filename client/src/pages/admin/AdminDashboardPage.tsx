import { AdminLayout } from '../../components/admin/AdminLayout';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

// Pagina di atterraggio per l'admin con riepilogo e statistiche
export const AdminDashboardPage = () => {

    // Dati fittizi per la dashboard
    const stats = [
        { label: 'Prodotti Totali', value: 154, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Ordini in Attesa', value: 7, icon: ShoppingCart, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Vendite Mese', value: '€ 14.500', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Nuovi Utenti', value: 3, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h2 className="text-3xl font-serif text-gray-800">Dashboard</h2>

                {/* Griglia delle Statistiche Principali */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className={`p-6 rounded-lg shadow-lg bg-white border border-gray-200`}>
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

                {/* Sezione Attività Recenti (Esempio) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Attività Recenti</h3>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-2 text-sm text-gray-600">Nuovo ordine #4589 effettuato (2 minuti fa)</li>
                        <li className="py-2 text-sm text-gray-600">Prodotto "Manchego Affiné" esaurito.</li>
                        <li className="py-2 text-sm text-gray-600">Utente 'mariana.r' si è registrato.</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
};