'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getRandomFoodImage } from '@/services/api';
import { Project, Product } from '@/types';
import { useFileEncoder } from '@/hooks/useFileEncoder';

import {
  UserProfilePanel,
  UserOrdersPanel,
  UserWishlistPanel,
  UserAddressPanel,
  UserCouponsPanel,
  UserNotificationsPanel,
} from '../UserPanels';

import {
  AdminOverviewPanel,
  AdminProductsPanel,
  AdminCategoriesBrandsPanel,
  AdminOrdersPanel,
  AdminCustomersPanel,
  AdminInventoryPanel,
  AdminCouponsPanel,
  AdminReportsPanel,
  AdminSettingsPanel,
} from '../AdminPanels';

interface RealEstateDashboardProps {
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

export default function RealEstateDashboard({
  projectId,
  project,
  clientEmail,
  theme: propTheme,
  onLogout,
  companyName: propCompanyName,
  logoIcon,
  logoUrl: propLogoUrl,
  shopNiche,
}: RealEstateDashboardProps) {
  const router = useRouter();
  const { encodeFile } = useFileEncoder();
  // Real Estate States
  const [realEstateInfo, setRealEstateInfo] = useState<any>(null);

  const [realEstateInquiries, setRealEstateInquiries] = useState<any[]>([]);
  const [consultationBookings, setConsultationBookings] = useState<any[]>([]);

  // Relational Database-backed states
  const [reBrokers, setReBrokers] = useState<any[]>([]);
  const [reLeads, setReLeads] = useState<any[]>([]);
  const [reVisits, setReVisits] = useState<any[]>([]);
  const [reSales, setReSales] = useState<any[]>([]);
  const [rePayments, setRePayments] = useState<any[]>([]);
  const [reInvoices, setReInvoices] = useState<any[]>([]);
  const [customersList, setCustomersList] = useState<any[]>([]);

  // Property editing states
  const [rePropId, setRePropId] = useState<number | null>(null);
  const [rePropName, setRePropName] = useState('');
  const [rePropType, setRePropType] = useState('Residential');
  const [rePropPrice, setRePropPrice] = useState('');
  const [rePropLocation, setRePropLocation] = useState('');
  const [rePropArea, setRePropArea] = useState('');
  const [rePropBedrooms, setRePropBedrooms] = useState('');
  const [rePropBathrooms, setRePropBathrooms] = useState('');
  const [rePropDescription, setRePropDescription] = useState('');
  const [rePropAmenities, setRePropAmenities] = useState('');
  const [rePropImages, setRePropImages] = useState<string[]>([]);
  const [rePropVideo, setRePropVideo] = useState('');
  const [rePropDocs, setRePropDocs] = useState('');

  // Broker states
  const [reBrokerId, setReBrokerId] = useState<number | null>(null);
  const [reBrokerName, setReBrokerName] = useState('');
  const [reBrokerEmail, setReBrokerEmail] = useState('');
  const [reBrokerPhone, setReBrokerPhone] = useState('');
  const [reBrokerSpecialization, setReBrokerSpecialization] = useState('Residential');
  const [reBrokerCommission, setReBrokerCommission] = useState('2.5');
  const [reBrokerNotes, setReBrokerNotes] = useState('');

  // Site visits states
  const [reVisitLeadId, setReVisitLeadId] = useState('');
  const [reVisitPropId, setReVisitPropId] = useState('');
  const [reVisitBrokerId, setReVisitBrokerId] = useState('');
  const [reVisitDate, setReVisitDate] = useState('');
  const [reVisitTime, setReVisitTime] = useState('11:00 AM');
  const [reVisitStatus, setReVisitStatus] = useState('Scheduled');
  const [reVisitFeedback, setReVisitFeedback] = useState('');

  // Sales states
  const [reSalePropId, setReSalePropId] = useState('');
  const [reSaleClientName, setReSaleClientName] = useState('');
  const [reSaleClientEmail, setReSaleClientEmail] = useState('');
  const [reSaleBrokerId, setReSaleBrokerId] = useState('');
  const [reSalePrice, setReSalePrice] = useState('');
  const [reSaleDate, setReSaleDate] = useState('');

  // Payments states
  const [rePaymentSaleId, setRePaymentSaleId] = useState('');
  const [rePaymentAmount, setRePaymentAmount] = useState('');
  const [rePaymentDate, setRePaymentDate] = useState('');
  const [rePaymentMethod, setRePaymentMethod] = useState('Bank Transfer');
  const [rePaymentTxnId, setRePaymentTxnId] = useState('');

  // Invoice states
  const [reSelectedInvoice, setReSelectedInvoice] = useState<any | null>(null);

  // New Real Estate Admin States
  const [showPropForm, setShowPropForm] = useState(false);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
  const [customerNotesText, setCustomerNotesText] = useState('');
  const [leadNotesTexts, setLeadNotesTexts] = useState<{[key: number]: string}>({});
  const [rePropSearchQuery, setRePropSearchQuery] = useState('');
  const [showBrokerForm, setShowBrokerForm] = useState(false);

  // New Broker States
  const [brokerActiveCallLeadId, setBrokerActiveCallLeadId] = useState<number | null>(null);
  const [brokerMeetingNotesText, setBrokerMeetingNotesText] = useState('');
  const [brokerNextFollowupDate, setBrokerNextFollowupDate] = useState('');
  const [brokerActiveVisitTab, setBrokerActiveVisitTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');


  // Storage & Variants helpers
  const saveInquiriesToStorage = (updatedList: any[]) => {
    setRealEstateInquiries(updatedList);
    localStorage.setItem(`re_inquiries_${projectId}`, JSON.stringify(updatedList));
  };

  const saveConsultsToStorage = (updatedList: any[]) => {
    setConsultationBookings(updatedList);
    localStorage.setItem(`re_consultations_${projectId}`, JSON.stringify(updatedList));
  };

  // Helper parser for variants JSON-like semicolon string
  const parseVariants = (variantsStr: string = '') => {
    const res: any = { area: '', bedrooms: '', bathrooms: '', amenities: '', video: '', documents: '' };
    if (!variantsStr) return res;
    variantsStr.split(';').forEach(part => {
      const [key, ...valParts] = part.split(':');
      const val = valParts.join(':').trim();
      if (key && val) {
        const k = key.trim().toLowerCase();
        if (k === 'area') res.area = val;
        else if (k === 'bedrooms') res.bedrooms = val;
        else if (k === 'bathrooms') res.bathrooms = val;
        else if (k === 'amenities') res.amenities = val;
        else if (k === 'video') res.video = val;
        else if (k === 'documents') res.documents = val;
      }
    });
    return res;
  };


  // Theme calculation
  // Dynamic color accents based on niche
  const getNicheTheme = () => {
    if (realEstateInfo) {
      const color = realEstateInfo.themeColor || 'slate';
      if (color === 'emerald') {
        return {
          accentText: 'text-emerald-600',
          accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          primaryBtn: 'bg-emerald-600 hover:bg-emerald-750 text-white',
          gradientBanner: 'from-emerald-800 via-teal-900 to-slate-900',
          activeTabBg: 'bg-emerald-50 text-emerald-700',
          activeTabBorder: 'border-l-4 border-emerald-500',
        };
      }
      if (color === 'deepblue') {
        return {
          accentText: 'text-indigo-600',
          accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
          primaryBtn: 'bg-indigo-600 hover:bg-indigo-750 text-white',
          gradientBanner: 'from-indigo-900 via-blue-900 to-slate-900',
          activeTabBg: 'bg-indigo-50 text-indigo-700',
          activeTabBorder: 'border-l-4 border-indigo-500',
        };
      }
      if (color === 'purple') {
        return {
          accentText: 'text-amber-600',
          accentBg: 'bg-amber-50 text-amber-700 border-amber-100',
          primaryBtn: 'bg-amber-600 hover:bg-amber-750 text-white',
          gradientBanner: 'from-amber-800 via-amber-900 to-slate-900',
          activeTabBg: 'bg-amber-50 text-amber-700',
          activeTabBorder: 'border-l-4 border-amber-500',
        };
      }
      if (color === 'sunset') {
        return {
          accentText: 'text-orange-600',
          accentBg: 'bg-orange-50 text-orange-700 border-orange-100',
          primaryBtn: 'bg-orange-600 hover:bg-orange-750 text-white',
          gradientBanner: 'from-orange-800 via-red-900 to-slate-900',
          activeTabBg: 'bg-orange-50 text-orange-700',
          activeTabBorder: 'border-l-4 border-orange-500',
        };
      }
      if (color === 'slate') {
        return {
          accentText: 'text-slate-600',
          accentBg: 'bg-slate-50 text-slate-700 border-slate-100',
          primaryBtn: 'bg-slate-700 hover:bg-slate-850 text-white',
          gradientBanner: 'from-slate-800 via-zinc-900 to-slate-900',
          activeTabBg: 'bg-slate-50 text-slate-700',
          activeTabBorder: 'border-l-4 border-slate-500',
        };
      }
    }
  };

  const theme = getNicheTheme() || propTheme;

  // Shared States used in Real Estate panels
  const [companyName, setCompanyName] = useState(propCompanyName || 'Real Estate');
  const [logoUrl, setLogoUrl] = useState(propLogoUrl || '');
  const [activeTab, setActiveTab] = useState(
    clientEmail === 'admin@gmail.com'
      ? 'overview'
      : clientEmail === 'broker@gmail.com'
      ? 'broker_overview'
      : 'cust_profile'
  );
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userAddressHome, setUserAddressHome] = useState('Flat 402, Skyline Towers, Sector 62, Noida, UP');
  const [userAddressWork, setUserAddressWork] = useState('ZATBIZ Tech Labs, Block C, Phase 3, Bangalore, KA');
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [booksLedger, setBooksLedger] = useState([
    { id: 'INV-1001', description: 'Real Estate Consulting', amount: 4500, type: 'Income', date: '2026-06-05', status: 'Cleared' }
  ]);
  const [crmLeads, setCrmLeads] = useState([
    { id: 1, client: 'Royal Bistro Cafe', project: 'Menu Ordering & POS', value: 4500, stage: 'Leads', phone: '+91 98765 43210' }
  ]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [storeSettings, setStoreSettings] = useState<any>({
    storeName: propCompanyName || 'Real Estate Agency',
    logoUrl: propLogoUrl || '',
    taxRate: 5.0,
    shippingFee: 0.0,
    enableUpi: true,
    enableCard: true,
    enableCod: false
  });

  const fetchDbProducts = () => {
    if (isNaN(projectId)) return;
    api.products.list(projectId)
      .then(setProducts)
      .catch((err) => console.error('Error fetching database products:', err));
  };

  const fetchReservations = () => {
    if (isNaN(projectId)) return;
    setReservationLoading(true);
    const targetEmail = clientEmail || '';
    const requestPromise = targetEmail && targetEmail !== 'admin@gmail.com'
      ? api.reservations.listByCustomer(projectId, targetEmail)
      : api.reservations.list(projectId);
    requestPromise
      .then(setReservations)
      .catch(console.error)
      .finally(() => setReservationLoading(false));
  };

  const fetchRealEstateResources = () => {
    if (isNaN(projectId)) return;
    api.realEstate.brokers.list(projectId).then(setReBrokers).catch(console.error);
    api.realEstate.leads.list(projectId).then((data) => {
      setReLeads(data);
      const mappedInquiries = data.map((l: any) => ({
        id: l.id,
        clientName: l.name,
        clientEmail: l.email,
        clientPhone: l.mobile,
        propertyName: l.propertyName,
        niche: l.propertyName ? 'Luxury' : 'General',
        status: l.status || 'New',
        date: l.createdDate || 'Just Now'
      }));
      setRealEstateInquiries(mappedInquiries);
    }).catch(console.error);
    
    api.realEstate.visits.list(projectId).then((data) => {
      setReVisits(data);
      const mappedBookings = data.map((v: any) => ({
        id: v.id,
        clientName: v.clientName,
        date: v.visitDate,
        time: v.visitTime,
        type: 'Site Visit',
        status: v.status || 'Scheduled'
      }));
      setConsultationBookings(mappedBookings);
    }).catch(console.error);

    api.realEstate.sales.list(projectId).then(setReSales).catch(console.error);
    api.realEstate.payments.list(projectId).then(setRePayments).catch(console.error);
    api.realEstate.invoices.list(projectId).then(setReInvoices).catch(console.error);
    api.customers.list(projectId).then(setCustomersList).catch(console.error);
  };

  useEffect(() => {
    if (isNaN(projectId)) return;
    api.realEstate.get(projectId)
      .then((data) => {
        if (data && data.projectId) {
          setRealEstateInfo(data);
          if (data.companyName) setCompanyName(data.companyName);
          if (data.logoUrl) setLogoUrl(data.logoUrl);
        }
      })
      .catch(console.error);

    fetchDbProducts();
    fetchRealEstateResources();
    fetchReservations();

    const cachedName = localStorage.getItem('clientName');
    const cachedPhone = localStorage.getItem('clientPhone');
    const cachedAddress = localStorage.getItem('clientAddress');
    if (cachedName) setUserName(cachedName);
    if (cachedPhone) setUserPhone(cachedPhone);
    if (cachedAddress) setUserAddressHome(cachedAddress);
    
    setLoading(false);
  }, [projectId]);

  const resetBrokerForm = () => {
    setReBrokerId(null);
    setReBrokerName('');
    setReBrokerEmail('');
    setReBrokerPhone('');
    setReBrokerSpecialization('Residential');
    setReBrokerCommission('2.5');
    setReBrokerNotes('');
  };

  const handleSaveBroker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reBrokerName.trim() || !reBrokerEmail.trim()) {
      alert('Please fill out Name and Email.');
      return;
    }

    const payload = {
      projectId,
      name: reBrokerName.trim(),
      email: reBrokerEmail.trim(),
      phone: reBrokerPhone.trim(),
      specialization: reBrokerSpecialization,
      commissionRate: parseFloat(reBrokerCommission) || 2.5,
      status: 'Active',
      notes: reBrokerNotes.trim()
    };

    try {
      if (reBrokerId) {
        await api.realEstate.brokers.update(reBrokerId, payload);
        alert('Broker updated successfully!');
      } else {
        await api.realEstate.brokers.create(payload);
        alert('Broker added successfully!');
      }
      resetBrokerForm();
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
      alert('Failed to save broker.');
    }
  };

