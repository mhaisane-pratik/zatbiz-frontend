'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Project, Product } from '@/types';
import { useDarkMode } from '@/hooks/useDarkMode';
import { UserProfilePanel } from '../UserPanels';

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

  // Client info (Patient specific)
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userAddressHome, setUserAddressHome] = useState('');

  // Hospital subcategory metadata
  const [hospitalType, setHospitalType] = useState('General Hospital');
  const [hospitalNicheTheme, setHospitalNicheTheme] = useState('vibrant-teal');

  // Multi-Role Resolver
  const getActiveRole = () => {
    const email = clientEmail?.toLowerCase() || '';
    if (email === 'admin@gmail.com') return 'admin';
    if (email === 'doctor@gmail.com') return 'doctor';
    if (email === 'reception@gmail.com') return 'reception';
    if (email === 'nurse@gmail.com') return 'nurse';
    if (email === 'lab@gmail.com') return 'lab';
    if (email === 'pharmacy@gmail.com') return 'pharmacy';
    return 'patient';
  };
  const activeRole = getActiveRole();

  // LocalStorage backed simulated states
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [vitalsLogs, setVitalsLogs] = useState<any[]>([]);
  const [medicineInventory, setMedicineInventory] = useState<any[]>([]);
  const [billingInvoices, setBillingInvoices] = useState<any[]>([]);
  const [clinicalQueue, setClinicalQueue] = useState<any[]>([]);
  const [labTestsList, setLabTestsList] = useState<any[]>([]);

  // Local Form States
  // Appointment Form
  const [bookingFormDoctorId, setBookingFormDoctorId] = useState('');
  const [bookingFormDate, setBookingFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookingFormTime, setBookingFormTime] = useState('10:00 AM');
  const [bookingFormSymtoms, setBookingFormSymtoms] = useState('');

  // Admin: Doctor Profile Form
  const [docFormId, setDocFormId] = useState<number | null>(null);
  const [docFormName, setDocFormName] = useState('');
  const [docFormSpecialty, setDocFormSpecialty] = useState('General Medicine');
  const [docFormFee, setDocFormFee] = useState('600');
  const [docFormBio, setDocFormBio] = useState('');
  const [docFormAvatar, setDocFormAvatar] = useState('');

  // Doctor: Write Consultation Form
  const [newConsultEmail, setNewConsultEmail] = useState('');
  const [newConsultDiagnosis, setNewConsultDiagnosis] = useState('');
  const [newConsultPrescription, setNewConsultPrescription] = useState('');
  const [newConsultAdvice, setNewConsultAdvice] = useState('');
  const [newConsultNeedLabTest, setNewConsultNeedLabTest] = useState(false);
  const [newConsultLabTestName, setNewConsultLabTestName] = useState('Complete Blood Count (CBC)');

  // Receptionist: Registration & Walk-in Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');

  // Nurse: Vital Log Form
  const [vitalEmail, setVitalEmail] = useState('');
  const [vitalBp, setVitalBp] = useState('120/80');
  const [vitalPulse, setVitalPulse] = useState('72');
  const [vitalSpO2, setVitalSpO2] = useState('98');
  const [vitalTemp, setVitalTemp] = useState('98.6');

  // Lab: Report entry
  const [labReportId, setLabReportId] = useState<number | null>(null);
  const [labTestValue, setLabTestValue] = useState('');
  const [labRemarks, setLabRemarks] = useState('');

  // Pharmacy: Inventory Form
  const [medName, setMedName] = useState('');
  const [medStock, setMedStock] = useState('100');
  const [medLocation, setMedLocation] = useState('Rack A-1');
  const [medPrice, setMedPrice] = useState('120');

  // Onboard API data
  const fetchDoctors = () => {
    api.hospital.doctors.list(projectId)
      .then(setProducts)
      .catch((err) => console.error('Error fetching doctors:', err));
  };

  const fetchAppointments = () => {
    setReservationLoading(true);
    const requestPromise = (activeRole === 'admin' || activeRole === 'reception' || activeRole === 'doctor')
      ? api.hospital.appointments.list(projectId)
      : api.hospital.appointments.listByCustomer(projectId, clientEmail);

    requestPromise
      .then((data) => {
        const mapped = data.map(item => ({
          ...item,
          customerName: item.patientName,
          customerEmail: item.patientEmail,
          customerPhone: item.patientPhone,
          tableNumber: item.doctorName,
          notes: item.symptoms
        }));
        setReservations(mapped);
      })
      .catch((err) => console.error('Error fetching appointments:', err))
      .finally(() => setReservationLoading(false));
  };

  // Pre-populate mock clinical data if empty
  const initializeClinicalState = () => {
    try {
      // 1. Hospital Info subcategory
      api.hospital.get(projectId).then((hData) => {
        if (hData && hData.projectId) {
          if (hData.subcategory) setHospitalType(hData.subcategory);
          if (hData.themeColor) setHospitalNicheTheme(hData.themeColor);
        }
      }).catch(console.error);

      // 2. Medical Records
      const savedRecords = localStorage.getItem(`clinic_records_${projectId}`);
      if (savedRecords) {
        setMedicalRecords(JSON.parse(savedRecords));
      } else {
        const defaultRecords = [
          { id: 101, patientEmail: 'patient@gmail.com', date: 'July 5, 2026', diagnosis: 'Chronic Acid Reflux', prescription: 'Omeprazole 20mg - Once daily before breakfast (14 Days)', doctor: 'Dr. Sarah Jenkins', notes: 'Avoid spicy meals, caffeine, and carbonated sodas. Sleep with head elevated.' }
        ];
        localStorage.setItem(`clinic_records_${projectId}`, JSON.stringify(defaultRecords));
        setMedicalRecords(defaultRecords);
      }

      // 3. Vitals Logs (Fetch from backend)
      api.hospital.vitals.list(projectId).then((data) => {
        if (data && data.length > 0) {
          setVitalsLogs(data);
        } else {
          const defaultVital = {
            projectId,
            patientEmail: 'patient@gmail.com',
            bp: '118/76',
            pulse: 74,
            spo2: 99,
            temp: 98.4,
            loggedBy: 'Nurse R. Davis',
            date: 'July 7, 2026'
          };
          api.hospital.vitals.create(defaultVital).then(() => {
            api.hospital.vitals.list(projectId).then(setVitalsLogs);
          });
        }
      }).catch(console.error);

      // 4. Pharmacy stock (Fetch from backend)
      api.hospital.medicine.list(projectId).then((data) => {
        if (data && data.length > 0) {
          setMedicineInventory(data);
        } else {
          const defaultMeds = [
            { projectId, name: 'Paracetamol 650mg', stock: 120, price: 15.0, location: 'Rack A-1', status: 'Available' },
            { projectId, name: 'Amoxicillin 500mg', stock: 85, price: 110.0, location: 'Rack B-3', status: 'Available' },
            { projectId, name: 'Cetirizine 10mg', stock: 200, price: 12.0, location: 'Rack A-4', status: 'Available' }
          ];
          Promise.all(defaultMeds.map(m => api.hospital.medicine.create(m))).then(() => {
            api.hospital.medicine.list(projectId).then(setMedicineInventory);
          });
        }
      }).catch(console.error);

      // 5. Invoices (Fetch from backend)
      api.hospital.invoices.list(projectId).then((data) => {
        if (data && data.length > 0) {
          setBillingInvoices(data);
        } else {
          const defaultInvoice = {
            projectId,
            patientEmail: 'patient@gmail.com',
            doctorFee: 600.0,
            pharmacyCharges: 180.0,
            labCharges: 400.0,
            tax: 0.0,
            total: 1180.0,
            status: 'Paid',
            paymentMethod: 'UPI',
            date: 'July 5, 2026'
          };
          api.hospital.invoices.create(defaultInvoice).then(() => {
            api.hospital.invoices.list(projectId).then(setBillingInvoices);
          });
        }
      }).catch(console.error);

      // 6. Active Queue
      const savedQueue = localStorage.getItem(`clinic_queue_${projectId}`);
      if (savedQueue) {
        setClinicalQueue(JSON.parse(savedQueue));
      } else {
        const defaultQueue = [
          { id: 501, patientName: 'John Doe', email: 'patient@gmail.com', time: '10:15 AM', status: 'In Consultation', doctor: 'Dr. Sarah Jenkins' },
          { id: 502, patientName: 'Robert Vance', email: 'robert@gmail.com', time: '11:00 AM', status: 'Waiting', doctor: 'Dr. John Miller' }
        ];
        localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(defaultQueue));
        setClinicalQueue(defaultQueue);
      }

    } catch (e) {
      console.error('Failed to initialize clinical states:', e);
    }
  };

  useEffect(() => {
    initializeClinicalState();
    fetchDoctors();
    fetchAppointments();

    // Default Tab per Role
    if (activeRole === 'admin') setActiveTab('overview');
    else if (activeRole === 'doctor') setActiveTab('doctor_dashboard');
    else if (activeRole === 'reception') setActiveTab('reception_queue');
    else if (activeRole === 'nurse') setActiveTab('nurse_monitoring');
    else if (activeRole === 'lab') setActiveTab('lab_queue');
    else if (activeRole === 'pharmacy') setActiveTab('pharmacy_prescriptions');
    else {
      setActiveTab('patient_dashboard');
      // Patient Details cache
      const name = localStorage.getItem('clientName') || '';
      const phone = localStorage.getItem('clientPhone') || '+91 98765 43210';
      const address = localStorage.getItem('clientAddress') || 'Demo Patient Address';
      setUserName(name);
      setUserPhone(phone);
      setUserAddressHome(address);
    }
  }, [projectId, clientEmail]);

  // Handle Save Patient Profile
  const handleSaveProfileChanges = async () => {
     const clientId = localStorage.getItem('clientId');
     if (!clientId) return;
     try {
       await api.hospital.patients.update(parseInt(clientId, 10), {
         name: userName,
         phone: userPhone,
         address: userAddressHome
       });
       localStorage.setItem('clientName', userName);
       localStorage.setItem('clientPhone', userPhone);
       localStorage.setItem('clientAddress', userAddressHome);
       alert('Patient file details updated successfully!');
     } catch (err) {
       console.error(err);
       alert('Failed to update patient file.');
     }
   };
 
   // 1. Patient: Book Appointment
   const handleBookAppointment = async (e: React.FormEvent) => {
     e.preventDefault();
     const doc = products.find(p => String(p.id) === bookingFormDoctorId);
     const docName = doc ? doc.name : 'On-Duty Specialist';
 
     const payload = {
       projectId,
       patientName: userName || 'Self Registered Patient',
       patientEmail: clientEmail,
       patientPhone: userPhone,
       doctorId: doc ? doc.id : null,
       doctorName: docName,
       bookingDate: bookingFormDate,
       bookingTime: bookingFormTime,
       symptoms: bookingFormSymtoms || 'General clinical review',
       status: 'Pending'
     };
 
     try {
       await api.hospital.appointments.create(payload);
       
       // Auto-insert patient into the receptionist's clinical queue
       const queueList = [...clinicalQueue, {
         id: Date.now(),
         patientName: userName || 'Self Registered Patient',
         email: clientEmail,
         time: bookingFormTime,
         status: 'Waiting',
         doctor: docName
       }];
       localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(queueList));
       setClinicalQueue(queueList);
 
       alert('Consultation appointment booked successfully! Medical staff will review.');
       setBookingFormSymtoms('');
       fetchAppointments();
       setActiveTab('my_appointments');
     } catch (err) {
       console.error(err);
       alert('Failed to request appointment slot.');
     }
   };
 
   // 2. Admin/Staff: Update Appointment Status
   const handleUpdateStatus = async (id: number, status: string) => {
     try {
       await api.hospital.appointments.updateStatus(id, status);
       alert(`Appointment slot status set to ${status}!`);
       
       // If completed, generate billing invoice in ledger automatically
       if (status === 'Completed') {
         const appt = reservations.find(r => r.id === id);
         const doctorFee = appt ? 800.0 : 600.0;
         
         await api.hospital.invoices.create({
           projectId,
           patientEmail: appt?.customerEmail || 'patient@gmail.com',
           doctorFee,
           pharmacyCharges: 0.0,
           labCharges: 0.0,
           tax: 0.0,
           total: doctorFee,
           status: 'Pending',
           paymentMethod: '-',
           date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
         });
 
         // Refetch invoices from backend
         api.hospital.invoices.list(projectId).then(setBillingInvoices);
       }
 
       fetchAppointments();
     } catch (err) {
       console.error(err);
       alert('Failed to adjust status.');
     }
   };
 
   // 3. Admin/Staff: Delete/Cancel Appointment
   const handleDeleteAppointment = async (id: number) => {
     if (!confirm('Are you sure you want to cancel this consultation?')) return;
     try {
       await api.hospital.appointments.delete(id);
       fetchAppointments();
     } catch (err) {
       console.error(err);
     }
   };
 
   // 4. Admin: Doctor Onboarding (CRUD)
   const handleDocSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!docFormName || !docFormFee) return;
 
     const payload: any = {
       projectId,
       name: docFormName,
       bio: docFormBio || 'On-Duty specialist in clinical checkups.',
       consultationFee: parseFloat(docFormFee),
       department: docFormSpecialty,
       specialization: docFormSpecialty,
       imageUrl: docFormAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120',
       available: true
     };
 
     try {
       if (docFormId) {
         await api.hospital.doctors.update(docFormId, { ...payload, id: docFormId });
         alert('Doctor directory file updated!');
       } else {
         await api.hospital.doctors.create(payload);
         alert('New specialist added successfully!');
       }
       setDocFormId(null);
       setDocFormName('');
       setDocFormSpecialty('General Medicine');
       setDocFormFee('600');
       setDocFormBio('');
       setDocFormAvatar('');
       fetchDoctors();
     } catch (err) {
       console.error(err);
       alert('Failed to save doctor details.');
     }
   };
 
   // Delete doctor profile
   const handleDeleteDoc = async (id: number) => {
     if (!confirm('Remove this doctor profile?')) return;
     try {
       await api.hospital.doctors.delete(id);
       fetchDoctors();
     } catch (err) {
       console.error(err);
     }
   };

  // 5. Doctor: Log Diagnosis & Prescription
  const handleDoctorConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConsultEmail || !newConsultDiagnosis) {
      alert('Patient Email and Diagnosis details are required.');
      return;
    }

    const recId = Date.now();
    const newRec = {
      id: recId,
      patientEmail: newConsultEmail.trim().toLowerCase(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      diagnosis: newConsultDiagnosis,
      prescription: newConsultPrescription,
      doctor: 'Dr. Sarah Jenkins (Log)',
      notes: newConsultAdvice
    };

    const updated = [newRec, ...medicalRecords];
    localStorage.setItem(`clinic_records_${projectId}`, JSON.stringify(updated));
    setMedicalRecords(updated);

    // If Lab Test is needed, send to Lab Queue (Backend Database)
    if (newConsultNeedLabTest) {
      try {
        await api.hospital.labTests.create({
          projectId,
          patientEmail: newConsultEmail.trim().toLowerCase(),
          testName: newConsultLabTestName,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: 'Pending',
          results: '-',
          remarks: '-'
        });
        // Refetch lab tests
        api.hospital.labTests.list(projectId).then(setLabTestsList);
      } catch (err) {
        console.error(err);
      }
    }

    // Set queue patient status to Completed
    const qList = clinicalQueue.map(q => q.email === newConsultEmail.trim().toLowerCase() ? { ...q, status: 'Completed' } : q);
    localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(qList));
    setClinicalQueue(qList);

    setNewConsultEmail('');
    setNewConsultDiagnosis('');
    setNewConsultPrescription('');
    setNewConsultAdvice('');
    setNewConsultNeedLabTest(false);
    alert('Diagnostics logs written and updated in Patient EMR!');
  };

  // 6. Receptionist: Register Walk-in & Add to Live Queue
  const handleReceptionRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;

    try {
      await api.hospital.patients.register({
        name: regName,
        email: regEmail,
        password: 'password',
        phone: regPhone,
        address: regAddress,
        projectId
      });

      // Add to live wait list queue
      const qItem = {
        id: Date.now(),
        patientName: regName,
        email: regEmail.trim().toLowerCase(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Waiting',
        doctor: products.length > 0 ? products[0].name : 'General Practice Doctor'
      };
      const updatedQueue = [...clinicalQueue, qItem];
      localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(updatedQueue));
      setClinicalQueue(updatedQueue);

      alert(`Patient ${regName} registered and added to Waitlist Queue.`);
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegAddress('');
    } catch (e) {
      console.error(e);
      alert('Patient already registered. Direct to walk-in queue.');
    }
  };

  // 7. Nurse: Log Vitals
  const handleVitalsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vitalEmail || !vitalBp) return;

    const newVital = {
      projectId,
      patientEmail: vitalEmail.trim().toLowerCase(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      bp: vitalBp,
      pulse: parseInt(vitalPulse, 10),
      spo2: parseInt(vitalSpO2, 10),
      temp: parseFloat(vitalTemp),
      loggedBy: 'Nurse Station Log'
    };

    try {
      await api.hospital.vitals.create(newVital);
      api.hospital.vitals.list(projectId).then(setVitalsLogs);

      setVitalEmail('');
      setVitalBp('120/80');
      setVitalPulse('72');
      setVitalSpO2('98');
      setVitalTemp('98.6');
      alert('Patient vitals logged successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to log vitals.');
    }
  };

  // 8. Lab Tech: Complete Lab Report
  const handleLabReportUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labReportId) return;

    try {
      await api.hospital.labTests.update(labReportId, {
        status: 'Completed',
        results: labTestValue,
        remarks: labRemarks
      });
      api.hospital.labTests.list(projectId).then(setLabTestsList);
      setLabReportId(null);
      setLabTestValue('');
      setLabRemarks('');
      alert('Lab report finalized and shared to Patient Portal.');
    } catch (err) {
      console.error(err);
      alert('Failed to update lab report.');
    }
  };

  // 9. Pharmacy: Add Medicine Stock
  const handleMedicineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !medStock) return;

    const newMed = {
      projectId,
      name: medName,
      stock: parseInt(medStock, 10),
      price: parseFloat(medPrice),
      location: medLocation,
      status: parseInt(medStock, 10) > 0 ? 'Available' : 'Out of Stock'
    };

    try {
      await api.hospital.medicine.create(newMed);
      api.hospital.medicine.list(projectId).then(setMedicineInventory);

      setMedName('');
      setMedStock('100');
      setMedPrice('120');
      setMedLocation('Rack A-1');
      alert('Medicine inventory updated.');
    } catch (err) {
      console.error(err);
      alert('Failed to add medicine.');
    }
  };

  // 10. Patient: Simulating Billing Invoice Payment
  const handleInvoicePayment = async (invId: number) => {
    const method = prompt('Select Payment Method: "Card" or "UPI"');
    if (!method) return;

    try {
      await api.hospital.invoices.update(invId, {
        status: 'Paid',
        paymentMethod: method
      });
      api.hospital.invoices.list(projectId).then(setBillingInvoices);
      alert('Payment transactions successfully approved.');
    } catch (err) {
      console.error(err);
      alert('Failed to process payment.');
    }
  };

  const activeLabList = labTestsList;

  return (
    <div className={`flex flex-1 min-h-screen ${isDarkMode ? 'dark bg-slate-955 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Sidebar Navigation */}
      <aside className={`w-64 border-r p-6 flex flex-col justify-between ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl select-none">{logoIcon || '🏥'}</span>
            <div className="truncate font-sans text-left">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm truncate leading-tight">{companyName}</h3>
              <span className={`text-[9px] font-black uppercase tracking-widest ${theme.accentText}`}>
                {activeRole.toUpperCase()} PORTAL
              </span>
            </div>
          </div>

                  <nav className="space-y-0.5 max-h-[70vh] overflow-y-auto pr-1">
            {/* 1. Admin Console Tabs */}
            {activeRole === 'admin' && (
              <>
                <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'overview' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🏠 Dashboard</button>
                <button onClick={() => setActiveTab('doctors_registry')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctors_registry' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>👨‍⚕️ Doctor Management</button>
                <button onClick={() => setActiveTab('patients_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patients_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🧑‍🤝‍🧑 Patient Management</button>
                <button onClick={() => setActiveTab('appointments_admin')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'appointments_admin' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>📅 Appointment Management</button>
                <button onClick={() => setActiveTab('departments_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'departments_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🏥 Department Management</button>
                <button onClick={() => setActiveTab('bed_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'bed_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🛏️ Bed Management</button>
                <button onClick={() => setActiveTab('emergency_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'emergency_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🚑 Emergency</button>
                <button onClick={() => setActiveTab('laboratory_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'laboratory_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🧪 Laboratory</button>
                <button onClick={() => setActiveTab('pharmacy_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'pharmacy_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>💊 Pharmacy</button>
                <button onClick={() => setActiveTab('records_admin')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'records_admin' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>📄 Medical Records</button>
                <button onClick={() => setActiveTab('billing_admin')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'billing_admin' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>💳 Billing & Payments</button>
                <button onClick={() => setActiveTab('insurance_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'insurance_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🛡️ Insurance</button>
                <button onClick={() => setActiveTab('nurse_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'nurse_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>👩‍⚕️ Nurse Management</button>
                <button onClick={() => setActiveTab('staff_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'staff_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>👨‍💼 Staff Management</button>
                <button onClick={() => setActiveTab('ambulance_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'ambulance_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🚑 Ambulance Management</button>
                <button onClick={() => setActiveTab('inventory_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'inventory_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-905 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>📦 Inventory Management</button>
                <button onClick={() => setActiveTab('reports_analytics')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'reports_analytics' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>📈 Reports & Analytics</button>
                <button onClick={() => setActiveTab('notifications_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'notifications_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>📢 Notifications</button>
                <button onClick={() => setActiveTab('reviews_feedback')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'reviews_feedback' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>⭐ Reviews & Feedback</button>
                <button onClick={() => setActiveTab('website_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'website_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🌐 Website Management</button>
                <button onClick={() => setActiveTab('roles_permissions')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'roles_permissions' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>👤 User Roles & Permissions</button>
                <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'settings' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-905 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>⚙️ Settings</button>
                <button onClick={() => setActiveTab('security_management')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'security_management' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>🔒 Security</button>
              </>
            )}

            {/* 2. Doctor Console Tabs */}
            {activeRole === 'doctor' && (
              <>
                <button onClick={() => setActiveTab('doctor_dashboard')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_dashboard' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🏠 Dashboard</button>
                <button onClick={() => setActiveTab('doctor_schedule')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_schedule' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📅 Today's Appointments</button>
                <button onClick={() => setActiveTab('doctor_calendar')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_calendar' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📆 Appointment Calendar</button>
                <button onClick={() => setActiveTab('doctor_patients')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_patients' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>👥 My Patients</button>
                <button onClick={() => setActiveTab('doctor_consults')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_consults' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🩺 Consultation</button>
                <button onClick={() => setActiveTab('doctor_prescriptions')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_prescriptions' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💊 Prescriptions</button>
                <button onClick={() => setActiveTab('doctor_lab_requests')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_lab_requests' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🧪 Lab Test Requests</button>
                <button onClick={() => setActiveTab('doctor_records')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_records' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📄 Medical Records</button>
                <button onClick={() => setActiveTab('doctor_treatment_plans')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_treatment_plans' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📋 Treatment Plans</button>
                <button onClick={() => setActiveTab('doctor_followups')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_followups' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🔄 Follow-ups</button>
                <button onClick={() => setActiveTab('doctor_schedule_mgmt')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_schedule_mgmt' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📅 My Schedule</button>
                <button onClick={() => setActiveTab('doctor_messages')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_messages' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💬 Messages</button>
                <button onClick={() => setActiveTab('doctor_reports')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_reports' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📊 Reports & Analytics</button>
                <button onClick={() => setActiveTab('doctor_reviews')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_reviews' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>⭐ Patient Reviews</button>
                <button onClick={() => setActiveTab('doctor_profile')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_profile' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>👤 My Profile</button>
                <button onClick={() => setActiveTab('doctor_notifications')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_notifications' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🔔 Notifications</button>
                <button onClick={() => setActiveTab('doctor_settings')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctor_settings' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>⚙️ Settings</button>
              </>
            )}

            {/* 3. Receptionist Tabs */}
            {activeRole === 'reception' && (
              <>
                <button onClick={() => setActiveTab('reception_queue')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'reception_queue' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🚶 Live Queue & Walk-ins</button>
                <button onClick={() => setActiveTab('reception_register')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'reception_register' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>👤 Patient Registration</button>
                <button onClick={() => setActiveTab('appointments_admin')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'appointments_admin' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📅 Appointment Booking Desk</button>
                <button onClick={() => setActiveTab('billing_admin')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'billing_admin' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💳 Invoices Ledger</button>
              </>
            )}

            {/* 4. Nurse Station Tabs */}
            {activeRole === 'nurse' && (
              <>
                <button onClick={() => setActiveTab('nurse_monitoring')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'nurse_monitoring' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🏥 Ward Monitoring</button>
                <button onClick={() => setActiveTab('nurse_vitals')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'nurse_vitals' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🩺 Log Vitals</button>
              </>
            )}

            {/* 5. Lab Tech Tabs */}
            {activeRole === 'lab' && (
              <>
                <button onClick={() => setActiveTab('lab_queue')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'lab_queue' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-905 hover:bg-slate-50'}`}>🧪 Lab Samples Queue</button>
                <button onClick={() => setActiveTab('lab_reports')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'lab_reports' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-905 hover:bg-slate-50'}`}>📋 Diagnostics Archives</button>
              </>
            )}

            {/* 6. Pharmacist Tabs */}
            {activeRole === 'pharmacy' && (
              <>
                <button onClick={() => setActiveTab('pharmacy_prescriptions')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'pharmacy_prescriptions' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📋 Active Prescriptions</button>
                <button onClick={() => setActiveTab('pharmacy_inventory')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'pharmacy_inventory' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💊 Medicine Inventory</button>
              </>
            )}

            {/* 7. Patient Portal Tabs */}
            {activeRole === 'patient' && (
              <>
                <button onClick={() => setActiveTab('patient_dashboard')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_dashboard' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🏠 Dashboard</button>
                <button onClick={() => setActiveTab('doctors')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'doctors' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>👨‍⚕️ Find Doctors</button>
                <button onClick={() => setActiveTab('book_appointment')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'book_appointment' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📅 Book Appointment</button>
                <button onClick={() => setActiveTab('my_appointments')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'my_appointments' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>📋 My Appointments</button>
                <button onClick={() => setActiveTab('patient_records')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_records' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🩺 Medical Records</button>
                <button onClick={() => setActiveTab('patient_prescriptions')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_prescriptions' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💊 Prescriptions</button>
                <button onClick={() => setActiveTab('patient_lab_reports')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_lab_reports' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🧪 Lab Reports</button>
                <button onClick={() => setActiveTab('patient_health_packages')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_health_packages' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🏥 Health Packages</button>
                <button onClick={() => setActiveTab('patient_billing')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_billing' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💳 Bills & Payments</button>
                <button onClick={() => setActiveTab('patient_insurance')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_insurance' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🛡️ Insurance</button>
                <button onClick={() => setActiveTab('patient_pharmacy')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_pharmacy' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💊 Pharmacy</button>
                <button onClick={() => setActiveTab('patient_emergency')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_emergency' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🚑 Emergency Services</button>
                <button onClick={() => setActiveTab('patient_messages')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_messages' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>💬 Messages</button>
                <button onClick={() => setActiveTab('patient_notifications')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_notifications' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>🔔 Notifications</button>
                <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'profile' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>👤 My Profile</button>
                <button onClick={() => setActiveTab('patient_settings')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_settings' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-905 hover:bg-slate-50'}`}>⚙️ Settings</button>
                <button onClick={() => setActiveTab('patient_support')} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${activeTab === 'patient_support' ? `${theme.activeTabBg} ${theme.accentText}` : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>❓ Help & Support</button>
              </>
            )}
          </nav>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition text-left cursor-pointer border-none bg-transparent"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition text-left cursor-pointer border-none bg-transparent"
          >
            🚪 Exit Portal
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className={`flex-1 p-8 overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50/50'}`}>
        <div className="max-w-6xl mx-auto space-y-6">
          <header className={`flex justify-between items-center pb-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="text-left">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{hospitalType}</p>
              <h1 className="text-xl font-black tracking-tight uppercase mt-1">
                {activeTab.replace('_', ' ')}
              </h1>
            </div>
            <div className={`text-[10px] border rounded-lg px-3 py-1.5 font-extrabold shadow-sm flex items-center gap-2 select-none ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-350' : 'bg-white border-slate-200 text-slate-550'
            }`}>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              CLINICAL WORKSPACE ACTIVE
            </div>
          </header>

          {/* ==================== A. ADMIN VIEW PANELS ==================== */}
          {/* 1. Admin/Staff: Overview Analytics */}
          {activeTab === 'overview' && (activeRole === 'admin' || activeRole === 'reception') && (
            <div className="space-y-6 text-xs text-left">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Total Appointments</span>
                  <h3 className="text-xl font-black mt-1">{reservations.length}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">Synced Live</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Active On-Duty Doctors</span>
                  <h3 className="text-xl font-black mt-1">{products.length}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">Specialists Registry</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Active Queue Waiting</span>
                  <h3 className="text-xl font-black mt-1">{clinicalQueue.filter(q => q.status === 'Waiting').length}</h3>
                  <p className="text-[10px] text-amber-500 font-bold mt-1">In Reception</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Gross Clinical Revenue</span>
                  <h3 className="text-xl font-black mt-1">₹{billingInvoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.total : 0), 0)}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">Settled payments</p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xs font-black uppercase mb-3">Clinical Operations Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-500">Live Waitlist Queue Check</p>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {clinicalQueue.slice(0, 3).map((q) => (
                        <div key={q.id} className="py-2 flex justify-between items-center text-xs">
                          <div>
                            <strong className="text-slate-808 dark:text-slate-200">{q.patientName}</strong>
                            <p className="text-[10px] text-slate-400">Assigned: {q.doctor}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${q.status === 'Waiting' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                            {q.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-slate-500">On-Duty Doctors Directory Overview</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {products.slice(0, 5).map((doc) => (
                        <div key={doc.id} className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                          <strong className="block text-[10px] leading-tight text-slate-700 dark:text-slate-300">{doc.name}</strong>
                          <span className="text-[8px] text-slate-400 uppercase font-black">{doc.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Admin: Doctor Profile Management (CRUD) */}
          {activeTab === 'doctors_registry' && activeRole === 'admin' && (
            <div className="space-y-6 text-xs text-left text-slate-800 dark:text-slate-200">
              <div className={`p-6 border rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xs font-black uppercase mb-4">
                  {docFormId ? 'Edit Doctor Registry Profile' : 'Onboard New Medical Specialist'}
                </h3>
                <form onSubmit={handleDocSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Doctor's Name</label>
                      <input
                        type="text"
                        required
                        value={docFormName}
                        onChange={(e) => setDocFormName(e.target.value)}
                        placeholder="Dr. Gregory House"
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Specialty / Department</label>
                      <input
                        type="text"
                        required
                        value={docFormSpecialty}
                        onChange={(e) => setDocFormSpecialty(e.target.value)}
                        placeholder="e.g. Cardiology, Dentistry"
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        required
                        value={docFormFee}
                        onChange={(e) => setDocFormFee(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Professional Bio & Credentials</label>
                      <input
                        type="text"
                        value={docFormBio}
                        onChange={(e) => setDocFormBio(e.target.value)}
                        placeholder="MD - Orthopedics, 15 years clinical practice..."
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Avatar Image URL (Optional)</label>
                      <input
                        type="text"
                        value={docFormAvatar}
                        onChange={(e) => setDocFormAvatar(e.target.value)}
                        placeholder="Leave blank for clinical avatar placeholder"
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white transition"
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
                          setDocFormFee('600');
                          setDocFormAvatar('');
                        }}
                        className="px-4 py-2 border border-slate-250 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2 bg-slate-900 hover:bg-black dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-950 text-white font-bold rounded-xl transition shadow border-none cursor-pointer"
                    >
                      {docFormId ? 'Save Profile' : 'Onboard Doctor'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Doctors Registry grid */}
              <div className={`p-6 border rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xs font-black uppercase mb-4">On-Duty Doctors Registry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <div className="sm:col-span-3 py-10 text-center text-slate-400 font-bold uppercase">No doctors registered.</div>
                  ) : (
                    products.map((doc) => (
                      <div key={doc.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition">
                        <img
                          src={doc.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120'}
                          alt={doc.name}
                          className="w-14 h-14 rounded-full object-cover border border-slate-100 shrink-0"
                        />
                        <div className="space-y-1 min-w-0 text-left">
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-xs truncate leading-tight">{doc.name}</h4>
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${theme.accentBg}`}>
                            {doc.category}
                          </span>
                          <p className="text-[10px] text-slate-400 truncate mt-1">{doc.description}</p>
                          <p className="font-bold text-slate-808 dark:text-slate-300 text-[10px] mt-2">Consult fee: ₹{doc.price}</p>
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
                              className="text-[9px] font-bold text-indigo-650 dark:text-indigo-400 hover:underline border-none bg-transparent cursor-pointer"
                            >
                              Edit
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

          {/* 3. Admin/Staff: Patient Appointment Schedule review */}
          {activeTab === 'appointments_admin' && (activeRole === 'admin' || activeRole === 'reception') && (
            <div className={`border rounded-2xl shadow-sm overflow-hidden text-xs text-left ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase">Clinical Appointment Requests</h3>
                <span className="bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded text-[9px] font-black text-emerald-700 uppercase">Review Panel</span>
              </header>
              {reservationLoading ? (
                <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-wider">Loading appointments...</div>
              ) : reservations.length === 0 ? (
                <div className="p-16 text-center text-slate-400 font-bold uppercase tracking-wider">No appointment requests.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-505 uppercase">
                      <th className="p-4 pl-6">Patient</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Physician</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Symptoms / Notes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                        <td className="p-4 pl-6">
                          <span className="font-bold text-slate-909 dark:text-slate-200 block">{res.customerName}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{res.customerEmail}</span>
                        </td>
                        <td className="p-4 font-mono font-semibold text-slate-505">{res.customerPhone || 'N/A'}</td>
                        <td className="p-4 font-bold text-slate-700 dark:text-slate-350">{res.tableNumber}</td>
                        <td className="p-4">
                          <span className="font-bold text-slate-800 dark:text-slate-305 block">{res.bookingDate}</span>
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-black uppercase mt-1 inline-block">{res.bookingTime}</span>
                        </td>
                        <td className="p-4 italic text-slate-500 max-w-[200px] truncate">"{res.notes || 'None'}"</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
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

          {/* 4. Admin/Doctor: Clinical Medical Records EMR */}
          {activeTab === 'records_admin' && (activeRole === 'admin' || activeRole === 'doctor') && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-xs text-left">
              {/* Form to submit new diagnosis record */}
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Publish Consultation Entry</h3>
                <form onSubmit={handleDoctorConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Patient Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={newConsultEmail}
                      onChange={(e) => setNewConsultEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Diagnosis / Consultation Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acute Migraine / Teeth Whitening"
                      value={newConsultDiagnosis}
                      onChange={(e) => setNewConsultDiagnosis(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">Prescription & Medication Dosage</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Sumatriptan 50mg - 1 tab immediately onset of pain"
                      value={newConsultPrescription}
                      onChange={(e) => setNewConsultPrescription(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Clinical Advice & Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="Stay in a quiet dark room. Avoid screen triggers."
                      value={newConsultAdvice}
                      onChange={(e) => setNewConsultAdvice(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition resize-none"
                    />
                  </div>
                  
                  {/* Lab request attachment */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <label className="flex items-center gap-2 font-bold cursor-pointer text-slate-700 dark:text-slate-350">
                      <input
                        type="checkbox"
                        checked={newConsultNeedLabTest}
                        onChange={(e) => setNewConsultNeedLabTest(e.target.checked)}
                        className="rounded border-slate-300 text-teal-650"
                      />
                      Request Diagnostic Lab Test
                    </label>
                    {newConsultNeedLabTest && (
                      <input
                        type="text"
                        value={newConsultLabTestName}
                        onChange={(e) => setNewConsultLabTestName(e.target.value)}
                        placeholder="Test name (e.g. X-Ray, Blood scan)"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-707 rounded-lg px-2.5 py-1.5 text-[11px] outline-none"
                      />
                    )}
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow border-none cursor-pointer">
                    Publish to Patient File
                  </button>
                </form>
              </div>

              {/* Records Timeline */}
              <div className="lg:col-span-2 space-y-4">
                <div className={`p-4 border rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase">Electronic Medical Records Journal</h3>
                </div>
                {medicalRecords.length === 0 ? (
                  <div className="p-16 text-center border border-slate-200 rounded-2xl bg-white text-slate-400 font-bold uppercase">No records logged.</div>
                ) : (
                  medicalRecords.map((rec) => (
                    <div key={rec.id} className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase">{rec.diagnosis}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Patient: <span className="text-slate-600 dark:text-slate-300">{rec.patientEmail}</span></p>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-bold text-slate-450 block">{rec.date}</span>
                          <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase mt-1.5 inline-block ${theme.accentBg}`}>{rec.doctor}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 p-4 rounded-xl text-left">
                          <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block mb-1">💊 Prescription Dosage</span>
                          <p className="font-mono text-[10px] whitespace-pre-line text-slate-700 dark:text-slate-350">{rec.prescription || 'No medicines.'}</p>
                        </div>
                        <div className="bg-amber-50/20 dark:bg-amber-955/10 border border-amber-100/50 dark:border-amber-900/30 p-4 rounded-xl text-left">
                          <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block mb-1">❤️ Advice & Restrictions</span>
                          <p className="italic text-[10px] text-slate-605 dark:text-slate-400">{rec.notes}</p>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2 border-t border-slate-50 dark:border-slate-800">
                        <button
                          onClick={() => {
                            if (confirm('Delete this EMR consult entry?')) {
                              const updated = medicalRecords.filter(r => r.id !== rec.id);
                              localStorage.setItem(`clinic_records_${projectId}`, JSON.stringify(updated));
                              setMedicalRecords(updated);
                            }
                          }}
                          className="text-[8px] font-black text-rose-600 bg-transparent border-none cursor-pointer uppercase tracking-widest hover:underline"
                        >
                          Delete Entry
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 5. Admin/Receptionist: Billing Ledger Invoices */}
          {activeTab === 'billing_admin' && (activeRole === 'admin' || activeRole === 'reception') && (
            <div className={`border rounded-2xl shadow-sm overflow-hidden text-xs text-left ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase">Clinic Invoices Ledger</h3>
                <span className="bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded text-[9px] font-black text-emerald-700 uppercase">Billing Desk</span>
              </header>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-505 uppercase">
                    <th className="p-4 pl-6">Invoice ID</th>
                    <th className="p-4">Patient Email</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Fee Summary</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Payment Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {billingInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                      <td className="p-4 pl-6 font-mono font-bold">#INV-{inv.id}</td>
                      <td className="p-4 font-bold text-slate-707 dark:text-slate-350">{inv.patientEmail}</td>
                      <td className="p-4 font-semibold text-slate-550">{inv.date}</td>
                      <td className="p-4 text-[10px] text-slate-455 leading-relaxed font-semibold">
                        Doctor Consult: ₹{inv.doctorFee} <br />
                        Pharmacy/Meds: ₹{inv.pharmacyCharges} <br />
                        Diagnostics: ₹{inv.labCharges}
                      </td>
                      <td className="p-4 font-black text-slate-909 dark:text-white">₹{inv.total}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                          inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>{inv.status} {inv.method !== '-' && `(${inv.method})`}</span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {inv.status === 'Pending' && (
                          <button
                            onClick={() => {
                              const updated = billingInvoices.map(i => i.id === inv.id ? { ...i, status: 'Paid', method: 'Cash' } : i);
                              localStorage.setItem(`clinic_invoices_${projectId}`, JSON.stringify(updated));
                              setBillingInvoices(updated);
                              alert('Invoice marked as Paid via Cash desk.');
                            }}
                            className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[9px] font-bold border-none shadow-sm cursor-pointer"
                          >
                            Collect Cash
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Delete this billing invoice record?')) {
                              const updated = billingInvoices.filter(i => i.id !== inv.id);
                              localStorage.setItem(`clinic_invoices_${projectId}`, JSON.stringify(updated));
                              setBillingInvoices(updated);
                            }
                          }}
                          className="px-2 py-1 ml-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[9px] font-bold border-none cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 6. Admin Settings Panel */}
          {activeTab === 'settings' && activeRole === 'admin' && (
            <div className="space-y-6 text-xs text-left">
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Theme Settings & Site Customizer</h3>
                <p className="text-slate-550 font-semibold leading-relaxed">
                  Configure your medical branch type and select between different custom premium design layouts. Changing the subcategory updates the default taglines, doctor specialties, and icons on the landing homepage.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Hospital / Clinic Type (Subcategory)</label>
                    <select
                      value={hospitalType}
                      onChange={async (e) => {
                        const val = e.target.value;
                        setHospitalType(val);
                        // Save changes to database API
                        try {
                          await api.hospital.create(projectId, {
                            subcategory: val,
                            companyName,
                            themeColor: hospitalNicheTheme
                          });
                          alert(`Clinical subcategory set to: ${val}. Reload components to sync default specialties.`);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none cursor-pointer font-bold"
                    >
                      <option value="General Hospital">General Hospital</option>
                      <option value="Multi Specialty Hospital">Multi Specialty Hospital</option>
                      <option value="Dental Clinic">Dental Clinic</option>
                      <option value="Eye Hospital">Eye Hospital</option>
                      <option value="Orthopedic Hospital">Orthopedic Hospital</option>
                      <option value="Cardiology Hospital">Cardiology Hospital</option>
                      <option value="Neurology Hospital">Neurology Hospital</option>
                      <option value="Children Hospital">Children Hospital</option>
                      <option value="Women's Hospital">Women's Hospital</option>
                      <option value="Skin Clinic">Skin Clinic</option>
                      <option value="ENT Clinic">ENT Clinic</option>
                      <option value="Diagnostic Center">Diagnostic Center</option>
                      <option value="Physiotherapy Clinic">Physiotherapy Clinic</option>
                      <option value="Mental Health Clinic">Mental Health Clinic</option>
                      <option value="Veterinary Hospital">Veterinary Hospital</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Premium Color Theme Preset</label>
                    <select
                      value={hospitalNicheTheme}
                      onChange={async (e) => {
                        const val = e.target.value;
                        setHospitalNicheTheme(val);
                        try {
                          await api.hospital.create(projectId, {
                            subcategory: hospitalType,
                            companyName,
                            themeColor: val
                          });
                          alert('Theme styles applied! Enter site preview to view changes.');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none cursor-pointer font-bold"
                    >
                      <option value="vibrant-teal">Vibrant Teal (Clean Medical)</option>
                      <option value="royal-blue">Royal Blue (Trust Corporate)</option>
                      <option value="emerald-natural">Emerald Natural (Holistic/Organic)</option>
                      <option value="neon-cyber">Neon Cyber-Health (Biotech Labs)</option>
                      <option value="warm-amber">Warm Amber (Geriatric Care)</option>
                      <option value="rose-coral">Rose Coral (Maternity & Kids)</option>
                      <option value="clean-slate">Clean Slate (Radiology/Pathology)</option>
                      <option value="dark-obsidian">Dark Obsidian (Exclusive Private Clinic)</option>
                      <option value="lilac-aura">Lilac Aura (Mental Health & Therapy)</option>
                      <option value="sunset-crimson">Sunset Crimson (Surgery Specialists)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      alert('Theme configuration updated securely.');
                    }}
                    className={`px-5 py-2.5 text-white rounded-xl font-bold border-none cursor-pointer ${theme.primaryBtn}`}
                  >
                    Save Branding Configurations
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* ==================== B. DOCTOR VIEW PANELS ==================== */}
          {/* 1. Doctor: Today's Schedule */}
          {activeTab === 'doctor_schedule' && activeRole === 'doctor' && (
            <div className={`border rounded-2xl shadow-sm text-xs text-left ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase">Confirmed Consultations (Today)</h3>
              </header>
              <div className="p-6 space-y-4">
                {reservations.filter(r => r.status === 'Confirmed').length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-bold uppercase">No confirmed appointments for today.</div>
                ) : (
                  reservations.filter(r => r.status === 'Confirmed').map((res) => (
                    <div key={res.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left space-y-1">
                        <strong className="text-slate-900 dark:text-white text-sm">{res.customerName}</strong>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Time: {res.bookingTime} | Symptoms: {res.notes}</p>
                      </div>
                      <button
                        onClick={() => {
                          setNewConsultEmail(res.customerEmail);
                          setNewConsultDiagnosis(res.notes || 'Routine checkup');
                          setActiveTab('doctor_consults');
                        }}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold border-none shadow-sm cursor-pointer uppercase tracking-wider"
                      >
                        Start consult
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 2. Doctor: Consultation Workspace (Diagnostics/Prescriptions Logging) */}
          {activeTab === 'doctor_consults' && activeRole === 'doctor' && (
            <div className={`p-6 border rounded-2xl shadow-sm space-y-4 text-xs text-left ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-xs font-black uppercase">Physician Consultation Workspace</h3>
              <p className="text-slate-455 font-bold uppercase">Input patient diagnostics details and record prescriptions directly to their file</p>
              
              <form onSubmit={handleDoctorConsultSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Patient Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={newConsultEmail}
                      onChange={(e) => setNewConsultEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Consultation Diagnosis</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acute Bronchitis / Dental Caries"
                      value={newConsultDiagnosis}
                      onChange={(e) => setNewConsultDiagnosis(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Digital Prescription & Dosage (Medicine name, quantity, hourly frequency)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Paracetamol 650mg - 1 tablet thrice daily after food (3 days)&#10;Amoxicillin 500mg - 1 cap twice daily after food (5 days)"
                    value={newConsultPrescription}
                    onChange={(e) => setNewConsultPrescription(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Clinical Lifestyle Advice & Follow-up Instructions</label>
                  <textarea
                    rows={2}
                    placeholder="Rest, steam inhalations, drink warm fluids. Avoid cold allergens."
                    value={newConsultAdvice}
                    onChange={(e) => setNewConsultAdvice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition resize-none"
                  />
                </div>

                {/* Lab diagnostic triggers */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-3">
                  <label className="flex items-center gap-2 font-bold cursor-pointer text-slate-700 dark:text-slate-350">
                    <input
                      type="checkbox"
                      checked={newConsultNeedLabTest}
                      onChange={(e) => setNewConsultNeedLabTest(e.target.checked)}
                      className="rounded border-slate-300 text-teal-650"
                    />
                    Requires Diagnostic Lab / Scanning Test
                  </label>
                  {newConsultNeedLabTest && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] text-slate-400 font-bold uppercase mb-1">Select Scanner/Lab Test</label>
                        <select
                          value={newConsultLabTestName}
                          onChange={(e) => setNewConsultLabTestName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs"
                        >
                          <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                          <option value="Blood Sugar Fasting & PP">Blood Sugar Fasting & PP</option>
                          <option value="Chest X-Ray Digital">Chest X-Ray Digital</option>
                          <option value="MRI Brain / Spinal Cord">MRI Brain / Spinal Cord</option>
                          <option value="Lipid Profile & Cholesterol">Lipid Profile & Cholesterol</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-6 py-3 bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-955 text-white rounded-xl text-xs font-black uppercase tracking-widest border-none cursor-pointer">
                    Finalize Consult & Update Patient Portal
                  </button>
                </div>
              </form>
            </div>
          )}


          {/* ==================== C. RECEPTIONIST VIEW PANELS ==================== */}
          {/* 1. Receptionist: Walk-in Patient Waitlist Queue */}
          {activeTab === 'reception_queue' && activeRole === 'reception' && (
            <div className="space-y-6 text-xs text-left">
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase">Live Waitlist Queue</h3>
                  <button
                    onClick={() => {
                      const name = prompt('Patient Name:');
                      const email = prompt('Patient Email:');
                      if (name && email) {
                        const qItem = {
                          id: Date.now(),
                          patientName: name,
                          email: email.trim().toLowerCase(),
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          status: 'Waiting',
                          doctor: products.length > 0 ? products[0].name : 'On-Duty GP'
                        };
                        const updatedQueue = [...clinicalQueue, qItem];
                        localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(updatedQueue));
                        setClinicalQueue(updatedQueue);
                        alert('Patient added to waiting queue.');
                      }
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-[10px] font-bold rounded-xl border-none cursor-pointer uppercase tracking-wider"
                  >
                    + Add Walk-In Patient
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {clinicalQueue.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 font-bold uppercase">Queue is empty.</div>
                  ) : (
                    clinicalQueue.map((q) => (
                      <div key={q.id} className="py-4 flex justify-between items-center gap-4">
                        <div className="text-left space-y-1">
                          <strong className="text-slate-900 dark:text-white text-sm">{q.patientName}</strong>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Email: {q.email} | Checked-in at: {q.time} | Assigned Doc: {q.doctor}</p>
                        </div>
                        <div className="flex gap-2">
                          {q.status === 'Waiting' && (
                            <button
                              onClick={() => {
                                const updated = clinicalQueue.map(item => item.id === q.id ? { ...item, status: 'In Consultation' } : item);
                                localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(updated));
                                setClinicalQueue(updated);
                              }}
                              className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Call In
                            </button>
                          )}
                          {q.status === 'In Consultation' && (
                            <button
                              onClick={() => {
                                const updated = clinicalQueue.map(item => item.id === q.id ? { ...item, status: 'Completed' } : item);
                                localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(updated));
                                setClinicalQueue(updated);
                              }}
                              className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              const updated = clinicalQueue.filter(item => item.id !== q.id);
                              localStorage.setItem(`clinic_queue_${projectId}`, JSON.stringify(updated));
                              setClinicalQueue(updated);
                            }}
                            className="px-2.5 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Trauma emergency call trigger */}
              <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl text-left space-y-3">
                <span className="text-xl">🚨</span>
                <h3 className="text-sm font-black text-rose-800 uppercase tracking-wide">Trauma Emergency Alert Panel</h3>
                <p className="text-rose-650 leading-relaxed font-semibold">
                  Clicking below triggers instant alert notifications across all ward nurse consoles and dispatches the on-duty cardiac ambulance.
                </p>
                <button
                  onClick={() => alert('EMERGENCY HEART SIREN TRIGGERED. AMBULANCE TEAM DISPATCHED.')}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl uppercase tracking-wider border-none cursor-pointer shadow shadow-rose-600/10"
                >
                  DISPATCH AMBULANCE
                </button>
              </div>
            </div>
          )}

          {/* 2. Receptionist: Register Patient Account */}
          {activeTab === 'reception_register' && activeRole === 'reception' && (
            <div className={`p-6 border rounded-2xl shadow-sm text-xs text-left max-w-lg mx-auto ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-xs font-black uppercase mb-4">Patient File Registration</h3>
              <form onSubmit={handleReceptionRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Patient Name"
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="patient@gmail.com"
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 99999 88888"
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Address</label>
                  <textarea
                    rows={2}
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Complete address details"
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-600 transition resize-none"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl uppercase tracking-wider transition shadow border-none cursor-pointer">
                  Onboard Patient Account
                </button>
              </form>
            </div>
          )}


          {/* ==================== D. NURSE VIEW PANELS ==================== */}
          {/* 1. Nurse: Ward Patient Monitoring */}
          {activeTab === 'nurse_monitoring' && activeRole === 'nurse' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
              <div className={`md:col-span-2 p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Admitted Ward Patients Monitoring</h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { room: 'ICU-Bed 3', name: 'John Doe', vitals: 'BP: 118/76 | Pulse: 74 | Temp: 98.4 | SpO2: 99%', status: 'Stable' },
                    { room: 'Ward 4-Bed A', name: 'Martha Smith', vitals: 'BP: 140/92 | Pulse: 85 | Temp: 99.1 | SpO2: 96%', status: 'Under Observation' },
                    { room: 'General Ward-B', name: 'Robert Vance', vitals: 'BP: 122/80 | Pulse: 70 | Temp: 98.6 | SpO2: 98%', status: 'Discharge Pending' }
                  ].map((pat, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center gap-4">
                      <div>
                        <strong className="text-slate-900 dark:text-white text-sm">{pat.name}</strong>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Room: {pat.room} | Vitals: {pat.vitals}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        pat.status.includes('Stable') ? 'bg-emerald-50 text-emerald-700' : pat.status.includes('Discharge') ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {pat.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vitals Logs Sidebar */}
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Vitals Audit Log</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {vitalsLogs.map((vl) => (
                    <div key={vl.id} className="p-3 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 text-left">
                      <div className="flex justify-between text-[10px]">
                        <strong className="text-slate-800 dark:text-slate-305">{vl.patientEmail}</strong>
                        <span className="text-slate-400">{vl.date}</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed">
                        BP: {vl.bp} mmHg <br />
                        Heart Rate: {vl.pulse} bpm <br />
                        SpO2: {vl.spo2}% | Temp: {vl.temp}°F
                      </p>
                      <span className="text-[8px] text-slate-400 block font-semibold">Logged by: {vl.loggedBy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Nurse: Log Vitals Form */}
          {activeTab === 'nurse_vitals' && activeRole === 'nurse' && (
            <div className={`p-6 border rounded-2xl shadow-sm text-xs text-left max-w-lg mx-auto ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-xs font-black uppercase mb-4">Record Patient Vital Signs</h3>
              <form onSubmit={handleVitalsSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">Patient Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="patient@gmail.com"
                    value={vitalEmail}
                    onChange={(e) => setVitalEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">Blood Pressure (mmHg)</label>
                    <input
                      type="text"
                      required
                      placeholder="120/80"
                      value={vitalBp}
                      onChange={(e) => setVitalBp(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">Pulse Rate (bpm)</label>
                    <input
                      type="number"
                      required
                      value={vitalPulse}
                      onChange={(e) => setVitalPulse(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">Oxygen Level SpO2 (%)</label>
                    <input
                      type="number"
                      required
                      value={vitalSpO2}
                      onChange={(e) => setVitalSpO2(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">Temperature (°F)</label>
                    <input
                      type="text"
                      required
                      value={vitalTemp}
                      onChange={(e) => setVitalTemp(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl uppercase tracking-wider transition shadow border-none cursor-pointer">
                  Log Vitals Entry
                </button>
              </form>
            </div>
          )}


          {/* ==================== E. LAB TECHNICIAN VIEW PANELS ==================== */}
          {/* 1. Lab: Test Requests Queue */}
          {activeTab === 'lab_queue' && activeRole === 'lab' && (
            <div className="space-y-6 text-xs text-left">
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Pending Scans & Diagnostics queue</h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activeLabList.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 font-bold uppercase">No pending lab requests.</div>
                  ) : (
                    activeLabList.map((lab) => (
                      <div key={lab.id} className="py-4 flex justify-between items-center gap-4">
                        <div className="text-left space-y-1">
                          <strong className="text-slate-900 dark:text-white text-sm">{lab.testName}</strong>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Patient: {lab.patientEmail} | Requested on: {lab.date} | Status: {lab.status}</p>
                          {lab.status === 'Completed' && (
                            <p className="text-[10px] text-slate-500 italic font-semibold">Results: "{lab.results}" | Remarks: {lab.remarks}</p>
                          )}
                        </div>
                        {lab.status === 'Pending' && (
                          <button
                            onClick={() => {
                              setLabReportId(lab.id);
                              setLabTestValue('Hb: 14.2 g/dL, WBC: 7,500/mm3');
                              setLabRemarks('All parameters normal. Recommending regular diet.');
                            }}
                            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-xl border-none cursor-pointer uppercase tracking-wider"
                          >
                            Update Report
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Lab test results edit panel */}
              {labReportId && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <h3 className="text-xs font-black uppercase">Enter Lab Scan Values</h3>
                  <form onSubmit={handleLabReportUpdate} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">Test Parameters / Results Values</label>
                      <input
                        type="text"
                        required
                        value={labTestValue}
                        onChange={(e) => setLabTestValue(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">Pathologist Remarks</label>
                      <input
                        type="text"
                        value={labRemarks}
                        onChange={(e) => setLabRemarks(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 text-xs font-bold pt-2">
                      <button type="button" onClick={() => setLabReportId(null)} className="px-4 py-2 border rounded-xl bg-transparent hover:bg-slate-50 cursor-pointer">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-none cursor-pointer">Publish Diagnostics File</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* 2. Lab: Diagnostics Archives */}
          {activeTab === 'lab_reports' && activeRole === 'lab' && (
            <div className={`border rounded-2xl shadow-sm overflow-hidden text-xs text-left ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <header className="px-6 py-4 border-b border-slate-150">
                <h3 className="text-xs font-black uppercase">Diagnostics Lab Archives</h3>
              </header>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 p-6 space-y-4">
                {activeLabList.filter(l => l.status === 'Completed').length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-bold uppercase">No completed lab scans in archives.</div>
                ) : (
                  activeLabList.filter(l => l.status === 'Completed').map((lab) => (
                    <div key={lab.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-left space-y-2">
                      <div className="flex justify-between">
                        <strong className="text-slate-900 dark:text-white text-sm">{lab.testName}</strong>
                        <span className="text-[10px] text-slate-400">{lab.date}</span>
                      </div>
                      <p className="text-[10px] text-slate-455 font-bold uppercase">Patient: {lab.patientEmail}</p>
                      <div className="p-3 bg-slate-50 dark:bg-slate-955 border border-slate-200 rounded-xl space-y-1 font-semibold leading-relaxed">
                        <p><span className="text-slate-400">Values:</span> {lab.results}</p>
                        <p><span className="text-slate-400">Remarks:</span> {lab.remarks}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}


          {/* ==================== G. PHARMACIST VIEW PANELS ==================== */}
          {/* 1. Pharmacist: Active Doctor Prescriptions list */}
          {activeTab === 'pharmacy_prescriptions' && activeRole === 'pharmacy' && (
            <div className="space-y-6 text-xs text-left">
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Active Doctor Prescriptions</h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {medicalRecords.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 font-bold uppercase">No active prescriptions written.</div>
                  ) : (
                    medicalRecords.map((rec) => (
                      <div key={rec.id} className="py-4 flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <strong className="text-slate-900 dark:text-white text-sm">Patient: {rec.patientEmail}</strong>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Written on: {rec.date} | Consultant: {rec.doctor}</p>
                          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 mt-2 font-mono whitespace-pre-line text-slate-707 dark:text-slate-350">
                            {rec.prescription}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Automatically calculate mock pharmaceutical cost and create billing invoice
                            const amount = 280; // Mock medicine bill
                            const billId = Date.now();
                            const newInvoice = {
                              id: billId,
                              patientEmail: rec.patientEmail,
                              date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                              doctorFee: 0,
                              pharmacyCharges: amount,
                              labCharges: 0,
                              tax: 0,
                              total: amount,
                              status: 'Pending',
                              method: '-'
                            };
                            const updatedInvoices = [newInvoice, ...billingInvoices];
                            localStorage.setItem(`clinic_invoices_${projectId}`, JSON.stringify(updatedInvoices));
                            setBillingInvoices(updatedInvoices);

                            // Deduct inventory items stock simulation
                            const updatedMeds = medicineInventory.map(m => m.id === 301 ? { ...m, stock: Math.max(0, m.stock - 10) } : m);
                            localStorage.setItem(`clinic_pharmacy_${projectId}`, JSON.stringify(updatedMeds));
                            setMedicineInventory(updatedMeds);

                            alert(`Prescription billing slip of ₹${amount} generated successfully. Stock inventory adjusted.`);
                          }}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer uppercase tracking-wider"
                        >
                          Fulfill & Bill
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Pharmacist: Medicine Stock Inventory */}
          {activeTab === 'pharmacy_inventory' && activeRole === 'pharmacy' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-left">
              {/* Form to add medicine stock */}
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">Add Medicine Stock</h3>
                <form onSubmit={handleMedicineSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Medicine Name & Spec</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibuprofen 400mg"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Total Stock</label>
                      <input
                        type="number"
                        required
                        value={medStock}
                        onChange={(e) => setMedStock(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Price per unit (₹)</label>
                      <input
                        type="number"
                        required
                        value={medPrice}
                        onChange={(e) => setMedPrice(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Shelf Location Rack</label>
                    <input
                      type="text"
                      required
                      value={medLocation}
                      onChange={(e) => setMedLocation(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2 text-xs outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl uppercase tracking-wider transition border-none cursor-pointer">
                    Register Medicine
                  </button>
                </form>
              </div>

              {/* Medicine stock grid table */}
              <div className={`lg:col-span-2 p-6 border rounded-2xl shadow-sm overflow-hidden text-left ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase mb-4">Medications Inventory Stock</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-505 uppercase">
                      <th className="p-3">Medicine Name</th>
                      <th className="p-3">Shelf Rack</th>
                      <th className="p-3">Available Stock</th>
                      <th className="p-3">Price per unit</th>
                      <th className="p-3 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {medicineInventory.map((med) => (
                      <tr key={med.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-909 dark:text-white">{med.name}</td>
                        <td className="p-3 font-mono font-semibold text-slate-505">{med.location}</td>
                        <td className="p-3 font-bold">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${med.stock > 10 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                            {med.stock} units
                          </span>
                        </td>
                        <td className="p-3 font-black">₹{med.price}</td>
                        <td className="p-3 pr-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm('Delete this medicine file from inventory?')) {
                                const updated = medicineInventory.filter(m => m.id !== med.id);
                                localStorage.setItem(`clinic_pharmacy_${projectId}`, JSON.stringify(updated));
                                setMedicineInventory(updated);
                              }
                            }}
                            className="text-rose-600 font-bold bg-transparent border-none cursor-pointer hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* ==================== H. PATIENT PORTAL PANELS ==================== */}
          {/* 1. Patient: Find Specialists */}
          {activeTab === 'doctors' && activeRole === 'patient' && (
            <div className="space-y-6 text-xs text-left">
              <div className={`p-6 border rounded-2xl shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-black uppercase tracking-wider mb-2">On-Duty Doctors Directory</h3>
                <p className="text-slate-500 font-semibold leading-relaxed">
                  Browse list of verified consulting specialists and secure your consultation booking slot instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="md:col-span-3 py-16 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 font-bold uppercase">No doctors registered yet.</div>
                ) : (
                  products.map((doc) => (
                    <div key={doc.id} className={`border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/60'
                    }`}>
                      <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                        <img src={doc.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600'} alt={doc.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
                        <span className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-black text-slate-900 dark:text-white border border-slate-100 dark:border-slate-808 shadow-sm">
                          Consult Fee: ₹{doc.price}
                        </span>
                      </div>
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase mb-1.5 ${theme.accentBg}`}>
                            {doc.category}
                          </span>
                          <h4 className="font-extrabold text-slate-909 dark:text-white text-xs uppercase tracking-wider leading-tight">{doc.name}</h4>
                          <p className="text-[10px] font-semibold text-slate-455 mt-1 leading-relaxed">{doc.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            setBookingFormDoctorId(String(doc.id));
                            setActiveTab('book_appointment');
                          }}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition border-none shadow-sm cursor-pointer"
                        >
                          Book Appointment slot
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 2. Patient: Book Appointment Form */}
          {activeTab === 'book_appointment' && activeRole === 'patient' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-xs text-left">
              {/* Form */}
              <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase tracking-wider">Book Consultation</h3>
                <form onSubmit={handleBookAppointment} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">Select Specialist Doctor</label>
                    <select
                      required
                      value={bookingFormDoctorId}
                      onChange={(e) => setBookingFormDoctorId(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
                    >
                      <option value="">Choose Practitioner</option>
                      {products.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.category})</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={bookingFormDate}
                        onChange={(e) => setBookingFormDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">Time Slot</label>
                      <select
                        value={bookingFormTime}
                        onChange={(e) => setBookingFormTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none cursor-pointer font-bold"
                      >
                        {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">Chief Complaint / Symptoms</label>
                    <textarea
                      rows={3}
                      value={bookingFormSymtoms}
                      onChange={(e) => setBookingFormSymtoms(e.target.value)}
                      placeholder="e.g. Mild dental ache, tooth sensitivity since yesterday..."
                      className="w-full bg-slate-50 dark:bg-slate-855 border border-slate-200 dark:border-slate-808 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow border-none cursor-pointer">
                    Submit Booking Request
                  </button>
                </form>
              </div>

              {/* Advisory info */}
              <div className="md:col-span-2 space-y-4">
                <div className={`p-6 border rounded-2xl shadow-sm space-y-2 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <h3 className="text-xs font-black uppercase">Patient Care Advisory</h3>
                  <ul className="list-disc pl-4 text-slate-500 space-y-1.5 leading-relaxed font-semibold">
                    <li>Please arrive 10 minutes prior to your scheduled consultation slot.</li>
                    <li>Verify your active health insurance policies inside the profile portal for cashless claims.</li>
                    <li>All lab tests and clinical report timelines are synced dynamically immediately upon completion.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 3. Patient: My Appointment status history */}
          {activeTab === 'my_appointments' && activeRole === 'patient' && (
            <div className="space-y-4 text-xs text-left">
              <div className={`p-5 border rounded-2xl shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">My Consultation Bookings</h3>
              </div>
              {reservationLoading ? (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400">Loading appointments...</div>
              ) : reservations.length === 0 ? (
                <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase tracking-wider">No consultation bookings.</div>
              ) : (
                reservations.map((res) => (
                  <div key={res.id} className={`p-5 border rounded-2xl shadow-sm flex items-center justify-between gap-4 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                          res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : res.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>{res.status}</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-350">{res.tableNumber}</span>
                      </div>
                      <p className="text-[10px] text-slate-550 font-semibold leading-relaxed">
                        📅 Scheduled for <strong className="text-slate-700 dark:text-slate-300">{res.bookingDate}</strong> at <strong className="text-slate-700 dark:text-slate-300">{res.bookingTime}</strong>
                      </p>
                      {res.notes && <p className="text-[9px] text-slate-400 italic">" Symptoms: {res.notes} "</p>}
                    </div>
                    {res.status === 'Pending' && (
                      <button onClick={() => handleDeleteAppointment(res.id)} className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-bold text-slate-500 transition cursor-pointer bg-white dark:bg-slate-900">
                        Cancel
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* 4. Patient: My Health & Prescriptions EMR */}
          {activeTab === 'my_records' && activeRole === 'patient' && (
            <div className="space-y-4 text-xs text-left">
              <div className={`p-5 border rounded-2xl shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xs font-black uppercase">My Digital Health Record Folder</h3>
              </div>

              {/* Vitals Logger display (Nurses logged data) */}
              {vitalsLogs.filter(v => v.patientEmail === clientEmail).length > 0 && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-[8px] bg-indigo-50 dark:bg-indigo-955 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">Logged Vitals History</span>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {vitalsLogs.filter(v => v.patientEmail === clientEmail).map((v) => (
                      <div key={v.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl leading-relaxed">
                        <span className="text-[8px] text-slate-400 font-bold block mb-1">DATE: {v.date}</span>
                        <p className="font-bold text-[10px]">
                          BP: {v.bp} mmHg <br />
                          Heart Rate: {v.pulse} bpm <br />
                          SpO2: {v.spo2}% | Temp: {v.temp}°F
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnostic lab reports display */}
              {activeLabList.filter(l => l.patientEmail === clientEmail).length > 0 && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-[8px] bg-emerald-50 dark:bg-emerald-955 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">Lab Diagnostics Reports</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeLabList.filter(l => l.patientEmail === clientEmail).map((l) => (
                      <div key={l.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-xl leading-relaxed">
                        <div className="flex justify-between items-center">
                          <strong className="text-slate-909 dark:text-white uppercase text-[10px]">{l.testName}</strong>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${l.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{l.status}</span>
                        </div>
                        {l.status === 'Completed' && (
                          <div className="mt-2 text-[10px] text-slate-600 dark:text-slate-350 space-y-1">
                            <p><span className="text-slate-400 font-bold">Results:</span> {l.results}</p>
                            <p><span className="text-slate-400 font-bold">Remarks:</span> {l.remarks}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation Diagnoses logs */}
              {medicalRecords.filter(r => r.patientEmail === clientEmail).length === 0 ? (
                <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl font-bold text-slate-400 uppercase tracking-wider">
                  No medical reports or prescriptions mapped to this account.
                </div>
              ) : (
                medicalRecords.filter(r => r.patientEmail === clientEmail).map((rec) => (
                  <div key={rec.id} className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="text-left">
                        <h4 className="font-extrabold text-slate-909 dark:text-white text-xs uppercase">{rec.diagnosis}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">Practitioner: <strong className="text-slate-700 dark:text-slate-350">{rec.doctor}</strong></p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold text-slate-450 block">{rec.date}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-955 border border-slate-200/50 dark:border-slate-850 p-4 rounded-xl text-left">
                        <p className="text-[9px] text-slate-405 font-bold uppercase tracking-wider mb-2">💊 Digital Prescription</p>
                        <p className="font-mono text-[10px] whitespace-pre-line text-slate-700 dark:text-slate-355">{rec.prescription || 'No medicines.'}</p>
                      </div>
                      <div className="bg-amber-50/25 dark:bg-amber-955/10 border border-amber-100/50 dark:border-amber-900/30 p-4 rounded-xl text-left">
                        <p className="text-[9px] text-slate-405 font-bold uppercase tracking-wider mb-2">❤️ Clinical Advice & Notes</p>
                        <p className="italic text-[10px] text-slate-600 dark:text-slate-400">{rec.notes}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 5. Patient: Billing Invoices list */}
          {activeTab === 'patient_billing' && activeRole === 'patient' && (
            <div className={`border rounded-2xl shadow-sm overflow-hidden text-xs text-left ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase">My Invoices Ledger</h3>
                <span className="bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded text-[9px] font-black text-emerald-700 uppercase">Settlement Console</span>
              </header>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-505 uppercase">
                    <th className="p-4 pl-6">Invoice ID</th>
                    <th className="p-4">Billing Date</th>
                    <th className="p-4">Breakdown Summary</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Payment Status</th>
                    <th className="p-4 pr-6 text-right">Settlement Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {billingInvoices.filter(i => i.patientEmail === clientEmail).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 font-bold uppercase">No invoices found.</td>
                    </tr>
                  ) : (
                    billingInvoices.filter(i => i.patientEmail === clientEmail).map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                        <td className="p-4 pl-6 font-mono font-bold">#INV-{inv.id}</td>
                        <td className="p-4 font-semibold text-slate-550">{inv.date}</td>
                        <td className="p-4 text-[10px] text-slate-455 leading-relaxed font-semibold">
                          {inv.doctorFee > 0 && `Doctor Consult: ₹${inv.doctorFee}`}
                          {inv.pharmacyCharges > 0 && `Pharmacy/Meds: ₹${inv.pharmacyCharges}`}
                          {inv.labCharges > 0 && `Diagnostics: ₹${inv.labCharges}`}
                        </td>
                        <td className="p-4 font-black text-slate-909 dark:text-white">₹{inv.total}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                            inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                          }`}>{inv.status} {inv.method !== '-' && `(${inv.method})`}</span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          {inv.status === 'Pending' ? (
                            <button
                              onClick={() => handleInvoicePayment(inv.id)}
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[9px] font-bold border-none shadow-sm cursor-pointer uppercase tracking-wider"
                            >
                              Settle Bill Online
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Transaction Completed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Patient Dashboard Tab */}
          {activeTab === 'patient_dashboard' && activeRole === 'patient' && (
            <div className="space-y-6 text-xs text-left">
              {/* Welcome Card & Vitals Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-3xl border shadow-sm md:col-span-2 flex justify-between items-center relative overflow-hidden ${
                  isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border-slate-800' : 'bg-gradient-to-br from-white via-white to-emerald-50/30 border-slate-200'
                }`}>
                  <div className="space-y-2 z-10">
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded text-[8px] font-black uppercase">Wellness Status: Stable</span>
                    <h2 className="text-xl font-black tracking-tight uppercase">Welcome back, {userName || 'Patient'}!</h2>
                    <p className="text-slate-500 font-semibold leading-relaxed">
                      Your medical chart details, upcoming consultations, pharmacy orders, and diagnostics results are fully synchronized with the hospital EMR system.
                    </p>
                  </div>
                  <span className="text-5xl opacity-20 select-none z-0">🏥</span>
                </div>

                <div className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-black uppercase text-[9px] tracking-wider">Emergency Services</span>
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <button onClick={() => alert('🚨 Emergency SOS Dispatched! Ambulance and Trauma response teams notified.')} className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black uppercase tracking-wider transition border-none shadow-sm cursor-pointer text-center">
                      🚨 Trigger SOS Alert
                    </button>
                    <p className="text-[9px] text-slate-400 text-center">Instantly alerts on-duty ambulance dispatch and nurse station.</p>
                  </div>
                </div>
              </div>

              {/* Grid of Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Upcoming Appointment */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3 flex items-center gap-2">📅 Upcoming Appointment</h3>
                  {reservations.length > 0 ? (
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5">
                      <strong className="text-slate-900 dark:text-white block text-[10px] uppercase">{reservations[0].tableNumber}</strong>
                      <p className="text-[10px] text-slate-500 font-semibold">Date: {reservations[0].bookingDate} at {reservations[0].bookingTime}</p>
                      <span className="px-2.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-100">{reservations[0].status}</span>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-400 font-bold uppercase">No upcoming appointments</div>
                  )}
                </div>

                {/* 2. Today's Doctor */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3 flex items-center gap-2">🩺 On-Duty Specialists</h3>
                  <div className="space-y-2">
                    {products.slice(0, 2).map((doc) => (
                      <div key={doc.id} className="p-2 border border-slate-100 dark:border-slate-800 rounded-lg flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                        <img src={doc.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50'} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <strong className="block text-[9px] leading-tight text-slate-800 dark:text-slate-250">{doc.name}</strong>
                          <span className="text-[7px] font-black text-slate-400 uppercase">{doc.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Health Summary */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3 flex items-center gap-2">❤️ Today's Vitals Summary</h3>
                  {vitalsLogs.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 text-[9px]">
                      <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-center">
                        <span className="text-slate-400 block font-bold">BP</span>
                        <strong className="text-[11px] text-slate-800 dark:text-slate-200">{vitalsLogs[0].bp || '120/80'}</strong>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-center">
                        <span className="text-slate-400 block font-bold">PULSE</span>
                        <strong className="text-[11px] text-slate-800 dark:text-slate-200">{vitalsLogs[0].pulse || 72} bpm</strong>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-center">
                        <span className="text-slate-400 block font-bold">SpO2</span>
                        <strong className="text-[11px] text-slate-800 dark:text-slate-200">{vitalsLogs[0].spo2 || 98}%</strong>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-center">
                        <span className="text-slate-400 block font-bold">TEMP</span>
                        <strong className="text-[11px] text-slate-800 dark:text-slate-200">{vitalsLogs[0].temp || 98.6}°F</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-400 font-bold uppercase">No vitals logged today</div>
                  )}
                </div>

                {/* 4. Medicine Reminder */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3 flex items-center gap-2">💊 Active Medication Schedule</h3>
                  <div className="space-y-1.5">
                    <div className="p-2 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl leading-relaxed">
                      <strong className="text-[10px] text-indigo-900 dark:text-indigo-300">Omeprazole 20mg</strong>
                      <p className="text-[9px] text-slate-400">1-0-0 | Before Breakfast (14 Days)</p>
                    </div>
                    <div className="p-2 bg-indigo-50/50 dark:bg-indigo-955/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl leading-relaxed">
                      <strong className="text-[10px] text-indigo-900 dark:text-indigo-300">Paracetamol 650mg</strong>
                      <p className="text-[9px] text-slate-400">As needed | Post meals</p>
                    </div>
                  </div>
                </div>

                {/* 5. Pending Bills */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3 flex items-center gap-2">💳 Outstanding Invoices</h3>
                  {billingInvoices.filter(i => i.status === 'Pending').length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-slate-600 dark:text-slate-350">Gross Total Pending:</span>
                        <strong className="text-rose-600 text-sm">₹{billingInvoices.filter(i => i.status === 'Pending').reduce((sum, inv) => sum + inv.total, 0)}</strong>
                      </div>
                      <button onClick={() => setActiveTab('patient_billing')} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black uppercase transition border-none shadow-sm cursor-pointer text-[9px]">Settle Bills Now</button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-emerald-600 font-bold uppercase">All bills cleared!</div>
                  )}
                </div>

                {/* 6. Latest Lab Report */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3 flex items-center gap-2">🧪 Latest Lab Report</h3>
                  {activeLabList.length > 0 ? (
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl space-y-1">
                      <strong className="text-[10px] text-slate-805 dark:text-slate-250 block uppercase leading-tight">{activeLabList[0].testName}</strong>
                      <div className="flex justify-between items-center text-[8px] mt-2">
                        <span className="text-slate-400 font-bold">STATUS:</span>
                        <span className={`px-2 py-0.5 rounded font-black uppercase ${activeLabList[0].status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{activeLabList[0].status}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-400 font-bold uppercase">No diagnostics reports</div>
                  )}
                </div>
              </div>

              {/* hospital news / tips row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3">Hospital Announcements</h3>
                  <div className="space-y-2 font-semibold text-slate-500">
                    <p className="border-b border-slate-100 dark:border-slate-800 pb-2">🏥 **Specialist OPD timings updated**: New neurology clinic operates Mon-Sat (09:00 AM - 01:00 PM).</p>
                    <p className="border-b border-slate-100 dark:border-slate-800 pb-2">💉 **Booster drives**: Preventative wellness checkup blocks available for senior citizens this week.</p>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3">Daily Health Tip</h3>
                  <p className="font-semibold text-slate-500 leading-relaxed">
                    🍉 **Hydration is key**: Drinking 2.5 to 3 liters of water daily helps maintain clean cardiovascular vitals and regulates body temperature. Avoid caffeine and carbonated sodas during recovery phases.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Doctor Dashboard Tab */}
          {activeTab === 'doctor_dashboard' && activeRole === 'doctor' && (
            <div className="space-y-6 text-xs text-left">
              {/* Doctor Header */}
              <div className={`p-6 rounded-3xl border shadow-sm flex justify-between items-center relative overflow-hidden ${
                isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-955/20 border-slate-800' : 'bg-gradient-to-br from-white via-white to-emerald-50/20 border-slate-200'
              }`}>
                <div className="space-y-2 z-10">
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded text-[8px] font-black uppercase">Specialist Portal Active</span>
                  <h2 className="text-xl font-black tracking-tight uppercase">Welcome back, Dr. Jenkins!</h2>
                  <p className="text-slate-500 font-semibold leading-relaxed">
                    Check today's schedule, EMR prescriptions registries, lab test diagnostic orders, and review live queues.
                  </p>
                </div>
                <span className="text-5xl opacity-20 select-none z-0">🩺</span>
              </div>

              {/* Stats & Emergency alerts row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Today's Appointments</span>
                  <h3 className="text-xl font-black mt-1">{reservations.length}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold mt-1">Booked Slots</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Patients Waiting</span>
                  <h3 className="text-xl font-black mt-1">{clinicalQueue.filter(q => q.status === 'Waiting').length}</h3>
                  <p className="text-[10px] text-amber-500 font-bold mt-1">In Queue</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Pending Lab Reports</span>
                  <h3 className="text-xl font-black mt-1">{activeLabList.filter(l => l.status === 'Pending').length}</h3>
                  <p className="text-[10px] text-indigo-500 font-bold mt-1">Under Diagnostic Review</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm bg-rose-500/10 border-rose-500/30`}>
                  <div className="flex justify-between items-center">
                    <span className="text-rose-600 dark:text-rose-450 font-black uppercase text-[9px] tracking-wider">Emergency Alerts</span>
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-sm font-black mt-2 text-rose-600 dark:text-rose-440">Critical: 0 Active</h3>
                  <p className="text-[9px] text-rose-500 font-semibold mt-1">Ambulance dispatcher idle</p>
                </div>
              </div>

              {/* Doctor Dashboard widgets layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Next Patient */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3">Next Patient in Clinic</h3>
                  {clinicalQueue.filter(q => q.status === 'Waiting').length > 0 ? (
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl space-y-2">
                      <strong className="text-[10px] uppercase text-slate-805 dark:text-slate-200 block">{clinicalQueue.filter(q => q.status === 'Waiting')[0].patientName}</strong>
                      <p className="text-[9px] text-slate-400 font-bold">Time: {clinicalQueue.filter(q => q.status === 'Waiting')[0].time}</p>
                      <button onClick={() => {
                        setNewConsultEmail(clinicalQueue.filter(q => q.status === 'Waiting')[0].email);
                        setActiveTab('doctor_consults');
                      }} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition border-none shadow-sm cursor-pointer">
                        Start consultation
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-455 font-bold uppercase">No patient waiting.</div>
                  )}
                </div>

                {/* Follow-up reminders */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3">Follow-up Reminders</h3>
                  <div className="space-y-1.5">
                    <p className="border-b border-slate-100 dark:border-slate-800 pb-1.5">⏰ Patient **patient@gmail.com**: Chronic Acid Reflux review due in 3 days.</p>
                    <p className="border-b border-slate-100 dark:border-slate-800 pb-1.5">⏰ Patient **robert@gmail.com**: Post-surgery vitals monitoring scheduled.</p>
                  </div>
                </div>

                {/* Doctor Quick Actions */}
                <div className={`p-5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xs font-black uppercase mb-3">Quick Operations</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setActiveTab('doctor_schedule')} className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-955 font-bold text-center border-solid cursor-pointer">📅 Schedule</button>
                    <button onClick={() => setActiveTab('doctor_consults')} className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-955 font-bold text-center border-solid cursor-pointer">🩺 Consults</button>
                    <button onClick={() => setActiveTab('doctor_prescriptions')} className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-355 bg-white dark:bg-slate-955 font-bold text-center border-solid cursor-pointer">💊 Prescribe</button>
                    <button onClick={() => setActiveTab('doctor_lab_requests')} className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-355 bg-white dark:bg-slate-955 font-bold text-center border-solid cursor-pointer">🧪 Request Lab</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Extra Tabs Panel */}
          {![
            'overview', 'doctors_registry', 'appointments_admin', 'records_admin', 'billing_admin', 'settings',
            'doctor_schedule', 'doctor_consults',
            'reception_queue', 'reception_register',
            'nurse_monitoring', 'nurse_vitals',
            'lab_queue', 'lab_reports',
            'pharmacy_prescriptions', 'pharmacy_inventory',
            'doctors', 'book_appointment', 'my_appointments', 'my_records', 'patient_billing', 'profile',
            'patient_dashboard', 'doctor_dashboard'
          ].includes(activeTab) && (
            <div className="space-y-6 text-xs text-left">
              {/* Dynamic Pane Header */}
              <div className={`p-6 border rounded-2xl shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-black uppercase tracking-wider mb-2">
                  {activeTab.replace('patient_', 'Patient: ').replace('doctor_', 'Doctor: ').replace('_management', ' Management').replace('_admin', ' Admin').replace('_', ' ')}
                </h3>
                <p className="text-slate-500 font-semibold leading-relaxed">
                  Clinical subsystem management panel. Configured live with verified parameters.
                </p>
              </div>

              {/* Custom High-Fidelity Mock content depending on the tab clicked */}
              {activeTab === 'patients_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <strong className="text-xs font-black uppercase">Registered Patient Registry Directory</strong>
                    <button onClick={() => setActiveTab('reception_register')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold border-none cursor-pointer">Register New Patient</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-bold uppercase">
                          <th className="pb-2">Patient Name</th>
                          <th className="pb-2">Contact Email</th>
                          <th className="pb-2">Registered Phone</th>
                          <th className="pb-2">EMR Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-600 dark:text-slate-350">
                        <tr className="py-2">
                          <td className="py-2.5 font-bold">John Doe</td>
                          <td>patient@gmail.com</td>
                          <td>+91 98765 43210</td>
                          <td><span className="px-2 py-0.5 rounded text-[8px] bg-emerald-100 text-emerald-800 uppercase font-black">Active File</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold">Robert Vance</td>
                          <td>robert@gmail.com</td>
                          <td>+91 99999 88888</td>
                          <td><span className="px-2 py-0.5 rounded text-[8px] bg-emerald-100 text-emerald-800 uppercase font-black">Active File</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'departments_management' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'ENT', 'Oncology', 'Gynecology', 'Dental'].map((dept) => (
                    <div key={dept} className={`p-5 border rounded-2xl shadow-sm space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <strong className="block text-slate-900 dark:text-white uppercase font-black">{dept} Department</strong>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                        <span>Staff On-duty: 8</span>
                        <span>Bed Capacity: 15</span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-100">Operational</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bed_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Bed Allocation & ICU Occupancy Report</strong>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { num: 'ICU-101', type: 'ICU Bed', status: 'Occupied' },
                      { num: 'ICU-102', type: 'ICU Bed', status: 'Occupied' },
                      { num: 'ICU-103', type: 'ICU Bed', status: 'Vacant' },
                      { num: 'GEN-201', type: 'General Ward', status: 'Occupied' },
                      { num: 'GEN-202', type: 'General Ward', status: 'Vacant' },
                      { num: 'GEN-203', type: 'General Ward', status: 'Vacant' },
                      { num: 'PVT-301', type: 'Private Room', status: 'Occupied' },
                      { num: 'PVT-302', type: 'Private Room', status: 'Vacant' },
                      { num: 'DLX-401', type: 'Deluxe Suite', status: 'Occupied' },
                      { num: 'DLX-402', type: 'Deluxe Suite', status: 'Vacant' }
                    ].map((bed) => (
                      <div key={bed.num} className={`p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-900/55 text-center space-y-1`}>
                        <strong className="block text-[10px] font-black text-slate-805 dark:text-slate-200">{bed.num}</strong>
                        <span className="block text-[8px] text-slate-400 font-bold uppercase">{bed.type}</span>
                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${bed.status === 'Occupied' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>{bed.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'emergency_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Emergency Critical Dispatch Log</strong>
                  <div className="space-y-3">
                    <div className="p-4 border border-rose-105 dark:border-rose-900/30 bg-rose-50/20 dark:bg-rose-955/10 rounded-xl flex justify-between items-center">
                      <div>
                        <strong className="text-rose-600 dark:text-rose-455 text-[10px] uppercase font-black">Sirens Dispatch Active: Ambulance DL3C-4321</strong>
                        <p className="text-[9px] text-slate-400 font-semibold mt-1">Dispatched to: Connaught Place, Block E (Trauma Alert)</p>
                      </div>
                      <span className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[8px] font-black uppercase tracking-wider animate-pulse">On Route</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'laboratory_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Diagnostic Laboratory Test Queue Log</strong>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {activeLabList.map((lab) => (
                      <div key={lab.id} className="py-2.5 flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-slate-808 dark:text-slate-250 uppercase">{lab.testName}</strong>
                          <p className="text-[9px] text-slate-400 mt-0.5">Patient: {lab.patientEmail} | Date: {lab.date}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${lab.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{lab.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'pharmacy_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Pharmacy Stock Ledger</strong>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {medicineInventory.map((med) => (
                      <div key={med.id} className="p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-900/50 leading-relaxed space-y-1">
                        <strong className="text-slate-805 dark:text-slate-200 block text-[10px]">{med.name}</strong>
                        <p className="text-[9px] text-slate-400 font-bold">Stock: {med.stock} units | Price: ₹{med.price}</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${med.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-805'}`}>
                          {med.stock > 10 ? 'Healthy Stock' : 'Low Stock'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'insurance_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Cashless Insurance Claims Ledger</strong>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-bold uppercase">
                          <th className="pb-2">Claim ID</th>
                          <th className="pb-2">Patient Email</th>
                          <th className="pb-2">Insurance Provider</th>
                          <th className="pb-2">Claim Amount</th>
                          <th className="pb-2">Claim Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-650 dark:text-slate-350">
                        <tr>
                          <td className="py-2.5">#CLM-40291</td>
                          <td>patient@gmail.com</td>
                          <td>Star Health Insurance</td>
                          <td>₹24,500</td>
                          <td><span className="px-2 py-0.5 rounded text-[8px] bg-emerald-100 text-emerald-800 uppercase font-black">Approved</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5">#CLM-40292</td>
                          <td>robert@gmail.com</td>
                          <td>HDFC Ergo General Insurance</td>
                          <td>₹1,12,000</td>
                          <td><span className="px-2 py-0.5 rounded text-[8px] bg-amber-105 text-amber-800 uppercase font-black">Under Review</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'nurse_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Ward Nursing Roster Assignments</strong>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Nurse R. Davis', shift: 'Morning Shift (08 AM - 04 PM)', ward: 'ICU Ward A' },
                      { name: 'Nurse M. Thompson', shift: 'Evening Shift (04 PM - 12 AM)', ward: 'General Ward B' },
                      { name: 'Nurse J. Carter', shift: 'Night Shift (12 AM - 08 AM)', ward: 'Admissions Emergency' }
                    ].map((nurse) => (
                      <div key={nurse.name} className="p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-900/50 leading-relaxed">
                        <strong className="text-[10px] text-slate-808 dark:text-slate-200 block">{nurse.name}</strong>
                        <p className="text-[9px] text-slate-500 font-bold mt-1">Shift: {nurse.shift}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Assigned Ward: {nurse.ward}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'staff_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Non-Clinical Support Staff Directory</strong>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Sarah Connor', role: 'Chief Receptionist Desk', dept: 'Patient Intake Lobby' },
                      { name: 'Alan Turing', role: 'Pharmacy Stock Lead', dept: 'Pharmacy Dispensing Rack' },
                      { name: 'Grace Hopper', role: 'Senior Pathologist Lab Lead', dept: 'Diagnostics Room' },
                      { name: 'Linus Torvalds', role: 'Security & Attendance Roster Lead', dept: 'Operations Room' }
                    ].map((staff) => (
                      <div key={staff.name} className="p-4 border rounded-xl bg-slate-50/55 dark:bg-slate-900/55 flex justify-between items-center">
                        <div>
                          <strong className="text-[10px] text-slate-805 dark:text-slate-200 block">{staff.name}</strong>
                          <span className="text-[8px] text-slate-400 font-black uppercase">{staff.role}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[8px] bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold">{staff.dept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ambulance_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Ambulance Fleet & Drivers Dispatch Status</strong>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { reg: 'DL3C-4321', driver: 'Rahul Sharma', status: 'Dispatched' },
                      { reg: 'DL3C-9012', driver: 'Amit Patel', status: 'Standby' },
                      { reg: 'DL3C-5566', driver: 'Vikram Singh', status: 'Standby' }
                    ].map((amb) => (
                      <div key={amb.reg} className="p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
                        <div className="flex justify-between items-center">
                          <strong className="text-[10px] font-mono">{amb.reg}</strong>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${amb.status === 'Dispatched' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>{amb.status}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 font-semibold">Driver: {amb.driver}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inventory_management' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Medical Consumables & Equipment Stock levels</strong>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Ventilators', stock: 12, alert: 'Normal' },
                      { name: 'Surgical Gloves (boxes)', stock: 85, alert: 'Normal' },
                      { name: 'N95 Masks (boxes)', stock: 5, alert: 'Low Stock' },
                      { name: 'Oxygen Cylinders', stock: 40, alert: 'Normal' }
                    ].map((item) => (
                      <div key={item.name} className="p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
                        <strong className="text-[10px] text-slate-800 dark:text-slate-200 block">{item.name}</strong>
                        <p className="text-[9px] text-slate-400 font-bold">Qty: {item.stock}</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${item.alert === 'Normal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>{item.alert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reports_analytics' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Clinical Operations Financial Analytics</strong>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-center space-y-1 rounded-xl">
                      <span className="text-slate-400 font-bold uppercase text-[8px] tracking-wider block">Average Patient Growth</span>
                      <strong className="text-base font-black">+14.5%</strong>
                      <p className="text-[8px] text-emerald-500 font-bold">Month over Month</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-center space-y-1 rounded-xl">
                      <span className="text-slate-400 font-bold uppercase text-[8px] tracking-wider block">Bed Occupancy Rate</span>
                      <strong className="text-base font-black">68.2%</strong>
                      <p className="text-[8px] text-emerald-500 font-bold">Optimal Range</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-center space-y-1 rounded-xl">
                      <span className="text-slate-400 font-bold uppercase text-[8px] tracking-wider block">Average Consultation Duration</span>
                      <strong className="text-base font-black">18.5 Mins</strong>
                      <p className="text-[8px] text-indigo-500 font-bold">Per Patient Visit</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews_feedback' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Patient Feedback & Hospital Star Ratings</strong>
                  <div className="space-y-3 font-semibold text-slate-500">
                    <p className="border-b border-slate-105 dark:border-slate-800 pb-2">⭐ **5/5** (patient@gmail.com): "Extremely professional doctors and support staff. Clean intake facilities and swift EMR logs."</p>
                    <p className="border-b border-slate-105 dark:border-slate-800 pb-2">⭐ **4.5/5** (robert@gmail.com): "Good nursing service, vital monitoring is on-time. Settle bills console is fast."</p>
                  </div>
                </div>
              )}

              {activeTab === 'patient_support' && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Raise Support Ticket / Contact Desk</strong>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Support ticket registered. Representative will email you shortly.'); }} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Issue Category</label>
                        <select className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold focus:outline-none">
                          <option>Billing Invoice Discrepancy</option>
                          <option>OPD Doctor Booking Reschedule</option>
                          <option>Prescription Stock Outages</option>
                          <option>Diagnostics Report Missing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Contact Email</label>
                        <input type="email" defaultValue={clientEmail} className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Describe Details</label>
                      <textarea placeholder="Write message..." className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold focus:outline-none h-20" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold border-none cursor-pointer">Submit Ticket</button>
                  </form>
                </div>
              )}

              {/* Chat messages */}
              {(activeTab === 'patient_messages' || activeTab === 'doctor_messages') && (
                <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong className="text-xs font-black uppercase block border-b border-slate-100 dark:border-slate-800 pb-3">Active Consultation Chat Portal</strong>
                  <div className="h-48 border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 overflow-y-auto space-y-3 font-semibold text-slate-550 leading-relaxed">
                    <div className="text-left bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 rounded-2xl max-w-sm border border-indigo-100/30">
                      <span className="text-[8px] text-indigo-700 dark:text-indigo-400 block font-bold mb-1">DR. SARAH JENKINS (10:15 AM)</span>
                      Hello! Please make sure to log your SpO2 vitals history daily. Avoid spicy meals.
                    </div>
                    <div className="text-right ml-auto bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-2xl max-w-sm border border-emerald-100/30">
                      <span className="text-[8px] text-emerald-700 dark:text-emerald-455 block font-bold mb-1">PATIENT (10:20 AM)</span>
                      Understood, doctor! I have updated my profile address and booked a follow-up consultation.
                    </div>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Message dispatched over secure server.'); }} className="flex gap-2">
                    <input placeholder="Type secure chat message..." className="flex-1 p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold focus:outline-none" />
                    <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold border-none cursor-pointer">Send</button>
                  </form>
                </div>
              )}

              {/* Patient: Health Packages */}
              {activeTab === 'patient_health_packages' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Preventative Heart Checkup', price: '2,499', tests: 'ECG, Lipid Profile, BP Vitals, Cardiology Consultation' },
                    { name: 'Complete Executive Health Check', price: '4,999', tests: 'CBC, Urine Test, X-Ray, CT Scan, Diabetology Consult' },
                    { name: 'Senior Citizen Care Check', price: '1,999', tests: 'Blood Sugar, Bone Density, General Practice Consultation' }
                  ].map((pkg) => (
                    <div key={pkg.name} className={`p-5 border rounded-2xl shadow-sm flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="space-y-1.5">
                        <strong className="block text-slate-900 dark:text-white uppercase font-black">{pkg.name}</strong>
                        <p className="text-[9px] text-slate-400">Included: {pkg.tests}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <strong className="text-emerald-600 font-black">₹{pkg.price}</strong>
                        <button onClick={() => { alert(`Package ${pkg.name} requested successfully! Medical staff will allocate booking date.`); }} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold border-none cursor-pointer text-[9px]">Book Package</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* fallback message for settings / notification preferences / other simple tabs */}
              {![
                'patients_management', 'departments_management', 'bed_management', 'emergency_management',
                'laboratory_management', 'pharmacy_management', 'insurance_management', 'nurse_management',
                'staff_management', 'ambulance_management', 'inventory_management', 'reports_analytics',
                'reviews_feedback', 'patient_support', 'patient_messages', 'doctor_messages', 'patient_health_packages'
              ].includes(activeTab) && (
                <div className={`p-6 border rounded-2xl shadow-sm text-slate-400 font-bold uppercase text-center ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  Configuration Settings & Roster Settings active. Adjust parameters inside the main clinical settings dashboard.
                </div>
              )}

            </div>
          )}

          {/* 6. Patient Profile */}
          {activeTab === 'profile' && activeRole === 'patient' && (
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
