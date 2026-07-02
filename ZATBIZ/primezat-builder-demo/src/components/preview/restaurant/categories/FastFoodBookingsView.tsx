import React from 'react';

interface FastFoodBookingsViewProps {
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

export function FastFoodBookingsView({
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
}: FastFoodBookingsViewProps) {
  if (!isDiner) {
    // Manager overview table
    return (
      <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-6 text-left">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">
          Terminal Booth Bookings
        </h3>

        {reservationLoading ? (
          <div className="py-12 text-center text-slate-500">Querying terminal...</div>
        ) : reservations.length === 0 ? (
          <div className="py-16 text-center text-slate-500 uppercase tracking-widest text-xs font-black">
            No booth placements.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider text-[9px]">
                  <th className="py-3 font-black">Customer</th>
                  <th className="py-3 font-black">Date & Slot</th>
                  <th className="py-3 font-black">Guests</th>
                  <th className="py-3 font-black">Booth Number</th>
                  <th className="py-3 font-black">Notes</th>
                  <th className="py-3 font-black">Status</th>
                  <th className="py-3 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-bold text-white">{res.customerName}</td>
                    <td className="py-3.5 font-bold">{res.bookingDate} @ {res.bookingTime}</td>
                    <td className={`py-3.5 font-bold ${colors.textAccent}`}>{res.numberOfGuests} Guests</td>
                    <td className="py-3.5 font-mono text-[10px]">{res.tableNumber}</td>
                    <td className="py-3.5 text-slate-400 italic">"{res.notes || 'No notes'}"</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                        res.status === 'Confirmed' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' : res.status === 'Completed' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40' : 'bg-amber-950/20 text-amber-450 border-amber-900/40'
                      }`}>{res.status}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex gap-2 justify-end">
                        {res.status === 'Pending' && (
                          <button onClick={() => handleUpdateReservationStatus(res.id, 'Confirmed')} className={`px-2.5 py-1 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded text-[9px] font-black cursor-pointer transition border-none shadow-sm uppercase tracking-wider`}>
                            Confirm
                          </button>
                        )}
                        {res.status === 'Confirmed' && (
                          <button onClick={() => handleUpdateReservationStatus(res.id, 'Completed')} className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-[9px] font-black cursor-pointer transition border-none shadow-sm uppercase tracking-wider">
                            Complete
                          </button>
                        )}
                        <button onClick={() => handleDeleteBooking(res.id)} className="px-2.5 py-1 bg-transparent border border-rose-900/40 text-rose-400 hover:bg-rose-955/10 rounded text-[9px] font-bold cursor-pointer transition uppercase tracking-wider">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-left text-xs text-slate-100">
      <div className="p-6 bg-[#14151b] border border-orange-500/10 rounded-3xl shadow-sm space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-widest">Book a Diner Booth</h3>
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Preferred Date</label>
            <input type="date" required value={resFormDate} onChange={(e) => setResFormDate(e.target.value)} className="w-full bg-[#0d0e12] border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#f97316] transition" />
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Dining Slot</label>
            <select value={resFormTime} onChange={(e) => setResFormTime(e.target.value)} className={`w-full bg-[#0d0e12] border border-slate-850 rounded-xl px-4 py-2.5 text-xs ${colors.textAccent} outline-none focus:border-[#f97316] transition cursor-pointer font-bold`}>
              {['12:00', '13:00', '14:00', '17:00', '18:05', '19:00', '20:00', '21:00', '22:00'].map((t) => (
                <option key={t} value={t}>{t} Slot</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Number of Guests</label>
            <input type="number" required min={1} max={10} value={resFormGuests} onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)} className="w-full bg-[#0d0e12] border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#f97316] transition" />
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Special Request Notes</label>
            <textarea rows={3} value={resFormNotes} onChange={(e) => setResFormNotes(e.target.value)} placeholder="e.g. Birthday smash cake, window booth, extra ketchup cups..." className="w-full bg-[#0d0e12] border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#f97316] transition resize-none" />
          </div>
          <button type="submit" className={`w-full py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl text-xs font-black transition shadow-md border-none cursor-pointer uppercase tracking-wider`}>
            Reserve Booth
          </button>
        </form>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-white uppercase tracking-widest">My Booth Reservation Logs</h3>
        </div>
        {reservationLoading ? (
          <div className="p-8 text-center bg-[#14151b] border border-slate-800 rounded-3xl font-bold text-slate-500">Querying terminal...</div>
        ) : reservations.length === 0 ? (
          <div className="p-16 text-center bg-[#14151b] border border-slate-800 rounded-3xl font-bold text-slate-500 uppercase tracking-widest text-[9px]">No active booth reservations.</div>
        ) : (
          reservations.map((res) => (
            <div key={res.id} className="p-5 bg-[#14151b] border border-slate-800 rounded-3xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                    res.status === 'Confirmed' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' : res.status === 'Completed' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40' : 'bg-amber-950/20 text-amber-450 border-amber-900/40'
                  }`}>{res.status}</span>
                  <span className="font-extrabold text-white">{res.numberOfGuests} guests</span>
                </div>
                <p className="text-[10px] text-slate-450 font-semibold">
                  Scheduled for <strong className="text-white">{res.bookingDate}</strong> at <strong className={colors.textAccent}>{res.bookingTime}</strong>
                </p>
                {res.notes && <p className="text-[9px] text-slate-500 italic">" {res.notes} "</p>}
              </div>
              {res.status === 'Pending' && (
                <button onClick={() => handleDeleteBooking(res.id)} className="px-3 py-1.5 border border-slate-850 hover:bg-[#1a1c23] rounded-lg font-bold text-slate-400 transition cursor-pointer bg-transparent">
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
