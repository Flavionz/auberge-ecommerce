import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

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
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <AppRouter />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}