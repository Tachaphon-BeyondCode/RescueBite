import { Home, MapPin, Ticket, BarChart3, Store } from 'lucide-react';

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2">
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
              currentPage === id ? 'text-green-700 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} strokeWidth={currentPage === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
