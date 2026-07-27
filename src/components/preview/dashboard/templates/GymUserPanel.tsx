'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { api } from '@/services/api';
import { useDarkMode } from '@/hooks/useDarkMode';

interface GymUserPanelProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName?: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

type TabType = 
  | 'dashboard' 
  | 'profile' 
  | 'membership' 
  | 'attendance' 
  | 'bookings' 
  | 'trainer' 
  | 'workouts' 
  | 'diets' 
  | 'progress' 
  | 'payments' 
  | 'support';

export default function GymUserPanel({
  projectId,
  clientEmail,
  theme,
  onLogout,
  companyName,
  logoIcon,
}: GymUserPanelProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [member, setMember] = useState<any>(null);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<any[]>([]);
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalInformation: '',
    profilePhotoUrl: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [measurementForm, setMeasurementForm] = useState({
    chest: '',
    waist: '',
    biceps: '',
    thighs: '',
  });

  const [newWeight, setNewWeight] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  
  // Support ticket state
  const [tickets, setTickets] = useState<any[]>([
    { id: 1, subject: 'Locker room key lost', message: 'I misplaced my locker key.', status: 'Open', date: '2026-06-28' }
  ]);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');

  // Chat Support states
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'support', text: 'Hi! How can FitZone support your workout goals today?', time: '10:00 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Notifications
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, text: 'Your membership expires in 30 days. Renew early for a 10% discount!', type: 'expiry', date: 'Today' },
    { id: 2, text: 'Reminder: Morning HIIT Burn starts tomorrow at 8:00 AM.', type: 'class', date: 'Yesterday' }
  ]);

  // Loading data from API
  useEffect(() => {
    fetchData();
  }, [projectId, clientEmail]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Get member profile
      const profile = await api.gymManagement.members.getProfile(projectId, clientEmail);
      setMember(profile);
      setProfileForm({
        name: profile.name || '',
        phone: profile.phone || '',
        emergencyContactName: profile.emergencyContactName || '',
        emergencyContactPhone: profile.emergencyContactPhone || '',
        medicalInformation: profile.medicalInformation || '',
        profilePhotoUrl: profile.profilePhotoUrl || '',
      });

      // Decode measurements if present
      if (profile.bodyMeasurements) {
        try {
          const parsed = JSON.parse(profile.bodyMeasurements);
          setMeasurementForm(parsed);
        } catch (e) {}
      }

      // 2. Trainers
      const trainersList = await api.gymManagement.trainers.list(projectId);
      setTrainers(Array.isArray(trainersList) ? trainersList : []);

      // 3. Classes
      const classesList = await api.gymManagement.classes.list(projectId);
      setClasses(Array.isArray(classesList) ? classesList : []);

      // 4. Bookings
      const bookingsList = await api.gymManagement.bookings.listMember(projectId, clientEmail);
      setBookings(Array.isArray(bookingsList) ? bookingsList : []);

      // 5. Attendance
      const attendanceList = await api.gymManagement.attendance.listMember(projectId, clientEmail);
      setAttendance(Array.isArray(attendanceList) ? attendanceList : []);

      // 6. Workouts
      const workoutsList = await api.gymManagement.workouts.listMember(projectId, clientEmail);
      setWorkoutPlans(Array.isArray(workoutsList) ? workoutsList : []);

      // 7. Diets
      const diet = await api.gymManagement.diets.getMember(projectId, clientEmail);
      setDietPlan(diet);

      // 8. Payments
      const paymentsList = await api.gymManagement.payments.listMember(projectId, clientEmail);
      setPayments(Array.isArray(paymentsList) ? paymentsList : []);

    } catch (e) {
      console.error('Error fetching gym data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...member,
        ...profileForm
      };
      const updated = await api.gymManagement.members.save(payload);
      setMember(updated);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const handleSaveMeasurements = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...member,
        bodyMeasurements: JSON.stringify(measurementForm)
      };
      const updated = await api.gymManagement.members.save(payload);
      setMember(updated);
      alert('Measurements updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save measurements.');
    }
  };

  const handleSaveProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const weightNum = parseFloat(newWeight);
      if (isNaN(weightNum)) return;
      
      // Calculate new BMI if height exists
      let computedBmi = member.bmi;
      if (member.height) {
        const heightMeters = member.height / 100;
        computedBmi = parseFloat((weightNum / (heightMeters * heightMeters)).toFixed(1));
      }

      // Concat progress photos
      let photosArr = [];
      if (member.progressPhotos) {
        try {
          photosArr = JSON.parse(member.progressPhotos);
        } catch (e) {
          if (member.progressPhotos.includes(',')) {
            photosArr = member.progressPhotos.split(',');
          } else {
            photosArr = [member.progressPhotos];
          }
        }
      }
      if (newPhotoUrl.trim()) {
        photosArr.push(newPhotoUrl.trim());
      }

      const payload = {
        ...member,
        currentWeight: weightNum,
        bmi: computedBmi,
        progressPhotos: JSON.stringify(photosArr)
      };
      const updated = await api.gymManagement.members.save(payload);
      setMember(updated);
      setNewWeight('');
      setNewPhotoUrl('');
      alert('Progress metrics updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save progress.');
    }
  };

  const handleBookClass = async (gymClass: any) => {
    // Check capacity
    if (gymClass.bookedCount >= gymClass.capacity) {
      alert('This class is already full!');
      return;
    }
    
    // Check duplicate booking
    const alreadyBooked = bookings.some(b => b.gymClassId === gymClass.id && b.status === 'Booked');
    if (alreadyBooked) {
      alert('You have already booked this class!');
      return;
    }

    try {
      const payload = {
        projectId,
        memberEmail: clientEmail,
        gymClassId: gymClass.id,
        className: gymClass.className,
        bookingDate: new Date().toISOString().split('T')[0]
      };
      await api.gymManagement.bookings.create(payload);
      alert('Class booked successfully!');
      fetchData(); // reload lists
    } catch (e) {
      console.error(e);
      alert('Failed to book class.');
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.gymManagement.bookings.cancel(bookingId);
      alert('Booking cancelled successfully.');
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to cancel booking.');
    }
  };

  const handleTriggerCheckIn = async () => {
    try {
      const payload = {
        projectId,
        memberEmail: clientEmail,
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkInDate: new Date().toISOString().split('T')[0],
        type: 'QR'
      };
      await api.gymManagement.attendance.save(payload);
      alert('Checked In successfully via QR code!');
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;
    const newTicket = {
      id: Date.now(),
      subject: newTicketSubject,
      message: newTicketMessage,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    setTickets([newTicket, ...tickets]);
    setNewTicketSubject('');
    setNewTicketMessage('');
    alert('Support ticket raised successfully!');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulate reply
    setTimeout(() => {
      const supportReply = {
        sender: 'support',
        text: 'Thank you for your message! Our gym administrator will review this and respond shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, supportReply]);
    }, 1200);
  };

  const handleRenewMembership = async (planName: string, price: number) => {
    if (!confirm(`Confirm renewing membership under ${planName} for ₹${price}?`)) return;
    try {
      const payRecord = {
        projectId,
        memberEmail: clientEmail,
        amount: price,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Online',
        status: 'Paid',
        planName
      };
      await api.gymManagement.payments.save(payRecord);

      // Update member profile
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 3); // add 3 months
      const memberPayload = {
        ...member,
        membershipPlan: planName,
        membershipStatus: 'Active',
        expiryDate: expiry.toISOString().split('T')[0]
      };
      await api.gymManagement.members.save(memberPayload);

      alert(`Successfully renewed ${planName}!`);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to process payment.');
    }
  };

  if (loading || !member) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-orange-500 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loading Fitness Profile...</p>
        </div>
      </div>
    );
  }

  // Derived stats
  const activeBookingsCount = bookings.filter(b => b.status === 'Booked').length;
  const totalVisitsCount = attendance.length;

  return (
    <div className="h-screen flex overflow-hidden bg-zinc-950 text-zinc-100 font-sans select-none">
      
      {/* Dynamic Theme Color Indicator */}
      <style>{`
        .accent-bg { background-color: ${theme?.color || '#ea580c'} !important; }
        .accent-text { color: ${theme?.color || '#ea580c'} !important; }
        .accent-border { border-color: ${theme?.color || '#ea580c'} !important; }
        .accent-ring:focus { --tw-ring-color: ${theme?.color || '#ea580c'} !important; }
      `}</style>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Gym Branding */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-zinc-800 bg-zinc-900/50">
            <div className="w-8.5 h-8.5 flex items-center justify-center bg-orange-600 rounded-xl shadow-md accent-bg">
              <span className="text-white text-base font-extrabold italic">{logoIcon || '🏋️'}</span>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight truncate">{companyName || 'ZoneFit Gym'}</span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'fa-house' },
              { id: 'profile', label: 'My Profile', icon: 'fa-user' },
              { id: 'membership', label: 'Membership Plan', icon: 'fa-id-card' },
              { id: 'attendance', label: 'Attendance logs', icon: 'fa-calendar-check' },
              { id: 'bookings', label: 'Book Classes', icon: 'fa-dumbbell' },
              { id: 'trainer', label: 'My Trainer', icon: 'fa-person-chalkboard' },
              { id: 'workouts', label: 'Workout Plan', icon: 'fa-file-medical' },
              { id: 'diets', label: 'Diet Chart', icon: 'fa-utensils' },
              { id: 'progress', label: 'Track Progress', icon: 'fa-chart-line' },
              { id: 'payments', label: 'Payments & Bills', icon: 'fa-file-invoice-dollar' },
              { id: 'support', label: 'Help & Support', icon: 'fa-circle-question' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition duration-200 border border-transparent ${
                    isActive
                      ? 'bg-zinc-800 text-orange-500 border-zinc-700 accent-text'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} text-sm w-4 text-center ${isActive ? 'accent-text' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile section at the bottom */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center justify-between p-2 bg-zinc-850 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2 truncate">
              {member.profilePhotoUrl ? (
                <img src={member.profilePhotoUrl} alt="profile" className="w-8 h-8 rounded-full object-cover border border-zinc-750" />
              ) : (
                <span className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-black text-xs text-white uppercase shadow-sm accent-bg">
                  {member.name ? member.name[0] : 'U'}
                </span>
              )}
              <div className="truncate leading-tight text-left">
                <p className="text-xs font-extrabold text-zinc-100 truncate">{member.name || 'Member'}</p>
                <span className="text-[9px] text-zinc-500 font-semibold truncate">{clientEmail}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={toggleDarkMode}
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
                className="w-7 h-7 flex items-center justify-center text-zinc-550 hover:text-amber-500 rounded-xl hover:bg-zinc-800 transition duration-150 border-0 bg-transparent cursor-pointer"
              >
                <span>{isDarkMode ? '☀️' : '🌙'}</span>
              </button>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="w-7 h-7 flex items-center justify-center text-zinc-550 hover:text-red-500 rounded-xl hover:bg-zinc-800 transition duration-150 border-0 bg-transparent cursor-pointer"
              >
                <i className="fa-solid fa-right-from-bracket text-xs" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content view */}
      <main className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-900/10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black tracking-tight text-zinc-200 capitalize">{activeTab} panel</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick check-in QR code emulator */}
            <button 
              onClick={handleTriggerCheckIn}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 border-0 accent-bg"
            >
              <i className="fa-solid fa-qrcode" />
              <span>Tap to QR Check-In</span>
            </button>

            {/* Notifications Alert Center */}
            <div className="relative group">
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition border-0">
                <i className="fa-solid fa-bell text-sm" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-zinc-950" />
                )}
              </button>
              
              {/* Dropdown list */}
              <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-4 hidden group-hover:block z-50 text-left">
                <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-2">Alerts & Reminders</h4>
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n.id} className="text-[11px] leading-relaxed border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
                      <p className="text-zinc-200 font-bold">{n.text}</p>
                      <span className="text-[9px] text-zinc-550 block mt-1">{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Panels */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in text-left max-w-5xl">
              
              {/* Welcome Banner */}
              <div className="relative w-full bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-md">
                <div className="space-y-2 z-10">
                  <span className="px-3 py-1 bg-zinc-800 text-orange-500 text-[10px] font-black tracking-widest uppercase rounded-full accent-text border border-zinc-700">
                    FitZone Athlete
                  </span>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight mt-2">
                    Welcome Back, {member.name}!
                  </h1>
                  <p className="text-zinc-400 text-sm max-w-xl font-medium">
                    "Strength does not come from winning. Your struggles develop your strengths." Track workouts, schedule classes, and stay on top of your macros today.
                  </p>
                </div>
                <div className="text-right z-10 mt-4 md:mt-0 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Total Visits</span>
                  <span className="text-3xl font-black text-orange-500 accent-text">{totalVisitsCount}</span>
                  <span className="text-[9px] text-zinc-550 mt-1">Keep crushing it!</span>
                </div>
              </div>

              {/* Grid Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Active Membership Status */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-zinc-400 tracking-wider">Membership Status</span>
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                      member.membershipStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {member.membershipStatus}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{member.membershipPlan || 'No Active Plan'}</h3>
                    <p className="text-[11px] text-zinc-400 font-bold mt-1.5">
                      Expires on: <span className="text-zinc-200">{member.expiryDate || 'N/A'}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('membership')}
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-xl text-xs font-bold border border-zinc-700 transition"
                  >
                    View Renewal Options
                  </button>
                </div>

                {/* Upcoming Classes */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <span className="text-xs font-black uppercase text-zinc-400 tracking-wider block">Upcoming Booked Classes</span>
                  <div className="space-y-3">
                    {bookings.filter(b => b.status === 'Booked').slice(0, 2).map(b => (
                      <div key={b.id} className="flex justify-between items-center border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
                        <div>
                          <h4 className="text-xs font-extrabold text-zinc-200">{b.className}</h4>
                          <span className="text-[9px] text-zinc-500">{b.bookingDate}</span>
                        </div>
                        <span className="text-[9px] font-black text-orange-500 accent-text">Scheduled</span>
                      </div>
                    ))}
                    {activeBookingsCount === 0 && (
                      <p className="text-xs text-zinc-550 py-4 text-center">No classes booked yet.</p>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-xl text-xs font-bold border border-zinc-700 transition"
                  >
                    Book a New Class
                  </button>
                </div>

                {/* Progress Tracking Summary */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <span className="text-xs font-black uppercase text-zinc-400 tracking-wider block">Progress Summary</span>
                  <div className="grid grid-cols-3 gap-2 py-1 text-center">
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
                      <span className="text-[9px] text-zinc-500 font-extrabold uppercase">Weight</span>
                      <p className="text-sm font-black text-zinc-200 mt-1">{member.currentWeight ? `${member.currentWeight}kg` : '--'}</p>
                    </div>
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
                      <span className="text-[9px] text-zinc-500 font-extrabold uppercase">Height</span>
                      <p className="text-sm font-black text-zinc-200 mt-1">{member.height ? `${member.height}cm` : '--'}</p>
                    </div>
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
                      <span className="text-[9px] text-zinc-500 font-extrabold uppercase">BMI</span>
                      <p className="text-sm font-black text-zinc-200 mt-1">{member.bmi || '--'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('progress')}
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-xl text-xs font-bold border border-zinc-700 transition"
                  >
                    Log Daily Stats
                  </button>
                </div>

              </div>

              {/* Bottom Quick Payment Details */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-left space-y-4">
                <span className="text-xs font-black uppercase text-zinc-400 tracking-wider block">Payment Summary</span>
                <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400 font-medium">Last Invoice Paid</span>
                  <span className="text-white font-extrabold">₹{payments.length > 0 ? payments[0].amount : '1,500.00'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">Method</span>
                  <span className="text-white font-bold">{payments.length > 0 ? payments[0].paymentMethod : 'Online'}</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-fade-in text-left max-w-3xl">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
                <h3 className="text-lg font-black text-white">Personal Information</h3>
                
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Full Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name} 
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Phone Number</label>
                      <input 
                        type="text" 
                        value={profileForm.phone} 
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-400">Profile Photo URL</label>
                    <input 
                      type="text" 
                      value={profileForm.profilePhotoUrl} 
                      onChange={e => setProfileForm({ ...profileForm, profilePhotoUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Emergency Contact Name</label>
                      <input 
                        type="text" 
                        value={profileForm.emergencyContactName} 
                        onChange={e => setProfileForm({ ...profileForm, emergencyContactName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Emergency Contact Phone</label>
                      <input 
                        type="text" 
                        value={profileForm.emergencyContactPhone} 
                        onChange={e => setProfileForm({ ...profileForm, emergencyContactPhone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-400">Medical Information & Allergies</label>
                    <textarea 
                      value={profileForm.medicalInformation} 
                      onChange={e => setProfileForm({ ...profileForm, medicalInformation: e.target.value })}
                      placeholder="e.g. Asthma, Gluten allergy, past knee surgery details..."
                      rows={3}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow transition border-0 accent-bg"
                  >
                    Save Personal Profile
                  </button>
                </form>
              </div>

              {/* Change Password */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
                <h3 className="text-lg font-black text-white">Change Password</h3>
                <form 
                  onSubmit={e => {
                    e.preventDefault();
                    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                      alert('Passwords do not match!');
                      return;
                    }
                    alert('Password updated successfully!');
                    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                  }} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-400">Current Password</label>
                    <input 
                      type="password" 
                      value={passwordForm.oldPassword} 
                      onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">New Password</label>
                      <input 
                        type="password" 
                        value={passwordForm.newPassword} 
                        onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={passwordForm.confirmPassword} 
                        onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-black rounded-xl border border-zinc-800 transition"
                  >
                    Change Password
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 3: MEMBERSHIP MANAGEMENT */}
          {activeTab === 'membership' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              {/* Active Plan */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-2 leading-relaxed">
                  <span className="text-[10px] uppercase font-black tracking-widest text-orange-500 accent-text">Active Membership</span>
                  <h3 className="text-2xl font-black text-white">{member.membershipPlan}</h3>
                  <p className="text-xs text-zinc-400 font-semibold">
                    Status: <span className="text-emerald-400 font-extrabold">{member.membershipStatus}</span> • Expiry: <span className="text-zinc-200 font-bold">{member.expiryDate}</span>
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <span className="text-xs text-zinc-400 block font-semibold mb-1">Time Remaining</span>
                  <span className="text-lg font-black text-white bg-zinc-950 border border-zinc-800 px-4 py-1.5 rounded-xl">3 Months</span>
                </div>
              </div>

              {/* Upgrade / Renew Plans */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white">Upgrade & Renew Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Plan 1 */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-black tracking-wider text-zinc-550">Basic Entry</span>
                      <h4 className="text-base font-extrabold text-white">Silver Starter Pass</h4>
                      <p className="text-3xl font-black text-white mt-4">₹1,500 <span className="text-xs font-semibold text-zinc-500">/ 3 Months</span></p>
                      <ul className="text-xs text-zinc-400 font-bold space-y-2.5 pt-4">
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> Cardio & Strength area</li>
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> Shower & Lockers access</li>
                        <li><i className="fa-solid fa-xmark text-red-500 mr-2" /> Free personal trainer</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleRenewMembership('Silver Starter Pass', 1500)}
                      className="w-full py-2.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-black rounded-xl border border-zinc-800 transition"
                    >
                      Renew Plan
                    </button>
                  </div>

                  {/* Plan 2 */}
                  <div className="bg-zinc-900 border border-orange-500/50 accent-border rounded-3xl p-6 flex flex-col justify-between space-y-6 relative">
                    <span className="absolute -top-3 left-6 px-3 py-0.5 bg-orange-600 text-white text-[9px] font-black tracking-wider uppercase rounded-full shadow-md accent-bg">
                      Most Popular
                    </span>
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-black tracking-wider text-zinc-550">Best Value</span>
                      <h4 className="text-base font-extrabold text-white">Gold Premium Pass</h4>
                      <p className="text-3xl font-black text-white mt-4">₹3,200 <span className="text-xs font-semibold text-zinc-500">/ 3 Months</span></p>
                      <ul className="text-xs text-zinc-400 font-bold space-y-2.5 pt-4">
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> All Silver Starter options</li>
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> Access to Group HIIT classes</li>
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> Assigned trainer notes</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleRenewMembership('Gold Premium Pass', 3200)}
                      className="w-full py-2.5 bg-orange-650 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow-md transition border-0 accent-bg"
                    >
                      Upgrade/Renew Plan
                    </button>
                  </div>

                  {/* Plan 3 */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-black tracking-wider text-zinc-550">Elite Club</span>
                      <h4 className="text-base font-extrabold text-white">Platinum Trainer Pass</h4>
                      <p className="text-3xl font-black text-white mt-4">₹6,500 <span className="text-xs font-semibold text-zinc-500">/ 3 Months</span></p>
                      <ul className="text-xs text-zinc-400 font-bold space-y-2.5 pt-4">
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> Unlimited classes & gym entry</li>
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> 1-on-1 personal training</li>
                        <li><i className="fa-solid fa-check text-emerald-400 mr-2" /> Customized diets & workouts</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => handleRenewMembership('Platinum Trainer Pass', 6500)}
                      className="w-full py-2.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-black rounded-xl border border-zinc-800 transition"
                    >
                      Upgrade/Renew Plan
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 4: ATTENDANCE HISTORY */}
          {activeTab === 'attendance' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-lg font-black text-white">QR Code Check-In</h3>
                  <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                    Scan this QR code at the gym reception desk to record your attendance. Or tap the button below to emulator-scan.
                  </p>
                  
                  {/* QR code mock graphic */}
                  <div className="w-40 h-40 bg-white p-2.5 rounded-2xl mx-auto flex items-center justify-center border border-zinc-800 shadow">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${clientEmail}`} 
                      alt="Gym Access QR" 
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <button 
                    onClick={handleTriggerCheckIn}
                    className="w-full py-2.5 bg-orange-650 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow-md transition border-0 accent-bg"
                  >
                    Scan QR Code Check-In
                  </button>
                </div>

                <div className="space-y-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 self-start">
                  <h3 className="text-lg font-black text-white">Workout Visits</h3>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                    {attendance.map(a => (
                      <div key={a.id} className="flex justify-between items-center border-b border-zinc-800 pb-2.5 last:border-0 last:pb-0">
                        <div>
                          <p className="text-xs font-extrabold text-zinc-200">{a.checkInDate}</p>
                          <span className="text-[9px] text-zinc-550">Method: {a.type} scanner</span>
                        </div>
                        <span className="text-xs font-black text-orange-500 accent-text">{a.checkInTime}</span>
                      </div>
                    ))}
                    {attendance.length === 0 && (
                      <p className="text-xs text-zinc-550 py-10 text-center">No attendance check-ins logged yet.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: CLASS BOOKING */}
          {activeTab === 'bookings' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              {/* Classes Schedule */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white">Daily Workout Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classes.map(c => {
                    const bookingsForThisClass = bookings.filter(b => b.gymClassId === c.id && b.status === 'Booked');
                    const isUserBooked = bookingsForThisClass.some(b => b.memberEmail === clientEmail);
                    return (
                      <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="text-base font-extrabold text-white">{c.className}</h4>
                            <span className="text-[10px] text-zinc-550 font-bold">{c.scheduleTime}</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-bold">Trainer: <span className="text-zinc-200">{c.trainerName}</span></p>
                          
                          {/* Capacity progress */}
                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between text-[9px] font-black text-zinc-455">
                              <span>Slot Capacity</span>
                              <span>{c.bookedCount} / {c.capacity} Booked</span>
                            </div>
                            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                              <div 
                                className="h-full bg-orange-650 rounded-full transition-all duration-300 accent-bg" 
                                style={{ width: `${Math.min(100, (c.bookedCount / c.capacity) * 100)}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-2">
                          {isUserBooked ? (
                            <button
                              onClick={() => {
                                const booking = bookingsForThisClass.find(b => b.memberEmail === clientEmail);
                                if (booking) handleCancelBooking(booking.id);
                              }}
                              className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-[10px] font-bold rounded-lg transition"
                            >
                              Cancel Booking
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBookClass(c)}
                              className="px-4 py-2 bg-orange-655 hover:bg-orange-700 text-white text-[10px] font-bold rounded-lg transition border-0 accent-bg"
                            >
                              Book Class
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking History */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">My Class Booking History</h3>
                <div className="space-y-3">
                  {bookings.map(b => (
                    <div key={b.id} className="flex justify-between items-center border-b border-zinc-800 pb-2.5 last:border-0 last:pb-0">
                      <div>
                        <h4 className="text-xs font-extrabold text-zinc-200">{b.className}</h4>
                        <span className="text-[9px] text-zinc-500">Booked on: {b.bookingDate}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        b.status === 'Booked' ? 'bg-orange-600/10 text-orange-500 border border-orange-500/20 accent-text' : 'bg-zinc-800 text-zinc-500 border border-zinc-750'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <p className="text-xs text-zinc-550 text-center py-6">No class bookings recorded.</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: TRAINER MANAGEMENT */}
          {activeTab === 'trainer' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-4xl shadow">
                  🏋️‍♂️
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] uppercase font-black text-orange-500 tracking-wider accent-text">My Assigned Coach</span>
                  <h3 className="text-xl font-black text-white">{member.assignedTrainerName || 'Coach Marcus Irons'}</h3>
                  <p className="text-xs text-zinc-400 font-bold">Certifications: <span className="text-zinc-200">CSCS, CrossFit Level 2, CPR/AED Certified</span></p>
                  <p className="text-xs text-zinc-400 font-bold">Trainer Schedule: <span className="text-zinc-200">Mon-Fri 7:00 AM - 3:00 PM</span></p>
                </div>
              </div>

              {/* Trainer Notes */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">Coach Feedback & Notes</h3>
                <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5 space-y-3 leading-relaxed">
                  <p className="text-xs text-zinc-300 font-bold italic">
                    "Great work on your deadlift form last Tuesday, {member.name}! Make sure to keep your hips back and engage your core before starting the pull. Let's aim to increase the load by 5kg next week."
                  </p>
                  <span className="text-[9px] text-zinc-500 block text-right font-black">- Coach Marcus, June 26, 2026</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: WORKOUT PLANS */}
          {activeTab === 'workouts' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white">Daily Workout Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workoutPlans.map(w => (
                    <div key={w.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                      <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
                        <h4 className="text-sm font-extrabold text-white">{w.dayOfWeek}</h4>
                        <span className="text-[9px] uppercase font-bold text-orange-500 bg-orange-600/10 px-2 py-0.5 rounded accent-text">Strength</span>
                      </div>
                      <div className="space-y-3 text-xs leading-relaxed font-bold text-zinc-300">
                        {w.exercises.split(',').map((ex: string, idx: number) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <span className="text-orange-500 accent-text">•</span>
                            <span>{ex.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercise Library */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">FitZone Exercise Library</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Barbell Squat', target: 'Quads / Glutes', level: 'Intermediate' },
                    { name: 'Bench Press', target: 'Chest / Triceps', level: 'Beginner' },
                    { name: 'Deadlift', target: 'Hamstrings / Back', level: 'Advanced' },
                    { name: 'Pull-Ups', target: 'Lats / Biceps', level: 'Intermediate' }
                  ].map((ex, idx) => (
                    <div key={idx} className="bg-zinc-950 p-4 border border-zinc-850 rounded-2xl text-left space-y-2">
                      <h4 className="text-xs font-extrabold text-white">{ex.name}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold">Target: {ex.target}</p>
                      <span className="inline-block text-[8px] font-black text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded accent-text">{ex.level}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: DIET PLANS */}
          {activeTab === 'diets' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Diet Chart */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-lg font-black text-white">Daily Diet Chart</h3>
                    {dietPlan?.dietChart ? dietPlan.dietChart.split('\n').map((meal: string, idx: number) => {
                      const parts = meal.split(':');
                      return (
                        <div key={idx} className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl">
                          <h4 className="text-xs font-black text-orange-500 accent-text uppercase">{parts[0]}</h4>
                          <p className="text-xs text-zinc-200 mt-1.5 font-bold leading-normal">{parts[1] || 'Seeded diet'}</p>
                        </div>
                      );
                    }) : (
                      <p className="text-xs text-zinc-550 text-center py-6">No diet chart assigned.</p>
                    )}
                </div>

                {/* Nutrition Goals & Water Tracking */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
                  <h3 className="text-lg font-black text-white">Nutrition Goals</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5">
                        <span>Protein Target</span>
                        <span className="text-white">160g / 180g</span>
                      </div>
                      <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                        <div className="h-full bg-orange-655 rounded-full accent-bg" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5">
                        <span>Daily Water Intake</span>
                        <span className="text-white">2.5L / {dietPlan?.waterGoal || '3.5L'}</span>
                      </div>
                      <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Meal Tracking Check list */}
                  <div className="border-t border-zinc-800 pt-4 space-y-3">
                    <span className="text-xs font-black uppercase text-zinc-400 tracking-wider">Meal Log Tracker</span>
                    <div className="space-y-2">
                      {['Logged Breakfast macros', 'Logged Pre-workout meal', 'Logged Dinner calories'].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-3 bg-zinc-950 border border-zinc-850 p-3 rounded-xl cursor-pointer">
                          <input type="checkbox" defaultChecked={idx === 0} className="rounded text-orange-600 focus:ring-orange-500 bg-zinc-900 border-zinc-800" />
                          <span className="text-xs text-zinc-300 font-bold">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 9: PROGRESS TRACKING */}
          {activeTab === 'progress' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Save Daily Metrics */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-lg font-black text-white">Log Weight & Progress</h3>
                  <form onSubmit={handleSaveProgress} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Current Weight (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={newWeight}
                        onChange={e => setNewWeight(e.target.value)}
                        placeholder={member.currentWeight ? String(member.currentWeight) : "75.0"}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Progress Photo URL</label>
                      <input 
                        type="text" 
                        value={newPhotoUrl}
                        onChange={e => setNewPhotoUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl transition border-0 accent-bg"
                    >
                      Save Daily Stats
                    </button>
                  </form>
                </div>

                {/* Body Measurements */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-lg font-black text-white">Body Measurements (cm)</h3>
                  <form onSubmit={handleSaveMeasurements} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Chest</label>
                      <input 
                        type="text" 
                        value={measurementForm.chest} 
                        onChange={e => setMeasurementForm({ ...measurementForm, chest: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Waist</label>
                      <input 
                        type="text" 
                        value={measurementForm.waist} 
                        onChange={e => setMeasurementForm({ ...measurementForm, waist: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Biceps</label>
                      <input 
                        type="text" 
                        value={measurementForm.biceps} 
                        onChange={e => setMeasurementForm({ ...measurementForm, biceps: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Thighs</label>
                      <input 
                        type="text" 
                        value={measurementForm.thighs} 
                        onChange={e => setMeasurementForm({ ...measurementForm, thighs: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="col-span-2 pt-2">
                      <button 
                        type="submit"
                        className="px-5 py-2.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 text-xs font-black rounded-xl border border-zinc-800 transition"
                      >
                        Save Measurements
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Progress Photos logs */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">My Progress Photo Log</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(() => {
                    let photoList = [];
                    if (member.progressPhotos) {
                      try {
                        photoList = JSON.parse(member.progressPhotos);
                      } catch (e) {
                        photoList = member.progressPhotos.split(',');
                      }
                    }
                    return photoList.map((url: string, idx: number) => (
                      <div key={idx} className="h-32 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-850">
                        <img src={url} alt={`progress ${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ));
                  })()}
                </div>
              </div>

            </div>
          )}

          {/* TAB 10: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-lg font-black text-white mb-4">Payment History & Invoices</h3>
                <div className="space-y-3 divide-y divide-zinc-800">
                  {payments.map(p => (
                    <div key={p.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                      <div>
                        <h4 className="text-sm font-extrabold text-zinc-200">{p.planName}</h4>
                        <p className="text-[10px] text-zinc-500 font-bold mt-1">Paid on: {p.paymentDate} • via {p.paymentMethod}</p>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <span className="text-sm font-black text-orange-500 accent-text">₹{p.amount}</span>
                          <span className="block text-[9px] font-bold text-emerald-400 uppercase mt-0.5">{p.status}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Invoice receipt for ₹${p.amount} downloaded!`)}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-[10px] text-zinc-300 hover:text-white font-bold rounded border border-zinc-700 transition"
                        >
                          Invoice Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                  {payments.length === 0 && (
                    <p className="text-xs text-zinc-550 text-center py-6">No payments logged in the database.</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 11: HELP & SUPPORT */}
          {activeTab === 'support' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Raise Ticket & History */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-black text-white">Raise a Support Ticket</h3>
                    <p className="text-xs text-zinc-400 font-bold mt-1">Submit feedback or request locker keys / trainer changes.</p>
                  </div>
                  
                  <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Subject</label>
                      <input 
                        type="text" 
                        value={newTicketSubject}
                        onChange={e => setNewTicketSubject(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400">Message</label>
                      <textarea 
                        value={newTicketMessage}
                        onChange={e => setNewTicketMessage(e.target.value)}
                        rows={3}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-orange-650 hover:bg-orange-700 text-white text-xs font-black rounded-xl transition border-0 accent-bg"
                    >
                      Submit Ticket
                    </button>
                  </form>

                  {/* Active tickets */}
                  <div className="border-t border-zinc-800 pt-4 space-y-3">
                    <span className="text-xs font-black uppercase text-zinc-400 tracking-wider">Ticket History</span>
                    <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                      {tickets.map(t => (
                        <div key={t.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-extrabold text-zinc-200">{t.subject}</h4>
                            <p className="text-[10px] text-zinc-500 font-bold mt-1">{t.date} • {t.message}</p>
                          </div>
                          <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 border border-orange-500/20 text-[9px] font-black uppercase rounded accent-text">
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Chat Support box */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between h-[450px]">
                  <div>
                    <h3 className="text-base font-black text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live Chat Support</span>
                    </h3>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1 text-xs">
                    {chatMessages.map((m, idx) => {
                      const isSupport = m.sender === 'support';
                      return (
                        <div key={idx} className={`flex flex-col ${isSupport ? 'items-start' : 'items-end'}`}>
                          <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                            isSupport 
                              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' 
                              : 'bg-orange-600 text-white accent-bg'
                          }`}>
                            <p className="font-bold">{m.text}</p>
                          </div>
                          <span className="text-[9px] text-zinc-500 mt-1 px-1">{m.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendChatMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                    />
                    <button 
                      type="submit"
                      className="px-4 bg-orange-655 hover:bg-orange-700 text-white rounded-xl flex items-center justify-center transition border-0 accent-bg"
                    >
                      <i className="fa-solid fa-paper-plane text-xs" />
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}
