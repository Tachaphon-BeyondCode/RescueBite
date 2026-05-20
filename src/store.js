import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'rescuebite_state';

const initialMerchants = [
  { id: 'm1', name: 'FreshBake Cafe', category: 'Bakery', address: '42 Baker Street', distance: '0.3 km', trustBadge: 'Verified Partner', rating: 4.8, lat: 51.5238, lng: -0.1585 },
  { id: 'm2', name: 'Sakura Sushi', category: 'Restaurant', address: '15 Ocean Drive', distance: '0.7 km', trustBadge: 'Top Rated', rating: 4.9, lat: 51.5205, lng: -0.1415 },
  { id: 'm3', name: 'Green Bowl Kitchen', category: 'Restaurant', address: '88 Garden Lane', distance: '1.1 km', trustBadge: 'Verified Partner', rating: 4.6, lat: 51.5180, lng: -0.1520 },
  { id: 'm4', name: 'Metro Supermarket', category: 'Supermarket', address: '200 High Street', distance: '0.5 km', trustBadge: 'Chain Partner', rating: 4.4, lat: 51.5260, lng: -0.1450 },
  { id: 'm5', name: 'Morning Brew Coffee', category: 'Cafe', address: '7 Latte Lane', distance: '0.2 km', trustBadge: 'Verified Partner', rating: 4.7, lat: 51.5220, lng: -0.1550 },
];

const initialListings = [
  {
    id: 'l1', title: 'Bakery Surprise Box', description: 'Assorted fresh pastries, croissants, and sourdough bread baked this morning. Perfect for breakfast or brunch.', merchantId: 'm1', merchantName: 'FreshBake Cafe', category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
    originalPrice: 18.00, rescuePrice: 6.99, discountPercent: 61, quantityTotal: 8, quantityLeft: 3,
    pickupStart: '20:00', pickupEnd: '21:30', expiryTime: '22:00', distance: '0.3 km',
    allergens: ['Gluten', 'Dairy', 'Eggs'], status: 'available'
  },
  {
    id: 'l2', title: 'Sushi End-of-Day Set', description: 'Premium selection of nigiri and maki rolls prepared fresh today. Includes salmon, tuna, and avocado rolls.', merchantId: 'm2', merchantName: 'Sakura Sushi', category: 'Meals',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop',
    originalPrice: 24.00, rescuePrice: 8.99, discountPercent: 63, quantityTotal: 5, quantityLeft: 2,
    pickupStart: '21:00', pickupEnd: '21:45', expiryTime: '22:00', distance: '0.7 km',
    allergens: ['Fish', 'Soy', 'Sesame'], status: 'available'
  },
  {
    id: 'l3', title: 'Salad Rescue Bowl', description: 'Fresh mixed greens with grilled chicken, quinoa, avocado, and house vinaigrette. Healthy and satisfying.', merchantId: 'm3', merchantName: 'Green Bowl Kitchen', category: 'Meals',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    originalPrice: 14.00, rescuePrice: 4.99, discountPercent: 64, quantityTotal: 6, quantityLeft: 4,
    pickupStart: '19:30', pickupEnd: '20:30', expiryTime: '21:00', distance: '1.1 km',
    allergens: ['Nuts'], status: 'available'
  },
  {
    id: 'l4', title: 'Supermarket Bakery Pack', description: 'Fresh baguettes, rolls, and artisan loaves from our in-store bakery. Baked fresh today.', merchantId: 'm4', merchantName: 'Metro Supermarket', category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=600&h=400&fit=crop',
    originalPrice: 12.00, rescuePrice: 3.99, discountPercent: 67, quantityTotal: 12, quantityLeft: 7,
    pickupStart: '20:30', pickupEnd: '21:30', expiryTime: '22:00', distance: '0.5 km',
    allergens: ['Gluten', 'Dairy'], status: 'available'
  },
  {
    id: 'l5', title: 'Cafe Sandwich Bundle', description: 'Three gourmet sandwiches with premium fillings. Includes turkey club, caprese, and smoked salmon.', merchantId: 'm5', merchantName: 'Morning Brew Coffee', category: 'Meals',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop',
    originalPrice: 22.00, rescuePrice: 7.49, discountPercent: 66, quantityTotal: 4, quantityLeft: 3,
    pickupStart: '18:00', pickupEnd: '19:00', expiryTime: '19:30', distance: '0.2 km',
    allergens: ['Gluten', 'Dairy', 'Fish'], status: 'available'
  },
  {
    id: 'l6', title: 'Iced Coffee & Pastry Combo', description: 'Large iced latte paired with a fresh butter croissant or chocolate muffin.', merchantId: 'm5', merchantName: 'Morning Brew Coffee', category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',
    originalPrice: 9.50, rescuePrice: 3.49, discountPercent: 63, quantityTotal: 10, quantityLeft: 6,
    pickupStart: '17:00', pickupEnd: '18:30', expiryTime: '19:00', distance: '0.2 km',
    allergens: ['Gluten', 'Dairy'], status: 'available'
  },
];

