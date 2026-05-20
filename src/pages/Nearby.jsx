import { motion } from 'framer-motion';
import { Search, MapPin, Clock, ShoppingBag, Leaf } from 'lucide-react';

const filters = ['All', 'Bakery', 'Meals', 'Drinks', 'Supermarket', 'Expiring Soon'];

export default function Nearby({ store }) {
  const { listings, activeFilter, setActiveFilter, searchQuery, setSearchQuery, navigate } = store;

  const filtered = listings.filter(l => {
    if (activeFilter !== 'All' && activeFilter !== 'Expiring Soon' && l.category !== activeFilter) return false;
    if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase()) && !l.merchantName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Leaf className="text-green-600" size={20} />
              <h1 className="text-lg font-bold text-gray-900">Nearby Rescues</h1>
            </div>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
              {filtered.length} deals
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bakery, sushi, salad, coffee…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-green-700 text-white shadow-md'
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
        <MockMap listings={filtered} />
      </div>

      {/* Deal Cards */}
      <div className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {filtered.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <DealCard listing={listing} onRescue={() => navigate('detail', listing)} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <ShoppingBag size={48} className="mx-auto mb-3 opacity-50" />
            <p className="font-medium">No deals found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MockMap({ listings }) {
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-mint-100 border border-green-200/50 shadow-sm">
      {/* Road patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300/50"></div>
        <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-gray-300/50"></div>
        <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-gray-300/50"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gray-200/50"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gray-200/50"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200/30 rotate-45 origin-center"></div>
      </div>

      {/* Map pins */}
      {listings.slice(0, 5).map((listing, i) => {
        const positions = [
          { top: '25%', left: '20%' },
          { top: '40%', left: '55%' },
          { top: '60%', left: '30%' },
          { top: '30%', left: '75%' },
          { top: '70%', left: '65%' },
        ];
        return (
          <motion.div
            key={listing.id}
            className="absolute"
            style={positions[i]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-green-400/20 rounded-full animate-ping"></div>
              <div className="relative bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                ${listing.rescuePrice.toFixed(0)}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Your location */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-blue-500 rounded-full border-3 border-white shadow-lg"></div>
        <div className="absolute -inset-2 bg-blue-400/30 rounded-full animate-pulse"></div>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
        <span className="text-[10px] font-medium text-gray-600 flex items-center gap-1">
          <MapPin size={10} className="text-green-600" /> Live nearby deals
        </span>
      </div>
    </div>
  );
}

function DealCard({ listing, onRescue }) {
  const isSoldOut = listing.status === 'sold_out';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 ${
        isSoldOut ? 'opacity-60' : ''
      }`}
    >
      <div className="flex">
        {/* Image */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            -{listing.discountPercent}%
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-xs">SOLD OUT</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-gray-500 font-medium">{listing.merchantName}</p>
            <h3 className="font-bold text-sm text-gray-900 mt-0.5">{listing.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-black text-green-700">${listing.rescuePrice.toFixed(2)}</span>
              <span className="text-xs text-gray-400 line-through">${listing.originalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
              <span className="flex items-center gap-0.5"><Clock size={10} /> {listing.pickupStart}-{listing.pickupEnd}</span>
              <span className="flex items-center gap-0.5"><MapPin size={10} /> {listing.distance}</span>
            </div>
            {!isSoldOut && (
              <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                {listing.quantityLeft} left
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      {!isSoldOut && (
        <button
          onClick={onRescue}
          className="w-full py-2.5 bg-green-50 text-green-700 font-semibold text-sm border-t border-green-100 hover:bg-green-100 active:bg-green-200 transition-colors"
        >
          Rescue This Deal →
        </button>
      )}
    </div>
  );
}
