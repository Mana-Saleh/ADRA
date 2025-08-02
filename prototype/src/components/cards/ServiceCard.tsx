import React from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import CardWrapper from './CardWrapper';
import { FaStar } from 'react-icons/fa';

interface ServiceCardProps {
  title: string;
  description: string;
  image?: string;
  rating?: number;
  price?: string;
  category: string;
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  rating,
  price,
  category,
  onPress
}) => {
  return (
    <div onClick={onPress}>
      <CardWrapper>
        {image ? (
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-xl mb-3 flex items-center justify-center border-2 border-dashed border-gray-400 text-sm text-gray-600 dark:text-gray-300">
            No image available
          </div>
        )}
        <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold mb-1">{category}</div>
        <h3 className="text-sm font-bold mb-1 text-gray-800 dark:text-white line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{description}</p>
        {rating && (
          <div className="text-xs text-yellow-500 flex items-center gap-1 mb-1">
            <FaStar className="text-sm" /> {rating.toFixed(1)}
          </div>
        )}
        {price && (
          <div className="text-sm text-deep-teal-600 dark:text-deep-teal-400 font-semibold">{price}</div>
        )}
      </CardWrapper>
    </div>
  );
};
