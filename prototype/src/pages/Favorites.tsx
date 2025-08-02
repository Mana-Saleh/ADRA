// src/pages/Favorites.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import recommendedImg from '../assets/images/recommendedForYou1.jpeg';
import recommendedImg2 from '../assets/images/recommendedForYou2.jpeg';
import popularNearYou1 from '../assets/images/popularNearYou.jpeg';
import trendingExperiences1 from '../assets/images/trendingExperiences.jpeg';
import thisSeason2 from '../assets/images/thisSeason2.jpeg';
import food6 from '../assets/images/food6.jpeg';

const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');

  // Sample favorite data - replace with actual data from your API
  const favoriteExperiences = [
    {
      id: '1',
      title: t('favorites.experiences.craftsWorkshop'),
      category: t('categories.crafts'),
      description: t('favorites.descriptions.craftsWorkshop'),
      rating: 4.8,
      price: '85',
      image: recommendedImg,
      savedDate: '2024-01-15'
    },
    {
      id: '2',
      title: t('favorites.experiences.traditionalCooking'),
      category: t('categories.food'),
      description: t('favorites.descriptions.traditionalCooking'),
      rating: 4.9,
      price: '120',
      image: popularNearYou1,
      savedDate: '2024-01-12'
    },
    {
      id: '3',
      title: t('favorites.experiences.heritageTour'),
      category: t('categories.culture'),
      description: t('favorites.descriptions.heritageTour'),
      rating: 4.7,
      price: '65',
      image: trendingExperiences1,
      savedDate: '2024-01-10'
    },
    {
      id: '4',
      title: t('favorites.experiences.natureHiking'),
      category: t('categories.nature'),
      description: t('favorites.descriptions.natureHiking'),
      rating: 4.6,
      price: '45',
      image: thisSeason2,
      savedDate: '2024-01-08'
    },
    {
      id: '5',
      title: t('favorites.experiences.localMarket'),
      category: t('categories.food'),
      description: t('favorites.descriptions.localMarket'),
      rating: 4.5,
      price: '30',
      image: food6,
      savedDate: '2024-01-05'
    },
    {
      id: '6',
      title: t('favorites.experiences.artisansMeet'),
      category: t('categories.crafts'),
      description: t('favorites.descriptions.artisansMeet'),
      rating: 4.8,
      price: '95',
      image: recommendedImg2,
      savedDate: '2024-01-03'
    }
  ];

  const categories = [
    { id: 'all', name: t('favorites.categories.all') },
    { id: 'crafts', name: t('categories.crafts') },
    { id: 'food', name: t('categories.food') },
    { id: 'culture', name: t('categories.culture') },
    { id: 'nature', name: t('categories.nature') },
    { id: 'events', name: t('categories.events') }
  ];

  const filteredExperiences = activeTab === 'all' 
    ? favoriteExperiences 
    : favoriteExperiences.filter(exp => exp.category === t(`categories.${activeTab}`));

  const removeFromFavorites = (id: string) => {
    console.log('Remove from favorites:', id);
    // Implement actual removal logic here
  };

  const ExperienceCard = ({ experience }: { experience: any }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => removeFromFavorites(experience.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label={t('favorites.actions.remove')}
        >
          <HeartFilledIcon className="w-5 h-5 text-red-500" />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
            {experience.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
            {experience.title}
          </h3>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {experience.rating}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {experience.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {experience.price}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
              {t('favorites.perPerson')}
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
              {t('favorites.actions.view')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('favorites.title')}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <HeartIcon className="w-5 h-5 mr-2" />
              <span>{favoriteExperiences.length} {t('favorites.items')}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t('favorites.subtitle')}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 transition-colors ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            {t('favorites.showing')}{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredExperiences.length}
            </span>{' '}
            {t('favorites.of')}{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {favoriteExperiences.length}
            </span>{' '}
            {t('favorites.results')}
          </p>
          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300">
            <option>{t('favorites.sort.recent')}</option>
            <option>{t('favorites.sort.priceLow')}</option>
            <option>{t('favorites.sort.priceHigh')}</option>
            <option>{t('favorites.sort.rating')}</option>
          </select>
        </div>

        {/* Favorites Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <HeartIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('favorites.empty.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t('favorites.empty.description')}
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              {t('favorites.empty.browse')}
            </button>
          </div>
        )}

        {/* Recently Viewed Section */}
        {favoriteExperiences.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('favorites.recentlyViewed')}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                {favoriteExperiences.slice(0, 4).map((experience) => (
                  <div key={`recent-${experience.id}`} className="flex-shrink-0 w-64">
                    <div className="flex items-center">
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-16 h-16 rounded-lg object-cover mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {experience.title}
                        </h4>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {experience.rating}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {experience.price} {t('favorites.currency')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// SVG Icons
const HeartIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
  </svg>
);

const HeartFilledIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

export default Favorites;