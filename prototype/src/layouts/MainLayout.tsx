import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/navigation/TopNavBar';
import BottomTabs from '../components/navigation/BottomTabs';
import { useTheme } from '../context/ThemeContext';


const MainLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-300`}>
      {/* Sticky TopNavBar */}
      <TopNavBar className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" />
      
      {/* Main content area with proper scrolling */}
      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="flex-grow pb-16"> {/* Padding bottom to account for BottomTabs */}
          <Outlet />
        </div>
      </main>
      
      {/* Bottom tabs */}
      <BottomTabs className="fixed bottom-0 w-full z-40" />
    </div>
  );
};

export default MainLayout;