import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    // Placeholder for redirect logic:
    // - Check user role (admin vs regular user)
    // - Redirect to /admin/add-product for admin
    // - Redirect to /boutique for regular user
    console.log('Form submitted:', {
      email,
      password,
      isRegistering
    });
  };
  return <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-2 tracking-wide">
                Email
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 focus:outline-none focus:border-gold transition-colors duration-300" placeholder="votre@email.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-2 tracking-wide">
                Mot de passe
              </label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 focus:outline-none focus:border-gold transition-colors duration-300" placeholder="••••••••" required />
            </div>
            {isRegistering && <div>
                <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-2 tracking-wide">
                  Confirmer le mot de passe
                </label>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 focus:outline-none focus:border-gold transition-colors duration-300" placeholder="••••••••" required />
              </div>}
            <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-dark font-medium py-3 rounded-sm transition-colors duration-300 tracking-wider">
              {isRegistering ? 'Créer mon compte' : 'Se connecter'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-sm text-gray-400 hover:text-gold transition-colors duration-300">
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
    </div>;
};