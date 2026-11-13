import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AGENCY_DETAILS } from '../../data/agency';

export function AdminLoginPage() {
  const { login, loginWithGoogle, registerInitialAdmin, authError, clearError, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('elvoravision@gmail.com');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password.trim()) {
      setLocalError('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      if (isRegisterMode) {
        await registerInitialAdmin(email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setLocalError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    clearError();
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setLocalError(err.message || 'Google authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070512] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[300px] bg-indigo-600/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative w-full max-w-md bg-[#120E27] border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-black/80 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 mx-auto group">
            <div className="w-10 h-10 rounded-xl bg-[#1A133A] border border-cyan-500/30 p-1 flex items-center justify-center shadow-md">
              <img
                src={AGENCY_DETAILS.logoUrl}
                alt="NOSHLANE Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-['Space_Grotesk'] font-bold text-xl text-white tracking-tight">
                NOSHLANE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase leading-none">
                ADMIN PORTAL
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 pt-2">
            Secure administrative console for content and leads management
          </p>
        </div>

        {/* One-Click Google Admin Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z" />
            <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z" />
          </svg>
          <span>Continue with Google (elvoravision@gmail.com)</span>
        </button>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <div className="flex-1 h-px bg-white/10" />
          <span>or use email &amp; password</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Error Alert */}
        {(localError || authError) && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{localError || authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elvoravision@gmail.com"
                required
                className="w-full bg-[#0A0716] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter or create your password"
                required
                className="w-full bg-[#0A0716] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/25 mt-2"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isRegisterMode ? 'Set Password & Create Admin' : 'Sign In to Admin Panel'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* First-time password guidance */}
        <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-[11px] text-slate-400 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            There is no preset password. Click <strong className="text-cyan-300">Setup Initial Admin</strong> below to create your password (requires Email/Password enabled in Firebase Console), or use <strong className="text-white">Continue with Google</strong> above.
          </span>
        </div>

        {/* Mode Toggle for Initial Setup vs Login */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>{isRegisterMode ? 'Already have a password?' : 'First time using email/password?'}</span>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setLocalError(null);
              clearError();
            }}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
          >
            {isRegisterMode ? 'Switch to Sign In' : 'Setup Initial Admin'}
          </button>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
