import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config/api';

export const VerifyEmailPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }

        axios.post(`${API_URL}/auth/verify-email`, { token })
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'));
    }, [token]);

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
            <div className="relative z-10 w-full max-w-md text-center">
                <Link to="/" className="block mb-8">
                    <h1 className="font-serif text-3xl text-white mb-2">Casa Steph Iberico</h1>
                    <div className="w-16 h-0.5 bg-gold mx-auto"></div>
                </Link>

                <div className="bg-darkAccent border border-gold/30 rounded-sm p-10 shadow-2xl">
                    {status === 'loading' && (
                        <>
                            <div className="flex justify-center mb-6">
                                <Loader size={40} className="text-gold animate-spin" />
                            </div>
                            <p className="text-gray-400">Vérification en cours...</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle size={36} className="text-emerald-400" />
                                </div>
                            </div>
                            <h2 className="font-serif text-2xl text-white mb-3">Email confirmé !</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Votre adresse email a été vérifiée avec succès.
                                Vous pouvez maintenant vous connecter et accéder à votre espace personnel.
                            </p>
                            <Link
                                to="/login?verified=true"
                                className="inline-block bg-gold hover:bg-gold/90 text-dark font-medium px-8 py-3 rounded-sm transition-colors tracking-wider"
                            >
                                Se connecter
                            </Link>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                                    <XCircle size={36} className="text-red-400" />
                                </div>
                            </div>
                            <h2 className="font-serif text-2xl text-white mb-3">Lien invalide</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Ce lien de vérification est invalide ou a expiré (validité 24h).
                                Connectez-vous pour demander un nouveau lien.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-gold hover:bg-gold/90 text-dark font-medium px-8 py-3 rounded-sm transition-colors tracking-wider"
                            >
                                Retour à la connexion
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
