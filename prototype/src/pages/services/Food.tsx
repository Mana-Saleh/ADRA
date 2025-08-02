// src/pages/services/Food.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ServiceCardSkeletonList } from '../../components/cards/ServiceCardSkeleton';
import riyalIcon from '../../assets/icons/Saudi_Riyal_Symbol-1.png';
import food1 from '../../assets/images/food1.jpeg';
import food2 from '../../assets/images/food2.jpeg';
import food3 from '../../assets/images/food3.jpeg';
import food4 from '../../assets/images/food4.jpeg';
import food5 from '../../assets/images/food5.jpeg';
import food6 from '../../assets/images/food6.jpeg';
import food7 from '../../assets/images/food7.jpeg';
import food8 from '../../assets/images/food8.jpeg';
import food9 from '../../assets/images/food9.jpeg';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  rating?: number;
  price?: string;
  image?: string;
}

const Food: React.FC = () => {
  const { t } = useTranslation();

  const authenticExperiences: ServiceItem[] = [
    {
      id: '1',
      title: t('services.food.traditional_kabsa'),
      description: t('services.food.kabsa_description2'),
      category: t('categories.food'),
      rating: 4.8,
      price: '60',
      image: food1
    },
    {
      id: '4',
      title: t('services.food.traditional_majlis'),
      description: t('services.food.majlis_description'),
      category: t('categories.food'),
      rating: 4.9,
      price: '40',
      image: food2
    },
  ];

  const cookingClasses: ServiceItem[] = [
    {
      id: '5',
      title: t('services.food.crafts_cooking_class'),
      description: t('services.food.crafts_description'),
      category: t('categories.food'),
      rating: 4.8,
      price: '85',
      image: food3
    },
    {
      id: '8',
      title: t('services.food.family_cooking'),
      description: t('services.food.family_cooking_description'),
      category: t('categories.food'),
      rating: 4.9,
      price: '95',
      image: food4
    },
  ];

  const foodMarketTours: ServiceItem[] = [
    {
      id: '9',
      title: t('services.food.dates_market_tour'),
      description: t('services.food.dates_market_description'),
      category: t('categories.food'),
      rating: 4.7,
      price: '45',
      image: food5
    },
    {
      id: '12',
      title: t('services.food.traditional_market'),
      description: t('services.food.traditional_market_description'),
      category: t('categories.food'),
      rating: 4.5,
      price: '35',
      image: food6
    },
  ];

  const farmToTable: ServiceItem[] = [
    {
      id: '13',
      title: t('services.food.dates_harvest'),
      description: t('services.food.dates_harvest_description'),
      category: t('categories.food'),
      rating: 4.9,
      price: '70',
      image: food7
    },
    {
      id: '16',
      title: t('services.food.organic_farm'),
      description: t('services.food.organic_description'),
      category: t('categories.food'),
      rating: 4.6,
      price: '75',
      image: food8
    },
  ];

  const localFoodMakers: ServiceItem[] = [
    {
      id: '17',
      title: t('services.food.olive_oil_factory'),
      description: t('services.food.olive_oil_description'),
      category: t('categories.food'),
      rating: 4.8,
      price: '55',
      image: food9
    }
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
          {t('food.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('food.description')}
        </p>
      </div>

      {renderSection(t('food.authenticExperiences'), authenticExperiences)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('food.cookingClasses'), cookingClasses)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('food.foodMarketTours'), foodMarketTours)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('food.farmToTable'), farmToTable)}
      
      {/* Line separator between sections */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {renderSection(t('food.localFoodMakers'), localFoodMakers)}
    </div>
  );
};

export default Food;