import { Project, Product, Order, Customer } from '@/types';
import {
  getMockReservations,
  getMockProducts,
  getDefaultCoupons,
  getDefaultCategories,
  getDefaultBrands
} from './mockData';

// Global localStorage interceptor to prevent QuotaExceededError crashes
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
    window.localStorage.setItem = (key: string, value: string) => {
      try {
        originalSetItem(key, value);
      } catch (err) {
        console.warn(`LocalStorage quota exceeded or write failed for key "${key}":`, err);
      }
    };
  } catch (e) {
    console.error('Failed to patch localStorage.setItem:', e);
  }
}

// Unsplash food images array for high-quality food visuals
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', // burger
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', // pizza
  'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&auto=format&fit=crop&q=80', // pasta
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', // salad
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80', // dessert
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80', // drink
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80', // pizza slice
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80', // grill
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', // ribs
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=80', // sandwich
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&auto=format&fit=crop&q=80'  // french toast
];

// Helper to resolve realistic food images based on item name keywords
export function getRandomFoodImage(name: string = ''): string {
  const lower = name.toLowerCase();
  if (lower.includes('burger') || lower.includes('sandwich') || lower.includes('slider') || lower.includes('bun')) {
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
  }
  if (lower.includes('pizza') || lower.includes('calzone') || lower.includes('garlic bread') || lower.includes('margherita')) {
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
  }
  if (lower.includes('pasta') || lower.includes('noodle') || lower.includes('spaghetti') || lower.includes('macaroni') || lower.includes('tagliatelle') || lower.includes('carbonara')) {
    return 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&auto=format&fit=crop&q=80';
  }
  if (lower.includes('salad') || lower.includes('quinoa') || lower.includes('healthy') || lower.includes('green') || lower.includes('bowl') || lower.includes('avocado')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80';
  }
  if (lower.includes('cake') || lower.includes('dessert') || lower.includes('lava') || lower.includes('chocolate') || lower.includes('sweet') || lower.includes('pastry') || lower.includes('ice cream') || lower.includes('muffin')) {
    return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80';
  }
  if (lower.includes('mojito') || lower.includes('drink') || lower.includes('juice') || lower.includes('mocktail') || lower.includes('beverage') || lower.includes('soda') || lower.includes('coke') || lower.includes('coffee') || lower.includes('tea') || lower.includes('water')) {
    return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80';
  }
  if (lower.includes('steak') || lower.includes('meat') || lower.includes('ribeye') || lower.includes('chicken') || lower.includes('beef') || lower.includes('grill') || lower.includes('pork') || lower.includes('tandoori')) {
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80';
  }
  
  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = lower.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FOOD_IMAGES.length;
  return FOOD_IMAGES[index];
}

// Memory cache for templates resolved during session
const projectTemplatesCache: Record<number, string> = {};

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    const normalized = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
    return `${normalized}/api`;
  }
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('zatbizApiEndpoint');
    if (saved) {
      const normalized = saved.replace(/\/$/, '');
      return `${normalized}/api`;
    }
  }
  return 'http://localhost:8080/api';
};

