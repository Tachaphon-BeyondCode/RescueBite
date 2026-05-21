import { motion } from 'framer-motion';
import { Leaf, DollarSign, Store, TrendingUp, ArrowRight, Heart, Sparkles, Users, Clock, MapPin } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Landing({ store }) {
  const { navigate, impact } = store;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white px-6 pt-10 pb-16 overflow-hidden">
        {/* Ambient light effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-mint-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between mb-12">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-400 to-mint-400 flex items-center justify-center shadow-lg">
              <Leaf className="text-white" size={22} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">RescueBite</span>
              <p className="text-[10px] text-green-300/80 font-medium -mt-0.5">Bangkok</p>
            </div>
          </div>
          <button onClick={() => navigate('nearby')} className="text-sm text-green-300/80 font-medium hover:text-white transition-all">
            Skip →
          </button>
        </header>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Live activity badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow" />
            <span className="text-xs font-medium text-green-100">{impact.rescuesTonight} meals rescued tonight in Bangkok</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] mb-5 tracking-tight">
            Rescue food.<br />
            <span className="bg-gradient-to-r from-green-300 via-mint-300 to-green-200 bg-clip-text text-transparent">
              Save money.
            </span><br />
            <span className="text-white/90">Reduce waste.</span>
          </h1>

          <p className="text-base md:text-lg text-green-100/70 leading-relaxed max-w-sm mx-auto">
            Discover discounted surplus meals from trusted restaurants and bakeries near you — before they close tonight.
          </p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => navigate('nearby')}
              className="w-full bg-white text-green-900 font-bold text-lg px-8 py-4.5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <MapPin size={20} />
              Find Food Near Me
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('merchant')}
              className="w-full bg-white/10 border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-2xl hover:bg-white/15 active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
            >
              <Store size={18} className="inline mr-2" />
              Merchant Demo
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Floating Rescue Cards Preview */}
      <section className="relative -mt-8 px-4 pb-8 z-20">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                  <Sparkles size={14} className="text-green-600" />
                </div>
                <span className="text-sm font-bold text-gray-800">Live Rescues Near You</span>
              </div>
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            
            <div className="space-y-2.5">
              {[
                { name: 'Bakery Surprise Box', merchant: 'Bangkok Bread House', price: '฿79', original: '฿199', badge: 'Popular', time: '20:00–21:30' },
                { name: 'Premium Sushi Set', merchant: 'Sakura Sushi Bar', price: '฿149', original: '฿349', badge: 'Selling Fast', time: '21:00–21:45' },
                { name: 'Coffee & Croissant Set', merchant: 'Ari Coffee Lab', price: '฿59', original: '฿149', badge: null, time: '18:00–19:30' },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-50 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-mint-100 flex items-center justify-center flex-shrink-0">
                    <Leaf size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock size={9} /> {item.time} · {item.merchant}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-black text-green-700">{item.price}</p>
                    <p className="text-[10px] text-gray-400 line-through">{item.original}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <section className="px-5 py-10 bg-white">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-center text-2xl font-black text-gray-900 mb-2">Why RescueBite?</h2>
          <p className="text-center text-sm text-gray-500 mb-8">Join the food rescue movement in Bangkok</p>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: DollarSign, title: 'Save up to 70%', desc: 'Premium food at rescue prices', color: 'bg-green-50 text-green-600' },
              { icon: Leaf, title: 'Reduce Waste', desc: 'Every meal rescued matters', color: 'bg-emerald-50 text-emerald-600' },
              { icon: Store, title: 'Support Local', desc: 'Help Bangkok businesses thrive', color: 'bg-blue-50 text-blue-600' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                  <Icon size={24} />
                </div>
                <p className="font-bold text-xs text-gray-900">{title}</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Community Impact Section */}
      <section className="px-5 py-10 bg-gray-50">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-3">
              <Users size={12} />
              Bangkok Community Impact
            </div>
            <h2 className="text-2xl font-black text-gray-900">Together, we're making a difference</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ImpactCard
              icon={<Heart size={20} className="text-rose-500" />}
              value={impact.mealsRescued}
              label="Meals Rescued"
              bgColor="bg-rose-50"
            />
            <ImpactCard
              icon={<DollarSign size={20} className="text-green-600" />}
              value={impact.moneySaved}
              label="Baht Saved"
              prefix="฿"
              bgColor="bg-green-50"
            />
            <ImpactCard
              icon={<Leaf size={20} className="text-emerald-500" />}
              value={impact.wasteReducedKg}
              label="kg Waste Reduced"
              suffix=" kg"
              bgColor="bg-emerald-50"
            />
            <ImpactCard
              icon={<TrendingUp size={20} className="text-blue-500" />}
              value={impact.carbonPreventedKg}
              label="kg CO₂ Prevented"
              suffix=" kg"
              bgColor="bg-blue-50"
            />
          </div>

          {/* Social proof */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{impact.activeMerchants} merchants</span> and{' '}
              <span className="font-semibold text-gray-700">{impact.activeCustomers}+ customers</span> in Bangkok
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-10 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-center text-xl font-black text-gray-900 mb-6">How it works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Discover', desc: 'Browse rescue deals from nearby restaurants and bakeries', icon: MapPin },
              { step: '2', title: 'Rescue', desc: 'Claim your meal at up to 70% off before closing time', icon: Heart },
              { step: '3', title: 'Pickup', desc: 'Show your digital ticket and collect your food', icon: Sparkles },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={step}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.15 }}
              >
                <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                  {step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-10 bg-gradient-to-br from-green-50 to-mint-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">Ready to rescue?</h2>
          <p className="text-sm text-gray-500 mb-6">Good food is waiting near you tonight</p>
          <button
            onClick={() => navigate('nearby')}
            className="btn-primary text-lg px-10 py-4 rounded-2xl inline-flex items-center gap-2"
          >
            Start Rescuing
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Reset Demo */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={store.resetDemo}
          className="bg-gray-900/70 backdrop-blur text-white text-[10px] px-3 py-1.5 rounded-full hover:bg-gray-900/90 transition shadow-lg"
        >
          Reset Demo
        </button>
      </div>
    </div>
  );
}

function ImpactCard({ icon, value, label, prefix = '', suffix = '', bgColor }) {
  return (
    <motion.div
      className={`${bgColor} rounded-2xl p-4 text-center border border-gray-100/50`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-black text-gray-900">
        {prefix}<AnimatedCounter target={value} />{suffix}
      </div>
      <p className="text-[11px] text-gray-500 mt-1 font-medium">{label}</p>
    </motion.div>
  );
}
