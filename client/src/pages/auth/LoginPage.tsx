import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [shouldRedirectToAdmin, setShouldRedirectToAdmin] = useState(false);

  const from = location.state?.from || '/boutique';

  useEffect(() => {
    if (shouldRedirectToAdmin && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [shouldRedirectToAdmin, isAdmin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
      setError("Registrazione simulata. Per ora usa 'admin' o 'user'.");
      return;
    }

    if (email === 'admin@auberge.com' && password === 'admin') {
      setIsAdmin(true);
      setShouldRedirectToAdmin(true);

    } else if (email === 'user@auberge.com' && password === 'user') {
      setIsAdmin(false);
      navigate(from, { replace: true });
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect. Utilisez 'admin@auberge.com/admin' per l'admin.");
      setIsAdmin(false);
    }
  };

  return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 w-full max-w-md">
          <Link to="/" className="block text-center mb-8">
            <h1 className="font-serif text-3xl text-white mb-2">
              Auberge Espagnol
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </Link>
          <div className="bg-darkAccent border border-gold/30 rounded-sm p-8 shadow-2xl">
            <h2 className="font-serif text-2xl text-white mb-2 text-center">
              {isRegistering ? 'Créer un compte' : 'Connexion'}
            </h2>
            <p className="text-gray-400 text-sm text-center mb-8">
              {isRegistering ? 'Rejoignez notre communauté de gourmets' : 'Accédez à votre espace personnel'}
            </p>

            {error && (
                <div className="text-sm p-3 mb-4 rounded bg-red-800/20 border border-red-500 text-red-300 text-center">
                  {error}
                </div>
            )}

            {shouldRedirectToAdmin && (
                <div className="text-sm p-3 mb-4 rounded bg-gold/20 border border-gold text-gold text-center flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Connexion Admin en cours...</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-2 tracking-wide">
                  Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder={isRegistering ? 'votre@email.com' : 'admin@auberge.com'}
                    required
                    disabled={shouldRedirectToAdmin}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm text-gray-300 mb-2 tracking-wide">
                  Mot de passe
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder={isRegistering ? '••••••••' : 'admin'}
                    required
                    disabled={shouldRedirectToAdmin}
                />
              </div>
              {isRegistering && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-2 tracking-wide">
                      Confirmer le mot de passe
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 focus:outline-none focus:border-gold transition-colors duration-300"
                        placeholder="••••••••"
                        required
                        disabled={shouldRedirectToAdmin}
                    />
                  </div>
              )}
              <button
                  type="submit"
                  disabled={shouldRedirectToAdmin}
                  className="w-full bg-gold hover:bg-gold/90 text-dark font-medium py-3 rounded-sm transition-colors duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegistering ? 'Créer mon compte' : (shouldRedirectToAdmin ? 'Connexion...' : 'Se connecter')}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                  }}
                  className="text-sm text-gray-400 hover:text-gold transition-colors duration-300"
                  disabled={shouldRedirectToAdmin}
              >
                {isRegistering ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? Créer un compte'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};