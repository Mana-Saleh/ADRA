// src/pages/Bookings.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import recommendedImg from '../assets/images/recommendedForYou1.jpeg';
import recommendedImg2 from '../assets/images/recommendedForYou2.jpeg';
import popularNearYou1 from '../assets/images/popularNearYou.jpeg';
import thisSeason2 from '../assets/images/thisSeason2.jpeg';
const Bookings: React.FC = () => {
  const { t } = useTranslation();

  // Sample booking data - replace with actual data from your API
  const upcomingBookings = [
    {
      id: '1',
      title: t('bookings.upcoming.craftsWorkshop'),
      date: 'Dec 15, 2024',
      time: '2:00 PM',
      location: t('bookings.locations.riyadh'),
      status: 'confirmed',
      image: recommendedImg
    },
    {
      id: '2',
      title: t('bookings.upcoming.culturalTour'),
      date: 'Dec 20, 2024',
      time: '9:00 AM',
      location: t('bookings.locations.jeddah'),
      status: 'confirmed',
      image: recommendedImg2
    }
  ];

  const pastBookings = [
    {
      id: '3',
      title: t('bookings.past.traditionalCooking'),
      date: 'Nov 28, 2024',
      time: '6:00 PM',
      location: t('bookings.locations.makkah'),
      status: 'completed',
      image: popularNearYou1
    },
    {
      id: '4',
      title: t('bookings.past.heritageVillage'),
      date: 'Nov 15, 2024',
      time: '10:00 AM',
      location: t('bookings.locations.madinah'),
      status: 'completed',
      image: thisSeason2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return t('bookings.status.confirmed');
      case 'pending':
        return t('bookings.status.pending');
      case 'cancelled':
        return t('bookings.status.cancelled');
      case 'completed':
        return t('bookings.status.completed');
      default:
        return status;
    }
  };

  const BookingCard = ({ booking }: { booking: any }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start">
        <img 
          src={booking.image} 
          alt={booking.title}
          className="w-16 h-16 rounded-lg object-cover mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 dark:text-white">{booking.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{booking.date} at {booking.time}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <LocationIcon className="w-4 h-4 mr-2" />
              <span>{booking.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          {t('bookings.actions.details')}
        </button>
        {booking.status === 'confirmed' && (
          <button className="px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
            {t('bookings.actions.manage')}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('bookings.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('bookings.subtitle')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('bookings.stats.upcoming')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                <CheckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('bookings.stats.completed')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pastBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                <ClockIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('bookings.stats.total')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {upcomingBookings.length + pastBookings.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('bookings.sections.upcoming')}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {upcomingBookings.length} {t('bookings.items')}
            </span>
          </div>
          
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('bookings.empty.upcoming')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('bookings.empty.upcomingDesc')}
              </p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                {t('bookings.empty.browse')}
              </button>
            </div>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('bookings.sections.past')}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {pastBookings.length} {t('bookings.items')}
            </span>
          </div>
          
          {pastBookings.length > 0 ? (
            pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <HistoryIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('bookings.empty.past')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('bookings.empty.pastDesc')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SVG Icons
const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const HistoryIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

export default Bookings;