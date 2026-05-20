import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Sparkles } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setPublishing(true);
    
    setTimeout(() => {
      publishDeal({
        title: form.title || 'Fresh Rescue Box',
        category: form.category,
        description: form.description || 'Freshly prepared items ready for rescue.',
        originalPrice: parseFloat(form.originalPrice) || 15.00,
        rescuePrice: parseFloat(form.rescuePrice) || 5.99,
        quantityTotal: parseInt(form.quantityTotal) || 5,
        pickupStart: form.pickupStart,
        pickupEnd: form.pickupEnd,
        expiryTime: form.expiryTime,
        allergens: form.allergens ? form.allergens.split(',').map(s => s.trim()) : ['Gluten'],
      });
      setPublishing(false);
      navigate('merchant');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('merchant')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Create Rescue Deal</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 pt-6 space-y-4">
        {/* Image Upload Placeholder */}
        <div className="w-full h-40 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition">
          <Camera size={32} className="text-gray-400" />
          <span className="text-sm text-gray-500 font-medium">Add food photo</span>
          <span className="text-xs text-gray-400">Tap to upload</span>
        </div>

        {/* Deal Title */}
        <InputField label="Deal Title" placeholder="e.g., Evening Pastry Box" value={form.title} onChange={handleChange('title')} />

        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Category</label>
          <select
            value={form.category}
            onChange={handleChange('category')}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition appearance-none"
          >
            <option value="Bakery">Bakery</option>
            <option value="Meals">Meals</option>
            <option value="Drinks">Drinks</option>
            <option value="Supermarket">Supermarket</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Description</label>
          <textarea
            placeholder="Describe what's included in this rescue deal..."
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition resize-none"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Original Price ($)" placeholder="15.00" value={form.originalPrice} onChange={handleChange('originalPrice')} type="number" />
          <InputField label="Rescue Price ($)" placeholder="5.99" value={form.rescuePrice} onChange={handleChange('rescuePrice')} type="number" />
        </div>

        {/* Quantity */}
        <InputField label="Quantity Available" placeholder="5" value={form.quantityTotal} onChange={handleChange('quantityTotal')} type="number" />

        {/* Time fields */}
        <div className="grid grid-cols-3 gap-3">
          <InputField label="Pickup Start" value={form.pickupStart} onChange={handleChange('pickupStart')} type="time" />
          <InputField label="Pickup End" value={form.pickupEnd} onChange={handleChange('pickupEnd')} type="time" />
          <InputField label="Expiry" value={form.expiryTime} onChange={handleChange('expiryTime')} type="time" />
        </div>

        {/* Allergens */}
        <InputField label="Allergens (comma-separated)" placeholder="Gluten, Dairy, Nuts" value={form.allergens} onChange={handleChange('allergens')} />

        {/* Pickup Instructions */}
        <InputField label="Pickup Instructions" placeholder="Enter through main door, ask at counter" value={form.pickupInstructions} onChange={handleChange('pickupInstructions')} />

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={publishing}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all ${
            publishing
              ? 'bg-green-600 text-white'
              : 'bg-green-700 text-white hover:bg-green-800 active:scale-[0.98]'
          }`}
          whileTap={{ scale: 0.97 }}
        >
          {publishing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Sparkles size={20} />
              </motion.div>
              Publishing...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Publish Rescue Deal Live
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
      {label && <label className="text-sm font-semibold text-gray-700 mb-1.5 block">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition"
      />
    </div>
  );
}
