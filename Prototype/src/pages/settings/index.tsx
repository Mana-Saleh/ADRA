import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiBell,
  FiShield,
  FiGlobe,
  FiHelpCircle,
  FiInfo,
  FiMail,
  FiLock,
  FiCreditCard,
  FiSmartphone,
  FiMapPin,
  FiMoon,
  FiSun,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

const Settings = () => {
  // State for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [locationAccess, setLocationAccess] = useState(true);

  // Mock data for sections
  const accountSettings = [
    { title: "Personal Information", icon: <FiUser />, description: "Name, email, phone number" },
    { title: "Security", icon: <FiLock />, description: "Password, two-factor authentication" },
    { title: "Payment Methods", icon: <FiCreditCard />, description: "Manage credit cards and payment options" },
    { title: "Privacy", icon: <FiShield />, description: "Control your data and visibility" }
  ];

  const preferences = [
    { 
      title: "Notifications", 
      icon: <FiBell />, 
      description: "Manage alerts and reminders",
      action: (
        <ToggleSwitch 
          enabled={notificationsEnabled} 
          setEnabled={setNotificationsEnabled} 
        />
      )
    },
    { 
      title: "Dark Mode", 
      icon: darkMode ? <FiMoon /> : <FiSun />, 
      description: "Switch between light and dark themes",
      action: (
        <ToggleSwitch 
          enabled={darkMode} 
          setEnabled={setDarkMode} 
        />
      )
    },
    { 
      title: "Language", 
      icon: <FiGlobe />, 
      description: "Set your preferred language",
      action: (
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">{language}</span>
          <FiChevronRight className="text-gray-400" />
        </div>
      )
    },
    { 
      title: "Location Access", 
      icon: <FiMapPin />, 
      description: "Allow app to access your location",
      action: (
        <ToggleSwitch 
          enabled={locationAccess} 
          setEnabled={setLocationAccess} 
        />
      )
    }
  ];

  const support = [
    { title: "Help Center", icon: <FiHelpCircle />, description: "Find answers to common questions" },
    { title: "Contact Us", icon: <FiMail />, description: "Get in touch with our support team" },
    { title: "About", icon: <FiInfo />, description: "Learn more about our app" }
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout logic
  };

  return (
    <div className="w-full pb-24 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="px-4 py-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-gray-800"
          >
            Settings
          </motion.h1>
        </div>

        {/* Account Settings */}
        <Section title="Account Settings" delay={0.1}>
          <div className="bg-white rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm overflow-hidden">
            {accountSettings.map((setting, index) => (
              <SettingItem 
                key={index}
                title={setting.title}
                icon={setting.icon}
                description={setting.description}
                isLast={index === accountSettings.length - 1}
              >
                <FiChevronRight className="text-gray-400" />
              </SettingItem>
            ))}
          </div>
        </Section>

        {/* Preferences */}
        <Section title="Preferences" delay={0.2}>
          <div className="bg-white rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm overflow-hidden">
            {preferences.map((pref, index) => (
              <SettingItem 
                key={index}
                title={pref.title}
                icon={pref.icon}
                description={pref.description}
                isLast={index === preferences.length - 1}
              >
                {pref.action}
              </SettingItem>
            ))}
          </div>
        </Section>

        {/* Support */}
        <Section title="Support" delay={0.3}>
          <div className="bg-white rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm overflow-hidden">
            {support.map((item, index) => (
              <SettingItem 
                key={index}
                title={item.title}
                icon={item.icon}
                description={item.description}
                isLast={index === support.length - 1}
              >
                <FiChevronRight className="text-gray-400" />
              </SettingItem>
            ))}
          </div>
        </Section>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full py-4 bg-white rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm text-red-500 font-medium flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <FiLogOut className="mr-2" />
            Log Out
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable components
const ToggleSwitch = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: (val: boolean) => void }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input 
      type="checkbox" 
      className="sr-only peer" 
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
);

const SettingItem = ({ 
  title, 
  icon, 
  description, 
  children, 
  isLast 
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
  isLast?: boolean;
}) => (
  <motion.div
    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.7)" }}
    className={`w-full p-5 flex items-center text-left ${!isLast ? "border-b border-gray-100" : ""}`}
  >
    <div className="p-3 bg-gray-100 rounded-xl text-gray-600 mr-4">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </div>
    {children}
  </motion.div>
);

const Section = ({ 
  title, 
  children, 
  delay 
}: { 
  title: string; 
  children: React.ReactNode; 
  delay: number 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="mt-6"
  >
    <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
    {children}
  </motion.div>
);

export default Settings;