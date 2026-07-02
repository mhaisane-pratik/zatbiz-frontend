import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { api } from '@/services/api';

export function useCategoryDashboardState(projectId: number, clientEmail: string, companyName: string, logoUrl: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(850.00);

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

  const fetchDbProducts = () => {
    api.products.list(projectId).then(setProducts).catch(console.error);
  };

  const fetchOrders = () => {
    if (clientEmail === 'admin@gmail.com') {
      api.orders.list(projectId).then(setOrders).catch(console.error);
    } else {
      const clientId = localStorage.getItem('clientId');
      if (clientId) {
        api.orders.listForCustomer(projectId, parseInt(clientId, 10)).then(setOrders).catch(console.error);
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
    storeSettings, setStoreSettings,
    userName, setUserName,
    userPhone, setUserPhone,
    userAddressHome, setUserAddressHome
  };
}
