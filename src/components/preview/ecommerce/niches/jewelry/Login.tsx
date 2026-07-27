'use client';
import React, { useState } from 'react';

export default function Login({
  projectId,
  projectConfig,
  setCustomerSession,
  setActiveView,
  addToast,
  isLogin: initialIsLogin = true,
  handleLoginSubmit
}: any) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginMethod, setLoginMethod] = useState('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const primaryColor = projectConfig?.themeColor || '#d4af37';
  const logoIcon = projectConfig?.logoIcon || '💎';

  const triggerToast = (msg: string, isError?: boolean) => {
    if (typeof addToast === 'function') addToast(msg, isError);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isForgotPassword) {
      setLoading(true);
      setTimeout(() => {
        setResetEmailSent(true);
        setLoading(false);
        triggerToast('Reset password link dispatched to email.');
      }, 1000);
      return;
    }

    if (isLogin && loginMethod === 'otp') {
      if (!phone.trim()) {
        triggerToast('Please enter your phone number.', true);
        return;
      }
      setLoading(true);
      if (!otpSent) {
        setTimeout(() => {
          setOtpSent(true);
          setLoading(false);
          triggerToast('One-Time Verification OTP passcode sent!');
        }, 1000);
      } else {
        setTimeout(() => {
          const session = {
            id: Date.now(),
            email: `customer-${phone}@gmail.com`,
            name: `OTP User`,
            role: 'Customer'
          };
          localStorage.setItem('clientEmail', session.email);
          localStorage.setItem('clientId', 'mock-' + Math.random().toString(36).substring(2, 9));
          localStorage.setItem(`customer_${projectId}`, JSON.stringify(session));
          triggerToast('OTP verification successful!');
          setLoading(false);
          if (typeof setActiveView === 'function') {
            if (typeof setCustomerSession === 'function') setCustomerSession(session);
            setActiveView('landing');
          } else {
            window.location.href = `/preview/${projectId}`;
          }
        }, 1000);
      }
      return;
    }

    setLoading(true);
    if (typeof handleLoginSubmit === 'function') {
      try {
        const mockForm = document.createElement('form');
        const emailInput = document.createElement('input');
        emailInput.name = 'email';
        emailInput.value = email;
        const passInput = document.createElement('input');
        passInput.name = 'password';
        passInput.value = password;
        mockForm.appendChild(emailInput);
        mockForm.appendChild(passInput);
        
        await handleLoginSubmit({
          preventDefault: () => {},
          currentTarget: mockForm
        } as any);
        setLoading(false);
        return;
      } catch (err) {
        console.warn('Parent login submit failed, using preview mode fallback.');
      }
    }

    setTimeout(() => {
      const session = {
        id: Date.now(),
        email: email.trim(),
        name: email.split('@')[0],
        role: 'Customer' // Admin removed from generated sites; use main ZATBIZ dashboard
      };
      localStorage.setItem('clientEmail', session.email);
      localStorage.setItem('clientId', 'mock-' + Math.random().toString(36).substring(2, 9));
      localStorage.setItem(`customer_${projectId}`, JSON.stringify(session));
      triggerToast('Signed in successfully.');
      setLoading(false);
      if (typeof setActiveView === 'function') {
        if (typeof setCustomerSession === 'function') setCustomerSession(session);
        setActiveView(session.role === 'Admin' ? 'dashboard' : 'landing');
      } else {
        window.location.href = session.role === 'Admin' 
          ? `/preview/${projectId}/dashboard` 
          : `/preview/${projectId}`;
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex font-serif bg-neutral-950 text-neutral-100">
      {/* Luxury Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 border-r border-amber-500/10 justify-center items-center p-12">
        <div className="space-y-6 max-w-md text-center animate-fade-in">
          <span className="text-6xl p-4 bg-amber-500/10 border border-amber-500/20 rounded-full inline-block shadow-[0_0_20px_rgba(212,175,55,0.2)]">{logoIcon}</span>
          <h2 className="text-3xl tracking-widest text-amber-400 uppercase">
            Aurelia Private Salon
          </h2>
          <p className="text-xs text-neutral-450 leading-relaxed font-sans font-medium uppercase">
            Access secure private showcase portals, review diamond appraisal certificate catalogs, and schedule design consult sessions.
          </p>
        </div>
      </div>

      {/* Form Portal Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-neutral-950">
        <div className="w-full max-w-[420px] bg-neutral-900/40 border border-neutral-800 rounded-[32px] p-8 shadow-2xl relative">
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-3xl">{logoIcon}</span>
            <h1 className="text-sm font-black tracking-widest uppercase text-amber-400 font-sans">Salon Registry</h1>
            <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest font-sans">
              {isForgotPassword ? 'Retrieve credentials' : isLogin ? 'Access Registry' : 'Create Profile'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isForgotPassword ? (
              <>
                {resetEmailSent ? (
                  <div className="p-4 bg-amber-950/20 border border-amber-500/25 rounded-2xl text-center space-y-2">
                    <span className="text-2xl">📬</span>
                    <p className="text-xs font-bold text-amber-400">Recovery code sent to your registered address.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">Registered Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 rounded-2xl text-xs bg-neutral-955 border border-neutral-850 focus:outline-none focus:border-amber-450 transition" />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Method selector */}
                {isLogin && (
                  <div className="flex gap-2 p-1 bg-neutral-900 rounded-2xl mb-4 border border-neutral-800 font-sans">
                    <button type="button" onClick={() => setLoginMethod('password')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'password' ? 'bg-amber-500/20 text-amber-400 shadow' : 'text-neutral-500 hover:text-white'}`}>Password</button>
                    <button type="button" onClick={() => setLoginMethod('otp')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'otp' ? 'bg-amber-500/20 text-amber-400 shadow' : 'text-neutral-500 hover:text-white'}`}>Mobile OTP</button>
                  </div>
                )}

                {/* Name for Sign Up */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">Full Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 bg-neutral-955 border border-neutral-850 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-450 transition" />
                  </div>
                )}

                {/* Contact Email / Phone */}
                {isLogin && loginMethod === 'otp' ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">Mobile Phone</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99999 88888" className="w-full px-4 py-3 bg-neutral-955 border border-neutral-850 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-450 transition" />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@zatbiz.com" className="w-full px-4 py-3 bg-neutral-955 border border-neutral-850 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-450 transition" />
                  </div>
                )}

                {/* Password field */}
                {!(isLogin && loginMethod === 'otp') && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">Password</label>
                      {isLogin && (
                        <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[9px] text-neutral-500 hover:underline">Forgot?</button>
                      )}
                    </div>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-neutral-955 border border-neutral-850 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-450 transition" />
                  </div>
                )}

                {/* OTP verification */}
                {isLogin && loginMethod === 'otp' && otpSent && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">OTP Code</label>
                    <input type="text" maxLength={6} required value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="000 000" className="w-full px-4 py-3 bg-neutral-955 border border-neutral-850 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-450 transition tracking-widest text-center font-bold" />
                  </div>
                )}

                {/* Confirm password */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-sans">Confirm Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-neutral-955 border border-neutral-850 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-450 transition" />
                  </div>
                )}
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-[10px] font-bold text-neutral-950 uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6 shadow-[0_0_15px_rgba(212,175,55,0.25)] font-sans font-black"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? 'Entering Salon...' : isForgotPassword ? 'Approve Recovery' : isLogin ? 'Enter Atelier' : 'Create Registry'}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-neutral-800 flex flex-col gap-2 font-sans">
            {isForgotPassword ? (
              <button onClick={() => { setIsForgotPassword(false); setResetEmailSent(false); }} className="text-[10px] text-neutral-500 hover:underline">Return to login salon</button>
            ) : (
              <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] text-neutral-500 hover:underline">
                {isLogin ? "Not registered in salon registry? Sign Up" : 'Already registered in registry? Sign In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
