// src/pages/services/AskLocal.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Simple SVG Icons
const UsersIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const ChatIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);

const HomeIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const BrainIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.38 0 2.65-.35 3.78-.98.3-.16.55-.38.75-.64.2-.26.35-.55.45-.86.1-.31.15-.63.15-.96 0-.38-.07-.75-.2-1.1-.13-.35-.32-.67-.56-.95-.24-.28-.53-.52-.86-.7-.33-.18-.69-.31-1.08-.39-.39-.08-.8-.12-1.22-.12H9c-.55 0-1-.45-1-1s.45-1 1-1h1.58c.42 0 .83-.04 1.22-.12.39-.08.75-.21 1.08-.39.33-.18.62-.42.86-.7.24-.28.43-.6.56-.95.13-.35.2-.72.2-1.1 0-.33-.05-.65-.15-.96-.1-.31-.25-.6-.45-.86-.2-.26-.45-.48-.75-.64C14.65 4.35 13.38 4 12 4zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
  </svg>
);

const AskLocal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live-gathering');

  const features = [
    {
      id: 'live-gathering',
      title: t('askLocal.liveGathering.title'),
      description: t('askLocal.liveGathering.description'),
      icon: <UsersIcon />,
      examples: [
        t('askLocal.liveGathering.example1'),
        t('askLocal.liveGathering.example2'),
        t('askLocal.liveGathering.example3')
      ],
      details: [
        t('askLocal.liveGathering.detail1'),
        t('askLocal.liveGathering.detail2')
      ],
      cta: t('askLocal.liveGathering.joinGroup'),
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-700',
      buttonColor: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'live-assistant',
      title: t('askLocal.liveAssistant.title'),
      description: t('askLocal.liveAssistant.description'),
      icon: <ChatIcon />,
      examples: [
        t('askLocal.liveAssistant.example1'),
        t('askLocal.liveAssistant.example2'),
        t('askLocal.liveAssistant.example3')
      ],
      details: [
        t('askLocal.liveAssistant.detail1'),
        t('askLocal.liveAssistant.detail2')
      ],
      cta: t('askLocal.liveAssistant.getHelp'),
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-700',
      buttonColor: 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'local-hosts',
      title: t('askLocal.localHosts.title'),
      description: t('askLocal.localHosts.description'),
      icon: <HomeIcon />,
      examples: [
        t('askLocal.localHosts.example1'),
        t('askLocal.localHosts.example2'),
        t('askLocal.localHosts.example3')
      ],
      details: [
        t('askLocal.localHosts.detail1'),
        t('askLocal.localHosts.detail2')
      ],
      cta: t('askLocal.localHosts.connectHost'),
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-700',
      buttonColor: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700',
      textColor: 'text-purple-800 dark:text-purple-200',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'ask-ai',
      title: t('askLocal.askAI.title'),
      description: t('askLocal.askAI.description'),
      icon: <BrainIcon />,
      examples: [
        t('askLocal.askAI.example1'),
        t('askLocal.askAI.example2'),
        t('askLocal.askAI.example3')
      ],
      details: [
        t('askLocal.askAI.detail1'),
        t('askLocal.askAI.detail2')
      ],
      cta: t('askLocal.askAI.askNow'),
      bgColor: 'bg-orange-50 dark:bg-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-700',
      buttonColor: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700',
      textColor: 'text-orange-800 dark:text-orange-200',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const activeFeature = features.find(feature => feature.id === activeTab) || features[0];

  // Real functionality for each feature
  const handleFeatureAction = (featureId: string) => {
    switch (featureId) {
      case 'live-gathering':
        // Navigate to community groups page or open group selector
        navigate('/community/groups');
        break;
      case 'live-assistant':
        // Open live chat with local assistants
        navigate('/chat/assistants');
        break;
      case 'local-hosts':
        // Show available local hosts
        navigate('/hosts');
        break;
      case 'ask-ai':
        // Open AI chat interface
        navigate('/ai-assistant');
        break;
      default:
        console.log('Feature action:', featureId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="py-6 px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('askLocal.title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              {t('askLocal.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto scrollbar-hide px-4">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === feature.id
                  ? `border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 ${feature.textColor}`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(feature.id)}
            >
              <span className={`mr-2 ${activeTab === feature.id ? feature.iconColor : 'text-gray-500 dark:text-gray-400'}`}>
                {feature.icon}
              </span>
              <span className="whitespace-nowrap">{feature.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6 px-4">
        <div className={`rounded-2xl border-2 ${activeFeature.borderColor} ${activeFeature.bgColor} p-6 transition-all duration-300`}>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${activeFeature.textColor} bg-white dark:bg-gray-700 border-2 ${activeFeature.borderColor}`}>
                {activeFeature.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {activeFeature.title}
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-5 leading-relaxed">
                {activeFeature.description}
              </p>

              {/* Examples */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {t('askLocal.examples')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeFeature.examples.map((example, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <ul className="space-y-2 mb-6">
                {activeFeature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2 mt-1">●</span>
                    <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`${activeFeature.buttonColor} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-md`}
                onClick={() => handleFeatureAction(activeFeature.id)}
              >
                {activeFeature.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-6 text-white">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">{t('askLocal.community.title')}</h2>
            <p className="text-base md:text-lg mb-5">
              {t('askLocal.community.description')}
            </p>
            <button 
              className="bg-white text-blue-600 dark:text-blue-700 font-bold py-2.5 px-6 rounded-xl hover:bg-gray-100 transition-all duration-200"
              onClick={() => navigate('/services/for-you')}
            >
              {t('askLocal.community.explore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskLocal;