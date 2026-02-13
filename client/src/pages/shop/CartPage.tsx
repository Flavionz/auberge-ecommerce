import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, MapPin, AlertCircle, Info } from 'lucide-react';

const ELIGIBLE_POSTCODES = ['57000', '57050', '57070', '57140', '57150', '57160', '57170'];
const DELIVERY_RADIUS_KM = 15;
const METZ_CENTER = 'Metz';

export const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [postalCode, setPostalCode] = useState('');
    const [deliveryCheckResult, setDeliveryCheckResult] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [showCheckoutError, setShowCheckoutError] = useState(false);

    const checkDeliveryZone = () => {
        if (ELIGIBLE_POSTCODES.includes(postalCode.trim())) {
            setDeliveryCheckResult('valid');
            setShowCheckoutError(false);
        } else {
            setDeliveryCheckResult('invalid');
        }
    };

    const handleCheckout = () => {
        if (!user) {
            navigate('/login', { state: { from: '/cart' } });
            return;
        }

        if (deliveryCheckResult !== 'valid') {
            setShowCheckoutError(true);
            return;
        }

        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#1E1B18] text-white pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <ShoppingBag size={80} className="mx-auto text-gray-600 mb-6" />
                    <h1 className="font-serif text-4xl text-white mb-4">Votre panier est vide</h1>
                    <p className="text-gray-400 mb-8">
                        Découvrez notre sélection de produits espagnols d'exception
                    </p>
                    <Link
                        to="/boutique"
                        className="inline-block px-8 py-3 bg-gold text-dark font-bold uppercase tracking-wider rounded-sm hover:bg-gold/90 transition-colors"
                    >
                        Voir la boutique
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1E1B18] text-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Mon Panier</h1>
                <div className="w-20 h-0.5 bg-gold mb-8"></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#2C2C2C] rounded-lg p-4 flex items-center space-x-4 border border-transparent hover:border-gold/30 transition-all"
                            >
                                <img
                                    src={item.image || 'https://placehold.co/100x100/1E1B18/Cca43b?text=Image'}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-serif text-lg text-white">{item.name}</h3>
                                    <p className="text-sm text-gray-400">{item.category}</p>
                                    <p className="text-gold font-bold mt-1">{item.price.toFixed(2)} €</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                            <div className="flex items-start space-x-3">
                                <Info size={24} className="text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-serif text-lg text-white mb-2">Livraison Locale</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        L'Auberge Espagnole est une petite entreprise artisanale. Les produits sont
                                        préparés sur commande et livrés personnellement dans un rayon de {DELIVERY_RADIUS_KM} km
                                        autour de {METZ_CENTER}.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#2C2C2C] rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center space-x-2 mb-4">
                                <MapPin size={20} className="text-gold" />
                                <h3 className="font-serif text-lg text-white">Zone de Livraison</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">
                                Vérifiez si votre code postal est éligible à la livraison
                            </p>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Ex: 57000"
                                    value={postalCode}
                                    onChange={(e) => {
                                        setPostalCode(e.target.value);
                                        setDeliveryCheckResult('idle');
                                    }}
                                    maxLength={5}
                                    className="flex-1 px-4 py-2 bg-[#1E1B18] border border-gray-600 rounded text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                                />
                                <button
                                    onClick={checkDeliveryZone}
                                    className="px-6 py-2 bg-gold text-dark font-bold rounded hover:bg-gold/90 transition-colors"
                                >
                                    Vérifier
                                </button>
                            </div>

                            {deliveryCheckResult === 'valid' && (
                                <div className="mt-4 p-3 bg-green-900/20 border border-green-500 rounded text-green-300 text-sm flex items-start space-x-2">
                                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                    <span>Parfait ! Votre zone est couverte par nos livraisons.</span>
                                </div>
                            )}

                            {deliveryCheckResult === 'invalid' && (
                                <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-300 text-sm">
                                    <p className="font-semibold mb-1">Zone non couverte</p>
                                    <p className="text-xs">
                                        Nous ne livrons actuellement que dans un rayon de {DELIVERY_RADIUS_KM} km autour de {METZ_CENTER}.
                                        Codes postaux éligibles : {ELIGIBLE_POSTCODES.join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#2C2C2C] rounded-lg p-6 border border-gray-700">
                            <h3 className="font-serif text-lg text-white mb-4">Récapitulatif</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Articles ({cartCount})</span>
                                    <span>{cartTotal.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Livraison</span>
                                    <span className="text-green-400">Gratuite</span>
                                </div>
                                <div className="border-t border-gray-700 pt-2 mt-2"></div>
                                <div className="flex justify-between text-white font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-gold">{cartTotal.toFixed(2)} €</span>
                                </div>
                            </div>

                            {!user && (
                                <div className="mt-6 space-y-4">
                                    <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                                        <p className="text-sm text-gray-300 mb-3 font-semibold">
                                            Déjà client ?
                                        </p>
                                        <Link
                                            to="/login"
                                            state={{ from: '/cart' }}
                                            className="block w-full py-2.5 bg-gold text-dark text-center font-bold rounded hover:bg-gold/90 transition-colors"
                                        >
                                            Se connecter
                                        </Link>
                                    </div>

                                    <div className="p-4 bg-blue-900/20 rounded border border-blue-500/30">
                                        <p className="text-sm text-blue-300 mb-3 font-semibold">
                                            Nouveau client ?
                                        </p>
                                        <Link
                                            to="/login"
                                            state={{ from: '/cart' }}
                                            className="block w-full py-2.5 bg-transparent border-2 border-blue-400 text-blue-300 text-center font-bold rounded hover:bg-blue-900/30 transition-colors"
                                        >
                                            Créer un compte
                                        </Link>
                                        <p className="text-xs text-blue-400 mt-3 text-center">
                                            Inscription gratuite et rapide
                                        </p>
                                    </div>
                                </div>
                            )}

                            {user && (
                                <>
                                    {showCheckoutError && deliveryCheckResult !== 'valid' && (
                                        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-300 text-sm">
                                            <p className="font-semibold mb-1">Vérification requise</p>
                                            <p className="text-xs">
                                                Veuillez vérifier votre code postal avant de continuer.
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full mt-6 py-3 bg-gold text-dark font-bold uppercase tracking-wider rounded hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={deliveryCheckResult !== 'valid'}
                                    >
                                        Finaliser la Commande
                                    </button>

                                    {deliveryCheckResult !== 'valid' && (
                                        <p className="text-xs text-gray-500 text-center mt-2">
                                            Vérifiez votre code postal pour continuer
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};