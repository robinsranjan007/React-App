import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import UpdateProfileInfo from '../myprofile/updateinfo/updateuserprofile';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      axios.get(`http://localhost:5000/users?username=${username}`)
        .then(response => {
          if (response.data.length > 0) {
            setUser(response.data[0]);
          }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleSave = (updatedUser) => {
    setUser(updatedUser); // Update the state with the new user data after successful update
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px] text-center">
        
        {/* Profile Header */}
        <h2 className="text-3xl font-bold mb-6 text-white-500">My Profile</h2>

        {/* Profile Icon */}
        <div className="relative text-white-500">
          <FaUserCircle size={128} className="mx-auto mb-4" />

          {/* Update Profile Button */}
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal on button click
            className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full transition duration-200 hover:bg-gray-600"
            title="Update Profile Picture"
          >
            <FaUserCircle size={20} />
          </button>
        </div>

        {/* User Details */}
        <div className="space-y-3 text-gray-300 text-left">
          <p><span className="font-semibold text-white">Name:</span> {user.firstName} {user.lastName}</p>
          <p><span className="font-semibold text-white">Username:</span> {user.username}</p>
          <p><span className="font-semibold text-white">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-white">Age:</span> {user.age}</p>
        </div>

        {/* Update Button */}
        <button 
          onClick={() => setIsModalOpen(true)} // Open the modal on button click
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition duration-300"
        >
          Update Profile
        </button>
      </div>

      {/* Modal to update profile */}
      {isModalOpen && (
        <UpdateProfileInfo
          user={user} // Pass the current user data to the modal
          onSave={handleSave} // Callback to update the user data in the parent component
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default MyProfile;
