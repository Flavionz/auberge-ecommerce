import { useContext } from 'react';
import { UserLayout } from '../../components/user/UserLayout';
import { AuthContext } from '../../contexts/AuthContext';
import { Package, MapPin, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    const stats = [
        { label: 'Commandes', value: 0, icon: Package, color: 'text-blue-500', link: '/account/orders' },
        { label: 'Adresse', value: user?.postalCode ? 'Configurée' : 'À définir', icon: MapPin, color: 'text-green-500', link: '/account/address' },
    ];

    return (
        <UserLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-serif text-white mb-2">Bienvenue, {user?.email?.split('@')[0]} !</h2>
                    <p className="text-gray-400">Gérez votre compte et vos commandes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Link
                                key={stat.label}
                                to={stat.link}
                                className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gold/30 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                        <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                                    </div>
                                    <Icon size={32} className={stat.color} />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <ShoppingBag size={24} className="text-blue-400 flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg text-white mb-2">Commencer vos achats</h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Découvrez notre sélection de produits espagnols artisanaux
                            </p>
                            <Link
                                to="/boutique"
                                className="inline-block px-6 py-2 bg-gold text-dark font-bold rounded hover:bg-gold/90 transition-colors"
                            >
                                Voir la boutique
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};