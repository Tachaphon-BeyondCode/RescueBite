import { Home, MapPin, Ticket, BarChart3, Store } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NavBar({ store }) {
  const { currentPage, navigate } = store;

  const items = [
    { id: 'landing', icon: Home, label: 'Home' },
    { id: 'nearby', icon: MapPin, label: 'Nearby' },
    { id: 'ticket', icon: Ticket, label: 'Tickets' },
    { id: 'impact', icon: BarChart3, label: 'Impact' },
    { id: 'merchant', icon: Store, label: 'Merchant' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-2">
        {items.map(({ id, icon: Icon, label }) => {
          const isActive = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]"
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-green-50 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <div className="relative z-10">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-green-700' : 'text-gray-400'
                  }`}
                />
              </div>
              <span className={`relative z-10 text-[10px] font-semibold transition-colors duration-200 ${
                isActive ? 'text-green-700' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
