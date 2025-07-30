// src/pages/services/smart-guide.tsx (or similar path)
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMessageSquare,
  FiUsers,
  FiSend,
  FiPhone,
  FiVideo,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiStar,
  FiFilter,
  FiSearch,
  FiArrowLeft,
  FiX,
  FiNavigation,
  FiAward,
  FiChevronDown,
  FiChevronUp,
  FiGlobe,
  FiCoffee,
  FiCamera,
  FiHeart,
  FiMenu,
  FiDownload,
  FiShare2,
  FiPrinter,
  FiEdit,
  FiPlus,
  FiMinus,
  FiCheck,
  FiZap,
  FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Attraction = {
  id: number;
  name: string;
  type: string;
  location: { lat: number; lng: number };
  image: string;
  description: string;
  rating?: number;
  distance?: string;
};

type Guide = {
  id: number;
  name: string;
  image: string;
  rating: number;
  specialty: string;
  languages: string[];
  experience: string;
  price: number;
  available: boolean;
  bio: string;
  tags: string[];
  reviews?: number;
  responseRate?: string;
  responseTime?: string;
};

type Message = {
  id: number;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
  isRead: boolean;
  isTyping?: boolean;
  suggestions?: string[];
};

type ItineraryDay = {
  day: number;
  title: string;
  activities: Activity[];
};

type Activity = {
  time: string;
  title: string;
  location: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  duration?: string;
  notes?: string;
};

// --- Mock Data ---
const ASIR_ATTRACTIONS: Attraction[] = [
  {
    id: 1,
    name: "Rijal Almaa Village",
    type: "heritage",
    location: { lat: 18.2167, lng: 42.4167 },
    image: "https://source.unsplash.com/random/300x300/?saudi,heritage",
    description: "Historic mountain village with colorful stone houses dating back 400 years",
    rating: 4.8,
    distance: "45 min drive"
  },
  {
    id: 2,
    name: "Shada Palace",
    type: "historical",
    location: { lat: 18.2167, lng: 42.5167 },
    image: "https://source.unsplash.com/random/300x300/?saudi,palace",
    description: "Ancient fortress and palace with panoramic views of Abha",
    rating: 4.6,
    distance: "15 min drive"
  },
  {
    id: 3,
    name: "Najd Village",
    type: "cultural",
    location: { lat: 18.3167, lng: 42.6167 },
    image: "https://source.unsplash.com/random/300x300/?saudi,village",
    description: "Traditional village showcasing Asiri architecture and culture",
    rating: 4.5,
    distance: "1 hour drive"
  },
  {
    id: 4,
    name: "Abha Sky Bridge",
    type: "modern",
    location: { lat: 18.2167, lng: 42.5167 },
    image: "https://source.unsplash.com/random/300x300/?bridge,saudi",
    description: "Iconic suspension bridge offering stunning mountain views",
    rating: 4.7,
    distance: "10 min drive"
  },
  {
    id: 5,
    name: "Al-Soudah Park",
    type: "nature",
    location: { lat: 18.2667, lng: 42.3667 },
    image: "https://source.unsplash.com/random/300x300/?park,saudi",
    description: "Lush mountain park with hiking trails and scenic viewpoints",
    rating: 4.9,
    distance: "1.5 hour drive"
  },
  {
    id: 6,
    name: "Al-Muftaha Village",
    type: "cultural",
    location: { lat: 18.2367, lng: 42.5067 },
    image: "https://source.unsplash.com/random/300x300/?art,village",
    description: "Artists' village with galleries and traditional workshops",
    rating: 4.4,
    distance: "20 min drive"
  }
];