const isProjectApiPath = (path: string) =>
  path === '/projects' || /^\/projects\/\d+/.test(path);

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  if (isProjectApiPath(path) && typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error(
        'Please log in again. Projects are stored in the database and require authentication.'
      );
    }
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    const response = await fetch(url, {
      cache: 'no-store',
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as T;
  } catch (err: any) {
    // Catch network-level errors (e.g. backend server is offline), API 404s, or API 500s (e.g. database/JPA transactional failures)
    const isNetworkError = !err?.message?.startsWith('API Error:');
    const isFallbackStatus = err?.message?.startsWith('API Error: 404') || 
                             err?.message?.startsWith('API Error: 500') ||
                             err?.message?.startsWith('API Error: 502') ||
                             err?.message?.startsWith('API Error: 503') ||
                             err?.message?.startsWith('API Error: 504');

    if (isNetworkError || isFallbackStatus) {
      if (isProjectApiPath(path)) {
        const msg = isNetworkError
          ? 'Backend server is offline. Start Spring Boot on http://localhost:8080 to save projects to the database.'
          : (err?.message || 'Failed to sync project with the database.');
        throw new Error(msg);
      }

      console.warn(`[API Fallback Warning] Falling back to client-side mock sandbox for: ${path} (${err?.message || err})`);
      
      const method = options?.method || 'GET';

      // 3. OFFLINE CREATE PRODUCT
      if (path === '/products' && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newProd = {
          id: Date.now(),
          projectId: bodyData.projectId || 1,
          name: bodyData.name || 'New Item',
          description: bodyData.description || '',
          price: bodyData.price || 0,
          category: bodyData.category || 'General',
          imageUrl: bodyData.imageUrl || '/images/login_illustration.png',
          variants: bodyData.variants || '',
          stock: bodyData.stock || 10,
          available: bodyData.available !== false
        };
        if (typeof window !== 'undefined') {
          let productsList: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_products');
          if (stored) {
            try { productsList = JSON.parse(stored); } catch {}
          }
          productsList.push(newProd);
          localStorage.setItem('zatbiz_offline_products', JSON.stringify(productsList));
        }
        return newProd as unknown as T;
      }

      // 4. OFFLINE UPDATE PRODUCT
      if (path.match(/\/products\/\d+/) && method === 'PUT') {
        const idMatch = path.match(/\/products\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          let productsList: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_products');
          if (stored) {
            try { productsList = JSON.parse(stored); } catch {}
          }
          const idx = productsList.findIndex(p => String(p.id) === String(id));
          if (idx !== -1) {
            productsList[idx] = { ...productsList[idx], ...bodyData };
            localStorage.setItem('zatbiz_offline_products', JSON.stringify(productsList));
            return productsList[idx] as unknown as T;
          }
        }
        return bodyData as unknown as T;
      }

      // 5. OFFLINE DELETE PRODUCT
      if (path.match(/\/products\/\d+/) && method === 'DELETE') {
        const idMatch = path.match(/\/products\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          let productsList: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_products');
          if (stored) {
            try { productsList = JSON.parse(stored); } catch {}
          }
          const filtered = productsList.filter(p => String(p.id) !== String(id));
          localStorage.setItem('zatbiz_offline_products', JSON.stringify(filtered));
        }
        return { success: true } as unknown as T;
      }

      // OFFLINE CREATE RESERVATION
      if (path === '/reservations' && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newRes = {
          id: Date.now(),
          projectId: bodyData.projectId || 1,
          customerName: bodyData.customerName || 'Walk-in',
          customerEmail: bodyData.customerEmail || '',
          customerPhone: bodyData.customerPhone || '',
          bookingDate: bodyData.bookingDate || '2026-06-10',
          bookingTime: bodyData.bookingTime || '19:00',
          numberOfGuests: bodyData.numberOfGuests || 2,
          tableNumber: bodyData.tableNumber || '1',
          status: bodyData.status || 'Pending',
          notes: bodyData.notes || '',
          createdAt: new Date().toISOString()
        };
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_reservations');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          list.push(newRes);
          localStorage.setItem('zatbiz_offline_reservations', JSON.stringify(list));
        }
        return newRes as unknown as T;
      }

      // OFFLINE UPDATE RESERVATION STATUS
      if (path.match(/\/reservations\/\d+\/status/) && method === 'PUT') {
        const idMatch = path.match(/\/reservations\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_reservations');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          const idx = list.findIndex(r => String(r.id) === String(id));
          if (idx !== -1) {
            list[idx].status = bodyData.status || 'Pending';
            localStorage.setItem('zatbiz_offline_reservations', JSON.stringify(list));
            return list[idx] as unknown as T;
          }
        }
        return { success: true } as unknown as T;
      }

      // OFFLINE UPDATE RESERVATION DETAILS
      if (path.match(/\/reservations\/\d+/) && method === 'PUT') {
        const idMatch = path.match(/\/reservations\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_reservations');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          const idx = list.findIndex(r => String(r.id) === String(id));
          if (idx !== -1) {
            list[idx] = { ...list[idx], ...bodyData };
            localStorage.setItem('zatbiz_offline_reservations', JSON.stringify(list));
            return list[idx] as unknown as T;
          }
        }
        return bodyData as unknown as T;
      }

      // OFFLINE DELETE RESERVATION
      if (path.match(/\/reservations\/\d+/) && method === 'DELETE') {
        const idMatch = path.match(/\/reservations\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_reservations');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const filtered = list.filter(r => String(r.id) !== String(id));
              localStorage.setItem('zatbiz_offline_reservations', JSON.stringify(filtered));
            } catch {}
          }
        }
        return { success: true } as unknown as T;
      }

      // OFFLINE LIST RESERVATIONS
      if (path.startsWith('/reservations')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        // Extract customer email if provided
        const emailMatch = path.match(/[?&]email=([^&]+)/);
        const customerEmail = emailMatch ? decodeURIComponent(emailMatch[1]) : null;

        let storedRes: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_reservations');
          if (stored) {
            try {
              storedRes = JSON.parse(stored).filter((r: any) => 
                String(r.projectId) === String(projectId) &&
                (!customerEmail || r.customerEmail?.toLowerCase() === customerEmail.toLowerCase())
              );
            } catch {}
          }
        }
        if (storedRes.length > 0 || customerEmail) {
          return storedRes as unknown as T;
        }
        // Seed default bookings for restaurant
        const defaultSeeds = getMockReservations(projectId);

        const filteredSeeds = customerEmail
          ? defaultSeeds.filter(r => r.customerEmail.toLowerCase() === customerEmail.toLowerCase())
          : defaultSeeds;

        return filteredSeeds as unknown as T;
      }

      // 8. OFFLINE LIST PRODUCTS
      if (path.startsWith('/products')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;

        let storedProducts: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_products');
          if (stored) {
            try {
              storedProducts = JSON.parse(stored).filter((p: any) => String(p.projectId) === String(projectId));
            } catch {}
          }
        }

        if (storedProducts.length > 0) {
          return storedProducts as unknown as T;
        }

        // Seed default products based on template type
        const template = projectTemplatesCache[projectId] || (typeof window !== 'undefined' && window.location.href.toLowerCase().includes('restaurant') ? 'restaurant' : 'storefront');

        // Check project niche
        let projectsList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_projects');
          if (stored) {
            try { projectsList = JSON.parse(stored); } catch {}
          }
        }
        const proj = projectsList.find(p => String(p.id) === String(projectId));
        let shopNiche = '';
        let businessType = '';
        if (proj) {
          try {
            const parsed = JSON.parse(proj.blocksJson);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              if (parsed.businessConfig?.shopNiche) {
                shopNiche = parsed.businessConfig.shopNiche;
                businessType = parsed.businessConfig.businessType || '';
              }
              if ((!shopNiche || !businessType) && parsed.pages) {
                for (const pageName of Object.keys(parsed.pages)) {
                  const bizBlock = parsed.pages[pageName]?.find((b: any) => b.type === 'business_config');
                  if (bizBlock?.content) {
                    shopNiche = shopNiche || bizBlock.content.shopNiche || '';
                    businessType = businessType || bizBlock.content.businessType || '';
                  }
                }
              }
            } else if (Array.isArray(parsed)) {
              const bizBlock = parsed.find((b: any) => b.type === 'business_config');
              shopNiche = bizBlock?.content?.shopNiche || '';
              businessType = bizBlock?.content?.businessType || '';
            }
            if (businessType === 'fashion' && !shopNiche) {
              shopNiche = 'cloth';
            }
          } catch {}
        } else {
          if (projectId === 1003) shopNiche = 'cloth';
          else if (projectId === 1001) shopNiche = 'restaurant';
          else if (projectId === 1002) shopNiche = 'furniture';
          else if (projectId === 1004) shopNiche = 'tech';
          else if (projectId === 1005) shopNiche = 'beauty';
          else if (projectId === 1006) shopNiche = 'creative';
        }

        return getMockProducts(projectId, shopNiche, template) as unknown as T;
      }

      // Fallback for customer register
      if (path.startsWith('/customers/register') && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newCust = {
          id: Date.now(),
          name: bodyData.name || 'Demo Client User',
          email: bodyData.email || 'customer@example.com',
          phone: bodyData.phone || '+91 98765 43210',
          address: bodyData.address || 'Flat 402, Skyline Towers, Sector 62, Noida, UP',
          projectId: bodyData.projectId || 1,
          status: 'Customer',
          totalSpent: 0.0,
          totalOrders: 0
        };
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_customers');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          list.push(newCust);
          localStorage.setItem('zatbiz_offline_customers', JSON.stringify(list));
        }
        return newCust as unknown as T;
      }

      // Fallback for customer login
      if (path.startsWith('/customers/login') && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_customers');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              const found = list.find(c => c.email === bodyData.email && String(c.projectId) === String(bodyData.projectId));
              if (found) return found as unknown as T;
            } catch {}
          }
        }
        return {
          id: 1,
          name: 'Demo Client User',
          email: bodyData.email || 'customer@example.com',
          phone: '+91 98765 43210',
          address: 'Flat 402, Skyline Towers, Sector 62, Noida, UP',
          projectId: bodyData.projectId || 1,
          status: 'Customer'
        } as unknown as T;
      }

      // Fallback for customer update
      if (path.match(/\/customers\/\d+/) && method === 'PUT') {
        const idMatch = path.match(/\/customers\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_customers');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const idx = list.findIndex(c => String(c.id) === String(id));
              if (idx !== -1) {
                list[idx] = { ...list[idx], ...bodyData };
                localStorage.setItem('zatbiz_offline_customers', JSON.stringify(list));
                return list[idx] as unknown as T;
              }
            } catch {}
          }
        }
        return bodyData as unknown as T;
      }

      // Fallback for list customers for project
      if (path.startsWith('/customers') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_customers');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              const filtered = list.filter(c => String(c.projectId) === String(projectId));
              return filtered as unknown as T;
            } catch {}
          }
        }
        return [] as unknown as T;
      }

      // Fallback for placing order
      if (path.startsWith('/orders') && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newOrder = {
          id: Date.now(),
          projectId: bodyData.projectId || 1,
          customerId: bodyData.customerId || null,
          customerName: bodyData.customerName || 'Walk-in Customer',
          customerEmail: bodyData.customerEmail || '',
          customerPhone: bodyData.customerPhone || '',
          customerAddress: bodyData.customerAddress || '',
          itemsJson: typeof bodyData.items === 'string' ? bodyData.items : JSON.stringify(bodyData.items || []),
          subtotal: bodyData.subtotal || 0,
          tax: bodyData.tax || 0,
          total: bodyData.total || 0,
          paymentGateway: bodyData.paymentGateway || 'Stripe',
          paymentStatus: bodyData.paymentStatus || 'Paid',
          status: 'Processing',
          invoiceNumber: 'GST-2026-' + Math.floor(Math.random() * 9000 + 1000),
          date: 'Just Now'
        };
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_orders');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          list.push(newOrder);
          localStorage.setItem('zatbiz_offline_orders', JSON.stringify(list));

          // Also deduct stock offline!
          try {
            const items = typeof bodyData.items === 'string' ? JSON.parse(bodyData.items) : (bodyData.items || []);
            let localProds = JSON.parse(localStorage.getItem('zatbiz_offline_products') || '[]');
            items.forEach((item: any) => {
              const pIdx = localProds.findIndex((p: any) => String(p.id) === String(item.id));
              if (pIdx !== -1) {
                localProds[pIdx].stock = Math.max(0, (localProds[pIdx].stock || 0) - (item.quantity || 0));
              }
            });
            localStorage.setItem('zatbiz_offline_products', JSON.stringify(localProds));
          } catch (e) {
            console.error('Offline stock deduction failed:', e);
          }
        }
        return newOrder as unknown as T;
      }

      // Fallback for orders update status
      if (path.match(/\/orders\/\d+\/status/) && method === 'PUT') {
        const idMatch = path.match(/\/orders\/(\d+)\/status/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_orders');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const idx = list.findIndex(o => String(o.id) === String(id));
              if (idx !== -1) {
                list[idx].status = bodyData.status || list[idx].status;
                
                // If status is Cancelled, restore product stock offline!
                if (bodyData.status === 'Cancelled') {
                  try {
                    const items = typeof list[idx].itemsJson === 'string' ? JSON.parse(list[idx].itemsJson) : (list[idx].itemsJson || []);
                    let localProds = JSON.parse(localStorage.getItem('zatbiz_offline_products') || '[]');
                    items.forEach((item: any) => {
                      const pIdx = localProds.findIndex((p: any) => String(p.id) === String(item.id));
                      if (pIdx !== -1) {
                        localProds[pIdx].stock = (localProds[pIdx].stock || 0) + (item.quantity || 0);
                      }
                    });
                    localStorage.setItem('zatbiz_offline_products', JSON.stringify(localProds));
                  } catch (stockErr) {
                    console.error('Failed to restore stock on cancel:', stockErr);
                  }
                }
                
                localStorage.setItem('zatbiz_offline_orders', JSON.stringify(list));
                return list[idx] as unknown as T;
              }
            } catch {}
          }
        }
        return { success: true } as unknown as T;
      }

      // Fallback for orders list by project
      if (path.startsWith('/orders') && !path.includes('/customer') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_orders');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              const filtered = list.filter(o => String(o.projectId) === String(projectId));
              return filtered as unknown as T;
            } catch {}
          }
        }
        return [] as unknown as T;
      }

      // Fallback for orders list by customer
      if (path.startsWith('/orders/customer') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const customerIdMatch = path.match(/[?&]customerId=(\d+)/);
        const customerId = customerIdMatch ? parseInt(customerIdMatch[1], 10) : null;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_orders');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              const filtered = list.filter(o => String(o.projectId) === String(projectId) && String(o.customerId) === String(customerId));
              return filtered as unknown as T;
            } catch {}
          }
        }
        return [] as unknown as T;
      }

      // Settings API fallbacks
      if (path.startsWith('/settings') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(`zatbiz_offline_settings_${projectId}`);
          if (stored) {
            try { return JSON.parse(stored) as unknown as T; } catch {}
          }
        }
        return {
          projectId,
          storeName: 'My Shop',
          logoUrl: '',
          taxRate: 18.0,
          shippingFee: 0.0,
          enableUpi: true,
          enableCard: true,
          enableCod: true
        } as unknown as T;
      }

      if (path.startsWith('/settings') && method === 'PUT') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const savedSettings = { ...bodyData, projectId };
        if (typeof window !== 'undefined') {
          localStorage.setItem(`zatbiz_offline_settings_${projectId}`, JSON.stringify(savedSettings));
        }
        return savedSettings as unknown as T;
      }

      // Coupons API fallbacks
      if (path.startsWith('/coupons') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_coupons');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              return list.filter(c => String(c.projectId) === String(projectId)) as unknown as T;
            } catch {}
          }
        }
        const defaultCoupons = getDefaultCoupons(projectId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('zatbiz_offline_coupons', JSON.stringify(defaultCoupons));
        }
        return defaultCoupons as unknown as T;
      }

      if (path.startsWith('/coupons') && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newCoupon = {
          id: Date.now(),
          projectId: bodyData.projectId || 1,
          code: bodyData.code || 'COUPON',
          discountType: bodyData.discountType || 'percentage',
          discountValue: bodyData.discountValue || 10,
          minOrderAmount: bodyData.minOrderAmount || 0,
          active: true
        };
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_coupons');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          list.push(newCoupon);
          localStorage.setItem('zatbiz_offline_coupons', JSON.stringify(list));
        }
        return newCoupon as unknown as T;
      }

      if (path.match(/\/coupons\/\d+\/toggle/) && method === 'PUT') {
        const idMatch = path.match(/\/coupons\/(\d+)\/toggle/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_coupons');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const idx = list.findIndex(c => String(c.id) === String(id));
              if (idx !== -1) {
                list[idx].active = !list[idx].active;
                localStorage.setItem('zatbiz_offline_coupons', JSON.stringify(list));
                return list[idx] as unknown as T;
              }
            } catch {}
          }
        }
        return { success: true } as unknown as T;
      }

      if (path.match(/\/coupons\/\d+/) && method === 'DELETE') {
        const idMatch = path.match(/\/coupons\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_coupons');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const filtered = list.filter(c => String(c.id) !== String(id));
              localStorage.setItem('zatbiz_offline_coupons', JSON.stringify(filtered));
            } catch {}
          }
        }
        return { success: true } as unknown as T;
      }

      // Categories API fallbacks
      if (path.startsWith('/categories') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_categories');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              return list.filter(c => String(c.projectId) === String(projectId)) as unknown as T;
            } catch {}
          }
        }
        const defaults = getDefaultCategories(projectId);
        return defaults as unknown as T;
      }

      if (path.startsWith('/categories') && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newCat = {
          id: Date.now(),
          projectId: bodyData.projectId || 1,
          name: bodyData.name || 'New Category'
        };
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_categories');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          list.push(newCat);
          localStorage.setItem('zatbiz_offline_categories', JSON.stringify(list));
        }
        return newCat as unknown as T;
      }

      if (path.match(/\/categories\/\d+/) && method === 'DELETE') {
        const idMatch = path.match(/\/categories\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_categories');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const filtered = list.filter(c => String(c.id) !== String(id));
              localStorage.setItem('zatbiz_offline_categories', JSON.stringify(filtered));
            } catch {}
          }
        }
        return { success: true } as unknown as T;
      }

      // Brands API fallbacks
      if (path.startsWith('/brands') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_brands');
          if (stored) {
            try {
              const list = JSON.parse(stored) as any[];
              return list.filter(c => String(c.projectId) === String(projectId)) as unknown as T;
            } catch {}
          }
        }
        const defaults = getDefaultBrands(projectId);
        return defaults as unknown as T;
      }

      if (path.startsWith('/brands') && method === 'POST') {
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        const newBrand = {
          id: Date.now(),
          projectId: bodyData.projectId || 1,
          name: bodyData.name || 'New Brand'
        };
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_brands');
          if (stored) {
            try { list = JSON.parse(stored); } catch {}
          }
          list.push(newBrand);
          localStorage.setItem('zatbiz_offline_brands', JSON.stringify(list));
        }
        return newBrand as unknown as T;
      }

      if (path.match(/\/brands\/\d+/) && method === 'DELETE') {
        const idMatch = path.match(/\/brands\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          let list: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_brands');
          if (stored) {
            try {
              list = JSON.parse(stored);
              const filtered = list.filter(c => String(c.id) !== String(id));
              localStorage.setItem('zatbiz_offline_brands', JSON.stringify(filtered));
            } catch {}
          }
        }
        return { success: true } as unknown as T;
      }

      // Real Estate API sub-entities fallbacks
      if (path.startsWith('/realestate/brokers')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        let storedList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_re_brokers');
          if (stored) {
            try { storedList = JSON.parse(stored); } catch {}
          } else {
            storedList = [
              { id: 1, projectId, name: 'Rajesh Kumar', email: 'rajesh@gmail.com', phone: '9876543210', specialization: 'Residential Flats', commissionRate: 2.5, status: 'Active', notes: 'Top performer for 2BHK/3BHK units.' },
              { id: 2, projectId, name: 'Priya Sharma', email: 'priya@gmail.com', phone: '9876543211', specialization: 'Luxury Villas', commissionRate: 3.0, status: 'Active', notes: 'Expert in high-end luxury properties.' },
              { id: 3, projectId, name: 'Broker Agent', email: 'broker@gmail.com', phone: '9988776655', specialization: 'Commercial & Rental', commissionRate: 2.0, status: 'Active', notes: 'Handles mixed portfolio properties.' }
            ];
            localStorage.setItem('zatbiz_offline_re_brokers', JSON.stringify(storedList));
          }
        }

        if (method === 'GET') {
          return storedList.filter(b => String(b.projectId) === String(projectId)) as unknown as T;
        }
        
        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newObj = {
            id: Date.now(),
            projectId,
            ...bodyData
          };
          storedList.push(newObj);
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_brokers', JSON.stringify(storedList));
          }
          return newObj as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/brokers\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = storedList.findIndex(b => String(b.id) === String(id));
          if (idx !== -1) {
            storedList[idx] = { ...storedList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem('zatbiz_offline_re_brokers', JSON.stringify(storedList));
            }
            return storedList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/brokers\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = storedList.filter(b => String(b.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_brokers', JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      if (path.startsWith('/realestate/leads')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        let storedList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_re_leads');
          if (stored) {
            try { storedList = JSON.parse(stored); } catch {}
          } else {
            storedList = [
              { id: 1, projectId, name: 'Amit Patel', mobile: '9876512345', email: 'amit@gmail.com', budget: 8500000, message: 'Interested in Skyline Residency 3BHK flat.', propertyId: 101, propertyName: 'Skyline Residency', assignedBrokerId: 1, status: 'Contacted', notes: 'Scheduled site visit for next Sunday.', createdDate: '2026-06-10' },
              { id: 2, projectId, name: 'Sneha Reddy', mobile: '9876512346', email: 'sneha@gmail.com', budget: 15000000, message: 'Looking for villa with private pool.', propertyId: 102, propertyName: 'Golden Meadows Villa', assignedBrokerId: 2, status: 'New', notes: 'Assigned to Priya Sharma.', createdDate: '2026-06-11' }
            ];
            localStorage.setItem('zatbiz_offline_re_leads', JSON.stringify(storedList));
          }
        }

        if (method === 'GET') {
          return storedList.filter(l => String(l.projectId) === String(projectId)) as unknown as T;
        }
        
        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newObj = {
            id: Date.now(),
            projectId,
            createdDate: new Date().toISOString().split('T')[0],
            ...bodyData
          };
          storedList.push(newObj);
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_leads', JSON.stringify(storedList));
          }
          return newObj as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/leads\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = storedList.findIndex(l => String(l.id) === String(id));
          if (idx !== -1) {
            storedList[idx] = { ...storedList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem('zatbiz_offline_re_leads', JSON.stringify(storedList));
            }
            return storedList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/leads\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = storedList.filter(l => String(l.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_leads', JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      if (path.startsWith('/realestate/visits')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        let storedList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_re_visits');
          if (stored) {
            try { storedList = JSON.parse(stored); } catch {}
          } else {
            storedList = [
              { id: 1, projectId, leadId: 1, clientName: 'Amit Patel', propertyId: 101, propertyName: 'Skyline Residency', brokerId: 1, brokerName: 'Rajesh Kumar', visitDate: '2026-06-14', visitTime: '11:00 AM', status: 'Scheduled', feedback: 'Wants to check construction progress.' }
            ];
            localStorage.setItem('zatbiz_offline_re_visits', JSON.stringify(storedList));
          }
        }

        if (method === 'GET') {
          return storedList.filter(v => String(v.projectId) === String(projectId)) as unknown as T;
        }
        
        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newObj = {
            id: Date.now(),
            projectId,
            ...bodyData
          };
          storedList.push(newObj);
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_visits', JSON.stringify(storedList));
          }
          return newObj as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/visits\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = storedList.findIndex(v => String(v.id) === String(id));
          if (idx !== -1) {
            storedList[idx] = { ...storedList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem('zatbiz_offline_re_visits', JSON.stringify(storedList));
            }
            return storedList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/visits\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = storedList.filter(v => String(v.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_visits', JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      if (path.startsWith('/realestate/sales')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        let storedList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_re_sales');
          if (stored) {
            try { storedList = JSON.parse(stored); } catch {}
          } else {
            storedList = [
              { id: 1, projectId, propertyId: 101, propertyName: 'Skyline Residency', clientName: 'Amit Patel', clientEmail: 'amit@gmail.com', brokerId: 1, salePrice: 8200000, commissionAmount: 205000, saleDate: '2026-06-10', status: 'Completed' }
            ];
            localStorage.setItem('zatbiz_offline_re_sales', JSON.stringify(storedList));
          }
        }

        if (method === 'GET') {
          return storedList.filter(s => String(s.projectId) === String(projectId)) as unknown as T;
        }
        
        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newObj = {
            id: Date.now(),
            projectId,
            ...bodyData
          };
          storedList.push(newObj);
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_sales', JSON.stringify(storedList));
          }
          return newObj as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/sales\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = storedList.findIndex(s => String(s.id) === String(id));
          if (idx !== -1) {
            storedList[idx] = { ...storedList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem('zatbiz_offline_re_sales', JSON.stringify(storedList));
            }
            return storedList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/sales\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = storedList.filter(s => String(s.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_sales', JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      if (path.startsWith('/realestate/payments')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        let storedList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_re_payments');
          if (stored) {
            try { storedList = JSON.parse(stored); } catch {}
          } else {
            storedList = [
              { id: 1, projectId, saleId: 1, propertyName: 'Skyline Residency', clientName: 'Amit Patel', amount: 1000000, paymentDate: '2026-06-10', paymentMethod: 'Bank Transfer', transactionId: 'TXN87654321', status: 'Completed' }
            ];
            localStorage.setItem('zatbiz_offline_re_payments', JSON.stringify(storedList));
          }
        }

        if (method === 'GET') {
          return storedList.filter(p => String(p.projectId) === String(projectId)) as unknown as T;
        }
        
        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newObj = {
            id: Date.now(),
            projectId,
            ...bodyData
          };
          storedList.push(newObj);
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_payments', JSON.stringify(storedList));
          }
          return newObj as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/payments\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = storedList.findIndex(p => String(p.id) === String(id));
          if (idx !== -1) {
            storedList[idx] = { ...storedList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem('zatbiz_offline_re_payments', JSON.stringify(storedList));
            }
            return storedList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/payments\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = storedList.filter(p => String(p.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_payments', JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      if (path.startsWith('/realestate/invoices')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        
        let storedList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_re_invoices');
          if (stored) {
            try { storedList = JSON.parse(stored); } catch {}
          } else {
            storedList = [
              { id: 1, projectId, saleId: 1, invoiceNumber: 'INV-2026-001', clientName: 'Amit Patel', clientEmail: 'amit@gmail.com', propertyName: 'Skyline Residency', amount: 8200000, tax: 410000, total: 8610000, issueDate: '2026-06-10', status: 'Paid' }
            ];
            localStorage.setItem('zatbiz_offline_re_invoices', JSON.stringify(storedList));
          }
        }

        if (method === 'GET') {
          return storedList.filter(i => String(i.projectId) === String(projectId)) as unknown as T;
        }
        
        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newObj = {
            id: Date.now(),
            projectId,
            ...bodyData
          };
          storedList.push(newObj);
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_invoices', JSON.stringify(storedList));
          }
          return newObj as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/invoices\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = storedList.findIndex(i => String(i.id) === String(id));
          if (idx !== -1) {
            storedList[idx] = { ...storedList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem('zatbiz_offline_re_invoices', JSON.stringify(storedList));
            }
            return storedList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/invoices\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = storedList.filter(i => String(i.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem('zatbiz_offline_re_invoices', JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      // Real Estate General Info API fallbacks
      if (path.startsWith('/realestate') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(`zatbiz_offline_realestate_${projectId}`);
          if (stored) {
            try { return JSON.parse(stored) as unknown as T; } catch {}
          }
        }

        // Validate if the project is actually real estate before returning mock real estate data
        let isRealEstateProject = false;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('zatbiz_offline_projects');
          if (stored) {
            try {
              const projectsList = JSON.parse(stored);
              const proj = projectsList.find((p: any) => String(p.id) === String(projectId));
              if (proj) {
                const parsed = JSON.parse(proj.blocksJson);
                // Self-healing or config checks
                const config = (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) 
                  ? (parsed.businessConfig || {}) 
                  : (Array.isArray(parsed) ? (parsed.find((b: any) => b.type === 'business_config')?.content || {}) : {});
                
                const nameLower = proj.name?.toLowerCase() || '';
                const descLower = proj.description?.toLowerCase() || '';
                if (config.businessType === 'realestate' || 
                    nameLower.includes('estate') || 
                    nameLower.includes('realty') || 
                    nameLower.includes('properties') ||
                    descLower.includes('estate') || 
                    descLower.includes('realty') || 
                    descLower.includes('properties')) {
                  isRealEstateProject = true;
                }
              }
            } catch {}
          }
        }

        if (!isRealEstateProject) {
          throw new Error('API Error: 404 Not Found - Real estate info not found for this project');
        }

        return {
          projectId,
          niches: 'Residential,Luxury',
          companyName: 'Grand Estates',
          businessName: 'Grand Realty',
          companyDescription: 'Premium brokerage specializing in residential sales and luxury properties.',
          ownerName: 'Admin Agent',
          mobileNo: '+91 98765 43210',
          email: 'agent@gmail.com',
          whatsappNo: '919876543210',
          city: 'Noida',
          state: 'UP',
          country: 'India',
          pincode: '201301',
          logoType: 'auto',
          logoUrl: '',
          brandImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80',
          themeColor: 'emerald'
        } as unknown as T;
      }

      if (path.startsWith('/realestate') && method === 'PUT') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          localStorage.setItem(`zatbiz_offline_realestate_${projectId}`, JSON.stringify(bodyData));
        }
        return bodyData as unknown as T;
      }

      if (path.startsWith('/hospital') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(`zatbiz_offline_hospital_${projectId}`);
          if (stored) {
            try { return JSON.parse(stored) as unknown as T; } catch {}
          }
        }
        return {
          projectId,
          subcategory: 'General Clinic',
          companyName: 'Hope Care Hospital',
          businessName: 'Hope Care',
          companyDescription: 'Professional clinical diagnostics and healthcare treatment center.',
          ownerName: 'Chief Medical Director',
          mobileNo: '+91 98765 43210',
          email: 'care@hospital.org',
          city: 'Noida',
          state: 'UP',
          country: 'India',
          pincode: '201301',
          logoUrl: '',
          themeColor: '#4f46e5'
        } as unknown as T;
      }

      if (path.startsWith('/hospital') && (method === 'PUT' || method === 'POST')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          localStorage.setItem(`zatbiz_offline_hospital_${projectId}`, JSON.stringify(bodyData));
        }
        return bodyData as unknown as T;
      }

      if (path.startsWith('/gym') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(`zatbiz_offline_gym_${projectId}`);
          if (stored) {
            try { return JSON.parse(stored) as unknown as T; } catch {}
          }
        }
        return {
          projectId,
          subcategory: 'Traditional Gym',
          clubName: 'Iron Forge Gym',
          businessName: 'Iron Forge',
          description: 'Fully equipped strength training, free weights, and expert personal trainers.',
          ownerName: 'Head Coach',
          mobileNo: '+91 98765 43210',
          email: 'coach@forgegym.com',
          city: 'Noida',
          state: 'UP',
          country: 'India',
          pincode: '201301',
          logoUrl: '',
          themeColor: '#ea580c'
        } as unknown as T;
      }

      if (path.startsWith('/gym') && (method === 'PUT' || method === 'POST')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          localStorage.setItem(`zatbiz_offline_gym_${projectId}`, JSON.stringify(bodyData));
        }
        return bodyData as unknown as T;
      }

      // Restaurant Users API fallbacks
      if (path.startsWith('/restaurant/users')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const storageKey = `zatbiz_offline_restaurant_users_${projectId}`;
        
        let localList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            try { localList = JSON.parse(stored); } catch {}
          }
        }

        if (method === 'GET') {
          return localList as unknown as T;
        }

        if (path.endsWith('/register') && method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          if (localList.some(u => u.email === bodyData.email)) {
            throw new Error('API Error: 409 Conflict - Email already registered for this workspace');
          }
          const newUser = {
            id: Date.now(),
            projectId,
            name: bodyData.name,
            email: bodyData.email,
            phone: bodyData.phone || '',
            address: bodyData.address || '',
            password: bodyData.password,
            createdAt: new Date().toISOString()
          };
          localList.push(newUser);
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(localList));
          }
          return newUser as unknown as T;
        }

        if (path.endsWith('/login') && method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const user = localList.find(u => u.email === bodyData.email && u.password === bodyData.password);
          if (user) {
            return user as unknown as T;
          }
          throw new Error('API Error: 401 Unauthorized - Invalid email or password');
        }
      }

      // Restaurant Info API fallbacks
      if (path.startsWith('/restaurant') && !path.includes('/restaurant-data') && method === 'GET') {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(`zatbiz_offline_restaurant_${projectId}`);
          if (stored) {
            try { return JSON.parse(stored) as unknown as T; } catch {}
          }
        }
        return {
          projectId,
          subcategory: 'General Restaurant',
          restaurantName: 'Gourmet Kitchen',
          businessName: 'Gourmet Kitchen',
          description: 'A culinary dining experience.',
          ownerName: 'Head Chef',
          mobileNo: '+91 98765 43210',
          email: 'chef@gourmet.com',
          city: 'Noida',
          state: 'UP',
          country: 'India',
          pincode: '201301',
          logoUrl: '',
          themeColor: 'slate'
        } as unknown as T;
      }

      if (path.startsWith('/restaurant') && !path.includes('/restaurant-data') && (method === 'PUT' || method === 'POST')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const bodyData = options?.body ? JSON.parse(options.body as string) : {};
        if (typeof window !== 'undefined') {
          localStorage.setItem(`zatbiz_offline_restaurant_${projectId}`, JSON.stringify(bodyData));
        }
        return bodyData as unknown as T;
      }

      // 18. Restaurant Custom Data API fallbacks
      if (path.includes('/restaurant-data')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const dataTypeMatch = path.match(/[?&]dataType=([^&]+)/);
        const dataType = dataTypeMatch ? decodeURIComponent(dataTypeMatch[1]) : 'general';

        const storageKey = `zatbiz_offline_restaurant_data_${projectId}_${dataType}`;
        let localList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            try {
              localList = JSON.parse(stored);
            } catch {}
          } else {
            // Seed initial mock data into local storage if empty
            if (dataType === 'event') {
              localList = [{
                id: 101,
                projectId,
                dataType: 'event',
                dataJson: JSON.stringify({
                  name: 'Royal Wine Pairing Gala',
                  date: '2026-07-15',
                  time: '19:00',
                  capacity: 50,
                  price: 2500,
                  status: 'Published',
                  artist: 'Sommelier Elena & Quartet Jazz Band',
                  description: 'An exclusive culinary evening featuring a curated 5-course tasting menu paired with exceptional reserves.',
                  banner: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80'
                })
              }];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'staff') {
              localList = [
                {
                  id: 201,
                  projectId,
                  dataType: 'staff',
                  dataJson: JSON.stringify({
                    name: 'Chef Marcus Pierre',
                    role: 'Head Chef',
                    email: 'marcus@restaurant.com',
                    phone: '+91 98888 77777',
                    attendance: 'Present',
                    salary: 120000
                  })
                },
                {
                  id: 202,
                  projectId,
                  dataType: 'staff',
                  dataJson: JSON.stringify({
                    name: 'Clara Dupont',
                    role: 'Sommelier',
                    email: 'clara@restaurant.com',
                    phone: '+91 98888 66666',
                    attendance: 'Present',
                    salary: 85000
                  })
                }
              ];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'delivery_partner') {
              localList = [{
                id: 301,
                projectId,
                dataType: 'delivery_partner',
                dataJson: JSON.stringify({
                  name: 'Rohan Sharma',
                  phone: '+91 97777 55555',
                  vehicle: 'Scooter',
                  status: 'Available',
                  earnings: 1250,
                  performance: 'Outstanding'
                })
              }];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'review') {
              localList = [{
                id: 401,
                projectId,
                dataType: 'review',
                dataJson: JSON.stringify({
                  author: 'Lady Penelope',
                  rating: 5,
                  comment: 'The truffle pasta was absolutely divine! Superb service and exceptional wine recommendations by Clara.',
                  reply: 'Thank you, Lady Penelope! It was an absolute pleasure hosting you.',
                  status: 'Visible'
                })
              }];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'inventory_item') {
              localList = [
                {
                  id: 501,
                  projectId,
                  dataType: 'inventory_item',
                  dataJson: JSON.stringify({
                    ingredientName: 'Truffle Oil',
                    stockLevel: 15,
                    unit: 'Bottles',
                    lowStockAlert: 5,
                    vendor: 'Premium Truffles Ltd'
                  })
                },
                {
                  id: 502,
                  projectId,
                  dataType: 'inventory_item',
                  dataJson: JSON.stringify({
                    ingredientName: 'Aged Parmesan',
                    stockLevel: 4,
                    unit: 'Kg',
                    lowStockAlert: 5,
                    vendor: 'Milano Dairy Co'
                  })
                }
              ];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'vendor') {
              localList = [
                {
                  id: 601,
                  projectId,
                  dataType: 'vendor',
                  dataJson: JSON.stringify({
                    name: 'Premium Truffles Ltd',
                    contact: 'Giovanni R.',
                    phone: '+39 02 123456',
                    email: 'orders@premiumtruffles.it'
                  })
                },
                {
                  id: 602,
                  projectId,
                  dataType: 'vendor',
                  dataJson: JSON.stringify({
                    name: 'Milano Dairy Co',
                    contact: 'Lucia M.',
                    phone: '+91 96666 44444',
                    email: 'sales@milanodairy.com'
                  })
                }
              ];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'offer') {
              localList = [{
                id: 701,
                projectId,
                dataType: 'offer',
                dataJson: JSON.stringify({
                  title: 'Haute Happy Hour',
                  type: 'Happy Hour Offers',
                  details: '25% discount on all premium vintage wines by the glass.',
                  schedule: 'Mon-Thu, 4 PM - 7 PM',
                  active: true
                })
              }];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'event_booking') {
              localList = [{
                id: 801,
                projectId,
                dataType: 'event_booking',
                dataJson: JSON.stringify({
                  eventName: 'Royal Wine Pairing Gala',
                  customerName: 'Lord Grantham',
                  customerEmail: 'grantham@downton.com',
                  tickets: 2,
                  totalPaid: 5000,
                  status: 'Approved'
                })
              }];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            } else if (dataType === 'wallet_transaction') {
              localList = [{
                id: 901,
                projectId,
                dataType: 'wallet_transaction',
                dataJson: JSON.stringify({
                  customerEmail: 'demo@zatbiz.com',
                  amount: 500,
                  type: 'Credit',
                  description: 'Loyalty reward refund',
                  date: '2026-06-23'
                })
              }];
              localStorage.setItem(storageKey, JSON.stringify(localList));
            }
          }
        }

        if (method === 'GET') {
          return localList as unknown as T;
        }

        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const newItem = {
            id: Date.now(),
            projectId,
            dataType,
            dataJson: bodyData.dataJson || '{}',
            createdAt: new Date().toISOString()
          };
          localList.push(newItem);
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(localList));
          }
          return newItem as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/restaurant-data\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = localList.findIndex(item => String(item.id) === String(id));
          if (idx !== -1) {
            localList[idx] = {
              ...localList[idx],
              dataJson: bodyData.dataJson !== undefined ? bodyData.dataJson : localList[idx].dataJson,
              dataType: bodyData.dataType !== undefined ? bodyData.dataType : localList[idx].dataType
            };
            if (typeof window !== 'undefined') {
              localStorage.setItem(storageKey, JSON.stringify(localList));
            }
            return localList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/restaurant-data\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = localList.filter(item => String(item.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      // OFFLINE MEDICAL SHOP API FALLBACK MOCKS
      if (path.startsWith('/medical-shop/info')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const storageKey = `zatbiz_offline_medical_shop_${projectId}`;

        if (method === 'GET') {
          if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
              try { return JSON.parse(stored) as unknown as T; } catch {}
            }
          }
          return {
            projectId,
            subcategory: 'Pharmacy & Wellness',
            companyName: 'MedShop Rx',
            businessName: 'MedShop',
            companyDescription: 'Your trusted local wellness partner offering genuine medicines and rapid delivery.',
            ownerName: 'Dr. Jane Doe (R.Ph.)',
            mobileNo: '+91 98765 43210',
            email: 'contact@medshop.com',
            city: 'Noida',
            state: 'UP',
            country: 'India',
            pincode: '201301',
            logoUrl: '',
            themeColor: '#10b981',
            selectedTheme: 'emerald-cure',
            selectedHomepageLayout: 'search-centric',
            selectedLoginLayout: 'left-vector',
            selectedDashboardLayout: 'metric-console'
          } as unknown as T;
        }

        if (method === 'PUT' || method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          bodyData.projectId = projectId;
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(bodyData));
          }
          return bodyData as unknown as T;
        }
      }

      if (path.startsWith('/medical-shop/products')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const storageKey = `zatbiz_offline_medical_shop_products_${projectId}`;
        
        let localList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            try { localList = JSON.parse(stored); } catch {}
          }
        }

        if (method === 'GET') {
          if (localList.length === 0) {
            // Seed default products
            localList = [
              { id: 1, projectId, name: 'Paracetamol 650mg', brand: 'Calpol', genericName: 'Paracetamol', category: 'Medicines', description: 'Effective pain reliever and fever reducer used to treat headaches, muscle aches, arthritis, backache, toothaches, and colds.', uses: 'Fever, mild to moderate body pain, headache, dental pain.', dosage: 'Take 1 tablet every 4-6 hours as needed. Maximum 4g (6 tablets) per 24 hours.', ingredients: 'Paracetamol 650mg, Excipients q.s.', sideEffects: 'Nausea, allergic skin rashes, liver toxicity (only in extreme overdose).', warnings: 'Do not consume with alcohol. Do not exceed the recommended dosage to avoid liver damage.', storageInstructions: 'Store below 30°C in a dry place. Keep away from direct sunlight and children.', expiryInformation: 'Expiry: Dec 2028', price: 29.50, discount: 10, stockStatus: 'In Stock', stockCount: 120, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80', prescriptionRequired: false },
              { id: 2, projectId, name: 'Cetirizine 10mg', brand: 'Alerid', genericName: 'Cetirizine Hydrochloride', category: 'Medicines', description: 'An antihistamine that reduces the natural chemical histamine in the body. Antihistamines can produce symptoms of sneezing, itching, watery eyes, and runny nose.', uses: 'Allergic rhinitis, hay fever, hives, skin itching, sneezing.', dosage: '1 tablet daily at bedtime. May cause mild drowsiness.', ingredients: 'Cetirizine HCl 10mg, Lactose, Maize starch.', sideEffects: 'Drowsiness, dry mouth, tiredness, headache.', warnings: 'Avoid driving or operating heavy machinery after consumption.', storageInstructions: 'Store in a cool, dry place. Keep out of reach of children.', expiryInformation: 'Expiry: Mar 2027', price: 18.00, discount: 5, stockStatus: 'In Stock', stockCount: 250, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&auto=format&fit=crop&q=80', prescriptionRequired: false },
              { id: 3, projectId, name: 'Amlodipine 5mg', brand: 'Amlopin', genericName: 'Amlodipine Besylate', category: 'Medicines', description: 'Calcium channel blocker that dilates blood vessels to improve blood flow, widely prescribed for hypertension and chest pain (angina).', uses: 'High blood pressure, chronic stable angina, coronary artery disease.', dosage: '1 tablet daily in the morning, or as directed by a cardiologist.', ingredients: 'Amlodipine Besylate 5mg, Microcrystalline cellulose.', sideEffects: 'Swelling of ankles or feet, dizziness, headache, fatigue.', warnings: 'Regular blood pressure monitoring is required. Do not stop taking abruptly.', storageInstructions: 'Store in a cool dry place below 25°C. Protect from moisture.', expiryInformation: 'Expiry: Sep 2027', price: 45.00, discount: 15, stockStatus: 'In Stock', stockCount: 90, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80', prescriptionRequired: true },
              { id: 4, projectId, name: 'Digital BP Monitor', brand: 'Omron', genericName: 'N/A - Medical Device', category: 'Medical Devices', description: 'Fully automatic blood pressure monitor operating on the oscillometric principle for precise measurements. Easy one-touch operation with hypertension indicator.', uses: 'Monitoring systolic/diastolic blood pressure and pulse rate at home.', dosage: 'Wrap cuff around upper left arm, keep arm level with heart, press Start.', ingredients: 'High precision pressure sensor, digital LCD monitor, medium cuff (22-32 cm).', sideEffects: 'None.', warnings: 'Avoid eating, smoking, or exercising 30 minutes before taking readings.', storageInstructions: 'Store in its protective pouch. Avoid dropping or exposing to extreme heat.', expiryInformation: 'Warranty: 3 Years', price: 1999.00, discount: 20, stockStatus: 'In Stock', stockCount: 15, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80', prescriptionRequired: false },
              { id: 5, projectId, name: 'Compressor Nebulizer', brand: 'Philips Respironics', genericName: 'N/A - Medical Device', category: 'Medical Devices', description: 'Delivers aerosol medication therapy effectively for asthma, COPD, allergies, and other respiratory disorders.', uses: 'Inhalation therapy for lung and airway congestion.', dosage: 'Connect medicine cup, fill with liquid medication, turn on air compressor, inhale mist.', ingredients: 'Compressor pump, nebulizer cup, adult mask, child mask, tubing.', sideEffects: 'None.', warnings: 'Clean the medicine cup and mask thoroughly after each use to prevent bacterial growth.', storageInstructions: 'Store in a dust-free bag. Keep away from water sources.', expiryInformation: 'Warranty: 1 Year', price: 2499.00, discount: 25, stockStatus: 'In Stock', stockCount: 8, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80', prescriptionRequired: false }
            ];
            if (typeof window !== 'undefined') {
              localStorage.setItem(storageKey, JSON.stringify(localList));
            }
          }
          return localList as unknown as T;
        }

        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          bodyData.id = Date.now();
          bodyData.projectId = projectId;
          localList.push(bodyData);
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(localList));
          }
          return bodyData as unknown as T;
        }

        if (method === 'PUT') {
          const idMatch = path.match(/\/products\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const idx = localList.findIndex(item => String(item.id) === String(id));
          if (idx !== -1) {
            localList[idx] = { ...localList[idx], ...bodyData };
            if (typeof window !== 'undefined') {
              localStorage.setItem(storageKey, JSON.stringify(localList));
            }
            return localList[idx] as unknown as T;
          }
          return bodyData as unknown as T;
        }

        if (method === 'DELETE') {
          const idMatch = path.match(/\/products\/(\d+)/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const filtered = localList.filter(item => String(item.id) !== String(id));
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(filtered));
          }
          return { success: true } as unknown as T;
        }
      }

      if (path.startsWith('/medical-shop/orders')) {
        const projectIdMatch = path.match(/[?&]projectId=(\d+)/);
        const projectId = projectIdMatch ? parseInt(projectIdMatch[1], 10) : 1;
        const storageKey = `zatbiz_offline_medical_shop_orders_${projectId}`;
        
        let localList: any[] = [];
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            try { localList = JSON.parse(stored); } catch {}
          }
        }

        if (method === 'GET') {
          const customerEmailMatch = path.match(/[?&]email=([^&]+)/);
          if (customerEmailMatch) {
            const email = decodeURIComponent(customerEmailMatch[1]).toLowerCase();
            const filtered = localList.filter(o => o.customerEmail && o.customerEmail.toLowerCase() === email);
            return filtered as unknown as T;
          }
          
          if (localList.length === 0) {
            localList = [
              {
                id: 101,
                projectId,
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                customerPhone: '+91 98765 43210',
                shippingAddress: 'Flat 402, Sunshine Residency, Noida Sector 62',
                deliverySlot: '04:00 PM - 08:00 PM (Evening)',
                paymentMethod: 'Cash on Delivery',
                prescriptionUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80',
                doctorNotes: 'Please deliver metformins quickly. Take twice daily.',
                pharmacistVerified: true,
                status: 'Delivered',
                itemsJson: JSON.stringify([
                  { id: 1, name: 'Paracetamol 650mg', price: 29.5, quantity: 2, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80' },
                  { id: 3, name: 'Amlodipine 5mg', price: 45, quantity: 1, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80' }
                ]),
                subtotal: 104.0,
                deliveryCharges: 40.0,
                total: 144.0,
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
              },
              {
                id: 102,
                projectId,
                customerName: 'Mary Smith',
                customerEmail: 'mary@example.com',
                customerPhone: '+91 99999 77777',
                shippingAddress: 'Villa 14, Lotus Meadows, Noida Sector 137',
                deliverySlot: '08:00 AM - 12:00 PM (Morning)',
                paymentMethod: 'UPI',
                prescriptionUrl: '',
                doctorNotes: 'Digital BP monitor order.',
                pharmacistVerified: false,
                status: 'Order Placed',
                itemsJson: JSON.stringify([
                  { id: 4, name: 'Digital BP Monitor', price: 1999, quantity: 1, image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80' }
                ]),
                subtotal: 1999.0,
                deliveryCharges: 0.0,
                total: 1999.0,
                createdAt: new Date().toISOString()
              }
            ];
            if (typeof window !== 'undefined') {
              localStorage.setItem(storageKey, JSON.stringify(localList));
            }
          }
          return localList as unknown as T;
        }

        if (method === 'POST') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          bodyData.id = Date.now();
          bodyData.projectId = projectId;
          bodyData.createdAt = new Date().toISOString();
          bodyData.status = 'Order Placed';
          bodyData.pharmacistVerified = false;
          localList.unshift(bodyData);
          if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(localList));
          }
          return bodyData as unknown as T;
        }

        if (method === 'PUT') {
          const bodyData = options?.body ? JSON.parse(options.body as string) : {};
          const isStatusUpdate = path.endsWith('/status');
          const isVerifyUpdate = path.includes('/verify');
          
          if (isStatusUpdate) {
            const idMatch = path.match(/\/orders\/(\d+)\/status/);
            const id = idMatch ? parseInt(idMatch[1], 10) : null;
            const idx = localList.findIndex(o => String(o.id) === String(id));
            if (idx !== -1) {
              localList[idx].status = bodyData.status;
              if (['Prescription Verified', 'Packed', 'Shipped'].includes(bodyData.status)) {
                localList[idx].pharmacistVerified = true;
              }
              if (typeof window !== 'undefined') {
                localStorage.setItem(storageKey, JSON.stringify(localList));
              }
              return localList[idx] as unknown as T;
            }
          } else if (isVerifyUpdate) {
            const idMatch = path.match(/\/orders\/(\d+)\/verify/);
            const id = idMatch ? parseInt(idMatch[1], 10) : null;
            const verifiedMatch = path.match(/[?&]verified=([^&]+)/);
            const verified = verifiedMatch ? verifiedMatch[1] === 'true' : false;
            
            const idx = localList.findIndex(o => String(o.id) === String(id));
            if (idx !== -1) {
              localList[idx].pharmacistVerified = verified;
              localList[idx].status = verified ? 'Prescription Verified' : 'Prescription Rejected';
              if (typeof window !== 'undefined') {
                localStorage.setItem(storageKey, JSON.stringify(localList));
              }
              return localList[idx] as unknown as T;
            }
          }
        }
      }

      // Default empty list fallback for lists
      if (path.includes('?') || path.endsWith('s')) {
        return [] as unknown as T;
      }

      // Default empty object fallback for single objects
      return {} as T;
    }

    // Rethrow if it wasn't a network fetch error
    throw err;
  }
}
