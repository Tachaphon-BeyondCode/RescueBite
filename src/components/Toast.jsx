import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Leaf } from 'lucide-react';

export default function Toast({ toasts }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[92%] max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-auto ${
              toast.type === 'success'
                ? 'bg-gray-900/90 text-white border border-white/10'
                : 'bg-red-500/90 text-white border border-red-400/20'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              toast.type === 'success' ? 'bg-green-500/20' : 'bg-white/10'
            }`}>
              {toast.type === 'success' ? (
                <Leaf size={16} className="text-green-400" />
              ) : (
                <AlertCircle size={16} className="text-red-200" />
              )}
            </div>
            <span className="font-medium text-sm leading-tight">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
