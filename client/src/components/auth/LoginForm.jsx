import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h3 className="text-3xl font-extrabold text-indigo-600 mb-2">
          CleanIO
        </h3>
        <h1 className="text-2xl font-semibold text-gray-900">
          Hello, Welcome Back!
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
        </p>

        <form className="space-y-5" action="">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {/* Email icon */}
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <HiOutlineMail size={20} />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full pr-12 pl-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {/* Show/hide toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-indigo-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* OR separator */}
        <div className="flex items-center justify-center space-x-3">
          <span className="h-px bg-gray-300 flex-grow"></span>
          <span className="text-gray-500 font-medium">OR</span>
          <span className="h-px bg-gray-300 flex-grow"></span>
        </div>

        {/* Google sign-in button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 py-3 rounded-lg font-semibold transition shadow-sm"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
