import { motion } from 'framer-motion';
import { ArrowLeft, Heart, DollarSign, Leaf, TrendingUp, Award, Flame, BarChart3 } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Impact({ store }) {
  const { impact, navigate, claims } = store;
  const pickedUpCount = claims.filter(c => c.status === 'picked_up').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('landing')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Impact Hub</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Level Badge */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-600 text-white px-5 py-2.5 rounded-full shadow-lg">
            <Award size={18} />
            <span className="font-bold text-sm">Food Rescue Hero — Level 3</span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-orange-500">
              <Flame size={16} />
              <span className="text-sm font-bold">{3 + pickedUpCount} day streak</span>
            </div>
          </div>
        </motion.div>

        {/* Customer Impact */}
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Your Impact</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <ImpactMetricCard
            icon={<Heart size={20} className="text-pink-500" />}
            value={impact.mealsRescued}
            label="Meals Rescued"
            color="bg-pink-50"
            delay={0}
          />
          <ImpactMetricCard
            icon={<DollarSign size={20} className="text-green-600" />}
            value={impact.moneySaved}
            label="Money Saved"
            prefix="$"
            color="bg-green-50"
            delay={0.1}
          />
          <ImpactMetricCard
            icon={<Leaf size={20} className="text-emerald-500" />}
            value={impact.wasteReducedKg}
            label="Waste Reduced"
            suffix=" kg"
            color="bg-emerald-50"
            delay={0.2}
          />
          <ImpactMetricCard
            icon={<TrendingUp size={20} className="text-blue-500" />}
            value={impact.carbonPreventedKg}
            label="CO₂ Prevented"
            suffix=" kg"
            color="bg-blue-50"
            delay={0.3}
          />
        </div>

        {/* Progress Bars */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-green-600" />
            Weekly Goals
          </h3>
          <ProgressBar label="Meals rescued this week" current={7 + pickedUpCount} target={10} color="bg-green-500" />
          <ProgressBar label="Money saved this week" current={42} target={50} color="bg-blue-500" prefix="$" />
          <ProgressBar label="Waste diverted" current={3.5} target={5} color="bg-emerald-500" suffix=" kg" />
        </motion.div>

        {/* Merchant Impact */}
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Community Stats</h2>
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-4">
            <StatRow label="Revenue Recovered" value={`$${impact.revenueRecovered.toLocaleString()}`} trend="+12%" />
            <StatRow label="Active Merchants" value="47" trend="+5" />
            <StatRow label="Customer Pickups" value="892" trend="+8%" />
            <StatRow label="Food Waste Diverted" value={`${impact.wasteReducedKg} kg`} trend="+15%" />
          </div>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-bold text-gray-900 mb-4">Weekly Trend</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {[40, 55, 45, 70, 65, 80, 90].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-green-200 rounded-t-lg relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
              >
                <div className="absolute inset-x-0 bottom-0 bg-green-500 rounded-t-lg" style={{ height: '60%' }} />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ImpactMetricCard({ icon, value, label, prefix = '', suffix = '', color, delay }) {
  return (
    <motion.div
      className={`${color} rounded-2xl p-4 border border-gray-100`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-black text-gray-900">
        {prefix}<AnimatedCounter target={value} />{suffix}
      </div>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

function ProgressBar({ label, current, target, color, prefix = '', suffix = '' }) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-500">{prefix}{current}{suffix} / {prefix}{target}{suffix}</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
}

function StatRow({ label, value, trend }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900">{value}</span>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{trend}</span>
      </div>
    </div>
  );
}
