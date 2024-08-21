import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RichTextEditor from '../components/RichTextEditor';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'; 

const defaultImageUrl = 'https://flowbite.com/docs/images/blog/image-1.jpg'; // Replace with your default image URL

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl); // Initialize with default image URL
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const fileInputRef = useRef(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, `posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle error
        setUploadError(true);
        console.error('Upload error:', error);
      },
      () => {
        // Handle successful completion
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploadProgress(100);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      handleFileUpload(image);
    } else {
      // If no image, proceed with the form submission
      submitForm();
    }
  };

  const submitForm = async () => {
    console.log('Submitting content:', content);
    try {
      const response = await axios.post(`${apiUrl}/api/story/createStory`, {
        author_id: currentUser.id,
        slug: title.toLowerCase().replace(/\s+/g, '-'), // Example slug generation
        title,
        content,
        image: imageUrl, // Use the image URL from Firebase or default image
        read_time: Math.ceil(content.split(' ').length / 200), // Example read time calculation
        like_count: 0,
        comment_count: 0,
      });
      console.log('Story created:', response.data);
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  // Trigger form submission after image upload is complete
  React.useEffect(() => {
    if (image && imageUrl !== defaultImageUrl) {
      submitForm();
    } else if (!image) {
      submitForm();
    }
  }, [imageUrl]);

  console.log("Content", content);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Image Input */}
      <div className="relative mb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Cover" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <img src={defaultImageUrl} alt="Default" className="w-full h-full object-cover rounded-lg" />
          )}
        </div>
        {uploadError && <p className="text-red-500">Error uploading image</p>}
        {uploadProgress > 0 && uploadProgress < 100 && <p className="text-gray-700">{`Uploading: ${uploadProgress}%`}</p>}
        {uploadProgress === 100 && <p className="text-green-500">Image uploaded successfully</p>}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
        
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">Content</label>
          <RichTextEditor value={content} onChange={(e) => setContent(e.target.value)} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
