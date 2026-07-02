'use client';

import React, { useState } from 'react';
import { api } from '@/services/api';

interface BookingSeatMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  themePreset?: string;
  customerSession?: any;
}

interface TableSeat {
  id: string;
  name: string;
  seats: number;
  status: 'available' | 'reserved' | 'selected';
}

export default function BookingSeatMapModal({
  isOpen,
  onClose,
  projectId,
  themePreset,
  customerSession
}: BookingSeatMapModalProps) {
  const [selectedZone, setSelectedZone] = useState<'main' | 'terrace' | 'vip'>('main');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState(customerSession?.name || '');
  const [email, setEmail] = useState(customerSession?.email || '');
  const [phone, setPhone] = useState('');
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock table layouts per zone
  const tablesByZone: Record<'main' | 'terrace' | 'vip', TableSeat[]> = {
    main: [
      { id: 'M1', name: 'Table 1', seats: 2, status: 'available' },
      { id: 'M2', name: 'Table 2', seats: 4, status: 'reserved' },
      { id: 'M3', name: 'Table 3', seats: 4, status: 'available' },
      { id: 'M4', name: 'Table 4', seats: 6, status: 'available' },
      { id: 'M5', name: 'Table 5', seats: 2, status: 'reserved' },
      { id: 'M6', name: 'Table 6', seats: 8, status: 'available' },
    ],
    terrace: [
      { id: 'T1', name: 'Terrace A', seats: 2, status: 'available' },
      { id: 'T2', name: 'Terrace B', seats: 2, status: 'available' },
      { id: 'T3', name: 'Terrace C', seats: 4, status: 'reserved' },
      { id: 'T4', name: 'Terrace D', seats: 4, status: 'available' },
    ],
    vip: [
      { id: 'V1', name: 'VIP Booth 1', seats: 4, status: 'available' },
      { id: 'V2', name: 'VIP Booth 2', seats: 6, status: 'reserved' },
      { id: 'V3', name: 'Imperial Room', seats: 12, status: 'available' },
    ]
  };

  const currentTables = tablesByZone[selectedZone];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      alert('Please select a dining table from the floor map first.');
      return;
    }
    setLoading(true);
    const payload = {
      projectId,
      customerName: name,
      customerEmail: email || null,
      customerPhone: phone,
      bookingDate,
      bookingTime,
      numberOfGuests: guests,
      tableNumber: selectedTable,
      notes: `${notes} [Zone: ${selectedZone.toUpperCase()}]`,
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to request table booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getThemeColor = () => {
    switch (themePreset) {
      case 'slate':
      case 'charcoal-slate': return 'bg-slate-700 hover:bg-slate-800 border-slate-650';
      case 'deepblue':
      case 'indigo-ocean': return 'bg-indigo-650 hover:bg-indigo-700 border-indigo-500';
      case 'sunset':
      case 'amber-spiced': return 'bg-orange-600 hover:bg-orange-700 border-orange-500';
      case 'purple':
      case 'velvet-plum': return 'bg-purple-650 hover:bg-purple-700 border-purple-500';
      case 'emerald':
      case 'emerald-mint': return 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500';
      case 'rose-vintage': return 'bg-pink-500 hover:bg-pink-600 border-pink-500';
      case 'ruby-wine': return 'bg-rose-600 hover:bg-rose-700 border-rose-650';
      case 'tangerine-peel': return 'bg-orange-500 hover:bg-orange-600 border-orange-450';
      case 'forest-herbs': return 'bg-emerald-700 hover:bg-emerald-800 border-emerald-650';
      default: return 'bg-[#c5a880] hover:bg-[#d8c2a3] text-black border-[#c5a880]';
    }
  };

  const getThemeText = () => {
    switch (themePreset) {
      case 'slate':
      case 'charcoal-slate': return 'text-slate-400';
      case 'deepblue':
      case 'indigo-ocean': return 'text-indigo-400';
      case 'sunset':
      case 'amber-spiced': return 'text-orange-400';
      case 'purple':
      case 'velvet-plum': return 'text-purple-400';
      case 'emerald':
      case 'emerald-mint': return 'text-emerald-400';
      case 'rose-vintage': return 'text-pink-500';
      case 'ruby-wine': return 'text-rose-500';
      case 'tangerine-peel': return 'text-orange-500';
      case 'forest-herbs': return 'text-emerald-650';
      default: return 'text-[#c5a880]';
    }
  };

  const getThemeBorderFocus = () => {
    switch (themePreset) {
      case 'slate':
      case 'charcoal-slate': return 'focus:border-slate-500';
      case 'deepblue':
      case 'indigo-ocean': return 'focus:border-indigo-500';
      case 'sunset':
      case 'amber-spiced': return 'focus:border-orange-500';
      case 'purple':
      case 'velvet-plum': return 'focus:border-purple-500';
      case 'emerald':
      case 'emerald-mint': return 'focus:border-emerald-500';
      case 'rose-vintage': return 'focus:border-pink-500';
      case 'ruby-wine': return 'focus:border-rose-500';
      case 'tangerine-peel': return 'focus:border-orange-500';
      case 'forest-herbs': return 'focus:border-emerald-600';
      default: return 'focus:border-[#c5a880]';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#12131a] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-10 animate-scale-up font-sans text-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white transition duration-200 bg-transparent border-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl select-none">close</span>
        </button>

        {success ? (
          <div className="flex-1 p-12 text-center flex flex-col items-center justify-center space-y-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 ${getThemeText()}`}>
              <span className="material-symbols-outlined text-4xl select-none">check_circle</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-wider font-serif">Table Requested!</h2>
              <p className="text-zinc-400 text-xs max-w-sm mx-auto">
                Your reservation request for <strong>{selectedTable}</strong> in the {selectedZone.toUpperCase()} area is pending. Check your dashboard/email for status confirmation.
              </p>
            </div>
            <button 
              onClick={onClose}
              className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer border-0 ${getThemeColor()} ${themePreset ? 'text-white' : 'text-black'}`}
              type="button"
            >
              Back to Storefront
            </button>
          </div>
        ) : (
          <>
            {/* Left Side: floor plan seat map */}
            <div className="flex-1 p-6 md:p-8 bg-[#0a0a0c]/40 border-b md:border-b-0 md:border-r border-zinc-850 overflow-y-auto flex flex-col">
              <div>
                <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${getThemeText()}`}>Interactive Reservation</span>
                <h3 className="text-lg font-black uppercase tracking-wider text-white font-serif">Choose Dining Table</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Pick your preferred seating zone and table</p>
              </div>

              {/* Zone Tabs */}
              <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 mt-6 text-[10px] font-black uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => { setSelectedZone('main'); setSelectedTable(null); }}
                  className={`flex-1 py-2 text-center rounded-lg cursor-pointer transition border-0 ${selectedZone === 'main' ? 'bg-zinc-800 text-white' : 'text-zinc-400 bg-transparent hover:text-white'}`}
                >
                  Main Hall
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedZone('terrace'); setSelectedTable(null); }}
                  className={`flex-1 py-2 text-center rounded-lg cursor-pointer transition border-0 ${selectedZone === 'terrace' ? 'bg-zinc-800 text-white' : 'text-zinc-400 bg-transparent hover:text-white'}`}
                >
                  Terrace / Garden
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedZone('vip'); setSelectedTable(null); }}
                  className={`flex-1 py-2 text-center rounded-lg cursor-pointer transition border-0 ${selectedZone === 'vip' ? 'bg-zinc-800 text-white' : 'text-zinc-400 bg-transparent hover:text-white'}`}
                >
                  VIP Lounge
                </button>
              </div>

              {/* Floor Seating Map Grid */}
              <div className="flex-1 min-h-[220px] bg-zinc-950/80 border border-zinc-900 rounded-2xl mt-6 p-6 flex flex-col justify-center items-center relative">
                {/* Visual Legend */}
                <div className="absolute top-3 left-4 flex gap-4 text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block"></span>
                    <span>Free</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-red-500/10 border border-red-500/20 inline-block"></span>
                    <span>Reserved</span>
                  </div>
                </div>

                {/* Tables Grid */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-md">
                  {currentTables.map((t) => {
                    const isSelected = selectedTable === t.id;
                    const isReserved = t.status === 'reserved';
                    
                    return (
                      <button
                        key={t.id}
                        type="button"
                        disabled={isReserved}
                        onClick={() => setSelectedTable(t.id)}
                        className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition duration-300 relative cursor-pointer ${
                          isReserved 
                            ? 'bg-red-500/5 border-red-500/20 text-red-500/30 cursor-not-allowed'
                            : isSelected
                              ? `${themePreset ? 'bg-zinc-850 text-white border-white ring-4 ring-white/10' : 'bg-[#c5a880]/15 text-[#c5a880] border-[#c5a880] ring-4 ring-[#c5a880]/10'}`
                              : 'bg-emerald-500/5 border-emerald-500/10 text-zinc-300 hover:border-emerald-500/40 hover:bg-emerald-500/10'
                        }`}
                      >
                        <span className="text-[10px] font-black tracking-widest uppercase">{t.name}</span>
                        <span className="text-[8px] opacity-60 mt-1 uppercase font-bold">{t.seats} Seats</span>
                        
                        {isSelected && (
                          <span className={`absolute -top-1.5 -right-1.5 w-5.5 h-5.5 rounded-full flex items-center justify-center text-[9px] font-black border bg-[#12131a] ${themePreset ? 'border-white text-white' : 'border-[#c5a880] text-[#c5a880]'}`}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Form details */}
            <div className="w-full md:w-[350px] p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-zinc-900/40">
              <form onSubmit={handleSubmit} className="space-y-4 flex-grow text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-zinc-850 pb-3 mb-4 font-serif">Reservation Info</h4>
                
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Date</label>
                    <input 
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] outline-none text-white transition ${getThemeBorderFocus()}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Time</label>
                    <input 
                      type="time"
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] outline-none text-white transition ${getThemeBorderFocus()}`}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Guests count</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] outline-none text-white transition ${getThemeBorderFocus()}`}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>{num} Guest{num === 1 ? '' : 's'}</option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Your Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] outline-none text-white transition ${getThemeBorderFocus()}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] outline-none text-white transition ${getThemeBorderFocus()}`}
                  />
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Special Requests / Notes</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Birthday celebration, Window seat"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] outline-none text-white transition resize-none ${getThemeBorderFocus()}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer border-0 mt-4 active:scale-[0.98] ${getThemeColor()} ${themePreset ? 'text-white' : 'text-black'}`}
                >
                  {loading ? 'Processing...' : 'Reserve Table'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Slide Scale Animation CSS */}
      <style>{`
        @keyframes scale-up {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up {
          animation: scale-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
