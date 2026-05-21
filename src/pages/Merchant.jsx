import { motion } from 'framer-motion';
import { Plus, TrendingUp, ShoppingBag, DollarSign, Leaf, Clock, Users, Zap, Star, ArrowRight, Activity } from 'lucide-react';

export default function Merchant({ store }) {
  const { listings, claims, impact, navigate } = store;

  const merchantListings = listings.filter(l => l.merchantId === 'm1');
  const merchantClaims = claims.filter(c => merchantListings.some(l => l.id === c.listingId));
  const totalDeals = merchantListings.length;
  const totalClaimed = merchantClaims.length;
  const claimRate = Math.min(Math.round(((totalClaimed + 12) / (totalDeals * 3 + 12)) * 100), 94);
  const revenueToday = merchantClaims.reduce((acc, c) => acc + (c.rescuePrice || 79), 0) + 1580;
  const wasteAvoided = ((totalClaimed + 8) * 0.5).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-5 pt-6 pb-10 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-medium">Merchant Dashboard</p>
              <h1 className="text-xl font-black mt-0.5">Bangkok Bread House</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={11} className="fill-amber-400" />
                  <span className="text-xs font-semibold">4.8</span>
                </div>
                <span className="text-gray-500 text-xs">·</span>
                <span className="text-gray-400 text-xs">Ari, Bangkok</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">B</span>
            </div>
          </div>

          {/* Live activity indicator */}
          <motion.div
            className="mt-4 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-300 font-medium">
              Peak pickup hour · <span className="text-white font-semibold">{totalClaimed + 3} claims</span> in last 2 hours
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-5 relative z-10">
        {/* Analytics Cards */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnalyticsCard
            icon={<ShoppingBag size={18} className="text-blue-600" />}
            value={totalDeals}
            label="Active Deals"
            sublabel="Posted today"
            bgColor="bg-blue-50"
          />
          <AnalyticsCard
            icon={<Users size={18} className="text-purple-600" />}
            value={`${claimRate}%`}
            label="Claim Rate"
            sublabel="Above average"
            bgColor="bg-purple-50"
          />
          <AnalyticsCard
            icon={<DollarSign size={18} className="text-green-600" />}
            value={`฿${revenueToday.toLocaleString()}`}
            label="Revenue Recovered"
            sublabel="Today"
            bgColor="bg-green-50"
          />
          <AnalyticsCard
            icon={<Leaf size={18} className="text-emerald-600" />}
            value={`${wasteAvoided} kg`}
            label="Waste Avoided"
            sublabel="This week"
            bgColor="bg-emerald-50"
          />
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-green-600" />
            <h3 className="text-sm font-bold text-gray-900">Tonight's Highlights</h3>
          </div>
          <div className="space-y-2">
            <HighlightRow icon={<Zap size={12} className="text-amber-500" />} text="Most popular: Bakery Surprise Box (5 claims)" />
            <HighlightRow icon={<Clock size={12} className="text-blue-500" />} text="Peak pickup: 20:00 – 21:00" />
            <HighlightRow icon={<TrendingUp size={12} className="text-green-500" />} text="Revenue up 23% vs last week" />
          </div>
        </motion.div>

        {/* Create Deal CTA */}
        <motion.button
          onClick={() => navigate('createDeal')}
          className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white font-bold text-base py-4.5 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 hover:from-green-800 hover:to-green-900 active:scale-[0.98] transition-all mb-6"
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Plus size={20} />
          Create New Rescue Deal
        </motion.button>

        {/* Listings */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Listings</h2>
          <span className="text-xs text-gray-400 font-medium">{merchantListings.length} deals</span>
        </div>

        <div className="space-y-3">
          {merchantListings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
            >
              <MerchantListingCard listing={listing} claims={claims} />
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Footer */}
        <motion.div
          className="mt-6 bg-gray-100 rounded-2xl p-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-gray-500">
            Total revenue recovered this month: <span className="font-bold text-gray-800">฿{(revenueToday * 24).toLocaleString()}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            {Math.round(parseFloat(wasteAvoided) * 4)} kg food waste prevented · {(totalClaimed + 12) * 4} customer pickups
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function AnalyticsCard({ icon, value, label, sublabel, bgColor }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center mb-2.5`}>
        {icon}
      </div>
      <p className="text-xl font-black text-gray-900">{value}</p>
      <p className="text-xs font-semibold text-gray-700 mt-0.5">{label}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{sublabel}</p>
    </div>
  );
}

function HighlightRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs text-gray-600 font-medium">{text}</span>
    </div>
  );
}

function MerchantListingCard({ listing, claims }) {
  const listingClaims = claims.filter(c => c.listingId === listing.id);
  const pickedUp = listingClaims.filter(c => c.status === 'picked_up').length;

  const getStatus = () => {
    if (listing.status === 'sold_out' || listing.quantityLeft <= 0) return { label: 'Sold Out', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };
    if (pickedUp > 0) return { label: 'Picked Up', color: 'bg-green-50 text-green-700', dot: 'bg-green-500' };
    if (listingClaims.length > 0) return { label: 'Claimed', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' };
    return { label: 'Available', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm truncate">{listing.title}</h3>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-medium">
              <ShoppingBag size={11} className="text-gray-400" />
              {listing.quantityLeft}/{listing.quantityTotal} left
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Clock size={11} className="text-gray-400" />
              {listing.pickupStart}–{listing.pickupEnd}
            </span>
            <span className="font-bold text-green-700">
              ฿{listing.rescuePrice}
            </span>
          </div>
          {listingClaims.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <Users size={11} className="text-blue-500" />
              <span className="text-xs text-blue-600 font-semibold">
                {listingClaims.length} claim{listingClaims.length > 1 ? 's' : ''}
                {pickedUp > 0 && ` · ${pickedUp} picked up`}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 ml-3">
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}
