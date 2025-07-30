// src/pages/home/index.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import {
  FiMessageSquare,
  FiMapPin,
  FiShoppingBag,
  FiCalendar,
  FiUsers,
  FiGlobe,
  FiPlayCircle,
  FiArrowRight,
  FiStar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiTool,
  FiDollarSign,
  FiBookmark // Import the new icon for "Book an Experience"
} from "react-icons/fi";

import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.jpg";
import place1 from "../../assets/place-1.jpg";
import place2 from "../../assets/place-2.jpg";
import short1 from "../../assets/short-1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselImages = [banner1, banner2, banner3];

  // Auto-slide carousel
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering, carouselImages.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Nearby places data
  const nearbyPlaces = [
    {
      name: "Al-Soudah Park",
      distance: "3 min walk",
      rating: 4.8,
      image: place1
    },
    {
      name: "Heritage Village",
      distance: "10 min drive",
      rating: 4.5,
      image: place2
    }
  ];

  // Trending shorts data
  const trendingShorts = [
    { id: 1, title: "Mountain Views", views: "1.2K", image: short1 },
    { id: 2, title: "Local Market", views: "856", image: place2 },
    { id: 3, title: "Cultural Show", views: "2.3K", image: banner3 }
  ];

  // Feature cards with paths for navigation
  const features = [
    {
      name: "smart_guide", // Use translation key
      description: "smart_guide_desc", // Use translation key
      icon: <FiMessageSquare className="text-teal-600" />,
      path: "/services/smart-guide",
      color: "bg-teal-50 border-teal-100"
    },
    {
      name: "discover_nearby",
      description: "discover_nearby_desc",
      icon: <FiMapPin className="text-blue-600" />,
      path: "/services/discover-nearby",
      color: "bg-blue-50 border-blue-100"
    },
    {
      name: "marketplace",
      description: "marketplace_desc",
      icon: <FiShoppingBag className="text-amber-600" />,
      path: "/services/marketplace",
      color: "bg-amber-50 border-amber-100"
    },
    {
      name: "events_activities",
      description: "events_activities_desc",
      icon: <FiCalendar className="text-purple-600" />,
      path: "/services/events-activities",
      color: "bg-purple-50 border-purple-100"
    },
    {
      name: "my_bookings",
      description: "my_bookings_desc",
      icon: <FiUsers className="text-green-600" />,
      path: "/services/my-bookings",
      color: "bg-green-50 border-green-100"
    },
    {
      name: "live_translate",
      description: "live_translate_desc",
      icon: <FiGlobe className="text-cyan-600" />,
      path: "/services/live-translate",
      color: "bg-cyan-50 border-cyan-100"
    },
    {
      name: "local_streams",
      description: "local_streams_desc",
      icon: <FiPlayCircle className="text-red-600" />,
      path: "/services/local-streams",
      color: "bg-red-50 border-red-100"
    },
    {
      name: "preserve_culture",
      description: "preserve_culture_desc",
      icon: <FiTool className="text-violet-600" />,
      path: "/services/preserve-culture",
      color: "bg-violet-50 border-violet-100"
    },
    // --- New Service Card ---
    {
      name: "book_experience", // New translation key
      description: "book_experience_desc", // New translation key
      icon: <FiBookmark className="text-pink-600" />, // New icon
      path: "/services/book-experience", // New path
      color: "bg-pink-50 border-pink-100" // New color scheme
    }
    // --- End of New Service Card ---
  ];

  const handleFeatureClick = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <div className={`w-full min-h-screen bg-gray-50 text-gray-800 pb-20 ${i18n.language === 'ar' ? 'rtl' : ''}`}> {/* Add RTL support */}
      {/* Enhanced Carousel Section */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-b-3xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[current]}
              alt={`banner-${current}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="text-gray-800 text-lg" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Next slide"
        >
          <FiChevronRight className="text-gray-800 text-lg" />
        </button>
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="max-w-md">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-bold text-white mb-1"
            >
              {t('discover_local_experiences')} {/* Translated text */}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-sm mb-3"
            >
              {t('connect_with_authentic_culture')} {/* Translated text */}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/shorts')}
              className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-gray-100 transition-colors shadow"
            >
              {t('explore_now')} <FiArrowRight className="ml-2 text-xs" /> {/* Translated text */}
            </motion.button>
          </div>
        </div>
        {/* Dots Indicator */}
        <div className="absolute bottom-3 right-4 flex space-x-1.5">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? "bg-white w-5" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Features Grid - Adjusted for 3 columns including the new card */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('our_services')}</h2> {/* Translated text */}
          <button
            onClick={() => navigate('/overview')}
            className="text-sm text-teal-600 font-medium"
          >
            {t('view_all')} {/* Translated text */}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              onClick={() => handleFeatureClick(feature.path)}
              className={`
                group relative bg-white rounded-xl p-4 border shadow-sm
                hover:shadow-lg transition-all duration-300
                cursor-pointer
                ${feature.color}
              `}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                <div className="text-xl p-2 rounded-md bg-gray-50">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-bold text-sm mb-1 flex items-start">
                {t(feature.name)} {/* Translated feature name */}
              </h3>
              <p className="text-xs text-gray-600 mb-3 min-h-[32px]">{t(feature.description)}</p> {/* Translated description */}
              <div className="mt-1 text-teal-600 text-xs font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {t('explore_now')} <FiArrowRight className="ml-1 text-[10px]" /> {/* Translated text */}
              </div>
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Wallet Balance Preview */}
      <div className="px-4 mb-6">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden"
          onClick={() => navigate('/overview')}
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5"></div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h3 className="font-bold text-lg">{t('your_wallet')}</h3> {/* Translated text */}
              <p className="text-white/80 text-sm mt-1">{t('manage_credits')}</p> {/* Translated text */}
            </div>
            <div className="text-right relative z-10">
              <p className="text-white/80 text-sm">{t('balance')}</p> {/* Translated text */}
              <div className="text-2xl font-bold mt-1 flex items-center justify-end">
                <img
                  src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
                  alt="SAR"
                  className="w-5 h-5 mr-1 filter invert"
                />
                45.50
              </div>
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold flex items-center hover:bg-gray-100 transition-colors">
              {t('add_funds')} <FiArrowRight className="ml-2" /> {/* Translated text */}
            </button>
          </div>
        </div>
      </div>
      {/* Nearby Places Section */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">{t('nearby_hotspots')}</h2> {/* Translated text */}
          <button
            onClick={() => navigate('/services/nearby-places')}
            className="text-sm text-blue-600 font-medium"
          >
            {t('see_all')} {/* Translated text */}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {nearbyPlaces.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/services/nearby-places')}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
            >
              <div className="h-32 relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                  <FiStar className="text-amber-400 mr-1 text-xs" />
                  <span className="text-xs font-bold">{place.rating}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1">{place.name}</h3>
                <p className="text-xs text-gray-600 flex items-center">
                  <FiMapPin className="mr-1 text-blue-500 text-xs" /> {place.distance}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Trending Shorts Section */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">{t('trending_videos')}</h2> {/* Translated text */}
          <button
            onClick={() => navigate('/shorts')}
            className="text-sm text-blue-600 font-medium"
          >
            {t('see_all')} {/* Translated text */}
          </button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {trendingShorts.map((short, index) => (
            <motion.div
              key={short.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/shorts')}
              className="flex-shrink-0 w-32 cursor-pointer"
            >
              <div className="bg-gray-200 aspect-[9/16] rounded-xl relative overflow-hidden shadow">
                <img
                  src={short.image}
                  alt={short.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/30 p-1.5 rounded-full">
                  <FiPlayCircle className="text-white text-lg" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-6">
                  <p className="text-white font-bold text-xs truncate">{short.title}</p>
                  <p className="text-white/80 text-[10px]">{short.views} views</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Enhanced Hot Offer Card */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-3">{t('todays_special')}</h2> {/* Translated text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">{t('offer_title')}</h3> {/* Translated text */}
              <p className="text-xs text-gray-600 mb-2">{t('offer_sub')}</p> {/* Translated text */}
              <button
                onClick={() => navigate('/services/shop-local')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                {t('claim_offer')} {/* Translated text */}
              </button>
            </div>
            <div className="text-xs text-amber-700 flex items-center bg-amber-100 px-2 py-1 rounded-full">
              <FiClock className="mr-1" /> {t('offer_expires')} {/* Translated text */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;