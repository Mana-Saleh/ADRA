import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaHeart, 
  FaShoppingCart, 
  FaUser,
  FaPlayCircle,
  FaCalendarCheck
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BottomTabs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();

  const tabs = [
    { 
      id: 'discover', 
      icon: <FaHome className="text-lg" />,
      label: t('tabs.discover'),
      path: '/discover'
    },
    { 
      id: 'shorts', 
      icon: <FaPlayCircle className="text-lg" />,
      label: t('tabs.shorts'),
      path: '/shorts'
    },
    { 
      id: 'bookings', 
      icon: <FaCalendarCheck className="text-lg" />,
      label: t('tabs.bookings'),
      path: '/bookings'
    },
    { 
      id: 'wishlist', 
      icon: <FaHeart className="text-lg" />,
      label: t('tabs.wishlist'),
      path: '/wishlist'
    },
    { 
      id: 'profile', 
      icon: <FaUser className="text-lg" />,
      label: t('tabs.profile'),
      path: '/profile'
    }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="grid grid-cols-5">
        {tabs.map((tab) => {
          const isActive = currentPath.startsWith(tab.path);
          
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`relative flex flex-col items-center justify-center py-3 px-1 transition-colors duration-200 ${
                isActive 
                  ? 'text-deep-teal-600 dark:text-deep-teal-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-deep-teal-500 dark:hover:text-deep-teal-300'
              }`}
              aria-label={tab.label}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                {tab.icon}
              </motion.div>
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
              
              {isActive && (
                <motion.div 
                  className="absolute top-0 w-full h-1 bg-deep-teal-600 dark:bg-deep-teal-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  layoutId="activeTabIndicator"
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomTabs;
