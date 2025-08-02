// src/pages/services/Culture.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Required CSS
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ServiceCardSkeletonList } from '../../components/cards/ServiceCardSkeleton';
import riyalIcon from '../../assets/icons/Saudi_Riyal_Symbol-1.png';
import unforgettableExperiences1 from '../../assets/images/unforgettableExperiences1.jpeg';
import unforgettableExperiences2 from '../../assets/images/unforgettableExperiences2.jpeg';
import topCulturalSights1 from '../../assets/images/topCulturalSights1.jpeg';
import topCulturalSights2 from '../../assets/images/topCulturalSights2.jpeg';
import museumsAndArt1 from '../../assets/images/museumsAndArt1.jpeg';
import museumsAndArt2 from '../../assets/images/museumsAndArt2.jpeg';
import personal from '../../assets/images/p.png'

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  rating?: number;
  price?: string;
  location?: string;
  image?: string;
  guideName?: string;
  guideRating?: number;
  guideImage?: string;
}

// SVG Icons
const StarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const ChatIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const SendIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const BotIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 7h-1V5h-3.59l.3-.3L15.41 4 14 5.41l-.7-.7L12.7 4h-.7v.71L11.29 4h-.7v.71L9.88 4H9v.85l-.71.71L8 5.85V5H5v2H4v2.53l-.82.71L2 12l1.18 1.76L4 14.47V17h1v2h2v1h2.53l.71.82L12 22l1.76-1.18L14.47 22H17v-1h2v-2h1v-2.53l.82-.71L22 14l-1.18-1.76L22 10.53V8h-1V5h-2v2zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"/>
  </svg>
);

