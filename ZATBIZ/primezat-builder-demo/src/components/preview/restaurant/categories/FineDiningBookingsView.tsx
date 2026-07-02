import React from 'react';

interface FineDiningBookingsViewProps {
  isDiner: boolean;
  colors: any;
  reservationLoading: boolean;
  reservations: any[];
  handleCreateBooking: (e: React.FormEvent) => void;
  handleUpdateReservationStatus: (id: number, status: string) => void;
  handleDeleteBooking: (id: number) => void;
  resFormDate: string;
  setResFormDate: (d: string) => void;
  resFormTime: string;
  setResFormTime: (t: string) => void;
  resFormGuests: number;
  setResFormGuests: (g: number) => void;
  resFormNotes: string;
  setResFormNotes: (n: string) => void;
}

export function FineDiningBookingsView({
  isDiner,
  colors,
  reservationLoading,
  reservations,
  handleCreateBooking,
  handleUpdateReservationStatus,
  handleDeleteBooking,
  resFormDate,
  setResFormDate,
  resFormTime,
  setResFormTime,
  resFormGuests,
  setResFormGuests,
  resFormNotes,
  setResFormNotes
}: FineDiningBookingsViewProps) {
  if (!isDiner) {
    // Admin / Manager view
    return (
      <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-6 text-left">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-white font-sans uppercase tracking-widest">
            Executive Reservations Console
          </h3>
        </div>

        {reservationLoading ? (
          <div className="py-12 text-center text-stone-500 font-sans">Querying private vaults...</div>
        ) : reservations.length === 0 ? (
          <div className="py-16 text-center text-stone-500 font-sans uppercase tracking-wider text-xs">
            No reservation placements booked.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-sans">
              <thead>
                <tr className="border-b border-stone-850 text-stone-500 uppercase tracking-widest text-[9px]">
                  <th className="py-3 font-black">Guest</th>
                  <th className="py-3 font-black">Suite Date</th>
                  <th className="py-3 font-black">Guests</th>
                  <th className="py-3 font-black">Placement</th>
                  <th className="py-3 font-black">Special Note</th>
                  <th className="py-3 font-black">Status</th>
                  <th className="py-3 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-850">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-stone-900/10">
                    <td className="py-3.5 font-bold text-white">{res.customerName}</td>
                    <td className="py-3.5 font-bold">{res.bookingDate} @ {res.bookingTime}</td>
                    <td className={`py-3.5 font-bold ${colors.textAccent}`}>{res.numberOfGuests} Guests</td>
                    <td className="py-3.5 font-mono text-[10px]">{res.tableNumber}</td>
                    <td className="py-3.5 text-stone-400 italic font-sans">"{res.notes || 'No requests'}"</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                        res.status === 'Confirmed' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' : res.status === 'Completed' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40' : `bg-amber-950/20 ${colors.textAccent} border-[#c5a880]/20`
                      }`}>{res.status}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex gap-2 justify-end">
                        {res.status === 'Pending' && (
                          <button onClick={() => handleUpdateReservationStatus(res.id, 'Confirmed')} className="px-2.5 py-1 bg-[#c5a880] hover:bg-[#d8c2a3] text-black rounded text-[9px] font-bold cursor-pointer transition border-none shadow-sm font-sans uppercase tracking-wider">
                            Confirm
                          </button>
                        )}
                        {res.status === 'Confirmed' && (
                          <button onClick={() => handleUpdateReservationStatus(res.id, 'Completed')} className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 text-white rounded text-[9px] font-bold cursor-pointer transition border-none shadow-sm font-sans uppercase tracking-wider">
                            Complete
                          </button>
                        )}
                        <button onClick={() => handleDeleteBooking(res.id)} className="px-2.5 py-1 bg-transparent border border-rose-900/40 text-rose-400 hover:bg-rose-950/10 rounded text-[9px] font-bold cursor-pointer transition font-sans uppercase tracking-wider">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Customer / Diner view
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-left font-sans text-xs text-[#e2e8f0]">
      <div className="p-6 bg-[#111217] border border-[#2a2c35]/35 rounded-3xl shadow-sm space-y-4 font-sans">
        <h3 className="text-xs font-black text-white uppercase tracking-widest font-serif">Reserve a Private Suite</h3>
        <form onSubmit={handleCreateBooking} className="space-y-4 font-sans">
          <div>
            <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Preferred Date</label>
            <input type="date" required value={resFormDate} onChange={(e) => setResFormDate(e.target.value)} className="w-full bg-[#0d0e12] border border-stone-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#c5a880] transition" />
          </div>
          <div>
            <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Preferred Seating Slot</label>
            <select value={resFormTime} onChange={(e) => setResFormTime(e.target.value)} className={`w-full bg-[#0d0e12] border border-stone-850 rounded-xl px-4 py-2.5 text-xs ${colors.textAccent} outline-none focus:border-[#c5a880] transition cursor-pointer font-bold`}>
              {['12:00', '13:30', '19:00', '20:30', '22:00'].map((t) => (
                <option key={t} value={t}>{t} Seating</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Number of Honored Guests</label>
            <input type="number" required min={1} max={12} value={resFormGuests} onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)} className="w-full bg-[#0d0e12] border border-stone-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#c5a880] transition" />
          </div>
          <div>
            <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Dietary Notes / Cellar Wishes</label>
            <textarea rows={3} value={resFormNotes} onChange={(e) => setResFormNotes(e.target.value)} placeholder="e.g. Vegetarian tasting, private sommelier pour, window seat..." className="w-full bg-[#0d0e12] border border-stone-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#c5a880] transition resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#d8c2a3] text-black rounded-none text-xs font-black transition shadow-md border-none cursor-pointer uppercase tracking-widest font-sans">
            Reserve Placement
          </button>
        </form>
      </div>

      <div className="md:col-span-2 space-y-4 font-sans text-xs">
        <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-white uppercase tracking-widest font-serif">Honored Placements Status</h3>
        </div>
        {reservationLoading ? (
          <div className="p-8 text-center bg-[#111217] border border-stone-850 rounded-3xl font-bold text-stone-500">Querying private vaults...</div>
        ) : reservations.length === 0 ? (
          <div className="p-16 text-center bg-[#111217] border border-stone-850 rounded-3xl font-bold text-stone-500 uppercase tracking-widest text-[10px]">No active private suite placements.</div>
        ) : (
          reservations.map((res) => (
            <div key={res.id} className="p-5 bg-[#111217] border border-stone-850 rounded-3xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1.5 text-left font-sans">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                    res.status === 'Confirmed' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' : res.status === 'Completed' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40' : `bg-amber-950/20 ${colors.textAccent} border-[#c5a880]/20`
                  }`}>{res.status}</span>
                  <span className="font-extrabold text-white">{res.numberOfGuests} guests</span>
                </div>
                <p className="text-[10px] text-stone-400 font-semibold">
                  Scheduled for <strong className="text-white">{res.bookingDate}</strong> at <strong className={colors.textAccent}>{res.bookingTime}</strong>
                </p>
                {res.notes && <p className="text-[9px] text-stone-500 italic">" {res.notes} "</p>}
              </div>
              {res.status === 'Pending' && (
                <button onClick={() => handleDeleteBooking(res.id)} className="px-3 py-1.5 border border-stone-850 hover:bg-[#1a1c23] rounded-lg font-bold text-slate-400 transition cursor-pointer bg-transparent">
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
