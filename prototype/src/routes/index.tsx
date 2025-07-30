// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Authentication
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Layout
import MainLayout from "../layouts/MainLayout";

// Core Pages
import Home from "../pages/home";
import Shorts from "../pages/shorts";
import Profile from "../pages/profile";
import Overview from "../pages/overview";
import Settings from "../pages/settings";

// Services
import SmartGuide from "../pages/services/smart-guide";
import DiscoverNearby from "../pages/services/discover-nearby";
import Marketplace from "../pages/services/marketplace";
import EventsActivities from "../pages/services/events-activities";
import MyBookings from "../pages/services/my-bookings";
import LiveTranslate from "../pages/services/live-translate";
import LocalStreams from "../pages/services/local-streams";
import PreserveCulture from "../pages/services/preserve-culture";
// --- Import the new BookExperience component ---
import BookExperience from "../pages/services/book-experience"; // Adjust path if needed


// Guards
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Core */}
            <Route index element={<Home />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/guide" element={<SmartGuide />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Services */}
            <Route path="/services/smart-guide" element={<SmartGuide />} />
            <Route path="/services/discover-nearby" element={<DiscoverNearby />} />
            <Route path="/services/marketplace" element={<Marketplace />} />
            <Route path="/services/events-activities" element={<EventsActivities />} />
            <Route path="/services/my-bookings" element={<MyBookings />} />
            <Route path="/services/live-translate" element={<LiveTranslate />} />
            <Route path="/services/local-streams" element={<LocalStreams />} />
            <Route path="/services/preserve-culture" element={<PreserveCulture />} />
            {/* --- Add the new route for BookExperience --- */}
            <Route path="/services/book-experience" element={<BookExperience />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;