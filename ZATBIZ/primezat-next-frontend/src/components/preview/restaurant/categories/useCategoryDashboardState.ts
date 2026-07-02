import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { api } from '@/services/api';

export function useCategoryDashboardState(projectId: number, clientEmail: string, companyName: string, logoUrl: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`zatbiz_wallet_balance_${projectId}_${clientEmail}`);
      if (stored) {
        try { return parseFloat(stored); } catch {}
      }
    }
    return 850.00;
  });

  const [cartItems, setCartItems] = useState<Array<{ product: Product, quantity: number }>>([]);

  const [storeSettings, setStoreSettings] = useState<any>({
    storeName: companyName || 'Gourmet Kitchen',
    logoUrl: logoUrl || '',
    taxRate: 5.0,
    shippingFee: 50.0,
    enableUpi: true,
    enableCard: true,
    enableCod: true
  });

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userAddressHome, setUserAddressHome] = useState('Flat 402, Skyline Towers, Sector 62, Noida, UP');

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && clientEmail) {
      const stored = localStorage.getItem(`zatbiz_cart_${projectId}_${clientEmail}`);
      if (stored) {
        try {
          setCartItems(JSON.parse(stored));
        } catch {}
      }
    }
  }, [projectId, clientEmail]);

  // Sync wallet balance to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && clientEmail) {
      localStorage.setItem(`zatbiz_wallet_balance_${projectId}_${clientEmail}`, String(walletBalance));
    }
  }, [walletBalance, projectId, clientEmail]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(`zatbiz_cart_${projectId}_${clientEmail}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const removeFromCart = (productId: number | undefined) => {
    if (productId === undefined) return;
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === productId);
      let updated;
      if (existing && existing.quantity > 1) {
        updated = prev.map(item =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updated = prev.filter(item => item.product.id !== productId);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(`zatbiz_cart_${projectId}_${clientEmail}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`zatbiz_cart_${projectId}_${clientEmail}`);
    }
  };

  const placeDinerOrder = async (
    paymentMethod: string = 'Cash on Delivery',
    city: string = 'Local City',
    state: string = 'Local State',
    pincode: string = '110001'
  ) => {
    if (cartItems.length === 0) return;
    const clientIdStr = localStorage.getItem('clientId');
    const clientId = (clientIdStr && !clientIdStr.startsWith('mock-')) ? parseInt(clientIdStr, 10) : null;
    const clientName = localStorage.getItem('clientName') || userName || 'Honored Guest';
    const clientPhoneVal = localStorage.getItem('clientPhone') || userPhone || '';
    const clientAddressVal = localStorage.getItem('clientAddress') || userAddressHome || '';

    const items = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl
    }));

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tax = Number((subtotal * (storeSettings.taxRate / 100)).toFixed(2));
    const total = subtotal + tax + (storeSettings.shippingFee || 0);

    const payload = {
      projectId,
      customerId: clientId,
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhoneVal,
      customerAddress: clientAddressVal,
      items: items,
      subtotal,
      tax,
      total,
      paymentMethod,
      city,
      state,
      pincode,
      paymentGateway: paymentMethod === 'COD' ? 'COD' : 'Stripe',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
    };

    try {
      const res = await api.orders.place(payload);
      fetchOrders();
      clearCart();
      return res;
    } catch (err) {
      console.error('Failed to place order:', err);
      throw err;
    }
  };

  const fetchDbProducts = () => {
    api.products.list(projectId).then(setProducts).catch(console.error);
  };

  const fetchOrders = () => {
    if (clientEmail === 'admin@gmail.com') {
      api.orders.list(projectId).then(setOrders).catch(console.error);
    } else {
      const clientIdStr = localStorage.getItem('clientId');
      // If we log in with a mock ID (e.g. offline fallback), fetch orders by email or custom listing
      if (clientIdStr && !clientIdStr.startsWith('mock-')) {
        api.orders.listForCustomer(projectId, parseInt(clientIdStr, 10)).then(setOrders).catch(console.error);
      } else {
        // Fallback to fetch all orders for project and filter locally
        api.orders.list(projectId).then(setOrders).catch(console.error);
      }
    }
  };

  const fetchReservationsList = () => {
    setReservationLoading(true);
    const requestPromise = clientEmail === 'admin@gmail.com'
      ? api.reservations.list(projectId)
      : api.reservations.listByCustomer(projectId, clientEmail);

    requestPromise
      .then(setReservations)
      .catch(console.error)
      .finally(() => setReservationLoading(false));
  };

  useEffect(() => {
    const cachedName = localStorage.getItem('clientName');
    const cachedPhone = localStorage.getItem('clientPhone');
    const cachedAddress = localStorage.getItem('clientAddress');
    if (cachedName) setUserName(cachedName);
    if (cachedPhone) setUserPhone(cachedPhone);
    if (cachedAddress) setUserAddressHome(cachedAddress);

    fetchDbProducts();
    fetchOrders();
    fetchReservationsList();
  }, [projectId, clientEmail]);

  return {
    products, setProducts, fetchDbProducts,
    orders, setOrders, fetchOrders,
    reservations, setReservations, fetchReservationsList, reservationLoading,
    walletBalance, setWalletBalance,
    cartItems, setCartItems, addToCart, removeFromCart, clearCart, placeDinerOrder,
    storeSettings, setStoreSettings,
    userName, setUserName,
    userPhone, setUserPhone,
    userAddressHome, setUserAddressHome
  };
}
