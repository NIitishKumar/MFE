'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, Order } from '@/types';
import { PRODUCTS } from '@/data/products';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, selectedColor: string, selectedSize: string | undefined, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  wishlistProducts: Product[];

  // User / Auth
  user: UserProfile;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    items: CartItem[];
    shippingAddress: Address;
    deliveryMethod: 'standard' | 'white-glove' | 'express';
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recentSearches: string[];
  addRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Utilities
  formatINR: (val: number) => string;
}

const StoreContext = createContext<StoreContextType | null>(null);

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Aditya Sharma',
    phone: '+91 98450 12345',
    addressLine1: 'Villa 14, Palm Meadows, Ramagondanahalli',
    addressLine2: 'Near Varthur Main Road, Whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    landmark: 'Opposite Forum Neighbourhood Mall',
    isDefault: true,
    type: 'home'
  },
  {
    id: 'addr-2',
    fullName: 'Aditya Sharma',
    phone: '+91 98450 12345',
    addressLine1: 'Studio 402, Signature Tower, Senapati Bapat Marg',
    addressLine2: 'Lower Parel',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400013',
    landmark: 'Behind Phoenix Palladium',
    isDefault: false,
    type: 'work'
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-84920',
    orderNumber: 'AURA-2026-84920',
    createdAt: '2026-08-28T14:30:00Z',
    items: [
      {
        product: PRODUCTS[0], // Sorrento curved boucle sofa
        quantity: 1,
        selectedColor: 'Oatmeal Bouclé',
        selectedSize: '4-Seater Grande (260 cm)'
      }
    ],
    shippingAddress: DEFAULT_ADDRESSES[0],
    deliveryMethod: 'white-glove',
    paymentMethod: 'upi',
    subtotal: 145000,
    deliveryFee: 0,
    discount: 0,
    total: 145000,
    status: 'Shipped',
    trackingSteps: [
      { title: 'Order Confirmed', description: 'Your order was verified and hand-crafted scheduling initiated.', date: '28 Aug 2026', completed: true, current: false },
      { title: 'Artisan Quality Inspection', description: 'Passed structural inspection and upholstery seam inspection.', date: '30 Aug 2026', completed: true, current: false },
      { title: 'Dispatched via White Glove Logistics', description: 'En route via climate-controlled furniture transit from Bengaluru studio.', date: '02 Sep 2026', completed: true, current: true },
      { title: 'Out for In-Home Assembly', description: 'Technicians will arrive at your selected delivery window.', date: 'Expected 05 Sep', completed: false, current: false },
      { title: 'Delivered & Placed', description: 'Assembly completed and packaging safely recycled.', date: 'Expected 05 Sep', completed: false, current: false }
    ],
    paymentStatus: 'Paid',
    estimatedDelivery: 'Saturday, 05 September 2026'
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>(DEFAULT_ADDRESSES);
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);
  const [user, setUser] = useState<UserProfile>({
    name: 'Aditya Sharma',
    email: 'aditya.sharma@example.in',
    phone: '+91 98450 12345',
    isLoggedIn: true
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Bouclé sofa',
    'Travertine dining table',
    'Solid oak bed',
    'Lounge chair'
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aura_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('aura_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedAddresses = localStorage.getItem('aura_addresses');
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));

      const savedOrders = localStorage.getItem('aura_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = localStorage.getItem('aura_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedSearches = localStorage.getItem('aura_recent_searches');
      if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    setIsHydrated(true);
  }, []);

  // Sync state changes to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn(e);
    }
  }, [wishlist, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('aura_addresses', JSON.stringify(addresses));
    } catch (e) {
      console.warn(e);
    }
  }, [addresses, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('aura_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn(e);
    }
  }, [orders, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
  }, [user, isHydrated]);

  // Toast helper
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart actions
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor = product.colors[0]?.name || 'Default',
    selectedSize = product.sizes[0] || 'Standard'
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor, selectedSize }];
    });
    addToast(`Added "${product.name}" to your cart.`, 'success');
  };

  const removeFromCart = (productId: string, selectedColor: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
    addToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (
    productId: string,
    selectedColor: string,
    selectedSize: string | undefined,
    delta: number
  ) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast(`Removed "${product?.name || 'Item'}" from wishlist.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Saved "${product?.name || 'Item'}" to your wishlist.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // User actions
  const login = (email: string, name = 'Valued Customer') => {
    setUser({
      name,
      email,
      phone: '+91 98450 12345',
      isLoggedIn: true
    });
    addToast(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setUser({
      name: 'Guest',
      email: '',
      phone: '',
      isLoggedIn: false
    });
    addToast('You have been signed out.', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    addToast('Profile updated successfully.', 'success');
  };

  // Address actions
  const addAddress = (addrData: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`
    };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [...prev.map((a) => ({ ...a, isDefault: false })), newAddr];
      }
      return [...prev, newAddr];
    });
    addToast('Address added to your address book.', 'success');
    return newAddr;
  };

  const updateAddress = (updated: Address) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === updated.id) return updated;
        if (updated.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
    addToast('Address updated.', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    addToast('Default delivery address updated.', 'success');
  };

  // Orders
  const createOrder = (orderData: {
    items: CartItem[];
    shippingAddress: Address;
    deliveryMethod: 'standard' | 'white-glove' | 'express';
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
  }): Order => {
    const orderNumber = `AURA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      deliveryMethod: orderData.deliveryMethod,
      paymentMethod: orderData.paymentMethod,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      discount: orderData.discount,
      total: orderData.total,
      status: 'Confirmed',
      trackingSteps: [
        {
          title: 'Order Confirmed',
          description: 'We have received your bespoke order and reserved inventory.',
          date: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Artisan Quality Inspection',
          description: 'Our master craftsmen will inspect timber grains and seams.',
          date: 'Expected tomorrow',
          completed: false,
          current: false
        },
        {
          title: 'White-Glove Dispatched',
          description: 'Carefully blanket-wrapped for transport.',
          date: 'In 2-3 days',
          completed: false,
          current: false
        },
        {
          title: 'In-Home Assembly & Placement',
          description: 'Technicians unpack, assemble and clean.',
          date: 'In 5-7 days',
          completed: false,
          current: false
        }
      ],
      paymentStatus: orderData.paymentMethod === 'cod' ? 'Pending' : 'Paid',
      estimatedDelivery: 'Within 5-7 Business Days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  // Search actions
  const addRecentSearch = (q: string) => {
    if (!q.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== q.toLowerCase());
      const updated = [q.trim(), ...filtered].slice(0, 6);
      try {
        localStorage.setItem('aura_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('aura_recent_searches');
    } catch (e) {
      console.warn(e);
    }
  };

  // INR Currency Formatter
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        freeShippingThreshold: 50000,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        wishlistProducts,

        user,
        login,
        logout,
        updateProfile,

        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,

        orders,
        createOrder,
        getOrderById,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,

        toasts,
        addToast,
        removeToast,

        formatINR
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
