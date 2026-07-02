'use client';

import { useEffect, useState, use, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api } from '@/services/api';
import { Project, Block, Product, Order } from '@/types';
import BlockMarkup from '@/components/preview/BlockMarkup';
import FashionStorefront from '@/components/preview/FashionStorefront';
import RestaurantStorefront from '@/components/preview/restaurant/RestaurantStorefront';
import WeddingStorefront from '@/components/preview/wedding/WeddingStorefront';

import RestaurantLanding from '@/components/preview/templates/restaurant/Landing';
import HospitalLanding from '@/components/preview/templates/hospital/Landing';
import SchoolLanding from '@/components/preview/templates/school/Landing';
import GymLanding from '@/components/preview/templates/gym/Landing';
import WeddingLanding from '@/components/preview/templates/wedding/Landing';
import RealEstateLanding from '@/components/preview/templates/realestate/Landing';
import MedicalShopLanding from '@/components/preview/templates/medical-shop/Landing';
import StorefrontLanding from '@/components/preview/templates/storefront/Landing';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface Toast {
  id: number;
  text: string;
  isError?: boolean;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'White', hex: '#FFFFFF' },
];

function PreviewPageContent({ params }: PageProps) {
  const { id: projectIdStr } = use(params);
  const projectId = parseInt(projectIdStr, 10);

  // Core Data States
  const [project, setProject] = useState<Project | null>(null);
  const [pages, setPages] = useState<Record<string, Block[]>>({ home: [] });
  const [activePages, setActivePages] = useState<string[]>(['home']);
  const [projectConfig, setProjectConfig] = useState<any>({});
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRealEstate, setIsRealEstate] = useState(false);
  const [realEstateInfo, setRealEstateInfo] = useState<any>(null);
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);
  const [gymInfo, setGymInfo] = useState<any>(null);

  // Query parameter page switching
  const searchParams = useSearchParams();
  const currentPageName = searchParams.get('page') || 'home';
  const currentPageBlocks = pages[currentPageName] || pages['home'] || [];

  // E-commerce View Routing State
  const [activeView, setActiveView] = useState<'landing' | 'cart' | 'checkout' | 'payment' | 'success' | 'orders'>('landing');

  // Customer Shopping States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // PDP custom selections
  const [pdpSize, setPdpSize] = useState('M');
  const [pdpColor, setPdpColor] = useState('Black');

  // Checkout and Order Placement
  const [customerSession, setCustomerSession] = useState<{ id: number; name: string; email: string } | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [selectedPayment, setSelectedPayment] = useState<'UPI' | 'Credit Card' | 'Debit Card' | 'COD' | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilterTab, setOrderFilterTab] = useState<'pending' | 'delivered' | 'cancelled' | 'returned'>('pending');

  // Storefront Table Booking States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [resFormName, setResFormName] = useState('');
  const [resFormEmail, setResFormEmail] = useState('');
  const [resFormPhone, setResFormPhone] = useState('');
  const [resFormDate, setResFormDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [resFormTime, setResFormTime] = useState('18:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormNotes, setResFormNotes] = useState('');

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.10 for 10%
  const [couponError, setCouponError] = useState('');
  const [dbCoupons, setDbCoupons] = useState<any[]>([]);
  const [appliedDiscountValue, setAppliedDiscountValue] = useState(0);
  const [appliedDiscountType, setAppliedDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');

  // Real estate inquiry form states
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [inquiryFormName, setInquiryFormName] = useState('');
  const [inquiryFormMobile, setInquiryFormMobile] = useState('');
  const [inquiryFormEmail, setInquiryFormEmail] = useState('');
  const [inquiryFormBudget, setInquiryFormBudget] = useState('');
  const [inquiryFormMessage, setInquiryFormMessage] = useState('');

  // Toasts Notification
  const [toasts, setToasts] = useState<Toast[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('clientEmail');
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientPhone');
    localStorage.removeItem('clientAddress');
    setCustomerSession(null);
    window.location.reload();
  };

  // Add notification toast
  const addToast = (text: string, isError = false) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, isError }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    if (isNaN(projectId)) return;
    setLoading(true);

    // Fetch real estate
    api.realEstate.get(projectId)
      .then((reData) => {
        if (reData && reData.projectId) {
          setIsRealEstate(true);
          setRealEstateInfo(reData);
        }
      })
      .catch((e) => console.log('Not real estate or offline:', e));

    // Fetch restaurant details
    api.restaurant.get(projectId)
      .then((restData) => {
        if (restData && restData.projectId) {
          setRestaurantInfo(restData);
        }
      })
      .catch((e) => console.log('Not restaurant or offline:', e));

    // Fetch gym details
    api.gym.get(projectId)
      .then((gymData) => {
        if (gymData && gymData.projectId) {
          setGymInfo(gymData);
        }
      })
      .catch((e) => console.log('Not gym or offline:', e));

    // Fetch project config
    api.projects
      .get(projectId)
      .then((data) => {
        setProject(data);
        try {
          const parsed = JSON.parse(data.blocksJson);
          let newPages: Record<string, Block[]> = { home: [] };
          let activePagesList: string[] = ['home'];
          let config: any = {};

          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            if (parsed.pages) {
              newPages = parsed.pages;
              activePagesList = parsed.activePages || Object.keys(parsed.pages);
              config = parsed.businessConfig || {};
            } else {
              newPages = { home: [] };
            }
          } else if (Array.isArray(parsed)) {
            // Self-heal: flat block array
            newPages = { home: parsed };
            activePagesList = ['home'];
            const bizBlock = parsed.find((b: any) => b.type === 'business_config');
            config = {
              ...(bizBlock?.content || {}),
              themePreset: bizBlock?.theme || 'slate'
            };
          }

          // Self-heal: search all pages for business_config if missing in root config
          if ((!config.shopNiche || !config.businessType) && newPages) {
            for (const pageName of Object.keys(newPages)) {
              const bizBlock = newPages[pageName]?.find((b: any) => b.type === 'business_config');
              if (bizBlock?.content) {
                config = {
                  ...config,
                  ...bizBlock.content,
                };
                break;
              }
            }
          }

          // Self-heal: filter out duplicate header/footer blocks or duplicate block IDs
          if (newPages) {
            for (const pageName of Object.keys(newPages)) {
              const seenTypes = new Set<string>();
              const seenIds = new Set<string>();
              newPages[pageName] = (newPages[pageName] || []).filter((block) => {
                if (!block || !block.id) return false;
                if (block.type === 'header' || block.type === 'footer') {
                  if (seenTypes.has(block.type)) return false;
                  seenTypes.add(block.type);
                }
                if (seenIds.has(block.id)) return false;
                seenIds.add(block.id);
                return true;
              });
            }
          }

          setPages(newPages);
          setActivePages(activePagesList);
          setProjectConfig(config);
        } catch (e) {
          console.error('Error parsing blocksJson for preview:', e);
          setPages({ home: [] });
          setActivePages(['home']);
        }
      })
      .catch((err) => console.error('Error loading project for preview:', err))
      .finally(() => {
        setLoading(false);
      });

    // Fetch products
    api.products
      .list(projectId)
      .then((data) => setDbProducts(data))
      .catch((err) => console.error('Error loading products for preview:', err));

    // Fetch coupons
    api.coupons
      .list(projectId)
      .then((data) => setDbCoupons(data))
      .catch((err) => console.error('Error loading coupons for preview:', err));

    // Load customer session from localStorage if present
    if (typeof window !== 'undefined') {
      const clientEmail = localStorage.getItem('clientEmail');
      const clientId = localStorage.getItem('clientId');
      const clientName = localStorage.getItem('clientName');
      const clientPhone = localStorage.getItem('clientPhone');
      const clientAddress = localStorage.getItem('clientAddress');

      if (clientEmail && clientId) {
        const session = {
          id: parseInt(clientId, 10),
          name: clientName || 'Guest User',
          email: clientEmail,
        };
        setCustomerSession(session);
        setCheckoutForm((prev) => ({
          ...prev,
          name: clientName || '',
          phone: clientPhone || '',
          address: clientAddress || '',
        }));

        // Fetch customer orders
        api.orders
          .listForCustomer(projectId, session.id)
          .then((data) => setOrders(data))
          .catch((err) => console.error('Error loading customer orders:', err));
      }

      // Load wishlist
      const cachedWishlist = localStorage.getItem(`primezat_wishlist_${projectId}`);
      if (cachedWishlist) {
        try {
          setWishlist(JSON.parse(cachedWishlist));
        } catch {}
      }
    }
  }, [projectId]);

  // Load orders list whenever activeView is orders
  useEffect(() => {
    if (activeView === 'orders' && customerSession) {
      api.orders
        .listForCustomer(projectId, customerSession.id)
        .then((data) => setOrders(data))
        .catch((err) => console.error('Error refreshing customer orders:', err));
    }
  }, [activeView, customerSession, projectId]);

  // Sync Cart Quantity Badge
  const cartCountQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check if project is fashion/clothing niche
  const forceNiche = searchParams.get('niche') || searchParams.get('theme') || searchParams.get('shopNiche');
  let shopNiche = forceNiche || projectConfig?.shopNiche;

  // Auto-detect specific sub-niche from blocks content if shopNiche is empty
  if (!shopNiche && currentPageBlocks) {
    const blockStr = JSON.stringify(currentPageBlocks).toLowerCase();
    if (blockStr.includes("women's")) {
      shopNiche = 'fashion_women';
    } else if (blockStr.includes("men's")) {
      shopNiche = 'fashion_men';
    } else if (blockStr.includes('kids')) {
      shopNiche = 'fashion_kids';
    } else if (blockStr.includes('shoe') || blockStr.includes('footwear')) {
      shopNiche = 'fashion_footwear';
    } else if (blockStr.includes('cloth') || blockStr.includes('apparel') || blockStr.includes('boutique')) {
      shopNiche = 'cloth';
    }
  }

  // Robust check for fashion blocks in pages/blocks content
  const allProjectBlocks = Object.values(pages).flat();

  const hasFashionBlocks = allProjectBlocks.some((b: any) => {
    const textStr = JSON.stringify(b).toLowerCase();
    return textStr.includes('fashion') || 
           textStr.includes('boutique') || 
           textStr.includes('apparel') || 
           textStr.includes('clothing') || 
           textStr.includes('closet') ||
           textStr.includes('kids wear');
  });

  const hasRealEstateLayout = isRealEstate && 
                              projectConfig?.businessType !== 'wedding' && 
                              projectConfig?.businessType !== 'event' && 
                              projectConfig?.businessType !== 'restaurant';

  const isFashion = !hasRealEstateLayout && 
                    projectConfig?.businessType !== 'restaurant' && 
                    projectConfig?.businessType !== 'wedding' && (
                    projectConfig?.businessType === 'fashion' ||
                    shopNiche === 'cloth' || (typeof shopNiche === 'string' && shopNiche.startsWith('fashion')) ||
                    project?.name?.toLowerCase().includes('closet') ||
                    project?.name?.toLowerCase().includes('fashion') ||
                    project?.name?.toLowerCase().includes('clothing') ||
                    project?.name?.toLowerCase().includes('boutique') ||
                    project?.name?.toLowerCase().includes('apparel') ||
                    project?.name?.toLowerCase().includes('wear') ||
                    hasFashionBlocks);

  const projectNameLower = project?.name?.toLowerCase() || '';
  const projectDescLower = project?.description?.toLowerCase() || '';
  const isEventOrWeddingKeyword = 
    projectNameLower.includes('wedding') ||
    projectNameLower.includes('event') ||
    projectNameLower.includes('planner') ||
    projectNameLower.includes('birthday') ||
    projectNameLower.includes('party') ||
    projectNameLower.includes('celebration') ||
    projectNameLower.includes('dj') ||
    projectNameLower.includes('music') ||
    projectNameLower.includes('band') ||
    projectNameLower.includes('catering') ||
    projectNameLower.includes('caterer') ||
    projectDescLower.includes('wedding') ||
    projectDescLower.includes('event') ||
    projectDescLower.includes('planner') ||
    projectDescLower.includes('birthday') ||
    projectDescLower.includes('party') ||
    projectDescLower.includes('celebration') ||
    projectDescLower.includes('dj') ||
    projectDescLower.includes('music') ||
    projectDescLower.includes('band') ||
    projectDescLower.includes('catering') ||
    projectDescLower.includes('caterer');

  const isWedding = !hasRealEstateLayout && projectConfig?.businessType !== 'restaurant' && (
                    projectConfig?.businessType === 'wedding' ||
                    projectConfig?.businessType === 'event' ||
                    !!projectConfig?.weddingCategory ||
                    isEventOrWeddingKeyword ||
                    allProjectBlocks.some((b: any) =>
                      // login_config / dashboard_config title detection
                      (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                      (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('event')) ||
                      (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                      (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                      (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('event')) ||
                      (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                      // Hero button text patterns unique to wedding template
                      (b.type === 'hero' && b.content?.btn1Text === 'View Portfolio' && b.content?.btn2Text === 'Book Consultation') ||
                      // Pricing plan names unique to wedding template
                      (b.type === 'pricing' && b.content?.plans?.some((p: any) =>
                        p.name === 'Silver Plan' || p.name === 'Gold Plan' || p.name === 'Platinum Plan'
                      )) ||
                      // Features block with wedding-specific service items
                      (b.type === 'features' && b.content?.items?.some((item: any) =>
                        item.title === 'Custom Theme Design' || item.title === 'Venue Coordination' || item.title === 'Catering Management'
                      ))
                    )
                  );

  console.log(`--- DEBUG: isWedding=${isWedding} isRealEstate=${isRealEstate} isFashion=${isFashion} name="${project?.name}" desc="${project?.description}" bizType="${projectConfig?.businessType}" blocksCount=${allProjectBlocks.length}`);

  const handlePropertyInquiry = (product: Product) => {
    const sessionEmail = localStorage.getItem('clientEmail') || '';
    const sessionName = localStorage.getItem('clientName') || '';
    const sessionPhone = localStorage.getItem('clientPhone') || '';

    setInquiryProduct(product);
    setInquiryFormName(sessionName);
    setInquiryFormEmail(sessionEmail);
    setInquiryFormMobile(sessionPhone);
    setInquiryFormBudget(product.price ? String(product.price) : '');
    setInquiryFormMessage(`Hi, I'm interested in "${product.name}" located at "${product.brand || ''}". Please share more details.`);
    setIsInquiryModalOpen(true);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryFormName || !inquiryFormMobile || !inquiryFormEmail) {
      addToast('Please fill out all required fields (*)', true);
      return;
    }

    const payload = {
      projectId,
      name: inquiryFormName,
      mobile: inquiryFormMobile,
      email: inquiryFormEmail,
      budget: parseFloat(inquiryFormBudget) || null,
      message: inquiryFormMessage,
      propertyId: inquiryProduct?.id || null,
      propertyName: inquiryProduct?.name || '',
      status: 'New',
      notes: '',
      assignedBrokerId: null
    };

    try {
      await api.realEstate.leads.create(payload);
      addToast('🏡 Inquiry submitted! An agent will contact you shortly.');
      setIsInquiryModalOpen(false);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      addToast('Failed to submit inquiry. Please try again.', true);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size = 'M', color = 'Black', qty = 1) => {
    if (isRealEstate) {
      handlePropertyInquiry(product);
      return;
    }
    if (!product.id) return;
    if (product.available === false || product.stock <= 0) {
      addToast('Sorry, this product is out of stock', true);
      return;
    }

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      let next;
      if (existingIdx !== -1) {
        next = [...prev];
        next[existingIdx].quantity += qty;
      } else {
        next = [...prev, { product, quantity: qty, size, color }];
      }
      addToast(`Added ${product.name} to Cart!`);
      return next;
    });
  };

  const handleUpdateQuantity = (idx: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const newQty = next[idx].quantity + delta;
      if (newQty <= 0) {
        next.splice(idx, 1);
        addToast('Removed item from cart');
      } else {
        // Stock cap check
        const maxStock = next[idx].product.stock ?? 10;
        if (newQty > maxStock) {
          addToast(`Only ${maxStock} items available in stock`, true);
          return prev;
        }
        next[idx].quantity = newQty;
      }
      return next;
    });
  };

  const handleRemoveFromCart = (idx: number) => {
    setCart((prev) => {
      const next = [...prev];
      next.splice(idx, 1);
      addToast('Removed item from cart');
      return next;
    });
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    if (!product.id) return;
    setWishlist((prev) => {
      const isPresent = prev.includes(product.id!);
      let next;
      if (isPresent) {
        next = prev.filter((id) => id !== product.id);
        addToast('Removed from wishlist');
      } else {
        next = [...prev, product.id!];
        addToast('Added to wishlist');
      }
      localStorage.setItem(`primezat_wishlist_${projectId}`, JSON.stringify(next));
      return next;
    });
  };

  // PDP Modal Triggers
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setPdpSize('M');
    setPdpColor('Black');
  };

  // Apply discount coupon code
  const handleApplyCoupon = () => {
    const codeUpper = couponCode.trim().toUpperCase();
    const match = dbCoupons.find(c => c.code === codeUpper && c.active);

    if (match) {
      const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      if (subtotal < (match.minOrderAmount || 0)) {
        setCouponError(`Min order amount to use this coupon is $${match.minOrderAmount}`);
        setAppliedDiscount(0);
        setAppliedDiscountValue(0);
        setAppliedDiscountType('percentage');
        setAppliedCouponCode('');
        return;
      }
      setCouponError('');
      setAppliedCouponCode(codeUpper);
      if (match.discountType === 'percentage') {
        setAppliedDiscount(match.discountValue / 100);
        setAppliedDiscountValue(match.discountValue);
        setAppliedDiscountType('percentage');
        addToast(`${match.discountValue}% Discount Code applied!`);
      } else {
        setAppliedDiscount(0);
        setAppliedDiscountValue(match.discountValue);
        setAppliedDiscountType('fixed');
        addToast(`Flat $${match.discountValue} Discount applied!`);
      }
    } else if (codeUpper === 'PRIMEZAT10') {
      setAppliedDiscount(0.1);
      setAppliedDiscountValue(10);
      setAppliedDiscountType('percentage');
      setAppliedCouponCode('PRIMEZAT10');
      setCouponError('');
      addToast('10% Discount Code applied!');
    } else {
      setCouponError('Invalid coupon code.');
      setAppliedDiscount(0);
      setAppliedDiscountValue(0);
      setAppliedDiscountType('percentage');
      setAppliedCouponCode('');
    }
  };

  // Submit Shipping details
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address || !checkoutForm.city || !checkoutForm.state || !checkoutForm.pincode) {
      addToast('Please fill out all shipping fields', true);
      return;
    }
    setActiveView('payment');
  };

  // Place order final callback
  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      addToast('Please select a payment method', true);
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmount = appliedDiscountType === 'percentage'
      ? subtotal * appliedDiscount
      : Math.min(subtotal, appliedDiscountValue);
    const tax = (subtotal - discountAmount) * 0.05;
    const grandTotal = subtotal - discountAmount + tax;

    // Serialize details inside standard columns to keep backend fully JPA compatible
    const orderData = {
      projectId: projectId,
      customerId: customerSession?.id || null,
      customerName: checkoutForm.name,
      customerEmail: customerSession?.email || 'guest@example.com',
      customerPhone: checkoutForm.phone,
      customerAddress: `${checkoutForm.address}, ${checkoutForm.city}, ${checkoutForm.state} - ${checkoutForm.pincode}`,
      itemsJson: JSON.stringify(
        cart.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          imageUrl: item.product.imageUrl,
        }))
      ),
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(grandTotal.toFixed(2)),
      paymentGateway: selectedPayment,
      paymentStatus: selectedPayment === 'COD' ? 'Pending COD Verification' : 'Paid',
      status: 'Processing',
      city: checkoutForm.city,
      state: checkoutForm.state,
      pincode: checkoutForm.pincode,
      paymentMethod: selectedPayment,
    };

    api.orders
      .place(orderData)
      .then((newOrder) => {
        setPlacedOrder(newOrder);
        setCart([]);
        setAppliedDiscount(0);
        setAppliedDiscountValue(0);
        setAppliedCouponCode('');
        setCouponCode('');
        setActiveView('success');
        addToast('Order placed successfully!');
        // Refetch products list to refresh stock levels
        api.products.list(projectId).then((data) => setDbProducts(data));
      })
      .catch((err) => {
        console.error('Order placement error:', err);
        addToast('Failed to place order. Try again.', true);
      });
  };

  // Stepper Order statuses
  const handleCancelOrder = (orderId: number) => {
    api.orders
      .updateStatus(orderId, 'Cancelled')
      .then(() => {
        addToast('Order cancelled successfully');
        if (customerSession) {
          api.orders.listForCustomer(projectId, customerSession.id).then((data) => setOrders(data));
        }
        api.products.list(projectId).then((data) => setDbProducts(data));
      })
      .catch((err) => {
        console.error('Cancel order error:', err);
        addToast('Could not cancel order', true);
      });
  };

  const handleReturnOrder = (orderId: number) => {
    api.orders
      .updateStatus(orderId, 'Returned')
      .then(() => {
        addToast('Return request submitted successfully');
        if (customerSession) {
          api.orders.listForCustomer(projectId, customerSession.id).then((data) => setOrders(data));
        }
      })
      .catch((err) => {
        console.error('Return order error:', err);
        addToast('Could not request return', true);
      });
  };

  // Prefill storefront reservation form
  useEffect(() => {
    if (isBookingModalOpen && customerSession) {
      setResFormName(customerSession.name || '');
      setResFormEmail(customerSession.email || '');
      const cachedPhone = localStorage.getItem('clientPhone');
      if (cachedPhone) setResFormPhone(cachedPhone);
    }
  }, [isBookingModalOpen, customerSession]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-6 h-6 border-2 border-indigo-650 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Compiling visual site content...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center text-center p-6">
        <div>
          <span className="text-3xl block mb-4">⚠️</span>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Project not found</h2>
          <p className="text-xs text-slate-500 font-medium">
            Ensure the Spring Boot backend is active and the URL is correct.
          </p>
        </div>
      </div>
    );
  }



  const handleStorefrontCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      customerName: resFormName,
      customerEmail: resFormEmail || null,
      customerPhone: resFormPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: '1', // default auto-allocated
      notes: resFormNotes,
      status: 'Pending'
    };
    try {
      await api.reservations.create(payload);
      addToast('Reservation requested successfully! Check your email/dashboard for confirmation.');
      setIsBookingModalOpen(false);
      // Reset form
      setResFormName('');
      setResFormEmail('');
      setResFormPhone('');
      setResFormNotes('');
    } catch (err) {
      console.error(err);
      addToast('Failed to create reservation request.', true);
    }
  };

  const renderStorefrontBookingModal = () => {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scale-up text-left text-slate-800">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Book a Table</h3>
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer font-bold border-none"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleStorefrontCreateReservation} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input
                type="text"
                required
                value={resFormName}
                onChange={(e) => setResFormName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={resFormEmail}
                  onChange={(e) => setResFormEmail(e.target.value)}
                  placeholder="e.g. customer@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="text"
                  required
                  value={resFormPhone}
                  onChange={(e) => setResFormPhone(e.target.value)}
                  placeholder="e.g. +91 99999 88888"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Booking Date</label>
                <input
                  type="date"
                  required
                  value={resFormDate}
                  onChange={(e) => setResFormDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Time</label>
                <select
                  value={resFormTime}
                  onChange={(e) => setResFormTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 cursor-pointer font-bold"
                >
                  {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Number of Guests</label>
              <input
                type="number"
                required
                min={1}
                max={20}
                value={resFormGuests}
                onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Special Request Notes</label>
              <textarea
                value={resFormNotes}
                onChange={(e) => setResFormNotes(e.target.value)}
                placeholder="e.g. Highchair for baby, wheelchair accessibility, allergic to nuts."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none text-slate-800"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow cursor-pointer border-none"
              >
                Request Table
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Invoice calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscountType === 'percentage'
    ? subtotal * appliedDiscount
    : Math.min(subtotal, appliedDiscountValue);
  const tax = (subtotal - discountAmount) * 0.05;
  const grandTotal = subtotal - discountAmount + tax;

  return (
    <div className="min-h-screen bg-slate-50/50 blueprint-grid relative flex flex-col justify-between overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 no-print">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-70 blob-violet animate-blob-complex" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-60 blob-cyan animate-blob-complex" />
        <div className="absolute top-[40%] right-[-150px] w-[450px] h-[450px] rounded-full filter blur-[100px] opacity-50 blob-rose animate-blob-complex" />
      </div>

      {/* Toast Notification Layer */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm no-print">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl shadow-xl border text-xs font-bold transition duration-300 flex items-center gap-2 animate-slide-in-right ${
              t.isError
                ? 'bg-rose-50 border-rose-150 text-rose-700'
                : 'bg-emerald-50 border-emerald-150 text-emerald-700'
            }`}
          >
            <span>{t.isError ? '⚠️' : '✅'}</span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            background: white !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Main View rendering wrapper */}
      <div className="flex-1 pb-24 relative z-10">
        {/* VIEW 1: LANDING CATALOG */}
        {activeView === 'landing' && (
          (() => {
            const landingProps = {
              projectId,
              project: project!,
              currentPageBlocks,
              dbProducts,
              cartCountQuantity,
              customerSession,
              openProductDetail,
              handleAddToCart,
              gymInfo,
            };

            if (projectConfig?.businessType === 'restaurant') {
              return (
                <RestaurantLanding
                  projectId={projectId}
                  project={project!}
                  dbProducts={dbProducts}
                  cartCount={cartCountQuantity}
                  onAddToCart={(p) => handleAddToCart(p, 'M', 'Black', 1)}
                  onViewCart={() => setActiveView('cart')}
                  onViewMyOrders={() => {
                    if (!customerSession) {
                      addToast('Please login to track your orders', true);
                    } else {
                      setActiveView('orders');
                    }
                  }}
                  onProductClick={openProductDetail}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  setIsBookingModalOpen={setIsBookingModalOpen}
                  customerSession={customerSession}
                  onLogout={handleLogout}
                  shopNiche={shopNiche || null}
                  restaurantInfo={restaurantInfo}
                />
              );
            }
            if (isWedding) {
              return (
                <WeddingLanding
                  projectId={projectId}
                  project={project!}
                  currentPageBlocks={currentPageBlocks}
                  cartCount={cartCountQuantity}
                  onAddToCart={(p) => handleAddToCart(p, 'M', 'Black', 1)}
                  onViewCart={() => setActiveView('cart')}
                  onViewMyOrders={() => {
                    if (!customerSession) {
                      addToast('Please login to track your orders', true);
                    } else {
                      setActiveView('orders');
                    }
                  }}
                  onProductClick={openProductDetail}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  customerSession={customerSession}
                  onLogout={handleLogout}
                  dbProducts={dbProducts}
                  projectIdStr={projectIdStr}
                />
              );
            }
            if (projectConfig?.businessType === 'hospital' || projectConfig?.businessType === 'clinic') {
              return <HospitalLanding {...landingProps} />;
            }
            if (projectConfig?.businessType === 'school') {
              return <SchoolLanding {...landingProps} />;
            }
            if (projectConfig?.businessType === 'gym') {
              return <GymLanding {...landingProps} />;
            }
            if (isRealEstate) {
              return <RealEstateLanding {...landingProps} />;
            }
            if (projectConfig?.businessType === 'medical-shop') {
              return <MedicalShopLanding {...landingProps} />;
            }
            if (isFashion) {
              return (
                <StorefrontLanding
                  projectId={projectId}
                  projectConfig={{ ...projectConfig, shopNiche }}
                  dbProducts={dbProducts}
                  wishlist={wishlist}
                  cartCountQuantity={cartCountQuantity}
                  customerSession={customerSession}
                  setActiveView={setActiveView}
                  openProductDetail={openProductDetail}
                  handleToggleWishlist={handleToggleWishlist}
                  handleAddToCart={handleAddToCart}
                  addToast={addToast}
                />
              );
            }

            // Fallback default
            return (
              <main className="divide-y divide-slate-100 bg-white">
                {currentPageBlocks.length === 0 ? (
                  <div className="text-center py-32 text-slate-400">
                    <span className="text-4xl block mb-4">📄</span>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">This page is blank</h2>
                    <p className="text-xs max-w-xs mx-auto">
                      Open the dashboard editor and construct layouts to show them here.
                    </p>
                  </div>
                ) : (
                  currentPageBlocks.map((block) => (
                    <section key={block.id}>
                      {block.type === 'products' && !customerSession && !isRealEstate ? (
                        <div className="py-20 px-6 bg-slate-50 text-center border-t border-b border-slate-200/50">
                          <div className="max-w-xl mx-auto p-8 sm:p-10 bg-white border border-slate-200/60 rounded-3xl shadow-xl space-y-6">
                            <span className="text-4xl block animate-pulse">🔒</span>
                            <div className="space-y-2 text-center">
                              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                Explore Our Premium Niche Catalog
                              </h2>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                                Sign in to unlock our interactive product catalog. Browse apparel, filter by price, brand, color, and rating, select sizes and colors, add items to cart, checkout with discount coupons, and track shipments in real-time.
                              </p>
                            </div>
                            <Link
                              href={`/preview/${projectId}/login`}
                              className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs transition uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98]"
                            >
                              Sign In to Shop
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <BlockMarkup
                          block={block}
                          projectId={projectIdStr}
                          dbProducts={dbProducts}
                          cartCount={cartCountQuantity}
                          onAddToCart={(p) => handleAddToCart(p, 'M', 'Black', 1)}
                          onViewCart={() => setActiveView('cart')}
                          onViewMyOrders={() => {
                            if (!customerSession) {
                              addToast('Please login to track your orders', true);
                            } else {
                              setActiveView('orders');
                            }
                          }}
                          onProductClick={openProductDetail}
                          wishlist={wishlist}
                          onToggleWishlist={handleToggleWishlist}
                          gymInfo={gymInfo}
                        />
                      )}
                    </section>
                  ))
                )}
              </main>
            );
          })()
        )}

        {/* Mini Storefront Header for sub-views */}
        {activeView !== 'landing' && (
          <header className="px-6 sm:px-10 py-5 flex items-center justify-between border-b border-slate-200/50 bg-white shadow-sm sticky top-0 z-40 no-print">
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-900 transition uppercase tracking-wider cursor-pointer border-0 bg-transparent animate-fade-in"
            >
              ← Back to Store
            </button>
            <div className="font-black text-sm text-slate-800 uppercase tracking-widest">{project.name}</div>
            <div className="flex items-center gap-3">
              {customerSession && (
                <button
                  onClick={() => setActiveView('orders')}
                  className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-[10px] font-bold transition cursor-pointer"
                >
                  📦 My Orders
                </button>
              )}
              <button
                onClick={() => setActiveView('cart')}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-bold shadow-sm transition cursor-pointer"
              >
                Cart ({cartCountQuantity})
              </button>
            </div>
          </header>
        )}

        {/* VIEW 2: CART PAGE */}
        {activeView === 'cart' && (
          <div className="max-w-5xl mx-auto px-6 py-10 no-print">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Shopping Cart</h2>

            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/50 shadow-sm animate-fade-in">
                <span className="text-5xl block mb-4">🛒</span>
                <h3 className="text-base font-bold text-slate-800 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mb-6 font-medium">Add some items from the catalog to get started.</p>
                <button
                  onClick={() => setActiveView('landing')}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
                {/* Cart Items list */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/60 rounded-2xl p-4 flex gap-4 items-center shadow-sm"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=150&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                          {item.product.brand ?? 'Premium'}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-800 truncate mt-1 leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="flex gap-2.5 text-[10px] text-slate-500 font-bold mt-1">
                          <span>Size: <strong className="text-slate-800">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-slate-800">{item.color}</strong></span>
                        </div>
                      </div>

                      {/* Quantity control */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1">
                        <button
                          onClick={() => handleUpdateQuantity(idx, -1)}
                          className="w-7 h-7 text-xs font-bold text-slate-650 hover:bg-white rounded-lg transition border-0 bg-transparent cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(idx, 1)}
                          className="w-7 h-7 text-xs font-bold text-slate-650 hover:bg-white rounded-lg transition border-0 bg-transparent cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing and delete */}
                      <div className="text-right flex flex-col items-end gap-1 flex-shrink-0 min-w-[70px]">
                        <span className="text-sm font-black text-slate-900 font-sans">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(idx)}
                          className="text-[10px] font-bold text-rose-500 hover:text-rose-700 transition border-0 bg-transparent cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setActiveView('landing')}
                    className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition tracking-wider uppercase cursor-pointer border-0 bg-transparent"
                  >
                    ← Add more items
                  </button>
                </div>

                {/* Cart Totals Summary */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3">
                    Order Summary
                  </h3>

                  {/* Promo Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Promo / Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. PRIMEZAT10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] font-bold text-rose-500 mt-1">{couponError}</p>}
                    {appliedDiscountValue > 0 && (
                      <p className="text-[10px] font-black text-emerald-600 mt-1 flex items-center gap-1">
                        <span>🎉</span> Coupon {appliedCouponCode} Active ({appliedDiscountType === 'percentage' ? `${appliedDiscountValue}%` : `$${appliedDiscountValue}`} Off)
                      </p>
                    )}
                  </div>

                  {/* Price calculations */}
                  <div className="space-y-3 pt-2 text-xs font-bold text-slate-605">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscountValue > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Coupon Discount ({appliedDiscountType === 'percentage' ? `${appliedDiscountValue}%` : `$${appliedDiscountValue}`})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>GST / Tax (5%)</span>
                      <span className="text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-emerald-600 uppercase">Free</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-black text-slate-900">
                      <span>Total Amount</span>
                      <span className="font-sans text-base">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit checkout */}
                  <button
                    onClick={() => setActiveView('checkout')}
                    className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer text-center uppercase tracking-wider"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: CHECKOUT PAGE */}
        {activeView === 'checkout' && (
          <div className="max-w-5xl mx-auto px-6 py-10 no-print">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Checkout</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
              {/* Left Column: Form details */}
              <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-4 mb-6">
                  Shipping & Billing Address
                </h3>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Street Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      placeholder="Apartment, Suite, Unit, Street address"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                      <input
                        required
                        type="text"
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        placeholder="Mumbai"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">State</label>
                      <input
                        required
                        type="text"
                        value={checkoutForm.state}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                        placeholder="Maharashtra"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Pincode
                      </label>
                      <input
                        required
                        type="text"
                        value={checkoutForm.pincode}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                        placeholder="400001"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer text-center uppercase tracking-wider mt-4"
                  >
                    Proceed to Payment
                  </button>
                </form>
              </div>

              {/* Right Column: Order Items Summary */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-4 text-left">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3">
                  Items Summary
                </h3>

                <div className="space-y-3 divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-3 pt-2 items-center text-xs">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                        <img src={item.product.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-slate-800 truncate">{item.product.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold">
                          Qty {item.quantity} | {item.size} | {item.color}
                        </p>
                      </div>
                      <span className="font-extrabold text-slate-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-905">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscountValue > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({appliedCouponCode})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="text-slate-905">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-black text-slate-905">
                    <span>Total Amount</span>
                    <span className="font-sans text-base">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PAYMENT SECTOR */}
        {activeView === 'payment' && (
          <div className="max-w-5xl mx-auto px-6 py-10 no-print">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Payment Method</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
              {/* Payment selector */}
              <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3 mb-1">
                    Select Payment Method
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">All transactions are secure and encrypted.</p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'UPI',
                      title: 'UPI Payment',
                      desc: 'Pay using PhonePe, GPay, Paytm, or any UPI client',
                      icon: '📱',
                    },
                    {
                      id: 'Credit Card',
                      title: 'Credit Card',
                      desc: 'Visa, Mastercard, RuPay, and American Express',
                      icon: '💳',
                    },
                    {
                      id: 'Debit Card',
                      title: 'Debit Card',
                      desc: 'Instant checkout using secure debit card details',
                      icon: '💸',
                    },
                    {
                      id: 'COD',
                      title: 'Cash on Delivery (COD)',
                      desc: 'Pay in cash or card when package arrives at your home',
                      icon: '🏠',
                    },
                  ].map((pay) => (
                    <label
                      key={pay.id}
                      onClick={() => setSelectedPayment(pay.id as any)}
                      className={`p-4 border rounded-2xl flex items-center justify-between cursor-pointer transition ${
                        selectedPayment === pay.id
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-350 bg-white'
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        <span className="text-2xl select-none">{pay.icon}</span>
                        <div className="text-left">
                          <h4 className="text-xs font-black text-slate-900">{pay.title}</h4>
                          <p className="text-[10px] text-slate-405 font-medium">{pay.desc}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPayment === pay.id}
                        onChange={() => {}}
                        className="w-4 h-4 text-indigo-600 focus:ring-0 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>

                {/* Mock Card Form if Credit/Debit card selected */}
                {(selectedPayment === 'Credit Card' || selectedPayment === 'Debit Card') && (
                  <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-3 animate-fade-in">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card details</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number"
                        maxLength={16}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={3}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mock UPI details if UPI selected */}
                {selectedPayment === 'UPI' && (
                  <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-3 text-center animate-fade-in flex flex-col items-center">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest self-start">UPI ID</h4>
                    <input
                      type="text"
                      placeholder="username@upi"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 mb-2"
                    />
                    <div className="w-24 h-24 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 select-none">
                      <span className="text-[8px] text-slate-350 font-bold">[ QR Code Scan ]</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">Or scan standard QR code on next page</span>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer text-center uppercase tracking-wider"
                >
                  Pay Now & Place Order (${grandTotal.toFixed(2)})
                </button>
              </div>

              {/* Summary right sidebar */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm text-left space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3">
                  Billing Address
                </h3>
                <div className="text-xs space-y-1 text-slate-655 font-bold">
                  <p className="text-slate-900">{checkoutForm.name}</p>
                  <p>{checkoutForm.phone}</p>
                  <p>{checkoutForm.address}</p>
                  <p>
                    {checkoutForm.city}, {checkoutForm.state} - {checkoutForm.pincode}
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('checkout')}
                  className="text-[10px] font-black text-indigo-650 hover:underline tracking-wider uppercase cursor-pointer border-0 bg-transparent animate-fade-in"
                >
                  Edit address
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: ORDER SUCCESS SCREEN */}
        {activeView === 'success' && placedOrder && (
          <div className="max-w-3xl mx-auto px-6 py-10">
            {/* Celebration details */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-md text-center space-y-6 no-print animate-fade-in">
              <span className="text-5xl block animate-bounce">🎉</span>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Placed Successfully!</h2>
                <p className="text-xs text-slate-405 font-medium">Thank you for shopping. Your order is being processed.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto py-4 border-y border-slate-100 text-left text-xs font-medium">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Order ID</span>
                  <strong className="text-slate-900 font-extrabold text-xs">#ORD-{placedOrder.id}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                    Expected Delivery
                  </span>
                  <strong className="text-slate-900 font-extrabold text-xs">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </strong>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Payment Gateway</span>
                  <strong className="text-slate-900 font-extrabold text-xs">{placedOrder.paymentGateway}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Payment Status</span>
                  <strong className="text-slate-900 font-extrabold text-xs">{placedOrder.paymentStatus}</strong>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setActiveView('orders')}
                  className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Track Order status
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 border border-slate-250 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  🖨️ Print Invoice
                </button>
                <button
                  onClick={() => setActiveView('landing')}
                  className="px-6 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* PRINTABLE/DOWNLOADABLE INVOICE CARD */}
            <div
              id="printable-invoice"
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-left mt-8 space-y-8 max-w-2xl mx-auto animate-fade-in"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                <div>
                  <h1 className="text-lg font-black uppercase tracking-wider text-slate-900">{project.name}</h1>
                  <p className="text-[10px] text-slate-400 font-bold">Ecommerce Catalog Storefront</p>
                </div>
                <div className="text-right">
                  <h2 className="text-sm font-black text-slate-800 uppercase">INVOICE</h2>
                  <p className="text-[10px] text-slate-400 font-semibold">{placedOrder.invoiceNumber ?? 'INV-MOCK'}</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-xs leading-relaxed font-semibold">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Billed To:
                  </span>
                  <strong className="text-slate-900 block font-extrabold">{placedOrder.customerName}</strong>
                  <span className="text-slate-500 font-bold block">{placedOrder.customerPhone}</span>
                  <span className="text-slate-500 font-bold block">{placedOrder.customerEmail}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Shipping Address:
                  </span>
                  <span className="text-slate-600 font-medium block whitespace-pre-line">
                    {placedOrder.customerAddress}
                  </span>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-black uppercase text-[9px] tracking-wider">
                    <th className="py-2.5">Item Description</th>
                    <th className="py-2.5 text-center">Qty</th>
                    <th className="py-2.5 text-right">Price</th>
                    <th className="py-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                  {(() => {
                    let items: any[] = [];
                    try {
                      items = JSON.parse(placedOrder.itemsJson) || [];
                    } catch {}
                    return items.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td className="py-3">
                          <p className="font-extrabold text-slate-900">{item.name}</p>
                          <p className="text-[9px] text-slate-400">
                            Size: {item.size} | Color: {item.color}
                          </p>
                        </td>
                        <td className="py-3 text-center">{item.quantity}</td>
                        <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-3 text-right text-slate-900">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>

              {/* Total calculations */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <div className="w-64 space-y-2 text-xs font-bold text-slate-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-900">${placedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {placedOrder.total < placedOrder.subtotal + placedOrder.tax && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Promo Discount</span>
                      <span>-${(placedOrder.subtotal + placedOrder.tax - placedOrder.total).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax / GST (5%)</span>
                    <span className="text-slate-900">${placedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-slate-900">
                    <span>Total Paid</span>
                    <span className="font-sans text-base text-indigo-650">${placedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 text-center text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                Thank you for your order!
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: MY ORDERS TRACKING TAB */}
        {activeView === 'orders' && (
          <div className="max-w-4xl mx-auto px-6 py-10 no-print text-left">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Track Orders</h2>

            {/* Order Tabs */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/50 mb-6 max-w-md animate-fade-in">
              {[
                { id: 'pending', label: 'Processing' },
                { id: 'delivered', label: 'Delivered' },
                { id: 'cancelled', label: 'Cancelled' },
                { id: 'returned', label: 'Returned' },
              ].map((tab) => {
                const isActive = orderFilterTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setOrderFilterTab(tab.id as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition border-0 cursor-pointer ${
                      isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 bg-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Filter orders */}
            {(() => {
              const filteredOrders = orders.filter((o) => {
                const stat = o.status.toLowerCase();
                if (orderFilterTab === 'pending') return stat === 'processing' || stat === 'pending' || stat === 'shipped';
                return stat === orderFilterTab;
              });

              if (filteredOrders.length === 0) {
                return (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/50 shadow-sm animate-fade-in">
                    <span className="text-4xl block mb-3">📦</span>
                    <h3 className="text-sm font-bold text-slate-800">No orders found</h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">You do not have any orders in this category.</p>
                  </div>
                );
              }

              return (
                <div className="space-y-6 animate-fade-in">
                  {filteredOrders.map((order) => {
                    let items: any[] = [];
                    try {
                      items = JSON.parse(order.itemsJson) || [];
                    } catch {}

                    const lowerStatus = order.status.toLowerCase();
                    const isProcessing = lowerStatus === 'processing' || lowerStatus === 'pending';
                    const isShipped = lowerStatus === 'shipped';
                    const isDelivered = lowerStatus === 'delivered';
                    const isCancelled = lowerStatus === 'cancelled';
                    const isReturned = lowerStatus === 'returned';

                    return (
                      <div
                        key={order.id}
                        className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-6"
                      >
                        {/* Order Header info */}
                        <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4 text-xs font-semibold text-slate-500">
                          <div>
                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                              Order Placed
                            </span>
                            <span className="text-slate-900 font-extrabold">#ORD-{order.id}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                              Total amount
                            </span>
                            <span className="text-slate-900 font-extrabold">${order.total.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                              Ship To
                            </span>
                            <span className="text-slate-900 font-extrabold">{order.customerName}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">
                              Payment Gateway
                            </span>
                            <span className="text-slate-900 font-extrabold">{order.paymentGateway}</span>
                          </div>
                        </div>

                        {/* Order Products */}
                        <div className="space-y-4">
                          {items.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-4 items-center">
                              <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=150&auto=format&fit=crop&q=80';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-black text-slate-800 truncate">{item.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold">
                                  Size {item.size} | Color {item.color} | Qty {item.quantity}
                                </p>
                              </div>
                              <span className="text-xs font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        {/* HORIZONTAL STEPPER PROGRESS TRACKER */}
                        {!isCancelled && !isReturned && (
                          <div className="pt-6 border-t border-slate-100 space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Delivery Status
                            </h4>

                            <div className="relative flex justify-between items-center max-w-xl mx-auto">
                              {/* Horizontal connector line */}
                              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />
                              <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 -z-10 transition-all duration-500"
                                style={{
                                  width: isProcessing ? '33%' : isShipped ? '66%' : isDelivered ? '100%' : '0%',
                                }}
                              />

                              {/* Step 1: Ordered */}
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                                  ✓
                                </div>
                                <span className="text-[9px] font-black text-slate-900 uppercase">Ordered</span>
                              </div>

                              {/* Step 2: Packed */}
                              <div className="flex flex-col items-center gap-1.5">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                                    isProcessing || isShipped || isDelivered
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-slate-200 text-slate-405'
                                  }`}
                                >
                                  {isProcessing || isShipped || isDelivered ? '✓' : '2'}
                                </div>
                                <span
                                  className={`text-[9px] font-black uppercase ${
                                    isProcessing || isShipped || isDelivered ? 'text-slate-900' : 'text-slate-400'
                                  }`}
                                >
                                  Packed
                                </span>
                              </div>

                              {/* Step 3: Shipped */}
                              <div className="flex flex-col items-center gap-1.5">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                                    isShipped || isDelivered ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-405'
                                  }`}
                                >
                                  {isShipped || isDelivered ? '✓' : '3'}
                                </div>
                                <span
                                  className={`text-[9px] font-black uppercase ${
                                    isShipped || isDelivered ? 'text-slate-900' : 'text-slate-400'
                                  }`}
                                >
                                  Shipped
                                </span>
                              </div>

                              {/* Step 4: Delivered */}
                              <div className="flex flex-col items-center gap-1.5">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                                    isDelivered ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-405'
                                  }`}
                                >
                                  {isDelivered ? '✓' : '4'}
                                </div>
                                <span
                                  className={`text-[9px] font-black uppercase ${
                                    isDelivered ? 'text-slate-900' : 'text-slate-400'
                                  }`}
                                >
                                  Delivered
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Cancel or Return buttons */}
                        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 text-xs">
                          {isProcessing && (
                            <button
                              onClick={() => handleCancelOrder(order.id!)}
                              className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-600 font-extrabold rounded-xl transition cursor-pointer animate-fade-in"
                            >
                              Cancel Order
                            </button>
                          )}
                          {isDelivered && (
                            <button
                              onClick={() => handleReturnOrder(order.id!)}
                              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-655 font-extrabold rounded-xl transition cursor-pointer animate-fade-in"
                            >
                              Return Items
                            </button>
                          )}
                          {isCancelled && (
                            <span className="px-3 py-1 bg-rose-50 border border-rose-150 text-rose-600 rounded-lg font-black text-[9px] uppercase tracking-wider select-none animate-fade-in">
                              Cancelled
                            </span>
                          )}
                          {isReturned && (
                            <span className="px-3 py-1 bg-amber-50 border border-amber-150 text-amber-600 rounded-lg font-black text-[9px] uppercase tracking-wider select-none animate-fade-in">
                              Returned
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* VIEW 7: PRODUCT DETAIL PAGE (PDP) MODAL OVERLAY */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in no-print">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-3xl w-full max-h-[90vh] md:max-h-[80vh] text-left relative animate-scale-up">
            {/* Close modal */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer z-10 border-0"
            >
              ✕
            </button>

            {/* Left Column: Image with Discount tag */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg text-[10px] font-black px-2.5 py-1 shadow-md uppercase tracking-wider">
                {selectedProduct.discount ?? 15}% OFF
              </span>
            </div>

            {/* Right Column: details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none">
              <div className="space-y-4">
                {/* Brand rating & status */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {selectedProduct.brand ?? 'Louis Philippe'}
                    </span>
                    <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {selectedProduct.category ?? 'General'}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold ${
                      selectedProduct.available === false || selectedProduct.stock <= 0
                        ? 'text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full'
                        : 'text-slate-400'
                    }`}
                  >
                    {selectedProduct.available === false || selectedProduct.stock <= 0 ? 'Out of Stock' : 'In Stock'}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-black text-slate-905 leading-tight">{selectedProduct.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-500 font-bold">
                  <span>★ {(selectedProduct.rating ?? 4.5).toFixed(1)}</span>
                  <span className="text-slate-250">•</span>
                  <span className="text-slate-400 font-semibold">Fast Shipping</span>
                </div>

                {/* Prices */}
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-black text-slate-950 font-sans">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-450 line-through font-bold">
                    ${(selectedProduct.price / (1 - (selectedProduct.discount ?? 15) / 100)).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {selectedProduct.description ||
                    'Premium quality, stylish, and perfect for matching daily outfits or gifting to loved ones.'}
                </p>

                {/* Size options */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Size</h4>
                  <div className="flex gap-2">
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setPdpSize(sz)}
                        className={`w-10 h-10 border rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center ${
                          pdpSize === sz
                            ? 'bg-indigo-650 border-indigo-650 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-655 hover:border-slate-350'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color options */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Color</h4>
                  <div className="flex gap-3 items-center">
                    {COLORS.map((col) => (
                      <button
                        key={col.name}
                        onClick={() => setPdpColor(col.name)}
                        className={`w-7 h-7 rounded-full transition cursor-pointer relative ${
                          pdpColor === col.name ? 'ring-2 ring-indigo-600 ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: col.hex, border: col.name === 'White' ? '1px solid #E2E8F0' : 'none' }}
                        title={col.name}
                      >
                        {pdpColor === col.name && (
                          <span
                            className={`absolute inset-0 flex items-center justify-center text-[9px] font-black ${
                              col.name === 'White' ? 'text-black' : 'text-white'
                            }`}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={() => handleAddToCart(selectedProduct, pdpSize, pdpColor, 1)}
                  disabled={selectedProduct.available === false || selectedProduct.stock <= 0}
                  className="flex-1 py-3 bg-white border border-slate-250 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 text-slate-800 font-extrabold rounded-xl text-xs transition cursor-pointer uppercase tracking-wider text-center"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, pdpSize, pdpColor, 1);
                    setSelectedProduct(null);
                    setActiveView('checkout');
                  }}
                  disabled={selectedProduct.available === false || selectedProduct.stock <= 0}
                  className="flex-1 py-3 bg-indigo-650 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-extrabold rounded-xl text-xs shadow-md transition cursor-pointer uppercase tracking-wider text-center"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleToggleWishlist(selectedProduct)}
                  className="p-3 bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl transition cursor-pointer flex items-center justify-center"
                >
                  <span className="text-sm select-none">
                    {wishlist.includes(selectedProduct.id!) ? '❤️' : '🤍'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Preview Info Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-5 py-3 rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-xs shadow-2xl z-50 backdrop-blur-md no-print animate-fade-in">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-slate-500 font-semibold">Previewing:</span>
          <span className="text-slate-900 font-bold truncate max-w-[150px]">{project.name}</span>
        </div>
        <span className="hidden sm:inline text-slate-200">|</span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-extrabold uppercase">
            Demo Flow
          </span>
          <span className="text-slate-655 font-medium flex items-center gap-1">
            Click{' '}
            <Link
              href={`/preview/${projectId}/login`}
              className="font-bold text-slate-800 hover:text-indigo-600 underline"
            >
              "Log In"
            </Link>{' '}
            to check client dashboard flow.
          </span>
        </div>
      </div>

      {projectConfig.businessType === 'restaurant' && (
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="fixed bottom-6 right-6 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-5 py-3.5 rounded-full shadow-2xl z-[99] flex items-center gap-2 text-xs uppercase tracking-wider hover:scale-105 transition duration-300 border-none cursor-pointer"
        >
          <span>🍽️</span> Book a Table
        </button>
      )}

      {isBookingModalOpen && renderStorefrontBookingModal()}

      {/* Real Estate Lead Inquiry Modal */}
      {isInquiryModalOpen && inquiryProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scale-up text-left text-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Property Inquiry</h3>
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer font-bold border-none"
              >
                ✕
              </button>
            </div>
            <div className="mb-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 items-center">
              {inquiryProduct.imageUrl && (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                  <img src={inquiryProduct.imageUrl} alt={inquiryProduct.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h4 className="text-xs font-black text-slate-800 leading-tight">{inquiryProduct.name}</h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">{inquiryProduct.brand || 'No Location'}</p>
                <p className="text-xs font-black text-indigo-650 mt-0.5 font-sans">${inquiryProduct.price?.toLocaleString()}</p>
              </div>
            </div>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={inquiryFormName}
                  onChange={(e) => setInquiryFormName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile *</label>
                  <input
                    type="text"
                    required
                    value={inquiryFormMobile}
                    onChange={(e) => setInquiryFormMobile(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={inquiryFormEmail}
                    onChange={(e) => setInquiryFormEmail(e.target.value)}
                    placeholder="e.g. john@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Budget (USD)</label>
                <input
                  type="number"
                  value={inquiryFormBudget}
                  onChange={(e) => setInquiryFormBudget(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  value={inquiryFormMessage}
                  onChange={(e) => setInquiryFormMessage(e.target.value)}
                  placeholder="Describe your requirement..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow cursor-pointer border-none"
                >
                  I'm Interested
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PreviewPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-indigo-650 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PreviewPageContent params={params} />
    </Suspense>
  );
}
