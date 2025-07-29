import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiPlus,
  FiChevronRight,
  FiGift,
  FiX
} from "react-icons/fi";

const SaudiRiyal = ({ className = "w-4 h-4" }) => (
  <img
    src="https://www.sama.gov.sa/ar-sa/Currency/Documents/Saudi_Riyal_Symbol-2.svg"
    alt="SAR"
    className={`inline-block ${className}`}
  />
);

const Overview = () => {
  const [credits, setCredits] = useState(45.50);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const stats = [
    { title: "Places Visited", value: "12", change: "+2", icon: <FiMapPin />, color: "bg-blue-100 text-blue-600" },
    { title: "Experiences Booked", value: "5", change: "+1", icon: <FiCalendar />, color: "bg-purple-100 text-purple-600" },
    { title: "Items Purchased", value: "8", change: "+3", icon: <FiShoppingBag />, color: "bg-amber-100 text-amber-600" },
    { title: "People Connected", value: "24", change: "+5", icon: <FiUsers />, color: "bg-green-100 text-green-600" }
  ];

  const creditPackages = [
    { amount: 25, price: "22.99", bonus: "" },
    { amount: 50, price: "44.99", bonus: "Save 5%" },
    { amount: 100, price: "84.99", bonus: "Save 15%" }
  ];

  const handleAddFunds = (amount) => {
    setCredits(prev => prev + amount);
    setShowAddFunds(false);
    setSelectedPackage(null);
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Wallet */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Your Wallet</h2>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              Transaction History <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-gray-600 text-sm">Available Balance</p>
              <div className="text-3xl font-bold mt-1 flex items-center">
                <SaudiRiyal className="mr-2 w-4 h-4" />{credits.toFixed(2)}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddFunds(true)}
              className="bg-blue-500 text-white px-5 py-3 rounded-full font-bold flex items-center hover:bg-blue-600 transition-colors shadow-md"
            >
              <FiPlus className="mr-2" /> Add Funds
            </motion.button>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-3">Quick Add</h3>
            <div className="grid grid-cols-3 gap-3">
              {creditPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`rounded-xl p-4 text-center cursor-pointer border transition-all ${
                    selectedPackage?.amount === pkg.amount
                      ? "border-blue-400 bg-blue-50 shadow-sm"
                      : "border-gray-100 bg-gray-50 hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  <div className="font-bold text-gray-800 text-lg flex justify-center items-center">
                    <SaudiRiyal className="mr-1 w-4 h-4" />{pkg.amount}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                    <SaudiRiyal className="mr-1 w-3 h-3" />{pkg.price}
                  </div>
                  {pkg.bonus && (
                    <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full mt-2 inline-block">
                      {pkg.bonus}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      <AnimatePresence>
        {showAddFunds && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add Funds</h3>
                <button onClick={() => setShowAddFunds(false)}>
                  <FiX className="text-gray-500" />
                </button>
              </div>
              {selectedPackage ? (
                <div>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center">
                    <div className="text-2xl font-bold flex items-center justify-center">
                      <SaudiRiyal className="mr-2 w-5 h-5" />{selectedPackage.amount}
                    </div>
                    <div className="text-gray-600 mt-1 flex items-center justify-center">
                      <SaudiRiyal className="mr-1 w-4 h-4" />{selectedPackage.price}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPackage(null)}
                      className="py-3 border border-gray-300 rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleAddFunds(selectedPackage.amount)}
                      className="py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                    >
                      Confirm Payment
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">Select amount to add to your wallet</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {creditPackages.map((pkg, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPackage(pkg)}
                        className="bg-gray-50 rounded-xl p-3 text-center cursor-pointer border border-gray-200 hover:border-blue-300"
                      >
                        <div className="font-bold flex items-center justify-center">
                          <SaudiRiyal className="mr-1 w-4 h-4" />{pkg.amount}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 flex items-center justify-center">
                          <SaudiRiyal className="mr-1 w-3 h-3" />{pkg.price}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAddFunds(false)}
                    className="w-full py-3 bg-gray-100 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</div>
              </div>
              <div className="flex items-center mt-3">
                <FiTrendingUp className="text-green-500 text-sm mr-1" />
                <span className="text-green-600 text-xs font-medium">{stat.change} this week</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
