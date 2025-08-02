// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import riyalIcon from '../assets/icons/Saudi_Riyal_Symbol-1.png';
import personal from '../assets/images/p.png'
const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');

  // Sample user data
  const userData = {
    name: "Ahmed Al-Saud",
    email: "ahmed.alsaud@example.com",
    phone: "+966 50 123 4567",
    memberSince: "Jan 2023",
    totalBookings: 24,
    savedExperiences: 18,
    preferredLanguage: "Arabic",
    location: "Riyadh, Saudi Arabia",
    avatar: personal
  };

  // Wallet data
  const walletData = {
    balance: 1250.75,
    currency: "SAR",
    transactions: [
      { id: '1', date: '2023-10-15', description: t('profile.wallet.bookingPayment'), amount: -120, type: 'debit' },
      { id: '2', date: '2023-10-10', description: t('profile.wallet.refund'), amount: 45, type: 'credit' },
      { id: '3', date: '2023-10-05', description: t('profile.wallet.experiencePurchase'), amount: -85, type: 'debit' },
      { id: '4', date: '2023-09-28', description: t('profile.wallet.walletTopUp'), amount: 200, type: 'credit' },
    ]
  };

  const profileTabs = [
    { id: 'profile', name: t('profile.tabs.profile'), icon: <UserIcon /> },
    { id: 'wallet', name: t('profile.tabs.wallet'), icon: <WalletTabIcon /> },
    { id: 'preferences', name: t('profile.tabs.preferences'), icon: <SettingsIcon /> },
    { id: 'security', name: t('profile.tabs.security'), icon: <ShieldIcon /> },
    { id: 'notifications', name: t('profile.tabs.notifications'), icon: <BellIcon /> }
  ];

  const stats = [
    { 
      name: t('profile.stats.bookings'), 
      value: userData.totalBookings,
      icon: <BookingsIcon />,
      trend: 'up'
    },
    { 
      name: t('profile.stats.favorites'), 
      value: userData.savedExperiences,
      icon: <FavoritesIcon />,
      trend: 'up'
    },
    { 
      name: t('profile.stats.memberSince'), 
      value: userData.memberSince,
      icon: <CalendarIcon />,
      trend: 'neutral'
    },
    { 
      name: t('profile.stats.walletBalance'), 
      value: walletData.balance.toFixed(2),
      icon: <WalletIcon />,
      trend: 'up'
    }
  ];

  const preferences = [
    { 
      id: 'language', 
      name: t('profile.preferences.language'), 
      value: userData.preferredLanguage,
      options: [t('profile.languages.english'), t('profile.languages.arabic')],
      icon: <LanguageIcon />
    },
    { 
      id: 'notifications', 
      name: t('profile.preferences.notifications'), 
      value: t('profile.preferences.enabled'),
      options: [t('profile.preferences.enabled'), t('profile.preferences.disabled')],
      icon: <BellSettingsIcon />
    },
    { 
      id: 'currency', 
      name: t('profile.preferences.currency'), 
      value: 'SAR',
      options: ['SAR', 'USD', 'EUR'],
      icon: <CurrencyIcon />
    }
  ];

  const securitySettings = [
    { 
      id: 'password', 
      name: t('profile.security.password'), 
      description: t('profile.security.passwordDesc'),
      action: t('profile.actions.change'),
      icon: <LockIcon />
    },
    { 
      id: 'twofactor', 
      name: t('profile.security.twoFactor'), 
      description: t('profile.security.twoFactorDesc'),
      action: t('profile.actions.enable'),
      icon: <TwoFactorIcon />
    },
    { 
      id: 'sessions', 
      name: t('profile.security.activeSessions'), 
      description: t('profile.security.activeSessionsDesc'),
      action: t('profile.actions.view'),
      icon: <DevicesIcon />
    }
  ];

  const notificationSettings = [
    { 
      id: 'email', 
      name: t('profile.notifications.email'), 
      description: t('profile.notifications.emailDesc'),
      enabled: true,
      icon: <MailIcon />
    },
    { 
      id: 'push', 
      name: t('profile.notifications.push'), 
      description: t('profile.notifications.pushDesc'),
      enabled: true,
      icon: <MobileIcon />
    },
    { 
      id: 'sms', 
      name: t('profile.notifications.sms'), 
      description: t('profile.notifications.smsDesc'),
      enabled: false,
      icon: <MessageIcon />
    }
  ];

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    // Implement actual save logic here
  };

  const handleTopUp = () => {
    console.log('Top up wallet');
    // Implement wallet top-up logic
  };

  const handleWithdraw = () => {
    console.log('Withdraw from wallet');
    // Implement wallet withdrawal logic
  };

  const renderProfileContent = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 ring-offset-2"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
              <CheckIcon className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {userData.email}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <EditIcon className="w-4 h-4" />
                {t('profile.actions.edit')}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <LocationIcon className="w-4 h-4" />
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CalendarIcon className="w-4 h-4" />
                <span>{t('profile.memberSince')} {userData.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.name === t('profile.stats.walletBalance') ? (
                    <span className="flex items-center">
                      <img 
                        src={riyalIcon} 
                        alt="SAR" 
                        className="w-4 h-4 mr-1 invert-0 dark:invert" 
                      />
                      {stat.value}
                    </span>
                  ) : stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                stat.trend === 'down' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                {stat.icon}
              </div>
            </div>
            {stat.trend !== 'neutral' && (
              <div className={`mt-3 flex items-center text-xs font-medium ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <TrendDownIcon className="w-4 h-4 mr-1" />
                )}
                {stat.trend === 'up' ? '12%' : '5%'} from last month
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t('profile.contactInfo')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <MailIcon className="w-5 h-5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.email')}
              </label>
              <p className="text-gray-900 dark:text-white">{userData.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.phone')}
              </label>
              <p className="text-gray-900 dark:text-white">{userData.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
              <LocationIcon className="w-5 h-5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.location')}
              </label>
              <p className="text-gray-900 dark:text-white">{userData.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('profile.memberSince')}
              </label>
              <p className="text-gray-900 dark:text-white">{userData.memberSince}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWalletContent = () => (
  <div className="space-y-6">
    {/* Wallet Header - Always teal gradient (no dark mode changes) */}
    <div className="relative bg-gradient-to-r from-teal-600 to-teal-400 rounded-2xl shadow-sm p-6 text-white overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('profile.wallet.title')}</h2>
            <p className="text-teal-100">{t('profile.wallet.description')}</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-teal-100">{t('profile.wallet.balance')}</p>
            <p className="text-3xl font-bold mt-1 flex items-center justify-end">
              <img 
                src={riyalIcon} 
                alt="SAR" 
                className="w-6 h-6 mr-2 dark:filter dark:brightness-0 dark:invert" 
              />
              {walletData.balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-700 rounded-full filter blur-3xl opacity-20"></div>
    </div>

    {/* Wallet Actions */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button 
        onClick={handleTopUp}
        className="flex items-center justify-center gap-2 py-3 bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        {t('profile.wallet.topUp')}
      </button>
      <button 
        onClick={handleWithdraw}
        className="flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-white/10 text-teal-700 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20"
      >
        <WithdrawIcon className="w-5 h-5" />
        {t('profile.wallet.withdraw')}
      </button>
      <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-white/10 text-teal-700 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/20">
        <HistoryIcon className="w-5 h-5" />
        {t('profile.wallet.history')}
      </button>
    </div>

    {/* Recent Transactions */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('profile.wallet.recentTransactions')}
        </h3>
        <button className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300">
          {t('profile.wallet.viewAll')}
        </button>
      </div>
      
      <div className="space-y-4">
        {walletData.transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                transaction.type === 'credit' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'credit' ? (
                  <CreditIcon className="w-5 h-5" />
                ) : (
                  <DebitIcon className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className={`text-lg font-semibold flex items-center ${
              transaction.type === 'credit' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}
              <img 
                src={riyalIcon} 
                alt="SAR" 
                className="w-4 h-4 mx-1 dark:filter dark:brightness-0 dark:invert" 
              />
              {Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Payment Methods */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('profile.wallet.paymentMethods')}
        </h3>
        <button className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300">
          {t('profile.wallet.manage')}
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-gray-600 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                •••• 4532
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('profile.wallet.expires')} 12/25
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <EditIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 py-4 text-teal-600 dark:text-teal-400 font-medium rounded-xl border-2 border-dashed border-teal-300 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors">
          <PlusCircleIcon className="w-5 h-5" />
          {t('profile.wallet.addPaymentMethod')}
        </button>
      </div>
    </div>
  </div>
);

  const renderPreferencesContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {t('profile.preferences.title')}
      </h3>
      <div className="space-y-6">
        {preferences.map((pref) => (
          <div key={pref.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-700/50 last:border-0">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                {pref.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {pref.name}
                </h4>
              </div>
            </div>
            <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              {pref.options.map((option) => (
                <option key={option} value={option} selected={option === pref.value}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSaveChanges}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <CheckIcon className="w-5 h-5" />
          {t('profile.actions.save')}
        </button>
      </div>
    </div>
  );

  const renderSecurityContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {t('profile.security.title')}
      </h3>
      <div className="space-y-6">
        {securitySettings.map((setting) => (
          <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-700/50 last:border-0">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                {setting.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {setting.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {setting.description}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors whitespace-nowrap">
              {setting.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {t('profile.notifications.title')}
      </h3>
      <div className="space-y-6">
        {notificationSettings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700/50 last:border-0">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                {setting.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {setting.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {setting.description}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                defaultChecked={setting.enabled}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSaveChanges}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <CheckIcon className="w-5 h-5" />
          {t('profile.actions.save')}
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
      case 'wallet':
        return renderWalletContent();
      case 'preferences':
        return renderPreferencesContent();
      case 'security':
        return renderSecurityContent();
      case 'notifications':
        return renderNotificationsContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('profile.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('profile.subtitle')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide pb-2">
            <nav className="flex space-x-1">
              {profileTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className={`${
                    activeTab === tab.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {tab.icon}
                  </span>
                  <span className="whitespace-nowrap">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </div>
    </div>
  );
};

// SVG Icons
const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const WalletTabIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const SettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

const ShieldIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const BookingsIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const FavoritesIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const WalletIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

const WithdrawIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
  </svg>
);

const HistoryIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

const CreditIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const DebitIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
  </svg>
);

const CreditCardIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
  </svg>
);

const PlusCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  </svg>
);

const EditIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const CheckIcon = ({ className = "w-3 h-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

const LanguageIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
  </svg>
);

const BellSettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
  </svg>
);

const CurrencyIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
  </svg>
);

const LockIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const TwoFactorIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 7v2.5h2.5v3H17v2.5h-2.5v-3H12v-2.5h2.5V7H17zm-9-4.5V9H3V2.5h5zM5 4v3h1V4H5zm-1.5 7H9v6H3.5v-6zm1.5 1.5v3h1v-3H5z"/>
  </svg>
);

const DevicesIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/>
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const MobileIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
  </svg>
);

const MessageIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);

const LocationIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

const TrendUpIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const TrendDownIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
  </svg>
);

export default Profile;