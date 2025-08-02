// src/components/home/CategoryTabs.tsx
import React from 'react';
import {
  FaLandmark,
  FaUtensils,
  FaMountain,
  FaCalendarAlt,
  FaHands,
  FaComments,
  FaThumbsUp
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  const { t } = useTranslation();

  const categories = [
    { id: 'for-you', name: t('categories.for_you'), icon: <FaThumbsUp className="text-base" /> },
    { id: 'culture', name: t('categories.culture'), icon: <FaLandmark className="text-base" /> },
    { id: 'food', name: t('categories.food'), icon: <FaUtensils className="text-base" /> },
    { id: 'nature', name: t('categories.nature'), icon: <FaMountain className="text-base" /> },
    { id: 'events', name: t('categories.events'), icon: <FaCalendarAlt className="text-base" /> },
    { id: 'crafts', name: t('categories.crafts'), icon: <FaHands className="text-base" /> },
    { id: 'chat', name: t('categories.ask_local'), icon: <FaComments className="text-base" /> }
  ];

  return (
    <div className="sticky top-[64px] z-40 bg-transparent px-4 py-2">
      <div className="flex overflow-x-auto scrollbar-hide gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                relative px-4 py-2 rounded-full flex items-center gap-2
                text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-deep-teal-500 text-white'
                    : 'border border-dashed border-deep-teal-500 text-gray-600 dark:text-gray-300 hover:border-deep-teal-400'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;