import { motion } from 'framer-motion';
import { Heart, DollarSign, Leaf, TrendingUp, Award, Flame, BarChart3, Users, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Impact({ store }) {
  const { impact, navigate, claims } = store;
  const pickedUpCount = claims.filter(c => c.status === 'picked_up').length;
  const totalSavedPersonal = claims.filter(c => c.status === 'picked_up').reduce((acc, c) => acc + (c.originalPrice - c.rescuePrice), 0);

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white px-5 pt-6 pb-10 rounded-b-[2rem] relative overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-mint-400/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-lg mx-auto">
          <p className="text-green-300/80 text-xs font-semibold uppercase tracking-wider">Your Impact</p>
          <h1 className="text-2xl font-black mt-1">You're making a difference</h1>
          <p className="text-green-200/60 text-sm mt-1">Every rescue counts for Bangkok</p>

          {/* Level & Streak */}
          <motion.div
            className="flex items-center gap-3 mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3.5 py-2">
              <Trophy size={16} className="text-amber-300" />
              <div>
                <p className="text-[9px] text-green-200/70 font-medium">Level</p>
                <p className="text-sm font-black leading-tight">Food Hero 3</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3.5 py-2">
              <Flame size={16} className="text-orange-300" />
              <div>
                <p className="text-[9px] text-green-200/70 font-medium">Streak</p>
                <p className="text-sm font-black leading-tight">{3 + pickedUpCount} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3.5 py-2">
              <Sparkles size={16} className="text-purple-300" />
              <div>
                <p className="text-[9px] text-green-200/70 font-medium">Rank</p>
                <p className="text-sm font-black leading-tight">Top 12%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-5 relative z-10">
        {/* Personal Impact Cards */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart size={16} className="text-rose-500" />
            <h2 className="font-bold text-gray-900 text-sm">Your Personal Impact</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <ImpactMetricCard
              icon={<Heart size={20} className="text-rose-500" />}
              value={impact.mealsRescued}
              label="Meals Rescued"
              bgColor="bg-rose-50"
              delay={0.35}
            />
            <ImpactMetricCard
              icon={<DollarSign size={20} className="text-green-600" />}
              value={impact.moneySaved}
              label="Baht Saved"
              prefix="฿"
              bgColor="bg-green-50"
              delay={0.4}
            />
            <ImpactMetricCard
              icon={<Leaf size={20} className="text-emerald-500" />}
              value={impact.wasteReducedKg}
              label="kg Waste Reduced"
              bgColor="bg-emerald-50"
              delay={0.45}
            />
            <ImpactMetricCard
              icon={<TrendingUp size={20} className="text-blue-500" />}
              value={impact.carbonPreventedKg}
              label="kg CO₂ Prevented"
              bgColor="bg-blue-50"
              delay={0.5}
            />
          </div>
        </motion.div>

        {/* Emotional messaging */}
        <motion.div
          className="bg-gradient-to-r from-green-50 to-mint-50 rounded-2xl p-5 mb-5 border border-green-100/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">
              You helped rescue <span className="text-green-700">{impact.mealsRescued.toLocaleString()}</span> meals
            </p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Equivalent to preventing <span className="font-bold text-gray-700">{impact.carbonPreventedKg.toLocaleString()} kg of CO₂</span> emissions — 
              that's like taking <span className="font-bold text-gray-700">{Math.round(impact.carbonPreventedKg / 2100)} cars</span> off the road for a year.
            </p>
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <BarChart3 size={16} className="text-green-600" />
              Weekly Goals
            </h3>
            <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">This week</span>
          </div>
          <ProgressBar label="Meals rescued" current={7 + pickedUpCount} target={10} color="bg-green-500" />
          <ProgressBar label="Money saved" current={920 + totalSavedPersonal} target={1500} color="bg-blue-500" prefix="฿" />
          <ProgressBar label="Waste diverted" current={3.5 + pickedUpCount * 0.5} target={5} color="bg-emerald-500" suffix=" kg" />
        </motion.div>

        {/* Weekly Trend Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <h3 className="font-bold text-gray-900 text-sm mb-4">Rescue Activity</h3>
          <div className="flex items-end justify-between gap-2 h-28">
            {[35, 50, 42, 68, 55, 78, 90].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-lg overflow-hidden bg-gray-100"
                style={{ height: '100%' }}
              >
                <motion.div
                  className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-lg mt-auto"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                  style={{ marginTop: `${100 - h}%` }}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2.5 text-[10px] text-gray-400 font-medium">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} className="flex-1 text-center">{d}</span>
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-purple-500" />
            <h3 className="font-bold text-gray-900 text-sm">Bangkok Community</h3>
          </div>
          <div className="space-y-3.5">
            <StatRow label="Revenue Recovered" value={`฿${impact.revenueRecovered.toLocaleString()}`} trend="+12%" />
            <StatRow label="Active Merchants" value={`${impact.activeMerchants}`} trend="+5" />
            <StatRow label="Customer Pickups" value={`${impact.activeCustomers}`} trend="+8%" />
            <StatRow label="Food Waste Diverted" value={`${impact.wasteReducedKg} kg`} trend="+15%" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => navigate('nearby')}
            className="inline-flex items-center gap-2 text-green-700 font-bold text-sm hover:text-green-800 transition"
          >
            Rescue more food tonight
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function ImpactMetricCard({ icon, value, label, prefix = '', suffix = '', bgColor, delay }) {
  return (
    <motion.div
      className={`${bgColor} rounded-xl p-3.5 border border-gray-100/50`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="mb-1.5">{icon}</div>
      <div className="text-xl font-black text-gray-900">
        {prefix}<AnimatedCounter target={value} />{suffix}
      </div>
      <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{label}</p>
    </motion.div>
  );
}

function ProgressBar({ label, current, target, color, prefix = '', suffix = '' }) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div className="mb-3.5 last:mb-0">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-700 font-semibold">{label}</span>
        <span className="text-gray-500 font-medium">{prefix}{typeof current === 'number' ? (current % 1 === 0 ? current : current.toFixed(1)) : current}{suffix} / {prefix}{target}{suffix}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        >
          {pct >= 20 && (
            <div className="absolute inset-0 animate-shimmer rounded-full" />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function StatRow({ label, value, trend }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900 text-sm">{value}</span>
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">{trend}</span>
      </div>
    </div>
  );
}
