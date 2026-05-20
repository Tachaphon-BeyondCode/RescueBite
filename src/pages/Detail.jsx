import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Shield, AlertTriangle, Star, Users } from 'lucide-react';

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
      addToast('Rescue confirmed! Your pickup ticket is ready.');
      navigate('ticket', claim);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Image */}
      <div className="relative">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          onClick={() => navigate('nearby')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="absolute top-4 right-4 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full">
          -{listing.discountPercent}% OFF
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 relative">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          {/* Merchant info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Star size={14} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">{listing.merchantName}</p>
              <div className="flex items-center gap-1">
                <Shield size={10} className="text-green-600" />
                <span className="text-[10px] text-green-600 font-medium">{merchant?.trustBadge || 'Verified Partner'}</span>
                <span className="text-[10px] text-gray-400 ml-1">⭐ {merchant?.rating || 4.7}</span>
              </div>
            </div>
          </div>

          {/* Title & Price */}
          <h1 className="text-2xl font-black text-gray-900">{listing.title}</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{listing.description}</p>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-black text-green-700">${listing.rescuePrice.toFixed(2)}</span>
            <span className="text-lg text-gray-400 line-through">${listing.originalPrice.toFixed(2)}</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Save ${(listing.originalPrice - listing.rescuePrice).toFixed(2)}
            </span>
          </div>

          {/* Urgency */}
          <div className="flex gap-2 mt-4">
            {listing.quantityLeft <= 3 && !isSoldOut && (
              <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                <Users size={12} /> Only {listing.quantityLeft} left
              </span>
            )}
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
              <Clock size={12} /> Pickup {listing.pickupStart} - {listing.pickupEnd}
            </span>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{merchant?.address || listing.distance}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400" />
              <span>Pickup window: {listing.pickupStart} - {listing.pickupEnd}</span>
            </div>
          </div>

          {/* Allergens */}
          {listing.allergens?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Allergens</p>
              <div className="flex flex-wrap gap-1.5">
                {listing.allergens.map(a => (
                  <span key={a} className="bg-yellow-50 text-yellow-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-yellow-200">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Food Safety Disclaimer */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Please inspect food condition during pickup. RescueBite connects customers with trusted businesses, but final consumption decisions remain the customer's responsibility.
          </p>
        </div>

        {/* CTA */}
        <motion.div className="mt-6" whileTap={{ scale: 0.97 }}>
          <button
            onClick={() => !isSoldOut && setShowModal(true)}
            disabled={isSoldOut}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 ${
              isSoldOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900'
            }`}
          >
            {isSoldOut ? 'Sold Out' : 'Rescue This Meal Now'}
          </button>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Rescue Pickup</h2>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item</span>
                  <span className="font-semibold">{listing.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Window</span>
                  <span className="font-semibold">{listing.pickupStart} - {listing.pickupEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address</span>
                  <span className="font-semibold">{merchant?.address}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-black text-green-700 text-lg">${listing.rescuePrice.toFixed(2)}</span>
                </div>
              </div>

              <label className="flex items-start gap-3 mt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I understand the pickup and food safety terms. I will collect my order within the specified pickup window.
                </span>
              </label>

              <button
                onClick={handleConfirmRescue}
                disabled={!agreed}
                className={`w-full mt-5 py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
                  agreed
                    ? 'bg-green-700 text-white shadow-lg hover:bg-green-800 active:scale-[0.98]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Rescue Pickup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
