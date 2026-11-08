import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { signIn, resetPassword, isAuthenticated, isLoading: authLoading, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot password state
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetFeedback, setResetFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await signIn(email, password, rememberMe);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid administrator credentials. Please verify your details.');
    } else {
      setSuccessMsg('Authenticated successfully. Redirecting to your dashboard...');
      setTimeout(() => {
        const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      }, 500);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetFeedback(null);

    if (!resetEmail.trim()) {
      setResetFeedback({ type: 'error', message: 'Please enter your registered administrator email.' });
      return;
    }

    setResetSubmitting(true);
    const result = await resetPassword(resetEmail);
    setResetSubmitting(false);

    if (result.success) {
      setResetFeedback({
        type: 'success',
        message: 'Password reset link sent! Check your inbox for verification instructions.',
      });
      setTimeout(() => {
        setIsForgotPasswordOpen(false);
        setResetFeedback(null);
      }, 3500);
    } else {
      setResetFeedback({
        type: 'error',
        message: result.error || 'Failed to dispatch password reset. Ensure the email exists.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-body selection:bg-white/20 selection:text-white">
      {/* Subtle ambient gradient glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4E85BF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to public website pill */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-white px-3.5 py-1.5 rounded-full bg-surface border border-stroke hover:border-white/20 transition-all duration-200"
        >
          <span>&larr;</span>
          <span>View Public Portfolio</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Supabase Configuration Warning Card if not configured */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Supabase authentication service is not connected. Add <code className="bg-black/30 px-1 py-0.5 rounded text-amber-300 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-black/30 px-1 py-0.5 rounded text-amber-300 font-mono">VITE_SUPABASE_ANON_KEY</code> to your environment variables to sign in.
            </p>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-surface border border-stroke rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#89AACC]">
              <ShieldCheck size={24} />
            </div>
            <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
              Portfolio Content Manager
            </span>
            <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
              Admin Gateway
            </h1>
            <p className="text-xs text-muted font-light mt-1.5">
              Authorized personnel only. Manage projects, resume, and portfolio content.
            </p>
          </div>

          {/* Feedback Banners */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5 text-xs text-red-300">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-emerald-300">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs text-muted uppercase tracking-wider font-mono mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-bg border border-stroke focus:border-[#89AACC] rounded-2xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 outline-none transition-colors pl-10"
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-muted uppercase tracking-wider font-mono">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-xs text-[#89AACC] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-bg border border-stroke focus:border-[#89AACC] rounded-2xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-muted/40 outline-none transition-colors pl-10 pr-10"
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stroke text-[#4E85BF] bg-bg focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#4E85BF]"
                />
                <span className="text-xs text-muted">Remember session</span>
              </label>

              <span className="text-[11px] text-muted/60 font-mono">RLS Protected</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full group relative inline-flex items-center justify-center rounded-2xl text-xs sm:text-sm font-medium p-[1.5px] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              <span className="absolute inset-0 rounded-2xl accent-gradient" />
              <span className="relative z-10 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 bg-text-primary text-bg font-medium transition-colors">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-stroke/40 text-center">
            <span className="text-[11px] text-muted/60">
              Personal Portfolio Admin &bull; Powered by Supabase &amp; React
            </span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative">
            <button
              onClick={() => {
                setIsForgotPasswordOpen(false);
                setResetFeedback(null);
              }}
              className="absolute top-5 right-5 text-muted hover:text-white"
            >
              &times;
            </button>

            <div className="flex items-center gap-2 mb-3 text-[#89AACC]">
              <KeyRound size={20} />
              <h3 className="text-base font-medium text-text-primary">Reset Password</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Enter your registered administrator email address and we will dispatch a secure reset link.
            </p>

            {resetFeedback && (
              <div
                className={`mb-4 p-3 rounded-2xl text-xs flex items-start gap-2 ${
                  resetFeedback.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border border-red-500/30 text-red-300'
                }`}
              >
                {resetFeedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{resetFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="ux.varunsurya@gmail.com"
                required
                className="w-full bg-bg border border-stroke focus:border-[#89AACC] rounded-2xl px-4 py-2.5 text-xs text-text-primary outline-none"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="px-4 py-2 text-xs text-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="px-4 py-2 rounded-xl bg-text-primary text-bg font-medium text-xs hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  {resetSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

