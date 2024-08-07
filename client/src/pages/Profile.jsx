// src/pages/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user profile from API
    fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setProfilePicture(data.profile_picture);
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture instanceof File) {
      formData.append('profile_picture', profilePicture);
    }

    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        alert('Profile updated successfully');
        setUser(data);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  const handleDelete = () => {
    fetch('/api/profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        alert('Profile deleted successfully');
        // Redirect or handle post-deletion logic
      })
      .catch(error => console.error('Error deleting profile:', error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="h-40 w-40 bg-gray-200 flex items-center justify-center rounded-full border border-gray-300">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover rounded-full" />
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Update Profile
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-10 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
