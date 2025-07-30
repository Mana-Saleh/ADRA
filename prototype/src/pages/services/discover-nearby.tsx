// src/pages/services/nearby-places.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiStar,
  FiFilter,
  FiSearch,
  FiHeart,
  FiNavigation,
  FiClock,
  FiPhone,
  FiGlobe,
  FiBookmark,
  FiChevronRight,
  FiWifi,
  FiCoffee,
  FiCamera,
  FiShoppingBag,
  FiHome,
  FiInfo,
  FiCalendar,
  FiSun, // For Nature
  FiEye // For Viewpoint
} from "react-icons/fi";

// Define a type for our place data
interface Place {
  id: number;
  name: string;
  description: string;
  category: string; // e.g., Cultural, Food, Services, Shopping, Nature, Viewpoint
  distance: number; // km from Abha center
  rating: number;
  reviews: number;
  image?: string; // Optional image URL
  isFavorite: boolean;
  location: string;
  // Updated hours structure for better display
  hours: { day: string; open: string; close: string }[];
  phone?: string; // Optional phone
  website?: string; // Optional website
  amenities: string[]; // List of amenity tags
  coordinates: { lat: number; lng: number }; // GPS coordinates
  googleMapsLink: string; // Link to Google Maps
}

const NearbyPlaces = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [favorites, setFavorites] = useState<number[]>([1, 3]); // Mock favorite IDs
  const [userLocation, setUserLocation] = useState({ lat: 18.2127, lng: 42.5057 }); // Mock Abha coordinates
  const [sortBy, setSortBy] = useState<string>("distance");

  // Updated categories to include Asir-specific ones
  const categories = [
    { name: "All", icon: <FiMapPin /> },
    { name: "Cultural", icon: <FiCamera /> },
    { name: "Food", icon: <FiCoffee /> },
    { name: "Nature", icon: <FiSun /> },
    { name: "Viewpoint", icon: <FiEye /> },
    { name: "Shopping", icon: <FiShoppingBag /> },
    { name: "Services", icon: <FiHome /> }
  ];

  // Updated mock places data to match the new structure
  const places: Place[] = [
    {
      id: 1,
      name: "Rijal Almaa Heritage Village",
      description: "A beautifully preserved traditional mountain village showcasing Asir's architectural heritage and culture.",
      category: "Cultural",
      distance: 45.0, // Approximate
      rating: 4.7,
      reviews: 1240,
      image: "", // Add image path if available
      isFavorite: true,
      location: "Rijal Almaa, Asir",
      hours: [{ day: "Sat-Thu", open: "8:00 AM", close: "6:00 PM" }],
      phone: "+966 17 123 4567",
      website: "https://scth.gov.sa", // Example
      amenities: ["Guided Tours", "Museum", "Gift Shop", "Parking"],
      coordinates: { lat: 18.3360, lng: 42.3340 },
      googleMapsLink: "https://maps.google.com/?q=Rijal+Almaa+Heritage+Village"
    },
    {
      id: 2,
      name: "Al Soudah Park",
      description: "A large recreational park offering stunning views, adventure activities, and family entertainment in the mountains.",
      category: "Nature",
      distance: 20.0, // Approximate
      rating: 4.6,
      reviews: 2100,
      image: "", // Add image path if available
      isFavorite: false,
      location: "Abha, Asir",
      hours: [{ day: "Sat-Thu", open: "9:00 AM", close: "10:00 PM" }],
      phone: "+966 17 234 5678",
      website: "https://alsoudah.com", // Example
      amenities: ["WiFi", "Restaurant", "Parking", "Playground"],
      coordinates: { lat: 18.2300, lng: 42.4900 },
      googleMapsLink: "https://maps.google.com/?q=Al+Soudah+Park"
    },
    {
      id: 3,
      name: "Green Mountain (Jebel Thera)",
      description: "One of the highest peaks in the region, offering breathtaking panoramic views and hiking opportunities.",
      category: "Viewpoint",
      distance: 35.0, // Approximate
      rating: 4.8,
      reviews: 3560,
      image: "", // Add image path if available
      isFavorite: true,
      location: "Near Abha, Asir",
      hours: [{ day: "Daily", open: "6:00 AM", close: "8:00 PM" }],
      amenities: ["Hiking Trails", "Scenic Views", "Parking"],
      coordinates: { lat: 18.2000, lng: 42.5500 }, // Approximate
      googleMapsLink: "https://maps.google.com/?q=Green+Mountain+Jebel+Thera"
    },
    {
      id: 4,
      name: "Shamsan Ottoman Castle",
      description: "A historical castle offering a glimpse into the region's past, perched on a hilltop with great views.",
      category: "Cultural",
      distance: 15.0, // Approximate
      rating: 4.5,
      reviews: 890,
      image: "", // Add image path if available
      isFavorite: false,
      location: "Abha, Asir",
      hours: [{ day: "Sat-Thu", open: "9:00 AM", close: "5:00 PM" }],
      phone: "+966 17 345 6789",
      amenities: ["Museum", "Guided Tours", "Parking"],
      coordinates: { lat: 18.2500, lng: 42.4800 }, // Approximate
      googleMapsLink: "https://maps.google.com/?q=Shamsan+Ottoman+Castle"
    },
    {
      id: 5,
      name: "The Globe Restaurant",
      description: "Popular local eatery serving traditional and international cuisine with mountain views.",
      category: "Food",
      distance: 2.5, // Approximate
      rating: 4.4,
      reviews: 780,
      image: "", // Add image path if available
      isFavorite: false,
      location: "Al-Nuzha District, Abha",
      hours: [
        { day: "Sat-Thu", open: "11:00 AM", close: "11:00 PM" },
        { day: "Fri", open: "12:00 PM", close: "12:00 AM" }
      ],
      phone: "+966 17 567 8901",
      website: "https://www.thegloberestaurant.com", // Example
      amenities: ["WiFi", "Outdoor Seating", "Bar"],
      coordinates: { lat: 18.2150, lng: 42.5000 }, // Approximate
      googleMapsLink: "https://maps.google.com/?q=The+Globe+Restaurant+Abha"
    }
  ];

  // Filter places based on search and category
  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort places
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Cultural": return <FiCamera className="text-blue-500" />;
      case "Food": return <FiCoffee className="text-amber-500" />;
      case "Nature": return <FiSun className="text-green-500" />;
      case "Viewpoint": return <FiEye className="text-purple-500" />;
      case "Shopping": return <FiShoppingBag className="text-pink-500" />;
      case "Services": return <FiHome className="text-teal-500" />;
      default: return <FiMapPin className="text-gray-500" />;
    }
  };

  // Simple function to check if currently open (mock implementation)
  const isOpenNow = (hours: Place['hours']) => {
    // This is a simplified example. In reality, you'd parse the current day/time.
    // For demo, let's assume it's Saturday, 2PM.
    const currentDay = "Sat"; // Mock current day
    const currentTime = 1400; // Mock current time (14:00)

    const todayHours = hours.find(h => h.day.includes(currentDay));
    if (!todayHours) return false; // Closed if no hours listed for today

    // Simple time parsing (assuming HH:MM AM/PM format)
    const parseTime = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 100 + minutes; // Convert to HHMM integer
    };

    const openTime = parseTime(todayHours.open);
    const closeTime = parseTime(todayHours.close);

    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="w-full pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FiMapPin className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Asir Region Attractions</h1>
              <p className="text-gray-600 text-sm">Discover the beauty of Asir</p>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search attractions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-2 space-x-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex flex-col items-center px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="text-lg mb-1">{category.icon}</div>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
          {[
            { id: "distance", label: "Distance" },
            { id: "rating", label: "Rating" },
            { id: "reviews", label: "Reviews" },
            { id: "name", label: "Name" }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`flex-shrink-0 px-4 py-2.5 text-center rounded-lg text-sm font-medium whitespace-nowrap ${
                sortBy === option.id
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Places List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">
            {selectedCategory === "All" ? "Asir Attractions" : selectedCategory}
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({sortedPlaces.length})
            </span>
          </h2>
          <button className="text-sm text-blue-600 font-medium flex items-center">
            Map View <FiNavigation className="ml-1" />
          </button>
        </div>
        <div className="space-y-5">
          {sortedPlaces.length > 0 ? sortedPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Place Image Placeholder */}
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative"> {/* Adjusted height */}
                {place.image ? (
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white/20 border-2 border-dashed border-white/30 rounded-xl w-16 h-16 flex items-center justify-center text-white/50">
                      <FiCamera />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(place.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <FiHeart
                    className={favorites.includes(place.id) ? "text-red-500 fill-current" : "text-gray-700"}
                  />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <FiMapPin className="text-white mr-1 text-sm" />
                  <span className="text-white text-sm">{place.distance.toFixed(1)} km</span>
                </div>
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <FiStar className="text-amber-400 mr-1 text-sm" />
                  <span className="text-white text-sm font-bold">{place.rating}</span>
                </div>
              </div>

              {/* Place Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{place.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      {getCategoryIcon(place.category)}
                      <span className="ml-2">{place.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                    <FiStar className="text-amber-500 mr-1 text-sm" />
                    <span className="text-amber-700 font-bold text-sm">{place.rating}</span>
                    <span className="text-amber-600 text-xs ml-1">({place.reviews.toLocaleString()})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{place.description}</p>

                {/* Location */}
                <div className="flex items-start text-gray-600 text-sm mb-2">
                  <FiMapPin className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>{place.location}</span>
                </div>

                {/* Hours */}
                <div className="flex items-start text-gray-600 text-sm mb-2">
                  <FiClock className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    {place.hours.map((hourSlot, idx) => (
                      <div key={idx}>{hourSlot.day}: {hourSlot.open} - {hourSlot.close}</div>
                    ))}
                    {/* Example Open Now Status */}
                    <span className={`text-xs font-medium ${isOpenNow(place.hours) ? 'text-green-600' : 'text-red-600'}`}>
                      {isOpenNow(place.hours) ? "(Open Now)" : "(Closed)"}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                {place.phone && (
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <FiPhone className="mr-2 text-blue-500 flex-shrink-0" />
                    <span>{place.phone}</span>
                  </div>
                )}
                {place.website && (
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <FiGlobe className="mr-2 text-blue-500 flex-shrink-0" />
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
                      {place.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                )}

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.amenities.map((amenity, amenityIndex) => (
                    <span
                      key={amenityIndex}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                 <div></div> {/* Spacer for alignment */}
                  <div className="flex space-x-2">
                    {place.phone && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`tel:${place.phone}`}
                        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                      >
                        <FiPhone />
                      </motion.a>
                    )}
                    {place.website && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                      >
                        <FiGlobe />
                      </motion.a>
                    )}
                    <motion.a // Use anchor for Google Maps link
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={place.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors flex items-center"
                    >
                      Directions <FiChevronRight className="ml-1" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          )) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-gray-400 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-1">No Attractions Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-blue-600 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Saved Places", icon: <FiBookmark />, color: "bg-purple-50 text-purple-600" },
            { name: "Visited Places", icon: <FiMapPin />, color: "bg-blue-50 text-blue-600" },
            { name: "Top Rated", icon: <FiStar />, color: "bg-amber-50 text-amber-600" },
            { name: "Nearby Events", icon: <FiCalendar />, color: "bg-red-50 text-red-600" }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`${action.color} rounded-xl p-4 text-left shadow-sm border border-gray-100 flex items-center`}
            >
              <div className="text-xl mr-3">{action.icon}</div>
              <span className="font-medium">{action.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyPlaces;