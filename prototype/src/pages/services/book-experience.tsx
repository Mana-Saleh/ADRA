// src/pages/services/book-experience.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiTag, FiHeart, FiShare2, FiClock, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import coffeeImage from '../../assets/coffee.jpg';
// Define the type for an experience
interface Experience {
  id: number;
  title: string;
  description: string;
  image: string;
  category?: string;
  duration?: string;
  location?: string;
  price?: number;
  isFavorite?: boolean;
}

const BookExperience = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
    id: 1,
    title: "Coffee Picking in the Mountains of Asir",
    description: "Participate in coffee harvesting in the farms of the Reth mountains and enjoy the beauty of nature.",
    image: coffeeImage, // Using the imported image
    category: "Agricultural",
    duration: "4 hours",
    location: "Asir Region",
    isFavorite: false
    },
    {
      id: 2,
      title: "Camel Milking Experience",
      description: "A genuine traditional experience in the desert with camels, learning ancient techniques.",
      image: "https://www.arabianbusiness.com/cloud/2023/06/15/Camel-milk.jpg",
      category: "Traditional",
      duration: "2 hours",
      location: "Al-Ula",
      isFavorite: true
    },
    {
      id: 3,
      title: "Honey Harvesting Workshop",
      description: "Experience harvesting native mountain honey with local beekeepers in the scenic valleys.",
      image: "https://www.spa.gov.sa/media/Images/News/2130000/2128321/000-1378770101656671340122.jpg",
      category: "Agricultural",
      duration: "3 hours",
      location: "Taif",
      isFavorite: false
    },
    {
      id: 4,
      title: "Asir Al-Qatt Embroidery Class",
      description: "Learn the art of Asir Al-Qatt embroidery with its vibrant colors and distinctive patterns.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Al-Qatt_Al-Asiri.jpg",
      category: "Cultural",
      duration: "3.5 hours",
      location: "Abha",
      isFavorite: false
    },
    {
      id: 5,
      title: "Traditional Leather Crafting",
      description: "Learn how to make leather products by hand using traditional methods from master craftsmen.",
      image: "https://i.pinimg.com/originals/f5/e5/9a/f5e59a4db2132341071dcfe7e24f3798.jpg",
      category: "Traditional",
      duration: "5 hours",
      location: "Riyadh",
      isFavorite: true
    },
    {
      id: 6,
      title: "Desert Astronomy Night",
      description: "Explore the stars with expert astronomers in the crystal-clear desert skies.",
      image: "https://www.saudia.com/content/dam/saudia-web-assets/images/explore-saudi/astronomy/astronomy.jpg",
      category: "Adventure",
      duration: "6 hours",
      location: "Empty Quarter",
      isFavorite: false
    }
  ]);

  const categories = [...new Set(experiences.map(exp => exp.category))];

  const toggleFavorite = (id: number) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? {...exp, isFavorite: !exp.isFavorite} : exp
    ));
  };

  const handleBookNow = (id: number, title: string) => {
    setIsLoading(id);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(null);
      navigate('/booking-confirmation', { 
        state: { 
          experience: experiences.find(exp => exp.id === id),
          bookingDate: new Date().toLocaleDateString()
        }
      });
    }, 1500);
  };

  const filteredExperiences = selectedCategory 
    ? experiences.filter(exp => exp.category === selectedCategory)
    : experiences;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-800 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/5"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Discover Unique Experiences</h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Immerse yourself in authentic cultural activities and create unforgettable memories.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? 'bg-white text-blue-800' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
              All Experiences
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? 'bg-white text-blue-800' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <AnimatePresence>
          {filteredExperiences.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No experiences found in this category.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 flex flex-col h-full transition-all duration-300"
                >
                  {/* Experience Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/600x400?text=Experience+Image';
                      }}
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(exp.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                      aria-label={exp.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <FiHeart 
                        className={`${exp.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        size={18}
                      />
                    </button>
                    
                    {/* Category Tag */}
                    {exp.category && (
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-xs font-medium shadow-sm">
                        <FiTag className="mr-1.5 text-blue-500" size={12} />
                        <span className="text-blue-700">{exp.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Experience Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h2 className="font-bold text-xl mb-2 line-clamp-2">{exp.title}</h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exp.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {exp.duration && (
                          <div className="flex items-center">
                            <FiClock className="mr-1.5" size={14} />
                            <span>{exp.duration}</span>
                          </div>
                        )}
                        {exp.location && (
                          <div className="flex items-center">
                            <FiMapPin className="mr-1.5" size={14} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        {exp.price && (
                          <div className="text-lg font-bold text-blue-600">
                            ${exp.price.toFixed(2)}
                            <span className="text-sm font-normal text-gray-500 ml-1">/person</span>
                          </div>
                        )}
                        <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <FiShare2 size={18} />
                        </button>
                      </div>
                      
                      {/* Book Now Button */}
                      <button
                        onClick={() => handleBookNow(exp.id, exp.title)}
                        disabled={isLoading === exp.id}
                        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all
                          ${
                            isLoading === exp.id
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-md'
                          }`}
                      >
                        {isLoading === exp.id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Booking...
                          </>
                        ) : (
                          'Book Now'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookExperience;