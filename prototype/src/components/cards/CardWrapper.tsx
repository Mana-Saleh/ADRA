import React from 'react';

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="
      bg-white dark:bg-gray-800 
      rounded-2xl shadow-md 
      overflow-hidden p-4
      transition-all duration-300
    ">
      {children}
    </div>
  );
};

export default CardWrapper;