  const handleDeleteBroker = async (id: number) => {
    if (!confirm('Are you sure you want to remove this broker?')) return;
    try {
      await api.realEstate.brokers.delete(id);
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Site visits
  const handleScheduleVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reVisitLeadId || !reVisitPropId || !reVisitBrokerId) {
      alert('Please select Lead, Property, and Broker.');
      return;
    }

    const lead = reLeads.find(l => String(l.id) === String(reVisitLeadId));
    const prop = products.find(p => String(p.id) === String(reVisitPropId));
    const broker = reBrokers.find(b => String(b.id) === String(reVisitBrokerId));

    const payload = {
      projectId,
      leadId: parseInt(reVisitLeadId, 10),
      clientName: lead?.name || 'Client',
      propertyId: parseInt(reVisitPropId, 10),
      propertyName: prop?.name || 'Property',
      brokerId: parseInt(reVisitBrokerId, 10),
      brokerName: broker?.name || 'Agent',
      visitDate: reVisitDate,
      visitTime: reVisitTime,
      status: reVisitStatus,
      feedback: reVisitFeedback
    };

    try {
      await api.realEstate.visits.create(payload);
      alert('Site visit scheduled successfully!');
      setReVisitLeadId('');
      setReVisitPropId('');
      setReVisitBrokerId('');
      setReVisitDate('');
      setReVisitFeedback('');
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateVisitStatus = async (id: number, status: string, feedback: string = '') => {
    const original = reVisits.find(v => v.id === id);
    if (!original) return;
    try {
      await api.realEstate.visits.update(id, {
        ...original,
        status,
        feedback: feedback || original.feedback
      });
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVisit = async (id: number) => {
    if (!confirm('Cancel this visit?')) return;
    try {
      await api.realEstate.visits.delete(id);
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Sales & Invoices
  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reSalePropId || !reSaleClientName || !reSalePrice) {
      alert('Please fill out Property, Client Name, and Sale Price.');
      return;
    }

    const prop = products.find(p => String(p.id) === String(reSalePropId));
    const broker = reBrokers.find(b => String(b.id) === String(reSaleBrokerId));
    const priceVal = parseFloat(reSalePrice) || 0;
    const commVal = broker ? (priceVal * (broker.commissionRate || 2.5)) / 100 : 0;

    const payload = {
      projectId,
      propertyId: parseInt(reSalePropId, 10),
      propertyName: prop?.name || 'Property',
      clientName: reSaleClientName,
      clientEmail: reSaleClientEmail,
      brokerId: broker ? parseInt(reSaleBrokerId, 10) : null,
      salePrice: priceVal,
      commissionAmount: commVal,
      saleDate: reSaleDate || new Date().toISOString().split('T')[0],
      status: 'Completed'
    };

    try {
      const newSale = await api.realEstate.sales.create(payload);
      
      const invoiceNum = `INV-${Date.now().toString().slice(-6)}`;
      await api.realEstate.invoices.create({
        projectId,
        saleId: newSale.id,
        invoiceNumber: invoiceNum,
        clientName: reSaleClientName,
        clientEmail: reSaleClientEmail,
        propertyName: prop?.name || 'Property',
        amount: priceVal,
        tax: priceVal * 0.05,
        total: priceVal * 1.05,
        issueDate: payload.saleDate,
        status: 'Sent'
      });

      alert('Sale and invoice recorded successfully!');
      setReSalePropId('');
      setReSaleClientName('');
      setReSaleClientEmail('');
      setReSaleBrokerId('');
      setReSalePrice('');
      setReSaleDate('');
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSale = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sale log?')) return;
    try {
      await api.realEstate.sales.delete(id);
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Payments
  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rePaymentSaleId || !rePaymentAmount) {
      alert('Please select Sale and input Amount.');
      return;
    }

    const sale = reSales.find(s => String(s.id) === String(rePaymentSaleId));
    const payload = {
      projectId,
      saleId: parseInt(rePaymentSaleId, 10),
      propertyName: sale?.propertyName || 'Property',
      clientName: sale?.clientName || 'Client',
      amount: parseFloat(rePaymentAmount) || 0,
      paymentDate: rePaymentDate || new Date().toISOString().split('T')[0],
      paymentMethod: rePaymentMethod,
      transactionId: rePaymentTxnId,
      status: 'Completed'
    };

    try {
      await api.realEstate.payments.create(payload);
      alert('Payment logged successfully!');
      setRePaymentSaleId('');
      setRePaymentAmount('');
      setRePaymentDate('');
      setRePaymentTxnId('');
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePayment = async (id: number) => {
    if (!confirm('Remove payment log?')) return;
    try {
      await api.realEstate.payments.delete(id);
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInvoice = async (id: number) => {
    if (!confirm('Remove invoice?')) return;
    try {
      await api.realEstate.invoices.delete(id);
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentBroker = () => {
    return reBrokers.find(b => b.email?.toLowerCase() === clientEmail?.toLowerCase()) || {
      id: 1,
      name: 'Agent Broker',
      email: clientEmail,
      specialization: 'Residential',
      commissionRate: 2.5
    };
  };

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
      alert('Profile details updated in PostgreSQL!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const resetPropertyForm = () => {
    setRePropId(null);
    setRePropName('');
    setRePropType('Residential');
    setRePropPrice('');
    setRePropLocation('');
    setRePropArea('');
    setRePropBedrooms('');
    setRePropBathrooms('');
    setRePropDescription('');
    setRePropAmenities('');
    setRePropImages([]);
    setRePropVideo('');
    setRePropDocs('');
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rePropName.trim() || !rePropPrice) {
      alert('Please fill out Name and Price.');
      return;
    }

    const variants = `area:${rePropArea.trim()};bedrooms:${rePropBedrooms.trim()};bathrooms:${rePropBathrooms.trim()};amenities:${rePropAmenities.trim()};video:${rePropVideo.trim()};documents:${rePropDocs.trim()}`;
    const imageUrl = rePropImages.join('|') || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80';

    const payload = {
      projectId,
      name: rePropName.trim(),
      description: rePropDescription.trim(),
      price: parseFloat(rePropPrice) || 0,
      category: rePropType,
      imageUrl,
      stock: 1,
      available: true,
      brand: rePropLocation.trim(),
      variants
    };

    try {
      if (rePropId) {
        await api.products.update(rePropId, { ...payload, id: rePropId });
        alert('Property updated successfully!');
      } else {
        await api.products.create(payload);
        alert('Property created successfully!');
      }
      resetPropertyForm();
      fetchDbProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to save property listing.');
    }
  };

  const handlePropImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const base64 = await encodeFile(files[i]);
        uploadedUrls.push(base64);
      } catch (err) {
        console.error(err);
      }
    }
    setRePropImages(prev => [...prev, ...uploadedUrls]);
  };

  const handleEditPropertyClick = (p: Product) => {
    const parsed = parseVariants(p.variants);
    setRePropId(p.id || null);
    setRePropName(p.name || '');
    setRePropType(p.category || 'Residential');
    setRePropPrice(p.price ? String(p.price) : '');
    setRePropLocation(p.brand || '');
    setRePropArea(parsed.area || '');
    setRePropBedrooms(parsed.bedrooms || '');
    setRePropBathrooms(parsed.bathrooms || '');
    setRePropDescription(p.description || '');
    setRePropAmenities(parsed.amenities || '');
    setRePropImages(p.imageUrl ? p.imageUrl.split('|') : []);
    setRePropVideo(parsed.video || '');
    setRePropDocs(parsed.documents || '');
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property listing?')) return;
    try {
      await api.products.delete(id);
      fetchDbProducts();
      alert('Property listing deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete property listing.');
    }
  };

  // Render Panels
  const renderBrokerOverviewPanel = () => {
    const currentBroker = getCurrentBroker();
    const brokerLeads = reLeads.filter(l => l.assignedBrokerId === currentBroker?.id);
    const activeLeadsCount = brokerLeads.filter(l => l.status !== 'Closed' && l.status !== 'Lost').length;
    
    const brokerVisits = reVisits.filter(v => v.brokerId === currentBroker?.id);
    const scheduledVisits = brokerVisits.filter(v => v.status === 'Scheduled' || v.status === 'Confirmed');
    
    const brokerSales = reSales.filter(s => s.brokerId === currentBroker?.id);
    const closedDealsCount = brokerSales.length;
    const totalSalesVolume = brokerSales.reduce((acc, s) => acc + (s.salePrice || 0), 0);
    const commissionEarned = brokerSales.reduce((acc, s) => acc + (s.commissionAmount || 0), 0);
    
    const salesTargetDeals = 5;
    const targetPercent = Math.min(Math.round((closedDealsCount / salesTargetDeals) * 100), 100);

    const recentVisits = [...brokerVisits].sort((a, b) => b.id - a.id).slice(0, 5);
    const recentLeads = [...brokerLeads].sort((a, b) => b.id - a.id).slice(0, 5);

    return (
      <div className="space-y-6 animate-fade-in text-xs text-slate-800">
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 relative z-10">
            <span className="text-[9px] bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-indigo-500/20">
              Logged in as Broker
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight mt-2">Welcome Back, {currentBroker?.name}!</h1>
            <p className="text-slate-300 font-medium text-[11px] max-w-xl">
              Specialization: <strong className="text-white">{currentBroker?.specialization || 'Residential'}</strong> • Commission Rate: <strong className="text-white">{currentBroker?.commissionRate || 2.5}%</strong>. Manage your client bookings, log interactions, and review your commission payments.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[180px] relative z-10 flex flex-col justify-between">
            <span className="text-[9px] font-bold uppercase text-slate-300 tracking-wider">Broker Commission</span>
            <div className="text-2xl font-black text-indigo-300 mt-1">₹{commissionEarned.toLocaleString()}</div>
            <span className="text-[8px] text-slate-400 font-semibold block mt-1">From {closedDealsCount} closed deal(s)</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Assigned Leads</span>
            <h2 className="text-xl font-extrabold text-slate-900">{brokerLeads.length}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">{activeLeadsCount} active lead pipeline</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Site Visits</span>
            <h2 className="text-xl font-extrabold text-indigo-650">{scheduledVisits.length}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Upcoming inspections</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sales Target Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-emerald-600">{targetPercent}%</span>
                <span className="text-[9px] font-bold text-slate-400">({closedDealsCount} of {salesTargetDeals} Deals)</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${targetPercent}%` }} />
            </div>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sales Volume Closed</span>
            <h2 className="text-xl font-extrabold text-amber-600">₹{totalSalesVolume.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Properties bookings value</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Leads */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase">Recent Assigned Leads</h3>
              <button onClick={() => setActiveTab('broker_leads')} className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer">View Leads</button>
            </div>
            <div className="space-y-3">
              {recentLeads.length === 0 ? (
                <p className="text-slate-400 italic text-center py-4">No leads assigned yet.</p>
              ) : (
                recentLeads.map(lead => (
                  <div key={lead.id} className="flex justify-between items-center py-1">
                    <div>
                      <span className="font-bold text-slate-900 block">{lead.name}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{lead.mobile} • {lead.email}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-700 block">{lead.propertyName || 'General Inquiry'}</span>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mt-0.5 ${
                        lead.status === 'New' ? 'bg-indigo-50 text-indigo-700' :
                        lead.status === 'Contacted' ? 'bg-blue-50 text-blue-700' :
                        lead.status === 'Closed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>{lead.status || 'New'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Site Visits */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase">Your Upcoming Visits</h3>
              <button onClick={() => setActiveTab('broker_visits')} className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer">View Visits</button>
            </div>
            <div className="space-y-3">
              {recentVisits.length === 0 ? (
                <p className="text-slate-400 italic text-center py-4">No site visits scheduled.</p>
              ) : (
                recentVisits.map(visit => (
                  <div key={visit.id} className="flex justify-between items-center py-1">
                    <div>
                      <span className="font-bold text-slate-900 block">{visit.clientName}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{visit.visitDate} • {visit.visitTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-600 block">{visit.propertyName}</span>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mt-0.5 ${
                        visit.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        visit.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>{visit.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBrokerLeadsPanel = () => {
    const currentBroker = getCurrentBroker();
    const brokerLeads = reLeads.filter(l => l.assignedBrokerId === currentBroker?.id);

    const handleCallCustomer = (leadId: number) => {
      setBrokerActiveCallLeadId(leadId);
    };

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in relative">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 uppercase text-xs">👥 My Assigned Leads Pipeline</h3>
          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Clients CRM</span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Client Details</th>
                <th className="p-4">Interested Property</th>
                <th className="p-4">Lead Status</th>
                <th className="p-4">Log Notes</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {brokerLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400 italic">No assigned leads found.</td>
                </tr>
              ) : (
                brokerLeads.map((lead) => {
                  const currentNotes = leadNotesTexts[lead.id] !== undefined ? leadNotesTexts[lead.id] : (lead.notes || '');
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/50">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{lead.mobile} • {lead.email}</div>
                        {lead.budget && <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Budget: ₹{lead.budget.toLocaleString()}</div>}
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-700 block">{lead.propertyName || `Property ID: #${lead.propertyId}`}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">Registered: {lead.createdDate || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => handleUpdateLeadStatus(lead, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-semibold outline-none focus:bg-white transition cursor-pointer text-slate-750"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Scheduled">Scheduled Visit</option>
                          <option value="Closed">Closed / Deal Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td className="p-4 space-y-1 max-w-xs">
                        {lead.message && <div className="text-slate-500 italic text-[10px]">“{lead.message}”</div>}
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={currentNotes}
                            onChange={(e) => setLeadNotesTexts({...leadNotesTexts, [lead.id]: e.target.value})}
                            placeholder="Add notes..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none text-slate-800"
                          />
                          <button
                            onClick={() => handleSaveLeadNotes(lead, currentNotes)}
                            className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-600 px-2 py-1 rounded text-[9px] font-bold transition cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => handleCallCustomer(lead.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow hover:shadow-md transition cursor-pointer flex items-center gap-1.5 justify-end ml-auto"
                        >
                          📞 Call Customer
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* CALL SIMULATION MODAL */}
        {brokerActiveCallLeadId !== null && (() => {
          const callLead = reLeads.find(l => l.id === brokerActiveCallLeadId);
          if (!callLead) return null;
          return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 w-full max-w-md animate-fade-in text-center space-y-6">
                <div className="relative inline-flex items-center justify-center">
                  <span className="absolute inline-flex h-16 w-16 rounded-full bg-indigo-400 opacity-75 animate-ping" />
                  <div className="relative bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white rounded-full p-4 text-3xl shadow-lg">
                    📞
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Simulating Call...</h3>
                  <p className="text-lg font-black text-indigo-600 mt-1">{callLead.name}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{callLead.mobile} • {callLead.email}</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200 space-y-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Log Call Discussion & Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Type details about this call (e.g. client looking for 3BHK flat, scheduled site visit, budget flexibility)..."
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 text-xs font-semibold text-slate-800"
                    id="callNotesInput"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setBrokerActiveCallLeadId(null)}
                    className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl font-bold transition text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const notesArea = document.getElementById('callNotesInput') as HTMLTextAreaElement;
                      const callNotesVal = notesArea ? notesArea.value.trim() : '';
                      if (callNotesVal) {
                        const datePrefix = `[Call - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]: `;
                        const updatedNotes = callLead.notes
                          ? `${callLead.notes}\n${datePrefix}${callNotesVal}`
                          : `${datePrefix}${callNotesVal}`;
                        await api.realEstate.leads.update(callLead.id, {
                          ...callLead,
                          status: 'Contacted',
                          notes: updatedNotes
                        });
                        alert('Call details logged successfully, status updated to Contacted!');
                        fetchRealEstateResources();
                      } else {
                        await api.realEstate.leads.update(callLead.id, {
                          ...callLead,
                          status: 'Contacted'
                        });
                        fetchRealEstateResources();
                      }
                      setBrokerActiveCallLeadId(null);
                    }}
                    className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold transition text-xs shadow-md shadow-rose-600/10 cursor-pointer"
                  >
                    🛑 End & Save Notes
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const renderBrokerPropertiesPanel = () => {
    const filteredProps = products.filter(p => {
      const query = rePropSearchQuery.trim().toLowerCase();
      if (!query) return true;
      return (p.name?.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query));
    });

    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase">🏢 Property Listing Directory</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Read-only view of all available properties for pitching to customers</p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search properties..."
              value={rePropSearchQuery}
              onChange={(e) => setRePropSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-855 font-semibold"
            />
            <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProps.length === 0 ? (
            <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 italic">
              No properties found matching your query.
            </div>
          ) : (
            filteredProps.map((p) => {
              const info = parseVariants(p.variants);
              return (
                <div key={p.id} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-44 relative bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={p.imageUrl || '/images/property_placeholder.png'}
                        className="w-full h-full object-cover"
                        alt={p.name}
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-lg border border-white/10">
                        {p.category || 'Residential'}
                      </span>
                    </div>

                    <div className="p-5 space-y-4">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{p.name}</h4>
                        <span className="text-[10px] text-slate-450 font-bold block mt-0.5">📍 {p.description?.split('\n')[0] || 'N/A'}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/50 rounded-xl p-2 text-center text-[10px] font-bold text-slate-600">
                        <div>
                          <span className="block text-[8px] text-slate-400 uppercase">Area</span>
                          <span>{info.area || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-400 uppercase">Bedrooms</span>
                          <span>{info.bedrooms || 'N/A'} BHK</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-400 uppercase">Baths</span>
                          <span>{info.bathrooms || 'N/A'} Baths</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 font-semibold line-clamp-3 leading-relaxed">
                        {p.description || 'No detailed description available.'}
                      </p>

                      {info.amenities && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {info.amenities.split(',').map((amenity: string, idx: number) => (
                            <span key={idx} className="bg-slate-100 text-slate-600 font-bold text-[8px] px-2 py-0.5 rounded">
                              {amenity.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-4">
                    <div className="flex gap-2">
                      {info.video && (
                        <a
                          href={info.video}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl font-bold text-center border border-indigo-100 transition cursor-pointer text-[10px]"
                        >
                          🎥 Video Tour
                        </a>
                      )}
                      {info.documents && (
                        <a
                          href={info.documents}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-center border border-slate-200 transition cursor-pointer text-[10px]"
                        >
                          📄 Brochure
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Asking Price</span>
                        <span className="text-sm font-black text-indigo-600">₹{p.price?.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => {
                          alert(`To pitch this property, go to the Follow-Ups panel, select a lead, and log a pitch for "${p.name}".`);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        Pitch
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderBrokerVisitsPanel = () => {
    const currentBroker = getCurrentBroker();
    const brokerVisits = reVisits.filter(v => v.brokerId === currentBroker?.id);

    const filteredVisits = brokerVisits.filter(visit => {
      if (brokerActiveVisitTab === 'Upcoming') {
        return visit.status === 'Scheduled' || visit.status === 'Confirmed';
      }
      if (brokerActiveVisitTab === 'Completed') {
        return visit.status === 'Completed';
      }
      return visit.status === 'Cancelled';
    });

    const handleUpdateVisitStatus = async (visit: any, newStatus: string) => {
      try {
        await api.realEstate.visits.update(visit.id, {
          ...visit,
          status: newStatus
        });
        alert(`Visit status updated to ${newStatus}!`);
        fetchRealEstateResources();
      } catch (err) {
        console.error(err);
        alert('Failed to update status.');
      }
    };

    const handleSaveVisitFeedback = async (visit: any, feedbackText: string) => {
      try {
        await api.realEstate.visits.update(visit.id, {
          ...visit,
          feedback: feedbackText
        });
        alert('Feedback updated successfully!');
        fetchRealEstateResources();
      } catch (err) {
        console.error(err);
        alert('Failed to save feedback.');
      }
    };

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in space-y-4">
        <header className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-905 uppercase text-xs">📅 Broker Site Visits Scheduler</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage and update customer physical properties tours</p>
          </div>
          <div className="flex bg-slate-50 border border-slate-200 p-1 rounded-xl gap-1">
            {(['Upcoming', 'Completed', 'Cancelled'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setBrokerActiveVisitTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  brokerActiveVisitTab === tab
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Client Name</th>
                <th className="p-4">Interested Property</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Visit Status</th>
                <th className="p-4">Visit Feedback / Comments</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400 italic">No site visits found in this category.</td>
                </tr>
              ) : (
                filteredVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50/50">
                    <td className="p-4 pl-6 font-bold text-slate-900">{visit.clientName}</td>
                    <td className="p-4 font-bold text-slate-700">{visit.propertyName || `Property ID: #${visit.propertyId}`}</td>
                    <td className="p-4 font-semibold text-slate-600">
                      <div>🗓️ {visit.visitDate}</div>
                      <div className="text-[10px] text-slate-400">🕒 {visit.visitTime}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={visit.status || 'Scheduled'}
                        onChange={(e) => handleUpdateVisitStatus(visit, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-semibold outline-none focus:bg-white transition cursor-pointer text-slate-755"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="flex gap-1">
                        <input
                          type="text"
                          defaultValue={visit.feedback || ''}
                          onBlur={(e) => handleSaveVisitFeedback(visit, e.target.value)}
                          placeholder="Log visit feedback..."
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none text-slate-800"
                        />
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {visit.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateVisitStatus(visit, 'Completed')}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-xl text-[9px] font-bold transition cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const [brokerSelectedLeadIdForFollowup, setBrokerSelectedLeadIdForFollowup] = useState<number | null>(null);

  const renderBrokerFollowupsPanel = () => {
    const currentBroker = getCurrentBroker();
    const brokerLeads = reLeads.filter(l => l.assignedBrokerId === currentBroker?.id);
    
    const activeLeadId = brokerSelectedLeadIdForFollowup !== null 
      ? brokerSelectedLeadIdForFollowup 
      : (brokerLeads.length > 0 ? brokerLeads[0].id : null);
      
    const selectedLead = brokerLeads.find(l => l.id === activeLeadId);

    const handleSubmitFollowup = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedLead) return;
      if (!brokerMeetingNotesText.trim()) {
        alert('Please enter meeting/call notes.');
        return;
      }

      const followupDateStr = brokerNextFollowupDate 
        ? ` (Next Follow-Up Date: ${brokerNextFollowupDate})` 
        : '';
      const datePrefix = `\n[Follow-Up - ${new Date().toLocaleDateString()}]: `;
      const appendedNotes = selectedLead.notes
        ? `${selectedLead.notes}${datePrefix}${brokerMeetingNotesText}${followupDateStr}`
        : `${datePrefix}${brokerMeetingNotesText}${followupDateStr}`;

      try {
        await api.realEstate.leads.update(selectedLead.id, {
          ...selectedLead,
          status: 'Contacted',
          notes: appendedNotes
        });
        alert('Follow-Up notes recorded, lead status updated to Contacted!');
        setBrokerMeetingNotesText('');
        setBrokerNextFollowupDate('');
        fetchRealEstateResources();
      } catch (err) {
        console.error(err);
        alert('Failed to save follow-up details.');
      }
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-slate-800 animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm h-[500px] overflow-y-auto">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">
            Select Client Lead
          </h3>
          {brokerLeads.length === 0 ? (
            <p className="text-slate-400 italic text-center py-8">No assigned leads.</p>
          ) : (
            brokerLeads.map(lead => (
              <button
                key={lead.id}
                onClick={() => setBrokerSelectedLeadIdForFollowup(lead.id)}
                className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 cursor-pointer ${
                  activeLeadId === lead.id
                    ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                    : 'bg-slate-50/50 border-slate-200/60 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900 flex justify-between items-center w-full">
                  <span>{lead.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    lead.status === 'New' ? 'bg-indigo-50 text-indigo-700' :
                    lead.status === 'Contacted' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>{lead.status || 'New'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">{lead.propertyName || 'General Inquiry'}</span>
                <span className="text-[9px] text-slate-400 font-medium">📞 {lead.mobile}</span>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          {selectedLead ? (
            <>
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase">👥 Client Follow-Up Console</h3>
                  <p className="text-[10px] text-indigo-650 font-bold mt-1">
                    Active Client: {selectedLead.name} • {selectedLead.email}
                  </p>
                </div>

                <form onSubmit={handleSubmitFollowup} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-1">
                      Meeting / Call Discussion Notes *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Log details of call or client meeting..."
                      value={brokerMeetingNotesText}
                      onChange={(e) => setBrokerMeetingNotesText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-1">
                      Next Follow-Up Appointment Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={brokerNextFollowupDate}
                      onChange={(e) => setBrokerNextFollowupDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-755 text-white rounded-xl font-bold transition shadow-md hover:shadow-lg text-xs cursor-pointer"
                  >
                    💾 Log Follow-Up Interaction
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 mt-4 max-h-[160px] overflow-y-auto">
                <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">Historical Interaction Log</h4>
                {selectedLead.notes ? (
                  <pre className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-x-auto whitespace-pre-wrap font-sans font-semibold leading-relaxed">
                    {selectedLead.notes}
                  </pre>
                ) : (
                  <p className="text-[10px] text-slate-400 italic">No interactions logged yet for this lead.</p>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic py-16">
              Please select a client lead from the left pane to begin logging interactions.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBrokerCommissionPanel = () => {
    const currentBroker = getCurrentBroker();
    const brokerSales = reSales.filter(s => s.brokerId === currentBroker?.id);
    const closedDealsCount = brokerSales.length;
    const totalSalesVolume = brokerSales.reduce((acc, s) => acc + (s.salePrice || 0), 0);
    const totalCommission = brokerSales.reduce((acc, s) => acc + (s.commissionAmount || 0), 0);

    let paidCommission = 0;
    let pendingCommission = 0;

    const dealsGrid = brokerSales.map(sale => {
      const matchedInvoice = reInvoices.find(inv => inv.saleId === sale.id);
      const isPaid = matchedInvoice ? matchedInvoice.status === 'Paid' : false;
      const commission = sale.commissionAmount || 0;
      
      if (isPaid) {
        paidCommission += commission;
      } else {
        pendingCommission += commission;
      }

      return {
        ...sale,
        invoiceNumber: matchedInvoice?.invoiceNumber || 'N/A',
        invoiceStatus: matchedInvoice?.status || 'Unpaid',
        isPaid
      };
    });

    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Closed Deals</span>
            <h2 className="text-xl font-extrabold text-slate-900">{closedDealsCount}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Total property units sold</span>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Commission Earned (Paid Payouts)</span>
            <h2 className="text-xl font-extrabold text-emerald-600">₹{paidCommission.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Released broker commission payments</span>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pending Payouts</span>
            <h2 className="text-xl font-extrabold text-amber-600">₹{pendingCommission.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Awaiting client invoice settlement</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-905 uppercase text-xs">Closed Sales & Broker Payout Tracking</h3>
            <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Sales Ledger</span>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="p-4 pl-6">Client Info</th>
                  <th className="p-4">Sold Property</th>
                  <th className="p-4">Sale Value</th>
                  <th className="p-4">Sale Date</th>
                  <th className="p-4">Invoice Details</th>
                  <th className="p-4">Commission</th>
                  <th className="p-4 pr-6 text-right">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dealsGrid.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-400 italic">No closed sales recorded.</td>
                  </tr>
                ) : (
                  dealsGrid.map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-50/50">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-slate-900">{deal.clientName}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{deal.clientEmail}</div>
                      </td>
                      <td className="p-4 font-bold text-slate-700">{deal.propertyName || `Property ID: #${deal.propertyId}`}</td>
                      <td className="p-4 font-extrabold text-slate-900">₹{deal.salePrice?.toLocaleString()}</td>
                      <td className="p-4 font-semibold text-slate-600">{deal.saleDate}</td>
                      <td className="p-4 font-semibold text-slate-600">
                        <div>{deal.invoiceNumber}</div>
                        <span className={`inline-block px-1.5 py-0.25 rounded text-[8px] font-bold mt-0.5 ${
                          deal.invoiceStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>{deal.invoiceStatus}</span>
                      </td>
                      <td className="p-4 font-black text-indigo-650">₹{deal.commissionAmount?.toLocaleString()}</td>
                      <td className="p-4 pr-6 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-xl text-[9px] font-bold uppercase ${
                          deal.isPaid
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800 border border-amber-200/50'
                        }`}>
                          {deal.isPaid ? '✓ Paid' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- CUSTOMER DASHBOARD PANELS & STATES ---
  const [custDocsList, setCustDocsList] = useState<any[]>([]);
  const [custComparePropIds, setCustComparePropIds] = useState<number[]>([]);
  const [custWishlistIds, setCustWishlistIds] = useState<number[]>([]);
  
  // Advanced Filter states
  const [custFilterType, setCustFilterType] = useState('All');
  const [custFilterMinPrice, setCustFilterMinPrice] = useState('');
  const [custFilterMaxPrice, setCustFilterMaxPrice] = useState('');
  const [custFilterBeds, setCustFilterBeds] = useState('Any');
  const [custFilterBaths, setCustFilterBaths] = useState('Any');
  const [custFilterMinArea, setCustFilterMinArea] = useState('');

  // Site Tour booking states
  const [custVisitPropId, setCustVisitPropId] = useState('');
  const [custVisitDate, setCustVisitDate] = useState('');
  const [custVisitTime, setCustVisitTime] = useState('11:00 AM');
  const [custVisitNotes, setCustVisitNotes] = useState('');

  // Advisor Contact states
  const [custContactMsg, setCustContactMsg] = useState('');

  // Load wishlist & docs from storage
  useEffect(() => {
    if (typeof window !== 'undefined' && clientEmail && !isNaN(projectId)) {
      const savedWish = localStorage.getItem(`cust_wishlist_${projectId}_${clientEmail}`);
      if (savedWish) setCustWishlistIds(JSON.parse(savedWish));

      const savedDocs = localStorage.getItem(`cust_docs_${projectId}_${clientEmail}`);
      if (savedDocs) {
        setCustDocsList(JSON.parse(savedDocs));
      } else {
        // Seed default document templates
        const defaultDocs = [
          { id: 101, fileName: 'Booking_Agreement_Draft.pdf', fileSize: '420 KB', docType: 'Agreement Draft', uploadedAt: '2026-06-10', url: '#' },
          { id: 102, fileName: 'RERA_Disclosure_Certificate.pdf', fileSize: '1.2 MB', docType: 'Disclosure Form', uploadedAt: '2026-06-08', url: '#' }
        ];
        localStorage.setItem(`cust_docs_${projectId}_${clientEmail}`, JSON.stringify(defaultDocs));
        setCustDocsList(defaultDocs);
      }
    }
  }, [clientEmail, projectId]);

  const handleToggleWishlist = (propId: number) => {
    let updated = [...custWishlistIds];
    if (updated.includes(propId)) {
      updated = updated.filter(id => id !== propId);
    } else {
      updated.push(propId);
    }
    setCustWishlistIds(updated);
    localStorage.setItem(`cust_wishlist_${projectId}_${clientEmail}`, JSON.stringify(updated));
  };

  const handleUploadCustDoc = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await encodeFile(file);
      const newDoc = {
        id: Date.now(),
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        docType,
        uploadedAt: new Date().toLocaleDateString(),
        url: base64
      };
      const updated = [...custDocsList, newDoc];
      setCustDocsList(updated);
      localStorage.setItem(`cust_docs_${projectId}_${clientEmail}`, JSON.stringify(updated));
      alert(`${docType} uploaded successfully!`);
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
  };

  const handleDeleteCustDoc = (docId: number) => {
    const updated = custDocsList.filter(d => d.id !== docId);
    setCustDocsList(updated);
    localStorage.setItem(`cust_docs_${projectId}_${clientEmail}`, JSON.stringify(updated));
  };

  const getCustomerLead = () => {
    return reLeads.find(l => l.email === clientEmail);
  };

  const getCustomerAdvisor = () => {
    const lead = getCustomerLead();
    if (!lead || !lead.assignedBrokerId) return null;
    return reBrokers.find(b => b.id === lead.assignedBrokerId);
  };

  // 1) Customer Profile
  const renderCustProfilePanel = () => {
    const advisor = getCustomerAdvisor();
    
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 relative z-10">
            <span className="text-[9px] bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-indigo-500/20">
              Real Estate Portal
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight mt-2">Welcome, {userName || 'Customer'}!</h1>
            <p className="text-slate-300 font-medium text-[11px] max-w-xl">
              Log in Email: <strong className="text-white">{clientEmail}</strong> • Manage your property inquiries, wishlist, book visits, and review agreements.
            </p>
          </div>
          {advisor && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[200px] relative z-10 flex flex-col justify-between">
              <span className="text-[8px] font-bold uppercase text-slate-300 tracking-wider">Dedicated Broker Advisor</span>
              <div className="text-sm font-extrabold text-white mt-1">🤵 {advisor.name}</div>
              <span className="text-[9px] text-indigo-200 font-medium block mt-0.5">📞 {advisor.phone}</span>
              <span className="text-[8px] text-slate-400 font-semibold block mt-1 uppercase tracking-wide">{advisor.specialization}</span>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase">👤 Edit Account Details</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveProfileChanges(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Mobile Number</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition font-semibold"
              />
            </div>
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition cursor-pointer text-xs shadow"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // 2) Customer Address
  const renderCustAddressPanel = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-800 space-y-6 animate-fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-905 text-xs uppercase">📍 My Address Details</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Define your home and office address for correspondence records</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Address updated successfully!'); }} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Home Address</label>
            <input
              type="text"
              value={userAddressHome}
              onChange={(e) => setUserAddressHome(e.target.value)}
              placeholder="Home Town, Flat No, City, State"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition font-semibold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Office / Work Address</label>
            <input
              type="text"
              value={userAddressWork}
              onChange={(e) => setUserAddressWork(e.target.value)}
              placeholder="Office Building, Block, Sector, City"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition font-semibold"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition cursor-pointer text-xs"
            >
              Update Address Records
            </button>
          </div>
        </form>
      </div>
    );
  };

  // 3) Customer Document Vault
  const renderCustDocumentsPanel = () => {
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase">📁 Document & Verification Vault</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="p-3">File Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">File Size</th>
                    <th className="p-3">Date Uploaded</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {custDocsList.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        📄 {doc.fileName}
                      </td>
                      <td className="p-3 font-semibold text-slate-505">{doc.docType}</td>
                      <td className="p-3 font-medium text-slate-405">{doc.fileSize}</td>
                      <td className="p-3 font-medium text-slate-500">{doc.uploadedAt}</td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          {doc.url !== '#' && (
                            <a
                              href={doc.url}
                              download={doc.fileName}
                              className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[9px] transition"
                            >
                              Download
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteCustDoc(doc.id)}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded text-[9px] transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Billing Invoices Section */}
            <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase">📄 Issued Billing Invoices & Receipts</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      <th className="p-3">Invoice Number</th>
                      <th className="p-3">Property</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Date Issued</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-700">
                    {reInvoices.filter(inv => inv.clientEmail === clientEmail).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-400 italic font-medium">No invoices issued yet.</td>
                      </tr>
                    ) : (
                      reInvoices.filter(inv => inv.clientEmail === clientEmail).map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-mono font-bold text-slate-800">{inv.invoiceNumber}</td>
                          <td className="p-3 text-slate-700">{inv.propertyName}</td>
                          <td className="p-3 font-black text-indigo-650">₹{inv.total?.toLocaleString()}</td>
                          <td className="p-3 text-slate-500">{inv.issueDate}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                              inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>{inv.status}</span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setReSelectedInvoice(inv)}
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[9px] border border-indigo-100 transition cursor-pointer"
                            >
                              Print Receipt 🖨️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase">📤 Upload Verification Proofs</h3>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              Upload scanned copies of PAN Card, Aadhar Card, or Income details to expedite booking verifications.
            </p>
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">ID Proof (Passport / Aadhar)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleUploadCustDoc(e, 'Identity Proof')}
                  className="w-full text-[10px] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-indigo-50 file:text-indigo-700 file:hover:bg-indigo-100 file:cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-505 uppercase tracking-wider mb-1">Tax / PAN Card Proof</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleUploadCustDoc(e, 'PAN Card / Tax Proof')}
                  className="w-full text-[10px] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-indigo-50 file:text-indigo-700 file:hover:bg-indigo-100 file:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4) Customer Search Properties
  const [custSelectedPropForModal, setCustSelectedPropForModal] = useState<any | null>(null);

  const renderCustSearchPropsPanel = () => {
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-xs">🏢 Real Estate Properties catalog</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Explore luxury villas, commercial spaces, and residential flats added by Admin</p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, location or details..."
              value={rePropSearchQuery}
              onChange={(e) => setRePropSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-850 font-semibold"
            />
            <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => {
            const query = rePropSearchQuery.trim().toLowerCase();
            return !query || p.name?.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query);
          }).map(p => {
            const info = parseVariants(p.variants);
            const inWishlist = p.id !== undefined && custWishlistIds.includes(p.id);
            return (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img src={p.imageUrl || '/images/property_placeholder.png'} className="w-full h-full object-cover" alt="" />
                  <span className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-lg border border-white/10">
                    {p.category || 'Residential'}
                  </span>
                  <button
                    onClick={() => handleToggleWishlist(p.id || 0)}
                    className="absolute top-3 right-3 bg-white hover:bg-rose-50 text-rose-600 rounded-full p-2 border border-slate-200 shadow-sm transition cursor-pointer text-xs"
                  >
                    {inWishlist ? '❤️' : '🤍'}
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{p.name}</h4>
                    <span className="text-[10px] text-slate-450 font-bold block mt-0.5">📍 {p.description?.split('\n')[0] || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/50 rounded-xl p-2 text-center text-[10px] font-bold text-slate-655">
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Area</span>
                      <span>{info.area || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Beds</span>
                      <span>{info.bedrooms || 'N/A'} BHK</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Baths</span>
                      <span>{info.bathrooms || 'N/A'}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase block">Asking Price</span>
                    <span className="text-sm font-black text-indigo-600">₹{p.price?.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setCustSelectedPropForModal(p)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Property Modal */}
        {custSelectedPropForModal && (() => {
          const p = custSelectedPropForModal;
          const info = parseVariants(p.variants);
          const inWish = custWishlistIds.includes(p.id);
          return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 w-full max-w-2xl animate-fade-in relative space-y-6">
                <button
                  onClick={() => setCustSelectedPropForModal(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-black cursor-pointer text-base"
                >
                  ✕
                </button>
                <div className="h-64 relative bg-slate-100 rounded-2xl overflow-hidden">
                  <img src={p.imageUrl || '/images/property_placeholder.png'} className="w-full h-full object-cover" alt="" />
                  <span className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[9px] px-2 py-0.5 rounded-lg border border-white/10 uppercase">
                    {p.category || 'Residential'}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{p.name}</h3>
                      <p className="text-[10px] text-slate-450 font-bold mt-0.5">📍 {p.description?.split('\n')[0] || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Asking Price</span>
                      <span className="text-lg font-black text-indigo-600">₹{p.price?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 bg-slate-50 border border-slate-200/50 rounded-xl p-3 text-center text-[10px] font-bold text-slate-655">
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Super Area</span>
                      <span>{info.area || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Bedrooms</span>
                      <span>{info.bedrooms || 'N/A'} BHK</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Bathrooms</span>
                      <span>{info.bathrooms || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">Availability</span>
                      <span className="text-emerald-600">Active</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase">Description & Specifications</h4>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{p.description}</p>
                  </div>

                  {info.amenities && (
                    <div className="space-y-1.5">
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase">Amenities & Features</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {info.amenities.split(',').map((am: string, i: number) => (
                          <span key={i} className="bg-slate-100 text-slate-600 font-bold text-[9px] px-2.5 py-1 rounded-lg">
                            ✓ {am.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-100">
                    {info.video && (
                      <a href={info.video} target="_blank" rel="noreferrer" className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold transition flex-1 text-center">
                        🎥 Video Walkthrough
                      </a>
                    )}
                    {info.documents && (
                      <a href={info.documents} target="_blank" rel="noreferrer" className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold transition flex-1 text-center">
                        📄 Download Brochure
                      </a>
                    )}
                    <button
                      onClick={() => {
                        handleToggleWishlist(p.id);
                      }}
                      className={`px-4 py-2 rounded-xl font-bold border transition ${inWish ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                    >
                      {inWish ? '❤️ Saved' : '🤍 Wishlist'}
                    </button>
                    <button
                      onClick={() => {
                        setCustVisitPropId(String(p.id));
                        setCustSelectedPropForModal(null);
                        setActiveTab('cust_book_visit');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow flex-1"
                    >
                      📅 Book Site Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  // 5) Customer Advanced Filter
  const renderCustAdvancedFilterPanel = () => {
    const filtered = products.filter(p => {
      const info = parseVariants(p.variants);
      if (custFilterType !== 'All' && p.category !== custFilterType) return false;
      
      const price = p.price || 0;
      if (custFilterMinPrice && price < parseFloat(custFilterMinPrice)) return false;
      if (custFilterMaxPrice && price > parseFloat(custFilterMaxPrice)) return false;
      
      if (custFilterBeds !== 'Any') {
        const beds = parseInt(info.bedrooms, 10);
        const filterBeds = parseInt(custFilterBeds, 10);
        if (isNaN(beds) || beds !== filterBeds) return false;
      }
      
      if (custFilterBaths !== 'Any') {
        const baths = parseInt(info.bathrooms, 10);
        const filterBaths = parseInt(custFilterBaths, 10);
        if (isNaN(baths) || baths !== filterBaths) return false;
      }

      if (custFilterMinArea) {
        const areaVal = parseInt(info.area.replace(/\D/g,''), 10);
        const filterArea = parseInt(custFilterMinArea, 10);
        if (isNaN(areaVal) || areaVal < filterArea) return false;
      }

      return true;
    });

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-xs text-slate-800 animate-fade-in">
        {/* Left Column Filters Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 h-fit">
          <h3 className="font-extrabold text-slate-900 uppercase text-xs border-b border-slate-100 pb-2">🎛️ Filter Properties</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Property Type</label>
              <select
                value={custFilterType}
                onChange={(e) => setCustFilterType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-750"
              >
                <option value="All">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Rental">Rental</option>
                <option value="Builder">Builder Floor</option>
                <option value="Luxury">Luxury Villa</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Min Price (₹)</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={custFilterMinPrice}
                  onChange={(e) => setCustFilterMinPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Max Price (₹)</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={custFilterMaxPrice}
                  onChange={(e) => setCustFilterMaxPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-505 uppercase tracking-wider mb-1">Bedrooms</label>
                <select
                  value={custFilterBeds}
                  onChange={(e) => setCustFilterBeds(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-800"
                >
                  <option value="Any">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-505 uppercase tracking-wider mb-1">Bathrooms</label>
                <select
                  value={custFilterBaths}
                  onChange={(e) => setCustFilterBaths(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-800"
                >
                  <option value="Any">Any</option>
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3">3+ Baths</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Min Super Area (sqft)</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                value={custFilterMinArea}
                onChange={(e) => setCustFilterMinArea(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold text-slate-800"
              />
            </div>

            <button
              onClick={() => {
                setCustFilterType('All');
                setCustFilterMinPrice('');
                setCustFilterMaxPrice('');
                setCustFilterBeds('Any');
                setCustFilterBaths('Any');
                setCustFilterMinArea('');
              }}
              className="w-full py-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold transition text-slate-600 text-[10px] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Right Column Results grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
            <span className="font-bold text-slate-900 text-xs">Search Results ({filtered.length} Properties Found)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(p => {
              const info = parseVariants(p.variants);
              return (
                <div key={p.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden flex gap-4 p-4">
                  <img src={p.imageUrl || '/images/property_placeholder.png'} className="w-24 h-24 rounded-xl object-cover bg-slate-50 border border-slate-200" alt="" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs line-clamp-1">{p.name}</h4>
                      <p className="text-[9px] text-slate-400 font-bold block mt-0.5">📍 {p.description?.split('\n')[0]}</p>
                      <div className="flex gap-2 text-[9px] text-slate-505 font-bold mt-2">
                        <span>{info.bedrooms} BHK</span> • <span>{info.bathrooms} Baths</span> • <span>{info.area}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-slate-100 pt-2 mt-2">
                      <span className="text-xs font-black text-indigo-650">₹{p.price?.toLocaleString()}</span>
                      <button
                        onClick={() => setCustSelectedPropForModal(p)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-lg text-[9px] transition cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // 6) Customer Compare Property
  const renderCustComparePropsPanel = () => {
    const handleCompareSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
      const id = parseInt(e.target.value, 10);
      const updated = [...custComparePropIds];
      if (isNaN(id)) {
        updated.splice(index, 1);
      } else {
        updated[index] = id;
      }
      setCustComparePropIds(updated.filter(Boolean));
    };

    const selectedProps = custComparePropIds.map(id => products.find(p => p.id === id)).filter(Boolean) as any[];

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-800 space-y-6 animate-fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase">⚖️ Compare Properties Side-by-Side</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Select up to 3 properties to evaluate price, specs, and features side-by-side</p>
        </div>

        {/* Dropdowns selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map(idx => (
            <div key={idx} className="space-y-1">
              <label className="block text-[9px] font-bold text-slate-500 uppercase">Property Slot #{idx + 1}</label>
              <select
                value={custComparePropIds[idx] || ''}
                onChange={(e) => handleCompareSelect(e, idx)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none font-semibold cursor-pointer text-slate-750"
              >
                <option value="">-- Choose Property --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedProps.length === 0 ? (
          <p className="text-slate-400 italic text-center py-12">Please select properties in the slots above to display comparison details.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 w-1/4">Specification</th>
                  {selectedProps.map((p, idx) => (
                    <th key={p.id} className="p-3 border-r border-slate-200 text-center w-1/4">
                      <div className="font-black text-slate-900">{p.name}</div>
                      <span className="text-[9px] text-indigo-600 block mt-1 font-bold">₹{p.price?.toLocaleString()}</span>
                    </th>
                  ))}
                  {/* Empty headers to keep width consistent */}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => (
                    <th key={i} className="p-3 border-r border-slate-200 w-1/4 text-slate-400 text-center italic font-normal">
                      Empty Slot
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 font-semibold text-slate-655">
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Image Preview</td>
                  {selectedProps.map(p => (
                    <td key={p.id} className="p-3 border-r border-slate-200 text-center">
                      <img src={p.imageUrl || '/images/property_placeholder.png'} className="w-24 h-16 object-cover mx-auto rounded-lg border border-slate-200 bg-white" alt="" />
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Property Category</td>
                  {selectedProps.map(p => (
                    <td key={p.id} className="p-3 border-r border-slate-200 text-center">
                      <span className="bg-indigo-50 text-indigo-755 px-2 py-0.5 rounded font-extrabold text-[9px]">{p.category || 'Residential'}</span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Super Built-up Area</td>
                  {selectedProps.map(p => {
                    const info = parseVariants(p.variants);
                    return <td key={p.id} className="p-3 border-r border-slate-200 text-center">{info.area || 'N/A'}</td>;
                  })}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Bedrooms / Configuration</td>
                  {selectedProps.map(p => {
                    const info = parseVariants(p.variants);
                    return <td key={p.id} className="p-3 border-r border-slate-200 text-center">{info.bedrooms || 'N/A'} BHK</td>;
                  })}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Bathrooms</td>
                  {selectedProps.map(p => {
                    const info = parseVariants(p.variants);
                    return <td key={p.id} className="p-3 border-r border-slate-200 text-center">{info.bathrooms || 'N/A'} Baths</td>;
                  })}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Location Area</td>
                  {selectedProps.map(p => (
                    <td key={p.id} className="p-3 border-r border-slate-200 text-center font-medium text-[11px]">{p.description?.split('\n')[0]}</td>
                  ))}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Premium Amenities</td>
                  {selectedProps.map(p => {
                    const info = parseVariants(p.variants);
                    return (
                      <td key={p.id} className="p-3 border-r border-slate-200 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {info.amenities?.split(',').map((am: string, i: number) => (
                            <span key={i} className="bg-slate-105 text-slate-600 rounded text-[8px] font-bold px-1.5 py-0.5">{am.trim()}</span>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 border-r border-slate-200 font-bold text-slate-700">Actions</td>
                  {selectedProps.map(p => (
                    <td key={p.id} className="p-3 border-r border-slate-200 text-center">
                      <button
                        onClick={() => setCustSelectedPropForModal(p)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-xl transition cursor-pointer text-[10px]"
                      >
                        Open Details
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedProps.length }).map((_, i) => <td key={i} className="p-3 border-r border-slate-200 bg-slate-50/20" />)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // 7) Customer Wishlist
  const renderCustWishlistPanel = () => {
    const wishProps = products.filter(p => p.id !== undefined && custWishlistIds.includes(p.id));
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-extrabold text-slate-900 uppercase text-xs">❤️ My Saved Properties (Wishlist)</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Physical property bookings interest items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishProps.length === 0 ? (
            <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 italic">
              Your wishlist is empty. Browse listings to save properties!
            </div>
          ) : (
            wishProps.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between">
                <div className="h-40 relative bg-slate-105">
                  <img src={p.imageUrl || '/images/property_placeholder.png'} className="w-full h-full object-cover" alt="" />
                  <button
                    onClick={() => handleToggleWishlist(p.id || 0)}
                    className="absolute top-3 right-3 bg-white hover:bg-rose-50 text-rose-600 rounded-full p-2 border border-slate-200 shadow-sm cursor-pointer"
                  >
                    ❤️
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-xs line-clamp-1">{p.name}</h4>
                  <span className="text-[9px] text-slate-400 font-bold block">📍 {p.description?.split('\n')[0]}</span>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <span className="text-xs font-black text-indigo-650">₹{p.price?.toLocaleString()}</span>
                    <button
                      onClick={() => setCustSelectedPropForModal(p)}
                      className="bg-indigo-55 hover:bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded text-[9px] transition cursor-pointer"
                    >
                      Open View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // 8) Site Visits Log
  const renderCustVisitsPanel = () => {
    const lead = getCustomerLead();
    const customerVisits = reVisits.filter(v => v.clientName === userName || (lead && (v.leadId === lead.id || v.clientName === lead.name)));

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 uppercase text-xs">📅 My Site Visit Appointments</h3>
          <button
            onClick={() => setActiveTab('cust_book_visit')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
          >
            + Request Site Visit
          </button>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Property Name</th>
                <th className="p-4">Appointment Date</th>
                <th className="p-4">Time Slot</th>
                <th className="p-4">Assigned Advisor</th>
                <th className="p-4">Visit Status</th>
                <th className="p-4 pr-6">Discussion Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-700">
              {customerVisits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400 italic">No site visits scheduled yet.</td>
                </tr>
              ) : (
                customerVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50/50">
                    <td className="p-4 pl-6 font-bold text-slate-900">{visit.propertyName || `Property ID: #${visit.propertyId}`}</td>
                    <td className="p-4 text-slate-600">{visit.visitDate}</td>
                    <td className="p-4 text-slate-500">{visit.visitTime}</td>
                    <td className="p-4 text-indigo-700">🤵 {visit.brokerName || 'Assigned Advisor'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                        visit.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        visit.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' :
                        visit.status === 'Confirmed' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                      }`}>{visit.status}</span>
                    </td>
                    <td className="p-4 pr-6 text-slate-500 font-medium italic">{visit.feedback || 'Awaiting visit completion.'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 9) Payments Ledger
  const renderCustPaymentsPanel = () => {
    const customerSales = reSales.filter(s => s.clientEmail === clientEmail);
    const customerPayments = rePayments.filter(p => customerSales.some(s => s.id === p.saleId));

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 uppercase text-xs">💵 My Payment Receipts Ledger</h3>
          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Transaction History</span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Transaction ID</th>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date Clearance</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-655 text-[11px]">
              {customerPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400 italic">No payments logged yet for this client.</td>
                </tr>
              ) : (
                customerPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-4 pl-6 font-mono font-bold text-slate-800">{p.txnId || `TXN-#${p.id}`}</td>
                    <td className="p-4 font-bold text-slate-700">Sale Booking #{p.saleId}</td>
                    <td className="p-4 text-slate-500">{p.paymentMethod || 'Bank Transfer'}</td>
                    <td className="p-4 text-slate-500">{p.paymentDate}</td>
                    <td className="p-4 font-black text-indigo-650">₹{p.amount?.toLocaleString()}</td>
                    <td className="p-4 pr-6 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-emerald-50 text-emerald-700 uppercase">
                        ✓ Cleared
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 10) Book Site Visit Form
  const renderCustBookVisitPanel = () => {
    const handleBookSiteVisit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!custVisitPropId) {
        alert('Please select a property.');
        return;
      }
      if (!custVisitDate) {
        alert('Please select a visit date.');
        return;
      }

      const prop = products.find(x => String(x.id) === custVisitPropId);
      if (!prop) return;

      const broker = reBrokers.length > 0 ? reBrokers[0] : { id: 3, name: 'Broker Agent' };

      const payload = {
        projectId,
        leadId: getCustomerLead()?.id || 1,
        clientName: userName || 'Customer Client',
        propertyId: prop.id,
        propertyName: prop.name,
        brokerId: broker.id,
        brokerName: broker.name,
        visitDate: custVisitDate,
        visitTime: custVisitTime,
        status: 'Scheduled',
        feedback: custVisitNotes
      };

      try {
        await api.realEstate.visits.create(payload);
        alert('Site Tour requested successfully! Assigned to broker: ' + broker.name);
        setCustVisitPropId('');
        setCustVisitDate('');
        setCustVisitNotes('');
        fetchRealEstateResources();
        setActiveTab('cust_visits');
      } catch (err) {
        console.error(err);
        alert('Failed to request site visit.');
      }
    };

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-800 space-y-6 animate-fade-in max-w-xl mx-auto">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase">📅 Schedule a Property Site Tour</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Request a physical tour of the flat/villa with your broker advisor</p>
        </div>

        <form onSubmit={handleBookSiteVisit} className="space-y-4">
          <div>
            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Select Property *</label>
            <select
              value={custVisitPropId}
              required
              onChange={(e) => setCustVisitPropId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer text-slate-750"
            >
              <option value="">-- Select Property --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-bold text-slate-505 uppercase tracking-wider mb-1">Visit Date *</label>
              <input
                type="date"
                required
                value={custVisitDate}
                onChange={(e) => setCustVisitDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-505 uppercase tracking-wider mb-1">Preferred Time *</label>
              <select
                value={custVisitTime}
                onChange={(e) => setCustVisitTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none font-semibold text-slate-800 cursor-pointer"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Special Instructions / Comments</label>
            <textarea
              rows={3}
              placeholder="e.g. need parking detail, looking for high rise floor preference..."
              value={custVisitNotes}
              onChange={(e) => setCustVisitNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none font-semibold text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow text-xs cursor-pointer"
          >
            📅 Book site tour appointment
          </button>
        </form>
      </div>
    );
  };

  // 11) Contact Broker
  const renderCustContactBrokerPanel = () => {
    const advisor = getCustomerAdvisor();
    const handleSendMsg = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!custContactMsg.trim()) return;

      const lead = getCustomerLead();
      if (lead) {
        const datePrefix = `\n[Inquiry Message - ${new Date().toLocaleDateString()}]: `;
        const updatedNotes = lead.notes 
          ? `${lead.notes}${datePrefix}${custContactMsg}` 
          : `${datePrefix}${custContactMsg}`;

        await api.realEstate.leads.update(lead.id, {
          ...lead,
          notes: updatedNotes
        });
        alert('Message sent successfully to your advisor!');
        setCustContactMsg('');
        fetchRealEstateResources();
      } else {
        const payload = {
          projectId,
          name: userName || 'Customer Client',
          mobile: userPhone || 'N/A',
          email: clientEmail || '',
          budget: 0,
          propertyName: 'Broker Inquiry',
          message: custContactMsg,
          status: 'New',
          notes: `[Inquiry - ${new Date().toLocaleDateString()}]: ${custContactMsg}`
        };
        await api.realEstate.leads.create(payload);
        alert('Message registered successfully as a new inquiry!');
        setCustContactMsg('');
        fetchRealEstateResources();
      }
    };

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-800 space-y-6 max-w-xl mx-auto animate-fade-in">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase">💬 Message My Property Advisor</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Direct chat channel with your dedicated real estate advisor</p>
          </div>
          {advisor && (
            <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 py-0.5 rounded-full font-bold">
              Advisor: {advisor.name}
            </span>
          )}
        </div>

        <form onSubmit={handleSendMsg} className="space-y-4">
          <div>
            <label className="block text-[9px] font-bold text-slate-505 uppercase tracking-wider mb-1">Message Content</label>
            <textarea
              rows={5}
              required
              placeholder="Type your message, details required or questions about properties..."
              value={custContactMsg}
              onChange={(e) => setCustContactMsg(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none font-semibold text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow text-xs cursor-pointer"
          >
            ✉️ Send message to Advisor
          </button>
        </form>
      </div>
    );
  };

  // 12) Track Booking
  const renderCustTrackBookingPanel = () => {
    const sale = reSales.find(s => s.clientEmail === clientEmail);
    const hasDocUploaded = custDocsList.length > 2;
    const hasPayments = rePayments.some(pay => sale && pay.saleId === sale.id);

    const stages = [
      { step: 1, label: 'Booking Registered', desc: 'Property purchase application registered in Spring system', done: !!sale },
      { step: 2, label: 'KYC Document Verification', desc: 'Uploaded ID proofs verify checked by Admin', done: hasDocUploaded },
      { step: 3, label: 'Allotment Letter Issued', desc: 'Property unit final allotment agreement issued', done: !!sale },
      { step: 4, label: 'Payment Clearance ledger', desc: 'Property super built-up value booking payments cleared', done: hasPayments },
      { step: 5, label: 'Handover & registry registry', desc: 'Physical possession keys registry completed', done: sale ? sale.status === 'Completed' : false }
    ];

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-800 space-y-6 animate-fade-in max-w-2xl mx-auto">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-909 text-xs uppercase">⚙️ Real Estate Booking Tracker</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Track the progress status of your registered property booking</p>
        </div>

        {!sale ? (
          <div className="text-center py-12 space-y-3">
            <div className="text-4xl">🏢</div>
            <p className="text-slate-400 italic">You do not have any registered active bookings under this email.</p>
            <p className="text-[10px] text-indigo-600 font-bold">Please search property listings and submit site visit tour request to start!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-indigo-700 uppercase tracking-wider block">Currently Booking</span>
                <span className="text-sm font-black text-slate-900">{sale.propertyName}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Booking Value</span>
                <span className="text-sm font-black text-slate-900">₹{sale.salePrice?.toLocaleString()}</span>
              </div>
            </div>

            <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {stages.map((st) => (
                <div key={st.step} className="relative">
                  <span className={`absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center border font-bold text-[10px] ${
                    st.done
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                    {st.done ? '✓' : st.step}
                  </span>
                  <div>
                    <h4 className={`font-extrabold text-slate-900 text-[12px] ${st.done ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {st.label}
                    </h4>
                    <p className="text-[10px] text-slate-450 font-semibold mt-0.5">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 13) Property Features Panel
  const renderCustFeaturesPanel = () => {
    const uniqueAmenities = new Set<string>();
    products.forEach(p => {
      const info = parseVariants(p.variants);
      if (info.amenities) {
        info.amenities.split(',').forEach((am: string) => {
          if (am.trim()) uniqueAmenities.add(am.trim());
        });
      }
    });

    const dynamicAmenitiesList = Array.from(uniqueAmenities);

    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <h2 className="text-xl font-extrabold tracking-tight">🏢 Premium Project Features & Specifications</h2>
          <p className="text-slate-300 text-[11px] mt-1 max-w-2xl">
            Explore the high-end project specifications, construction standards, and world-class amenities integrated across our properties.
          </p>
        </div>

        {/* Dynamic Amenities from listings */}
        {dynamicAmenitiesList.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-xs uppercase mb-3">🌟 Active Property Amenities (Synced from Listings)</h3>
            <div className="flex flex-wrap gap-2.5">
              {dynamicAmenitiesList.map((am, i) => (
                <span key={i} className="bg-indigo-50 border border-indigo-150 text-indigo-755 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  ✨ {am}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Global Standard Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow transition">
            <span className="text-2xl">🏊‍♂️</span>
            <h4 className="font-extrabold text-slate-900 text-xs">Infinity Swimming Pool</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              Temperature-controlled rooftop pool with lounge chairs and kid safe play area pool access.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow transition">
            <span className="text-2xl">🏋️‍♀️</span>
            <h4 className="font-extrabold text-slate-900 text-xs">State-of-the-Art Gymnasium</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              Fully equipped health center with cardio machines, weights, and private yoga/pilates rooms.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow transition">
            <span className="text-2xl">🚨</span>
            <h4 className="font-extrabold text-slate-900 text-xs">5-Tier Security System</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              24/7 CCTV surveillance, smart card access control, intercom connection, and biometric locks.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow transition">
            <span className="text-2xl">🔋</span>
            <h4 className="font-extrabold text-slate-900 text-xs">100% Power Backup</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              Automatic silence-shield diesel generator backup for both individual units and common spaces.
            </p>
          </div>
        </div>

        {/* Project Technical Specifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-xs uppercase border-b border-slate-100 pb-2">📋 Technical Specifications Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] font-semibold text-slate-600 leading-relaxed">
            <div className="space-y-3">
              <div>
                <span className="text-indigo-650 font-bold block text-[10px] uppercase tracking-wider">🏗️ Structural Foundation</span>
                <p className="text-slate-500 mt-0.5">Seismic Zone II compliant RCC framed design structure to ensure maximum safety and structural longevity.</p>
              </div>
              <div>
                <span className="text-indigo-650 font-bold block text-[10px] uppercase tracking-wider">🧱 Wall Finishes & Paint</span>
                <p className="text-slate-500 mt-0.5">Interior walls finished with smooth acrylic emulsion paint, exterior walls finished with weatherproof texture paint.</p>
              </div>
              <div>
                <span className="text-indigo-650 font-bold block text-[10px] uppercase tracking-wider">🪵 Doors & Windows</span>
                <p className="text-slate-500 mt-0.5">Main entrance door with solid teakwood frame. Balconies equipped with UPVC sliding doors and mosquito mesh panels.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-indigo-650 font-bold block text-[10px] uppercase tracking-wider">⚡ Electrical Configurations</span>
                <p className="text-slate-500 mt-0.5">Concealed flame-retardant wiring, modular switches (Legrand/Schneider), AC points in all bedrooms and living spaces.</p>
              </div>
              <div>
                <span className="text-indigo-650 font-bold block text-[10px] uppercase tracking-wider">🚰 Water Supply & Piping</span>
                <p className="text-slate-500 mt-0.5">Dual-pipe water supply with integrated rainwater harvesting systems, solar water heater provisions, and organic waste convertors.</p>
              </div>
              <div>
                <span className="text-indigo-650 font-bold block text-[10px] uppercase tracking-wider">🛋️ Smart Home Automation</span>
                <p className="text-slate-500 mt-0.5">Video door phone intercom, smart lighting control compatibility, and pre-wired high speed fiber optic connectivity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 14) Save Property Panel (Saved Properties)
  const renderCustSavedPropertiesPanel = () => {
    const wishProps = products.filter(p => p.id !== undefined && custWishlistIds.includes(p.id));
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-xs">⭐️ Saved Properties Registry</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">List of properties saved to your customer profile for active follow-ups</p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-150">
            {wishProps.length} Saved Units
          </span>
        </div>

        {wishProps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 italic">
            You do not have any properties saved to your profile yet. Browse the listing catalog to save!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishProps.map((p) => {
              const info = parseVariants(p.variants);
              return (
                <div key={p.id} className="bg-white border border-slate-200 rounded-3xl shadow-sm flex overflow-hidden">
                  <img src={p.imageUrl || '/images/property_placeholder.png'} className="w-1/3 object-cover bg-slate-50 border-r border-slate-200" alt="" />
                  <div className="w-2/3 p-5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-extrabold text-slate-900 text-xs leading-snug">{p.name}</h4>
                        <button
                          onClick={() => handleToggleWishlist(p.id || 0)}
                          className="text-rose-600 text-xs hover:scale-110 transition bg-transparent border-0 cursor-pointer"
                        >
                          ❤️
                        </button>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">📍 {p.brand || 'N/A'}</span>
                      <div className="flex gap-2 text-[9px] text-slate-500 font-bold mt-2.5">
                        <span>{info.bedrooms} BHK</span> • <span>{info.area}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-2.5">
                      <span className="text-xs font-black text-indigo-650">₹{p.price?.toLocaleString()}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setCustSelectedPropForModal(p)}
                          className="bg-indigo-55 hover:bg-indigo-100 text-indigo-700 font-bold px-2 py-1.5 rounded-xl text-[9px] transition cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setCustVisitPropId(String(p.id));
                            setActiveTab('cust_book_visit');
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1.5 rounded-xl text-[9px] transition cursor-pointer"
                        >
                          Book Visit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 15) Download Invoice Panel
  const renderCustDownloadInvoicePanel = () => {
    const customerInvoices = reInvoices.filter(inv => inv.clientEmail === clientEmail);

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in max-w-3xl mx-auto">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-905 uppercase text-xs">📄 Client Invoice & Tax Receipts Manager</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">View and download/print all invoices and billing receipts issued by Admin</p>
          </div>
          <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold border border-indigo-150">
            {customerInvoices.length} Invoices
          </span>
        </header>

        <div className="p-6 space-y-4">
          {customerInvoices.length === 0 ? (
            <div className="text-center py-12 text-slate-400 italic">
              No tax invoices have been generated for your account email yet.
            </div>
          ) : (
            <div className="space-y-4">
              {customerInvoices.map((inv) => (
                <div key={inv.id} className="p-4 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-200 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800 text-xs">{inv.invoiceNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{inv.propertyName}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold">Date Clearance: {inv.issueDate}</p>
                  </div>

                  <div className="flex items-center gap-4 justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Total Amount</span>
                      <span className="text-sm font-black text-indigo-650">₹{inv.total?.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setReSelectedInvoice(inv)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] transition shadow cursor-pointer flex items-center gap-1.5"
                    >
                      Download Invoice 🖨️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPropertyInquiriesPanel = () => {
    const userInquiries = realEstateInquiries.filter((inq) => inq.clientEmail === clientEmail);

    const handleCancelInquiry = (id: number) => {
      const updated = realEstateInquiries.filter((inq) => inq.id !== id);
      saveInquiriesToStorage(updated);
    };

    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-900 uppercase">🏡 My Property Consultation Inquiries</h3>
            <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 border border-indigo-250 rounded-full font-bold">
              Real Estate Leads
            </span>
          </header>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="p-4 pl-6">Property Name</th>
                  <th className="p-4">Niche Type</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Inquiry Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {userInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-400 font-medium">
                      You have not sent any property inquiries yet. Browse property catalog to submit.
                    </td>
                  </tr>
                ) : (
                  userInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50">
                      <td className="p-4 pl-6 font-bold text-slate-900">{inq.propertyName}</td>
                      <td className="p-4 font-semibold text-slate-655">{inq.niche}</td>
                      <td className="p-4 font-semibold text-slate-500">{inq.date}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700">
                          {inq.status === 'Pending' ? 'Pending Agent Contact' : inq.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => handleCancelInquiry(inq.id)}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 rounded-lg text-[10px] font-bold border border-rose-100 transition cursor-pointer"
                        >
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- REAL ESTATE ADMIN PORTAL CUSTOM PANELS RENDERERS ---

  // 1. Overview Dashboard Panel
  const renderReOverviewPanel = () => {
    const totalSalesVolume = reSales.reduce((acc, s) => acc + (s.salePrice || 0), 0);
    const totalCommissions = reSales.reduce((acc, s) => acc + (s.commissionAmount || 0), 0);
    const activeLeads = reLeads.filter(l => l.status !== 'Closed' && l.status !== 'Lost');
    const recentVisits = [...reVisits].sort((a, b) => b.id - a.id).slice(0, 5);
    const recentLeads = [...reLeads].sort((a, b) => b.id - a.id).slice(0, 5);

    return (
      <div className="space-y-6 animate-fade-in text-xs text-slate-800">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Properties Listed</span>
            <h2 className="text-xl font-extrabold text-slate-900">{products.length}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Active items in catalog</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Leads</span>
            <h2 className="text-xl font-extrabold text-indigo-650">{activeLeads.length}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">In progress pipeline</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sales Volume</span>
            <h2 className="text-xl font-extrabold text-emerald-600">₹{totalSalesVolume.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Total property bookings value</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Commissions Tracker</span>
            <h2 className="text-xl font-extrabold text-amber-600">₹{totalCommissions.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Broker payout tracking</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase">Recent Leads</h3>
              <button onClick={() => setActiveTab('leads')} className="text-[10px] font-bold text-indigo-650 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3">
              {recentLeads.length === 0 ? (
                <p className="text-slate-400 italic text-center py-4">No recent inquiries.</p>
              ) : (
                recentLeads.map(lead => (
                  <div key={lead.id} className="flex justify-between items-center py-1">
                    <div>
                      <span className="font-bold text-slate-900 block">{lead.name}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{lead.mobile} • {lead.email}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-700 block">{lead.propertyName || 'General Inquiry'}</span>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mt-0.5 ${
                        lead.status === 'New' ? 'bg-indigo-50 text-indigo-700' :
                        lead.status === 'Contacted' ? 'bg-blue-50 text-blue-700' :
                        lead.status === 'Closed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>{lead.status || 'New'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Site Visits */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase">Upcoming / Recent Site Visits</h3>
              <button onClick={() => setActiveTab('visits')} className="text-[10px] font-bold text-indigo-655 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3">
              {recentVisits.length === 0 ? (
                <p className="text-slate-400 italic text-center py-4">No site visits scheduled.</p>
              ) : (
                recentVisits.map(visit => (
                  <div key={visit.id} className="flex justify-between items-center py-1">
                    <div>
                      <span className="font-bold text-slate-900 block">{visit.clientName}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{visit.visitDate} • {visit.visitTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-655 block">{visit.propertyName}</span>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mt-0.5 ${
                        visit.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        visit.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>{visit.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Properties Listing CRUD Panel
  const renderRePropertiesPanel = () => {
    if (showPropForm) {
      return (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm animate-fade-in text-xs text-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-150">
            <h3 className="font-bold text-slate-900 text-sm uppercase">
              {rePropId ? '✏️ Edit Property Listing' : '🏢 Add New Property Listing'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowPropForm(false);
                resetPropertyForm();
              }}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold transition text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={(e) => {
            handleSaveProperty(e);
            setShowPropForm(false);
          }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Property Name *</label>
                <input
                  type="text"
                  required
                  value={rePropName}
                  onChange={(e) => setRePropName(e.target.value)}
                  placeholder="e.g. 3 BHK Premium Luxury Apartment"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Property Type *</label>
                <select
                  value={rePropType}
                  onChange={(e) => setRePropType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Rental">Rental</option>
                  <option value="Builder">Builder Floor</option>
                  <option value="Luxury">Luxury Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={rePropPrice}
                  onChange={(e) => setRePropPrice(e.target.value)}
                  placeholder="e.g. 12500000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={rePropLocation}
                  onChange={(e) => setRePropLocation(e.target.value)}
                  placeholder="e.g. Sector 62, Noida"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Area (sqft)</label>
                <input
                  type="text"
                  value={rePropArea}
                  onChange={(e) => setRePropArea(e.target.value)}
                  placeholder="e.g. 1800 sqft"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={rePropBedrooms}
                    onChange={(e) => setRePropBedrooms(e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={rePropBathrooms}
                    onChange={(e) => setRePropBathrooms(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Amenities (comma-separated)</label>
              <input
                type="text"
                value={rePropAmenities}
                onChange={(e) => setRePropAmenities(e.target.value)}
                placeholder="e.g. Swimming Pool, Gym, Club House, 24x7 Security"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
              <textarea
                value={rePropDescription}
                onChange={(e) => setRePropDescription(e.target.value)}
                placeholder="Describe the property layout, benefits, environment, etc."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Video Walkthrough URL</label>
                <input
                  type="text"
                  value={rePropVideo}
                  onChange={(e) => setRePropVideo(e.target.value)}
                  placeholder="e.g. https://youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Brochure/Documents Link</label>
                <input
                  type="text"
                  value={rePropDocs}
                  onChange={(e) => setRePropDocs(e.target.value)}
                  placeholder="e.g. Google Drive PDF brochure link"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Property Images File Uploader</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePropImagesUpload}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-655"
              />
              {rePropImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {rePropImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded border border-slate-200 bg-white overflow-hidden group">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={() => setRePropImages(rePropImages.filter((_, i) => i !== idx))}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowPropForm(false);
                  resetPropertyForm();
                }}
                className="px-5 py-2.5 border border-slate-200 rounded-xl font-bold transition text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow transition cursor-pointer"
              >
                {rePropId ? 'Save Changes' : 'Create Property listing'}
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in text-xs text-slate-800">
        <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search properties by name/location..."
              value={rePropSearchQuery}
              onChange={(e) => setRePropSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-xs w-64"
            />
          </div>
          <button
            onClick={() => {
              resetPropertyForm();
              setShowPropForm(true);
            }}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
          >
            <span>Add Property Listing</span>
            <span>+</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products
            .filter(p => {
              const query = rePropSearchQuery.toLowerCase();
              return p.name.toLowerCase().includes(query) || (p.brand && p.brand.toLowerCase().includes(query));
            })
            .map(p => {
              const parsed = parseVariants(p.variants);
              const firstImage = p.imageUrl ? p.imageUrl.split('|')[0] : '/images/property_placeholder.png';
              return (
                <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col justify-between group">
                  <div>
                    <div className="relative h-44 bg-slate-50 overflow-hidden">
                      <img src={firstImage} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.name} />
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white rounded-lg text-[9px] font-bold px-2 py-0.5 shadow-sm">
                        {p.category || 'Residential'}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white font-extrabold text-[10px] shadow-sm">
                        ₹{p.price?.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-extrabold text-slate-800 text-sm truncate">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.brand || 'Location N/A'}</p>
                      
                      <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500 font-semibold border-t border-slate-100/50">
                        {parsed.area && <span>📐 {parsed.area}</span>}
                        {parsed.bedrooms && <span>🛏️ {parsed.bedrooms} Bed</span>}
                        {parsed.bathrooms && <span>🛁 {parsed.bathrooms} Bath</span>}
                      </div>

                      {parsed.amenities && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {parsed.amenities.split(',').slice(0, 3).map((am: string, i: number) => (
                            <span key={i} className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{am.trim()}</span>
                          ))}
                          {parsed.amenities.split(',').length > 3 && (
                            <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold">+{parsed.amenities.split(',').length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                    <button
                      onClick={() => {
                        handleEditPropertyClick(p);
                        setShowPropForm(true);
                      }}
                      className="flex-1 py-2 border border-slate-200 hover:bg-slate-100/50 text-slate-700 rounded-lg font-bold text-[10px] transition cursor-pointer"
                    >
                      Edit Listing
                    </button>
                    <button
                      onClick={() => p.id && handleDeleteProperty(p.id)}
                      className="py-2 px-3 bg-rose-50 hover:bg-rose-105 text-rose-600 rounded-lg font-bold text-[10px] transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  // 3. Leads Management CRM Panel
  const handleSaveLeadNotes = async (lead: any, text: string) => {
    try {
      await api.realEstate.leads.update(lead.id, {
        ...lead,
        notes: text
      });
      alert('Notes saved successfully!');
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
      alert('Failed to save notes.');
    }
  };

  const handleAssignBrokerToLead = async (lead: any, brokerIdVal: string) => {
    const brokerId = brokerIdVal ? parseInt(brokerIdVal, 10) : null;
    try {
      await api.realEstate.leads.update(lead.id, {
        ...lead,
        assignedBrokerId: brokerId
      });
      alert('Broker assigned successfully!');
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
      alert('Failed to assign broker.');
    }
  };

  const handleUpdateLeadStatus = async (lead: any, status: string) => {
    try {
      await api.realEstate.leads.update(lead.id, {
        ...lead,
        status
      });
      alert('Lead status updated!');
      fetchRealEstateResources();
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  const renderReLeadsPanel = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-905 uppercase text-xs">👥 Real Estate Leads Pipeline</h3>
          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Inquiries Feed</span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Client Info</th>
                <th className="p-4">Interested Property</th>
                <th className="p-4">Assigned Broker</th>
                <th className="p-4">Stage Status</th>
                <th className="p-4">Inquiry Message / Notes</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400 italic">No customer leads found yet.</td>
                </tr>
              ) : (
                reLeads.map((lead) => {
                  const currentNotes = leadNotesTexts[lead.id] !== undefined ? leadNotesTexts[lead.id] : (lead.notes || '');
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/50">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{lead.mobile} • {lead.email}</div>
                        {lead.budget && <div className="text-[10px] text-emerald-650 font-bold mt-0.5">Budget: ₹{lead.budget.toLocaleString()}</div>}
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-700 block">{lead.propertyName || `Property ID: #${lead.propertyId}`}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">Submitted: {lead.createdDate || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.assignedBrokerId || ''}
                          onChange={(e) => handleAssignBrokerToLead(lead, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-semibold outline-none focus:bg-white transition cursor-pointer text-slate-750"
                        >
                          <option value="">-- Assign Agent --</option>
                          {reBrokers.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => handleUpdateLeadStatus(lead, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-semibold outline-none focus:bg-white transition cursor-pointer text-slate-750"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Scheduled">Scheduled Visit</option>
                          <option value="Closed">Closed / Deal Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td className="p-4 space-y-1 max-w-xs">
                        {lead.message && <div className="text-slate-500 italic text-[10px]">“{lead.message}”</div>}
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={currentNotes}
                            onChange={(e) => setLeadNotesTexts({...leadNotesTexts, [lead.id]: e.target.value})}
                            placeholder="Add notes..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none text-slate-800"
                          />
                          <button
                            onClick={() => handleSaveLeadNotes(lead, currentNotes)}
                            className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-605 px-2 py-1 rounded text-[9px] font-bold transition cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={async () => {
                            if (!confirm('Are you sure you want to delete this lead?')) return;
                            await api.realEstate.leads.delete(lead.id);
                            fetchRealEstateResources();
                          }}
                          className="text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2 py-1 rounded border border-rose-100 transition cursor-pointer text-[10px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 4. Customer Database CRM Panel
  const renderReCustomersPanel = () => {
    const customersMap: { [email: string]: any } = {};
    
    // Aggregate customers from leads
    reLeads.forEach(lead => {
      if (lead.email) {
        if (!customersMap[lead.email]) {
          customersMap[lead.email] = {
            name: lead.name,
            email: lead.email,
            phone: lead.mobile || 'N/A',
            source: 'Inquiry Lead',
          };
        }
      }
    });

    // Seed from registered customers
    customersList.forEach((cust: any) => {
      if (cust.email) {
        customersMap[cust.email] = {
          name: cust.name,
          email: cust.email,
          phone: cust.phone || 'N/A',
          source: 'Registered User',
          address: cust.address || '',
        };
      }
    });

    const uniqueCustomers = Object.values(customersMap);

    if (selectedCustomerEmail) {
      const customer = uniqueCustomers.find(c => c.email === selectedCustomerEmail) || {
        name: 'Client',
        email: selectedCustomerEmail,
        phone: 'N/A',
        source: 'Unknown'
      };

      const customerLeads = reLeads.filter(l => l.email === selectedCustomerEmail);
      const customerVisits = reVisits.filter(v => {
        const lead = reLeads.find(l => l.id === v.leadId);
        return lead?.email === selectedCustomerEmail || v.clientName?.toLowerCase() === customer.name?.toLowerCase();
      });
      const customerSales = reSales.filter(s => s.clientEmail === selectedCustomerEmail);
      
      const storedNotesKey = `re_cust_notes_${projectId}_${selectedCustomerEmail}`;
      const savedNotes = localStorage.getItem(storedNotesKey) || '';

      return (
        <div className="space-y-6 animate-fade-in text-xs text-slate-800">
          <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤝</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{customer.name}</h4>
                <p className="text-[10px] text-slate-400 font-semibold">{customer.email} • Phone: {customer.phone}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCustomerEmail(null);
                setCustomerNotesText('');
              }}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold transition text-slate-655 cursor-pointer"
            >
              Back to List
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Notes & Basic details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">Customer Notes</h3>
              <textarea
                value={customerNotesText}
                onChange={(e) => setCustomerNotesText(e.target.value)}
                placeholder="Type customer notes, timeline preferences, callback dates..."
                rows={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:bg-white focus:border-indigo-650 transition text-[11px] text-slate-850 font-medium"
              />
              <button
                onClick={() => {
                  localStorage.setItem(storedNotesKey, customerNotesText);
                  alert('Customer notes saved locally!');
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow cursor-pointer text-center"
              >
                Save Customer Notes
              </button>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-[10px] text-slate-500 font-semibold">
                <p>⚙️ **Data Source**: {customer.source}</p>
                {customer.address && <p>📍 **Saved Address**: {customer.address}</p>}
              </div>
            </div>

            {/* Right Column: Interaction History Timeline */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">Client Interaction History</h3>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {/* Leads */}
                {customerLeads.map(l => (
                  <div key={`l-${l.id}`} className="border-l-2 border-indigo-500 pl-4 py-1 relative">
                    <span className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-800">Inquiry Lead Submitted</span>
                      <span className="text-[9px] text-slate-400 font-bold">{l.createdDate || 'Just Now'}</span>
                    </div>
                    <p className="text-[10px] text-slate-550 mt-1">Property: **{l.propertyName || `ID: #${l.propertyId}`}** • Budget: ₹{l.budget?.toLocaleString()}</p>
                    {l.message && <p className="text-[10px] text-slate-400 italic mt-0.5">“{l.message}”</p>}
                    <span className="inline-block mt-1 bg-indigo-50 text-indigo-700 text-[8px] font-bold px-1.5 py-0.5 rounded">Status: {l.status}</span>
                  </div>
                ))}

                {/* Visits */}
                {customerVisits.map(v => (
                  <div key={`v-${v.id}`} className="border-l-2 border-amber-500 pl-4 py-1 relative">
                    <span className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-800">Site Visit Scheduled</span>
                      <span className="text-[9px] text-slate-400 font-bold">{v.visitDate} @ {v.visitTime}</span>
                    </div>
                    <p className="text-[10px] text-slate-550 mt-1">Property: **{v.propertyName}** • Agent: **{v.brokerName}**</p>
                    {v.feedback && <p className="text-[10px] text-slate-400 italic mt-0.5">Feedback: “{v.feedback}”</p>}
                    <span className="inline-block mt-1 bg-amber-50 text-amber-700 text-[8px] font-bold px-1.5 py-0.5 rounded">Visit Status: {v.status}</span>
                  </div>
                ))}

                {/* Sales */}
                {customerSales.map(s => (
                  <div key={`s-${s.id}`} className="border-l-2 border-emerald-500 pl-4 py-1 relative">
                    <span className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-800">Property Sale Booked 🎉</span>
                      <span className="text-[9px] text-slate-400 font-bold">{s.saleDate}</span>
                    </div>
                    <p className="text-[10px] text-slate-550 mt-1">Property: **{s.propertyName}** • Price: **₹{s.salePrice?.toLocaleString()}**</p>
                    <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded">Status: {s.status}</span>
                  </div>
                ))}

                {customerLeads.length === 0 && customerVisits.length === 0 && customerSales.length === 0 && (
                  <p className="text-slate-400 italic text-center py-8">No interaction records found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs text-slate-800 animate-fade-in">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-905 uppercase text-xs">🤝 Customers & Accounts Database</h3>
          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">CRM Leads List</span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Client Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Database Source</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {uniqueCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400 italic">No customer logs found.</td>
                </tr>
              ) : (
                uniqueCustomers.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-4 pl-6 font-bold text-slate-900">{c.name}</td>
                    <td className="p-4 text-slate-600 font-semibold">{c.email}</td>
                    <td className="p-4 text-slate-605 font-semibold">{c.phone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${c.source.includes('Reg') ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'}`}>
                        {c.source}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => {
                          setSelectedCustomerEmail(c.email);
                          const storedNotesKey = `re_cust_notes_${projectId}_${c.email}`;
                          setCustomerNotesText(localStorage.getItem(storedNotesKey) || '');
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[10px] transition shadow cursor-pointer"
                      >
                        View Profile & History ➔
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 5. Broker / Agent management Panel
  const renderReAgentsPanel = () => {
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        {/* Toggle Form / List Header */}
        <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
          <h3 className="font-bold text-slate-905 uppercase text-xs">🏢 Real Estate Brokers Directory</h3>
          <button
            onClick={() => {
              setShowBrokerForm(!showBrokerForm);
              resetBrokerForm();
            }}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow cursor-pointer text-xs"
          >
            {showBrokerForm ? 'Close Form' : 'Add Broker / Agent +'}
          </button>
        </div>

        {showBrokerForm && (
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm animate-fade-in space-y-4">
            <h3 className="font-bold text-slate-800 uppercase text-xs">Register New Agency Broker</h3>
            <form onSubmit={handleSaveBroker} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Agent Name *</label>
                <input
                  type="text"
                  required
                  value={reBrokerName}
                  onChange={(e) => setReBrokerName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={reBrokerEmail}
                  onChange={(e) => setReBrokerEmail(e.target.value)}
                  placeholder="rahul@agency.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={reBrokerPhone}
                  onChange={(e) => setReBrokerPhone(e.target.value)}
                  placeholder="+91 99887 76655"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Specialization</label>
                <select
                  value={reBrokerSpecialization}
                  onChange={(e) => setReBrokerSpecialization(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                >
                  <option value="Residential">Residential Only</option>
                  <option value="Commercial">Commercial Spacing</option>
                  <option value="Rentals">Rentals Specialist</option>
                  <option value="Luxury">Luxury & Villas</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={reBrokerCommission}
                  onChange={(e) => setReBrokerCommission(e.target.value)}
                  placeholder="e.g. 2.5"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Notes</label>
                <input
                  type="text"
                  value={reBrokerNotes}
                  onChange={(e) => setReBrokerNotes(e.target.value)}
                  placeholder="Top producer, speaks English/Hindi..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                />
              </div>
              <div className="md:col-span-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBrokerForm(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow transition cursor-pointer"
                >
                  Save Broker details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Brokers Performance Tracker Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 uppercase">Agent performance & Commission ledger</h3>
            <span className="text-[9px] bg-slate-100 text-slate-505 px-2 py-0.5 rounded-full font-bold">Live Stats</span>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="p-4 pl-6">Broker Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Assigned Leads</th>
                  <th className="p-4">Visits Logged</th>
                  <th className="p-4">Deals Closed</th>
                  <th className="p-4">Commission Rate</th>
                  <th className="p-4 font-bold text-emerald-650">Commissions Earned</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reBrokers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-400 italic">No brokers registered.</td>
                  </tr>
                ) : (
                  reBrokers.map(broker => {
                    const assignedLeads = reLeads.filter(l => l.assignedBrokerId === broker.id).length;
                    const visitsLogged = reVisits.filter(v => v.brokerId === broker.id).length;
                    const brokerSalesList = reSales.filter(s => s.brokerId === broker.id);
                    const dealsClosed = brokerSalesList.length;
                    const commissionEarned = brokerSalesList.reduce((acc, s) => acc + (s.commissionAmount || 0), 0);

                    return (
                      <tr key={broker.id} className="hover:bg-slate-50/50">
                        <td className="p-4 pl-6">
                          <div className="font-bold text-slate-900">{broker.name}</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase">{broker.specialization || 'General'}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-700">{broker.email}</div>
                          <div className="text-[10px] text-slate-450">{broker.phone || 'N/A'}</div>
                        </td>
                        <td className="p-4 font-bold text-slate-800">{assignedLeads} leads</td>
                        <td className="p-4 font-semibold text-slate-600">{visitsLogged} visits</td>
                        <td className="p-4 font-extrabold text-slate-800">{dealsClosed} deals</td>
                        <td className="p-4 font-bold text-slate-600">{broker.commissionRate || 2.5}%</td>
                        <td className="p-4 font-black text-emerald-600">₹{commissionEarned.toLocaleString()}</td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setReBrokerId(broker.id);
                                setReBrokerName(broker.name || '');
                                setReBrokerEmail(broker.email || '');
                                setReBrokerPhone(broker.phone || '');
                                setReBrokerSpecialization(broker.specialization || 'Residential');
                                setReBrokerCommission(String(broker.commissionRate || '2.5'));
                                setReBrokerNotes(broker.notes || '');
                                setShowBrokerForm(true);
                              }}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 rounded text-[9px] font-bold text-slate-700 transition cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBroker(broker.id)}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 rounded text-[9px] font-bold text-rose-650 transition cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 6. Site Visits scheduling Panel
  const renderReVisitsPanel = () => {
    const sortedVisits = [...reVisits].sort((a, b) => b.id - a.id);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-slate-800 items-start animate-fade-in">
        {/* Left Column: Schedule Site Visit Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">Schedule Client Site Visit</h3>
          
          <form onSubmit={handleScheduleVisit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Select Client Lead *</label>
              <select
                required
                value={reVisitLeadId}
                onChange={(e) => setReVisitLeadId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              >
                <option value="">-- Choose Lead --</option>
                {reLeads.map(l => (
                  <option key={l.id} value={l.id}>{l.name} ({l.propertyName || 'Inquiry'})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Select Property *</label>
              <select
                required
                value={reVisitPropId}
                onChange={(e) => setReVisitPropId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              >
                <option value="">-- Choose Property --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (₹{p.price?.toLocaleString()})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Assign Broker *</label>
              <select
                required
                value={reVisitBrokerId}
                onChange={(e) => setReVisitBrokerId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              >
                <option value="">-- Choose Agent --</option>
                {reBrokers.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.specialization})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Visit Date *</label>
                <input
                  type="date"
                  required
                  value={reVisitDate}
                  onChange={(e) => setReVisitDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Time Slot *</label>
                <input
                  type="text"
                  required
                  value={reVisitTime}
                  onChange={(e) => setReVisitTime(e.target.value)}
                  placeholder="e.g. 11:00 AM"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Initial Status</label>
              <select
                value={reVisitStatus}
                onChange={(e) => setReVisitStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No Show">No Show</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Feedback / Notes</label>
              <textarea
                value={reVisitFeedback}
                onChange={(e) => setReVisitFeedback(e.target.value)}
                placeholder="Notes about client requirements..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow cursor-pointer text-center"
            >
              Confirm Visit Appointment +
            </button>
          </form>
        </div>

        {/* Right Columns: Site Visits Log list */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">Scheduled Visits Log</h3>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {sortedVisits.length === 0 ? (
              <p className="text-slate-400 italic text-center py-8">No site visits scheduled.</p>
            ) : (
              sortedVisits.map(visit => (
                <div key={visit.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm space-y-2 hover:border-slate-350 transition relative group">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">{visit.clientName}</span>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">{visit.visitDate} • {visit.visitTime}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      visit.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      visit.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                      visit.status === 'No Show' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>{visit.status}</span>
                  </div>

                  <div className="text-[10px] text-slate-600 font-semibold space-y-0.5">
                    <p>🏢 Property: **{visit.propertyName}** (ID: #{visit.propertyId})</p>
                    <p>👤 Assigned Agent: **{visit.brokerName}** (ID: #{visit.brokerId})</p>
                    {visit.feedback && <p className="text-slate-450 italic mt-1 bg-white p-2 rounded border border-slate-150">Feedback: “{visit.feedback}”</p>}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateVisitStatus(visit.id, 'Completed')}
                        className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-bold border border-emerald-100 transition cursor-pointer"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => handleUpdateVisitStatus(visit.id, 'No Show')}
                        className="px-2 py-0.5 bg-slate-100 text-slate-605 rounded text-[9px] font-bold border border-slate-200 transition cursor-pointer"
                      >
                        No Show
                      </button>
                      <button
                        onClick={() => handleUpdateVisitStatus(visit.id, 'Cancelled')}
                        className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[9px] font-bold border border-rose-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteVisit(visit.id)}
                      className="text-rose-600 opacity-0 group-hover:opacity-100 text-[10px] font-bold hover:underline transition cursor-pointer"
                    >
                      Delete visit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // 7. Sales, Bookings & Payments Panel
  const renderRePaymentsPanel = () => {
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        {/* Double-Form Split Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form 1: Record a Sale / Booking */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">1. Log Property Sale Booking</h3>
            <form onSubmit={handleAddSale} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Select Property *</label>
                <select
                  required
                  value={reSalePropId}
                  onChange={(e) => setReSalePropId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                >
                  <option value="">-- Choose Property --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Assign Broker Agent</label>
                <select
                  value={reSaleBrokerId}
                  onChange={(e) => setReSaleBrokerId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                >
                  <option value="">-- Choose Broker --</option>
                  {reBrokers.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={reSaleClientName}
                  onChange={(e) => setReSaleClientName(e.target.value)}
                  placeholder="Client Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Client Email</label>
                <input
                  type="email"
                  value={reSaleClientEmail}
                  onChange={(e) => setReSaleClientEmail(e.target.value)}
                  placeholder="client@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Final Sale Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={reSalePrice}
                  onChange={(e) => setReSalePrice(e.target.value)}
                  placeholder="e.g. 9500000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Sale Booking Date *</label>
                <input
                  type="date"
                  value={reSaleDate}
                  onChange={(e) => setReSaleDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow cursor-pointer">
                  Log Sale & Issue Invoice +
                </button>
              </div>
            </form>
          </div>

          {/* Form 2: Log client Payment receipt */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">2. Log Client Payment Receipt</h3>
            <form onSubmit={handleAddPayment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Select Property Sale *</label>
                <select
                  required
                  value={rePaymentSaleId}
                  onChange={(e) => setRePaymentSaleId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                >
                  <option value="">-- Choose Sale Log --</option>
                  {reSales.map(s => (
                    <option key={s.id} value={s.id}>{s.clientName} - {s.propertyName} (Total: ₹{s.salePrice?.toLocaleString()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Amount Paid (₹) *</label>
                <input
                  type="number"
                  required
                  value={rePaymentAmount}
                  onChange={(e) => setRePaymentAmount(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Payment Method</label>
                <select
                  value={rePaymentMethod}
                  onChange={(e) => setRePaymentMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                >
                  <option value="Bank Transfer">Bank Transfer / NEFT</option>
                  <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash Payment</option>
                  <option value="Cheque">Bank Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Payment Date *</label>
                <input
                  type="date"
                  value={rePaymentDate}
                  onChange={(e) => setRePaymentDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Transaction ID / Reference Code</label>
                <input
                  type="text"
                  value={rePaymentTxnId}
                  onChange={(e) => setRePaymentTxnId(e.target.value)}
                  placeholder="e.g. TXN9876543210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow cursor-pointer">
                  Log Payment Receipt +
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Ledger Tables stack */}
        <div className="grid grid-cols-1 gap-6">
          {/* Sales List Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-905 uppercase text-xs">Logged Property Bookings / Sales</h3>
              <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Sales Log</span>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Property Name</th>
                    <th className="p-4">Client Buyer</th>
                    <th className="p-4 font-bold text-indigo-650">Sale Price</th>
                    <th className="p-4 font-bold text-amber-650">Commission Amt</th>
                    <th className="p-4">Booking Date</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reSales.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-400 italic">No sales logs found.</td>
                    </tr>
                  ) : (
                    reSales.map(sale => (
                      <tr key={sale.id} className="hover:bg-slate-50/50">
                        <td className="p-4 pl-6 font-mono font-bold text-slate-455">#{sale.id}</td>
                        <td className="p-4 font-bold text-slate-800">{sale.propertyName}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{sale.clientName}</div>
                          <div className="text-[9px] text-slate-400">{sale.clientEmail}</div>
                        </td>
                        <td className="p-4 font-extrabold text-indigo-600">₹{sale.salePrice?.toLocaleString()}</td>
                        <td className="p-4 font-bold text-amber-600">₹{sale.commissionAmount?.toLocaleString()}</td>
                        <td className="p-4 font-semibold text-slate-600">{sale.saleDate}</td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => handleDeleteSale(sale.id)}
                            className="text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2 py-1 rounded border border-rose-100 transition cursor-pointer text-[10px]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-905 uppercase text-xs">Received Client Payments Ledger</h3>
              <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Ledger Feed</span>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Client / Property details</th>
                    <th className="p-4 font-bold text-emerald-650">Amount Paid</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Transaction Reference</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rePayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-400 italic">No payment transactions.</td>
                    </tr>
                  ) : (
                    rePayments.map(pay => (
                      <tr key={pay.id} className="hover:bg-slate-50/50">
                        <td className="p-4 pl-6 font-mono font-bold text-slate-455">#{pay.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{pay.clientName}</div>
                          <div className="text-[9px] text-slate-500">{pay.propertyName}</div>
                        </td>
                        <td className="p-4 font-black text-emerald-600">₹{pay.amount?.toLocaleString()}</td>
                        <td className="p-4 font-semibold text-slate-600">{pay.paymentDate}</td>
                        <td className="p-4 font-semibold text-slate-655">{pay.paymentMethod}</td>
                        <td className="p-4 font-mono font-semibold text-slate-500">{pay.transactionId || 'N/A'}</td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => handleDeletePayment(pay.id)}
                            className="text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2 py-1 rounded border border-rose-100 transition cursor-pointer text-[10px]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 8. Invoices management & PDF Print Panel
  const renderReInvoicesPanel = () => {
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in relative">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-909 uppercase text-xs">Real Estate Billing Invoices</h3>
            <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Billing Console</span>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="p-4 pl-6">Invoice Number</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4">Service Tax (5%)</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Date Issued</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-slate-400 italic">No invoices issued. Log a sale to generate invoices automatically.</td>
                  </tr>
                ) : (
                  reInvoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="p-4 pl-6 font-mono font-bold text-slate-800">{inv.invoiceNumber}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{inv.clientName}</div>
                        <div className="text-[9px] text-slate-400 font-semibold">{inv.clientEmail}</div>
                      </td>
                      <td className="p-4 font-bold text-slate-700">{inv.propertyName}</td>
                      <td className="p-4 font-semibold text-slate-700">₹{inv.amount?.toLocaleString()}</td>
                      <td className="p-4 font-semibold text-slate-600">₹{inv.tax?.toLocaleString()}</td>
                      <td className="p-4 font-extrabold text-slate-900">₹{inv.total?.toLocaleString()}</td>
                      <td className="p-4 font-semibold text-slate-600">{inv.issueDate}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>{inv.status}</span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setReSelectedInvoice(inv)}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 rounded text-[9px] font-bold border border-indigo-100 transition cursor-pointer"
                          >
                            Print Receipt 🖨️
                          </button>
                          <button
                            onClick={() => handleDeleteInvoice(inv.id)}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-105 text-rose-650 rounded text-[9px] font-bold transition border border-rose-100 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Printable Invoice Modal Overlay */}
        {reSelectedInvoice && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative border border-slate-200 flex flex-col justify-between" id="printable-invoice-modal">
              {/* Styling injection for printing */}
              <style dangerouslySetInnerHTML={{__html: `
                @media print {
                  body { background: white !important; color: black !important; }
                  aside, main, header, div.z-30, div.no-print { display: none !important; }
                  #printable-invoice-modal { display: block !important; position: absolute; left: 0; top: 0; width: 100% !important; margin: 0; padding: 30px; box-shadow: none !important; border: none !important; background: white !important; z-index: 999999 !important; }
                  #printable-invoice-modal * { visibility: visible; }
                  .no-print { display: none !important; }
                }
              `}} />

              {/* Invoice Layout */}
              <div className="space-y-8">
                {/* Header branding */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{companyName}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Premium Real Estate Consultancy</p>
                    <p className="text-[9px] text-slate-450 mt-1">RERA Registered Office • Noida & Bangalore</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">TAX INVOICE RECEIPT</h3>
                    <p className="text-xs font-mono font-bold text-slate-800 mt-1">NO: {reSelectedInvoice.invoiceNumber}</p>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Date: {reSelectedInvoice.issueDate}</p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Bill details */}
                <div className="grid grid-cols-2 gap-6 text-[10px]">
                  <div>
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">CLIENT BILL TO:</h4>
                    <p className="font-bold text-slate-900 text-xs">{reSelectedInvoice.clientName}</p>
                    <p className="text-slate-500 font-semibold">{reSelectedInvoice.clientEmail}</p>
                    <p className="text-slate-405 font-medium mt-1">Authorized Property Buyer Account</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">PROPERTY DETAILS:</h4>
                    <p className="font-bold text-slate-900 text-xs">{reSelectedInvoice.propertyName}</p>
                    <p className="text-slate-505 font-semibold">Asset Transaction Record Scoped</p>
                  </div>
                </div>

                {/* Table breakdown */}
                <div className="border border-slate-150 rounded-xl overflow-hidden mt-6">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 font-bold text-slate-500 uppercase">
                        <th className="p-3">Asset Item Description</th>
                        <th className="p-3 text-right">Booking Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="p-3">
                          <p className="font-bold text-slate-800">{reSelectedInvoice.propertyName}</p>
                          <p className="text-[9px] text-slate-400">Official registry booking and token payment record transfer</p>
                        </td>
                        <td className="p-3 text-right font-bold text-slate-800">
                          ₹{reSelectedInvoice.amount?.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-500 text-right">Subtotal</td>
                        <td className="p-3 text-right font-bold text-slate-700">₹{reSelectedInvoice.amount?.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-500 text-right">Consultancy GST Service Tax (5%)</td>
                        <td className="p-3 text-right font-bold text-slate-700">₹{reSelectedInvoice.tax?.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-900 text-white font-extrabold text-xs">
                        <td className="p-3 text-right uppercase tracking-wider">Grand Total Amount</td>
                        <td className="p-3 text-right">₹{reSelectedInvoice.total?.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Disclaimer / Sign off */}
                <div className="flex justify-between items-end pt-8 text-[9px] text-slate-400">
                  <div className="max-w-xs leading-normal font-semibold">
                    <p>✓ This is a computer generated invoice and requires no physical signature.</p>
                    <p>✓ All payments are subject to RERA regulation bylaws.</p>
                  </div>
                  <div className="text-center w-36">
                    <div className="border-b border-slate-300 h-8" />
                    <p className="mt-1 font-bold text-slate-500">AUTHORIZED SIGNATORY</p>
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="mt-8 flex justify-end gap-3 no-print border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setReSelectedInvoice(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold transition cursor-pointer text-slate-700"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Print PDF</span>
                  <span>🖨️</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 9. Reports & Chart Metrics Panel
  const renderReReportsPanel = () => {
    const totalSalesVolume = reSales.reduce((acc, s) => acc + (s.salePrice || 0), 0);
    const totalCommissions = reSales.reduce((acc, s) => acc + (s.commissionAmount || 0), 0);

    const typeCounts = products.reduce((acc: any, p) => {
      const cat = p.category || 'Residential';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Sales Registered</span>
            <h2 className="text-xl font-extrabold text-slate-900">{reSales.length} Bookings</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Accumulated contracts signed</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sales Value Volume</span>
            <h2 className="text-xl font-extrabold text-emerald-605">₹{totalSalesVolume.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Gross asset values</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Broker Commission</span>
            <h2 className="text-xl font-extrabold text-amber-600">₹{totalCommissions.toLocaleString()}</h2>
            <span className="text-[8px] font-semibold text-slate-500 block mt-1">Paid or pending broker payouts</span>
          </div>
        </div>

        {/* Charts & Listings summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property types distribution */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">Property Listings Distribution</h3>
            <div className="space-y-3">
              {Object.keys(typeCounts).map((cat, idx) => {
                const count = typeCounts[cat];
                const pct = products.length > 0 ? (count / products.length) * 100 : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>{cat}</span>
                      <span>{count} Listings ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              {products.length === 0 && <p className="text-slate-400 italic text-center py-4">No listings cataloged.</p>}
            </div>
          </div>

          {/* Monthly Sales Volumes Graph (mock) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">Agency Monthly Sales Volume</h3>
            <div className="h-32 flex items-end gap-2 pt-2">
              {[15, 30, 25, 45, 60, 80].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 animate-pulse">
                  <div className="w-full bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-end relative group h-24">
                    <div className="w-full bg-emerald-600 rounded-lg" style={{ height: `${val}%` }} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹{val}L</span>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 10. Marketing Campaigns Panel
  const renderReMarketingPanel = () => {
    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">Featured Homepage Listings</h3>
            <p className="text-[10px] text-slate-500 font-semibold leading-normal">
              Toggle specific premium properties to show at the top header slider of the user-facing landing page.
            </p>
            <div className="space-y-2">
              {products.slice(0, 3).map(p => (
                <label key={p.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition">
                  <span className="font-bold text-slate-800">{p.name} ({p.brand})</span>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 w-4 h-4 cursor-pointer" />
                </label>
              ))}
              {products.length === 0 && <p className="text-slate-400 italic text-center">No properties listed to advertise.</p>}
            </div>
            <button onClick={() => alert('Featured ads updated successfully!')} className="w-full py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow cursor-pointer">
              Update Showcase Ads
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">Newsletter Broadcast</h3>
            <p className="text-[10px] text-slate-505 font-semibold leading-normal">
              Send bulk email newsletters displaying newly listed properties to all {reLeads.length} leads in your database.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Campaign Subject</label>
                <input type="text" defaultValue="🏢 New Luxury Apartments Launch in Sector 62, Noida" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-800 font-semibold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Newsletter Body Content</label>
                <textarea rows={3} defaultValue="Dear Valued Client, we are proud to introduce our new residential project featuring 3 BHK luxury options. Enquire now for booking details." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none text-slate-800 font-semibold" />
              </div>
              <button onClick={() => alert('Newsletter broadcasted to all active client leads!')} className="w-full py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow cursor-pointer">
                Send Campaign Broadcast ✉️
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 11. Settings Console Panel
  const handleSaveReSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      alert('Company Name is required.');
      return;
    }
    try {
      await api.realEstate.update(projectId, {
        ...realEstateInfo,
        companyName: companyName.trim(),
        themeColor: realEstateInfo.themeColor
      });
      alert('Agency settings saved successfully!');
      api.realEstate.get(projectId).then(setRealEstateInfo).catch(console.error);
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  const renderReSettingsPanel = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left max-w-xl animate-fade-in">
        <h3 className="font-bold text-slate-800 uppercase pb-2 border-b border-slate-100">
          Agency Portal Settings
        </h3>
        <form onSubmit={handleSaveReSettings} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">
              Agency Name
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">
              Logo Icon / URL
            </label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
              placeholder="e.g. 🏢 or https://..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">
              Theme Color Preset
            </label>
            <select
              value={realEstateInfo?.themeColor || 'slate'}
              onChange={(e) => {
                const val = e.target.value;
                setRealEstateInfo((prev: any) => ({ ...prev, themeColor: val }));
              }}
              className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition cursor-pointer font-bold"
            >
              <option value="slate">Charcoal (Slate)</option>
              <option value="emerald">Emerald Sky (Emerald)</option>
              <option value="deepblue">Navy Ocean (Deep Blue)</option>
              <option value="purple">Cyber Neon (Purple)</option>
              <option value="sunset">Sunset Warm (Sunset)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow cursor-pointer border-none"
          >
            Save Settings
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🏢</span>
            <div className="truncate font-sans">
              <h3 className="font-extrabold text-slate-900 text-sm truncate">{companyName}</h3>
              <span className={`text-[10px] font-extrabold ${theme.accentText} uppercase tracking-widest`}>
                {clientEmail === 'admin@gmail.com' ? 'Prop Admin' : clientEmail === 'broker@gmail.com' ? 'Broker Console' : 'Premium Buyer'}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {clientEmail === 'admin@gmail.com' ? (
              <>
                {[
                  { id: 'overview', label: '📊 Executive Summary' },
                  { id: 'properties', label: '🏢 Listings Registry' },
                  { id: 'leads', label: '👥 Inbound Leads' },
                  { id: 'customers', label: '👤 Client Profiles' },
                  { id: 'agents', label: '👨‍💼 Agent Directory' },
                  { id: 'visits', label: '📅 Site Tours' },
                  { id: 'payments', label: '💵 Payments Ledger' },
                  { id: 'invoices', label: '📄 Invoice Center' },
                  { id: 'reports', label: '📈 Financial Reports' },
                  { id: 'marketing', label: '📢 Campaign Manager' },
                  { id: 'settings', label: '⚙️ Agency Settings' }
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
            ) : clientEmail === 'broker@gmail.com' ? (
              <>
                {[
                  { id: 'broker_overview', label: '📊 Dashboard' },
                  { id: 'broker_leads', label: '👥 Assigned Leads' },
                  { id: 'broker_properties', label: '🏢 Property Listings' },
                  { id: 'broker_visits', label: '📅 Site Visits' },
                  { id: 'broker_followups', label: '📞 Follow-Ups' },
                  { id: 'broker_commission', label: '💵 Commission' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-550'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                  👤 Profile
                </div>
                {[
                  { id: 'cust_profile', label: '👤 Profile Details' },
                  { id: 'cust_address', label: '📍 My Address' },
                  { id: 'cust_documents', label: '📁 Document Vault' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-550'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 py-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-t border-slate-100 mt-2">
                  🏢 Directory
                </div>
                {[
                  { id: 'cust_features', label: '🏢 Featured Properties' },
                  { id: 'cust_search_props', label: '🔍 Search Listings' },
                  { id: 'cust_advanced_filter', label: '🎛️ Advanced Filter' },
                  { id: 'cust_compare_props', label: '⚖️ Compare Properties' },
                  { id: 'cust_wishlist', label: '❤️ Wishlist' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-555 hover:text-slate-900 hover:bg-slate-555'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 py-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-t border-slate-100 mt-2">
                  📈 My Activity
                </div>
                {[
                  { id: 'cust_saved_properties', label: '⭐️ Saved Searches' },
                  { id: 'cust_visits', label: '📅 Site Visits Log' },
                  { id: 'cust_payments', label: '💵 Payments Ledger' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-550'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 py-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-t border-slate-100 mt-2">
                  ⚡ Actions
                </div>
                {[
                  { id: 'cust_book_visit', label: '📝 Schedule Site Tour' },
                  { id: 'cust_contact_broker', label: '💬 Consult Agent' },
                  { id: 'cust_download_invoice', label: '📄 Download Invoice' },
                  { id: 'cust_track_booking', label: '⚡ Deal Tracker' }
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
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Real Estate Network</p>
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-0.5">
                {activeTab.replace('cust_', '').replace('broker_', '').replace('_', ' ')}
              </h1>
            </div>
            <div className="text-[10px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-extrabold text-slate-500 shadow-sm flex items-center gap-2 select-none">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              DATABASE SECURED
            </div>
          </header>

          {/* Tab Content */}
          {clientEmail === 'admin@gmail.com' ? (
            <>
              {activeTab === 'overview' && renderReOverviewPanel()}
              {activeTab === 'properties' && renderRePropertiesPanel()}
              {activeTab === 'leads' && renderReLeadsPanel()}
              {activeTab === 'customers' && renderReCustomersPanel()}
              {activeTab === 'agents' && renderReAgentsPanel()}
              {activeTab === 'visits' && renderReVisitsPanel()}
              {activeTab === 'payments' && renderRePaymentsPanel()}
              {activeTab === 'invoices' && renderReInvoicesPanel()}
              {activeTab === 'reports' && renderReReportsPanel()}
              {activeTab === 'marketing' && renderReMarketingPanel()}
              {activeTab === 'settings' && renderReSettingsPanel()}
            </>
          ) : clientEmail === 'broker@gmail.com' ? (
            <>
              {activeTab === 'broker_overview' && renderBrokerOverviewPanel()}
              {activeTab === 'broker_leads' && renderBrokerLeadsPanel()}
              {activeTab === 'broker_properties' && renderBrokerPropertiesPanel()}
              {activeTab === 'broker_visits' && renderBrokerVisitsPanel()}
              {activeTab === 'broker_followups' && renderBrokerFollowupsPanel()}
              {activeTab === 'broker_commission' && renderBrokerCommissionPanel()}
            </>
          ) : (
            <>
              {activeTab === 'cust_profile' && renderCustProfilePanel()}
              {activeTab === 'cust_address' && renderCustAddressPanel()}
              {activeTab === 'cust_documents' && renderCustDocumentsPanel()}
              {activeTab === 'cust_features' && renderCustFeaturesPanel()}
              {activeTab === 'cust_search_props' && renderCustSearchPropsPanel()}
              {activeTab === 'cust_advanced_filter' && renderCustAdvancedFilterPanel()}
              {activeTab === 'cust_compare_props' && renderCustComparePropsPanel()}
              {activeTab === 'cust_wishlist' && renderCustWishlistPanel()}
              {activeTab === 'cust_saved_properties' && renderCustSavedPropertiesPanel()}
              {activeTab === 'cust_visits' && renderCustVisitsPanel()}
              {activeTab === 'cust_payments' && renderCustPaymentsPanel()}
              {activeTab === 'cust_book_visit' && renderCustBookVisitPanel()}
              {activeTab === 'cust_contact_broker' && renderCustContactBrokerPanel()}
              {activeTab === 'cust_download_invoice' && renderCustDownloadInvoicePanel()}
              {activeTab === 'cust_track_booking' && renderCustTrackBookingPanel()}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
