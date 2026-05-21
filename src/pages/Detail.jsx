import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Shield, AlertTriangle, Star, Users, Leaf, Heart, Zap, CheckCircle } from 'lucide-react';

export default function Detail({ store }) {
  const { selectedListing, navigate, claimDeal, addToast, merchants } = store;
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!selectedListing) {
    navigate('nearby');
    return null;
  }

  const listing = store.listings.find(l => l.id === selectedListing.id) || selectedListing;
  const merchant = merchants.find(m => m.id === listing.merchantId);
  const isSoldOut = listing.status === 'sold_out' || listing.quantityLeft <= 0;

  const handleConfirmRescue = () => {
    const claim = claimDeal(listing.id);
    if (claim) {
      setShowModal(false);
      addToast('🎉 Rescue confirmed! Your pickup ticket is ready.');
      navigate('ticket', claim);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Hero Image */}
      <div className="relative">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={() => navigate('nearby')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>

        {/* Discount badge */}
        <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-sm px-3.5 py-1.5 rounded-xl shadow-lg">
          -{listing.discountPercent}% OFF
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium">{listing.merchantName}</p>
            <h1 className="text-white text-2xl font-black mt-0.5 drop-shadow-lg">{listing.title}</h1>
          </div>
          {listing.badge && (
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/30">
              {listing.badge}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-5 relative z-10">
        {/* Price Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Price section */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-black text-green-700">฿{listing.rescuePrice}</span>
              <span className="text-lg text-gray-400 line-through">฿{listing.originalPrice}</span>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-1.5">
              <p className="text-xs font-bold text-green-700">Save ฿{listing.originalPrice - listing.rescuePrice}</p>
            </div>
          </div>

          {/* Rescue message */}
          <div className="flex items-center gap-2 mt-3 bg-mint-50 rounded-xl px-3 py-2">
            <Heart size={14} className="text-green-600" />
            <p className="text-xs text-green-700 font-medium">Rescued instead of wasted — thank you!</p>
          </div>

          {/* Urgency row */}
          <div className="flex flex-wrap gap-2 mt-4">
            {listing.quantityLeft <= 3 && !isSoldOut && (
              <motion.span
                className="bg-red-50 text-red-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-red-100 animate-urgency-pulse"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <Zap size={12} /> Only {listing.quantityLeft} left!
              </motion.span>
            )}
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-blue-100">
              <Clock size={12} /> Pickup {listing.pickupStart}–{listing.pickupEnd}
            </span>
            {listing.claimedTonight > 0 && (
              <span className="bg-purple-50 text-purple-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-purple-100">
                <Users size={12} /> {listing.claimedTonight} rescued tonight
              </span>
            )}
          </div>
        </motion.div>

        {/* Merchant Trust Card */}
        <motion.div
          className="mt-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-mint-100 flex items-center justify-center">
              <Leaf size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{listing.merchantName}</h3>
                <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-md">
                  <Shield size={9} className="text-green-600" />
                  <span className="text-[9px] text-green-600 font-bold">{merchant?.trustBadge}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-0.5">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{merchant?.rating}</span>
                </div>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{merchant?.neighborhood}</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{listing.distance}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="mt-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-gray-900 text-sm mb-2">About this rescue</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
        </motion.div>

        {/* Pickup Details */}
        <motion.div
          className="mt-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="font-bold text-gray-900 text-sm mb-3">Pickup Details</h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pickup Window</p>
                <p className="text-sm font-semibold text-gray-900">{listing.pickupStart} – {listing.pickupEnd}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <MapPin size={14} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-semibold text-gray-900">{merchant?.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Allergens */}
        {listing.allergens?.length > 0 && (
          <motion.div
            className="mt-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-bold text-gray-900 text-sm mb-2">Allergen Information</h3>
            <div className="flex flex-wrap gap-2">
              {listing.allergens.map(a => (
                <span key={a} className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-200">
                  {a}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Food Safety Disclaimer */}
        <motion.div
          className="mt-4 bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Please inspect food condition during pickup. RescueBite connects customers with trusted businesses, but final consumption decisions remain the customer's responsibility.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => !isSoldOut && setShowModal(true)}
            disabled={isSoldOut}
            className={`w-full py-4.5 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              isSoldOut
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-800 hover:to-green-900 active:scale-[0.98]'
            }`}
          >
            {isSoldOut ? (
              'Sold Out'
            ) : (
              <>
                <Leaf size={20} />
                Rescue This Meal Now
              </>
            )}
          </button>
          {!isSoldOut && (
            <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">
              Pay ฿{listing.rescuePrice} at pickup · No online payment required
            </p>
          )}
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              
              {/* Success icon */}
              <div className="text-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Leaf size={28} className="text-green-600" />
                </div>
                <h2 className="text-xl font-black text-gray-900">Confirm Rescue Pickup</h2>
                <p className="text-sm text-gray-500 mt-1">You're saving food from waste!</p>
              </div>

              {/* Summary card */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3 text-sm border border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item</span>
                  <span className="font-bold text-gray-900 text-right max-w-[60%] truncate">{listing.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Merchant</span>
                  <span className="font-semibold text-gray-700">{listing.merchantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Window</span>
                  <span className="font-semibold text-gray-700">{listing.pickupStart} – {listing.pickupEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address</span>
                  <span className="font-semibold text-gray-700 text-right max-w-[55%]">{merchant?.address}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-1">
                  <span className="font-bold text-gray-900 text-base">Total (pay at pickup)</span>
                  <span className="font-black text-green-700 text-2xl">฿{listing.rescuePrice}</span>
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 mt-5 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition -mx-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded-md border-gray-300 text-green-600 focus:ring-green-500 flex-shrink-0"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I understand the pickup and food safety terms. I will collect my order within the specified pickup window.
                </span>
              </label>

              {/* Confirm button */}
              <button
                onClick={handleConfirmRescue}
                disabled={!agreed}
                className={`w-full mt-5 py-4.5 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                  agreed
                    ? 'bg-gradient-to-r from-green-700 to-green-800 text-white shadow-xl hover:from-green-800 hover:to-green-900 active:scale-[0.98]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {agreed && <CheckCircle size={18} />}
                Confirm Rescue Pickup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