const initialClaims = [];

const initialImpact = {
  mealsRescued: 1247,
  moneySaved: 8940,
  wasteReducedKg: 623,
  carbonPreventedKg: 1870,
  revenueRecovered: 12350,
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* ignore */ }
}

export function useAppStore() {
  const saved = loadState();
  const [currentPage, setCurrentPage] = useState(saved?.currentPage || 'landing');
  const [selectedListing, setSelectedListing] = useState(saved?.selectedListing || null);
  const [merchants] = useState(saved?.merchants || initialMerchants);
  const [listings, setListings] = useState(saved?.listings || initialListings);
  const [claims, setClaims] = useState(saved?.claims || initialClaims);
  const [impact, setImpact] = useState(saved?.impact || initialImpact);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    saveState({ currentPage, selectedListing, merchants, listings, claims, impact });
  }, [currentPage, selectedListing, merchants, listings, claims, impact]);

  const navigate = useCallback((page, data) => {
    if (data !== undefined) setSelectedListing(data);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const claimDeal = useCallback((listingId) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing || listing.quantityLeft <= 0) return null;

    const ticketCode = 'RB-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const claim = {
      id: 'c' + Date.now(),
      listingId,
      customerId: 'customer1',
      ticketCode,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      pickupWindow: `${listing.pickupStart} - ${listing.pickupEnd}`,
      merchantName: listing.merchantName,
      title: listing.title,
      rescuePrice: listing.rescuePrice,
      address: merchants.find(m => m.id === listing.merchantId)?.address || '',
    };

    setClaims(c => [...c, claim]);
    setListings(ls => ls.map(l => {
      if (l.id === listingId) {
        const newQty = l.quantityLeft - 1;
        return { ...l, quantityLeft: newQty, status: newQty <= 0 ? 'sold_out' : l.status };
      }
      return l;
    }));

    return claim;
  }, [listings, merchants]);

  const markPickedUp = useCallback((claimId) => {
    setClaims(c => c.map(cl => cl.id === claimId ? { ...cl, status: 'picked_up' } : cl));
    setImpact(i => ({
      ...i,
      mealsRescued: i.mealsRescued + 1,
      moneySaved: i.moneySaved + 8,
      wasteReducedKg: i.wasteReducedKg + 0.5,
      carbonPreventedKg: i.carbonPreventedKg + 1.5,
      revenueRecovered: i.revenueRecovered + 7,
    }));
  }, []);

  const publishDeal = useCallback((deal) => {
    const newListing = {
      ...deal,
      id: 'l' + Date.now(),
      merchantId: 'm1',
      merchantName: 'FreshBake Cafe',
      status: 'available',
      distance: '0.3 km',
      discountPercent: Math.round((1 - deal.rescuePrice / deal.originalPrice) * 100),
      quantityLeft: deal.quantityTotal,
      imageUrl: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=600&h=400&fit=crop',
    };
    setListings(ls => [newListing, ...ls]);
    addToast('Rescue deal published live!');
    return newListing;
  }, [addToast]);

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setListings(initialListings);
    setClaims(initialClaims);
    setImpact(initialImpact);
    setCurrentPage('landing');
    setSelectedListing(null);
    addToast('Demo reset to initial state');
  }, [addToast]);

  return {
    currentPage, navigate,
    selectedListing, setSelectedListing,
    merchants, listings, claims, impact,
    activeFilter, setActiveFilter,
    searchQuery, setSearchQuery,
    claimDeal, markPickedUp, publishDeal, resetDemo,
    toasts, addToast,
  };
}
