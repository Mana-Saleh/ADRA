// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Shorts from './pages/Shorts';
import Bookings from './pages/Bookings';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div dir={isArabic ? 'rtl' : 'ltr'} lang={i18n.language}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="discover" element={<Home />} />
              <Route path="wishlist" element={<Favorites />} />
              <Route path="profile" element={<Profile />} />
              <Route path="shorts" element={<Shorts />} />
              <Route path="bookings" element={<Bookings />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
