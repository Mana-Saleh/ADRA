import React from 'react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewCount }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-lg">★</span>
        ))}
        {hasHalfStar && <span className="text-lg">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-lg">☆</span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingStars;