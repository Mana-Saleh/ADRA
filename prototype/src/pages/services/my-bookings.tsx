// src/pages/services/my-activities.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiStar,
  FiFilter,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiInfo,
  FiChevronRight,
  FiUser,
  FiDollarSign
} from "react-icons/fi";

const MyActivities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock filters
  const filters = [
    "All",
    "Confirmed",
    "Pending",
    "Completed",
    "Cancelled"
  ];

  // Mock activities data
  const activities = {
    upcoming: [
      {
        id: 1,
        title: "Traditional Pottery Workshop",
        description: "Learn the ancient art of pottery from a local master craftsman.",
        location: "Old Town Art Center",
        date: "Today, Jun 15",
        time: "10:00 AM - 12:00 PM",
        status: "confirmed",
        price: 45.00,
        image: "", // Add image path if available
        participants: 2,
        confirmationCode: "CONF-789456",
        category: "Workshop"
      },
      {
        id: 2,
        title: "Sunset Desert Safari",
        description: "Experience the breathtaking desert landscape with dune bashing and camel riding.",
        location: "Red Dunes Reserve",
        date: "Tomorrow, Jun 16",
        time: "4:00 PM - 8:00 PM",
        status: "confirmed",
        price: 89.00,
        image: "", // Add image path if available
        participants: 4,
        confirmationCode: "CONF-123789",
        category: "Adventure"
      },
      {
        id: 3,
        title: "Historic City Walking Tour",
        description: "Explore 500 years of history with our expert local guide.",
        location: "Historic District",
        date: "Jun 18, Saturday",
        time: "9:00 AM - 11:30 AM",
        status: "pending",
        price: 25.00,
        image: "", // Add image path if available
        participants: 1,
        confirmationCode: "PENDING-456123",
        category: "Cultural"
      }
    ],
    past: [
      {
        id: 4,
        title: "Authentic Cooking Class",
        description: "Cook traditional dishes with a local family in their home.",
        location: "Local Family Home",
        date: "Jun 10, Monday",
        time: "6:00 PM - 9:00 PM",
        status: "completed",
        price: 65.00,
        image: "", // Add image path if available
        participants: 2,
        confirmationCode: "COMP-987654",
        category: "Food & Drink",
        rating: 4.8
      },
      {
        id: 5,
        title: "Mountain Hiking Adventure",
        description: "Guided hike to the scenic peak with panoramic views.",
        location: "Green Mountains",
        date: "Jun 5, Wednesday",
        time: "7:00 AM - 12:00 PM",
        status: "completed",
        price: 40.00,
        image: "", // Add image path if available
        participants: 3,
        confirmationCode: "COMP-321654",
        category: "Nature",
        rating: 4.6
      },
      {
        id: 6,
        title: "Cultural Dance Show",
        description: "Experience traditional dance performance by local artists.",
        location: "City Cultural Hall",
        date: "May 28, Wednesday",
        time: "7:00 PM - 9:00 PM",
        status: "cancelled",
        price: 12.00,
        image: "", // Add image path if available
        participants: 2,
        confirmationCode: "CANCEL-789123",
        category: "Cultural"
      }
    ]
  };

  // Filter activities based on search and status
  const filteredActivities = activities[activeTab].filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || 
                          (selectedFilter === "Confirmed" && activity.status === "confirmed") ||
                          (selectedFilter === "Pending" && activity.status === "pending") ||
                          (selectedFilter === "Completed" && activity.status === "completed") ||
                          (selectedFilter === "Cancelled" && activity.status === "cancelled");
    return matchesSearch && matchesFilter;
  });

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch(status) {
      case "confirmed":
        return { icon: <FiCheckCircle className="text-green-500" />, color: "bg-green-50 text-green-700", text: "Confirmed" };
      case "pending":
        return { icon: <FiAlertCircle className="text-amber-500" />, color: "bg-amber-50 text-amber-700", text: "Pending" };
      case "completed":
        return { icon: <FiCheckCircle className="text-blue-500" />, color: "bg-blue-50 text-blue-700", text: "Completed" };
      case "cancelled":
        return { icon: <FiXCircle className="text-red-500" />, color: "bg-red-50 text-red-700", text: "Cancelled" };
      default:
        return { icon: <FiInfo className="text-gray-500" />, color: "bg-gray-50 text-gray-700", text: "Unknown" };
    }
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Header */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <FiCalendar className="text-green-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">My Activities</h1>
              <p className="text-gray-600 text-sm">Manage your bookings and reservations</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  selectedFilter === filter
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-3 text-center rounded-lg text-sm font-medium ${
              activeTab === "upcoming"
                ? "bg-green-500 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-3 text-center rounded-lg text-sm font-medium ${
              activeTab === "past"
                ? "bg-green-500 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Past Activities
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">
            {activeTab === "upcoming" ? "Upcoming Activities" : "Past Activities"}
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({filteredActivities.length})
            </span>
          </h2>
          <button className="text-sm text-green-600 font-medium flex items-center">
            Filter <FiFilter className="ml-1" />
          </button>
        </div>
        
        <div className="space-y-5">
          {filteredActivities.map((activity, index) => {
            const statusInfo = getStatusInfo(activity.status);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Activity Image Placeholder */}
                <div className="h-40 bg-gradient-to-r from-green-400 to-emerald-500 relative">
                  {activity.image ? (
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="bg-white/20 border-2 border-dashed border-white/30 rounded-xl w-16 h-16" />
                    </div>
                  )}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold flex items-center ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span className="ml-1">{statusInfo.text}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                    <FiDollarSign className="text-white text-sm" />
                    <span className="text-white font-bold">{activity.price.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Activity Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{activity.title}</h3>
                    {activity.rating && (
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                        <FiStar className="text-amber-500 mr-1 text-sm" />
                        <span className="text-amber-700 font-bold text-sm">{activity.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiMapPin className="mr-2 text-green-500" />
                      <span className="truncate">{activity.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiUser className="mr-2 text-green-500" />
                      <span>{activity.participants} {activity.participants === 1 ? "Person" : "People"}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiCalendar className="mr-2 text-green-500" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiClock className="mr-2 text-green-500" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Code: {activity.confirmationCode}
                    </div>
                    <div className="flex space-x-2">
                      {activeTab === "upcoming" && activity.status === "confirmed" && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                        >
                          Modify
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors flex items-center"
                      >
                        {activeTab === "upcoming" ? "Details" : "Review"} <FiChevronRight className="ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-1">
              {activeTab === "upcoming" ? "No Upcoming Activities" : "No Past Activities"}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === "upcoming" 
                ? "Book an experience to get started" 
                : "Your past activities will appear here"}
            </p>
            {activeTab === "upcoming" && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-500 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-600 transition-colors"
              >
                Browse Experiences
              </motion.button>
            )}
          </div>
        )}
      </div>
      
      {/* Stats Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-3">Your Activity Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-gray-600 text-sm mt-1">Total Booked</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-gray-600 text-sm mt-1">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-amber-600">4</div>
            <div className="text-gray-600 text-sm mt-1">Upcoming</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;