// src/components/layout/TopNavBar.tsx
import React from 'react';
import { FiGlobe, FiSearch, FiBell } from 'react-icons/fi'; // Added FiBell
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import { useTranslation } from 'react-i18next';
import adraLogo from '../../assets/icons/adra.logo.jpg';

const TopNavBar = () => {
  const { i18n, t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { isDarkMode } = useTheme();

  const currentLanguage = i18n.language === 'ar' ? 'AR' : 'EN';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className={`
      sticky top-0 z-50 
      bg-white/90 dark:bg-gray-900/90 
      backdrop-blur-md shadow-sm 
      border-b border-gray-200 dark:border-gray-800
      transition-colors duration-300
    `}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Brand */}
          <div className="flex items-center shrink-0">
            <img 
              src={adraLogo} 
              alt="ADRA Logo"
              className="h-8 w-auto mr-2"
            />
            <span className={`
              text-xl font-bold 
              text-deep-teal-600 dark:text-deep-teal-400
              hidden sm:block
            `}>
              {t('navbar.brand')}
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <FiSearch className={`
                absolute left-3 top-1/2 -translate-y-1/2 
                text-deep-teal-400 dark:text-deep-teal-500
                transition-colors duration-200
              `} />
              <input
                type="text"
                placeholder={t('navbar.search_placeholder')}
                className={`
                  w-full pl-10 pr-4 py-2 
                  rounded-full 
                  bg-gray-100 dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border-none 
                  focus:ring-2 focus:ring-deep-teal-400
                  placeholder-gray-500 dark:placeholder-gray-400
                  transition-colors duration-200
                `}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <button 
              className={`
                p-2 rounded-full 
                hover:bg-deep-teal-50 dark:hover:bg-deep-teal-900/30 
                transition-colors duration-200
              `}
              onClick={toggleLanguage}
              aria-label={t('navbar.language_toggle') || "Change language"}
            >
              <div className="flex items-center">
                <FiGlobe className={`
                  w-5 h-5 
                  text-deep-teal-600 dark:text-deep-teal-400
                  transition-colors duration-200
                `} />
                <span className={`
                  ml-1 text-sm hidden sm:inline
                  text-deep-teal-600 dark:text-deep-teal-400
                  transition-colors duration-200
                `}>
                  {currentLanguage}
                </span>
              </div>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Icon */}
            <button 
              className={`
                p-2 rounded-full 
                hover:bg-deep-teal-50 dark:hover:bg-deep-teal-900/30 
                transition-colors duration-200
                relative
              `}
              aria-label={t('navbar.notifications') || "Notifications"}
            >
              <FiBell className={`
                w-5 h-5 
                text-deep-teal-600 dark:text-deep-teal-400
                transition-colors duration-200
              `} />
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Removed User Profile Icon */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;