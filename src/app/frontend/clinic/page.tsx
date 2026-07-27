'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ClinicTemplate() {
  const [department, setDepartment] = useState<'cardiology' | 'pediatric' | 'orthopedic'>('cardiology');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-blue-600 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 font-bold">medical_services</span>
            <span className="text-xl font-bold tracking-tight text-slate-800">CarePlus Clinic</span>
          </div>
          <a href="#appointment" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all">
            Book Appointment
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-blue-600 font-semibold text-xs uppercase tracking-wider">
            Trustworthy Healthcare
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Compassionate Care <br />
            <span className="text-blue-600">For Your Loved Ones</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-lg">
            Our certified medical experts and diagnostic labs are dedicated to providing state-of-the-art treatment. We ensure absolute clinical precision and personal care.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#appointment" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all">
              Book Appointment
            </a>
            <a href="#departments" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-lg transition-all">
              Our Specialties
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-3xl -z-10 opacity-60"></div>
          <img 
            src="https://images.unsplash.com/photo-1584515901367-f1c276565acf?w=800&auto=format&fit=crop&q=80" 
            alt="Doctor consulting patient" 
            className="w-full max-w-[500px] mx-auto rounded-2xl shadow-xl object-cover aspect-[4/3] border border-slate-200"
          />
        </div>
      </section>

      {/* Department Tabs */}
      <section id="departments" className="bg-slate-50 py-20 px-6 border-y border-slate-200">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-semibold">Specialist Programs</span>
            <h2 className="text-3xl font-bold text-slate-900">Our Departments</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setDepartment('cardiology')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                department === 'cardiology' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Cardiology
            </button>
            <button 
              onClick={() => setDepartment('pediatric')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                department === 'pediatric' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Pediatrics
            </button>
            <button 
              onClick={() => setDepartment('orthopedic')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                department === 'orthopedic' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Orthopedics
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            {department === 'cardiology' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Advanced Cardiology & Heart Care</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Our cardiovascular unit offers complete vascular diagnostics, blood pressure management, ECG testing, and recovery therapies. Supported by advanced medical tech to monitor dynamic vitals.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span> 24/7 Cardiac Emergency Support</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span> Precision Holter Monitoring</li>
                  </ul>
                </div>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80" className="rounded-lg object-cover aspect-video" alt="Cardiology" />
              </div>
            )}

            {department === 'pediatric' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Child Wellness & Pediatrics</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    A warm and reassuring environment for kids. We manage school physical checks, immunization schedules, childhood nutrition advice, and viral fever screenings.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span> Fun, Child-friendly Clinics</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span> Dedicated Pediatric Doctors</li>
                  </ul>
                </div>
                <img src="https://images.unsplash.com/photo-1584515901367-f1c276565acf?w=600&auto=format&fit=crop&q=80" className="rounded-lg object-cover aspect-video" alt="Pediatrics" />
              </div>
            )}

            {department === 'orthopedic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Orthopedic & Joint Recovery</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Treating fractures, sports joint strains, and arthritis pain. Our specialists focus on minimally invasive surgery support, bone density checks, and target physical therapies.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span> Post-op Rehab Support</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span> Specialized Arthritis Clinics</li>
                  </ul>
                </div>
                <img src="https://images.unsplash.com/photo-1584515901367-f1c276565acf?w=600&auto=format&fit=crop&q=80" className="rounded-lg object-cover aspect-video" alt="Orthopedics" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="appointment" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-semibold">Easy Checkups</span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Request an Appointment</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Fill out the schedule request. Our patient counselor will contact you via phone within 15 minutes to confirm the final booking slots.
            </p>
            <div className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">phone</span> +1 (555) 018-9345</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-600 text-sm">schedule</span> Mon - Sat: 8:00 AM - 8:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">D.O.B / Age</label>
              <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Specialty Department</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
                <option value="cardiology">Cardiology Care</option>
                <option value="pediatrics">Pediatric Unit</option>
                <option value="orthopedics">Orthopedic Rehab</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors">
              Submit Request
            </button>
            {bookingSuccess && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ Request submitted! Check your phone shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">CarePlus Clinic</h4>
            <p className="text-xs text-slate-500 mt-1">© 2026 CarePlus Health Partners. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
