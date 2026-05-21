import { motion } from 'framer-motion';
import { Search, MapPin, Clock, ShoppingBag, Leaf, Flame, Star, Users, Zap } from 'lucide-react';

const filters = ['All', 'Bakery', 'Meals', 'Drinks', 'Supermarket', 'Expiring Soon'];

export default function Nearby({ store }) {
  const { listings, activeFilter, setActiveFilter, searchQuery, setSearchQuery, navigate, impact } = store;

  const filtered = listings.filter(l => {
    if (activeFilter === 'Expiring Soon') return l.badge === 'Expiring Soon' || l.quantityLeft <= 2;
    if (activeFilter !== 'All' && l.category !== activeFilter) return false;
    if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase()) && !l.merchantName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-black text-gray-900">Nearby Rescues</h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                <MapPin size={10} className="text-green-600" />
                Bangkok · {filtered.length} deals available
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-semibold text-green-700">{impact.rescuesTonight} rescued tonight</span>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bakery, sushi, coffee, salad…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white border border-gray-100 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-lg mx-auto px-4 mt-4">
        <MockCityMap listings={filtered} />
      </div>

      {/* Social proof banner */}
      <motion.div
        className="max-w-lg mx-auto px-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
          <Flame size={14} className="text-amber-500" />
          <p className="text-xs text-amber-700 font-medium">
            <span className="font-bold">7 people</span> rescued meals in your area in the last hour
          </p>
        </div>
      </motion.div>

      {/* Deal Cards */}
      <div className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {filtered.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
          >
            <DealCard listing={listing} onRescue={() => navigate('detail', listing)} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <ShoppingBag size={48} className="mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-gray-500">No deals found</p>
            <p className="text-xs mt-1">Try a different filter or search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MockCityMap({ listings }) {
  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm">
      {/* Map background with realistic city feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4e8] via-[#e8ede0] to-[#f2f5ec]">
        {/* Major roads */}
        <div className="absolute top-[35%] left-0 right-0 h-[3px] bg-white/80 shadow-sm" />
        <div className="absolute top-[65%] left-0 right-0 h-[2px] bg-white/60" />
        <div className="absolute top-0 bottom-0 left-[25%] w-[3px] bg-white/80 shadow-sm" />
        <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-white/60" />
        <div className="absolute top-0 bottom-0 left-[80%] w-[2px] bg-white/50" />
        
        {/* Soi / smaller streets */}
        <div className="absolute top-[20%] left-[25%] right-[30%] h-[1px] bg-white/50" />
        <div className="absolute top-[50%] left-[10%] right-[50%] h-[1px] bg-white/40" />
        <div className="absolute top-[80%] left-[30%] right-[20%] h-[1px] bg-white/40" />
        <div className="absolute top-[10%] bottom-[30%] left-[45%] w-[1px] bg-white/40" />
        
        {/* Park / green area */}
        <div className="absolute top-[15%] right-[10%] w-16 h-12 bg-green-200/40 rounded-lg" />
        <div className="absolute bottom-[20%] left-[8%] w-12 h-8 bg-green-200/30 rounded-md" />
        
        {/* Building blocks */}
        <div className="absolute top-[42%] left-[28%] w-8 h-6 bg-gray-300/30 rounded-sm" />
        <div className="absolute top-[10%] left-[30%] w-6 h-10 bg-gray-300/25 rounded-sm" />
        <div className="absolute bottom-[30%] right-[25%] w-10 h-6 bg-gray-300/25 rounded-sm" />

        {/* Road labels */}
        <span className="absolute top-[31%] left-[3%] text-[7px] font-medium text-gray-500/60 tracking-wide">Phahonyothin Rd</span>
        <span className="absolute top-[61%] right-[5%] text-[7px] font-medium text-gray-500/60 tracking-wide">Sukhumvit Rd</span>
        <span className="absolute top-[5%] left-[21%] text-[7px] font-medium text-gray-500/50 rotate-90 origin-left">Ari Soi 4</span>
      </div>

      {/* Map pins */}
      {listings.slice(0, 6).map((listing, i) => {
        const positions = [
          { top: '22%', left: '18%' },
          { top: '45%', left: '52%' },
          { top: '65%', left: '28%' },
          { top: '28%', left: '72%' },
          { top: '72%', left: '68%' },
          { top: '48%', left: '85%' },
        ];
        return (
          <motion.div
            key={listing.id}
            className="absolute"
            style={positions[i]}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
          >
            <div className="relative group cursor-pointer">
              {/* Pulse ring */}
              <div className="absolute -inset-3 bg-green-400/15 rounded-full animate-ping-slow" />
              {/* Pin */}
              <div className="relative bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap border border-green-600 hover:scale-110 transition-transform">
                ฿{listing.rescuePrice}
                {/* Triangle pointer */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-700 rotate-45" />
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Your location */}
      <div className="absolute top-[45%] left-[40%]">
        <div className="relative">
          <div className="absolute -inset-3 bg-blue-400/20 rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-blue-500 rounded-full border-[3px] border-white shadow-lg" />
        </div>
      </div>

      {/* Location badge */}
      <div className="absolute bottom-3 left-3 glass rounded-xl px-3 py-1.5 shadow-sm border border-white/50">
        <span className="text-[10px] font-semibold text-gray-700 flex items-center gap-1.5">
          <MapPin size={10} className="text-green-600" />
          Ari, Bangkok
        </span>
      </div>

      {/* Count badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1 shadow-sm">
        <span className="text-[10px] font-bold text-gray-700">{listings.length} nearby</span>
      </div>
    </div>
  );
}

function DealCard({ listing, onRescue }) {
  const isSoldOut = listing.status === 'sold_out' || listing.quantityLeft <= 0;

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Popular': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Selling Fast': return 'bg-red-50 text-red-600 border-red-100';
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Expiring Soon': return 'bg-orange-50 text-orange-600 border-orange-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Popular': return <Star size={9} />;
      case 'Selling Fast': return <Zap size={9} />;
      case 'Expiring Soon': return <Clock size={9} />;
      default: return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 ${
        isSoldOut ? 'opacity-50 grayscale' : ''
      }`}
    >
      <div className="flex">
        {/* Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
          {/* Discount badge */}
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md">
            -{listing.discountPercent}%
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-black text-xs uppercase tracking-wider">Sold Out</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
          <div>
            {/* Merchant + badge */}
            <div className="flex items-center gap-1.5 mb-1">
              <p className="text-[10px] text-gray-500 font-medium truncate">{listing.merchantName}</p>
              {listing.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border flex items-center gap-0.5 whitespace-nowrap ${getBadgeStyle(listing.badge)}`}>
                  {getBadgeIcon(listing.badge)}
                  {listing.badge}
                </span>
              )}
            </div>
            {/* Title */}
            <h3 className="font-bold text-sm text-gray-900 leading-tight">{listing.title}</h3>
            {/* Price */}
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-xl font-black text-green-700">฿{listing.rescuePrice}</span>
              <span className="text-xs text-gray-400 line-through">฿{listing.originalPrice}</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">
                Save ฿{listing.originalPrice - listing.rescuePrice}
              </span>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2.5 text-[10px] text-gray-500">
              <span className="flex items-center gap-0.5 font-medium">
                <Clock size={10} className="text-gray-400" /> {listing.pickupStart}–{listing.pickupEnd}
              </span>
              <span className="flex items-center gap-0.5 font-medium">
                <MapPin size={10} className="text-gray-400" /> {listing.distance}
              </span>
            </div>
            {!isSoldOut && listing.quantityLeft <= 3 && (
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md animate-urgency-pulse">
                Only {listing.quantityLeft} left
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      {!isSoldOut && (
        <button
          onClick={onRescue}
          className="w-full py-3 bg-gradient-to-r from-green-50 to-mint-50 text-green-700 font-bold text-sm border-t border-green-100/50 hover:from-green-100 hover:to-mint-100 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
        >
          <Leaf size={14} />
          Rescue This Deal
        </button>
      )}

      {/* Social proof */}
      {!isSoldOut && listing.claimedTonight > 0 && (
        <div className="px-4 pb-2.5 flex items-center gap-1.5">
          <Users size={10} className="text-gray-400" />
          <span className="text-[10px] text-gray-400 font-medium">
            {listing.claimedTonight} rescued tonight
          </span>
        </div>
      )}
    </div>
  );
}
