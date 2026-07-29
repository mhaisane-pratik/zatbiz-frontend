'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@zatbiz.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // JWT Auth states
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zatbizApiEndpoint');
      if (saved) {
        return saved.replace(/\/$/, '');
      }
    }
    return 'http://localhost:8080';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const baseUrl = getApiBaseUrl();
    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const normalizedEmail = email.trim().toLowerCase();
    const payload = isRegisterMode 
      ? { username: username.trim(), email: normalizedEmail, password }
      : { email: normalizedEmail, password };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed!');
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', data.email || normalizedEmail);
        localStorage.setItem('userName', data.username || username.trim());
        localStorage.removeItem('zatbiz_offline_projects');
        router.push('/dashboard');
      } else {
        throw new Error('No authentication token received.');
      }
    } catch (err: any) {
      // Extract error message safely
      const errMsg = err && typeof err === 'object' && 'message' in err ? err.message : String(err || '');
      
      // Determine if this is a network/fetch failure
      const isNetworkError = 
        !err ||
        err instanceof TypeError ||
        (typeof errMsg === 'string' && (
          errMsg.toLowerCase().includes('failed to fetch') ||
          errMsg.toLowerCase().includes('fetch failed') ||
          errMsg.toLowerCase().includes('networkerror') ||
          errMsg.toLowerCase().includes('load failed') ||
          errMsg.toLowerCase().includes('failed to load') ||
          errMsg.toLowerCase().includes('econnrefused') ||
          errMsg.toLowerCase().includes('connection refused')
        ));

      if (isNetworkError) {
        console.warn('Network error: Live backend API server is offline or unreachable. Prompting user to proceed with Offline Demo Mode.');
        const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
        setError(
          isLocal 
            ? 'Cannot reach the Spring Boot API. Start the backend on http://localhost:8080 before logging in so projects are saved to the database.'
            : 'Cannot reach the live backend API server (sleeping or offline). You can log in using Offline Demo Mode below to continue.'
        );
      } else {
        console.error('Auth error:', err);
        setError(errMsg || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans bg-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Ambient background */}
      <div className="absolute top-[-10%] left-[5%] w-96 h-96 rounded-full bg-indigo-300/30 blur-3xl pointer-events-none animate-blob-complex" />
      <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-fuchsia-300/25 blur-3xl pointer-events-none animate-blob-complex" style={{ animationDelay: '-8s' }} />
      <div className="absolute top-[40%] left-[40%] w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none animate-blob-complex" style={{ animationDelay: '-14s' }} />

      {/* Single Unified Container Card */}
      <div className="w-full max-w-[1080px] bg-white/80 backdrop-blur-2xl rounded-[36px] border border-white/60 shadow-[0_35px_80px_-20px_rgba(49,46,129,0.35)] grid lg:grid-cols-2 overflow-hidden relative z-10">

        {/* Left Side: Midnight slate branded panel */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-white">
          {/* Accent glow orbs */}
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-violet-600/25 blur-3xl animate-blob-complex" />
          <div className="absolute bottom-[-6rem] -left-16 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl animate-blob-complex" style={{ animationDelay: '-6s' }} />
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:36px_36px]" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-500/20 backdrop-blur flex items-center justify-center font-extrabold text-lg ring-1 ring-violet-400/40 text-violet-200">Z</div>
            <span className="font-extrabold text-xl tracking-tight">Zatbiz</span>
          </div>

          <div className="relative z-10">
            <style>{`
              @keyframes zb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
              @keyframes zb-float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
              @keyframes zb-dash { to { stroke-dashoffset: 0; } }
              @keyframes zb-grow { 0%,100%{transform:scaleY(0.55)} 50%{transform:scaleY(1)} }
              @keyframes zb-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(1.35)} }
              @keyframes zb-shine { 0%{transform:translateX(-60px)} 100%{transform:translateX(300px)} }
              .zb-win{animation:zb-float 5s ease-in-out infinite}
              .zb-phone{animation:zb-float2 4s ease-in-out infinite;transform-origin:center}
              .zb-line{stroke-dasharray:260;stroke-dashoffset:260;animation:zb-dash 2.2s ease-out forwards}
              .zb-bar{transform-origin:bottom;animation:zb-grow 2.6s ease-in-out infinite}
              .zb-dot{transform-origin:center;animation:zb-pulse 1.8s ease-in-out infinite}
              .zb-shine{animation:zb-shine 3.2s ease-in-out infinite}
            `}</style>
            <h1 className="text-2xl font-bold leading-[1.15] tracking-tight">
              Your business online, beautifully.
            </h1>
            <p className="mt-2 text-[13px] leading-6 text-white/70">
              Sign in to manage everything in one place.
            </p>

            {/* Modern animated illustration */}
            <div className="mt-5 rounded-2xl bg-violet-500/[0.07] backdrop-blur-md border border-violet-400/20 ring-1 ring-inset ring-white/5 p-4 overflow-hidden relative">
              <div className="zb-shine absolute top-0 -left-16 w-16 h-full bg-violet-300/10 blur-xl pointer-events-none" />
              <svg viewBox="0 0 360 200" className="w-full max-h-48 drop-shadow-xl" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zatbiz live dashboard">
                {/* browser window (floats) */}
                <g className="zb-win">
                  <rect x="16" y="18" width="250" height="164" rx="12" fill="#ffffff" />
                  <rect x="16" y="18" width="250" height="24" rx="12" fill="#eef0ff" />
                  <circle cx="32" cy="30" r="3.5" fill="#f87171" />
                  <circle cx="44" cy="30" r="3.5" fill="#fbbf24" />
                  <circle cx="56" cy="30" r="3.5" fill="#34d399" />
                  {/* chart card */}
                  <rect x="30" y="52" width="138" height="76" rx="9" fill="#f4f2ff" />
                  <polyline className="zb-line" points="42,110 66,92 90,100 114,74 138,84 156,60" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle className="zb-dot" cx="156" cy="60" r="4" fill="#7c3aed" />
                  {/* stat card */}
                  <rect x="178" y="52" width="72" height="35" rx="8" fill="#ede9fe" />
                  <rect x="188" y="61" width="40" height="8" rx="4" fill="#a78bfa" />
                  <rect x="188" y="74" width="26" height="6" rx="3" fill="#c4b5fd" />
                  <rect x="178" y="93" width="72" height="35" rx="8" fill="#e0f2fe" />
                  <rect x="188" y="102" width="40" height="8" rx="4" fill="#38bdf8" />
                  <rect x="188" y="115" width="26" height="6" rx="3" fill="#7dd3fc" />
                  {/* animated bars */}
                  <rect className="zb-bar" x="42"  y="140" width="14" height="30" rx="3" fill="#a5b4fc" style={{ animationDelay: '0s' }} />
                  <rect className="zb-bar" x="64"  y="140" width="14" height="30" rx="3" fill="#c4b5fd" style={{ animationDelay: '.2s' }} />
                  <rect className="zb-bar" x="86"  y="140" width="14" height="30" rx="3" fill="#a5b4fc" style={{ animationDelay: '.4s' }} />
                  <rect className="zb-bar" x="108" y="140" width="14" height="30" rx="3" fill="#c4b5fd" style={{ animationDelay: '.6s' }} />
                  <rect className="zb-bar" x="130" y="140" width="14" height="30" rx="3" fill="#a5b4fc" style={{ animationDelay: '.8s' }} />
                </g>
                {/* phone (floats opposite) */}
                <g className="zb-phone">
                  <rect x="278" y="66" width="68" height="118" rx="14" fill="#0f172a" />
                  <rect x="285" y="74" width="54" height="102" rx="8" fill="#22d3ee" />
                  <rect x="294" y="86" width="36" height="8" rx="4" fill="#ffffff" opacity="0.9" />
                  <rect x="294" y="100" width="24" height="6" rx="3" fill="#ffffff" opacity="0.6" />
                  <rect x="294" y="150" width="36" height="16" rx="8" fill="#ffffff" opacity="0.85" />
                </g>
              </svg>
            </div>

            {/* Feature list (minimal) */}
            <div className="mt-5 space-y-2.5">
              {[
                { title: 'Secure OTP verification', d: 'M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z' },
                { title: 'Email & mobile sign-in', d: 'M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm0 2l8 5 8-5' },
                { title: 'Publish in under 10 minutes', d: 'M15 4a4 4 0 11-3.4 6.1L5 16.7V19h2.3l6.6-6.6A4 4 0 0115 4z' },
              ].map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-400/25 text-violet-300 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d={f.d} />
                    </svg>
                  </span>
                  <span className="text-[13px] font-medium text-white/85">{f.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-6 pt-5">
            {[
              { value: '12k+', label: 'Stores live' },
              { value: '99.9%', label: 'Uptime' },
              { value: '4.9/5', label: 'Rating' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Form container */}
        <div className="w-full bg-white p-7 md:p-10 flex flex-col justify-center min-h-[560px]">

          {/* Logo and Brand */}
          <div className="flex flex-col items-center lg:items-start select-none">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg">Z</div>
              <span className="font-extrabold text-xl text-slate-800 tracking-tight">Zatbiz</span>
            </div>

            <h2 className="font-black text-3xl tracking-tight text-slate-900 mt-4 lg:mt-0 leading-tight">
              {isRegisterMode ? 'Create your store' : 'Welcome back'}
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {isRegisterMode ? 'Set up your new store in a minute.' : 'Log in to pick up right where you left off.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 mt-6 flex-grow flex flex-col justify-center">
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-150 text-rose-600 rounded-2xl text-xs font-semibold text-center select-none space-y-2.5">
                <div>⚠️ {error}</div>
                {error.includes('Cannot reach') && (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('authToken', 'offline-demo-token');
                      localStorage.setItem('userEmail', email.trim() || 'demo@zatbiz.com');
                      localStorage.setItem('userName', username.trim() || 'Offline Demo');
                      router.push('/dashboard');
                    }}
                    className="w-full mt-2.5 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition border-none cursor-pointer shadow-sm"
                  >
                    Proceed in Offline Demo Mode
                  </button>
                )}
              </div>
            )}

            {/* Username (Only for Registration) */}
            {isRegisterMode && (
              <div className="space-y-1.5 text-left">
                <label className="block font-extrabold text-[10px] text-slate-450 uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="Enter username"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5 text-left">
              <label className="block font-extrabold text-[10px] text-slate-450 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  placeholder="Enter your email"
                />
                {email.includes('@') && email.includes('.') && (
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <span className="bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-black shadow-sm">✓</span>
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="block font-extrabold text-[10px] text-slate-455 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {!isRegisterMode && (
                <div className="text-right pt-1">
                  <a href="#" className="text-xs text-indigo-650 hover:text-indigo-850 font-bold transition">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full mt-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 py-3.5 px-4 text-sm font-black text-white shadow-lg shadow-indigo-600/25 transition-all hover:shadow-xl hover:shadow-fuchsia-600/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 border-none"
            >
              <span>{loading ? (isRegisterMode ? 'Registering...' : 'Logging in...') : (isRegisterMode ? 'Create store' : 'Login')}</span>
              {!loading && <span className="transition-transform group-hover:translate-x-1">➔</span>}
            </button>

            {!isRegisterMode && (
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('authToken', 'offline-demo-token');
                  localStorage.setItem('userEmail', email.trim() || 'demo@zatbiz.com');
                  localStorage.setItem('userName', username.trim() || 'Offline Demo');
                  router.push('/dashboard');
                }}
                className="w-full mt-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 py-3.5 px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Proceed in Offline Demo Mode
              </button>
            )}
          </form>

          {/* Social Divider */}
          <div className="mt-6 select-none">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                or continue with
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {/* Google */}
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 bg-white rounded-2xl transition-all cursor-pointer text-slate-700 text-xs font-bold shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 bg-white rounded-2xl transition-all cursor-pointer text-slate-700 text-xs font-bold shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Card Footer Link */}
          <div className="mt-6 text-center select-none">
            <p className="font-bold text-xs text-slate-400">
              {isRegisterMode ? 'Already have a store?' : 'Don\'t have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError(null);
                }}
                className="text-indigo-650 font-extrabold hover:underline inline-flex items-center gap-0.5 ml-0.5 cursor-pointer bg-transparent border-none outline-none"
              >
                {isRegisterMode ? 'Log in' : 'Create your store'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}