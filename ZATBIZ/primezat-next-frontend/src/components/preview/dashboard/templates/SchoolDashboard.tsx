'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Project, Product } from '@/types';

import {
  UserProfilePanel,
} from '../UserPanels';

import {
  AdminOverviewPanel,
  AdminSettingsPanel,
} from '../AdminPanels';

interface SchoolDashboardProps {
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

export default function SchoolDashboard({
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
}: SchoolDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Core Database States
  const [products, setProducts] = useState<Product[]>([]); // Courses / Classes
  const [reservations, setReservations] = useState<any[]>([]); // Enrollments / Admissions
  const [reservationLoading, setReservationLoading] = useState(false);
  const [storeSettings, setStoreSettings] = useState<any>({
    storeName: companyName || 'City High Academy',
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

  // Grades (LocalStorage backed)
  const [grades, setGrades] = useState<any[]>([]);
  const [newGradeStudentEmail, setNewGradeStudentEmail] = useState('');
  const [newGradeCourse, setNewGradeCourse] = useState('');
  const [newGradeLetter, setNewGradeLetter] = useState('A');
  const [newGradeRemarks, setNewGradeRemarks] = useState('');

  // Course Enrollment State
  const [enrollFormCourseId, setEnrollFormCourseId] = useState('');
  const [enrollFormTerm, setEnrollFormTerm] = useState('Fall 2026');
  const [enrollFormType, setEnrollFormType] = useState('Full Time');
  const [enrollFormNotes, setEnrollFormNotes] = useState('');

  // Course Form State (for Admin adding/editing courses)
  const [courseFormId, setCourseFormId] = useState<number | null>(null);
  const [courseFormName, setCourseFormName] = useState('');
  const [courseFormDept, setCourseFormDept] = useState('Science');
  const [courseFormFee, setCourseFormFee] = useState('450');
  const [courseFormDesc, setCourseFormDesc] = useState('');
  const [courseFormInstructor, setCourseFormInstructor] = useState('');

  // Dashboard Metrics
  const [dashboardTitle, setDashboardTitle] = useState('Academic Operations Center');
  const [metric1Title, setMetric1Title] = useState('Active Enrollments');
  const [metric1Value, setMetric1Value] = useState('0 student seats');
  const [metric1Trend, setMetric1Trend] = useState('Synced live');
  const [metric2Title, setMetric2Title] = useState('Courses Catalog');
  const [metric2Value, setMetric2Value] = useState('0 subjects');
  const [metric2Trend, setMetric2Trend] = useState('STEM and Arts active');
  const [metric3Title, setMetric3Title] = useState('System Synchronized');
  const [metric3Value, setMetric3Value] = useState('100% online');
  const [metric3Trend, setMetric3Trend] = useState('Tuition fee invoice system active');

  const fetchCourses = () => {
    api.products.list(projectId)
      .then(setProducts)
      .catch((err) => console.error('Error fetching courses:', err));
  };

  const fetchEnrollments = () => {
    setReservationLoading(true);
    const requestPromise = clientEmail === 'admin@gmail.com'
      ? api.reservations.list(projectId)
      : api.reservations.listByCustomer(projectId, clientEmail);

    requestPromise
      .then(setReservations)
      .catch((err) => console.error('Error fetching enrollments:', err))
      .finally(() => setReservationLoading(false));
  };

  const loadStudentGrades = () => {
    try {
      const saved = localStorage.getItem(`school_grades_${projectId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (clientEmail === 'admin@gmail.com') {
          setGrades(parsed);
        } else {
          setGrades(parsed.filter((g: any) => g.studentEmail?.toLowerCase() === clientEmail.toLowerCase()));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (clientEmail === 'admin@gmail.com') {
      setActiveTab('overview');
      fetchCourses();
      fetchEnrollments();
      loadStudentGrades();
      api.settings.get(projectId).then((s) => {
        if (s) setStoreSettings(s);
      }).catch(console.error);
    } else {
      setActiveTab('courses');
      const cachedName = localStorage.getItem('clientName');
      const cachedPhone = localStorage.getItem('clientPhone');
      const cachedAddress = localStorage.getItem('clientAddress');
      if (cachedName) setUserName(cachedName);
      if (cachedPhone) setUserPhone(cachedPhone);
      if (cachedAddress) setUserAddressHome(cachedAddress);
      fetchCourses();
      fetchEnrollments();
      loadStudentGrades();
    }
  }, [projectId, clientEmail]);

  useEffect(() => {
    // Update metrics dynamically
    const enrolledCount = reservations.filter(r => r.status === 'Confirmed' || r.status === 'Completed').length;
    setMetric1Value(`${enrolledCount} enrolled`);
    setMetric2Value(`${products.length} courses`);
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
      alert('Student profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update student profile.');
    }
  };

  // Create Admission/Enrollment
  const handleRequestEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    const course = products.find(p => String(p.id) === enrollFormCourseId);
    const courseName = course ? course.name : 'Selected Curriculum';

    const payload = {
      projectId,
      customerName: userName || 'Student',
      customerEmail: clientEmail,
      customerPhone: userPhone,
      bookingDate: enrollFormTerm, // Term (e.g. Fall 2026)
      bookingTime: enrollFormType, // Enrollment Type (Full Time / Part Time)
      numberOfGuests: 1,
      tableNumber: courseName, // Course Title
      notes: enrollFormNotes || 'Fresh term registration',
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      alert('Admission/Enrollment request submitted successfully! Academic office will verify your details.');
      setEnrollFormNotes('');
      fetchEnrollments();
    } catch (err) {
      console.error(err);
      alert('Failed to submit enrollment request.');
    }
  };

  // Update Enrollment Status (Admin)
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await api.reservations.updateStatus(id, status);
      alert(`Enrollment marked as ${status}!`);
      fetchEnrollments();
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  // Cancel Enrollment
  const handleDeleteEnrollment = async (id: number) => {
    if (!confirm('Cancel this term enrollment request?')) return;
    try {
      await api.reservations.delete(id);
      fetchEnrollments();
    } catch (err) {
      console.error(err);
    }
  };

  // Manage Courses (Admin add/edit)
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormName || !courseFormFee) return;

    const payload: any = {
      projectId,
      name: courseFormName,
      description: courseFormDesc || 'Core subject curriculum.',
      price: parseFloat(courseFormFee),
      category: courseFormDept,
      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      stock: 100, // available seats
      available: true,
      brand: courseFormInstructor // use brand for Instructor Name
    };

    try {
      if (courseFormId) {
        await api.products.update(courseFormId, { ...payload, id: courseFormId });
        alert('Course curriculum updated successfully!');
      } else {
        await api.products.create(payload);
        alert('New course added to curriculum!');
      }
      setCourseFormId(null);
      setCourseFormName('');
      setCourseFormDesc('');
      setCourseFormFee('450');
      setCourseFormInstructor('');
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert('Failed to save course profile.');
    }
  };

  // Delete Course
  const handleDeleteCourse = async (id: number) => {
    if (!confirm('Remove this course from the curriculum catalog?')) return;
    try {
      await api.products.delete(id);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  // Publish Academic Grade (Admin)
  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeStudentEmail || !newGradeCourse) {
      alert('Student Email and Course Name are required.');
      return;
    }

    const newG = {
      id: Date.now(),
      studentEmail: newGradeStudentEmail.trim().toLowerCase(),
      course: newGradeCourse,
      grade: newGradeLetter,
      remarks: newGradeRemarks,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    const updated = [newG, ...grades];
    localStorage.setItem(`school_grades_${projectId}`, JSON.stringify(updated));
    setGrades(updated);
    setNewGradeStudentEmail('');
    setNewGradeCourse('');
    setNewGradeLetter('A');
    setNewGradeRemarks('');
    alert('Academic grade posted securely to student transcript.');
  };

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🏫</span>
            <div className="truncate font-sans">
              <h3 className="font-extrabold text-slate-900 text-sm truncate">{companyName}</h3>
              <span className={`text-[10px] font-extrabold ${theme.accentText} uppercase tracking-widest`}>
                {clientEmail === 'admin@gmail.com' ? 'Academic Registrar' : 'Student Hub'}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {clientEmail === 'admin@gmail.com' ? (
              <>
                {[
                  { id: 'overview', label: '📊 Admin Dashboard' },
                  { id: 'courses_admin', label: '📚 Course Curriculum' },
                  { id: 'enrollments_admin', label: '🎓 Admissions & Intake' },
                  { id: 'grades_admin', label: '📝 Post Student Grades' },
                  { id: 'settings', label: '⚙️ Campus Settings' }
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
                  { id: 'courses', label: '📚 Browse Curriculum' },
                  { id: 'enroll_course', label: '🎓 Register for Classes' },
                  { id: 'timetable', label: '⏰ Timetable Schedule' },
                  { id: 'my_grades', label: '🏆 My Transcript (Grades)' },
                  { id: 'profile', label: '👤 Student Profile' }
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

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition text-left cursor-pointer border-none bg-transparent"
        >
          🚪 Exit Console
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50/50 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex justify-between items-center pb-6 border-b border-slate-200">
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Campus Intranet</p>
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-0.5">
                {activeTab.replace('_', ' ')}
              </h1>
            </div>
            <div className="text-[10px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-extrabold text-slate-500 shadow-sm flex items-center gap-2 select-none">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              CAMPUS WORKSPACE SECURED
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

          {/* Admin Course Curriculum Management */}
          {activeTab === 'courses_admin' && clientEmail === 'admin@gmail.com' && (
            <div className="space-y-6 text-xs text-slate-800">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-909 uppercase mb-4">
                  {courseFormId ? 'Edit Course Details' : 'Publish New Academic Course'}
                </h3>
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Course Name</label>
                      <input
                        type="text"
                        required
                        value={courseFormName}
                        onChange={(e) => setCourseFormName(e.target.value)}
                        placeholder="AP Chemistry / Calculus II"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Academic Department</label>
                      <select
                        value={courseFormDept}
                        onChange={(e) => setCourseFormDept(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer"
                      >
                        <option value="Science">Science (Physics, Chemistry)</option>
                        <option value="Mathematics">Mathematics & Stats</option>
                        <option value="Literature">Literature & Language</option>
                        <option value="History">Social Studies & History</option>
                        <option value="Computer Science">Computer Science</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Tuition Term Fee (₹)</label>
                      <input
                        type="number"
                        required
                        value={courseFormFee}
                        onChange={(e) => setCourseFormFee(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Course Syllabus & Description</label>
                      <input
                        type="text"
                        value={courseFormDesc}
                        onChange={(e) => setCourseFormDesc(e.target.value)}
                        placeholder="Introductory mechanics, thermodynamics, and laboratory experiments..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Instructor Name</label>
                      <input
                        type="text"
                        value={courseFormInstructor}
                        onChange={(e) => setCourseFormInstructor(e.target.value)}
                        placeholder="Prof. Kenneth Vance"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    {courseFormId && (
                      <button
                        type="button"
                        onClick={() => {
                          setCourseFormId(null);
                          setCourseFormName('');
                          setCourseFormDesc('');
                          setCourseFormFee('450');
                          setCourseFormInstructor('');
                        }}
                        className="px-4 py-2 border border-slate-250 hover:bg-slate-550 rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow"
                    >
                      {courseFormId ? 'Save Course' : 'Publish Course'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Courses List */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-909 uppercase mb-4">Active Campus Curriculum Catalog</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <div className="sm:col-span-3 py-10 text-center text-slate-400 font-bold uppercase">No courses registered.</div>
                  ) : (
                    products.map((crs) => (
                      <div key={crs.id} className="border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition">
                        <div className="space-y-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${theme.accentBg}`}>
                            {crs.category}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-xs">{crs.name}</h4>
                          <p className="text-[10px] text-slate-450 leading-relaxed">{crs.description}</p>
                          <p className="text-[10px] font-semibold text-slate-500">Instructor: <strong className="text-slate-700">{crs.brand || 'TBD'}</strong></p>
                        </div>
                        <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-[10px]">Tuition Fee: ₹{crs.price}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setCourseFormId(crs.id!);
                                setCourseFormName(crs.name);
                                setCourseFormDept(crs.category);
                                setCourseFormFee(String(crs.price));
                                setCourseFormDesc(crs.description || '');
                                setCourseFormInstructor(crs.brand || '');
                              }}
                              className="text-[9px] font-bold text-indigo-650 hover:underline border-none bg-transparent cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(crs.id!)}
                              className="text-[9px] font-bold text-rose-605 hover:underline border-none bg-transparent cursor-pointer"
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

          {/* Admin Admissions & Intake View */}
          {activeTab === 'enrollments_admin' && clientEmail === 'admin@gmail.com' && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800">
              <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Student Course Enrollments</h3>
                <span className="bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded text-[9px] font-black text-amber-700 uppercase">Verification Registry</span>
              </header>
              {reservationLoading ? (
                <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-wider">Loading admissions...</div>
              ) : reservations.length === 0 ? (
                <div className="p-16 text-center text-slate-400 font-bold uppercase tracking-wider">No admission requests.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      <th className="p-4 pl-6">Student</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Requested Course</th>
                      <th className="p-4">Term & Intake</th>
                      <th className="p-4">Enrollment Type</th>
                      <th className="p-4">Remarks</th>
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
                        <td className="p-4 font-bold text-slate-700">{res.tableNumber || 'Any Core Subject'}</td>
                        <td className="p-4 font-bold text-slate-800">{res.bookingDate}</td>
                        <td className="p-4 font-semibold text-slate-500">{res.bookingTime}</td>
                        <td className="p-4 italic text-slate-500 max-w-[150px] truncate">{res.notes || 'None'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                            res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : res.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>{res.status}</span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-2">
                            {res.status === 'Pending' && (
                              <button onClick={() => handleUpdateStatus(res.id, 'Confirmed')} className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[9px] font-bold cursor-pointer transition border-none shadow-sm">
                                Approve
                              </button>
                            )}
                            {res.status === 'Confirmed' && (
                              <button onClick={() => handleUpdateStatus(res.id, 'Completed')} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[9px] font-bold cursor-pointer transition border-none shadow-sm">
                                Mark Active
                              </button>
                            )}
                            <button onClick={() => handleDeleteEnrollment(res.id)} className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[9px] font-bold cursor-pointer transition border-none">
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

          {/* Admin Grade Posting View */}
          {activeTab === 'grades_admin' && clientEmail === 'admin@gmail.com' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-xs text-slate-800">
              {/* Add Grade Form */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Post Academic Term Grade</h3>
                <form onSubmit={handleAddGrade} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Student Email</label>
                    <input
                      type="email"
                      required
                      placeholder="student@gmail.com"
                      value={newGradeStudentEmail}
                      onChange={(e) => setNewGradeStudentEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Subject / Course Name</label>
                    <select
                      required
                      value={newGradeCourse}
                      onChange={(e) => setNewGradeCourse(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white cursor-pointer font-bold"
                    >
                      <option value="">Select Course</option>
                      {products.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Grade Awarded</label>
                    <select
                      value={newGradeLetter}
                      onChange={(e) => setNewGradeLetter(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white cursor-pointer font-bold"
                    >
                      {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Instructor Remarks</label>
                    <textarea
                      rows={3}
                      placeholder="Outstanding performance in final examination, lab reports thoroughly completed."
                      value={newGradeRemarks}
                      onChange={(e) => setNewGradeRemarks(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow border-none cursor-pointer">
                    Publish Grade to Student
                  </button>
                </form>
              </div>

              {/* Grades History */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-909 uppercase">Secure Academic Registry ledger</h3>
                </div>
                {grades.length === 0 ? (
                  <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase">
                    No academic grades posted yet. Use the form on the left to grade students.
                  </div>
                ) : (
                  grades.map((g) => (
                    <div key={g.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase">{g.course}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">Student: <strong className="text-slate-600">{g.studentEmail}</strong></p>
                        {g.remarks && <p className="text-[9px] text-slate-400 mt-2 italic">"{g.remarks}"</p>}
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block">{g.date}</span>
                          <span className="text-[14px] text-emerald-600 font-black tracking-wider block mt-1">Grade {g.grade}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm('Delete this grade entry?')) {
                              const updated = grades.filter(item => item.id !== g.id);
                              localStorage.setItem(`school_grades_${projectId}`, JSON.stringify(updated));
                              setGrades(updated);
                            }
                          }}
                          className="px-2 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded text-[9px] font-bold transition cursor-pointer border-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && clientEmail === 'admin@gmail.com' && (
            <AdminSettingsPanel
              projectId={projectId}
              storeSettings={storeSettings}
              setStoreSettings={setStoreSettings}
              setCompanyName={setCompanyName}
            />
          )}

          {/* User Find Curriculum (Browse courses) */}
          {activeTab === 'courses' && clientEmail !== 'admin@gmail.com' && (
            <div className="space-y-6 text-xs text-slate-800">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-905 uppercase tracking-wider mb-2">Academy Course Catalog</h3>
                <p className="text-slate-500 font-semibold">Explore preparatory courses, departments, tuition tiers, and register under certified professors.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="md:col-span-3 py-16 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 font-bold uppercase">No courses registered.</div>
                ) : (
                  products.map((crs) => (
                    <div key={crs.id} className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group">
                      <div className="p-6 space-y-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${theme.accentBg}`}>
                          {crs.category}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">{crs.name}</h4>
                        <p className="text-[10px] font-semibold text-slate-400 mt-1 leading-relaxed">{crs.description}</p>
                        <p className="text-[10px] font-semibold text-slate-500">Instructor: <strong className="text-slate-700">{crs.brand || 'TBD'}</strong></p>
                      </div>
                      <div className="p-6 border-t border-slate-50 flex items-center justify-between gap-4">
                        <span className="font-extrabold text-slate-800 text-[10px]">₹{crs.price} / Term</span>
                        <button
                          onClick={() => {
                            setEnrollFormCourseId(String(crs.id));
                            setActiveTab('enroll_course');
                          }}
                          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition border-none shadow cursor-pointer"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* User Register for classes */}
          {activeTab === 'enroll_course' && clientEmail !== 'admin@gmail.com' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-xs text-slate-800">
              {/* Enrollment Form */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Register for Classes</h3>
                <form onSubmit={handleRequestEnrollment} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Select Course Curriculum</label>
                    <select
                      required
                      value={enrollFormCourseId}
                      onChange={(e) => setEnrollFormCourseId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
                    >
                      <option value="">Select Subject</option>
                      {products.map(crs => (
                        <option key={crs.id} value={crs.id}>{crs.name} ({crs.category})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Academic Term</label>
                    <select
                      value={enrollFormTerm}
                      onChange={(e) => setEnrollFormTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
                    >
                      <option value="Fall 2026">Fall Term 2026</option>
                      <option value="Spring 2027">Spring Term 2027</option>
                      <option value="Summer 2027">Summer Term 2027</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Enrollment Status</label>
                    <select
                      value={enrollFormType}
                      onChange={(e) => setEnrollFormType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
                    >
                      <option value="Full Time">Full-Time Admissions</option>
                      <option value="Part Time">Part-Time / Auditing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Additional Application Notes</label>
                    <textarea
                      rows={3}
                      value={enrollFormNotes}
                      onChange={(e) => setEnrollFormNotes(e.target.value)}
                      placeholder="List details like past GPA, AP coursework background..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow border-none cursor-pointer">
                    Submit Enrollment Request
                  </button>
                </form>
              </div>

              {/* Status checklist */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">My Requested Course Enrollments</h3>
                </div>
                {reservationLoading ? (
                  <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400">Loading details...</div>
                ) : reservations.length === 0 ? (
                  <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase tracking-wider">No active class enrollments.</div>
                ) : (
                  reservations.map((res) => (
                    <div key={res.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                            res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : res.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>{res.status}</span>
                          <span className="font-extrabold text-slate-800">{res.tableNumber || 'Subject'}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold">
                          📅 Intake: <strong className="text-slate-750">{res.bookingDate}</strong> | Status: <strong className="text-slate-750">{res.bookingTime}</strong>
                        </p>
                        {res.notes && <p className="text-[9px] text-slate-400 italic">"Remarks: {res.notes}"</p>}
                      </div>
                      {res.status === 'Pending' && (
                        <button onClick={() => handleDeleteEnrollment(res.id)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg font-bold text-slate-500 transition cursor-pointer bg-white">
                          Cancel
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Timetable view */}
          {activeTab === 'timetable' && clientEmail !== 'admin@gmail.com' && (
            <div className="space-y-6 text-xs text-slate-800">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-905 uppercase tracking-wider mb-1">Timetable Weekly Calendar</h3>
                <p className="text-slate-405 font-bold uppercase tracking-wider">Fall Term 2026 Schedule</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { day: 'Monday', classes: [{ time: '09:00 AM - 10:30 AM', name: 'AP Calculus II', room: 'Room 304' }, { time: '11:00 AM - 12:30 PM', name: 'Intro to Robotics', room: 'Lab B' }] },
                  { day: 'Tuesday', classes: [{ time: '10:00 AM - 11:30 AM', name: 'World History', room: 'Room 102' }, { time: '02:00 PM - 03:30 PM', name: 'Creative Writing', room: 'Room 205' }] },
                  { day: 'Wednesday', classes: [{ time: '09:00 AM - 10:30 AM', name: 'AP Calculus II', room: 'Room 304' }, { time: '11:00 AM - 12:30 PM', name: 'Intro to Robotics', room: 'Lab B' }] },
                  { day: 'Thursday', classes: [{ time: '10:00 AM - 11:30 AM', name: 'World History', room: 'Room 102' }, { time: '02:00 PM - 03:30 PM', name: 'Creative Writing', room: 'Room 205' }] },
                  { day: 'Friday', classes: [{ time: '09:00 AM - 11:00 AM', name: 'Chemistry Practical', room: 'Chem Lab A' }] }
                ].map((item) => (
                  <div key={item.day} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h4 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2 text-center text-xs uppercase tracking-wider">{item.day}</h4>
                    <div className="space-y-3">
                      {item.classes.map((cls, index) => (
                        <div key={index} className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl space-y-1">
                          <p className="font-bold text-slate-800 text-[10px]">{cls.name}</p>
                          <p className="text-[9px] text-indigo-600 font-extrabold">{cls.time}</p>
                          <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{cls.room}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Transcript (Grades) */}
          {activeTab === 'my_grades' && clientEmail !== 'admin@gmail.com' && (
            <div className="space-y-4 text-xs text-slate-800">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Academic Performance Transcript</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Official Student Ledger</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-indigo-650">GPA: 3.85 / 4.0</span>
                </div>
              </div>

              {grades.length === 0 ? (
                <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase tracking-wider">
                  No term grades or transcripts released yet.
                </div>
              ) : (
                grades.map((g) => (
                  <div key={g.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase">{g.course}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Graded on: {g.date}</p>
                      {g.remarks && <p className="text-[10px] text-slate-500 italic mt-2">" Remarks: {g.remarks} "</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 tracking-wider">Grade {g.grade}</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase mt-1.5 block">CREDIT EARNED</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* User Profile */}
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
