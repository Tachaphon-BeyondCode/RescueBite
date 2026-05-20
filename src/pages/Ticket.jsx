import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, MapPin, QrCode, Sparkles } from 'lucide-react';

export default function Ticket({ store }) {
  const { selectedListing, claims, navigate, markPickedUp, addToast } = store;

  // Find the latest claim or use selectedListing
  const claim = selectedListing?.ticketCode
    ? selectedListing
    : claims[claims.length - 1];

  if (!claim) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-6">
        <QrCode size={64} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">No Active Tickets</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Rescue a deal to get your digital pickup ticket!</p>
        <button
          onClick={() => navigate('nearby')}
          className="bg-green-700 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Browse Deals
        </button>
      </div>
    );
  }

  const isPickedUp = claim.status === 'picked_up';

  const handlePickup = () => {
    markPickedUp(claim.id);
    addToast('Pickup complete! Thank you for rescuing food! 🌱');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 max-w-lg mx-auto">
        <button
          onClick={() => navigate('nearby')}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Pickup Ticket</h1>
      </div>

      {/* Ticket Card */}
      <motion.div
        className="max-w-sm mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className={`rounded-3xl overflow-hidden shadow-2xl ${isPickedUp ? 'bg-green-700' : 'bg-white'}`}>
          {/* Top section */}
          <div className={`p-6 text-center ${isPickedUp ? 'text-white' : 'text-gray-900'}`}>
            {isPickedUp ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <Sparkles size={48} className="mx-auto mb-3 text-green-200" />
                <h2 className="text-2xl font-black">Rescued!</h2>
                <p className="text-green-200 text-sm mt-1">Food saved from waste</p>
              </motion.div>
            ) : (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-black">Ready for Pickup</h2>
                <p className="text-gray-500 text-sm mt-1">Show this ticket at the store</p>
              </>
            )}
          </div>

          {/* Perforated edge */}
          <div className={`h-5 relative ${isPickedUp ? 'bg-green-700' : 'bg-white'}`}>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-50 rounded-full -ml-2.5"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-50 rounded-full -mr-2.5"></div>
            <div className={`absolute inset-x-6 top-1/2 border-t-2 border-dashed ${isPickedUp ? 'border-green-600' : 'border-gray-200'}`}></div>
          </div>

          {/* Bottom section */}
          <div className={`p-6 ${isPickedUp ? 'text-white' : ''}`}>
            {/* QR Code placeholder */}
            <div className={`w-32 h-32 mx-auto rounded-xl ${isPickedUp ? 'bg-green-600' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
              <QrCode size={64} className={isPickedUp ? 'text-green-300' : 'text-gray-400'} />
            </div>

            {/* Ticket ID */}
            <div className="text-center mb-4">
              <p className={`text-xs ${isPickedUp ? 'text-green-300' : 'text-gray-400'} font-medium`}>TICKET ID</p>
              <p className="text-2xl font-black tracking-wider mt-0.5">{claim.ticketCode}</p>
            </div>

            {/* Details */}
            <div className={`space-y-3 text-sm ${isPickedUp ? 'text-green-100' : 'text-gray-600'}`}>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <ShoppingIcon /> {claim.title}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Clock size={14} /> Pickup
                </span>
                <span className="font-semibold">{claim.pickupWindow}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> Address
                </span>
                <span className="font-semibold">{claim.address}</span>
              </div>
              <div className={`flex justify-between items-center pt-3 border-t ${isPickedUp ? 'border-green-600' : 'border-gray-200'}`}>
                <span className="font-bold">Amount Due</span>
                <span className="text-xl font-black">${claim.rescuePrice?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!isPickedUp && (
          <motion.button
            onClick={handlePickup}
            className="w-full mt-5 py-4 bg-green-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-green-800 active:scale-[0.98] transition-all"
            whileTap={{ scale: 0.97 }}
          >
            Mark as Picked Up
          </motion.button>
        )}

        {isPickedUp && (
          <motion.button
            onClick={() => navigate('impact')}
            className="w-full mt-5 py-4 bg-white text-green-700 font-bold text-lg rounded-2xl shadow-md border border-green-200 hover:bg-green-50 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            View Your Impact →
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

function ShoppingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}
