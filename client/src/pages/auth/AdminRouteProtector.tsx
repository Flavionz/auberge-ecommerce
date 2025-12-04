import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface AdminRouteProtectorProps {
    children: React.ReactNode;
}

export const AdminRouteProtector: React.FC<AdminRouteProtectorProps> = ({ children }) => {
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAdmin) {
            console.log("AdminRouteProtector: Accesso negato. Redirect a /login da", location.pathname);
            navigate('/login', {
                state: { from: location.pathname },
                replace: true
            });
        } else {
            console.log("AdminRouteProtector: Accesso consentito a", location.pathname);
        }
    }, [isAdmin, navigate, location.pathname]);

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkAccent">
            <div className="text-xl text-white p-8 rounded-sm bg-dark border border-gold/50 shadow-2xl animate-pulse">
                <p className="font-serif">Verifica Autorizzazione in corso...</p>
                <div className="mt-4 w-16 h-1 bg-gold mx-auto"></div>
                <p className="text-sm text-gray-400 mt-3">Attendere prego...</p>
            </div>
        </div>
    );
};