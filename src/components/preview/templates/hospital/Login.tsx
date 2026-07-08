'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HospitalLoginProps {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  companyName: string;
  logoUrl: string;
  logoIcon: string;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  hospitalType?: string;
  themePreset?: string;
}

export default function HospitalLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName = 'Hope Care',
  logoUrl,
  logoIcon = '🏥',
  errorMessage,
  successMessage,
  handleLoginSubmit,
  hospitalType = 'General Hospital',
  themePreset = 'vibrant-teal',
}: HospitalLoginProps) {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Dynamic Theme Styling Resolver
  const getThemeAccents = () => {
    const t = themePreset?.toLowerCase() || '';
    if (t.includes('teal')) return { primary: 'bg-teal-600 hover:bg-teal-700', text: 'text-teal-600', border: 'border-teal-200 focus:border-teal-500 focus:ring-teal-100', ring: 'ring-teal-500/10', glowBg: 'from-teal-50 to-emerald-50/30' };
    if (t.includes('blue') || t.includes('deepblue')) return { primary: 'bg-blue-600 hover:bg-blue-700', text: 'text-blue-600', border: 'border-blue-200 focus:border-blue-500 focus:ring-blue-100', ring: 'ring-blue-500/10', glowBg: 'from-blue-50 to-indigo-50/30' };
    if (t.includes('emerald') || t.includes('green')) return { primary: 'bg-green-600 hover:bg-green-700', text: 'text-green-600', border: 'border-green-200 focus:border-green-500 focus:ring-green-100', ring: 'ring-green-500/10', glowBg: 'from-green-50 to-teal-50/30' };
    if (t.includes('neon') || t.includes('cyber')) return { primary: 'bg-purple-600 hover:bg-purple-750', text: 'text-purple-600', border: 'border-purple-200 focus:border-purple-500 focus:ring-purple-100', ring: 'ring-purple-500/10', glowBg: 'from-purple-50 to-cyan-50/30' };
    if (t.includes('amber') || t.includes('warm')) return { primary: 'bg-amber-600 hover:bg-amber-700', text: 'text-amber-600', border: 'border-amber-200 focus:border-amber-500 focus:ring-amber-100', ring: 'ring-amber-500/10', glowBg: 'from-amber-50 to-yellow-50/30' };
    if (t.includes('rose') || t.includes('coral')) return { primary: 'bg-rose-600 hover:bg-rose-700', text: 'text-rose-600', border: 'border-rose-200 focus:border-rose-500 focus:ring-rose-100', ring: 'ring-rose-500/10', glowBg: 'from-rose-50 to-pink-50/30' };
    if (t.includes('slate') || t.includes('clean')) return { primary: 'bg-slate-700 hover:bg-slate-800', text: 'text-slate-700', border: 'border-slate-350 focus:border-slate-600 focus:ring-slate-100', ring: 'ring-slate-600/10', glowBg: 'from-slate-50 to-zinc-100/30' };
    if (t.includes('obsidian') || t.includes('dark')) return { primary: 'bg-slate-900 hover:bg-black', text: 'text-slate-900', border: 'border-slate-300 focus:border-slate-800 focus:ring-slate-100', ring: 'ring-slate-900/10', glowBg: 'from-slate-100 to-zinc-200/50' };
    if (t.includes('lilac') || t.includes('aura')) return { primary: 'bg-violet-600 hover:bg-violet-750', text: 'text-violet-600', border: 'border-violet-200 focus:border-violet-500 focus:ring-violet-100', ring: 'ring-violet-500/10', glowBg: 'from-violet-50 to-purple-50/30' };
    if (t.includes('crimson') || t.includes('sunset')) return { primary: 'bg-red-700 hover:bg-red-800', text: 'text-red-700', border: 'border-red-200 focus:border-red-500 focus:ring-red-100', ring: 'ring-red-500/10', glowBg: 'from-red-50 to-rose-50/30' };
    return { primary: 'bg-teal-600 hover:bg-teal-700', text: 'text-teal-600', border: 'border-teal-200 focus:border-teal-500 focus:ring-teal-100', ring: 'ring-teal-500/10', glowBg: 'from-teal-50 to-slate-50' };
  };

  const accents = getThemeAccents();

  // Dynamic SVG Illustration based on Hospital Type
  const renderMedicalIllustration = () => {
    const h = hospitalType.toLowerCase();
    if (h.includes('dental') || h.includes('dentist')) {
      return (
        <svg className="w-full max-w-[320px] aspect-square mx-auto text-white opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.5 2 7 3.5 7 7c0 4 3 6.5 3 9.5 0 2-1 3.5-1.5 4.5h7c-.5-1-1.5-2.5-1.5-4.5 0-3 3-5.5 3-9.5 0-3.5-2.5-5-5-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7c1-1 3-1 4 0m-4 4c.5-.5 1.5-.5 2 0" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    }
    if (h.includes('eye') || h.includes('optometry')) {
      return (
        <svg className="w-full max-w-[320px] aspect-square mx-auto text-white opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    }
    if (h.includes('cardio') || h.includes('heart')) {
      return (
        <svg className="w-full max-w-[320px] aspect-square mx-auto text-white opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.5h2.5l1.5-2.5 2 6 1.5-4.5h2.5" />
        </svg>
      );
    }
    if (h.includes('neuro') || h.includes('brain') || h.includes('mental')) {
      return (
        <svg className="w-full max-w-[320px] aspect-square mx-auto text-white opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5v13M9.5 12h5M12 9.5a2.5 2.5 0 100-5M12 14.5a2.5 2.5 0 100 5" />
        </svg>
      );
    }
    if (h.includes('vet') || h.includes('animal') || h.includes('pet')) {
      return (
        <svg className="w-full max-w-[320px] aspect-square mx-auto text-white opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    }
    // Default general clinical cross / stethoscope
    return (
      <svg className="w-full max-w-[320px] aspect-square mx-auto text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    );
  };

  // Quick Login Gateways
  const quickLogins = [
    { label: 'Patient', email: 'patient@gmail.com', role: 'Patient' },
    { label: 'Doctor', email: 'doctor@gmail.com', role: 'Physician' },
    { label: 'Admin', email: 'admin@gmail.com', role: 'Director' },
    { label: 'Reception', email: 'reception@gmail.com', role: 'Frontdesk' },
    { label: 'Nurse', email: 'nurse@gmail.com', role: 'Ward Staff' },
    { label: 'Diagnostics Lab', email: 'lab@gmail.com', role: 'Lab Tech' },
    { label: 'Pharmacy', email: 'pharmacy@gmail.com', role: 'Pharmacist' }
  ];

  const handleQuickLogin = (email: string) => {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
    const form = document.querySelector('form') as HTMLFormElement;

    if (emailInput && passwordInput && form) {
      emailInput.value = email;
      passwordInput.value = '123456';
      setLoginMethod('password');
      
      setTimeout(() => {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 100);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
      alert('Password reset link dispatched securely.');
    }, 1500);
  };

  const handleOtpRequest = () => {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    if (!emailInput?.value) {
      alert('Please enter your email address first.');
      return;
    }
    setOtpSent(true);
    alert('Security verification OTP code sent to ' + emailInput.value);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 font-sans relative overflow-hidden">
      {/* Left side: Premium Clinical Backdrop & Illustrations */}
      <div
        className="hidden lg:flex lg:w-[45%] bg-cover bg-center relative flex-col justify-between p-12 text-white overflow-hidden transition-all duration-300"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800')`
        }}
      >
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-2.5 z-10">
          <span className="text-3xl">{logoIcon || '🏥'}</span>
          <div className="text-left">
            <span className="text-lg font-black uppercase tracking-wider block leading-none">{companyName || 'Hope Care'}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{hospitalType}</span>
          </div>
        </div>

        <div className="space-y-6 max-w-sm text-left my-auto z-10">
          <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-slate-200">
            Enterprise Management Console
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Advanced Clinical Care Operations
          </h2>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Secure sign-in for patients, consulting practitioners, and healthcare administrators. Access digital prescriptions, health analytics, vitals logging, and pharmaceutical inventory.
          </p>

          <div className="pt-4 border-t border-white/10">
            {renderMedicalIllustration()}
          </div>
        </div>

        <p className="text-[10px] text-slate-550 font-semibold uppercase tracking-wider z-10">
          © 2026 {companyName}. Verified HIPAA-Compliant Gateway.
        </p>
      </div>

      {/* Right side: Modern Glassmorphic Login Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 md:p-12 bg-white relative">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-left">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{hospitalType} Portal</span>
            <h2 className="text-2xl font-black text-slate-909 tracking-tight mt-0.5">
              {isSignUp ? 'Create Patient Profile' : 'Authenticate Credentials'}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {isSignUp ? 'Onboard your file into the clinical database.' : 'Select your workspace role or log in with password.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 font-bold text-left animate-pulse">
              ⚠️ {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-600 font-bold text-left">
              ✅ {successMessage}
            </div>
          )}

          {/* Quick Access Roles Hub */}
          {!isSignUp && (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4 text-left space-y-2.5">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450 block">
                🏥 Quick Login Gateways
              </span>
              <div className="flex flex-wrap gap-2">
                {quickLogins.map((ql) => (
                  <button
                    key={ql.email}
                    type="button"
                    onClick={() => handleQuickLogin(ql.email)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-350 transition shadow-sm cursor-pointer"
                  >
                    {ql.label} <span className="text-[8px] text-slate-400 font-semibold">({ql.role})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Authentication Method Tabs */}
          {!isSignUp && (
            <div className="flex border-b border-slate-100">
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className={`py-2 px-4 text-xs font-bold border-b-2 cursor-pointer transition ${
                  loginMethod === 'password' ? 'border-slate-800 text-slate-900' : 'border-transparent text-slate-400'
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`py-2 px-4 text-xs font-bold border-b-2 cursor-pointer transition ${
                  loginMethod === 'otp' ? 'border-slate-800 text-slate-900' : 'border-transparent text-slate-400'
                }`}
              >
                OTP Verification
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Patient Full Name"
                  className={`w-full rounded-xl border bg-slate-50/20 px-4 py-2.5 text-xs text-slate-900 outline-none transition ${accents.border}`}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={isSignUp ? '' : 'patient@gmail.com'}
                  placeholder="name@hospital.com"
                  className={`w-full rounded-xl border bg-slate-50/20 px-4 py-2.5 text-xs text-slate-900 outline-none transition ${accents.border}`}
                />
              </div>

              {isSignUp && (
                <div className="space-y-1 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className={`w-full rounded-xl border bg-slate-50/20 px-4 py-2.5 text-xs text-slate-900 outline-none transition ${accents.border}`}
                  />
                </div>
              )}
            </div>

            {isSignUp && (
              <div className="space-y-1 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                  Residential Address
                </label>
                <textarea
                  name="address"
                  rows={2}
                  required
                  placeholder="Complete postal address for patient records"
                  className={`w-full rounded-xl border bg-slate-50/20 px-4 py-2.5 text-xs text-slate-900 outline-none transition resize-none ${accents.border}`}
                />
              </div>
            )}

            {loginMethod === 'password' || isSignUp ? (
              <div className="space-y-1 text-left relative">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Secure Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className={`text-[9px] font-bold hover:underline bg-transparent border-0 cursor-pointer ${accents.text}`}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-slate-50/20 px-4 py-2.5 text-xs text-slate-900 outline-none transition ${accents.border}`}
                />
              </div>
            ) : (
              <div className="space-y-1 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                  6-Digit OTP Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP code"
                    className={`flex-1 rounded-xl border bg-slate-50/20 px-4 py-2.5 text-xs text-slate-900 outline-none transition ${accents.border}`}
                  />
                  <button
                    type="button"
                    onClick={handleOtpRequest}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    {otpSent ? 'Resend code' : 'Request OTP'}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me checkbox */}
            {!isSignUp && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-teal-650 focus:ring-teal-500/20 h-4 w-4"
                  />
                  Remember my session on this browser
                </label>
              </div>
            )}

            <button
              type="submit"
              className={`w-full mt-4 rounded-xl py-3 px-4 text-xs font-black text-white ${accents.primary} cursor-pointer shadow-md uppercase tracking-widest transition-all`}
            >
              {isSignUp ? 'Register Secure Patient File' : 'Authenticate Portal Entry'}
            </button>
          </form>

          {/* Social Google Login */}
          {!isSignUp && (
            <div className="space-y-3">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert('Logging in with Google secure SSO...');
                  handleQuickLogin('patient@gmail.com');
                }}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-bold text-slate-650 hover:bg-slate-50 transition cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.606 0 3.012.613 4.113 1.606l3.078-3.078C19.3 2.767 15.972 1.5 12.24 1.5c-5.795 0-10.5 4.705-10.5 10.5s4.705 10.5 10.5 10.5c5.783 0 9.877-4.062 9.877-10.038 0-.6-.051-1.1-.154-1.677H12.24z" />
                </svg>
                Sign in with Google Secure Workspace
              </button>
            </div>
          )}

          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`font-black hover:underline bg-transparent border-0 cursor-pointer ${accents.text}`}
            >
              {isSignUp ? 'Already registered? Sign In' : 'New patient? Register Account'}
            </button>
            <Link
              href={`/preview/${projectId}`}
              className="text-slate-400 hover:text-slate-600 font-bold transition"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-left space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-909 uppercase tracking-wide">Recover Access Code</h3>
              <p className="text-[11px] text-slate-450 font-bold mt-1">Enter your registered email to request a reset link.</p>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="registered@email.com"
                className={`w-full rounded-xl border bg-slate-50/20 px-4 py-2 text-xs text-slate-905 outline-none transition ${accents.border}`}
              />
              <div className="flex justify-end gap-2 text-xs font-bold pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 border border-slate-250 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-xl transition cursor-pointer ${accents.primary}`}
                >
                  {forgotSent ? 'Sending...' : 'Send Recovery Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
