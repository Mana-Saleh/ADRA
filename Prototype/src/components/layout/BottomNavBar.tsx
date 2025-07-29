// src/components/layout/BottomNavBar.tsx
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';

const PRIMARY_COLOR = '#2a9d8f';
const PRIMARY_COLOR_RGB = '42, 157, 143';
const PRIMARY_COLOR_HOVER = '#227d72';

const NavButton = ({ service }: { service: any }) => {
  const IconComponent = FiIcons[service.icon as keyof typeof FiIcons] || FiIcons.FiBox;

  return (
    <NavLink
      to={service.path}
      className="flex flex-col items-center justify-center w-full h-full relative"
    >
      {({ isActive }) => (
        <>
          <AnimatePresence>
            {isActive && service.isClickable && (
              <motion.div 
                className="absolute -top-2.5 h-1 w-8 rounded-full"
                style={{ backgroundColor: PRIMARY_COLOR }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 32, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className={`
              flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300
              ${isActive && service.isClickable 
                ? 'bg-white shadow-lg' 
                : 'bg-transparent'}
            `}
            style={
              isActive && service.isClickable
                ? {
                    boxShadow: `0 4px 16px rgba(${PRIMARY_COLOR_RGB}, 0.25)`,
                    border: `1px solid rgba(${PRIMARY_COLOR_RGB}, 0.15)`,
                  }
                : {}
            }
            whileHover={
              service.isClickable
                ? {
                    y: -3,
                    backgroundColor: isActive ? 'white' : 'rgba(243, 244, 246, 0.7)',
                  }
                : {}
            }
            whileTap={service.isClickable ? { scale: 0.9 } : {}}
          >
            <IconComponent
              className="text-xl transition-all duration-300"
              style={{
                transform: isActive ? 'scale(1.25)' : 'scale(1)',
                color: isActive && service.isClickable ? PRIMARY_COLOR : '#9ca3af',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
            />
          </motion.div>
        </>
      )}
    </NavLink>
  );
};

const BottomNavBar = () => {
  const location = useLocation();

  const hideNavBarRoutes = ['/shorts'];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

  if (shouldHideNavBar) return null;

  const sideServices = [
    { path: '/', icon: 'FiHome', isClickable: true },
    { path: '/shorts', icon: 'FiPlay', isClickable: true },
    { path: '/guide', icon: 'FiCompass', isClickable: true },
    { path: '/services/marketplace', icon: 'FiShoppingCart', isClickable: true },
    { path: '/profile', icon: 'FiUser', isClickable: true },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 h-18 w-[90%] max-w-sm mx-auto 
                    bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl 
                    shadow-2xl z-50">
      <div className="grid grid-cols-5 h-full">
        {sideServices.map((service) => (
          <NavButton key={service.path} service={service} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;