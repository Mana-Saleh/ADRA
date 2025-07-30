// src/pages/services/book-experiences.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiStar,
  FiFilter,
  FiSearch,
  FiHeart,
  FiUser,
  FiDollarSign,
  FiInfo,
  FiChevronRight
} from "react-icons/fi";

const BookExperiences = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([2]); // Mock favorite IDs

  // Mock categories
  const categories = [
    "All",
    "Cultural",
    "Adventure",
    "Food & Drink",
    "Workshops",
    "Nature"
  ];

  // Mock experiences data
  const experiences = [
    {
      id: 1,
      title: "Traditional Pottery Workshop",
      description: "Learn the ancient art of pottery from a local master craftsman.",
      location: "Old Town Art Center",
      duration: "2 hours",
      price: 45.00,
      rating: 4.8,
      reviews: 124,
      category: "Workshops",
      image: "", // Add image path if available
      date: "Daily at 10:00 AM & 2:00 PM"
    },
    {
      id: 2,
      title: "Sunset Desert Safari",
      description: "Experience the breathtaking desert landscape with dune bashing and camel riding.",
      location: "Red Dunes Reserve",
      duration: "4 hours",
      price: 89.00,
      rating: 4.9,
      reviews: 312,
      category: "Adventure",
      image: "", // Add image path if available
      date: "Daily at 4:00 PM"
    },
    {
      id: 3,
      title: "Historic City Walking Tour",
      description: "Explore 500 years of history with our expert local guide.",
      location: "Historic District",
      duration: "2.5 hours",
      price: 25.00,
      rating: 4.7,
      reviews: 89,
      category: "Cultural",
      image: "", // Add image path if available
      date: "Mon, Wed, Fri at 9:00 AM"
    },
    {
      id: 4,
      title: "Authentic Cooking Class",
      description: "Cook traditional dishes with a local family in their home.",
      location: "Local Family Home",
      duration: "3 hours",
      price: 65.00,
      rating: 4.9,
      reviews: 205,
      category: "Food & Drink",
      image: "", // Add image path if available
      date: "Tue, Thu, Sat at 6:00 PM"
    },
    {
      id: 5,
      title: "Mountain Hiking Adventure",
      description: "Guided hike to the scenic peak with panoramic views.",
      location: "Green Mountains",
      duration: "5 hours",
      price: 40.00,
      rating: 4.6,
      reviews: 76,
      category: "Nature",
      image: "", // Add image path if available
      date: "Sat & Sun at 7:00 AM"
    }
  ];

  // Filter experiences based on search and category
  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Header */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <FiCalendar className="text-purple-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Book Experiences</h1>
              <p className="text-gray-600 text-sm">Reserve unique local activities</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">
            {selectedCategory === "All" ? "All Experiences" : selectedCategory}
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({filteredExperiences.length})
            </span>
          </h2>
          <button className="text-sm text-purple-600 font-medium flex items-center">
            Filter <FiFilter className="ml-1" />
          </button>
        </div>
        
        <div className="space-y-5">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Experience Image Placeholder */}
              <div className="h-40 bg-gradient-to-r from-purple-400 to-indigo-500 relative">
                {exp.image ? (
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white/20 border-2 border-dashed border-white/30 rounded-xl w-16 h-16" />
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(exp.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <FiHeart 
                    className={favorites.includes(exp.id) ? "text-red-500 fill-current" : "text-gray-700"} 
                  />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <FiStar className="text-amber-400 mr-1 text-sm" />
                  <span className="text-white text-sm font-bold">{exp.rating}</span>
                  <span className="text-white/80 text-xs ml-1">({exp.reviews})</span>
                </div>
              </div>
              
              {/* Experience Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{exp.title}</h3>
                  <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                    <FiDollarSign className="text-amber-600 text-sm" />
                    <span className="text-amber-700 font-bold">{exp.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{exp.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiMapPin className="mr-2 text-purple-500" />
                    <span className="truncate">{exp.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiClock className="mr-2 text-purple-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiCalendar className="mr-2 text-purple-500" />
                    <span className="truncate">{exp.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiUser className="mr-2 text-purple-500" />
                    <span>{exp.category}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <button className="text-sm text-purple-600 font-medium flex items-center">
                    <FiInfo className="mr-1" /> Details
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-purple-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-purple-600 transition-colors shadow-sm"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredExperiences.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-1">No Experiences Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-purple-600 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Popular Times Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-3">Popular Booking Times</h2>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-3">
            {[
              { time: "Morning", slots: "8 AM - 12 PM", count: 12 },
              { time: "Afternoon", slots: "12 PM - 5 PM", count: 24 },
              { time: "Evening", slots: "5 PM - 9 PM", count: 8 }
            ].map((slot, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100"
              >
                <div className="font-bold text-purple-700">{slot.time}</div>
                <div className="text-xs text-purple-600 mt-1">{slot.slots}</div>
                <div className="text-xs bg-white px-2 py-1 rounded-full mt-2 inline-block">
                  {slot.count} available
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookExperiences;