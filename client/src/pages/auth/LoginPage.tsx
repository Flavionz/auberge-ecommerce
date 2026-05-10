import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';

export const LoginPage: React.FC = () => {
  const { user, isAdmin, login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Post-register "check your email" state
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  // Resend verification
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const from = location.state?.from || '/boutique';
  const justVerified = new URLSearchParams(location.search).get('verified') === 'true';

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [user, isAdmin, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUnverifiedEmail(null);
    setIsLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError("Les mots de passe ne correspondent pas.");
          setIsLoading(false);
          return;
        }
        if (password.length < 8) {
          setError("Le mot de passe doit contenir au moins 8 caractères.");
          setIsLoading(false);
          return;
        }
        const result = await register(email, password);
        setRegisteredEmail(result.email);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      const raw = err.response?.data || {};
      if (raw.code === 'EMAIL_NOT_VERIFIED') {
        setUnverifiedEmail(raw.email || email);
      } else {
        setError(err.message || 'Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!unverifiedEmail) return;
    setResendLoading(true);
    setResendSuccess(false);
    try {
      await axios.post(`${API_URL}/auth/resend-verification`, { email: unverifiedEmail });
      setResendSuccess(true);
    } catch {
      // silent — server always returns 200 for this endpoint
      setResendSuccess(true);
    } finally {
      setResendLoading(false);
    }
  };

  // ── Post-register state ───────────────────────────────────────────────────
  if (registeredEmail) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
        <div className="relative z-10 w-full max-w-md text-center">
          <Link to="/" className="block mb-8">
            <h1 className="font-serif text-3xl text-white mb-2">Casa Steph Iberico</h1>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </Link>
          <div className="bg-darkAccent border border-gold/30 rounded-sm p-10 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-gold" />
              </div>
            </div>
            <h2 className="font-serif text-2xl text-white mb-3">Merci pour votre inscription !</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Votre compte a bien été créé. Pour finaliser votre inscription,
              il ne vous reste qu'une étape : confirmer votre adresse email.
            </p>
            <p className="text-gray-400 text-sm mb-1">Nous avons envoyé un lien de confirmation à</p>
            <p className="text-gold font-medium mb-5">{registeredEmail}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Cliquez sur le lien dans l'email pour activer votre compte.
              Ce lien est valable <strong className="text-gray-300">24 heures</strong>.
            </p>
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded px-4 py-3 text-xs text-yellow-300 text-left mb-8">
              Vous ne trouvez pas l'email ? Pensez à vérifier votre dossier <strong>courrier indésirable (spam)</strong>.
            </div>
            <button
              onClick={() => { setRegisteredEmail(null); setIsRegistering(false); setEmail(''); setPassword(''); setConfirmPassword(''); }}
              className="text-sm text-gray-500 hover:text-gold transition-colors"
            >
              ← Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main login/register form ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="block text-center mb-8">
          <h1 className="font-serif text-3xl text-white mb-2">Casa Steph Iberico</h1>
          <div className="w-16 h-0.5 bg-gold mx-auto"></div>
        </Link>

        <div className="bg-darkAccent border border-gold/30 rounded-sm p-8 shadow-2xl">
          <h2 className="font-serif text-2xl text-white mb-2 text-center">
            {isRegistering ? 'Créer un compte' : 'Connexion'}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            {isRegistering
              ? 'Rejoignez notre communauté de gourmets'
              : 'Accédez à votre espace personnel'}
          </p>

          {/* Email verified success banner */}
          {justVerified && !error && !unverifiedEmail && (
            <div className="flex items-center gap-2 text-sm p-3 mb-4 rounded bg-emerald-900/20 border border-emerald-500/50 text-emerald-300">
              <CheckCircle size={16} className="shrink-0" />
              Email confirmé ! Vous pouvez maintenant vous connecter.
            </div>
          )}

          {/* Generic error */}
          {error && (
            <div className="text-sm p-3 mb-4 rounded bg-red-800/20 border border-red-500 text-red-300 text-center">
              {error}
            </div>
          )}

          {/* Email not verified */}
          {unverifiedEmail && (
            <div className="text-sm p-4 mb-4 rounded bg-yellow-900/20 border border-yellow-600/40 text-yellow-300">
              <p className="font-medium mb-2">Email non vérifié</p>
              <p className="text-xs text-yellow-400 mb-3">
                Veuillez confirmer votre adresse email avant de vous connecter.
                Vérifiez votre boîte mail (et le dossier spam).
              </p>
              {resendSuccess ? (
                <p className="text-xs text-emerald-400">Email renvoyé ! Vérifiez votre boîte mail.</p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-xs underline hover:text-yellow-200 transition-colors disabled:opacity-50"
                >
                  {resendLoading ? 'Envoi...' : "Renvoyer l'email de vérification"}
                </button>
              )}
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
                placeholder="votre@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-2 tracking-wide">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 pr-8 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isRegistering && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-2 tracking-wide">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 px-1 pr-8 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold/90 text-dark font-medium py-3 rounded-sm transition-colors duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? (isRegistering ? 'Création...' : 'Connexion...')
                : (isRegistering ? 'Créer mon compte' : 'Se connecter')}
            </button>
          </form>

          {!isRegistering && (
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gold transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegistering(!isRegistering); setError(''); setUnverifiedEmail(null); setResendSuccess(false); }}
              className="text-sm text-gray-400 hover:text-gold transition-colors duration-300"
              disabled={isLoading}
            >
              {isRegistering
                ? 'Déjà un compte ? Se connecter'
                : 'Pas encore de compte ? Créer un compte'}
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