const LOCAL_GUIDES: Guide[] = [
  {
    id: 1,
    name: "Ahmed Al-Asiri",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    specialty: "Cultural Heritage",
    languages: ["Arabic", "English"],
    experience: "7 years",
    price: 150,
    available: true,
    bio: "Passionate local guide with deep knowledge of Asir's history and traditions. Certified by the Saudi Commission for Tourism and National Heritage.",
    tags: ["History", "Architecture", "Local Stories", "Museums"],
    reviews: 127,
    responseRate: "98%",
    responseTime: "within 1 hour"
  },
  {
    id: 2,
    name: "Fatima Al-Ghamdi",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.7,
    specialty: "Nature & Hiking",
    languages: ["Arabic", "Spanish"],
    experience: "5 years",
    price: 130,
    available: true,
    bio: "Expert in local flora, fauna, and hiking trails. Wilderness first responder certified. Ensures safe and enjoyable experiences.",
    tags: ["Hiking", "Nature", "Photography", "Bird Watching"],
    reviews: 89,
    responseRate: "95%",
    responseTime: "within 2 hours"
  },
  {
    id: 3,
    name: "Khalid Al-Mutairi",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.8,
    specialty: "Photography Tours",
    languages: ["Arabic", "English", "French"],
    experience: "10 years",
    price: 180,
    available: false,
    bio: "Professional photographer offering guided tours to the most scenic spots. Can provide photography tips and editing advice.",
    tags: ["Photography", "Scenery", "Sunset", "Landscapes"],
    reviews: 203,
    responseRate: "99%",
    responseTime: "within 30 mins"
  },
  {
    id: 4,
    name: "Sarah Al-Zahrani",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.6,
    specialty: "Food & Markets",
    languages: ["Arabic", "English", "Urdu"],
    experience: "4 years",
    price: 120,
    available: true,
    bio: "Food enthusiast who knows all the best local eateries and hidden market gems. Can arrange cooking demonstrations.",
    tags: ["Food", "Markets", "Cooking", "Local Cuisine"],
    reviews: 56,
    responseRate: "92%",
    responseTime: "within 3 hours"
  }
];

const SAMPLE_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: "Discovering Abha & Rijal Almaa",
    activities: [
      {
        time: "10:00 AM",
        title: "Arrival in Abha",
        location: "Abha Regional Airport",
        icon: FiGlobe,
        description: "Meet your driver at the airport for transfer to your hotel",
        duration: "1 hour"
      },
      {
        time: "12:30 PM",
        title: "Guided Tour of Rijal Almaa Village",
        location: "Rijal Almaa Village",
        icon: FiMapPin,
        description: "Explore the famous stone houses and learn about the region's history",
        duration: "2 hours",
        notes: "Wear comfortable shoes as there will be walking on uneven surfaces"
      },
      {
        time: "2:00 PM",
        title: "Traditional Lunch at Local Restaurant",
        location: "Al-Bait Restaurant",
        icon: FiCoffee,
        description: "Enjoy authentic Asiri cuisine in a heritage setting",
        duration: "1 hour"
      },
      {
        time: "4:30 PM",
        title: "Visit Local Souvenirs Market",
        location: "Rijal Almaa Market",
        icon: FiHeart,
        description: "Browse for traditional crafts, honey, and spices",
        duration: "1.5 hours"
      },
      {
        time: "7:00 PM",
        title: "Check-in at Mountain Resort",
        location: "Al-Fayhaa Resort",
        icon: FiMapPin,
        description: "Relax and enjoy the mountain views from your accommodation",
        duration: "Overnight"
      }
    ]
  },
  {
    day: 2,
    title: "Exploring Shada & Najd",
    activities: [
      {
        time: "9:00 AM",
        title: "Breakfast at Hotel",
        location: "Hotel",
        icon: FiCoffee,
        description: "Buffet breakfast with local specialties",
        duration: "1 hour"
      },
      {
        time: "10:30 AM",
        title: "Hike to Shada Palace",
        location: "Shada Palace Trail",
        icon: FiNavigation,
        description: "Moderate hike with spectacular views of the surrounding mountains",
        duration: "2.5 hours",
        notes: "Bring water and sun protection"
      },
      {
        time: "1:00 PM",
        title: "Picnic Lunch with View",
        location: "Shada Overlook",
        icon: FiCoffee,
        description: "Enjoy a packed lunch with panoramic views",
        duration: "1 hour"
      },
      {
        time: "3:30 PM",
        title: "Visit Najd Village",
        location: "Najd Village",
        icon: FiMapPin,
        description: "Explore the traditional architecture and cultural exhibits",
        duration: "2 hours"
      },
      {
        time: "5:30 PM",
        title: "Experience Traditional Coffee Ceremony",
        location: "Najd Village Cultural Center",
        icon: FiCoffee,
        description: "Learn about Saudi coffee traditions and etiquette",
        duration: "1 hour"
      },
      {
        time: "8:00 PM",
        title: "Dinner at Resort",
        location: "Resort Restaurant",
        icon: FiCoffee,
        description: "Evening meal featuring local specialties",
        duration: "1.5 hours"
      }
    ]
  },
  {
    day: 3,
    title: "Abha Skyline & Departure",
    activities: [
      {
        time: "8:00 AM",
        title: "Sunrise at Jabal Al-Nabi",
        location: "Jabal Al-Nabi Viewpoint",
        icon: FiCamera,
        description: "Spectacular sunrise views over the mountains",
        duration: "1 hour",
        notes: "Early departure - dress warmly"
      },
      {
        time: "11:00 AM",
        title: "Walk across Abha Sky Bridge",
        location: "Abha Sky Bridge",
        icon: FiMapPin,
        description: "Thrilling walk across the suspension bridge with panoramic views",
        duration: "1.5 hours"
      },
      {
        time: "1:00 PM",
        title: "Farewell Lunch",
        location: "Al-Qahwa Heritage Restaurant",
        icon: FiCoffee,
        description: "Final taste of Asiri cuisine before departure",
        duration: "1.5 hours"
      },
      {
        time: "3:30 PM",
        title: "Departure",
        location: "Abha Regional Airport",
        icon: FiGlobe,
        description: "Transfer to airport for your flight",
        duration: "1 hour"
      }
    ]
  }
];

