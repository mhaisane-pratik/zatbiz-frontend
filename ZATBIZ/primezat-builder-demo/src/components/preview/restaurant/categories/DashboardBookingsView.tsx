import React from 'react';

interface DashboardBookingsViewProps {
  isDiner: boolean;
  primaryColor: string;
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

export function DashboardBookingsView({
  isDiner,
  primaryColor,
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
}: DashboardBookingsViewProps) {
  if (!isDiner) {
    // Admin / Manager view
    return (
      <div className="bg-white border border-stone-200/80 rounded-3xl p-6 text-left font-sans">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6 font-serif">
          Terminal Reservations Console
        </h3>

        {reservationLoading ? (
          <div className="py-12 text-center text-slate-500 font-sans">Querying logs...</div>
        ) : reservations.length === 0 ? (
          <div className="py-16 text-center text-slate-500 uppercase tracking-widest text-xs font-black font-sans">
            No seating placements booked.
          </div>
        ) : (
          <div className="overflow-x-auto font-sans">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200/80 text-slate-500 uppercase tracking-wider text-[9px]">
                  <th className="py-3 font-black">Customer</th>
                  <th className="py-3 font-black">Date & Slot</th>
                  <th className="py-3 font-black">Guests</th>
                  <th className="py-3 font-black">Table details</th>
                  <th className="py-3 font-black">Notes</th>
                  <th className="py-3 font-black">Status</th>
                  <th className="py-3 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-stone-50/10">
                    <td className="py-3.5 font-bold text-slate-800">{res.customerName}</td>
                    <td className="py-3.5 font-bold">{res.bookingDate} @ {res.bookingTime}</td>
                    <td className="py-3.5 font-bold" style={{ color: primaryColor }}>{res.numberOfGuests} Guests</td>
                    <td className="py-3.5 font-mono text-[10px]">{res.tableNumber}</td>
                    <td className="py-3.5 text-slate-600 italic">"{res.notes || 'No requests'}"</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                        res.status === 'Confirmed' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' : res.status === 'Completed' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40' : 'bg-amber-950/20 border-amber-900/40'
                      }`} style={res.status === 'Pending' ? { color: primaryColor } : {}}>{res.status}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex gap-2 justify-end">
                        {res.status === 'Pending' && (
                          <button onClick={() => handleUpdateReservationStatus(res.id, 'Confirmed')} className="px-2.5 py-1 text-slate-800 rounded text-[9px] font-black cursor-pointer transition border-none shadow-sm uppercase tracking-wider" style={{ backgroundColor: primaryColor }}>
                            Confirm
                          </button>
                        )}
                        {res.status === 'Confirmed' && (
                          <button onClick={() => handleUpdateReservationStatus(res.id, 'Completed')} className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-[9px] font-black cursor-pointer transition border-none shadow-sm uppercase tracking-wider">
                            Complete
                          </button>
                        )}
                        <button onClick={() => handleDeleteBooking(res.id)} className="px-2.5 py-1 bg-transparent border border-rose-900/40 text-rose-400 hover:bg-rose-50 rounded text-[9px] font-bold cursor-pointer transition uppercase tracking-wider">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-left text-xs text-slate-800 font-sans">
      <div className="p-6 bg-white border rounded-3xl shadow-sm space-y-4 font-sans" style={{ borderColor: `${primaryColor}20` }}>
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-serif">Book a Diner Seating</h3>
        <form onSubmit={handleCreateBooking} className="space-y-4 font-sans">
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 font-sans">Preferred Date</label>
            <input type="date" required value={resFormDate} onChange={(e) => setResFormDate(e.target.value)} className="w-full bg-[#faf8f5] border border-stone-200/60 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition focus:border-stone-600" />
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 font-sans">Dining Slot</label>
            <select value={resFormTime} onChange={(e) => setResFormTime(e.target.value)} className="w-full bg-[#faf8f5] border border-stone-200/60 rounded-xl px-4 py-2.5 text-xs outline-none transition cursor-pointer font-bold focus:border-stone-600" style={{ color: primaryColor }}>
              {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((t) => (
                <option key={t} value={t}>{t} Slot</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 font-sans">Number of Guests</label>
            <input type="number" required min={1} max={12} value={resFormGuests} onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)} className="w-full bg-[#faf8f5] border border-stone-200/60 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition focus:border-stone-600" />
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 font-sans">Dietary Notes / Table wishes</label>
            <textarea rows={3} value={resFormNotes} onChange={(e) => setResFormNotes(e.target.value)} placeholder="e.g. Vegetarian feast, custom spice level, window seat..." className="w-full bg-[#faf8f5] border border-stone-200/60 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition resize-none focus:border-stone-600" />
          </div>
          <button type="submit" className="w-full py-3 text-slate-850 rounded-xl text-xs font-black transition shadow-md border-none cursor-pointer uppercase tracking-wider font-sans" style={{ backgroundColor: primaryColor }}>
            Reserve Table
          </button>
        </form>
      </div>

      <div className="md:col-span-2 space-y-4 font-sans">
        <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-serif">My Table Seating Records</h3>
        </div>
        {reservationLoading ? (
          <div className="p-8 text-center bg-white border border-stone-200/80 rounded-3xl font-bold text-slate-500">Querying terminal...</div>
        ) : reservations.length === 0 ? (
          <div className="p-16 text-center bg-white border border-stone-200/80 rounded-3xl font-bold text-slate-500 uppercase tracking-widest text-[9px]">No active table reservations.</div>
        ) : (
          reservations.map((res) => (
            <div key={res.id} className="p-5 bg-white border border-stone-200/80 rounded-3xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                    res.status === 'Confirmed' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' : res.status === 'Completed' ? 'bg-blue-950/20 text-blue-400 border-blue-900/40' : 'bg-amber-950/20 border-amber-900/40'
                  }`} style={res.status === 'Pending' ? { color: primaryColor, borderColor: `${primaryColor}40` } : {}}>{res.status}</span>
                  <span className="font-extrabold text-slate-850">{res.numberOfGuests} guests</span>
                </div>
                <p className="text-[10px] text-slate-600 font-semibold font-sans">
                  Scheduled for <strong className="text-slate-800 font-sans">{res.bookingDate}</strong> at <strong className="font-sans" style={{ color: primaryColor }}>{res.bookingTime}</strong>
                </p>
                {res.notes && <p className="text-[9px] text-slate-500 italic">" {res.notes} "</p>}
              </div>
              {res.status === 'Pending' && (
                <button onClick={() => handleDeleteBooking(res.id)} className="px-3 py-1.5 border border-stone-200/80 hover:bg-stone-50 rounded-lg font-bold text-slate-500 transition cursor-pointer bg-transparent">
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
