import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, Users, CheckCircle, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import TermsModal from '../components/TermsModal';
import { supabase } from '../lib/supabase';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  securityPin: string;
  sponsorCode: string;
  termsAccepted: boolean;
};

type FieldError = Partial<Record<keyof FormState, string>>;

type Props = {
  onNavigate: (page: 'register' | 'login') => void;
};

export default function RegisterPage({ onNavigate }: Props) {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    securityPin: '',
    sponsorCode: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [globalError, setGlobalError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('sponsor') || params.get('code') || '';
    if (ref) {
      setForm(prev => ({ ...prev, sponsorCode: ref }));
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: FieldError = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!form.securityPin) {
      newErrors.securityPin = 'Security PIN is required.';
    } else if (!/^\d{4,6}$/.test(form.securityPin)) {
      newErrors.securityPin = 'PIN must be 4 to 6 digits.';
    }

    if (!form.sponsorCode.trim()) {
      newErrors.sponsorCode = 'Sponsor code is required to register.';
    }

    if (!form.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms & Conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setGlobalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setGlobalError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: form.email,
          security_pin: form.securityPin,
          sponsor_code: form.sponsorCode,
        });

        if (profileError) throw profileError;
      }

      setSuccessMessage('Account created successfully! Welcome to NUX-TRADE.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setGlobalError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: 'Weak', color: '#ff4444', width: '25%' };
    if (score === 2) return { label: 'Fair', color: '#ff6b35', width: '50%' };
    if (score === 3) return { label: 'Good', color: '#00c4a0', width: '75%' };
    return { label: 'Strong', color: '#00e87a', width: '100%' };
  };

  const strength = getPasswordStrength();

  if (successMessage) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e87a]/20 to-[#00c4a0]/20 border-2 border-[#00e87a]/40 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle size={36} className="text-[#00e87a]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h2>
          <p className="text-[#6a9a7a] text-sm mb-6">{successMessage}</p>
          <div className="p-4 rounded-xl bg-[#0d2a1c]/80 border border-[#1e4030]">
            <p className="text-[#00c4a0] text-xs">Check your email to verify your account and start copytrading.</p>
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
          <div className="text-left text-center">
            <h1 className="text-2xl font-black text-white tracking-tight">
              NUX<span className="text-[#00e87a]">-TRADE</span>
            </h1>
            <p className="text-[#4a8a6a] text-xs tracking-widest uppercase mt-1">Copytrade Platform</p>
          </div>
          <p className="text-[#6a9a7a] text-sm mt-3">
            Create your account and start copying top traders today.
          </p>
        </div>

        <div className="bg-[#0a1a12]/90 backdrop-blur-xl border border-[#1e4030] rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8">
          <h2 className="text-white font-bold text-lg mb-6">
            Create Account
            <span className="block text-[#4a8a6a] text-xs font-normal mt-0.5">Fill in your details to get started</span>
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
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full bg-[#0d2a1c]/60 border ${errors.email ? 'border-red-500/50' : 'border-[#1e4030]'} rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#3a5a4a] focus:outline-none focus:border-[#00e87a]/50 focus:ring-1 focus:ring-[#00e87a]/20 transition-all`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[#8abaa0] text-xs font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Min. 8 characters"
                  className={`w-full bg-[#0d2a1c]/60 border ${errors.password ? 'border-red-500/50' : 'border-[#1e4030]'} rounded-xl pl-9 pr-10 py-2.5 text-white text-sm placeholder-[#3a5a4a] focus:outline-none focus:border-[#00e87a]/50 focus:ring-1 focus:ring-[#00e87a]/20 transition-all`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a] hover:text-[#00e87a] transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {form.password && strength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#4a8a6a]">Strength</span>
                    <span className="text-[10px] font-medium" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div className="h-1 bg-[#1e4030] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, backgroundColor: strength.color }} />
                  </div>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.password}</p>}
            </div>

            <div>
              <label className="block text-[#8abaa0] text-xs font-medium mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => handleChange('confirmPassword', e.target.value)}
                  placeholder="Repeat your password"
                  className={`w-full bg-[#0d2a1c]/60 border ${errors.confirmPassword ? 'border-red-500/50' : form.confirmPassword && form.confirmPassword === form.password ? 'border-[#00e87a]/40' : 'border-[#1e4030]'} rounded-xl pl-9 pr-10 py-2.5 text-white text-sm placeholder-[#3a5a4a] focus:outline-none focus:border-[#00e87a]/50 focus:ring-1 focus:ring-[#00e87a]/20 transition-all`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a] hover:text-[#00e87a] transition-colors">
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.confirmPassword}</p>}
              {!errors.confirmPassword && form.confirmPassword && form.confirmPassword === form.password && (
                <p className="text-[#00e87a] text-[11px] mt-1 flex items-center gap-1"><CheckCircle size={10} />Passwords match</p>
              )}
            </div>

            <div>
              <label className="block text-[#8abaa0] text-xs font-medium mb-1.5">
                Security PIN
                <span className="ml-1.5 text-[10px] text-[#4a8a6a] font-normal">(used for withdrawal verification)</span>
              </label>
              <div className="relative">
                <Shield size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
                <input
                  type={showPin ? 'text' : 'password'}
                  value={form.securityPin}
                  onChange={e => handleChange('securityPin', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="4 to 6 digit PIN"
                  maxLength={6}
                  inputMode="numeric"
                  className={`w-full bg-[#0d2a1c]/60 border ${errors.securityPin ? 'border-red-500/50' : 'border-[#1e4030]'} rounded-xl pl-9 pr-10 py-2.5 text-white text-sm placeholder-[#3a5a4a] focus:outline-none focus:border-[#ff6b35]/50 focus:ring-1 focus:ring-[#ff6b35]/20 transition-all tracking-widest`}
                />
                <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a] hover:text-[#ff6b35] transition-colors">
                  {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.securityPin && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.securityPin}</p>}
            </div>

            <div>
              <label className="block text-[#8abaa0] text-xs font-medium mb-1.5">
                Sponsor Code
                <span className="ml-1.5 text-[10px] text-[#ff6b35] font-medium">* Required</span>
              </label>
              <div className="relative">
                <Users size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
                <input
                  type="text"
                  value={form.sponsorCode}
                  readOnly
                  placeholder="Auto-filled from your invite link"
                  className={`w-full bg-[#0a1e14]/80 border ${errors.sponsorCode ? 'border-red-500/50' : form.sponsorCode ? 'border-[#ff6b35]/40' : 'border-[#1e4030]'} rounded-xl pl-9 pr-10 py-2.5 text-sm placeholder-[#3a5a4a] focus:outline-none transition-all cursor-not-allowed ${form.sponsorCode ? 'text-[#ff8c55]' : 'text-[#4a6a5a]'}`}
                />
                <KeyRound size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a8a6a]" />
              </div>
              <p className="text-[#4a6a5a] text-[10px] mt-1 flex items-center gap-1">
                {form.sponsorCode
                  ? <><CheckCircle size={10} className="text-[#ff6b35]" /><span className="text-[#ff6b35]">Sponsor code detected from your invite link</span></>
                  : <><AlertCircle size={10} className="text-[#4a6a5a]" />This field is auto-filled from your invitation link</>
                }
              </p>
              {errors.sponsorCode && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.sponsorCode}</p>}
            </div>

            <div className="pt-1">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!form.termsAccepted) {
                      setShowTerms(true);
                    } else {
                      handleChange('termsAccepted', false);
                    }
                  }}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${form.termsAccepted ? 'bg-gradient-to-br from-[#00e87a] to-[#00c4a0] border-transparent' : errors.termsAccepted ? 'border-red-500/50' : 'border-[#1e4030] hover:border-[#00e87a]/50'}`}
                >
                  {form.termsAccepted && <CheckCircle size={11} className="text-[#050e0a]" strokeWidth={3} />}
                </button>
                <div>
                  <p className="text-[#8abaa0] text-xs leading-relaxed">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-[#00c4a0] hover:text-[#00e87a] underline underline-offset-2 transition-colors font-medium"
                    >
                      Terms & Conditions
                    </button>
                    {' '}of NUX-TRADE Copytrade Platform.
                  </p>
                  {errors.termsAccepted && <p className="text-red-400 text-[11px] mt-0.5 flex items-center gap-1"><AlertCircle size={10} />{errors.termsAccepted}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#00e87a] to-[#00c4a0] text-[#050e0a] font-bold text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#00e87a]/20 hover:shadow-[#00e87a]/30 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin" />Creating Account...</>
              ) : (
                'Create My Account'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#4a6a5a] text-xs mt-5">
          Already have an account?{' '}
          <span className="text-[#00c4a0] hover:text-[#00e87a] cursor-pointer transition-colors font-medium" onClick={() => onNavigate('login')}>Sign in here</span>
        </p>
      </div>

      {showTerms && (
        <TermsModal
          onClose={() => setShowTerms(false)}
          onAccept={() => {
            handleChange('termsAccepted', true);
            setShowTerms(false);
          }}
        />
      )}
    </div>
  );
}
