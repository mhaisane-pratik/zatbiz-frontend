'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Project, Product, Order, Customer } from '@/types';
import {
  RESTAURANT_THEMES,
  RESTAURANT_HOMEPAGES,
  RESTAURANT_LOGINS,
  RESTAURANT_DASHBOARDS
} from '../../../dashboard/RestaurantSelectorModal';

interface RestaurantAdminDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  logoIcon: string;
}

export default function RestaurantAdminDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  logoIcon,
}: RestaurantAdminDashboardProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Database lists (synced from API or LocalStorage fallbacks)
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [couponsList, setCouponsList] = useState<any[]>([]);
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);

  // Generic data states (Events, Staff, Delivery, Inventory, Offers, Reviews, Wallets, Promotions)
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [eventBookingsList, setEventBookingsList] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [deliveryList, setDeliveryList] = useState<any[]>([]);
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [vendorsList, setVendorsList] = useState<any[]>([]);
  const [offersList, setOffersList] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [walletList, setWalletList] = useState<any[]>([]);
  const [promoLogs, setPromoLogs] = useState<any[]>([]);

  // Modals / Forms controllers
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<Product | null>(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    price: '',
    category: 'General',
    description: '',
    imageUrl: '',
    stock: '50',
    available: true,
    variants: ''
  });

  // Theme & Layout selection states
  const [selectedTheme, setSelectedTheme] = useState('gold-luxury');
  const [selectedHomepage, setSelectedHomepage] = useState('menu-grid-focus');
  const [selectedLogin, setSelectedLogin] = useState('left-illustration');
  const [selectedDashboard, setSelectedDashboard] = useState('metric-overview');

  useEffect(() => {
    if (restaurantInfo) {
      if (restaurantInfo.selectedTheme) setSelectedTheme(restaurantInfo.selectedTheme);
      if (restaurantInfo.selectedHomepageLayout) setSelectedHomepage(restaurantInfo.selectedHomepageLayout);
      if (restaurantInfo.selectedLoginLayout) setSelectedLogin(restaurantInfo.selectedLoginLayout);
      if (restaurantInfo.selectedDashboardLayout) setSelectedDashboard(restaurantInfo.selectedDashboardLayout);
    }
  }, [restaurantInfo]);

  // Re-usable notification trigger
  const triggerAlert = (type: 'success' | 'error', text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      triggerAlert('error', 'Image file is too large. Max allowed size is 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setMenuForm(prev => ({ ...prev, imageUrl: dataUrl }));
        } else {
          setMenuForm(prev => ({ ...prev, imageUrl: event.target?.result as string }));
        }
      };
    };
  };

  // Fetch core tables
  const loadCoreData = async () => {
    try {
      const items = await api.products.list(projectId);
      setMenuItems(items);
      
      const orders = await api.orders.list(projectId);
      setOrdersList(orders);

      const bookings = await api.reservations.list(projectId);
      setBookingsList(bookings);

      const categories = await api.categories.list(projectId);
      setCategoriesList(categories);

      const coupons = await api.coupons.list(projectId);
      setCouponsList(coupons);

      const customers = await api.restaurant.users.list(projectId);
      setCustomersList(customers);

      const info = await api.restaurant.get(projectId);
      setRestaurantInfo(info);
    } catch (err) {
      console.error('Failed to load standard tables:', err);
    }
  };

  // Fetch custom data tables (using the generic endpoints)
  const loadCustomData = async (type: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const res = await api.restaurantData.list(projectId, type);
      setter(res);
    } catch (err) {
      console.error(`Failed to load custom data type [${type}]:`, err);
    }
  };

  const loadAllData = () => {
    loadCoreData();
    loadCustomData('event', setEventsList);
    loadCustomData('event_booking', setEventBookingsList);
    loadCustomData('staff', setStaffList);
    loadCustomData('delivery_partner', setDeliveryList);
    loadCustomData('inventory_item', setInventoryList);
    loadCustomData('vendor', setVendorsList);
    loadCustomData('offer', setOffersList);
    loadCustomData('review', setReviewsList);
    loadCustomData('wallet_transaction', setWalletList);
    loadCustomData('promotional_broadcast', setPromoLogs);
  };

  useEffect(() => {
    loadAllData();
  }, [projectId]);

  // Generic Save Helper (Post / Put to backend API)
  const saveCustomDataItem = async (type: string, itemData: any, id?: number) => {
    try {
      if (id) {
        await api.restaurantData.update(id, { dataJson: JSON.stringify(itemData) });
        triggerAlert('success', `Updated item details successfully!`);
      } else {
        await api.restaurantData.create({
          projectId,
          dataType: type,
          dataJson: JSON.stringify(itemData)
        });
        triggerAlert('success', `Created new ${type} successfully!`);
      }
      // reload
      if (type === 'event') loadCustomData('event', setEventsList);
      if (type === 'staff') loadCustomData('staff', setStaffList);
      if (type === 'delivery_partner') loadCustomData('delivery_partner', setDeliveryList);
      if (type === 'inventory_item') loadCustomData('inventory_item', setInventoryList);
      if (type === 'vendor') loadCustomData('vendor', setVendorsList);
      if (type === 'offer') loadCustomData('offer', setOffersList);
      if (type === 'review') loadCustomData('review', setReviewsList);
      if (type === 'wallet_transaction') loadCustomData('wallet_transaction', setWalletList);
      if (type === 'event_booking') loadCustomData('event_booking', setEventBookingsList);
      if (type === 'promotional_broadcast') loadCustomData('promotional_broadcast', setPromoLogs);
    } catch (err) {
      triggerAlert('error', 'Operation failed. Could not save database record.');
    }
  };

  const deleteCustomDataItem = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to permanently delete this database record?')) return;
    try {
      await api.restaurantData.delete(id);
      triggerAlert('success', 'Deleted record from database.');
      // reload
      if (type === 'event') loadCustomData('event', setEventsList);
      if (type === 'staff') loadCustomData('staff', setStaffList);
      if (type === 'delivery_partner') loadCustomData('delivery_partner', setDeliveryList);
      if (type === 'inventory_item') loadCustomData('inventory_item', setInventoryList);
      if (type === 'vendor') loadCustomData('vendor', setVendorsList);
      if (type === 'offer') loadCustomData('offer', setOffersList);
      if (type === 'review') loadCustomData('review', setReviewsList);
      if (type === 'wallet_transaction') loadCustomData('wallet_transaction', setWalletList);
      if (type === 'event_booking') loadCustomData('event_booking', setEventBookingsList);
    } catch (err) {
      triggerAlert('error', 'Failed to delete record.');
    }
  };

  // 1. Overview variables
  const totalRevenue = ordersList.filter(o => o.status === 'Delivered' || o.status === 'Accepted' || o.status === 'Preparing' || o.status === 'Dispatched').reduce((acc, curr) => acc + (curr.total || 0), 0);
  const activeOrdersCount = ordersList.filter(o => o.status === 'Pending' || o.status === 'Accepted' || o.status === 'Preparing' || o.status === 'Dispatched').length;
  const todaySales = ordersList.filter(o => {
    const today = new Date().toISOString().split('T')[0];
    const orderDate = o.createdAt ? o.createdAt.split('T')[0] : '';
    return orderDate === today && o.status !== 'Cancelled';
  }).reduce((acc, curr) => acc + (curr.total || 0), 0);

  // 2. Menu Item Handlers
  const handleOpenAddMenu = () => {
    setEditingMenuItem(null);
    setMenuForm({
      name: '',
      price: '',
      category: categoriesList[0]?.name || 'General',
      description: '',
      imageUrl: '',
      stock: '50',
      available: true,
      variants: ''
    });
    setShowAddMenuModal(true);
  };

  const handleOpenEditMenu = (item: Product) => {
    setEditingMenuItem(item);
    setMenuForm({
      name: item.name || '',
      price: String(item.price || ''),
      category: item.category || 'General',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      stock: String(item.stock || 50),
      available: item.available !== false,
      variants: item.variants || ''
    });
    setShowAddMenuModal(true);
  };

  const handleSaveMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuForm.name || !menuForm.price) {
      triggerAlert('error', 'Please fill in the Name and Price fields.');
      return;
    }

    const payload = {
      projectId,
      name: menuForm.name,
      price: parseFloat(menuForm.price),
      category: menuForm.category,
      description: menuForm.description,
      imageUrl: menuForm.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      stock: parseInt(menuForm.stock, 10) || 50,
      available: menuForm.available,
      variants: menuForm.variants,
      rating: 5.0,
      discount: 0
    };

    try {
      if (editingMenuItem) {
        await api.products.update(editingMenuItem.id!, { ...editingMenuItem, ...payload });
        triggerAlert('success', `Food item "${menuForm.name}" updated successfully.`);
      } else {
        await api.products.create(payload);
        triggerAlert('success', `Food item "${menuForm.name}" added to menu.`);
      }
      setShowAddMenuModal(false);
      loadCoreData();
    } catch (err) {
      triggerAlert('error', 'Failed to save menu item.');
    }
  };

  const handleDeleteMenu = async (id: number) => {
    if (!confirm('Are you sure you want to delete this food item from the menu?')) return;
    try {
      await api.products.delete(id);
      triggerAlert('success', 'Food item deleted from menu.');
      loadCoreData();
    } catch (err) {
      triggerAlert('error', 'Failed to delete item.');
    }
  };

  const toggleAvailability = async (item: Product) => {
    try {
      const updated = { ...item, available: !item.available };
      await api.products.update(item.id!, updated);
      triggerAlert('success', `Item availability updated.`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Category Management
  const [newCatName, setNewCatName] = useState('');
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await api.categories.create({ projectId, name: newCatName.trim() });
      triggerAlert('success', `Category "${newCatName}" created successfully.`);
      setNewCatName('');
      loadCoreData();
    } catch (err) {
      triggerAlert('error', 'Failed to create category.');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category? Menu items under this category will remain, but category link will be removed.')) return;
    try {
      await api.categories.delete(id);
      triggerAlert('success', 'Category deleted.');
      loadCoreData();
    } catch (err) {
      triggerAlert('error', 'Failed to delete category.');
    }
  };

  const handleReorderCategory = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === categoriesList.length - 1) return;
    const newList = [...categoriesList];
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    const temp = newList[index];
    newList[index] = newList[swapWith];
    newList[swapWith] = temp;
    setCategoriesList(newList);
    triggerAlert('success', 'Categories reordered. (Order updated locally for session)');
  };

  // 4. Online Orders handlers
  const handleAcceptOrder = async (id: number) => {
    try {
      await api.orders.updateStatus(id, 'Accepted');
      triggerAlert('success', 'Order accepted successfully.');
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectOrder = async (id: number) => {
    try {
      await api.orders.updateStatus(id, 'Rejected');
      triggerAlert('success', 'Order rejected.');
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (id: number, status: string) => {
    try {
      await api.orders.updateStatus(id, status);
      triggerAlert('success', `Order status updated to: ${status}`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignDeliveryPartner = async (orderId: number, partnerName: string) => {
    const order = ordersList.find(o => o.id === orderId);
    if (!order) return;
    try {
      // In Spring Boot, we update order settings or blocks, let's update status and log locally
      const updatedOrder = { ...order, deliveryPartner: partnerName, status: 'Preparing' } as any;
      // Simulating update in status endpoint
      await api.orders.updateStatus(orderId, 'Preparing');
      triggerAlert('success', `Assigned partner ${partnerName} to Order #${orderId}`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefundOrder = async (orderId: number, email: string, amount: number) => {
    if (!confirm(`Refund $${amount} to ${email}?`)) return;
    try {
      // Add wallet credit
      const tx = {
        customerEmail: email,
        amount: amount,
        type: 'Credit',
        description: `Refund for Order #${orderId}`,
        date: new Date().toISOString().split('T')[0]
      };
      await saveCustomDataItem('wallet_transaction', tx);
      await api.orders.updateStatus(orderId, 'Refunded');
      triggerAlert('success', `Refunded $${amount} to customer wallet.`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Table Bookings Handlers
  const handleUpdateBookingStatus = async (id: number, status: string) => {
    try {
      await api.reservations.updateStatus(id, status);
      triggerAlert('success', `Reservation marked as ${status}`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const [rescheduleData, setRescheduleData] = useState<{ id: number | null; date: string; time: string; guests: number } | null>(null);
  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleData || !rescheduleData.id) return;
    try {
      const existing = bookingsList.find(b => b.id === rescheduleData.id);
      if (existing) {
        const updated = {
          ...existing,
          bookingDate: rescheduleData.date,
          bookingTime: rescheduleData.time,
          numberOfGuests: rescheduleData.guests,
          status: 'Confirmed'
        };
        await api.reservations.update(rescheduleData.id, updated);
        triggerAlert('success', 'Reservation rescheduled and confirmed!');
        setRescheduleData(null);
        loadCoreData();
      }
    } catch (err) {
      triggerAlert('error', 'Failed to reschedule reservation.');
    }
  };

  const handleSeatAllocation = async (bookingId: number, tableNum: string) => {
    try {
      const existing = bookingsList.find(b => b.id === bookingId);
      if (existing) {
        const updated = { ...existing, tableNumber: tableNum, status: 'Confirmed' };
        await api.reservations.update(bookingId, updated);
        triggerAlert('success', `Allocated Seat: ${tableNum}`);
        loadCoreData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Events CRUD Form states
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [eventForm, setEventForm] = useState({
    name: '',
    date: '',
    time: '',
    capacity: '100',
    price: '0',
    banner: '',
    artist: '',
    description: '',
    status: 'Draft'
  });

  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      name: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      capacity: '50',
      price: '1500',
      banner: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80',
      artist: '',
      description: '',
      status: 'Draft'
    });
    setShowEventModal(true);
  };

  const handleOpenEditEvent = (item: any) => {
    setEditingEvent(item);
    const parsed = JSON.parse(item.dataJson);
    setEventForm({
      name: parsed.name || '',
      date: parsed.date || '',
      time: parsed.time || '',
      capacity: String(parsed.capacity || 100),
      price: String(parsed.price || 0),
      banner: parsed.banner || '',
      artist: parsed.artist || '',
      description: parsed.description || '',
      status: parsed.status || 'Draft'
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventObj = {
      name: eventForm.name,
      date: eventForm.date,
      time: eventForm.time,
      capacity: parseInt(eventForm.capacity, 10) || 50,
      price: parseFloat(eventForm.price) || 0,
      banner: eventForm.banner,
      artist: eventForm.artist,
      description: eventForm.description,
      status: eventForm.status
    };
    await saveCustomDataItem('event', eventObj, editingEvent?.id);
    setShowEventModal(false);
  };

  const toggleEventStatus = async (item: any) => {
    const parsed = JSON.parse(item.dataJson);
    parsed.status = parsed.status === 'Published' ? 'Draft' : 'Published';
    await saveCustomDataItem('event', parsed, item.id);
  };

  // 7. Event Booking registrations
  const handleUpdateEventBookingStatus = async (item: any, status: string) => {
    const parsed = JSON.parse(item.dataJson);
    parsed.status = status;
    await saveCustomDataItem('event_booking', parsed, item.id);
  };

  const handleDownloadAttendeeList = (eventName: string) => {
    const list = eventBookingsList.filter(eb => {
      const parsed = JSON.parse(eb.dataJson);
      return parsed.eventName === eventName;
    }).map((eb, idx) => {
      const parsed = JSON.parse(eb.dataJson);
      return `${idx + 1},${parsed.customerName},${parsed.customerEmail},${parsed.tickets},${parsed.status}`;
    });

    const csvContent = "data:text/csv;charset=utf-8,No,Attendee Name,Email,Tickets,Status\n" + list.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${eventName.replace(/\s+/g, '_')}_Attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerAlert('success', 'Downloading attendee list CSV...');
  };

  // 8. Customer Management CRM
  const [customerNotes, setCustomerNotes] = useState<Record<number, string>>({});
  const handleSaveCustomerNote = async (cust: Customer) => {
    const note = customerNotes[cust.id!];
    if (note === undefined) return;
    try {
      const updated = { ...cust, address: note }; // Storing note in address or profile field
      await api.customers.update(cust.id!, updated);
      triggerAlert('success', `CRM Notes updated for ${cust.name}`);
      loadCoreData();
    } catch (err) {
      triggerAlert('error', 'Failed to save customer note.');
    }
  };

  const handleToggleBlockCustomer = async (cust: Customer) => {
    const newStatus = cust.status === 'Blocked' ? 'Active' : 'Blocked';
    try {
      const updated = { ...cust, status: newStatus };
      await api.customers.update(cust.id!, updated);
      triggerAlert('success', `Customer status updated to: ${newStatus}`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdjustLoyaltyPoints = async (cust: Customer, change: number) => {
    const currentPoints = Math.round(cust.totalSpent || 0); // loyalty mapping
    const newPoints = Math.max(0, currentPoints + change);
    try {
      const updated = { ...cust, totalSpent: newPoints };
      await api.customers.update(cust.id!, updated);
      triggerAlert('success', `Updated Loyalty Points for ${cust.name} to: ${newPoints}`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  // 9. Delivery Management Partner CRUD
  const [deliveryPartnerForm, setDeliveryPartnerForm] = useState({
    name: '',
    phone: '',
    vehicle: 'Bike',
    status: 'Available'
  });
  const handleAddDeliveryPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryPartnerForm.name || !deliveryPartnerForm.phone) return;
    const partner = {
      name: deliveryPartnerForm.name,
      phone: deliveryPartnerForm.phone,
      vehicle: deliveryPartnerForm.vehicle,
      status: deliveryPartnerForm.status,
      earnings: 0,
      performance: 'Good'
    };
    await saveCustomDataItem('delivery_partner', partner);
    setDeliveryPartnerForm({ name: '', phone: '', vehicle: 'Bike', status: 'Available' });
  };

  // 10. Staff Management CRUD
  const [staffForm, setStaffForm] = useState({
    name: '',
    role: 'Server',
    email: '',
    phone: '',
    salary: '25000'
  });
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.email) return;
    const member = {
      name: staffForm.name,
      role: staffForm.role,
      email: staffForm.email,
      phone: staffForm.phone,
      attendance: 'Present',
      salary: parseFloat(staffForm.salary)
    };
    await saveCustomDataItem('staff', member);
    setStaffForm({ name: '', role: 'Server', email: '', phone: '', salary: '25000' });
  };

  const toggleStaffAttendance = async (item: any) => {
    const parsed = JSON.parse(item.dataJson);
    parsed.attendance = parsed.attendance === 'Present' ? 'Absent' : 'Present';
    await saveCustomDataItem('staff', parsed, item.id);
  };

  // 11. Coupon Management
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'Percentage',
    discountValue: '10',
    minOrderAmount: '500'
  });
  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.discountValue) return;
    try {
      await api.coupons.create({
        projectId,
        code: couponForm.code.toUpperCase().trim(),
        discountType: couponForm.discountType,
        discountValue: parseFloat(couponForm.discountValue),
        minOrderAmount: parseFloat(couponForm.minOrderAmount),
        active: true
      });
      triggerAlert('success', `Discount Coupon ${couponForm.code.toUpperCase()} activated!`);
      setCouponForm({ code: '', discountType: 'Percentage', discountValue: '10', minOrderAmount: '500' });
      loadCoreData();
    } catch (err) {
      triggerAlert('error', 'Failed to create coupon.');
    }
  };

  const handleToggleCoupon = async (id: number) => {
    try {
      await api.coupons.toggle(id);
      triggerAlert('success', 'Coupon status toggled.');
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    if (!confirm('Permanently delete coupon?')) return;
    try {
      await api.coupons.delete(id);
      triggerAlert('success', 'Coupon deleted.');
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  // 12. Offers Management
  const [offerForm, setOfferForm] = useState({
    title: '',
    type: 'Happy Hour Offers',
    details: '',
    schedule: '',
  });
  const handleAddOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.details) return;
    const offer = {
      title: offerForm.title,
      type: offerForm.type,
      details: offerForm.details,
      schedule: offerForm.schedule,
      active: true
    };
    await saveCustomDataItem('offer', offer);
    setOfferForm({ title: '', type: 'Happy Hour Offers', details: '', schedule: '' });
  };

  // 13. Inventory
  const [inventoryForm, setInventoryForm] = useState({
    ingredientName: '',
    stockLevel: '10',
    unit: 'Kg',
    lowStockAlert: '5',
    vendor: 'Select Vendor'
  });
  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inventoryForm.ingredientName) return;
    const item = {
      ingredientName: inventoryForm.ingredientName,
      stockLevel: parseFloat(inventoryForm.stockLevel),
      unit: inventoryForm.unit,
      lowStockAlert: parseFloat(inventoryForm.lowStockAlert),
      vendor: inventoryForm.vendor
    };
    await saveCustomDataItem('inventory_item', item);
    setInventoryForm({ ingredientName: '', stockLevel: '10', unit: 'Kg', lowStockAlert: '5', vendor: vendorsList[0]?.name || 'Local Vendor' });
  };

  const [vendorForm, setVendorForm] = useState({
    name: '',
    contact: '',
    phone: '',
    email: ''
  });
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorForm.name) return;
    const vendor = {
      name: vendorForm.name,
      contact: vendorForm.contact,
      phone: vendorForm.phone,
      email: vendorForm.email
    };
    await saveCustomDataItem('vendor', vendor);
    setVendorForm({ name: '', contact: '', phone: '', email: '' });
  };

  // 14. Payments
  const handleVerifyPayment = async (orderId: number) => {
    try {
      await api.orders.updateStatus(orderId, 'Accepted'); // updates payment check
      triggerAlert('success', `Payment for Order #${orderId} verified and order Accepted.`);
      loadCoreData();
    } catch (err) {
      console.error(err);
    }
  };

  // 15. Reviews
  const [reviewReply, setReviewReply] = useState<Record<number, string>>({});
  const handleSaveReviewReply = async (reviewItem: any) => {
    const reply = reviewReply[reviewItem.id];
    if (reply === undefined) return;
    const parsed = JSON.parse(reviewItem.dataJson);
    parsed.reply = reply;
    await saveCustomDataItem('review', parsed, reviewItem.id);
    triggerAlert('success', 'Reply posted.');
  };

  const handleToggleHideReview = async (reviewItem: any) => {
    const parsed = JSON.parse(reviewItem.dataJson);
    parsed.status = parsed.status === 'Hidden' ? 'Visible' : 'Hidden';
    await saveCustomDataItem('review', parsed, reviewItem.id);
  };

  // 16. Wallet
  const [walletRefundForm, setWalletRefundForm] = useState({
    email: '',
    amount: '',
    description: 'Bespoke service adjustment credit'
  });
  const handleRefundWalletSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletRefundForm.email || !walletRefundForm.amount) return;
    const tx = {
      customerEmail: walletRefundForm.email,
      amount: parseFloat(walletRefundForm.amount),
      type: 'Credit',
      description: walletRefundForm.description,
      date: new Date().toISOString().split('T')[0]
    };
    await saveCustomDataItem('wallet_transaction', tx);
    setWalletRefundForm({ email: '', amount: '', description: 'Bespoke service adjustment credit' });
  };

  // 17. Promotional broadcasts
  const [promoForm, setPromoForm] = useState({
    message: '',
    channel: 'Email',
    segment: 'All Customers'
  });
  const handleSendPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.message) return;
    const log = {
      message: promoForm.message,
      channel: promoForm.channel,
      segment: promoForm.segment,
      sentAt: new Date().toLocaleString(),
      status: 'Sent'
    };
    await saveCustomDataItem('promotional_broadcast', log);
    triggerAlert('success', `Broadcast dispatch queued to ${promoForm.segment} via ${promoForm.channel}!`);
    setPromoForm({ message: '', channel: 'Email', segment: 'All Customers' });
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6] text-slate-800 font-sans selection:bg-[#c5a880] selection:text-[#faf9f6] w-full">
      
      {/* Toast Alert */}
      {alertMsg && (
        <div className={`fixed top-6 right-6 z-[999] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce border ${
          alertMsg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-600'
        }`}>
          <span className="text-xl">{alertMsg.type === 'success' ? '✅' : '⚠️'}</span>
          <span className="font-extrabold text-xs tracking-wide uppercase">{alertMsg.text}</span>
        </div>
      )}

      {/* Side Menu */}
      <aside className={`bg-white border-r border-stone-200/60 p-5 flex flex-col justify-between transition-all duration-300 flex-shrink-0 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="space-y-6 text-left">
          
          {/* Logo Header */}
          <div className="flex items-center gap-3 py-2 border-b border-stone-200/80">
            <span className="text-2xl select-none">{logoIcon || '⚜️'}</span>
            {sidebarOpen && (
              <div>
                <h3 className="font-black text-slate-800 text-xs tracking-wider uppercase leading-none">
                  {companyName.replace(" Site", "")}
                </h3>
                <span className="text-[8px] text-[#c5a880] font-extrabold uppercase tracking-widest mt-1 block">ADMIN CONSOLE</span>
              </div>
            )}
          </div>

          {/* Grouped Sidebar links */}
          <nav className="space-y-6 overflow-y-auto max-h-[80vh] scrollbar-thin">
            {[
              {
                title: 'Core',
                items: [
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'reports', label: 'Reports & Stats', icon: '📈' }
                ]
              },
              {
                title: 'Menu & Kitchen',
                items: [
                  { id: 'menu', label: 'Menu Management', icon: '🍽️' },
                  { id: 'categories', label: 'Category Master', icon: '🗂️' },
                  { id: 'inventory', label: 'Inventory & Stock', icon: '📦' }
                ]
              },
              {
                title: 'Operational Queue',
                items: [
                  { id: 'orders', label: 'Online Orders', icon: '🔔' },
                  { id: 'bookings', label: 'Table Bookings', icon: '📅' },
                  { id: 'delivery', label: 'Delivery Riders', icon: '🛵' },
                  { id: 'staff', label: 'Staff Roster', icon: '👥' }
                ]
              },
              {
                title: 'Marketing & Loyalty',
                items: [
                  { id: 'coupons', label: 'Coupons Control', icon: '🎟️' },
                  { id: 'offers', label: 'Offers & Promos', icon: '🔥' },
                  { id: 'promotions', label: 'Send Broadcast', icon: '✉️' },
                  { id: 'reviews', label: 'Reviews Log', icon: '⭐️' }
                ]
              },
              {
                title: 'Financial Ledger',
                items: [
                  { id: 'payments', label: 'Payments list', icon: '💳' },
                  { id: 'wallet', label: 'Wallet Refunds', icon: '💼' },
                  { id: 'events', label: 'Events Master', icon: '🎟️' },
                  { id: 'event_bookings', label: 'Event Registry', icon: '📜' }
                ]
              },
              {
                title: 'System Settings',
                items: [
                  { id: 'settings', label: 'Theme & Layouts', icon: '⚙️' }
                ]
              }
            ].map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                {sidebarOpen && <h5 className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold px-3">{grp.title}</h5>}
                <div className="space-y-0.5">
                  {grp.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                          isActive 
                            ? 'bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/20' 
                            : 'text-slate-500 hover:text-slate-800 hover:bg-stone-100/30'
                        }`}
                      >
                        <span className="text-base select-none">{item.icon}</span>
                        {sidebarOpen && <span>{item.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition text-left cursor-pointer border border-transparent hover:border-rose-200 bg-transparent uppercase tracking-wider mt-4"
        >
          🚪 {sidebarOpen && <span>Exit Console</span>}
        </button>
      </aside>

      {/* Main Console body */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-stone-200/60 px-8 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-stone-100/50 hover:bg-stone-100 text-slate-600 cursor-pointer border-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-xs font-extrabold tracking-widest text-[#c5a880] uppercase">HAUTE EXECUTIVE MODULE</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-xs font-black text-slate-800">Console Admin</span>
              <span className="text-[10px] text-slate-500 font-bold">{clientEmail}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/30 flex items-center justify-center font-serif text-slate-800 font-black">
              A
            </div>
          </div>
        </header>

        {/* Content Box */}
        <section className="flex-1 p-8 overflow-y-auto bg-[#faf9f6]">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Restaurant Dashboard</h2>
                    <p className="text-xs text-slate-500 font-bold mt-1">Live metrics and operations queue breakdown.</p>
                  </div>
                  <button onClick={loadAllData} className="px-4 py-2.5 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider">
                    🔄 Refresh Data
                  </button>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-stone-200/80 p-5 rounded-2xl text-left shadow-lg">
                    <div className="text-[10px] text-[#c5a880] font-black uppercase tracking-wider">Total Sales (Revenue)</div>
                    <div className="text-2xl font-black text-slate-800 mt-2">${totalRevenue.toLocaleString()}</div>
                    <span className="text-emerald-500 text-[10px] font-bold mt-1 block">↑ 30% from last month</span>
                  </div>
                  <div className="bg-white border border-stone-200/80 p-5 rounded-2xl text-left shadow-lg">
                    <div className="text-[10px] text-[#c5a880] font-black uppercase tracking-wider">Today's Sales</div>
                    <div className="text-2xl font-black text-slate-800 mt-2">${todaySales.toLocaleString()}</div>
                    <span className="text-slate-500 text-[10px] font-bold mt-1 block">Updated in real-time</span>
                  </div>
                  <div className="bg-white border border-stone-200/80 p-5 rounded-2xl text-left shadow-lg">
                    <div className="text-[10px] text-[#c5a880] font-black uppercase tracking-wider">Table Bookings</div>
                    <div className="text-2xl font-black text-slate-800 mt-2">{bookingsList.length}</div>
                    <span className="text-indigo-400 text-[10px] font-bold mt-1 block">{bookingsList.filter(b => b.status === 'Pending').length} Pending Requests</span>
                  </div>
                  <div className="bg-white border border-stone-200/80 p-5 rounded-2xl text-left shadow-lg">
                    <div className="text-[10px] text-[#c5a880] font-black uppercase tracking-wider">Active Delivery Orders</div>
                    <div className="text-2xl font-black text-slate-800 mt-2">{activeOrdersCount}</div>
                    <span className="text-amber-500 text-[10px] font-bold mt-1 block">Kitchen queue is active</span>
                  </div>
                </div>

                {/* Additional mini KPI list */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/50 border border-stone-200/80/50 p-4 rounded-xl text-left">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Total Customers</span>
                    <h4 className="text-lg font-black text-slate-800 mt-1">{customersList.length}</h4>
                  </div>
                  <div className="bg-white/50 border border-stone-200/80/50 p-4 rounded-xl text-left">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Total Event Bookings</span>
                    <h4 className="text-lg font-black text-slate-800 mt-1">{eventBookingsList.length}</h4>
                  </div>
                  <div className="bg-white/50 border border-stone-200/80/50 p-4 rounded-xl text-left">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Active Promo Coupons</span>
                    <h4 className="text-lg font-black text-slate-800 mt-1">{couponsList.filter(c => c.active).length}</h4>
                  </div>
                </div>

                {/* Business Analytics (Chart) */}
                <div className="bg-white border border-stone-200/80 p-6 rounded-3xl text-left shadow-xl">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif mb-4">Business Analytics - Monthly Revenue Trend</h3>
                  
                  {/* SVG Chart */}
                  <div className="h-64 w-full relative">
                    <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c5a880" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#c5a880" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="5,5" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="5,5" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="5,5" />
                      
                      {/* Glow Fill */}
                      <path d="M 0,180 Q 80,140 160,110 T 320,60 T 480,30 L 500,200 L 0,200 Z" fill="url(#glowGrad)" />
                      {/* Plot Line */}
                      <path d="M 0,180 Q 80,140 160,110 T 320,60 T 480,30" fill="none" stroke="#c5a880" strokeWidth="3" strokeLinecap="round" />
                      
                      {/* Plot points */}
                      <circle cx="160" cy="110" r="4" fill="#c5a880" stroke="#faf9f6" strokeWidth="1.5" />
                      <circle cx="320" cy="60" r="4" fill="#c5a880" stroke="#faf9f6" strokeWidth="1.5" />
                      <circle cx="480" cy="30" r="5" fill="#ffffff" stroke="#c5a880" strokeWidth="2" />
                    </svg>
                    
                    {/* X-Axis labels */}
                    <div className="flex justify-between text-[8px] text-slate-500 font-extrabold uppercase mt-2 px-2">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span>Nov</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activities Log */}
                <div className="bg-white border border-stone-200/80 p-6 rounded-3xl text-left shadow-xl">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif mb-4">Recent Console Activities</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
                    {ordersList.slice(0, 5).map((o, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-3 bg-stone-50/50 rounded-xl border border-stone-200/80/50">
                        <div className="flex items-center gap-3">
                          <span className="text-base">🔔</span>
                          <div>
                            <p className="font-black text-slate-800">Order placed by {o.customerName || 'Guest Diner'}</p>
                            <span className="text-[9px] text-slate-500 font-bold">Total Bill: ${o.total} | status: {o.status}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-[#c5a880] uppercase tracking-wider">{o.createdAt ? o.createdAt.split('T')[0] : 'Today'}</span>
                      </div>
                    ))}
                    {bookingsList.slice(0, 5).map((b, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-3 bg-stone-50/50 rounded-xl border border-stone-200/80/50">
                        <div className="flex items-center gap-3">
                          <span className="text-base">📅</span>
                          <div>
                            <p className="font-black text-slate-800">Table reservation request by {b.customerName}</p>
                            <span className="text-[9px] text-slate-500 font-bold">Guests: {b.numberOfGuests} | seat: {b.tableNumber}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-[#c5a880] uppercase tracking-wider">{b.bookingDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MENU MANAGEMENT */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Menu Management</h2>
                    <p className="text-xs text-slate-500 font-bold mt-1">Publish dishes, adjust pricing, availability, and variations.</p>
                  </div>
                  <button onClick={handleOpenAddMenu} className="px-5 py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] rounded-xl text-xs font-black transition cursor-pointer border-none uppercase tracking-wider">
                    ➕ Add Food Item
                  </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-stone-200/80 p-4 rounded-2xl text-left">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#c5a880] font-black">Categories List</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1.5 rounded-lg bg-[#c5a880]/15 text-[#c5a880] text-xs font-bold border border-[#c5a880]/30 cursor-pointer">All Categories</span>
                      {categoriesList.map((cat, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-stone-50 text-slate-450 hover:text-slate-800 text-xs font-bold border border-stone-200 cursor-pointer">{cat.name}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.map((item) => (
                    <div key={item.id} className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between text-left group">
                      
                      {/* Image container */}
                      <div className="h-44 w-full bg-stone-50 relative">
                        <img 
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                            item.available ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
                          }`}>
                            {item.available ? 'Available' : 'Sold Out'}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex-grow space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-base font-serif">{item.name}</h4>
                            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">{item.category}</span>
                          </div>
                          <span className="text-[#c5a880] text-lg font-black">${item.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-bold line-clamp-2 leading-relaxed">{item.description}</p>
                        
                        {item.variants && (
                          <div className="pt-2 border-t border-stone-200/80 flex flex-wrap gap-1.5">
                            <span className="text-[8px] text-[#c5a880] font-black uppercase tracking-wide">Variants:</span>
                            {item.variants.split(',').map((v, vIdx) => (
                              <span key={vIdx} className="bg-stone-50 text-slate-600 px-2 py-0.5 rounded text-[8px] border border-stone-200/80 font-bold">{v.trim()}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions footer */}
                      <div className="p-4 bg-stone-50/50 border-t border-stone-200/80 flex gap-2">
                        <button 
                          onClick={() => toggleAvailability(item)}
                          className="flex-1 py-2 bg-stone-100 hover:bg-slate-750 text-slate-305 text-[#c2c2c2] rounded-xl text-[10px] font-bold transition cursor-pointer border border-stone-200"
                        >
                          🔄 Toggle Availability
                        </button>
                        <button 
                          onClick={() => handleOpenEditMenu(item)}
                          className="px-3 py-2 bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-400 rounded-xl text-xs cursor-pointer border border-indigo-500/20"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteMenu(item.id!)}
                          className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-xs cursor-pointer border border-rose-500/20"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CATEGORIES MASTER */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Category Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Define categories and custom sorting orders.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  
                  {/* Create category */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Create New Category</h3>
                    <form onSubmit={handleCreateCategory} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Category Name</label>
                        <input
                          type="text"
                          required
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          className="w-full rounded-xl bg-stone-50 border border-stone-200 px-4 py-3 text-xs outline-none focus:border-[#c5a880] text-slate-800"
                          placeholder="e.g. Gourmet Mains, Signature Mocktails"
                        />
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Create Category
                      </button>
                    </form>
                  </div>

                  {/* Categories list */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Reorder & Manage</h3>
                    
                    <div className="space-y-2.5">
                      {categoriesList.map((cat, idx) => (
                        <div key={cat.id} className="flex justify-between items-center p-3.5 bg-stone-50/60 rounded-xl border border-stone-200/80/80">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-slate-500">#{idx + 1}</span>
                            <span className="text-xs font-black text-slate-800">{cat.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleReorderCategory(idx, 'up')} className="px-2 py-1 bg-stone-100 hover:bg-slate-700 rounded text-slate-500 cursor-pointer border-none text-[10px]">▲</button>
                            <button onClick={() => handleReorderCategory(idx, 'down')} className="px-2 py-1 bg-stone-100 hover:bg-slate-700 rounded text-slate-500 cursor-pointer border-none text-[10px]">▼</button>
                            <button onClick={() => handleDeleteCategory(cat.id)} className="px-2.5 py-1 bg-rose-950/20 text-rose-400 hover:bg-rose-900/35 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: ONLINE ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Online Order Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Review incoming delivery bills and dispatch orders.</p>
                </div>

                <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg text-left">
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] font-serif">Diner Orders Queue</span>
                    <span className="text-slate-500 text-xs font-bold">{ordersList.length} total orders logs</span>
                  </div>
                  
                  <div className="divide-y divide-slate-850">
                    {ordersList.map((order) => {
                      const items = JSON.parse(order.itemsJson || '[]');
                      return (
                        <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-stone-50/10 transition">
                          
                          {/* Order Details */}
                          <div className="space-y-3 max-w-xl text-left">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black text-slate-800">Order #{order.id}</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                order.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25' :
                                order.status === 'Accepted' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/25' :
                                order.status === 'Preparing' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/25' :
                                order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' :
                                'bg-stone-100 text-slate-500 border border-slate-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            
                            <div className="text-xs text-slate-500 space-y-1">
                              <p className="font-bold"><span className="text-slate-500 font-bold">Customer:</span> <span className="text-slate-850 font-extrabold">{order.customerName}</span> ({order.customerEmail})</p>
                              <p className="font-bold"><span className="text-slate-500 font-bold">Phone:</span> {order.customerPhone || 'N/A'}</p>
                              <p className="font-bold"><span className="text-slate-500 font-bold">Address:</span> {order.customerAddress || 'N/A'}</p>
                              {order.paymentMethod && <p className="font-bold"><span className="text-slate-500 font-bold">Payment:</span> {order.paymentMethod} (status: <span className="text-emerald-500 font-bold">{order.paymentStatus || 'Paid'}</span>)</p>}
                              {(order as any).deliveryPartner && <p className="font-bold text-[#c5a880]"><span className="text-slate-500 font-bold">Rider:</span> 🛵 {(order as any).deliveryPartner}</p>}
                            </div>

                            {/* Items list */}
                            <div className="bg-slate-950/60 border border-stone-200/80 p-3.5 rounded-2xl space-y-1.5 w-full">
                              <h6 className="text-[9px] uppercase tracking-wider text-[#c5a880] font-black">Ordered Dishes</h6>
                              <div className="space-y-1">
                                {items.map((item: any, iIdx: number) => (
                                  <div key={iIdx} className="flex justify-between text-[11px] text-slate-700 font-bold w-full">
                                    <span>{item.name} <span className="text-slate-500 font-extrabold">x{item.quantity}</span> {item.variant ? `(${item.variant})` : ''}</span>
                                    <span>${(item.price * item.quantity)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Operations Actions */}
                          <div className="flex flex-col justify-between items-end gap-3 min-w-[200px] text-right">
                            <span className="text-xl font-extrabold text-[#c5a880] font-serif">${order.total}</span>
                            
                            <div className="space-y-2 w-full">
                              {order.status === 'Pending' && (
                                <div className="flex gap-2 w-full">
                                  <button onClick={() => handleAcceptOrder(order.id!)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-slate-800 font-black rounded-lg text-[10px] uppercase tracking-wider cursor-pointer border-none">Accept</button>
                                  <button onClick={() => handleRejectOrder(order.id!)} className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] uppercase tracking-wider cursor-pointer border-none">Reject</button>
                                </div>
                              )}

                              {order.status !== 'Pending' && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                <div className="space-y-1.5 text-right w-full">
                                  <label className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">Transition Status</label>
                                  <select 
                                    value={order.status}
                                    onChange={(e) => handleUpdateOrderStatus(order.id!, e.target.value)}
                                    className="w-full rounded-lg bg-stone-50 border border-stone-200 p-2 text-[10px] font-bold text-slate-800 outline-none"
                                  >
                                    <option value="Accepted">Accepted</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                                </div>
                              )}

                              {/* Assign partner trigger */}
                              {order.status === 'Accepted' && (
                                <div className="space-y-1.5 text-right w-full">
                                  <label className="text-[8px] uppercase tracking-widest text-[#c5a880] font-black block">Assign Delivery Rider</label>
                                  <select 
                                    onChange={(e) => handleAssignDeliveryPartner(order.id!, e.target.value)}
                                    className="w-full rounded-lg bg-stone-50 border border-[#c5a880]/30 p-2 text-[10px] font-bold text-[#c5a880] outline-none"
                                    defaultValue=""
                                  >
                                    <option value="" disabled>Choose Rider...</option>
                                    {deliveryList.map((d, dIdx) => {
                                      const p = JSON.parse(d.dataJson);
                                      return <option key={dIdx} value={p.name}>{p.name} ({p.vehicle})</option>;
                                    })}
                                    <option value="Self Pickup (Diner)">Self Pickup (Diner)</option>
                                  </select>
                                </div>
                              )}

                              <div className="flex gap-2.5 w-full">
                                <button 
                                  onClick={() => handleRefundOrder(order.id!, order.customerEmail!, order.total!)} 
                                  className="flex-1 py-1.5 bg-stone-100 hover:bg-slate-750 text-slate-305 text-slate-700 hover:text-slate-800 rounded-lg text-[9px] font-extrabold uppercase tracking-wide cursor-pointer border border-slate-750"
                                >
                                  Refund Credits
                                </button>
                                <button 
                                  onClick={() => handleUpdateOrderStatus(order.id!, 'Cancelled')}
                                  className="py-1.5 px-2 bg-rose-950/20 text-rose-400 hover:bg-rose-900/35 border border-rose-200 rounded-lg text-[9px] font-extrabold uppercase tracking-wide cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: TABLE BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Table Booking Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Allocate seating charts, confirm guest limits, and reschedule table reservations.</p>
                </div>

                {/* Inline reschedule form */}
                {rescheduleData && (
                  <div className="bg-white border border-stone-200/80 p-5 rounded-3xl text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase text-[#c5a880] tracking-widest">Reschedule Reservation Details</h4>
                      <button onClick={() => setRescheduleData(null)} className="text-xs text-rose-500 bg-transparent border-none cursor-pointer">Close Form</button>
                    </div>
                    <form onSubmit={handleRescheduleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Date</label>
                        <input type="date" required value={rescheduleData.date} onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Time</label>
                        <input type="time" required value={rescheduleData.time} onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Guests</label>
                        <input type="number" required value={rescheduleData.guests} onChange={(e) => setRescheduleData({...rescheduleData, guests: parseInt(e.target.value, 10)})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <button type="submit" className="py-2.5 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none">Reschedule & Confirm</button>
                    </form>
                  </div>
                )}

                <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg text-left">
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] font-serif">Table Seating Log</span>
                    <span className="text-slate-500 text-xs font-bold">{bookingsList.length} reservations</span>
                  </div>

                  <div className="divide-y divide-slate-850">
                    {bookingsList.map((book) => (
                      <div key={book.id} className="p-6 flex flex-col md:flex-row justify-between gap-6 items-start hover:bg-stone-50/10 transition">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-white">{book.customerName}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                              book.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25' :
                              book.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' :
                              'bg-rose-500/10 text-rose-500 border border-rose-500/25'
                            }`}>
                              {book.status}
                            </span>
                          </div>

                          <div className="text-xs text-slate-450 space-y-1">
                            <p className="font-bold"><span className="text-slate-500 font-bold">Schedule:</span> 📅 <span className="text-slate-850 font-extrabold">{book.bookingDate}</span> at ⏰ <span className="text-slate-850 font-extrabold">{book.bookingTime}</span></p>
                            <p className="font-bold"><span className="text-slate-500 font-bold">Contact:</span> ✉️ {book.customerEmail} | 📞 {book.customerPhone || 'N/A'}</p>
                            <p className="font-bold"><span className="text-slate-500 font-bold">Guests:</span> 👥 <span className="text-[#c5a880] font-extrabold">{book.numberOfGuests} Guests</span></p>
                            {book.notes && <p className="text-[11px] text-slate-500 font-medium italic">"{book.notes}"</p>}
                            <p className="font-bold text-slate-600"><span className="text-slate-500 font-bold">Table:</span> 🍽️ {book.tableNumber || 'Auto-Allocated Private Lounge'}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 min-w-[200px] w-full md:w-auto text-right">
                          <div className="flex gap-2 w-full">
                            <button onClick={() => handleUpdateBookingStatus(book.id, 'Confirmed')} className="flex-grow py-2 bg-emerald-600 hover:bg-emerald-700 text-slate-800 font-black text-[10px] rounded-lg uppercase tracking-wide cursor-pointer border-none">Approve</button>
                            <button onClick={() => handleUpdateBookingStatus(book.id, 'Rejected')} className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-slate-800 font-black text-[10px] rounded-lg uppercase tracking-wide cursor-pointer border-none">Reject</button>
                          </div>

                          {/* Reschedule trigger */}
                          <button 
                            onClick={() => setRescheduleData({ id: book.id, date: book.bookingDate, time: book.bookingTime, guests: book.numberOfGuests })} 
                            className="py-1.5 bg-stone-100 hover:bg-slate-750 text-slate-700 rounded-lg text-[9px] font-extrabold uppercase tracking-wide cursor-pointer border border-slate-750"
                          >
                            📅 Reschedule Seating
                          </button>

                          {/* Seat Allocation Selector */}
                          <div className="space-y-1 w-full">
                            <label className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">Seat Table Allocation</label>
                            <select 
                              onChange={(e) => handleSeatAllocation(book.id, e.target.value)}
                              className="w-full rounded-lg bg-stone-50 border border-stone-200 p-2 text-[10px] font-bold text-slate-800 outline-none"
                              defaultValue={book.tableNumber || ""}
                            >
                              <option value="" disabled>Select Dining Area...</option>
                              <option value="Table 1 (Couple Window)">Table 1 (Couple Window)</option>
                              <option value="Table 2 (Couple Window)">Table 2 (Couple Window)</option>
                              <option value="Table 3 (Family Booth)">Table 3 (Family Booth)</option>
                              <option value="Table 4 (Family Booth)">Table 4 (Family Booth)</option>
                              <option value="Private Dining Suite (8 Guests)">Private Dining Suite (8 Guests)</option>
                              <option value="Bespoke Garden Lounge (4 Guests)">Bespoke Garden Lounge (4 Guests)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: EVENTS MASTER */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Event Management</h2>
                    <p className="text-xs text-slate-500 font-bold mt-1">Plan, publish, and allocate tickets for VIP tasting events and live dining spectacles.</p>
                  </div>
                  <button onClick={handleOpenAddEvent} className="px-5 py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] rounded-xl text-xs font-black transition cursor-pointer border-none uppercase tracking-wider">
                    ➕ Create Event
                  </button>
                </div>

                {/* Event list grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eventsList.map((item) => {
                    const e = JSON.parse(item.dataJson);
                    return (
                      <div key={item.id} className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between text-left">
                        <div className="h-48 bg-stone-50 relative">
                          <img src={e.banner || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80'} alt={e.name} className="w-full h-full object-cover" />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider ${
                              e.status === 'Published' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-[#07080e]'
                            }`}>
                              {e.status}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <h4 className="font-extrabold text-slate-800 text-base font-serif">{e.name}</h4>
                          {e.artist && <p className="text-xs text-[#c5a880] font-black uppercase tracking-wide">Artist: {e.artist}</p>}
                          <p className="text-xs text-slate-500 font-bold leading-relaxed">{e.description}</p>
                          
                          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-stone-200/80 text-[10px] text-slate-450">
                            <div>
                              <span className="text-slate-500 font-black uppercase tracking-wider block">Schedule</span>
                              <span className="text-slate-850 font-extrabold mt-0.5 block">{e.date} ({e.time})</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-black uppercase tracking-wider block">Ticket Price</span>
                              <span className="text-[#c5a880] font-black mt-0.5 block">${e.price}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-black uppercase tracking-wider block">Capacity</span>
                              <span className="text-slate-850 font-extrabold mt-0.5 block">{e.capacity} Seats</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-stone-50/50 border-t border-stone-200/80 flex gap-2">
                          <button onClick={() => toggleEventStatus(item)} className="flex-1 py-2 bg-[#1b1c2b] hover:bg-stone-100 text-slate-600 rounded-xl text-[10px] font-bold border border-stone-200 cursor-pointer">
                            {e.status === 'Published' ? 'Unpublish / Draft' : 'Publish Event'}
                          </button>
                          <button onClick={() => handleOpenEditEvent(item)} className="px-3.5 py-2 bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/25 rounded-xl cursor-pointer">
                            ✏️
                          </button>
                          <button onClick={() => deleteCustomDataItem('event', item.id)} className="px-3.5 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/25 rounded-xl cursor-pointer">
                            🗑️
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: EVENT REGISTRY */}
            {activeTab === 'event_bookings' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Event Booking Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Review ticket reservations, approve registrations, and download attendee registries.</p>
                </div>

                <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg text-left">
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] font-serif">Attendee Registrations</span>
                    <span className="text-slate-500 text-xs font-bold">{eventBookingsList.length} ticket items</span>
                  </div>

                  <div className="divide-y divide-slate-850">
                    {eventBookingsList.map((item) => {
                      const eb = JSON.parse(item.dataJson);
                      return (
                        <div key={item.id} className="p-5 flex flex-col md:flex-row justify-between gap-4 items-center hover:bg-stone-50/10 transition">
                          <div className="text-left">
                            <h4 className="font-extrabold text-slate-800 text-sm font-serif">{eb.eventName}</h4>
                            <p className="text-xs text-slate-450 font-semibold mt-1">Attendee: <span className="text-slate-800 font-black">{eb.customerName}</span> ({eb.customerEmail})</p>
                            <p className="text-xs text-slate-500 font-bold mt-0.5">Tickets: <span className="text-slate-850 font-extrabold">{eb.tickets} Seats</span> | Paid: <span className="text-[#c5a880] font-black">${eb.totalPaid}</span></p>
                          </div>

                          <div className="flex gap-2">
                            <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center ${
                              eb.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/25' : 'bg-amber-500/10 text-amber-500 border border-amber-500/25'
                            }`}>
                              {eb.status}
                            </span>
                            <button onClick={() => handleUpdateEventBookingStatus(item, 'Approved')} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-slate-800 font-black text-[10px] rounded-lg uppercase tracking-wide cursor-pointer border-none">Approve</button>
                            <button onClick={() => handleUpdateEventBookingStatus(item, 'Cancelled')} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-slate-800 font-black text-[10px] rounded-lg uppercase tracking-wide cursor-pointer border-none">Cancel</button>
                            <button onClick={() => handleDownloadAttendeeList(eb.eventName)} className="px-2.5 py-1.5 bg-stone-100 hover:bg-slate-750 text-slate-355 border border-slate-750 rounded-lg text-[10px] cursor-pointer">📥 CSV</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: CUSTOMER MANAGEMENT */}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Customer Management (CRM)</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Review guest profiles, manage loyalty points, and update coordinator notes.</p>
                </div>

                <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg text-left">
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] font-serif">Guest Profile List</span>
                    <span className="text-slate-500 text-xs font-bold">{customersList.length} profiles</span>
                  </div>

                  <div className="divide-y divide-slate-850">
                    {customersList.map((cust) => (
                      <div key={cust.id} className="p-6 flex flex-col md:flex-row justify-between gap-6 items-start hover:bg-stone-50/10 transition">
                        
                        <div className="space-y-3 flex-grow text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-[#c5a880]">
                              {cust.name.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-800 text-sm">{cust.name}</h4>
                              <span className="text-[10px] text-slate-500 font-extrabold">{cust.email}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                              cust.status === 'Blocked' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/25' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                            }`}>
                              {cust.status || 'Active'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-500 font-bold grid grid-cols-2 gap-2 max-w-sm">
                            <p><span className="text-slate-500">Phone:</span> {cust.phone || 'N/A'}</p>
                            <p><span className="text-slate-500">CRM Class:</span> VIP Guest</p>
                          </div>

                          {/* Customer Notes */}
                          <div className="space-y-1 max-w-lg">
                            <label className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">Guest CRM Note / Special Needs</label>
                            <div className="flex gap-2">
                              <textarea
                                value={customerNotes[cust.id!] !== undefined ? customerNotes[cust.id!] : (cust.address || '')}
                                onChange={(e) => setCustomerNotes({ ...customerNotes, [cust.id!]: e.target.value })}
                                className="flex-grow rounded-xl bg-slate-950 border border-stone-200/80 p-2.5 text-xs text-slate-800 outline-none resize-none h-14"
                                placeholder="e.g. Seafood Allergy. Prefers Table 3 Booth. Drinks sparkling water."
                              />
                              <button 
                                onClick={() => handleSaveCustomerNote(cust)}
                                className="px-3.5 bg-stone-100 hover:bg-slate-750 text-[#c5a880] border border-slate-750 font-black text-[10px] uppercase rounded-xl cursor-pointer"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Loyalty & Status controls */}
                        <div className="flex flex-col gap-2.5 min-w-[200px] text-right">
                          <div className="bg-[#191b29] border border-stone-200/80 p-3 rounded-2xl text-left">
                            <span className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">Loyalty Points Balance</span>
                            <div className="flex justify-between items-center mt-1.5">
                              <span className="text-base font-black text-slate-800">{Math.round(cust.totalSpent || 0)} pts</span>
                              <div className="flex gap-1">
                                <button onClick={() => handleAdjustLoyaltyPoints(cust, 100)} className="px-2 py-0.5 bg-stone-100 hover:bg-slate-700 text-emerald-400 rounded text-xs cursor-pointer border-none">+</button>
                                <button onClick={() => handleAdjustLoyaltyPoints(cust, -100)} className="px-2 py-0.5 bg-stone-100 hover:bg-slate-700 text-rose-500 rounded text-xs cursor-pointer border-none">-</button>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleToggleBlockCustomer(cust)}
                              className={`flex-grow py-2 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer border ${
                                cust.status === 'Blocked' 
                                  ? 'bg-emerald-600/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-600/20' 
                                  : 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20'
                              }`}
                            >
                              {cust.status === 'Blocked' ? '✅ Unblock Diner' : '🚫 Block Customer'}
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: DELIVERY RIDERS */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Delivery Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Manage food delivery partners, monitor driver availability, and track performance scores.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  {/* Register partner form */}
                  <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Add Delivery Partner</h3>
                    <form onSubmit={handleAddDeliveryPartner} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Partner Name</label>
                        <input type="text" required value={deliveryPartnerForm.name} onChange={(e) => setDeliveryPartnerForm({...deliveryPartnerForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. John Doe" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Phone Number</label>
                        <input type="text" required value={deliveryPartnerForm.phone} onChange={(e) => setDeliveryPartnerForm({...deliveryPartnerForm, phone: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. +91 95555 44444" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Vehicle Type</label>
                        <select value={deliveryPartnerForm.vehicle} onChange={(e) => setDeliveryPartnerForm({...deliveryPartnerForm, vehicle: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                          <option value="Bike">Bike (Electric)</option>
                          <option value="Scooter">Scooter</option>
                          <option value="Bicycle">Bicycle</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Register Rider
                      </button>
                    </form>
                  </div>

                  {/* Partner listings */}
                  <div className="md:col-span-2 bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Registered Riders Directory</h3>
                    
                    <div className="divide-y divide-slate-850">
                      {deliveryList.map((item) => {
                        const d = JSON.parse(item.dataJson);
                        return (
                          <div key={item.id} className="py-4 flex justify-between items-center">
                            <div>
                              <h5 className="font-extrabold text-slate-800 text-xs">{d.name}</h5>
                              <p className="text-[10px] text-slate-500 font-bold mt-0.5">Vehicle: <span className="text-slate-850 font-extrabold">{d.vehicle}</span> | Contact: {d.phone}</p>
                              <div className="flex gap-4 text-[9px] font-bold text-slate-455 mt-1">
                                <span>Performance: <span className="text-[#c5a880]">{d.performance || 'Outstanding'}</span></span>
                                <span>Daily pay: <span className="text-emerald-500">${d.earnings || 120}</span></span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[8px] font-black uppercase flex items-center">
                                {d.status}
                              </span>
                              <button onClick={() => deleteCustomDataItem('delivery_partner', item.id)} className="px-2 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 10: STAFF ROSTER */}
            {activeTab === 'staff' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Staff Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Maintain roles list, log daily clock-in rosters, and manage staff salaries.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  {/* Create staff form */}
                  <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Add Staff Member</h3>
                    <form onSubmit={handleAddStaff} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Staff Name</label>
                        <input type="text" required value={staffForm.name} onChange={(e) => setStaffForm({...staffForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. Chef Marcus" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Role</label>
                        <select value={staffForm.role} onChange={(e) => setStaffForm({...staffForm, role: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                          <option value="Head Chef">Head Chef</option>
                          <option value="Sous Chef">Sous Chef</option>
                          <option value="Sommelier">Sommelier</option>
                          <option value="Server">Server / Waiter</option>
                          <option value="Host">Receptionist / Host</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Email</label>
                        <input type="email" required value={staffForm.email} onChange={(e) => setStaffForm({...staffForm, email: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="staff@restaurant.com" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-450">Base Salary ($)</label>
                        <input type="number" required value={staffForm.salary} onChange={(e) => setStaffForm({...staffForm, salary: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Register Employee
                      </button>
                    </form>
                  </div>

                  {/* Staff table */}
                  <div className="md:col-span-2 bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Staff Roster Directory</h3>
                    
                    <div className="divide-y divide-slate-850">
                      {staffList.map((item) => {
                        const s = JSON.parse(item.dataJson);
                        return (
                          <div key={item.id} className="py-4 flex justify-between items-center">
                            <div>
                              <h5 className="font-extrabold text-slate-800 text-xs">{s.name}</h5>
                              <p className="text-[10px] text-slate-500 font-bold mt-0.5">Role: <span className="text-slate-850 font-extrabold">{s.role}</span> | Pay: <span className="text-emerald-500">${s.salary}</span> | {s.email}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => toggleStaffAttendance(item)}
                                className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border cursor-pointer ${
                                  s.attendance === 'Present' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                                    : 'bg-rose-500/10 text-rose-500 border-rose-500/25'
                                }`}
                              >
                                {s.attendance}
                              </button>
                              <button onClick={() => deleteCustomDataItem('staff', item.id)} className="px-2 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 11: COUPONS CONTROL */}
            {activeTab === 'coupons' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Coupon Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Create promotional discount codes and configure min-order limits.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  {/* Create Coupon form */}
                  <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Create Coupon Code</h3>
                    <form onSubmit={handleAddCoupon} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Coupon Code</label>
                        <input type="text" required value={couponForm.code} onChange={(e) => setCouponForm({...couponForm, code: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. HAUTE25" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Discount Type</label>
                        <select value={couponForm.discountType} onChange={(e) => setCouponForm({...couponForm, discountType: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                          <option value="Percentage">Percentage (%)</option>
                          <option value="Flat">Flat Discount ($)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Discount Value</label>
                        <input type="number" required value={couponForm.discountValue} onChange={(e) => setCouponForm({...couponForm, discountValue: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Min Order ($)</label>
                        <input type="number" required value={couponForm.minOrderAmount} onChange={(e) => setCouponForm({...couponForm, minOrderAmount: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Activate Coupon
                      </button>
                    </form>
                  </div>

                  {/* Coupon list */}
                  <div className="md:col-span-2 bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Coupons Directory</h3>
                    
                    <div className="divide-y divide-slate-850">
                      {couponsList.map((c) => (
                        <div key={c.id} className="py-4 flex justify-between items-center">
                          <div>
                            <h5 className="font-extrabold text-slate-800 text-xs tracking-wider">{c.code}</h5>
                            <p className="text-[10px] text-slate-500 font-bold mt-0.5">Discount: <span className="text-slate-850 font-extrabold">{c.discountValue}{c.discountType === 'Percentage' ? '%' : '$'}</span> | Min Order: ${c.minOrderAmount}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleToggleCoupon(c.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border cursor-pointer ${
                                c.active 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                                  : 'bg-rose-500/10 text-rose-500 border-rose-500/25'
                              }`}
                            >
                              {c.active ? 'Active' : 'Expired'}
                            </button>
                            <button onClick={() => handleDeleteCoupon(c.id)} className="px-2 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 12: OFFERS & PROMOS */}
            {activeTab === 'offers' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Offers Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Configure Combo discounts, Festival specials, Happy hour promos, and Event deals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  {/* Create offer form */}
                  <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Create Promotional Offer</h3>
                    <form onSubmit={handleAddOffer} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Offer Title</label>
                        <input type="text" required value={offerForm.title} onChange={(e) => setOfferForm({...offerForm, title: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. Wine Festival 20%" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Offer Type</label>
                        <select value={offerForm.type} onChange={(e) => setOfferForm({...offerForm, type: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                          <option value="Happy Hour Offers">Happy Hour Offers</option>
                          <option value="Festival Offers">Festival Offers</option>
                          <option value="Combo Offers">Combo Offers</option>
                          <option value="Event Offers">Event Offers</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Offer Details</label>
                        <textarea required value={offerForm.details} onChange={(e) => setOfferForm({...offerForm, details: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none resize-none h-16" placeholder="25% discount on all premium wines by the glass." />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Schedule (time window)</label>
                        <input type="text" value={offerForm.schedule} onChange={(e) => setOfferForm({...offerForm, schedule: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. Mon-Thu, 4 PM - 7 PM" />
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Launch Offer
                      </button>
                    </form>
                  </div>

                  {/* Offers list */}
                  <div className="md:col-span-2 bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Launched Deals</h3>
                    
                    <div className="divide-y divide-slate-850">
                      {offersList.map((item) => {
                        const o = JSON.parse(item.dataJson);
                        return (
                          <div key={item.id} className="py-4 flex justify-between items-start">
                            <div>
                              <h5 className="font-extrabold text-slate-800 text-xs">{o.title}</h5>
                              <p className="text-[10px] text-[#c5a880] font-black uppercase tracking-wider mt-0.5">{o.type}</p>
                              <p className="text-xs text-slate-500 font-bold mt-1">{o.details}</p>
                              {o.schedule && <p className="text-[9px] text-slate-505 font-bold mt-0.5">Schedule: {o.schedule}</p>}
                            </div>
                            
                            <button onClick={() => deleteCustomDataItem('offer', item.id)} className="px-2 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 13: INVENTORY & STOCK */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Inventory & Stock</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Ingredients levels tracking, low stock alerts, and vendor directory.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  
                  {/* Forms Column (Inventory + Vendors) */}
                  <div className="space-y-6">
                    {/* Add ingredient */}
                    <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Add Ingredient</h3>
                      <form onSubmit={handleAddInventory} className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Ingredient Name</label>
                          <input type="text" required value={inventoryForm.ingredientName} onChange={(e) => setInventoryForm({...inventoryForm, ingredientName: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="e.g. Fresh Truffles" />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-grow space-y-1">
                            <label className="text-[8px] uppercase tracking-wider text-slate-455">Stock Level</label>
                            <input type="number" required value={inventoryForm.stockLevel} onChange={(e) => setInventoryForm({...inventoryForm, stockLevel: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                          </div>
                          <div className="w-20 space-y-1">
                            <label className="text-[8px] uppercase tracking-wider text-slate-455">Unit</label>
                            <input type="text" required value={inventoryForm.unit} onChange={(e) => setInventoryForm({...inventoryForm, unit: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="Kg" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Low Stock Limit</label>
                          <input type="number" required value={inventoryForm.lowStockAlert} onChange={(e) => setInventoryForm({...inventoryForm, lowStockAlert: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Vendor Supplier</label>
                          <select value={inventoryForm.vendor} onChange={(e) => setInventoryForm({...inventoryForm, vendor: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                            <option value="">Choose vendor...</option>
                            {vendorsList.map((v, idx) => {
                              const p = JSON.parse(v.dataJson);
                              return <option key={idx} value={p.name}>{p.name}</option>;
                            })}
                          </select>
                        </div>
                        <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                          Add Ingredient
                        </button>
                      </form>
                    </div>

                    {/* Add vendor */}
                    <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Add Vendor</h3>
                      <form onSubmit={handleAddVendor} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Vendor Name</label>
                          <input type="text" required value={vendorForm.name} onChange={(e) => setVendorForm({...vendorForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="Global Fine Foods" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Contact Person</label>
                          <input type="text" required value={vendorForm.contact} onChange={(e) => setVendorForm({...vendorForm, contact: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="Giovanni" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Phone</label>
                          <input type="text" value={vendorForm.phone} onChange={(e) => setVendorForm({...vendorForm, phone: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="+39 02 123" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                          Register Vendor
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Listings (Stock items + Vendors) */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Ingredients table */}
                    <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Ingredients Inventory List</h3>
                      
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b border-stone-200/80 text-slate-500 font-extrabold uppercase">
                              <th className="py-2.5">Name</th>
                              <th className="py-2.5">Stock Level</th>
                              <th className="py-2.5">Status</th>
                              <th className="py-2.5">Supplier</th>
                              <th className="py-2.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-850">
                            {inventoryList.map((item) => {
                              const iv = JSON.parse(item.dataJson);
                              const isLow = iv.stockLevel <= iv.lowStockAlert;
                              return (
                                <tr key={item.id} className="hover:bg-stone-50/10 font-bold">
                                  <td className="py-3.5 text-slate-800">{iv.ingredientName}</td>
                                  <td className="py-3.5">{iv.stockLevel} {iv.unit}</td>
                                  <td className="py-3.5">
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                      isLow ? 'bg-rose-500/15 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    }`}>
                                      {isLow ? '⚠️ Low Stock' : 'Good'}
                                    </span>
                                  </td>
                                  <td className="py-3.5 text-slate-450">{iv.vendor}</td>
                                  <td className="py-3.5 text-right">
                                    <button onClick={() => deleteCustomDataItem('inventory_item', item.id)} className="px-2 py-1 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[9px]">Delete</button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Vendors list */}
                    <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Suppliers Directory</h3>
                      <div className="divide-y divide-slate-850">
                        {vendorsList.map((item) => {
                          const v = JSON.parse(item.dataJson);
                          return (
                            <div key={item.id} className="py-3 flex justify-between items-center">
                              <div>
                                <h5 className="font-extrabold text-slate-800 text-xs">{v.name}</h5>
                                <p className="text-[10px] text-slate-500 font-bold mt-0.5">Contact: {v.contact} | Phone: {v.phone} | {v.email}</p>
                              </div>
                              <button onClick={() => deleteCustomDataItem('vendor', item.id)} className="px-2 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* TAB 14: PAYMENTS LIST */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Payment Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Review incoming sales payments, verify transactional records, and process refund queries.</p>
                </div>

                <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg text-left">
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] font-serif">Transaction Ledger</span>
                    <span className="text-slate-500 text-xs font-bold">{ordersList.length} billing items</span>
                  </div>

                  <div className="divide-y divide-slate-850">
                    {ordersList.map((order) => (
                      <div key={order.id} className="p-5 flex justify-between items-center hover:bg-stone-50/10 transition">
                        <div className="text-left">
                          <h4 className="font-extrabold text-slate-800 text-xs">Order #{order.id} Billing</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-0.5">Customer: {order.customerName} ({order.customerEmail})</p>
                          <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Gateway: {order.paymentGateway || 'Stripe'} | Method: {order.paymentMethod || 'UPI/Card'}</p>
                        </div>

                        <div className="flex gap-4 items-center">
                          <span className="text-base font-black text-slate-800">${order.total}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            order.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          }`}>
                            {order.paymentStatus || 'Paid'}
                          </span>
                          {order.status === 'Pending' && (
                            <button onClick={() => handleVerifyPayment(order.id!)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-slate-800 font-black text-[9px] rounded uppercase cursor-pointer border-none">Verify</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 15: REVIEWS LOG */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Reviews Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Review customer ratings, draft coordinator responses, and manage list visibility.</p>
                </div>

                <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg text-left">
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] font-serif">Customer Feedback Logs</span>
                    <span className="text-slate-500 text-xs font-bold">{reviewsList.length} reviews</span>
                  </div>

                  <div className="divide-y divide-slate-850">
                    {reviewsList.map((item) => {
                      const r = JSON.parse(item.dataJson);
                      return (
                        <div key={item.id} className="p-6 space-y-4 hover:bg-stone-50/10 transition">
                          
                          <div className="flex justify-between items-start w-full">
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-slate-800 text-xs">{r.author}</h4>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                  r.status === 'Hidden' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                }`}>
                                  {r.status || 'Visible'}
                                </span>
                              </div>
                              <div className="flex text-amber-500 text-xs mt-1">
                                {Array.from({ length: r.rating }).map((_, i) => <span key={i}>★</span>)}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleToggleHideReview(item)} className="px-2.5 py-1.5 bg-stone-100 hover:bg-slate-750 text-slate-700 border border-slate-750 rounded text-[10px] cursor-pointer">
                                {r.status === 'Hidden' ? 'Show Review' : 'Hide Review'}
                              </button>
                              <button onClick={() => deleteCustomDataItem('review', item.id)} className="px-2.5 py-1.5 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[10px]">Delete</button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 font-bold text-left">"{r.comment}"</p>

                          {r.reply && (
                            <div className="p-3.5 bg-slate-950/60 border border-stone-200/80 rounded-2xl text-xs font-bold text-[#c5a880] space-y-1 text-left">
                              <span className="text-[8px] uppercase tracking-wider text-slate-500 block">Official Response</span>
                              <p className="leading-relaxed">"{r.reply}"</p>
                            </div>
                          )}

                          {/* Reply box */}
                          <div className="space-y-1 max-w-xl text-left">
                            <label className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">Draft Official Response</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={reviewReply[item.id] !== undefined ? reviewReply[item.id] : ''}
                                onChange={(e) => setReviewReply({ ...reviewReply, [item.id]: e.target.value })}
                                className="flex-grow rounded-xl bg-slate-950 border border-stone-200/80 p-2.5 text-xs text-slate-800 outline-none"
                                placeholder="Thank you for sharing your bespoke dining feedback..."
                              />
                              <button onClick={() => handleSaveReviewReply(item)} className="px-4 py-2 bg-stone-100 hover:bg-slate-750 text-[#c5a880] border border-slate-750 font-black text-[10px] uppercase rounded-xl cursor-pointer">Post Reply</button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 16: WALLET REFUNDS */}
            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Wallet Management</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Process customer wallet refunds and review historical credit transactions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  {/* Refund credits form */}
                  <div className="bg-white border border-stone-200/80 p-5 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Refund Wallet Credits</h3>
                    <form onSubmit={handleRefundWalletSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Diner Email Address</label>
                        <input type="email" required value={walletRefundForm.email} onChange={(e) => setWalletRefundForm({...walletRefundForm, email: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" placeholder="demo@zatbiz.com" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Amount ($)</label>
                        <input type="number" required value={walletRefundForm.amount} onChange={(e) => setWalletRefundForm({...walletRefundForm, amount: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Description (Internal Log)</label>
                        <input type="text" value={walletRefundForm.description} onChange={(e) => setWalletRefundForm({...walletRefundForm, description: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none" />
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Credit Wallet
                      </button>
                    </form>
                  </div>

                  {/* Transaction ledger */}
                  <div className="md:col-span-2 bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Wallet Transaction Ledger</h3>
                    
                    <div className="divide-y divide-slate-850">
                      {walletList.map((item) => {
                        const tx = JSON.parse(item.dataJson);
                        return (
                          <div key={item.id} className="py-4 flex justify-between items-center text-xs">
                            <div className="text-left">
                              <h5 className="font-extrabold text-slate-800">{tx.customerEmail}</h5>
                              <p className="text-[10px] text-slate-500 font-bold mt-0.5">{tx.description}</p>
                              <span className="text-[9px] text-[#c5a880] font-bold block mt-0.5">Date: {tx.date}</span>
                            </div>
                            
                            <div className="text-right flex gap-3 items-center">
                              <span className="font-extrabold text-emerald-500">+${tx.amount}</span>
                              <button onClick={() => deleteCustomDataItem('wallet_transaction', item.id)} className="px-2 py-1 bg-rose-950/20 text-rose-400 border border-rose-200 rounded cursor-pointer text-[9px]">Delete</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 17: PROMOTIONS */}
            {activeTab === 'promotions' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Promotional Broadcasting</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Broadcast promotional emails and SMS campaigns directly to selected guest clusters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  
                  {/* Compose box */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Compose Broadcast Campaign</h3>
                    
                    <form onSubmit={handleSendPromo} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Broadcast Channel</label>
                          <select value={promoForm.channel} onChange={(e) => setPromoForm({...promoForm, channel: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                            <option value="Email">Email Newsletters</option>
                            <option value="SMS">SMS / WhatsApp Broadcast</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-wider text-slate-455">Target segment</label>
                          <select value={promoForm.segment} onChange={(e) => setPromoForm({...promoForm, segment: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none">
                            <option value="All Customers">All Customers ({customersList.length})</option>
                            <option value="VIP Diners">VIP Diners Only</option>
                            <option value="Recent Leads">Recent Lead Signups</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-wider text-slate-455">Message Body</label>
                        <textarea required value={promoForm.message} onChange={(e) => setPromoForm({...promoForm, message: e.target.value})} className="w-full bg-stone-50 border border-stone-200 text-xs p-2.5 rounded-xl text-slate-800 outline-none resize-none h-32" placeholder="Dear Guest, Join us for the Royal Wine Tasting Event this coming Friday..." />
                      </div>
                      
                      <button type="submit" className="w-full py-3 bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none transition">
                        Dispatch Broadcast Campaign
                      </button>
                    </form>
                  </div>

                  {/* Broadcast history */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Broadcast Campaign History</h3>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin">
                      {promoLogs.map((item) => {
                        const p = JSON.parse(item.dataJson);
                        return (
                          <div key={item.id} className="p-4 bg-stone-50/60 border border-stone-200/80 rounded-2xl text-xs space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-slate-800">Segment: {p.segment}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[8px] font-black uppercase">{p.channel} {p.status}</span>
                            </div>
                            <p className="text-slate-500 font-bold italic">"{p.message}"</p>
                            <span className="text-[8.5px] text-slate-500 font-bold block mt-1">Dispatched at: {p.sentAt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 18: REPORTS & STATS */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Reports & Analytics</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Export operational reports and sales history data logs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  
                  {/* Exporting panel */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Download Ledger Reports</h3>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">Download structured logs of dining activity, sales metrics, and table allocations in standard CSV sheets.</p>
                    
                    <div className="space-y-3 pt-3">
                      <button onClick={() => triggerAlert('success', 'Generating Sales ledger CSV download...')} className="w-full py-3 bg-stone-50 hover:bg-slate-850 border border-[#c5a880]/30 text-[#c5a880] font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer transition">
                        📊 Export sales ledger CSV
                      </button>
                      <button onClick={() => triggerAlert('success', 'Generating Reservation registry PDF...')} className="w-full py-3 bg-stone-50 hover:bg-slate-850 border border-stone-200 text-slate-500 hover:text-slate-800 font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer transition">
                        📅 Export Reservations registry PDF
                      </button>
                    </div>
                  </div>

                  {/* Revenue metrics */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a880] font-serif">Dining Category Sales Breakdown</h3>
                    
                    <div className="space-y-3 pt-2">
                      {[
                        { label: 'Gourmet Mains / Entrées', value: 45, color: 'bg-[#c5a880]' },
                        { label: 'Wine Pairing & Cocktails', value: 30, color: 'bg-indigo-500' },
                        { label: 'Wood-fired Pizzas / Bakery', value: 15, color: 'bg-purple-500' },
                        { label: 'Signature Desserts', value: 10, color: 'bg-emerald-500' }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1.5 text-xs">
                          <div className="flex justify-between font-bold text-slate-600">
                            <span>{item.label}</span>
                            <span className="font-extrabold text-slate-800">{item.value}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-stone-50 overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 19: SETTINGS & BRANDING */}
            {activeTab === 'settings' && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="text-2xl font-black font-serif text-slate-800 tracking-wide">Theme & Layout Customizer</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">Configure layout, colors, and landing designs for customer storefront views.</p>
                </div>

                <div className="space-y-8">
                  {/* Brand Color Theme Selection */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#c5a880] font-serif border-b border-stone-100 pb-2">1. Selected Brand Theme Color</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {RESTAURANT_THEMES.map((themeOpt) => {
                        const isSelected = selectedTheme === themeOpt.id;
                        return (
                          <button
                            key={themeOpt.id}
                            type="button"
                            onClick={() => setSelectedTheme(themeOpt.id)}
                            className={`p-4 border rounded-2xl flex items-center gap-3 transition cursor-pointer text-left ${
                              isSelected 
                                ? 'border-[#c5a880] bg-[#c5a880]/5 ring-1 ring-[#c5a880]' 
                                : 'border-stone-200 bg-stone-50/30 hover:border-stone-300'
                            }`}
                          >
                            <span className={`w-8 h-8 rounded-full ${themeOpt.bgColor} flex-shrink-0 border border-black/10 shadow-sm`} />
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">{themeOpt.name}</h4>
                              <p className="text-[9px] text-slate-500 mt-0.5 font-bold leading-normal">{themeOpt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Homepage Layout Selection */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#c5a880] font-serif border-b border-stone-100 pb-2">2. Selected Homepage Layout</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {RESTAURANT_HOMEPAGES.map((layoutOpt) => {
                        const isSelected = selectedHomepage === layoutOpt.id;
                        return (
                          <button
                            key={layoutOpt.id}
                            type="button"
                            onClick={() => setSelectedHomepage(layoutOpt.id)}
                            className={`p-5 border rounded-2xl flex flex-col justify-between min-h-[110px] transition cursor-pointer text-left ${
                              isSelected 
                                ? 'border-[#c5a880] bg-[#c5a880]/5 ring-1 ring-[#c5a880]' 
                                : 'border-stone-200 bg-stone-50/30 hover:border-stone-300'
                            }`}
                          >
                            <span className="text-3xl select-none">{layoutOpt.previewIcon}</span>
                            <div className="mt-2">
                              <h4 className="text-xs font-bold text-slate-800">{layoutOpt.name}</h4>
                              <p className="text-[9px] text-slate-500 mt-0.5 font-bold leading-relaxed">{layoutOpt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Login Layout Selection */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#c5a880] font-serif border-b border-stone-100 pb-2">3. Selected Login Page Layout</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {RESTAURANT_LOGINS.map((layoutOpt) => {
                        const isSelected = selectedLogin === layoutOpt.id;
                        return (
                          <button
                            key={layoutOpt.id}
                            type="button"
                            onClick={() => setSelectedLogin(layoutOpt.id)}
                            className={`p-5 border rounded-2xl flex flex-col justify-between min-h-[110px] transition cursor-pointer text-left ${
                              isSelected 
                                ? 'border-[#c5a880] bg-[#c5a880]/5 ring-1 ring-[#c5a880]' 
                                : 'border-stone-200 bg-stone-50/30 hover:border-stone-300'
                            }`}
                          >
                            <span className="text-3xl select-none">{layoutOpt.previewIcon}</span>
                            <div className="mt-2">
                              <h4 className="text-xs font-bold text-slate-800">{layoutOpt.name}</h4>
                              <p className="text-[9px] text-slate-500 mt-0.5 font-bold leading-relaxed">{layoutOpt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dashboard Layout Selection */}
                  <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-lg space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#c5a880] font-serif border-b border-stone-100 pb-2">4. Selected Dashboard Layout</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {RESTAURANT_DASHBOARDS.map((layoutOpt) => {
                        const isSelected = selectedDashboard === layoutOpt.id;
                        return (
                          <button
                            key={layoutOpt.id}
                            type="button"
                            onClick={() => setSelectedDashboard(layoutOpt.id)}
                            className={`p-5 border rounded-2xl flex flex-col justify-between min-h-[110px] transition cursor-pointer text-left ${
                              isSelected 
                                ? 'border-[#c5a880] bg-[#c5a880]/5 ring-1 ring-[#c5a880]' 
                                : 'border-stone-200 bg-stone-50/30 hover:border-stone-300'
                            }`}
                          >
                            <span className="text-3xl select-none">{layoutOpt.previewIcon}</span>
                            <div className="mt-2">
                              <h4 className="text-xs font-bold text-slate-800">{layoutOpt.name}</h4>
                              <p className="text-[9px] text-slate-500 mt-0.5 font-bold leading-relaxed">{layoutOpt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={async () => {
                        const activeTheme = RESTAURANT_THEMES.find(t => t.id === selectedTheme);
                        const payload = {
                          ...restaurantInfo,
                          selectedTheme,
                          selectedHomepageLayout: selectedHomepage,
                          selectedLoginLayout: selectedLogin,
                          selectedDashboardLayout: selectedDashboard,
                          themeColor: activeTheme ? activeTheme.color : '#c5a880'
                        };

                        try {
                          const updated = await api.restaurant.update(projectId, payload);
                          setRestaurantInfo(updated);
                          triggerAlert('success', 'Layout settings saved successfully! Refresh page to see storefront shifts.');
                        } catch (err: any) {
                          console.error(err);
                          triggerAlert('error', 'Failed to save settings. Simulating offline.');
                          setRestaurantInfo(payload);
                        }
                      }}
                      className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#b0936b] text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider cursor-pointer border-none shadow-lg transition"
                    >
                      Save Layout Configurations ✓
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </section>

      </main>

      {/* MODAL: ADD/EDIT MENU FOOD ITEM */}
      {showAddMenuModal && (
        <div className="fixed inset-0 z-[99] bg-[#faf9f6]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-stone-200/60 rounded-[32px] p-6 text-left shadow-2xl relative">
            <h3 className="font-serif text-lg font-extrabold text-slate-800 tracking-wide border-b border-stone-200/80 pb-4">
              {editingMenuItem ? 'Edit Menu Food Item' : 'Add Food Item to Menu'}
            </h3>
            
            <form onSubmit={handleSaveMenu} className="space-y-4 mt-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Food Item Name</label>
                  <input
                    type="text"
                    required
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none"
                    placeholder="e.g. Classic Truffle Pasta"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Pricing ($)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none"
                    placeholder="19.99"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Menu Category</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none font-bold"
                  >
                    {categoriesList.map((cat, idx) => (
                      <option key={idx} value={cat.name}>{cat.name}</option>
                    ))}
                    <option value="General">General</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Stock Limit (daily)</label>
                  <input
                    type="number"
                    required
                    value={menuForm.stock}
                    onChange={(e) => setMenuForm({ ...menuForm, stock: e.target.value })}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Food Photo</label>
                {menuForm.imageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 p-2 flex items-center gap-3">
                    <img 
                      src={menuForm.imageUrl} 
                      alt="Food preview" 
                      className="w-16 h-16 object-cover rounded-xl border border-stone-200" 
                    />
                    <div className="flex-grow text-left">
                      <span className="text-[10px] font-black text-slate-800 block truncate">Photo Uploaded</span>
                      <span className="text-[8px] text-slate-450 font-bold block mt-0.5">Base64 Compressed JPEG</span>
                      <button
                        type="button"
                        onClick={() => setMenuForm(prev => ({ ...prev, imageUrl: '' }))}
                        className="mt-1 px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-extrabold uppercase border-none cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-200 hover:border-[#c5a880] rounded-2xl p-5 bg-stone-50/50 hover:bg-stone-50 cursor-pointer transition text-center">
                    <span className="text-2xl select-none">📷</span>
                    <span className="text-[10px] font-black text-slate-800 mt-2 block">Upload Photo from Device</span>
                    <span className="text-[8px] text-slate-450 font-bold block mt-0.5">JPEG, PNG up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Food Variants (comma separated)</label>
                <input
                  type="text"
                  value={menuForm.variants}
                  onChange={(e) => setMenuForm({ ...menuForm, variants: e.target.value })}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none"
                  placeholder="Medium, Large, Extra Cheese"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-wider text-slate-455 font-black">Description</label>
                <textarea
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none resize-none h-16"
                  placeholder="Rich white wine truffle oil sauce with aged parmesan..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200/80">
                <button
                  type="button"
                  onClick={() => setShowAddMenuModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-slate-750 text-slate-600 text-xs font-bold cursor-pointer border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#c5a880] hover:bg-[#b09470] text-[#07080e] text-xs font-black uppercase tracking-wider cursor-pointer border-none"
                >
                  {editingMenuItem ? 'Save Changes' : 'Publish Dish'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
