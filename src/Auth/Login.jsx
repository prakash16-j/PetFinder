import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-black shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">Email</label>
            <div className="flex items-center bg-gray-900 rounded-xl p-3 shadow-sm">
              <FaEnvelope className="text-orange-400 mr-3" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <div className="flex items-center bg-gray-900 rounded-xl p-3 shadow-sm">
              <FaLock className="text-orange-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/home")}
          className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-orange-700 transition duration-200"
        >
          Login
        </motion.button>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a className="text-orange-500 hover:underline" href="#">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
