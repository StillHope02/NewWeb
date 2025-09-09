import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Banner from "./assets/banner.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-red-600 flex flex-col">
      {/* Banner image */}
      <img src={Banner} alt="Banner" className="w-full" />

      {/* Full-height white box */}
      <div className="flex-1 bg-white w-full flex flex-col justify-between">
        {/* Top section: login fields */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <button className="bg-black text-white w-full py-2 rounded font-semibold">
            Login
          </button>

          <div className="text-center">
            <a href="#" className="text-red-600 text-sm font-medium">
              Forgot Password?
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <hr className="w-1/4 border-gray-300" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="w-1/4 border-gray-300" />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="bg-gray-200 p-3 rounded-full">
              <span role="img" aria-label="face-id">🔒</span>
            </div>
            <p className="text-red-600 text-sm font-medium text-center">
              Use your screenlock to Login
            </p>
          </div>
        </div>

        {/* Footer inside the box */}
        <div className="px-6 pb-6">
          <button className="bg-black text-white w-full py-2 rounded font-medium">
            Contact Us
          </button>
          <p className="text-gray-500 text-xs mt-2 text-center">Version 2.67 (1)</p>
        </div>
      </div>
    </div>
  );
}
