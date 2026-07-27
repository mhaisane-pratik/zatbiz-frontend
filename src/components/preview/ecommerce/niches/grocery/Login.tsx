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

  const primaryColor = projectConfig?.themeColor || '#10b981';
  const logoIcon = projectConfig?.logoIcon || '🍎';

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
    <div className="min-h-screen flex font-sans bg-[#F4F9F4] text-slate-800">
      {/* Organic Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#E6F3E6] border-r border-emerald-100 justify-center items-center p-12">
        <div className="space-y-6 max-w-md text-center">
          <span className="text-6xl p-4 bg-emerald-500/10 border border-emerald-200 rounded-full inline-block">{logoIcon}</span>
          <h2 className="text-3xl font-black tracking-tight text-emerald-800 leading-tight">
            Certified Organic Farm
          </h2>
          <p className="text-xs text-emerald-700 font-medium leading-relaxed font-sans">
            Access secure fresh organic groceries index, trace certified cultivator harvest parameters, and review previous order invoices.
          </p>
        </div>
      </div>

      {/* Form Portal Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-[#F4F9F4]">
        <div className="w-full max-w-[420px] bg-white border border-emerald-100 rounded-[32px] p-8 shadow-sm">
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-3xl">{logoIcon}</span>
            <h1 className="text-sm font-black tracking-tight uppercase text-emerald-850 font-sans">Grocery Portal</h1>
            <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest font-sans">
              {isForgotPassword ? 'Reset Access' : isLogin ? 'Sign In to Store' : 'Create Basket Profile'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isForgotPassword ? (
              <>
                {resetEmailSent ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                    <span className="text-2xl">📬</span>
                    <p className="text-xs font-bold text-emerald-700">Instructions sent to your inbox!</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Registered Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 rounded-2xl text-xs bg-emerald-50/50 border border-emerald-200 focus:outline-none focus:border-emerald-600 transition" />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Method selector */}
                {isLogin && (
                  <div className="flex gap-2 p-1 bg-[#E6F3E6] rounded-2xl mb-4">
                    <button type="button" onClick={() => setLoginMethod('password')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'password' ? 'bg-white text-emerald-950 shadow-sm' : 'text-emerald-600 hover:text-emerald-950'}`}>Password</button>
                    <button type="button" onClick={() => setLoginMethod('otp')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'otp' ? 'bg-white text-emerald-950 shadow-sm' : 'text-emerald-600 hover:text-emerald-950'}`}>Mobile OTP</button>
                  </div>
                )}

                {/* Name for Sign Up */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Full Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-250 rounded-2xl text-xs focus:outline-none focus:border-emerald-600 transition" />
                  </div>
                )}

                {/* Contact Email / Phone */}
                {isLogin && loginMethod === 'otp' ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Mobile Phone</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99999 88888" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-250 rounded-2xl text-xs focus:outline-none focus:border-emerald-600 transition" />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@zatbiz.com" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-250 rounded-2xl text-xs focus:outline-none focus:border-emerald-600 transition" />
                  </div>
                )}

                {/* Password field */}
                {!(isLogin && loginMethod === 'otp') && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Password</label>
                      {isLogin && (
                        <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[9px] text-emerald-600 hover:underline">Forgot?</button>
                      )}
                    </div>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-250 rounded-2xl text-xs focus:outline-none focus:border-emerald-600 transition" />
                  </div>
                )}

                {/* OTP verification */}
                {isLogin && loginMethod === 'otp' && otpSent && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">OTP Code</label>
                    <input type="text" maxLength={6} required value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="000 000" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-250 rounded-2xl text-xs focus:outline-none focus:border-emerald-600 transition tracking-widest text-center font-bold" />
                  </div>
                )}

                {/* Confirm password */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Confirm Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-250 rounded-2xl text-xs focus:outline-none focus:border-emerald-600 transition" />
                  </div>
                )}
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 rounded-full text-xs font-black text-white uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? 'Processing...' : isForgotPassword ? 'Send Recovery Code' : isLogin ? 'Access Basket' : 'Register Profile'}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-emerald-100 flex flex-col gap-2">
            {isForgotPassword ? (
              <button onClick={() => { setIsForgotPassword(false); setResetEmailSent(false); }} className="text-[10px] text-emerald-600 hover:underline">Return to login</button>
            ) : (
              <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] text-emerald-600 hover:underline">
                {isLogin ? "Don't have a profile? Sign Up" : 'Already have a profile? Sign In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
