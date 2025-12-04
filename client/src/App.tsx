import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthContext } from './contexts/AuthContext';

export const FrontendLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-dark text-white">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export function App() {
    const [isAdmin, setIsAdminState] = useState(() => {
        const stored = localStorage.getItem('isAdmin');
        return stored === 'true';
    });

    const setIsAdmin = (value: boolean) => {
        localStorage.setItem('isAdmin', String(value));
        setIsAdminState(value);
    };

    const logout = () => {
        localStorage.removeItem('isAdmin');
        setIsAdminState(false);
    };

    useEffect(() => {
        console.log('App: isAdmin =', isAdmin);
    }, [isAdmin]);

    return (
        <AuthContext.Provider value={{ isAdmin, setIsAdmin, logout }}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}