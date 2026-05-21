import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'rescuebite_state';

const initialMerchants = [
  { id: 'm1', name: 'Bangkok Bread House', category: 'Bakery', address: '42 Ari Soi 4, Phahonyothin', distance: '0.3 km', trustBadge: 'Verified Partner', rating: 4.8, lat: 13.7800, lng: 100.5450, neighborhood: 'Ari' },
  { id: 'm2', name: 'Sakura Sushi Bar', category: 'Restaurant', address: '15 Thonglor Soi 13', distance: '0.7 km', trustBadge: 'Top Rated', rating: 4.9, lat: 13.7320, lng: 100.5840, neighborhood: 'Thonglor' },
  { id: 'm3', name: 'Green Bowl Kitchen', category: 'Restaurant', address: '88 Ladprao Soi 15', distance: '1.1 km', trustBadge: 'Eco Champion', rating: 4.6, lat: 13.7920, lng: 100.5710, neighborhood: 'Ladprao' },
  { id: 'm4', name: 'Siam Fresh Market', category: 'Supermarket', address: '200 Rama I Road, Siam', distance: '0.5 km', trustBadge: 'Chain Partner', rating: 4.4, lat: 13.7460, lng: 100.5340, neighborhood: 'Siam' },
  { id: 'm5', name: 'Ari Coffee Lab', category: 'Cafe', address: '7 Ari Soi 1, Phahonyothin', distance: '0.2 km', trustBadge: 'Verified Partner', rating: 4.7, lat: 13.7790, lng: 100.5440, neighborhood: 'Ari' },
  { id: 'm6', name: 'Sukhumvit Bakery', category: 'Bakery', address: '33 Sukhumvit Soi 23', distance: '0.9 km', trustBadge: 'Popular Choice', rating: 4.5, lat: 13.7380, lng: 100.5670, neighborhood: 'Sukhumvit' },
];

const initialListings = [
  {
    id: 'l1', title: 'Bakery Surprise Box', description: 'Assorted fresh pastries including butter croissants, chocolate danish, and sourdough bread baked this morning. Perfect for breakfast or sharing.', merchantId: 'm1', merchantName: 'Bangkok Bread House', category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
    originalPrice: 199, rescuePrice: 79, discountPercent: 60, quantityTotal: 8, quantityLeft: 3,
    pickupStart: '20:00', pickupEnd: '21:30', expiryTime: '22:00', distance: '0.3 km',
    allergens: ['Gluten', 'Dairy', 'Eggs'], status: 'available',
    badge: 'Popular', claimedTonight: 5, neighborhood: 'Ari'
  },
  {
    id: 'l2', title: 'Premium Sushi End-of-Day Set', description: 'Chef\'s selection of nigiri and maki rolls prepared fresh today. Includes salmon, tuna, shrimp tempura, and California rolls.', merchantId: 'm2', merchantName: 'Sakura Sushi Bar', category: 'Meals',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop',
    originalPrice: 349, rescuePrice: 149, discountPercent: 57, quantityTotal: 5, quantityLeft: 2,
    pickupStart: '21:00', pickupEnd: '21:45', expiryTime: '22:00', distance: '0.7 km',
    allergens: ['Fish', 'Soy', 'Sesame'], status: 'available',
    badge: 'Selling Fast', claimedTonight: 3, neighborhood: 'Thonglor'
  },
  {
    id: 'l3', title: 'Salad & Grain Rescue Bowl', description: 'Fresh mixed greens with grilled chicken, quinoa, avocado, cherry tomatoes and house vinaigrette. Healthy and satisfying.', merchantId: 'm3', merchantName: 'Green Bowl Kitchen', category: 'Meals',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    originalPrice: 189, rescuePrice: 79, discountPercent: 58, quantityTotal: 6, quantityLeft: 4,
    pickupStart: '19:30', pickupEnd: '20:30', expiryTime: '21:00', distance: '1.1 km',
    allergens: ['Nuts'], status: 'available',
    badge: 'New', claimedTonight: 2, neighborhood: 'Ladprao'
  },
  {
    id: 'l4', title: 'Mixed Bakery Rescue Pack', description: 'Fresh baguettes, whole wheat rolls, and artisan sourdough loaves from our in-store bakery. Baked fresh today, perfect for families.', merchantId: 'm4', merchantName: 'Siam Fresh Market', category: 'Supermarket',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=600&h=400&fit=crop',
    originalPrice: 299, rescuePrice: 119, discountPercent: 60, quantityTotal: 12, quantityLeft: 7,
    pickupStart: '20:30', pickupEnd: '21:30', expiryTime: '22:00', distance: '0.5 km',
    allergens: ['Gluten', 'Dairy'], status: 'available',
    badge: null, claimedTonight: 5, neighborhood: 'Siam'
  },
  {
    id: 'l5', title: 'Coffee & Croissant Rescue Set', description: 'Large iced latte or americano paired with your choice of butter croissant or almond danish. The perfect evening treat.', merchantId: 'm5', merchantName: 'Ari Coffee Lab', category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',
    originalPrice: 149, rescuePrice: 59, discountPercent: 60, quantityTotal: 10, quantityLeft: 5,
    pickupStart: '18:00', pickupEnd: '19:30', expiryTime: '20:00', distance: '0.2 km',
    allergens: ['Gluten', 'Dairy'], status: 'available',
    badge: 'Popular', claimedTonight: 5, neighborhood: 'Ari'
  },
  {
    id: 'l6', title: 'Gourmet Sandwich Bundle', description: 'Three premium sandwiches: smoked salmon & cream cheese, grilled chicken pesto, and caprese on ciabatta. Great for sharing.', merchantId: 'm5', merchantName: 'Ari Coffee Lab', category: 'Meals',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop',
    originalPrice: 259, rescuePrice: 99, discountPercent: 62, quantityTotal: 4, quantityLeft: 2,
    pickupStart: '19:00', pickupEnd: '20:00', expiryTime: '20:30', distance: '0.2 km',
    allergens: ['Gluten', 'Dairy', 'Fish'], status: 'available',
    badge: 'Expiring Soon', claimedTonight: 2, neighborhood: 'Ari'
  },
  {
    id: 'l7', title: 'Butter Croissant Pack (3pc)', description: 'Three freshly baked French-style butter croissants. Flaky, golden, and irresistible. Perfect for tomorrow\'s breakfast.', merchantId: 'm6', merchantName: 'Sukhumvit Bakery', category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
    originalPrice: 177, rescuePrice: 59, discountPercent: 67, quantityTotal: 8, quantityLeft: 3,
    pickupStart: '20:00', pickupEnd: '21:00', expiryTime: '21:30', distance: '0.9 km',
    allergens: ['Gluten', 'Dairy', 'Eggs'], status: 'available',
    badge: 'Selling Fast', claimedTonight: 5, neighborhood: 'Sukhumvit'
  },
];

