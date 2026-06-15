'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-white relative">
      {/* Background Glowing Blobs (Left column background soft decoration) */}
      <div className="glowing-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 z-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full shadow-[0_0_8px_#4f46e5]" />
              Primezat
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Welcome back</h1>
            <p className="text-sm text-slate-500 font-medium">Enter your credentials to enter the workspace portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                required 
                defaultValue="demo@primezat.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition" 
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required 
                defaultValue="password123"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition" 
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                defaultChecked 
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-500 select-none cursor-pointer">
                Keep me signed in
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:translate-y-[-1px] transition duration-200 mt-2 cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-8 font-medium">
            Don&apos;t have an account? <Link href="/dashboard" className="text-indigo-600 hover:underline font-bold">Create one free</Link>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Illustration Panel */}
      <div className="hidden md:flex flex-col items-center justify-center p-16 bg-slate-50 border-l border-slate-100 relative overflow-hidden">
        {/* Subtle background abstract shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-slate-50 to-purple-50/50 pointer-events-none" />
        
        <div className="z-10 max-w-md text-center">
          <img 
            src="/images/login_illustration.png" 
            alt="Website Builder Vector Illustration" 
            className="w-full h-auto max-h-[360px] object-contain mb-8 hover:scale-105 transition-transform duration-500"
          />
          <h2 className="text-xl font-extrabold text-slate-900 mb-2 font-heading tracking-tight">Design Without Coding</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            Create layouts, structure landing grids, select color preset palettes, and synchronize instantly to your database with visual click operations.
          </p>
        </div>
      </div>
    </div>
  );
}
