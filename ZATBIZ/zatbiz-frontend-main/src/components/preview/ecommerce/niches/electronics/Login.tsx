'use client';
import React, { useState } from 'react';

export default function Login({ projectId, projectConfig, setCustomerSession, setActiveView, addToast, isLogin: initialIsLogin = true, handleLoginSubmit }: any) {
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

  // Light / Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(projectConfig?.selectedThemeData?.bgColor !== '#ffffff');

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
        role: email.toLowerCase() === 'admin@gmail.com' ? 'Admin' : 'Customer'
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

  const bgClasses = isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800';
  const cardClasses = isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-xl';
  const inputClasses = isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-slate-550' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400';
  const labelClasses = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${bgClasses}`}>
      {/* Dynamic Graphic Banner Column */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-white/5 justify-center items-center p-12">
        <div className={`absolute inset-0 bg-gradient-to-tr ${primaryColor === '#6366f1' ? 'from-indigo-950/40 via-slate-900/10' : 'from-blue-950/40 via-indigo-900/10 to-transparent'} to-transparent`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        
        <div className="relative z-10 space-y-6 max-w-md text-center">
          <span className="text-6xl p-5 bg-white/5 border border-white/10 rounded-3xl inline-block shadow-inner backdrop-blur-md animate-bounce">{logoIcon}</span>
          <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
            Next-Gen Technology Hub
          </h2>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Access top gadgets, custom gaming laptops, smart sensors, and track hardware warranties on the fly.
          </p>
          <div className="pt-4 flex justify-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>✓ Gaming Gear</span>
            <span>•</span>
            <span>✓ Tech Specs</span>
            <span>•</span>
            <span>✓ Extended Warranty</span>
          </div>
        </div>
      </div>

      {/* Auth Portal Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 relative">
        {/* Dark/Light toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer text-xs font-bold"
        >
          {isDarkMode ? '🌞 Light Theme' : '🌙 Dark Theme'}
        </button>

        <div className={`w-full max-w-[420px] rounded-[32px] p-8 border backdrop-blur-2xl transition duration-300 ${cardClasses}`}>
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-3xl">{logoIcon}</span>
            <h1 className="text-sm font-black tracking-tight uppercase">{projectConfig?.projectName || 'Electronics & Gadgets'} Portal</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              {isForgotPassword ? 'Reset Access Credential' : isLogin ? 'Sign In to Store' : 'Create Customer Account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isForgotPassword ? (
              <>
                {resetEmailSent ? (
                  <div className="p-4 bg-green-500/10 border border-green-500/25 rounded-2xl text-center space-y-2">
                    <span className="text-2xl">📬</span>
                    <p className="text-xs font-bold text-green-400">Reset instructions dispatched to your inbox!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>Registered Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition ${inputClasses}`} style={email ? { '--tw-ring-color': primaryColor } as any : {}} />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Mode Selector for Login */}
                {isLogin && (
                  <div className="flex gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl mb-4">
                    <button type="button" onClick={() => setLoginMethod('password')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'password' ? 'bg-white/10 text-white' : 'text-slate-455 hover:text-white'}`}>Password</button>
                    <button type="button" onClick={() => setLoginMethod('otp')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-xl transition ${loginMethod === 'otp' ? 'bg-white/10 text-white' : 'text-slate-455 hover:text-white'}`}>Mobile OTP</button>
                  </div>
                )}

                {/* Sign Up Fields */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>Full Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition ${inputClasses}`} />
                  </div>
                )}

                {/* Main Auth Identifier field */}
                {isLogin && loginMethod === 'otp' ? (
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>Mobile Phone Number</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99999 88888" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition ${inputClasses}`} />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@zatbiz.com" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition ${inputClasses}`} />
                  </div>
                )}

                {/* Password field */}
                {!(isLogin && loginMethod === 'otp') && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>Password</label>
                      {isLogin && (
                        <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[10px] text-slate-500 hover:underline">Forgot?</button>
                      )}
                    </div>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition ${inputClasses}`} />
                  </div>
                )}

                {/* OTP Passcode Code input */}
                {isLogin && loginMethod === 'otp' && otpSent && (
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>6-Digit Verification OTP Code</label>
                    <input type="text" maxLength={6} required value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="000 000" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition tracking-widest text-center font-bold ${inputClasses}`} />
                  </div>
                )}

                {/* Confirm Password (only for Sign Up) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-wider ${labelClasses}`}>Confirm Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 border transition ${inputClasses}`} />
                  </div>
                )}
              </>
            )}

            {/* Submit Trigger Action */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-xs font-black text-white uppercase tracking-wider hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6`}
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? (
                <>
                  <span className="h-4.5 w-4.5 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                  Processing...
                </>
              ) : isForgotPassword ? (
                resetEmailSent ? 'Back to Sign In' : 'Dispatch Recovery Code'
              ) : isLogin ? (
                loginMethod === 'otp' ? (otpSent ? 'Verify & Access Account' : 'Send Verification OTP') : 'Sign In'
              ) : 'Register Account'}
            </button>
          </form>

          {/* Toggle Form Mode Links */}
          <div className="text-center mt-6 pt-4 border-t border-white/5 flex flex-col gap-2">
            {isForgotPassword ? (
              <button onClick={() => { setIsForgotPassword(false); setResetEmailSent(false); }} className="text-[10px] text-slate-400 hover:underline">Return to login portal screen</button>
            ) : (
              <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] text-slate-400 hover:underline">
                {isLogin ? "Don't have a merchant/customer profile? Sign Up" : 'Already possess a portal workspace? Sign In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
