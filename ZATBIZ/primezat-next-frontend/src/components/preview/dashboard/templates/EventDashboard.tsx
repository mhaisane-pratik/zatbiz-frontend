'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Project } from '@/types';

interface EventDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  logoIcon: string;
  logoUrl?: string;
  shopNiche?: string | null;
  selectedDashboardOption?: number;
}

interface DashboardTheme {
  mainBg: string;
  asideBg: string;
  headerBg: string;
  asideBorder: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  primaryBtn: string;
  activeTab: string;
  accentText: string;
  accentBg: string;
  fontClass: string;
  decorIcon: string;
}

const getDashboardTheme = (opt: number): DashboardTheme => {
  const themes: Record<number, DashboardTheme> = {
    1: {
      mainBg: 'bg-gradient-to-tr from-purple-950/40 via-slate-950 to-indigo-950/30 text-slate-100',
      asideBg: 'bg-slate-950/90 backdrop-blur-xl',
      headerBg: 'bg-slate-950/40 backdrop-blur-md',
      asideBorder: 'border-r border-slate-900',
      headerBorder: 'border-b border-slate-900',
      cardBg: 'bg-slate-950/50 backdrop-blur-sm',
      cardBorder: 'border border-purple-900/30',
      primaryBtn: 'bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-750 hover:to-indigo-750 text-white shadow-md shadow-purple-550/20',
      activeTab: 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 border-l-4 border-purple-500',
      accentText: 'text-purple-400',
      accentBg: 'bg-purple-500/10 border border-purple-500/25 text-purple-400',
      fontClass: 'font-sans',
      decorIcon: '💍'
    },
    2: {
      mainBg: 'bg-black text-slate-100',
      asideBg: 'bg-[#090514]',
      headerBg: 'bg-[#090514]/90',
      asideBorder: 'border-r border-purple-950',
      headerBorder: 'border-b border-purple-950',
      cardBg: 'bg-[#100b21]',
      cardBorder: 'border border-purple-950 hover:border-purple-800 transition-colors',
      primaryBtn: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white',
      activeTab: 'bg-purple-950/40 text-fuchsia-400 border-l-4 border-fuchsia-500 shadow-[0_0_15px_rgba(240,70,250,0.1)]',
      accentText: 'text-fuchsia-400',
      accentBg: 'bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400',
      fontClass: 'font-sans',
      decorIcon: '⚡'
    },
    3: {
      mainBg: 'bg-[#FCFAF7] text-amber-955',
      asideBg: 'bg-[#FAF6F0]',
      headerBg: 'bg-[#FAF6F0]',
      asideBorder: 'border-r border-amber-900/15',
      headerBorder: 'border-b border-amber-900/15',
      cardBg: 'bg-white',
      cardBorder: 'border border-amber-900/20 shadow-sm',
      primaryBtn: 'bg-amber-955 hover:bg-amber-900 text-white font-serif',
      activeTab: 'bg-[#F5EFE6] text-amber-900 font-bold border-l-4 border-amber-800',
      accentText: 'text-amber-850',
      accentBg: 'bg-amber-100/50 border border-amber-200/50 text-amber-900',
      fontClass: 'font-serif',
      decorIcon: '👑'
    },
    4: {
      mainBg: 'bg-slate-50 text-slate-800',
      asideBg: 'bg-slate-900 text-slate-100',
      headerBg: 'bg-white',
      asideBorder: 'border-r border-slate-200',
      headerBorder: 'border-b border-slate-200',
      cardBg: 'bg-white',
      cardBorder: 'border border-slate-200 shadow-md',
      primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
      activeTab: 'bg-slate-800 text-white border-l-4 border-blue-500 shadow-inner',
      accentText: 'text-blue-600',
      accentBg: 'bg-blue-50 border border-blue-100 text-blue-700',
      fontClass: 'font-sans',
      decorIcon: '📊'
    },
    5: {
      mainBg: 'bg-[#FFF9F9] text-rose-955',
      asideBg: 'bg-rose-50',
      headerBg: 'bg-rose-50/70 backdrop-blur-md',
      asideBorder: 'border-r border-rose-150',
      headerBorder: 'border-b border-rose-150',
      cardBg: 'bg-white',
      cardBorder: 'border border-rose-100 shadow-sm rounded-3xl',
      primaryBtn: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/10',
      activeTab: 'bg-rose-500 text-white shadow-md border-l-4 border-rose-600',
      accentText: 'text-rose-600',
      accentBg: 'bg-rose-500/10 border border-rose-500/20 text-rose-600',
      fontClass: 'font-sans',
      decorIcon: '🌸'
    },
    6: {
      mainBg: 'bg-slate-50 text-slate-855',
      asideBg: 'bg-[#FAF8FF]',
      headerBg: 'bg-[#FAF8FF]/80 backdrop-blur',
      asideBorder: 'border-r border-purple-100',
      headerBorder: 'border-b border-purple-100',
      cardBg: 'bg-white',
      cardBorder: 'border border-purple-50 shadow-md rounded-[24px]',
      primaryBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      activeTab: 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500 font-bold',
      accentText: 'text-indigo-650',
      accentBg: 'bg-indigo-50 border border-indigo-100 text-indigo-700',
      fontClass: 'font-sans',
      decorIcon: '🕊️'
    },
    7: {
      mainBg: 'bg-[#FFFBF7] text-[#5C4533]',
      asideBg: 'bg-[#FFF0E6]',
      headerBg: 'bg-[#FFF5EE]',
      asideBorder: 'border-r border-orange-100',
      headerBorder: 'border-b border-orange-100',
      cardBg: 'bg-white',
      cardBorder: 'border border-orange-100 shadow-[0_8px_30px_rgba(255,240,230,0.3)] rounded-[28px]',
      primaryBtn: 'bg-orange-500 hover:bg-orange-600 text-white rounded-2xl',
      activeTab: 'bg-orange-500 text-white shadow border-l-4 border-orange-600 rounded-xl',
      accentText: 'text-orange-600',
      accentBg: 'bg-orange-50 border border-orange-100 text-orange-755 font-bold',
      fontClass: 'font-sans',
      decorIcon: '🎈'
    },
    8: {
      mainBg: 'bg-slate-900 text-slate-105',
      asideBg: 'bg-slate-950',
      headerBg: 'bg-slate-950',
      asideBorder: 'border-r border-slate-800',
      headerBorder: 'border-b border-slate-800',
      cardBg: 'bg-slate-955',
      cardBorder: 'border border-slate-800 rounded-xl',
      primaryBtn: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold',
      activeTab: 'bg-slate-800 text-white border-l-4 border-slate-400 font-bold',
      accentText: 'text-slate-300',
      accentBg: 'bg-slate-800 border border-slate-700 text-slate-300',
      fontClass: 'font-sans',
      decorIcon: '📊'
    },
    9: {
      mainBg: 'bg-[#FAF8F5] text-slate-800',
      asideBg: 'bg-[#F5F1E9]',
      headerBg: 'bg-[#F5F1E9]',
      asideBorder: 'border-r border-purple-200/50',
      headerBorder: 'border-b border-purple-200/50',
      cardBg: 'bg-white',
      cardBorder: 'border border-purple-100 shadow-sm rounded-3xl',
      primaryBtn: 'bg-purple-600 hover:bg-purple-700 text-white font-bold',
      activeTab: 'bg-purple-500 text-white border-l-4 border-purple-600',
      accentText: 'text-purple-650',
      accentBg: 'bg-purple-50 border border-purple-100 text-purple-700',
      fontClass: 'font-sans',
      decorIcon: '🦄'
    },
    10: {
      mainBg: 'bg-[#040608] text-[#D8E6D8]',
      asideBg: 'bg-[#090D12]',
      headerBg: 'bg-[#090D12]',
      asideBorder: 'border-r-2 border-emerald-950',
      headerBorder: 'border-b-2 border-emerald-955',
      cardBg: 'bg-[#0B1218]',
      cardBorder: 'border-2 border-emerald-950 hover:border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.02)]',
      primaryBtn: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black border-2 border-emerald-400 rounded-none shadow-[2px_2px_0_0_rgba(16,185,129,0.2)]',
      activeTab: 'bg-emerald-950/40 text-emerald-455 border-l-4 border-emerald-500',
      accentText: 'text-emerald-400 font-bold',
      accentBg: 'bg-emerald-950 border border-emerald-900 text-emerald-400',
      fontClass: 'font-mono',
      decorIcon: '👾'
    }
  };
  return themes[opt] || themes[1];
};

