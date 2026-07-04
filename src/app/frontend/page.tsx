'use client';

import React from 'react';
import Link from 'next/link';

interface TemplateCard {
  name: string;
  slug: string;
  theme: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
  icon: string;
  badgeBg: string;
}

export default function FrontendHub() {
  const templates: TemplateCard[] = [
    {
      name: "Restaurant",
      slug: "restaurant",
      theme: "Sunset Gold",
      title: "L'Ambroisie Dining",
      desc: "A warm, elegant dark aesthetic featuring detailed menu category tabs, high-fidelity styling, and a glassmorphic table booking form.",
      tags: ["Interactive Menu", "Booking System", "Serif Typography"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
      icon: "restaurant",
      badgeBg: "bg-amber-600/90"
    },
    {
      name: "Event & Conference",
      slug: "event",
      theme: "Cyber Neon",
      title: "SUMMIT 2026",
      desc: "A futuristic dark theme utilizing a live React countdown timer, schedule track accordions, speaker grid, and pass selection.",
      tags: ["Countdown Timer", "Accordion Schedule", "Dark Theme"],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80",
      icon: "calendar_month",
      badgeBg: "bg-teal-500/90"
    },
    {
      name: "Gym & Fitness",
      slug: "gym",
      theme: "Matte Power",
      title: "PULSE Fitness",
      desc: "A high-octane dark layout containing class calendar category filters and an interactive membership monthly rate calculator.",
      tags: ["Price Calculator", "Schedule Filter", "Heavy Typography"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
      icon: "fitness_center",
      badgeBg: "bg-lime-500/90 text-black font-extrabold"
    },
    {
      name: "Clinic",
      slug: "clinic",
      theme: "Clinical Slate",
      title: "CarePlus Clinic",
      desc: "Reassuring medical portal layout featuring department overview tabs, medical staff lists, and an appointment booking slot form.",
      tags: ["Department Tabs", "Appointment Slots", "Clinical Blue"],
      image: "https://images.unsplash.com/photo-1584515901367-f1c276565acf?w=800&auto=format&fit=crop&q=80",
      icon: "medical_services",
      badgeBg: "bg-blue-600/90"
    },
    {
      name: "School",
      slug: "school",
      theme: "Classic Academy",
      title: "Oakridge Academy",
      desc: "Warm crimson academy layout showing grades program highlights (Preschool to High School) and a student admissions enquiry widget.",
      tags: ["Program Selector", "Admissions Inquiry", "Crimson Red"],
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
      icon: "school",
      badgeBg: "bg-rose-800/90"
    },
    {
      name: "Storefront",
      slug: "storefront",
      theme: "Modern Retail",
      title: "Aura Boutique",
      desc: "Minimalist slate e-commerce layout containing category product listings, price indicators, and a sliding shopping bag drawer.",
      tags: ["Shopping Cart", "Product Filters", "Minimal Slate"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
      icon: "storefront",
      badgeBg: "bg-stone-800/90"
    },
    {
      name: "Real Estate",
      slug: "realestate",
      theme: "Structural Luxury",
      title: "Vanguard Estates",
      desc: "Modern architectural portal featuring luxury property catalog filters, agent contact cards, and an interactive mortgage calculator.",
      tags: ["Mortgage Tool", "Property Filters", "Gold Accents"],
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      icon: "domain",
      badgeBg: "bg-amber-500/90 text-stone-950 font-bold"
    },
    {
      name: "Travel",
      slug: "travel",
      theme: "Tropical Sunset",
      title: "Terra Travel",
      desc: "Vibrant beach/tourism theme layout featuring filtered region packages and a custom trip cost enquiry form.",
      tags: ["Package Filters", "Trip Inquiries", "Sky Blue"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
      icon: "explore",
      badgeBg: "bg-orange-500/90"
    },
    {
      name: "Portfolio",
      slug: "portfolio",
      theme: "Minimal Developer",
      title: "Alex.Code Portfolio",
      desc: "Elegant dark developer portfolio layout featuring filterable project categories, skill progress indicators, and message forms.",
      tags: ["Skill Bars", "Projects Grid", "Developer Dark"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
      icon: "person",
      badgeBg: "bg-violet-650/90 bg-violet-600"
    },
    {
      name: "Wedding",
      slug: "wedding",
      theme: "Romantic Rose",
      title: "Sarah & David Wedding",
      desc: "Delicate wedding layout showing a countdown timer to the wedding day, RSVP guest forms, and an itinerary schedule timeline.",
      tags: ["RSVP Tracker", "Wedding Schedule", "Rose Blush"],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80",
      icon: "favorite",
      badgeBg: "bg-rose-500/90"
    },
    {
      name: "NGO",
      slug: "ngo",
      theme: "Green Biosphere",
      title: "GreenEarth Fund",
      desc: "Inspiring environmental charity layout showing impact metrics, monthly donation calculators, and volunteer newsletter forms.",
      tags: ["Donation Engine", "Impact Metrics", "Forest Green"],
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
      icon: "eco",
      badgeBg: "bg-emerald-600/90"
    },
    {
      name: "Corporate",
      slug: "corporate",
      theme: "Enterprise Navy",
      title: "Apex Consulting",
      desc: "Structured corporate consultation landing page with service descriptor tabs and a project quote request form.",
      tags: ["Quote Request", "Service Details", "Enterprise Navy"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
      icon: "corporate_fare",
      badgeBg: "bg-slate-800/90"
    },
    {
      name: "Medical Shop",
      slug: "medical-shop",
      theme: "Wellness Pharmacy",
      title: "MedVitals Pharmacy",
      desc: "Clean healthcare storefront showing OTC medical catalogs, prescription file upload sections, and express delivery details.",
      tags: ["Script Upload", "Wellness OTC", "Clean Teal"],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
      icon: "local_pharmacy",
      badgeBg: "bg-teal-650/90 bg-teal-650"
    }
  ];

  return (
    <div className="bg-[#fcf8ff] text-[#181445] min-h-screen flex flex-col relative overflow-x-hidden font-sans bg-[radial-gradient(circle_at_2px_2px,rgba(109,40,217,0.04)_1.5px,transparent_0)] bg-[size:24px_24px]">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[#5300b7]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#fea619]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-40 bg-[#fcf8ff]/80 backdrop-blur-md border-b border-[#ccc3d7]/30 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#5300b7] text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-2xl font-bold tracking-tight text-[#5300b7]">
              ZATBIZ <span className="text-xs text-[#4a4455] font-medium ml-1">TEMPLATES</span>
            </span>
          </div>
          <button className="bg-gradient-to-r from-[#5300b7] to-[#6d28d9] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 font-semibold shadow-md text-sm hover:shadow-[0_0_25px_rgba(109,40,217,0.45)]">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full relative">
        {/* Hero Section */}
        <header className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#5300b7]/10 px-4 py-1.5 rounded-full border border-[#6d28d9]/20">
            <span className="material-symbols-outlined text-[#5300b7] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-xs font-semibold text-[#5300b7] uppercase tracking-wider">Premium Web Architectures</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#181445] leading-tight">
            Stunning Landing Pages <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5300b7] via-[#5b1d94] to-[#fea619]">
              Tailored For Your Niche
            </span>
          </h1>
          <p className="text-lg text-[#4a4455] max-w-2xl mx-auto font-light leading-relaxed">
            Explore our fully responsive, custom-crafted homepages designed using advanced modern design systems. Click on any template to preview its premium interactive flow.
          </p>
        </header>

        {/* Templates Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {templates.map((temp) => (
            <div key={temp.slug} className="bg-[rgba(255,255,255,0.65)] backdrop-blur-xl border border-[rgba(233,213,255,0.5)] rounded-2xl overflow-hidden shadow-[0_20_40_-15_rgba(109,40,217,0.15)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group border-b-2 hover:border-b-[#5300b7]">
              <div>
                <div className="h-44 bg-slate-900 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${temp.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className={`absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${temp.badgeBg}`}>
                    {temp.theme}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-lg font-bold">{temp.icon}</span>
                    <span className="text-white font-bold text-base">{temp.title}</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#181445] group-hover:text-[#5300b7] transition-colors">{temp.name} Homepage</h3>
                  <p className="text-xs text-[#4a4455] font-light leading-relaxed">
                    {temp.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {temp.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-purple-100 text-purple-800 font-medium px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link 
                  href={`/frontend/${temp.slug}`} 
                  className="w-full text-center bg-gradient-to-r from-[#5300b7] to-[#6d28d9] text-white py-2.5 rounded-xl hover:opacity-95 font-semibold shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <span>Preview Template</span>
                  <span className="material-symbols-outlined text-xs font-bold">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Design Specifications Panel */}
        <section className="bg-[rgba(255,255,255,0.65)] backdrop-blur-xl border border-[rgba(233,213,255,0.5)] rounded-3xl p-8 shadow-[0_20_40_-15_rgba(109,40,217,0.15)] relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#5300b7]/5 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4 text-[#181445]">Design Architecture & Assets</h2>
            <p className="text-[#4a4455] text-sm leading-relaxed mb-6">
              Each page in this suite is engineered using the ZATBIZ unified CSS layout rules. The templates are entirely modular—incorporating local Tailwind configurations, custom animations, SVG illustrations, and light-weight embedded JavaScript algorithms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#5300b7] bg-[#5300b7]/10 p-2 rounded-xl">css</span>
                <div>
                  <h4 className="font-bold text-sm">Modular Tailwind</h4>
                  <p className="text-xs text-[#4a4455] leading-relaxed">No dependencies. Runs via high-speed CDNs with standalone custom extenders.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#5300b7] bg-[#5300b7]/10 p-2 rounded-xl">phone_iphone</span>
                <div>
                  <h4 className="font-bold text-sm">Responsive Fluidity</h4>
                  <p className="text-xs text-[#4a4455] leading-relaxed">Fluid layouts supporting seamless viewing from 320px screens up to 4K displays.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#5300b7] bg-[#5300b7]/10 p-2 rounded-xl">bolt</span>
                <div>
                  <h4 className="font-bold text-sm">Micro Interactions</h4>
                  <p className="text-xs text-[#4a4455] leading-relaxed">Subtle transitions, interactive sliders, and stateful widgets without lag.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#ccc3d7]/20 w-full py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5300b7] text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="font-bold text-sm text-[#5300b7]">ZATBIZ Template Hub</span>
          </div>
          <p className="text-xs text-[#4a4455]">
            © 2026 ZATBIZ Inc. All rights reserved. Crafted with high-fidelity coding.
          </p>
        </div>
      </footer>
    </div>
  );
}
