import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, ShoppingBag } from 'lucide-react';

interface CartConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        price: number;
        image: string | null;
    } | null;
}

export const CartConfirmationModal: React.FC<CartConfirmationModalProps> = ({ isOpen, onClose, product }) => {
    if (!isOpen || !product) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
                onClick={onClose}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-[#2C2C2C] rounded-lg p-6 max-w-md w-full border border-gold/30 shadow-2xl pointer-events-auto animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                <ShoppingCart size={20} className="text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-serif text-white">Produit ajouté !</h3>
                                <p className="text-xs text-gray-400">Votre panier a été mis à jour</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-[#1E1B18] rounded-lg mb-6">
                        <img
                            src={product.image || 'https://placehold.co/80x80/1E1B18/Cca43b?text=Image'}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                            <p className="text-white font-medium mb-1">{product.name}</p>
                            <p className="text-gold font-bold text-lg">{product.price.toFixed(2)} €</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors"
                        >
                            <ShoppingBag size={18} />
                            <span className="text-sm font-medium">Continuer mes achats</span>
                        </button>
                        <Link
                            to="/cart"
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-dark rounded hover:bg-gold/90 transition-colors"
                        >
                            <ShoppingCart size={18} />
                            <span className="text-sm font-bold">Voir mon panier</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};