export interface Block {
  id: string;
  type: string;
  theme: string;
  content: any;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  blocksJson: string;
  status: string;
  updatedAt?: string;
}

export interface Product {
  id?: number;
  projectId: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  variants?: string;
  available?: boolean;
  brand?: string;
  color?: string;
  rating?: number;
  discount?: number;
}

export interface Toast {
  id: number;
  text: string;
  isError?: boolean;
}

export interface Order {
  id?: number;
  projectId: number;
  customerId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  itemsJson: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  paymentGateway: string;
  paymentStatus: string;
  invoiceNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  city?: string;
  state?: string;
  pincode?: string;
  paymentMethod?: string;
}

export interface Customer {
  id?: number;
  projectId: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  status: string;
  totalSpent: number;
  totalOrders: number;
  createdAt?: string;
  updatedAt?: string;
}
