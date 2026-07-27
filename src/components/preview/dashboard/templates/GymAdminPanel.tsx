'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { api } from '@/services/api';
import { useDarkMode } from '@/hooks/useDarkMode';

interface GymAdminPanelProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

type AdminTab = 
  | 'dashboard' 
  | 'users' 
  | 'plans' 
  | 'trainers' 
  | 'classes' 
  | 'attendance' 
  | 'workouts_diets' 
  | 'payments' 
  | 'expenses' 
  | 'staff' 
  | 'equipment' 
  | 'offers';

export default function GymAdminPanel({
  projectId,
  theme,
  onLogout,
  companyName,
  logoIcon,
}: GymAdminPanelProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [members, setMembers] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Member Modal/Form States
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    membershipPlan: 'Silver Starter Pass',
    membershipStatus: 'Active',
    expiryDate: '2026-12-31',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalInformation: '',
    profilePhotoUrl: '',
  });
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);

  // Add Trainer Form
  const [trainerForm, setTrainerForm] = useState({
    name: '',
    email: '',
    phone: '',
    certifications: '',
    schedule: '',
    salary: '',
  });
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [editingTrainerId, setEditingTrainerId] = useState<number | null>(null);

  // Add Class Form
  const [classForm, setClassForm] = useState({
    className: '',
    trainerName: '',
    scheduleTime: '',
    capacity: '20',
  });
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);

  // Workout/Diet Assigner Form
  const [assignTargetEmail, setAssignTargetEmail] = useState('');
  const [workoutForm, setWorkoutForm] = useState({
    dayOfWeek: 'Monday',
    exercises: '',
  });
  const [dietForm, setDietForm] = useState({
    dietChart: '',
    waterGoal: '3.5 Liters',
  });

  // Expense Form
  const [expenseForm, setExpenseForm] = useState({
    expenseName: '',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    category: 'Rent',
  });

  // Equipment Form
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    maintenanceSchedule: 'Every 3 Months',
    warrantyDetails: '',
  });

  // Offer Form
  const [offerForm, setOfferForm] = useState({
    code: '',
    discountAmount: '',
    type: 'Percentage',
    status: 'Active',
  });

  // Load backend data
  useEffect(() => {
    fetchData();
  }, [projectId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const memList = await api.gymManagement.members.list(projectId);
      setMembers(Array.isArray(memList) ? memList : []);

      const trainList = await api.gymManagement.trainers.list(projectId);
      setTrainers(Array.isArray(trainList) ? trainList : []);

      const classList = await api.gymManagement.classes.list(projectId);
      setClasses(Array.isArray(classList) ? classList : []);

      const attList = await api.gymManagement.attendance.list(projectId);
      setAttendance(Array.isArray(attList) ? attList : []);

      const payList = await api.gymManagement.payments.list(projectId);
      setPayments(Array.isArray(payList) ? payList : []);

      const expList = await api.gymManagement.expenses.list(projectId);
      setExpenses(Array.isArray(expList) ? expList : []);

      const eqList = await api.gymManagement.equipment.list(projectId);
      setEquipment(Array.isArray(eqList) ? eqList : []);

      const offerList = await api.gymManagement.offers.list(projectId);
      setOffers(Array.isArray(offerList) ? offerList : []);

      if (Array.isArray(memList) && memList.length > 0) {
        setAssignTargetEmail(memList[0].email);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // --- Member CRUD Actions ---
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...memberForm,
        projectId,
        id: editingMemberId || undefined
      };
      await api.gymManagement.members.save(payload);
      alert('Member profile saved successfully!');
      setIsMemberModalOpen(false);
      resetMemberForm();
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to save member.');
    }
  };

  const handleEditMember = (member: any) => {
    setEditingMemberId(member.id);
    setMemberForm({
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      membershipPlan: member.membershipPlan || 'Silver Starter Pass',
      membershipStatus: member.membershipStatus || 'Active',
      expiryDate: member.expiryDate || '2026-12-31',
      emergencyContactName: member.emergencyContactName || '',
      emergencyContactPhone: member.emergencyContactPhone || '',
      medicalInformation: member.medicalInformation || '',
      profilePhotoUrl: member.profilePhotoUrl || '',
    });
    setIsMemberModalOpen(true);
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm('Are you sure you want to remove this member profile?')) return;
    try {
      await api.gymManagement.members.delete(id);
      alert('Member profile deleted.');
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const resetMemberForm = () => {
    setEditingMemberId(null);
    setMemberForm({
      name: '',
      email: '',
      phone: '',
      membershipPlan: 'Silver Starter Pass',
      membershipStatus: 'Active',
      expiryDate: '2026-12-31',
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalInformation: '',
      profilePhotoUrl: '',
    });
  };

  // --- Trainer CRUD Actions ---
  const handleSaveTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const salaryNum = parseFloat(trainerForm.salary);
      const payload = {
        ...trainerForm,
        projectId,
        salary: isNaN(salaryNum) ? 0 : salaryNum,
        id: editingTrainerId || undefined
      };
      await api.gymManagement.trainers.save(payload);
      alert('Trainer details saved!');
      setIsTrainerModalOpen(false);
      resetTrainerForm();
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditTrainer = (trainer: any) => {
    setEditingTrainerId(trainer.id);
    setTrainerForm({
      name: trainer.name || '',
      email: trainer.email || '',
      phone: trainer.phone || '',
      certifications: trainer.certifications || '',
      schedule: trainer.schedule || '',
      salary: trainer.salary ? String(trainer.salary) : '',
    });
    setIsTrainerModalOpen(true);
  };

  const handleDeleteTrainer = async (id: number) => {
    if (!confirm('Are you sure you want to remove this trainer?')) return;
    try {
      await api.gymManagement.trainers.delete(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const resetTrainerForm = () => {
    setEditingTrainerId(null);
    setTrainerForm({
      name: '',
      email: '',
      phone: '',
      certifications: '',
      schedule: '',
      salary: '',
    });
  };

  // --- Class Scheduler Actions ---
  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const capNum = parseInt(classForm.capacity, 10);
      const payload = {
        ...classForm,
        projectId,
        capacity: isNaN(capNum) ? 20 : capNum,
        id: editingClassId || undefined
      };
      await api.gymManagement.classes.save(payload);
      alert('Workout class scheduled!');
      setIsClassModalOpen(false);
      resetClassForm();
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClass = (c: any) => {
    setEditingClassId(c.id);
    setClassForm({
      className: c.className || '',
      trainerName: c.trainerName || '',
      scheduleTime: c.scheduleTime || '',
      capacity: String(c.capacity || 20),
    });
    setIsClassModalOpen(true);
  };

  const handleDeleteClass = async (id: number) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    try {
      await api.gymManagement.classes.delete(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const resetClassForm = () => {
    setEditingClassId(null);
    setClassForm({
      className: '',
      trainerName: '',
      scheduleTime: '',
      capacity: '20',
    });
  };

  // --- Workout/Diet Assigner Actions ---
  const handleAssignWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTargetEmail || !workoutForm.exercises.trim()) return;
    try {
      const payload = {
        projectId,
        memberEmail: assignTargetEmail,
        dayOfWeek: workoutForm.dayOfWeek,
        exercises: workoutForm.exercises
      };
      await api.gymManagement.workouts.save(payload);
      alert(`Workout routine assigned successfully to ${assignTargetEmail}!`);
      setWorkoutForm({ ...workoutForm, exercises: '' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAssignDiet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTargetEmail || !dietForm.dietChart.trim()) return;
    try {
      const payload = {
        projectId,
        memberEmail: assignTargetEmail,
        dietChart: dietForm.dietChart,
        waterGoal: dietForm.waterGoal
      };
      await api.gymManagement.diets.save(payload);
      alert(`Diet nutrition plan assigned successfully to ${assignTargetEmail}!`);
      setDietForm({ ...dietForm, dietChart: '' });
    } catch (e) {
      console.error(e);
    }
  };

  // --- Expense Management Actions ---
  const handleSaveExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(expenseForm.amount);
    if (isNaN(amountNum) || !expenseForm.expenseName.trim()) return;
    try {
      const payload = {
        ...expenseForm,
        projectId,
        amount: amountNum
      };
      await api.gymManagement.expenses.save(payload);
      alert('Expense logged!');
      setExpenseForm({ expenseName: '', amount: '', expenseDate: new Date().toISOString().split('T')[0], category: 'Rent' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await api.gymManagement.expenses.delete(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // --- Equipment Actions ---
  const handleSaveEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipmentForm.name.trim()) return;
    try {
      const payload = {
        ...equipmentForm,
        projectId
      };
      await api.gymManagement.equipment.save(payload);
      alert('Machine added to registry!');
      setEquipmentForm({ name: '', purchaseDate: new Date().toISOString().split('T')[0], maintenanceSchedule: 'Every 3 Months', warrantyDetails: '' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEquipment = async (id: number) => {
    try {
      await api.gymManagement.equipment.delete(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // --- Promo Coupon Actions ---
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amtNum = parseFloat(offerForm.discountAmount);
    if (isNaN(amtNum) || !offerForm.code.trim()) return;
    try {
      const payload = {
        ...offerForm,
        projectId,
        discountAmount: amtNum
      };
      await api.gymManagement.offers.save(payload);
      alert('Promo coupon code generated!');
      setOfferForm({ code: '', discountAmount: '', type: 'Percentage', status: 'Active' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteOffer = async (id: number) => {
    try {
      await api.gymManagement.offers.delete(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-orange-500 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loading Gym Operator Panel...</p>
        </div>
      </div>
    );
  }

  // Derive stats
  const totalMembersCount = members.length;
  const activeMembersCount = members.filter(m => m.membershipStatus === 'Active').length;
  const expiredMembersCount = members.filter(m => m.membershipStatus === 'Expired').length;
  const todayAttendanceCount = attendance.filter(a => a.checkInDate === new Date().toISOString().split('T')[0]).length;
  const totalRevenueSum = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="h-screen flex overflow-hidden bg-zinc-950 text-zinc-100 font-sans select-none">
      
      {/* Accent Color styles */}
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
            <span className="text-white font-extrabold text-lg tracking-tight truncate">{companyName || 'FitZone Admin'}</span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1">
            {[
              { id: 'dashboard', label: 'Admin Dashboard', icon: 'fa-chart-pie' },
              { id: 'users', label: 'Member Registry', icon: 'fa-users-gear' },
              { id: 'plans', label: 'Membership Plans', icon: 'fa-list-check' },
              { id: 'trainers', label: 'Trainer Directory', icon: 'fa-people-group' },
              { id: 'classes', label: 'Class Schedules', icon: 'fa-stopwatch' },
              { id: 'attendance', label: 'Attendance logs', icon: 'fa-user-check' },
              { id: 'workouts_diets', label: 'Diet & Workout Assign', icon: 'fa-dumbbell' },
              { id: 'payments', label: 'Invoices & Income', icon: 'fa-money-bill-transfer' },
              { id: 'expenses', label: 'Expenses Log', icon: 'fa-receipt' },
              { id: 'staff', label: 'Staff Roster', icon: 'fa-id-badge' },
              { id: 'equipment', label: 'Equipment Inventory', icon: 'fa-screwdriver-wrench' },
              { id: 'offers', label: 'Offers & Coupons', icon: 'fa-tags' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
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
              <span className="w-8 h-8 rounded-full bg-zinc-750 flex items-center justify-center font-black text-xs text-orange-500 uppercase shadow-sm accent-text">
                A
              </span>
              <div className="truncate leading-tight text-left">
                <p className="text-xs font-extrabold text-zinc-100 truncate">FitZone Admin</p>
                <span className="text-[9px] text-zinc-550 font-semibold truncate">admin@gmail.com</span>
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
            <h2 className="text-lg font-black tracking-tight text-zinc-200 capitalize">{activeTab} control</h2>
          </div>
          <div className="text-xs text-zinc-500 font-extrabold bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 shadow-sm">
            Supabase PostgreSQL: <span className="text-emerald-400">Synced</span>
          </div>
        </header>

        {/* Dynamic Panels */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* TAB 1: DASHBOARD METRICS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in text-left max-w-5xl">
              
              {/* Metrics cards row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { title: 'Total Members', value: totalMembersCount, desc: 'registered in system', icon: 'fa-users', color: 'text-orange-500' },
                  { title: 'Active Members', value: activeMembersCount, desc: 'paying gym pass holder', icon: 'fa-circle-check', color: 'text-emerald-400' },
                  { title: 'Expired Members', value: expiredMembersCount, desc: 'require renewal alerts', icon: 'fa-circle-xmark', color: 'text-red-400' },
                  { title: 'Today Check-Ins', value: todayAttendanceCount, desc: 'QR/RFID logged today', icon: 'fa-clipboard-user', color: 'text-blue-400' },
                  { title: 'Gross Revenue', value: `₹${totalRevenueSum.toLocaleString()}`, desc: 'lifetime total receipts', icon: 'fa-file-invoice-dollar', color: 'text-purple-400' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-none">{stat.title}</span>
                      <i className={`fa-solid ${stat.icon} ${stat.color} text-sm`} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <span className="text-[9px] text-zinc-550 block font-semibold mt-1">{stat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions and recent lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* QR scanner emulator console */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300">Front Desk QR Scan Emulator</h3>
                  <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                    Type a member's email below to emulate scanning their QR check-in code at the front reception counter.
                  </p>
                  
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const targetEmail = e.currentTarget.email.value.trim();
                      if (!targetEmail) return;
                      try {
                        const payload = {
                          projectId,
                          memberEmail: targetEmail,
                          checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          checkInDate: new Date().toISOString().split('T')[0],
                          type: 'QR'
                        };
                        await api.gymManagement.attendance.save(payload);
                        alert(`Attendance logged successfully for ${targetEmail}!`);
                        e.currentTarget.reset();
                        fetchData();
                      } catch (err) {
                        alert('Could not find member.');
                      }
                    }} 
                    className="flex gap-2"
                  >
                    <input 
                      name="email"
                      type="email" 
                      placeholder="member@gmail.com"
                      className="flex-1 bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition"
                      required
                    />
                    <button 
                      type="submit" 
                      className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow transition border-0 accent-bg"
                    >
                      Log Check-In
                    </button>
                  </form>
                </div>

                {/* Today's Attendance logs */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300">Today's Gym Visits</h3>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {attendance.filter(a => a.checkInDate === new Date().toISOString().split('T')[0]).map(a => (
                      <div key={a.id} className="flex justify-between items-center border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
                        <div>
                          <p className="text-xs font-extrabold text-zinc-200">{a.memberEmail}</p>
                          <span className="text-[9px] text-zinc-550">Method: {a.type} Scan</span>
                        </div>
                        <span className="text-xs font-black text-orange-500 accent-text">{a.checkInTime}</span>
                      </div>
                    ))}
                    {todayAttendanceCount === 0 && (
                      <p className="text-xs text-zinc-550 py-8 text-center">No visits logged today.</p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in text-left max-w-5xl">
              
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white">Registered Gym Members</h3>
                <button
                  onClick={() => { resetMemberForm(); setIsMemberModalOpen(true); }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow transition border-0 accent-bg"
                >
                  + Add Member
                </button>
              </div>

              {/* Members Table */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-850 border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="p-4">Name</th>
                      <th className="p-4">Plan / Status</th>
                      <th className="p-4">Expiry</th>
                      <th className="p-4">Weight / BMI</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-semibold text-zinc-200">
                    {members.map(m => (
                      <tr key={m.id} className="hover:bg-zinc-850/30">
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-black text-xs text-orange-500 uppercase border border-zinc-700 accent-text">
                              {m.name ? m.name[0] : 'M'}
                            </span>
                            <div>
                              <p className="font-extrabold text-white leading-none">{m.name}</p>
                              <span className="text-[10px] text-zinc-550 mt-1.5 block">{m.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-zinc-300 font-bold">{m.membershipPlan}</p>
                          <span className={`inline-block px-1.5 py-0.5 text-[8px] font-black uppercase rounded mt-1 ${
                            m.membershipStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {m.membershipStatus}
                          </span>
                        </td>
                        <td className="p-4">{m.expiryDate}</td>
                        <td className="p-4">
                          {m.currentWeight ? `${m.currentWeight}kg` : '--'} / {m.bmi ? m.bmi : '--'}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleEditMember(m)}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-750 text-[10px] text-zinc-300 hover:text-white font-bold rounded border border-zinc-700 transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteMember(m.id)}
                            className="px-2.5 py-1 bg-red-950/20 hover:bg-red-950/40 text-[10px] text-red-400 font-bold rounded border border-red-900/20 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Member Modal */}
              {isMemberModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm p-4">
                  <div className="bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-zinc-800 shadow-2xl relative text-left">
                    <h3 className="text-lg font-black text-white mb-4">{editingMemberId ? 'Edit Gym Member' : 'Register Gym Member'}</h3>
                    <form onSubmit={handleSaveMember} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-400">Full Name</label>
                          <input 
                            type="text" 
                            value={memberForm.name} 
                            onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-400">Email Address</label>
                          <input 
                            type="email" 
                            value={memberForm.email} 
                            onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                            disabled={editingMemberId !== null}
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-400">Phone</label>
                          <input 
                            type="text" 
                            value={memberForm.phone} 
                            onChange={e => setMemberForm({ ...memberForm, phone: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-400">Membership Expiry</label>
                          <input 
                            type="date" 
                            value={memberForm.expiryDate} 
                            onChange={e => setMemberForm({ ...memberForm, expiryDate: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-400">Assign Plan</label>
                          <select 
                            value={memberForm.membershipPlan}
                            onChange={e => setMemberForm({ ...memberForm, membershipPlan: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          >
                            <option>Silver Starter Pass</option>
                            <option>Gold Premium Pass</option>
                            <option>Platinum Trainer Pass</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-400">Status</label>
                          <select 
                            value={memberForm.membershipStatus}
                            onChange={e => setMemberForm({ ...memberForm, membershipStatus: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          >
                            <option>Active</option>
                            <option>Expired</option>
                            <option>Frozen</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-850">
                        <button 
                          type="button" 
                          onClick={() => setIsMemberModalOpen(false)}
                          className="px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-5 py-2 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl border-0 accent-bg"
                        >
                          Save Member
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: MEMBERSHIP PLANS */}
          {activeTab === 'plans' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              <h3 className="text-lg font-black text-white">Create & Assign Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Silver Starter Pass', price: 1500, access: 'Cardio area access, standard lockers' },
                  { name: 'Gold Premium Pass', price: 3200, access: 'All areas + Group HIIT sessions' },
                  { name: 'Platinum Trainer Pass', price: 6500, access: 'Unlimited access + 1-on-1 coach sessions' }
                ].map((plan, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-white">{plan.name}</h4>
                      <p className="text-2xl font-black text-orange-500 accent-text">₹{plan.price}</p>
                      <span className="text-[10px] text-zinc-500 font-bold block pt-2">Includes: {plan.access}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Plan layout assigned to builder config.`)}
                      className="w-full py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white text-xs font-bold rounded-xl border border-zinc-700 transition"
                    >
                      Configure Layout
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRAINER MANAGEMENT */}
          {activeTab === 'trainers' && (
            <div className="space-y-6 animate-fade-in text-left max-w-5xl">
              
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white">Personal Training Staff</h3>
                <button
                  onClick={() => { resetTrainerForm(); setIsTrainerModalOpen(true); }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow transition border-0 accent-bg"
                >
                  + Add Trainer
                </button>
              </div>

              {/* Trainers Directory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainers.map(t => (
                  <div key={t.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-3xl shadow">
                      🏋️‍♂️
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-base font-extrabold text-white leading-tight">{t.name}</h4>
                      <p className="text-[10px] text-zinc-455 font-bold">{t.email} • {t.phone}</p>
                      <p className="text-xs text-zinc-300 font-semibold pt-1">Certs: <span className="text-orange-500 accent-text">{t.certifications}</span></p>
                      <p className="text-xs text-zinc-400 font-semibold">Schedule: <span className="text-zinc-200">{t.schedule}</span></p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-zinc-800 mt-2">
                        <span className="text-xs font-extrabold text-zinc-400">Monthly Salary: <span className="text-white font-black">₹{t.salary}</span></span>
                        <div className="space-x-2">
                          <button 
                            onClick={() => handleEditTrainer(t)}
                            className="text-[10px] font-bold text-orange-500 hover:text-orange-655 bg-transparent border-0 cursor-pointer accent-text"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteTrainer(t.id)}
                            className="text-[10px] font-bold text-red-400 hover:text-red-500 bg-transparent border-0 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trainer Modal */}
              {isTrainerModalOpen && (
                <div className="fixed inset-0 z-55 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm p-4">
                  <div className="bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-sm w-full border border-zinc-800 shadow-2xl relative text-left">
                    <h3 className="text-sm font-black text-white mb-4">{editingTrainerId ? 'Edit Trainer' : 'Add Gym Trainer'}</h3>
                    <form onSubmit={handleSaveTrainer} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Full Name</label>
                        <input 
                          type="text" 
                          value={trainerForm.name} 
                          onChange={e => setTrainerForm({ ...trainerForm, name: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Email</label>
                        <input 
                          type="email" 
                          value={trainerForm.email} 
                          onChange={e => setTrainerForm({ ...trainerForm, email: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Phone</label>
                        <input 
                          type="text" 
                          value={trainerForm.phone} 
                          onChange={e => setTrainerForm({ ...trainerForm, phone: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Certifications</label>
                        <input 
                          type="text" 
                          value={trainerForm.certifications} 
                          onChange={e => setTrainerForm({ ...trainerForm, certifications: e.target.value })}
                          placeholder="e.g. CSCS, CrossFit L1"
                          className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Schedule Details</label>
                        <input 
                          type="text" 
                          value={trainerForm.schedule} 
                          onChange={e => setTrainerForm({ ...trainerForm, schedule: e.target.value })}
                          placeholder="Mon-Fri 7 AM - 3 PM"
                          className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Salary (Monthly)</label>
                        <input 
                          type="text" 
                          value={trainerForm.salary} 
                          onChange={e => setTrainerForm({ ...trainerForm, salary: e.target.value })}
                          placeholder="45000"
                          className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-850">
                        <button 
                          type="button" 
                          onClick={() => setIsTrainerModalOpen(false)}
                          className="px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-5 py-2 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl border-0 accent-bg"
                        >
                          Save Trainer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: CLASS SCHEDULER */}
          {activeTab === 'classes' && (
            <div className="space-y-6 animate-fade-in text-left max-w-5xl">
              
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white">Scheduled Workout Classes</h3>
                <button
                  onClick={() => { resetClassForm(); setIsClassModalOpen(true); }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow transition border-0 accent-bg"
                >
                  + Add Class
                </button>
              </div>

              {/* Class Schedule Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map(c => (
                  <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-base font-extrabold text-white leading-tight">{c.className}</h4>
                        <span className="text-[10px] text-zinc-550 font-bold">{c.scheduleTime}</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-bold">Trainer: <span className="text-zinc-200">{c.trainerName}</span></p>
                      <p className="text-xs text-zinc-400 font-bold">Capacity limit: <span className="text-zinc-200">{c.bookedCount} / {c.capacity} Booked</span></p>
                    </div>
                    <div className="flex justify-end gap-2 border-t border-zinc-800 pt-3 mt-2">
                      <button 
                        onClick={() => handleEditClass(c)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-755 text-[10px] text-zinc-200 font-bold rounded-lg border border-zinc-750"
                      >
                        Edit Class
                      </button>
                      <button 
                        onClick={() => handleDeleteClass(c.id)}
                        className="px-3 py-1.5 bg-red-950/10 hover:bg-red-950/20 text-[10px] text-red-400 font-bold rounded-lg border border-red-900/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Class Modal */}
              {isClassModalOpen && (
                <div className="fixed inset-0 z-55 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm p-4">
                  <div className="bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-sm w-full border border-zinc-800 shadow-2xl relative text-left">
                    <h3 className="text-sm font-black text-white mb-4">{editingClassId ? 'Edit Scheduled Class' : 'Schedule Workout Class'}</h3>
                    <form onSubmit={handleSaveClass} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Class Name</label>
                        <input 
                          type="text" 
                          value={classForm.className} 
                          onChange={e => setClassForm({ ...classForm, className: e.target.value })}
                          placeholder="e.g. Morning HIIT Burn"
                          className="w-full bg-zinc-950 border border-zinc-855 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Coach / Trainer Name</label>
                        <input 
                          type="text" 
                          value={classForm.trainerName} 
                          onChange={e => setClassForm({ ...classForm, trainerName: e.target.value })}
                          placeholder="e.g. Coach Marcus"
                          className="w-full bg-zinc-950 border border-zinc-855 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Schedule Time</label>
                        <input 
                          type="text" 
                          value={classForm.scheduleTime} 
                          onChange={e => setClassForm({ ...classForm, scheduleTime: e.target.value })}
                          placeholder="Mon, Wed, Fri 8:00 AM"
                          className="w-full bg-zinc-950 border border-zinc-855 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-zinc-400">Capacity Limit</label>
                        <input 
                          type="number" 
                          value={classForm.capacity} 
                          onChange={e => setClassForm({ ...classForm, capacity: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-855 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-855">
                        <button 
                          type="button" 
                          onClick={() => setIsClassModalOpen(false)}
                          className="px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-5 py-2 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl border-0 accent-bg"
                        >
                          Save Class
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 6: ATTENDANCE LOGS */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 animate-fade-in text-left max-w-5xl">
              <h3 className="text-lg font-black text-white">Full Attendance & Check-In History</h3>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-850 border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="p-4">Member Email</th>
                      <th className="p-4">Check-In Date</th>
                      <th className="p-4">Check-In Time</th>
                      <th className="p-4">Check-In Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-semibold text-zinc-200">
                    {attendance.map(a => (
                      <tr key={a.id} className="hover:bg-zinc-850/30">
                        <td className="p-4 font-extrabold text-white">{a.memberEmail}</td>
                        <td className="p-4">{a.checkInDate}</td>
                        <td className="p-4">{a.checkInTime}</td>
                        <td className="p-4 uppercase text-orange-500 accent-text">{a.type} Reader</td>
                      </tr>
                    ))}
                    {attendance.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-zinc-550">No check-in visits logged in the database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: WORKOUT & DIET ASSIGNERS */}
          {activeTab === 'workouts_diets' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              {/* Select Target member */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-400 block">Select Member to Assign Plans</label>
                <select 
                  value={assignTargetEmail}
                  onChange={e => setAssignTargetEmail(e.target.value)}
                  className="w-full max-w-md bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition accent-ring"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.email}>{m.name} ({m.email})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Assign Workout Plan */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300">Assign Workout routine</h3>
                  <form onSubmit={handleAssignWorkout} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Day of Week</label>
                      <select 
                        value={workoutForm.dayOfWeek}
                        onChange={e => setWorkoutForm({ ...workoutForm, dayOfWeek: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Exercises (comma separated)</label>
                      <textarea 
                        value={workoutForm.exercises}
                        onChange={e => setWorkoutForm({ ...workoutForm, exercises: e.target.value })}
                        placeholder="Bench Press (4x10), Shoulder Press (3x12)"
                        rows={3}
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-orange-655 hover:bg-orange-700 text-white text-xs font-bold rounded-xl border-0 accent-bg"
                    >
                      Assign Workout Plan
                    </button>
                  </form>
                </div>

                {/* Assign Diet Plan */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300">Assign Nutrition Diet Plan</h3>
                  <form onSubmit={handleAssignDiet} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Diet Meals Chart (newline separated)</label>
                      <textarea 
                        value={dietForm.dietChart}
                        onChange={e => setDietForm({ ...dietForm, dietChart: e.target.value })}
                        placeholder="Breakfast: Eggs & Oats&#10;Lunch: Chicken & Rice"
                        rows={3}
                        className="w-full bg-zinc-950 border border-zinc-855 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Daily Water Target Goal</label>
                      <input 
                        type="text" 
                        value={dietForm.waterGoal}
                        onChange={e => setDietForm({ ...dietForm, waterGoal: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-855 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-orange-655 hover:bg-orange-700 text-white text-xs font-bold rounded-xl border-0 accent-bg"
                    >
                      Assign Nutrition Plan
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

          {/* TAB 8: PAYMENT HISTORY */}
          {activeTab === 'payments' && (
            <div className="space-y-6 animate-fade-in text-left max-w-5xl">
              <h3 className="text-lg font-black text-white">Membership Receipts & Sales Income</h3>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-850 border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="p-4">Member Email</th>
                      <th className="p-4">Paid Plan</th>
                      <th className="p-4">Payment Date</th>
                      <th className="p-4">Method</th>
                      <th className="p-4 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-semibold text-zinc-200">
                    {payments.map(p => (
                      <tr key={p.id} className="hover:bg-zinc-850/30">
                        <td className="p-4 font-extrabold text-white">{p.memberEmail}</td>
                        <td className="p-4">{p.planName}</td>
                        <td className="p-4">{p.paymentDate}</td>
                        <td className="p-4 uppercase text-zinc-400">{p.paymentMethod}</td>
                        <td className="p-4 text-right text-orange-500 font-black accent-text">₹{p.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-zinc-550">No invoice receipts recorded.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: EXPENSES LOG */}
          {activeTab === 'expenses' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Log Expense Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 md:col-span-1 self-start">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-350">Log Club Expense</h3>
                  <form onSubmit={handleSaveExpense} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Expense Label</label>
                      <input 
                        type="text" 
                        value={expenseForm.expenseName}
                        onChange={e => setExpenseForm({ ...expenseForm, expenseName: e.target.value })}
                        placeholder="e.g. Electricity Bill"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Amount (₹)</label>
                      <input 
                        type="text" 
                        value={expenseForm.amount}
                        onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                        placeholder="1500"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Category</label>
                      <select 
                        value={expenseForm.category}
                        onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      >
                        <option>Rent</option>
                        <option>Electricity</option>
                        <option>Equipment</option>
                        <option>Staff Salary</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-2.5 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl border-0 accent-bg"
                    >
                      Record Expense
                    </button>
                  </form>
                </div>

                {/* Expense List */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:col-span-2 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-350">Club Expenses Sheet</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {expenses.map(exp => (
                      <div key={exp.id} className="flex justify-between items-center border-b border-zinc-800 pb-2.5 last:border-0 last:pb-0">
                        <div>
                          <h4 className="text-xs font-extrabold text-zinc-200">{exp.expenseName}</h4>
                          <span className="text-[9px] text-zinc-500">{exp.expenseDate} • Category: {exp.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-red-400">₹{exp.amount.toLocaleString()}</span>
                          <button 
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="text-zinc-550 hover:text-red-500 bg-transparent border-0 cursor-pointer text-[10px] font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {expenses.length === 0 && (
                      <p className="text-xs text-zinc-550 py-10 text-center">No expenses logged yet.</p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 10: STAFF ROSTER */}
          {activeTab === 'staff' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              <h3 className="text-lg font-black text-white">Staff Roster & Permissions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { role: 'Club Manager', name: 'Alexander Knox', access: 'Full admin access, billing config, roster' },
                  { role: 'Receptionist', name: 'Clara Oswald', access: 'Attendance logs, check-ins scan, member profiles' },
                  { role: 'Personal Trainer', name: 'Marcus Irons', access: 'Diet charts, workout assign, trainer notes' }
                ].map((staff, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-3">
                    <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 border border-orange-500/20 text-[9px] font-black uppercase rounded accent-text">
                      {staff.role}
                    </span>
                    <h4 className="text-base font-extrabold text-white">{staff.name}</h4>
                    <p className="text-xs text-zinc-400 font-bold pt-1 leading-normal">
                      Access Role: <span className="text-zinc-200">{staff.access}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: EQUIPMENT REGISTRY */}
          {activeTab === 'equipment' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Add Equipment Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 md:col-span-1 self-start">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-350">Register Machine</h3>
                  <form onSubmit={handleSaveEquipment} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Machine / Item Name</label>
                      <input 
                        type="text" 
                        value={equipmentForm.name}
                        onChange={e => setEquipmentForm({ ...equipmentForm, name: e.target.value })}
                        placeholder="Olympic Barbell"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Warranty Details</label>
                      <input 
                        type="text" 
                        value={equipmentForm.warrantyDetails}
                        onChange={e => setEquipmentForm({ ...equipmentForm, warrantyDetails: e.target.value })}
                        placeholder="3 Years Warranty"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-2.5 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl border-0 accent-bg"
                    >
                      Save Machine
                    </button>
                  </form>
                </div>

                {/* Equipment List */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:col-span-2 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-350">Equipment registry</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {equipment.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b border-zinc-800 pb-2.5 last:border-0 last:pb-0">
                        <div>
                          <h4 className="text-xs font-extrabold text-zinc-200">{item.name}</h4>
                          <span className="text-[9px] text-zinc-500 font-bold block mt-1">Purchased: {item.purchaseDate} • Warranty: {item.warrantyDetails}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black uppercase text-orange-500 bg-orange-600/10 px-2 py-0.5 rounded accent-text">Ok</span>
                          <button 
                            onClick={() => handleDeleteEquipment(item.id)}
                            className="text-zinc-550 hover:text-red-500 bg-transparent border-0 cursor-pointer text-[10px] font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {equipment.length === 0 && (
                      <p className="text-xs text-zinc-550 py-10 text-center">No machine assets logged.</p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 12: OFFERS & PROMOTIONS */}
          {activeTab === 'offers' && (
            <div className="space-y-8 animate-fade-in text-left max-w-4xl">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Generate Offer Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 md:col-span-1 self-start">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-350">Create Coupon Code</h3>
                  <form onSubmit={handleSaveOffer} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Coupon Promo Code</label>
                      <input 
                        type="text" 
                        value={offerForm.code}
                        onChange={e => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                        placeholder="FIT50"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-400">Discount Amount</label>
                      <input 
                        type="text" 
                        value={offerForm.discountAmount}
                        onChange={e => setOfferForm({ ...offerForm, discountAmount: e.target.value })}
                        placeholder="50"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-2.5 bg-orange-655 hover:bg-orange-700 text-white text-xs font-black rounded-xl border-0 accent-bg"
                    >
                      Generate Code
                    </button>
                  </form>
                </div>

                {/* Offer List */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:col-span-2 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-350">Active Promo Coupons</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {offers.map(off => (
                      <div key={off.id} className="flex justify-between items-center border-b border-zinc-800 pb-2.5 last:border-0 last:pb-0">
                        <div>
                          <h4 className="text-xs font-black text-orange-500 bg-orange-600/10 px-2.5 py-1 rounded accent-text tracking-widest">{off.code}</h4>
                          <span className="text-[9px] text-zinc-550 mt-1 block">Value: {off.discountAmount}% off • Status: {off.status}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteOffer(off.id)}
                          className="text-zinc-550 hover:text-red-500 bg-transparent border-0 cursor-pointer text-[10px] font-bold font-sans"
                        >
                          Deactivate
                        </button>
                      </div>
                    ))}
                    {offers.length === 0 && (
                      <p className="text-xs text-zinc-550 py-10 text-center">No coupon codes generated yet.</p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}
