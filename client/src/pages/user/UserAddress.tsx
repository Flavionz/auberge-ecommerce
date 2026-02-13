import { useContext, useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/UserLayout';
import { AuthContext } from '../../contexts/AuthContext';
import { MapPin, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';

const ELIGIBLE_POSTCODES = ['57000', '57050', '57140', '57070','57150', '57160', '57170'];

export const UserAddress = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        address: user?.address || '',
        city: user?.city || '',
        postalCode: user?.postalCode || '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isEligible, setIsEligible] = useState<boolean | null>(null);

    useEffect(() => {
        if (formData.postalCode) {
            setIsEligible(ELIGIBLE_POSTCODES.includes(formData.postalCode));
        } else {
            setIsEligible(null);
        }
    }, [formData.postalCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (!ELIGIBLE_POSTCODES.includes(formData.postalCode)) {
            setMessage({
                type: 'error',
                text: 'Ce code postal n\'est pas éligible à la livraison. Zones couvertes: 57000, 57050, 57070, 57150, 57160, 57170'
            });
            setIsLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            await axios.put(
                'http://localhost:3000/api/user/profile',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage({ type: 'success', text: 'Adresse mise à jour avec succès' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Erreur lors de la mise à jour de l\'adresse' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserLayout>
            <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-700">
                    <MapPin size={24} className="text-gold" />
                    <h2 className="text-2xl font-serif text-white">Adresse de Livraison</h2>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-300">
                            <p className="font-semibold mb-1">Zone de livraison</p>
                            <p className="text-xs">
                                Nous livrons uniquement dans un rayon de 15 km autour de Metz.
                                Codes postaux éligibles: 57000, 57050, 57070, 57140, 57150, 57160, 57170
                            </p>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg ${
                        message.type === 'success'
                            ? 'bg-green-900/20 border border-green-500 text-green-300'
                            : 'bg-red-900/20 border border-red-500 text-red-300'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                            Adresse complète *
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[#1E1B18] border border-gray-600 rounded text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                            placeholder="12 rue de la Gare"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                                Ville *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-[#1E1B18] border border-gray-600 rounded text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                                placeholder="Metz"
                            />
                        </div>

                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-2">
                                Code Postal *
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                maxLength={5}
                                className={`w-full px-4 py-3 bg-[#1E1B18] border rounded text-white placeholder-gray-500 focus:outline-none ${
                                    isEligible === true
                                        ? 'border-green-500 focus:border-green-400'
                                        : isEligible === false
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-gray-600 focus:border-gold'
                                }`}
                                placeholder="57000"
                            />
                            {isEligible === true && (
                                <p className="text-xs text-green-400 mt-1 flex items-center space-x-1">
                                    <AlertCircle size={12} />
                                    <span>✓ Zone éligible à la livraison</span>
                                </p>
                            )}
                            {isEligible === false && (
                                <p className="text-xs text-red-400 mt-1 flex items-center space-x-1">
                                    <AlertCircle size={12} />
                                    <span>✗ Zone non couverte par nos livraisons</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || isEligible === false}
                        className="flex items-center space-x-2 px-6 py-3 bg-gold text-dark font-bold rounded hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />
                        <span>{isLoading ? 'Enregistrement...' : 'Enregistrer l\'adresse'}</span>
                    </button>
                </form>
            </div>
        </UserLayout>
    );
};