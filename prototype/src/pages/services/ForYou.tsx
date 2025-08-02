// src/pages/services/ForYou.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ServiceCardSkeletonList } from '../../components/cards/ServiceCardSkeleton';
import riyalIcon from '../../assets/icons/Saudi_Riyal_Symbol-1.png';
import recommendedImg from '../../assets/images/recommendedForYou1.jpeg';
import recommendedImg2 from '../../assets/images/topCulturalSights2.jpeg';
import popularNearYou1 from '../../assets/images/food3.jpeg';
import popularNearYou2 from '../../assets/images/coffee.jpg';
import trendingExperiences1 from '../../assets/images/trendingExperiences.jpeg';
import trendingExperiences2 from '../../assets/images/trendingExperiences2.jpeg';
import thisSeason1 from '../../assets/images/thisSeason1.jpeg';
import thisSeason2 from '../../assets/images/rtt55.jpeg';
import nature4 from '../../assets/images/nature4.jpeg';
import food6 from '../../assets/images/food6.jpeg';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  rating?: number;
  price?: string;
  image?: string;
}

const ForYou: React.FC = () => {
  const { t } = useTranslation();

 // Inside the ForYou functional component, replace the arrays with these:

  const recommendedForYou: ServiceItem[] = [
    {
      id: '1',
      // Using crafts from services.crafts section
      title: t('services.crafts.sadu_weaving'),
      description: t('services.crafts.sadu_description'),
      category: t('categories.culture'),
      rating: 4.8,
      //price: '45-60',
      image: recommendedImg2
    },
    {
      id: '2',
      title: t('services.crafts.pottery_workshop'), // Corrected path
      description: t('services.crafts.pottery_description'), // Corrected path
      category: t('categories.crafts'),
      rating: 4.6,
      //price: '35',
      image: recommendedImg
    },
  ];

  const popularNearYou: ServiceItem[] = [
    // These keys don't exist in your provided JSON. You need to either:
    // 1. Add them to your JSON files (see below), or
    // 2. Use existing keys like food items from services.food
    // Example using placeholder keys (you need to add these to JSON):
    {
      id: '3',
      title: t('services.food.traditional_kabsa'), // Using an existing key as example
      description: t('services.food.kabsa_description'),
      category: t('categories.food'),
      rating: 4.6,
      //price: '30',
      image: popularNearYou1
    },
    {
      id: '4',
      title: t('services.food.saudi_coffee_experience'), // Using an existing key as example
      description: t('services.food.coffee_description'),
      category: t('categories.culture'),
      rating: 4.4,
      //price: '15',
      image: popularNearYou2
    },
    // If you want the exact items from the original code, you need to add the keys below
  ];

  const trendingExperiences: ServiceItem[] = [
    // These keys don't exist. Example using existing events keys:
    {
      id: '5',
      title: t('services.events.flowers_festival'), // Using an existing key
      description: t('services.events.flowers_description'),
      category: t('categories.iibbnn'),
      rating: 4.9,
      //price: '120',
      image: trendingExperiences1
    },
    {
      id: '6',
      title: t('services.events.football_match'), // Using an existing key
      description: t('services.events.football_description'),
      category: t('categories.culture'),
      rating: 4.7,
      //price: '25',
      image: trendingExperiences2
    },
  ];

  const thisSeason: ServiceItem[] = [
     // These keys don't exist. Example using existing keys:
    {
      id: '7',
      title: t('services.events.riyadh_season'), // Using an existing key
      description: t('services.events.riyadh_description'),
      category: t('categories.events'), // Or culture if more appropriate
      rating: 4.7,
      //price: '25',
      image: thisSeason1
    },
    {
      id: '8',
      title: t('services.nature.hiking_adventure'), // Using an existing key
      description: t('services.nature.hiking_description'),
      category: t('categories.nature'),
      rating: 4.8,
      //price: '50',
      image: thisSeason2
    },
  ];

  const recentlyViewed: ServiceItem[] = [
    // These keys don't exist. Example using existing keys:
    {
      id: '8',
      title: t('services.nature.traditional_house'),
      description: t('services.nature.house_description'),
      category: t('categories.nature'),
      rating: 4.7,
      //price: '200',
      image: nature4
    },
    {
      id: '12',
      title: t('services.food.traditional_market'),
      description: t('services.food.traditional_market_description'),
      category: t('categories.food'),
      rating: 4.5,
      //price: '35',
      image: food6
    },
  ];

  const renderSection = (title: string, items: ServiceItem[], loading: boolean = false) => (
    <div className="mb-8">
      {/* Special Section Title Design */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white pb-2 border-b-2 border-primary-500 inline-block">
          {title}
        </h2>
      </div>
      
      {loading ? (
        <ServiceCardSkeletonList count={2} />
      ) : (
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {items.map(item => (
            <div key={item.id} className="flex-shrink-0 w-72">
              <ServiceCard
                title={item.title}
                description={item.description}
                category={item.category}
                rating={item.rating}
                price={
                  item.price ? (
                    <div className="flex items-center gap-1">
                      <img src={riyalIcon} alt="SAR" className="w-4 h-4 inline" />
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

  return (
    <div className="py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('forYou.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('forYou.description')}
        </p>
      </div>

      {renderSection(t('forYou.recommended'), recommendedForYou)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('forYou.popularNearYou'), popularNearYou)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('forYou.trending'), trendingExperiences)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('forYou.thisSeason'), thisSeason)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('forYou.recentlyViewed'), recentlyViewed)}
    </div>
  );
};

export default ForYou;