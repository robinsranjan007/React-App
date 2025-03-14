import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      age,
      username,
      email,
      password, // In production, hash this password before saving
      playlist: [],
      ratings: [],
      reviews: [],
      likedMovies: [],
    };

    try {
      // Send the data to JSON Server
      await axios.post('http://localhost:5000/users', userData);

      // Save the username in localStorage upon successful registration
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('name', `${firstName} ${lastName}`);

      // Redirect to the home page after successful registration
      alert("Account created successfully!");
      navigate('/'); 
    } catch (error) {
      console.error("Error registering user:", error);
      alert("There was an error registering your account.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdmllcyUyMGJsYWNrfGVufDB8fDB8fHww')" }}>
      <div className="bg-opacity-90 bg-black text-white p-8 rounded-lg shadow-xl w-96">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold">
            Flix<span className="text-red-600">Net</span>
          </div>
          <p className="text-gray-400 mt-2">Create a new account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Age Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-gray-400">
          <p>
            Already have an account? <Link to="/login" className="text-red-500 hover:text-red-600">Log in now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
