import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, MapPin, QrCode, Sparkles, Leaf, PartyPopper, Heart } from 'lucide-react';

export default function Ticket({ store }) {
  const { selectedListing, claims, navigate, markPickedUp, addToast } = store;

  // Find the latest claim or use selectedListing
  const claim = selectedListing?.ticketCode
    ? selectedListing
    : claims[claims.length - 1];

  if (!claim) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <QrCode size={36} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-black text-gray-800 mb-2">No Active Tickets</h2>
          <p className="text-sm text-gray-500 text-center mb-8 max-w-xs">Rescue a deal to get your digital pickup ticket!</p>
          <button
            onClick={() => navigate('nearby')}
            className="btn-primary text-base px-8 py-3.5 rounded-xl inline-flex items-center gap-2"
          >
            <Leaf size={18} />
            Browse Deals
          </button>
        </motion.div>
      </div>
    );
  }

  const isPickedUp = claim.status === 'picked_up';

  return (
    <div className="min-h-screen pb-28 px-4 pt-4" style={{ background: isPickedUp ? 'linear-gradient(180deg, #ecfdf5 0%, #f0fdf4 50%, #ffffff 100%)' : 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 max-w-lg mx-auto">
        <button
          onClick={() => navigate('nearby')}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Pickup Ticket</h1>
          <p className="text-[11px] text-gray-500">Show this at the store</p>
        </div>
      </div>

      {/* Ticket */}
      <motion.div
        className="max-w-sm mx-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {isPickedUp ? <CompletedTicket claim={claim} navigate={navigate} /> : <ActiveTicket claim={claim} markPickedUp={markPickedUp} addToast={addToast} />}
      </motion.div>
    </div>
  );
}

function ActiveTicket({ claim, markPickedUp, addToast }) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endTime = claim.pickupWindow?.split('–')[1]?.trim() || '21:30';
      const [h, m] = endTime.split(':').map(Number);
      const end = new Date();
      end.setHours(h, m, 0);
      if (end < now) end.setDate(end.getDate() + 1);
      const diff = end - now;
      const mins = Math.floor(diff / 60000);
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      setCountdown(hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins} min`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 30000);
    return () => clearInterval(interval);
  }, [claim]);

  const handlePickup = () => {
    markPickedUp(claim.id);
    addToast('🌱 Pickup complete! You just rescued a meal from waste!');
  };

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-glow-pulse">
        {/* Status Header */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-center text-white relative overflow-hidden">
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-mint-400/15 rounded-full blur-2xl" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="relative z-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-black">Ready for Pickup</h2>
            <p className="text-green-100 text-sm mt-1">Show this ticket at the counter</p>
          </motion.div>
        </div>

        {/* Countdown bar */}
        <div className="bg-amber-50 border-b border-amber-100 px-5 py-2.5 flex items-center justify-center gap-2">
          <Clock size={13} className="text-amber-600" />
          <span className="text-xs font-bold text-amber-700">Pickup closes in {countdown}</span>
        </div>

        {/* Perforated edge */}
        <div className="relative h-6">
          <div className="ticket-edge-left" />
          <div className="ticket-edge-right" />
          <div className="absolute inset-x-8 top-1/2 border-t-2 border-dashed border-gray-200" />
        </div>

        {/* QR Code section */}
        <div className="px-6 pt-2 pb-4">
          <div className="w-36 h-36 mx-auto rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-2">
            <QrCode size={56} className="text-gray-400" />
            <span className="text-[9px] text-gray-400 mt-1.5 font-medium">Scan at pickup</span>
          </div>

          {/* Ticket ID */}
          <div className="text-center mb-5">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Ticket ID</p>
            <p className="text-2xl font-black text-gray-900 tracking-wider mt-0.5">{claim.ticketCode}</p>
          </div>

          {/* Ticket Details */}
          <div className="space-y-3 text-sm">
            <DetailRow icon={<Leaf size={14} className="text-green-600" />} label="Item" value={claim.title} />
            <DetailRow icon={<Clock size={14} className="text-blue-500" />} label="Pickup" value={claim.pickupWindow} />
            <DetailRow icon={<MapPin size={14} className="text-red-400" />} label="Address" value={claim.address} />
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-900">Amount Due</span>
              <span className="text-2xl font-black text-green-700">฿{claim.rescuePrice}</span>
            </div>
            <p className="text-[10px] text-gray-400 text-center">Pay at pickup · Cash or promptpay accepted</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        onClick={handlePickup}
        className="w-full mt-6 py-4.5 bg-gradient-to-r from-green-700 to-green-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:from-green-800 hover:to-green-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        whileTap={{ scale: 0.97 }}
      >
        <CheckCircle size={20} />
        Mark as Picked Up
      </motion.button>
      <p className="text-center text-[10px] text-gray-400 mt-2">Tap after collecting your food</p>
    </>
  );
}

function CompletedTicket({ claim, navigate }) {
  return (
    <>
      {/* Celebration particles */}
      <motion.div className="relative">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              x: (Math.random() - 0.5) * 120,
              y: -(Math.random() * 100 + 40),
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          >
            <div className={`w-3 h-3 rounded-full ${['bg-green-400', 'bg-mint-400', 'bg-amber-400', 'bg-pink-400', 'bg-blue-400', 'bg-purple-400'][i]}`} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Completed Header */}
        <div className="p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-mint-400/15 rounded-full blur-3xl" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <PartyPopper size={48} className="mx-auto mb-3 text-green-200" />
            </motion.div>
            <h2 className="text-2xl font-black">Food Rescued!</h2>
            <p className="text-green-200 text-sm mt-1.5">You saved a meal from waste tonight</p>
          </motion.div>
        </div>

        {/* Perforated edge */}
        <div className="relative h-6">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full -ml-3" style={{ background: 'linear-gradient(180deg, #ecfdf5, #f0fdf4)' }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full -mr-3" style={{ background: 'linear-gradient(180deg, #ecfdf5, #f0fdf4)' }} />
          <div className="absolute inset-x-8 top-1/2 border-t-2 border-dashed border-green-600/30" />
        </div>

        {/* Completed Details */}
        <div className="px-6 pb-6 text-white">
          {/* Impact badge */}
          <motion.div
            className="bg-white/10 backdrop-blur rounded-xl p-3 mb-4 text-center border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 text-xs">
              <div>
                <p className="text-green-200 text-[10px]">Saved</p>
                <p className="font-black text-lg">฿{claim.originalPrice - claim.rescuePrice}</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-green-200 text-[10px]">Waste Prevented</p>
                <p className="font-black text-lg">~0.5 kg</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-green-200 text-[10px]">CO₂ Saved</p>
                <p className="font-black text-lg">~1.5 kg</p>
              </div>
            </div>
          </motion.div>

          {/* Ticket info */}
          <div className="space-y-2.5 text-sm text-green-100">
            <div className="flex justify-between">
              <span className="text-green-300/80">Ticket</span>
              <span className="font-bold">{claim.ticketCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300/80">Item</span>
              <span className="font-semibold truncate ml-4">{claim.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300/80">From</span>
              <span className="font-semibold">{claim.merchantName}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="font-bold text-white">Paid</span>
              <span className="font-black text-xl">฿{claim.rescuePrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post-pickup actions */}
      <motion.div
        className="mt-6 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={() => navigate('impact')}
          className="w-full py-4 bg-white text-green-700 font-bold text-base rounded-2xl shadow-md border border-green-100 hover:bg-green-50 transition-all flex items-center justify-center gap-2"
        >
          <Heart size={18} />
          View Your Impact
        </button>
        <button
          onClick={() => navigate('nearby')}
          className="w-full py-3 text-gray-500 font-semibold text-sm hover:text-gray-700 transition"
        >
          Rescue more food →
        </button>
      </motion.div>
    </>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs">{label}</span>
      </span>
      <span className="font-semibold text-gray-900 text-sm text-right max-w-[55%] truncate">{value}</span>
    </div>
  );
}
