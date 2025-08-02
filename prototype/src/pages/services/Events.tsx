// src/pages/services/Events.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ServiceCardSkeletonList } from '../../components/cards/ServiceCardSkeleton';
import riyalIcon from '../../assets/icons/Saudi_Riyal_Symbol-1.png';
import coffe from '../../assets/images/coffee.jpg';
import communityEvents1 from '../../assets/images/communityEvents1.png'
import upcomingEvents1 from '../../assets/images/upcomingEvents1.png'

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  rating?: number;
  price?: string;
  image?: string;
}

const Events: React.FC = () => {
  const { t } = useTranslation();

  const upcomingEvents: ServiceItem[] = [
    {
      id: '1',
      title: t('services.events.flowers_festival'),
      description: t('services.events.flowers_description'),
      category: t('categories.events'),
      rating: 4.8,
      price: '50',
      image: upcomingEvents1
    },
  ];

  const seasonalHighlights: ServiceItem[] = [
    {
      id: '6',
      title: t('services.events.dates_season'),
      description: t('services.events.dates_description'),
      category: t('categories.events'),
      rating: 4.6,
      price: '40',
      image: coffe
    },
  ];

  const communityEvents: ServiceItem[] = [
    {
      id: '10',
      title: t('services.events.poetry_evening'),
      description: t('services.events.poetry_description'),
      category: t('categories.events'),
      rating: 4.7,
      price: '25',
      image: communityEvents1
    },
  ];

  const exclusiveByADRA: ServiceItem[] = [
    {
      id: '16',
      title: t('services.events.interactive_tour'),
      description: t('services.events.interactive_description'),
      category: t('categories.events'),
      rating: 4.9,
      price: '90',
      image: coffe
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
                  item.price && item.price !== '0' ? (
                    <div className="flex items-center gap-1">
                      <img src={riyalIcon} alt="SAR" className="w-4 h-4 inline" />
                      <span>{item.price}</span>
                    </div>
                  ) : item.price === '0' ? undefined : undefined
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
          {t('events.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('events.description')}
        </p>
      </div>

      {renderSection(t('events.upcomingEvents'), upcomingEvents)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('events.seasonalHighlights'), seasonalHighlights)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('events.communityEvents'), communityEvents)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('events.exclusiveByADRA'), exclusiveByADRA)}
    </div>
  );
};

export default Events;