const initialClaims = [];

const initialImpact = {
  mealsRescued: 1247,
  moneySaved: 289500,
  wasteReducedKg: 623,
  carbonPreventedKg: 1870,
  revenueRecovered: 412000,
  activeMerchants: 47,
  activeCustomers: 892,
  rescuesTonight: 23,
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
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
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
      pickupWindow: `${listing.pickupStart} – ${listing.pickupEnd}`,
      merchantName: listing.merchantName,
      title: listing.title,
      rescuePrice: listing.rescuePrice,
      originalPrice: listing.originalPrice,
      address: merchants.find(m => m.id === listing.merchantId)?.address || '',
      neighborhood: listing.neighborhood,
    };

    setClaims(c => [...c, claim]);
    setListings(ls => ls.map(l => {
      if (l.id === listingId) {
        const newQty = l.quantityLeft - 1;
        return { ...l, quantityLeft: newQty, status: newQty <= 0 ? 'sold_out' : l.status };
      }
      return l;
    }));
    setImpact(i => ({ ...i, rescuesTonight: i.rescuesTonight + 1 }));

    return claim;
  }, [listings, merchants]);

  const markPickedUp = useCallback((claimId) => {
    setClaims(c => c.map(cl => cl.id === claimId ? { ...cl, status: 'picked_up' } : cl));
    const claim = claims.find(c => c.id === claimId);
    const saved = claim ? claim.originalPrice - claim.rescuePrice : 120;
    setImpact(i => ({
      ...i,
      mealsRescued: i.mealsRescued + 1,
      moneySaved: i.moneySaved + saved,
      wasteReducedKg: i.wasteReducedKg + 0.5,
      carbonPreventedKg: i.carbonPreventedKg + 1.5,
      revenueRecovered: i.revenueRecovered + (claim?.rescuePrice || 79),
    }));
  }, [claims]);

  const publishDeal = useCallback((deal) => {
    const newListing = {
      ...deal,
      id: 'l' + Date.now(),
      merchantId: 'm1',
      merchantName: 'Bangkok Bread House',
      status: 'available',
      distance: '0.3 km',
      neighborhood: 'Ari',
      discountPercent: Math.round((1 - deal.rescuePrice / deal.originalPrice) * 100),
      quantityLeft: deal.quantityTotal,
      imageUrl: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=600&h=400&fit=crop',
      badge: 'New',
      claimedTonight: 0,
    };
    setListings(ls => [newListing, ...ls]);
    addToast('🎉 Rescue deal published live!');
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
