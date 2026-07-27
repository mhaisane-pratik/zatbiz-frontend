'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Project, Product } from '@/types';
import { useDarkMode } from '@/hooks/useDarkMode';

import {
  UserProfilePanel,
} from '../UserPanels';

import {
  AdminOverviewPanel,
  AdminSettingsPanel,
} from '../AdminPanels';

interface HospitalDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function HospitalDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  setCompanyName,
  logoIcon,
  logoUrl,
  shopNiche,
}: HospitalDashboardProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Core Database States
  const [products, setProducts] = useState<Product[]>([]); // Doctors
  const [reservations, setReservations] = useState<any[]>([]); // Appointments
  const [reservationLoading, setReservationLoading] = useState(false);
  const [storeSettings, setStoreSettings] = useState<any>({
    storeName: companyName || 'City Health Clinic',
    logoUrl: logoUrl || '',
    taxRate: 0.0,
    shippingFee: 0.0,
    enableUpi: true,
    enableCard: true,
    enableCod: false
  });

  // User details
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userAddressHome, setUserAddressHome] = useState('');

  // Medical Records (LocalStorage backed)
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [newRecordPatientEmail, setNewRecordPatientEmail] = useState('');
  const [newRecordDiagnosis, setNewRecordDiagnosis] = useState('');
  const [newRecordPrescription, setNewRecordPrescription] = useState('');
  const [newRecordNotes, setNewRecordNotes] = useState('');

  // Appointment Form State
  const [bookingFormDoctorId, setBookingFormDoctorId] = useState('');
  const [bookingFormDate, setBookingFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookingFormTime, setBookingFormTime] = useState('10:00 AM');
  const [bookingFormSymtoms, setBookingFormSymtoms] = useState('');

  // Doctor Form State (for Admin adding/editing doctor profiles)
  const [docFormId, setDocFormId] = useState<number | null>(null);
  const [docFormName, setDocFormName] = useState('');
  const [docFormSpecialty, setDocFormSpecialty] = useState('General Physician');
  const [docFormFee, setDocFormFee] = useState('500');
  const [docFormBio, setDocFormBio] = useState('');
  const [docFormAvatar, setDocFormAvatar] = useState('');

  // Dashboard Metrics
  const [dashboardTitle, setDashboardTitle] = useState('Clinical Operations Center');
  const [metric1Title, setMetric1Title] = useState('Patient Appointments');
  const [metric1Value, setMetric1Value] = useState('0 scheduled');
  const [metric1Trend, setMetric1Trend] = useState('Synced live');
  const [metric2Title, setMetric2Title] = useState('Doctors On Duty');
  const [metric2Value, setMetric2Value] = useState('0 active');
  const [metric2Trend, setMetric2Trend] = useState('All specialties available');
  const [metric3Title, setMetric3Title] = useState('Medical Consultations');
  const [metric3Value, setMetric3Value] = useState('0 completed');
  const [metric3Trend, setMetric3Trend] = useState('Quality healthcare delivered');

  const fetchDoctors = () => {
    api.products.list(projectId)
      .then(setProducts)
      .catch((err) => console.error('Error fetching doctors:', err));
  };

  const fetchAppointments = () => {
    setReservationLoading(true);
    const requestPromise = clientEmail === 'admin@gmail.com'
      ? api.reservations.list(projectId)
      : api.reservations.listByCustomer(projectId, clientEmail);

    requestPromise
      .then(setReservations)
      .catch((err) => console.error('Error fetching appointments:', err))
      .finally(() => setReservationLoading(false));
  };

  const loadMedicalRecords = () => {
    try {
      const saved = localStorage.getItem(`clinic_records_${projectId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (clientEmail === 'admin@gmail.com') {
          setMedicalRecords(parsed);
        } else {
          // Patient only sees their own records
          setMedicalRecords(parsed.filter((r: any) => r.patientEmail?.toLowerCase() === clientEmail.toLowerCase()));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (clientEmail === 'admin@gmail.com') {
      setActiveTab('overview');
      fetchDoctors();
      fetchAppointments();
      loadMedicalRecords();
      api.settings.get(projectId).then((s) => {
        if (s) setStoreSettings(s);
      }).catch(console.error);
    } else {
      setActiveTab('doctors');
      const cachedName = localStorage.getItem('clientName');
      const cachedPhone = localStorage.getItem('clientPhone');
      const cachedAddress = localStorage.getItem('clientAddress');
      if (cachedName) setUserName(cachedName);
      if (cachedPhone) setUserPhone(cachedPhone);
      if (cachedAddress) setUserAddressHome(cachedAddress);
      fetchDoctors();
      fetchAppointments();
      loadMedicalRecords();
    }
  }, [projectId, clientEmail]);

  useEffect(() => {
    // Dynamically calculate metrics
    const scheduled = reservations.filter(r => r.status === 'Pending' || r.status === 'Confirmed').length;
    const completed = reservations.filter(r => r.status === 'Completed').length;
    setMetric1Value(`${scheduled} appointments`);
    setMetric2Value(`${products.length} doctors`);
    setMetric3Value(`${completed} consultations`);
  }, [reservations, products]);

  // Profile save
  const handleSaveProfileChanges = async () => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) return;
    try {
      await api.customers.update(parseInt(clientId, 10), {
        name: userName,
        phone: userPhone,
        address: userAddressHome
      });
      localStorage.setItem('clientName', userName);
      localStorage.setItem('clientPhone', userPhone);
      localStorage.setItem('clientAddress', userAddressHome);
      alert('Patient profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update patient profile.');
    }
  };

  // Create Appointment
  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = products.find(p => String(p.id) === bookingFormDoctorId);
    const doctorName = doctor ? doctor.name : 'Selected Specialist';

    const payload = {
      projectId,
      customerName: userName || 'Patient',
      customerEmail: clientEmail,
      customerPhone: userPhone,
      bookingDate: bookingFormDate,
      bookingTime: bookingFormTime,
      numberOfGuests: 1, // Consultation is 1 person
      tableNumber: doctorName, // Reuse field for doctor name
      notes: bookingFormSymtoms || 'Routine checkup',
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      alert('Consultation appointment requested successfully! Medical staff will review shortly.');
      setBookingFormSymtoms('');
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to submit appointment request.');
    }
  };

  // Update appointment status (Admin)
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await api.reservations.updateStatus(id, status);
      alert(`Appointment marked as ${status}!`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  // Cancel/Delete appointment
  const handleDeleteAppointment = async (id: number) => {
    if (!confirm('Cancel this consultation request?')) return;
    try {
      await api.reservations.delete(id);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  // Manage Doctors (Admin add/edit)
  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFormName || !docFormFee) return;

    const payload: any = {
      projectId,
      name: docFormName,
      description: docFormBio || 'Experienced medical practitioner.',
      price: parseFloat(docFormFee),
      category: docFormSpecialty,
      imageUrl: docFormAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
      stock: 1,
      available: true
    };

    try {
      if (docFormId) {
        await api.products.update(docFormId, { ...payload, id: docFormId });
        alert('Doctor profile updated successfully!');
      } else {
        await api.products.create(payload);
        alert('Doctor profile added successfully!');
      }
      setDocFormId(null);
      setDocFormName('');
      setDocFormBio('');
      setDocFormFee('500');
      setDocFormAvatar('');
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert('Failed to save doctor profile.');
    }
  };

  // Delete doctor
  const handleDeleteDoc = async (id: number) => {
    if (!confirm('Remove this doctor profile from registry?')) return;
    try {
      await api.products.delete(id);
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  // Create Medical Record (Admin)
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecordPatientEmail || !newRecordDiagnosis) {
      alert('Patient Email and Diagnosis are required.');
      return;
    }

    const newRec = {
      id: Date.now(),
      patientEmail: newRecordPatientEmail.trim().toLowerCase(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      diagnosis: newRecordDiagnosis,
      prescription: newRecordPrescription,
      notes: newRecordNotes,
      doctor: 'Clinic Health Practitioner'
    };

    const updated = [newRec, ...medicalRecords];
    localStorage.setItem(`clinic_records_${projectId}`, JSON.stringify(updated));
    setMedicalRecords(updated);
    setNewRecordPatientEmail('');
    setNewRecordDiagnosis('');
    setNewRecordPrescription('');
    setNewRecordNotes('');
    alert('Medical record published securely to patient dashboard.');
  };

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🩺</span>
            <div className="truncate font-sans">
              <h3 className="font-extrabold text-slate-900 text-sm truncate">{companyName}</h3>
              <span className={`text-[10px] font-extrabold ${theme.accentText} uppercase tracking-widest`}>
                {clientEmail === 'admin@gmail.com' ? 'Medical Director' : 'Patient Portal'}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {clientEmail === 'admin@gmail.com' ? (
              <>
                {[
                  { id: 'overview', label: '📊 Operations Dashboard' },
                  { id: 'doctors_registry', label: '👨‍⚕️ Doctors Directory' },
                  { id: 'appointments_admin', label: '📅 Patient Appointments' },
                  { id: 'records_admin', label: '📋 Clinical Records' },
                  { id: 'settings', label: '⚙️ Clinic Settings' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                {[
                  { id: 'doctors', label: '👨‍⚕️ Find Specialists' },
                  { id: 'book_appointment', label: '📅 Book Consultation' },
                  { id: 'my_appointments', label: '📋 Appointment Status' },
                  { id: 'my_records', label: '❤️ Health & Prescriptions' },
                  { id: 'profile', label: '👤 Patient Profile' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </nav>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-550 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition text-left cursor-pointer border-none bg-transparent"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition text-left cursor-pointer border-none bg-transparent"
          >
            🚪 Exit Console
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50/50 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex justify-between items-center pb-6 border-b border-slate-200">
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Healthcare Network</p>
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-0.5">
                {activeTab.replace('_', ' ')}
              </h1>
            </div>
            <div className="text-[10px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-extrabold text-slate-500 shadow-sm flex items-center gap-2 select-none">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              CLINIC DATABASE LIVE
            </div>
          </header>

          {/* Admin Dashboard Overview */}
          {activeTab === 'overview' && clientEmail === 'admin@gmail.com' && (
            <AdminOverviewPanel
              orders={reservations}
              products={products}
              couponsList={[]}
              theme={theme}
              setActiveTab={setActiveTab}
              isRestaurant={false}
            />
          )}

          {/* Admin Doctors Directory */}
          {activeTab === 'doctors_registry' && clientEmail === 'admin@gmail.com' && (
            <div className="space-y-6 text-xs text-slate-800">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-909 uppercase mb-4">
                  {docFormId ? 'Edit Doctor Profile' : 'Onboard New Medical Specialist'}
                </h3>
                <form onSubmit={docFormSubmit => handleDocSubmit(docFormSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Doctor's Name</label>
                      <input
                        type="text"
                        required
                        value={docFormName}
                        onChange={(e) => setDocFormName(e.target.value)}
                        placeholder="Dr. Sarah Jenkins"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Specialty / Department</label>
                      <select
                        value={docFormSpecialty}
                        onChange={(e) => setDocFormSpecialty(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer"
                      >
                        <option value="General Physician">General Physician</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Neurologist">Neurologist</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        required
                        value={docFormFee}
                        onChange={(e) => setDocFormFee(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Professional Bio & Credentials</label>
                      <input
                        type="text"
                        value={docFormBio}
                        onChange={(e) => setDocFormBio(e.target.value)}
                        placeholder="MD - Cardiology, 12 years clinical practice..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Avatar Image URL (Optional)</label>
                      <input
                        type="text"
                        value={docFormAvatar}
                        onChange={(e) => setDocFormAvatar(e.target.value)}
                        placeholder="Leave blank for default doctor placeholder"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    {docFormId && (
                      <button
                        type="button"
                        onClick={() => {
                          setDocFormId(null);
                          setDocFormName('');
                          setDocFormBio('');
                          setDocFormFee('500');
                          setDocFormAvatar('');
                        }}
                        className="px-4 py-2 border border-slate-250 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow"
                    >
                      {docFormId ? 'Save Profile' : 'Onboard Doctor'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Doctors List */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-909 uppercase mb-4">On-Duty Doctors Registry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <div className="sm:col-span-3 py-10 text-center text-slate-400 font-bold uppercase">No doctors registered.</div>
                  ) : (
                    products.map((doc) => (
                      <div key={doc.id} className="border border-slate-200 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition">
                        <img
                          src={doc.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80'}
                          alt={doc.name}
                          className="w-14 h-14 rounded-full object-cover border border-slate-100 shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-xs truncate">{doc.name}</h4>
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${theme.accentBg}`}>
                            {doc.category}
                          </span>
                          <p className="text-[10px] text-slate-400 truncate mt-1">{doc.description}</p>
                          <p className="font-bold text-slate-800 text-[10px] mt-2">Consult fee: ₹{doc.price}</p>
                          <div className="flex gap-3 pt-3">
                            <button
                              onClick={() => {
                                setDocFormId(doc.id!);
                                setDocFormName(doc.name);
                                setDocFormSpecialty(doc.category);
                                setDocFormFee(String(doc.price));
                                setDocFormBio(doc.description || '');
                                setDocFormAvatar(doc.imageUrl || '');
                              }}
                              className="text-[9px] font-bold text-indigo-650 hover:underline border-none bg-transparent cursor-pointer"
                            >
                              Edit Profile
                            </button>
                            <button
                              onClick={() => handleDeleteDoc(doc.id!)}
                              className="text-[9px] font-bold text-rose-600 hover:underline border-none bg-transparent cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Admin Patient Appointments View */}
          {activeTab === 'appointments_admin' && clientEmail === 'admin@gmail.com' && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800">
              <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Consultation Bookings</h3>
                <span className="bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded text-[9px] font-black text-emerald-700 uppercase">Review Panel</span>
              </header>
              {reservationLoading ? (
                <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-wider">Loading appointments...</div>
              ) : reservations.length === 0 ? (
                <div className="p-16 text-center text-slate-400 font-bold uppercase tracking-wider">No appointment requests.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-505 uppercase">
                      <th className="p-4 pl-6">Patient</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Specialist Doctor</th>
                      <th className="p-4">Schedule Date & Time</th>
                      <th className="p-4">Chief Complaint / Symptoms</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50/50">
                        <td className="p-4 pl-6">
                          <span className="font-bold text-slate-900 block">{res.customerName}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{res.customerEmail}</span>
                        </td>
                        <td className="p-4 font-mono font-semibold text-slate-500">{res.customerPhone || 'N/A'}</td>
                        <td className="p-4 font-bold text-slate-700">{res.tableNumber || 'Any General Physician'}</td>
                        <td className="p-4">
                          <span className="font-bold text-slate-808 block">{res.bookingDate}</span>
                          <span className="text-[9px] bg-slate-100 text-slate-550 px-1.5 py-0.5 rounded font-extrabold uppercase mt-1 inline-block">{res.bookingTime}</span>
                        </td>
                        <td className="p-4 italic text-slate-500 max-w-[200px] truncate">{res.notes || 'None'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                            res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : res.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>{res.status}</span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-2">
                            {res.status === 'Pending' && (
                              <button onClick={() => handleUpdateStatus(res.id, 'Confirmed')} className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[9px] font-bold cursor-pointer transition border-none shadow-sm">
                                Confirm
                              </button>
                            )}
                            {res.status === 'Confirmed' && (
                              <button onClick={() => handleUpdateStatus(res.id, 'Completed')} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[9px] font-bold cursor-pointer transition border-none shadow-sm">
                                Complete
                              </button>
                            )}
                            <button onClick={() => handleDeleteAppointment(res.id)} className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[9px] font-bold cursor-pointer transition border-none">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Admin Patient Records Management */}
          {activeTab === 'records_admin' && clientEmail === 'admin@gmail.com' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-xs text-slate-800">
              {/* Add Record Form */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Write Medical Record & Prescription</h3>
                <form onSubmit={handleAddRecord} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Patient Email (Must match patient account)</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={newRecordPatientEmail}
                      onChange={(e) => setNewRecordPatientEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Diagnosis / Consultation Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seasonal Flu & Viral Fever"
                      value={newRecordDiagnosis}
                      onChange={(e) => setNewRecordDiagnosis(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Prescription & Dosage</label>
                    <textarea
                      rows={4}
                      placeholder="Paracetamol 650mg - Thrice daily after food (3 Days)&#10;Cough Syrup - 10ml before sleep"
                      value={newRecordPrescription}
                      onChange={(e) => setNewRecordPrescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Additional Medical Advice</label>
                    <textarea
                      rows={2}
                      placeholder="Take bed rest, stay hydrated, avoid cold beverages."
                      value={newRecordNotes}
                      onChange={(e) => setNewRecordNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow border-none cursor-pointer">
                    Save Record Securely
                  </button>
                </form>
              </div>

              {/* Records History list */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-909 uppercase">Secure Clinical Records Journal</h3>
                </div>
                {medicalRecords.length === 0 ? (
                  <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase">
                    No clinical records created yet. Submit the form on the left to add one.
                  </div>
                ) : (
                  medicalRecords.map((rec) => (
                    <div key={rec.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs uppercase">{rec.diagnosis}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">Patient: <strong className="text-slate-600">{rec.patientEmail}</strong></p>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-bold text-slate-400 block">{rec.date}</span>
                          <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-black uppercase mt-1 inline-block">{rec.doctor}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">💊 Prescribed Medicines</p>
                          <p className="font-mono text-[10px] whitespace-pre-line text-slate-700 leading-relaxed">{rec.prescription || 'No medicines prescribed.'}</p>
                        </div>
                        <div className="bg-amber-50/20 border border-amber-100/50 p-4 rounded-xl">
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">❤️ Clinical Advice & Instructions</p>
                          <p className="italic text-[10px] text-slate-600 leading-relaxed">{rec.notes || 'No specific diet or advice added.'}</p>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2 border-t border-slate-50">
                        <button
                          onClick={() => {
                            if (confirm('Delete this record? This action is permanent.')) {
                              const updated = medicalRecords.filter(r => r.id !== rec.id);
                              localStorage.setItem(`clinic_records_${projectId}`, JSON.stringify(updated));
                              setMedicalRecords(updated);
                            }
                          }}
                          className="text-[9px] font-black text-rose-600 hover:text-rose-700 border-none bg-transparent cursor-pointer uppercase tracking-wider"
                        >
                          Delete Record
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Admin Settings View */}
          {activeTab === 'settings' && clientEmail === 'admin@gmail.com' && (
            <AdminSettingsPanel
              projectId={projectId}
              storeSettings={storeSettings}
              setStoreSettings={setStoreSettings}
              setCompanyName={setCompanyName}
            />
          )}

          {/* User Find Specialist Directory */}
          {activeTab === 'doctors' && clientEmail !== 'admin@gmail.com' && (
            <div className="space-y-6 text-xs text-slate-800">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-905 uppercase tracking-wider mb-2">On-Duty Doctors & Specialists</h3>
                <p className="text-slate-500 font-semibold">Browse our clinical team, view specialization departments, and consult with the right practitioner.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="md:col-span-3 py-16 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 font-bold uppercase">No doctors registered. Please contact support.</div>
                ) : (
                  products.map((doc) => (
                    <div key={doc.id} className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group">
                      <div className="h-40 bg-slate-50 relative overflow-hidden flex items-center justify-center">
                        <img src={doc.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80'} alt={doc.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
                        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black text-slate-900 border border-slate-100 shadow-sm">
                          Consult Fee: ₹{doc.price}
                        </span>
                      </div>
                      <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase mb-1.5 ${theme.accentBg}`}>
                            {doc.category}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">{doc.name}</h4>
                          <p className="text-[10px] font-semibold text-slate-400 mt-1 leading-relaxed">{doc.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            setBookingFormDoctorId(String(doc.id));
                            setActiveTab('book_appointment');
                          }}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition border-none shadow-sm cursor-pointer"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* User Book Appointment View */}
          {activeTab === 'book_appointment' && clientEmail !== 'admin@gmail.com' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-xs text-slate-800">
              {/* Booking Form */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Book Consultation</h3>
                <form onSubmit={handleBookAppointment} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Select Specialist Doctor</label>
                    <select
                      required
                      value={bookingFormDoctorId}
                      onChange={(e) => setBookingFormDoctorId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
                    >
                      <option value="">Choose Practitioner</option>
                      {products.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.category})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Appointment Date</label>
                    <input
                      type="date"
                      required
                      value={bookingFormDate}
                      onChange={(e) => setBookingFormDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Time Slot</label>
                    <select
                      value={bookingFormTime}
                      onChange={(e) => setBookingFormTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
                    >
                      {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Chief Complaint / Symptoms</label>
                    <textarea
                      rows={3}
                      value={bookingFormSymtoms}
                      onChange={(e) => setBookingFormSymtoms(e.target.value)}
                      placeholder="e.g. Mild headache, viral fever since 2 days..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow border-none cursor-pointer">
                    Book Appointment
                  </button>
                </form>
              </div>

              {/* Patient Guidelines */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Patient Care Advisory</h3>
                  <ul className="list-disc pl-4 text-slate-550 space-y-1.5 leading-relaxed font-semibold">
                    <li>Please arrive 10 minutes prior to your scheduled consultation slot.</li>
                    <li>Bring your active prescription logs and previous health files if applicable.</li>
                    <li>Cancellations should be requested at least 2 hours before the scheduled time slot.</li>
                    <li>Digital prescriptions will be updated in your dashboard immediately following your checkup.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* User Appointment Status View */}
          {activeTab === 'my_appointments' && clientEmail !== 'admin@gmail.com' && (
            <div className="space-y-4 text-xs text-slate-800">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">My Consultation Appointments</h3>
              </div>
              {reservationLoading ? (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400">Loading appointments...</div>
              ) : reservations.length === 0 ? (
                <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase tracking-wider">No consultation bookings.</div>
              ) : (
                reservations.map((res) => (
                  <div key={res.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                          res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : res.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>{res.status}</span>
                        <span className="font-extrabold text-slate-800">{res.tableNumber || 'Practitioner'}</span>
                      </div>
                      <p className="text-[10px] text-slate-550 font-semibold">
                        📅 Scheduled for <strong className="text-slate-700">{res.bookingDate}</strong> at <strong className="text-slate-705">{res.bookingTime}</strong>
                      </p>
                      {res.notes && <p className="text-[9px] text-slate-400 italic">" Symptoms: {res.notes} "</p>}
                    </div>
                    {res.status === 'Pending' && (
                      <button onClick={() => handleDeleteAppointment(res.id)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg font-bold text-slate-500 transition cursor-pointer bg-white">
                        Cancel
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* User Medical Records View */}
          {activeTab === 'my_records' && clientEmail !== 'admin@gmail.com' && (
            <div className="space-y-4 text-xs text-slate-800">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">My Digital Health Record Folder</h3>
              </div>
              {medicalRecords.length === 0 ? (
                <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase tracking-wider">
                  No medical reports or digital prescriptions available. Ask clinic staff to upload.
                </div>
              ) : (
                medicalRecords.map((rec) => (
                  <div key={rec.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-extrabold text-slate-905 text-xs uppercase">{rec.diagnosis}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">Practitioner: <strong className="text-slate-705">{rec.doctor}</strong></p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold text-slate-450 block">{rec.date}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                        <p className="text-[9px] text-slate-405 font-bold uppercase tracking-wider mb-2">💊 Digital Prescription</p>
                        <p className="font-mono text-[10px] whitespace-pre-line text-slate-700 leading-relaxed">{rec.prescription || 'Prescription instructions blank.'}</p>
                      </div>
                      <div className="bg-amber-50/20 border border-amber-100/50 p-4 rounded-xl">
                        <p className="text-[9px] text-slate-405 font-bold uppercase tracking-wider mb-2">❤️ Clinical Advice & Notes</p>
                        <p className="italic text-[10px] text-slate-650 leading-relaxed">{rec.notes || 'General health recommendations.'}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* User Profile View */}
          {activeTab === 'profile' && clientEmail !== 'admin@gmail.com' && (
            <UserProfilePanel
              userName={userName}
              setUserName={setUserName}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              userAddressHome={userAddressHome}
              setUserAddressHome={setUserAddressHome}
              clientEmail={clientEmail}
              theme={theme}
              shopNiche={shopNiche}
              handleSaveProfileChanges={handleSaveProfileChanges}
            />
          )}
        </div>
      </main>
    </div>
  );
}
