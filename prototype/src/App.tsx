import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 text-gray-900"
    >
      <AppRoutes />

      <ToastContainer
        position="bottom-center"
        toastClassName="bg-white text-gray-900 rounded shadow-md"
        bodyClassName="text-sm"
        autoClose={3000}
        hideProgressBar
      />
    </motion.div>
  );
}
