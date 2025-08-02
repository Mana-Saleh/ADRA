import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import herobanner from '../../assets/images/herobanner.jpeg';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  badgeText?: string; // Optional custom badge text that overrides translation
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Find your next travel experience",
  subtitle,
  imageSrc =herobanner,
  badgeText // Can be passed or will use translation
}) => {
  const { t } = useTranslation();
  
  // Use custom badgeText if provided, otherwise use translation
  const displayBadgeText = badgeText || t('hero.explore_asir');

  return (
    <section className="relative w-full h-[70vh] max-h-[800px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="Travel destination"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-hero.jpg';
          }}
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
        {/* Floating Badge (Optional) */}
        {displayBadgeText && (
          <span className="self-start mb-4 px-3 py-1 text-xs font-semibold tracking-wider text-green-800 uppercase bg-green-200 backdrop-blur-sm rounded-full">
            {displayBadgeText}
          </span>
        )}

        {/* Text Content */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          <Link
            to="/services/smart-guide"
            className="inline-flex items-center text-white font-medium group hover:underline"
          >
            {t('hero.learn_more')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;