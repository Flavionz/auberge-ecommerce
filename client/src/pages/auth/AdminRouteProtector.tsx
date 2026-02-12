import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface AdminRouteProtectorProps {
    children: React.ReactNode;
}

export const AdminRouteProtector: React.FC<AdminRouteProtectorProps> = ({ children }) => {
    const { user, isAdmin, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-darkAccent">
                <div className="text-xl text-white p-8 rounded-sm bg-dark border border-gold/50 shadow-2xl">
                    <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="font-serif text-center">Vérification de l'authentification...</p>
                    <div className="mt-4 w-16 h-1 bg-gold mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="font-serif text-3xl text-white mb-4">Accès Refusé</h1>
                    <p className="text-gray-400 mb-6">Cette zone est réservée aux administrateurs.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};