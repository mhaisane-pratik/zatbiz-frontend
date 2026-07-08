'use client';

import React, { useState } from 'react';
import { Project, Block, Product } from '@/types';
import Link from 'next/link';

interface HospitalLandingProps {
  projectId: number;
  project: Project;
  currentPageBlocks: Block[];
  dbProducts: Product[];
  cartCountQuantity: number;
  customerSession: any;
  openProductDetail: (p: Product) => void;
  handleAddToCart: (p: Product, size?: string, color?: string, qty?: number) => void;
  gymInfo?: any;
}

export default function HospitalLanding({
  projectId,
  project,
  currentPageBlocks,
  dbProducts = [],
  cartCountQuantity,
  customerSession,
  openProductDetail,
  handleAddToCart,
  gymInfo,
}: HospitalLandingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form states for instant booking
  const [bookDoctor, setBookDoctor] = useState('');
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('10:00 AM');
  const [bookSymptoms, setBookSymptoms] = useState('');

  const companyName = project?.name || 'Hope Care Hospital';
  const hospitalType = project?.description?.includes('Dental') ? 'Dental Clinic' : 'General Hospital';
  const logoIcon = (project as any)?.logoIcon || '🏥';

  // Get departments based on actual doctors' categories in database
  const departments = ['All', ...Array.from(new Set(dbProducts.map((p) => p.category || 'General Practice')))];

  const filteredDoctors = dbProducts.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (doc.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.category === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerSession) {
      alert('Please log in to your patient account to request this appointment.');
      return;
    }
    // Simulate booking API request or alert
    alert(`Consultation requested with ${bookDoctor || 'specialist'} on ${bookDate} at ${bookTime}. Our reception team will confirm shortly!`);
    setShowAppointmentModal(false);
    setBookSymptoms('');
  };

  const faqs = [
    { q: 'How do I book a telehealth virtual consult?', a: 'Log in to the Patient Dashboard, search for your specialist under "Find Specialists", and select a digital virtual slots schedule.' },
    { q: 'What insurance providers do you partner with?', a: 'We accept all major health insurers including Aetna, BlueCross BlueShield, Cigna, UnitedHealthcare, and Max Bupa.' },
    { q: 'How can I access my lab reports or prescription history?', a: 'Once registered, all diagnostics files and prescriptions written by consulting physicians are published securely under the "Health & Prescriptions" tab of your Patient Dashboard.' },
    { q: 'What should I do in case of a critical medical emergency?', a: 'Call our 24/7 Trauma Hotline instantly at +91 99999 88888. Our cardiac ambulances are equipped with life support systems and dispatched within 5 minutes.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-808 font-sans">
      {/* Header Banner */}
      <div className="bg-emerald-600 text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2">
        <span className="animate-pulse">🚨</span>
        <span>24/7 Emergency Helpline: <strong className="underline">+91 99999 88888</strong></span>
        <span className="hidden md:inline">| Ambulance dispatched within minutes</span>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-24 overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 origin-top-right hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-left">
            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              {hospitalType} Services
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Compassionate Care, <br />
              <span className="text-emerald-600">Advanced Medicine.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-lg">
              Connecting patients with world-class specialists. Book clinical check-ups, review diagnostics results, and manage your family health records securely in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  if (dbProducts.length > 0) setBookDoctor(dbProducts[0].name);
                  setShowAppointmentModal(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-md shadow-emerald-500/10 uppercase tracking-wider transition-all"
              >
                Book Appointment
              </button>
              <Link
                href={`/preview/${projectId}/login`}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 text-xs font-bold px-6 py-3.5 rounded-xl uppercase tracking-wider text-center transition-all"
              >
                Access Patient Portal
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div>
                <span className="text-2xl font-black text-slate-900">250+</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Doctors</p>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">15k+</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Patients</p>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">99.2%</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 relative">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
                alt="Hospital clinical desk"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-slate-150 p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-xs text-left">
                <span className="text-2xl">🩺</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Virtual Care Available</h4>
                  <p className="text-[9px] text-slate-450 font-semibold mt-0.5">Consult with on-duty physicians online from home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Search & Filter */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Find Specialists</h2>
            <p className="text-xs text-slate-450 font-bold uppercase">Filter doctors by clinical specialty department</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Doctor by Name, Bio, or Specialty..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:bg-white focus:border-emerald-600 transition"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:bg-white focus:border-emerald-600 transition cursor-pointer font-bold"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Cards Listing */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Specialist Registry</span>
            <h2 className="text-2xl font-black text-slate-900 uppercase">Consulting Physicians</h2>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16 border border-slate-200 rounded-2xl bg-slate-50 text-slate-450 font-bold uppercase text-xs">
              No medical specialists listed for your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <div key={doc.id} className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex-shrink-0">
                        <img
                          src={doc.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500'}
                          alt={doc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                          {doc.category || 'General Practice'}
                        </span>
                        <h4 className="text-sm font-black text-slate-900 mt-1">{doc.name}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold">Consultation Fee: ₹{doc.price}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed text-left line-clamp-3">
                      {doc.description || 'Experienced medical specialist committed to patient health.'}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
                    <button
                      onClick={() => openProductDetail(doc)}
                      className="text-[10px] font-bold text-slate-500 hover:text-slate-900 uppercase"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setBookDoctor(doc.name);
                        setShowAppointmentModal(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-4 py-2 rounded-xl uppercase tracking-wide transition"
                    >
                      Book consult
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Departments & Clinic Services */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Services Portfolio</span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Clinical Care Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🚑', title: 'Cardiac Ambulance', desc: 'Emergency dispatch units equipped with life support systems and vital monitoring.' },
              { icon: '🧪', title: 'Pathology Diagnostics', desc: 'In-house blood lab analysis and biopsy diagnostics with digital report publishing.' },
              { icon: '🩺', title: 'Telehealth Consultations', desc: 'Consult via secure audio/video links directly with your specialist from home.' }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl text-left shadow-sm hover:shadow-md transition">
                <span className="text-3xl block mb-4">{srv.icon}</span>
                <h4 className="text-sm font-black text-slate-909 uppercase">{srv.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Partners & Health Packages */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Wellness Diagnostics</span>
            <h2 className="text-2xl font-black text-slate-900 uppercase">Preventative Health Packages</h2>
            <div className="space-y-4 pt-2">
              {[
                { title: 'Standard Cardiac Screening', price: '₹1,499', features: 'ECG, Lipid Profile, Doctor consult' },
                { title: 'Comprehensive Family Checkup', price: '₹2,999', features: 'CBC, Liver Scan, Thyroid, Urinalysis' },
                { title: 'Elderly Wellness Package', price: '₹2,499', features: 'Blood sugar check, Bone density, Joint mobility consult' }
              ].map((pkg, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-150 rounded-2xl shadow-sm">
                  <div className="text-left">
                    <h4 className="text-xs font-black text-slate-900 uppercase">{pkg.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{pkg.features}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600">{pkg.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-left">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Corporate Tie-ups</span>
            <h2 className="text-2xl font-black text-slate-900 uppercase">Insurance Partners</h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              We process cashless treatments directly with all major corporate insurers. Verify your card inside the patient portal for quick admissions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Max Bupa Health', 'Aetna Corp', 'Star Health', 'Cigna Global'].map((ins, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-2xl text-center text-xs font-black text-slate-400 uppercase bg-slate-50/50">
                  {ins}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Inquiries Desk</span>
            <h2 className="text-2xl font-black text-slate-900 uppercase">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex justify-between items-center font-bold text-xs text-slate-800 hover:bg-slate-50 text-left border-none bg-transparent cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span>{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 text-left">
            <span className="text-2xl block">{logoIcon || '🏥'}</span>
            <h4 className="text-sm font-black text-white uppercase">{companyName}</h4>
            <p className="text-slate-550 leading-relaxed font-semibold">
              Advanced Clinical Care & Patient Portal console.
            </p>
          </div>
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Contact Info</h4>
            <p className="leading-relaxed font-semibold text-slate-400">
              📍 Hope Diagnostics Block, MG Road<br />
              📞 +91 99999 88888<br />
              ✉️ helpdesk@hopecare.com
            </p>
          </div>
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Secure Access</h4>
            <p className="leading-relaxed font-semibold text-slate-550">
              Compliant with HIPAA data storage guidelines. All traffic encrypted via Secure Sockets layer.
            </p>
            <Link
              href={`/preview/${projectId}/login`}
              className="text-emerald-500 font-bold hover:underline"
            >
              Sign In to Patient Portal →
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-800 text-center text-slate-500 font-bold">
          © 2026 {companyName}. Secure Clinical Network. All rights reserved.
        </div>
      </footer>

      {/* Appointment Booking Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl text-left space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Book Consultation Appointment</h3>
              <p className="text-[11px] text-slate-450 font-bold mt-1">Select date and fill symptoms for physician review.</p>
            </div>

            <form onSubmit={handleBookConsultation} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Physician</label>
                <select
                  required
                  value={bookDoctor}
                  onChange={(e) => setBookDoctor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-emerald-600 transition cursor-pointer font-bold"
                >
                  <option value="">Select Specialist</option>
                  {dbProducts.map((doc) => (
                    <option key={doc.id} value={doc.name}>{doc.name} ({doc.category})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Preferred Time</label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:border-emerald-600 transition cursor-pointer"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Symptoms / Reason for Consult</label>
                <textarea
                  rows={2}
                  required
                  value={bookSymptoms}
                  onChange={(e) => setBookSymptoms(e.target.value)}
                  placeholder="Describe your symptoms briefly..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:border-emerald-600 transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs font-bold pt-2">
                <button
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-slate-250 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition cursor-pointer"
                >
                  Submit Booking Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
