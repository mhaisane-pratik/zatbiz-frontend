'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SchoolTemplate() {
  const [selectedGrade, setSelectedGrade] = useState<'preschool' | 'elementary' | 'highschool'>('preschool');
  const [submitEnquiry, setSubmitEnquiry] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEnquiry(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setSubmitEnquiry(false), 5000);
  };

  return (
    <div className="bg-[#fdfcfb] text-[#1e293b] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-orange-100">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-rose-800 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-800 font-bold">school</span>
            <span className="text-xl font-bold tracking-tight text-slate-800">Oakridge Academy</span>
          </div>
          <a href="#admissions" className="bg-rose-850 hover:bg-rose-900 bg-rose-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all">
            Apply Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded text-rose-800 font-semibold text-xs uppercase tracking-wider">
            Nurturing Future Leaders
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Education That Sparks <br />
            <span className="text-rose-850 text-rose-800">Intellect & Character</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-lg">
            At Oakridge, we combine systematic academic programs with creative sports, science labs, and social arts activities. Empowering young students to solve real-world problems.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#admissions" className="bg-rose-800 hover:bg-rose-900 text-white font-semibold text-sm px-6 py-3 rounded shadow-lg shadow-rose-900/20 transition-all">
              Inquire Admission
            </a>
            <a href="#programs" className="bg-orange-50 hover:bg-orange-100 text-rose-800 border border-rose-200 font-semibold text-sm px-6 py-3 rounded transition-all">
              Academic Curriculums
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-rose-100 rounded blur-3xl -z-10 opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80" 
            alt="Students in classroom" 
            className="w-full max-w-[500px] mx-auto rounded shadow-xl object-cover aspect-[4/3] border border-rose-100"
          />
        </div>
      </section>

      {/* Program Details Selector */}
      <section id="programs" className="bg-slate-50 py-20 px-6 border-y border-slate-200">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-rose-800 font-semibold">Grade Tiers</span>
            <h2 className="text-3xl font-bold text-slate-900">Academic Programs</h2>
            <div className="w-12 h-1 bg-rose-800 mx-auto rounded"></div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setSelectedGrade('preschool')}
              className={`px-5 py-2 text-xs font-bold uppercase transition-all ${
                selectedGrade === 'preschool' ? 'bg-rose-800 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Preschool
            </button>
            <button 
              onClick={() => setSelectedGrade('elementary')}
              className={`px-5 py-2 text-xs font-bold uppercase transition-all ${
                selectedGrade === 'elementary' ? 'bg-rose-800 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Elementary
            </button>
            <button 
              onClick={() => setSelectedGrade('highschool')}
              className={`px-5 py-2 text-xs font-bold uppercase transition-all ${
                selectedGrade === 'highschool' ? 'bg-rose-800 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              High School
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded p-8 shadow-sm">
            {selectedGrade === 'preschool' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Early Learning Foundation (Ages 3-5)</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Focusing on social coordination, cognitive motor skills, basic numbers, alphabets, and creative arts. We maintain a warm, caring setting with a high teacher-to-student ratio.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">check_circle</span> Play-based active learning model</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">check_circle</span> Daily creative drawing and story hours</li>
                  </ul>
                </div>
                <img src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80" className="rounded object-cover aspect-video" alt="Preschool" />
              </div>
            )}

            {selectedGrade === 'elementary' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Primary Core Education (Grades 1-5)</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Introducing core literature, math diagnostics, nature studies, and coding basics. We foster critical reasoning, personal curiosity, and sports activities.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">check_circle</span> Bilingual reading & essay writing labs</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">check_circle</span> Science experiments & robotics club</li>
                  </ul>
                </div>
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80" className="rounded object-cover aspect-video" alt="Elementary" />
              </div>
            )}

            {selectedGrade === 'highschool' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Advanced Preparatory High School (Grades 9-12)</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Preparing students for global university programs. Intensive courses in AP Calculus, Physics, Literature, Econometric studies, and collegiate sports.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">check_circle</span> Advanced College Counseling desk</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">check_circle</span> International debate & programming cups</li>
                  </ul>
                </div>
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80" className="rounded object-cover aspect-video" alt="High school" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Admissions Inquiries */}
      <section id="admissions" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-rose-100 shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-rose-800 font-semibold">Join Academy</span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Admissions Enquiry</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              We are accepting registration forms for the academic term 2026-2027. Submit an enquiry request to schedule a campus tour and interview session.
            </p>
            <div className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">mail</span> admissions@oakridge.edu</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-800 text-sm">schedule</span> Inquiry desk: 9:00 AM - 4:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Parent Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-rose-800 focus:ring-1 focus:ring-rose-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Email</label>
              <input type="email" required placeholder="parent@gmail.com" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-rose-800 focus:ring-1 focus:ring-rose-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target Grade</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-rose-800 focus:ring-1 focus:ring-rose-800">
                <option value="preschool">Preschool / Kindergarten</option>
                <option value="elementary">Primary School (Grades 1-5)</option>
                <option value="highschool">High School (Grades 9-12)</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Submit Enquiry
            </button>
            {submitEnquiry && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ Inquiry sent successfully! Check your email.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-stone-400 border-t border-slate-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">Oakridge Academy</h4>
            <p className="text-xs text-slate-500 mt-1">© 2026 Oakridge Academy. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Registrar</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
