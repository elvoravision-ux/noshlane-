import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AGENCY_DETAILS } from '../../data/agency';

export function AdminLoginPage() {
  const { login, registerInitialAdmin, authError, clearError, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('elvoravision@gmail.com');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // If already authenticated admin, redirect to admin overview
  if (user && isAdmin) {
    navigate('/admin/dashboard', { replace: true });
  }

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
                placeholder="admin@noshlane.com"
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
                placeholder="••••••••••••"
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
                <span>{isRegisterMode ? 'Create Admin Account' : 'Sign In to Admin Panel'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Mode Toggle for Initial Setup vs Login */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>{isRegisterMode ? 'Already have an account?' : 'First time setting up?'}</span>
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