// --- Helper Components ---
const SARIcon = ({ className = "w-4 h-4" }) => (
  <span className={`font-bold text-xs ${className}`}>SAR</span>
);

const RatingStars = ({ rating, className = "" }: { rating: number; className?: string }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={`${i < fullStars ? 'text-yellow-500 fill-yellow-500' : ''} ${
            i === fullStars && hasHalfStar ? 'text-yellow-500 fill-yellow-500/50' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
};

const ModernRoadmap = ({ itinerary }: { itinerary: ItineraryDay[] }) => {
  const flattenedSteps = itinerary.flatMap(day =>
    day.activities.map(activity => ({
      ...activity,
      day: day.day,
      dayTitle: day.title || `Day ${day.day}`,
      icon: activity.icon || FiMapPin
    }))
  );

  if (flattenedSteps.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border border-gray-200">
        <FiMapPin className="mx-auto text-3xl text-gray-400 mb-3" />
        <p className="text-gray-500">No plan steps available.</p>
      </div>
    );
  }

  const stepColors = [
    "from-blue-500 to-indigo-600",
    "from-teal-500 to-green-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
    "from-violet-500 to-purple-500",
    "from-cyan-500 to-sky-500",
  ];

  return (
    <div className="relative pt-10 pb-14">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 z-0"></div>
      <div className="space-y-12 relative z-10">
        {flattenedSteps.map((step, index) => {
          const isEven = index % 2 === 0;
          const colorClass = stepColors[index % stepColors.length];
          return (
            <div
              key={`${step.day}-${index}`}
              className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} w-full`}
            >
              <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-gray-300"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center">
                      <FiClock className="mr-1.5 text-gray-500" /> {step.time}
                    </span>
                    <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">Day {step.day}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 flex items-start">
                    <FiMapPin className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                    <span className="truncate">{step.location}</span>
                  </p>
                </motion.div>
              </div>
              <div className="w-2/12 flex justify-center">
                <div className="relative">
                  {index !== flattenedSteps.length - 1 && (
                    <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-300 ${isEven ? '' : 'h-12 -top-12'}`}></div>
                  )}
                  <div className={`bg-gradient-to-r ${colorClass} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white`}>
                    <span className="font-extrabold text-lg">{index + 1}</span>
                  </div>
                </div>
              </div>
              <div className="w-5/12"></div>
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-xl border-4 border-white">
          <FiNavigation className="text-2xl" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          START
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl border-4 border-white">
          <FiAward className="text-2xl" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2.5 text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
          FINISH
        </div>
      </div>
    </div>
  );
};

const ActivityDetail = ({ activity, onClose }: { activity: Activity; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="font-bold text-lg text-gray-800">{activity.title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <FiX className="text-gray-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              {activity.icon ? (
                <activity.icon className="text-blue-600 text-xl" />
              ) : (
                <FiMapPin className="text-blue-600 text-xl" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{activity.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FiClock className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Time & Duration</p>
              <p className="font-medium">{activity.time} • {activity.duration || 'Not specified'}</p>
            </div>
          </div>
          {activity.description && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-1">Description</h4>
              <p className="text-gray-700">{activity.description}</p>
            </div>
          )}
          {activity.notes && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-800 mb-1">Notes</h4>
              <p className="text-yellow-700">{activity.notes}</p>
            </div>
          )}
          <div className="pt-4 flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center space-x-2">
              <FiNavigation className="text-lg" />
              <span>Get Directions</span>
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium flex items-center justify-center space-x-2">
              <FiEdit className="text-lg" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
const SmartGuide = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ai" | "human" | "plan">("ai");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your Smart Travel Assistant for the Asir Region. How can I help plan your trip today?",
      timestamp: new Date(),
      isRead: true,
      suggestions: ["Popular Places", "Local Food", "Find an Expert", "Create Itinerary"]
    }
  ]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [showItineraryList, setShowItineraryList] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtered guides based on search and filter
  const filteredGuides = LOCAL_GUIDES.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === "all" ||
      (activeFilter === "available" && guide.available) ||
      (activeFilter === "under150" && guide.price < 150);
    return matchesSearch && matchesFilter;
  });

  // Filtered attractions
  const filteredAttractions = ASIR_ATTRACTIONS.filter(attraction =>
    attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attraction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date(),
      isRead: true
    };
    setMessages(prev => [...prev, newUserMessage]);
    setMessage("");

    // Add typing indicator
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 2,
        sender: "ai",
        text: "Thinking...",
        timestamp: new Date(),
        isRead: false,
        isTyping: true
      }
    ]);

    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => {
        const filtered = prev.filter(msg => !(msg.sender === 'ai' && msg.isTyping));
        return [...filtered, aiResponse];
      });
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = "";
    let suggestions: string[] = [];

    if (/hello|hi|hey/.test(lowerCaseMessage)) {
      responseText = "Hello there! I'm your Smart Guide for Asir. I can help you discover amazing places, find local experts, and plan your itinerary. What would you like to explore today?";
      suggestions = ["Popular Places", "Local Food", "Getting Around", "Find an Expert"];
    }
    else if (/place|visit|see|attraction/.test(lowerCaseMessage)) {
      responseText = "Asir is rich in history and nature! Here are top recommendations:\n1. Rijal Almaa Village - Historic stone houses\n2. Shada Palace - Ancient fortress with views\n3. Abha Sky Bridge - Iconic suspension bridge\nWould you like details on any of these?";
      suggestions = ["Rijal Almaa", "Shada Palace", "Abha Sky Bridge", "More Options"];
    }
    else if (/food|eat|restaurant|cuisine/.test(lowerCaseMessage)) {
      responseText = "Asiri cuisine is a must-try! Don't miss:\n• 'Areekah' - Thin flatbread baked in clay oven\n• 'Al-Haneeth' - Slow-cooked spiced lamb\n• 'Al-Mursi' - Local bread with honey\nTop places to try: Najd Village Restaurant, Al-Bait Restaurant in Rijal Almaa.";
      suggestions = ["Traditional Dishes", "Best Restaurants", "Food Tours", "Cooking Classes"];
    }
    else if (/transport|get to|car|drive|bus/.test(lowerCaseMessage)) {
      responseText = "Getting around Asir:\n• Car rental recommended for flexibility\n• Mountain roads are scenic but can be winding\n• From Abha to Rijal Almaa: ~45min via Route 15\n• Taxis and ride-sharing available in cities\nWould you like help arranging transportation?";
      suggestions = ["Car Rental", "Taxi Services", "Best Routes", "Public Transport"];
    }
    else if (/guide|human|local|expert/.test(lowerCaseMessage)) {
      responseText = "I can connect you with excellent local experts! Here's what they offer:\n• Cultural heritage tours\n• Nature hikes\n• Photography guidance\n• Food experiences\nSwitch to the 'Local Experts' tab to browse profiles.";
      suggestions = ["History Guides", "Hiking Guides", "Photography Tours", "View All"];
    }
    else if (/plan|itinerary|schedule|trip/.test(lowerCaseMessage)) {
      responseText = "I can help create a custom itinerary! Please share:\n1. Your interests (history, nature, food?)\n2. Duration of stay\n3. Preferred pace (relaxed or packed?)\nOr check the 'My Plan' tab for a sample itinerary.";
      suggestions = ["3-Day Plan", "5-Day Plan", "Family-Friendly", "Adventure Focus"];
    }
    else {
      responseText = "I'm here to help with your Asir trip! I can provide information on:\n• Tourist attractions\n• Local cuisine\n• Transportation\n• Local experts\n• Personalized itineraries\nWhat would you like to know?";
      suggestions = ["Popular Places", "Local Food", "Find an Expert", "Create Itinerary"];
    }

    return {
      id: messages.length + 3,
      sender: "ai",
      text: responseText,
      timestamp: new Date(),
      isRead: false,
      suggestions
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeTab === "ai" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.style.display = 'none';
    // Note: Dynamically creating DOM elements like this is not typical in React.
    // A better approach would be to manage image loading state in the component.
    // However, for the sake of completeness with the provided snippet, this is kept.
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-full';
    const icon = document.createElement('div');
    icon.className = 'text-gray-400';
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
    fallbackDiv.appendChild(icon);
    target.parentElement?.appendChild(fallbackDiv);
  };

  return (
    <div className="w-full pb-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-xs">
        <div className="px-4 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Back to Home"
            >
              <FiArrowLeft className="text-gray-700 text-xl" />
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent">Smart Guide</h1>
              <p className="text-gray-600 text-sm mt-1">
                {activeTab === "ai" ? "AI Assistant" : activeTab === "human" ? "Local Guides" : "My Plan"}
              </p>
            </div>
            <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FiMenu className="text-gray-700 text-xl" />
            </button>
          </div>
          {/* Modern Tabs */}
          <div className="mt-5 flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex-1 py-3.5 text-center rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === "ai"
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FiMessageSquare className="mr-2" /> AI Assistant
            </button>
            <button
              onClick={() => setActiveTab("human")}
              className={`flex-1 py-3.5 text-center rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === "human"
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FiUsers className="mr-2" /> Local Guides
            </button>
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 py-3.5 text-center rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === "plan"
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FiNavigation className="mr-2" /> My Plan
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 max-w-4xl mx-auto">
        {activeTab === "ai" ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 mt-6 overflow-hidden">
            {/* AI Chat Interface */}
            <div className="h-[500px] overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-white to-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] rounded-3xl p-4 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-tr-none shadow-md"
                        : msg.isTyping
                          ? "bg-gray-100 text-gray-500 italic border border-gray-200"
                          : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    {!msg.isTyping && (
                      <p className="text-xs opacity-80 mt-1.5">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                    {msg.suggestions && msg.sender === "ai" && !msg.isTyping && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setMessage(suggestion);
                              if (suggestion === "Find an Expert") setActiveTab("human");
                              if (suggestion === "Create Itinerary" || suggestion.includes("Plan")) setActiveTab("plan");
                            }}
                            className="px-3 py-1.5 bg-white/30 backdrop-blur-sm text-xs font-medium rounded-full border border-white/20 hover:bg-white/40 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Quick Suggestions & Input */}
            <div className="p-5 border-t border-gray-200 bg-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {["Popular Places", "Local Food", "Getting Around", "Find an Expert", "My Plan"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setMessage(suggestion);
                      if (suggestion === "Find an Expert") setActiveTab("human");
                      if (suggestion === "My Plan") setActiveTab("plan");
                    }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about places, guides, or plans..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-2 rounded-full ${message.trim() ? 'bg-teal-500 text-white hover:bg-teal-600' : 'text-gray-400'}`}
                  aria-label="Send message"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === "human" ? (
          <div className="mt-6 space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search guides, specialties, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: "all", label: "All Guides" },
                  { id: "available", label: "Available Now" },
                  { id: "under150", label: "< 150 SAR/hr" }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                      activeFilter === filter.id
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guides List */}
            <div className="space-y-5">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start">
                        <div className="relative flex-shrink-0">
                          <img
                            src={guide.image}
                            alt={guide.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                            onError={handleImageError}
                          />
                          {guide.available && (
                            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-800 truncate">{guide.name}</h3>
                              <p className="text-sm text-teal-600 font-medium">{guide.specialty}</p>
                            </div>
                            <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                              <FiStar className="text-amber-500 mr-1 text-sm" />
                              <span className="text-amber-700 font-bold text-sm">{guide.rating}</span>
                              <span className="text-amber-600 text-xs ml-1">({guide.reviews})</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{guide.bio}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {guide.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                            {guide.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{guide.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">{guide.languages.join(", ")}</span> | {guide.experience}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>Response: {guide.responseRate} ({guide.responseTime})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-800 flex items-center">
                          {guide.price} <SARIcon className="ml-1" />
                        </span>
                        <button
                          onClick={() => setSelectedGuide(guide)}
                          className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition-colors"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUsers className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">No Guides Found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("all");
                    }}
                    className="text-teal-600 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // My Plan Tab Content
          <div className="mt-6">
            {/* Plan Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Your Asir Adventure</h2>
                  <p className="text-teal-100 mt-1">3-Day Itinerary</p>
                  <div className="flex items-center mt-3 text-sm">
                    <FiCalendar className="mr-2" />
                    <span>April 15-17, 2024</span>
                    <FiMapPin className="ml-4 mr-2" />
                    <span>Abha & Surroundings</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors" aria-label="Share plan">
                    <FiShare2 />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors" aria-label="Download plan">
                    <FiDownload />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors" aria-label="Print plan">
                    <FiPrinter />
                  </button>
                </div>
              </div>
              <div className="mt-5 flex justify-between items-center">
                <div className="text-center">
                  <p className="text-teal-100 text-sm">Duration</p>
                  <p className="font-bold">3 Days</p>
                </div>
                <div className="text-center">
                  <p className="text-teal-100 text-sm">Places</p>
                  <p className="font-bold">8+</p>
                </div>
                <div className="text-center">
                  <p className="text-teal-100 text-sm">Distance</p>
                  <p className="font-bold">~200 km</p>
                </div>
                <div className="text-center">
                  <p className="text-teal-100 text-sm">Estimated Cost</p>
                  <p className="font-bold flex items-center">450 <SARIcon className="ml-1 text-xs" /></p>
                </div>
              </div>
            </div>

            {/* Plan Actions */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setShowItineraryList(!showItineraryList)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                {showItineraryList ? <FiMinus className="text-2xl text-teal-500 mb-2" /> : <FiPlus className="text-2xl text-teal-500 mb-2" />}
                <span className="font-semibold text-gray-800">{showItineraryList ? "Hide" : "Show"} Full Plan</span>
              </button>
              <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <FiEdit className="text-2xl text-teal-500 mb-2" />
                <span className="font-semibold text-gray-800">Customize</span>
              </button>
            </div>

            {/* Itinerary List / Roadmap */}
            <AnimatePresence>
              {showItineraryList ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="font-bold text-lg text-gray-800">Detailed Itinerary</h3>
                      <button
                        onClick={() => setShowItineraryList(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close itinerary"
                      >
                        <FiX />
                      </button>
                    </div>
                    <div className="space-y-6">
                      {SAMPLE_ITINERARY.map((day) => (
                        <div key={day.day} className="border-l-2 border-gray-200 pl-5 relative pb-6 last:pb-0">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow"></div>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-gray-800">Day {day.day}: {day.title}</h4>
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                              {day.activities.length} Activities
                            </span>
                          </div>
                          <div className="space-y-4">
                            {day.activities.map((activity, idx) => (
                              <div
                                key={idx}
                                onClick={() => setSelectedActivity(activity)}
                                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 cursor-pointer transition-colors"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                      <FiClock className="mr-2 text-teal-500" />
                                      <span>{activity.time}</span>
                                      {activity.duration && (
                                        <>
                                          <FiZap className="mx-2 text-gray-400" />
                                          <span>{activity.duration}</span>
                                        </>
                                      )}
                                    </div>
                                    <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                                    <p className="text-sm text-gray-600 flex items-center mt-1">
                                      <FiMapPin className="mr-2 text-teal-500 flex-shrink-0" />
                                      <span className="truncate">{activity.location}</span>
                                    </p>
                                  </div>
                                  <FiChevronRight className="text-gray-400 flex-shrink-0" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800">Plan Overview</h3>
                      <button
                        onClick={() => setShowItineraryList(true)}
                        className="text-teal-600 font-medium flex items-center text-sm"
                      >
                        See Full Plan <FiChevronDown className="ml-1" />
                      </button>
                    </div>
                    <ModernRoadmap itinerary={SAMPLE_ITINERARY} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Popular Attractions Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">Places on Your Plan</h3>
                <button className="text-sm text-teal-600 font-medium">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filteredAttractions.slice(0, 4).map((attraction) => (
                  <motion.div
                    key={attraction.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="h-32 relative">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <FiStar className="text-amber-400 mr-1 text-sm" />
                        <span className="text-white text-sm font-bold">{attraction.rating}</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        {attraction.distance}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-gray-800 text-sm truncate">{attraction.name}</h4>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">{attraction.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Guide Profile Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedGuide(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pb-5 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <img
                      src={selectedGuide.image}
                      alt={selectedGuide.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      onError={handleImageError}
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-xl text-gray-800">{selectedGuide.name}</h3>
                      <p className="text-teal-600 font-medium">{selectedGuide.specialty}</p>
                      <div className="flex items-center mt-1">
                        <RatingStars rating={selectedGuide.rating} />
                        <span className="text-gray-500 text-sm ml-2">({selectedGuide.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="p-2 rounded-full hover:bg-gray-100"
                    aria-label="Close profile"
                  >
                    <FiX className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">About Me</h4>
                  <p className="text-gray-700">{selectedGuide.bio}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold">{selectedGuide.experience}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Languages</p>
                    <p className="font-semibold">{selectedGuide.languages.join(", ")}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Response Rate</p>
                    <p className="font-semibold">{selectedGuide.responseRate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Avg. Response Time</p>
                    <p className="font-semibold">{selectedGuide.responseTime}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuide.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-800 flex items-center">
                      {selectedGuide.price} <SARIcon className="ml-1" /> / hour
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-md">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetail activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartGuide;