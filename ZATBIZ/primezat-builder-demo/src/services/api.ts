import { Project, Product, Order, Customer } from '@/types';
import { request, getRandomFoodImage } from './api/fallbackHandler';

export { getRandomFoodImage };

export const api = {
  // Projects API
  projects: {
    list: () => request<Project[]>('/projects'),
    get: (id: number) => request<Project>(`/projects/${id}`),
    create: (project: Omit<Project, 'id'>) =>
      request<Project>('/projects', {
        method: 'POST',
        body: JSON.stringify(project),
      }),
    update: (id: number, project: Project) =>
      request<Project>(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/projects/${id}`, {
        method: 'DELETE',
      }),
  },

  // Products API
  products: {
    list: (projectId: number) => request<Product[]>(`/products?projectId=${projectId}`),
    create: (product: Omit<Product, 'id'>) =>
      request<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(product),
      }),
    update: (id: number, product: Product) =>
      request<Product>(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/products/${id}`, {
        method: 'DELETE',
      }),
  },

  // Customers API
  customers: {
    register: (data: any) =>
      request<{ id: number; name: string; email: string; phone?: string; address?: string; projectId: number }>('/customers/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    login: (data: any) =>
      request<{ id: number; name: string; email: string; phone?: string; address?: string; projectId: number }>('/customers/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    list: (projectId: number) => request<Customer[]>(`/customers?projectId=${projectId}`),
    create: (customer: Customer) =>
      request<Customer>('/customers', {
        method: 'POST',
        body: JSON.stringify(customer),
      }),
    update: (id: number, customer: Partial<Customer>) =>
      request<Customer>(`/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(customer),
      }),
  },

  // Orders API
  orders: {
    place: (data: any) =>
      request<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    list: (projectId: number) => request<Order[]>(`/orders?projectId=${projectId}`),
    listForCustomer: (projectId: number, customerId: number) =>
      request<Order[]>(`/orders/customer?projectId=${projectId}&customerId=${customerId}`),
    updateStatus: (id: number, status: string) =>
      request<Order>(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
  },

  // Reservations API
  reservations: {
    list: (projectId: number) => request<any[]>(`/reservations?projectId=${projectId}`),
    listByCustomer: (projectId: number, email: string) => 
      request<any[]>(`/reservations/customer?projectId=${projectId}&email=${encodeURIComponent(email)}`),
    create: (data: any) =>
      request<any>('/reservations', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateStatus: (id: number, status: string) =>
      request<any>(`/reservations/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
    update: (id: number, data: any) =>
      request<any>(`/reservations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/reservations/${id}`, {
        method: 'DELETE',
      }),
  },

  // Coupons API
  coupons: {
    list: (projectId: number) => request<any[]>(`/coupons?projectId=${projectId}`),
    create: (coupon: any) =>
      request<any>('/coupons', {
        method: 'POST',
        body: JSON.stringify(coupon),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/coupons/${id}`, {
        method: 'DELETE',
      }),
    toggle: (id: number) =>
      request<any>(`/coupons/${id}/toggle`, {
        method: 'PUT',
      }),
  },

  // Settings API
  settings: {
    get: (projectId: number) => request<any>(`/settings?projectId=${projectId}`),
    update: (projectId: number, settings: any) =>
      request<any>(`/settings?projectId=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),
  },

  // Categories API
  categories: {
    list: (projectId: number) => request<any[]>(`/categories?projectId=${projectId}`),
    create: (category: any) =>
      request<any>('/categories', {
        method: 'POST',
        body: JSON.stringify(category),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/categories/${id}`, {
        method: 'DELETE',
      }),
  },

  // Brands API
  brands: {
    list: (projectId: number) => request<any[]>(`/brands?projectId=${projectId}`),
    create: (brand: any) =>
      request<any>('/brands', {
        method: 'POST',
        body: JSON.stringify(brand),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/brands/${id}`, {
        method: 'DELETE',
      }),
  },

  // Real Estate API
  realEstate: {
    get: (projectId: number) => request<any>(`/realestate?projectId=${projectId}`),
    update: (projectId: number, data: any) =>
      request<any>(`/realestate?projectId=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    brokers: {
      list: (projectId: number) => request<any[]>(`/realestate/brokers?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/realestate/brokers', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/realestate/brokers/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<{ success: boolean }>(`/realestate/brokers/${id}`, {
          method: 'DELETE',
        }),
    },
    leads: {
      list: (projectId: number) => request<any[]>(`/realestate/leads?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/realestate/leads', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/realestate/leads/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<{ success: boolean }>(`/realestate/leads/${id}`, {
          method: 'DELETE',
        }),
    },
    visits: {
      list: (projectId: number) => request<any[]>(`/realestate/visits?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/realestate/visits', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/realestate/visits/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<{ success: boolean }>(`/realestate/visits/${id}`, {
          method: 'DELETE',
        }),
    },
    sales: {
      list: (projectId: number) => request<any[]>(`/realestate/sales?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/realestate/sales', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/realestate/sales/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<{ success: boolean }>(`/realestate/sales/${id}`, {
          method: 'DELETE',
        }),
    },
    payments: {
      list: (projectId: number) => request<any[]>(`/realestate/payments?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/realestate/payments', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/realestate/payments/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<{ success: boolean }>(`/realestate/payments/${id}`, {
          method: 'DELETE',
        }),
    },
    invoices: {
      list: (projectId: number) => request<any[]>(`/realestate/invoices?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/realestate/invoices', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/realestate/invoices/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<{ success: boolean }>(`/realestate/invoices/${id}`, {
          method: 'DELETE',
        }),
    },
  },

  // Restaurant Custom Data API
  restaurantData: {
    list: (projectId: number, dataType: string) =>
      request<any[]>(`/restaurant-data?projectId=${projectId}&dataType=${dataType}`),
    create: (data: { projectId: number; dataType: string; dataJson: string }) =>
      request<any>('/restaurant-data', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: { dataType?: string; dataJson?: string }) =>
      request<any>(`/restaurant-data/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/restaurant-data/${id}`, {
        method: 'DELETE',
      }),
  },

  // Hospital API
  hospital: {
    get: (projectId: number) => request<any>(`/hospital?projectId=${projectId}`),
    create: (projectId: number, data: any) =>
      request<any>(`/hospital?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (projectId: number, data: any) =>
      request<any>(`/hospital?projectId=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Gym API
  gym: {
    get: (projectId: number) => request<any>(`/gym?projectId=${projectId}`),
    create: (projectId: number, data: any) =>
      request<any>(`/gym?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (projectId: number, data: any) =>
      request<any>(`/gym?projectId=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
  gymManagement: {
    members: {
      list: (projectId: number) => request<any[]>(`/gym-management/members?projectId=${projectId}`),
      getProfile: (projectId: number, email: string) => request<any>(`/gym-management/members/profile?projectId=${projectId}&email=${email}`),
      save: (data: any) => request<any>('/gym-management/members', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/gym-management/members/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<any>(`/gym-management/members/${id}`, { method: 'DELETE' }),
    },
    trainers: {
      list: (projectId: number) => request<any[]>(`/gym-management/trainers?projectId=${projectId}`),
      save: (data: any) => request<any>('/gym-management/trainers', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/gym-management/trainers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<any>(`/gym-management/trainers/${id}`, { method: 'DELETE' }),
    },
    classes: {
      list: (projectId: number) => request<any[]>(`/gym-management/classes?projectId=${projectId}`),
      save: (data: any) => request<any>('/gym-management/classes', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/gym-management/classes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<any>(`/gym-management/classes/${id}`, { method: 'DELETE' }),
    },
    bookings: {
      list: (projectId: number) => request<any[]>(`/gym-management/bookings?projectId=${projectId}`),
      listMember: (projectId: number, email: string) => request<any[]>(`/gym-management/bookings/member?projectId=${projectId}&email=${email}`),
      create: (data: any) => request<any>('/gym-management/bookings', { method: 'POST', body: JSON.stringify(data) }),
      cancel: (id: number) => request<any>(`/gym-management/bookings/${id}/cancel`, { method: 'PUT' }),
    },
    attendance: {
      list: (projectId: number) => request<any[]>(`/gym-management/attendance?projectId=${projectId}`),
      listMember: (projectId: number, email: string) => request<any[]>(`/gym-management/attendance/member?projectId=${projectId}&email=${email}`),
      save: (data: any) => request<any>('/gym-management/attendance', { method: 'POST', body: JSON.stringify(data) }),
    },
    workouts: {
      list: (projectId: number) => request<any[]>(`/gym-management/workouts?projectId=${projectId}`),
      listMember: (projectId: number, email: string) => request<any[]>(`/gym-management/workouts/member?projectId=${projectId}&email=${email}`),
      save: (data: any) => request<any>('/gym-management/workouts', { method: 'POST', body: JSON.stringify(data) }),
    },
    diets: {
      list: (projectId: number) => request<any[]>(`/gym-management/diets?projectId=${projectId}`),
      getMember: (projectId: number, email: string) => request<any>(`/gym-management/diets/member?projectId=${projectId}&email=${email}`),
      save: (data: any) => request<any>('/gym-management/diets', { method: 'POST', body: JSON.stringify(data) }),
    },
    payments: {
      list: (projectId: number) => request<any[]>(`/gym-management/payments?projectId=${projectId}`),
      listMember: (projectId: number, email: string) => request<any[]>(`/gym-management/payments/member?projectId=${projectId}&email=${email}`),
      save: (data: any) => request<any>('/gym-management/payments', { method: 'POST', body: JSON.stringify(data) }),
    },
    expenses: {
      list: (projectId: number) => request<any[]>(`/gym-management/expenses?projectId=${projectId}`),
      save: (data: any) => request<any>('/gym-management/expenses', { method: 'POST', body: JSON.stringify(data) }),
      delete: (id: number) => request<any>(`/gym-management/expenses/${id}`, { method: 'DELETE' }),
    },
    equipment: {
      list: (projectId: number) => request<any[]>(`/gym-management/equipment?projectId=${projectId}`),
      save: (data: any) => request<any>('/gym-management/equipment', { method: 'POST', body: JSON.stringify(data) }),
      delete: (id: number) => request<any>(`/gym-management/equipment/${id}`, { method: 'DELETE' }),
    },
    offers: {
      list: (projectId: number) => request<any[]>(`/gym-management/offers?projectId=${projectId}`),
      save: (data: any) => request<any>('/gym-management/offers', { method: 'POST', body: JSON.stringify(data) }),
      delete: (id: number) => request<any>(`/gym-management/offers/${id}`, { method: 'DELETE' }),
    },
  },

  // Medical Shop API
  medicalShop: {
    get: (projectId: number) => request<any>(`/medical-shop/info?projectId=${projectId}`),
    create: (projectId: number, data: any) =>
      request<any>(`/medical-shop/info?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (projectId: number, data: any) =>
      request<any>(`/medical-shop/info?projectId=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    products: {
      list: (projectId: number) => request<any[]>(`/medical-shop/products?projectId=${projectId}`),
      create: (data: any) =>
        request<any>('/medical-shop/products', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: number, data: any) =>
        request<any>(`/medical-shop/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<any>(`/medical-shop/products/${id}`, {
          method: 'DELETE',
        }),
    },
    orders: {
      list: (projectId: number) => request<any[]>(`/medical-shop/orders?projectId=${projectId}`),
      listForCustomer: (projectId: number, email: string) =>
        request<any[]>(`/medical-shop/orders/customer?projectId=${projectId}&email=${encodeURIComponent(email)}`),
      place: (data: any) =>
        request<any>('/medical-shop/orders', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      updateStatus: (id: number, status: string) =>
        request<any>(`/medical-shop/orders/${id}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status }),
        }),
      verifyPrescription: (id: number, verified: boolean) =>
        request<any>(`/medical-shop/orders/${id}/verify?verified=${verified}`, {
          method: 'PUT',
        }),
    },
  },

  // Restaurant API
  restaurant: {
    get: (projectId: number) => request<any>(`/restaurant?projectId=${projectId}`),
    create: (projectId: number, data: any) =>
      request<any>(`/restaurant?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (projectId: number, data: any) =>
      request<any>(`/restaurant?projectId=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    users: {
      list: (projectId: number) => request<any[]>(`/restaurant/users?projectId=${projectId}`),
      register: (data: any) =>
        request<any>('/restaurant/users/register', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      login: (data: any) =>
        request<any>('/restaurant/users/login', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
    },
  },

  // Event & Wedding Planner API
  event: {
    getAgencyInfo: (projectId: number) => request<any>(`/event/agency-info?projectId=${projectId}`),
    saveAgencyInfo: (projectId: number, data: any) =>
      request<any>(`/event/agency-info?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getWebsiteSettings: (projectId: number) => request<any>(`/event/website-settings?projectId=${projectId}`),
    saveWebsiteSettings: (projectId: number, data: any) =>
      request<any>(`/event/website-settings?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getSeoSettings: (projectId: number) => request<any>(`/event/seo-settings?projectId=${projectId}`),
    saveSeoSettings: (projectId: number, data: any) =>
      request<any>(`/event/seo-settings?projectId=${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    bookings: {
      list: (projectId: number) => request<any[]>(`/event/bookings?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/bookings', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/bookings/${id}`, { method: 'DELETE' }),
    },
    calendarEvents: {
      list: (projectId: number) => request<any[]>(`/event/calendar-events?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/calendar-events', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/calendar-events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/calendar-events/${id}`, { method: 'DELETE' }),
    },
    invoices: {
      list: (projectId: number) => request<any[]>(`/event/invoices?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/invoices', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/invoices/${id}`, { method: 'DELETE' }),
    },
    payments: {
      list: (projectId: number) => request<any[]>(`/event/payments?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/payments', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/payments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/payments/${id}`, { method: 'DELETE' }),
    },
    expenses: {
      list: (projectId: number) => request<any[]>(`/event/expenses?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/expenses', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/expenses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/expenses/${id}`, { method: 'DELETE' }),
    },
    vendors: {
      list: (projectId: number) => request<any[]>(`/event/vendors?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/vendors', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/vendors/${id}`, { method: 'DELETE' }),
    },
    teamMembers: {
      list: (projectId: number) => request<any[]>(`/event/team-members?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/team-members', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/team-members/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/team-members/${id}`, { method: 'DELETE' }),
    },
    customers: {
      list: (projectId: number) => request<any[]>(`/event/customers?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/customers', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/customers/${id}`, { method: 'DELETE' }),
    },
    quotations: {
      list: (projectId: number) => request<any[]>(`/event/quotations?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/quotations', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/quotations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/quotations/${id}`, { method: 'DELETE' }),
    },
    testimonials: {
      list: (projectId: number) => request<any[]>(`/event/testimonials?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/testimonials', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/testimonials/${id}`, { method: 'DELETE' }),
    },
    blogs: {
      list: (projectId: number) => request<any[]>(`/event/blogs?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/blogs', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/blogs/${id}`, { method: 'DELETE' }),
    },
    faqs: {
      list: (projectId: number) => request<any[]>(`/event/faqs?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/faqs', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/faqs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/faqs/${id}`, { method: 'DELETE' }),
    },
    contacts: {
      list: (projectId: number) => request<any[]>(`/event/contacts?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/contacts', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/contacts/${id}`, { method: 'DELETE' }),
    },
    leads: {
      list: (projectId: number) => request<any[]>(`/event/leads?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/leads', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/leads/${id}`, { method: 'DELETE' }),
    },
    coupons: {
      list: (projectId: number) => request<any[]>(`/event/coupons?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/coupons', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/coupons/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/coupons/${id}`, { method: 'DELETE' }),
    },
    notifications: {
      list: (projectId: number) => request<any[]>(`/event/notifications?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/notifications', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/notifications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/notifications/${id}`, { method: 'DELETE' }),
    },
    supportTickets: {
      list: (projectId: number) => request<any[]>(`/event/support-tickets?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/support-tickets', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/support-tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/support-tickets/${id}`, { method: 'DELETE' }),
    },
    reviews: {
      list: (projectId: number) => request<any[]>(`/event/reviews?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/reviews', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/reviews/${id}`, { method: 'DELETE' }),
    },
    checklistItems: {
      list: (projectId: number) => request<any[]>(`/event/checklist-items?projectId=${projectId}`),
      create: (data: any) => request<any>('/event/checklist-items', { method: 'POST', body: JSON.stringify(data) }),
      update: (id: number, data: any) => request<any>(`/event/checklist-items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id: number) => request<{ success: boolean }>(`/event/checklist-items/${id}`, { method: 'DELETE' }),
    },
  },

  // AI API
  ai: {
    chat: (message: string, context: 'dashboard' | 'builder', activeBlockType?: string | null) =>
      request<{ answer: string; action?: string; actionPayload?: any }>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message, context, activeBlockType }),
      }),
  },
};

