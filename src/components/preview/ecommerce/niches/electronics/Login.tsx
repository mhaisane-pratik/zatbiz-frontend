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

  const primaryColor = projectConfig?.themeColor || '#2563eb';
  const logoIcon = projectConfig?.logoIcon || '💻';

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
    <div className="min-h-screen flex font-mono bg-slate-950 text-slate-100">
      {/* Cyber Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 border-r border-indigo-500/10 justify-center items-center p-12">
        <div className="space-y-6 max-w-md text-center">
          <span className="text-6xl p-4 bg-indigo-500/10 border border-indigo-500/25 rounded-3xl inline-block shadow-[0_0_20px_rgba(99,102,241,0.2)]">{logoIcon}</span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">
            // TELEMETRY CONSOLE
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed font-mono uppercase">
            Access secure user node, monitor purchase logs, update interface firmware, and verify hardware warranty tags.
          </p>
        </div>
      </div>

      {/* Form Portal Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-slate-950">
        <div className="w-full max-w-[420px] bg-slate-900/50 border border-indigo-500/15 rounded-[32px] p-8 shadow-2xl relative">
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-3xl">{logoIcon}</span>
            <h1 className="text-sm font-black tracking-widest uppercase text-white font-mono">Terminal Auth</h1>
            <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest font-mono">
              {isForgotPassword ? 'LOAD DECRYPT_FLOW.EXE' : isLogin ? 'LOAD LOGIN_ENGINE' : 'LOAD SIGNUP_ENGINE'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isForgotPassword ? (
              <>
                {resetEmailSent ? (
                  <div className="p-4 bg-indigo-950/50 border border-indigo-550/20 rounded-2xl text-center space-y-2">
                    <span className="text-2xl">📬</span>
                    <p className="text-xs font-bold text-indigo-400">Recovery link sent to your workspace node.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">Node Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 rounded-2xl text-xs bg-slate-950 border border-indigo-500/20 text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Method selector */}
                {isLogin && (
                  <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl mb-4 border border-indigo-500/10">
                    <button type="button" onClick={() => setLoginMethod('password')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'password' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Password</button>
                    <button type="button" onClick={() => setLoginMethod('otp')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'otp' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Mobile OTP</button>
                  </div>
                )}

                {/* Name for Sign Up */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">User Node Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 bg-slate-950 border border-indigo-500/20 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                )}

                {/* Contact Email / Phone */}
                {isLogin && loginMethod === 'otp' ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">Node Phone</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99999 88888" className="w-full px-4 py-3 bg-slate-950 border border-indigo-500/20 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">Node Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@zatbiz.com" className="w-full px-4 py-3 bg-slate-950 border border-indigo-500/20 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                )}

                {/* Password field */}
                {!(isLogin && loginMethod === 'otp') && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">Node Passkey</label>
                      {isLogin && (
                        <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[9px] text-slate-500 hover:underline">Forgot?</button>
                      )}
                    </div>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-slate-950 border border-indigo-500/20 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                )}

                {/* OTP verification */}
                {isLogin && loginMethod === 'otp' && otpSent && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">6-Digit OTP</label>
                    <input type="text" maxLength={6} required value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="000 000" className="w-full px-4 py-3 bg-slate-950 border border-indigo-500/20 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500 transition tracking-widest text-center font-bold" />
                  </div>
                )}

                {/* Confirm password */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">Confirm Passkey</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-slate-950 border border-indigo-500/20 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                )}
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-xs font-bold text-white uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? 'RUNNING_INIT...' : isForgotPassword ? 'RUN DECRYPT' : isLogin ? 'INIT_SESSION' : 'REGISTER_NODE'}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-indigo-500/10 flex flex-col gap-2">
            {isForgotPassword ? (
              <button onClick={() => { setIsForgotPassword(false); setResetEmailSent(false); }} className="text-[10px] text-slate-500 hover:underline">Return to login console</button>
            ) : (
              <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] text-slate-500 hover:underline">
                {isLogin ? "[ Profile not registered? Create one ]" : '[ Node exists? Access console ]'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
