'use client';

import { useState, useEffect } from 'react';
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

  // Collapsible configuration panel states
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [apiUrlInput, setApiUrlInput] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zatbizApiEndpoint');
      if (saved) {
        setApiUrlInput(saved);
      } else if (process.env.NEXT_PUBLIC_API_URL) {
        setApiUrlInput(process.env.NEXT_PUBLIC_API_URL);
      } else if (window.location.hostname !== 'localhost') {
        setApiUrlInput('https://zatbiz-backend.onrender.com');
      } else {
        setApiUrlInput('http://localhost:8080');
      }
    }
  }, []);

  const getApiBaseUrl = () => {
    if (apiUrlInput) {
      return apiUrlInput.replace(/\/$/, '');
    }
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
    }
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zatbizApiEndpoint');
      if (saved) {
        return saved.replace(/\/$/, '');
      }
      if (window.location.hostname !== 'localhost') {
        return 'https://zatbiz-backend.onrender.com';
      }
    }
    return 'http://localhost:8080';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Persist configured API URL to localStorage
    const trimmedUrl = apiUrlInput.trim();
    if (typeof window !== 'undefined') {
      localStorage.setItem('zatbizApiEndpoint', trimmedUrl);
    }

    const baseUrl = getApiBaseUrl();
    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const normalizedEmail = email.trim().toLowerCase();
    const payload = isRegisterMode 
      ? { username: username.trim(), email: normalizedEmail, password }
      : { email: normalizedEmail, password };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
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
      clearTimeout(timeoutId);
      console.error('Auth error:', err);
      
      // Extract error message safely
      const errMsg = err && typeof err === 'object' && 'message' in err ? err.message : String(err || '');
      
      // Determine if this is a network/fetch failure
      const isNetworkError = 
        !err ||
        err.name === 'AbortError' ||
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
        console.warn('Backend server is offline or unreachable. Falling back to local offline sandbox session.');
        
        localStorage.setItem('authToken', 'mock-token-xyz');
        localStorage.setItem('userEmail', normalizedEmail);
        localStorage.setItem('userName', isRegisterMode ? username.trim() : (normalizedEmail.split('@')[0] || 'Demo User'));
        localStorage.setItem('zatbiz_offline_mode', 'true');
        
        // Seed default projects if none exist
        const existingProjects = localStorage.getItem('zatbiz_offline_projects');
        if (!existingProjects || JSON.parse(existingProjects).length === 0) {
          const defaultProjects = [
            {
              id: 1001,
              name: 'My Gourmet Bistro',
              description: 'A premium fine dining restaurant website template built with custom food menu items and reservation calendars.',
              blocksJson: '[]',
              status: 'Active',
              updatedAt: new Date().toISOString()
            }
          ];
          localStorage.setItem('zatbiz_offline_projects', JSON.stringify(defaultProjects));
        }

        router.push('/dashboard');
      } else {
        setError(errMsg || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans bg-[#020617] selection:bg-indigo-500 selection:text-white">
      {/* Glow Background Elements to match screenshot */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#1e1b4b_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#4c1d95_0%,transparent_50%)] z-0 pointer-events-none" />
      
      {/* Ambient Glows */}
      <div className="absolute top-[10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-600/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full bg-fuchsia-600/25 blur-[160px] pointer-events-none" />
      
      {/* Main Container Card (The Glass Panel) */}
      <div className="w-full max-w-[1100px] rounded-[36px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row p-6 md:p-8 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Cropped Illustration from A_more_advanced_and_modern.jpeg */}
        <div className="flex-1 relative hidden lg:block rounded-2xl overflow-hidden min-h-[500px]">
          <img
            src="/A_more_advanced_and_modern.jpeg"
            alt="Zatbiz E-commerce Illustration"
            className="absolute inset-0 w-[200%] h-full object-cover object-left"
            style={{ maxWidth: 'none' }}
          />
          {/* Brand Logo Header overlay */}
          <div className="absolute top-6 left-6 z-20 select-none">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/[0.04] backdrop-blur-md rounded-xl text-white font-extrabold text-lg shadow-sm">
              <svg className="w-4 h-4 text-white rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span>Zatbiz</span>
            </div>
          </div>
        </div>

        {/* Right Side: The overlaid secondary Glass Card */}
        <div className="w-full lg:max-w-[480px] rounded-[28px] border border-white/15 bg-white/[0.05] backdrop-blur-xl shadow-2xl p-6 md:p-10 flex flex-col justify-between min-h-[540px] relative z-20">
          
          {/* Welcome Text */}
          <div className="flex flex-col items-center lg:items-start select-none">
            <p className="font-bold text-[10px] tracking-[0.2em] text-slate-455 uppercase">
              {isRegisterMode ? 'Get Started' : 'Welcome Back!'}
            </p>
            <h2 className="font-extrabold text-2xl tracking-tight text-white mt-1">
              {isRegisterMode ? 'Create your store' : 'Log in to your store'}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4.5 mt-6 flex-grow flex flex-col justify-center">
            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-350 rounded-2xl text-xs font-semibold text-center select-none">
                ⚠️ {error}
              </div>
            )}

            {/* Username (Only for Registration) */}
            {isRegisterMode && (
              <div className="space-y-1.5 text-left">
                <label className="block font-bold text-xs text-slate-355">
                  Primary Username
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
                    className="w-full rounded-2xl pl-11 pr-4 py-3 bg-white/[0.07] border border-white/10 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-primary/40 focus:bg-white/[0.12]"
                    placeholder="Enter username"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5 text-left">
              <label className="block font-bold text-xs text-slate-355">
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
                  className="w-full rounded-2xl pl-11 pr-10 py-3.5 bg-white/[0.07] border border-white/10 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-primary/40 focus:bg-white/[0.12]"
                  placeholder="demo@zatbiz.com"
                />
                {email.includes('@') && email.includes('.') && (
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <span className="bg-emerald-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[8px] font-black shadow-sm">✓</span>
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="block font-bold text-xs text-slate-355">
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
                  className="w-full rounded-2xl pl-11 pr-11 py-3.5 bg-white/[0.07] border border-white/10 text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-primary/40 focus:bg-white/[0.12]"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white cursor-pointer"
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
                <div className="text-right pt-1.5">
                  <a href="#" className="text-xs text-slate-400 hover:text-white transition">
                    Forgot Password?
                  </a>
                </div>
              )}
            </div>

            {/* Collapsible API Endpoint Configuration for Deployed Environments */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="text-[10px] text-slate-400 hover:text-white font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer bg-transparent border-0 outline-none"
              >
                <i className={`fa-solid ${isConfigOpen ? 'fa-chevron-down' : 'fa-cog'} text-[10px]`} />
                <span>API Server Settings {apiUrlInput !== 'http://localhost:8080' && apiUrlInput !== '' && ' (Custom)'}</span>
              </button>

              {isConfigOpen && (
                <div className="mt-2.5 p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl space-y-2 text-left animate-fade-in">
                  <label className="block font-bold text-[9px] text-slate-400 uppercase tracking-widest">
                    Spring Boot API Endpoint
                  </label>
                  <input
                    type="url"
                    required
                    value={apiUrlInput}
                    onChange={(e) => setApiUrlInput(e.target.value)}
                    className="w-full rounded-xl px-3 py-2 bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none transition focus:ring-1 focus:ring-primary/40 focus:bg-white/[0.08]"
                    placeholder="e.g. https://zatbiz-backend.onrender.com"
                  />
                  <p className="text-[9px] text-slate-500 leading-relaxed font-semibold">
                    Set this to your deployed Spring Boot URL (e.g. Render) to load database website layouts.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-650 py-4 px-4 text-base font-bold text-white shadow-lg hover:opacity-95 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <span>{loading ? (isRegisterMode ? 'Registering...' : 'Logging in...') : (isRegisterMode ? 'Create store' : 'Log in')}</span>
            </button>
          </form>

          {/* Social Divider */}
          <div className="mt-6 select-none">
            <div className="relative flex py-1.5 items-center">
              <div className="flex-grow border-t border-white/10" />
              <span className="flex-shrink mx-3 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                Or sign in with
              </span>
              <div className="flex-grow border-t border-white/10" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center w-12 h-11 border border-white/10 hover:bg-white/[0.08] bg-white/[0.04] rounded-xl transition cursor-pointer shadow-sm text-white"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="flex items-center justify-center w-12 h-11 border border-white/10 hover:bg-white/[0.08] bg-white/[0.04] rounded-xl transition cursor-pointer shadow-sm text-white"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Card Footer Link */}
          <div className="mt-6 text-center select-none">
            <p className="font-bold text-xs text-slate-400">
              {isRegisterMode ? 'Already have a store?' : 'New to Zatbiz?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError(null);
                }}
                className="text-[#3b82f6] font-bold hover:underline inline-flex items-center gap-0.5 ml-0.5 cursor-pointer bg-transparent border-none outline-none"
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
