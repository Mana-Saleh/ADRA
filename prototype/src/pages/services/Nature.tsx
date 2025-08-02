// src/pages/services/Nature.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ServiceCardSkeletonList } from '../../components/cards/ServiceCardSkeleton';
import riyalIcon from '../../assets/icons/Saudi_Riyal_Symbol-1.png';
import nature1 from '../../assets/images/nature1.jpeg';
import nature2 from '../../assets/images/nature2.jpeg';
import nature3 from '../../assets/images/nature3.jpeg';
import nature4 from '../../assets/images/nature4.jpeg';
import nature5 from '../../assets/images/nature5.jpeg';
import nature6 from '../../assets/images/nature6.jpeg';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  rating?: number;
  price?: string;
  image?: string;
}

const Nature: React.FC = () => {
  const { t } = useTranslation();

  const natureAdventures: ServiceItem[] = [
    {
      id: '5',
      title: t('services.nature.bird_watching'),
      description: t('services.nature.bird_description'),
      category: t('categories.nature'),
      rating: 4.7,
     // price: '90',
      image: nature1
    },
    {
      id: '6',
      title: t('services.nature.wildlife_safari'),
      description: t('services.nature.safari_description'),
      category: t('categories.nature'),
      rating: 4.8,
      //price: '180',
      image: nature2
    },
  ];

  const ruralStays: ServiceItem[] = [
    {
      id: '7',
      title: t('services.nature.farm_stay'),
      description: t('services.nature.farm_stay_description'),
      category: t('categories.nature'),
      rating: 4.9,
      price: '250-400',
      image: nature3
    },
    {
      id: '8',
      title: t('services.nature.traditional_house'),
      description: t('services.nature.house_description'),
      category: t('categories.nature'),
      rating: 4.7,
      price: '200-350',
      image: nature4
    },
  ];

  const outdoorGatherings: ServiceItem[] = [
    {
      id: '11',
      title: t('services.nature.park_bbq'),
      description: t('services.nature.park_description'),
      category: t('categories.nature'),
      rating: 4.8,
      price: '150',
      image: nature5
    },
    {
      id: '14',
      title: t('services.nature.traditional_outdoor'),
      description: t('services.nature.traditional_outdoor_description'),
      category: t('categories.nature'),
      rating: 4.6,
      price: '100',
      image: nature6
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
          {t('nature.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('nature.description')}
        </p>
      </div>

      {renderSection(t('nature.natureAdventures'), natureAdventures)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('nature.ruralStays'), ruralStays)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('nature.outdoorGatherings'), outdoorGatherings)}
    </div>
  );
};

export default Nature;