export default function EventDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName: initialCompanyName,
  logoIcon,
  logoUrl,
  shopNiche,
  selectedDashboardOption = 1,
}: EventDashboardProps) {
  const isAdmin = clientEmail === 'admin@gmail.com';
  const currentTheme = getDashboardTheme(selectedDashboardOption);
  const projectDisplayName = initialCompanyName || project.name || 'Wedding & Event Planner';
  const clientDisplayName = clientEmail?.split('@')[0]?.replace(/[._-]/g, ' ') || 'Client Guest';
  const homePageHeadline = `${projectDisplayName} Dashboard`;
  const aboutUsCopy = `We are a premier event design and planning studio dedicated to crafting custom celebrations for ${projectDisplayName}.`;

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userTab, setUserTab] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. Business/Agency Info
  const [agencyInfo, setAgencyInfo] = useState<any>({
    companyName: projectDisplayName,
    ownerName: 'Victoria Rose',
    businessEmail: `contact@${projectDisplayName.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'weddings'}.com`,
    phone: '+91 99000 88221',
    whatsApp: '+91 99000 88221',
    businessAddress: 'Palace Road, Near Raj Bhavan',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    logoUrl: logoUrl || '',
    coverImageUrl: '',
    workingHours: '10:00 AM - 08:00 PM',
    gstNumber: '29AAAAA0000A1Z2',
    socialMediaLinks: 'https://instagram.com/royalweddings',
  });

  // 2. Client Profile State
  const [clientProfile, setClientProfile] = useState<any>({
    name: clientDisplayName,
    email: clientEmail,
    phone: '+91 99999 88888',
    address: 'Palace Grounds, Bangalore',
    profilePic: '👩',
    notifPref: 'Email & WhatsApp',
    password: '••••••••',
  });

  // 3. Database Entity Lists (starting with 'event_' prefix)
  const [bookings, setBookings] = useState<any[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [checklistItems, setChecklistItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  // 4. Website CMS & Settings State
  const [websiteSettings, setWebsiteSettings] = useState<any>({
    homePageText: homePageHeadline,
    aboutUsText: aboutUsCopy,
    themeColor: 'deepblue',
  });
  const [seoSettings, setSeoSettings] = useState<any>({
    metaTitle: `${projectDisplayName} | Premium Wedding Planner Bangalore`,
    metaDescription: `Expert destination wedding planners and luxury event coordinators for ${projectDisplayName}.`,
    metaKeywords: 'wedding, events, planner, bangalore, luxury decor',
  });

  // Modals & New Entry States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventType: 'Wedding Planning',
    eventDate: '',
    budget: 500000,
    location: 'Grand Palace, Bangalore',
    guestsCount: 200,
    message: 'Required premium catering and stage lights.',
    status: 'New',
    specialRequirements: 'Strict hygiene checklist for kitchen.',
  });

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    bookingId: '',
    invoiceNumber: '',
    invoiceType: 'Advance Invoice',
    amount: 100000,
    taxAmount: 18000,
    totalAmount: 118000,
    status: 'Pending',
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    bookingId: '',
    amount: 118000,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI',
    paymentType: 'Advance Payment',
    status: 'Completed',
  });

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'Decoration',
    amount: 25000,
    expenseDate: new Date().toISOString().split('T')[0],
    description: 'Stage background flower arch set',
  });

  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    type: 'Photographers',
    phone: '',
    email: '',
    address: '',
    cost: 50000,
    status: 'Active',
  });

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    role: 'Event Coordinator',
    phone: '',
    email: '',
    salary: 25000,
    attendance: 'Present',
    status: 'Active',
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    bookingId: '',
    quotationNumber: '',
    amount: 450000,
    details: 'Comprehensive design planner, floral arrangements, catering, and DJ services.',
    status: 'Pending',
  });

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    reviewText: '',
  });

  // Selected details for modal view
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    loadAllData();
  }, [projectId]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [
        bks, cals, invs, pays, exps, vends, team, custs, quotes,
        blgs, fqs, lds, cps, notifs, tkts, revs, chks, info
      ] = await Promise.all([
        api.event.bookings.list(projectId).catch(() => []),
        api.event.calendarEvents.list(projectId).catch(() => []),
        api.event.invoices.list(projectId).catch(() => []),
        api.event.payments.list(projectId).catch(() => []),
        api.event.expenses.list(projectId).catch(() => []),
        api.event.vendors.list(projectId).catch(() => []),
        api.event.teamMembers.list(projectId).catch(() => []),
        api.event.customers.list(projectId).catch(() => []),
        api.event.quotations.list(projectId).catch(() => []),
        api.event.blogs.list(projectId).catch(() => []),
        api.event.faqs.list(projectId).catch(() => []),
        api.event.leads.list(projectId).catch(() => []),
        api.event.coupons.list(projectId).catch(() => []),
        api.event.notifications.list(projectId).catch(() => []),
        api.event.supportTickets.list(projectId).catch(() => []),
        api.event.reviews.list(projectId).catch(() => []),
        api.event.checklistItems.list(projectId).catch(() => []),
        api.event.getAgencyInfo(projectId).catch(() => null),
      ]);

      setBookings(bks);
      setCalendarEvents(cals);
      setInvoices(invs);
      setPayments(pays);
      setExpenses(exps);
      setVendors(vends);
      setTeamMembers(team);
      setCustomers(custs);
      setQuotations(quotes);
      setBlogs(blgs);
      setFaqs(fqs);
      setLeads(lds);
      setCoupons(cps);
      setNotifications(notifs);
      setSupportTickets(tkts);
      setReviews(revs);
      setChecklistItems(chks);

      if (info) {
        setAgencyInfo(info);
      }

      // Seed mock data if none exists in backend
      if (bks.length === 0) {
        seedInitialMockData();
      }
    } catch (e) {
      console.warn('Backend connections unavailable, loading simulated datasets.');
      seedInitialMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const seedInitialMockData = () => {
    const primaryClient = projectDisplayName;
    const defaultBookings = [
      { id: 101, projectId, customerName: primaryClient, customerEmail: clientEmail, customerPhone: '+91 99999 88888', eventType: 'Wedding Planning', eventDate: '2026-11-25', budget: 500000.0, location: 'Palace Grounds, Bangalore', guestsCount: 250, status: 'Confirmed', message: 'Pastel colors themed staging', specialRequirements: 'Eco-friendly disposables and fresh lavender flowers' },
      { id: 102, projectId, customerName: 'Guest Lead', customerEmail: 'guest@example.com', customerPhone: '+91 88888 77777', eventType: 'Birthday Planning', eventDate: '2026-08-15', budget: 120000.0, location: 'Sheraton Grand, Bangalore', guestsCount: 80, status: 'Contacted', message: 'Custom event styling', specialRequirements: 'Include balloon artist and magic show coordinator' },
      { id: 103, projectId, customerName: 'Corporate Lead', customerEmail: 'corporate@example.com', customerPhone: '+91 77777 66666', eventType: 'Corporate Events', eventDate: '2026-09-10', budget: 800000.0, location: 'Lalit Ashok, Bangalore', guestsCount: 500, status: 'Completed', message: 'Tech Annual Awards Gala', specialRequirements: 'Strict sound proofing and projection mapping stage setup' }
    ];
    setBookings(defaultBookings);

    setCalendarEvents([
      { id: 201, projectId, title: `${primaryClient} decor checklist`, description: 'Re-verify table counts & stage arches', startDateTime: '2026-11-25T10:00', endDateTime: '2026-11-25T18:00', type: 'Upcoming Events' },
      { id: 202, projectId, title: 'Guest prep call', description: 'Align with balloon vendor', startDateTime: '2026-08-15T11:00', endDateTime: '2026-08-15T12:00', type: "Today's Events" },
      { id: 203, projectId, title: 'Venue Inspection - Taj Palace', description: 'Confirm catering kitchen slots', startDateTime: '2026-07-10T14:00', endDateTime: '2026-07-10T16:00', type: 'Upcoming Events' }
    ]);

    setInvoices([
      { id: 301, projectId, bookingId: 101, invoiceNumber: 'INV-401202', invoiceType: 'Advance Payment', amount: 150000.0, taxAmount: 27000.0, totalAmount: 177000.0, status: 'Paid', createdDate: '2026-06-25' },
      { id: 302, projectId, bookingId: 101, invoiceNumber: 'INV-401203', invoiceType: 'Remaining Payment', amount: 350000.0, taxAmount: 63000.0, totalAmount: 413000.0, status: 'Pending', createdDate: '2026-06-26' }
    ]);

    setPayments([
      { id: 401, projectId, bookingId: 101, amount: 177000.0, paymentDate: '2026-06-25', paymentMethod: 'UPI', paymentType: 'Advance Payment', status: 'Completed' }
    ]);

    setExpenses([
      { id: 501, projectId, category: 'Decoration', amount: 75000.0, expenseDate: '2026-06-25', description: 'Stage background flower arches' },
      { id: 502, projectId, category: 'Salary', amount: 30000.0, expenseDate: '2026-06-26', description: 'Crew coordinator daily allowance' },
      { id: 503, projectId, category: 'Photography', amount: 45000.0, expenseDate: '2026-06-27', description: 'Drone camera rental fees' }
    ]);

    setVendors([
      { id: 601, projectId, name: 'Golden Petals Florist', type: 'Decorators', phone: '+91 91111 22222', email: 'petals@gmail.com', address: 'MG Road, Bangalore', cost: 45000.0, status: 'Active' },
      { id: 602, projectId, name: 'Lens Craft Photography', type: 'Photographers', phone: '+91 92222 33333', email: 'lens@craft.com', address: 'Koramangala, Bangalore', cost: 120000.0, status: 'Active' },
      { id: 603, projectId, name: 'Royal Caterers', type: 'Caterers', phone: '+91 93333 44444', email: 'royal@catering.com', address: 'Whitefield, Bangalore', cost: 250000.0, status: 'Active' },
      { id: 604, projectId, name: 'DJ Soundwaves', type: 'DJ', phone: '+91 94444 55555', email: 'dj@soundwaves.com', address: 'HSR Layout, Bangalore', cost: 35000.0, status: 'Active' },
      { id: 605, projectId, name: 'Glow Up Makeup Studio', type: 'Makeup Artist', phone: '+91 95555 66666', email: 'glow@makeup.com', address: 'Indiranagar, Bangalore', cost: 25000.0, status: 'Active' }
    ]);

    setTeamMembers([
      { id: 701, projectId, name: 'Vikram Das', role: 'Event Manager', phone: '+91 98111 11222', email: 'vikram@royalweddings.com', salary: 45000.0, attendance: 'Present', status: 'Active' },
      { id: 702, projectId, name: 'Nisha Pillai', role: 'Event Coordinator', phone: '+91 98222 22333', email: 'nisha@royalweddings.com', salary: 30000.0, attendance: 'Present', status: 'Active' },
      { id: 703, projectId, name: 'Abhay Kumar', role: 'Sales Executive', phone: '+91 98333 33444', email: 'abhay@royalweddings.com', salary: 28000.0, attendance: 'Present', status: 'Active' }
    ]);

    setCustomers([
      { id: 801, projectId, name: primaryClient, email: clientEmail, phone: '+91 99999 88888', address: 'Palace Grounds, Bangalore', notes: 'Demands absolute hygiene checklist' },
      { id: 802, projectId, name: 'Guest Lead', email: 'guest@example.com', phone: '+91 88888 77777', address: 'Sheraton Grand, Bangalore', notes: 'Needs balloon decorator coordination' }
    ]);

    setQuotations([
      { id: 901, projectId, bookingId: 101, quotationNumber: 'QTN-881203', amount: 500000.0, details: 'Full styling decoration, DSLR premium photopackage, sound, and lighting.', status: 'Accepted', createdDate: '2026-06-24' },
      { id: 902, projectId, bookingId: 102, quotationNumber: 'QTN-881204', amount: 120000.0, details: 'Pirate theme balloon arch, sound setups, and stage lights.', status: 'Pending', createdDate: '2026-06-25' }
    ]);

    setBlogs([
      { id: 1001, projectId, title: `${primaryClient} Wedding Trends 2026`, content: 'Explore pastel curtains and orchids staging rules.', category: 'Wedding', imageUrl: '', author: 'Victoria Rose', createdDate: '2026-06-20' }
    ]);

    setFaqs([
      { id: 1101, projectId, question: 'What is your payment breakdown structure?', answer: 'We collect 30% advance on booking, 50% one week before start, and 20% post event completion.' }
    ]);

    setLeads([
      { id: 1201, projectId, name: 'Sunita Nair', phone: '+91 99990 00011', email: 'sunita@gmail.com', eventType: 'Wedding Planning', budget: 600000.0, status: 'New', createdDate: '2026-06-25', source: 'Website Leads' },
      { id: 1202, projectId, name: 'Amit Shah', phone: '+91 88880 00022', email: 'amit@gmail.com', eventType: 'Corporate Events', budget: 500000.0, status: 'Contacted', createdDate: '2026-06-26', source: 'WhatsApp Leads' }
    ]);

    setNotifications([
      { id: 1301, projectId, category: 'Booking Updates', content: `${projectDisplayName} consultation request submitted.`, timestamp: '2026-06-26 12:00 PM' },
      { id: 1302, projectId, category: 'Payment Reminder', content: 'Outstanding dues invoice generated for booking #101.', timestamp: '2026-06-26 09:00 AM' }
    ]);

    setSupportTickets([
      { id: 1401, projectId, clientEmail, subject: 'Change flower color to Orchid', description: 'Request to swap standard rose decorations for pastel orchid setups.', status: 'Open', createdDate: '2026-06-26' }
    ]);

    setReviews([
      { id: 1501, projectId, clientName: 'Shalini Sharma', clientEmail: 'shalini@gmail.com', rating: 5, reviewText: 'Spectacular floral staging! End to end alignment was fully clean.', createdDate: '2026-06-24', status: 'Approved' }
    ]);

    setChecklistItems([
      { id: 1601, projectId, bookingId: 101, taskName: 'Venue Confirmed', isCompleted: true },
      { id: 1602, projectId, bookingId: 101, taskName: 'Decoration', isCompleted: false },
      { id: 1603, projectId, bookingId: 101, taskName: 'Photography', isCompleted: false },
      { id: 1604, projectId, bookingId: 101, taskName: 'Food Preparation', isCompleted: false },
      { id: 1605, projectId, bookingId: 101, taskName: 'Entertainment', isCompleted: false },
      { id: 1606, projectId, bookingId: 101, taskName: 'Guest List', isCompleted: false },
      { id: 1607, projectId, bookingId: 101, taskName: 'Transportation', isCompleted: false }
    ]);

    setCategories([
      { id: 1701, projectId, name: 'Wedding Planning' },
      { id: 1702, projectId, name: 'Birthday Planning' },
      { id: 1703, projectId, name: 'Corporate Events' }
    ]);

    setServices([
      { id: 1801, projectId, name: 'Wedding Planning', cost: 150000 },
      { id: 1802, projectId, name: 'Birthday Planning', cost: 50000 },
      { id: 1803, projectId, name: 'Corporate Events', cost: 200000 },
      { id: 1804, projectId, name: 'Photography', cost: 100000 },
      { id: 1805, projectId, name: 'Decoration', cost: 120000 },
      { id: 1806, projectId, name: 'Catering', cost: 250000 },
      { id: 1807, projectId, name: 'DJ Services', cost: 40000 },
      { id: 1808, projectId, name: 'Entertainment', cost: 30000 }
    ]);

    setPackages([
      { id: 1901, projectId, name: 'Silver Package', price: 150000, includes: 'Basic decoration, Standard sound, 1 Photographer' },
      { id: 1902, projectId, name: 'Gold Package', price: 300000, includes: 'Premium decor, DJ Sound, 2 Photographers, Buffet setup assistance' },
      { id: 1903, projectId, name: 'Premium Package', price: 500000, includes: 'Luxury flower stage, DJ + Live Music, Drone photography, catering coord' },
      { id: 1904, projectId, name: 'Luxury Package', price: 800000, includes: 'Full destination planning, Celebrity DJ, HD cinematic video, High-end decorators' },
      { id: 1905, projectId, name: 'Custom Package', price: 0, includes: 'Tailored event elements based on custom requirement requests' }
    ]);
  };

  // Sync utilities with API backend or fallback
  const syncWithBackend = async (action: () => Promise<any>, mockAction: () => void) => {
    try {
      await action();
      await loadAllData();
    } catch (e) {
      mockAction();
    }
  };

  // Client side action handlers
  const handleClientBookEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      customerName: clientProfile.name,
      customerEmail: clientProfile.email,
      customerPhone: clientProfile.phone,
      eventType: newBooking.eventType,
      eventDate: newBooking.eventDate,
      budget: Number(newBooking.budget),
      location: newBooking.location,
      guestsCount: Number(newBooking.guestsCount),
      message: newBooking.message,
      status: 'New',
      specialRequirements: newBooking.specialRequirements,
    };
    await syncWithBackend(
      () => api.event.bookings.create(payload),
      () => {
        const generatedId = Date.now();
        setBookings(prev => [...prev, { id: generatedId, ...payload }]);
        setChecklistItems(prev => [
          ...prev,
          { id: generatedId + 1, projectId, bookingId: generatedId, taskName: 'Venue Confirmed', isCompleted: false },
          { id: generatedId + 2, projectId, bookingId: generatedId, taskName: 'Decoration', isCompleted: false },
          { id: generatedId + 3, projectId, bookingId: generatedId, taskName: 'Photography', isCompleted: false },
          { id: generatedId + 4, projectId, bookingId: generatedId, taskName: 'Food', isCompleted: false },
          { id: generatedId + 5, projectId, bookingId: generatedId, taskName: 'Entertainment', isCompleted: false },
          { id: generatedId + 6, projectId, bookingId: generatedId, taskName: 'Guest List', isCompleted: false },
          { id: generatedId + 7, projectId, bookingId: generatedId, taskName: 'Transportation', isCompleted: false }
        ]);
        alert('Booking Consultation request logged in database!');
      }
    );
    setIsBookingModalOpen(false);
  };

  const handleClientSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      clientEmail,
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0]
    };
    await syncWithBackend(
      () => api.event.supportTickets.create(payload),
      () => {
        setSupportTickets(prev => [...prev, { id: Date.now(), ...payload }]);
        alert('Support ticket raised. Team will review shortly.');
      }
    );
    setIsTicketModalOpen(false);
    setNewTicket({ subject: '', description: '' });
  };

  const handleClientSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      clientEmail,
      clientName: clientProfile.name,
      rating: newReview.rating,
      reviewText: newReview.reviewText,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    await syncWithBackend(
      () => api.event.reviews.create(payload),
      () => {
        setReviews(prev => [...prev, { id: Date.now(), ...payload }]);
        alert('Thank you! Your testimonial feedback has been recorded.');
      }
    );
    setIsReviewModalOpen(false);
    setNewReview({ rating: 5, reviewText: '' });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile information updated successfully.');
  };

  // Mock Pay Online trigger
  const handleClientPayNow = (invoice: any) => {
    alert(`Mock UPI/Stripe secure frame opened for ${invoice.invoiceNumber}. Settle Amount: ₹${invoice.totalAmount.toLocaleString()}`);
    // Update invoice status
    setInvoices(prev => prev.map(inv => inv.id === invoice.id ? { ...inv, status: 'Paid' } : inv));
    // Add payment entry
    const payPayload = {
      id: Date.now(),
      projectId,
      bookingId: invoice.bookingId,
      amount: invoice.totalAmount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'UPI Online',
      paymentType: invoice.invoiceType,
      status: 'Completed'
    };
    setPayments(prev => [...prev, payPayload]);
    alert('Payment Received successfully!');
  };

  // Checklist updates
  const handleToggleChecklist = async (chkId: number) => {
    const target = checklistItems.find(c => c.id === chkId);
    if (!target) return;
    const payload = { ...target, isCompleted: !target.isCompleted };
    await syncWithBackend(
      () => api.event.checklistItems.update(chkId, payload),
      () => setChecklistItems(prev => prev.map(c => c.id === chkId ? payload : c))
    );
  };

  // Quotation acceptances
  const handleAcceptQuote = async (qId: number) => {
    const target = quotations.find(q => q.id === qId);
    if (!target) return;
    const payload = { ...target, status: 'Accepted' };
    await syncWithBackend(
      () => api.event.quotations.update(qId, payload),
      () => setQuotations(prev => prev.map(q => q.id === qId ? payload : q))
    );
    alert('Quotation accepted! Advanced invoice generated.');
  };

  const handleRejectQuote = async (qId: number) => {
    const target = quotations.find(q => q.id === qId);
    if (!target) return;
    const payload = { ...target, status: 'Rejected' };
    await syncWithBackend(
      () => api.event.quotations.update(qId, payload),
      () => setQuotations(prev => prev.map(q => q.id === qId ? payload : q))
    );
    alert('Proposal rejected. Our support crew will get in touch with revisions.');
  };

  // Admin Side management triggers
  const handleUpdateBookingStatus = async (id: number, status: string) => {
    const target = bookings.find(b => b.id === id);
    if (!target) return;
    const payload = { ...target, status };
    await syncWithBackend(
      () => api.event.bookings.update(id, payload),
      () => setBookings(prev => prev.map(b => b.id === id ? payload : b))
    );
    alert(`Booking status changed to ${status}`);
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      bookingId: Number(newInvoice.bookingId),
      invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      invoiceType: newInvoice.invoiceType,
      amount: Number(newInvoice.amount),
      taxAmount: Number(newInvoice.taxAmount),
      totalAmount: Number(newInvoice.totalAmount),
      status: newInvoice.status,
      createdDate: new Date().toISOString().split('T')[0]
    };
    await syncWithBackend(
      () => api.event.invoices.create(payload),
      () => setInvoices(prev => [...prev, { id: Date.now(), ...payload }])
    );
    setIsInvoiceModalOpen(false);
    alert('Invoice logged successfully.');
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      bookingId: Number(newPayment.bookingId),
      amount: Number(newPayment.amount),
      paymentDate: newPayment.paymentDate,
      paymentMethod: newPayment.paymentMethod,
      paymentType: newPayment.paymentType,
      status: newPayment.status
    };
    await syncWithBackend(
      () => api.event.payments.create(payload),
      () => setPayments(prev => [...prev, { id: Date.now(), ...payload }])
    );
    setIsPaymentModalOpen(false);
    alert('Receipt payment recorded successfully.');
  };

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      category: newExpense.category,
      amount: Number(newExpense.amount),
      expenseDate: newExpense.expenseDate,
      description: newExpense.description
    };
    await syncWithBackend(
      () => api.event.expenses.create(payload),
      () => setExpenses(prev => [...prev, { id: Date.now(), ...payload }])
    );
    setIsExpenseModalOpen(false);
    alert('Expense recorded in ledger.');
  };

  const handleCreateVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      name: newVendor.name,
      type: newVendor.type,
      phone: newVendor.phone,
      email: newVendor.email,
      address: newVendor.address,
      cost: Number(newVendor.cost),
      status: newVendor.status
    };
    await syncWithBackend(
      () => api.event.vendors.create(payload),
      () => setVendors(prev => [...prev, { id: Date.now(), ...payload }])
    );
    setIsVendorModalOpen(false);
    alert('Vendor recorded in registry.');
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      name: newTeamMember.name,
      role: newTeamMember.role,
      phone: newTeamMember.phone,
      email: newTeamMember.email,
      salary: Number(newTeamMember.salary),
      attendance: newTeamMember.attendance,
      status: newTeamMember.status
    };
    await syncWithBackend(
      () => api.event.teamMembers.create(payload),
      () => setTeamMembers(prev => [...prev, { id: Date.now(), ...payload }])
    );
    setIsTeamModalOpen(false);
    alert('Staff crew member registered.');
  };

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      bookingId: Number(newQuote.bookingId),
      quotationNumber: 'QTN-' + Math.floor(100000 + Math.random() * 900000),
      amount: Number(newQuote.amount),
      details: newQuote.details,
      status: newQuote.status,
      createdDate: new Date().toISOString().split('T')[0]
    };
    await syncWithBackend(
      () => api.event.quotations.create(payload),
      () => setQuotations(prev => [...prev, { id: Date.now(), ...payload }])
    );
    setIsQuoteModalOpen(false);
    alert('Proposal sent successfully.');
  };

  const handleSaveAgencyInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await syncWithBackend(
      () => api.event.saveAgencyInfo(projectId, agencyInfo),
      () => alert('System Agency Profile configuration saved locally.')
    );
  };

  // Calculations for KPI Metrics
  const clientBooking = bookings.find(b => b.customerEmail === clientEmail) || bookings[0] || {};
  const clientChecklist = checklistItems.filter(chk => chk.bookingId === clientBooking.id);
  const clientInvoices = invoices.filter(inv => inv.bookingId === clientBooking.id);
  const clientPayments = payments.filter(p => p.bookingId === clientBooking.id);
  const clientQuotes = quotations.filter(q => q.bookingId === clientBooking.id);
  const clientTickets = supportTickets.filter(t => t.clientEmail === clientEmail);
  const clientNotifs = notifications;

  const totalPaidByClient = clientPayments.reduce((sum, p) => p.status === 'Completed' ? sum + p.amount : sum, 0);
  const pendingPaymentsByClient = clientInvoices.reduce((sum, inv) => inv.status === 'Pending' ? sum + inv.totalAmount : sum, 0);

  const adminRevenue = payments.reduce((sum, p) => p.status === 'Completed' ? sum + p.amount : sum, 0);
  const adminPendingPayments = invoices.reduce((sum, inv) => inv.status === 'Pending' ? sum + inv.totalAmount : sum, 0);
  const adminExpenses = expenses.reduce((sum, ex) => sum + ex.amount, 0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#07080d] items-center justify-center text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Event Planner Panel...</p>
        </div>
      </div>
    );
  }

  const isLightTheme = [3, 4, 5, 6, 7, 9].includes(selectedDashboardOption);
  const themeClass = isLightTheme
    ? 'wedding-light-theme'
    : selectedDashboardOption === 1
    ? 'wedding-glass-theme'
    : selectedDashboardOption === 2
    ? 'wedding-neon-theme'
    : selectedDashboardOption === 8
    ? 'wedding-slate-theme'
    : 'wedding-cyber-theme';

  return (
    <div className={`flex min-h-screen ${currentTheme.mainBg} ${currentTheme.fontClass} ${themeClass} w-full`}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Glassmorphic Theme Overrides */
        .wedding-glass-theme .bg-slate-950 {
          background-color: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(12px) !important;
        }
        .wedding-glass-theme .bg-slate-950.border-slate-900 {
          background-color: rgba(255, 255, 255, 0.03) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(12px) !important;
        }
        .wedding-glass-theme .border-slate-900 {
          border-color: rgba(255, 255, 255, 0.08) !important;
        }
        .wedding-glass-theme .bg-slate-900 {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }

        /* Dark Purple Neon Theme Overrides */
        .wedding-neon-theme .bg-slate-950 {
          background-color: #070311 !important;
        }
        .wedding-neon-theme .bg-slate-950.border-slate-900 {
          background-color: #100b21 !important;
          border-color: #3b0764 !important;
        }
        .wedding-neon-theme .border-slate-900 {
          border-color: #3b0764 !important;
        }
        .wedding-neon-theme .bg-slate-900 {
          background-color: #160f2e !important;
          border-color: #3b0764 !important;
        }

        /* Slate Theme Overrides */
        .wedding-slate-theme .bg-slate-950 {
          background-color: #0f172a !important;
        }
        .wedding-slate-theme .bg-slate-950.border-slate-900 {
          background-color: #0f172a !important;
          border-color: #1e293b !important;
        }
        .wedding-slate-theme .border-slate-900 {
          border-color: #1e293b !important;
        }
        .wedding-slate-theme .bg-slate-900 {
          background-color: #1e293b !important;
          border-color: #334155 !important;
        }

        /* Cyber Theme Overrides */
        .wedding-cyber-theme .bg-slate-950 {
          background-color: #090d12 !important;
        }
        .wedding-cyber-theme .bg-slate-950.border-slate-900 {
          background-color: #0b1218 !important;
          border-color: #064e3b !important;
        }
        .wedding-cyber-theme .border-slate-900 {
          border-color: #064e3b !important;
        }
        .wedding-cyber-theme .bg-slate-900 {
          background-color: #101a24 !important;
          border-color: #064e3b !important;
        }
        .wedding-cyber-theme input,
        .wedding-cyber-theme select,
        .wedding-cyber-theme textarea {
          background-color: #090d12 !important;
          border-color: #064e3b !important;
          color: #10b981 !important;
        }

        /* Light Themes Overrides */
        .wedding-light-theme .bg-slate-950 {
          background-color: #ffffff !important;
          color: #1e293b !important;
        }
        .wedding-light-theme .text-white {
          color: #0f172a !important;
        }
        .wedding-light-theme .text-slate-100 {
          color: #1e293b !important;
        }
        .wedding-light-theme .text-slate-150 {
          color: #334155 !important;
        }
        .wedding-light-theme .text-slate-400 {
          color: #475569 !important;
        }
        .wedding-light-theme .text-slate-500 {
          color: #64748b !important;
        }
        .wedding-light-theme input,
        .wedding-light-theme select,
        .wedding-light-theme textarea {
          background-color: #f8fafc !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }
        .wedding-light-theme .bg-slate-900 {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          color: #334155 !important;
        }
        .wedding-light-theme .bg-slate-950.border-slate-900 {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important;
        }
        .wedding-light-theme .border-slate-900 {
          border-color: #e2e8f0 !important;
        }
        .wedding-light-theme .border-slate-800 {
          border-color: #e2e8f0 !important;
        }
        .wedding-light-theme .border-slate-700 {
          border-color: #e2e8f0 !important;
        }
        .wedding-light-theme .divide-slate-900 > * + * {
          border-color: #e2e8f0 !important;
        }
        .wedding-light-theme .divide-slate-800 > * + * {
          border-color: #e2e8f0 !important;
        }
      `}} />

      {/* ========================================================================= */}
      {/* 👤 CUSTOMER PANEL / USER SIDE */}
      {/* ========================================================================= */}
      {!isAdmin && (
        <div className="flex w-full min-h-screen">
          {/* Sidebar */}
          <aside className={`w-64 ${currentTheme.asideBg} ${currentTheme.asideBorder} flex flex-col justify-between p-4`}>
            <div>
              <div className={`p-4 border-b ${currentTheme.headerBorder} flex items-center gap-3`}>
                <span className="text-2xl">{logoIcon || currentTheme.decorIcon}</span>
                <div>
                  <h2 className={`font-bold text-sm truncate ${selectedDashboardOption === 3 ? 'text-[#3d3325]' : selectedDashboardOption === 10 ? 'text-emerald-400' : 'text-white'}`}>{agencyInfo.companyName}</h2>
                  <p className={`text-[9px] ${currentTheme.accentText} font-extrabold uppercase tracking-wider`}>Client Cabinet</p>
                </div>
              </div>
              <nav className="mt-6 space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
                  { id: 'profile', label: 'Profile Management', icon: '👤' },
                  { id: 'booking', label: 'Event Booking', icon: '📅' },
                  { id: 'my_bookings', label: 'My Bookings', icon: '💍' },
                  { id: 'quotations', label: 'Quotations', icon: '📄' },
                  { id: 'payments', label: 'Payments', icon: '💳' },
                  { id: 'timeline', label: 'Event Timeline', icon: '📈' },
                  { id: 'vendors', label: 'Vendor Information', icon: '🤝' },
                  { id: 'checklist', label: 'Event Checklist', icon: '✓' },
                  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
                  { id: 'support', label: 'Support & Tickets', icon: '🛠️' },
                  { id: 'notifications', label: 'Notifications', icon: '🔔' },
                  { id: 'reviews', label: 'Reviews', icon: '⭐' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setUserTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      userTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'
                    }`}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-slate-900 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white truncate max-w-[120px]">{clientProfile.name}</p>
                <p className="text-[10px] text-slate-500 truncate max-w-[120px]">{clientEmail}</p>
              </div>
              <button onClick={onLogout} title="Logout" className="p-1.5 rounded bg-slate-900 hover:bg-red-950 text-slate-455 hover:text-red-400 transition">
                🚪
              </button>
            </div>
          </aside>

          {/* Main workspace */}
          <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
            <header className={`h-16 border-b ${currentTheme.headerBorder} ${currentTheme.headerBg} backdrop-blur px-8 flex items-center justify-between sticky top-0 z-30`}>
              <h1 className={`font-bold text-base capitalize ${selectedDashboardOption === 3 ? 'text-amber-955' : 'text-white'}`}>{userTab.replace('_', ' ')}</h1>
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${currentTheme.accentBg}`}>
                Customer Panel
              </span>
            </header>

            <div className="p-8 flex-1 space-y-6">

              {/* 1. Dashboard */}
              {userTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Welcome Message */}
                  <div className="p-8 bg-gradient-to-r from-pink-950/50 via-purple-950/20 to-slate-950 border border-pink-500/15 rounded-3xl relative overflow-hidden">
                    <span className="absolute right-8 bottom-0 opacity-10 text-9xl">💍</span>
                    <h2 className="text-2xl font-black text-white">Welcome Back, {clientProfile.name}!</h2>
                    <p className="text-xs text-slate-400 mt-2 max-w-lg leading-relaxed">
                      Track your upcoming wedding stages, review planner invoices, and accept quotation proposals. We are planning a masterpiece!
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => setUserTab('booking')} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition">
                        📅 Book New Event
                      </button>
                      <button onClick={() => setUserTab('payments')} className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-slate-350 rounded-xl text-xs font-bold transition">
                        💳 settle Pending Payments
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Booking Status Card */}
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Booking Status</h4>
                      {clientBooking.id ? (
                        <div className="mt-3">
                          <p className="text-sm font-bold text-white">{clientBooking.eventType}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Date: {clientBooking.eventDate}</p>
                          <span className="mt-2.5 inline-block px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 text-[10px] font-extrabold uppercase">
                            {clientBooking.status}
                          </span>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 mt-3">No active event booking found.</p>
                      )}
                    </div>

                    {/* Pending Payments Card */}
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Payments Due</h4>
                      <div className="mt-3">
                        <h3 className="text-2xl font-black text-white">₹{pendingPaymentsByClient.toLocaleString()}</h3>
                        <p className="text-[10px] text-slate-500">Paid so far: ₹{totalPaidByClient.toLocaleString()}</p>
                        {pendingPaymentsByClient > 0 && (
                          <button onClick={() => setUserTab('payments')} className="mt-2.5 text-xs text-pink-400 font-bold hover:underline">Settle Outstanding Bills →</button>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button onClick={() => setUserTab('support')} className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold text-white text-center">💬 Raise Ticket</button>
                        <button onClick={() => setUserTab('checklist')} className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold text-white text-center">✓ Checklist</button>
                        <button onClick={() => setUserTab('reviews')} className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold text-white text-center">⭐ Rate Service</button>
                        <button onClick={() => setUserTab('gallery')} className="p-2 bg-slate-900 hover:bg-slate-850 rounded-xl text-[10px] font-bold text-white text-center">🖼️ View Gallery</button>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events list */}
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-white">Upcoming Events Schedules</h4>
                    <div className="divide-y divide-slate-900">
                      {calendarEvents.map(evt => (
                        <div key={evt.id} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-white">{evt.title}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{evt.description}</p>
                          </div>
                          <span className="text-[10px] bg-slate-900 text-slate-350 px-2 py-1 rounded font-bold border border-slate-800">{evt.startDateTime.replace('T', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Quotations */}
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-white">Recent Quotations</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-550 border-b border-slate-900">
                            <th className="pb-2">Quote #</th>
                            <th className="pb-2">Details</th>
                            <th className="pb-2">Proposed Price</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {clientQuotes.map(q => (
                            <tr key={q.id}>
                              <td className="py-3 text-white font-bold">{q.quotationNumber}</td>
                              <td className="py-3 text-slate-400 truncate max-w-xs">{q.details}</td>
                              <td className="py-3 font-semibold text-white">₹{q.amount.toLocaleString()}</td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : q.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                  {q.status}
                                </span>
                              </td>
                              <td className="py-3 text-right space-x-1">
                                {q.status === 'Pending' && (
                                  <>
                                    <button onClick={() => handleAcceptQuote(q.id)} className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold">Accept</button>
                                    <button onClick={() => handleRejectQuote(q.id)} className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold">Reject</button>
                                  </>
                                )}
                                <button onClick={() => alert('Proposal PDF Download Initiated.')} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 hover:bg-slate-850 rounded text-[10px] font-bold">PDF</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Profile Management */}
              {userTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-bold text-white">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Full Name</label>
                      <input type="text" value={clientProfile.name} onChange={(e) => setClientProfile({ ...clientProfile, name: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" required />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Profile Picture Emoji</label>
                      <input type="text" value={clientProfile.profilePic} onChange={(e) => setClientProfile({ ...clientProfile, profilePic: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Phone Number</label>
                      <input type="text" value={clientProfile.phone} onChange={(e) => setClientProfile({ ...clientProfile, phone: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" required />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Email Address</label>
                      <input type="email" value={clientProfile.email} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-500 cursor-not-allowed" readOnly />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Correspondence Address</label>
                      <textarea rows={2} value={clientProfile.address} onChange={(e) => setClientProfile({ ...clientProfile, address: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Password</label>
                      <input type="password" value={clientProfile.password} onChange={(e) => setClientProfile({ ...clientProfile, password: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-455 uppercase font-bold mb-1">Notification Preferences</label>
                      <select value={clientProfile.notifPref} onChange={(e) => setClientProfile({ ...clientProfile, notifPref: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                        <option>Email & WhatsApp</option>
                        <option>Email Only</option>
                        <option>SMS & WhatsApp</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition">Save Profile Changes</button>
                </form>
              )}

              {/* 3. Event Booking */}
              {userTab === 'booking' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <div className="border-b border-slate-900 pb-3">
                    <h3 className="text-base font-bold text-white">Book New Event Consultation</h3>
                    <p className="text-xs text-slate-400">Lock in your dates and select curated designer package themes.</p>
                  </div>
                  <form onSubmit={handleClientBookEvent} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Choose Event Type</label>
                        <select value={newBooking.eventType} onChange={(e) => setNewBooking({ ...newBooking, eventType: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Theme Package</label>
                        <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                          {packages.map(p => (
                            <option key={p.id} value={p.name}>{p.name} (Starts ₹{p.price.toLocaleString()})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Choose Target Date</label>
                        <input type="date" required value={newBooking.eventDate} onChange={(e) => setNewBooking({ ...newBooking, eventDate: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Venue Location</label>
                        <input type="text" value={newBooking.location} onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" required />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Expected Guest Count</label>
                        <input type="number" value={newBooking.guestsCount} onChange={(e) => setNewBooking({ ...newBooking, guestsCount: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" required />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Budget Allocation (₹)</label>
                        <input type="number" value={newBooking.budget} onChange={(e) => setNewBooking({ ...newBooking, budget: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Special Requirements & Custom Notes</label>
                      <textarea rows={3} value={newBooking.specialRequirements} onChange={(e) => setNewBooking({ ...newBooking, specialRequirements: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-pink-650 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition">Confirm Booking & Generate Proposal</button>
                  </form>
                </div>
              )}

              {/* 4. My Bookings */}
              {userTab === 'my_bookings' && (
                <div className="space-y-6">
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                    <h3 className="text-base font-bold text-white">Booking Details & List</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bookings.filter(b => b.customerEmail === clientEmail).map(b => (
                        <div key={b.id} onClick={() => setSelectedBooking(b)} className="bg-slate-900 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 cursor-pointer transition relative">
                          <span className="absolute top-4 right-4 text-[9px] font-extrabold uppercase bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded border border-pink-500/25">{b.status}</span>
                          <h4 className="font-bold text-white text-sm">{b.eventType}</h4>
                          <p className="text-[10px] text-slate-500 mt-1">📅 {b.eventDate} | 📍 {b.location}</p>
                          <div className="mt-3 flex justify-between text-[11px] text-slate-350">
                            <span>Guests: <strong>{b.guestsCount}</strong></span>
                            <span>Budget: <strong>₹{b.budget.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedBooking && (
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <h4 className="font-bold text-white">Booking Timeline - {selectedBooking.eventType}</h4>
                        <button onClick={() => setSelectedBooking(null)} className="text-xs text-slate-400 hover:underline">Clear Focus</button>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl space-y-2 text-xs">
                        <p><strong>Customer Name:</strong> {selectedBooking.customerName}</p>
                        <p><strong>Venue Address:</strong> {selectedBooking.location}</p>
                        <p><strong>Special Requirements:</strong> {selectedBooking.specialRequirements || 'No special requirements listed.'}</p>
                        <p><strong>Status Timeline Tracker:</strong></p>
                        <div className="flex gap-1.5 mt-2">
                          {['New', 'Contacted', 'Confirmed', 'Completed'].map((st, idx) => (
                            <div key={st} className="flex-1 flex flex-col items-center">
                              <div className={`h-2 w-full rounded ${selectedBooking.status === st || idx <= 1 ? 'bg-pink-500' : 'bg-slate-800'}`} />
                              <span className="text-[9px] font-bold text-slate-455 mt-1">{st}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5. Quotations */}
              {userTab === 'quotations' && (
                <div className="space-y-6">
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                    <h3 className="text-base font-bold text-white">Requested Quotations Proposals</h3>
                    <div className="divide-y divide-slate-900">
                      {clientQuotes.map(q => (
                        <div key={q.id} className="py-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] text-slate-500 font-bold uppercase">Proposal #{q.quotationNumber}</span>
                              <h4 className="font-bold text-white text-sm mt-0.5">Budget Estimate: ₹{q.amount.toLocaleString()}</h4>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : q.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              {q.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{q.details}</p>
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-[10px] text-slate-500">Date Shared: {q.createdDate}</span>
                            <div className="space-x-1">
                              {q.status === 'Pending' && (
                                <>
                                  <button onClick={() => handleAcceptQuote(q.id)} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold">Accept proposal</button>
                                  <button onClick={() => handleRejectQuote(q.id)} className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold">Reject</button>
                                </>
                              )}
                              <button onClick={() => alert('Initiating quotation PDF file export stream.')} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-350 hover:bg-slate-855 rounded text-[10px] font-bold">Download PDF</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Payments */}
              {userTab === 'payments' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payments Outstanding</h4>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Advance Invoice:</span>
                          <span className="text-white font-bold">₹1,77,000 (Paid)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Remaining Payment:</span>
                          <span className="text-white font-bold">₹4,13,000 (Pending)</span>
                        </div>
                        <div className="border-t border-slate-900 pt-2 flex justify-between text-sm font-bold text-white">
                          <span>Total Dues Outstanding:</span>
                          <span className="text-pink-400">₹{pendingPaymentsByClient.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Refund Status</h4>
                      <div className="mt-3 p-4 bg-slate-900 rounded-xl text-xs text-slate-355">
                        🛡️ No refund requests logged. All advances are subject to standard cancellation rules guidelines.
                      </div>
                    </div>
                  </div>

                  {/* Payment History & Receipt PDF download */}
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-white">Invoices & Receipt Logs</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-550 border-b border-slate-900">
                            <th className="pb-2.5">Invoice #</th>
                            <th className="pb-2.5">Type</th>
                            <th className="pb-2.5">Gross Amount</th>
                            <th className="pb-2.5">Tax (18% GST)</th>
                            <th className="pb-2.5">Status</th>
                            <th className="pb-2.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {clientInvoices.map(inv => (
                            <tr key={inv.id}>
                              <td className="py-3 font-bold text-white">{inv.invoiceNumber}</td>
                              <td className="py-3 text-slate-400">{inv.invoiceType}</td>
                              <td className="py-3 text-white">₹{inv.totalAmount.toLocaleString()}</td>
                              <td className="py-3 text-slate-500">₹{inv.taxAmount.toLocaleString()}</td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                  {inv.status}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                {inv.status === 'Pending' ? (
                                  <button onClick={() => handleClientPayNow(inv)} className="px-3 py-1 bg-pink-650 hover:bg-pink-700 text-white rounded text-[10px] font-bold shadow-lg shadow-pink-500/10">Pay Online Now</button>
                                ) : (
                                  <button onClick={() => alert('Downloading official tax invoice receipt PDF.')} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-350 hover:bg-slate-855 rounded text-[10px] font-bold">Download Receipt</button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. Event Timeline */}
              {userTab === 'timeline' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-bold text-white">Live Event Project Timeline</h3>
                  <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {[
                      { title: 'Planning Started', status: 'Completed', date: '2026-06-25', desc: 'Requirements checklist, venue contracts, initial budgets synced.' },
                      { title: 'Vendor Assigned', status: 'Completed', date: '2026-06-26', desc: `Decorators and photographers registry locked for ${projectDisplayName}.` },
                      { title: 'Decoration Started', status: 'In Progress', date: '2026-11-24', desc: 'Fabric structures, ceiling crystal rigging begins.' },
                      { title: 'Food Preparation', status: 'Pending', date: '2026-11-25', desc: 'Catering kitchen starts operation and safety inspections.' },
                      { title: 'Event Completed', status: 'Pending', date: '2026-11-25', desc: 'Post staging feedback reviews and final closures.' }
                    ].map((step, index) => (
                      <div key={step.title} className="relative">
                        <div className={`absolute -left-[29px] top-1.5 h-4 w-4 rounded-full border-2 ${
                          step.status === 'Completed' ? 'bg-pink-600 border-pink-500' :
                          step.status === 'In Progress' ? 'bg-[#07080d] border-pink-400 animate-pulse' : 'bg-[#07080d] border-slate-800'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{step.title}</h4>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                              step.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                              step.status === 'In Progress' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/10' : 'bg-slate-900 text-slate-600'
                            }`}>{step.status}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">Date: {step.date}</p>
                          <p className="text-xs text-slate-400 mt-1 max-w-md">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Vendor Information */}
              {userTab === 'vendors' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-bold text-white">Assigned Vendor Crew</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vendors.map(v => (
                      <div key={v.id} className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl flex items-start gap-4">
                        <span className="text-3xl p-3 bg-slate-950 rounded-2xl border border-slate-800">
                          {v.type === 'Decorators' ? '🌸' : v.type === 'Photographers' ? '📸' : v.type === 'Caterers' ? '🍲' : v.type === 'DJ' ? '🎧' : '💄'}
                        </span>
                        <div className="space-y-1">
                          <span className="text-[9px] bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-full font-bold uppercase">{v.type}</span>
                          <h4 className="font-bold text-white text-sm pt-0.5">{v.name}</h4>
                          <p className="text-xs text-slate-400">📞 {v.phone} | ✉ {v.email}</p>
                          <p className="text-[10px] text-slate-500">Address: {v.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. Event Checklist */}
              {userTab === 'checklist' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <div className="border-b border-slate-900 pb-3">
                    <h3 className="text-base font-bold text-white">{projectDisplayName} Event Checklist</h3>
                    <p className="text-xs text-slate-400">Mark task checks. These directly update in the administrator tracking dashboards.</p>
                  </div>
                  <div className="space-y-3">
                    {clientChecklist.map(chk => (
                      <div key={chk.id} className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-850">
                        <input
                          type="checkbox"
                          checked={chk.isCompleted}
                          onChange={() => handleToggleChecklist(chk.id)}
                          className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-pink-600 focus:ring-pink-500"
                        />
                        <span className={`text-xs ${chk.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>{chk.taskName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. Gallery */}
              {userTab === 'gallery' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-white">Staging Portfolio Gallery</h3>
                    <button onClick={() => alert('Downloading album archive zip.')} className="px-4 py-2 bg-pink-650 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition">Download Full Album</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Royal Stage Arch', emoji: '🏛️', type: 'Photo' },
                      { label: 'Candle Light Corridor', emoji: '🕯️', type: 'Photo' },
                      { label: 'Premium Buffet counter', emoji: '🍲', type: 'Photo' },
                      { label: 'Video: Cinematic Teaser', emoji: '🎥', type: 'Video' }
                    ].map((m, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-850 transition relative group">
                        <span className="absolute top-2 right-2 text-[8px] bg-slate-950 border border-slate-800 text-slate-350 px-1.5 py-0.5 rounded font-bold uppercase">{m.type}</span>
                        <span className="text-4xl block my-3">{m.emoji}</span>
                        <p className="text-xs font-bold text-white mt-2 truncate">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Support */}
              {userTab === 'support' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {/* Raise Ticket */}
                    <form onSubmit={handleClientSubmitTicket} className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                      <h4 className="font-bold text-white text-sm">Raise Help Desk Ticket</h4>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-450 mb-1">Subject</label>
                        <input type="text" required value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} placeholder="e.g. Request to change table setting linens" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-455 mb-1">Description</label>
                        <textarea rows={3} required value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} placeholder="Add specifics like quantities, code, or photo details." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                      </div>
                      <button type="submit" className="w-full py-2 bg-pink-650 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition">Raise Ticket</button>
                    </form>

                    {/* Active Support Tickets */}
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                      <h4 className="font-bold text-white text-sm">Your Active Tickets</h4>
                      <div className="divide-y divide-slate-900">
                        {clientTickets.map(t => (
                          <div key={t.id} className="py-2.5 text-xs">
                            <div className="flex justify-between">
                              <span className="font-bold text-white">{t.subject}</span>
                              <span className="px-1.5 py-0.5 bg-pink-500/10 text-pink-400 text-[8px] font-bold rounded uppercase">{t.status}</span>
                            </div>
                            <p className="text-slate-400 mt-1">{t.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Live Chat */}
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl flex flex-col h-[340px] justify-between">
                      <h4 className="font-bold text-white text-sm border-b border-slate-900 pb-2">Live Chat Helpdesk</h4>
                      <div className="flex-1 overflow-y-auto space-y-2 py-4 text-xs">
                        <div className="bg-slate-900 p-2.5 rounded-xl max-w-[80%] text-slate-350">
                          Hi Emma! Welcome to our planning panel chat support. How can we align your floral layouts today?
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Type a message..." className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-4 py-2 flex-1 text-white focus:outline-none" />
                        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl">Send</button>
                      </div>
                    </div>

                    {/* FAQs */}
                    <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                      <h4 className="font-bold text-white text-sm">FAQs</h4>
                      <div className="space-y-2 text-xs">
                        {faqs.map(faq => (
                          <details key={faq.id} className="bg-slate-900 p-2.5 rounded-xl border border-slate-855 cursor-pointer">
                            <summary className="font-semibold text-white">{faq.question}</summary>
                            <p className="text-slate-450 mt-1.5 leading-relaxed">{faq.answer}</p>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 12. Notifications */}
              {userTab === 'notifications' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-bold text-white">Notifications Log</h3>
                  <div className="space-y-3">
                    {clientNotifs.map(n => (
                      <div key={n.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-855 flex justify-between items-start text-xs">
                        <div className="space-y-1">
                          <span className="text-[8px] bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{n.category}</span>
                          <p className="text-slate-300 pt-1">{n.content}</p>
                        </div>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 13. Reviews */}
              {userTab === 'reviews' && (
                <form onSubmit={handleClientSubmitReview} className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-white">Rate Service & Write Testimonial</h3>
                  <div>
                    <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Select Rating (1 to 5 Stars)</label>
                    <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                      <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5 Good)</option>
                      <option value="3">⭐⭐⭐ (3/5 Average)</option>
                      <option value="2">⭐⭐ (2/5 Poor)</option>
                      <option value="1">⭐ (1/5 Very Bad)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Write Review Feedback</label>
                    <textarea rows={3} value={newReview.reviewText} onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })} placeholder="Tell us about the decoration quality, coordinator coordination, and catering tastes..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Simulated Image Uploads</label>
                    <input type="file" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-400" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-pink-650 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition">Submit Review & Photos</button>
                </form>
              )}

            </div>
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛠 ADMIN SIDE */}
      {/* ========================================================================= */}
      {isAdmin && (
        <div className="flex w-full min-h-screen">
          {/* Sidebar */}
          <aside className={`w-64 ${currentTheme.asideBg} ${currentTheme.asideBorder} flex flex-col justify-between p-4`}>
            <div className="overflow-y-auto max-h-[85vh] pr-1 space-y-4 font-sans">
              <div className={`p-4 border-b ${currentTheme.headerBorder} flex items-center gap-3`}>
                <span className="text-2xl">{currentTheme.decorIcon}</span>
                <div>
                  <h2 className={`font-bold text-sm truncate ${selectedDashboardOption === 3 ? 'text-[#3d3325]' : selectedDashboardOption === 10 ? 'text-emerald-400' : 'text-white'}`}>{agencyInfo.companyName}</h2>
                  <p className={`text-[9px] ${currentTheme.accentText} font-extrabold uppercase tracking-wider`}>Super Admin Console</p>
                </div>
              </div>

              {/* Grouped 22 Admin features */}
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-1">Console</p>
                  <nav className="space-y-1">
                    {[
                      { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
                      { id: 'website_cms', label: 'Website CMS', icon: '🖥️' }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${activeTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'}`}>
                        <span>{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-1">Operations</p>
                  <nav className="space-y-1">
                    {[
                      { id: 'booking_mgmt', label: 'Booking Management', icon: '💍' },
                      { id: 'event_mgmt', label: 'Event Management', icon: '📅' },
                      { id: 'service_mgmt', label: 'Service Management', icon: '🛠️' },
                      { id: 'package_mgmt', label: 'Package Management', icon: '📦' }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${activeTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'}`}>
                        <span>{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-1">CRM & Sales</p>
                  <nav className="space-y-1">
                    {[
                      { id: 'customer_mgmt', label: 'Customer Management', icon: '👥' },
                      { id: 'lead_mgmt', label: 'Lead Management', icon: '🎯' },
                      { id: 'quotation_mgmt', label: 'Quotation Management', icon: '📄' }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${activeTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'}`}>
                        <span>{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-1">Resources</p>
                  <nav className="space-y-1">
                    {[
                      { id: 'vendor_mgmt', label: 'Vendor Management', icon: '🤝' },
                      { id: 'employee_mgmt', label: 'Employee Management', icon: '👔' },
                      { id: 'calendar_mgmt', label: 'Calendar Management', icon: '📆' },
                      { id: 'expense_mgmt', label: 'Expense Management', icon: '💸' },
                      { id: 'payment_mgmt', label: 'Payment Management', icon: '💳' }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${activeTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'}`}>
                        <span>{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-1">Marketing & CMS</p>
                  <nav className="space-y-1">
                    {[
                      { id: 'gallery_mgmt', label: 'Gallery Management', icon: '🖼️' },
                      { id: 'blog_mgmt', label: 'Blog Management', icon: '✍️' },
                      { id: 'testimonials', label: 'Testimonials CMS', icon: '💬' },
                      { id: 'marketing', label: 'Marketing Campaigns', icon: '📢' }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${activeTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'}`}>
                        <span>{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-1">Intelligence</p>
                  <nav className="space-y-1">
                    {[
                      { id: 'reports', label: 'Reports Download', icon: '📈' },
                      { id: 'analytics', label: 'Analytics Insights', icon: '📊' },
                      { id: 'settings', label: 'Settings Panel', icon: '⚙️' },
                      { id: 'roles_permissions', label: 'Roles & Permissions', icon: '🔑' }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${activeTab === tab.id ? currentTheme.activeTab : 'text-slate-400 hover:bg-slate-900/25 hover:text-white'}`}>
                        <span>{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-900 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white truncate max-w-[120px]">{agencyInfo.ownerName}</p>
                <p className="text-[9px] text-slate-500 truncate max-w-[120px]">{clientEmail}</p>
              </div>
              <button onClick={onLogout} title="Logout" className="p-1.5 rounded bg-slate-900 hover:bg-red-950 text-slate-455 hover:text-red-400 transition">
                🚪
              </button>
            </div>
          </aside>

          {/* Main Console Workspace */}
          <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
            <header className={`h-16 border-b ${currentTheme.headerBorder} ${currentTheme.headerBg} backdrop-blur px-8 flex items-center justify-between sticky top-0 z-30`}>
              <h1 className={`font-bold text-base capitalize ${selectedDashboardOption === 3 ? 'text-amber-955' : 'text-white'}`}>{activeTab.replace('_', ' ')} Console</h1>
              <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase ${currentTheme.accentBg}`}>
                Agency Control
              </span>
            </header>

            <div className="p-8 flex-1 space-y-6">

              {/* 1. Dashboard Overview */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Bookings', value: bookings.length, desc: 'All registered event programs' },
                      { label: 'Today\'s Events', value: '1 Active', desc: 'Rohan Gupta Birthday Preps' },
                      { label: 'Upcoming Events', value: '2 Scheduled', desc: `${projectDisplayName} staging details` },
                      { label: 'Revenue Gross', value: `₹${adminRevenue.toLocaleString()}`, desc: 'Inbound receipts cleared' },
                      { label: 'Pending Payments', value: `₹${adminPendingPayments.toLocaleString()}`, desc: 'Outstanding client invoices' },
                      { label: 'Website Leads', value: leads.length, desc: 'Contact consultations requests' },
                      { label: 'Website Visitors', value: '14,020', desc: 'Unique browser landing visits' }
                    ].map(card => (
                      <div key={card.label} className="bg-slate-950 border border-slate-900 p-5 rounded-2xl">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{card.label}</p>
                        <h3 className="text-xl font-extrabold text-white mt-1">{card.value}</h3>
                        <p className="text-[9px] text-slate-550 mt-0.5">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Bookings table */}
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-3">
                    <h4 className="font-bold text-white text-sm">Recent Bookings Registry</h4>
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Client</th>
                          <th className="pb-2">Event</th>
                          <th className="pb-2">Venue</th>
                          <th className="pb-2">Price</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {bookings.map(b => (
                          <tr key={b.id}>
                            <td className="py-2.5 text-white font-semibold">{b.customerName}</td>
                            <td>{b.eventType}</td>
                            <td>{b.location}</td>
                            <td>₹{b.budget.toLocaleString()}</td>
                            <td>
                              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-indigo-400 font-bold uppercase">{b.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 2. Website CMS */}
              {activeTab === 'website_cms' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <h3 className="font-bold text-white text-sm border-b border-slate-900 pb-2">CMS Blocks & Section Editors</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Hero Banner Title</label>
                      <input type="text" value={websiteSettings.homePageText} onChange={(e) => setWebsiteSettings({ ...websiteSettings, homePageText: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">About Company Text</label>
                      <input type="text" value={websiteSettings.aboutUsText} onChange={(e) => setWebsiteSettings({ ...websiteSettings, aboutUsText: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                  </div>
                  <div className="border-t border-slate-900 pt-4 grid grid-cols-3 gap-4 text-xs">
                    <button onClick={() => alert('CMS services catalog updated.')} className="p-3 bg-slate-900 border border-slate-800 text-slate-350 hover:bg-slate-850 rounded-xl font-bold">Edit Services CMS</button>
                    <button onClick={() => alert('CMS packages blocks saved.')} className="p-3 bg-slate-900 border border-slate-800 text-slate-355 hover:bg-slate-850 rounded-xl font-bold">Edit Packages Tiering</button>
                    <button onClick={() => alert('CMS testimonials feed updated.')} className="p-3 bg-slate-900 border border-slate-800 text-slate-355 hover:bg-slate-855 rounded-xl font-bold">Edit Client Testimonials</button>
                  </div>
                </div>
              )}

              {/* 3. Booking Management */}
              {activeTab === 'booking_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Approve, Reject & Cancel Bookings</h3>
                    <button onClick={() => setIsBookingModalOpen(true)} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition">➕ New Booking Manual</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Customer</th>
                          <th className="pb-2">Event Class</th>
                          <th className="pb-2">Target Date</th>
                          <th className="pb-2">Pipeline Status</th>
                          <th className="pb-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {bookings.map(b => (
                          <tr key={b.id}>
                            <td className="py-3 font-bold text-white">{b.customerName}</td>
                            <td>{b.eventType}</td>
                            <td>{b.eventDate}</td>
                            <td>
                              <select value={b.status} onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)} className="bg-slate-900 border border-slate-800 text-xs rounded p-1 text-white">
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 text-right space-x-1">
                              <button onClick={() => setSelectedBooking(b)} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px]">Track Timeline</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. Event Management */}
              {activeTab === 'event_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Assign Teams & Track Live Progress</h3>
                  <div className="divide-y divide-slate-900 text-xs space-y-4">
                    {bookings.map(b => (
                      <div key={b.id} className="pt-4 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{b.eventType} ({b.customerName})</span>
                          <span className="text-[10px] text-slate-550">Target: {b.eventDate}</span>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <span className="text-[9px] uppercase font-bold text-slate-500">Coordinator Assigned:</span>
                            <select className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[11px] text-white mt-1">
                              <option>Vikram Das (Event Manager)</option>
                              <option>Nisha Pillai (Event Coordinator)</option>
                            </select>
                          </div>
                          <div className="flex-1">
                            <span className="text-[9px] uppercase font-bold text-slate-500">Execution Phase:</span>
                            <div className="w-full bg-slate-900 h-6 rounded flex items-center px-2 text-[10px] font-extrabold uppercase mt-1">
                              {b.status === 'Completed' ? '✅ Completed Program' : '⚙️ Planning Operations'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Service Management */}
              {activeTab === 'service_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Service Catalog</h3>
                    <button onClick={() => alert('Add Service overlay opened')} className="px-3 py-1.5 bg-indigo-655 text-xs font-bold text-white rounded-xl">➕ Create Service</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map(s => (
                      <div key={s.id} className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-2">
                        <h4 className="font-bold text-white text-xs">{s.name}</h4>
                        <p className="text-xs text-indigo-400 font-semibold">Standard Rate: ₹{s.cost.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Package Management */}
              {activeTab === 'package_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Price tiering Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map(p => (
                      <div key={p.id} className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-1">
                        <h4 className="font-bold text-white text-sm">{p.name}</h4>
                        <p className="text-xs text-indigo-400">Price Base: ₹{p.price.toLocaleString()}</p>
                        <p className="text-[11px] text-slate-455 leading-relaxed pt-1">Included: {p.includes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Customer Management */}
              {activeTab === 'customer_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Customer Database Profiles</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Client Name</th>
                          <th className="pb-2">Email</th>
                          <th className="pb-2">Phone</th>
                          <th className="pb-2">Correspondence Address</th>
                          <th className="pb-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {customers.map(c => (
                          <tr key={c.id}>
                            <td className="py-3 font-bold text-white">{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td className="truncate max-w-xs">{c.address}</td>
                            <td className="py-3 text-right">
                              <button onClick={() => { setSelectedCustomer(c); alert(`Displaying log dossier folder for ${c.name}`); }} className="px-2.5 py-1 bg-slate-900 border border-slate-850 hover:bg-slate-855 text-indigo-400 rounded text-[10px] font-bold">Dossier File</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 8. Lead Management */}
              {activeTab === 'lead_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Inbound Lead Generation Pipelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-455 uppercase mb-2">Sources Distribution</h4>
                      <div className="space-y-2 text-xs">
                        <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                          <span>🌐 Website Leads</span>
                          <span className="font-bold text-white">1 active lead</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                          <span>💬 WhatsApp Leads</span>
                          <span className="font-bold text-white">1 active lead</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-455 uppercase mb-2">Lead Logs</h4>
                      <div className="divide-y divide-slate-900">
                        {leads.map(ld => (
                          <div key={ld.id} className="py-2.5 text-xs flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">{ld.name} ({ld.eventType})</p>
                              <span className="text-[10px] text-slate-500">Source: {ld.source}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold uppercase">{ld.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. Quotation Management */}
              {activeTab === 'quotation_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Quotation Proposals Registry</h3>
                    <button onClick={() => setIsQuoteModalOpen(true)} className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition">➕ New Quotation Proposal</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Quote #</th>
                          <th className="pb-2">Proposed Price</th>
                          <th className="pb-2">Details</th>
                          <th className="pb-2">Pipeline Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {quotations.map(q => (
                          <tr key={q.id}>
                            <td className="py-3 font-bold text-white">{q.quotationNumber}</td>
                            <td>₹{q.amount.toLocaleString()}</td>
                            <td className="truncate max-w-xs">{q.details}</td>
                            <td>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${q.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{q.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 10. Vendor Management */}
              {activeTab === 'vendor_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Suppliers & Vendor Registry</h3>
                    <button onClick={() => setIsVendorModalOpen(true)} className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition">➕ Register Vendor</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vendors.map(v => (
                      <div key={v.id} className="bg-slate-900 p-4 rounded-xl border border-slate-850/80 space-y-1 relative">
                        <span className="absolute top-2 right-2 bg-slate-950 px-2 py-0.5 border border-slate-850 text-indigo-400 rounded text-[9px] font-bold uppercase">{v.type}</span>
                        <h4 className="font-bold text-white text-sm">{v.name}</h4>
                        <p className="text-xs text-slate-400">📞 {v.phone} | ✉ {v.email}</p>
                        <p className="text-[10px] text-slate-500">Contract Rate: ₹{v.cost.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Employee Management */}
              {activeTab === 'employee_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Employee Staff Payroll & Rosters</h3>
                    <button onClick={() => setIsTeamModalOpen(true)} className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition">➕ Register Staff Crew</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Name</th>
                          <th className="pb-2">Role</th>
                          <th className="pb-2">Monthly Salary</th>
                          <th className="pb-2">Attendance State</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {teamMembers.map(t => (
                          <tr key={t.id}>
                            <td className="py-3 font-bold text-white">{t.name}</td>
                            <td>{t.role}</td>
                            <td>₹{t.salary.toLocaleString()}/mo</td>
                            <td>
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase">{t.attendance}</span>
                            </td>
                            <td>
                              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[10px] text-indigo-400 font-bold uppercase">{t.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 12. Calendar Management */}
              {activeTab === 'calendar_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Monthly Availability Calendar Planner</h3>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} className="py-2 bg-slate-900 text-slate-500 font-bold rounded">{d}</div>
                    ))}
                    {Array.from({ length: 30 }).map((_, idx) => (
                      <div key={idx} className="h-16 bg-[#07080d] border border-slate-900 rounded p-1 text-[10px] text-slate-500 text-left relative">
                        {idx + 1}
                        {idx === 24 && (
                          <span className="absolute bottom-1 left-1 right-1 bg-pink-500/20 text-pink-400 border border-pink-500/30 text-[7px] truncate px-1 rounded font-bold">Emma Watson Wedding</span>
                        )}
                        {idx === 14 && (
                          <span className="absolute bottom-1 left-1 right-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[7px] truncate px-1 rounded font-bold">Rohan Kids Birthday</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 13. Expense Management */}
              {activeTab === 'expense_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Expense Outflows Ledger</h3>
                    <div className="flex gap-3 text-xs items-center">
                      <span className="text-slate-400">Total Outflow Sum: <strong className="text-rose-400">₹{adminExpenses.toLocaleString()}</strong></span>
                      <button onClick={() => setIsExpenseModalOpen(true)} className="px-3 py-1.5 bg-rose-650 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition">➕ Log Outflow Expense</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Date</th>
                          <th className="pb-2">Category</th>
                          <th className="pb-2">Description</th>
                          <th className="pb-2">Outflow Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {expenses.map(ex => (
                          <tr key={ex.id}>
                            <td className="py-2.5">{ex.expenseDate}</td>
                            <td><span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold rounded uppercase">{ex.category}</span></td>
                            <td>{ex.description}</td>
                            <td className="font-bold text-rose-400">-₹{ex.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 14. Payment Management */}
              {activeTab === 'payment_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Received Payments & Invoice Receipts</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setIsInvoiceModalOpen(true)} className="px-3 py-1.5 bg-indigo-650 text-xs font-bold text-white rounded-xl">Generate Invoice</button>
                      <button onClick={() => setIsPaymentModalOpen(true)} className="px-3 py-1.5 bg-emerald-650 text-xs font-bold text-white rounded-xl">Record payment</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-550 border-b border-slate-900">
                          <th className="pb-2">Invoice/Receipt #</th>
                          <th className="pb-2">Type</th>
                          <th className="pb-2">Gross Amount</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-350">
                        {invoices.map(inv => (
                          <tr key={inv.id}>
                            <td className="py-3 font-bold text-white">{inv.invoiceNumber}</td>
                            <td>{inv.invoiceType}</td>
                            <td>₹{inv.totalAmount.toLocaleString()}</td>
                            <td>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{inv.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 15. Gallery Management */}
              {activeTab === 'gallery_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Gallery Albums Portfolio Manager</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center cursor-pointer">
                      <span className="text-2xl block mb-1">🖼️</span>
                      <strong>Stage Arches</strong>
                      <p className="text-[10px] text-slate-500 mt-0.5">12 photos</p>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center cursor-pointer">
                      <span className="text-2xl block mb-1">🎥</span>
                      <strong>Teaser Reels</strong>
                      <p className="text-[10px] text-slate-500 mt-0.5">3 videos</p>
                    </div>
                    <div onClick={() => alert('New folder initialization.')} className="p-4 bg-slate-950 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl text-center cursor-pointer flex flex-col justify-center items-center">
                      <span className="text-lg">+</span>
                      <strong>Create Album</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* 16. Blog Management */}
              {activeTab === 'blog_mgmt' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Blog CMS Editor</h3>
                  <div className="space-y-3">
                    {blogs.map(b => (
                      <div key={b.id} className="p-3 bg-slate-900 rounded-xl text-xs flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">{b.title}</p>
                          <span className="text-[10px] text-slate-500">Author: {b.author} | Category: {b.category}</span>
                        </div>
                        <button onClick={() => alert('Blog content loaded in edit buffer')} className="text-xs text-indigo-400 hover:underline">Edit</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 17. Testimonials */}
              {activeTab === 'testimonials' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Testimonials & Review Feed moderation</h3>
                  <div className="divide-y divide-slate-900">
                    {reviews.map(r => (
                      <div key={r.id} className="py-3 text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-white">{r.clientName} ({r.clientEmail})</strong>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase">{r.status}</span>
                        </div>
                        <p className="text-slate-400">Rating: {r.rating} Stars | "{r.reviewText}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 18. Marketing */}
              {activeTab === 'marketing' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Campaigns Center & Promo Coupons</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-xl space-y-2">
                      <strong>Launch Marketing blast</strong>
                      <select className="w-full bg-slate-955 border border-slate-800 rounded p-1.5 text-white">
                        <option>Email Campaign Blast</option>
                        <option>SMS Campaign Blast</option>
                        <option>WhatsApp Campaign Blast</option>
                      </select>
                      <button onClick={() => alert('Broadcasting campaign.')} className="w-full py-1.5 bg-indigo-600 text-white rounded font-bold">Broadcast</button>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl space-y-2">
                      <strong>Active Coupons list</strong>
                      <div className="flex justify-between border-b border-slate-850 pb-1.5">
                        <span>🎁 WEDDING15 (15% off)</span>
                        <span className="text-slate-500">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 19. Reports */}
              {activeTab === 'reports' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Generate & Download Agency Dossier Reports</h3>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    {[
                      'Booking Report',
                      'Revenue Report',
                      'Expense Report',
                      'Vendor Report',
                      'Customer Report',
                      'Employee Report'
                    ].map(rep => (
                      <button key={rep} onClick={() => alert(`Generating simulated CSV download for ${rep}`)} className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-855 text-indigo-400 font-bold rounded-xl text-center">
                        Download {rep} CSV
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 20. Analytics */}
              {activeTab === 'analytics' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <h3 className="font-bold text-white text-sm border-b border-slate-900 pb-2">Business Growth Analytics</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-xl space-y-1">
                      <strong>Lead Conversion Rate:</strong>
                      <h4 className="text-xl font-extrabold text-indigo-400">18.5% Conversion</h4>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl space-y-1">
                      <strong>Most Booked Packages:</strong>
                      <h4 className="text-xl font-extrabold text-indigo-400">Premium Package (62% bookings)</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* 21. Settings */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveAgencyInfo} className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">System Agency Settings</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-450 uppercase font-bold mb-1">Company Name</label>
                      <input type="text" value={agencyInfo.companyName} onChange={(e) => setAgencyInfo({ ...agencyInfo, companyName: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-455 uppercase font-bold mb-1">GSTIN Tax Registration</label>
                      <input type="text" value={agencyInfo.gstNumber} onChange={(e) => setAgencyInfo({ ...agencyInfo, gstNumber: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-455 uppercase font-bold mb-1">WhatsApp Business Connection</label>
                      <input type="text" value={agencyInfo.whatsApp} onChange={(e) => setAgencyInfo({ ...agencyInfo, whatsApp: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-3">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-xs font-bold text-white rounded-xl">Save Configuration Settings</button>
                  </div>
                </form>
              )}

              {/* 22. Roles & Permissions */}
              {activeTab === 'roles_permissions' && (
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm">Roles, Permissions & Staff Access Tiers</h3>
                  <div className="divide-y divide-slate-900 text-xs">
                    {[
                      { role: 'Super Admin', permissions: 'Full root access permissions, billing modules, settings configurations.' },
                      { role: 'Event Coordinator', permissions: 'Checklists status checks, vendor crew assignment, scheduling calendar.' },
                      { role: 'Accountant', permissions: 'Receipt ledger log records, tax calculations, invoice generation.' }
                    ].map(r => (
                      <div key={r.role} className="py-2.5 flex justify-between items-center">
                        <div>
                          <strong>{r.role}</strong>
                          <p className="text-[10px] text-slate-550 mt-0.5">{r.permissions}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold rounded">Granted</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Create Booking</h3>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleClientBookEvent} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-450 mb-0.5">Event Class</label>
                <select value={newBooking.eventType} onChange={(e) => setNewBooking({ ...newBooking, eventType: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white">
                  <option value="Wedding Planning">Wedding Planning</option>
                  <option value="Birthday Planning">Birthday Planning</option>
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Destination Weddings">Destination Weddings</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Date</label>
                  <input type="date" required value={newBooking.eventDate} onChange={(e) => setNewBooking({ ...newBooking, eventDate: e.target.value })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Budget (₹)</label>
                  <input type="number" required value={newBooking.budget} onChange={(e) => setNewBooking({ ...newBooking, budget: Number(e.target.value) })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Location Venue</label>
                <input type="text" required value={newBooking.location} onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsBookingModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-350">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Generator Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Generate Invoice</h3>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateInvoice} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Select Booking</label>
                <select value={newInvoice.bookingId} onChange={(e) => setNewInvoice({ ...newInvoice, bookingId: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required>
                  <option value="">-- Choose Booking --</option>
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>{b.customerName} ({b.eventType})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Base Amount (₹)</label>
                <input
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => {
                    const base = Number(e.target.value);
                    const tax = base * 0.18;
                    setNewInvoice({ ...newInvoice, amount: base, taxAmount: tax, totalAmount: base + tax });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white"
                  required
                />
              </div>
              <div className="text-xs text-slate-500 flex justify-between">
                <span>GST Tax (18%):</span>
                <span>₹{newInvoice.taxAmount.toLocaleString()}</span>
              </div>
              <div className="text-xs font-bold text-white flex justify-between">
                <span>Total Amount:</span>
                <span>₹{newInvoice.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsInvoiceModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-355">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Recorder Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Record Payment</h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreatePayment} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Select Booking</label>
                <select value={newPayment.bookingId} onChange={(e) => setNewPayment({ ...newPayment, bookingId: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required>
                  <option value="">-- Choose Booking --</option>
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>{b.customerName} ({b.eventType})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Paid Amount (₹)</label>
                <input type="number" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Method</label>
                <select value={newPayment.paymentMethod} onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white">
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-355">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Log Outflow Expense</h3>
              <button onClick={() => setIsExpenseModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateExpense} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Category</label>
                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white">
                  <option value="Decoration">Decoration</option>
                  <option value="Food">Food</option>
                  <option value="Photography">Photography</option>
                  <option value="Travel">Travel</option>
                  <option value="Salary">Salary</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Amount (₹)</label>
                <input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Description</label>
                <input type="text" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsExpenseModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-355">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vendor Modal */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Register Vendor</h3>
              <button onClick={() => setIsVendorModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateVendor} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Name</label>
                <input type="text" value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Category Type</label>
                <select value={newVendor.type} onChange={(e) => setNewVendor({ ...newVendor, type: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white">
                  <option value="Photographers">Photographers</option>
                  <option value="Videographers">Videographers</option>
                  <option value="Decorators">Decorators</option>
                  <option value="Florists">Florists</option>
                  <option value="Caterers">Caterers</option>
                  <option value="DJ">DJ</option>
                  <option value="Makeup Artists">Makeup Artists</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Hotels">Hotels</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Phone</label>
                  <input type="text" value={newVendor.phone} onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Contract Cost (₹)</label>
                  <input type="number" value={newVendor.cost} onChange={(e) => setNewVendor({ ...newVendor, cost: Number(e.target.value) })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Email</label>
                <input type="email" value={newVendor.email} onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Address</label>
                <input type="text" value={newVendor.address} onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsVendorModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-355">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Crew Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Add Crew Member</h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateTeam} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Name</label>
                <input type="text" value={newTeamMember.name} onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Role Roster</label>
                <select value={newTeamMember.role} onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white">
                  <option value="Event Manager">Event Manager</option>
                  <option value="Event Coordinator">Event Coordinator</option>
                  <option value="Designer">Designer</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Sales Team">Sales Team</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Phone</label>
                  <input type="text" value={newTeamMember.phone} onChange={(e) => setNewTeamMember({ ...newTeamMember, phone: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Monthly Salary (₹)</label>
                  <input type="number" value={newTeamMember.salary} onChange={(e) => setNewTeamMember({ ...newTeamMember, salary: Number(e.target.value) })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Email</label>
                <input type="email" value={newTeamMember.email} onChange={(e) => setNewTeamMember({ ...newTeamMember, email: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsTeamModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-355">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Register Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quotation Proposal Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-850 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Create Quotation Proposal</h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateQuote} className="p-4 space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Select Booking</label>
                <select value={newQuote.bookingId} onChange={(e) => setNewQuote({ ...newQuote, bookingId: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required>
                  <option value="">-- Choose Booking --</option>
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>{b.customerName} ({b.eventType})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Proposed Cost Estimate (₹)</label>
                <input type="number" value={newQuote.amount} onChange={(e) => setNewQuote({ ...newQuote, amount: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-455 mb-0.5">Proposal Details</label>
                <textarea rows={3} value={newQuote.details} onChange={(e) => setNewQuote({ ...newQuote, details: e.target.value })} className="w-full bg-slate-955 border border-slate-800 text-xs rounded-xl p-2 text-white" required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsQuoteModalOpen(false)} className="px-3 py-1.5 border border-slate-850 rounded-xl text-xs text-slate-355">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-650 text-white rounded-xl text-xs font-bold">Generate proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