const Culture: React.FC = () => {
  const { t, i18n } = useTranslation(); // Added i18n for potential RTL checks
  const [activeTab, setActiveTab] = useState('culture');
  const [messages, setMessages] = useState([
    { id: '1', text: t('culture.chat.welcome'), sender: 'guide', timestamp: '10:00 AM' },
    { id: '2', text: t('culture.chat.question'), sender: 'user', timestamp: '10:02 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [aiInput, setAiInput] = useState('');

  const unforgettableExperiences: ServiceItem[] = [
    {
      id: '1',
      title: t('services.culture.heritage_village_visit'),
      description: t('services.culture.heritage_village_description'),
      category: t('categories.culture'),
      rating: 4.8,
     // price: '50',
     location: "Abha",
      image: unforgettableExperiences1
    },
    {
      id: '2',
      title: t('services.culture.interactive_crafts'),
      description: t('services.culture.interactive_crafts_description'),
      category: t('categories.crafts'),
      rating: 4.7,
      //price: '35',
      image: unforgettableExperiences2
    }
  ];

  const topCulturalSights: ServiceItem[] = [
    {
      id: '5',
      title: t('services.culture.ancient_castle_tour'),
      description: t('services.culture.castle_description'),
      category: t('categories.culture'),
      rating: 4.9,
      //price: '30',
      //location: "",
      image: topCulturalSights1
    },
    {
      id: '7',
      title: t('services.culture.historic_buildings'),
      description: t('services.culture.buildings_description'),
      category: t('categories.culture'),
      rating: 4.6,
      //price: '20',
      image: topCulturalSights2
    }
  ];

  const museumsAndArt: ServiceItem[] = [
    {
      id: '13',
      title: t('services.culture.national_museum'),
      description: t('services.culture.museum_description'),
      category: t('categories.culture'),
      rating: 4.8,
      //price: '40',
      image: museumsAndArt1
    },
    {
      id: '15',
      title: t('services.culture.cultural_center'),
      description: t('services.culture.center_description'),
      category: t('categories.culture'),
      rating: 4.7,
      //price: '25',
      image: museumsAndArt2
    }
  ];

  const guides = [
    {
      id: '1',
      name: 'Ahmed Al-Mutairi',
      specialty: t('culture.guides.specialty1'),
      rating: 4.9,
      reviews: 128,
      image: personal,
      price: '80'
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      specialty: t('culture.guides.specialty2'),
      rating: 4.8,
      reviews: 95,
      image: personal,
      price: '120'
    },
    {
      id: '3',
      name: 'Khalid Al-Saud',
      specialty: t('culture.guides.specialty3'),
      rating: 4.7,
      reviews: 76,
      image: personal,
      price: '70'
    },
    {
      id: '4',
      name: 'Noura Al-Shamrani',
      specialty: t('culture.guides.specialty4'),
      rating: 4.8,
      reviews: 112,
      image: personal,
      price: '90'
    }
  ];

  const tabs = [
    { id: 'culture', name: t('culture.tabs.culture') },
    { id: 'guides', name: t('culture.tabs.guides') },
    { id: 'chat', name: t('culture.tabs.chat') },
    { id: 'ai', name: t('culture.tabs.ai') },
    { id: 'travelPlan', name: t('culture.tabs.travelPlan') } 
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    // Simulate guide response
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        text: t('culture.chat.response'),
        sender: 'guide',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInput.trim() === '') return;
    console.log('AI Query:', aiInput);
    setAiInput('');
    // In a real app, this would connect to an AI service
  };

  const renderCultureContent = () => (
    <div>
      {renderSection(t('culture.unforgettableExperiences'), unforgettableExperiences)}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      {renderSection(t('culture.topCulturalSights'), topCulturalSights)}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      {renderSection(t('culture.museumsAndArt'), museumsAndArt)}
    </div>
  );

  const renderGuidesContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {guides.map(guide => (
        <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="p-5">
            <div className="flex items-center mb-4">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{guide.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{guide.specialty}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{guide.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({guide.reviews})</span>
              </div>
              <div className="flex items-center">
                <img src={riyalIcon} alt="SAR" className="w-4 h-4 mr-1" />
                <span className="font-bold text-gray-900 dark:text-white">{guide.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/{t('culture.guides.perHour')}</span> {/* Translated unit */}
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                {t('culture.guides.viewProfile')}
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors">
                {t('culture.guides.bookNow')}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChatContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={personal}
              alt={t('culture.chat.guideAltText')} // Translated alt text
              className="w-10 h-10 rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-gray-900 dark:text-white">Ahmed Al-Mutairi</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('culture.chat.online')}</p>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label={t('culture.chat.callGuide')}> {/* Translated aria-label */}
          <PhoneIcon className="w-5 h-5" />
        </button>
      </div>
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender !== 'user' && (
              <img
                src={personal}
                alt={t('culture.chat.guideAltText')} // Translated alt text
                className="w-8 h-8 rounded-full mr-2 self-end"
              />
            )}
            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {message.timestamp}
              </p>
            </div>
            {message.sender === 'user' && (
              <img
                src={personal}
                alt={t('culture.chat.yourAltText')} // Translated alt text
                className="w-8 h-8 rounded-full ml-2 self-end"
              />
            )}
          </div>
        ))}
      </div>
      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('culture.chat.placeholder')}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
            aria-label={t('culture.chat.sendMessage')} // Translated aria-label
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTravelPlanContent = () => {
    // Travel plan data using translation keys
    const travelPlan = [
  {
    day: 1,
    title: t('travel.day1.title'),
    subtitle: t('travel.day1.subtitle'),
    activities: t('travel.day1.activities', { returnObjects: true }),
    time: t('travel.day1.time'),
    location: t('travel.day1.location'),
    essentials: t('travel.day1.essentials', { returnObjects: true }),
    icon: '✈️'
  },
  {
    day: 2,
    title: t('travel.day2.title'),
    subtitle: t('travel.day2.subtitle'),
    activities: t('travel.day2.activities', { returnObjects: true }),
    time: t('travel.day2.time'),
    location: t('travel.day2.location'),
    essentials: t('travel.day2.essentials', { returnObjects: true }),
    icon: '🏺'
  },
  {
    day: 3,
    title: t('travel.day3.title'),
    subtitle: t('travel.day3.subtitle'),
    activities: t('travel.day3.activities', { returnObjects: true }),
    time: t('travel.day3.time'),
    location: t('travel.day3.location'),
    essentials: t('travel.day3.essentials', { returnObjects: true }),
    icon: '🌄'
  },
  {
    day: 4,
    title: t('travel.day4.title'),
    subtitle: t('travel.day4.subtitle'),
    activities: t('travel.day4.activities', { returnObjects: true }),
    time: t('travel.day4.time'),
    location: t('travel.day4.location'),
    essentials: t('travel.day4.essentials', { returnObjects: true }),
    icon: '🤝'
  },
  {
    day: 5,
    title: t('travel.day5.title'),
    subtitle: t('travel.day5.subtitle'),
    activities: t('travel.day5.activities', { returnObjects: true }),
    time: t('travel.day5.time'),
    location: t('travel.day5.location'),
    essentials: t('travel.day5.essentials', { returnObjects: true }),
    icon: '🛍️'
  },
  {
    day: 6,
    title: t('travel.day6.title'),
    subtitle: t('travel.day6.subtitle'),
    activities: t('travel.day6.activities', { returnObjects: true }),
    time: t('travel.day6.time'),
    location: t('travel.day6.location'),
    essentials: t('travel.day6.essentials', { returnObjects: true }),
    icon: '📸'
  },
  {
    day: 7,
    title: t('travel.day7.title'),
    subtitle: t('travel.day7.subtitle'),
    activities: t('travel.day7.activities', { returnObjects: true }),
    time: t('travel.day7.time'),
    location: t('travel.day7.location'),
    essentials: t('travel.day7.essentials', { returnObjects: true }),
    icon: '🧭'
  }
      // Add other days as needed
    ];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('travel.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('travel.description')}
          </p>
        </div>
        <VerticalTimeline
          layout="1-column"
          className="vertical-timeline-custom-line"
          animate={true}
        >
          {travelPlan.map((day) => {
            // Ensure we always have arrays
            const activitiesArray = Array.isArray(day.activities) ? day.activities : [day.activities];
            const essentialsArray = Array.isArray(day.essentials) ? day.essentials : [day.essentials];
            return (
              <VerticalTimelineElement
                key={day.day}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: 'rgb(243, 244, 246)',
                  color: 'rgb(17, 24, 39)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem'
                }}
                contentArrowStyle={{
                  borderRight: '7px solid rgb(243, 244, 246)'
                }}
                date={`${t('travel.day')} ${day.day}`}
                dateClassName="font-bold text-gray-700 dark:text-gray-300"
                iconStyle={{
                  background: 'rgb(59, 130, 246)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}
                icon={<span>{day.icon}</span>}
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{day.title}</h3>
                    {day.subtitle && (
                      <p className="text-gray-600 dark:text-gray-400">{day.subtitle}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('travel.time')}
                      </p>
                      <p>{day.time}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('travel.location')}
                      </p>
                      <p>{day.location}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {t('travel.activities')}:
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {activitiesArray.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {essentialsArray.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                        {t('travel.essentials')}:
                      </p>
                      <p>{essentialsArray.join(', ')}</p>
                    </div>
                  )}
                </div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <h3 className="font-bold text-lg mb-2">{t('travel.assistant.title')}</h3>
          <p className="mb-3">{t('travel.assistant.description')}</p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              {t('travel.assistant.optimize')}
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              {t('travel.assistant.add')}
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              {t('travel.assistant.weather')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAiContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <BotIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('culture.ai.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('culture.ai.description')}
        </p>
      </div>
      <form onSubmit={handleAiSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder={t('culture.ai.placeholder')}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-r-lg hover:opacity-90 transition-opacity"
          >
            {t('culture.ai.ask')}
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            {t('culture.ai.suggestion1')}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {t('culture.ai.suggestion1Desc')}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
            {t('culture.ai.suggestion2')}
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            {t('culture.ai.suggestion2Desc')}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            {t('culture.ai.suggestion3')}
          </h3>
          <p className="text-sm text-green-600 dark:text-green-400">
            {t('culture.ai.suggestion3Desc')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderSection = (title: string, items: ServiceItem[], loading: boolean = false) => (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white pb-2 border-b-2 border-primary-500 inline-block">
          {title}
        </h2>
      </div>
      {loading ? (
        <ServiceCardSkeletonList count={3} />
      ) : (
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {items.map(item => (
            <div key={item.id} className="flex-shrink-0 w-72">
              <ServiceCard
                title={item.title}
                description={item.description}
                category={item.category}
                rating={item.rating}
                location = {item.location}
                price={
                  item.price ? (
                    <div className="flex items-center gap-1">
                      <img src={riyalIcon} alt={t('common.currencyAlt')} className="w-4 h-4 inline" /> {/* Translated alt text */}
                      <span>{item.price}</span>
                    </div>
                  ) : undefined
                }
                image={item.image}
                onPress={() => console.log('View service:', item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'culture':
        return renderCultureContent();
      case 'guides':
        return renderGuidesContent();
      case 'chat':
        return renderChatContent();
      case 'ai':
        return renderAiContent();
      case 'travelPlan':
        return renderTravelPlanContent();
      default:
        return renderCultureContent();
    }
  };

  return (
    <div className={`py-8 px-4 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}> {/* Basic RTL support */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('culture.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('culture.description')}
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className={`-mb-px flex space-x-8 overflow-x-auto scrollbar-hide ${i18n.language === 'ar' ? 'space-x-reverse' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-4 px-1 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default Culture;