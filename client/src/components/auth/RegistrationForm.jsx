import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { MdWc } from "react-icons/md";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-3xl font-extrabold text-indigo-600 text-center">
        Create Account
      </h2>
      <form className="space-y-5" action="">
        {/* Full Name */}
        <div className="relative">
          <label htmlFor="fullname" className="sr-only">
            Full Name
          </label>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <HiOutlineUser size={20} />
          </div>
          <input
            id="fullname"
            type="text"
            placeholder="Your full name"
            required
            className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <HiOutlineMail size={20} />
          </div>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          />
        </div>

        {/* Password with toggle */}
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            className="w-full pr-12 pl-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-indigo-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>

        {/* Phone and Gender side-by-side */}
        <div className="grid grid-cols-2 gap-4">
          {/* Phone */}
          <div className="relative">
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <HiOutlinePhone size={20} />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="+123 456 7890"
              required
              className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          {/* Gender */}
          <div className="relative">
            <label htmlFor="gender" className="sr-only">
              Gender
            </label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <MdWc size={20} />
            </div>
            <select
              id="gender"
              required
              className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="relative">
          <label htmlFor="address" className="sr-only">
            Address
          </label>
          <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400">
            <HiOutlineLocationMarker size={20} />
          </div>
          <textarea
            id="address"
            placeholder="Your address"
            rows={2}
            required
            className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Register
        </button>
      </form>

      {/* Have account option */}
      <p className="text-center text-sm text-gray-600">
        Do you have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegistrationForm;
