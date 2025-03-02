import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdmllcyUyMGJsYWNrfGVufDB8fDB8fHww')" }}>
      <div className="bg-opacity-90 bg-black text-white p-8 rounded-lg shadow-xl w-96">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold">
            Flix<span className="text-red-600">Net</span>
          </div>
          <p className="text-gray-400 mt-2">Create a new account</p>
        </div>

        <form>
          {/* Username Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-gray-400">
          <p>Already have an account? <Link to="/login" className="text-red-500 hover:text-red-600">Log in now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
