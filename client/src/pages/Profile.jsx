import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const defaultProfilePic = 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg';

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error, access_token } = useSelector((state) => state.user);
  console.log('currentUser', currentUser);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '', // Ensure password is initialized as an empty string
        profile_picture: currentUser.profile_picture || defaultProfilePic
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, profile_picture: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const updatedFormData = {
        username: formData.username || currentUser.username,
        email: formData.email || currentUser.email,
        password: formData.password || '',
        profile_picture: formData.profile_picture || currentUser.profile_picture || defaultProfilePic
      };

      const filteredFormData = Object.fromEntries(
        Object.entries(updatedFormData).filter(([_, value]) => value !== undefined && value !== '')
      );

      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/update/${currentUser.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(filteredFormData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success('User updated successfully!');
    } catch (error) {
      dispatch(updateUserFailure(error));
      toast.error('Something went wrong');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleImageChange}
          />
          <div
            className="h-40 w-40 bg-gray-200 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={formData.profile_picture || defaultProfilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-sm self-center mt-2">
            {imageError ? (
              <span className="text-red-500">Error uploading image</span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-gray-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-500">Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={formData.username || ''}
            onChange={handleChange}
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
            value={formData.email || ''}
            onChange={handleChange}
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
            value={formData.password || ''}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          {loading ? 'Loading...' : 'Update Profile'}
        </button>
      </form>

      <div className="mt-10">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete Account
        </button>
        <button
          onClick={handleSignOut}
          className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;
