'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function EventTemplate() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: '98', hours: '00', minutes: '00', seconds: '00' });
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 98);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleAccordion = (slotId: string) => {
    setActiveSlot(activeSlot === slotId ? null : slotId);
  };

  const handleBookTicket = (tier: string) => {
    setTicketSuccess(`✓ ${tier} pass registration request submitted. Check your inbox for pass details!`);
    setTimeout(() => {
      setTicketSuccess(null);
    }, 6000);
  };

  return (
    <div className="bg-[#06050c] text-stone-300 font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div 
        className="absolute top-[5%] left-[5%] w-[600px] h-[600px] rounded-full blur-[100px] -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108, 56, 247, 0.15) 0%, rgba(255, 0, 127, 0.05) 50%, transparent 100%)" }}
      ></div>
      <div 
        className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] rounded-full blur-[90px] -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108, 56, 247, 0.15) 0%, rgba(255, 0, 127, 0.05) 50%, transparent 100%)" }}
      ></div>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#06050c]/85 backdrop-blur-md border-b border-[#221e3b]/60 font-tech">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-[#00f0ff] hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-widest font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00f0ff] animate-pulse"></div>
            <span className="text-xl font-bold tracking-wider text-white">SUMMIT <span className="text-[#ff007f]">2026</span></span>
          </div>
          <a href="#passes" className="bg-gradient-to-r from-[#6c38f7] to-[#ff007f] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:opacity-90 shadow-lg shadow-[#6c38f7]/20 transition-all">
            Get Tickets
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 flex flex-col items-center text-center relative z-10 min-h-[85vh] justify-center">
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#6c38f7]/10 px-4 py-1.5 rounded-full border border-[#6c38f7]/30">
            <span className="w-2 h-2 rounded-full bg-[#ff007f]"></span>
            <span className="text-xs font-semibold text-[#00f0ff] uppercase tracking-wider">Oct 12-14, 2026 • Silicon Valley & Virtual</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none uppercase">
            Shaping the Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff007f]">
              Decade of Web Science
            </span>
          </h1>
          <p className="text-stone-400 font-light leading-relaxed max-w-2xl mx-auto text-base">
            Join 5,000+ engineers, product architects, and designers to deep dive into AI APIs, decentralized architectures, and dynamic micro-frontends.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto pt-6">
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl p-4 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-[#00f0ff]">{timeLeft.days}</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 font-medium">Days</span>
            </div>
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl p-4 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-[#ff007f]">{timeLeft.hours}</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 font-medium">Hours</span>
            </div>
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl p-4 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 font-medium">Mins</span>
            </div>
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl p-4 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-[#00f0ff] animate-pulse">{timeLeft.seconds}</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 font-medium">Secs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
            <a href="#passes" className="bg-gradient-to-r from-[#6c38f7] to-[#ff007f] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-90 shadow-lg shadow-[#6c38f7]/30 transition-all">
              Register Now
            </a>
            <a href="#schedule" className="text-white border-2 border-transparent px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all" style={{ background: "linear-gradient(#06050c, #06050c) padding-box, linear-gradient(to right, #00f0ff, #ff007f) border-box" }}>
              Explore Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="border-y border-[#221e3b]/60 bg-[#110f1e]/20 py-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Keynote Speakers</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-bold text-[#00f0ff]">3000+</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">In-person Guests</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-bold text-[#ff007f]">3 Days</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Interactive Tracks</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-bold text-white">$100k+</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Hackathon Prize pool</div>
          </div>
        </div>
      </section>

      {/* Speakers Grid Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#00f0ff]">Industry Pioneers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet the Keynote Speakers</h2>
          <div className="w-16 h-1 bg-[#ff007f] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Speaker 1 */}
          <div className="bg-[#110f1e] border border-[#221e3b] rounded-2xl overflow-hidden group hover:border-[#00f0ff]/30 transition-all duration-300">
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" alt="Sarah Jenkins" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06050c] via-transparent to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-white">Dr. Sarah Jenkins</h3>
              <p className="text-xs text-[#00f0ff] font-medium mb-2">VP of AI Research, NeuroNet</p>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Pioneering transformer networks and semantic agent intelligence in consumer systems.
              </p>
            </div>
          </div>
          {/* Speaker 2 */}
          <div className="bg-[#110f1e] border border-[#221e3b] rounded-2xl overflow-hidden group hover:border-[#00f0ff]/30 transition-all duration-300">
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80" alt="David Miller" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06050c] via-transparent to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-white">David Miller</h3>
              <p className="text-xs text-[#ff007f] font-medium mb-2">Lead Web Architect, Vercel</p>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Author of modern rendering protocols and compiler performance architectures.
              </p>
            </div>
          </div>
          {/* Speaker 3 */}
          <div className="bg-[#110f1e] border border-[#221e3b] rounded-2xl overflow-hidden group hover:border-[#00f0ff]/30 transition-all duration-300">
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" alt="Elena Rostova" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06050c] via-transparent to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-white">Elena Rostova</h3>
              <p className="text-xs text-[#00f0ff] font-medium mb-2">Founding Partner, BlockGrid</p>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Specialist in decentralized serverless databases and edge networks consensus.
              </p>
            </div>
          </div>
          {/* Speaker 4 */}
          <div className="bg-[#110f1e] border border-[#221e3b] rounded-2xl overflow-hidden group hover:border-[#00f0ff]/30 transition-all duration-300">
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" alt="Marcus Sterling" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06050c] via-transparent to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-white">Marcus Sterling</h3>
              <p className="text-xs text-[#ff007f] font-medium mb-2">Chief Design Officer, Framer</p>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Reinventing the canvas interface and AI-augmented interactive layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Accordion Section */}
      <section id="schedule" className="bg-[#110f1e]/25 border-y border-[#221e3b]/60 py-24 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-[#ff007f]">Chronological Timeline</span>
            <h2 className="text-3xl font-bold text-white">Event Schedule & Tracks</h2>
            <div className="w-16 h-1 bg-[#00f0ff] mx-auto"></div>
          </div>

          {/* Schedule list */}
          <div className="space-y-4">
            {/* Slot 1 */}
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleAccordion('slot-1')}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-[#221e3b]/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="font-bold text-[#00f0ff] tracking-wider text-sm sm:text-base">09:00 AM - 10:30 AM</span>
                  <h4 className="font-semibold text-white text-base">Keynote: The AI Agent Shift in Web Design</h4>
                </div>
                <span 
                  className="material-symbols-outlined text-stone-500 transition-transform duration-300"
                  style={{ transform: activeSlot === 'slot-1' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {activeSlot === 'slot-1' && (
                <div className="p-6 border-t border-[#221e3b]/60 bg-[#06050c]/50 text-stone-400 text-sm font-light leading-relaxed animate-[fadeIn_0.3s_ease]">
                  <p className="mb-3">Presented by Dr. Sarah Jenkins. Discover how generative APIs are replacing static markup and empowering the next wave of natural language user interfaces.</p>
                  <span className="text-xs font-semibold text-[#ff007f] bg-[#ff007f]/10 border border-[#ff007f]/20 px-2.5 py-0.5 rounded-full">Main Stage</span>
                </div>
              )}
            </div>

            {/* Slot 2 */}
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleAccordion('slot-2')}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-[#221e3b]/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="font-bold text-[#00f0ff] tracking-wider text-sm sm:text-base">11:00 AM - 12:30 PM</span>
                  <h4 className="font-semibold text-white text-base">Mastering Edge Networks & Real-Time Sync</h4>
                </div>
                <span 
                  className="material-symbols-outlined text-stone-500 transition-transform duration-300"
                  style={{ transform: activeSlot === 'slot-2' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {activeSlot === 'slot-2' && (
                <div className="p-6 border-t border-[#221e3b]/60 bg-[#06050c]/50 text-stone-400 text-sm font-light leading-relaxed animate-[fadeIn_0.3s_ease]">
                  <p className="mb-3">Panel discussion with Elena Rostova. Understanding CRDTs, serverless databases, and reducing sync latencies to sub-10ms globally.</p>
                  <span className="text-xs font-semibold text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-2.5 py-0.5 rounded-full">Developer Track</span>
                </div>
              )}
            </div>

            {/* Slot 3 */}
            <div className="bg-[#110f1e] border border-[#221e3b] rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleAccordion('slot-3')}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-[#221e3b]/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="font-bold text-[#00f0ff] tracking-wider text-sm sm:text-base">02:00 PM - 03:30 PM</span>
                  <h4 className="font-semibold text-white text-base">Fireside Chat: AI-Augmented Canvas Systems</h4>
                </div>
                <span 
                  className="material-symbols-outlined text-stone-500 transition-transform duration-300"
                  style={{ transform: activeSlot === 'slot-3' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {activeSlot === 'slot-3' && (
                <div className="p-6 border-t border-[#221e3b]/60 bg-[#06050c]/50 text-stone-400 text-sm font-light leading-relaxed animate-[fadeIn_0.3s_ease]">
                  <p className="mb-3">Fireside discussion with Marcus Sterling. We explore the transition of code systems to canvas-based editor utilities, empowering creators without compiling scripts manually.</p>
                  <span className="text-xs font-semibold text-[#ff007f] bg-[#ff007f]/10 border border-[#ff007f]/20 px-2.5 py-0.5 rounded-full">Interactive Design</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tickets / Passes Section */}
      <section id="passes" className="max-w-7xl mx-auto w-full px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#00f0ff]">Registration Tiers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Select Your Summit Pass</h2>
          <div className="w-16 h-1 bg-[#ff007f] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Ticket 1 */}
          <div className="bg-[#110f1e] border border-[#221e3b] rounded-2xl p-8 flex flex-col justify-between hover:border-stone-700 transition-colors duration-300">
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-stone-400 font-bold text-lg">General Pass</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$299</span>
                  <span className="text-xs text-stone-500">/ attendee</span>
                </div>
              </div>
              <ul className="space-y-3.5 text-xs text-stone-400 font-light">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Full access to all keynote sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Online networking app profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Digital swag bag and resources</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleBookTicket('General')} 
              className="w-full bg-[#221e3b] hover:bg-[#221e3b]/80 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl mt-8 transition-colors"
            >
              Buy Pass
            </button>
          </div>

          {/* Ticket 2 (Featured VIP) */}
          <div className="bg-[#110f1e] border border-[#00f0ff]/20 rounded-2xl p-8 flex flex-col justify-between relative scale-105 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6c38f7] to-[#ff007f] text-white text-[9px] uppercase tracking-widest font-bold px-4 py-1 rounded-full shadow-md">
              Most Popular
            </div>
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-[#00f0ff] font-bold text-lg">VIP Experience</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$599</span>
                  <span className="text-xs text-stone-500">/ attendee</span>
                </div>
              </div>
              <ul className="space-y-3.5 text-xs text-stone-300 font-light">
                <li className="flex items-center gap-2 text-white font-medium">
                  <span className="material-symbols-outlined text-[#ff007f] text-sm">check</span>
                  <span>All General Pass features included</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Premium Front-row Reserved Seating</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Access to private speaker lounge</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>VIP networking lunch & cocktails</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleBookTicket('VIP')}
              className="w-full bg-gradient-to-r from-[#6c38f7] to-[#ff007f] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl mt-8 shadow-lg shadow-[#6c38f7]/30 hover:opacity-95 transition-all"
            >
              Register VIP Pass
            </button>
          </div>

          {/* Ticket 3 */}
          <div className="bg-[#110f1e] border border-[#221e3b] rounded-2xl p-8 flex flex-col justify-between hover:border-stone-700 transition-colors duration-300">
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-stone-400 font-bold text-lg">All-Access Pass</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$999</span>
                  <span className="text-xs text-stone-500">/ attendee</span>
                </div>
              </div>
              <ul className="space-y-3.5 text-xs text-stone-400 font-light">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>All VIP Experience features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Private 1-on-1 speaker advisory Q&A</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-sm">check</span>
                  <span>Invitation to Post-Event Gala Dinner</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleBookTicket('All-Access')}
              className="w-full bg-[#221e3b] hover:bg-[#221e3b]/80 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl mt-8 transition-colors"
            >
              Buy All-Access
            </button>
          </div>
        </div>
        {ticketSuccess && (
          <p className="text-center text-xs text-emerald-400 font-semibold mt-6 animate-pulse">
            {ticketSuccess}
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#06050c] border-t border-[#221e3b]/60 w-full py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-white tracking-widest text-base">SUMMIT <span className="text-[#ff007f]">2026</span></h4>
            <p className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">© 2026 Summit Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs text-stone-400">
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
