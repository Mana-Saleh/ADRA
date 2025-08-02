// src/pages/Home.tsx
import React, { useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryTabs from '../components/home/CategoryTabs';
import ForYou from './services/ForYou';
import Culture from './services/Culture';
import Food from './services/Food';
import Nature from './services/Nature';
import Events from './services/Events';
import Crafts from './services/Crafts';
import AskLocal from './services/AskLocal';
import { useTranslation } from 'react-i18next';
import herobanner from '../assets/images/herobanner.jpeg';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('for-you');
  const { t } = useTranslation();

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'for-you':
        return <ForYou />;
      case 'culture':
        return <Culture />;
      case 'food':
        return <Food />;
      case 'nature':
        return <Nature />;
      case 'events':
        return <Events />;
      case 'crafts':
        return <Crafts />;
      case 'chat':
        return <AskLocal />;
      default:
        return <ForYou />;
    }
  };

  return (
    <div className="pb-6">
      <HeroBanner 
        title={t('home.hero_title')}
        imageSrc={herobanner}
      />
      
      {/* Category Tabs below Hero Banner */}
      <div className="px-4 mb-6">
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
      </div>

      {/* Category Content */}
      <div className="px-4">
        {renderCategoryContent()}
      </div>
    </div>
  );
};

export default Home;