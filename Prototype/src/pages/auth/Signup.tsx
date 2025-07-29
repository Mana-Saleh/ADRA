import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signupUser } from "../../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiMapPin,
  FiTool,
  FiCamera
} from "react-icons/fi";
import signupBg from "../../assets/login-image.png";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tourist",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signupUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Welcome ${form.name}! Account created successfully`);
      // Redirect logic here
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch(form.role) {
      case "guide": return <FiMapPin className="text-blue-400" />;
      case "artisan": return <FiTool className="text-amber-400" />;
      default: return <FiCamera className="text-teal-400" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl rounded-[2rem] overflow-hidden shadow-2xl border border-gray-700/30"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Visual Hero Section - 60% width */}
          <div className="md:w-3/5 relative bg-gradient-to-br from-indigo-900/90 to-purple-800/90">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center p-12 z-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white text-center"
              >
                <motion.h1 
                  className="text-5xl font-bold mb-6 tracking-tight"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Join Our <span className="text-teal-300 font-extrabold">Community</span>
                </motion.h1>
                <motion.p 
                  className="text-xl opacity-90 mb-8 max-w-lg mx-auto font-light"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Become part of our growing platform and discover new opportunities
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex justify-center"
                >
                  <div className="h-px w-16 bg-teal-300/50 my-6" />
                </motion.div>
              </motion.div>
            </div>
            <motion.img
              src={signupBg}
              alt="Community illustration"
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
            <div className="absolute bottom-8 left-8 z-20">
              <motion.div 
                className="flex items-center space-x-2 text-teal-300 font-medium"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="w-12 h-px bg-teal-300/70" />
                <span>Trusted by Thousands</span>
              </motion.div>
            </div>
          </div>

          {/* Signup Form Section - 40% width */}
          <div className="md:w-2/5 bg-white dark:bg-gray-850 p-12 flex flex-col justify-center relative">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative z-10"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white/90 mb-2 tracking-tight">Create Account</h2>
                <p className="text-gray-500 dark:text-gray-400 font-light">
                  Start your journey with us today
                </p>
              </div>

              {/* Role indicator */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mb-8"
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200">
                  {getRoleIcon()}
                  <span className="ml-2 capitalize font-medium">{form.role}</span>
                </div>
              </motion.div>

              <form onSubmit={handleSignup} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/70 focus:ring-2 focus:ring-teal-500/80 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-800 dark:text-white/90 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/70 focus:ring-2 focus:ring-teal-500/80 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-800 dark:text-white/90 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700/70 focus:ring-2 focus:ring-teal-500/80 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-800 dark:text-white/90 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </motion.div>

                {/* Role Selector */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Account Type
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700/70 focus:ring-2 focus:ring-teal-500/80 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-800 dark:text-white/90 transition-all duration-300 appearance-none"
                    >
                      <option value="tourist">Tourist/Explorer</option>
                      <option value="guide">Local Guide</option>
                      <option value="artisan">Artisan/Creator</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {getRoleIcon()}
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-teal-500/20 transition-all duration-500 flex items-center justify-center relative overflow-hidden group ${
                      loading ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                  >
                    {/* Animated background effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span
                          key="loading"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block mr-2"
                        >
                          <FiArrowRight />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="signup"
                          initial={{ x: -5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 5, opacity: 0 }}
                          className="flex items-center"
                        >
                          Create Account
                          <motion.span
                            animate={{
                              x: isHovered ? 5 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className="ml-2"
                          >
                            <FiArrowRight />
                          </motion.span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </form>

              {/* Login link */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Sign in
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="rounded-lg shadow-xl"
      />
    </div>
  );
};

export default Signup;