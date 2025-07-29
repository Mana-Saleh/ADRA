import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../../services/auth";
import { useAuthStore } from "../../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import loginImage from "../../assets/login-image.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      login(data.user, data.token); // Update the global store
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); // Redirect to the main protected route
      }, 1500);
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl rounded-[2rem] overflow-hidden shadow-2xl border border-gray-700/30"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Visual Hero Section */}
          <div className="md:w-3/5 relative bg-gradient-to-br from-indigo-900/90 to-purple-800/90">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png' )] opacity-10" />
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
                  Welcome to <span className="text-teal-300 font-extrabold">Your Platform</span>
                </motion.h1>
                <motion.p 
                  className="text-xl opacity-90 mb-8 max-w-lg mx-auto font-light"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Transform your workflow with our cutting-edge solutions
                </motion.p>
              </motion.div>
            </div>
            <motion.img
              src={loginImage}
              alt="Modern interface illustration"
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          </div>

          {/* Login Form Section */}
          <div className="md:w-2/5 bg-white dark:bg-gray-850 p-12 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png' )] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative z-10"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white/90 mb-2 tracking-tight">Sign In</h2>
                <p className="text-gray-500 dark:text-gray-400 font-light">
                  Access your dashboard and manage your account
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <motion.div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/70 focus:ring-2 focus:ring-teal-500 bg-transparent text-gray-800 dark:text-white/90" />
                  </div>
                </motion.div>
                <motion.div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700/70 focus:ring-2 focus:ring-teal-500 bg-transparent text-gray-800 dark:text-white/90" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </motion.div>
                <motion.div>
                  <button type="submit" disabled={loading} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium flex items-center justify-center ${loading ? "opacity-50" : ""}`}>
                    <AnimatePresence mode="wait">
                      {loading ? <motion.div key="loading" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><FiLogIn /></motion.div> : <motion.span key="login" className="flex items-center">Continue <motion.span animate={{ x: isHovered ? 5 : 0 }} className="ml-2"><FiArrowRight /></motion.span></motion.span>}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </form>
              <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account? <a href="/signup" className="font-medium text-teal-500 hover:text-teal-400">Get started</a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </div>
  );
};

export default Login;
