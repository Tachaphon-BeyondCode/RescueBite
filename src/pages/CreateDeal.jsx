import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Sparkles, Leaf, Clock, Tag, FileText, AlertCircle, Package } from 'lucide-react';

export default function CreateDeal({ store }) {
  const { navigate, publishDeal } = store;
  const [form, setForm] = useState({
    title: '',
    category: 'Bakery',
    description: '',
    originalPrice: '',
    rescuePrice: '',
    quantityTotal: '',
    pickupStart: '20:00',
    pickupEnd: '21:30',
    expiryTime: '22:00',
    allergens: '',
    pickupInstructions: '',
  });
  const [publishing, setPublishing] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const discount = form.originalPrice && form.rescuePrice
    ? Math.round((1 - parseFloat(form.rescuePrice) / parseFloat(form.originalPrice)) * 100)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPublishing(true);
    
    setTimeout(() => {
      publishDeal({
        title: form.title || 'Evening Rescue Box',
        category: form.category,
        description: form.description || 'Freshly prepared items ready for rescue. Assorted selection from today.',
        originalPrice: parseFloat(form.originalPrice) || 199,
        rescuePrice: parseFloat(form.rescuePrice) || 79,
        quantityTotal: parseInt(form.quantityTotal) || 5,
        pickupStart: form.pickupStart,
        pickupEnd: form.pickupEnd,
        expiryTime: form.expiryTime,
        allergens: form.allergens ? form.allergens.split(',').map(s => s.trim()) : ['Gluten'],
      });
      setPublishing(false);
      navigate('merchant');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('merchant')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Create Rescue Deal</h1>
            <p className="text-[11px] text-gray-500">Bangkok Bread House · Ari</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {/* Image Upload */}
        <motion.div
          className="w-full h-44 bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-300 hover:bg-green-50/30 transition-all shadow-sm"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Camera size={24} className="text-gray-400" />
          </div>
          <span className="text-sm text-gray-600 font-semibold">Add food photo</span>
          <span className="text-[10px] text-gray-400">Tap to upload · Helps customers see what they'll get</span>
        </motion.div>

        {/* Deal Title */}
        <InputField
          icon={<Tag size={16} className="text-gray-400" />}
          label="Deal Title"
          placeholder="e.g., Evening Pastry Box, End-of-Day Bread Pack"
          value={form.title}
          onChange={handleChange('title')}
        />

        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Category</label>
          <select
            value={form.category}
            onChange={handleChange('category')}
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition appearance-none"
          >
            <option value="Bakery">Bakery</option>
            <option value="Meals">Meals</option>
            <option value="Drinks">Drinks</option>
            <option value="Supermarket">Supermarket</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
            <FileText size={14} className="text-gray-400" />
            Description
          </label>
          <textarea
            placeholder="Describe what's included in this rescue box. Be specific — it builds trust with customers."
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition resize-none"
          />
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
            <Tag size={14} className="text-green-600" />
            Pricing (THB)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Original Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">฿</span>
                <input
                  type="number"
                  placeholder="199"
                  value={form.originalPrice}
                  onChange={handleChange('originalPrice')}
                  className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Rescue Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-sm font-bold">฿</span>
                <input
                  type="number"
                  placeholder="79"
                  value={form.rescuePrice}
                  onChange={handleChange('rescuePrice')}
                  className="w-full pl-8 pr-3 py-3 bg-green-50 border border-green-200 rounded-xl text-sm font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition"
                />
              </div>
            </div>
          </div>
          {discount > 0 && (
            <motion.div
              className="mt-3 flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Sparkles size={12} className="text-green-600" />
              <span className="text-xs font-semibold text-green-700">
                {discount}% discount — Great rescue price for customers!
              </span>
            </motion.div>
          )}
        </div>

        {/* Quantity */}
        <InputField
          icon={<Package size={16} className="text-gray-400" />}
          label="Quantity Available"
          placeholder="e.g., 5"
          value={form.quantityTotal}
          onChange={handleChange('quantityTotal')}
          type="number"
        />

        {/* Time fields */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
            <Clock size={14} className="text-blue-500" />
            Pickup Schedule
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Start</label>
              <input
                type="time"
                value={form.pickupStart}
                onChange={handleChange('pickupStart')}
                className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">End</label>
              <input
                type="time"
                value={form.pickupEnd}
                onChange={handleChange('pickupEnd')}
                className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Expiry</label>
              <input
                type="time"
                value={form.expiryTime}
                onChange={handleChange('expiryTime')}
                className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 transition"
              />
            </div>
          </div>
        </div>

        {/* Allergens */}
        <InputField
          icon={<AlertCircle size={16} className="text-amber-500" />}
          label="Allergens (comma-separated)"
          placeholder="e.g., Gluten, Dairy, Nuts, Eggs"
          value={form.allergens}
          onChange={handleChange('allergens')}
        />

        {/* Pickup Instructions */}
        <InputField
          icon={<FileText size={16} className="text-gray-400" />}
          label="Pickup Instructions"
          placeholder="e.g., Enter through main door, ask at counter"
          value={form.pickupInstructions}
          onChange={handleChange('pickupInstructions')}
        />

        {/* Info note */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2.5">
          <Leaf size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Your rescue deal will appear instantly on the nearby customer feed. Customers can claim and pick up during your specified window.
          </p>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={publishing}
          className={`w-full py-4.5 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2.5 transition-all ${
            publishing
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-800 hover:to-green-900 active:scale-[0.98]'
          }`}
          whileTap={!publishing ? { scale: 0.97 } : {}}
        >
          {publishing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Sparkles size={20} />
              </motion.div>
              Publishing Live...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Publish Rescue Deal Live
            </>
          )}
        </motion.button>
        <p className="text-center text-[10px] text-gray-400 pb-4">
          Deal will be visible to all customers nearby instantly
        </p>
      </form>
    </div>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div>
      {label && (
        <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
          {icon}
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition"
      />
    </div>
  );
}
