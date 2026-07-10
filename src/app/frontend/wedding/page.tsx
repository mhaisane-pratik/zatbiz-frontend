'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function WeddingTemplate() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: '120', hours: '00', minutes: '00', seconds: '00' });
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 120);

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

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setRsvpSuccess(false), 5000);
  };

  return (
    <div className="bg-[#fffbf9] text-[#78350f] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-rose-700 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="text-center">
            <h1 className="font-serif text-lg font-bold tracking-widest text-rose-800 uppercase">Sarah & David</h1>
            <p className="text-[8px] uppercase tracking-wider text-rose-500">October 24, 2026</p>
          </div>
          <a href="#rsvp" className="bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all">
            RSVP
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 flex flex-col items-center text-center relative z-10 min-h-[85vh] justify-center">
        <div className="space-y-6 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-600 font-bold">We Are Getting Married</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-rose-900 leading-tight">
            Save The Date
          </h1>
          <p className="text-rose-700 font-light leading-relaxed max-w-lg mx-auto italic font-serif">
            Together with their families, Sarah and David invite you to celebrate their wedding day in Napa Valley.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto pt-6">
            <div className="bg-white border border-rose-100 rounded-lg p-3 shadow-sm flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-rose-800">{timeLeft.days}</span>
              <span className="text-[9px] uppercase tracking-wider text-rose-500">Days</span>
            </div>
            <div className="bg-white border border-rose-100 rounded-lg p-3 shadow-sm flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-rose-800">{timeLeft.hours}</span>
              <span className="text-[9px] uppercase tracking-wider text-rose-500">Hours</span>
            </div>
            <div className="bg-white border border-rose-100 rounded-lg p-3 shadow-sm flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-rose-800">{timeLeft.minutes}</span>
              <span className="text-[9px] uppercase tracking-wider text-rose-500">Mins</span>
            </div>
            <div className="bg-white border border-rose-100 rounded-lg p-3 shadow-sm flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-rose-800 animate-pulse">{timeLeft.seconds}</span>
              <span className="text-[9px] uppercase tracking-wider text-rose-500">Secs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="bg-rose-50/50 py-20 px-6 border-y border-rose-100/60">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold font-serif italic">Celebration Schedule</span>
            <h2 className="text-3xl font-bold text-rose-900 font-serif">Wedding Itinerary</h2>
            <div className="w-12 h-0.5 bg-rose-300 mx-auto"></div>
          </div>

          <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:w-0.5 before:h-full before:bg-rose-200">
            {/* Event 1 */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between gap-6 md:gap-12 pl-10 md:pl-0">
              <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-rose-455 bg-rose-500 border border-rose-100"></div>
              <div className="md:w-1/2 md:text-right md:pr-8">
                <span className="text-xs font-bold text-rose-600">04:30 PM</span>
                <h4 className="font-serif font-bold text-rose-900 text-base">Wedding Ceremony</h4>
                <p className="text-xs text-rose-700 leading-relaxed font-light mt-1">Exchange of vows in the botanical garden under the oak boughs.</p>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Event 2 */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between gap-6 md:gap-12 pl-10 md:pl-0">
              <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-rose-455 bg-rose-500 border border-rose-100"></div>
              <div className="hidden md:block md:w-1/2"></div>
              <div className="md:w-1/2 md:pl-8">
                <span className="text-xs font-bold text-rose-600">06:00 PM</span>
                <h4 className="font-serif font-bold text-rose-900 text-base">Cocktail hour</h4>
                <p className="text-xs text-rose-700 leading-relaxed font-light mt-1">Sparkling wine and signature artisanal appetizers in the courtyard.</p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between gap-6 md:gap-12 pl-10 md:pl-0">
              <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-rose-455 bg-rose-500 border border-rose-100"></div>
              <div className="md:w-1/2 md:text-right md:pr-8">
                <span className="text-xs font-bold text-rose-600">07:30 PM</span>
                <h4 className="font-serif font-bold text-rose-900 text-base">Grand Dinner & Dance</h4>
                <p className="text-xs text-rose-700 leading-relaxed font-light mt-1">Multi-course meal followed by toast rituals and live music entertainment.</p>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section id="rsvp" className="max-w-xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-rose-100 shadow-xl rounded-2xl p-8 shadow-rose-200/30">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold font-serif italic">Will You Attend?</span>
            <h2 className="text-2xl font-bold text-rose-900 font-serif">R.S.V.P</h2>
            <p className="text-xs text-rose-600 font-light">Kindly respond by August 30, 2026</p>
          </div>

          <form onSubmit={handleRsvpSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-rose-700 mb-1">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-rose-50/20 border border-rose-100 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-rose-800" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">Attendance</label>
                <select className="w-full bg-rose-50/20 border border-rose-100 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-rose-800">
                  <option value="yes">Accepts with Joy</option>
                  <option value="no">Declines with Regret</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-700 mb-1">Diners Count</label>
                <select className="w-full bg-rose-50/20 border border-rose-100 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-rose-800">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3+ People</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-rose-700 mb-1">Dietary Requirements</label>
              <input type="text" placeholder="e.g. Vegetarian, Gluten-Free" className="w-full bg-rose-50/20 border border-rose-100 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-rose-800" />
            </div>
            <button type="submit" className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors shadow shadow-rose-900/10">
              Submit RSVP
            </button>
            {rsvpSuccess && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ RSVP response submitted! Thank you.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-950 text-rose-200 border-t border-rose-900 py-12 w-full mt-auto text-sm text-center">
        <h4 className="font-serif italic font-bold tracking-widest text-base text-white">Sarah & David</h4>
        <p className="text-xs text-rose-455 text-rose-400 mt-1">© 2026 Sarah & David Wedding. Crafted with love.</p>
      </footer>
    </div>
  );
}
