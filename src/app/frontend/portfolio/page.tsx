'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  category: 'code' | 'design';
  desc: string;
  tags: string[];
  image: string;
}

export default function PortfolioTemplate() {
  const [filterCat, setFilterCat] = useState<'all' | 'code' | 'design'>('all');
  const [contactSuccess, setContactSuccess] = useState(false);

  const projects: Project[] = [
    {
      id: 'proj1',
      name: 'Dynamic Canvas Website Builder',
      category: 'code',
      desc: 'An AI-powered drag-and-drop web designer utilizing WebGL shaders and real-time React render engines.',
      tags: ['React', 'ThreeJS', 'Tailwind', 'Nextjs'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'proj2',
      name: 'Glassmorphic UI Design System',
      category: 'design',
      desc: 'A premium layout kit focusing on low-opacity borders, custom soft glowing ambient backdrops, and heavy font structures.',
      tags: ['Figma', 'System Design', 'Brand Identity'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'proj3',
      name: 'Real-time Telemetry Dashboard',
      category: 'code',
      desc: 'A high-performance metrics dashboard showing serverless database latency charts with low-latency updates.',
      tags: ['TypeScript', 'WebSocket', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const skills = [
    { name: 'TypeScript / React', progress: 95 },
    { name: 'UI / UX Design (Figma)', progress: 90 },
    { name: 'WebGL & Vector Shader Math', progress: 80 },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <div className="bg-[#08070b] text-[#dcd7e0] min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-150px] w-[500px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(109, 40, 217, 0.1) 0%, transparent 100%)" }}></div>
      <div className="absolute bottom-[20%] right-[-150px] w-[500px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 100%)" }}></div>

      <nav className="fixed top-0 w-full z-50 bg-[#08070b]/80 backdrop-blur-md border-b border-[#2d2a33]">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-violet-400 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
            <span className="text-lg font-bold tracking-tight text-white font-serif italic">Alex.Code</span>
          </div>
          <a href="#contact" className="bg-transparent border border-violet-400/40 hover:border-violet-400 text-violet-400 hover:text-white px-5 py-2 rounded transition-all text-xs font-semibold uppercase tracking-wider">
            Let&apos;s Connect
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 flex flex-col items-center text-center relative z-10 min-h-[80vh] justify-center">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#6d28d9]/10 px-4 py-1 rounded border border-[#6d28d9]/35">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Product Architect & Developer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            I Build High-Performance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">Interactive Canvas UI</span>
          </h1>
          <p className="text-stone-400 font-light leading-relaxed max-w-xl mx-auto text-base">
            Specialized in building complex frontend designs, custom rendering pipelines, and fully responsive layouts that bridge the gap between design and clean code.
          </p>
          <div className="flex gap-4 pt-4 justify-center">
            <a href="#projects" className="bg-violet-600 hover:bg-violet-750 bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded shadow-lg shadow-violet-900/35 transition-all">
              See Projects
            </a>
            <a href="#skills" className="bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 font-semibold text-sm px-6 py-3 rounded transition-all">
              Technical Stack
            </a>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="bg-[#0f0e15] py-24 px-6 border-y border-[#2d2a33]/60">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold">Selected Works</span>
            <h2 className="text-3xl font-bold text-white uppercase">Featured Projects</h2>
            <div className="w-12 h-0.5 bg-violet-400 mx-auto"></div>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            {['all', 'code', 'design'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilterCat(cat as any)}
                className={`px-5 py-2 text-xs font-bold uppercase transition-all border ${
                  filterCat === cat ? 'bg-violet-600 text-white border-violet-600 shadow-md' : 'bg-transparent text-stone-400 hover:border-stone-600 border-[#2d2a33]'
                }`}
              >
                {cat === 'all' ? 'All projects' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects
              .filter(p => filterCat === 'all' || p.category === filterCat)
              .map(p => (
                <div key={p.id} className="bg-[#08070b] border border-[#2d2a33] rounded overflow-hidden flex flex-col justify-between hover:border-violet-400/25 transition-all duration-300">
                  <div className="aspect-[4/3] bg-stone-900 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map(t => (
                          <span key={t} className="text-[9px] bg-violet-950/40 text-violet-300 border border-violet-900/30 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                      <h4 className="font-bold text-base text-white leading-tight">{p.name}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed font-light">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Skills Progress Visualizers */}
      <section id="skills" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-[#0f0e15] border border-[#2d2a33] rounded p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold">Competence Details</span>
              <h2 className="text-3xl font-bold text-white uppercase leading-tight">Technical Skills</h2>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                A brief breakdown of my core technical proficiencies. Specialized in implementing low-latency user interfaces and custom dynamic styling.
              </p>
            </div>

            <div className="space-y-6">
              {skills.map(s => (
                <div key={s.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-stone-300">
                    <span>{s.name}</span>
                    <span className="text-violet-400">{s.progress}%</span>
                  </div>
                  <div className="w-full bg-[#08070b] border border-[#2d2a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full rounded-full transition-all duration-1000" style={{ width: `${s.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Message Form */}
      <section id="contact" className="max-w-4xl mx-auto w-full px-6 py-20 border-t border-[#2d2a33]">
        <div className="bg-[#0f0e15] border border-[#2d2a33] shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold">Start Conversation</span>
            <h2 className="text-3xl font-bold text-white leading-tight">Work Collaboration</h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Have a startup project in mind, or looking to add a remote frontend engineer to your developer squad? Drop a message request.
            </p>
            <div className="space-y-2 text-xs text-stone-400 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-violet-400 text-sm">mail</span> contact@alexcode.io</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-violet-400 text-sm">schedule</span> Average response: 4 hours</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Email Address</label>
              <input type="email" required placeholder="name@company.com" className="w-full bg-[#08070b] border border-[#2d2a33] rounded py-2 px-3 text-sm focus:outline-none focus:border-violet-450 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Brief Description</label>
              <textarea required rows={3} placeholder="Project specs or roles..." className="w-full bg-[#08070b] border border-[#2d2a33] rounded py-2 px-3 text-sm focus:outline-none focus:border-violet-450 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-white" />
            </div>
            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Submit Message
            </button>
            {contactSuccess && (
              <p className="text-center text-xs text-emerald-400 font-semibold pt-1">
                ✓ Message sent! I will email you back shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#08070b] border-t border-[#2d2a33] py-12 w-full mt-auto text-sm text-stone-605 text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-serif italic font-bold text-white tracking-wide text-base">Alex.Code</h4>
            <p className="text-xs text-stone-600 mt-1">© 2026 Alex.Code Portfolio. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
