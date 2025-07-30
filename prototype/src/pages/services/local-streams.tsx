// src/pages/services/live-events.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiVideo,
  FiUsers,
  FiMapPin,
  FiClock,
  FiStar,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiCalendar,
  FiFilter,
  FiSearch,
  FiPlay,
  FiPause,
  FiChevronRight
} from "react-icons/fi";

const LiveEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([1]); // Mock favorite IDs
  const [liveStatus, setLiveStatus] = useState<{[key: number]: boolean}>({
    1: true,
    2: false,
    3: true,
    4: false
  });

  // Mock categories
  const categories = [
    "All",
    "Cultural",
    "Entertainment",
    "Workshops",
    "Community"
  ];

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Traditional Music Performance",
      host: "Al-Andalus Cultural Center",
      viewers: 1240,
      likes: 320,
      comments: 42,
      description: "Experience authentic traditional music performed by local artists.",
      category: "Cultural",
      location: "City Cultural Hall",
      startTime: "Live Now",
      duration: "2 hours",
      isLive: true,
      image: "", // Add image path if available
      tags: ["Music", "Tradition", "Local"]
    },
    {
      id: 2,
      title: "Cooking Masterclass: Local Delicacies",
      host: "Chef Ahmed's Kitchen",
      viewers: 0,
      likes: 0,
      comments: 0,
      description: "Learn to cook traditional dishes with our expert chef.",
      category: "Workshops",
      location: "Online",
      startTime: "Today, 6:00 PM",
      duration: "1.5 hours",
      isLive: false,
      image: "", // Add image path if available
      tags: ["Cooking", "Food", "Tutorial"]
    },
    {
      id: 3,
      title: "City Heritage Walking Tour (Live)",
      host: "Historic Guides SA",
      viewers: 890,
      likes: 156,
      comments: 28,
      description: "Explore the historic district with our live guide commentary.",
      category: "Community",
      location: "Historic District",
      startTime: "Live Now",
      duration: "3 hours",
      isLive: true,
      image: "", // Add image path if available
      tags: ["Tour", "History", "Walking"]
    },
    {
      id: 4,
      title: "Local Art Exhibition Opening",
      host: "Modern Art Gallery",
      viewers: 0,
      likes: 0,
      comments: 0,
      description: "Virtual opening of our new contemporary art exhibition.",
      category: "Cultural",
      location: "Art Gallery",
      startTime: "Tomorrow, 7:00 PM",
      duration: "2 hours",
      isLive: false,
      image: "", // Add image path if available
      tags: ["Art", "Exhibition", "Virtual"]
    }
  ];

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
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

  // Toggle live status (simulating user interaction)
  const toggleLiveStatus = (id: number) => {
    setLiveStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Header */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <FiVideo className="text-red-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Live Events</h1>
              <p className="text-gray-600 text-sm">Join real-time local experiences</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
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
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Events Section */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Live Now</h2>
          <button className="text-sm text-red-600 font-medium">View All</button>
        </div>
        
        <div className="space-y-5">
          {filteredEvents.filter(event => event.isLive).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Event Image/Video Placeholder with Live Indicator */}
              <div className="h-48 bg-gradient-to-r from-red-400 to-orange-500 relative">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white/20 border-2 border-dashed border-white/30 rounded-xl w-16 h-16" />
                  </div>
                )}
                
                {/* Live Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                  LIVE
                </div>
                
                {/* Play/Pause Button */}
                <button
                  onClick={() => toggleLiveStatus(event.id)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                >
                  {liveStatus[event.id] ? (
                    <FiPause className="text-white text-xl" />
                  ) : (
                    <FiPlay className="text-white text-xl ml-1" />
                  )}
                </button>
                
                {/* Viewers Count */}
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <FiUsers className="text-white mr-1 text-sm" />
                  <span className="text-white text-sm">
                    {event.viewers > 1000 
                      ? `${(event.viewers / 1000).toFixed(1)}K` 
                      : event.viewers} viewers
                  </span>
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(event.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <FiHeart 
                    className={favorites.includes(event.id) ? "text-red-500 fill-current" : "text-gray-700"} 
                  />
                </button>
              </div>
              
              {/* Event Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <FiUsers className="mr-2 text-red-500" />
                  <span>Hosted by {event.host}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiMapPin className="mr-2 text-red-500" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiClock className="mr-2 text-red-500" />
                    <span>{event.duration}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-red-500">
                      <FiHeart className="mr-1" />
                      <span>{event.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-red-500">
                      <FiMessageSquare className="mr-1" />
                      <span>{event.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-red-500">
                      <FiShare2 className="mr-1" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition-colors shadow-sm flex items-center"
                  >
                    Join Live
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredEvents.filter(event => event.isLive).length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="text-gray-400 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-1">No Live Events Right Now</h3>
              <p className="text-gray-600">
                Check back later or explore upcoming events
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Upcoming Events</h2>
          <button className="text-sm text-red-600 font-medium flex items-center">
            View Calendar <FiCalendar className="ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          {filteredEvents.filter(event => !event.isLive).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex">
                {/* Event Image Placeholder */}
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 mr-4 relative overflow-hidden">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiCalendar className="text-gray-400 text-xl" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                    <p className="text-white text-[10px] text-center truncate">{event.startTime}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{event.title}</h3>
                    <button
                      onClick={() => toggleFavorite(event.id)}
                      className="p-1"
                    >
                      <FiHeart 
                        className={favorites.includes(event.id) ? "text-red-500 fill-current" : "text-gray-400"} 
                      />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1">{event.host}</p>
                  
                  <div className="flex items-center text-gray-500 text-xs mt-2">
                    <FiMapPin className="mr-1" />
                    <span className="truncate mr-3">{event.location}</span>
                    <FiClock className="mr-1" />
                    <span>{event.duration}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 2 && (
                      <span className="text-gray-500 text-[10px]">+{event.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <button className="text-red-600 text-sm font-medium flex items-center">
                  Set Reminder <FiChevronRight className="ml-1" />
                </button>
                <span className="text-gray-500 text-sm">{event.startTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredEvents.filter(event => !event.isLive).length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-1">No Upcoming Events</h3>
            <p className="text-gray-600">
              Check back later for new events
            </p>
          </div>
        )}
      </div>
      
      {/* Categories Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-3">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Cultural Shows", icon: <FiStar />, color: "bg-purple-50 text-purple-600" },
            { name: "Workshops", icon: <FiUsers />, color: "bg-blue-50 text-blue-600" },
            { name: "Entertainment", icon: <FiVideo />, color: "bg-red-50 text-red-600" },
            { name: "Community", icon: <FiMapPin />, color: "bg-green-50 text-green-600" }
          ].map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`${category.color} rounded-xl p-4 text-left flex items-center shadow-sm border border-gray-100`}
            >
              <div className="text-xl mr-3">{category.icon}</div>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveEvents;