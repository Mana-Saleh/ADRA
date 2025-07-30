// src/pages/services/translate-guide.tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMic,
  FiMicOff,
  FiVolume2,
  FiVolumeX,
  FiCopy,
  FiSend,
  FiUser,
  FiGlobe,
  FiFlag,
  FiClock,
  FiStar,
  FiCheck,
  FiX,
  FiHelpCircle,
  FiBook,
  FiMessageSquare,
  FiSettings,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiPhone,
  FiVideo,
  FiHeart,
  FiAward
} from "react-icons/fi";

// Types
type Guide = {
  id: number;
  name: string;
  language: string;
  rating: number;
  reviews: number;
  specialty: string;
  experience: string;
  image: string;
  online: boolean;
  responseRate?: string;
  responseTime?: string;
  bio?: string;
  tags?: string[];
  price?: number;
};

type Message = {
  id: number;
  timestamp: string;
  speaker: "user" | "guide";
  text: string;
  translation: string;
  isRead?: boolean;
};

const TranslateGuide = () => {
  const [activeTab, setActiveTab] = useState<"translate" | "guides" | "chat">("translate");
  const [sourceLanguage, setSourceLanguage] = useState("Arabic");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showTranslation, setShowTranslation] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Languages with flags
  const languages = [
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "tr", name: "Turkish", flag: "🇹🇷" }
  ];
  
  // Enhanced guides data
  const guides: Guide[] = [
    {
      id: 1,
      name: "Ahmed Al-Saud",
      language: "Arabic",
      rating: 4.9,
      reviews: 128,
      specialty: "Cultural Guide",
      experience: "5 years",
      image: "",
      online: true,
      responseRate: "98%",
      responseTime: "within 15 mins",
      bio: "Certified cultural guide with expertise in Saudi heritage and traditions. Fluent in Arabic and English.",
      tags: ["History", "Architecture", "Local Cuisine", "Traditions"],
      price: 150
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      language: "Spanish",
      rating: 4.7,
      reviews: 96,
      specialty: "Food & Markets",
      experience: "3 years",
      image: "",
      online: true,
      responseRate: "95%",
      responseTime: "within 30 mins",
      bio: "Food enthusiast who knows all the best local eateries and hidden market gems.",
      tags: ["Food Tours", "Markets", "Cooking", "Local Cuisine"],
      price: 120
    },
    {
      id: 3,
      name: "Yuki Tanaka",
      language: "Japanese",
      rating: 4.8,
      reviews: 74,
      specialty: "Traditional Arts",
      experience: "4 years",
      image: "",
      online: false,
      responseRate: "92%",
      responseTime: "within 1 hour",
      bio: "Expert in traditional Japanese arts including tea ceremony and calligraphy.",
      tags: ["Tea Ceremony", "Calligraphy", "Gardens", "History"],
      price: 180
    },
    {
      id: 4,
      name: "Jean Dupont",
      language: "French",
      rating: 4.6,
      reviews: 62,
      specialty: "City Tours",
      experience: "2 years",
      image: "",
      online: true,
      responseRate: "90%",
      responseTime: "within 45 mins",
      bio: "Professional city guide with insider knowledge of hidden gems and local favorites.",
      tags: ["Walking Tours", "Architecture", "History", "Photography"],
      price: 135
    }
  ];
  
  // Mock conversation history
  const mockHistory: Message[] = [
    {
      id: 1,
      timestamp: "10:30 AM",
      speaker: "user",
      text: "Where is the nearest restaurant?",
      translation: "أين أقرب مطعم؟",
      isRead: true
    },
    {
      id: 2,
      timestamp: "10:31 AM",
      speaker: "guide",
      text: "There's a traditional restaurant 200 meters ahead on your left.",
      translation: "هناك مطعم تقليدي على بعد 200 متر أمامك على اليسار.",
      isRead: true
    },
    {
      id: 3,
      timestamp: "10:32 AM",
      speaker: "user",
      text: "Do they serve vegetarian options?",
      translation: "هل يقدمون خيارات نباتية؟",
      isRead: true
    },
    {
      id: 4,
      timestamp: "10:33 AM",
      speaker: "guide",
      text: "Yes, they have excellent falafel and hummus plates.",
      translation: "نعم ، لديهم أطباق فلافل وحمص ممتازة.",
      isRead: false
    }
  ];

  // Simulate translation
  useEffect(() => {
    if (inputText) {
      // Mock translations
      const mockTranslations: Record<string, string> = {
        "Where is the nearest restaurant?": "أين أقرب مطعم؟",
        "Do they serve vegetarian options?": "هل يقدمون خيارات نباتية؟",
        "How much does this cost?": "كم يكلف هذا؟",
        "I need help": "أحتاج إلى مساعدة",
        "Thank you very much": "شكرا جزيلا",
        "أين أقرب مطعم؟": "Where is the nearest restaurant?",
        "كم يكلف هذا؟": "How much does this cost?",
        "أحتاج إلى مساعدة": "I need help",
        "شكرا جزيلا": "Thank you very much"
      };
      
      setTranslatedText(mockTranslations[inputText] || "Translation will appear here...");
    } else {
      setTranslatedText("");
    }
  }, [inputText, sourceLanguage, targetLanguage]);

  // Toggle listening state
  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would connect to speech recognition API
    if (!isListening) {
      setTimeout(() => {
        setInputText("Where is the nearest restaurant?");
        setIsListening(false);
      }, 2000);
    }
  };

  // Toggle speaking state
  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real app, this would use text-to-speech API
  };

  // Swap languages
  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  // Send message
  const sendMessage = () => {
    if (inputText.trim() === "") return;
    
    const newMessage: Message = {
      id: conversationHistory.length + 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      speaker: "user",
      text: inputText,
      translation: translatedText,
      isRead: true
    };
    
    setConversationHistory([...conversationHistory, newMessage]);
    setInputText("");
    
    // Simulate guide response
    setTimeout(() => {
      const responses = [
        "Thank you for your question. The nearest restaurant is 200 meters ahead.",
        "Yes, they have several vegetarian options including falafel and hummus.",
        "I recommend trying the traditional lamb dish, it's very popular here.",
        "The restaurant opens at 7 AM and closes at 11 PM daily.",
        "They accept all major credit cards and cash payments.",
        "The average meal costs about 50-80 SAR per person."
      ];
      
      const guideResponse: Message = {
        id: conversationHistory.length + 2,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        speaker: "guide",
        text: responses[Math.floor(Math.random() * responses.length)],
        translation: "شكرًا على سؤالك. أقرب مطعم يبعد 200 متر أمامك.",
        isRead: false
      };
      
      setConversationHistory(prev => [...prev, guideResponse]);
    }, 1500 + Math.random() * 1000);
  };

  // Connect to guide
  const connectToGuide = (guide: Guide) => {
    setSelectedGuide(guide);
    setIsConnected(true);
    setConversationHistory(mockHistory);
    setActiveTab("chat");
  };

  // Disconnect from guide
  const disconnectGuide = () => {
    setIsConnected(false);
    setSelectedGuide(null);
    setConversationHistory([]);
  };

  // Filtered guides based on search and filter
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "available" && guide.online) ||
                         (activeFilter === "under150" && guide.price && guide.price < 150);
    
    return matchesSearch && matchesFilter;
  });

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  // Quick phrases
  const quickPhrases = [
    { text: "Where is the bathroom?", translation: "أين الحمام؟" },
    { text: "How much does this cost?", translation: "كم يكلف هذا؟" },
    { text: "I need a doctor", translation: "أحتاج إلى طبيب" },
    { text: "Can you help me?", translation: "هل يمكنك مساعدتي؟" },
    { text: "Where can I find...", translation: "أين يمكنني العثور على..." },
    { text: "I don't understand", translation: "أنا لا أفهم" },
    { text: "What time does it open?", translation: "في أي وقت يفتح؟" },
    { text: "Is this halal?", translation: "هل هذا حلال؟" }
  ];

  return (
    <div className="w-full pb-20 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-4 py-5">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4 shadow-md">
              <FiGlobe className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Translate & Guide
              </h1>
              <p className="text-gray-600 text-sm">Real-time translation and local guidance</p>
            </div>
          </div>
          
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("translate")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium transition-all ${
                activeTab === "translate"
                  ? "bg-white text-cyan-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Translator
            </button>
            <button
              onClick={() => setActiveTab("guides")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium transition-all ${
                activeTab === "guides"
                  ? "bg-white text-cyan-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Local Guides
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium transition-all ${
                activeTab === "chat"
                  ? "bg-white text-cyan-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Translator Tab */}
      {activeTab === "translate" && (
        <div className="px-4">
          {/* Language Selection */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Language Translator</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  {showTranslation ? <FiCheck className="text-green-500" /> : <FiX className="text-gray-500" />}
                  <span className="sr-only">Toggle Translation</span>
                </button>
                <button 
                  onClick={swapLanguages}
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                >
                  <FiGlobe />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <button 
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <span>{sourceLanguage}</span>
                  {showLanguageSelector ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                
                <AnimatePresence>
                  {showLanguageSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="max-h-60 overflow-y-auto p-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSourceLanguage(lang.name);
                              setShowLanguageSelector(false);
                            }}
                            className={`w-full px-3 py-2 text-left rounded-md flex items-center ${
                              sourceLanguage === lang.name
                                ? "bg-cyan-50 text-cyan-600"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-xl mr-3">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Translation Area */}
          <div className="mb-5 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600 flex items-center">
                  <span className="mr-2">{languages.find(l => l.name === sourceLanguage)?.flag}</span>
                  {sourceLanguage}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={toggleListening}
                    className={`p-2 rounded-full ${
                      isListening 
                        ? "bg-red-100 text-red-600 animate-pulse" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {isListening ? <FiMic /> : <FiMicOff />}
                  </button>
                  <button 
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                    onClick={() => {
                      navigator.clipboard.writeText(inputText);
                      // Show copied notification
                    }}
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Enter text in ${sourceLanguage}...`}
                className="w-full h-32 px-3 py-2 text-gray-700 border-none focus:outline-none resize-none bg-gray-50 rounded-lg"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600 flex items-center">
                  <span className="mr-2">{languages.find(l => l.name === targetLanguage)?.flag}</span>
                  {targetLanguage}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={toggleSpeaking}
                    className={`p-2 rounded-full ${
                      isSpeaking 
                        ? "bg-cyan-100 text-cyan-600" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {isSpeaking ? <FiVolume2 /> : <FiVolumeX />}
                  </button>
                  <button 
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                    onClick={() => {
                      navigator.clipboard.writeText(translatedText);
                      // Show copied notification
                    }}
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
              <div className="w-full h-32 px-3 py-2 text-gray-700 border-none focus:outline-none resize-none bg-gray-50 rounded-lg">
                {translatedText || "Translation will appear here..."}
              </div>
            </div>
          </div>
          
          {/* Quick Phrases */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Quick Phrases</h3>
              <button 
                className="text-sm text-cyan-600 font-medium"
                onClick={() => {
                  // Show more phrases modal
                }}
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickPhrases.slice(0, 6).map((phrase, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInputText(phrase.text)}
                  className="bg-white rounded-xl p-3 text-left shadow-sm border border-gray-100 hover:border-cyan-200 hover:shadow-md transition-all text-sm"
                >
                  <div className="font-medium">{phrase.text}</div>
                  {showTranslation && (
                    <div className="text-xs text-gray-500 mt-1">{phrase.translation}</div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guides Tab */}
      {activeTab === "guides" && (
        <div className="px-4">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-hide">
              {["all", "available", "under150"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap flex-shrink-0 ${
                    activeFilter === filter
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter === "all" && "All Guides"}
                  {filter === "available" && "Available Now"}
                  {filter === "under150" && "Under 150 SAR"}
                </button>
              ))}
            </div>
          </div>
          
          {/* Guides List */}
          <div className="space-y-4">
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => connectToGuide(guide)}
                >
                  <div className="flex items-center mb-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                        {guide.image ? (
                          <img 
                            src={guide.image} 
                            alt={guide.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-gray-600" />
                        )}
                      </div>
                      {guide.online && (
                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="font-bold truncate">{guide.name}</h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiFlag className="mr-1 text-cyan-500" />
                        <span className="truncate">{guide.language} Guide • {guide.specialty}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      <FiStar className="text-amber-500 mr-1 text-sm" />
                      <span className="text-amber-700 font-bold text-sm">{guide.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-600">
                      {guide.experience} experience • {guide.reviews} reviews
                    </div>
                    <div className="text-sm font-bold text-cyan-600">
                      {guide.price} <span className="text-xs font-normal">SAR/hr</span>
                    </div>
                  </div>
                  
                  {guide.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {guide.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {guide.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{guide.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {guide.online ? (
                        <span className="text-green-600 font-medium">Online now</span>
                      ) : (
                        "Last online 2h ago"
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        connectToGuide(guide);
                      }}
                      disabled={!guide.online}
                      className={`px-4 py-2 rounded-full font-medium text-sm ${
                        guide.online
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {guide.online ? "Connect" : "Offline"}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="text-gray-400 text-2xl" />
                </div>
                <h3 className="font-bold text-lg mb-1">No Guides Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="bg-cyan-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-cyan-600 transition-colors"
                >
                  Reset Filters
                </motion.button>
              </div>
            )}
          </div>
          
          {/* FAQ Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">How It Works</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {[
                {
                  question: "How do I connect with a guide?",
                  answer: "Browse available guides and click 'Connect' to start a conversation."
                },
                {
                  question: "Is translation included?",
                  answer: "Yes, all conversations are automatically translated in real-time."
                },
                {
                  question: "What languages are supported?",
                  answer: "We support over 20 languages with native-speaking guides."
                },
                {
                  question: "How much does it cost?",
                  answer: "Prices vary by guide, typically ranging from 100-200 SAR per hour."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4"
                >
                  <div className="flex items-start">
                    <FiHelpCircle className="text-cyan-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{faq.question}</h3>
                      <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div className="px-4">
          {isConnected && selectedGuide ? (
            <>
              {/* Guide Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                        {selectedGuide.image ? (
                          <img 
                            src={selectedGuide.image} 
                            alt={selectedGuide.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-gray-600" />
                        )}
                      </div>
                      <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedGuide.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiFlag className="mr-1 text-cyan-500" />
                        <span>{selectedGuide.language} Guide</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                      <FiPhone />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                      <FiVideo />
                    </button>
                    <button 
                      onClick={disconnectGuide}
                      className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Chat Container */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
                {/* Chat Messages */}
                <div className="h-[calc(100vh-350px)] overflow-y-auto p-4 bg-gray-50">
                  {conversationHistory.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex mb-4 ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.speaker === 'guide' && (
                        <div className="mr-2 flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="text-gray-600 text-sm" />
                          </div>
                        </div>
                      )}
                      <div className="max-w-[85%]">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`rounded-2xl px-4 py-2 ${
                            msg.speaker === 'user'
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-tr-none'
                              : 'bg-white border border-gray-200 rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </motion.div>
                        {showTranslation && (
                          <div className={`mt-1 text-xs text-gray-500 italic ${
                            msg.speaker === 'user' ? 'text-right' : 'text-left'
                          }`}>
                            {msg.translation}
                          </div>
                        )}
                        <div
                          className={`flex items-center mt-1 text-xs ${
                            msg.speaker === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="text-gray-500">{msg.timestamp}</span>
                          {msg.speaker === 'guide' && !msg.isRead && (
                            <span className="w-2 h-2 bg-cyan-500 rounded-full ml-1"></span>
                          )}
                        </div>
                      </div>
                      {msg.speaker === 'user' && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                            <span className="text-cyan-600 text-sm font-bold">Y</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <FiMic className="text-xl" />
                    </button>
                    <div className="flex-1 mx-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="w-full border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={sendMessage}
                      disabled={!inputText.trim()}
                      className={`p-3 rounded-full ${
                        inputText.trim()
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FiSend className="text-xl" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 mt-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="text-gray-400 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-1">No Active Conversation</h3>
              <p className="text-gray-600 mb-6">
                Connect with a guide to start chatting
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("guides")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2.5 rounded-full font-medium hover:shadow-md transition-all"
              >
                Browse Guides
              </motion.button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab("translate")}
            className={`flex flex-col items-center p-2 rounded-lg ${
              activeTab === "translate" ? "text-cyan-600" : "text-gray-600"
            }`}
          >
            <FiGlobe className="text-xl mb-1" />
            <span className="text-xs">Translate</span>
          </button>
          <button
            onClick={() => setActiveTab("guides")}
            className={`flex flex-col items-center p-2 rounded-lg ${
              activeTab === "guides" ? "text-cyan-600" : "text-gray-600"
            }`}
          >
            <FiUser className="text-xl mb-1" />
            <span className="text-xs">Guides</span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex flex-col items-center p-2 rounded-lg ${
              activeTab === "chat" ? "text-cyan-600" : "text-gray-600"
            }`}
          >
            <div className="relative">
              <FiMessageSquare className="text-xl mb-1" />
              {conversationHistory.some(msg => msg.speaker === "guide" && !msg.isRead) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
              )}
            </div>
            <span className="text-xs">Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslateGuide;