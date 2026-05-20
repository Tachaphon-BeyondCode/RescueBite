import { useAppStore } from './store';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import Nearby from './pages/Nearby';
import Detail from './pages/Detail';
import Ticket from './pages/Ticket';
import Impact from './pages/Impact';
import Merchant from './pages/Merchant';
import CreateDeal from './pages/CreateDeal';
import Toast from './components/Toast';
import NavBar from './components/NavBar';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function App() {
  const store = useAppStore();
  const { currentPage, toasts } = store;

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <Landing store={store} />;
      case 'nearby': return <Nearby store={store} />;
      case 'detail': return <Detail store={store} />;
      case 'ticket': return <Ticket store={store} />;
      case 'impact': return <Impact store={store} />;
      case 'merchant': return <Merchant store={store} />;
      case 'createDeal': return <CreateDeal store={store} />;
      default: return <Landing store={store} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.div key={currentPage} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      {currentPage !== 'landing' && <NavBar store={store} />}
      <Toast toasts={toasts} />
    </div>
  );
}
