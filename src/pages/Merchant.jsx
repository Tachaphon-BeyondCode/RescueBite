import { motion } from 'framer-motion';
import { Plus, TrendingUp, ShoppingBag, DollarSign, Leaf, Clock, Users } from 'lucide-react';

export default function Merchant({ store }) {
  const { listings, claims, impact, navigate } = store;

  const merchantListings = listings.filter(l => l.merchantId === 'm1');
  const merchantClaims = claims.filter(c => merchantListings.some(l => l.id === c.listingId));
  const totalDeals = merchantListings.length;
  const totalClaimed = merchantClaims.length;
  const claimRate = totalDeals > 0 ? Math.round((totalClaimed / (totalDeals * 3)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 text-white px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <p className="text-green-300 text-sm font-medium">Dashboard</p>
          <h1 className="text-2xl font-black mt-1">Good evening, FreshBake Cafe</h1>
          <p className="text-green-200/70 text-sm mt-1">Manage your rescue deals</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <AnalyticsCard icon={<ShoppingBag size={18} />} value={totalDeals} label="Deals Posted" color="bg-blue-50 text-blue-600" />
          <AnalyticsCard icon={<Users size={18} />} value={`${Math.min(claimRate + 45, 92)}%`} label="Claim Rate" color="bg-purple-50 text-purple-600" />
          <AnalyticsCard icon={<DollarSign size={18} />} value={`$${(impact.revenueRecovered * 0.08).toFixed(0)}`} label="Revenue Recovered" color="bg-green-50 text-green-600" />
          <AnalyticsCard icon={<Leaf size={18} />} value={`${(impact.wasteReducedKg * 0.1).toFixed(0)} kg`} label="Waste Avoided" color="bg-emerald-50 text-emerald-600" />
        </div>

        {/* Create Deal CTA */}
        <motion.button
          onClick={() => navigate('createDeal')}
          className="w-full bg-green-700 text-white font-bold text-base py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-green-800 active:scale-[0.98] transition-all mb-6"
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={20} />
          Create New Rescue Deal
        </motion.button>

        {/* Listings */}
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Your Active Listings</h2>
        <div className="space-y-3">
          {merchantListings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MerchantListingCard listing={listing} claims={claims} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({ icon, value, label, color }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-xl font-black text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

function MerchantListingCard({ listing, claims }) {
  const listingClaims = claims.filter(c => c.listingId === listing.id);
  const pickedUp = listingClaims.filter(c => c.status === 'picked_up').length;

  const getStatus = () => {
    if (listing.status === 'sold_out' || listing.quantityLeft <= 0) return { label: 'Sold Out', color: 'bg-gray-100 text-gray-600' };
    if (pickedUp > 0) return { label: 'Picked Up', color: 'bg-green-100 text-green-700' };
    if (listingClaims.length > 0) return { label: 'Claimed', color: 'bg-blue-100 text-blue-700' };
    return { label: 'Available', color: 'bg-emerald-100 text-emerald-700' };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm">{listing.title}</h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShoppingBag size={11} /> {listing.quantityLeft}/{listing.quantityTotal} remaining
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {listing.pickupStart}-{listing.pickupEnd}
            </span>
          </div>
          {listingClaims.length > 0 && (
            <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
              <Users size={11} />
              <span className="font-medium">{listingClaims.length} claim{listingClaims.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status.color}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
}
