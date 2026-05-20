import { motion } from 'framer-motion';
import { Leaf, DollarSign, Store, TrendingUp, ArrowRight, Heart } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Landing({ store }) {
  const { navigate, impact } = store;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-950 text-white overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-green-400/20 flex items-center justify-center">
            <Leaf className="text-green-300" size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">RescueBite</span>
        </div>
        <button onClick={() => navigate('nearby')} className="text-sm text-green-300 font-medium hover:text-white transition">
          Skip →
        </button>
      </header>

      {/* Hero */}
      <section className="px-6 pt-8 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-700/50 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <Heart size={14} className="text-green-300" />
            <span className="text-xs font-medium text-green-200">Saving food, saving money</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Rescue good food<br />
            <span className="text-green-300">before it becomes waste.</span>
          </h1>
          <p className="text-green-200/80 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Discover discounted surplus meals from trusted local food businesses near you.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={() => navigate('nearby')}
            className="bg-white text-green-900 font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            Find Food Near Me
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate('merchant')}
            className="bg-green-700/50 border border-green-500/40 text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-green-700/70 active:scale-[0.98] transition-all duration-200"
          >
            Merchant Demo
          </button>
        </motion.div>
      </section>

      {/* Benefits */}
      <motion.section
        className="px-6 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          {[
            { icon: DollarSign, title: 'Save Money', desc: 'Up to 70% off' },
            { icon: Leaf, title: 'Reduce Waste', desc: 'Fight food waste' },
            { icon: Store, title: 'Support Local', desc: 'Help businesses' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-green-800/50 border border-green-600/30 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-green-400/20 flex items-center justify-center mx-auto mb-2">
                <Icon size={20} className="text-green-300" />
              </div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-green-300/70 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Impact Metrics */}
      <motion.section
        className="px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-center text-sm font-semibold text-green-300 uppercase tracking-wider mb-4">
          Community Impact
        </h2>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <ImpactCard value={impact.mealsRescued} label="Meals Rescued" icon={<Heart size={18} />} />
          <ImpactCard value={impact.moneySaved} label="Money Saved" prefix="$" icon={<DollarSign size={18} />} />
          <ImpactCard value={impact.wasteReducedKg} label="Waste Reduced" suffix=" kg" icon={<Leaf size={18} />} />
          <ImpactCard value={impact.carbonPreventedKg} label="CO₂ Prevented" suffix=" kg" icon={<TrendingUp size={18} />} />
        </div>
      </motion.section>

      {/* Phone Mockup Preview */}
      <motion.section
        className="px-6 pb-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="max-w-xs mx-auto bg-gray-900 rounded-[2rem] p-3 shadow-2xl border border-gray-700">
          <div className="bg-white rounded-[1.5rem] p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                <Leaf size={12} className="text-green-600" />
              </div>
              <span className="text-xs font-bold text-gray-800">Nearby Deals</span>
            </div>
            {[
              { name: 'Bakery Box', price: '$6.99', color: 'bg-amber-50' },
              { name: 'Sushi Set', price: '$8.99', color: 'bg-pink-50' },
              { name: 'Salad Bowl', price: '$4.99', color: 'bg-green-50' },
            ].map(item => (
              <div key={item.name} className={`${item.color} rounded-xl p-3 flex items-center justify-between`}>
                <span className="text-xs font-medium text-gray-700">{item.name}</span>
                <span className="text-xs font-bold text-green-700">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reset Demo */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={store.resetDemo}
          className="bg-green-700/50 border border-green-500/30 text-green-300 text-xs px-3 py-1.5 rounded-full hover:bg-green-600/50 transition"
        >
          Reset Demo
        </button>
      </div>
    </div>
  );
}

function ImpactCard({ value, label, prefix = '', suffix = '', icon }) {
  return (
    <div className="bg-green-800/40 border border-green-600/30 rounded-2xl p-4 text-center">
      <div className="text-green-300/60 flex justify-center mb-1">{icon}</div>
      <div className="text-2xl font-black text-white">
        {prefix}<AnimatedCounter target={value} />{suffix}
      </div>
      <p className="text-xs text-green-300/70 mt-1">{label}</p>
    </div>
  );
}
