import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfileInfo = ({ user, onSave, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook for redirection

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      age,
      email,
      password, // Update password in the data
    };

    try {
      // Update the user data on the server
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);

      // Pass the updated user data back to the parent component (MyProfile.jsx)
      onSave(updatedUser);

      // Show alert for successful update
      alert('User updated successfully!');

      // Redirect to the profile page after update
      navigate('/profile');  // Assuming your profile page route is '/myprofile'

      // Close the modal after successful update
      onClose();
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("There was an error updating your profile.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold mb-6 text-white">Update Profile</h2>
        
        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Age Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Save Changes
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileInfo;
