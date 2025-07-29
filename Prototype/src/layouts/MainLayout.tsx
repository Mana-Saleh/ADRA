// src/layouts/MainLayout.tsx
import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell, FiSearch, FiMenu, FiX, FiUser, 
  FiSettings, FiLogOut, FiMessageSquare
} from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import BottomNavBar from "../components/layout/BottomNavBar";
import adraLogo from '../assets/adra.logo.jpg';

// Light mode color palette (will be extended with dark mode later)
const COLORS = {
  primary: '#3b82f6',      // Blue-500
  primaryLight: '#93c5fd', // Blue-300
  primaryDark: '#1d4ed8',  // Blue-700
  background: '#f9fafb',   // Gray-50
  surface: '#ffffff',      // White
  text: '#111827',         // Gray-900
  textSecondary: '#4b5563',// Gray-600
  border: '#e5e7eb',       // Gray-200
  accent: '#ec4899',       // Pink-500
  success: '#10b981',      // Emerald-500
  warning: '#f59e0b',      // Amber-500
  error: '#ef4444'         // Red-500
};

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type?: 'info' | 'alert' | 'message';
};

const generateNotifications = (): Notification[] => [
  {
    id: '1-' + Date.now(),
    title: "Welcome to ADRA",
    message: "Your account is ready! Start exploring local experiences.",
    time: "Just now",
    isRead: false,
    type: 'info'
  },
  {
    id: '2-' + Date.now(),
    title: "New Message",
    message: "You have a new message from your guide about tomorrow's tour.",
    time: "2 hours ago",
    isRead: false,
    type: 'message'
  },
  {
    id: '3-' + Date.now(),
    title: "Special Offer",
    message: "Exclusive 20% discount on cultural experiences this week!",
    time: "1 day ago",
    isRead: true,
    type: 'info'
  }
];

const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [uiState, setUiState] = useState({
    isSearchOpen: false,
    isMobileMenuOpen: false,
    isNotificationsOpen: false
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);

  // Initialize with sample notifications
  useEffect(() => {
    setNotifications(generateNotifications());
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setUiState({
      isSearchOpen: false,
      isMobileMenuOpen: false,
      isNotificationsOpen: false
    });
  }, [location]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationPanelRef.current && 
          !notificationPanelRef.current.contains(event.target as Node)) {
        setUiState(prev => ({ ...prev, isNotificationsOpen: false }));
      }
    };

    if (uiState.isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [uiState.isNotificationsOpen]);

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Clean Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b" style={{ borderColor: COLORS.border }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <img
                  src={adraLogo}
                  alt="ADRA Logo"
                  className="h-10 w-auto object-contain"
                />
              </motion.div>
            </div>

            {/* Search Bar - Hidden on mobile by default */}
            <div className={`absolute left-4 right-4 top-full mt-2 z-20 transition-all duration-300 ${
              uiState.isSearchOpen ? 'block' : 'hidden'
            } md:static md:block md:flex-1 md:mx-6 md:mt-0`}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  style={{
                    backgroundColor: COLORS.surface,
                    borderColor: COLORS.border
                  }}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center md:hidden text-gray-400 hover:text-gray-600"
                  onClick={() => setUiState(prev => ({ ...prev, isSearchOpen: false }))}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                onClick={() => setUiState(prev => ({ 
                  ...prev, 
                  isSearchOpen: !prev.isSearchOpen,
                  isNotificationsOpen: false
                }))}
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setUiState(prev => ({ 
                    ...prev, 
                    isNotificationsOpen: !prev.isNotificationsOpen,
                    isSearchOpen: false
                  }))}
                  className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                  aria-label="Notifications"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </motion.button>

                {/* Notification Panel */}
                <AnimatePresence>
                  {uiState.isNotificationsOpen && (
                    <motion.div
                      ref={notificationPanelRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border z-40 overflow-hidden"
                      style={{ 
                        borderColor: COLORS.border,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="p-3 border-b flex justify-between items-center" style={{ borderColor: COLORS.border }}>
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                          <button 
                            onClick={handleMarkAllAsRead}
                            className="text-xs font-medium"
                            style={{ color: COLORS.primary }}
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 border-b cursor-pointer transition-colors ${
                                !notification.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'
                              }`}
                              style={{ borderColor: COLORS.border }}
                              onClick={() => handleNotificationRead(notification.id)}
                            >
                              <div className="flex">
                                <div className={`flex-shrink-0 mt-1 mr-3 w-2 h-2 rounded-full ${
                                  notification.isRead ? 'bg-gray-300' : 'bg-blue-500'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate" style={{ color: COLORS.text }}>
                                    {notification.title}
                                  </p>
                                  <p className="text-sm truncate" style={{ color: COLORS.textSecondary }}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs mt-1" style={{ color: COLORS.textSecondary }}>
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center">
                            <FiBell className="mx-auto h-8 w-8 text-gray-300" />
                            <p className="mt-2 font-medium text-gray-500">No notifications</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors md:hidden"
                onClick={() => setUiState(prev => ({ 
                  ...prev, 
                  isMobileMenuOpen: !prev.isMobileMenuOpen,
                  isSearchOpen: false
                }))}
                aria-label="Menu"
              >
                {uiState.isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>

              {/* Desktop User Profile */}
              <div 
                className="hidden md:flex items-center cursor-pointer group"
                onClick={() => navigate('/profile')}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border shadow-sm"
                  style={{ 
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.surface
                  }}
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-5 h-5" style={{ color: COLORS.primary }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {uiState.isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setUiState(prev => ({ ...prev, isMobileMenuOpen: false }))}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <img
                      src={adraLogo}
                      alt="ADRA Logo"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setUiState(prev => ({ ...prev, isMobileMenuOpen: false }))}
                  >
                    <FiX className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-gray-50 flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border shadow-sm"
                    style={{ borderColor: COLORS.border }}
                  >
                    {user?.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-6 h-6" style={{ color: COLORS.primary }} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: COLORS.text }}>
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                      {user?.role || "Traveler"}
                    </p>
                  </div>
                </div>

                <nav className="flex-1 space-y-1">
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 font-medium text-left"
                    style={{ color: COLORS.text }}
                  >
                    <FiUser className="mr-3" style={{ color: COLORS.primary }} />
                    Profile
                  </button>
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 font-medium text-left"
                    style={{ color: COLORS.text }}
                  >
                    <FiSettings className="mr-3" style={{ color: COLORS.primary }} />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 font-medium text-left"
                    style={{ color: COLORS.error }}
                  >
                    <FiLogOut className="mr-3" />
                    Logout
                  </button>
                </nav>

                <div className="mt-auto pt-4 border-t" style={{ borderColor: COLORS.border }}>
                  <p className="text-xs text-center" style={{ color: COLORS.textSecondary }}>
                    ADRA Travel v2.0
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-4">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;