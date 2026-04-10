import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = {
  onNavigate: (page: 'register' | 'login') => void;
};

export default function LoginPage({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    else setPassword(value);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    setGlobalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setGlobalError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSuccessMessage('Login successful! Welcome back to NUX-TRADE.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setGlobalError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (successMessage) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e87a]/20 to-[#00c4a0]/20 border-2 border-[#00e87a]/40 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle size={36} className="text-[#00e87a]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-[#6a9a7a] text-sm mb-6">{successMessage}</p>
          <div className="p-4 rounded-xl bg-[#0d2a1c]/80 border border-[#1e4030]">
            <p className="text-[#00c4a0] text-xs">You are now signed in to your NUX-TRADE account.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00e87a]/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#00c4a0]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff6b35]/3 blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,232,122,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src="/Logo.png" alt="NUX-TRADE" className="h-16 w-16 mx-auto mb-4 drop-shadow-lg drop-shadow-[#00e87a]/30" />
          <div className="text-center">
            <h1 className="text-2xl font-black text-white tracking-tight">
              NUX<span className="text-[#00e87a]">-TRADE</span>
            </h1>
            <p className="text-[#4a8a6a] text-xs tracking-widest uppercase mt-1">Copytrade Platform</p>
          </div>
          <p className="text-[#6a9a7a] text-sm mt-3">
            Sign in to your account and continue copytrading.
          </p>
        </div>

        <div className="bg-[#0a1a12]/90 backdrop-blur-xl border border-[#1e4030] rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8">
          <h2 className="text-white font-bold text-lg mb-6">
            Sign In
            <span className="block text-[#4a8a6a] text-xs font-normal mt-0.5">Enter your credentials to access your account</span>
          </h2>

          {globalError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-5">
              <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-xs">{globalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-[#8abaa0] text-xs font-medium mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full bg-[#0d2a1c]/60 border ${errors.email ? 'border-red-500/50' : 'border-[#1e4030]'} rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#3a5a4a] focus:outline-none focus:border-[#00e87a]/50 focus:ring-1 focus:ring-[#00e87a]/20 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle size={10} />{errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#8abaa0] text-xs font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Your password"
                  className={`w-full bg-[#0d2a1c]/60 border ${errors.password ? 'border-red-500/50' : 'border-[#1e4030]'} rounded-xl pl-9 pr-10 py-2.5 text-white text-sm placeholder-[#3a5a4a] focus:outline-none focus:border-[#00e87a]/50 focus:ring-1 focus:ring-[#00e87a]/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a] hover:text-[#00e87a] transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle size={10} />{errors.password}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                className="text-[#00c4a0] hover:text-[#00e87a] text-xs transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00e87a] to-[#00c4a0] text-[#050e0a] font-bold text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#00e87a]/20 hover:shadow-[#00e87a]/30 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin" />Signing In...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#4a6a5a] text-xs mt-5">
          Don't have an account?{' '}
          <span
            className="text-[#00c4a0] hover:text-[#00e87a] cursor-pointer transition-colors font-medium"
            onClick={() => onNavigate('register')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
