// src/components/cards/ServiceCardSkeleton.tsx
import React from 'react';

interface ServiceCardSkeletonProps {
  isLoading?: boolean;
}

export const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({ 
  isLoading = true 
}) => {
  if (!isLoading) return null;

  return (
    <div className="service-card-skeleton">
      {/* Image skeleton */}
      <div className="skeleton-image skeleton-loading"></div>
      
      {/* Card content skeleton */}
      <div className="card-content">
        {/* Category tag skeleton */}
        <div className="skeleton-category skeleton-loading" style={{ width: '80px', height: '20px' }}></div>
        
        {/* Title skeleton */}
        <div className="skeleton-title skeleton-loading" style={{ width: '120px', height: '24px', marginBottom: '8px' }}></div>
        
        {/* Description skeleton */}
        <div className="skeleton-description skeleton-loading" style={{ width: '100%', height: '16px', marginBottom: '4px' }}></div>
        <div className="skeleton-description skeleton-loading" style={{ width: '80%', height: '16px', marginBottom: '12px' }}></div>
        
        {/* Rating skeleton */}
        <div className="skeleton-rating skeleton-loading" style={{ width: '60px', height: '16px', marginBottom: '8px' }}></div>
        
        {/* Price skeleton */}
        <div className="skeleton-price skeleton-loading" style={{ width: '50px', height: '20px' }}></div>
      </div>
    </div>
  );
};

// You can also export a version that shows multiple skeletons for loading states
export const ServiceCardSkeletonList: React.FC<{ count?: number }> = ({ 
  count = 6 
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </>
  );
};